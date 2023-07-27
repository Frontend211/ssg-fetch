import { useCallback } from 'react';
import FullFeaturedTable from '../components/rick-and-morty-character-components/FullFeaturedTable';
import toast from 'react-hot-toast';
import { formDataSymbol } from '../components/buttons';

import { getStaticData, toastFetcher, API_URL } from '../lib/fetcher';

import useSWR, { SWRConfig } from 'swr';
import { columns } from '../object-types/rickAndMortyCharacter';

// https://swr.vercel.app/docs/with-nextjs

function UsefulComponent() {
  const
    { data, error, isLoading, isValidating, mutate } = useSWR(API_URL, toastFetcher),
    clickEventListener = useCallback(async event => {
      const
        { target } = event,
        button = target.closest('button'),
        id = button?.closest('[data-id]').dataset.id,
        inputValues = event?.[formDataSymbol];
      if (!button) return;
      const newObj = {};
      let optimisticData;
      if (inputValues) columns.forEach((col, i) => Object.assign(newObj, col?.setVal?.(inputValues[i])));
      console.log('newObj', newObj);
      const promise = (() => {
        switch (true) {
          case button?.matches('.update'):
            // eslint-disable-next-line no-case-declarations
            const index = data.findIndex(obj => String(id) === String(obj.id));
            optimisticData = data.with(index, newObj);
            return fetch(API_URL + '/' + id, { method: 'PUT', body: (new URLSearchParams(newObj)).toString() });
          case button?.matches('.delete'):
            optimisticData = data.filter(obj => String(id) !== String(obj.id));
            return fetch(API_URL + '/' + id, { method: 'DELETE' });
          case button?.matches('.add'):
            optimisticData = [...data, newObj];
            return fetch(API_URL, { method: 'POST', body: (new URLSearchParams(newObj)).toString() });
        }
      })({});
      if (!promise) return;
      toast.promise(promise, {
        loading: 'Fetching',
        success: '+',
        error: (err) => `This just happened: ${err.toString()}`,
      });
      // await promise;
      await mutate(promise.then(toastFetcher), { optimisticData, populateCache: true, revalidate: false });


    }, [data, mutate]);
  console.debug('[swr] UsefulComponent render', { isLoading, isValidating, error }, data);
  return <>
    <div style={{ position: 'absolute', fontSize: 'xxx-large' }}>
      {isLoading && <>⌛</>}
      {isValidating && <>👁</>}
    </div>
    {error && <>Error {error.toString()}</>}
    {data && <FullFeaturedTable data={data} clickEventListener={clickEventListener} />}
  </>;
}

export default function SWRPage({ fallback }) {
  return <SWRConfig value={{ fallback }}>
    <UsefulComponent />
  </SWRConfig>;
}

export const getStaticProps = async () => ({ props: { fallback: { [API_URL]: await getStaticData() } } });
