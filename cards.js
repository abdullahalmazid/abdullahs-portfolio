// ═══════════════════════════════════════════
// cards.js — dynamic content loader
// Uses Lucide icons + image support
// ═══════════════════════════════════════════

async function loadCollection(type, containerId, renderFn) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const data = window.portfolioData && window.portfolioData[type];
    if (!data) throw new Error(`Data for ${type} not found in window.portfolioData`);
    container.innerHTML = renderFn(data);

    // Init Lucide icons rendered inside container
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }

    // Scroll reveal
    setTimeout(() => {
      const roFallback = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
      container.querySelectorAll('.reveal').forEach(el => roFallback.observe(el));
    }, 80);

  } catch (error) {
    console.error(`Error loading ${type}:`, error);
    container.innerHTML = `<p style="color:var(--crimson-dark);padding:24px 0">Could not load ${type} data. Check the console for details.</p>`;
  }
}

// ── Lucide icon helper ────────────────────
function icon(name, size = 18) {
  return `<i data-lucide="${name}" style="width:${size}px;height:${size}px;flex-shrink:0"></i>`;
}

// ── Render functions ──────────────────────
const renderers = {

  projects: (items) => {
    const delays = ['d1', 'd2', 'd3', 'd4', 'd5'];
    const thumbColors = ['#f5ede8', '#ede8e5', '#f2ebe5', '#e9e3de', '#f0e9e4', '#e6e0db'];
    let html = '';
    items.forEach((item, i) => {
      const delay = delays[i % delays.length];
      const bg    = thumbColors[i % thumbColors.length];
      const link  = (item.links && item.links[0]) ? `projects/${item.slug}.html` : '#';
      const chips = item.tags.map(t => `<span class="proj-chip">${t}</span>`).join('');

      // Image or fallback icon block
      const thumb = `
        <div class="proj-thumb" style="background:${bg}">
          <img src="${item.image || ''}"
               alt="${item.title}"
               loading="lazy"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
               style="width:100%;height:100%;object-fit:cover;display:block"/>
          <div class="proj-thumb-fallback" style="display:none;width:100%;height:100%;align-items:center;justify-content:center;background:${bg}">
            ${icon(item.icon || 'layers', 40)}
          </div>
        </div>`;

      html += `
      <div class="proj-card reveal ${delay}">
        <a href="${link}" style="display:contents">
          ${thumb}
        </a>
        <div class="proj-body">
          <div class="proj-chips">${chips}</div>
          <div class="proj-title">${item.title}</div>
          <p class="proj-desc">${item.summary}</p>
          <div class="proj-links">
            <a href="${link}" class="proj-link fill">
              View Detail ${icon('arrow-up-right', 14)}
            </a>
          </div>
        </div>
      </div>`;
    });
    return html;
  },

  publications: (items) => {
    let html = '';
    items.forEach(item => {
      const detailUrl = `publications/${item.slug}.html`;
      html += `
      <div class="pub-item reveal">
        <div class="pub-yr">
          <span class="pub-yr-n">${item.year}</span>
          <span class="tag ${item.tag.class}" style="margin-top:7px;font-size:.62rem;display:inline-block">${item.tag.label}</span>
        </div>
        <div>
          <div class="pub-title">${item.title}</div>
          <div class="pub-venue">${item.venue}</div>
          <div class="pub-authors">${item.authors}</div>
          <p class="pub-abstract">${item.abstract}</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:2px">
            <a href="${detailUrl}" class="pub-link">
              ${icon('file-text', 13)} View Details
            </a>
            ${item.doi ? `<a href="${item.doi}" target="_blank" rel="noopener" class="pub-link">
              ${icon('external-link', 13)} DOI ↗
            </a>` : ''}
          </div>
        </div>
      </div>`;
    });
    return html;
  },

  education: (items) => {
    let html = '';
    items.forEach(item => {
      const meta = (item.meta || []).map(m => `<span>${m}</span>`).join('');
      html += `
      <div class="tl-item reveal">
        <div class="tl-dot-col"><div class="tl-dot ${item.dotClass}"></div></div>
        <div class="tl-card">
          <div class="tl-top">
            <div>
              <div class="tl-title">${item.degree}</div>
              <div class="tl-org">${item.institution}</div>
            </div>
            <span class="tag ${item.status.class}">${item.status.label}</span>
          </div>
          <div class="tl-meta">${meta}</div>
          <p class="tl-desc">${item.summary}</p>
        </div>
      </div>`;
    });
    return html;
  },

  experience: (items) => {
    let html = '';
    items.forEach(item => {
      const meta  = (item.meta || []).map(m => `<span>${m}</span>`).join('');
      const chips = (item.chips || []).length
        ? `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:12px">${item.chips.map(c => `<span class="chip">${c}</span>`).join('')}</div>`
        : '';
      html += `
      <div class="tl-item reveal">
        <div class="tl-dot-col"><div class="tl-dot ${item.dotClass}"></div></div>
        <div class="tl-card">
          <div class="tl-top">
            <div>
              <div class="tl-title">${item.role}</div>
              <div class="tl-org">${item.company}</div>
            </div>
            <span class="tag ${item.status.class}">${item.status.label}</span>
          </div>
          <div class="tl-meta">${meta}</div>
          <p class="tl-desc">${item.summary}</p>
          ${chips}
        </div>
      </div>`;
    });
    return html;
  },

  skills: (data) => {
    let html = '';

    // Category icons using Lucide
    const catIcons = {
      'Supply Chain & OR': 'package',
      'Engineering Tools': 'settings-2',
      'Programming & Analytics': 'code-2',
      'Machine Learning & IoT': 'brain-circuit'
    };

    if (data.categories) {
      html += `<div class="skill-grid">`;
      data.categories.forEach((cat, i) => {
        const lucideIcon = catIcons[cat.name] || 'layers';
        const chips = cat.skills.map(s => `<span class="chip">${s}</span>`).join('');
        const delay = ['d1','d2','d3','d4'][i] || '';
        html += `
        <div class="skill-card reveal ${delay}">
          <div class="skill-name">
            <span class="s-icon">${icon(lucideIcon, 17)}</span>
            ${cat.name}
          </div>
          <div class="chips">${chips}</div>
        </div>`;
      });
      html += `</div>`;
    }

    if (data.proficiencies) {
      const half = Math.ceil(data.proficiencies.length / 2);
      const col = (arr) => arr.map(p => `
        <div style="margin-bottom:18px">
          <div style="font-size:.85rem;font-weight:600;color:var(--ink);margin-bottom:7px;display:flex;justify-content:space-between">
            <span>${p.name}</span>
            <span style="color:var(--crimson-dark);font-family:'DM Mono',monospace;font-size:.78rem">${p.level}</span>
          </div>
          <div style="height:6px;background:var(--gray-100);border-radius:99px;overflow:hidden">
            <div style="height:100%;width:${p.level};background:linear-gradient(90deg,var(--crimson-dark),var(--crimson));border-radius:99px"></div>
          </div>
        </div>`).join('');

      html += `
      <div style="margin-top:56px">
        <div class="sec-head">
          <div class="eyebrow reveal">Proficiency</div>
          <h2 class="heading reveal">Core <em>Strengths</em></h2>
        </div>
        <div class="prof-grid reveal">
          <div>${col(data.proficiencies.slice(0, half))}</div>
          <div>${col(data.proficiencies.slice(half))}</div>
        </div>
      </div>`;
    }
    return html;
  }
};
