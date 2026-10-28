/**
 * First-visit envelope gate. Plain module (not "use client") so the server layout can inline the script.
 */

/** localStorage key: set once the guest has opened the invitation, so it only plays on the first visit. */
export const OPENED_KEY = "tb27-opened";
/** Id of the style tag the head script injects for returning guests (see ENVELOPE_GATE). */
export const HIDE_ID = "tb-env-hide";

/**
 * Runs while the HTML is still parsing, before the envelope paints: returning guests get a style tag
 * that hides it, so they never see a flash of envelope. `?envelope` in the URL forces it to show (for previewing).
 */
export const ENVELOPE_GATE = `try{if(!/[?&]envelope\\b/.test(location.search)&&localStorage.getItem("${OPENED_KEY}")){var s=document.createElement("style");s.id="${HIDE_ID}";s.textContent=".tb-env{display:none!important}";document.head.appendChild(s)}}catch(e){}`;

/** Ask the envelope to play again (the footer's "open the invitation again" link). */
export const REPLAY_EVENT = "tb27-envelope-replay";
