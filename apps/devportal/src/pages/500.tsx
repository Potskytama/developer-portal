import { Box, Center, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { ButtonLink } from '@scdp/ui/components';
import Layout from '../layouts/Layout';

export default function Custom500() {
  return (
    <Layout title={'Internal Server error'} description={'The link you have followed might be broken, or the page has been removed'}>
      <Box height={'calc(100vh - 215px)'}>
        <Center layerStyle="section.main" h="full">
          <Stack align="center" textAlign="center" spacing="6" maxW="lg">
            <Image boxSize="32" src="https://sitecorecontenthub.stylelabs.cloud/api/public/content/4e1101727f1a48aab23deba3947b6a9c?" alt="alert" />
            <Stack>
              <Heading as="h1">Internal server error</Heading>
              <Text variant="small">Error 500</Text>
            </Stack>
            <Text>Apologies, this page seems to be broken.</Text>
            <Stack>
              <ButtonLink rightIcon={undefined} variant="link" href="/" text="Go to homepage" />
            </Stack>
          </Stack>
        </Center>
      </Box>
    </Layout>
  );
}
