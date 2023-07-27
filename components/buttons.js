/* eslint-disable react/display-name */
import { memo } from 'react';

export const 
  AddButton = memo(() => <button className='add'>➕ add</button>),
  DelButton = memo(() => <button  className='delete'>❌delete</button>),
  EditButton = memo(() => <button className='start-edit'>✏️edit</button>),
  UpdateButton = memo(() => <button className='update'>✔️ok</button>),
  CancelButton = memo(() => <button className='cancel'>✖️cancel</button>),
  formDataSymbol = Symbol('formData');