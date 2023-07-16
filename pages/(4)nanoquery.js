import StatelessTable from '../components/StatelessTable';
import { getStaticData, toastFetcher, API_URL } from '../lib/fetcher';
// import { useState, useEffect } from 'react';

import { nanoquery } from '@nanostores/query';
import { useStore } from '@nanostores/react';


const
  [createFetcherStore  /* , createMutatorStore */ ] = nanoquery({
    fetcher: toastFetcher
  }),
  $store = createFetcherStore([API_URL]);



function UsefulComponent() {
  const
    { data, loading, error } = useStore($store);
  return <>
    {loading && <>loading....</>}
    {error && <>Error {error.toString()}</>}
    {data && <StatelessTable data={data} />}
  </>;
}


export default function NanoqueryPage(/* { data: propsData } */) {
  // $store.mutate(()=>propsData);
  return <>
    <UsefulComponent />
  </>;
}

export const getStaticProps = async () => ({ props: { data: await getStaticData() } });
