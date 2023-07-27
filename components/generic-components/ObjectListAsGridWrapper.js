import { memo } from 'react';
import css from './grid.module.sass';

export default memo(function ObjectListAsGridWrapper(
  { children, AddComponent }) {
  return <div className={css.grid}>
    {children}
    {AddComponent && <AddComponent />}
  </div>;
});