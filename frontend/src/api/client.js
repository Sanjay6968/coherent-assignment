const BASE = import.meta.env.VITE_API_URL || '/api';

async function request(path, params = {}) {
  const url = new URL(`${BASE}${path}`, window.location.origin);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== 'all' && v !== '') url.searchParams.set(k, v);
  });
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

export const api = {
  getVaccines: (params) => request('/vaccines', params),
  getSummary:  (params) => request('/summary',  params),
};
