(() => {
  const ready = (fn) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  };

  ready(() => {
    // 1) Hover “pop” behavior on touch devices:
    // CSS :hover doesn't exist on touch, so we toggle .is-active.
    const isTouch =
      window.matchMedia?.("(hover: none)").matches ||
      window.matchMedia?.("(pointer: coarse)").matches ||
      "ontouchstart" in window;

    if (isTouch) {
      const candidates = document.querySelectorAll(
        ".rec-box, .deal-cont > .sects3, .home-item, .may-like, .cart-items, .save-item2, .hover-card"
      );

      const clearAll = (exceptEl) => {
        candidates.forEach((el) => {
          if (el !== exceptEl) el.classList.remove("is-active");
        });
      };

      candidates.forEach((el) => {
        el.addEventListener(
          "click",
          (e) => {
            // Allow normal link clicks inside; first tap just activates card.
            const isAlreadyActive = el.classList.contains("is-active");
            const hasLink = e.target.closest?.("a");

            if (!isAlreadyActive) {
              clearAll(el);
              el.classList.add("is-active");
              if (hasLink) e.preventDefault();
            }
          },
          { passive: false }
        );
      });

      document.addEventListener("click", (e) => {
        const inside = e.target.closest?.(
          ".rec-box, .deal-cont > .sects3, .home-item, .may-like, .cart-items, .save-item2, .hover-card"
        );
        if (!inside) clearAll(null);
      });
    }

    // 2) Dropdown behavior improvements / fallback:
    // If Bootstrap is loaded, do nothing (it will handle dropdowns).
    // If it isn't (offline/no CDN), we implement a small fallback toggle.
    const hasBootstrapDropdown =
      typeof window.bootstrap !== "undefined" &&
      typeof window.bootstrap.Dropdown === "function";

    if (!hasBootstrapDropdown) {
      const toggles = document.querySelectorAll(
        '[data-bs-toggle="dropdown"], .dropdown-toggle'
      );

      const closeAll = () => {
        document.querySelectorAll(".dropdown-menu.show").forEach((m) => {
          m.classList.remove("show");
        });
        document.querySelectorAll(".dropdown.show").forEach((d) => {
          d.classList.remove("show");
        });
      };

      toggles.forEach((toggle) => {
        toggle.addEventListener("click", (e) => {
          e.preventDefault();
          const dropdown = toggle.closest(".dropdown");
          if (!dropdown) return;
          const menu = dropdown.querySelector(".dropdown-menu");
          if (!menu) return;

          const willOpen = !menu.classList.contains("show");
          closeAll();

          if (willOpen) {
            dropdown.classList.add("show");
            menu.classList.add("show");
          }
        });
      });

      document.addEventListener("click", (e) => {
        if (!e.target.closest(".dropdown")) closeAll();
      });

      window.addEventListener("resize", closeAll);
      window.addEventListener("scroll", closeAll, { passive: true });
    }

    // 3) Mobile navbar UX: close the menu after clicking a link
    const hasBootstrapCollapse =
      typeof window.bootstrap !== "undefined" &&
      typeof window.bootstrap.Collapse === "function";

    if (hasBootstrapCollapse) {
      document.querySelectorAll(".navbar .navbar-collapse").forEach((collapseEl) => {
        collapseEl.addEventListener("click", (e) => {
          const link = e.target.closest?.("a.nav-link, a.dropdown-item");
          if (!link) return;

          // Only close if we're currently in the collapsed (shown) state
          if (!collapseEl.classList.contains("show")) return;

          const instance = window.bootstrap.Collapse.getOrCreateInstance(collapseEl, {
            toggle: false,
          });
          instance.hide();
        });
      });
    }
  });
})();
document.getElementById('gridBtn').classList.remove('active');
document.getElementById('listBtn').classList.remove('active');

if (view === 'grid') {
  document.getElementById('gridBtn').classList.add('active');
} else {
  document.getElementById('listBtn').classList.add('active');
}

el.className = 'item col-md-' + count1;
items.forEach(el => {
  if (view === 'grid') {
    el.className = 'item';   // no bootstrap cols
  } else {
    el.className = 'item col-md-' + count1;
  }
});

document.querySelectorAll('.cont2').forEach(el => {
  el.className = view === 'grid' ? 'cont2' : 'cont2 col-md-' + count;
});

document.querySelectorAll('.cont3').forEach(el => {
  el.className = view === 'grid' ? 'cont3' : 'cont3 col-md-' + count2;
});

document.querySelectorAll('.cont4').forEach(el => {
  el.className = view === 'grid' ? 'cont4' : 'cont4 col-md-' + count3;
});


