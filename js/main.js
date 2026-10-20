/* ==========================================================================
   Remitly Nabha — interactions
   Everything here runs on sample data. No network calls, no real transfers.
   ========================================================================== */
(function () {
  "use strict";

  /* ----------------------------------------------------------------------
     Sample reference data
     ---------------------------------------------------------------------- */
  var CURRENCIES = [
    { code: "INR", name: "Indian rupee", symbol: "₹", perUSD: 88.4 },
    { code: "USD", name: "US dollar", symbol: "$", perUSD: 1 },
    { code: "EUR", name: "Euro", symbol: "€", perUSD: 0.92 },
    { code: "GBP", name: "British pound", symbol: "£", perUSD: 0.79 },
    { code: "AED", name: "UAE dirham", symbol: "د.إ", perUSD: 3.67 },
    { code: "CAD", name: "Canadian dollar", symbol: "C$", perUSD: 1.37 },
    { code: "AUD", name: "Australian dollar", symbol: "A$", perUSD: 1.52 },
    { code: "SGD", name: "Singapore dollar", symbol: "S$", perUSD: 1.34 },
    { code: "PHP", name: "Philippine peso", symbol: "₱", perUSD: 58.1 },
    { code: "MXN", name: "Mexican peso", symbol: "MX$", perUSD: 18.4 },
    { code: "NGN", name: "Nigerian naira", symbol: "₦", perUSD: 1540 },
    { code: "PKR", name: "Pakistani rupee", symbol: "₨", perUSD: 278.5 },
    { code: "BDT", name: "Bangladeshi taka", symbol: "৳", perUSD: 119.8 },
    { code: "LKR", name: "Sri Lankan rupee", symbol: "Rs", perUSD: 296.2 },
    { code: "NPR", name: "Nepalese rupee", symbol: "रू", perUSD: 141.5 },
    { code: "KES", name: "Kenyan shilling", symbol: "KSh", perUSD: 129.3 },
    { code: "GHS", name: "Ghanaian cedi", symbol: "GH₵", perUSD: 15.2 },
    { code: "ZAR", name: "South African rand", symbol: "R", perUSD: 18.1 },
    { code: "BRL", name: "Brazilian real", symbol: "R$", perUSD: 5.42 },
    { code: "COP", name: "Colombian peso", symbol: "COL$", perUSD: 3920 },
    { code: "VND", name: "Vietnamese dong", symbol: "₫", perUSD: 25380 },
    { code: "IDR", name: "Indonesian rupiah", symbol: "Rp", perUSD: 15720 },
    { code: "JPY", name: "Japanese yen", symbol: "¥", perUSD: 151.2 },
    { code: "PLN", name: "Polish zloty", symbol: "zł", perUSD: 3.96 }
  ];

  // Sample pricing constants, expressed in USD and scaled to the sending currency.
  var FLAT_FEE_USD = 2.25;
  var FREE_OVER_USD = 100;

  var SPEEDS = {
    express: { label: "Express", eta: "Minutes", feeMultiplier: 1, margin: 0.004 },
    economy: { label: "Economy", eta: "3–5 business days", feeMultiplier: 0, margin: 0.009 }
  };

  var COUNTRIES = [
    ["Albania", "ALL"], ["Algeria", "DZD"], ["Argentina", "ARS"], ["Armenia", "AMD"],
    ["Australia", "AUD"], ["Austria", "EUR"], ["Azerbaijan", "AZN"], ["Bahrain", "BHD"],
    ["Bangladesh", "BDT"], ["Belgium", "EUR"], ["Benin", "XOF"], ["Bhutan", "BTN"],
    ["Bolivia", "BOB"], ["Bosnia and Herzegovina", "BAM"], ["Botswana", "BWP"],
    ["Brazil", "BRL"], ["Bulgaria", "BGN"], ["Burkina Faso", "XOF"], ["Cambodia", "KHR"],
    ["Cameroon", "XAF"], ["Canada", "CAD"], ["Chile", "CLP"], ["China", "CNY"],
    ["Colombia", "COP"], ["Costa Rica", "CRC"], ["Croatia", "EUR"], ["Cyprus", "EUR"],
    ["Czech Republic", "CZK"], ["Denmark", "DKK"], ["Dominican Republic", "DOP"],
    ["Ecuador", "USD"], ["Egypt", "EGP"], ["El Salvador", "USD"], ["Estonia", "EUR"],
    ["Eswatini", "SZL"], ["Ethiopia", "ETB"], ["Fiji", "FJD"], ["Finland", "EUR"],
    ["France", "EUR"], ["Gabon", "XAF"], ["Gambia", "GMD"], ["Georgia", "GEL"],
    ["Germany", "EUR"], ["Ghana", "GHS"], ["Greece", "EUR"], ["Guatemala", "GTQ"],
    ["Guinea", "GNF"], ["Guyana", "GYD"], ["Haiti", "HTG"], ["Honduras", "HNL"],
    ["Hong Kong", "HKD"], ["Hungary", "HUF"], ["Iceland", "ISK"], ["India", "INR"],
    ["Indonesia", "IDR"], ["Ireland", "EUR"], ["Israel", "ILS"], ["Italy", "EUR"],
    ["Ivory Coast", "XOF"], ["Jamaica", "JMD"], ["Japan", "JPY"], ["Jordan", "JOD"],
    ["Kazakhstan", "KZT"], ["Kenya", "KES"], ["Kuwait", "KWD"], ["Kyrgyzstan", "KGS"],
    ["Laos", "LAK"], ["Latvia", "EUR"], ["Lebanon", "LBP"], ["Lesotho", "LSL"],
    ["Liberia", "LRD"], ["Lithuania", "EUR"], ["Luxembourg", "EUR"], ["Madagascar", "MGA"],
    ["Malawi", "MWK"], ["Malaysia", "MYR"], ["Maldives", "MVR"], ["Mali", "XOF"],
    ["Malta", "EUR"], ["Mauritius", "MUR"], ["Mexico", "MXN"], ["Moldova", "MDL"],
    ["Mongolia", "MNT"], ["Montenegro", "EUR"], ["Morocco", "MAD"], ["Mozambique", "MZN"],
    ["Myanmar", "MMK"], ["Namibia", "NAD"], ["Nepal", "NPR"], ["Netherlands", "EUR"],
    ["New Zealand", "NZD"], ["Nicaragua", "NIO"], ["Niger", "XOF"], ["Nigeria", "NGN"],
    ["North Macedonia", "MKD"], ["Norway", "NOK"], ["Oman", "OMR"], ["Pakistan", "PKR"],
    ["Panama", "USD"], ["Papua New Guinea", "PGK"], ["Paraguay", "PYG"], ["Peru", "PEN"],
    ["Philippines", "PHP"], ["Poland", "PLN"], ["Portugal", "EUR"], ["Qatar", "QAR"],
    ["Romania", "RON"], ["Rwanda", "RWF"], ["Samoa", "WST"], ["Saudi Arabia", "SAR"],
    ["Senegal", "XOF"], ["Serbia", "RSD"], ["Seychelles", "SCR"], ["Sierra Leone", "SLE"],
    ["Singapore", "SGD"], ["Slovakia", "EUR"], ["Slovenia", "EUR"], ["Somalia", "SOS"],
    ["South Africa", "ZAR"], ["South Korea", "KRW"], ["Spain", "EUR"], ["Sri Lanka", "LKR"],
    ["Sweden", "SEK"], ["Switzerland", "CHF"], ["Tajikistan", "TJS"], ["Tanzania", "TZS"],
    ["Thailand", "THB"], ["Togo", "XOF"], ["Tonga", "TOP"], ["Trinidad and Tobago", "TTD"],
    ["Tunisia", "TND"], ["Turkey", "TRY"], ["Uganda", "UGX"], ["Ukraine", "UAH"],
    ["United Arab Emirates", "AED"], ["United Kingdom", "GBP"], ["United States", "USD"],
    ["Uruguay", "UYU"], ["Uzbekistan", "UZS"], ["Vanuatu", "VUV"], ["Vietnam", "VND"],
    ["Zambia", "ZMW"], ["Zimbabwe", "USD"]
  ];

  /* ----------------------------------------------------------------------
     Helpers
     ---------------------------------------------------------------------- */
  function byCode(code) {
    for (var i = 0; i < CURRENCIES.length; i++) {
      if (CURRENCIES[i].code === code) return CURRENCIES[i];
    }
    return CURRENCIES[1];
  }

  function rate(from, to) {
    return byCode(to).perUSD / byCode(from).perUSD;
  }

  function fmt(value, code, maxDigits) {
    var digits = typeof maxDigits === "number" ? maxDigits : value >= 1000 ? 0 : 2;
    try {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: code,
        minimumFractionDigits: 0,
        maximumFractionDigits: digits
      }).format(value);
    } catch (e) {
      return byCode(code).symbol + value.toFixed(digits);
    }
  }

  function num(value, digits) {
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: digits || 0,
      maximumFractionDigits: digits || 0
    }).format(value);
  }

  function toast(message) {
    var el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add("is-visible");
    clearTimeout(el._timer);
    el._timer = setTimeout(function () {
      el.classList.remove("is-visible");
    }, 3600);
  }

  window.NabhaToast = toast;

  /* ----------------------------------------------------------------------
     Navigation behaviour
     ---------------------------------------------------------------------- */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("primary-nav");

    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
      });
    }

    var items = Array.prototype.slice.call(document.querySelectorAll(".nav-item"));

    items.forEach(function (item) {
      var trigger = item.querySelector("button.nav-link");
      if (!trigger) return;

      function close() {
        item.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
      }

      function open() {
        items.forEach(function (other) {
          if (other !== item) {
            other.classList.remove("is-open");
            var t = other.querySelector("button.nav-link");
            if (t) t.setAttribute("aria-expanded", "false");
          }
        });
        item.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
      }

      trigger.addEventListener("click", function (event) {
        event.preventDefault();
        if (item.classList.contains("is-open")) close();
        else open();
      });

      item.addEventListener("mouseenter", function () {
        if (window.matchMedia("(min-width: 961px)").matches) open();
      });

      item.addEventListener("mouseleave", function () {
        if (window.matchMedia("(min-width: 961px)").matches) close();
      });

      item.addEventListener("focusout", function (event) {
        if (!item.contains(event.relatedTarget)) close();
      });
    });

    document.addEventListener("click", function (event) {
      if (event.target.closest(".nav-item")) return;
      items.forEach(function (item) {
        item.classList.remove("is-open");
        var t = item.querySelector("button.nav-link");
        if (t) t.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      items.forEach(function (item) {
        item.classList.remove("is-open");
        var t = item.querySelector("button.nav-link");
        if (t) t.setAttribute("aria-expanded", "false");
      });
      if (nav && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ----------------------------------------------------------------------
     Transfer calculator
     ---------------------------------------------------------------------- */
  function initCalculator(root) {
    var sendInput = root.querySelector("[data-send-amount]");
    var receiveInput = root.querySelector("[data-receive-amount]");
    var sendCurrency = root.querySelector("[data-send-currency]");
    var receiveCurrency = root.querySelector("[data-receive-currency]");
    var out = {
      rate: root.querySelector("[data-out-rate]"),
      fee: root.querySelector("[data-out-fee]"),
      total: root.querySelector("[data-out-total]"),
      eta: root.querySelector("[data-out-eta]"),
      receive: root.querySelector("[data-out-receive]")
    };
    var swap = root.querySelector("[data-swap]");
    var lastEdited = "send";

    function options(selected) {
      return CURRENCIES.map(function (c) {
        return (
          '<option value="' + c.code + '"' + (c.code === selected ? " selected" : "") + ">" +
          c.code + " — " + c.name +
          "</option>"
        );
      }).join("");
    }

    if (sendCurrency && !sendCurrency.options.length) {
      sendCurrency.innerHTML = options(sendCurrency.dataset.default || "INR");
    }
    if (receiveCurrency && !receiveCurrency.options.length) {
      receiveCurrency.innerHTML = options(receiveCurrency.dataset.default || "USD");
    }

    function speed() {
      var checked = root.querySelector("[data-speed]:checked");
      return SPEEDS[checked ? checked.value : "express"] || SPEEDS.express;
    }

    function update() {
      var from = sendCurrency ? sendCurrency.value : "INR";
      var to = receiveCurrency ? receiveCurrency.value : "USD";
      var tier = speed();
      var mid = rate(from, to);
      var offered = mid * (1 - tier.margin);

      var sendAmount = parseFloat(sendInput && sendInput.value) || 0;
      var receiveAmount = parseFloat(receiveInput && receiveInput.value) || 0;

      if (lastEdited === "receive" && receiveAmount > 0) {
        sendAmount = receiveAmount / offered;
        if (sendInput) sendInput.value = sendAmount.toFixed(2);
      } else {
        receiveAmount = sendAmount * offered;
        if (receiveInput) {
          receiveInput.value = receiveAmount >= 1000 ? receiveAmount.toFixed(0) : receiveAmount.toFixed(2);
        }
      }

      // Illustrative pricing: a flat fee on Express, waived above a threshold.
      var unit = byCode(from).perUSD;
      var feeBase = sendAmount >= FREE_OVER_USD * unit ? 0 : FLAT_FEE_USD * unit;
      var fee = feeBase * tier.feeMultiplier;

      if (out.rate) {
        out.rate.textContent = "1 " + from + " = " + num(offered, offered < 1 ? 4 : 2) + " " + to;
      }
      if (out.fee) {
        out.fee.innerHTML = fee === 0
          ? '<span class="free">Free</span>'
          : fmt(fee, from);
      }
      if (out.total) out.total.textContent = fmt(sendAmount + fee, from);
      if (out.eta) out.eta.textContent = tier.eta;
      if (out.receive) out.receive.textContent = fmt(receiveAmount, to, receiveAmount >= 1000 ? 0 : 2);
    }

    if (sendInput) {
      sendInput.addEventListener("input", function () {
        lastEdited = "send";
        update();
      });
    }
    if (receiveInput) {
      receiveInput.addEventListener("input", function () {
        lastEdited = "receive";
        update();
      });
    }
    [sendCurrency, receiveCurrency].forEach(function (select) {
      if (select) select.addEventListener("change", update);
    });
    root.querySelectorAll("[data-speed]").forEach(function (input) {
      input.addEventListener("change", update);
    });

    if (swap) {
      swap.addEventListener("click", function () {
        if (!sendCurrency || !receiveCurrency) return;
        var tmp = sendCurrency.value;
        sendCurrency.value = receiveCurrency.value;
        receiveCurrency.value = tmp;
        lastEdited = "send";
        update();
      });
    }

    root.querySelectorAll("[data-demo-submit]").forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        toast("Demo only — no transfer was created.");
      });
    });

    update();
  }

  /* ----------------------------------------------------------------------
     Tabs (generic)
     ---------------------------------------------------------------------- */
  function initTabs(group) {
    var tabs = Array.prototype.slice.call(group.querySelectorAll("[role='tab']"));
    if (!tabs.length) return;

    function select(tab) {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute("aria-selected", String(selected));
        t.setAttribute("tabindex", selected ? "0" : "-1");
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !selected;
      });
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        select(tab);
      });
      tab.addEventListener("keydown", function (event) {
        var next = null;
        if (event.key === "ArrowRight") next = tabs[(index + 1) % tabs.length];
        if (event.key === "ArrowLeft") next = tabs[(index - 1 + tabs.length) % tabs.length];
        if (next) {
          event.preventDefault();
          next.focus();
          select(next);
        }
      });
    });

    var initial = tabs.filter(function (t) {
      return t.getAttribute("aria-selected") === "true";
    })[0];
    select(initial || tabs[0]);
  }

  /* ----------------------------------------------------------------------
     Accordions
     ---------------------------------------------------------------------- */
  function initAccordions() {
    document.querySelectorAll(".accordion-trigger").forEach(function (trigger) {
      var panel = document.getElementById(trigger.getAttribute("aria-controls"));
      if (!panel) return;

      trigger.addEventListener("click", function () {
        var expanded = trigger.getAttribute("aria-expanded") === "true";
        var group = trigger.closest(".accordion");

        if (group && group.dataset.single === "true" && !expanded) {
          group.querySelectorAll(".accordion-trigger").forEach(function (other) {
            other.setAttribute("aria-expanded", "false");
            var p = document.getElementById(other.getAttribute("aria-controls"));
            if (p) p.classList.remove("is-open");
          });
        }

        trigger.setAttribute("aria-expanded", String(!expanded));
        panel.classList.toggle("is-open", !expanded);
      });
    });
  }

  /* ----------------------------------------------------------------------
     Country directory
     ---------------------------------------------------------------------- */
  function initCountryDirectory(root) {
    var list = root.querySelector("[data-country-list]");
    var search = root.querySelector("[data-country-search]");
    var alphaNav = root.querySelector("[data-alpha-nav]");
    var count = root.querySelector("[data-country-count]");
    var empty = root.querySelector("[data-country-empty]");
    if (!list) return;

    var activeLetter = "All";

    list.innerHTML = COUNTRIES.map(function (c) {
      return (
        '<li data-name="' + c[0].toLowerCase() + '" data-letter="' + c[0][0] + '">' +
        '<a href="send-money.html"><span class="flag" aria-hidden="true">' +
        c[1].slice(0, 2) +
        '</span><span>' + c[0] + '</span></a></li>'
      );
    }).join("");

    if (alphaNav) {
      var letters = ["All"].concat("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").filter(function (letter) {
        return COUNTRIES.some(function (c) {
          return c[0][0] === letter;
        });
      }));

      alphaNav.innerHTML = letters.map(function (letter) {
        return (
          '<li><button type="button" data-letter="' + letter + '" aria-pressed="' +
          (letter === "All") + '">' + letter + "</button></li>"
        );
      }).join("");

      alphaNav.addEventListener("click", function (event) {
        var button = event.target.closest("button[data-letter]");
        if (!button) return;
        activeLetter = button.dataset.letter;
        alphaNav.querySelectorAll("button").forEach(function (b) {
          b.setAttribute("aria-pressed", String(b === button));
        });
        filter();
      });
    }

    function filter() {
      var term = (search && search.value || "").trim().toLowerCase();
      var shown = 0;

      list.querySelectorAll("li").forEach(function (item) {
        var matchesTerm = !term || item.dataset.name.indexOf(term) !== -1;
        var matchesLetter = activeLetter === "All" || item.dataset.letter === activeLetter;
        var visible = matchesTerm && matchesLetter;
        item.hidden = !visible;
        if (visible) shown++;
      });

      if (count) {
        count.textContent = shown + (shown === 1 ? " destination" : " destinations");
      }
      if (empty) empty.hidden = shown !== 0;
    }

    if (search) search.addEventListener("input", filter);
    filter();
  }

  /* ----------------------------------------------------------------------
     Currency converter page
     ---------------------------------------------------------------------- */
  function initConverter(root) {
    var amount = root.querySelector("[data-conv-amount]");
    var from = root.querySelector("[data-conv-from]");
    var to = root.querySelector("[data-conv-to]");
    var result = root.querySelector("[data-conv-result]");
    var detail = root.querySelector("[data-conv-detail]");
    var inverse = root.querySelector("[data-conv-inverse]");
    var swap = root.querySelector("[data-conv-swap]");

    function options(selected) {
      return CURRENCIES.slice()
        .sort(function (a, b) {
          return a.code.localeCompare(b.code);
        })
        .map(function (c) {
          return (
            '<option value="' + c.code + '"' + (c.code === selected ? " selected" : "") + ">" +
            c.code + " — " + c.name + "</option>"
          );
        })
        .join("");
    }

    if (from) from.innerHTML = options(from.dataset.default || "INR");
    if (to) to.innerHTML = options(to.dataset.default || "USD");

    function update() {
      var f = from.value;
      var t = to.value;
      var value = parseFloat(amount.value) || 0;
      var r = rate(f, t);

      if (result) result.textContent = fmt(value * r, t, value * r >= 1000 ? 2 : 4);
      if (detail) detail.textContent = "1 " + f + " = " + num(r, r < 1 ? 4 : 3) + " " + t;
      if (inverse) inverse.textContent = "1 " + t + " = " + num(1 / r, 1 / r < 1 ? 4 : 3) + " " + f;
    }

    [amount, from, to].forEach(function (el) {
      if (el) el.addEventListener("input", update);
      if (el) el.addEventListener("change", update);
    });

    if (swap) {
      swap.addEventListener("click", function () {
        var tmp = from.value;
        from.value = to.value;
        to.value = tmp;
        update();
      });
    }

    update();
  }

  /* ----------------------------------------------------------------------
     Rate ticker + fee table population
     ---------------------------------------------------------------------- */
  function initRateTicker(root) {
    var pairs = [
      ["INR", "USD"], ["INR", "AED"], ["USD", "INR"], ["USD", "PHP"],
      ["USD", "MXN"], ["GBP", "INR"], ["EUR", "NGN"], ["AED", "PKR"],
      ["CAD", "INR"], ["AUD", "LKR"]
    ];

    root.innerHTML = pairs.map(function (pair, index) {
      var r = rate(pair[0], pair[1]);
      var delta = ((index % 3) - 1) * 0.18 + 0.12;
      return (
        '<div class="rate-chip">' +
        '<div class="pair">' + pair[0] + " → " + pair[1] + "</div>" +
        '<div class="val">' + num(r, r < 1 ? 4 : 2) + "</div>" +
        '<div class="delta' + (delta < 0 ? " down" : "") + '">' +
        (delta < 0 ? "▼ " : "▲ ") + Math.abs(delta).toFixed(2) + "%</div>" +
        "</div>"
      );
    }).join("");
  }

  function initFeeTable(root) {
    var rows = [
      ["United States", "USD", "Bank deposit", "2–4 hours"],
      ["United Arab Emirates", "AED", "Bank deposit", "Minutes"],
      ["United Kingdom", "GBP", "Bank deposit", "Minutes"],
      ["Philippines", "PHP", "Mobile wallet", "Minutes"],
      ["Mexico", "MXN", "Cash pickup", "Minutes"],
      ["Nigeria", "NGN", "Bank deposit", "Same day"],
      ["Pakistan", "PKR", "Mobile wallet", "Minutes"],
      ["Bangladesh", "BDT", "Bank deposit", "Same day"],
      ["Sri Lanka", "LKR", "Bank deposit", "Same day"],
      ["Kenya", "KES", "Mobile wallet", "Minutes"],
      ["Nepal", "NPR", "Cash pickup", "Minutes"],
      ["Vietnam", "VND", "Bank deposit", "1 business day"]
    ];

    root.innerHTML = rows.map(function (row) {
      var r = rate("INR", row[1]);
      var fee = row[3] === "Minutes" ? "₹199" : "Free";
      return (
        "<tr><td><strong>" + row[0] + "</strong></td>" +
        "<td>" + row[1] + "</td>" +
        "<td>" + num(r, r < 1 ? 4 : 2) + "</td>" +
        "<td>" + row[2] + "</td>" +
        "<td>" + row[3] + "</td>" +
        "<td>" + fee + "</td></tr>"
      );
    }).join("");
  }

  /* ----------------------------------------------------------------------
     Help centre search (filters the question list in place)
     ---------------------------------------------------------------------- */
  function initFilterList(root) {
    var input = root.querySelector("[data-filter-input]");
    var items = Array.prototype.slice.call(root.querySelectorAll("[data-filter-item]"));
    var empty = root.querySelector("[data-filter-empty]");
    if (!input) return;

    input.addEventListener("input", function () {
      var term = input.value.trim().toLowerCase();
      var shown = 0;

      items.forEach(function (item) {
        var visible = !term || item.textContent.toLowerCase().indexOf(term) !== -1;
        item.hidden = !visible;
        if (visible) shown++;
      });

      if (empty) empty.hidden = shown !== 0;
    });
  }

  /* ----------------------------------------------------------------------
     Demo forms — never submit anywhere
     ---------------------------------------------------------------------- */
  function initDemoForms() {
    document.querySelectorAll("form[data-demo-form]").forEach(function (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        toast(form.dataset.demoForm || "This is a demo form — nothing was submitted.");
      });
    });

    document.querySelectorAll("[data-demo-action]").forEach(function (el) {
      el.addEventListener("click", function (event) {
        event.preventDefault();
        toast(el.dataset.demoAction || "Demo only — this control is not wired up.");
      });
    });
  }

  /* ----------------------------------------------------------------------
     Scroll reveal
     ---------------------------------------------------------------------- */
  function initReveal() {
    var targets = document.querySelectorAll(".reveal");
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (t) {
        t.classList.add("is-in");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    targets.forEach(function (t) {
      observer.observe(t);
    });
  }

  /* ----------------------------------------------------------------------
     Footer year + boot
     ---------------------------------------------------------------------- */
  function boot() {
    initNav();
    initAccordions();
    initDemoForms();
    initReveal();

    document.querySelectorAll("[data-calculator]").forEach(initCalculator);
    document.querySelectorAll("[data-tabs]").forEach(initTabs);
    document.querySelectorAll("[data-country-directory]").forEach(initCountryDirectory);
    document.querySelectorAll("[data-converter]").forEach(initConverter);
    document.querySelectorAll("[data-rate-ticker]").forEach(initRateTicker);
    document.querySelectorAll("[data-fee-table]").forEach(initFeeTable);
    document.querySelectorAll("[data-filter-list]").forEach(initFilterList);
  }

  document.addEventListener("chrome:ready", boot);

  // Fall back in case the chrome script is absent on a page.
  window.addEventListener("load", function () {
    if (!document.querySelector(".site-header")) boot();
  });
})();
