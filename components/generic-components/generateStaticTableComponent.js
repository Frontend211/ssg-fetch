import { memo } from 'react';
import ObjectList from './ObjectList';
import ObjectListAsTableWrapper from './ObjectListAsTableWrapper';
import generateObjectAsTRComponent from './generateObjectAsTRComponent';

export default function generateStaticTableComponent({ columns, getKeyFn = obj => obj.id }) {
  const ObjectTRComponent = generateObjectAsTRComponent({ columns, getKeyFn });
  return memo(function TableComponent({ data }) {
    return <ObjectListAsTableWrapper columns={columns}>
      <ObjectList objectList={data} OneObjectComponent={ObjectTRComponent} />
    </ObjectListAsTableWrapper>;
  });
}