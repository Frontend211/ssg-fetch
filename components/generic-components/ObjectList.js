import { memo } from 'react';

export default memo(function ObjectList(
  { objectList, OneObjectComponent, getKeyFn = obj => obj.id }) {
  return <>
    {objectList?.map(obj =>
      <OneObjectComponent object={obj} key={getKeyFn(obj)} ></OneObjectComponent>)}
  </>;
});