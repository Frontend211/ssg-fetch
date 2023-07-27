import StaticTable from '../components/rick-and-morty-character-components/StaticTable';
import { getStaticData, toastFetcher } from '../lib/fetcher';
import { useState, useEffect } from 'react';


export default function ReactHooksPage({ data: propsData }) {
  const
    [data, setData] = useState(propsData),
    [error, setError] = useState(null);
  console.debug('[hooks] ReactHooksPage render',data, Date.now());
  useEffect(_ => {
    wrap();
    async function wrap() {
      try {
        setError(null);
        setData(await toastFetcher());
      } catch (err) {
        setError(err);
      }
    }
  },[]);
  if (error) return <>Error!!!</>;
  return <StaticTable data={data} />;
}

export const getStaticProps = async () => ({ props: { data: await getStaticData() } });
