import StaticTable from '../components/rick-and-morty-character-components/StaticTable';
import StaticGrid from '../components/rick-and-morty-character-components/StaticGrid';
import { getStaticData } from '../lib/fetcher';


export default function StaticPage({ data }) {
  return <>
    <StaticTable data={data} />
    <hr/>
    <StaticGrid data={data} />
  </>;
}



export const getStaticProps = async () => ({ props: { data: await getStaticData() } });
