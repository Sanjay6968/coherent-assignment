import React, { useState, useEffect } from 'react';
import { useFetch }   from './hooks/useFetch.js';
import { useFilters } from './hooks/useFilters.js';
import { api }        from './api/client.js';
import Sidebar        from './components/Sidebar.jsx';
import Header         from './components/Header.jsx';
import OverviewPage   from './components/OverviewPage.jsx';
import ChartsPage     from './components/ChartsPage.jsx';
import TablePage      from './components/TablePage.jsx';

export default function App() {
  const [theme,     setTheme]     = useState('dark');
  const [activeTab, setActiveTab] = useState('overview');

  const {
    filters, setFilter, reset,
    page, setPage,
    sortBy, sortDir, toggleSort,
  } = useFilters();

  /* Load filter meta once (regions, brands, vaccines, years) */
  const { data: metaData } = useFetch(() => api.getVaccines({ page: 1, limit: 1 }), []);
  const filterMeta = metaData?.filters || {};

  /* Apply theme to <html> */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <div className="app-layout">
      <Sidebar
        filters={filters}
        filterMeta={filterMeta}
        setFilter={setFilter}
        reset={reset}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="main-content">
        <Header theme={theme} toggleTheme={toggleTheme} filters={filters} />

        <main className="page-body">
          {activeTab === 'overview' && <OverviewPage filters={filters} />}
          {activeTab === 'charts'   && <ChartsPage   filters={filters} />}
          {activeTab === 'table'    && (
            <TablePage
              filters={filters}
              sortBy={sortBy} sortDir={sortDir} toggleSort={toggleSort}
              page={page}     setPage={setPage}
            />
          )}
        </main>
      </div>
    </div>
  );
}
