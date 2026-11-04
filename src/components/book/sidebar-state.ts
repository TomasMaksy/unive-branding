/** localStorage key for the sidebar's folded state. */
export const SIDEBAR_KEY = "book-sidebar";

/**
 * Runs from the root layout's <head>, before the sidebar paints: folds the rail if it was
 * folded last time, so a reload keeps its width with no jump.
 */
export const SIDEBAR_SCRIPT = `try{if(localStorage.getItem("${SIDEBAR_KEY}")==="collapsed")document.documentElement.dataset.sidebar="collapsed"}catch(e){}`;
