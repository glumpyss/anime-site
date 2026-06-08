import { getTopAiring, getTopAnime, getPopular, getSeasonNow } from './api.js';

const GENRES = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Adventure' },
  { id: 4, name: 'Comedy' },
  { id: 8, name: 'Drama' },
  { id: 10, name: 'Fantasy' },
  { id: 14, name: 'Horror' },
  { id: 22, name: 'Romance' },
  { id: 24, name: 'Sci-Fi' },
  { id: 36, name: 'Slice of Life' },
  { id: 37, name: 'Supernatural' },
  { id: 7, name: 'Mystery' },
  { id: 27, name: 'Shounen' },
];

function cardHTML(anime) {
  const img = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url;
  const title = anime.title_english || anime.title;
  const score = anime.score ? `⭐ ${anime.score}` : '';
  const eps = anime.episodes ? `${anime.episodes} eps` : anime.status === 'Currently Airing' ? 'Ongoing' : '';

  return `
    <div class="anime-card" onclick="location.href='anime.html?id=${anime.mal_id}'">
      <div class="card-img-wrap">
        ${img
          ? `<img class="card-img" src="${img}" alt="${escapeHtml(title)}" loading="lazy">`
          : `<div class="card-img-placeholder">🎌</div>`
        }
      </div>
      <div class="card-info">
        <div class="card-title">${escapeHtml(title)}</div>
        <div class="card-meta">${[score, eps].filter(Boolean).join(' · ')}</div>
        ${anime.status === 'Currently Airing' ? '<span class="card-badge">AIRING</span>' : ''}
      </div>
    </div>
  `;
}

function skeletons(n) {
  return Array(n).fill('<div class="skeleton"></div>').join('');
}

async function loadSection(id, fetcher) {
  const grid = document.getElementById(id);
  if (!grid) return;
  grid.innerHTML = skeletons(12);
  try {
    const anime = await fetcher();
    grid.innerHTML = anime.map(cardHTML).join('');
  } catch (e) {
    grid.innerHTML = `<p style="color:var(--muted);grid-column:1/-1">Failed to load. Try refreshing.</p>`;
  }
}

function renderGenres() {
  const bar = document.getElementById('genre-bar');
  if (!bar) return;
  bar.innerHTML = GENRES.map(g =>
    `<span class="genre-chip" onclick="location.href='search.html?genre=${g.id}&name=${encodeURIComponent(g.name)}'">${g.name}</span>`
  ).join('');
}

function setupSearch() {
  const form = document.getElementById('search-form');
  const input = document.getElementById('search-input');
  if (!form || !input) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const q = input.value.trim();
    if (q) location.href = `search.html?q=${encodeURIComponent(q)}`;
  });
}

function escapeHtml(str = '') {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// Init
renderGenres();
setupSearch();
loadSection('airing-grid', getTopAiring);
loadSection('popular-grid', getPopular);
loadSection('top-grid', getTopAnime);
loadSection('season-grid', getSeasonNow);
