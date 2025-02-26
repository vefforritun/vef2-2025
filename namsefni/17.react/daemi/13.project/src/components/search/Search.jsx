import React from 'react';
import PropTypes from 'prop-types';

import s from './Search.module.scss';

Search.propTypes = {
  search: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
}

export function Search({ search, onSearch }) {

  const onChange = (e) => {
    onSearch(e.target.value);
  }

  return (
    <div className={s.search}>
      <label>
        Leita:
        <input type="text" value={search} onChange={onChange} />
      </label>
    </div>
  )
}
