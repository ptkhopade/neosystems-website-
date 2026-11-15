if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
const scrollToPageTop = () => window.scrollTo(0, 0);
scrollToPageTop();
window.addEventListener('pageshow', () => requestAnimationFrame(scrollToPageTop));

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');

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
        <nav aria-label="Footer navigation"><a href="index.html">Home</a><a href="about.html">About Us</a><a href="services.html">Services</a><a href="neotimex.html">NeoTimex</a><a href="approach.html">Approach</a><a href="contact.html">Contact</a></nav>
      </div>
      <div class="footer-connect">
        <p class="footer-label">Connect</p>
        <p>Begin with your site, system needs or attendance workflow.</p>
        <a class="footer-contact" href="contact.html">Talk to Neo Systems <span aria-hidden="true">↗</span></a>
        <small>Contact details will be added following approval.</small>
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
        <div class="contact-approval"><strong>Contact channels pending approval</strong><p>Approved phone, email and business-address details will be added before launch.</p></div>
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
