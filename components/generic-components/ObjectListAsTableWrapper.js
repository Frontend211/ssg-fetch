import { memo } from 'react';

export default memo(function ObjectListTableWrapper(
  { columns, children, AddComponent, onClick }) {
  return <table onClick={onClick}>
    <thead>
      <tr>
        {columns?.map(el => <th key={el.name}>{el.name}</th>)}
      </tr>
    </thead>
    <tbody>
      {children}
    </tbody>
    <tfoot>
      {AddComponent && <AddComponent />}
    </tfoot>
  </table >;
});
