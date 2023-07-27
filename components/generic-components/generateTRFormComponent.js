import { memo, useState, useMemo } from 'react';
import { formDataSymbol } from '../buttons';
export default function generateTRFormComponent({ columns, actionColContent, getKeyFn }) {
  return memo(function TRComponent({ object }) {
    const
      [addInputsVal, setAddInputsVal] = useState(columns.map(({ getVal }) => getVal?.(object || {}) || '')),
      myColumns = useMemo(() => columns.map(
        ({ name, setVal, getVal }, i) => ({
          name, val: setVal
            ? <input name={name} value={addInputsVal[i]} onInput={evt => setAddInputsVal(addInputsVal.with(i, evt.currentTarget.value))} />
            : object && getVal?.(object) || ''
        })), [addInputsVal, object]);
    return <tr
      data-id={getKeyFn?.(object) || 'tr-form'}
      style={object && { outline: '2px solid blue' }}
      onClick={event => {
        event[formDataSymbol] = addInputsVal;
        if (event.target.closest('button.add')) setAddInputsVal(addInputsVal.map(()=>''));
      }}
    >
      {myColumns.map(({ name, val }) => <td key={name}>{val}</td>)}
      <td>{actionColContent}</td>
    </tr>;
  });
}