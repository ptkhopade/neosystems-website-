if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
const scrollToPageTop = () => window.scrollTo(0, 0);
scrollToPageTop();
window.addEventListener('pageshow', () => requestAnimationFrame(scrollToPageTop));

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
const header = document.querySelector('.site-header');

const updateHeaderElevation = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
updateHeaderElevation();
window.addEventListener('scroll', updateHeaderElevation, { passive: true });

toggle.type = 'button';
toggle.setAttribute('aria-label', 'Open menu');
toggle.innerHTML = '<span></span><span></span><span></span>';

const homeLink = nav.querySelector('a[href="#top"], a[href="index.html"]');
if (homeLink && !nav.querySelector('a[href="about.html"]')) {
  const aboutLink = document.createElement('a');
  aboutLink.href = 'about.html';
  aboutLink.textContent = 'About Us';
  homeLink.after(aboutLink);
}

if (!nav.querySelector('a[href="digital-launch.html"]')) {
  const digitalLaunchLink = document.createElement('a');
  digitalLaunchLink.href = 'digital-launch.html';
  digitalLaunchLink.textContent = 'Digital Launch';
  const servicesLink = nav.querySelector('a[href="services.html"]');
  if (servicesLink) servicesLink.after(digitalLaunchLink);
}

if (!nav.querySelector('.mobile-call-link')) {
  const mobileCallLink = document.createElement('a');
  mobileCallLink.className = 'mobile-call-link';
  mobileCallLink.href = 'tel:+917499711255';
  mobileCallLink.innerHTML = '<span>Call Neo Systems</span>+91 7499711255';
  nav.appendChild(mobileCallLink);
}

if (!nav.querySelector('.mobile-whatsapp-link')) {
  const mobileWhatsAppLink = document.createElement('a');
  mobileWhatsAppLink.className = 'mobile-whatsapp-link';
  mobileWhatsAppLink.href = 'https://wa.me/917499711255?text=Hello%20Neo%20Systems%2C%20I%20would%20like%20to%20discuss%20a%20requirement.';
  mobileWhatsAppLink.target = '_blank';
  mobileWhatsAppLink.rel = 'noopener noreferrer';
  mobileWhatsAppLink.innerHTML = '<span class="whatsapp-symbol" aria-hidden="true">☎</span><span class="mobile-whatsapp-copy"><span>WhatsApp Neo Systems</span>+91 7499711255</span>';
  nav.appendChild(mobileWhatsAppLink);
}

toggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.classList.toggle('is-open', isOpen);
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open menu');
}));

const serviceDetails = {
  neotimex: {
    title: 'NeoTimex',
    intro: 'A practical starting point for organisations reviewing how attendance information is captured, reviewed and reported.',
    focus: 'Begin with the current attendance workflow, the information managers need and the operational questions that matter most.',
    approach: 'NSIPL can help frame the discussion around rollout considerations, working practices and a verified product scope before a proposal or pilot is defined.'
  },
  cctv: {
    title: 'CCTV & IP Camera Surveillance',
    intro: 'Clear site visibility starts with a coverage plan built around the way a location actually operates.',
    focus: 'Review entry and exit points, critical work areas, perimeter priorities, lighting conditions and the level of oversight required.',
    approach: 'NSIPL supports requirement definition, system planning, deployment coordination and a practical handover approach for surveillance projects.'
  },
  'access-control': {
    title: 'Access Control Systems',
    intro: 'Controlled entry should support both security requirements and the day-to-day movement of people through a site.',
    focus: 'Clarify which areas need controlled access, how user permissions should be managed and what a usable handover requires.',
    approach: 'NSIPL can help structure the scope for access-control planning, setup and operational readiness.'
  },
  'video-door-phone': {
    title: 'Video Door Phones',
    intro: 'Visitor communication and entry control work best when they reflect the layout and routines of the premises.',
    focus: 'Consider visitor verification, internal communication points, entrance conditions and the experience required for staff and guests.',
    approach: 'NSIPL provides guidance for defining a video door-phone requirement that fits the operating environment.'
  },
  'computer-hardware': {
    title: 'Computer Hardware',
    intro: 'Reliable workplace technology begins with a clear understanding of the work each device needs to support.',
    focus: 'Discuss the operational use case, user needs, compatibility considerations and the support expectations around the hardware foundation.',
    approach: 'NSIPL can help clients assess suitable options and establish a practical procurement and support conversation.'
  },
  networking: {
    title: 'Networking & Infrastructure',
    intro: 'Dependable security systems and workplace technology rely on a network planned for the environment it serves.',
    focus: 'Review connectivity requirements, equipment locations, cabling routes, future expansion needs and the systems that depend on the network.',
    approach: 'NSIPL helps bring structure to network-infrastructure planning and deployment discussions before project scope is finalised.'
  }
};

const serviceCards = document.querySelectorAll('[data-service]');
if (serviceCards.length) {
  const serviceDialog = document.createElement('dialog');
  serviceDialog.className = 'service-dialog';
  serviceDialog.setAttribute('aria-labelledby', 'service-dialog-title');
  document.body.appendChild(serviceDialog);

  const showServiceDetail = (serviceKey) => {
    const detail = serviceDetails[serviceKey];
    if (!detail) return;
    serviceDialog.innerHTML = `<button class="service-dialog-close" type="button" aria-label="Close service details">×</button><p class="section-kicker">Service overview</p><h2 id="service-dialog-title">${detail.title}</h2><p class="service-dialog-intro">${detail.intro}</p><div class="service-dialog-points"><section><h3>What to consider</h3><p>${detail.focus}</p></section><section><h3>How NSIPL can help</h3><p>${detail.approach}</p></section></div><a class="button button-primary" href="contact.html">Discuss this requirement</a>`;
    serviceDialog.showModal();
    serviceDialog.querySelector('.service-dialog-close').focus();
  };

  serviceCards.forEach((card) => {
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-haspopup', 'dialog');
    card.setAttribute('aria-label', `Open details for ${card.querySelector('h3')?.textContent || 'this service'}`);
    card.addEventListener('click', () => showServiceDetail(card.dataset.service));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); showServiceDetail(card.dataset.service); }
    });
  });

  serviceDialog.addEventListener('click', (event) => {
    if (event.target === serviceDialog || event.target.closest('.service-dialog-close')) serviceDialog.close();
  });
}

if (window.location.pathname.endsWith('/digital-launch.html')) {
  const digitalHero = document.querySelector('.page-hero');
  if (digitalHero) {
    digitalHero.insertAdjacentHTML('afterend', `<section class="digital-3d-panel section" aria-labelledby="digital-3d-title"><div><p class="section-kicker">Digital experience</p><h2 id="digital-3d-title">One clear experience, designed for every screen.</h2><p>Responsive delivery keeps the business message consistent across desktop, tablet and mobile—while the content, interface and final scope remain tailored to the client.</p></div><picture><source type="image/webp" srcset="assets/visuals/digital-launch-3d-800.webp 800w, assets/visuals/digital-launch-3d-1360.webp 1360w" sizes="(max-width: 760px) 100vw, 48vw"><img src="assets/approach-plan.jpg" width="1360" height="765" loading="lazy" decoding="async" alt="Three-dimensional visual of a responsive website across desktop, tablet and mobile devices."></picture></section>`);
  }
}

// Approved V5 homepage composition. Kept here to preserve the shared static-site architecture.
if (window.location.pathname === '/' || window.location.pathname.endsWith('/index.html')) {
  document.body.classList.add('v5-home');
  const homeHeader = document.querySelector('.site-header');
  if (homeHeader) {
    homeHeader.classList.add('v5-header');
    homeHeader.querySelector('.wordmark')?.replaceWith(Object.assign(document.createElement('a'), { className: 'brand-logo', href: 'index.html', innerHTML: '<img src="assets/neo-systems-infrastructure-logo.png" width="600" height="181" alt="Neo Systems &amp; Infrastructure Pvt. Ltd.">' }));
    nav.innerHTML = '<a class="active" aria-current="page" href="index.html">Home</a><a href="services.html">Solutions</a><a href="neotimex.html">NeoTimex</a><a href="digital-launch.html">Digital Launch</a><a href="about.html">About</a><a href="contact.html">Contact</a><a class="nav-cta" href="contact.html">Get in Touch <span aria-hidden="true">→</span></a>';
  }
  const main = document.querySelector('main');
  if (main) main.innerHTML = `
    <section class="v5-hero" id="top" aria-labelledby="hero-title"><picture class="v5-hero-image"><source type="image/webp" srcset="assets/home/security-enterprise-800.webp 800w, assets/home/security-enterprise-1360.webp 1360w" sizes="100vw"><img src="assets/surveillance-hero.jpg" width="1440" height="810" fetchpriority="high" decoding="async" alt="CCTV camera and secure IT infrastructure in a modern business environment."></picture><div class="v5-shell hero-content"><h1 id="hero-title">Technology That<br>Protects, Connects &amp;<br><em>Powers Your Business.</em></h1><p>End-to-end solutions in security and surveillance, IT infrastructure, workforce solutions, and digital services to help businesses operate more securely, efficiently, and digitally.</p><div class="hero-actions"><a class="button button-primary" href="services.html">Explore Our Solutions <span aria-hidden="true">→</span></a><a class="button button-outline" href="contact.html">Contact Us</a></div></div></section>
    <section class="v5-shell solutions-strip" aria-label="NSIPL solutions"><a class="solution-card" href="services.html#security"><span class="solution-icon">◉</span><span><strong>Security &amp;<br>Surveillance</strong><small>CCTV, IP Cameras,<br>Access Control</small></span><b>→</b></a><a class="solution-card" href="services.html#infrastructure"><span class="solution-icon">▤</span><span><strong>IT Infrastructure</strong><small>Networking, Systems<br>&amp; Technical Support</small></span><b>→</b></a><a class="solution-card" href="neotimex.html"><span class="solution-icon">♟</span><span><strong>NeoTimex</strong><small>Employee Management<br>&amp; Payroll Solution</small></span><b>→</b></a><a class="solution-card" href="digital-launch.html"><span class="solution-icon">◎</span><span><strong>Digital Launch</strong><small>Website Development<br>&amp; SEO</small></span><b>→</b></a></section>
    <section class="v5-shell v5-benefits" aria-labelledby="why-title"><div class="benefits-copy"><h2 id="why-title">Why NSIPL</h2><p>Reliable technology solutions. Measurable business impact.</p></div><div class="benefit-grid"><article><span>♢</span><h3>Trusted &amp; Reliable</h3><p>Secure and dependable solutions.</p></article><article><span>⚙</span><h3>End-to-End Expertise</h3><p>From setup to support.</p></article><article><span>⌁</span><h3>Business-Centric</h3><p>Solutions for your growth.</p></article><article><span>↗</span><h3>Future-Ready</h3><p>Built for tomorrow.</p></article></div></section>
    <section class="v5-shell location-wrap"><div class="location-card"><div><span class="location-pin">●</span><h2>Our Service Locations</h2><p>NSIPL operates from Pune, Maharashtra, supporting confirmed onsite and remote requirements.</p><a class="coverage-button" href="contact.html">Check Coverage Areas <span aria-hidden="true">→</span></a></div><div class="india-mark" aria-hidden="true">INDIA</div></div></section>
    <section class="v5-shell feature-panel neotimex-panel" aria-labelledby="neo-title"><div class="feature-copy"><p class="panel-label">Mobile-First Solution</p><h2 id="neo-title">Neo<span>Timex</span></h2><h3>Employee Management &amp; Payroll</h3><p>A mobile-first solution to simplify employee attendance, workforce management, leave tracking, and salary administration.</p><ul><li>Employee &amp; Attendance Management</li><li>Leave &amp; Shift Management</li><li>Salary &amp; Payroll Processing</li><li>Employee &amp; Admin Access</li></ul><a class="button button-primary" href="neotimex.html">Explore NeoTimex <span aria-hidden="true">→</span></a></div><div class="product-visual"><img src="assets/neotimex-hero.jpg" width="1440" height="810" loading="lazy" decoding="async" alt="NeoTimex mobile-first attendance product illustration."></div></section>
    <section class="v5-shell feature-panel digital-panel" aria-labelledby="digital-title"><div class="feature-copy"><h2 id="digital-title">Digital Launch</h2><p>Professional, mobile-ready websites designed to help businesses establish a stronger digital presence.</p><ul><li>Modern &amp; Responsive Design</li><li>SEO Ready</li><li>Business Enquiry Integration</li><li>Affordable Website Packages</li></ul><a class="button button-primary" href="digital-launch.html">Explore Website Packages <span aria-hidden="true">→</span></a></div><div class="product-visual"><picture><source type="image/webp" srcset="assets/digital-launch/responsive-web-design-800.webp 800w, assets/digital-launch/responsive-web-design-1360.webp 1360w" sizes="(max-width: 760px) 100vw, 47vw"><img src="assets/approach-plan.jpg" width="1360" height="765" loading="lazy" decoding="async" alt="Responsive website design shown across desktop and mobile devices."></picture></div></section>`;
}

const footer = document.querySelector('footer');
const footerLinks = [
  ['Contact Us', 'contact.html'],
  ['Security', 'legal.html#security'],
  ['Compliance', 'legal.html#compliance'],
  ['IPR Complaints', 'legal.html#ipr-complaints'],
  ['Anti-spam Policy', 'legal.html#anti-spam-policy'],
  ['Terms of Service', 'legal.html#terms-of-service'],
  ['Privacy Policy', 'legal.html#privacy-policy'],
  ['Refund Policy', 'legal.html#refund-policy'],
  ['Trademark Policy', 'legal.html#trademark-policy'],
  ['Cookie Policy', 'legal.html#cookie-policy'],
  ['GDPR Compliance', 'legal.html#gdpr-compliance'],
  ['Abuse Policy', 'legal.html#abuse-policy'],
];

if (footer) {
  const year = new Date().getFullYear();
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="footer-main">
      <div class="footer-brand">
        <a class="footer-wordmark" href="index.html" aria-label="Neo Systems home"><span class="wordmark-mark" aria-hidden="true"></span><span>NEO SYSTEMS</span></a>
        <p>Neo Systems supports organisations with professional CCTV and surveillance services, alongside the NeoTimex mobile time-attendance product direction.</p>
      </div>
      <div class="footer-explore">
        <p class="footer-label">Explore</p>
        <nav aria-label="Footer navigation"><a href="index.html">Home</a><a href="about.html">About Us</a><a href="services.html">Services</a><a href="neotimex.html">NeoTimex</a><a href="approach.html">Approach</a><a href="contact.html">Contact</a><a href="https://www.veonit.com/terms-and-conditions/" target="_blank" rel="noopener noreferrer">Terms &amp; Conditions</a><a href="https://www.veonit.com/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a></nav>
      </div>
      <div class="footer-connect">
        <p class="footer-label">Connect</p>
        <p>Begin with your site, system needs or attendance workflow.</p>
        <a class="footer-contact" href="contact.html">Talk to Neo Systems <span aria-hidden="true">↗</span></a>
        <div class="footer-contact-details"><a href="tel:+917499711255"><span>Mobile</span>+91 7499711255</a><a href="mailto:info.neosystems@gmail.com"><span>Email</span>info.neosystems@gmail.com</a></div>
      </div>
    </div>
    <div class="footer-bottom"><span>© ${year} Neo Systems. All rights reserved.</span><div><a href="terms.html">Terms &amp; Conditions</a><a href="privacy.html">Privacy Policy</a></div></div>
    <a class="back-top" href="#" aria-label="Back to top">↑</a>`;
}

const contactMain = document.querySelector('main');
if (window.location.pathname.endsWith('/contact.html') && contactMain) {
  contactMain.innerHTML = `
    <section class="page-hero contact-page-hero">
      <div>
        <p class="section-kicker">Contact Neo Systems</p>
        <h1>Start with the requirement<br /><em>you need to solve.</em></h1>
        <p>Tell us whether you are exploring CCTV and surveillance support, procurement guidance or NeoTimex mobile time attendance.</p>
      </div>
      <img src="assets/surveillance-hero.jpg" width="1440" height="810" fetchpriority="high" alt="Conceptual surveillance environment for a security-services inquiry." />
    </section>
    <section class="contact-page section">
      <aside class="contact-methods">
        <p class="section-kicker">How we can help</p>
        <h2>Start the right conversation.</h2>
        <a href="services.html"><span>01</span><strong>CCTV & surveillance services</strong><b>↗</b></a>
        <a href="services.html#planning"><span>02</span><strong>Planning & procurement guidance</strong><b>↗</b></a>
        <a href="neotimex.html"><span>03</span><strong>NeoTimex product enquiries</strong><b>↗</b></a>
        <div class="contact-approval"><strong>Contact Neo Systems</strong><p><a href="tel:+917499711255">+91 74997 11255</a><br /><a href="mailto:info.neosystems@gmail.com">info.neosystems@gmail.com</a><br /><a href="https://wa.me/917499711255?text=Hello%20Neo%20Systems%2C%20I%20would%20like%20to%20discuss%20a%20requirement." target="_blank" rel="noopener noreferrer">Message us on WhatsApp ↗</a></p><p><strong>Visit us</strong><br />Avadhoot Complex, Shop No. 2, Sr. No. 32/11, Ambegaon Pathar Road, Bharati Vidyapeeth, Pune - 411 046.</p></div>
      </aside>
      <section class="inquiry-panel" aria-labelledby="inquiry-title">
        <p class="section-kicker">Inquiry details</p>
        <h2 id="inquiry-title">Tell us about your requirement.</h2>
        <p>Share a few details so the right conversation can be prepared.</p>
        <form id="inquiry-form">
          <label>Full name<input name="name" autocomplete="name" required placeholder="Your name" /></label>
          <label>Work email<input name="email" type="email" autocomplete="email" required placeholder="you@company.com" /></label>
          <label>Company<input name="company" autocomplete="organization" required placeholder="Organisation name" /></label>
          <label>Phone<input name="phone" type="tel" autocomplete="tel" required placeholder="Phone number" /></label>
          <label class="form-wide">Inquiry type<select name="type" required><option>CCTV & surveillance services</option><option>Planning & procurement guidance</option><option>NeoTimex mobile time attendance</option><option>Other</option></select></label>
          <label class="form-wide">How can we help?<textarea name="message" rows="5" required placeholder="Briefly describe your site, team or requirement"></textarea></label>
          <div class="form-wide"><button class="button button-primary" type="submit">Prepare inquiry</button><p class="form-status" aria-live="polite"></p></div>
        </form>
      </section>
    </section>
    <section class="contact-location section"><p class="section-kicker">Location & availability</p><h2>Contact details will be published with approval.</h2><p>Before launch, confirm the business address, coverage area, enquiry recipient and privacy process for submitted requests.</p></section>`;

  const inquiryForm = document.querySelector('#inquiry-form');
  inquiryForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    inquiryForm.querySelector('.form-status').textContent = 'Inquiry routing will be enabled once the approved Neo Systems contact channel is added.';
  });
}

if (document.body.classList.contains('v5-home') && footer) {
  footer.className = 'site-footer';
  footer.innerHTML = `<div class="footer-main v5-footer"><div class="footer-brand"><a href="index.html"><img src="assets/neo-systems-logo.svg" width="255" height="59" alt="NSIPL"></a><p>Neo Systems &amp; Infrastructure Pvt. Ltd. delivers practical technology solutions for more secure, connected and digital businesses.</p></div><div class="footer-explore"><p class="footer-label">Quick Links</p><nav aria-label="Footer links"><a href="index.html">Home</a><a href="about.html">About Us</a><a href="contact.html">Contact</a></nav></div><div class="footer-explore"><p class="footer-label">Our Solutions</p><nav aria-label="Footer solutions"><a href="services.html">Security &amp; Surveillance</a><a href="services.html">IT Infrastructure</a><a href="neotimex.html">NeoTimex</a><a href="digital-launch.html">Digital Launch</a></nav></div><div class="footer-connect"><p class="footer-label">Contact Us</p><a href="tel:+917499711255">+91 74997 11255</a><a href="mailto:info.neosystems@gmail.com">info.neosystems@gmail.com</a><p>Avadhoot Complex, Ambegaon Pathar Road, Pune - 411 046.</p><a href="https://wa.me/917499711255" target="_blank" rel="noopener noreferrer">WhatsApp</a></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Neo Systems &amp; Infrastructure Pvt. Ltd. All Rights Reserved.</span><div><a href="privacy.html">Privacy Policy</a><a href="terms.html">Terms &amp; Conditions</a></div></div>`;
}
