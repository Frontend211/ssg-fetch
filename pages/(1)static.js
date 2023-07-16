import StatelessTable from '../components/StatelessTable';
import { getStaticData } from '../lib/fetcher';


export default function StaticPage({ data }) {
  return <StatelessTable data={data} />;
}



export const getStaticProps = async () => ({ props: { data: await getStaticData() } });
