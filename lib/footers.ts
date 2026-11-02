// The footer skylines from Figma "Footer explorations" (node 148:2). One is picked at random on every
// page load and again on every in-site page change, never the same one twice in a row.
// Art lives in public/art; the CSS for each scene is in app/globals.css under "footer scenes".
export const footerScenes = [
  { id: "canal", name: "(I) The Canal Houses" },
  { id: "windmills", name: "(II) The Polder" },
  { id: "loop", name: "(III) The Loop" },
  { id: "l", name: "(IV) The L" },
  { id: "greystones", name: "(V) The Greystones" },
  { id: "pier", name: "(VI) Navy Pier" },
] as const;

export type FooterSceneId = (typeof footerScenes)[number]["id"];

const ids = footerScenes.map((s) => s.id);

/** Runs in the browser. Picks a scene other than the last one shown and puts it on <html data-footer>. */
export function pickFooterScene(): string {
  let last: string | null = null;
  try {
    last = document.documentElement.dataset.footer || localStorage.getItem("eap-footer");
  } catch {}
  const pool = ids.filter((id) => id !== last);
  const next = pool[Math.floor(Math.random() * pool.length)];
  document.documentElement.dataset.footer = next;
  try {
    localStorage.setItem("eap-footer", next);
  } catch {}
  return next;
}

/** Inline script for <head>: sets the scene before first paint, so the footer never flashes from one to another. */
export const footerSceneScript = `(function(){var ids=${JSON.stringify(ids)},d=document.documentElement,last=null;try{last=localStorage.getItem("eap-footer")}catch(e){}var pool=ids.filter(function(i){return i!==last});var next=pool[Math.floor(Math.random()*pool.length)];d.dataset.footer=next;window.__eapFooterPath=location.pathname;try{localStorage.setItem("eap-footer",next)}catch(e){}})();`;
