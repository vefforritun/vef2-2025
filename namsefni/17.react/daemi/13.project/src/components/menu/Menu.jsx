import React from 'react';
import PropTypes from 'prop-types';

import { periods, types } from '../../App';

import s from './Menu.module.scss';

Menu.propTypes = {
  currentType: PropTypes.string.isRequired,
  currentPeriod: PropTypes.string.isRequired,
  onType: PropTypes.func.isRequired,
  onPeriod: PropTypes.func.isRequired,
}

export function Menu({ currentType, currentPeriod, onType, onPeriod }) {

  const onTypeChange = (type) => (e) => {
    onType(type);
  }

  const onPeriodClick = (period) => (e) => {
    onPeriod(period);
  }

  return (
    <div className={s.menu}>
      <section className={s.menu__group}>
        <h2>Gerð</h2>
        <ul className={s.menu__list}>
          {types.map((type, i) => (
            <li key={i}>
              <label>
                <input
                  type="radio"
                  name="type"
                  onChange={onTypeChange(type.type)}
                  checked={type.type === currentType}
                />
                {type.label}
              </label>
            </li>
          ))}
        </ul>
      </section>
      <section className={s.menu__group}>
        <h2>Tímabil</h2>
        <ul className={s.menu__list}>
          {periods.map((period, i) => (
            <li key={i}>
              <label>
                <input
                  type="radio"
                  name="period"
                  onChange={onPeriodClick(period.period)}
                  checked={period.period === currentPeriod}
                />
                {period.label}
              </label>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
