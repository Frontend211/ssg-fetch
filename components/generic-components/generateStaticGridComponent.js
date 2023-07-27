import { memo } from 'react';
import ObjectList from './ObjectList';
import ObjectListAsGridWrapper from './ObjectListAsGridWrapper';


export default function generateStaticGridComponent({ OneObjectComponent }) {
  return memo(function TableComponent({ data }) {
    return <ObjectListAsGridWrapper>
      <ObjectList objectList={data} OneObjectComponent={OneObjectComponent} />
    </ObjectListAsGridWrapper>;
  });
}