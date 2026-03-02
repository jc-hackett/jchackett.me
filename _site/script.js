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