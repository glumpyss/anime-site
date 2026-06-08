// Servers that allow iframe embedding — no redirects, plays on-site
export const SERVERS = [
  {
    id: 'animepahe',
    name: 'AnimePahe',
    icon: '🟣',
    getUrl: (title, ep) =>
      `https://animepahe.ru/play/${encodeURIComponent(title)}/${ep}`
  },
  {
    id: 'embedsu',
    name: 'Embed.su',
    icon: '🟢',
    getUrl: (title, ep, malId) =>
      `https://embed.su/embed/anime/${malId}/${ep}`
  },
  {
    id: 'vidsrc',
    name: 'VidSrc',
    icon: '🔵',
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
    id: '2anime',
    name: '2Anime',
    icon: '🟠',
    getUrl: (title, ep, malId) =>
      `https://2anime.xyz/embed/${malId}/${ep}`
  },
  {
    id: 'trace',
    name: 'AnimeOwl',
    icon: '🦉',
    getUrl: (title, ep, malId) =>
      `https://animeowl.me/anime-embed/${malId}?ep=${ep}`
  }
];

export function renderPlayer(container, anime, ep) {
  const malId = anime.mal_id;
  const title = anime.title_english || anime.title;
  const server = SERVERS[0];
  const url = server.getUrl(title, ep, malId);

  container.innerHTML = `
    <iframe
      src="${url}"
      allowfullscreen
      allow="autoplay; fullscreen; picture-in-picture"
      referrerpolicy="no-referrer"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
      style="width:100%;height:100%;border:none;display:block"
    ></iframe>
  `;
}

export function renderServerTabs(container, anime, ep) {
  const malId = anime.mal_id;
  const title = anime.title_english || anime.title;

  container.innerHTML = `
    <div class="server-section">
      <h3>Servers</h3>
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

// Called when episode changes — updates iframe src using active server
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
