console.log("JS loaded");
document.querySelectorAll("details").forEach((el) => {
  el.addEventListener("toggle", () => {
    if (!el.open) return;

    // wait for expansion to render
    requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const offset = 24; // small breathing room

      window.scrollBy({
        top: rect.top - offset,
        behavior: "smooth"
      });
    });
  });
});

// Learn More: one open at a time, panel opens below
(function () {
  const grid = document.querySelector("[data-learn-more]");
  if (!grid) return;

  const toggles = Array.from(grid.querySelectorAll(".learn-more-toggle"));
  const panels = Array.from(document.querySelectorAll(".learn-more-panel"));

  function closeAll() {
    toggles.forEach(t => t.setAttribute("aria-expanded", "false"));
    panels.forEach(p => p.classList.remove("is-active"));
  }

  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-target");
      const panel = document.getElementById(id);
      const isOpen = btn.getAttribute("aria-expanded") === "true";

      closeAll();

      if (!isOpen && panel) {
        btn.setAttribute("aria-expanded", "true");
        panel.classList.add("is-active");
      }
    });
  });
})();