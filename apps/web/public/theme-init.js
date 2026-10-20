(() => {
  try {
    const saved = window.localStorage.getItem("wael-portfolio-theme");
    if (saved === "light" || saved === "dark") {
      document.documentElement.dataset.theme = saved;
    }
  } catch {
    // System preference remains the no-storage default.
  }
})();
