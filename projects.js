// Dynamic projects grid + modal + filters
document.addEventListener('DOMContentLoaded', () => {
  const projects = [
    {
      id: 'bytes-of-love',
      title: 'Bytes of Love',
      image: 'content/Images/BoL.png',
      excerpt: 'Interactive visual novel teaching programming concepts through storytelling.',
  description: `A collaborative visual novel developed with the UF Open Source Club that creatively introduces programming concepts through interactive storytelling. Features multiple storylines teaching various programming languages through engaging character interactions and coding challenges.`,
  longDescription: `A collaborative visual novel developed with the UF Open Source Club that creatively introduces programming concepts through interactive storytelling. Features multiple storylines teaching various programming languages through engaging character interactions and coding challenges. This project focuses on pedagogy through narrative, with branching paths and interactive puzzles that reinforce coding concepts in an approachable way.`,
      links: [{label:'Live', href:'https://www.bytesoflove.net/' }],
      tags: ['Opensource','Education']
    },
    {
      id: 'e-portfolio',
      title: 'E-Portfolio',
      image: 'content/Images/logo.png',
      excerpt: 'Personal website with interactive features (dark mode, game).',
  description: `A fully responsive personal portfolio website built from scratch using HTML, CSS, and JavaScript. Features interactive elements including a dark/light mode toggle, an embedded Snake game, and dynamic content sections. Please click the link below to view the repository. Feel free to explore the rest of my website, and try to find the hidden Snake game!`,
  longDescription: `A fully responsive personal portfolio website built from scratch using HTML, CSS, and JavaScript. Features interactive elements including a dark/light mode toggle, an embedded Snake game, dynamic content sections, and progressive enhancement for accessibility. The codebase demonstrates layout, responsive patterns, and small web games integrated seamlessly into a personal site. Repository link included for code review.`,
      links: [
        {label:'Repo', href:'https://github.com/giannaf5027/giannaf5027.github.io'}, 
        {label:'Snake Game', href:'#', onclick: 'openSnakeModal(); return false;'}
      ],
      tags: ['Web','Portfolio', 'AI']
    },
    {
      id: 'sign-in-page',
      title: 'Sign in Page',
      image: 'content/Images/osc.png',
      excerpt: 'Club management system with attendance, virtual currency, and games.',
  description: `Comprehensive club management system originally for the UF Open Source Club, later adopted by the Computing Student Union. Features automated attendance tracking, virtual currency, and interactive minigames.`,
  longDescription: `Comprehensive club management system originally for the UF Open Source Club, later adopted by the Computing Student Union. Includes automated attendance tracking, a points-based virtual currency, role-based access control, and lightweight minigames to encourage engagement. Built with maintainability and extensibility in mind for campus organizations.`,
      links: [],
      tags: ['Opensource','Product','UF']
    },
    {
      id: 'just-stop',
      title: 'Just Stop',
      image: 'content/Images/Just_Stop.png',
      excerpt: 'Interactive awareness app that simulates panic attacks and coping strategies.',
  description: `An immersive web application developed for Swamphacks that simulates and raises awareness about panic attacks. Combines interactive elements with mental health education. Please click the link below to view the repository for implementation details and source.`,
  longDescription: `An immersive web application developed for Swamphacks that simulates and raises awareness about panic attacks. Combines guided interactive scenarios with coping strategies and educational material. The project emphasizes empathy-driven design, clear content warnings, and resources for users seeking help.`,
      links: [{label:'Repo', href:'https://github.com/Srsi3/RetroGames'}],
      tags: ['Hackathon','Awareness']
    },
    {
      id: 'cooking-quest',
      title: 'Cooking Quest',
      image: 'content/Images/cq_logo.png',
      excerpt: 'Gamified recipe discovery and progression.',
  description: `An innovative recipe discovery platform that gamifies the cooking experience. Integrates a dynamic recipe search engine with level progression and achievements.`,
  longDescription: `An innovative recipe discovery platform that gamifies the cooking experience. Users unlock levels and achievements by trying recipes, adding photos, and completing themed cooking quests. Includes a flexible search and filter system, user profiles, and progress tracking to encourage exploration.`,
      links: [],
      tags: ['Product','Web']
    },
    {
      id: 'mythos',
      title: 'Mythos Exterior Cleaning',
      image: 'content/Images/mythos_logo.png',
      excerpt: 'Commissioned site for a local exterior cleaning business.',
  description: `Commissioned business website with service catalog, quote request form, image gallery, and local SEO optimization. Please click the link below to view the live project.`,
  longDescription: `Commissioned business website built for a local exterior cleaning company. Includes a service catalog, quote request form with validation, an image gallery, contact integration, and basic SEO improvements. Designed for conversions with clear calls-to-action and responsive presentation.`,
      links: [{label:'Live', href:'https://mythos-website-xi.vercel.app/'}],
      tags: ['Client','Business']
    },
    {
      id: 'tutoring-site',
      title: 'Tutoring Website',
      image: 'content/Images/t_logo.png',
      excerpt: 'Tutoring platform with intelligent matching and scheduling.',
  description: `A tutoring platform with intelligent matching by subject, availability, and learning preferences. Includes real-time scheduling and progress tracking.`,
  longDescription: `A tutoring platform featuring intelligent matching between tutors and students based on subject expertise, availability, and learning preferences. Includes real-time scheduling, notifications, secure booking flow, and progress tracking to monitor learning outcomes.`,
      links: [{label:'Live', href:'https://tutoring-hazel.vercel.app/'}],
      tags: ['Client','Business']
    },
    {
      id: 'portfolio-fg',
      title: 'Portfolio Website (FG)',
      image: 'content/Images/fg_logo.png',
      excerpt: 'Actor portfolio with media showcase and reels.',
  description: `Custom portfolio for an actor featuring media showcase and performance reel integration. Optimized for casting directors.`,
  longDescription: `Custom portfolio built for an actor, featuring a media gallery, integrated reels, headshots, and contact forms for casting directors. Prioritizes fast media loading and clear presentation of credits and performance highlights.`,
      links: [],
      tags: ['Client','Portfolio']
    },
    {
      id: 'gator-lawn',
      title: 'Gator Lawn Solutions',
      image: 'content/Images/gl-logo.png',
      excerpt: 'Business site with booking system made for class project.',
  description: `Business website with service listings, testimonials, and an integrated booking flow. Built as part of a class project.`,
  longDescription: `Business website built as a class project, showcasing service listings, testimonials, an integrated booking flow, and a simple admin panel for managing bookings. Focused on UX and practical deployment considerations.`,
      links: [{label:'Live', href:'https://gator-lawn.vercel.app/'}],
      tags: ['Class','Business']
    },
    {
      id: 'gator-gabber',
      title: 'Gator Gabber',
      image: 'content/Images/gatorGabber.png',
      excerpt: 'AI chatbot for practicing Spanish conversation (GatorHacks).',
  description: `An AI-powered chatbot built for GatorHacks 2025 to help UF students practice Spanish conversation with NLP-driven feedback. Click the link below to try the live site and explore the NLP pipeline and dataset examples.`,
  longDescription: `An AI-powered chatbot prototype created for GatorHacks 2025 to help students practice Spanish conversation. Includes an NLP pipeline for intent recognition, feedback mechanisms for pronunciation and grammar, and anonymized example datasets. Deployed as a demo with links to the research notes and code.`,
      links: [{label:'Live', href:'https://gatorgabber.vercel.app/'}, {label:'Instagram', href: 'https://www.instagram.com/p/DRCawBdjfin/'}],
      tags: ['Hackathon','AI', 'Education']
    }
  ];

  const grid = document.getElementById('projectsGrid');
  const filtersEl = document.getElementById('filters');
  const searchInput = document.getElementById('projectSearch');

  // derive tags
  const allTags = new Set();
  projects.forEach(p=> p.tags.forEach(t=> allTags.add(t)));

  // build filter buttons
  const tagList = ['all', ...Array.from(allTags)];
  tagList.forEach(tag=>{
    const btn = document.createElement('button');
    btn.className = 'filter-btn'+(tag==='all'?' active':'');
    btn.dataset.tag = tag;
    btn.textContent = tag==='all'? 'All' : tag[0].toUpperCase()+tag.slice(1);
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      renderGrid();
    });
    filtersEl.appendChild(btn);
  });

  function renderGrid(){
    const activeTag = document.querySelector('.filter-btn.active')?.dataset.tag || 'all';
    const q = (searchInput.value||'').toLowerCase().trim();
    grid.innerHTML = '';
    const shown = projects.filter(p=>{
      const matchesTag = (activeTag==='all') || p.tags.includes(activeTag);
      const matchesQuery = !q || (p.title+ ' '+ p.excerpt + ' ' + p.description).toLowerCase().includes(q);
      return matchesTag && matchesQuery;
    });

    if(shown.length===0){
      grid.innerHTML = '<div class="empty-state">No projects match your filters.</div>';
      return;
    }

    shown.forEach(p=>{
      const card = document.createElement('article');
      card.className = 'project-card';
      card.tabIndex = 0;
      card.innerHTML = `
        <img class="thumb" src="${p.image}" alt="${p.title}" />
        <div class="card-body">
          <h3 class="project-title">${p.title}</h3>
          <p class="project-excerpt">${p.excerpt}</p>
          <div class="card-footer">
            <div class="tag-pill">${p.tags.join(', ')}</div>
            <div style="flex:1"></div>
            <a class="card-link" href="#" data-id="${p.id}">Details</a>
          </div>
        </div>
      `;
      // clicking anywhere opens modal
      card.addEventListener('click', (e)=>{
        if(e.target && e.target.matches('a')){ e.preventDefault(); }
        openModal(p);
      });
      grid.appendChild(card);
    });
  }

  // modal management
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalImage = document.getElementById('modalImage');
  const modalDescription = document.getElementById('modalDescription');
  const modalLinks = document.getElementById('modalLinks');
  const modalTags = document.getElementById('modalTags');
  const closeBtn = document.getElementById('closeProjectModal');

  function openModal(p){
    modal.setAttribute('aria-hidden','false');
    modalTitle.textContent = p.title;
    modalImage.src = p.image;
    modalImage.alt = p.title;
    // Render a longer, formatted description in the modal.
    // Support an explicit longDescription property, otherwise use description.
    const longDesc = p.longDescription || p.description || '';
    // Basic HTML-escape and paragraphify newlines for safe display
    function escapeHtml(str){
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
    const paragraphs = escapeHtml(longDesc).split(/\n\n+/).map(s => `<p>${s.replace(/\n/g, '<br>')}</p>`).join('');
    modalDescription.innerHTML = paragraphs;
    modalLinks.innerHTML = '';
    p.links.forEach(l=>{ const a = document.createElement('a'); a.href=l.href; a.target='_blank'; a.rel='noopener noreferrer'; a.textContent = l.label; modalLinks.appendChild(a); });
    modalTags.innerHTML = '';
    p.tags.forEach(t=>{ const s=document.createElement('span'); s.className='tag-pill'; s.textContent=t; modalTags.appendChild(s); });
    document.body.style.overflow = 'hidden';
  }

  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });

  searchInput.addEventListener('input', ()=> renderGrid());

  // initial render
  renderGrid();
});
