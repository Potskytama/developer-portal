import { IPersonalizedExperience } from '@/src/components/chatbot/IExperienceResult';
import { NextResponse } from 'next/server';
import { Message, MessageType } from '../../types/Message';
import { AzureOpenAI } from './azure-openai';

export interface IChatGPTPayload {
  query: string;
  context: IPersonalizedExperience | undefined;
  history: Message[];
  searchData: string[];
}

export async function POST(request: Request) {
  const data = (await request.json()) as IChatGPTPayload;
  const formatMessage = ' Format this answer as MarkDown, but dont mention it in the reponse';

  if (!data.query) {
    return new NextResponse('Please provide a query parameter', { status: 400 });
  }

  // Use Context to fill in the LLM with more context data
  const messages = [{ role: 'system', content: 'You are a helpful assistant, designed to help Developers building with Sitecore.' }];
  messages.push({ role: 'system', content: `When generating responses, use the follow JSON data as additional context: ${JSON.stringify(data.context, null, 2)}` });

  // handle the search data
  console.log(data.searchData);
  messages.push({ role: 'system', content: `When generating responses you will only use the following data to answer questions. Never answer questions from your own knowledge: ${data.searchData}` });

  if (data.history?.length > 0) {
    for (const item of data.history) {
      if (item.type == MessageType.Assistant) {
        messages.push({ role: 'assistant', content: item.text });
      } else {
        messages.push({ role: 'user', content: item.text });
      }
    }
  }
  messages.push({ role: 'user', content: data.query + formatMessage });

  console.log('Chatbot Request', messages);

  const azure = new AzureOpenAI();

  const stream = await azure.streamChatCompletion({
    messages: messages,
    stream: true, // stream the response
  });

  return new Response(stream);
}
