// ----- Lucide icons -----
if (window.lucide) lucide.createIcons();

// ----- AnimateIn (IntersectionObserver) -----
(function () {
  const els = document.querySelectorAll("[data-animate]");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  els.forEach((el) => io.observe(el));
})();

// ----- Navbar mobile menu -----
(function () {
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");
  const iconMenu = document.getElementById("icon-menu");
  const iconX = document.getElementById("icon-x");
  if (!btn || !menu) return;

  function setOpen(open) {
    menu.classList.toggle("hidden", !open);
    menu.classList.toggle("flex", open);
    iconMenu.classList.toggle("hidden", open);
    iconX.classList.toggle("hidden", !open);
  }

  btn.addEventListener("click", () => setOpen(menu.classList.contains("hidden")));
  menu.querySelectorAll("[data-mobile-link]").forEach((link) =>
    link.addEventListener("click", () => setOpen(false)),
  );
})();

// ----- "Why Choose Us" accordion (single open) -----
(function () {
  const root = document.getElementById("why-accordion");
  if (!root) return;
  const items = Array.from(root.querySelectorAll("[data-acc-item]"));
  let openIndex = -1;

  items.forEach((item, i) => {
    const btn = item.querySelector("[data-acc-btn]");
    const label = item.querySelector("[data-acc-label]");
    const panel = item.querySelector("[data-acc-panel]");
    const chevron = item.querySelector("[data-acc-chevron]");

    btn.addEventListener("click", () => {
      openIndex = openIndex === i ? -1 : i;
      items.forEach((other, j) => {
        const isOpen = j === openIndex;
        const l = other.querySelector("[data-acc-label]");
        const p = other.querySelector("[data-acc-panel]");
        const c = other.querySelector("[data-acc-chevron]");
        p.classList.toggle("hidden", !isOpen);
        c.classList.toggle("rotate-180", isOpen);
        l.classList.toggle("font-semibold", isOpen);
        l.classList.toggle("text-[#437dfc]", isOpen);
        l.classList.toggle("font-normal", !isOpen);
        l.classList.toggle("text-[#111115]", !isOpen);
      });
    });
  });
})();

// ----- FAQ accordion (single open) -----
(function () {
  const root = document.getElementById("faq-accordion");
  if (!root) return;
  const btns = Array.from(root.querySelectorAll("[data-faq-btn]"));
  let openIndex = -1;

  btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      openIndex = openIndex === i ? -1 : i;
      btns.forEach((other, j) => {
        const isOpen = j === openIndex;
        const panel = other.querySelector("[data-faq-panel]");
        const chevron = other.querySelector("[data-faq-chevron]");
        panel.classList.toggle("hidden", !isOpen);
        chevron.classList.toggle("rotate-180", isOpen);
        chevron.classList.toggle("text-[#437dfc]", isOpen);
        // open: solid border + white bg; closed: subtle border + zinc bg
        other.classList.toggle("border-zinc-200", isOpen);
        other.classList.toggle("bg-white", isOpen);
        other.classList.toggle("shadow-sm", isOpen);
        other.classList.toggle("border-zinc-200/70", !isOpen);
        other.classList.toggle("bg-zinc-50", !isOpen);
      });
    });
  });
})();

// ----- Pricing selectors -----
(function () {
  const plans = {
    "1-200": {
      standard: { Termly: "₦1,200", Yearly: "₦3,000" },
      advanced: { Termly: "₦1,500", Yearly: "₦4,500" },
    },
    "201-400": {
      standard: { Termly: "₦1,100", Yearly: "₦1,425" },
      advanced: { Termly: "₦2,750", Yearly: "₦4,250" },
    },
    "401+": {
      standard: { Termly: "₦1000", Yearly: "₦1,350" },
      advanced: { Termly: "₦2,500", Yearly: "₦4,000" },
    },
  };

  const countToggle = document.getElementById("student-count-toggle");
  const billingToggle = document.getElementById("billing-toggle");
  const stdPrice = document.getElementById("std-price");
  const advPrice = document.getElementById("adv-price");
  if (!countToggle || !billingToggle) return;

  let studentCount = "1-200";
  let billing = "Termly";

  const ACTIVE = ["border", "border-zinc-200/70", "bg-white", "text-[#111115]", "shadow"];
  const INACTIVE = ["text-[#6f6f77]", "hover:text-[#111115]"];

  function paint(toggle, attr, value) {
    toggle.querySelectorAll("button").forEach((b) => {
      const isActive = b.getAttribute(attr) === value;
      ACTIVE.forEach((c) => b.classList.toggle(c, isActive));
      INACTIVE.forEach((c) => b.classList.toggle(c, !isActive));
    });
  }

  function update() {
    const current = plans[studentCount];
    stdPrice.textContent = current.standard[billing];
    advPrice.textContent = current.advanced[billing];
    paint(countToggle, "data-count", studentCount);
    paint(billingToggle, "data-billing", billing);
  }

  countToggle.querySelectorAll("button").forEach((b) =>
    b.addEventListener("click", () => {
      studentCount = b.getAttribute("data-count");
      update();
    }),
  );
  billingToggle.querySelectorAll("button").forEach((b) =>
    b.addEventListener("click", () => {
      billing = b.getAttribute("data-billing");
      update();
    }),
  );

  update();
})();
