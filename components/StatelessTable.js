import { memo } from 'react';

const columns = [
  { name: 'Id', getVal: ({ id }) => id }, // обычно показывать не надо но мы будем использовать для отладки
  // eslint-disable-next-line @next/next/no-img-element
  { name: 'Image', getVal: ({ image, name }) => image && <img src={image} className="icon" alt={name || ''} /> },
  { name: 'Name', getVal: ({ name }) => name, setVal: val => ({ name: val }) },
  { name: 'Status', getVal: ({ status }) => status, setVal: val => ({ status: val }) },
  // { name: 'URL', getVal: ({ url }) => url && <a href={url}>{url}</a>},
];

// const
//   AddButton = memo(() => <button className='add'>➕ add</button>),
//   DelButton = memo(() => <button className='delete'>❌delete</button>);


export default memo(function StatelessTable({ data, onClick=null, children = null }) {
  // console.log('data=',data);
  return <table onClick={onClick}>
    <thead>
      <tr>
        {columns?.map(el => <th key={el.name}>{el.name}</th>)}
      </tr>
    </thead>
    <tbody>
      {data?.map(row =>
        <tr key={row.id} data-id={row.id}>
          {columns.map(({ name, getVal }) => <td key={name}>
            {getVal(row)}
          </td>)}
        </tr>)}
    </tbody>
    {children && 
    <tfoot>
      <tr></tr>
    </tfoot>}
  </table>;

});
