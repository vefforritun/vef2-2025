import PropTypes from 'prop-types';
import { format } from 'date-fns';

import s from './Earthquake.module.scss';

Earthquake.propTypes = {
  title: PropTypes.string,
  time: PropTypes.number,
  mag: PropTypes.number,
  url: PropTypes.string,
}

function formatDate(timestamp) {
  return format(new Date(timestamp), 'dd.MM.yyyy HH:mm:ss');
}

export function Earthquake({ title = '', time = 0, mag = 0, url = '' }) {
  return (
    <li className={s.earthquake}>
      <div>
        <h2>{title}</h2>
        <dl>
          <dt>Tími</dt>
          <dt>{formatDate(time)}</dt>
          <dt>Styrkur</dt>
          <dt>{mag} M</dt>
          <dt>Nánar</dt>
          <dt><a href={url}>{url}</a></dt>
        </dl>
      </div>
    </li>
  )
}
