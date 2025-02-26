import React, { useState } from 'react';

import { EarthquakesContainer } from './containers/earthquakes/EarthquakesContainer';
import { Menu } from './components/menu/Menu';
import { Search } from './components/search/Search';
import { Layout } from './components/layout/Layout';

// Ættum að senda þessi gögn áfram til componenta.. en leti..
export const types = [
  { type: 'significant', label: 'Verulegir' },
  { type: '4.5', label: '4.5+' },
  { type: '2.5', label: '2.5+' },
  { type: '1.0', label: '1.0+' },
];

export const periods = [
  { period: 'hour', label: 'seinustu klukkustund' },
  { period: 'day', label: 'seinasta dag' },
  { period: 'week', label: 'seinustu viku' },
  { period: 'month', label: 'seinasta mánuð' },
];

export default function App() {
  const [type, setType] = useState('significant');
  const [period, setPeriod] = useState('week');
  const [search, setSearch] = useState(undefined);

  return (
    <Layout title="Jarðskjálftar">
      <Menu currentType={type} currentPeriod={period} onType={setType} onPeriod={setPeriod} />
      <Search onSearch={setSearch} />
      <EarthquakesContainer type={type} period={period} search={search} />
    </Layout>
  );
}
