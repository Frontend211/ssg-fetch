import { memo, useState, useCallback } from 'react';
import { DelButton, EditButton, AddButton, UpdateButton, CancelButton } from '../buttons';
import ObjectListAsTableWrapper from './ObjectListAsTableWrapper';
import ObjectListEditModeReplacer from './ObjectListEditModeReplacer';
import generateObjectAsTRComponent from './generateObjectAsTRComponent';
import generateTRFormComponent from './generateTRFormComponent';

export default function generateFullFeaturedTableComponent({ columns, getKeyFn = obj => obj?.id }) {
  const
    myColumns = [...columns, { name: 'actions', getVal: _ => <><EditButton /><DelButton /></> }],
    ObjectTRComponent = generateObjectAsTRComponent({ columns: myColumns, getKeyFn }),
    AddComponent = generateTRFormComponent({ columns, getKeyFn, actionColContent: <AddButton /> }),
    EditModeComponent = generateTRFormComponent({ columns, getKeyFn, actionColContent: <><UpdateButton /><CancelButton /></> });
  return memo(function TableComponent({ data, clickEventListener }) {
    const
      [inEditModeId, setInEditModeId] = useState(null),
      onClick = useCallback(event => {
        clickEventListener(event);
        const
          { target } = event,
          button = target.closest('button'),
          id = button?.closest('[data-id]').dataset.id;
        // console.log('onClick', { button, id, inEditModeId });
        switch (true) {
          case button?.matches('.start-edit'):
            id && setInEditModeId(id);
            return;
          case button?.matches('.update'):  // и по update и по cancel надо просто выйти из режима редактирования 
          case button?.matches('.cancel'):
            setInEditModeId(null);
            return;
        }
      }, [clickEventListener]);
    return <ObjectListAsTableWrapper columns={myColumns} AddComponent={AddComponent} onClick={onClick}>
      <ObjectListEditModeReplacer objectList={data} OneObjectComponent={ObjectTRComponent} inEditModeId={inEditModeId} EditModeComponent={EditModeComponent} />
    </ObjectListAsTableWrapper>;
  });
}
