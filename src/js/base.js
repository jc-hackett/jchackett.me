/* ===== Boot / Diagnostics ===== */
console.log("JS loaded");

/* ===== Schedule Consultation Button ===== */
document.addEventListener("DOMContentLoaded", () => {
  const scheduleLink = document.querySelector("#schedule-consultation");
  const contactDetails = document.querySelector("#contact-me");

  if (!scheduleLink || !contactDetails) return;

  scheduleLink.addEventListener("click", function () {
    contactDetails.open = true;
  });
});

/* ===== Menu Controller ===== */
(function menuController() {
  const options = Array.from(document.querySelectorAll(".menu-option"));
  const panels = Array.from(document.querySelectorAll(".menu-panel"));

  if (!options.length || !panels.length) return;

  function setActivePanel(index) {
    options.forEach((option, i) => {
      const isActive = i === index;
      option.classList.toggle("active", isActive);
      option.setAttribute("aria-selected", String(isActive));
    });

    panels.forEach((panel, i) => {
      const isActive = i === index;
      panel.classList.toggle("active", isActive);
      panel.hidden = !isActive;
    });
  }

  options.forEach((option, index) => {
    option.addEventListener("click", function () {
      const isAlreadyOpen = option.classList.contains("active");

      if (isAlreadyOpen) {
        options.forEach((btn) => {
          btn.classList.remove("active");
          btn.setAttribute("aria-selected", "false");
        });

        panels.forEach((panel) => {
          panel.classList.remove("active");
          panel.hidden = true;
        });

        return;
      }

      setActivePanel(index);
    });
  });

  panels.forEach((panel, index) => {
    panel.hidden = !panel.classList.contains("active");

    if (panel.classList.contains("active")) {
      options[index]?.classList.add("active");
      options[index]?.setAttribute("aria-selected", "true");
    }
  });
})();