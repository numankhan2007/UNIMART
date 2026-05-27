/**
 * GlowCursor.js
 * Lightweight glow-dot cursor for UNIMART landing page.
 * Desktop: follows mouse with a neon-cyan trailing glow.
 * Mobile/Touch: no-op - native cursor/touch behavior preserved.
 * No CDN deps. No external libs. Pure rAF loop.
 */

let _active = false;
let _raf = null;
let _el = null;

const CURSOR_HTML = `
  <div id="uc-outer" style="
    position:fixed; top:0; left:0;
    width:36px; height:36px;
    border-radius:50%;
    border: 1.5px solid rgba(0,212,255,0.55);
    pointer-events:none; z-index:9999;
    transform:translate(-50%,-50%);
    transition: width 0.2s ease, height 0.2s ease, border-color 0.2s ease, opacity 0.3s;
    will-change: transform;
  "></div>
  <div id="uc-inner" style="
    position:fixed; top:0; left:0;
    width:8px; height:8px;
    border-radius:50%;
    background: rgba(0,212,255,0.9);
    pointer-events:none; z-index:10000;
    transform:translate(-50%,-50%);
    box-shadow: 0 0 12px 4px rgba(0,212,255,0.55);
    will-change: transform;
  "></div>
`;

let outerX = 0;
let outerY = 0;
let innerX = 0;
let innerY = 0;
let mouseX = 0;
let mouseY = 0;

function onMouseMove(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

function loop() {
  if (!_active) return;
  // Inner follows mouse instantly
  innerX += (mouseX - innerX) * 0.9;
  innerY += (mouseY - innerY) * 0.9;
  // Outer trails with lag
  outerX += (mouseX - outerX) * 0.12;
  outerY += (mouseY - outerY) * 0.12;

  const inner = document.getElementById("uc-inner");
  const outer = document.getElementById("uc-outer");
  if (inner) inner.style.transform = `translate(${innerX - 4}px, ${innerY - 4}px)`;
  if (outer) outer.style.transform = `translate(${outerX - 18}px, ${outerY - 18}px)`;

  _raf = requestAnimationFrame(loop);
}

function onMouseEnterLink() {
  const outer = document.getElementById("uc-outer");
  if (outer) {
    outer.style.width = "54px";
    outer.style.height = "54px";
    outer.style.borderColor = "rgba(0,212,255,0.9)";
  }
}

function onMouseLeaveLink() {
  const outer = document.getElementById("uc-outer");
  if (outer) {
    outer.style.width = "36px";
    outer.style.height = "36px";
    outer.style.borderColor = "rgba(0,212,255,0.55)";
  }
}

export function initGlowCursor() {
  // No-op on touch/mobile devices
  if (window.matchMedia("(pointer: coarse)").matches) return;

  if (_active) return;
  _active = true;

  const wrapper = document.createElement("div");
  wrapper.id = "uc-wrapper";
  wrapper.innerHTML = CURSOR_HTML;
  document.body.appendChild(wrapper);
  _el = wrapper;

  document.addEventListener("mousemove", onMouseMove);

  // Expand cursor on interactive elements
  document.querySelectorAll("a, button, [role=\"button\"]").forEach((el) => {
    el.addEventListener("mouseenter", onMouseEnterLink);
    el.addEventListener("mouseleave", onMouseLeaveLink);
  });

  loop();
}

export function destroyGlowCursor() {
  _active = false;
  if (_raf) cancelAnimationFrame(_raf);
  document.removeEventListener("mousemove", onMouseMove);
  if (_el && _el.parentNode) _el.parentNode.removeChild(_el);
  _el = null;
}
