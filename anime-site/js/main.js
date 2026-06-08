import { getTopAiring, getTopAnime, getPopular, getSeasonNow } from './api.js';

function esc(s=''){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

function card(a) {
  const img = a.images?.jpg?.large_image_url || a.images?.jpg?.image_url;
  const title = a.title_english || a.title;
  const score = a.score ? `★ ${a.score}` : '';
  const eps = a.episodes ? `${a.episodes} ep` : a.status==='Currently Airing' ? 'Ongoing' : '';
  return `<div class="card" onclick="location.href='anime.html?id=${a.mal_id}'">
    <div class="card-thumb">
      ${img
        ? `<img class="card-img" src="${img}" alt="${esc(title)}" loading="lazy">`
        : `<div class="card-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>`}
    </div>
    <div class="card-body">
      <div class="card-title">${esc(title)}</div>
      <div class="card-meta">${[score,eps].filter(Boolean).join(' · ')}</div>
      ${a.status==='Currently Airing'?'<span class="card-tag">AIRING</span>':''}
    </div>
  </div>`;
}

function skels(n){return Array(n).fill('<div class="skeleton"></div>').join('');}

async function loadSection(id, fn) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = skels(12);
  try {
    el.innerHTML = (await fn()).map(card).join('');
  } catch {
    el.innerHTML = `<p style="color:var(--t3);grid-column:1/-1;padding:1rem">Failed to load.</p>`;
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
