/* eslint-disable @next/next/no-img-element */
import { columnsElement } from './types';

export type Character = {
  id: number;
  name: string | null;
  status: string | null;
  species: string | null;
  type: string | null;
  gender: string | null;
  image: string | null;
  url: string | null;
  created: string | null;
}

export const
  columns: columnsElement<Character>[] = [
    { name: 'Id', getVal: ({ id }) => id }, // обычно показывать не надо но мы будем использовать для отладки
    { name: 'Image', getVal: ({ image, name }) => image && <img src={image} className="icon" alt={name || ''} /> },
    { name: 'Name', getVal: ({ name }) => name, setVal: val => ({ name: val }) },
    { name: 'Status', getVal: ({ status }) => status, setVal: val => ({ status: val }) },
    // { name: 'URL', getVal: ({ url }) => url && <a href={url}>{url}</a>},
  ];



