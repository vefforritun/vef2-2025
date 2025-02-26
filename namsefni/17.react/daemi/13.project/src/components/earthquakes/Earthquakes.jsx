import React from 'react';
import PropTypes from 'prop-types';

import { Earthquake } from '../earthquake/Earthquake';

import s from './Earthquakes.module.scss';

Earthquakes.propTypes = {
  title: PropTypes.string.isRequired,
  earthquakes: PropTypes.arrayOf(PropTypes.object),
}

export function Earthquakes({ title, earthquakes }) {
  return (
    <section className={s.earthquakes}>
      <h2>{title}</h2>
      <ul className={s.earthquakes__list}>
        {earthquakes.length === 0 && (
          <li>Engir skjálftar</li>
        )}
        {earthquakes.length > 0 && earthquakes.map((quake, i) => {
          const {
            title: quakeTitle, mag, time, url,
          } = quake.properties;
          return (
            <Earthquake
              key={i}
              title={quakeTitle}
              mag={mag}
              time={time}
              url={url}
            />
          )
        })}
      </ul>
    </section>
  );
}
