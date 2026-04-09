import React, { useState, useEffect } from 'react';
import { useFetch }   from '../hooks/useFetch.js';
import { api }        from '../api/client.js';
import DataTable      from './DataTable.jsx';

export default function TablePage({ filters, sortBy, sortDir, toggleSort, page, setPage }) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebounced] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 350);
    return () => clearTimeout(t);
  }, [search]);

  const params = { ...filters, search: debouncedSearch, page, limit: 20, sortBy, sortDir };

  const { data, loading, error } = useFetch(
    () => api.getVaccines(params),
    [JSON.stringify(params)]
  );

  const rows     = data?.data  || [];
  const meta     = data?.meta  || null;
  const filterMeta = data?.filters || null;

  return (
    <>
      <p className="section-title">Data Explorer</p>
      <DataTable
        data={rows}
        meta={meta}
        loading={loading}
        error={error}
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        sortDir={sortDir}
        toggleSort={toggleSort}
        page={page}
        setPage={setPage}
      />
    </>
  );
}
