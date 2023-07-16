import StatelessTable from '../components/StatelessTable';
import { getStaticData, toastFetcher, API_URL } from '../lib/fetcher';

import useSWR, { SWRConfig } from 'swr';

// https://swr.vercel.app/docs/with-nextjs

function UsefulComponent() {
  const
    { data, error, isLoading } = useSWR(API_URL, toastFetcher);
  return <>
    {isLoading && <>loading....</>}
    {error && <>Error {error.toString()}</>}
    {data && <StatelessTable data={data} />}
  </>;
}

export default function SWRPage({ fallback }) {
  return <SWRConfig value={{ fallback }}>
    <UsefulComponent />
  </SWRConfig>;
}

export const getStaticProps = async () => ({ props: { fallback: { [API_URL]: await getStaticData() } } });
