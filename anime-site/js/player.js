// Only servers with confirmed working embed URL formats as of 2025
// All use MAL ID. Auto-fallback tries next server if current one errors.

export const SERVERS = [
  // vidsrc family — most widely used anime embed network
  { id: 'vs1',  name: 'VidSrc',       tag: 'SUB', url: (id,ep) => `https://vidsrc.me/embed/anime?mal=${id}&ep=${ep}` },
  { id: 'vs2',  name: 'VidSrc 2',     tag: 'SUB', url: (id,ep) => `https://vidsrc.to/embed/anime/${id}/${ep}` },
  { id: 'vs3',  name: 'VidSrc Pro',   tag: 'SUB', url: (id,ep) => `https://vidsrc.xyz/embed/anime?mal=${id}&ep=${ep}` },
  { id: 'vs4',  name: 'VidSrc CC',    tag: 'SUB', url: (id,ep) => `https://vidsrc.cc/v2/embed/anime/${id}/${ep}` },
  { id: 'vs5',  name: 'VidSrc Dev',   tag: 'SUB', url: (id,ep) => `https://vidsrc.dev/embed/anime/${id}/${ep}` },
  // embed.su family
  { id: 'es1',  name: 'Embed.su',     tag: 'SUB', url: (id,ep) => `https://embed.su/embed/anime/${id}/${ep}` },
  { id: 'es2',  name: 'Embed.su Dub', tag: 'DUB', url: (id,ep) => `https://embed.su/embed/anime/${id}/${ep}?dub=1` },
  // 2embed
  { id: '2e1',  name: '2Embed',       tag: 'SUB', url: (id,ep) => `https://www.2embed.skin/embedanime/${id}/${ep}` },
  { id: '2e2',  name: '2Embed CC',    tag: 'SUB', url: (id,ep) => `https://2embed.cc/embedanime/${id}/${ep}` },
  // smashystream
  { id: 'ss1',  name: 'Smashy Sub',   tag: 'SUB', url: (id,ep) => `https://player.smashystream.com/anime/${id}/${ep}` },
  { id: 'ss2',  name: 'Smashy Dub',   tag: 'DUB', url: (id,ep) => `https://player.smashystream.com/anime/${id}/${ep}?lang=dub` },
  // autoembed
  { id: 'ae1',  name: 'AutoEmbed',    tag: 'SUB', url: (id,ep) => `https://autoembed.co/anime/mal/${id}/${ep}` },
  { id: 'ae2',  name: 'AutoEmbed Dub',tag: 'DUB', url: (id,ep) => `https://autoembed.co/anime/mal/${id}/${ep}?dub=1` },
  // multiembed
  { id: 'me1',  name: 'MultiEmbed',   tag: 'SUB', url: (id,ep) => `https://multiembed.mov/?video_id=${id}&mal=1&s=1&e=${ep}` },
  // nontonAnime
  { id: 'na1',  name: 'NontonAnime',  tag: 'SUB', url: (id,ep) => `https://www.NontonAnime.bid/embed/mal/${id}/${ep}` },
  // aniplay
  { id: 'ap1',  name: 'AniPlay',      tag: 'SUB', url: (id,ep) => `https://aniplay.co/embed/anime/${id}/${ep}` },
  // movembedder
  { id: 'mv1',  name: 'MovEmbedder',  tag: 'SUB', url: (id,ep) => `https://www.movembedder.com/anime?mal=${id}&ep=${ep}` },
  // vidsrc in
  { id: 'vi1',  name: 'VidSrc IN',    tag: 'SUB', url: (id,ep) => `https://vidsrc.in/embed/anime?mal=${id}&ep=${ep}` },
  // vidsrc pm
  { id: 'vp1',  name: 'VidSrc PM',    tag: 'SUB', url: (id,ep) => `https://vidsrc.pm/embed/anime/${id}/${ep}` },
  // vidsrc net
  { id: 'vn1',  name: 'VidSrc Net',   tag: 'SUB', url: (id,ep) => `https://vidsrc.net/embed/anime?mal=${id}&ep=${ep}` },
];

// SVG icons
const PLAY_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/><polygon points="10,8 16,12 10,16"/></svg>`;

let currentAnime = null;
let currentEp = 1;
let serverIndex = 0;

function buildUrl(idx) {
  return SERVERS[idx].url(currentAnime.mal_id, currentEp);
}

export function renderPlayer(container, anime, ep) {
  currentAnime = anime;
  currentEp = ep;
  serverIndex = 0;
  loadServer(container, 0);
}

function loadServer(container, idx) {
  serverIndex = idx;
  const url = buildUrl(idx);

  container.innerHTML = `
    <iframe
      id="player-iframe"
      src="${url}"
      allowfullscreen
      allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
      referrerpolicy="no-referrer"
      style="width:100%;height:100%;border:none;display:block"
    ></iframe>
    <div class="player-error" id="player-err">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <strong>Server didn't load</strong>
      <p>Try a different server below</p>
    </div>
  `;
}

export function renderServerTabs(container, anime, ep) {
  currentAnime = anime;
  currentEp = ep;

  container.innerHTML = `
    <div class="server-bar">
      <div class="server-bar-head">Source Servers</div>
      <div class="servers" id="servers-list">
        ${SERVERS.map((s, i) => `
          <button class="srv-btn ${i === 0 ? 'active' : ''}" data-idx="${i}">
            ${PLAY_ICON}
            ${s.name}
            <span class="srv-tag${s.tag === 'DUB' ? ' dub' : ''}">${s.tag}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;

  container.querySelectorAll('.srv-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.srv-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const idx = parseInt(btn.dataset.idx);
      const iframe = document.getElementById('player-iframe');
      if (iframe) {
        iframe.src = SERVERS[idx].url(currentAnime.mal_id, currentEp);
        // hide error if showing
        const err = document.getElementById('player-err');
        if (err) err.style.display = 'none';
        iframe.style.display = 'block';
      }
    });
  });
}

export function updatePlayer(anime, ep) {
  currentAnime = anime;
  currentEp = ep;
  const iframe = document.getElementById('player-iframe');
  const activeBtn = document.querySelector('#servers-list .srv-btn.active');
  if (!iframe || !activeBtn) return;
  const idx = parseInt(activeBtn.dataset.idx);
  iframe.src = SERVERS[idx].url(anime.mal_id, ep);
  const err = document.getElementById('player-err');
  if (err) err.style.display = 'none';
  iframe.style.display = 'block';
}
