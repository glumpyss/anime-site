// Multi-server player logic
// These embed sources use the anime title/MAL ID to generate stream URLs
// Sources: gogoanime embeds, zoro/aniwatch embeds, anime-specific embeds

export const SERVERS = [
  {
    id: 'gogo-sub',
    name: 'GogoAnime',
    icon: '🟢',
    type: 'sub',
    getUrl: (title, ep) => {
      const slug = slugify(title);
      return `https://gogoanime3.co/category/${slug}`;
    },
    getEpUrl: (title, ep) => {
      const slug = slugify(title);
      return `https://gogoanime3.co/${slug}-episode-${ep}`;
    }
  },
  {
    id: 'zoro-sub',
    name: 'Aniwatch',
    icon: '🔵',
    type: 'sub',
    getUrl: (title, ep) => `https://aniwatch.to/search?keyword=${encodeURIComponent(title)}`,
    getEpUrl: (title, ep) => `https://aniwatch.to/search?keyword=${encodeURIComponent(title)}`
  },
  {
    id: 'animepahe',
    name: 'AnimePahe',
    icon: '🟣',
    type: 'sub',
    getUrl: (title) => `https://animepahe.ru/anime/${slugify(title)}`,
    getEpUrl: (title, ep) => `https://animepahe.ru/anime/${slugify(title)}`
  },
  {
    id: '9anime',
    name: '9Anime',
    icon: '🟠',
    type: 'sub',
    getUrl: (title) => `https://9animetv.to/search?keyword=${encodeURIComponent(title)}`,
    getEpUrl: (title, ep) => `https://9animetv.to/search?keyword=${encodeURIComponent(title)}`
  },
  {
    id: 'allanime',
    name: 'AllAnime',
    icon: '🔴',
    type: 'both',
    getUrl: (title) => `https://allanime.to/anime?search=${encodeURIComponent(title)}`,
    getEpUrl: (title, ep) => `https://allanime.to/anime?search=${encodeURIComponent(title)}`
  },
  {
    id: 'animefire',
    name: 'AnimeFire',
    icon: '⚡',
    type: 'dub',
    getUrl: (title) => `https://animefire.plus/pesquisar/${encodeURIComponent(title)}/1`,
    getEpUrl: (title, ep) => `https://animefire.plus/pesquisar/${encodeURIComponent(title)}/1`
  }
];

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

// Build the player iframe — since these are external sites, we open in new tab
// or embed via redirect page. Most won't allow iframe due to X-Frame-Options.
// So we provide a "watch on [server]" approach with an in-page pseudo-player.

export function buildPlayerUI(container, anime, episode, serverList = SERVERS) {
  const title = anime.title_english || anime.title;

  container.innerHTML = `
    <div class="player-placeholder">
      <div class="play-icon" id="play-trigger">▶</div>
      <p id="player-status">Select a server below to watch</p>
    </div>
  `;

  document.getElementById('play-trigger')?.addEventListener('click', () => {
    const activeServer = document.querySelector('.server-btn.active');
    if (activeServer) {
      launchServer(activeServer.dataset.serverId, title, episode);
    }
  });
}

export function launchServer(serverId, title, episode) {
  const server = SERVERS.find(s => s.id === serverId);
  if (!server) return;

  const url = server.getEpUrl(title, episode);
  
  // Open in new tab since most anime sites block iframes
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function renderServerTabs(container, anime, episode) {
  const title = anime.title_english || anime.title;

  container.innerHTML = `
    <div class="server-section">
      <h3>Servers — Sub</h3>
      <div class="server-tabs" id="sub-tabs">
        ${SERVERS.filter(s => s.type !== 'dub').map(s => `
          <button class="server-btn ${s.id === 'gogo-sub' ? 'active' : ''}" 
                  data-server-id="${s.id}"
                  data-title="${escapeAttr(title)}"
                  data-ep="${episode}">
            <span class="dot"></span>
            ${s.icon} ${s.name}
          </button>
        `).join('')}
      </div>
      <h3 style="margin-top:0.8rem">Servers — Dub</h3>
      <div class="server-tabs" id="dub-tabs">
        ${SERVERS.filter(s => s.type !== 'sub').map(s => `
          <button class="server-btn"
                  data-server-id="${s.id}"
                  data-title="${escapeAttr(title)}"
                  data-ep="${episode}">
            <span class="dot"></span>
            ${s.icon} ${s.name}
          </button>
        `).join('')}
      </div>
      <p style="color:var(--muted);font-size:0.78rem;margin-top:0.7rem">
        ℹ️ Clicking a server opens it in a new tab. Search for the anime there and select your episode.
      </p>
    </div>
  `;

  container.querySelectorAll('.server-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.server-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      launchServer(btn.dataset.serverId, btn.dataset.title, btn.dataset.ep);
    });
  });
}

function escapeAttr(str) {
  return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
