// Jikan v4 API wrapper (unofficial MyAnimeList API — free, no key needed)
const API = 'https://api.jikan.moe/v4';

// Simple cache to avoid re-fetching
const cache = new Map();

async function fetchJSON(url) {
  if (cache.has(url)) return cache.get(url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json();
  cache.set(url, data);
  return data;
}

export async function getTopAiring() {
  const data = await fetchJSON(`${API}/top/anime?filter=airing&limit=18`);
  return data.data;
}

export async function getTopAnime() {
  const data = await fetchJSON(`${API}/top/anime?limit=18`);
  return data.data;
}

export async function getPopular() {
  const data = await fetchJSON(`${API}/top/anime?filter=bypopularity&limit=18`);
  return data.data;
}

export async function getUpcoming() {
  const data = await fetchJSON(`${API}/top/anime?filter=upcoming&limit=18`);
  return data.data;
}

export async function searchAnime(query, page = 1) {
  const data = await fetchJSON(`${API}/anime?q=${encodeURIComponent(query)}&limit=24&page=${page}&sfw=true`);
  return data;
}

export async function getAnimeById(id) {
  const data = await fetchJSON(`${API}/anime/${id}/full`);
  return data.data;
}

export async function getAnimeEpisodes(id, page = 1) {
  const data = await fetchJSON(`${API}/anime/${id}/episodes?page=${page}`);
  return data;
}

export async function getAnimeByGenre(genreId, page = 1) {
  const data = await fetchJSON(`${API}/anime?genres=${genreId}&order_by=score&sort=desc&limit=18&page=${page}&sfw=true`);
  return data.data;
}

export async function getSeasonNow() {
  const data = await fetchJSON(`${API}/seasons/now?limit=18`);
  return data.data;
}
