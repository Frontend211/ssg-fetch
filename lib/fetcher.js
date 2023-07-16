import toast from 'react-hot-toast';

export const API_URL = 'https://nextauth-test-kappa.vercel.app/api/public/character';

const fetcher = async () => await (await fetch(API_URL)).json();

export function toastFetcher() {
  const
    promise = fetch(API_URL)
      .then(res => res.json());
  toast.promise(promise, {
    loading: 'Fetching...',
    success: 'ok!',
    error: (err) => `This just happened: ${err.toString()}`,
  });
  return promise;
}

export const getStaticData = async () =>
  (await fetcher())
    // модифицируем данные чтобы статика немного отличалась 
    .map(({ ...pars }) => Object.assign(pars, { status: '⚡' + pars.status }));


