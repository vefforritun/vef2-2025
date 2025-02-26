import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Earthquakes } from '../../components/earthquakes/Earthquakes';
import { periods, types } from '../../App';

EarthquakesContainer.propTypes = {
  type: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  search: PropTypes.string,
}

export function EarthquakesContainer({ type, period, search = undefined }) {
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
    <Earthquakes
      title={title}
      earthquakes={earthquakes}
    />
  );
}
