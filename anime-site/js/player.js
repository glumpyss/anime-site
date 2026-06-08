// All servers use MAL ID — purpose-built embed endpoints
export const SERVERS = [
  // ── Tier 1: Most reliable ──────────────────────────────
  { id: 's1',  name: 'VidSrc',      tag: 'SUB',  getUrl: (t,e,id) => `https://vidsrc.me/embed/anime?mal=${id}&ep=${e}` },
  { id: 's2',  name: 'VidSrc 2',    tag: 'SUB',  getUrl: (t,e,id) => `https://vidsrc.to/embed/anime/${id}/${e}` },
  { id: 's3',  name: 'VidSrc Pro',  tag: 'SUB',  getUrl: (t,e,id) => `https://vidsrc.xyz/embed/anime?mal=${id}&ep=${e}` },
  { id: 's4',  name: 'Embed.su',    tag: 'SUB',  getUrl: (t,e,id) => `https://embed.su/embed/anime/${id}/${e}` },
  { id: 's5',  name: '2Embed',      tag: 'SUB',  getUrl: (t,e,id) => `https://www.2embed.cc/embedanime/${id}/${e}` },
  // ── Tier 2: Good coverage ──────────────────────────────
  { id: 's6',  name: 'SmashyStream',tag: 'SUB',  getUrl: (t,e,id) => `https://player.smashystream.com/anime/${id}/${e}` },
  { id: 's7',  name: 'AutoEmbed',   tag: 'SUB',  getUrl: (t,e,id) => `https://autoembed.co/anime/mal/${id}/${e}` },
  { id: 's8',  name: 'NontonAnime', tag: 'SUB',  getUrl: (t,e,id) => `https://www.NontonAnime.bid/embed/mal/${id}/${e}` },
  { id: 's9',  name: 'AniPlay',     tag: 'SUB',  getUrl: (t,e,id) => `https://aniplay.co/embed/anime/${id}/${e}` },
  { id: 's10', name: 'AnimeOwl',    tag: 'SUB',  getUrl: (t,e,id) => `https://animeowl.live/anime/${id}/ep-${e}` },
  // ── Tier 3: Alternate sources ──────────────────────────
  { id: 's11', name: 'VidSrc CC',   tag: 'SUB',  getUrl: (t,e,id) => `https://vidsrc.cc/v2/embed/anime/${id}/${e}` },
  { id: 's12', name: 'VidSrc In',   tag: 'SUB',  getUrl: (t,e,id) => `https://vidsrc.in/embed/anime?mal=${id}&ep=${e}` },
  { id: 's13', name: 'VidSrc Net',  tag: 'SUB',  getUrl: (t,e,id) => `https://vidsrc.net/embed/anime?mal=${id}&ep=${e}` },
  { id: 's14', name: 'VidSrc PM',   tag: 'SUB',  getUrl: (t,e,id) => `https://vidsrc.pm/embed/anime/${id}/${e}` },
  { id: 's15', name: 'EmbedSito',   tag: 'SUB',  getUrl: (t,e,id) => `https://embedsito.com/animex/${id}/ep/${e}` },
  // ── Tier 4: Multi-source players ──────────────────────
  { id: 's16', name: 'MultiEmbed',  tag: 'MULTI',getUrl: (t,e,id) => `https://multiembed.mov/directstream.php?video_id=${id}&mal=1&s=1&e=${e}` },
  { id: 's17', name: 'AllEmbed',    tag: 'SUB',  getUrl: (t,e,id) => `https://allembed.xyz/embed/anime/${id}/${e}` },
  { id: 's18', name: 'MovEmbedder', tag: 'SUB',  getUrl: (t,e,id) => `https://www.movembedder.com/anime?mal=${id}&ep=${e}` },
  { id: 's19', name: 'EmbedAnime',  tag: 'SUB',  getUrl: (t,e,id) => `https://embedanime.art/embed/${id}/${e}` },
  { id: 's20', name: 'AnimeXin',    tag: 'SUB',  getUrl: (t,e,id) => `https://animexin.vip/embed/${id}/${e}` },
  // ── Tier 5: Dub sources ───────────────────────────────
  { id: 's21', name: 'VidSrc Dub',  tag: 'DUB',  getUrl: (t,e,id) => `https://vidsrc.me/embed/anime?mal=${id}&ep=${e}&ds_lang=en` },
  { id: 's22', name: 'VidSrc2 Dub', tag: 'DUB',  getUrl: (t,e,id) => `https://vidsrc.to/embed/anime/${id}/${e}?ds_lang=en` },
  { id: 's23', name: 'AniDub',      tag: 'DUB',  getUrl: (t,e,id) => `https://embed.su/embed/anime/${id}/${e}?dub=1` },
  { id: 's24', name: 'DubStream',   tag: 'DUB',  getUrl: (t,e,id) => `https://autoembed.co/anime/mal/${id}/${e}?dub=1` },
  { id: 's25', name: '2Embed Dub',  tag: 'DUB',  getUrl: (t,e,id) => `https://www.2embed.cc/embedanime/${id}/${e}?lang=en` },
  // ── Tier 6: Extra fallbacks ───────────────────────────
  { id: 's26', name: 'CineEmbed',   tag: 'SUB',  getUrl: (t,e,id) => `https://cineembed.com/embed/anime/${id}/${e}` },
  { id: 's27', name: 'Smashy Dub',  tag: 'DUB',  getUrl: (t,e,id) => `https://player.smashystream.com/anime/${id}/${e}?lang=dub` },
  { id: 's28', name: 'VidSrc Dev',  tag: 'SUB',  getUrl: (t,e,id) => `https://vidsrc.dev/embed/anime/${id}/${e}` },
  { id: 's29', name: 'FlixEmbed',   tag: 'SUB',  getUrl: (t,e,id) => `https://flixembed.net/anime/${id}/${e}` },
  { id: 's30', name: 'AniMixPlay',  tag: 'SUB',  getUrl: (t,e,id) => `https://animixplay.to/v1/mal${id}` },
];

const TAG_COLORS = {
  SUB:   { bg: 'rgba(6,182,212,0.15)',  border: 'rgba(6,182,212,0.4)',  color: '#22d3ee' },
  DUB:   { bg: 'rgba(168,85,247,0.15)', border: 'rgba(168,85,247,0.4)', color: '#c084fc' },
  MULTI: { bg: 'rgba(251,191,36,0.15)', border: 'rgba(251,191,36,0.4)', color: '#fbbf24' },
};

function tagBadge(tag) {
  const c = TAG_COLORS[tag] || TAG_COLORS.SUB;
  return `<span style="font-size:0.58rem;font-weight:700;padding:1px 5px;border-radius:3px;background:${c.bg};border:1px solid ${c.border};color:${c.color}">${tag}</span>`;
}

export function renderPlayer(container, anime, ep) {
  const url = SERVERS[0].getUrl(anime.title_english || anime.title, ep, anime.mal_id);
  container.innerHTML = `
    <iframe
      id="main-iframe"
      src="${url}"
      allowfullscreen
      allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
      referrerpolicy="no-referrer"
      style="width:100%;height:100%;border:none;display:block"
    ></iframe>
  `;
}

export function renderServerTabs(container, anime, ep) {
  const title = anime.title_english || anime.title;
  const id = anime.mal_id;

  container.innerHTML = `
    <div class="server-strip">
      <div class="server-strip-label">Select Server</div>
      <div class="server-tabs" id="server-tabs-inner">
        ${SERVERS.map((s, i) => `
          <button class="server-btn ${i === 0 ? 'active' : ''}"
            data-sid="${s.id}"
            data-url="${escapeAttr(s.getUrl(title, ep, id))}">
            <span class="sdot"></span>${s.name} ${tagBadge(s.tag)}
          </button>
        `).join('')}
      </div>
    </div>
  `;

  container.querySelectorAll('.server-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.server-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const iframe = document.getElementById('main-iframe');
      if (iframe) iframe.src = btn.dataset.url;
    });
  });
}

export function updatePlayer(anime, ep) {
  const iframe = document.getElementById('main-iframe');
  const activeBtn = document.querySelector('#server-tabs-inner .server-btn.active');
  if (!iframe || !activeBtn) return;
  const server = SERVERS.find(s => s.id === activeBtn.dataset.sid);
  if (!server) return;
  iframe.src = server.getUrl(anime.title_english || anime.title, ep, anime.mal_id);
}

function escapeAttr(str) {
  return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
