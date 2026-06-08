import { getTopAiring, getTopAnime, getPopular, getSeasonNow } from './api.js';

function esc(s = '') {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function cardHTML(anime) {
  const img   = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url;
  const title = anime.title_english || anime.title;
  const score = anime.score ? `⭐ ${anime.score}` : '';
  const eps   = anime.episodes ? `${anime.episodes} eps` : anime.status === 'Currently Airing' ? 'Ongoing' : '';
  return `
    <div class="anime-card" onclick="location.href='anime.html?id=${anime.mal_id}'">
      <div class="card-img-wrap">
        ${img
          ? `<img class="card-img" src="${img}" alt="${esc(title)}" loading="lazy">`
          : `<div class="card-img-placeholder">🎌</div>`}
      </div>
      <div class="card-info">
        <div class="card-title">${esc(title)}</div>
        <div class="card-meta">${[score, eps].filter(Boolean).join(' · ')}</div>
        ${anime.status === 'Currently Airing' ? '<span class="card-badge">● AIRING</span>' : ''}
      </div>
    </div>`;
}

function skeletons(n) { return Array(n).fill('<div class="skeleton"></div>').join(''); }

async function loadSection(id, fetcher) {
  const grid = document.getElementById(id);
  if (!grid) return;
  grid.innerHTML = skeletons(12);
  try {
    const items = await fetcher();
    grid.innerHTML = items.map(cardHTML).join('');
  } catch {
    grid.innerHTML = `<p style="color:var(--muted);grid-column:1/-1">Failed to load. Try refreshing.</p>`;
  }
}

document.getElementById('search-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const q = document.getElementById('search-input').value.trim();
  if (q) location.href = `search.html?q=${encodeURIComponent(q)}`;
});

loadSection('airing-grid',  getTopAiring);
loadSection('season-grid',  getSeasonNow);
loadSection('popular-grid', getPopular);
loadSection('top-grid',     getTopAnime);
