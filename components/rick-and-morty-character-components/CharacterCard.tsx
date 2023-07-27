/* eslint-disable @next/next/no-img-element */
import { memo } from 'react';
import css from './CharacterCard.module.sass';
import { Character } from '../../object-types/rickAndMortyCharacter';

export default memo(function RickAndMortyCharacterCard({ object: { image, name, type, status, gender, species }  }: { object: Character }) {
  return <div className={css.card}>
    <img src={image || ''} alt={name || ''} />
    <div className={css.text}>
      <h2>{name}</h2>
      <div className={css.subHeader}>{species}</div>
      <div className={css.subHeader}>{gender}</div>
      <div className={css.subHeader}>{status}</div>
    </div>    
    <div className={css.bottom}>{type}</div>
  </div>;
});