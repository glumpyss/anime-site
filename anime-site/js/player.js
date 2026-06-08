// Embed servers — all support MAL ID based URLs, no redirects
export const SERVERS = [
  {
    id: 'vidsrc',
    name: 'VidSrc',
    icon: '🟢',
    getUrl: (title, ep, malId) =>
      `https://vidsrc.me/embed/anime?mal=${malId}&ep=${ep}`
  },
  {
    id: 'vidsrc2',
    name: 'VidSrc #2',
    icon: '🔵',
    getUrl: (title, ep, malId) =>
      `https://vidsrc.to/embed/anime/${malId}/${ep}`
  },
  {
    id: 'embedsu',
    name: 'Embed.su',
    icon: '🟣',
    getUrl: (title, ep, malId) =>
      `https://embed.su/embed/anime/${malId}/${ep}`
  },
  {
    id: 'vidsrcxyz',
    name: 'VidSrc Pro',
    icon: '🟠',
    getUrl: (title, ep, malId) =>
      `https://vidsrc.xyz/embed/anime?mal=${malId}&ep=${ep}`
  },
  {
    id: 'animeflex',
    name: 'AnimeFlex',
    icon: '🔴',
    getUrl: (title, ep, malId) =>
      `https://animeflex.org/embed/${malId}/${ep}`
  },
  {
    id: 'animegg',
    name: 'AnimeGG',
    icon: '⚡',
    getUrl: (title, ep, malId) =>
      `https://www.animegg.org/embed/?mal=${malId}&ep=${ep}`
  }
];

export function renderPlayer(container, anime, ep) {
  const malId = anime.mal_id;
  const title = anime.title_english || anime.title;
  const url = SERVERS[0].getUrl(title, ep, malId);

  container.innerHTML = `
    <iframe
      src="${url}"
      allowfullscreen
      allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
      referrerpolicy="no-referrer"
      style="width:100%;height:100%;border:none;display:block"
      onerror="this.style.display='none';document.getElementById('player-err').style.display='flex'"
    ></iframe>
    <div id="player-err" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;flex-direction:column;gap:0.8rem;background:#000;color:#9ca3af;font-size:0.9rem">
      <span style="font-size:2rem">⚠️</span>
      <p>This server didn't load. Try a different one below.</p>
    </div>
  `;
}

export function renderServerTabs(container, anime, ep) {
  const malId = anime.mal_id;
  const title = anime.title_english || anime.title;

  container.innerHTML = `
    <div class="server-section">
      <h3>Servers — try another if one doesn't load</h3>
      <div class="server-tabs">
        ${SERVERS.map((s, i) => `
          <button class="server-btn ${i === 0 ? 'active' : ''}"
                  data-server-id="${s.id}"
                  data-url="${escapeAttr(s.getUrl(title, ep, malId))}">
            <span class="dot"></span>${s.icon} ${s.name}
          </button>
        `).join('')}
      </div>
    </div>
  `;

  container.querySelectorAll('.server-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.server-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const iframe = document.querySelector('.player-wrap iframe');
      if (iframe) iframe.src = btn.dataset.url;
    });
  });
}

export function updatePlayer(anime, ep) {
  const iframe = document.querySelector('.player-wrap iframe');
  const activeBtn = document.querySelector('.server-btn.active');
  if (!iframe || !activeBtn) return;

  const server = SERVERS.find(s => s.id === activeBtn.dataset.serverId);
  if (!server) return;

  const malId = anime.mal_id;
  const title = anime.title_english || anime.title;
  iframe.src = server.getUrl(title, ep, malId);
}

function escapeAttr(str) {
  return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
