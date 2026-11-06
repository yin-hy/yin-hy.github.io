(() => {
  const navigation = document.querySelector(".nav-links");
  const backdrop = document.querySelector(".site-backdrop");
  if (!navigation || !backdrop) return;

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "background-toggle";
  toggle.setAttribute("aria-label", "Background animation");
  navigation.append(toggle);

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const storageKey = "haoyu-texture-scroll";
  let preference;
  try {
    const stored = sessionStorage.getItem(storageKey);
    if (stored === "on" || stored === "off") preference = stored === "on";
  } catch {
    // Local file previews can have storage disabled.
  }

  const playing = () => preference ?? !reducedMotion.matches;

  function sync() {
    const active = playing();
    backdrop.dataset.motion = active ? "playing" : "paused";
    toggle.setAttribute("aria-pressed", String(active));
    toggle.title = active ? "Pause background animation" : "Play background animation";
  }

  toggle.addEventListener("click", () => {
    preference = !playing();
    try {
      sessionStorage.setItem(storageKey, preference ? "on" : "off");
    } catch {
      // The current page can still pause or play the animation.
    }
    sync();
  });
  sync();
  if (reducedMotion.addEventListener) reducedMotion.addEventListener("change", sync);
  else reducedMotion.addListener(sync);
})();
