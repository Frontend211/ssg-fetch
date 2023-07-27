import { memo } from 'react';


export default memo(function ObjectListEditModeReplacer(
  { objectList, OneObjectComponent, getKeyFn = obj => obj.id, inEditModeId, EditModeComponent }) {
  const
    inEditModeIndex = objectList.findIndex(obj => String(getKeyFn(obj)) === String(inEditModeId));
  return <>
    {objectList.map((obj, index) => 
      index === inEditModeIndex
        ? <EditModeComponent object={obj} key={getKeyFn(obj)} />
        : <OneObjectComponent object={obj} key={getKeyFn(obj)} />
    )}
  </>;
});

