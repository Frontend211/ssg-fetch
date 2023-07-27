import { memo } from 'react';

export default function generateObjectAsTRComponent({ columns, getKeyFn = obj => obj.id }) {
  return memo(function TRComponent({ object }) {
    return <tr data-id={getKeyFn(object)}>
      {columns.map(({ name, getVal }) => <td key={name}>
        {getVal(object)}
      </td>)}
    </tr>;
  });
}