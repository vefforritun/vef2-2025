import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

// Byggir á dæmi 03.ajax og „lyftir“ state upp í App sem sendir áfram í
// Earthquakes, Menu & Search componenta
// Farið að verða frekar stórt um sig!

const types = [
  { type: 'significant', label: 'Verulegir' },
  { type: '4.5', label: '4.5+' },
  { type: '2.5', label: '2.5+' },
  { type: '1.0', label: '1.0+' },
];

const periods = [
  { period: 'hour', label: 'seinustu klukkustund' },
  { period: 'day', label: 'seinasta dag' },
  { period: 'week', label: 'seinustu viku' },
  { period: 'month', label: 'seinasta mánuð' },
];

export function formatDate(timestamp) {
  return format(new Date(timestamp), 'dd.MM.yyyy HH:mm:ss');
}

Earthquake.propTypes = {
  title: PropTypes.string,
  time: PropTypes.number,
  mag: PropTypes.number,
  url: PropTypes.string,
}

function Earthquake({ title = '', time = 0, mag = 0, url = '' }) {
  return (
    <li>
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

Earthquakes.propTypes = {
  type: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  search: PropTypes.string,
}

function Earthquakes({ type, period, search = undefined }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      let json;

      const url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${type}_${period}.geojson`;

      try {
        const result = await fetch(url);

        if (!result.ok) {
          throw new Error('result not ok');
        }

        json = await result.json();
      } catch (e) {
        setError('Gat ekki sótt gögn.');
        return;
      } finally {
        setLoading(false);
      }

      setData(json);
    }
    fetchData();
  }, [type, period]);

  if (error) {
    return (
      <p>Villa kom upp: {error}</p>
    );
  }

  if (loading) {
    return (
      <p>Sæki gögn...</p>
    );
  }

  const title = types.find((t) => t.type === type).label + ' ' + periods.find((p) => p.period === period).label;

  let earthquakes = data.features || [];

  if (search) {
    earthquakes = earthquakes.filter((quake) => {
      const { title } = quake.properties;
      return title && title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
    });
  }

  return (
    <section>
      <h2>{title}</h2>
      <ul>
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

Menu.propTypes = {
  currentType: PropTypes.string.isRequired,
  currentPeriod: PropTypes.string.isRequired,
  onType: PropTypes.func.isRequired,
  onPeriod: PropTypes.func.isRequired,
}

function Menu({ currentType, currentPeriod, onType, onPeriod }) {

  const onTypeChange = (type) => (e) => {
    onType(type);
  }

  const onPeriodClick = (period) => (e) => {
    onPeriod(period);
  }

  return (
    <>
      <section>
        <h2>Gerð</h2>
        <ul>
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
      <section>
        <h2>Tímabil</h2>
        <ul>
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
    </>
  )
}

Search.propTypes = {
  search: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
}

function Search({ search, onSearch }) {

  const onChange = (e) => {
    onSearch(e.target.value);
  }

  return (
    <label>
      Leita:
      <input type="text" value={search} onChange={onChange} />
    </label>
  )
}

export default function App() {
  const [type, setType] = useState('significant');
  const [period, setPeriod] = useState('week');
  const [search, setSearch] = useState(undefined);

  // App heldur utan um allt state sem skiptir máli og er deilt á milli mismunandi componenta
  // Sendum föll sem uppfæra niður í þá componenta sem þurfa að gera það, annars sendum við gildið

  return (
    <main>
      <h1>Jarðskjálftar</h1>
      <Menu currentType={type} currentPeriod={period} onType={setType} onPeriod={setPeriod} />
      <Search onSearch={setSearch} />
      <Earthquakes type={type} period={period} search={search} />
    </main>
  );
}
