const heroCopy = {
  announcement: 'NOW RECRUITING — SELECT OPENINGS ACROSS THE U.S.',
  eyebrow: 'Giddens Organization Careers',
  headlineLead: 'Build a Career That',
  headlineEmphasis: 'Pays You What You’re Worth.',
  supporting:
    'Join a performance-driven life insurance sales organization offering warm leads, structured training, remote flexibility, leadership development, and uncapped commission potential.',
  transparency:
    'Independent contractor opportunity. Commission-based compensation. Life insurance licensing required. Earnings are not guaranteed.',
  primaryCta: 'Reserve My Spot — Apply Free',
  secondaryCta: 'See How It Works',
  helper: 'Free to apply · No experience required · Takes about 2 minutes',
};

function announcementBar(text) {
  return `<div class="announcement" aria-label="Recruiting status">${text}</div>`;
}

function videoPlaceholder() {
  return `
    <div class="video-card" aria-label="Company overview video placeholder">
      <div class="video-sheen" aria-hidden="true"></div>
      <button class="play-button" aria-label="Play company overview video" type="button">
        <span aria-hidden="true"></span>
      </button>
      <p>Watch the Company Overview</p>
    </div>
  `;
}

function overviewCountdownPlaceholder() {
  return `
    <section class="overview-countdown" aria-labelledby="overview-countdown-title">
      <p id="overview-countdown-title">NEXT COMPANY OVERVIEW</p>
      <div class="countdown-placeholder" data-countdown-ready="false">Schedule coming soon</div>
    </section>
  `;
}

function heroSection(copy) {
  return `
    <main class="hero-shell">
      <section class="hero-section" aria-labelledby="hero-title">
        <div class="hero-content">
          ${announcementBar(copy.announcement)}
          <div class="hero-copy">
            <p class="eyebrow">${copy.eyebrow}</p>
            <h1 id="hero-title">${copy.headlineLead} <span>${copy.headlineEmphasis}</span></h1>
            <p class="supporting-copy">${copy.supporting}</p>
            <p class="transparency-copy">${copy.transparency}</p>
          </div>
          ${videoPlaceholder()}
          <div class="hero-actions" aria-label="Application actions">
            <a class="button button-primary" href="#apply">${copy.primaryCta}</a>
            <a class="button button-secondary" href="#how-it-works">${copy.secondaryCta}</a>
          </div>
          <p class="helper-text">${copy.helper}</p>
          ${overviewCountdownPlaceholder()}
        </div>
      </section>
    </main>
  `;
}

const app = document.querySelector('#app');

if (app) {
  app.innerHTML = heroSection(heroCopy);
}
