import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

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

// Færum birtingu í sér component, getum unnið nánar með, brugðist við ef gögn
// vantar, bætt við stílum o.s.fr.
// T.d. er `0` ekki gott sjálfgefið gildi fyrir `time` eða `mag`
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
}

function Earthquakes({ type, period }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      let json;

      const url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${type}_${period}.geojson`;

      try {
        const result = await fetch(url);

        // Getum líka haft flóknari villumeðhöndlun hér, gripið 4xx villur sér eða eitthvað þannig
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
    // þar sem við notum báðar af þessum state breytum, þá eru þau dependecy fyrir þetta effect
    // ef annaðhvor breytist, þá keyrir effect aftur, annars ekki
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

  // Ekki mjög robust—flettir upp týpu og period til að búa til titil
  const title = types.find((t) => t.type === type).label + ' ' + periods.find((p) => p.period === period).label;

  // Ef við erum ekki búin að sækja gögn eru þau null, þó við returnum að ofan er betra að opna
  // ekki á mögulegar null villur  👇
  const earthquakes = (data && data.features) || [];

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

export default function App() {
  const type = 'significant';
  return (
    <main>
      <h1>Jarðskjálftar</h1>
      <Earthquakes type={type} period="hour" />
      <Earthquakes type="significant" period="day" />
      <Earthquakes type="significant" period="week" />
    </main>
  );
}
