import fs from 'fs';
import path from 'path';
// Scripts
import { getPartialsAsArray } from '@/scripts/page-info';
import { getJssConnectedDemoPaths } from '@/scripts/static-paths';
// Interfaces
import type { DemoNavContext, DemoNavData, PageInfo, PartialData } from '@/interfaces/page-info';
// Components
import GenericContentPage from '@/components/layout/GenericContentPage';
import DemoNav from '@/components/layout/DemoNav';

export async function getStaticPaths() {
  const steppedPaths = await getJssConnectedDemoPaths();
  return {
    paths: steppedPaths,
    fallback: false,
  };
}

export async function getStaticProps(context: { params: DemoNavContext }) {
  const filePath = path.join(process.cwd(), `data/demos/${context.params.demo}.json`);
  const navData: DemoNavData = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));
  const activeParent = navData.nav.find((parent) => parent.slug === context.params.parent);
  const activeChild = activeParent?.children.find((child) => child.slug === context.params.child);

  const pageInfo = {
    title: navData.title,
    description: navData.description,
    pageTitle: `${navData.title} - ${activeChild}`,
    hasInPageNav: true,
    youtube: [],
    stackexchange: [],
    twitter: [],
  };

  const partials = await getPartialsAsArray([
    `demos/${context.params.demo}/${context.params.parent}/${context.params.child}`,
  ]);

  return {
    props: {
      pageInfo,
      partials,
      context: context.params,
      navData,
    },
    revalidate: 6000, // 10 minutes
  };
}

type SteppedPageProps = {
  pageInfo: PageInfo;
  partials: PartialData;
  context: DemoNavContext;
  navData: DemoNavData;
};

const SteppedPage = ({ pageInfo, partials, context, navData }: SteppedPageProps): JSX.Element => {
  const CustomNav = <DemoNav context={context} navData={navData} />;

  return <GenericContentPage pageInfo={pageInfo} partials={partials} customNav={CustomNav} />;
};

export default SteppedPage;
