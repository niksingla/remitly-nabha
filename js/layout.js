/* ==========================================================================
   Remitly Nabha — shared chrome
   Renders the header and footer into every page so navigation stays in sync.
   ========================================================================== */
(function () {
  "use strict";

  var SITE_NAME = "Remitly Nabha";

  var LOGO = [
    '<svg class="brand-mark" viewBox="0 0 48 48" role="img" aria-label="' + SITE_NAME + ' logo">',
    '  <defs>',
    '    <linearGradient id="rnMark" x1="0" y1="0" x2="1" y2="1">',
    '      <stop offset="0%" stop-color="#3b6ff5"/>',
    '      <stop offset="100%" stop-color="#11284a"/>',
    '    </linearGradient>',
    '  </defs>',
    '  <rect width="48" height="48" rx="13" fill="url(#rnMark)"/>',
    '  <path d="M13 31.5 L24 13 L35 31.5" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>',
    '  <path d="M17.5 31.5 h13" fill="none" stroke="#ff6f52" stroke-width="3.4" stroke-linecap="round"/>',
    '</svg>'
  ].join("");

  function brand(href) {
    return (
      '<a class="brand" href="' + href + '">' +
      LOGO +
      '<span class="brand-text">' +
      '<span class="brand-name">Remitly</span>' +
      '<span class="brand-sub">Nabha</span>' +
      "</span></a>"
    );
  }

  /* -- Navigation model ---------------------------------------------------- */
  var NAV = [
    {
      label: "Send money",
      children: [
        ["send-money.html", "Send money online", "Transfers to bank accounts, wallets and cash pickup"],
        ["large-transfer.html", "Large transfers", "Move bigger sums with a dedicated specialist"],
        ["countries.html", "Where we send", "Browse every destination we serve"],
        ["rates-fees.html", "Rates and fees", "See pricing before you commit"]
      ]
    },
    {
      label: "Receive money",
      children: [
        ["receive-money.html", "Receive a transfer", "Collect funds to a bank, wallet or agent"],
        ["card.html", "Nabha Card", "Hold and spend a multi-currency balance"],
        ["converter.html", "Currency converter", "Check today's indicative mid-market rate"]
      ]
    },
    {
      label: "Business",
      children: [
        ["business.html", "Nabha Business", "Pay contractors, vendors and global teams"],
        ["business.html#payroll", "Global payroll", "Batch payouts in a single upload"],
        ["business.html#api", "Payouts API", "Embed transfers in your own product"]
      ]
    },
    {
      label: "Company",
      children: [
        ["about.html", "About us", "Who we are and why we built this"],
        ["blog.html", "Blog", "Guides on money, migration and rates"],
        ["careers.html", "Careers", "Open roles across our teams"],
        ["newsroom.html", "Newsroom", "Announcements and press resources"],
        ["security.html", "Security", "How we protect money and data"]
      ]
    },
    { label: "Help", href: "help.html" }
  ];

  var FOOTER = [
    {
      title: "Products",
      links: [
        ["send-money.html", "Send money"],
        ["receive-money.html", "Receive money"],
        ["card.html", "Nabha Card"],
        ["business.html", "Nabha Business"],
        ["large-transfer.html", "Large transfers"]
      ]
    },
    {
      title: "Resources",
      links: [
        ["rates-fees.html", "Rates and fees"],
        ["converter.html", "Currency converter"],
        ["countries.html", "Country directory"],
        ["help.html", "Help centre"],
        ["security.html", "Fraud awareness"]
      ]
    },
    {
      title: "Company",
      links: [
        ["about.html", "About"],
        ["blog.html", "Blog"],
        ["newsroom.html", "Newsroom"],
        ["careers.html", "Careers"],
        ["contact.html", "Contact us"]
      ]
    },
    {
      title: "Account",
      links: [
        ["login.html", "Log in"],
        ["signup.html", "Sign up"],
        ["help.html#contact", "File a complaint"],
        ["terms.html", "User agreement"],
        ["privacy.html", "Privacy notice"]
      ]
    }
  ];

  var SOCIAL_ICONS = {
    Facebook: '<path d="M14 8h-2a2 2 0 0 0-2 2v2H8v3h2v6h3v-6h2.2l.4-3H13v-1.6c0-.5.2-.9.9-.9H16V8z"/>',
    Instagram:
      '<rect x="4" y="4" width="16" height="16" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="16.8" cy="7.2" r="1.1"/>',
    X: '<path d="M5 5h3.3l3.1 4.3L15.2 5H19l-5.3 6.6L19.4 19H16l-3.4-4.6L8.6 19H5l5.6-7L5 5z"/>',
    LinkedIn:
      '<path d="M6.5 9.5h2.6V19H6.5zM7.8 5a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2zM11 9.5h2.5v1.3c.5-.9 1.5-1.5 2.8-1.5 2.1 0 3.2 1.3 3.2 3.8V19h-2.6v-5.3c0-1.3-.5-2-1.5-2s-1.8.7-1.8 2.1V19H11z"/>',
    YouTube:
      '<path d="M20.3 8.4c-.2-1-.9-1.7-1.9-1.9C16.8 6.2 12 6.2 12 6.2s-4.8 0-6.4.3c-1 .2-1.7.9-1.9 1.9C3.4 10 3.4 12 3.4 12s0 2 .3 3.6c.2 1 .9 1.7 1.9 1.9 1.6.3 6.4.3 6.4.3s4.8 0 6.4-.3c1-.2 1.7-.9 1.9-1.9.3-1.6.3-3.6.3-3.6s0-2-.3-3.6zM10.3 15.1V8.9l5.2 3.1-5.2 3.1z"/>'
  };

  /* -- Header -------------------------------------------------------------- */
  function buildHeader(current) {
    var items = NAV.map(function (item) {
      if (!item.children) {
        return (
          '<li class="nav-item"><a class="nav-link" href="' +
          item.href +
          '"' +
          (current === item.href ? ' aria-current="page"' : "") +
          ">" +
          item.label +
          "</a></li>"
        );
      }

      var id = "nav-" + item.label.toLowerCase().replace(/[^a-z]+/g, "-");
      var owns = item.children.some(function (c) {
        return c[0] === current;
      });

      var sub = item.children
        .map(function (c) {
          return (
            '<li><a href="' + c[0] + '"><strong>' + c[1] + "</strong><span>" + c[2] + "</span></a></li>"
          );
        })
        .join("");

      return (
        '<li class="nav-item">' +
        '<button class="nav-link" type="button" aria-expanded="false" aria-controls="' +
        id +
        '"' +
        (owns ? ' aria-current="page"' : "") +
        ">" +
        item.label +
        '<i class="caret" aria-hidden="true"></i></button>' +
        '<ul class="dropdown" id="' + id + '">' + sub + "</ul>" +
        "</li>"
      );
    }).join("");

    return (
      '<div class="demo-banner">Demonstration project — this is a non-functional UI clone built for practice. No real money moves here.</div>' +
      '<header class="site-header">' +
      '<div class="topbar"><div class="wrap">' +
      '<span>Sending from <strong>India</strong> · English</span>' +
      '<ul class="topbar-list">' +
      '<li><a href="countries.html">Destinations</a></li>' +
      '<li><a href="rates-fees.html">Rates</a></li>' +
      '<li><a href="help.html">Help</a></li>' +
      "</ul></div></div>" +
      '<div class="wrap"><div class="header-inner">' +
      brand("index.html") +
      '<nav class="nav" id="primary-nav" aria-label="Primary"><ul class="nav-list">' +
      items +
      // The header's log-in button is hidden on narrow screens, so repeat it here.
      '<li class="nav-item nav-item--mobile"><a class="nav-link" href="login.html">Log in</a></li>' +
      "</ul></nav>" +
      '<div class="header-actions">' +
      '<a class="btn btn--ghost btn--sm" href="login.html">Log in</a>' +
      '<a class="btn btn--primary btn--sm" href="signup.html">Sign up</a>' +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Toggle navigation"><span></span></button>' +
      "</div></div></div></header>"
    );
  }

  /* -- Footer -------------------------------------------------------------- */
  function buildFooter() {
    var cols = FOOTER.map(function (col) {
      var links = col.links
        .map(function (l) {
          return '<li><a href="' + l[0] + '">' + l[1] + "</a></li>";
        })
        .join("");
      return '<div class="footer-col"><h4>' + col.title + "</h4><ul>" + links + "</ul></div>";
    }).join("");

    var socials = Object.keys(SOCIAL_ICONS)
      .map(function (name) {
        return (
          '<a href="#" aria-label="' +
          name +
          '" title="' + name + ' (demo link)"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
          SOCIAL_ICONS[name] +
          "</svg></a>"
        );
      })
      .join("");

    return (
      '<footer class="site-footer">' +
      '<div class="wrap">' +
      '<div class="footer-top">' +
      '<div class="footer-brand">' +
      brand("index.html") +
      "<p>A practice build of a cross-border payments experience — transfers, multi-currency balances and business payouts, all in one place.</p>" +
      '<div class="socials">' + socials + "</div>" +
      "</div>" +
      cols +
      "</div>" +
      '<div class="footer-bottom">' +
      '<p class="footer-legal">Remitly Nabha is a fictional brand created as a front-end portfolio exercise. It is not a licensed money transmitter, holds no customer funds, and is not affiliated with or endorsed by any real payments company. Exchange rates, fees, delivery estimates and testimonials shown across this site are illustrative sample data.<br>© 2026 Remitly Nabha — demo project. All rights reserved.</p>' +
      '<ul class="footer-links">' +
      '<li><a href="terms.html">User agreement</a></li>' +
      '<li><a href="privacy.html">Privacy notice</a></li>' +
      '<li><a href="security.html">Security</a></li>' +
      '<li><a href="licenses.html">Licences</a></li>' +
      '<li><a href="accessibility.html">Accessibility</a></li>' +
      '<li><a href="sitemap.html">Sitemap</a></li>' +
      "</ul>" +
      "</div></div></footer>"
    );
  }

  /* -- Mount --------------------------------------------------------------- */
  function currentPage() {
    var file = window.location.pathname.split("/").pop();
    return file && file !== "" ? file : "index.html";
  }

  function mount() {
    var current = currentPage();
    var headerSlot = document.querySelector("[data-site-header]");
    var footerSlot = document.querySelector("[data-site-footer]");

    if (headerSlot) headerSlot.outerHTML = buildHeader(current);
    if (footerSlot) footerSlot.outerHTML = buildFooter();

    document.dispatchEvent(new CustomEvent("chrome:ready"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }

  window.NabhaLayout = { siteName: SITE_NAME, logo: LOGO };
})();
