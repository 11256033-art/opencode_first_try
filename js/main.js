(() => {
  const doc = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------------------------------------------------------------------
     local clock (Taipei)
     --------------------------------------------------------------------- */

  const clock = document.getElementById('clock');
  const timeFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Taipei',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  function tickClock() {
    if (!clock) return;
    const now = new Date();
    clock.textContent = timeFormatter.format(now);
    clock.dateTime = now.toISOString();
  }

  tickClock();
  window.setInterval(tickClock, 1000);

  /* ---------------------------------------------------------------------
     staggered list reveals (content is visible by default)
     --------------------------------------------------------------------- */

  const revealGroups = [
    { selector: '.project-list li', type: 'rise', step: 55 },
    { selector: '.ds-row', type: 'fade', step: 40 },
    { selector: '.entry', type: 'fade', step: 45 },
    { selector: '.contact-mail', type: 'fade', step: 0 }
  ];

  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });

    revealGroups.forEach((group) => {
      document.querySelectorAll(group.selector).forEach((el, index) => {
        const box = el.getBoundingClientRect();
        if (box.top < window.innerHeight * 0.92) return;
        el.dataset.anim = group.type;
        el.style.setProperty('--i', String(index));
        revealObserver.observe(el);
      });
    });
  }

  /* ---------------------------------------------------------------------
     project dialog
     --------------------------------------------------------------------- */

  const dialog = document.getElementById('project-dialog');
  const dialogBody = document.getElementById('dialog-body');
  const dialogCode = document.getElementById('dialog-code');
  const closeButton = dialog ? dialog.querySelector('.dialog-close') : null;
  let lastTrigger = null;

  function openProject(trigger) {
    if (!dialog || !dialogBody) return;
    const template = document.getElementById(`tpl-${trigger.dataset.project}`);
    if (!template) return;

    const fragment = template.content.cloneNode(true);
    dialogBody.replaceChildren(fragment);
    if (dialogCode) dialogCode.textContent = trigger.dataset.code || 'CASE';

    lastTrigger = trigger;
    dialog.scrollTop = 0;
    dialog.showModal();
    doc.classList.add('dialog-open');
  }

  function closeProject() {
    if (dialog && dialog.open) dialog.close();
  }

  document.querySelectorAll('[data-project]').forEach((trigger) => {
    trigger.addEventListener('click', () => openProject(trigger));
  });

  if (dialog) {
    if (closeButton) closeButton.addEventListener('click', closeProject);

    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) closeProject();
    });

    dialog.addEventListener('close', () => {
      doc.classList.remove('dialog-open');
      dialogBody.replaceChildren();
      if (lastTrigger) {
        lastTrigger.focus();
        lastTrigger = null;
      }
    });
  }

  /* ---------------------------------------------------------------------
     copy email
     --------------------------------------------------------------------- */

  const copyButton = document.querySelector('.copy-btn');
  const copyNote = document.getElementById('copy-note');
  let copyTimer = 0;

  function legacyCopy(text) {
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.top = '-1000px';
    document.body.appendChild(field);
    field.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (error) {
      ok = false;
    }
    field.remove();
    return ok;
  }

  async function copyEmail() {
    if (!copyButton) return;
    const value = copyButton.dataset.copy || '';
    let copied = false;

    try {
      await navigator.clipboard.writeText(value);
      copied = true;
    } catch (error) {
      copied = legacyCopy(value);
    }

    window.clearTimeout(copyTimer);
    copyButton.classList.toggle('is-copied', copied);
    copyButton.textContent = copied ? '已複製' : '複製失敗';
    if (copyNote) {
      copyNote.textContent = copied ? '地址已複製到剪貼簿。' : '請手動選取上方地址。';
    }

    copyTimer = window.setTimeout(() => {
      copyButton.classList.remove('is-copied');
      copyButton.textContent = '複製地址';
      if (copyNote) copyNote.textContent = '';
    }, 2600);
  }

  if (copyButton) copyButton.addEventListener('click', copyEmail);

  /* ---------------------------------------------------------------------
     mobile menu
     --------------------------------------------------------------------- */

  const menu = document.querySelector('.mobile-menu');
  if (menu) {
    const menuSummary = menu.querySelector('summary');

    menu.addEventListener('toggle', () => {
      if (menuSummary) menuSummary.setAttribute('aria-label', menu.open ? '關閉選單' : '開啟選單');
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => { menu.open = false; });
    });

    document.addEventListener('click', (event) => {
      if (menu.open && !menu.contains(event.target)) menu.open = false;
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.open) {
        menu.open = false;
        const summary = menu.querySelector('summary');
        if (summary) summary.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 860 && menu.open) menu.open = false;
    });
  }

  /* ---------------------------------------------------------------------
     current section in navigation
     --------------------------------------------------------------------- */

  const sectionIds = ['work', 'capabilities', 'experience', 'contact'];
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"], .menu-panel a[href^="#"]');
  let navFrame = 0;

  function updateCurrentSection() {
    navFrame = 0;
    const line = window.scrollY + window.innerHeight * 0.42;
    let currentId = '';

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section && section.offsetTop <= line) currentId = id;
    });

    navLinks.forEach((link) => {
      if (link.getAttribute('href') === `#${currentId}`) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function requestNavUpdate() {
    if (navFrame) return;
    navFrame = window.requestAnimationFrame(updateCurrentSection);
  }

  window.addEventListener('scroll', requestNavUpdate, { passive: true });
  window.addEventListener('resize', requestNavUpdate);
  updateCurrentSection();
})();
