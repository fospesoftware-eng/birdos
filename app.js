/* ============================================================
   BirdOS — Luxury Hospitality Operating System
   © Aurelia Hospitality · crafted for five-star operations
   ============================================================ */
'use strict';

/* ---------------- Utils ---------------- */
const $  = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const money  = n => '$' + Math.round(n).toLocaleString('en-US');
const moneyK = n => '$' + (n >= 1000 ? (n / 1000).toFixed(n % 1000 ? 1 : 0) + 'k' : n);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const rng = mulberry32(20261008);
const initials = n => n.split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase();
const avCls = n => 'av-' + (([...n].reduce((a,c)=>a+c.charCodeAt(0),0)%6)+1);
function avatar(name, size='av-32'){ return `<span class="av ${size} ${avCls(name)}"><span class="av-init">${initials(name)}</span></span>`; }
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const addDays = (d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x;};
const fmtDate = d => `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;

/* ---------------- Icons (lucide-style) ---------------- */
const PATHS = {
  dashboard:'<rect x="3" y="3" width="7" height="9" rx="2"/><rect x="14" y="3" width="7" height="5" rx="2"/><rect x="14" y="12" width="7" height="9" rx="2"/><rect x="3" y="16" width="7" height="5" rx="2"/>',
  calendar:'<rect x="3" y="4" width="18" height="18" rx="2.5"/><path d="M8 2v4M16 2v4M3 10h18"/>',
  calendarPlus:'<rect x="3" y="4" width="18" height="18" rx="2.5"/><path d="M8 2v4M16 2v4M3 10h18M12 14v6M9 17h6"/>',
  userCheck:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m16 11 2 2 4-4"/>',
  users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  monitor:'<rect x="2" y="3" width="20" height="14" rx="2.5"/><path d="M8 21h8M12 17v4"/>',
  key:'<circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.7 12.3 8.3-8.3M16 7l3 3M14 9l2 2"/>',
  brush:'<path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"/>',
  utensils:'<path d="M3 2v7c0 1.1.9 2 2 2a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>',
  trend:'<path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  message:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  zap:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  chart:'<path d="M3 3v18h18"/><path d="M7 16l4-5 3 3 5-7"/>',
  bars:'<path d="M18 20V10M12 20V4M6 20v-6"/>',
  settings:'<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3"/><path d="M1 14h6M9 8h6M17 16h6"/>',
  search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon:'<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  chevronLeft:'<path d="m15 18-6-6 6-6"/>',
  chevronRight:'<path d="m9 18 6-6-6-6"/>',
  chevronDown:'<path d="m6 9 6 6 6-6"/>',
  arrowUp:'<path d="M12 19V5M5 12l7-7 7 7"/>',
  arrowDown:'<path d="M12 5v14M19 12l-7 7-7-7"/>',
  arrowRight:'<path d="M5 12h14M12 5l7 7-7 7"/>',
  arrowUpRight:'<path d="M7 17 17 7M7 7h10v10"/>',
  x:'<path d="M18 6 6 18M6 6l18 18"/>',
  menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',
  briefcase:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  check:'<path d="M20 6 9 17l-5-5"/>',
  checkCircle:'<circle cx="12" cy="12" r="10"/><path d="m8.5 12.5 2.5 2.5 4.5-5"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  mapPin:'<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  wifi:'<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><path d="M12 20h.01"/>',
  battery:'<rect x="1" y="6" width="18" height="12" rx="2.5"/><path d="M23 13v-2"/>',
  download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>',
  filter:'<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
  sparkles:'<path d="m12 3 1.8 4.8L18.5 9.5l-4.7 1.7L12 16l-1.8-4.8L5.5 9.5l4.7-1.7z"/><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8zM5 15l.7 1.8L7.5 17.5l-1.8.7L5 20l-.7-1.8L2.5 17.5l1.8-.7z"/>',
  send:'<path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/>',
  phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mail:'<rect x="2" y="4" width="20" height="16" rx="2.5"/><path d="m2 7 10 7 10-7"/>',
  droplet:'<path d="M12 2.69 17.66 8.35a8 8 0 1 1-11.31 0z"/>',
  thermometer:'<path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>',
  wind:'<path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>',
  bulb:'<path d="M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5"/>',
  wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  coffee:'<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z"/><path d="M6 1v3M10 1v3M14 1v3"/>',
  wine:'<path d="M8 22h8M12 15v7"/><path d="M20.84 5.22a2 2 0 0 0-.18-2.31A1.95 1.95 0 0 0 19.2 2H4.8a1.95 1.95 0 0 0-1.46.91 2 2 0 0 0-.18 2.31C4.79 8.3 7.7 11.6 11 11.93V15"/>',
  shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  qr:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v7h-4M17 21h4"/>',
  refresh:'<path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
  power:'<path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10"/>',
  plusCircle:'<circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>',
  fileText:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
  pie:'<path d="M21.21 15.89A10 0 1 1 8 2.83M22 12A10 10 0 0 0 12 2v10z"/>',
  layers:'<polygon points="12 2 2 7 12 12 22 7 12 2"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
  database:'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>',
  lock:'<rect x="3" y="11" width="18" height="11" rx="2.5"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>',
  mousePointer:'<path d="m3 3 7.07 17 2.51-7.39L20 10.07 3 3z"/>',
  hand:'<path d="M18 11V6a2 2 0 0 0-4 0v5M14 10V4a2 2 0 0 0-4 0v6M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
  clipboard:'<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>',
  dollar:'<path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  percent:'<path d="M19 5 5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
  building:'<path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/><path d="M9 7h.01M9 11h.01M9 15h.01M15 7h.01M15 11h.01M15 15h.01"/>',
  luggage:'<path d="M6 19a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M6 19v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1M10 11h4"/>',
  smartphone:'<rect x="5" y="2" width="14" height="20" rx="2.5"/><path d="M12 18h.01"/>',
  bed:'<path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h22"/><path d="M6 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/>',
  alert:'<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/>',
  info:'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  star:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  heart:'<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5 0 0 0 0-7.78z"/>',
  cake:'<path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1M2 21h20M7 8v3M12 8v3M17 8v3M7 4h.01M12 4h.01M17 4h.01"/>',
  car:'<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
  globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  card:'<rect x="2" y="5" width="20" height="14" rx="2.5"/><path d="M2 10h20"/>',
  cash:'<rect x="2" y="6" width="20" height="12" rx="2.5"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>',
  video:'<rect x="2" y="6" width="14" height="12" rx="2.5"/><path d="m22 8-6 4 6 4z"/>',
  headphones:'<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>',
  leaf:'<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/>',
  activity:'<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  feather:'<path d="M20.24 12.24a6 6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><path d="M16 8 2 22M17.5 15H9"/>',
  spa:'<path d="M12 22c4-3 6-6 6-10a6 6 0 0 0-12 0c0 4 2 7 6 10z"/><path d="M12 10c0-3 2-5 5-6M12 10c0-3-2-5-5-6"/>',
  wine2:'',
  gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
  package:'<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>',
  shoppingBag:'<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/>',
  code:'<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  home:'<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  sofa:'<path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0z"/><path d="M4 18v2M20 18v2"/>',
};
const icon = (name, cls='') => `<svg class="${cls}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PATHS[name]||''}</svg>`;

/* Brand bird mark */
const BIRD = '<svg viewBox="0 0 32 32">'+
  '<path d="M16 15.5 C 10.5 11.5, 4.5 9.5, 1.5 10.5 C 6 12.5, 11 14.5, 15 16.5 Z" style="fill:#7A5E1A"/>'+
  '<path d="M16 15.5 C 21.5 11.5, 27.5 9.5, 30.5 10.5 C 26 12.5, 21 14.5, 17 16.5 Z" style="fill:#7A5E1A"/>'+
  '<path d="M16 16.5 C 11.5 13.5, 6 12.5, 3 13.5 C 7.5 15.5, 12 16.5, 15.5 17.5 Z" style="fill:url(#gGold)"/>'+
  '<path d="M16 16.5 C 20.5 13.5, 26 12.5, 29 13.5 C 24.5 15.5, 20 16.5, 16.5 17.5 Z" style="fill:url(#gGold)"/>'+
  '<path d="M14 17 C 11 16, 7 16.5, 4 18 C 8 18.5, 11.5 18.5, 14 18 Z" style="fill:#8A6B1F"/>'+
  '<path d="M18 17 C 21 16, 25 16.5, 28 18 C 24 18.5, 20.5 18.5, 18 18 Z" style="fill:#8A6B1F"/>'+
  '<path d="M16 14.5 C 17.6 14.5, 18.6 16.5, 18 19.5 C 17.4 22, 14.6 22, 14 19.5 C 13.4 16.5, 14.4 14.5, 16 14.5 Z" style="fill:url(#gGold)"/>'+
  '<circle cx="16" cy="12.4" r="1.9" style="fill:url(#gGold)"/>'+
  '<path d="M16 10.7 L17.6 8.8 L15.1 9.7 Z" style="fill:#D4B872"/>'+
  '<circle cx="16.1" cy="12.3" r=".45" style="fill:#14110C"/>'+
  '<path d="M15 21 C 12.5 23, 10 25, 7.5 26 C 10.5 24, 13 22, 15.5 21 Z" style="fill:#7A5E1A"/>'+
  '<path d="M17 21 C 19.5 23, 22 25, 24.5 26 C 21.5 24, 19 22, 16.5 21 Z" style="fill:#7A5E1A"/>'+
  '<path d="M15.5 21.5 C 14 24, 13 26, 12.5 27.5 C 14 25.5, 15 23.5, 16 22 Z" style="fill:#8A6B1F"/>'+
  '<path d="M16.5 21.5 C 18 24, 19 26, 19.5 27.5 C 18 25.5, 17 23.5, 16 22 Z" style="fill:#8A6B1F"/>'+
'</svg>';

/* ---------------- Imagery (generated luxury photography) ---------------- */
const imgUrl = (prompt, size='landscape_16_9') =>
  `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=${size}`;
const IMG = {
  exterior: imgUrl('aerial cinematic view of ultra luxury island resort at golden sunset, overwater villas with thatched roofs, turquoise lagoon, infinity pool, palm trees, warm glowing lights, five star hotel architectural photography'),
  villa:    imgUrl('presidential overwater villa interior, king bed with champagne silk linens, marble bath, brushed brass and gold accents, glass floor panels, ocean sunset through floor to ceiling windows, cinematic interior photography'),
  dining:   imgUrl('michelin star fine dining restaurant interior, crystal glassware, candlelight tables, white phalaenopsis orchids, dark walnut wood and brass details, moody cinematic luxury photography'),
  bar:      imgUrl('luxury hotel cocktail bar and cigar lounge at night, backlit amber spirit bottles, velvet armchairs, brass and onyx details, warm cinematic moody photography'),
  spa:      imgUrl('ultra luxury hotel spa interior, travertine stone, teak wood, floating candles, white orchids, soft steam and light beams, serene cinematic architectural photography'),
  lobby:    imgUrl('grand luxury hotel lobby at dusk, sculptural spiral staircase, book matched marble floors, cascading crystal chandelier, brushed gold accents, cinematic interior photography'),
};

/* ---------------- Mock data ---------------- */
const PROPERTY = {
  name:'Aurelia Royal Sands', location:'Baa Atoll · Maldives', keys:342,
  weather:'29°C · Clear skies', sunset:'18:04', gm:'Alexandre Laurent',
};

/* Multi-property registry · BirdOS supports multiple hotel properties.
   The active property drives the topbar chip, housekeeping data, and 3D twins. */
const PROPERTIES = [
  {id:'aurelia', name:'Aurelia Royal Sands', brand:'BirdOS Collection', location:'Baa Atoll · Maldives', keys:342,
   gm:'Alexandre Laurent', weather:'29°C · Clear skies', sunset:'18:04', accent:'gold'},
  {id:'novotel', name:'Novotel Grand Saigon', brand:'Accor · Novotel', location:'Nguyễn Tất Thành · Saigon', keys:248,
   gm:'Camille Đỗ', weather:'31°C · Partly cloudy', sunset:'17:48', accent:'teal'},
];
const activeProperty=()=>{ try{ const id=localStorage.getItem('birdos-property'); return PROPERTIES.find(p=>p.id===id)||PROPERTIES[0]; }catch(e){ return PROPERTIES[0]; } };
const setProperty=id=>{ try{ localStorage.setItem('birdos-property',id); }catch(e){} };

/* Novotel floor plan dataset (Vietnamese project · Accor Novotel brand) */
const NOV_FLOORS=[
  {id:'1F', name:'Ground · Lobby & F&B', gfa:1401, nfa:1103, eff:78.8,
   areas:['Drop-off canopy','Lobby & reception (quầy lễ tân)','Restaurant / F&B','Kitchen','Elevator & stair core','Landscaped entrance'],
   note:'GFA 1,401 m² · NFA 1,103 m² · 78.8% efficiency. Fronts Nguyễn Tất Thành street.'},
  {id:'2F', name:'Grand Ballroom', gfa:1911, nfa:1427, eff:74.0,
   areas:['Grand Ballroom (sảnh hội nghị)','Round banquet tables ×24','Stage','Pre-function / reception lounge','Food storage & prep','Service way (magenta) · guest way (blue)'],
   note:'GFA 1,911 m² · NFA 1,427 m² · 74.0% efficiency. Column-free ballroom with stage and pre-function lounge.'},
  {id:'3F', name:'Meeting Rooms', gfa:1112, nfa:614, eff:55.0,
   areas:['Meeting rooms PHÒNG HỌP (10–30 seats)','Boardroom (30 seats)','Training room (40 seats)','Technical room','Atrium voids (thông tầng)'],
   note:'GFA 1,112 m² · NFA 614 m² · 55.0% efficiency. Flexible meeting rooms around central atrium voids.'},
  {id:'TF', name:'Technical Floor', gfa:1859, nfa:1450, eff:78.0,
   areas:['Chiller room','Pump room','Pool technical · balance tank · pool pump','Server / MDF room','Staff locker & restrooms'],
   note:'GFA 1,859 m² · NFA 1,450 m² · 78.0% efficiency. Central plant serving the whole tower.'},
  {id:'4F', name:'Pool Deck & Guest Rooms', gfa:1393, nfa:920, eff:66.0,
   areas:['Guest rooms (north wing)','Ballroom (centre)','Outdoor dining terrace','Swimming pool (southeast)','Pool bar & loungers'],
   note:'GFA 1,393 m² · NFA 920 m² · 66.0% efficiency. Rooftop pool deck with outdoor F&B and north-facing guest rooms.'},
];

const NAMES = ['Isabella Moreau','Rajiv Malhotra','Chen Wei','Amara Okafor','Lucas Meyer','Sofia Rinaldi','Omar Al-Farsi','Yuki Tanaka','Grace Whitmore','Diego Fernández','Elena Petrova','James Whitford','Aiko Nakamura','Sebastian Costa','Priya Raghavan','Henrik Larsson'];

const GUESTS = [
  {id:1,name:'Isabella Moreau',tier:'Noir',room:'Villa 501',status:'arriving',time:'14:20',nights:4,pax:2,rate:3480,balance:0,source:'Direct',prefs:['Anniversary setup','Vintage Krug','Late check-out'],note:'Returning guest · 6th stay · 10th wedding anniversary'},
  {id:2,name:'Sofia Rinaldi',tier:'Noir',room:'Suite 502',status:'arriving',time:'16:40',nights:6,pax:2,rate:3120,balance:5200,source:'Virtuoso',prefs:['Honeymoon','Rose petals','Spa booking'],note:'Honeymoon · requested overwater dinner on night 2'},
  {id:3,name:'Diego Fernández',tier:'Noir',room:'Pavilion 402',status:'arriving',time:'13:50',nights:3,pax:4,rate:2680,balance:2680,source:'Direct',prefs:['Two children','Kids club','High floor'],note:'Family · birthday cake for child on 9 Oct'},
  {id:4,name:'Amara Okafor',tier:'Pearl',room:'Room 312',status:'arriving',time:'15:05',nights:5,pax:2,rate:1480,balance:1480,source:'Booking.com',prefs:['Feather-free','Early breakfast'],note:''},
  {id:5,name:'Yuki Tanaka',tier:'Pearl',room:'Room 315',status:'arriving',time:'18:10',nights:2,pax:1,rate:1560,balance:3120,source:'Expedia',prefs:['High floor','Silent room'],note:''},
  {id:6,name:'Chen Wei',tier:'Noir',room:'Villa 503',status:'inhouse',time:'Since 5 Oct',nights:7,pax:2,rate:3980,balance:4280,source:'Direct',prefs:['Butler service','Whisky selection','Yoga 06:30'],note:'Folio open · spa spend $6,100 YTD'},
  {id:7,name:'Lucas Meyer',tier:'Aureate',room:'Suite 405',status:'inhouse',time:'Since 6 Oct',nights:5,pax:2,rate:2240,balance:0,source:'Direct',prefs:['Surf guide','Extra espresso'],note:'Folio settled · tokenized card on file'},
  {id:8,name:'Omar Al-Farsi',tier:'Aureate',room:'Room 208',status:'inhouse',time:'Since 4 Oct',nights:9,pax:3,rate:1860,balance:1860,source:'GDS',prefs:['Airport transfer','Qibla direction'],note:''},
  {id:9,name:'Elena Petrova',tier:'Pearl',room:'Room 318',status:'inhouse',time:'Since 7 Oct',nights:4,pax:2,rate:1520,balance:760,source:'Booking.com',prefs:['Extra towels'],note:''},
  {id:10,name:'James Whitford',tier:'Aureate',room:'Room 204',status:'inhouse',time:'Since 6 Oct',nights:4,pax:2,rate:1780,balance:0,source:'Direct',prefs:['Wake-up 05:45','Diving'],note:''},
  {id:11,name:'Rajiv Malhotra',tier:'Aureate',room:'Suite 410',status:'dueout',time:'By 12:00',nights:3,pax:2,rate:2340,balance:640,source:'Direct',prefs:['Late check-out req.','Airport transfer'],note:'Requested 14:00 departure — awaiting approval'},
  {id:12,name:'Grace Whitmore',tier:'Aureate',room:'Room 210',status:'dueout',time:'By 12:00',nights:5,pax:2,rate:1920,balance:0,source:'Wholesaler',prefs:['Printed folio'],note:'Folio settled · NPS survey sent'},
];

/* Room rows for the reservation graph */
const RM_ROWS = [
  {fl:'Floor 5 · Villas', rooms:[{no:'501',type:'Royal Beach Villa'},{no:'502',type:'Overwater Suite'},{no:'503',type:'Overwater Suite'}]},
  {fl:'Floor 4 · Pavilions', rooms:[{no:'401',type:'Grand Pool Pavilion'},{no:'402',type:'Grand Pool Pavilion'},{no:'405',type:'Horizon Suite'},{no:'410',type:'Horizon Suite'}]},
  {fl:'Floor 3 · Lagoon', rooms:[{no:'312',type:'Deluxe Lagoon'},{no:'315',type:'Deluxe Lagoon'},{no:'318',type:'Deluxe Garden'}]},
  {fl:'Floor 2 · Beach', rooms:[{no:'204',type:'Premium Beach'},{no:'208',type:'Premium Beach'},{no:'210',type:'Premium Beach'},{no:'212',type:'Premium Beach'}]},
];
const TIMELINE = (() => {
  const r = mulberry32(421);
  const rows = [];
  RM_ROWS.forEach(g => g.rooms.forEach(room => {
    const bookings = [];
    let d = -Math.floor(r()*3);
    while(d < 14){
      if(r() < 0.18){ d += 1 + Math.floor(r()*2); continue; }
      const len = 1 + Math.floor(r()*4);
      if(d + len > 0 && d < 14){
        const spans = d < 0;
        const kind = spans && d + len === 1 ? 'due' : spans ? 'stay' : d === 0 ? 'arr' : 'conf';
        bookings.push({start:d, len, kind,
          name:NAMES[Math.floor(r()*NAMES.length)],
          rate: 1180 + Math.floor(r()*2780),
          src:['Direct','Booking.com','Virtuoso','Expedia','GDS'][Math.floor(r()*5)]});
      }
      d += len + Math.floor(r()*2);
    }
    if(room.no==='318') bookings.push({start:6,len:2,kind:'ooo',name:'Maintenance — deep clean',rate:0,src:'Internal'});
    rows.push({...room, fl:g.fl, bookings});
  }));
  return rows;
})();

/* series */
const REV30 = Array.from({length:30},(_,i)=>{
  const base = 168 + Math.sin(i/3.4)*18 + i*1.7;
  const weekend = i%7===5||i%7===6 ? 26 : 0;
  return Math.round((base + rng()*26 + weekend)*1000);
});
const EXP30 = REV30.map(v=>Math.round(v*(.34+rng()*.08)));
const SPARKS = {
  occ:[72,75,74,78,80,79,83,82,85,84,86,87],
  adr:[1180,1210,1190,1260,1240,1310,1290,1360,1340,1410,1450,1482],
  rev:[142,150,148,162,158,171,168,179,176,188,201,218],
  gop:[38,40,39,43,42,45,44,47,46,49,51,54],
};

const PULSE = [
  ['gold','Villa 501','Isabella Moreau checked in via Kiosk 1 — digital key delivered'],
  ['green','F&B','L\'Or Bleu: table 12 opened a $2,480 sommelier pairing'],
  ['blue','Concierge','Airport seaplane RPL-204 landed — 6 guests inbound'],
  ['red','Housekeeping','Room 312 flagged urgent turn · Priya assigned'],
  ['gold','Revenue','Aves raised BAR for 18 Oct to $2,140 (+8%)'],
  ['green','Spa','Overwater couple treatment completed · NPS 10'],
  ['blue','Guest messaging','Sofia Rinaldi confirmed overwater dinner, 20:30'],
  ['green','Payments','$18,240 auto-reconciled across 4 merchant batches'],
  ['red','Engineering','Pool pavilion 401: thermostat offline — ticket #T-2091'],
  ['gold','Upsell','12 pool-upgrade offers accepted this morning · $31,400'],
];

const FEED = [
  ['checkCircle','green','14:12','Isabella Moreau','Completed mobile check-in · key active','Villa 501'],
  ['bell','gold','14:04','Aves AI','Sent pool-pavilion upgrades to 14 eligible guests','$12,400'],
  ['card','blue','13:58','Payments','Auto-settled 11 folios from last night','$46,280'],
  ['car','amber','13:41','Concierge','Seaplane RPL-118 departed with 8 guests','On time'],
  ['brush','red','13:30','Housekeeping','Room 312 moved to priority turn','Due 15:00'],
  ['wine','gold','13:12','Ember Bar','Table 07 opened a 1982 Bordeaux pairing','$3,900'],
  ['star','green','12:54','Reputation','New 10/10 review posted · Booking.com','Published'],
  ['key','blue','12:40','Front Desk','Digital key reissued to Chen Wei','Villa 503'],
  ['droplet','amber','12:22','Engineering','Spa pool pH rebalanced · back to range','28.6°C'],
  ['zap','gold','11:58','Automation','Night audit closed · all 342 rooms posted','0 errors'],
];

const NOTIFS = [
  ['alert','red','Butler alert','Isabella Moreau arrives at 14:20 — anniversary amenity due in Villa 501','12m'],
  ['trend','gold','Revenue approval','Aves recommends +8% BAR for 18 Oct (comp set $2,360)','34m'],
  ['key','blue','Kiosk 2','Session paused: passport scan needs staff assistance','41m'],
  ['star','green','New review','“The finest resort experience we have ever had.” · 10/10 · Booking.com','1h'],
  ['brush','amber','Housekeeping','8 rooms still dirty against 4 departures expected before 15:00','2h'],
  ['shield','blue','Security','New device sign-in: Safari · Malé · verified','3h'],
];

const KIOSKS = [
  {id:'K1',name:'Grand Lobby Kiosk',loc:'Arrival Pavilion',st:'session',sessions:42,sec:74,bat:92,net:'5G'},
  {id:'K2',name:'Grand Lobby Kiosk',loc:'Arrival Pavilion',st:'online',sessions:38,sec:81,bat:67,net:'5G'},
  {id:'K3',name:'Spa Pavilion',loc:'Wellness Village',st:'online',sessions:19,sec:68,bat:88,net:'Wi-Fi 6'},
  {id:'K4',name:'Beach Club',loc:'East Shore',st:'idle',sessions:24,sec:90,bat:41,net:'5G'},
  {id:'K5',name:'Residences Tower',loc:'West Wing',st:'online',sessions:16,sec:77,bat:96,net:'Wi-Fi 6'},
];

const TEAM = [
  {n:'Aisha Nazim',fl:'Floor 5',done:6,total:8},{n:'Marco Silva',fl:'Floor 4',done:9,total:12},
  {n:'Priya Devi',fl:'Floor 3',done:7,total:10},{n:'Kenji Mori',fl:'Floor 2',done:11,total:14},
  {n:'Lauren Adey',fl:'Suites',done:4,total:6},{n:'Daniel Cruz',fl:'Public',done:5,total:7},
];
const TICKETS = [
  ['red','wrench','Urgent · Pavilion 401','Thermostat offline — guest returning at 16:00','Engineering · 24m'],
  ['amber','droplet','Room 210','Slow drain in vanity basin','Plumbing · Today'],
  ['gold','bulb','L\'Or Bleu','Pendant light flickering at table 12','Electrical · Tomorrow'],
  ['blue','wind','Beach Club','Cabana fan speed controller replaced','Scheduled · 11 Oct'],
];

const OUTLETS = [
  {n:"L'Or Bleu",d:'Fine dining · French-Japanese',img:IMG.dining,covers:68,rev:28400,avg:418,live:'Service',cap:92},
  {n:'Ember Bar',d:'Cocktails · Cigar lounge',img:IMG.bar,covers:92,rev:14860,avg:162,live:'Open',cap:64},
  {n:'Palm Court',d:'All-day dining · Terrace',img:IMG.exterior,covers:146,rev:18240,avg:125,live:'Peak',cap:88},
  {n:'In-Suite Dining',d:'24h · Butlers & chefs',img:IMG.villa,covers:88,rev:21930,avg:249,live:'Live',cap:null},
];
const TABLES = [
  ['T1','ts-free','Free'],['T2','ts-seated','2 guests'],['T3','ts-course','Main'],['T4','ts-bill','Bill'],
  ['T5','ts-res','20:30'],['T6','ts-free','Free'],['T7','ts-seated','4 guests'],['T8','ts-course','Dessert'],
  ['T9','ts-free','Free'],['T10','ts-bill','Bill'],['T11','ts-seated','2 guests'],['T12','ts-course','Wine pair'],
];

const CHANNELS = [
  {n:'Direct · birdos booking engine',v:312,pct:44,fee:0,c:'#206A4E'},
  {n:'Booking.com',v:156,pct:22,fee:17,c:'#355E8E'},
  {n:'Expedia',v:92,pct:13,fee:18,c:'#B27A26'},
  {n:'Virtuoso · Travel advisors',v:78,pct:11,fee:9,c:'#6E5A9E'},
  {n:'Wholesaler',v:43,pct:6,fee:23,c:'#9B3D50'},
  {n:'GDS · Corporate',v:28,pct:4,fee:12,c:'#5D7890'},
];

const CONVS = [
  {n:'Isabella Moreau',ch:'WhatsApp',tier:'Noir',unread:2,time:'14:08',last:'Perfect — can we also arrange a cake for...',
   msgs:[['in','Good afternoon! Our seaplane lands around 14:20. Could we have an early check-in? 🌅','13:54'],
         ['out','Bonjour Isabella — your Villa 501 is already prepared. Kiosk 1 will have your key ready, or our butler can greet you on arrival. 🍾','14:02'],
         ['in','Perfect — can we also arrange a cake for our anniversary?','14:08']]},
  {n:'Rajiv Malhotra',ch:'Email',tier:'Aureate',unread:1,time:'12:40',last:'Could I have a copy of the folio for...',
   msgs:[['in','Good morning, could I have a copy of the folio for accounting?','12:31'],
         ['out','Of course, Mr Malhotra. A PDF has been sent to your registered email and the BirdOS guest app.','12:38'],
         ['in','Could I have a copy of the folio for the spa charges separately?','12:40']]},
  {n:'Amara Okafor',ch:'SMS',tier:'Pearl',unread:0,time:'11:58',last:'Confirmed. See you at the airport lounge.',
   msgs:[['out','Ms Okafor, your airport lounge pass is attached. Counter C opens at 13:00.','11:40'],
         ['in','Confirmed. See you at the airport lounge.','11:58']]},
  {n:'Sofia Rinaldi',ch:'WhatsApp',tier:'Noir',unread:0,time:'11:20',last:'The overwater dinner is confirmed for 20:30.',
   msgs:[['in','Is the overwater private dinner available Tuesday?','10:48'],
         ['out','Yes — we hold sunset 18:30 and moonlight 20:30. Shall I reserve the moonlight table with the 7-course tasting?','11:05'],
         ['in','Moonlight, please! 🌙','11:15'],
         ['out','The overwater dinner is confirmed for 20:30. Your butler will escort you.','11:20']]},
  {n:'Chen Wei',ch:'In-App',tier:'Noir',unread:0,time:'10:02',last:'The 1998 selection is on its way to your villa.',
   msgs:[['in','Do you have any aged single malt above 25 years?','09:48'],
         ['out','We have a 1989 Macallan and a 1998 Springbank. The 1989 is quite rare — shall I decant?','09:56'],
         ['in','The 1998 please, two glasses.','10:00'],
         ['out','The 1998 selection is on its way to your villa.','10:02']]},
  {n:'Omar Al-Farsi',ch:'WhatsApp',tier:'Aureate',unread:0,time:'Yesterday',last:'Prayer mats are in the room already.',
   msgs:[['in','Please ensure prayer mats and Qibla direction in the room.','Yesterday'],
         ['out','Prayer mats are in the room already, and a compass card is placed bedside.','Yesterday']]},
];

const AUTOMATIONS = [
  {t:'Contactless arrival',on:['Check-in window opens','Digital key + WhatsApp welcome','kiosk link'],runs:38,ok:99.2,on2:true},
  {t:'Pre-arrival upsell flow',on:['24h before arrival','Spa, dining & room upgrades','Aves targeting'],runs:24,ok:100,on2:true},
  {t:'Tokenized payment retry',on:['Balance pending 48h','Vaulted card recharge','smart dunning'],runs:11,ok:96.4,on2:true},
  {t:'Post-stay reputation',on:['Checkout complete','NPS survey + review routing','at 11:00 next day'],runs:35,ok:100,on2:true},
  {t:'Proactive housekeeping',on:['Guest checks out','Nearest idle attendant assigned','IoT room sensor'],runs:39,ok:98.7,on2:true},
  {t:'Noir VIP choreography',on:['Noir tier ETA < 2h','Butler + GM notified','champagne & amenity'],runs:6,ok:100,on2:false},
];

const REVIEWS = [
  {src:'Booking.com',score:'10',txt:'“The finest resort experience we have ever had — every detail anticipated before we asked.”',who:'Isabella M. · Oct 2026'},
  {src:'Google',score:'5.0',txt:'“Seamless kiosk check-in, digital keys worked flawlessly, and the butler service is genuinely world-class.”',who:'Rajiv M.'},
  {src:'Tripadvisor',score:'5',txt:'“Aves AI curated our entire stay. The overwater dinner was unforgettable.”',who:'Sofia R.'},
  {src:'Expedia',score:'9.4',txt:'“Housekeeping was invisible and immaculate. Spa is worth the journey alone.”',who:'Amara O.'},
];

const SEGMENTS = [
  {n:'Honeymoon & Romance',v:318,ch:14,ic:'heart',c:'red'},
  {n:'Wellness Retreats',v:204,ch:9,ic:'leaf',c:'green'},
  {n:'Multi-generational',v:412,ch:18,ic:'users',c:'blue'},
  {n:'Business Elite',v:96,ch:4,ic:'briefcase',c:'violet'},
  {n:'Culinary Travellers',v:274,ch:12,ic:'utensils',c:'gold'},
  {n:'Long-stay Residents',v:188,ch:8,ic:'key',c:'amber'},
];

const INTEGRATIONS = [
  ['Stripe','Payments','Connected','green'],['SiteMinder','Channel manager','Connected','green'],
  ['Booking.com','Channel','Connected','green'],['Expedia','Marketplace','Connected','green'],
  ['Xero','Accounting','Connected','green'],['QuickBooks','Accounting','Available','grey'],
  ['Agilysys','PMS migration','Available','grey'],['OpenKey','Digital keys','Connected','green'],
];

/* ---------------- State ---------------- */
const S = { view:'overview', prop:activeProperty().id, msgSel:0, hmSel:10, selectedBooking:null, notifOpen:false };
const VIEW_META = {
  overview:['Command Center','Live · Aurelia Royal Sands'],
  reservations:['Reservation Graph','14-day horizon · 342 keys'],
  frontdesk:['Front Desk','Arrivals, in-house & departures'],
  kiosks:['Kiosks & Keyless','Self check-in fleet · digital keys'],
  hospitalitytv:['Hospitality TV','In-room TV fleet · greetings & broadcast control'],
  housekeeping:['Housekeeping & Facilities','Rooms, engineering & smart facilities'],
  floorplan:['3D Floor Plans','Studio · Deluxe · Suite · 1 BHK · ultra-realistic interiors'],
  facilities:['Facility Management','3D resort map · pool, boardrooms, parking · live staff'],
  command:['Command Tower','3D digital twin · live staff & room allocation · day/night'],
  inventory:['Asset Management','Room inventory · 3D interiors · asset register'],
  novotel:['Novotel 3D Twin','Ultra-realistic exterior · 5 floor plans · housekeeping integration'],
  fb:['Dining & POS','Outlets, tables & settlements'],
  revenue:['Revenue & Pricing','Dynamic rates · demand science'],
  intel:['Guest Intelligence','Segments, sentiment & loyalty'],
  messages:['Guest Messages','Conversations across channels'],
  automations:['Automations','Guest journeys that run themselves'],
  reports:['Reports & BI','Night audit, analytics & exports'],
  settings:['Settings','Property, brand & integrations'],
};

/* ---------------- Toasts ---------------- */
function toast(title, sub='', type='success'){
  const ic = type==='success'?'checkCircle':type==='alert'?'alert':'sparkles';
  const el = document.createElement('div');
  el.className = `toast tt-${type}`;
  el.innerHTML = `<span class="tt-bar"></span><span class="tt-ic">${icon(ic)}</span><div><b>${title}</b><small>${sub}</small></div>`;
  $('#toasts').appendChild(el);
  setTimeout(()=>{el.classList.add('out');setTimeout(()=>el.remove(),380)},3800);
}

/* ---------------- Charts ---------------- */
function spark(vals, w=100, h=32, color='var(--gold)'){
  const mn=Math.min(...vals),mx=Math.max(...vals);
  const pt = vals.map((v,i)=>[i/(vals.length-1)*w, h-3-(v-mn)/(mx-mn||1)*(h-7)]);
  const line = pt.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');
  const id='sp'+Math.random().toString(36).slice(2,8);
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${color==='var(--gold)'?'#A99368':color}" stop-opacity=".35"/>
      <stop offset="1" stop-color="#A99368" stop-opacity="0"/>
    </linearGradient></defs>
    <path d="${line} L${w} ${h} L0 ${h} Z" fill="url(#${id})"/>
    <path d="${line}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="${pt[pt.length-1][0]}" cy="${pt[pt.length-1][1]}" r="2.4" fill="${color}"/>
  </svg>`;
}

function donut(segments, size=172, centerHTML=''){
  const R=70,C=2*Math.PI*R,total=segments.reduce((a,s)=>a+s.v,0);
  let off=0;
  const segs = segments.map(s=>{
    const len=s.v/total*C;
    const node=`<circle class="d-seg" cx="86" cy="86" r="${R}" fill="none" stroke="${s.c}" stroke-width="17"
      stroke-dasharray="${len-1.5} ${C-len+1.5}" stroke-dashoffset="${-off}" style="animation-delay:${off/200}s"/>`;
    off+=len;return node;
  }).join('');
  return `<div class="donut"><svg viewBox="0 0 172 172">${segs}</svg><div class="donut-center">${centerHTML}</div></div>`;
}

function gauge(pct,label,val,sub){
  const R=46,C=Math.PI*R,len=pct/100*C;
  return `<div class="gauge"><div class="g-svg">
    <svg viewBox="0 0 120 70" width="120" height="70">
      <path d="M14 60 A46 46 0 0 1 106 60" fill="none" stroke="var(--line-2)" stroke-width="9" stroke-linecap="round"/>
      <path d="M14 60 A46 46 0 0 1 106 60" fill="none" stroke="url(#gGold)" stroke-width="9" stroke-linecap="round"
        stroke-dasharray="${C}" stroke-dashoffset="${C-len}" style="transition:stroke-dashoffset 1.4s cubic-bezier(.22,1,.36,1)"/>
    </svg><div class="g-v num">${val}</div></div><div class="g-l">${label}</div><div class="g-s">${sub}</div></div>`;
}

function miniRing(pct,color='var(--gold)'){
  const R=15,C=2*Math.PI*R;
  return `<div class="mini-ring"><svg viewBox="0 0 36 36" width="38" height="38">
    <circle cx="18" cy="18" r="${R}" fill="none" stroke="var(--line-2)" stroke-width="4"/>
    <circle cx="18" cy="18" r="${R}" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round"
      stroke-dasharray="${C}" stroke-dashoffset="${C-(pct/100*C)}" style="transition:stroke-dashoffset 1.2s"/>
    </svg><span class="mr-v">${pct}%</span></div>`;
}

function buildAreaChart(mount){
  const W=720,H=248,L=46,Rt=14,T=16,B=26,iw=W-L-Rt,ih=H-T-B;
  const rev=REV30,exp=EXP30;
  const mx=240000, ticks=[0,60000,120000,180000,240000];
  const x=i=>L+i/(rev.length-1)*iw, y=v=>T+ih-v/mx*ih;
  const linePts=rev.map((v,i)=>[x(i),y(v)]);
  const line=linePts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');
  const area=`${line} L${x(29)} ${T+ih} L${x(0)} ${T+ih} Z`;
  const bw=iw/rev.length*.52;
  const bars=exp.map((v,i)=>`<rect class="area-bar" x="${(x(i)-bw/2).toFixed(1)}" y="${y(v).toFixed(1)}" width="${bw.toFixed(1)}" height="${(T+ih-y(v)).toFixed(1)}" rx="2.5" fill="var(--crimson)" opacity=".16"/>`).join('');
  const grid=ticks.map(t=>`<line class="area-grid" x1="${L}" x2="${W-Rt}" y1="${y(t)}" y2="${y(t)}"/>
    <text class="area-y" x="${L-9}" y="${y(t)+3.5}" text-anchor="end">$${t/1000}k</text>`).join('');
  const xlabels=[0,4,9,14,19,24,29].map(i=>{const d=addDays(new Date(),i-29);
    return `<text class="area-x" x="${x(i)}" y="${H-6}" text-anchor="middle">${d.getDate()} ${MONTHS[d.getMonth()]}</text>`;}).join('');
  const hover = Array.from({length:30},(_,i)=>`<rect class="area-hover" data-i="${i}" x="${x(i)-iw/rev.length/2}" y="${T}" width="${iw/rev.length}" height="${ih}"/>`).join('');
  mount.innerHTML=`<svg class="area-chart" viewBox="0 0 ${W} ${H}">
    <defs><linearGradient id="lineGold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#8A6B1F"/><stop offset=".5" stop-color="#F2E0AE"/><stop offset="1" stop-color="#B8933F"/></linearGradient>
      <linearGradient id="areaGold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#D4B872" stop-opacity=".38"/><stop offset="1" stop-color="#D4B872" stop-opacity="0"/></linearGradient>
    </defs>${grid}${bars}
    <path class="area-fill" d="${area}" fill="url(#areaGold)"/>
    <path class="area-line" d="${line}"/>
    <line class="chart-cross" y1="${T}" y2="${T+ih}"/>${xlabels}${hover}
  </svg><div class="area-tip"></div>`;
  const svg=$('svg',mount),tip=$('.area-tip',mount),cross=$('.chart-cross',mount);
  const dot=document.createElementNS('http://www.w3.org/2000/svg','circle');
  dot.setAttribute('r','4.5');dot.setAttribute('fill','#FFFDF7');dot.setAttribute('stroke','#A8843E');dot.setAttribute('stroke-width','2.5');dot.style.opacity=0;
  svg.appendChild(dot);
  svg.addEventListener('mousemove',e=>{
    const r=svg.getBoundingClientRect();
    const px=(e.clientX-r.left)/r.width*W;
    const i=clamp(Math.round((px-L)/iw*29),0,29);
    const d=addDays(new Date(),i-29);
    cross.setAttribute('x1',x(i));cross.setAttribute('x2',x(i));cross.style.opacity=1;
    dot.setAttribute('cx',x(i));dot.setAttribute('cy',y(rev[i]));dot.style.opacity=1;
    tip.innerHTML=`<b>${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}</b>
      <span class="tt-val" style="color:var(--gold-deep)">● Revenue&nbsp; <b>${money(rev[i])}</b></span>
      <span class="tt-val" style="color:var(--crimson)">● Expense&nbsp; <b>${money(exp[i])}</b></span>
      <span class="tt-val muted">Net&nbsp; <b>${money(rev[i]-exp[i])}</b></span>`;
    tip.style.opacity=1;
    const localX=(x(i)/W)*r.width;
    tip.style.left=Math.min(Math.max(localX+12,60),r.width-150)+'px';
    tip.style.top='18px';
  });
  svg.addEventListener('mouseleave',()=>{tip.style.opacity=0;cross.style.opacity=0;dot.style.opacity=0});
}

function animateCounts(scope){
  $$('[data-count]',scope).forEach(el=>{
    const target=parseFloat(el.dataset.count),dec=+(el.dataset.decimals||0),
      pre=el.dataset.prefix||'',suf=el.dataset.suffix||'',t0=performance.now(),dur=1200;
    (function f(t){const p=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-p,3),v=target*e;
      el.textContent=pre+v.toLocaleString('en-US',{minimumFractionDigits:dec,maximumFractionDigits:dec})+suf;
      if(p<1)requestAnimationFrame(f)})(t0);
  });
}

/* ---------------- Sidebar ---------------- */
/* ============================================================
   MVP MODULES — Cubacle HMS Scope v1.0 (37 modules)
   Built modules: overview, reservations, frontdesk, housekeeping,
   fb, revenue, intel, messages, automations, reports, settings, kiosks.
   Every other module ships as a consistent MVP shell below.
   ============================================================ */
const MODULES = {
  website:{no:2,phase:'Phase 1 · Launch',ic:'globe',title:'Website & Direct Booking',
    purpose:'Commission-free bookings on the hotel\'s own branded site, editable without a developer.',
    kpis:[{l:'Direct bookings',v:'342',d:'+12%'},{l:'Conversion',v:'4.8%',d:'+0.6pt'},{l:'Abandoned carts',v:'68',d:'-9%'},{l:'Languages',v:'7',d:'en · fr · de…'}],
    cols:['Room type','Guest','Check-in','Nights','Rate','Source'],
    rows:[['Ocean Villa','A. Dubois','08 Oct','4','$612','direct'],['Garden Suite','M. Tanaka','09 Oct','2','$448','promo'],['Beach Villa','S. Okonkwo','10 Oct','6','$780','direct'],['Family Loft','R. Meier','11 Oct','3','$520','member'],['Pool Villa','L. Costa','12 Oct','5','$910','direct']],
    connects:['Rates & Pricing','Payments','Deposits & Refunds','Guest Portal'],
    scope:'Booking engine, rate plans, extras, promo codes, confirmations. Abandoned-bot & Google free-booking-links feed in v1.1.'},
  ota:{no:3,phase:'Phase 1 · Launch',ic:'layers',title:'OTA Channel Integration',
    purpose:'One inventory sold across Booking.com, Expedia and others with no double bookings.',
    kpis:[{l:'Channel bookings',v:'184',d:'+4%'},{l:'Commission',v:'$18.2k',d:'-2.1pt'},{l:'Parity breaches',v:'3',d:'-5'},{l:'Connected channels',v:'6',d:'all live'}],
    cols:['Channel','Bookings','Net revenue','Commission','VC charge','Sync'],
    rows:[['Booking.com','72','$38,410','18%','yes','2m ago'],['Expedia','46','$24,880','17%','yes','5m ago'],['Agoda','28','$15,120','16%','yes','1m ago'],['Trip.com','22','$11,960','15%','no','3m ago'],['Despegar','16','$8,420','19%','yes','8m ago']],
    connects:['Rates & Pricing','Front Desk','Deposits & Refunds','Guest Messages'],
    scope:'Two-way availability/rates/restrictions sync, virtual-card handling, channel-mix & commission reports.'},
  portal:{no:5,phase:'Phase 1 · Launch',ic:'smartphone',title:'Guest Portal & Digital Check-in',
    purpose:'Branded web page per booking — manage stay, check in online, pay, buy extras, no app download.',
    kpis:[{l:'Online check-ins',v:'68%',d:'+11pt'},{l:'Upsell attach',v:'31%',d:'+4pt'},{l:'ID verified',v:'214',d:'+28'},{l:'Express check-out',v:'54%',d:'+7pt'}],
    cols:['Guest','Room','ETA','ID','Extras','Status'],
    rows:[['A. Dubois','412','14:00','verified','breakfast, spa','checked in'],['M. Tanaka','508','16:30','verified','late check-out','arriving'],['S. Okonkwo','318','12:00','manual','upgrade','arriving'],['R. Meier','220','15:00','verified','parking','pending'],['L. Costa','604','13:00','verified','breakfast','checked in']],
    connects:['Front Desk','Payments','Compliance','Smart Room Keys'],
    scope:'Manage booking, online check-in with ID + face match, upsells, live folio, express check-out, refund visibility.'},
  payments:{no:6,phase:'Phase 1 · Launch',ic:'card',title:'Payments, Folios & Card Terminals',
    purpose:'Every charge and payment per stay, split across up to 4 folios, paid online or at the desk.',
    kpis:[{l:'Today\'s takings',v:'$48.9k',d:'+6%'},{l:'Open folios',v:'128',d:'live'},{l:'Pre-auth held',v:'$92.4k',d:'-3%'},{l:'Cashier shifts',v:'4',d:'balanced'}],
    cols:['Folio','Guest','Payer','Charges','Payments','Balance'],
    rows:[['F-10412','A. Dubois','guest','$2,880','$2,880','settled'],['F-10415','M. Tanaka','company','$1,420','$0','$1,420'],['F-10419','S. Okonkwo','guest','$4,120','$2,000','$2,120'],['F-10422','R. Meier','split','$980','$980','settled'],['F-10430','L. Costa','guest','$5,340','$3,000','$2,340']],
    connects:['Front Desk','Deposits & Refunds','Restaurant POS','Financials'],
    scope:'Up to 4 folios with routing rules, card/Apple/Google Pay/cash/bank transfer, pre-auths, pay links, company billing, cashier shifts.'},
  refunds:{no:7,phase:'Phase 1 · Launch',ic:'refresh',title:'Deposits, Cancellations & Refunds',
    purpose:'One set of rules for deposits, cancellations, no-shows and refunds — every refund traceable to the bank.',
    kpis:[{l:'Refunds this week',v:'23',d:'-4'},{l:'Refund value',v:'$14.8k',d:'-12%'},{l:'Pending approvals',v:'3',d:'>£250'},{l:'No-show charges',v:'7',d:'auto'}],
    cols:['Ref #','Guest','Type','Amount','Status','Method'],
    rows:[['R-9921','A. Dubois','cancellation','$612','completed','original card'],['R-9924','M. Tanaka','goodwill','$120','approved','voucher'],['R-9927','S. Okonkwo','deposit release','$400','processing','bank transfer'],['R-9930','R. Meier','overpayment','$45','completed','original card'],['R-9933','L. Costa','cancellation','$910','requested','original card']],
    connects:['Rates','Website','OTA','Payments','Night Audit','Financials'],
    scope:'Deposit & cancellation rules, no-show auto-charge, refund types with role approval limits, status tracking, chargeback evidence log.'},
  maintenance:{no:9,phase:'Phase 1 · Launch',ic:'wrench',title:'Maintenance & Repairs',
    purpose:'Any staff or guest reports a fault; the right engineer gets it and the guest is kept updated.',
    kpis:[{l:'Open jobs',v:'41',d:'+3'},{l:'SLA breached',v:'2',d:'-1'},{l:'Avg resolve',v:'3.4h',d:'-22m'},{l:'On-call eng',v:'2',d:'armed'}],
    cols:['Job','Location','Urgency','Assignee','Stage','ETA'],
    rows:[['AC not cooling','Room 412','high','K. Mensah','in progress','30m'],['Leaking tap','Room 318','med','J. Bauer','awaiting parts','tomorrow'],['Broken lock','Room 220','urgent','K. Mensah','assigned','15m'],['Lobby light','Lobby','low','contractor','triaged','2 days'],['TV no signal','Room 604','med','J. Bauer','reported','1h']],
    connects:['Housekeeping','Asset Management','IoT Hub','Front Desk'],
    scope:'Photo/video reporting, 6-stage tracking (reported→triaged→assigned→in progress→awaiting parts→resolved), emergency alerts, OOO/OS room control.'},
  nightaudit:{no:11,phase:'Phase 1 · Launch',ic:'moon',title:'Night Audit & Shift Handover',
    purpose:'Close each day cleanly and pass on what matters to the next shift.',
    kpis:[{l:'Audit status',v:'ready',d:'03:00 run'},{l:'Exceptions',v:'2',d:'review'},{l:'Posting errors',v:'0',d:'clean'},{l:'No-shows',v:'7',d:'auto-charged'}],
    cols:['Step','Owner','Status','Note'],
    rows:[['Rate & availability check','system','done','all channels synced'],['No-show processing','system','done','7 charged'],['Folio posting','night mgr','done','zero errors'],['Cashier close','front desk','pending','2 shifts open'],['Manager handover','night mgr','running','3 items flagged']],
    connects:['Front Desk','Payments','Deposits & Refunds','Reports'],
    scope:'Night audit checklist, no-show processing, exception queue, shift handover notes, audit report to owners.'},
  compliance:{no:12,phase:'Phase 1 · Launch',ic:'shield',title:'Compliance & Data Protection',
    purpose:'Guest register, UK GDPR, levies and a full audit trail of who did what.',
    kpis:[{l:'Guest register',v:'100%',d:'complete'},{l:'PII views (7d)',v:'38',d:'+4'},{l:'Levy collected',v:'$6,240',d:'this month'},{l:'Audit events',v:'12.4k',d:'immutable'}],
    cols:['Item','Rule','Status','Last run'],
    rows:[['Guest register','UK immigration','complete','03:02'],['GDPR consent','art. 7','98%','today'],['Data retention','24m policy','on track','weekly'],['Tourism levy','5% per night','collected','03:02'],['PCI scope','SAQ-A','passed','quarterly']],
    connects:['Front Desk','Guest Portal','Financials','Settings'],
    scope:'Guest register fields, GDPR consent & SARs, levy rules, immutable audit trail, PCI-DSS alignment, data-retention schedules.'},
  onboarding:{no:15,phase:'Phase 1 · Launch',ic:'database',title:'Data Migration & Onboarding',
    purpose:'Move a new hotel off its old system quickly and verify every record landed correctly.',
    kpis:[{l:'Migrations',v:'1',d:'Aurelia live'},{l:'Records moved',v:'48,210',d:'verified'},{l:'Discrepancies',v:'6',d:'resolved'},{l:'Go-live',v:'0 days',d:'today'}],
    cols:['Dataset','Records','Status','Verified'],
    rows:[['Guest profiles','18,402','done','100%'],['Reservations','22,840','done','100%'],['Room inventory','342','done','100%'],['Rate plans','48','done','100%'],['Ledger history','6,620','done','99.6%']],
    connects:['Front Desk','Rates','Payments','Financials'],
    scope:'Import from common PMS formats, field mapping, reconciliation report, go-live checklist, post-cutover support.'},
  inroom:{no:16,phase:'Phase 2 · Grow',ic:'qr',title:'In-Room Ordering',
    purpose:'Guests order food and services from a QR code in the room, charged to the folio or paid now.',
    kpis:[{l:'Orders today',v:'86',d:'+14%'},{l:'Avg order',v:'$38',d:'+$3'},{l:'Folio-charged',v:'62%',d:'+5pt'},{l:'Upsell rate',v:'24%',d:'+3pt'}],
    cols:['Room','Item','Qty','Total','Charge','Status'],
    rows:[['412','In-villa dining','1','$68','folio','preparing'],['508','Spa — massage','1','$180','paid','booked'],['318','Minibar restock','1','$24','folio','delivered'],['220','Late breakfast','2','$56','folio','queued'],['604','Airport transfer','1','$120','paid','confirmed']],
    connects:['Kitchen Display','Restaurant POS','Payments','Guest App'],
    scope:'QR menu, room-charge or instant payment, order tracking, upsells, allergen flags, delivery to room.'},
  kitchen:{no:17,phase:'Phase 2 · Grow',ic:'coffee',title:'Kitchen Display',
    purpose:'Room service and restaurant tickets on one kitchen screen, sorted by fire time.',
    kpis:[{l:'Active tickets',v:'14',d:'live'},{l:'Avg ticket time',v:'11m',d:'-2m'},{l:'Bumped',v:'2',d:'VIP'},{l:'On-time',v:'94%',d:'+3pt'}],
    cols:['Ticket','Outlet','Item','Qty','Fire','Time'],
    rows:[['T-1042','Room service','Veg thali','1','now','14:02'],['T-1043','Restaurant','Grilled lobster','2','14:15','14:00'],['T-1045','Room service','Club sandwich','1','now','14:05'],['T-1046','Sushi bar','Omakase','2','14:30','14:10'],['T-1048','Room service','Breakfast set','1','14:20','14:08']],
    connects:['Restaurant POS','In-Room Ordering','Stock & Purchasing'],
    scope:'KDS with course firing, bump bar, allergen highlights, timer SLA, recall, prep-time analytics.'},
  events:{no:19,phase:'Phase 2 · Grow',ic:'calendar',title:'Dining, Spa, Events & Experiences',
    purpose:'Book tables, treatments, meeting rooms, conferences and activities in one place.',
    kpis:[{l:'Bookings today',v:'47',d:'+8'},{l:'Spa revenue',v:'$4.2k',d:'+11%'},{l:'Event revenue',v:'$18.6k',d:'+6%'},{l:'Utilisation',v:'82%',d:'+4pt'}],
    cols:['Booking','Type','Guest','Date','Pax','Value'],
    rows:[['Sunset dinner','dining','A. Dubois','08 Oct','2','$240'],['Couples massage','spa','M. Tanaka','09 Oct','2','$360'],['Conf. boardroom','event','Cubacle Ltd','10 Oct','12','$1,800'],['Snorkel trip','activity','S. Okonkwo','11 Oct','4','$480'],['Wine tasting','experience','R. Meier','12 Oct','6','$540']],
    connects:['Front Desk','Payments','Stock & Purchasing','Reports'],
    scope:'Reservations for restaurants, spa, meeting rooms, activities; capacity calendars, deposits, BEOs, resource booking.'},
  groups:{no:20,phase:'Phase 2 · Grow',ic:'users',title:'Group & Event Bookings',
    purpose:'Room blocks for weddings, conferences and tours with contracted rates and billing.',
    kpis:[{l:'Active blocks',v:'9',d:'live'},{l:'Blocked rooms',v:'214',d:'+18'},{l:'Pick-up',v:'68%',d:'+5pt'},{l:'Group revenue',v:'$284k',d:'+9%'}],
    cols:['Group','Type','Arrival','Rooms','Picked up','Billing'],
    rows:[['Cubacle offsite','corporate','12 Oct','40','36','company'],['Wedding · Patel','social','18 Oct','60','42','split'],['Japan Tours','tour op','22 Oct','30','30','OTA VC'],['Medical conf.','association','28 Oct','50','28','company'],['Dive club','leisure','02 Nov','34','19','individual']],
    connects:['Front Desk','Rates','Payments','Reports'],
    scope:'Room blocks with release dates, contracted rates, pick-up tracking, group folio, BEOs, tour-operator allocations.'},
  guestapp:{no:21,phase:'Phase 2 · Grow',ic:'smartphone',title:'Guest App',
    purpose:'Native app with wallet keys and in-stay services — the evolution of the web portal.',
    kpis:[{l:'App installs',v:'1,284',d:'+64'},{l:'Digital keys',v:'412',d:'this stay'},{l:'In-app orders',v:'96',d:'+12%'},{l:'Ratings',v:'4.7',d:'★'}],
    cols:['Feature','Active','Usage','Trend'],
    rows:[['Digital key','412','92% of stays','+6pt'],['Mobile check-in','358','80%','+4pt'],['In-app ordering','96','22%','+3pt'],['Chat with concierge','142','32%','+1pt'],['Digital folio','388','87%','+2pt']],
    connects:['Smart Room Keys','In-Room Ordering','Guest Messages','Payments'],
    scope:'Native iOS/Android, wallet keys, in-stay ordering, messaging, folio, express check-out, push alerts.'},
  loyalty:{no:23,phase:'Phase 2 · Grow',ic:'gift',title:'Loyalty, Gift Cards & Marketing',
    purpose:'Bring guests back with tiers, points and vouchers, and sell gift cards online.',
    kpis:[{l:'Active members',v:'8,420',d:'+142'},{l:'Points issued',v:'1.2M',d:'this month'},{l:'Gift cards sold',v:'$24.8k',d:'+8%'},{l:'Repeat rate',v:'34%',d:'+3pt'}],
    cols:['Member','Tier','Points','Stays','Last visit'],
    rows:[['A. Dubois','Noir','18,420','12','Aug 2026'],['M. Tanaka','Aureate','6,204','5','Sep 2026'],['S. Okonkwo','Noir','22,108','18','Jul 2026'],['R. Meier','Aureate','3,840','3','Oct 2026'],['L. Costa','Signature','1,120','1','today']],
    connects:['Guest Intelligence','Payments','Reports','Website'],
    scope:'Tiered loyalty with points, member rates, gift cards (physical + digital), campaigns, abandoned-basket remarketing.'},
  reviews:{no:24,phase:'Phase 2 · Grow',ic:'star',title:'Reviews & Reputation',
    purpose:'Ask for reviews and reply to every channel from one place.',
    kpis:[{l:'Avg rating',v:'4.6',d:'+0.1'},{l:'Reviews (30d)',v:'214',d:'+18'},{l:'Response rate',v:'96%',d:'+2pt'},{l:'Sentiment',v:'positive',d:'82%'}],
    cols:['Guest','Source','Rating','Sentiment','Replied'],
    rows:[['A. Dubois','Booking.com','5','positive','yes'],['M. Tanaka','Google','4','neutral','yes'],['S. Okonkwo','Expedia','5','positive','yes'],['R. Meier','TripAdvisor','3','negative','draft'],['L. Costa','Direct','5','positive','yes']],
    connects:['Guest Messages','Guest Intelligence','Reports'],
    scope:'Multi-channel review aggregation, AI sentiment, suggested replies, review-ask automation, reputation dashboard.'},
  visitors:{no:25,phase:'Phase 2 · Grow',ic:'userCheck',title:'Visitor Management',
    purpose:'Log visitors, contractors and parcels with sign-in/out and host notification.',
    kpis:[{l:'Visitors today',v:'34',d:'+6'},{l:'Contractors',v:'12',d:'on-site'},{l:'Parcels held',v:'8',d:'for guests'},{l:'Signed out',v:'78%',d:'live'}],
    cols:['Visitor','Host','Type','In','Out','Badge'],
    rows:[['T. Bauer','K. Mensah','contractor','08:20','—','C-142'],['P. Singh','A. Dubois','guest visit','11:02','13:40','V-088'],['DHL courier','front desk','parcel','09:40','09:55','—'],['E. Lopez','events team','vendor','10:00','—','C-143'],['N. Adey','M. Tanaka','guest visit','14:10','—','V-089']],
    connects:['Front Desk','Compliance','Messages'],
    scope:'Visitor & contractor sign-in, badge printing, parcel log, host alerts, contractor insurance expiry.'},
  lostprop:{no:26,phase:'Phase 2 · Grow',ic:'search',title:'Lost Property & Laundry',
    purpose:'Track found items, guest laundry and hotel linen with chain-of-custody.',
    kpis:[{l:'Found items',v:'23',d:'+4'},{l:'Returned',v:'14',d:'this week'},{l:'Laundry turns',v:'184 kg',d:'today'},{l:'Linen par',v:'98%',d:'-1pt'}],
    cols:['Item','Found','Room','Guest','Status'],
    rows:[['Sunglasses','Pool','—','unclaimed','held'],['Phone charger','Room 412','412','A. Dubois','shipped'],['Passport','Lobby','—','M. Tanaka','collected'],['Watch','Spa','—','S. Okonkwo','held'],['Laptop bag','Room 318','318','R. Meier','shipping']],
    connects:['Housekeeping','Guest Messages','Front Desk'],
    scope:'Lost-property log with photos, guest matching, return shipping, guest & hotel laundry tracking, linen par levels.'},
  financials:{no:27,phase:'Phase 3 · Control',ic:'dollar',title:'Financials',
    purpose:'P&L, budgets, bills, bank matching, debtors and accounting sync.',
    kpis:[{l:'Revenue (MTD)',v:'$1.84M',d:'+7%'},{l:'GOP',v:'$612k',d:'33.2%'},{l:'Bills unpaid',v:'$84k',d:'12 items'},{l:'Bank reconciled',v:'99%',d:'clean'}],
    cols:['Account','Budget','Actual','Variance','Note'],
    rows:[['Rooms','$1,120k','$1,204k','+$84k','strong ADR'],['F&B','$410k','$388k','-$22k','low cover'],['Spa','$96k','$112k','+$16k','high attach'],['Payroll','$520k','$504k','+$16k','agency'],['Other','$120k','$136k','+$16k','retail']],
    connects:['Payments','Reports','Stock & Purchasing','Settings'],
    scope:'P&L, balance sheet, budgets, AP/AR, bank matching, VAT/levy, accounting export (Xero/QBO/Sage), audit trail.'},
  stock:{no:29,phase:'Phase 3 · Control',ic:'package',title:'Stock & Purchasing',
    purpose:'Kitchen, bar, linen and amenity stock with supplier orders and par levels.',
    kpis:[{l:'SKUs',v:'1,420',d:'live'},{l:'Low stock',v:'23',d:'reorder'},{l:'Open POs',v:'14',d:'3 overdue'},{l:'Variance',v:'1.8%',d:'target <2%'}],
    cols:['Item','Category','On hand','Par','Status'],
    rows:[['Champagne NV','bar','18','24','low'],['Bath towels','linen','420','480','low'],['Shampoo 50ml','amenity','1,840','1,200','ok'],['Sirloin','kitchen','12 kg','20 kg','low'],['Coffee beans','F&B','8 kg','10 kg','ok']],
    connects:['Kitchen Display','Restaurant POS','Financials'],
    scope:'Multi-warehouse stock, par levels, auto-reorder POs, GRN, recipe costing, stocktake, supplier catalogue.'},
  owner:{no:30,phase:'Phase 3 · Control',ic:'building',title:'Owner Dashboard & Manager App',
    purpose:'All hotels on one screen for owners; live operations for managers on a phone.',
    kpis:[{l:'Properties',v:'4',d:'group'},{l:'Group RevPAR',v:'$284',d:'+6%'},{l:'Occupancy',v:'81%',d:'+2pt'},{l:'NPS',v:'72',d:'+4'}],
    cols:['Property','Occ','ADR','RevPAR','GOP%'],
    rows:[['Aurelia Royal Sands','84%','$412','$346','33.2%'],['Aurelia City House','76%','$228','$173','28.4%'],['Aurelia Lakeside','88%','$304','$268','31.8%'],['Aurelia Highlands','72%','$186','$134','26.1%']],
    connects:['Reports','Financials','Automations','Messages'],
    scope:'Group-level dashboard, multi-property roll-up, owner report pack, manager mobile app with approvals & alerts.'},
  api:{no:31,phase:'Phase 3 · Control',ic:'code',title:'Open API & Partner Integrations',
    purpose:'Let other software connect without custom work — REST, webhooks and partner APIs.',
    kpis:[{l:'Active integrations',v:'22',d:'live'},{l:'API calls/day',v:'1.4M',d:'+8%'},{l:'Webhooks',v:'24/7',d:'99.98%'},{l:'API keys',v:'8',d:'scoped'}],
    cols:['Integration','Status','Traffic','Last sync'],
    rows:[['Payment gateway','live','38k/d','now'],['Channel manager','live','12k/d','2m ago'],['Accounting sync','live','4k/d','03:00'],['Identity provider','live','—','SSO'],['Door lock PMS','live','8k/d','now']],
    connects:['Payments','OTA','Financials','IoT Hub'],
    scope:'REST API with scoped keys, webhooks, partner marketplace, sandbox, rate limits, audit logging.'},
  iot:{no:32,phase:'Phase 3 · Control',ic:'wifi',title:'IoT Hub',
    purpose:'Sensors and room controls for energy, leaks and compliance.',
    kpis:[{l:'Sensors',v:'1,284',d:'online'},{l:'Alerts (24h)',v:'38',d:'-6'},{l:'Energy saved',v:'14%',d:'vs baseline'},{l:'Leaks prevented',v:'2',d:'this month'}],
    cols:['Device','Zone','Signal','Metric','Status'],
    rows:[['Thermostat 412','Room 412','-62dBm','22.4°C','ok'],['Water sensor B1','Plant','-70dBm','dry','ok'],['Door 508','Room 508','-58dBm','locked','ok'],['Meter main','Plant','-54dBm','142 kW','ok'],['HVAC zone 3','F3','-66dBm','23.1°C','ok']],
    connects:['Housekeeping','Maintenance','Asset Management','Energy'],
    scope:'Device registry, sensor telemetry, leak/energy/air-quality alerts, room automation, demand-response, compliance logs.'},
  mealplans:{no:33,phase:'Resort pack',ic:'utensils',title:'Meal Plans & All-Inclusive',
    purpose:'Board types (BB/HB/FB/AI) with entitlement checks at every outlet.',
    kpis:[{l:'AI guests',v:'184',d:'62% of stays'},{l:'Redemptions',v:'412',d:'today'},{l:'F&B revenue',v:'$24.8k',d:'+4%'},{l:'Entitlement overrides',v:'6',d:'approved'}],
    cols:['Guest','Plan','Outlet','Entitled','Used'],
    rows:[['A. Dubois','AI','all','unlimited','12'],['M. Tanaka','FB','dining','3 meals','2'],['S. Okonkwo','HB','dining','breakfast+1','1'],['R. Meier','BB','dining','breakfast','1'],['L. Costa','AI','all','unlimited','8']],
    connects:['Restaurant POS','In-Room Ordering','Front Desk','Financials'],
    scope:'Board plans, entitlement engine, AI consumption tracking, outlet checks, premium plan upsell, F&B cost allocation.'},
  wristbands:{no:34,phase:'Resort pack',ic:'key',title:'Cashless Wristbands',
    purpose:'Tap to pay, open doors and prove entitlement around the resort.',
    kpis:[{l:'Bands active',v:'412',d:'this stay'},{l:'Tap payments',v:'$8.4k',d:'today'},{l:'Door taps',v:'2,840',d:'today'},{l:'Lost bands',v:'2',d:'blocked'}],
    cols:['Band','Guest','Balance','Taps','Status'],
    rows:[['WB-1042','A. Dubois','$184','14','active'],['WB-1045','M. Tanaka','$62','8','active'],['WB-1048','S. Okonkwo','$320','22','active'],['WB-1051','R. Meier','$0','3','active'],['WB-1038','L. Costa','—','0','blocked']],
    connects:['Payments','Smart Room Keys','Meal Plans','Front Desk'],
    scope:'RFID band issuance, stored value, door access, entitlement taps, top-up, lost-band blocking, parental limits.'},
  outlets:{no:35,phase:'Resort pack',ic:'shoppingBag',title:'Multiple Outlets & Retail',
    purpose:'Many bars, restaurants and shops on one account with unified settlement.',
    kpis:[{l:'Outlets',v:'8',d:'live'},{l:'Today\'s sales',v:'$48.9k',d:'+6%'},{l:'Avg check',v:'$64',d:'+$3'},{l:'Retail attach',v:'18%',d:'+2pt'}],
    cols:['Outlet','Type','Covers','Sales','Margin'],
    rows:[['Azure','fine dining','84','$18.4k','68%'],['Sand Bar','bar','142','$8.2k','74%'],['Market','buffet','210','$11.8k','52%'],['Boutique','retail','—','$4.6k','62%'],['Dive shop','activity','38','$5.9k','58%']],
    connects:['Restaurant POS','Kitchen Display','Stock','Financials'],
    scope:'Multi-outlet POS, unified menu & pricing, outlet P&L, inventory transfer, retail barcode, tax rules per outlet.'},
  amenities:{no:36,phase:'Resort pack',ic:'sun',title:'Amenities, Activities & Kids Club',
    purpose:'Sunbeds, cabanas, courts, activities and kids club with booking and capacity.',
    kpis:[{l:'Bookings today',v:'64',d:'+6'},{l:'Cabana util',v:'88%',d:'+3pt'},{l:'Kids club',v:'24',d:'checked in'},{l:'Activity revenue',v:'$6.8k',d:'+9%'}],
    cols:['Resource','Bookings','Capacity','Status','Revenue'],
    rows:[['Pool cabanas','16/18','18','high','$4.2k'],['Tennis courts','4/4','4','full','$480'],['Kids club','24/30','30','ok','$1.2k'],['Sunbeds','142/200','200','ok','—'],['Dive trips','3','12/d','ok','$960']],
    connects:['Front Desk','Payments','Reports','Meal Plans'],
    scope:'Resource booking with capacity, cabana/daybed rental, activity scheduling, kids-club check-in/out, waivers.'},
  touroperators:{no:37,phase:'Resort pack',ic:'globe',title:'Tour Operator Contracts',
    purpose:'Room allocations and contracted rates for the travel trade with release dates.',
    kpis:[{l:'Contracts',v:'12',d:'active'},{l:'Allocated rooms',v:'184',d:'+12'},{l:'Pick-up',v:'72%',d:'+4pt'},{l:'TO revenue',v:'$184k',d:'+7%'}],
    cols:['Operator','Allocation','Picked up','Rate','Release'],
    rows:[['TUI','60','48','contract','14d'],['Jet2','40','32','contract','21d'],['Thomas Cook','30','18','net','10d'],['Kuoni','24','22','commission','7d'],['Local TO','30','12','net','14d']],
    connects:['Group & Events','Rates','OTA','Front Desk'],
    scope:'Contract room allocations, contracted/net rates, release dates, pick-up reporting, tour-operator billing, allotment release.'},
};

/* MVP renderer — header, KPIs, data table, connects/scope rail */
function mvpView(key){
  const m = MODULES[key];
  if(!m) return `<div class="card pad"><b>Module not configured</b></div>`;
  const phaseCls = m.phase.includes('Resort')?'tag-grey':m.phase.includes('Phase 1')?'tag-gold':m.phase.includes('Phase 2')?'tag-blue':'tag-gold';
  const kpis = m.kpis.map(k=>{
    const up = !k.d.startsWith('-') && !k.d.match(/^(live|ok|clean|complete|on|all|9)/);
    return `<div class="card kpi-card" style="padding:14px 16px">
      <div style="font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--mut);font-weight:700">${k.l}</div>
      <div style="font-family:var(--font-d);font-size:24px;margin:6px 0 3px">${k.v}</div>
      <span class="delta ${up?'up':'down'}" style="font-size:10px">${up?icon('arrowUp'):icon('arrowDown')}${k.d}</span>
    </div>`;
  }).join('');
  const thead = m.cols.map(c=>`<th>${c}</th>`).join('');
  const tbody = m.rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('');
  const connects = m.connects.map(c=>`<span class="chip">${c}</span>`).join('');
  return `
  <div class="card pad rise" style="margin-bottom:14px">
    <div style="display:flex;align-items:flex-start;gap:14px;flex-wrap:wrap">
      <span style="width:48px;height:48px;border-radius:14px;display:grid;place-items:center;background:var(--gold-grad-soft);color:var(--gold-deep);flex-shrink:0">${icon(m.ic)}</span>
      <div style="flex:1;min-width:240px">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px">
          <span class="tag ${phaseCls}" style="font-size:10px">${m.phase}</span>
          <span class="tag tag-grey" style="font-size:10px">Module ${m.no} / 37</span>
          <span class="tag tag-gold" style="font-size:10px">MVP shell</span>
        </div>
        <h2 style="font-family:var(--font-d);font-size:20px;margin:2px 0 4px;letter-spacing:-.01em">${m.title}</h2>
        <p style="font-size:12.5px;color:var(--mut);margin:0;max-width:620px">${m.purpose}</p>
      </div>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:14px" class="rise rise-1">
    ${kpis}
  </div>
  <div class="row">
    <div class="c-8 rise rise-1">
      <div class="card" style="padding:0;overflow:hidden">
        <div class="card-h"><div><div class="card-title">Live data</div><div class="card-sub">Mock telemetry · refreshes on view entry</div></div>
          <div class="chips"><span class="chip on">All</span><span class="chip">Today</span><span class="chip">This week</span></div></div>
        <div style="padding:6px 8px 14px">
          <table class="tbl"><thead><tr>${thead}</tr></thead><tbody>${tbody}</tbody></table>
        </div>
      </div>
    </div>
    <div class="c-4 rise rise-2">
      <div class="card pad" style="margin-bottom:14px">
        <div class="card-title" style="margin-bottom:10px">Connects to</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px">${connects}</div>
      </div>
      <div class="card pad">
        <div class="card-title" style="margin-bottom:8px">MVP scope</div>
        <p style="font-size:12px;color:var(--mut);margin:0;line-height:1.55">${m.scope}</p>
        <button class="btn-gold btn-sm" style="width:100%;justify-content:center;margin-top:12px" data-action="toast" data-t="${m.title}" data-s="Full module workflow opens in the next build">Open full workflow</button>
      </div>
    </div>
  </div>`;
}

/* Wire every MVP module into view metadata */
Object.keys(MODULES).forEach(k=>{ VIEW_META[k] = [MODULES[k].title, MODULES[k].purpose]; });

const NAV = [
  {label:'Operations',items:[
    {v:'overview',ic:'dashboard',l:'Command Center'},
    {v:'reservations',ic:'calendar',l:'Reservation Graph'},
    {v:'frontdesk',ic:'userCheck',l:'Front Desk'},
    {v:'housekeeping',ic:'brush',l:'Housekeeping'},
    {v:'facilities',ic:'mapPin',l:'Facility Mgmt',dot:true},
    {v:'command',ic:'building',l:'Command Tower',dot:true},
    {v:'maintenance',ic:'wrench',l:'Maintenance'},
    {v:'kiosks',ic:'monitor',l:'Kiosks & Keys'},
    {v:'hospitalitytv',ic:'monitor',l:'Hospitality TV',dot:true},
    {v:'nightaudit',ic:'moon',l:'Night Audit'},
  ]},
  {label:'Commerce',items:[
    {v:'revenue',ic:'trend',l:'Revenue & Pricing'},
    {v:'payments',ic:'card',l:'Payments & Folios'},
    {v:'refunds',ic:'refresh',l:'Deposits & Refunds'},
    {v:'ota',ic:'layers',l:'OTA Channels'},
    {v:'fb',ic:'utensils',l:'Dining & POS'},
  ]},
  {label:'Guest Experience',items:[
    {v:'website',ic:'globe',l:'Website & Booking'},
    {v:'portal',ic:'smartphone',l:'Guest Portal & Check-in'},
    {v:'guestapp',ic:'smartphone',l:'Guest App'},
    {v:'inroom',ic:'qr',l:'In-Room Ordering'},
    {v:'messages',ic:'message',l:'Guest Messages',badge:7},
    {v:'intel',ic:'users',l:'Guest Intelligence'},
    {v:'loyalty',ic:'gift',l:'Loyalty & Gift Cards'},
    {v:'reviews',ic:'star',l:'Reviews & Reputation'},
    {v:'lostprop',ic:'search',l:'Lost Property & Laundry'},
    {v:'visitors',ic:'userCheck',l:'Visitor Management'},
  ]},
  {label:'Dining & Events',items:[
    {v:'kitchen',ic:'coffee',l:'Kitchen Display'},
    {v:'events',ic:'calendar',l:'Dining, Spa & Events'},
    {v:'groups',ic:'users',l:'Group & Event Bookings'},
  ]},
  {label:'Control',items:[
    {v:'financials',ic:'dollar',l:'Financials'},
    {v:'stock',ic:'package',l:'Stock & Purchasing'},
    {v:'inventory',ic:'package',l:'Asset Management',dot:true},
    {v:'compliance',ic:'shield',l:'Compliance'},
    {v:'owner',ic:'building',l:'Owner Dashboard'},
  ]},
  {label:'Platform',items:[
    {v:'automations',ic:'zap',l:'Automations'},
    {v:'reports',ic:'pie',l:'Reports & BI'},
    {v:'api',ic:'code',l:'Open API & Integrations'},
    {v:'iot',ic:'wifi',l:'IoT Hub'},
    {v:'settings',ic:'settings',l:'Settings'},
    {v:'onboarding',ic:'database',l:'Onboarding'},
  ]},
  {label:'Resort Pack',items:[
    {v:'mealplans',ic:'utensils',l:'Meal Plans & All-Inclusive'},
    {v:'wristbands',ic:'key',l:'Cashless Wristbands'},
    {v:'outlets',ic:'shoppingBag',l:'Outlets & Retail'},
    {v:'amenities',ic:'sun',l:'Amenities & Kids Club'},
    {v:'touroperators',ic:'globe',l:'Tour Operator Contracts'},
  ]},
];

function renderSidebar(){
  $('#sidebar').innerHTML = `
    <button class="sb-collapse" data-action="collapse" title="Collapse">${icon('chevronLeft')}</button>
    <div class="brand">
      <span class="brand-mark">${BIRD}</span>
      <span><span class="brand-name">Bird<b>OS</b></span><div class="brand-sub">Hospitality OS</div></span>
    </div>
    <nav class="sb-nav">
      ${NAV.map(g=>`
        <div class="nav-group">
          <div class="nav-group-label">${g.label}</div>
          ${g.items.map(it=>`
            <a class="nav-item ${S.view===it.v?'on':''}" data-view="${it.v}">
              <span class="nav-ic">${icon(it.ic)}</span>
              <span class="nav-label">${it.l}</span>
              ${it.badge?`<span class="nav-badge">${it.badge}</span>`:''}
              ${it.dot?'<span class="nav-dot"></span>':''}
            </a>`).join('')}
        </div>`).join('')}
    </nav>
    <div class="sidebar-foot">
      <div class="ai-mini" data-action="open-ai">
        <span class="ai-orb">${icon('sparkles')}</span>
        <span class="ai-mini-body"><b>Ask Aves</b><small>AI concierge · online</small></span>
      </div>
      <div class="user-chip">
        <span class="av av-32 av-4"><span class="av-init">AL</span></span>
        <span class="sb-user-meta"><b style="font-size:12.5px;display:block">${activeProperty().gm}</b>
        <small style="font-size:10.5px;color:var(--mut)">General Manager</small></span>
      </div>
    </div>`;
}

/* ---------------- Topbar & pulse ---------------- */
function renderTopbar(){
  const [title,sub]=VIEW_META[S.view];
  const p=activeProperty();
  const swatch=p.accent==='teal'?'linear-gradient(135deg,#1FB6A6,#2E86AB)':p.accent==='gold'?'var(--gold-grad)':undefined;
  $('#topbar').innerHTML=`
    <button class="icon-btn tb-menu" data-action="menu" title="Menu" aria-label="Open navigation">${icon('menu')}</button>
    <div class="tb-titles">
      <div class="tb-title">${title}</div>
      <div class="tb-sub"><span class="live-dot"></span><span>Live</span> · <span id="tb-clock">${clockNow()}</span></div>
    </div>
    <div class="tb-prop" data-action="open-property">
      <span class="tb-prop-swatch" style="background:${swatch}"></span>
      <span class="tb-prop-name">${p.name}</span>
      <span class="tb-prop-caret">${icon('chevronDown')}</span>
      <div class="drop" id="property-drop" hidden>
        <div class="drop-head"><b>Switch property</b><small>${PROPERTIES.length} in portfolio</small></div>
        <div class="drop-body">
          ${PROPERTIES.map(x=>`<div class="drop-item ${x.id===p.id?'on':''}" data-action="switch-property" data-id="${x.id}">
            <span class="di-ic" style="background:${x.accent==='teal'?'#1FB6A622':x.accent==='gold'?'var(--gold-grad-soft)':''};color:${x.accent==='teal'?'#1FB6A6':x.accent==='gold'?'var(--gold)':''}">${icon('building')}</span>
            <div style="min-width:0"><b>${x.name}</b><p>${x.brand} · ${x.location}</p><div class="di-t">${x.keys} keys · GM ${x.gm}</div></div>
            ${x.id===p.id?'<span class="dot dot-green"></span>':''}
          </div>`).join('')}
        </div>
      </div>
    </div>
    <button class="tb-search" data-action="open-palette">
      ${icon('search')}<span>Search guests, rooms, folios…</span><kbd>⌘K</kbd>
    </button>
    <div class="tb-actions">
      <button class="btn-gold" data-action="new-reservation">${icon('plus')}<span>New Reservation</span></button>
      <div style="position:relative">
        <button class="icon-btn" id="notif-btn" title="Notifications">${icon('bell')}<span class="ping"></span></button>
        <div class="drop" id="notif-drop" hidden>
          <div class="drop-head"><b>Notifications</b><span class="mark-all" data-action="mark-all">Mark all read</span></div>
          <div class="drop-body">
            ${NOTIFS.map(n=>`
              <div class="drop-item">
                <span class="di-ic" style="background:var(--${n[1]}-soft);color:var(--${n[1]})">${icon(n[0])}</span>
                <div style="min-width:0"><b>${n[2]}</b><p>${n[3]}</p><div class="di-t">${n[4]} ago</div></div>
              </div>`).join('')}
          </div>
        </div>
      </div>
      <button class="icon-btn theme-toggle" data-action="toggle-theme" title="Theme">
        <span class="ico-moon">${icon('moon')}</span><span class="ico-sun">${icon('sun')}</span>
      </button>
      <button class="icon-btn" data-action="open-ai" title="Ask Aves">${icon('sparkles')}</button>
      <button class="tb-avatar"><span class="av">AL</span><span class="tb-av-name">Alexandre<small>GM</small></span></button>
    </div>`;
}
function clockNow(){const d=new Date();return d.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});}

function renderPulse(){
  const tagFor=t=>t==='green'?'pi-green':t==='red'?'pi-red':t==='blue'?'pi-blue':'pi-gold';
  const item=p=>`<span class="pulse-item"><span class="pi-tag ${tagFor(p[0])}">${p[1]}</span>${p[2]}</span>`;
  $('#pulse').innerHTML=`<span class="pulse-label"><span class="pulse-dot"></span>Live Pulse</span>
    <div class="pulse-viewport"><div class="pulse-track">${PULSE.map(item).join('')}${PULSE.map(item).join('')}</div></div>`;
}

/* ---------------- Router ---------------- */
function go(v){
  if(window.__hk3d&&v!=='housekeeping')window.__hk3d.destroy();
  if(v!=='inventory')ROOM3D.destroy();
  if(v!=='facilities')FAC3D.destroy();
  if(v!=='command')CT3D.destroy();
  if(v!=='novotel')NOV3D.destroy();
  S.view=v;
  $$('.nav-item').forEach(a=>a.classList.toggle('on',a.dataset.view===v));
  renderTopbar();
  const view=$('#view');
  view.classList.remove('in');void view.offsetWidth;view.classList.add('in');
  view.scrollTop=0;
  view.innerHTML=VIEWS[v]();
  (INIT[v]||(()=>{}))();
  animateCounts(view);
}

/* ============================================================
   VIEW · OVERVIEW
   ============================================================ */
const VIEWS = {};
const INIT = {};

/* Register every MVP module shell (data-driven, no per-view code) */
Object.keys(MODULES).forEach(k=>{
  VIEWS[k] = () => mvpView(k);
  INIT[k] = () => {};
});

VIEWS.overview = () => {
  const d=new Date(),h=d.getHours();
  const greet=h<12?'Good morning':h<18?'Good afternoon':'Bonsoir';
  const kpi=(ic,label,val,cur,suf,dec,delta,note,sparkV,icColor)=>`
    <div class="card kpi-card hover">
      <div class="kpi-top">
        <span class="kpi-ic" style="color:var(--${icColor});background:var(--${icColor}-soft)">${icon(ic)}</span>
        <span class="kpi-label">${label}</span>
      </div>
      <div class="kpi-value"><span class="cur">${cur}</span><span data-count="${val}" data-decimals="${dec}" data-suffix="${suf}">0</span></div>
      <div class="kpi-foot">
        <span class="delta up">${icon('arrowUp')}${delta}</span>
        <span class="spark">${spark(sparkV)}</span>
      </div>
      <div class="kpi-note" style="margin-top:6px">${note}</div>
    </div>`;
  return `
  <div class="hero rise" ${''/* tilt */}>
    <div class="hero-bg"><img src="${IMG.exterior}" alt="Aurelia Royal Sands" loading="lazy"/></div>
    <div class="hero-inner">
      <div class="hero-copy">
        <div class="eyebrow">${fmtDate(d).toUpperCase()} · ${PROPERTY.location}</div>
        <h1>${greet}, <em>Alexandre.</em></h1>
        <p class="hero-sub">299 guests in residence tonight across <b>342 keys</b> · 42 arrivals and 37 departures choreographed. Aves has prepared <b>3 service actions</b> awaiting your approval.</p>
        <div class="hero-actions">
          <button class="btn-gold" data-action="new-reservation">${icon('plus')}New reservation</button>
          <button class="btn-glass" data-view="frontdesk">${icon('userCheck')}Arrivals desk</button>
          <button class="btn-glass" data-view="kiosks">${icon('monitor')}Kiosk fleet</button>
        </div>
      </div>
      <div class="hero-side">
        <div class="h-stat"><span class="hs-ic">${icon('sun')}</span><div><b>${PROPERTY.weather}</b><small>Sunset ${PROPERTY.sunset} · ideal arrival window</small></div></div>
        <div class="h-stat"><span class="hs-ic">${icon('key')}</span><div><b>196 digital keys</b><small>issued today · 42 awaiting arrival</small></div></div>
        <div class="h-stat"><span class="hs-ic">${icon('trend')}</span><div><b>RevPAR $1,295</b><small>+9.4% vs comparable day last year</small></div></div>
      </div>
    </div>
    <div class="float-card">
      <span class="fc-ic">${icon('checkCircle')}</span>
      <div><b>Kiosk 1 · contactless check-in</b><small>Isabella Moreau · Villa 501 · just now</small></div>
    </div>
  </div>

  <div class="row" style="margin-top:18px">
    <div class="c-3 rise rise-1">${kpi('bed','Occupancy tonight',87.4,'','%',1,'3.2 pts','299 of 342 keys · +3.2 pts vs forecast',SPARKS.occ,'emerald')}</div>
    <div class="c-3 rise rise-2">${kpi('dollar','ADR',1482,'$','',0,'6.8%','Average daily rate · last 30 days',SPARKS.adr,'gold')}</div>
    <div class="c-3 rise rise-3">${kpi('trend','RevPAR',1295,'$','',0,'9.4%','Revenue per available room',SPARKS.rev,'azure')}</div>
    <div class="c-3 rise rise-4">${kpi('chart','Revenue today',218460,'$','',0,'12.1%','Rooms · F&B · spa · experiences',SPARKS.rev,'crimson')}</div>
  </div>

  <div class="row">
    <div class="c-8 rise rise-3">
      <div class="card" style="height:100%">
        <div class="card-h">
          <div><div class="card-title">Revenue performance</div><div class="card-sub">Last 30 days · rooms, dining & wellness</div></div>
          <div class="card-actions">
            <div class="chart-legend" style="margin-right:6px">
              <span class="lg"><i style="background:var(--gold)"></i>Revenue</span>
              <span class="lg"><i style="background:var(--crimson);opacity:.5"></i>Expense</span>
            </div>
            <div class="seg"><button class="on">30D</button><button>90D</button><button>YTD</button></div>
          </div>
        </div>
        <div class="card-body"><div id="rev-chart" style="position:relative">${''}</div></div>
      </div>
    </div>
    <div class="c-4 rise rise-4">
      <div class="card" style="height:100%">
        <div class="card-h"><div><div class="card-title">Live occupancy</div><div class="card-sub">Tonight · real-time room states</div></div>
          <span class="tag tag-green" style="margin-left:auto">${icon('wifi')}Live</span></div>
        <div class="card-body">
          <div class="donut-wrap">
            ${donut([
              {v:257,c:'#206A4E'},{v:42,c:'#C8A762'},{v:27,c:'#7C9A6E'},
              {v:12,c:'#B27A26'},{v:4,c:'#9B3D50'},
            ],172,`<span class="dc-v">87.4%</span><span class="dc-l">Occupied</span><span class="dc-s">+3.2 pts</span>`)}
            <div class="dl">
              <div class="dl-row"><span class="dot dot-green"></span>Stayovers<span class="dl-v">257</span></div>
              <div class="dl-row"><span class="dot dot-gold"></span>Arrivals<span class="dl-v">42</span></div>
              <div class="dl-row"><span class="dot" style="background:#7C9A6E"></span>Ready & vacant<span class="dl-v">27</span></div>
              <div class="dl-row"><span class="dot dot-amber"></span>In turnover<span class="dl-v">12</span></div>
              <div class="dl-row"><span class="dot dot-red"></span>Out of order<span class="dl-v">4</span></div>
            </div>
          </div>
          <div class="divider"></div>
          <div style="display:flex;justify-content:space-between;text-align:center;gap:8px">
            <div style="flex:1"><div class="num" style="font-family:var(--font-d);font-size:21px">42</div><small style="font-size:10px;color:var(--mut)">Arrivals</small></div>
            <div style="flex:1"><div class="num" style="font-family:var(--font-d);font-size:21px">37</div><small style="font-size:10px;color:var(--mut)">Departures</small></div>
            <div style="flex:1"><div class="num" style="font-family:var(--font-d);font-size:21px">6</div><small style="font-size:10px;color:var(--mut)">VIP Noir</small></div>
            <div style="flex:1"><div class="num" style="font-family:var(--font-d);font-size:21px">98.2%</div><small style="font-size:10px;color:var(--mut)">Clean SLA</small></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="c-4 rise rise-4">
      <div class="card" style="height:100%">
        <div class="card-h"><div><div class="card-title">VIP arrivals</div><div class="card-sub">Today · butler choreography armed</div></div>
          <a class="card-actions" style="font-size:11px;font-weight:700;color:var(--gold-deep);cursor:pointer" data-view="frontdesk">All 42 ${icon('arrowRight')}</a></div>
        <div class="card-body">
          ${GUESTS.filter(g=>g.status==='arriving').slice(0,5).map(g=>`
          <div class="lrow">
            ${avatar(g.name)}
            <div class="lrow-main"><b>${g.name} ${g.tier==='Noir'?'<span class="tag tag-gold" style="margin-left:6px">Noir</span>':''}</b>
              <small>${icon('clock')}${g.time} · ${g.room} · ${g.nights} nts</small></div>
            <span class="lrow-act" data-action="guest-detail" data-id="${g.id}">${icon('arrowRight')}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
    <div class="c-4 rise rise-5">
      <div class="card" style="height:100%">
        <div class="card-h"><div><div class="card-title">Housekeeping pulse</div><div class="card-sub">86 rooms serviced · SLA 98.2%</div></div>
          <span class="tag tag-green">on track</span></div>
        <div class="card-body">
          <div style="display:flex;flex-direction:column;gap:13px;margin-bottom:16px">
            ${[['Check-out rooms turned',74,88,'green'],['Stayover refreshes',62,92,''],['Deep cleans',10,100,'green'],['Maintenance-blocked',4,100,'red']].map(x=>`
              <div><div style="display:flex;justify-content:space-between;font-size:11.5px;font-weight:600;margin-bottom:6px"><span>${x[0]}</span><span class="num">${x[1]}%</span></div>
              <div class="pbar pg-${x[3]}"><span style="--w:${x[1]/100}"></span></div></div>`).join('')}
          </div>
          ${TEAM.slice(0,4).map(t=>`<div class="team-row">${avatar(t.n)}<div class="lrow-main"><b>${t.n}</b><small>${t.fl} · ${t.done}/${t.total} rooms</small></div>${miniRing(Math.round(t.done/t.total*100))}</div>`).join('')}
        </div>
      </div>
    </div>
    <div class="c-4 rise rise-6">
      <div class="card" style="height:100%">
        <div class="card-h"><div><div class="card-title">Kiosks & keyless</div><div class="card-sub">Fleet of 5 · avg check-in 78s</div></div>
          <span class="tag tag-green">4 online</span></div>
        <div class="card-body">
          ${KIOSKS.slice(0,4).map(k=>`
          <div class="lrow">
            <span class="kiosk-ic-s" style="width:32px;height:32px;border-radius:10px;display:grid;place-items:center;background:var(--gold-grad-soft);color:var(--gold-deep)">${icon('monitor')}</span>
            <div class="lrow-main"><b>${k.id} · ${k.loc}</b><small>${k.sessions} sessions · avg ${k.sec}s</small></div>
            <span class="dot ${k.st==='session'?'dot-gold':k.st==='idle'?'dot-amber':'dot-green'}"></span>
          </div>`).join('')}
          <div class="divider"></div>
          <div style="display:flex;justify-content:space-between;text-align:center">
            <div><div class="num" style="font-family:var(--font-d);font-size:22px">248</div><small style="font-size:10px;color:var(--mut)">Mobile check-in</small></div>
            <div><div class="num" style="font-family:var(--font-d);font-size:22px">196</div><small style="font-size:10px;color:var(--mut)">Keys issued</small></div>
            <div><div class="num" style="font-family:var(--font-d);font-size:22px">24</div><small style="font-size:10px;color:var(--mut)">Staff-assisted</small></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="c-7 rise rise-6">
      <div class="card" style="height:100%">
        <div class="card-h"><div><div class="card-title">Aves intelligence</div><div class="card-sub">AI actions synthesised from guests, rates and facilities</div></div>
          <span class="ai-orb" style="width:30px;height:30px;border-radius:10px;display:grid;place-items:center;background:radial-gradient(130% 130% at 25% 15%,#33352E,#15181F)">${icon('sparkles')}</span>
        </div>
        <div class="card-body" style="display:flex;flex-direction:column;gap:10px">
          <div class="ai-rec">
            <span class="air-ic">${icon('key')}</span>
            <div style="flex:1"><b style="font-size:13px">$12,400 upgrade opportunity · 14 arrivals</b>
              <p style="font-size:11.8px;color:var(--mut);margin-top:3px">Eligible guests show pool-pavilion intent; Aves drafted personalised offers in their language.</p></div>
            <div style="display:flex;flex-direction:column;gap:6px"><button class="btn-gold btn-sm" data-action="toast" data-t="Offers dispatched" data-s="14 guests · WhatsApp + email">Send all</button>
            <button class="btn-ghost btn-sm" data-action="toast" data-t="Reviewing offers" data-s="Opening targeting details">Review</button></div>
          </div>
          <div class="ai-rec">
            <span class="air-ic">${icon('trend')}</span>
            <div style="flex:1"><b style="font-size:13px">18 Oct is underselling by 8%</b>
              <p style="font-size:11.8px;color:var(--mut);margin-top:3px">Comp set BAR $2,360 vs ours $1,980. Demand index 94 with the Regatta weekend arriving.</p></div>
            <div style="display:flex;flex-direction:column;gap:6px"><button class="btn-gold btn-sm" data-view="revenue">Approve +8%</button>
            <button class="btn-ghost btn-sm" data-view="revenue">Model</button></div>
          </div>
          <div class="ai-rec">
            <span class="air-ic">${icon('cake')}</span>
            <div style="flex:1"><b style="font-size:13px">3 celebrations tonight need choreography</b>
              <p style="font-size:11.8px;color:var(--mut);margin-top:3px">Anniversary (Villa 501), child’s birthday (Pavilion 402), honeymoon turndown (Suite 502).</p></div>
            <div style="display:flex;flex-direction:column;gap:6px"><button class="btn-gold btn-sm" data-action="toast" data-t="Celebrations routed" data-s="Butlers · pastry · florist notified">Dispatch</button></div>
          </div>
        </div>
      </div>
    </div>
    <div class="c-5 rise rise-7">
      <div class="card" style="height:100%">
        <div class="card-h"><div><div class="card-title">Live activity</div><div class="card-sub">Every guest touchpoint across the property</div></div>
          <span class="tag tag-gold">${icon('activity')}streaming</span></div>
        <div class="card-body" style="padding-top:10px">
          ${FEED.map(f=>`
          <div class="lrow">
            <span style="width:30px;height:30px;border-radius:9px;display:grid;place-items:center;background:var(--${f[1]}-soft);color:var(--${f[1]});flex-shrink:0">${icon(f[0])}</span>
            <div class="lrow-main"><b style="font-size:12px">${f[3]}</b><small>${f[4]}</small></div>
            <div class="lrow-side"><small class="num">${f[2]}</small><b style="font-size:10.5px;color:var(--${f[1]})">${f[5]}</b></div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>`;
};
INIT.overview = ()=>{ const m=$('#rev-chart'); if(m) buildAreaChart(m); };

/* ============================================================
   VIEW · RESERVATION GRAPH
   ============================================================ */
VIEWS.reservations = () => {
  const days = Array.from({length:14},(_,i)=>addDays(new Date(),i));
  const frac = new Date().getHours()/24 + new Date().getMinutes()/1440;
  const dayRow = days.map((d,i)=>`<div class="tl-day ${d.getDay()===0||d.getDay()===6?'we':''} ${i===0?'today':''}"><small>${DAYS[d.getDay()]}</small><b>${d.getDate()} ${MONTHS[d.getMonth()]}</b></div>`).join('');
  const rows = TIMELINE.map((r,ri)=>{
    const cells = days.map((d,i)=>`<div class="tl-cell ${d.getDay()===0||d.getDay()===6?'tl-we-cell':''}"></div>`).join('');
    const bks = r.bookings.map((b,bi)=>{
      const visStart=Math.max(b.start,0), visLen=Math.min(b.start+b.len,14)-visStart;
      return `<div class="tl-booking bk-${b.kind}" data-bid="${ri}-${bi}" style="left:${visStart*74}px;width:${visLen*74-5}px">
        <b>${b.kind==='ooo'?'Out of order':b.name}</b><small>${b.len}n · ${b.kind==='ooo'?'—':money(b.rate)}</small></div>`;
    }).join('');
    return `<div class="tl-row">
      <div class="tl-room"><span class="rm-no">${r.no}</span><span><b>${r.type}</b><small>${r.fl}</small></span></div>
      <div class="tl-track">${cells}${bks}
        <div class="tl-now" style="left:${frac*74}px"></div>
      </div></div>`;
  }).join('');

  let lastFl='';
  const body = TIMELINE.map((r,ri)=>{
    let head='';
    if(r.fl!==lastFl){lastFl=r.fl;head=`<div class="tl-floor-label">${r.fl}</div>`;}
    const cells = days.map((d,i)=>`<div class="tl-cell ${d.getDay()===0||d.getDay()===6?'tl-we-cell':''}"></div>`).join('');
    const bks = r.bookings.map((b,bi)=>{
      const visStart=Math.max(b.start,0), visLen=Math.min(b.start+b.len,14)-visStart;
      return `<div class="tl-booking bk-${b.kind}" data-bid="${ri}-${bi}" style="left:${visStart*74}px;width:${visLen*74-5}px">
        <b>${b.kind==='ooo'?'Out of order':b.name}</b><small>${b.len}n · ${b.kind==='ooo'?'—':money(b.rate)}</small></div>`;
    }).join('');
    return head+`<div class="tl-row">
      <div class="tl-room"><span class="rm-no">${r.no}</span><span><b>${r.type}</b><small>${r.fl}</small></span></div>
      <div class="tl-track">${cells}${bks}<div class="tl-now" style="left:${frac*74}px"></div></div>
    </div>`;
  }).join('');

  return `
  <div class="row rise">
    <div class="c-12">
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
        <div class="seg"><button>Day</button><button class="on">Week</button><button>Month</button></div>
        <span class="chip on">${DAYS[new Date().getDay()]} ${new Date().getDate()} – ${fmtDate(days[13])}</span>
        <div class="chips" style="margin-left:auto">
          <span class="chip">${icon('filter')}All sources</span>
          <span class="chip">${icon('users')}VIP only</span>
          <span class="chip">${icon('download')}Export</span>
          <button class="btn-gold" data-action="new-reservation">${icon('plus')}New reservation</button>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="c-9 rise rise-1">
      <div class="card" style="padding:0;overflow:hidden">
        <div class="tl-body" style="max-height:calc(100vh - 250px)">
          <div style="display:flex;position:sticky;top:0;z-index:8">
            <div class="tl-corner" style="border-bottom:1px solid var(--line-2)">${icon('bed')}Inventory</div>
            <div style="display:flex">${dayRow}</div>
          </div>
          <div style="min-width:1208px">${body}</div>
        </div>
      </div>
      <div class="card tight" style="margin-top:12px;padding:12px 18px">
        <div class="tl-legend">
          <span class="lg"><i style="background:#2C8A64"></i>Stayovers / in-house</span>
          <span class="lg"><i style="background:#D9BC7C"></i>Arriving today</span>
          <span class="lg"><i style="background:#4C82C0"></i>Confirmed</span>
          <span class="lg"><i style="background:#E0A94E"></i>Due out</span>
          <span class="lg"><i style="background:repeating-linear-gradient(45deg,#bbb,#bbb 4px,#eee 4px,#eee 8px)"></i>Out of order</span>
          <span class="lg" style="margin-left:auto;color:var(--gold-deep)">${icon('zap')}142 reservations on the books · 86.1% pace</span>
        </div>
      </div>
    </div>
    <div class="c-3 rise rise-2">
      <div class="card" style="position:sticky;top:0">
        <div id="dp-root">${reservationPanelDefault()}</div>
      </div>
    </div>
  </div>`;
};
INIT.reservations = ()=>{};

function reservationPanelDefault(){
  return `
    <div class="card-h"><div><div class="card-title">Reservation inspector</div><div class="card-sub">Select any block on the graph</div></div>
      <span class="tag tag-gold">Live</span></div>
    <div class="card-body">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:6px">
        <div class="kg card tight" style="padding:12px;background:var(--surface-2);border:1px solid var(--line)">
          <small style="font-size:9.5px;color:var(--mut);text-transform:uppercase;letter-spacing:.1em;font-weight:700">On the books</small>
          <b class="num" style="font-size:20px;display:block;margin-top:3px;font-family:var(--font-d)">142</b></div>
        <div class="kg card tight" style="padding:12px;background:var(--surface-2);border:1px solid var(--line)">
          <small style="font-size:9.5px;color:var(--mut);text-transform:uppercase;letter-spacing:.1em;font-weight:700">Group holds</small>
          <b class="num" style="font-size:20px;display:block;margin-top:3px;font-family:var(--font-d)">28</b></div>
      </div>
      <div class="dp-kv"><span>Pace vs last year</span><b style="color:var(--emerald)">+11.8%</b></div>
      <div class="dp-kv"><span>Pipeline value · 14d</span><b>$814,200</b></div>
      <div class="dp-kv"><span>Cancellations · 14d</span><b>6 · 2.1%</b></div>
      <div class="dp-kv"><span>Waitlisted suites</span><b style="color:var(--amber)">9 requests</b></div>
      <div class="divider"></div>
      <div class="dp-timeline">
        ${[['green','Night audit posted','Yesterday · 03:02',true],['gold','Group hold: Regatta block','12 villas · release 14 Oct',true],['blue','2 new direct bookings','Via birdos booking engine · 24m',true],['grey','Inventory review','Auto-runs tonight · 02:00',false]].map(s=>`
        <div class="dp-step"><span class="ds-dot dot-${s[3]?'green':'grey'}" style="background:var(--${s[3]?'emerald':'faint'});box-shadow:none"></span>
          <div><b style="font-size:12px">${s[1]}</b><small>${s[2]}</small></div></div>`).join('')}
      </div>
      <button class="btn-gold" style="width:100%;justify-content:center;margin-top:16px" data-action="new-reservation">${icon('calendarPlus')}Create reservation</button>
    </div>`;
}
function reservationPanel(ri,bi){
  const r=TIMELINE[ri],b=r.bookings[bi];
  if(b.kind==='ooo'){
    return `<div class="card-h"><div><div class="card-title">Room ${r.no} · ${r.type}</div><div class="card-sub">Out of order</div></div><span class="tag tag-red">OOO</span></div>
    <div class="card-body"><div class="dp-kv"><span>Reason</span><b>${b.name}</b></div>
    <div class="dp-kv"><span>Window</span><b>${b.len} nights</b></div>
    <div class="dp-kv"><span>Revenue impact</span><b style="color:var(--crimson)">$0</b></div>
    <button class="btn-ghost" style="width:100%;justify-content:center;margin-top:14px" data-action="toast" data-t="Engineering notified" data-s="Re-inspection scheduled">Request re-inspection</button></div>`;
  }
  const inDate=addDays(new Date(),Math.max(b.start,0));
  const outDate=addDays(new Date(),b.start+b.len);
  const stateMap={stay:['In residence','green'],arr:['Arriving today','gold'],conf:['Confirmed','blue'],due:['Due out today','amber']};
  return `
    <div class="card-h"><div><div class="card-title">${b.name}</div><div class="card-sub">RM-${1000+ri*7+bi} · ${b.src}</div></div>
      <span class="tag tag-${stateMap[b.kind][1]}">${stateMap[b.kind][0]}</span></div>
    <div class="card-body">
      <div class="dp-guest">${avatar(b.name,'av-46')}<div><b style="font-size:14px;font-family:var(--font-d)">${b.name}</b>
        <div class="cm-meta">${r.no} · ${r.type}</div></div></div>
      <div class="dp-kv"><span>Arrival</span><b>${fmtDate(inDate)}</b></div>
      <div class="dp-kv"><span>Departure</span><b>${fmtDate(outDate)}</b></div>
      <div class="dp-kv"><span>Nights · Guests</span><b>${b.len} · 2</b></div>
      <div class="dp-kv"><span>Nightly rate</span><b>${money(b.rate)}</b></div>
      <div class="dp-kv"><span>Folio total</span><b>${money(b.rate*b.len)}</b></div>
      <div class="dp-kv"><span>Balance due</span><b style="color:var(--${b.kind==='stay'?'amber':'emerald'})">${b.kind==='stay'?money(Math.round(b.rate*b.len*.3)):'$0'}</b></div>
      <div class="divider"></div>
      <div class="dp-timeline">
        ${[['Reservation confirmed',true],['Deposit secured · tokenized card',true],[b.kind==='arr'||b.kind==='stay'||b.kind==='due'?'Guest arrived':'Arrival — key issued at kiosk',b.kind!=='conf'],['Departure & folio settlement',false]].map((s,i)=>`
        <div class="dp-step"><span class="ds-dot" style="background:var(--${s[1]?'emerald':'line-2'});box-shadow:none"></span>
          <div><b style="font-size:12px">${s[0]}</b><small>${s[1]?'Completed':'Pending'}</small></div></div>`).join('')}
      </div>
      <div class="dp-actions">
        ${b.kind==='arr'?`<button class="btn-gold btn-sm" data-action="toast" data-t="Check-in completed" data-s="Digital key delivered to ${b.name}">${icon('check')}Check in</button>`:''}
        <button class="btn-ghost btn-sm" data-action="toast" data-t="Digital key issued" data-s="Push to guest wallet">${icon('key')}Key</button>
        <button class="btn-ghost btn-sm" data-action="open-ai">${icon('message')}Message</button>
        <button class="btn-ghost btn-sm" data-action="toast" data-t="Folio opened" data-s="Room ${r.no}">${icon('fileText')}Folio</button>
      </div>
    </div>`;
}

/* ============================================================
   VIEW · FRONT DESK
   ============================================================ */
VIEWS.frontdesk = (tab='arriving') => {
  TABS_FD = tab;
  const list = GUESTS.filter(g=>tab==='all'||g.status===tab);
  const statusTag={arriving:['Arriving','gold'],inhouse:['In residence','green'],dueout:['Due out','amber']};
  const tabs=[['all','All guests'],['arriving','Arrivals · 42'],['inhouse','In-house · 257'],['dueout','Due out · 37']];
  return `
  <div class="stat-strip rise">
    ${[['luggage','Expected arrivals','42','', '16 already via kiosk','gold'],
       ['check','Checked in','31','', '74% of arrivals','green'],
       ['logout','Due departures','37','', '6 late check-out requests','amber'],
       ['alert','Overstays','3','', 'Aves drafted offers','red']].map(s=>`
      <div class="stat"><span class="s-bar"></span>
        <div class="s-l" style="color:var(--${s[5]})">${icon(s[0])}${s[1]}</div>
        <div class="s-v">${s[2]}</div><div class="s-s">${s[4]}</div></div>`).join('')}
  </div>
  <div class="row" style="margin-top:18px">
    <div class="c-12 rise rise-1">
      <div class="card" style="padding:0;overflow:hidden">
        <div style="display:flex;align-items:center;gap:12px;padding:16px 20px;border-bottom:1px solid var(--line);flex-wrap:wrap">
          <div class="seg">${tabs.map(t=>`<button class="${tab===t[0]?'on':''}" data-fdtab="${t[0]}">${t[1]}</button>`).join('')}</div>
          <div class="tb-search" style="margin-left:0;min-width:220px">${icon('search')}<span>Guest, room or confirmation…</span></div>
          <div class="chips" style="margin-left:auto">
            <span class="chip on">All tiers</span><span class="chip">Noir</span><span class="chip">Aureate</span>
            <button class="btn-gold" data-action="new-reservation">${icon('plus')}Walk-in</button>
          </div>
        </div>
        <div style="padding:6px 8px 14px">
          <table class="tbl">
            <thead><tr><th>Guest</th><th>Room</th><th>Stay</th><th>Folio</th><th>Status</th><th>${tab==='dueout'?'Out by':'ETA'}</th><th></th></tr></thead>
            <tbody>
              ${list.map(g=>`
              <tr data-action="guest-detail" data-id="${g.id}">
                <td><div class="cell-main">${avatar(g.name)}
                  <div><b>${g.name}</b>
                    <div class="cm-meta"><span class="tag tag-${g.tier==='Noir'?'gold':g.tier==='Aureate'?'blue':'grey'}" style="margin-right:5px">${g.tier}</span>${g.source}</div>
                  </div></div></td>
                <td class="num">${g.room}</td>
                <td class="num">${g.nights}n · ${g.pax}pax</td>
                <td class="num" style="color:${g.balance?'var(--amber)':'var(--emerald)'}">${g.balance?money(g.balance):'settled'}</td>
                <td><span class="tag tag-${statusTag[g.status][1]}">${statusTag[g.status][0]}</span></td>
                <td class="num">${g.time}</td>
                <td style="text-align:right">${icon('chevronRight')}</td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="c-4 rise rise-2">
      <div class="card pad"><div class="card-title" style="margin-bottom:4px">Celebrations in residence</div>
      <div class="card-sub" style="margin-bottom:12px">Aves routes amenities before guests notice</div>
        ${[['cake','Isabella Moreau · 10th anniversary','Villa 501 · Krug on ice','red'],
           ['heart','Sofia Rinaldi · honeymoon','Suite 502 · petal turndown','red'],
           ['star','Diego Fernández · child turns 8','Pavilion 402 · cake at 16:00','gold']].map(c=>`
          <div class="lrow"><span style="width:32px;height:32px;border-radius:10px;display:grid;place-items:center;background:var(--${c[3]}-soft);color:var(--${c[3]})">${icon(c[0])}</span>
          <div class="lrow-main"><b style="font-size:12.3px">${c[1]}</b><small>${c[2]}</small></div></div>`).join('')}
      </div>
    </div>
    <div class="c-4 rise rise-3">
      <div class="card pad"><div class="card-title" style="margin-bottom:4px">Requests queue</div>
      <div class="card-sub" style="margin-bottom:12px">3 items need a human decision</div>
        ${[['clock','Rajiv Malhotra — late check-out to 14:00','Suite 410 · approve 2h','amber'],
           ['car','Yuki Tanaka — private speedboat 09:30','Dock B · confirm captain','blue'],
           ['brush','Chen Wei — villa pressed twice daily','Villa 503 · add to roster','green']].map(c=>`
          <div class="lrow"><span style="width:32px;height:32px;border-radius:10px;display:grid;place-items:center;background:var(--${c[3]}-soft);color:var(--${c[3]})">${icon(c[0])}</span>
          <div class="lrow-main"><b style="font-size:12.3px">${c[1]}</b><small>${c[2]}</small></div>
          <button class="lrow-act" data-action="toast" data-t="Request approved" data-s="Guest notified by Aves">${icon('check')}</button></div>`).join('')}
      </div>
    </div>
    <div class="c-4 rise rise-4">
      <div class="card pad"><div class="card-title" style="margin-bottom:4px">Expected group movements</div>
      <div class="card-sub" style="margin-bottom:12px">Seaplane & dock coordination</div>
        ${[['14:20','Seaplane RPL-204','6 arrivals · 4 villas','green'],
           ['15:40','Private yacht M/Y Aurelia','Dock A · 8 guests','gold'],
           ['16:30','Seaplane RPL-218','5 arrivals · residences','blue'],
           ['18:05','Departure transfer RPL-118','8 guests · lounge ready','amber']].map(c=>`
          <div class="lrow"><span class="num" style="font-family:var(--font-d);font-size:15px;width:52px">${c[0]}</span>
          <div class="lrow-main"><b style="font-size:12.3px">${c[1]}</b><small>${c[2]}</small></div>
          <span class="dot dot-${c[3]}"></span></div>`).join('')}
      </div>
    </div>
  </div>`;
};
let TABS_FD='arriving';
INIT.frontdesk = ()=>{
  $$('[data-fdtab]').forEach(b=>b.addEventListener('click',()=>{
    $('#view').innerHTML=VIEWS.frontdesk(b.dataset.fdtab);
    INIT.frontdesk();animateCounts($('#view'));
  }));
};

/* ============================================================
   VIEW · KIOSKS & KEYLESS
   ============================================================ */
VIEWS.kiosks = () => {
  const funnel=[['248','Mobile check-in started','6 channels · 6 languages'],['221','Identity verified','Passport · face match'],['196','Keys provisioned','Wallet · SMS · watch'],['24','Staff-assisted','Queue avg 2m 10s']];
  const stMap={online:['Online · ready','green'],session:['Guest session','gold'],idle:['Idle · power save','amber']};
  return `
  <div class="row">
    <div class="c-8 rise">
      <div class="card" style="height:100%">
        <div class="card-h"><div><div class="card-title">Contactless arrival funnel</div><div class="card-sub">Today · mobile + lobby kiosks · avg 78 seconds</div></div>
          <span class="tag tag-green">${icon('wifi')}All systems nominal</span></div>
        <div class="card-body">
          <div class="funnel">
            ${funnel.map((f,i)=>`
              <div class="f-step">
                <div class="f-num num gold-text" data-count="${f[0]}" style="font-weight:500">0</div>
                <div class="f-l">${f[1]}</div><div class="f-s">${f[2]}</div>
              </div>${i<3?`<span class="f-arrow">${icon('chevronRight')}</span>`:''}`).join('')}
          </div>
          <div class="divider"></div>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;text-align:center">
            ${[['Median session','78s'],['Queue now','2 guests'],['Uptime · 30d','99.94%'],['Keys wallet-pushed','82%']].map(x=>`
              <div><div class="num" style="font-family:var(--font-d);font-size:24px">${x[1]}</div><small style="font-size:10px;color:var(--mut);text-transform:uppercase;letter-spacing:.1em;font-weight:700">${x[0]}</small></div>`).join('')}
          </div>
        </div>
      </div>
    </div>
    <div class="c-4 rise rise-1">
      <div class="card" style="height:100%;display:flex;align-items:center;justify-content:center;padding:22px">
        <div class="kiosk-device">
          <div class="kd-screen">
            <img src="${IMG.lobby}" alt="Grand lobby" loading="lazy"/>
            <div class="kd-over">
              <span class="kd-lang">EN · 日本語 · FR</span>
              <div class="kd-logo">${BIRD}</div>
              <h4>Bonsoir,<br/>welcome to Aurelia</h4>
              <p>Scan your digital key or verify identity</p>
              <div class="kd-qr">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100" height="100" rx="8" fill="#F6E9CB"/>
                  <g fill="#14100A">
                    <rect x="10" y="10" width="24" height="24" rx="4"/><rect x="16" y="16" width="12" height="12" fill="#F6E9CB"/>
                    <rect x="66" y="10" width="24" height="24" rx="4"/><rect x="72" y="16" width="12" height="12" fill="#F6E9CB"/>
                    <rect x="10" y="66" width="24" height="24" rx="4"/><rect x="16" y="72" width="12" height="12" fill="#F6E9CB"/>
                    <rect x="44" y="12" width="6" height="6"/><rect x="54" y="20" width="6" height="6"/><rect x="42" y="30" width="8" height="8"/>
                    <rect x="58" y="44" width="6" height="6"/><rect x="70" y="44" width="8" height="8"/><rect x="82" y="56" width="6" height="6"/>
                    <rect x="64" y="62" width="6" height="14"/><rect x="44" y="54" width="8" height="6"/><rect x="44" y="68" width="6" height="6"/>
                    <rect x="44" y="80" width="8" height="8"/><rect x="58" y="78" width="6" height="10"/><rect x="72" y="78" width="8" height="6"/>
                    <rect x="84" y="72" width="6" height="8"/><rect x="74" y="88" width="12" height="4"/>
                  </g>
                </svg>
              </div>
              <p style="opacity:.55">Step 2 of 4 · identity</p>
              <div class="kd-steps"><i></i><i class="on"></i><i></i><i></i></div>
            </div>
          </div>
          <div class="kd-base"></div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="c-8 rise rise-2">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px">
        ${KIOSKS.map((k,i)=>`
        <div class="card kiosk-card hover">
          <div class="kc-top">
            <span class="kc-ic">${icon('monitor')}</span>
            <div style="flex:1;min-width:0"><b style="font-size:13px;display:block">${k.id} · ${k.name}</b><small style="font-size:10.5px;color:var(--mut)">${k.loc}</small></div>
          </div>
          <div style="display:flex;align-items:center;gap:7px;font-size:11px;font-weight:700;color:var(--${k.st==='session'?'gold':k.st==='idle'?'amber':'emerald'})">
            <span class="dot dot-${k.st==='session'?'gold':k.st==='idle'?'amber':'green'}"></span>${stMap[k.st][0]}</div>
          <div class="kc-grid">
            <div class="kg"><small>Sessions</small><b class="num">${k.sessions}</b></div>
            <div class="kg"><small>Avg time</small><b class="num">${k.sec}s</b></div>
            <div class="kg"><small>${icon('battery')} Power</small><b class="num">${k.bat}%</b></div>
            <div class="kg"><small>${icon('wifi')} ${k.net}</small><b style="color:var(--emerald)">Strong</b></div>
          </div>
          <div style="display:flex;gap:7px;margin-top:12px">
            <button class="btn-ghost btn-sm" style="flex:1;justify-content:center" data-action="toast" data-t="${k.id} · remote assist" data-s="Camera and screen mirrored">${icon('eye')}Mirror</button>
            <button class="btn-ghost btn-sm" style="flex:1;justify-content:center" data-action="toast" data-t="${k.id} restart queued" data-s="Will finish current session">${icon('refresh')}Reboot</button>
          </div>
        </div>`).join('')}
      </div>
      <div class="card" style="margin-top:14px">
        <div class="card-h"><div><div class="card-title">Keyless entry stream</div><div class="card-sub">Wallet, watch and SMS keys · BLE + NFC locks</div></div></div>
        <div class="card-body" style="display:grid;grid-template-columns:1fr 1fr;gap:0 26px">
          ${[['key','green','14:12','Villa 501','Isabella Moreau unlocked with iPhone','Wallet'],
             ['smartphone','blue','14:06','Spa Pavilion','Temporary day pass issued','QR'],
             ['key','green','13:58','Room 318','Watch key used · turndown entry','Watch'],
             ['refresh','amber','13:44','Suite 405','Key reissued by guest in app','Self-serve'],
             ['key','green','13:31','Beach gate','Day-access key · Pavilion 402','BLE'],
             ['shield','gold','13:12','Staff wing','Master key rotation completed','Security']].map(e=>`
          <div class="lrow">
            <span style="width:30px;height:30px;border-radius:9px;display:grid;place-items:center;background:var(--${e[1]}-soft);color:var(--${e[1]})">${icon(e[0])}</span>
            <div class="lrow-main"><b style="font-size:12px">${e[3]}</b><small>${e[4]}</small></div>
            <div class="lrow-side"><small class="num">${e[2]}</small><span class="tag tag-grey">${e[5]}</span></div>
          </div>`).join('')}
        </div>
      </div>
    </div>
    <div class="c-4 rise rise-3">
      <div class="card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">Languages & identity</div><div class="card-sub">Auto-detected from passport</div></div></div>
        <div class="card-body">
          ${[['English',46],['日本語 Japanese',18],['Français',12],['中文 Mandarin',9],['العربية Arabic',7],['Русский Russian',8]].map(l=>`
          <div class="rc-row"><span style="font-size:12px;font-weight:600;width:92px">${l[0]}</span>
          <div class="rc-bar"><i style="--w:${l[1]/46}"></i></div><b class="num" style="width:34px;text-align:right">${l[1]}%</b></div>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-h"><div><div class="card-title">Kiosk experience steps</div><div class="card-sub">Guests skip any step in the guest app</div></div></div>
        <div class="card-body">
          ${[['1','Reservation lookup','QR · booking ref · card tap',true],
             ['2','Passport & face match','2-second on-device biometric',true],
             ['3','Digital registration card','Signed on glass · tax compliant',true],
             ['4','Key & wayfinding','Wallet key · map · butler ETA',false]].map(s=>`
            <div class="dp-step"><span class="ds-dot" style="background:var(--${s[4]?'emerald':'gold'});box-shadow:none;width:18px;height:18px;border-radius:50%;color:#fff;display:grid;place-items:center;font-size:9px;font-weight:800;margin-top:1px">${s[0]}</span>
            <div style="padding-bottom:8px"><b style="font-size:12.5px">${s[1]}</b><small>${s[2]} · ${s[4]?'avg 18s':'ready'}</small></div></div>`).join('')}
          <button class="btn-gold" style="width:100%;justify-content:center;margin-top:10px" data-action="toast" data-t="Registration template" data-s="Opening kiosk composer">${icon('plus')}Customise flow</button>
        </div>
      </div>
    </div>
  </div>`;
};
INIT.kiosks=()=>{};

/* ============================================================
   3D HOUSEKEEPING TOWER — cinematic live digital twin (Three.js)
   ============================================================ */
const HK3D=(()=>{
  let FL=10,SIDE=10,RW=2.3,RD=2.7,RH=1.34,FH=2.0,SLAB=0.34,COR=3.1;
  let W=SIDE*RW+3.4,DEP=2*RD+COR,X0=-W/2+1.7+RW/2,ROOM_Z=COR/2+RD/2,DOOR_Z=COR/2-0.14,TOP=FL*FH;
  let FACE_Z=ROOM_Z-(RD-0.14)/2;            /* corridor-facing wall plane */
  /* recompute layout constants for the active property (called at boot) */
  function applyLayout(){
    const n=isNovotel();
    FL=n?22:10;SIDE=n?8:10;
    FH=n?3.2:2.0;RH=n?2.5:1.34;RW=n?2.4:2.3;RD=n?2.8:2.7;
    W=SIDE*RW+3.4;DEP=2*RD+COR;X0=-W/2+1.7+RW/2;ROOM_Z=COR/2+RD/2;DOOR_Z=COR/2-0.14;TOP=FL*FH;
    FACE_Z=ROOM_Z-(RD-0.14)/2;
    LX=W/2+0.95;
  }
  let LX=W/2+0.95;                          /* elevator annex center (both sides) */
  const STATES={
    clean:{c:0x2E6B52,e:0x2E6B52,em:.14,label:'Ready'},
    occ:{c:0x3A5A85,e:0x3A5A85,em:.10,label:'Occupied'},
    due:{c:0xA37B31,e:0xC7973F,em:.22,label:'Due out'},
    dirty:{c:0x96414F,e:0x96414F,em:.24,label:'Awaiting turn'},
    cleaning:{c:0xE23B3B,e:0xFF4530,em:.75,label:'Cleaning · live'},
    inspect:{c:0x6B5E90,e:0x8D7FC0,em:.36,label:'Inspection'},
    ooo:{c:0x454C5C,e:0x0E1118,em:.05,label:'Out of order'}};
  const LEG=[['clean','Ready'],['occ','Occupied'],['due','Due out'],['dirty','Awaiting turn'],['cleaning','Cleaning · live'],['inspect','Inspection'],['ooo','Out of order']];
  const FLOOR_NAMES_AURELIA=['Lobby & Suites','Beach','Lagoon','Pavilions','Villas','Sky','Panorama','Cloud','Royal','Crown'];
  const TYPES_AURELIA=['Garden Suite','Beach Suite','Lagoon Suite','Pavilion Suite','Villa Suite','Sky Residence','Panorama Suite','Cloud Retreat','Royal Suite','Crown Penthouse'];
  const FLOOR_NAMES_NOVOTEL=['Lobby & Reception','F&B & Kitchen','Grand Ballroom','Meeting Rooms','Technical Plant','Pool Deck','Superior','Deluxe Twin','Executive','Premier King','Deluxe King','Executive Lounge','Superior Twin','Novotel Suite','Premier Suite','Executive King','Deluxe Panorama','Prestige Suite','Family Room','Presidential','Crown Suite','Royal Penthouse'];
  const TYPES_NOVOTEL=['Superior King','Deluxe Twin','Executive Lounge','Junior Suite','Novotel Suite','Family Room','Accessible','Adjoining','Prestige','Presidential','Superior Twin','Deluxe King','Executive King','Premier King','Deluxe Panorama','Prestige Suite','Family Room','Presidential','Crown Suite','Royal Penthouse','Accessible King','Adjoining Suite'];
  const isNovotel=()=>activeProperty().id==='novotel';
  const FLOOR_NAMES=()=>isNovotel()?FLOOR_NAMES_NOVOTEL:FLOOR_NAMES_AURELIA;
  const TYPES=()=>isNovotel()?TYPES_NOVOTEL:TYPES_AURELIA;
  const VIEWS=['Garden terrace','Beachfront','Lagoon panorama','Sunset deck','Ocean horizon'];
  const STAFF_DEF_AURELIA=[['Aisha Nazim',4],['Marco Silva',3],['Priya Devi',2],['Kenji Mori',1],['Sofia Lind',5],['Omar Haddad',6],['Grace Okafor',7],['Lucas Meyer',8],['Lauren Adey',9],['Daniel Cruz',0],['Nina Petrova',-1],['Ravi Menon',-1]];
  const STAFF_DEF_NOVOTEL=[['Linh Nguyễn',4],['Minh Trần',3],['Hoa Phạm',2],['Nam Lê',1],['Mai Đỗ',5],['An Vũ',6],['Quỳnh Hoàng',7],['Dương Bùi',8],['Trang Nguyễn',9],['Phúc Ngô',0],['Hà Đặng',-1],['Khang Lý',-1]];
  const STAFF_DEF=()=>isNovotel()?STAFF_DEF_NOVOTEL:STAFF_DEF_AURELIA;
  const CHECKS=['Bedding turn','Bathroom & sanitary','Floors & dusting','Minibar & amenities','Windows & glass','Scent & final set'];
  const hex=n=>'#'+n.toString(16).padStart(6,'0');
  let rt=null, threeLoading=false, threeTimer=0;
  const threeQ=[];
  const hk2dPref=()=>{ try{ return localStorage.getItem('birdos-hk-2d')==='1'; }catch(e){ return false; } };
  const hk2dSet=v=>{ try{ localStorage.setItem('birdos-hk-2d',v?'1':'0'); }catch(e){} };

  /* Lazy-load Three.js — never blocks app boot; 12s timeout & error → 2D board */
  function withThree(stage,done){
    if(window.THREE){ done(true); return; }
    threeQ.push(ok=>{
      if(!ok){ done(false); return; }
      if($('#hk3d-stage')!==stage)return;
      done(true);
    });
    if(threeLoading)return;
    threeLoading=true;
    const finish=ok=>{
      if(!threeLoading)return;
      threeLoading=false; clearTimeout(threeTimer);
      const q=threeQ.splice(0); q.forEach(f=>f(ok));
    };
    const s=document.createElement('script');
    s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/0.158.0/three.min.js';
    s.async=true;
    s.onload=()=>finish(true);
    s.onerror=()=>finish(false);
    (document.head||document.documentElement).appendChild(s);
    threeTimer=setTimeout(()=>finish(false),12000);
  }

  function boot(){
    const stage=$('#hk3d-stage'); if(!stage)return;
    destroy();
    applyLayout();
    if(!$('#hk3d-legend')){
      stage.classList.remove('hk3d-2d');
      stage.innerHTML=`<div class="hk3d-legend" id="hk3d-legend"></div>
        <div class="hk3d-floors" id="hk3d-floors"></div>
        <div class="hk3d-hint"><span class="hk-hint-dot"></span>Drag to orbit · pinch or ⌘-scroll to zoom · click any unit for its live report</div>
        <div class="hk3d-tip" id="hk3d-tip" hidden></div>`;
    }
    if(hk2dPref()){ fallback2D(stage); return; }
    const start=ok=>{
      if(!ok){ hk2dSet(true); fallback2D(stage); return; }
      try{
        rt=create(stage);
        bindDom();
        seedFeed();
      }catch(err){ rt=null; hk2dSet(true); fallback2D(stage); }
    };
    if(window.THREE){ start(true); return; }
    stage.insertAdjacentHTML('beforeend','<div class="hk3d-boot" id="hk3d-boot"><span class="hk3d-boot-ring"></span><b>Composing the live twin…</b><small>WebGL engine loading</small></div>');
    withThree(stage,ok=>{
      const b=$('#hk3d-boot'); if(b)b.remove();
      start(ok);
    });
  }

  function destroy(){
    if(!rt)return;
    cancelAnimationFrame(rt.raf);
    clearTimeout(rt.autoT);
    rt.ro&&rt.ro.disconnect();
    rt.scene.traverse(o=>{ if(o.geometry)o.geometry.dispose();
      if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose()); });
    rt.renderer.dispose();
    rt.renderer.domElement.remove();
    window.__hk3d=null; rt=null;
  }

  /* ---------- character + prop builders ---------- */
  function buildHuman(T,cm){
    const g=new T.Group();
    const legGeo=new T.CapsuleGeometry(.075,.24,4,8);
    const mkLeg=side=>{ const p=new T.Group(); p.position.set(side*.095,.46,0);
      const m=new T.Mesh(legGeo,cm.pants); m.position.y=-.19; m.castShadow=true; p.add(m); g.add(p); return p; };
    const legL=mkLeg(-1),legR=mkLeg(1);
    const upper=new T.Group(); upper.position.y=.46; g.add(upper);
    const hips=new T.Mesh(new T.BoxGeometry(.34,.15,.23),cm.tunic); hips.position.y=.02; hips.castShadow=true; upper.add(hips);
    const torso=new T.Mesh(new T.CapsuleGeometry(.185,.3,4,10),cm.tunic); torso.position.y=.3; torso.castShadow=true; upper.add(torso);
    const scarf=new T.Mesh(new T.BoxGeometry(.19,.05,.035),cm.gold); scarf.position.set(0,.4,.165); upper.add(scarf);
    const head=new T.Mesh(new T.SphereGeometry(.145,14,14),cm.skin); head.position.y=.62; head.castShadow=true; upper.add(head);
    const cap=new T.Mesh(new T.CylinderGeometry(.135,.16,.1,14),cm.gold); cap.position.y=.755; upper.add(cap);
    const brim=new T.Mesh(new T.BoxGeometry(.12,.02,.1),cm.gold); brim.position.set(0,.715,.13); upper.add(brim);
    const armGeo=new T.CapsuleGeometry(.052,.24,4,8);
    const mkArm=(side,withCloth)=>{ const p=new T.Group(); p.position.set(side*.215,.44,0);
      const m=new T.Mesh(armGeo,cm.tunic); m.position.y=-.15; m.castShadow=true; p.add(m);
      if(withCloth){ const c=new T.Mesh(new T.SphereGeometry(.065,8,8),cm.cloth); c.position.y=-.3; p.add(c); }
      upper.add(p); return p; };
    const armL=mkArm(-1,false),armR=mkArm(1,true);
    return {g,upper,legL,legR,armL,armR};
  }
  function buildCart(T,cm){
    const cg=new T.Group();
    const deck=new T.Mesh(new T.BoxGeometry(.58,.07,.38),cm.cart); deck.position.y=.22; deck.castShadow=true; cg.add(deck);
    const shelf=new T.Mesh(new T.BoxGeometry(.5,.05,.32),cm.cart); shelf.position.y=.54; cg.add(shelf);
    const tw1=new T.Mesh(new T.BoxGeometry(.36,.1,.26),cm.towel); tw1.position.set(0,.61,0); cg.add(tw1);
    const tw2=new T.Mesh(new T.BoxGeometry(.3,.09,.22),cm.towel); tw2.position.set(.01,.71,.01); cg.add(tw2);
    const bag=new T.Mesh(new T.SphereGeometry(.115,10,10),cm.bag); bag.position.set(.19,.3,-.03); bag.scale.set(1,.85,1); bag.castShadow=true; cg.add(bag);
    const handle=new T.Mesh(new T.BoxGeometry(.045,.5,.045),cm.cart); handle.position.set(-.25,.46,0); cg.add(handle);
    const grip=new T.Mesh(new T.BoxGeometry(.13,.05,.07),cm.cart); grip.position.set(-.29,.7,0); cg.add(grip);
    const wheels=[];
    const wg=new T.CylinderGeometry(.082,.082,.06,12);
    [[-.2,.13],[.2,.13],[-.2,-.13],[.2,-.13]].forEach(p=>{
      const w=new T.Mesh(wg,cm.wheel); w.rotation.z=Math.PI/2; w.position.set(p[0],.08,p[1]); cg.add(w); wheels.push(w);
    });
    cg.userData.wheels=wheels;
    return cg;
  }
  function buildPalm(T,cm,s){
    const g=new T.Group();
    const trunk=new T.Mesh(new T.CylinderGeometry(.09,.16,2.5,7),cm.trunk); trunk.position.y=1.25; trunk.castShadow=true; g.add(trunk);
    for(let k=0;k<6;k++){
      const f=new T.Mesh(new T.ConeGeometry(.22,1.7,5),cm.leaf);
      f.position.y=2.5; f.rotation.z=Math.PI/2.15;
      const a=k/6*Math.PI*2;
      const d=new T.Group(); d.position.y=2.55; d.rotation.y=a; d.add(f); g.add(d);
    }
    const coco=new T.Mesh(new T.SphereGeometry(.13,8,8),cm.trunk); coco.position.y=2.42; g.add(coco);
    g.scale.setScalar(.85+s*.3);
    return g;
  }
  function makeLabel(T,name){
    const cv=document.createElement('canvas'); cv.width=256; cv.height=72;
    const c=cv.getContext('2d');
    c.fillStyle='rgba(9,16,28,.78)'; c.beginPath(); c.roundRect?.(4,14,248,44,22); c.fill();
    c.strokeStyle='rgba(212,184,114,.7)'; c.lineWidth=2; c.beginPath(); c.roundRect?.(4,14,248,44,22); c.stroke();
    c.font='600 24px Inter, sans-serif'; c.textAlign='center'; c.textBaseline='middle';
    c.fillStyle='#F2E0AE'; c.fillText(name.split(' ')[0],128,37);
    const sp=new T.Sprite(new T.SpriteMaterial({map:new T.CanvasTexture(cv),transparent:true,depthWrite:false}));
    sp.scale.set(1.7,.48,1); return sp;
  }
  function buildShaft(T,side,cm,gold2){
    const root=new T.Group(); root.position.set(side*LX,0,0);
    const glass=new T.Mesh(new T.BoxGeometry(1.3,TOP+.4,1.3),
      new T.MeshStandardMaterial({color:0x9FB4D8,transparent:true,opacity:.07,roughness:.1,metalness:.4,depthWrite:false}));
    glass.position.y=TOP/2+.1; root.add(glass);
    const postGeo=new T.BoxGeometry(.06,TOP+.5,.06);
    [[-.62,-.62],[.62,-.62],[-.62,.62],[.62,.62]].forEach(p=>{
      const q=new T.Mesh(postGeo,cm.trim); q.position.set(p[0],TOP/2+.1,p[1]); root.add(q);
    });
    const cap=new T.Mesh(new T.BoxGeometry(1.5,.32,1.5),cm.slab); cap.position.y=TOP+.28; cap.castShadow=true; root.add(cap);
    const capTrim=new T.Mesh(new T.BoxGeometry(1.52,.06,1.52),cm.trim); capTrim.position.y=TOP+.12; root.add(capTrim);
    const car=new T.Group(); car.position.y=SLAB/2;
    const floorP=new T.Mesh(new T.BoxGeometry(.82,.07,.82),cm.cart); floorP.position.y=.02; floorP.castShadow=true; car.add(floorP);
    const cabGeo=new T.BoxGeometry(.82,1.5,.04);
    const back=new T.Mesh(cabGeo,new T.MeshStandardMaterial({color:0x16233A,transparent:true,opacity:.72,metalness:.3,roughness:.35}));
    back.position.set(0,.82,-.4); back.castShadow=true; car.add(back);
    const sideGeo=new T.BoxGeometry(.04,1.5,.8);
    [-1,1].forEach(sx=>{ const sw=new T.Mesh(sideGeo,back.material); sw.position.set(sx*.41,.82,0); car.add(sw); });
    const roofL=new T.Mesh(new T.BoxGeometry(.6,.04,.6),new T.MeshStandardMaterial({color:0xFFF1CC,emissive:0xFFDF9A,emissiveIntensity:1.4}));
    roofL.position.y=1.52; car.add(roofL);
    const dGeo=new T.BoxGeometry(.38,1.28,.045);
    const dL=new T.Mesh(dGeo,cm.door); dL.position.set(-.2,.68,.42); car.add(dL);
    const dR=new T.Mesh(dGeo,cm.door); dR.position.set(.2,.68,.42); car.add(dR);
    root.add(car);
    return {root,car,dL,dR,side,state:'open',at:0,open:1,timer:1.2,toY:SLAB/2,cb:null,owner:false,idle:4+Math.random()*4};
  }

  /* ---------------- scene ---------------- */
  function create(stage){
    const T=window.THREE;
    const dark=document.documentElement.dataset.theme==='dark';
    const css=v=>getComputedStyle(document.documentElement).getPropertyValue(v).trim();
    const r0=mulberry32(20261008);
    applyLayout();

    const renderer=new T.WebGLRenderer({antialias:true});
    renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.75));
    renderer.shadowMap.enabled=true;
    renderer.shadowMap.type=T.PCFSoftShadowMap;
    renderer.domElement.addEventListener('webglcontextlost',e=>{
      e.preventDefault(); hk2dSet(true);
      const st=rt&&rt.stage; destroy();
      if(st&&st.isConnected)fallback2D(st);
    });
    stage.appendChild(renderer.domElement);

    const scene=new T.Scene();
    const bg=new T.Color(css('--bg-0')||'#E9EDF2');
    scene.background=bg;
    scene.fog=new T.Fog(bg.clone(),62,150);

    const camera=new T.PerspectiveCamera(42,1,.1,400);
    const goldCol=new T.Color(css('--gold')||'#B08D3C');
    const gold2Col=new T.Color(css('--gold-2')||'#D4B872');

    const hemi=new T.HemisphereLight(dark?0xAEC0DC:0xF6F8FF,dark?0x0A101C:0xD8DEE8,dark?.95:1.05); scene.add(hemi);
    const key=new T.DirectionalLight(dark?0xF4E7C8:0xFFF4E2,dark?1.15:1.05);
    key.position.set(20,34,16); key.castShadow=true;
    key.shadow.mapSize.set(1024,1024);
    key.shadow.camera.left=-30; key.shadow.camera.right=30; key.shadow.camera.top=30; key.shadow.camera.bottom=-30;
    key.shadow.camera.far=110; key.shadow.bias=-0.0006;
    scene.add(key);
    const rim=new T.DirectionalLight(gold2Col,.5); rim.position.set(-22,14,-20); scene.add(rim);
    const atrium=new T.PointLight(gold2Col,dark?.55:.32,46,2); atrium.position.set(0,9,0); scene.add(atrium);

    const mats={
      slab:new T.MeshStandardMaterial({color:dark?0x1B2230:0xDFE4EC,roughness:.6,metalness:.12}),
      annex:new T.MeshStandardMaterial({color:dark?0x161E2C:0xD6DCE5,roughness:.55,metalness:.15}),
      cor:new T.MeshStandardMaterial({color:dark?0x232C3D:0xE7EBF1,roughness:.85,metalness:.05}),
      trim:new T.MeshStandardMaterial({color:goldCol,roughness:.3,metalness:.9,emissive:goldCol,emissiveIntensity:.14}),
      podium:new T.MeshStandardMaterial({color:dark?0x05070B:0x101826,roughness:.45,metalness:.35}),
      ghost:new T.MeshBasicMaterial({color:dark?0x121722:0xCED4DE,transparent:true,opacity:.1,depthWrite:false}),
      door:new T.MeshStandardMaterial({color:dark?0x101A2B:0x2A3A52,roughness:.35,metalness:.55}),
      bed:new T.MeshStandardMaterial({color:dark?0x3A4658:0xE9EDF3,roughness:.9,metalness:0}),
      wheel:new T.MeshStandardMaterial({color:0x1B2434,roughness:.5,metalness:.4}),
      trunk:new T.MeshStandardMaterial({color:0x7A5C38,roughness:.9}),
      leaf:new T.MeshStandardMaterial({color:0x3E6B4F,roughness:.8}),
      cart:new T.MeshStandardMaterial({color:dark?0xA8893E:0xB08D3C,metalness:.75,roughness:.3}),
      bag:new T.MeshStandardMaterial({color:0x263040,roughness:.65}),
      towel:new T.MeshStandardMaterial({color:0xFFFFFF,roughness:.9}),
      ground:new T.MeshStandardMaterial({color:dark?0x070B12:0xDDE2EA,roughness:1,metalness:0}),
      water:new T.MeshStandardMaterial({color:0x2E5A82,roughness:.12,metalness:.65,transparent:true,opacity:dark?.55:.42}),
      char:{ tunic:new T.MeshStandardMaterial({color:0xF2F4F8,roughness:.62}),
        pants:new T.MeshStandardMaterial({color:0x1E2C42,roughness:.6}),
        skin:new T.MeshStandardMaterial({color:0xC9A183,roughness:.55}),
        gold:new T.MeshStandardMaterial({color:goldCol,metalness:.85,roughness:.3,emissive:goldCol,emissiveIntensity:.16}),
        cloth:new T.MeshStandardMaterial({color:0xF6F9FF,roughness:.9}),
        cart:null,bag:null,towel:null,wheel:null },
    };
    mats.char.cart=mats.cart; mats.char.bag=mats.bag; mats.char.towel=mats.towel; mats.char.wheel=mats.wheel;
    const sparkMat=new T.MeshBasicMaterial({color:0xFFD98A,transparent:true,opacity:.92});

    /* ---- Novotel realistic environment: PMREM sky + ACES + upgraded sun ---- */
    let floorLights=[],novRibbons=[],novBloom=null,novPodLight=null;
    if(isNovotel()){
      const ec=document.createElement('canvas');ec.width=256;ec.height=64;const ex=ec.getContext('2d');
      const eg=ex.createLinearGradient(0,0,0,64);
      eg.addColorStop(0,'#1B2E4A');eg.addColorStop(.4,'#3A5A8C');eg.addColorStop(.7,'#7E9CBF');eg.addColorStop(.88,'#E8A86A');eg.addColorStop(1,'#F0B078');
      ex.fillStyle=eg;ex.fillRect(0,0,256,64);
      const envTex=new T.CanvasTexture(ec);envTex.mapping=T.EquirectangularReflectionMapping;
      const pmrem=new T.PMREMGenerator(renderer);scene.environment=pmrem.fromEquirectangular(envTex).texture;
      envTex.dispose();pmrem.dispose();
      renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;
      scene.background=new T.Color(0x2E4A6E);scene.fog=new T.Fog(0x335270,80,200);
      key.intensity=1.25;key.color.set(0xFFE0A8);key.position.set(40,55,28);
      key.shadow.mapSize.set(2048,2048);key.shadow.camera.left=-40;key.shadow.camera.right=40;key.shadow.camera.top=55;key.shadow.camera.bottom=-15;key.shadow.camera.far=160;key.shadow.bias=-0.0002;
      hemi.color.set(0xBFE0FF);hemi.groundColor.set(0x2A3A2A);hemi.intensity=.5;
      const amb=new T.AmbientLight(0x3A5070,.3);scene.add(amb);
      const fill=new T.DirectionalLight(0x6090C0,.35);fill.position.set(-30,20,-35);scene.add(fill);
    }

    /* grounds */
    let ground,water,ring,ring2,podium;
    if(isNovotel()){
      /* procedural textures — grass, plaza, asphalt */
      const texGrass=()=>{const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');
        x.fillStyle='#4F7A3A';x.fillRect(0,0,256,256);
        for(let i=0;i<9000;i++){const g=120+Math.random()*90|0;x.fillStyle=`rgba(${g},${g+30},${g-10},${.06+Math.random()*.1})`;x.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*2,1+Math.random()*2);}
        const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(40,40);t.anisotropy=8;return t;};
      const texPlaza=()=>{const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');
        x.fillStyle='#C9C2B0';x.fillRect(0,0,256,256);
        for(let i=0;i<30;i++){x.strokeStyle='rgba(120,110,90,.35)';x.lineWidth=1;x.beginPath();x.moveTo(i*8.5,0);x.lineTo(i*8.5,256);x.stroke();}
        for(let i=0;i<2000;i++){const v=180+Math.random()*40|0;x.fillStyle=`rgba(${v},${v-10},${v-30},${.12})`;x.fillRect(Math.random()*256,Math.random()*256,1,1);}
        const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(20,20);t.anisotropy=8;return t;};
      const texAsphalt=()=>{const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');
        x.fillStyle='#3A3D42';x.fillRect(0,0,256,256);
        for(let i=0;i<5000;i++){const v=40+Math.random()*40|0;x.fillStyle=`rgba(${v},${v},${v},${.18})`;x.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*2,1+Math.random()*2);}
        const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(12,12);t.anisotropy=8;return t;};
      /* grass + plaza + road */
      ground=new T.Mesh(new T.PlaneGeometry(400,400),new T.MeshStandardMaterial({map:texGrass(),roughness:1}));ground.rotation.x=-Math.PI/2;ground.position.y=-1.0;ground.receiveShadow=true;scene.add(ground);
      const plazaMesh=new T.Mesh(new T.PlaneGeometry(70,80),new T.MeshStandardMaterial({map:texPlaza(),roughness:.85}));plazaMesh.rotation.x=-Math.PI/2;plazaMesh.position.set(0,-.98,12);plazaMesh.receiveShadow=true;scene.add(plazaMesh);
      const roadMesh=new T.Mesh(new T.PlaneGeometry(90,12),new T.MeshStandardMaterial({map:texAsphalt(),roughness:.95}));roadMesh.rotation.x=-Math.PI/2;roadMesh.position.set(0,-.97,38);roadMesh.receiveShadow=true;scene.add(roadMesh);
      /* drop-off canopy */
      const canopy=new T.Mesh(new T.BoxGeometry(14,.12,5),new T.MeshStandardMaterial({color:0xE8E2D4,roughness:.6,side:T.DoubleSide}));canopy.position.set(0,3.2,20);canopy.castShadow=true;canopy.receiveShadow=true;scene.add(canopy);
      for(let i=-1;i<=1;i++){const col=new T.Mesh(new T.CylinderGeometry(.12,.14,3.2,10),new T.MeshStandardMaterial({color:0x8A8A8A,metalness:.6,roughness:.3}));col.position.set(i*6,1.6,22);col.castShadow=true;scene.add(col);}
      /* trees (3-layer canopy — trunk + 3 spheres) */
      const trunkMat=new T.MeshStandardMaterial({color:0x5A3E22,roughness:.95});
      const leafMats=[new T.MeshStandardMaterial({color:0x3F6B2E,roughness:.9}),new T.MeshStandardMaterial({color:0x4E8238,roughness:.9}),new T.MeshStandardMaterial({color:0x5C9442,roughness:.9})];
      const mkTree=()=>{const g=new T.Group();
        const trunk=new T.Mesh(new T.CylinderGeometry(.18,.28,1.4,8),trunkMat);trunk.position.y=.7;trunk.castShadow=true;g.add(trunk);
        const c1=new T.Mesh(new T.SphereGeometry(1.05,14,12),leafMats[0]);c1.position.y=1.7;c1.castShadow=true;g.add(c1);
        const c2=new T.Mesh(new T.SphereGeometry(.82,12,10),leafMats[1]);c2.position.set(.55,2.15,.3);c2.castShadow=true;g.add(c2);
        const c3=new T.Mesh(new T.SphereGeometry(.72,12,10),leafMats[2]);c3.position.set(-.45,2.25,-.25);c3.castShadow=true;g.add(c3);
        return g;};
      const treeSpots=[[-24,16],[-28,2],[-24,-12],[24,16],[28,2],[24,-12],[-12,24],[12,24],[-32,20],[32,20],[-32,-8],[32,-8]];
      treeSpots.forEach(p=>{const tr=mkTree();tr.position.set(p[0],-1,p[1]);tr.scale.setScalar(1.1+r0()*.3);scene.add(tr);});
      /* parking lot with cars */
      const lot=new T.Mesh(new T.PlaneGeometry(18,12),new T.MeshStandardMaterial({color:0x3A3F47,roughness:.9}));lot.rotation.x=-Math.PI/2;lot.position.set(-30,.02,28);lot.receiveShadow=true;scene.add(lot);
      const lineMat=new T.MeshStandardMaterial({color:0xF2E0AE,roughness:.6});
      for(let rr=0;rr<4;rr++)for(let cc=0;cc<3;cc++){const ln=new T.Mesh(new T.PlaneGeometry(.08,2.2),lineMat);ln.rotation.x=-Math.PI/2;ln.position.set(-34+cc*2,-.95,28+rr*2.6);scene.add(ln);}
      const mkCar=col=>{const g=new T.Group();
        const bodyMat=new T.MeshStandardMaterial({color:col,roughness:.28,metalness:.55,envMapIntensity:1.1});
        const body=new T.Mesh(new T.BoxGeometry(.92,.34,1.85),bodyMat);body.position.y=.32;body.castShadow=true;g.add(body);
        const lower=new T.Mesh(new T.BoxGeometry(.86,.16,1.78),new T.MeshStandardMaterial({color:0x1A1C20,roughness:.5,metalness:.6}));lower.position.y=.16;g.add(lower);
        const cabin=new T.Mesh(new T.BoxGeometry(.78,.26,1.05),new T.MeshPhysicalMaterial({color:0x14202C,roughness:.05,metalness:.2,transparent:true,opacity:.55,envMapIntensity:1.4,transmission:.15,ior:1.4}));cabin.position.set(0,.54,-.05);cabin.castShadow=true;g.add(cabin);
        const hood=new T.Mesh(new T.BoxGeometry(.86,.07,.34),bodyMat);hood.position.set(0,.42,.72);g.add(hood);
        const wGeo=new T.CylinderGeometry(.13,.13,.1,16);const wMat=new T.MeshStandardMaterial({color:0x111316,roughness:.85});
        [[-.5,.85],[-.5,-.85],[.5,.85],[.5,-.85]].forEach(p=>{const w=new T.Mesh(wGeo,wMat);w.rotation.z=Math.PI/2;w.position.set(p[0],.13,p[1]);w.castShadow=true;g.add(w);});
        const hlMat=new T.MeshStandardMaterial({color:0xFFF4D0,emissive:0xFFE9A0,emissiveIntensity:.6});
        [-.28,.28].forEach(z2=>{const hl=new T.Mesh(new T.BoxGeometry(.08,.08,.04),hlMat);hl.position.set(.45,.34,z2+.78);g.add(hl);});
        const tlMat=new T.MeshStandardMaterial({color:0xFF3A2A,emissive:0xFF2A1A,emissiveIntensity:.5});
        [-.28,.28].forEach(z2=>{const tl=new T.Mesh(new T.BoxGeometry(.06,.08,.04),tlMat);tl.position.set(-.45,.34,z2-.86);g.add(tl);});
        return g;};
      const carCols=[0xFFFFFF,0x1A1A1A,0xC9A85A,0x3A5A85,0x96414F,0x5A8F6A,0xE0453A,0x2A2A2A];
      for(let i=0;i<8;i++){const car=mkCar(carCols[i%carCols.length]);car.position.set(-34+(i%3)*2,0,28+Math.floor(i/3)*2.6);car.rotation.y=(i%2?1:-1)*0.08;scene.add(car);}
      /* podium base (warm stone) */
      const podiumMesh=new T.Mesh(new T.BoxGeometry(W+4,6.5,DEP+4),new T.MeshStandardMaterial({color:0xC9C2B0,roughness:.7}));podiumMesh.position.set(0,3.25,0);podiumMesh.castShadow=true;podiumMesh.receiveShadow=true;scene.add(podiumMesh);
      novBloom=new T.PointLight(0xFFB060,0,40,2);novBloom.position.set(0,2,16);scene.add(novBloom);
      novPodLight=new T.PointLight(0xFFCE82,0,30,2);novPodLight.position.set(0,3,12);scene.add(novPodLight);
      water=null;ring=null;ring2=null;
    }else{
      ground=new T.Mesh(new T.CircleGeometry(120,64),mats.ground);
      ground.rotation.x=-Math.PI/2; ground.position.y=-1.22; ground.receiveShadow=true; scene.add(ground);
      water=new T.Mesh(new T.RingGeometry(22.8,27.6,90),mats.water);
      water.rotation.x=-Math.PI/2; water.position.y=-1.16; scene.add(water);
      podium=new T.Mesh(new T.CylinderGeometry(21,22.4,1.1,72),mats.podium);
      podium.position.y=-0.62; podium.receiveShadow=true; scene.add(podium);
      ring=new T.Mesh(new T.TorusGeometry(21.6,0.09,10,140),mats.trim);
      ring.rotation.x=Math.PI/2; ring.position.y=-0.04; scene.add(ring);
      ring2=new T.Mesh(new T.TorusGeometry(18.6,0.045,8,120),mats.trim.clone());
      ring2.material.emissiveIntensity=.3; ring2.rotation.x=Math.PI/2; ring2.position.y=0.02; scene.add(ring2);
      for(let k=0;k<6;k++){ const a=k/6*Math.PI*2+.4,rr=19.1;
        const p=buildPalm(T,mats,r0()); p.position.set(Math.cos(a)*rr,-.08,Math.sin(a)*rr);
        p.rotation.y=r0()*6; scene.add(p); }
    }

    /* tower */
    const roomGeo=new T.BoxGeometry(RW-0.22,RH,RD-0.14);
    const slabGeo=new T.BoxGeometry(W,SLAB,DEP);
    const trimGeo=new T.BoxGeometry(W+0.24,0.07,0.09);
    const stripGeo=new T.BoxGeometry(W-0.5,0.03,COR-0.3);
    const doorGeo=new T.BoxGeometry(.62,RH*.92,.05);
    const bedGeo=new T.BoxGeometry(1.22,.28,1.45);
    const annexGeo=new T.BoxGeometry(1.9,SLAB,1.9);
    const nov=isNovotel();
    const slabBandGeo=nov?new T.BoxGeometry(W+0.5,0.22,DEP+0.4):null;
    const intPlateGeo=nov?new T.BoxGeometry(W-1.5,0.1,DEP-1.5):null;
    const mullGeo=nov?new T.BoxGeometry(0.12,RH+0.1,0.08):null;
    const slabBandMat=nov?new T.MeshStandardMaterial({color:0xD9D2C2,roughness:.85,metalness:.05}):null;
    const intMat=nov?new T.MeshStandardMaterial({color:0xE8D9B0,roughness:.9,emissive:0xFFCE82,emissiveIntensity:0}):null;
    const mullMat=nov?new T.MeshStandardMaterial({color:0x2A3036,roughness:.4,metalness:.7}):null;
    const rooms=[],floors=[];
    const seedState=()=>{ const x=r0(); return x<0.40?'clean':x<0.64?'occ':x<0.74?'due':x<0.88?'dirty':x<0.94?'inspect':'ooo'; };
    for(let f=0;f<FL;f++){
      const g=new T.Group(); g.position.y=f*FH; scene.add(g);
      floors.push({g});
      if(nov){
        const sb=new T.Mesh(slabBandGeo,slabBandMat);sb.position.y=0;sb.receiveShadow=true;sb.castShadow=true;g.add(sb);
        const ip=new T.Mesh(intPlateGeo,intMat);ip.position.y=0.06;g.add(ip);floorLights.push(ip);
        for(let mi=0;mi<=SIDE;mi++){const mx=X0-W/2+1.7+mi*RW;
          [-1,1].forEach(sd=>{const mull=new T.Mesh(mullGeo,mullMat);mull.position.set(mx,FH/2,sd>0?ROOM_Z+RD/2-0.02:-(ROOM_Z+RD/2-0.02));mull.castShadow=true;g.add(mull);});}
      }else{
        const slab=new T.Mesh(slabGeo,mats.slab); slab.receiveShadow=true; g.add(slab);
        const strip=new T.Mesh(stripGeo,mats.cor); strip.position.y=SLAB/2+0.015; strip.receiveShadow=true; g.add(strip);
        [-1,1].forEach(s=>{ const tr=new T.Mesh(trimGeo,mats.trim); tr.position.set(0,SLAB/2+0.02,s*(DEP/2+0.05)); g.add(tr); });
        [-1,1].forEach(s=>{ const an=new T.Mesh(annexGeo,mats.annex); an.position.set(s*LX,0,0); an.receiveShadow=true; g.add(an); });
      }
      for(let s=0;s<2;s++)for(let i=0;i<SIDE;i++){
        const st=seedState(),S=STATES[st];
        const mat=nov
          ?new T.MeshPhysicalMaterial({color:S.c,emissive:S.e,emissiveIntensity:S.em*2,transparent:true,
            opacity:st==='ooo'?0.12:(dark?.28:.35),roughness:.06,metalness:.15,envMapIntensity:1.5,clearcoat:1,
            clearcoatRoughness:.04,transmission:.12,ior:1.45,depthWrite:false})
          :new T.MeshStandardMaterial({color:S.c,emissive:S.e,emissiveIntensity:S.em,transparent:true,
            opacity:st==='ooo'?0.3:(dark?.5:.6),roughness:dark?.12:.2,metalness:.22,depthWrite:false});
        const m=new T.Mesh(roomGeo,mat);
        const x=X0+i*RW,z=s?ROOM_Z:-ROOM_Z;
        m.position.set(x,nov?FH/2:SLAB/2+RH/2,z);
        m.castShadow=nov; g.add(m);
        /* furniture — bed visible through the glass */
        const bed=new T.Mesh(bedGeo,mats.bed);
        bed.position.set(x,nov?FH/2-0.7:SLAB/2+0.16,z+(s?.38:-.38));
        bed.castShadow=nov; g.add(bed);
        /* hinged door on the corridor wall */
        const hs=i%2?1:-1;
        const dg=new T.Group();
        const dm=new T.Mesh(doorGeo,mats.door); dm.position.x=-hs*.31; dm.castShadow=false;
        dg.add(dm);
        dg.position.set(x+hs*((RW-.22)/2-.02),nov?FH/2+.01:SLAB/2+.01,s?FACE_Z:-FACE_Z);
        g.add(dg);
        const mins=(5+(r0()*60)|0);
        const rm={no:(f+1)*100+i+1+s*10,f,s,i,x,z,rz:z,dz:s?DOOR_Z:-DOOR_Z,state:st,mesh:m,mat,
          baseOp:nov?(st==='ooo'?0.12:(dark?.28:.35)):(st==='ooo'?0.3:(dark?.5:.6)),prio:false,by:null,it:0,last:mins+'m ago',door:dg,doa:0,dhs:hs,bed,
          type:TYPES()[f],view:VIEWS[(i+s+f)%VIEWS.length],score:91+(r0()*8|0),
          temp:22.4+r0()*1.4,hum:50+(r0()*8|0),pm:7+(r0()*7|0),
          hist:[['Turn completed',STAFF_DEF()[(r0()*12)|0]][0],mins+ (r0()*4|0)],
          cts:0,cdur:0,prog:0,insp:STAFF_DEF()[(r0()*10)|0][0]};
        m.userData.rm=rm; rooms.push(rm);
      }
    }

    /* elevator annex towers + travelling cars */
    const shafts=[buildShaft(T,-1,mats,gold2Col),buildShaft(T,1,mats,gold2Col)];
    shafts.forEach(sh=>scene.add(sh.root));

    /* crown */
    const crown=new T.Mesh(new T.BoxGeometry(W*0.52,0.5,DEP*0.62),mats.slab); crown.position.y=TOP+0.25; crown.castShadow=true; scene.add(crown);
    const crownTrim=new T.Mesh(new T.BoxGeometry(W*0.52+0.2,0.07,DEP*0.62+0.2),mats.trim); crownTrim.position.y=TOP+0.04; scene.add(crownTrim);
    const fin=new T.Mesh(new T.SphereGeometry(0.34,20,20),new T.MeshStandardMaterial({color:gold2Col,emissive:gold2Col,emissiveIntensity:.95,metalness:.6,roughness:.3}));
    fin.position.y=TOP+1.15; scene.add(fin);

    /* Novotel facade extras: curtain wall, LED ribbons, signage, balconies, pool */
    let novSigns=[];
    if(nov){
      /* dark teal glass curtain wall behind the room grid */
      const cwMat=new T.MeshPhysicalMaterial({color:0x123040,roughness:.06,metalness:.18,transparent:true,opacity:.15,
        envMapIntensity:1.5,clearcoat:1,clearcoatRoughness:.04,transmission:.08,ior:1.45,depthWrite:false});
      const cwFront=new T.Mesh(new T.BoxGeometry(W+0.4,TOP+FH,0.1),cwMat);
      cwFront.position.set(0,TOP/2,ROOM_Z+RD/2+0.06);scene.add(cwFront);
      const cwBack=cwFront.clone();cwBack.position.z=-(ROOM_Z+RD/2+0.06);scene.add(cwBack);
      /* curved white LED ribbons flowing down each facade */
      const faceZ=ROOM_Z+RD/2+0.1;
      for(let r=0;r<4;r++)for(const fz of [faceZ,-faceZ]){
        const pts=[];for(let i=0;i<=24;i++){const t=i/24;const y=TOP-t*(TOP-FH*1.5);
          const wave=Math.sin(t*Math.PI*1.6+r*1.7)*2.0+Math.sin(t*Math.PI*3.1+r*1.7)*0.9;
          pts.push(new T.Vector3(Math.cos(r)*wave,y,fz));}
        const curve=new T.CatmullRomCurve3(pts,false,'catmullrom',.5);
        const rmat=new T.MeshStandardMaterial({color:0xFFFFFF,emissive:0xFFFFFF,emissiveIntensity:1.6,roughness:.2,metalness:.1});
        const tube=new T.Mesh(new T.TubeGeometry(curve,80,.06,7,false),rmat);scene.add(tube);
        const halo=new T.Mesh(new T.TubeGeometry(curve,80,.15,7,false),
          new T.MeshBasicMaterial({color:0xBFE0FF,transparent:true,opacity:.25}));scene.add(halo);
        novRibbons.push({mat:rmat,halo:halo.material});
      }
      /* NOVOTEL blue illuminated signage on crown */
      const signMat=new T.MeshStandardMaterial({color:0x0A2E6E,emissive:0x1E6FFF,emissiveIntensity:1.3,roughness:.3,metalness:.2});
      const signW=0.5,hh=0.95,d2=0.13,gap=0.1;const txt='NOVOTEL';
      for(const sf of [1,-1]){
        let cursor=-(((signW+gap)*(txt.length-1))/2);
        txt.split('').forEach(ch=>{if(ch===' '){cursor+=signW+gap;return;}
          const seg=new T.Mesh(new T.BoxGeometry(signW,hh,d2),signMat);seg.position.set(cursor,TOP+1.7,sf*(DEP/2+0.2));
          if(sf<0)seg.rotation.y=Math.PI;scene.add(seg);novSigns.push(seg);cursor+=signW+gap;});
      }
      /* terrace greenery on balcony projections every 3rd floor */
      const hedgeMat=new T.MeshStandardMaterial({color:0x3F6B2E,roughness:.95});
      const balMat=new T.MeshStandardMaterial({color:dark?0x2A3340:0xD9D2C2,roughness:.8});
      for(let f=2;f<FL;f+=3){const bal=new T.Mesh(new T.BoxGeometry(W+0.7,0.16,1.4),balMat);
        bal.position.set(0,f*FH,ROOM_Z+RD/2+0.8);bal.castShadow=true;scene.add(bal);
        const bal2=bal.clone();bal2.position.z=-(ROOM_Z+RD/2+0.8);scene.add(bal2);
        for(let i=0;i<SIDE;i++){const h=new T.Mesh(new T.BoxGeometry(1.3,0.45,0.55),hedgeMat);
          h.position.set(X0+i*RW,f*FH+0.3,ROOM_Z+RD/2+1.1);h.castShadow=true;scene.add(h);
          const h2=h.clone();h2.position.z=-(ROOM_Z+RD/2+1.1);scene.add(h2);}}
      /* rooftop pool with transmission water + umbrellas */
      const poolDeck=new T.Mesh(new T.BoxGeometry(W*0.6,0.2,DEP*0.5),new T.MeshStandardMaterial({color:0xE8E2D4,roughness:.7}));poolDeck.position.set(0,TOP+0.5,0);poolDeck.receiveShadow=true;scene.add(poolDeck);
      const poolB=new T.Mesh(new T.BoxGeometry(W*0.42,0.3,DEP*0.38),new T.MeshStandardMaterial({color:0x123A4E,roughness:.2}));
      poolB.position.set(-W*0.1,TOP+0.65,0);scene.add(poolB);
      const poolW=new T.Mesh(new T.PlaneGeometry(W*0.38,DEP*0.32),
        new T.MeshPhysicalMaterial({color:0x2EC4D9,roughness:.05,metalness:.1,transmission:.7,ior:1.33,
          transparent:true,opacity:.85,envMapIntensity:1.4,clearcoat:1}));
      poolW.rotation.x=-Math.PI/2;poolW.position.set(-W*0.1,TOP+0.82,0);poolW.receiveShadow=true;scene.add(poolW);
      [0xE0453A,0xE08A2A,0xE0453A].forEach((uc,i)=>{const pole=new T.Mesh(new T.CylinderGeometry(0.03,1.0,1.6,8),
        new T.MeshStandardMaterial({color:0xD9D2C2,roughness:.5}));pole.position.set(W*0.05+i*0.7,TOP+1.4,0);scene.add(pole);
        const umb=new T.Mesh(new T.ConeGeometry(0.8,0.22,12),new T.MeshStandardMaterial({color:uc,roughness:.7,side:T.DoubleSide}));
        umb.position.set(W*0.05+i*0.7,TOP+2.05,0);umb.castShadow=true;scene.add(umb);});
    }

    /* staff — full humanoid + cart + name label */
    const staff=STAFF_DEF().map((def,ix)=>{
      const H=buildHuman(T,mats.char);
      const cart=buildCart(T,mats);
      cart.position.y=SLAB/2;
      const label=makeLabel(T,def[0]); label.position.y=2.0; H.g.add(label);
      const sp=[],stM=[];
      for(let k=0;k<3;k++){ const sm=new T.Mesh(new T.SphereGeometry(0.05,6,6),sparkMat); sm.visible=false; H.g.add(sm); sp.push(sm); }
      for(let k=0;k<2;k++){ const mm=new T.MeshBasicMaterial({color:0xDCE9F5,transparent:true,opacity:0});
        const wm=new T.Mesh(new T.SphereGeometry(0.07,8,8),mm); wm.visible=false; H.g.add(wm); stM.push({m:wm,mm}); }
      const f=def[1]<0?(ix*3)%FL:def[1];
      H.g.position.y=SLAB/2;
      floors[f].g.add(H.g); floors[f].g.add(cart);
      const side=ix%2?1:-1;
      return {n:def[0],floater:def[1]<0,f,g:H.g,H,cart,label,sp,stM,side,shaft:null,ltf:f,
        x:(r0()*2-1)*(W/2-4),z:((ix%5)-2)*0.42,cz:((ix%5)-2)*0.42,
        mode:'wait',room:null,wps:[],t:r0()*9,walkT:r0()*6,ct:0,cdur:1,wait:0.4+r0()*3.5,speed:2.1+r0()*0.8};
    });

    /* gold dust */
    const DN=120,dpos=new Float32Array(DN*3),dspd=new Float32Array(DN);
    for(let i=0;i<DN;i++){ const a=r0()*Math.PI*2,rr=15+r0()*14; dpos[i*3]=Math.cos(a)*rr; dpos[i*3+1]=r0()*(TOP+3); dpos[i*3+2]=Math.sin(a)*rr; dspd[i]=0.22+r0()*0.45; }
    const dgeo=new T.BufferGeometry(); dgeo.setAttribute('position',new T.BufferAttribute(dpos,3));
    const dust=new T.Points(dgeo,new T.PointsMaterial({color:gold2Col,size:0.14,transparent:true,opacity:.45,blending:T.AdditiveBlending,depthWrite:false}));
    scene.add(dust);

    /* selection beam + floor rings */
    const beacon=new T.Mesh(new T.CylinderGeometry(0.15,0.15,2.8,12,1,true),
      new T.MeshBasicMaterial({color:0xE8C877,transparent:true,opacity:.5,blending:T.AdditiveBlending,depthWrite:false,side:T.DoubleSide}));
    beacon.visible=false; scene.add(beacon);
    const selRing=new T.Mesh(new T.TorusGeometry(.95,.035,8,40),
      new T.MeshBasicMaterial({color:0xF2E0AE,transparent:true,opacity:.85,blending:T.AdditiveBlending,depthWrite:false}));
    selRing.rotation.x=Math.PI/2; selRing.visible=false;
    const fxMats={red:new T.MeshBasicMaterial({color:0xFF5A4A,transparent:true,opacity:.8,blending:T.AdditiveBlending,depthWrite:false}),
      green:new T.MeshBasicMaterial({color:0x46B086,transparent:true,opacity:.8,blending:T.AdditiveBlending,depthWrite:false}),
      gold:new T.MeshBasicMaterial({color:0xE8C877,transparent:true,opacity:.8,blending:T.AdditiveBlending,depthWrite:false})};
    const fx=[];
    for(let k=0;k<8;k++){ const m=new T.Mesh(new T.TorusGeometry(.6,.03,6,32),fxMats.gold); m.rotation.x=Math.PI/2; m.visible=false; scene.add(m);
      fx.push({m,life:0,max:1,key:'gold'}); }

    /* overlay DOM */
    $('#hk3d-legend').innerHTML=LEG.map(l=>`<button class="hk-chip" data-st="${l[0]}" title="Spotlight ${l[1]}"><i style="background:${hex(STATES[l[0]].c)}"></i>${l[1]}<b class="num" id="hk-c-${l[0]}">0</b></button>`).join('');
    $('#hk3d-floors').innerHTML=`<button data-floor="all" class="on">All</button>`+
      Array.from({length:FL},(_,i)=>FL-1-i).map(f=>`<button data-floor="${f}">F${f+1}</button>`).join('')+
      `<button data-floor="x" class="hk-x" title="Exploded view">${icon('layers')}<span>Explode</span></button>`+
      `<button data-floor="2d" class="hk-x" title="Switch to 2D grid board">${icon('dashboard')}<span>2D</span></button>`;

    const w=stage.clientWidth||900,h=stage.clientHeight||620;
    renderer.setSize(w,h,false); camera.aspect=w/h; camera.updateProjectionMatrix();

    const R={
      T,renderer,scene,camera,stage,rooms,floors,staff,shafts,dust,dspd,beacon,selRing,fx,fxMats,fin,ring,ring2,water,mats,hemi,key,rim,
      floorLights,novRibbons,novBloom,novPodLight,
      cam:{th:.7,ph:.92,r:nov?62:40,tth:.7,tph:.92,tr:nov?62:40,ty:TOP/2-0.4,auto:true},
      ray:new T.Raycaster(),ptr:new T.Vector2(),v3:new T.Vector3(),
      sel:null,iso:null,explode:false,ex:0,serviced:86,spawnT:3,hbT:0.5,pT:0,t:0,last:performance.now(),
      theme:dark?'dark':'light',spot:{st:null,t:0},r0,raf:0,autoT:0,ro:null,
    };
    R.ro=new ResizeObserver(()=>{ if(!rt)return; const ww=stage.clientWidth,hh=stage.clientHeight; if(!ww||!hh)return;
      renderer.setSize(ww,hh,false); camera.aspect=ww/hh; camera.updateProjectionMatrix(); });
    R.ro.observe(stage);
    updCounts(R); updTags(R);
    R.raf=requestAnimationFrame(n=>tick(R,n));
    window.__hk3d={
      destroy,
      select:no=>{ const rm=R.rooms.find(r=>String(r.no)===String(no)); if(rm){ select(R,rm); } return !!rm; },
      cleaning:()=>R.rooms.filter(r=>r.state==='cleaning').map(r=>r.no),
    };
    return R;
  }

  /* ---------------- theme ---------------- */
  function applyTheme(R,dark){
    R.theme=dark?'dark':'light';
    const T=R.T,css=v=>getComputedStyle(document.documentElement).getPropertyValue(v).trim();
    const bg=new T.Color(css('--bg-0')||'#E9EDF2');
    if(isNovotel()){
      R.scene.background=new T.Color(dark?0x1B2E4A:0x2E4A6E);
      R.scene.fog.color.copy(R.scene.background);
    }else{
      R.scene.background=bg; R.scene.fog.color.copy(bg);
    }
    R.mats.slab.color.set(dark?0x1B2230:0xDFE4EC);
    R.mats.annex.color.set(dark?0x161E2C:0xD6DCE5);
    R.mats.cor.color.set(dark?0x232C3D:0xE7EBF1);
    R.mats.podium.color.set(dark?0x05070B:0x101826);
    R.mats.ghost.color.set(dark?0x121722:0xCED4DE);
    R.mats.door.color.set(dark?0x101A2B:0x2A3A52);
    R.mats.bed.color.set(dark?0x3A4658:0xE9EDF3);
    R.mats.ground.color.set(dark?0x070B12:0xDDE2EA);
    R.mats.water.opacity=dark?.55:.42;
    R.mats.char.tunic.color.set(dark?0xF2F4F8:0xF2F4F8);
    R.mats.cart.color.set(dark?0xA8893E:0xB08D3C);
    const gold=new T.Color(css('--gold')||'#B08D3C');
    R.mats.trim.color.copy(gold); R.mats.trim.emissive.copy(gold);
    if(isNovotel()){
      R.hemi.color.set(0xBFE0FF); R.hemi.groundColor.set(0x2A3A2A); R.hemi.intensity=.5;
      R.key.intensity=dark?1.0:1.25; R.key.color.set(0xFFE0A8);
    }else{
      R.hemi.color.set(dark?0xAEC0DC:0xF6F8FF); R.hemi.groundColor.set(dark?0x0A101C:0xD8DEE8);
      R.key.intensity=dark?1.15:1.05;
    }
    R.rooms.forEach(rm=>{
      if(isNovotel()){
        rm.baseOp=rm.state==='ooo'?0.12:(dark?.28:.35);
        rm.mat.roughness=.06;
      }else{
        rm.baseOp=rm.state==='ooo'?0.3:(dark?.5:.6);
        rm.mat.roughness=dark?.12:.2;
      }
      if(R.spot.t<=0&&!R.sel)rm.mat.opacity=rm.baseOp; });
  }

  /* ---------------- elevators ---------------- */
  function shaftStep(s,dt){
    if(s.state==='move'){
      s.car.position.y+=(s.toY-s.car.position.y)*Math.min(1,dt*2.2);
      if(Math.abs(s.toY-s.car.position.y)<.05){ s.car.position.y=s.toY; s.at=Math.round((s.toY-SLAB/2)/FH); s.state='open'; s.open=0; s.timer=2.4; s.cb&&s.cb(); }
    }else if(s.state==='open'){
      s.open=Math.min(1,s.open+dt*3.2); s.timer-=dt;
      if(s.timer<=0){ s.state='closing'; }
    }else{
      s.open=Math.max(0,s.open-dt*3.2);
      if(s.state==='closing'&&s.open===0){ s.state='idle'; s.cb=null; s.owner=false; s.idle=3+Math.random()*5; }
      else if(s.state==='idle'&&!s.owner){ s.idle-=dt; if(s.idle<=0){ const f=Math.round(Math.random()*(FL-1)); callShaft(s,f); } }
    }
    const slide=s.open*.34;
    s.dL.position.x=-.2-slide; s.dR.position.x=.2+slide;
  }
  function callShaft(s,f,cb){ s.toY=SLAB/2+f*FH; s.state='move'; s.owner=!!cb; if(cb)s.cb=cb; s.idle=99; }
  function attachToShaft(R,p){
    const s=p.shaft;
    R.floors[p.f].g.remove(p.g); R.floors[p.f].g.remove(p.cart);
    s.car.add(p.g); s.car.add(p.cart);
    p.g.position.set(0,0,.13); p.cart.position.set(0,0,-.16);
    p.label.visible=false;
  }
  function detachShaft(R,p){
    const s=p.shaft,f=p.ltf;
    s.car.remove(p.g); s.car.remove(p.cart);
    R.floors[f].g.add(p.g); R.floors[f].g.add(p.cart);
    p.f=f; p.x=s.side*LX; p.z=0;
    p.g.position.set(s.side*LX,SLAB/2,0); p.cart.position.set(s.side*LX,SLAB/2,0);
    p.label.visible=true; p.shaft=null;
  }

  /* ---------------- simulation ---------------- */
  function setState(R,rm,st){
    rm.state=st; const S=STATES[st];
    rm.mat.color.setHex(S.c); rm.mat.emissive.setHex(S.e); rm.mat.emissiveIntensity=S.em;
    rm.baseOp=st==='ooo'?0.3:(R.theme==='dark'?.5:.6);
    if(R.spot.t<=0&&R.sel!==rm)rm.mat.opacity=rm.baseOp;
  }
  function dirtyRooms(R){ return R.rooms.filter(r=>r.state==='dirty'||r.state==='due'); }
  function spawnRing(R,rm,key){
    const f=R.fx.find(x=>x.life<=0); if(!f)return;
    R.floors[rm.f].g.add(f.m);
    f.m.material=R.fxMats[key]; f.key=key;
    f.m.position.set(rm.x,SLAB/2+.04,rm.z);
    f.m.scale.setScalar(.5); f.m.visible=true; f.life=.0001; f.max=1.1;
  }
  function assignTarget(R,p){
    let cands=dirtyRooms(R).filter(r=>!r.by&&r.f===p.f);
    if(!cands.length&&p.floater){
      const all=dirtyRooms(R).filter(r=>!r.by);
      if(all.length){
        all.sort((a,b)=>Math.abs(a.f-p.f)-Math.abs(b.f-p.f));
        const tf=all[0].f;
        if(tf!==p.f){
          p.shaft=R.shafts[p.side>0?1:0]; p.ltf=tf;
          p.mode='lift-lobby';
          p.wps=[{x:p.shaft.side*LX-Math.sign(p.shaft.side)*1.4,z:0}];
          return;
        }
        cands=all.filter(r=>r.f===p.f);
      }
    }
    if(!cands.length){ p.mode='patrol'; p.room=null; p.wps=[{x:(R.r0()*2-1)*(W/2-3),z:p.cz}]; return; }
    cands.sort((a,b)=>Math.abs(a.x-p.x)-Math.abs(b.x-p.x));
    const rm=cands.find(c=>c.prio)||cands[0];
    rm.by=p.n; p.room=rm; p.mode='go';
    p.wps=[{x:rm.x,z:p.cz},{x:rm.x,z:rm.dz}];
  }
  function arrive(R,p){
    if(p.mode==='go'){
      p.mode='enter'; p.wps=[{x:p.room.x,z:p.room.rz}];
      p.room.prio=false; setState(R,p.room,'cleaning');
      p.room.cts=Date.now(); p.room.cdur=6+R.r0()*6; p.cdur=p.room.cdur;
      feed('red',`${p.n} started a turn`,`Residence ${p.room.no} · ${FLOOR_NAMES()[p.room.f]}`);
      spawnRing(R,p.room,'red');
      updTags(R); if(R.sel===p.room)renderPanel(R);
    }
    else if(p.mode==='enter'){ p.mode='clean'; p.ct=p.cdur; }
    else if(p.mode==='exit'){ p.mode='wait'; p.wait=.7+R.r0()*1.4; }
    else if(p.mode==='patrol'){ p.mode='wait'; p.wait=1.6+R.r0()*2.4; }
    else if(p.mode==='lift-lobby'){
      p.mode='lift-wait';
      callShaft(p.shaft,p.f,()=>{});
    }
    else if(p.mode==='lift-in'){ attachToShaft(R,p); p.mode='lift-ride'; callShaft(p.shaft,p.ltf); }
    else if(p.mode==='lift-out'){ p.mode='wait'; p.wait=.5+R.r0(); }
  }
  function finishClean(R,p){
    const rm=p.room;
    p.sp.forEach(sm=>sm.visible=false); p.stM.forEach(w=>{w.m.visible=false;w.mm.opacity=0;});
    R.serviced++;
    const insp=R.r0()<.25;
    rm.by=null; rm.last='just now'; rm.prog=1; p.room=null;
    setState(R,rm,insp?'inspect':'clean');
    if(!insp){ rm.score=92+(R.r0()*7|0); rm.insp=p.n; }
    spawnRing(R,rm,insp?'gold':'green');
    feed('green',`Residence ${rm.no} serviced`,insp?`${p.n} · quality inspection pending`:`${p.n} · released to front desk · score ${rm.score}`);
    p.mode='exit'; p.wps=[{x:rm.x,z:rm.dz}];
    updTags(R); if(R.sel===rm)renderPanel(R);
  }
  function spawnDirty(R){
    const open=R.rooms.filter(r=>r.state==='dirty'||r.state==='due'||r.state==='cleaning').length;
    if(open>=26)return;
    const pool=R.rooms.filter(r=>r.state==='clean'||r.state==='occ');
    if(!pool.length)return;
    const rm=pool[(R.r0()*pool.length)|0];
    const due=R.r0()<.3;
    setState(R,rm,due?'due':'dirty');
    if(!due)feed('amber','Checkout sensed',`Residence ${rm.no} marked for turn · IoT door`);
    updTags(R); if(R.sel===rm)renderPanel(R);
  }

  function animateRig(R,p,dt,moving,cleaning){
    const H=p.H,k=Math.min(1,dt*10);
    if(cleaning){
      H.upper.rotation.x+=(.42-H.upper.rotation.x)*k;
      H.legL.rotation.x*= (1-k); H.legR.rotation.x*=(1-k);
      H.armL.rotation.x+=(-.1+Math.sin(R.t*3)*.08-H.armL.rotation.x)*k;
      H.armR.rotation.x+=(-.85+Math.sin(R.t*9)*.55-H.armR.rotation.x)*k;
      H.armR.rotation.z+=(-.25-H.armR.rotation.z)*k;
      p.g.position.y=SLAB/2+Math.sin(R.t*8)*.012;
    }else if(moving){
      p.walkT+=dt*9.5; const sw=Math.sin(p.walkT)*.55;
      H.legL.rotation.x+=(sw-H.legL.rotation.x)*k;
      H.legR.rotation.x+=(-sw-H.legR.rotation.x)*k;
      H.armL.rotation.x+=(-sw*.7-H.armL.rotation.x)*k;
      H.armR.rotation.x+=(sw*.7-H.armR.rotation.x)*k;
      H.armR.rotation.z+=(0-H.armR.rotation.z)*k;
      H.upper.rotation.x+=(.07-H.upper.rotation.x)*k;
      p.g.position.y=SLAB/2+Math.abs(Math.sin(p.walkT))*.055;
    }else{
      H.legL.rotation.x*=(1-k); H.legR.rotation.x*=(1-k);
      H.armL.rotation.x*=(1-k); H.armR.rotation.x*=(1-k); H.armR.rotation.z*=(1-k);
      H.upper.rotation.x*=(1-k);
      p.g.position.y=SLAB/2+Math.sin(R.t*1.8+p.t)*.008;
    }
  }

  function stepStaff(R,p,dt){
    p.t+=dt;
    const walking=['go','enter','exit','patrol','lift-lobby','lift-in','lift-out'].includes(p.mode);

    if(p.mode==='lift-wait'){
      const s=p.shaft;
      if(s.state==='open'&&s.at===p.f){ p.mode='lift-in'; p.wps=[{x:s.side*LX,z:0}]; }
    }
    else if(p.mode==='lift-ride'){
      const s=p.shaft;
      if(s.state==='open'&&s.at===p.ltf){
        detachShaft(R,p);
        p.mode='lift-out'; p.wps=[{x:s.side*LX-Math.sign(s.side)*1.4,z:0}];
      }
    }
    else if(walking&&p.wps.length){
      const wp=p.wps[0],dx=wp.x-p.x,dz=wp.z-p.z,d=Math.hypot(dx,dz);
      const sp=p.speed*((p.mode==='enter'||p.mode==='exit'||p.mode.startsWith('lift'))?.62:1);
      if(d<.07){ p.x=wp.x; p.z=wp.z; p.wps.shift(); if(!p.wps.length)arrive(R,p); }
      else{
        p.x+=dx/d*sp*dt; p.z+=dz/d*sp*dt;
        const trg=Math.atan2(dx,dz); let dr=trg-p.g.rotation.y;
        while(dr>Math.PI)dr-=2*Math.PI; while(dr<-Math.PI)dr+=2*Math.PI;
        p.g.rotation.y+=dr*Math.min(1,dt*9);
        p.cart.userData.wheels.forEach(w=>w.rotation.x+=sp*dt*9);
      }
    } else if(p.mode==='clean'){
      p.ct-=dt;
      if(p.room){ p.room.prog=Math.max(0,Math.min(1,1-p.ct/p.cdur)); }
      p.sp.forEach((s,k)=>{ s.visible=true; const a=R.t*3.4+k*2.1; s.position.set(Math.cos(a)*.36,.86+Math.sin(R.t*5.4+k*1.7)*.2,Math.sin(a)*.36); });
      p.stM.forEach((w,k)=>{ w.m.visible=true;
        const ph=(R.t*.35+k*.5)%1;
        w.m.position.set((k?.1:-.12),.8+ph*.55,.1+Math.sin(R.t*3+k)*.12);
        const sc=.5+ph*.9; w.m.scale.setScalar(sc); w.mm.opacity=(1-ph)*.5; });
      if(p.ct<=0)finishClean(R,p);
    } else if(p.mode==='wait'){
      p.wait-=dt;
      if(p.wait<=0)assignTarget(R,p);
    }
    p.g.position.x=p.x; p.g.position.z=p.z;
    if(p.mode==='go'||p.mode==='patrol'||p.mode==='lift-lobby'||p.mode==='lift-out'){
      const bx=p.x+Math.sin(p.g.rotation.y+Math.PI/2)*.5,bz=p.z+Math.cos(p.g.rotation.y+Math.PI/2)*.5;
      p.cart.position.x+=(bx-p.cart.position.x)*Math.min(1,dt*4);
      p.cart.position.z+=(bz-p.cart.position.z)*Math.min(1,dt*4);
      p.cart.rotation.y=p.g.rotation.y;
    }
    animateRig(R,p,dt,walking&&p.wps.length>0,p.mode==='clean');
  }

  /* ---------------- DOM: feed / tags / counts / live panel ---------------- */
  function feed(color,title,sub){
    const list=$('#hk-feed-list'); if(!list)return;
    const d=document.createElement('div');
    d.className='hk-feed-item';
    const time=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
    const col=color==='red'?'#E23B3B':`var(--${color==='green'?'emerald':color==='amber'?'amber':color==='violet'?'violet':'gold'})`;
    d.innerHTML=`<span class="hk-fi-dot" style="background:${col}"></span><div><b>${title}</b><small>${sub} · ${time}</small></div>`;
    list.prepend(d);
    while(list.children.length>9)list.lastChild.remove();
  }
  function seedFeed(){
    feed('violet','Inspection passed','Residence 305 · Lagoon floor');
    feed('amber','Checkout sensed','Residence 708 marked for turn · IoT door');
    feed('green','Residence 412 serviced','Marco Silva · released to front desk');
  }
  function updCounts(R){
    const cnt={}; LEG.forEach(l=>cnt[l[0]]=0);
    R.rooms.forEach(r=>cnt[r.state]++);
    LEG.forEach(l=>{ const el=$('#hk-c-'+l[0]); if(el)el.textContent=cnt[l[0]]; });
  }
  function updTags(R){
    const open=R.rooms.filter(r=>r.state==='dirty'||r.state==='due'||r.state==='cleaning').length;
    const a=$('#hk-tag-serviced'),b=$('#hk-tag-open');
    if(a)a.innerHTML=`${icon('check')}${R.serviced} serviced`;
    if(b)b.textContent=`${open} turns open`;
  }
  function ringSVG(pct,color){
    const C=2*Math.PI*26;
    return `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="26" fill="none" stroke="var(--line)" stroke-width="5"/>
      <circle cx="32" cy="32" r="26" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round"
      stroke-dasharray="${C}" stroke-dashoffset="${C*(1-pct)}" transform="rotate(-90 32 32)"/></svg>`;
  }
  function chkRow(label,state){
    const ic=state==='pass'?'<i class="hk-ck-pass">'+icon('check')+'</i>'
      :state==='run'?'<i class="hk-spin"></i>'
      :'<i class="hk-ck-wait"></i>';
    const tx=state==='pass'?'Passed':state==='run'?'In progress':'Pending';
    return `<div class="hk-chk-row ${state}">${ic}<span>${label}</span><small>${tx}</small></div>`;
  }
  function renderPanel(R){
    const el=$('#hk-rp-body'); if(!el)return;
    const rm=R.sel;
    if(!rm){ el.innerHTML=`<div class="hk-rp-empty"><span class="hk-rp-ic">${icon('building')}</span><b>Select a unit</b><small>Click any residence on the tower for its live inspection report, telemetry and attendant.</small></div>`; return; }
    const S=STATES[rm.state];
    const att=rm.by?R.staff.find(p=>p.n===rm.by):null;
    const cleaning=rm.state==='cleaning';
    const passed=rm.state==='clean';
    const done=cleaning?Math.floor(rm.prog*6):(rm.state==='inspect'?6:6);
    const pct=cleaning?rm.prog:(passed?rm.score/100:rm.state==='inspect'?1:rm.score/100);
    const scoreColor=cleaning?'var(--gold)':rm.state==='inspect'?'var(--violet)':'var(--emerald)';
    const scoreTxt=cleaning?Math.round(rm.prog*100)+'%':rm.state==='inspect'?'QA':rm.score;
    const scoreSub=cleaning?'Turn progress':rm.state==='inspect'?'Awaiting QA':'Quality score';
    const checks=CHECKS.map((c,i)=>chkRow(c,cleaning?(i<done?'pass':i===done?'run':'wait'):passed||rm.state==='inspect'?'pass':'pass')).join('');
    const elapsed=cleaning&&rm.cts?Math.max(0,Math.round((Date.now()-rm.cts)/1000)):0;
    const mm=String(Math.floor(elapsed/60)).padStart(2,'0'),ss=String(elapsed%60).padStart(2,'0');
    const temp=(rm.temp+Math.sin(R.t/6+rm.i)*.25).toFixed(1);
    const hum=Math.round(rm.hum+Math.sin(R.t/5+rm.i)*1.5);
    const pm=(rm.pm+Math.sin(R.t/7+rm.i)*.6).toFixed(0);
    const lockTxt=cleaning?'Turn in progress':rm.state==='ooo'?'Engineering lock':'Sealed';
    let actions='';
    if(rm.state==='dirty'||rm.state==='due'||cleaning)
      actions=`<button class="btn-gold btn-sm" data-hk-act="priority">${icon('zap')}<span>Priority turn</span></button>`;
    if(rm.state==='inspect')
      actions=`<button class="btn-gold btn-sm" data-hk-act="inspect">${icon('checkCircle')}<span>Pass inspection</span></button>`;
    if(rm.state==='ooo')
      actions=`<button class="btn-gold btn-sm" data-hk-act="engineer">${icon('wrench')}<span>Dispatch engineer</span></button>`;
    if(rm.state==='occ')
      actions=`<button class="btn-ghost btn-sm" data-hk-act="refresh">${icon('sparkles')}<span>Request turndown</span></button>`;
    if(rm.state==='clean')
      actions=`<button class="btn-ghost btn-sm" data-hk-act="inspect">${icon('clipboard')}<span>Re-inspect</span></button>`;
    el.innerHTML=`
    <div class="hk-rp-head">
      <div><div class="hk-rp-no serif">${rm.no}</div><small class="muted">${rm.type} · F${rm.f+1} ${FLOOR_NAMES()[rm.f]}</small></div>
      <span class="hk-status" style="--sc:${hex(S.c)}">${S.label}</span>
    </div>
    <div class="hk-rp-score">
      <div class="hk-sc-ring">${ringSVG(pct,scoreColor)}<b style="color:${scoreColor}">${scoreTxt}</b></div>
      <div class="hk-sc-meta"><b>${scoreSub}</b><small>${rm.view} · 62 m² king</small><small>${cleaning?`Live · ${mm}:${ss} elapsed`:'Refreshed just now'}</small></div>
    </div>
    <div class="hk-rp-sec"><label>Inspection checklist</label><div class="hk-chk">${checks}</div></div>
    <div class="hk-rp-sec"><label>Room telemetry · IoT</label>
      <div class="hk-tele">
        <div class="hk-tel"><b>${temp}°C</b><small>Climate</small></div>
        <div class="hk-tel"><b>${hum}%</b><small>Humidity</small></div>
        <div class="hk-tel"><b>${pm}</b><small>PM2.5</small></div>
        <div class="hk-tel"><b>${lockTxt}</b><small>Door lock</small></div>
      </div>
    </div>
    <div class="hk-rp-sec"><label>Attendant</label>
      <div class="hk-att">
        ${att?avatar(att.n):`<span class="hk-att-ic">${icon('users')}</span>`}
        <div class="lrow-main"><b>${att?att.n:(rm.state==='dirty'||rm.state==='due')?'Aves dispatching…':'Unassigned'}</b>
        <small>${att?(cleaning?'Servicing now · PPE verified':`Last turn ${rm.last}`):'Nearest free attendant will be routed'}</small></div>
        ${cleaning?'<span class="tag tag-red">Live</span>':''}
      </div>
    </div>
    <div class="hk-rp-sec"><label>Service history</label><div class="hk-hist">
      <div class="hk-hist-row"><i>${icon('check')}</i><span>${passed||cleaning?'Turn in progress / released':'Last turn'}</span><small>${att?att.n:rm.insp} · ${rm.last}</small></div>
      <div class="hk-hist-row"><i>${icon('clipboard')}</i><span>QA inspection · ${rm.score}</span><small>${rm.insp}</small></div>
      <div class="hk-hist-row"><i>${icon('key')}</i><span>Digital key audit</span><small>Tamper-clear</small></div>
    </div></div>
    <div class="hk-rp-actions">${actions}</div>`;
  }

  /* ---------------- picking / tooltip / selection ---------------- */
  function pick(R,e){
    const rect=R.renderer.domElement.getBoundingClientRect();
    R.ptr.x=((e.clientX-rect.left)/rect.width)*2-1;
    R.ptr.y=-((e.clientY-rect.top)/rect.height)*2+1;
    R.ray.setFromCamera(R.ptr,R.camera);
    const meshes=[];
    R.rooms.forEach(r=>{ if(R.iso===null||r.f===R.iso)meshes.push(r.mesh); });
    const h=R.ray.intersectObjects(meshes,false);
    return h.length?h[0].object.userData.rm:null;
  }
  function hideTip(){ const tip=$('#hk3d-tip'); if(tip)tip.hidden=true; if(rt)rt.renderer.domElement.style.cursor='grab'; }
  function placeSelFx(R){
    const rm=R.sel;
    if(!rm){ R.beacon.visible=false; R.selRing.visible=false; return; }
    if(R.selRing.parent!==R.floors[rm.f].g){ R.selRing.remove(); R.floors[rm.f].g.add(R.selRing); }
    R.selRing.position.set(rm.x,SLAB/2+.05,rm.z);
    R.selRing.visible=R.iso===null||rm.f===R.iso;
    R.beacon.visible=R.iso===null||rm.f===R.iso;
  }
  function select(R,rm){
    R.sel=rm;
    placeSelFx(R);
    renderPanel(R);
  }
  function applyIso(R){
    R.floors.forEach((fl,f)=>{
      const dim=R.iso!==null&&f!==R.iso;
      fl.g.traverse(o=>{
        if(o.isMesh){
          if(!o.userData.m)o.userData.m=o.material;
          o.material=dim?R.mats.ghost:o.userData.m;
        }
      });
    });
    placeSelFx(R);
  }
  function spotlight(R,st){
    R.spot.st=st; R.spot.t=1.8;
    R.rooms.forEach(rm=>{ rm.mat.opacity=rm.state===st?Math.min(.92,rm.baseOp+.3):.08; });
  }
  function clearSpot(R){ R.rooms.forEach(rm=>rm.mat.opacity=R.sel===rm?Math.min(.9,rm.baseOp+.2):rm.baseOp); }

  function actPriority(R){
    const rm=R.sel; if(!rm)return;
    if(rm.state!=='dirty'&&rm.state!=='due'&&rm.state!=='cleaning'){ toast('No turn required',`Residence ${rm.no} is ${STATES[rm.state].label.toLowerCase()}`,'gold'); return; }
    rm.prio=true;
    const idle=R.staff.find(p=>p.f===rm.f&&(p.mode==='wait'||p.mode==='patrol'));
    if(idle){ idle.wait=0; idle.wps=[]; assignTarget(R,idle); }
    feed('gold','Priority dispatch',`Residence ${rm.no} moved to the front of the queue`);
    renderPanel(R);
  }
  function actInspect(R){
    const rm=R.sel; if(!rm)return;
    if(rm.state==='clean'){ setState(R,rm,'inspect'); rm.it=2.5; feed('violet','Re-inspection opened',`Residence ${rm.no}`); renderPanel(R); updCounts(R); return; }
    if(rm.state==='ooo'){ toast('Out of order','Engineering must release this residence first','red'); return; }
    if(rm.state==='cleaning'){ toast('Turn in progress','Inspection available once the attendant finishes','gold'); return; }
    rm.it=0; rm.score=Math.max(rm.score,93+(R.r0()*6|0)); setState(R,rm,'clean');
    feed('violet','Inspection passed',`Residence ${rm.no} · score ${rm.score} released to front desk`);
    renderPanel(R); updCounts(R); updTags(R);
  }
  function actEngineer(R){
    const rm=R.sel; if(!rm)return;
    setState(R,rm,'due'); spawnRing(R,rm,'gold');
    feed('amber','Engineering released unit',`Residence ${rm.no} returned for a turn`);
    renderPanel(R); updCounts(R);
  }
  function actRefresh(R){
    const rm=R.sel; if(!rm)return;
    setState(R,rm,'dirty');
    feed('gold','Turndown requested',`Residence ${rm.no} · guest in residence`);
    renderPanel(R); updCounts(R);
  }

  /* ---------------- events ---------------- */
  function bindDom(){
    const R=rt,cv=R.renderer.domElement;
    let down=null,dragging=false,lastTip=0;
    cv.style.touchAction='none';
    const wake=()=>{ R.cam.auto=false; clearTimeout(R.autoT); R.autoT=setTimeout(()=>{ if(rt)rt.cam.auto=true; },7000); };
    cv.addEventListener('pointerdown',e=>{ down={x:e.clientX,y:e.clientY,th:R.cam.tth,ph:R.cam.tph}; dragging=false; cv.setPointerCapture(e.pointerId); wake(); });
    cv.addEventListener('pointermove',e=>{
      if(down){
        const dx=e.clientX-down.x,dy=e.clientY-down.y;
        if(!dragging&&Math.hypot(dx,dy)>5)dragging=true;
        if(dragging){ R.cam.tth=down.th-dx*.0056; R.cam.tph=Math.max(.3,Math.min(1.35,down.ph-dy*.004)); hideTip(); wake(); }
      } else {
        const now=performance.now(); if(now-lastTip<60)return; lastTip=now;
        const rm=pick(R,e),tip=$('#hk3d-tip');
        if(!tip)return;
        if(!rm){ hideTip(); return; }
        const S=STATES[rm.state];
        tip.innerHTML=`<b>${rm.no}</b><i style="background:${hex(S.c)}"></i>${S.label}${rm.by?` · ${rm.by.split(' ')[0]}`:''}`;
        const rect=R.stage.getBoundingClientRect();
        tip.style.left=Math.min(rect.width-160,Math.max(8,e.clientX-rect.left+14))+'px';
        tip.style.top=Math.max(8,e.clientY-rect.top-16)+'px';
        tip.hidden=false;
        cv.style.cursor='pointer';
      }
    });
    cv.addEventListener('pointerup',e=>{ if(down&&!dragging){ const rm=pick(R,e); select(R,rm===R.sel?null:rm); } down=null; dragging=false; });
    cv.addEventListener('pointerleave',()=>hideTip());
    cv.addEventListener('wheel',e=>{
      if(!(e.ctrlKey||e.metaKey))return;
      e.preventDefault();
      R.cam.tr=Math.max(16,Math.min(70,R.cam.tr*(1+e.deltaY*.001))); wake();
    },{passive:false});

    $('#hk3d-floors').addEventListener('click',e=>{
      const b=e.target.closest('button'); if(!b)return;
      const d=b.dataset.floor;
      if(d==='x'){ R.explode=!R.explode; b.classList.toggle('on',R.explode); return; }
      if(d==='2d'){ hk2dSet(true); const st=R.stage; destroy(); fallback2D(st); return; }
      const f=d==='all'?null:+d;
      R.iso=R.iso===f?null:f;
      applyIso(R);
      $$('#hk3d-floors button').forEach(x=>{ if(x.dataset.floor!=='x')x.classList.toggle('on',(x.dataset.floor==='all'&&R.iso===null)||+x.dataset.floor===R.iso); });
    });
    $('#hk3d-legend').addEventListener('click',e=>{
      const ch=e.target.closest('[data-st]'); if(!ch)return;
      spotlight(R,ch.dataset.st);
    });
    $('#hk-rp').addEventListener('click',e=>{
      const b=e.target.closest('[data-hk-act]'); if(!b)return;
      const a=b.dataset.hkAct;
      if(a==='priority')actPriority(R);
      else if(a==='inspect')actInspect(R);
      else if(a==='engineer')actEngineer(R);
      else if(a==='refresh')actRefresh(R);
    });
  }

  /* ---------------- frame loop ---------------- */
  function tick(R,now){
    R.raf=requestAnimationFrame(n=>tick(R,n));
    const dt=Math.min(.05,(now-R.last)/1000); R.last=now; R.t+=dt;
    const thm=document.documentElement.dataset.theme==='dark';
    if((thm?'dark':'light')!==R.theme)applyTheme(R,thm);

    R.ex+=((R.explode?1:0)-R.ex)*Math.min(1,dt*4);
    R.floors.forEach((fl,f)=>{ fl.g.position.y=f*FH+R.ex*(f-(FL-1)/2)*1.5; });

    const c=R.cam;
    if(c.auto)c.tth+=dt*.05;
    c.th+=(c.tth-c.th)*Math.min(1,dt*7); c.ph+=(c.tph-c.ph)*Math.min(1,dt*7); c.r+=(c.tr-c.r)*Math.min(1,dt*6);
    R.camera.position.set(Math.sin(c.th)*Math.sin(c.ph)*c.r,c.ty+Math.cos(c.ph)*c.r,Math.cos(c.th)*Math.sin(c.ph)*c.r);
    R.camera.lookAt(0,c.ty,0);

    R.shafts.forEach(s=>shaftStep(s,dt));
    R.staff.forEach(p=>stepStaff(R,p,dt));

    /* doors + room pulses */
    R.rooms.forEach(rm=>{
      const open=R.staff.some(p=>p.room===rm&&(p.mode==='enter'||p.mode==='clean'||p.mode==='exit'))?1:0;
      rm.doa+=(open-rm.doa)*Math.min(1,dt*7);
      const ang=rm.dhs*(rm.s?1:-1)*1.08*rm.doa;
      rm.door.rotation.y=ang;
      if(rm.state==='cleaning')rm.mat.emissiveIntensity=.55+Math.sin(R.t*5+rm.i)*.3;
      else if(rm.state==='dirty'||rm.state==='due')rm.mat.emissiveIntensity=STATES[rm.state].em+Math.sin(R.t*2.6+rm.i)*.07;
      else if(R.sel===rm)rm.mat.emissiveIntensity=STATES[rm.state].em+.18;
      else rm.mat.emissiveIntensity=STATES[rm.state].em;
      if(R.sel===rm&&R.spot.t<=0)rm.mat.opacity=Math.min(.92,rm.baseOp+.18+Math.sin(R.t*3)*.03);
      if(rm.state==='inspect'&&rm.it>0){ rm.it-=dt; if(rm.it<=0){ rm.score=94+(R.r0()*5|0); setState(R,rm,'clean'); feed('violet','Inspection passed',`Residence ${rm.no} released to front desk · score ${rm.score}`); if(R.sel===rm)renderPanel(R); } }
    });
    R.spawnT-=dt; if(R.spawnT<=0){ R.spawnT=3.6+R.r0()*2.4; spawnDirty(R); }
    R.hbT-=dt; if(R.hbT<=0){ R.hbT=1; updCounts(R); }

    /* Novotel day/night facade animation */
    if(R.novRibbons&&R.novRibbons.length){
      const cyc=(R.t%60)/60;const ang=cyc*Math.PI*2;
      const night=Math.max(0,-Math.sin(ang));
      R.floorLights.forEach(fl=>fl.material.emissiveIntensity=night*.55);
      R.novRibbons.forEach((r,i)=>{r.mat.emissiveIntensity=.55+night*1.6+Math.sin(R.t*2+i)*.15;r.halo.opacity=.18+night*.32;});
      if(R.novBloom)R.novBloom.intensity=night*1.4;
      if(R.novPodLight)R.novPodLight.intensity=night*1.2;
    }

    /* fx rings */
    R.fx.forEach(f=>{ if(f.life>0){ f.life+=dt; const q=f.life/f.max;
      if(q>=1){ f.life=0; f.m.visible=false; f.m.remove(); }
      else { f.m.scale.setScalar(.5+q*1.6); f.m.material.opacity=.8*(1-q); } } });

    /* selected room rings + beam */
    if(R.sel&&R.selRing.visible){
      const p=1+Math.sin(R.t*3)*.08;
      R.selRing.scale.setScalar(p);
      R.selRing.material.opacity=.65+Math.sin(R.t*3)*.25;
      R.sel.mesh.getWorldPosition(R.v3);
      R.beacon.position.set(R.v3.x,R.v3.y+RH/2+1.2,R.v3.z);
      R.beacon.material.opacity=.4+Math.sin(R.t*4)*.18;
      R.beacon.rotation.y+=dt*1.2;
    }

    /* live panel refresh for the selected unit */
    if(R.sel){ R.pT-=dt; if(R.pT<=0){ R.pT=.8; renderPanel(R); } }

    const dp=R.dust.geometry.attributes.position;
    for(let i=0;i<dp.count;i++){ let y=dp.getY(i)+R.dspd[i]*dt; if(y>TOP+3)y=-1; dp.setY(i,y); }
    dp.needsUpdate=true;
    R.dust.rotation.y+=dt*.02;
    if(R.ring)R.ring.rotation.z+=dt*.06; if(R.ring2)R.ring2.rotation.z-=dt*.045;
    R.fin.position.y=TOP+1.15+Math.sin(R.t*1.4)*.12; R.fin.rotation.y+=dt*.5;
    if(R.water)R.water.position.z=R.water.position.z;
    if(R.spot.t>0){ R.spot.t-=dt; if(R.spot.t<=0)clearSpot(R); }
    R.renderer.render(R.scene,R.camera);
  }

  /* ---------------- 2D fallback ---------------- */
  function fallback2D(stage){
    stage.classList.add('hk3d-2d');
    const statCycle=['clean','occ','due','dirty','clean','clean','occ','ooo','clean','due'];
    const floors=Array.from({length:FL},(_,i)=>FL-i);
    const rpf=SIDE*2;
    stage.innerHTML=`<div class="hk3d-2d-scroll">
      <div class="hk3d-2d-note">${icon('info')}Grid board mode — lighter on your device.
        <button class="hk3d-modebtn" id="hk-try3d">${icon('sparkles')}Try live 3D twin</button></div>
      ${floors.map(fl=>{
        const cells=Array.from({length:rpf},(_,i)=>{
          const st=statCycle[(i+fl)%10];
          const label={clean:'Ready',occ:'Occupied',due:'Due out',dirty:'Turn',ooo:'OOO'}[st];
          const no=fl*100+i+1;
          return `<div class="room-cell rc-${st}" data-room="${no}" data-st="${st}" title="Room ${no} · ${label} · click to change"><b>${no}</b><small>${label}</small></div>`;
        }).join('');
        return `<div class="hk-floor"><div class="hk-fl"><b>Floor ${fl}</b><small>${FLOOR_NAMES()[fl-1]}</small></div><div class="hk-cells">${cells}</div></div>`;
      }).join('')}
    </div>`;
    const tb=$('#hk-try3d');
    if(tb)tb.addEventListener('click',()=>{ hk2dSet(false); boot(); });
    $$('.room-cell[data-room]').forEach(c=>c.addEventListener('click',()=>{
      const order=['clean','occ','due','dirty'];
      const next=order[(order.indexOf(c.dataset.st)+1)%4];
      c.classList.remove('rc-'+c.dataset.st);
      c.dataset.st=next;c.classList.add('rc-'+next);
      c.querySelector('small').textContent={clean:'Ready',occ:'Occupied',due:'Due out',dirty:'Turn'}[next];
      toast(`Room ${c.dataset.room} → ${c.querySelector('small').textContent}`,'Status broadcast to housekeeping & front desk','gold');
    }));
  }

  return {boot,destroy};
})();
/* ============================================================
   ROOM3D — In-house 3D floor plans · ultra-premium interiors
   Room types: Studio, Deluxe, Suite, 1 BHK
   Fully furnished (bed, TV, kitchen appliances, bathroom, etc.)
   ============================================================ */
const ROOM3D=(()=>{
  let rt=null, loading=false, timer=0, q=[];
  function withThree(done){
    if(window.THREE){ done(true); return; }
    q.push(done); if(loading)return; loading=true;
    const s=document.createElement('script');
    s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/0.158.0/three.min.js';
    s.async=true;
    const fin=ok=>{ loading=false; clearTimeout(timer); const qq=q.splice(0); qq.forEach(f=>f(ok)); };
    s.onload=()=>fin(true); s.onerror=()=>fin(false);
    (document.head||document.documentElement).appendChild(s);
    timer=setTimeout(()=>fin(false),12000);
  }

  const ROOM_TYPES={
    studio:{name:'Studio',area:'28 m²',bed:'Queen',tag:'Cosy open-plan',w:5.4,d:4.6},
    deluxe:{name:'Deluxe',area:'42 m²',bed:'King',tag:'Spacious retreat',w:6.6,d:5.4},
    suite:{name:'Suite',area:'68 m²',bed:'King',tag:'Separate living',w:9.2,d:6.4},
    onebhk:{name:'1 BHK',area:'58 m²',bed:'Queen',tag:'Hall + kitchen',w:8.0,d:6.8},
  };

  /* ---------- materials & textures ---------- */
  function makeMats(T){
    const wood=woodTexture(T), wall=wallTexture(T), rug=rugTexture(T), marble=marbleTexture(T);
    return {
      floor:new T.MeshStandardMaterial({map:wood,roughness:.45,metalness:.04,envMapIntensity:1.2}),
      floor2:new T.MeshStandardMaterial({map:marble,roughness:.35,metalness:.08}),
      wall:new T.MeshStandardMaterial({map:wall,roughness:.92,metalness:.0,color:0xF0EDE5,envMapIntensity:0.3}),
      ceiling:new T.MeshStandardMaterial({color:0xF6F3EE,roughness:.95}),
      wood:new T.MeshStandardMaterial({map:wood,roughness:.55,metalness:.05}),
      darkwood:new T.MeshStandardMaterial({color:0x4A3A2E,roughness:.5,metalness:.1,envMapIntensity:0.8}),
      fabric:new T.MeshStandardMaterial({color:0x9AA0A8,roughness:.92,envMapIntensity:0.6}),
      fabric2:new T.MeshStandardMaterial({color:0x6E747C,roughness:.9}),
      leather:new T.MeshStandardMaterial({color:0x5A6068,roughness:.72,metalness:.05}),
      metal:new T.MeshStandardMaterial({color:0xC9CCD1,roughness:.22,metalness:.92,envMapIntensity:1.1}),
      gold:new T.MeshStandardMaterial({color:0xC9A85A,roughness:.24,metalness:.9,envMapIntensity:1.2}),
      glass:new T.MeshPhysicalMaterial({color:0xCEDAE3,roughness:.08,metalness:.0,transmission:.85,transparent:true,opacity:.45,ior:1.45,clearcoat:1,clearcoatRoughness:0.04,envMapIntensity:1.4}),
      stone:new T.MeshStandardMaterial({color:0xD9D2C4,roughness:.8}),
      rug:new T.MeshStandardMaterial({map:rug,roughness:.95}),
      white:new T.MeshStandardMaterial({color:0xF4F1EB,roughness:.85}),
      black:new T.MeshStandardMaterial({color:0x1A1A1A,roughness:.4,metalness:.3}),
      sheet:new T.MeshStandardMaterial({color:0xF2EDE4,roughness:.8}),
      duvet:new T.MeshStandardMaterial({color:0xE8E4DC,roughness:.85}),
      green:new T.MeshStandardMaterial({color:0x4A6B4A,roughness:.8}),
      bulb:new T.MeshStandardMaterial({color:0xFFE6B0,emissive:0xFFC870,emissiveIntensity:1.4}),
      oakSlat:new T.MeshStandardMaterial({color:0xAD8C68,roughness:.45,metalness:.04,envMapIntensity:0.55}),
      sheer:new T.MeshPhysicalMaterial({color:0xFFFFFF,roughness:1,transparent:true,opacity:.35,side:T.DoubleSide}),
      drape:new T.MeshStandardMaterial({color:0xC4B894,roughness:.95,side:T.DoubleSide}),
      counter:new T.MeshPhysicalMaterial({color:0xE8E4DC,roughness:0.15,metalness:.1,clearcoat:1,envMapIntensity:0.8}),
      blackMatte:new T.MeshStandardMaterial({color:0x1A1C20,roughness:.5,metalness:.3}),
      aoMat:new T.MeshStandardMaterial({color:0x000000,transparent:true,opacity:0.3}),
      linen:new T.MeshStandardMaterial({color:0xFCFCFC,roughness:.88}),
      tweed:new T.MeshStandardMaterial({color:0x6E737C,roughness:.78,metalness:.04,envMapIntensity:0.4}),
      walnut:new T.MeshStandardMaterial({color:0x61432C,roughness:.35,envMapIntensity:0.6}),
      quartz:new T.MeshStandardMaterial({color:0xFCFCFC,roughness:.12,metalness:.05,envMapIntensity:0.9}),
      bronze:new T.MeshStandardMaterial({color:0x966F33,metalness:.85,roughness:.3,envMapIntensity:1.1}),
      champagne:new T.MeshStandardMaterial({color:0xD8D2C4,roughness:.38,metalness:.05,envMapIntensity:0.6}),
      ceramic:new T.MeshStandardMaterial({color:0xDED9D0,roughness:.32,envMapIntensity:0.5}),
      oakPanel:new T.MeshStandardMaterial({color:0x9C7A56,roughness:.52,metalness:.08,envMapIntensity:0.5}),
    };
  }
  function woodTexture(T){
    // Scandinavian oak planks — individual variance, seams, staggered ends, organic grain
    const c=document.createElement('canvas'); c.width=1024; c.height=1024;
    const x=c.getContext('2d');
    x.fillStyle='#bca182'; x.fillRect(0,0,1024,1024);
    const ph=72;
    for(let y=0;y<1024;y+=ph){
      const d=(Math.random()-0.5)*22;
      x.fillStyle=`rgb(${188+d|0},${161+d*0.9|0},${130+d*0.8|0})`;
      x.fillRect(0,y,1024,ph-2);
      x.fillStyle='rgba(58,42,28,0.55)'; x.fillRect(0,y+ph-2,1024,2);
      const off=(y%144===0)?0:340;
      for(let px=off;px<1024;px+=420){ x.fillRect(px,y,2,ph-2); }
      x.strokeStyle='rgba(92,65,40,0.12)'; x.lineWidth=1.1;
      for(let g=0;g<6;g++){ x.beginPath(); const sy=y+g*11+Math.random()*4; x.moveTo(0,sy); x.bezierCurveTo(340,sy+(Math.random()-0.5)*12,680,sy+(Math.random()-0.5)*12,1024,sy); x.stroke(); }
    }
    const tx=new T.CanvasTexture(c); tx.wrapS=tx.wrapT=T.RepeatWrapping; tx.repeat.set(2,2);
    tx.colorSpace=T.SRGBColorSpace; tx.anisotropy=8; return tx;
  }
  function wallTexture(T){
    const c=document.createElement('canvas'); c.width=256; c.height=256;
    const x=c.getContext('2d'); x.fillStyle='#EDE7DC'; x.fillRect(0,0,256,256);
    for(let i=0;i<3000;i++){ const a=Math.random()*.05; x.fillStyle=`rgba(120,100,70,${a})`; x.fillRect(Math.random()*256,Math.random()*256,1,1); }
    const tx=new T.CanvasTexture(c); tx.wrapS=tx.wrapT=T.RepeatWrapping; tx.repeat.set(3,3); tx.colorSpace=T.SRGBColorSpace; return tx;
  }
  function rugTexture(T){
    // Bouclé wool — thousands of loop stipples
    const c=document.createElement('canvas'); c.width=512; c.height=512;
    const x=c.getContext('2d');
    x.fillStyle='#dbd4c7'; x.fillRect(0,0,512,512);
    for(let i=0;i<26000;i++){
      const px=Math.random()*512, py=Math.random()*512, r=1.0+Math.random()*1.4;
      const tone=Math.floor(190+Math.random()*45);
      x.fillStyle=`rgba(${tone},${tone-10},${tone-20},0.65)`;
      x.beginPath(); x.arc(px,py,r,0,Math.PI*2); x.fill();
    }
    const tx=new T.CanvasTexture(c); tx.wrapS=tx.wrapT=T.RepeatWrapping; tx.repeat.set(4,4); tx.colorSpace=T.SRGBColorSpace; return tx;
  }
  function marbleTexture(T){
    const c=document.createElement('canvas'); c.width=512; c.height=512;
    const x=c.getContext('2d'); x.fillStyle='#E8E4DC'; x.fillRect(0,0,512,512);
    for(let i=0;i<40;i++){ x.strokeStyle=`rgba(150,140,125,${.08+Math.random()*.18})`; x.lineWidth=1+Math.random()*2; x.beginPath(); x.moveTo(Math.random()*512,0); x.bezierCurveTo(Math.random()*512,170,Math.random()*512,340,Math.random()*512,512); x.stroke(); }
    const tx=new T.CanvasTexture(c); tx.wrapS=tx.wrapT=T.RepeatWrapping; tx.repeat.set(2,2); tx.colorSpace=T.SRGBColorSpace; return tx;
  }

  /* ---------- furniture asset builders ---------- */
  function roundedBox(T,w,h,d,r=0.04){
    const s=new T.Shape(); const x=-w/2,y=-h/2,rr=Math.min(r,Math.max(w,h)/2-0.001);
    s.moveTo(x+rr,y); s.lineTo(x+w-rr,y); s.quadraticCurveTo(x+w,y,x+w,y+rr);
    s.lineTo(x+w,y+h-rr); s.quadraticCurveTo(x+w,y+h,x+w-rr,y+h);
    s.lineTo(x+rr,y+h); s.quadraticCurveTo(x,y+h,x,y+h-rr);
    s.lineTo(x,y+rr); s.quadraticCurveTo(x,y,x+rr,y);
    const g=new T.ExtrudeGeometry(s,{depth:Math.max(0.01,d-rr*2),bevelEnabled:true,bevelThickness:rr,bevelSize:rr,bevelSegments:3,steps:1});
    g.rotateX(Math.PI/2); g.translate(0,0,0);
    return g;
  }
  function makeShadow(T, w, d) {
    const c = document.createElement('canvas'); c.width = c.height = 128;
    const x = c.getContext('2d');
    const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, 'rgba(0,0,0,0.35)');
    g.addColorStop(0.5, 'rgba(0,0,0,0.18)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = g; x.fillRect(0, 0, 128, 128);
    const tex = new T.CanvasTexture(c);
    const mesh = new T.Mesh(new T.PlaneGeometry(w, d), new T.MeshBasicMaterial({map: tex, transparent: true, depthWrite: false}));
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = 0.01;
    return mesh;
  }
  function makeBed(T,m,king=false){
    const g=new T.Group();
    const w=king?2.0:1.6,l=king?2.2:2.1;
    g.add(makeShadow(T, w+0.4, l+0.4));
    // platform base
    const base=new T.Mesh(roundedBox(T,w,.35,l),m.darkwood); base.position.y=.175; base.castShadow=true; base.receiveShadow=true; g.add(base);
    // linen mattress
    const matt=new T.Mesh(roundedBox(T,w-.12,.24,l-.12),m.linen); matt.position.y=.36+.12; matt.castShadow=true; g.add(matt);
    // relaxed duvet — micro fold vertex displacement
    const duvGeo=new T.BoxGeometry(w-.06,.18,l*.62,8,2,8);
    const dp=duvGeo.attributes.position;
    for(let i=0;i<dp.count;i++){ const y=dp.getY(i); if(y>0){ dp.setY(i,y+Math.sin(dp.getX(i)*5)*.02+Math.cos(dp.getZ(i)*4)*.015); } }
    duvGeo.computeVertexNormals();
    const duv=new T.Mesh(duvGeo,m.duvet); duv.position.set(-w*.04,.36+.12+.09,-l*.16); duv.castShadow=true; g.add(duv);
    const fold=new T.Mesh(new T.BoxGeometry(w-.14,.05,l*.2),m.duvet); fold.position.set(0,.36+.26,-l*.36); g.add(fold);
    // double-stacked down pillows at the head (against headboard)
    const pillow=(sx,z,ry)=>{ const p=new T.Mesh(roundedBox(T,.4,.14,.58),m.linen); p.position.set(sx,.36+.26,z); p.castShadow=true; p.rotation.y=ry||0; g.add(p); };
    pillow(-.36,-l*.36,0.05); pillow(-.28,-l*.33,0.09); pillow(.36,-l*.36,-0.05); pillow(.28,-l*.33,-0.09);
    // padded headboard with cushion layer
    const hb=new T.Mesh(roundedBox(T,w,1.05,.12),m.darkwood); hb.position.set(0,.9,-l/2+.06); hb.castShadow=true; g.add(hb);
    const hbc=new T.Mesh(roundedBox(T,w-.18,.72,.08),m.tweed); hbc.position.set(0,.95,-l/2+.13); g.add(hbc);
    const hbp=new T.Mesh(roundedBox(T,w-.26,.5,.05),m.fabric2); hbp.position.set(0,.96,-l/2+.17); g.add(hbp);
    // bed-end bench with bronze legs
    const bench=new T.Mesh(roundedBox(T,w-.34,.15,.36),m.tweed); bench.position.set(0,.42,l/2+.26); bench.castShadow=true; g.add(bench);
    const bLeg=(sx,sz)=>{ const lg=new T.Mesh(new T.CylinderGeometry(.018,.018,.35,8),m.bronze); lg.position.set(sx,.175,l/2+.26+sz); g.add(lg); };
    bLeg(-w/2+.28,-.12); bLeg(w/2-.28,-.12); bLeg(-w/2+.28,.12); bLeg(w/2-.28,.12);
    g.userData={name:king?'King bed':'Queen bed',cat:'Bedroom'};
    return g;
  }
  function makeNightstand(T,m){
    const g=new T.Group();
    g.add(makeShadow(T, 0.7, 0.6));
    // walnut body
    const b=new T.Mesh(roundedBox(T,.5,.48,.42),m.walnut); b.position.y=.24; b.castShadow=true; b.receiveShadow=true; g.add(b);
    const dr=new T.Mesh(new T.BoxGeometry(.42,.14,.02),m.bronze); dr.position.set(0,.3,.215); g.add(dr);
    // ceramic lamp base
    const lampBase=new T.Mesh(new T.CylinderGeometry(.09,.13,.26,20),m.ceramic); lampBase.position.y=.61; lampBase.castShadow=true; g.add(lampBase);
    // warm emissive fabric shade
    const shade=new T.Mesh(new T.CylinderGeometry(.14,.19,.22,20,1,true),new T.MeshStandardMaterial({color:0xFFF1DB,emissive:0xFFAA44,emissiveIntensity:.4,roughness:.85,side:T.DoubleSide})); shade.position.y=.86; g.add(shade);
    const light=new T.PointLight(0xFFB266,1.0,4,.9); light.position.y=.88; g.add(light);
    g.userData={name:'Nightstand + lamp',cat:'Bedroom'};
    return g;
  }
  function tvScreenTexture(T){
    const cv=document.createElement('canvas'); cv.width=1280; cv.height=720;
    const x=cv.getContext('2d');
    const hotel=(typeof activeProperty==='function'?activeProperty().name:'Aurelia Grand');
    const grad=x.createLinearGradient(0,0,1280,720);
    grad.addColorStop(0,'#0B1E33'); grad.addColorStop(1,'#14304E');
    x.fillStyle=grad; x.fillRect(0,0,1280,720);
    const rr=(rx,ry,rw,rh,r)=>{ x.beginPath(); x.moveTo(rx+r,ry); x.arcTo(rx+rw,ry,rx+rw,ry+rh,r); x.arcTo(rx+rw,ry+rh,rx,ry+rh,r); x.arcTo(rx,ry+rh,rx,ry,r); x.arcTo(rx,ry,rx+rw,ry,r); x.closePath(); };
    x.fillStyle='rgba(255,255,255,.92)'; x.font='bold 26px "Plus Jakarta Sans",sans-serif';
    x.fillText('BIRD OS TV',60,58);
    x.fillStyle='#F0B429'; x.font='bold 16px sans-serif'; x.fillText('● 4K HDR',290,58);
    x.fillStyle='#93A5BC'; x.font='18px sans-serif'; x.textAlign='right';
    x.fillText('12:35 PM • '+hotel,1220,58); x.textAlign='left';
    x.strokeStyle='rgba(255,255,255,.14)'; x.lineWidth=1.5;
    x.beginPath(); x.moveTo(60,80); x.lineTo(1220,80); x.stroke();
    const cg=x.createLinearGradient(60,105,1220,435);
    cg.addColorStop(0,'rgba(30,41,59,.88)'); cg.addColorStop(1,'rgba(15,23,42,.72)');
    x.fillStyle=cg; rr(60,105,1160,330,18); x.fill();
    x.strokeStyle='rgba(255,255,255,.16)'; x.stroke();
    x.fillStyle='#F0B429'; x.font='bold 17px sans-serif'; x.fillText('WELCOME',100,160);
    x.fillStyle='#FFF'; x.font='bold 42px "Plus Jakarta Sans",sans-serif';
    x.fillText('Mr. Rahul Sharma',100,215);
    x.fillStyle='#C6D2E0'; x.font='22px sans-serif';
    x.fillText('Your stay, curated — dining, spa, housekeeping & more',100,258);
    x.fillStyle='#C9A227'; rr(100,300,190,52,14); x.fill();
    x.fillStyle='#1A1408'; x.font='bold 20px sans-serif'; x.fillText('▶  Explore',140,333);
    x.fillStyle='#FFF'; x.font='bold 20px sans-serif'; x.fillText('Smart Portal',60,492);
    const apps=['Stream','Cast','Dining','Spa','Guide','Settings'];
    const pal=['#E50914','#0284C7','#10B981','#F59E0B','#6366F1','#64748B'];
    apps.forEach((a,i)=>{ const ax=60+i*196, ay=514;
      x.fillStyle='rgba(255,255,255,.08)'; rr(ax,ay,178,118,14); x.fill();
      x.strokeStyle='rgba(255,255,255,.12)'; x.stroke();
      x.fillStyle=pal[i]; x.beginPath(); x.arc(ax+34,ay+38,15,0,Math.PI*2); x.fill();
      x.fillStyle='#FFF'; x.font='bold 17px sans-serif'; x.fillText(a,ax+22,ay+88); });
    x.fillStyle='rgba(255,255,255,.35)'; x.font='14px sans-serif'; x.textAlign='center';
    x.fillText('55" OLED • GUEST ENTERTAINMENT PORTAL',640,694); x.textAlign='left';
    const tex=new T.CanvasTexture(cv); tex.colorSpace=T.SRGBColorSpace; tex.anisotropy=4; return tex;
  }
  function makeTV(T,m,wide=1.6){
    const g=new T.Group();
    const h=wide*.56;
    const bezel=new T.Mesh(new T.BoxGeometry(wide,h,.05),new T.MeshStandardMaterial({color:0x0C0D10,metalness:.92,roughness:.18}));
    bezel.castShadow=true; g.add(bezel);
    const screen=new T.Mesh(new T.PlaneGeometry(wide-.05,h-.05),new T.MeshBasicMaterial({map:tvScreenTexture(T)}));
    screen.position.z=.026; g.add(screen);
    const glow=new T.PointLight(0x38BDF8,1.4,4.2,1.2); glow.position.set(0,0,.55); g.add(glow);
    g.userData={name:'Smart TV 55"',cat:'Electronics'};
    return g;
  }
  function makeTVConsole(T,m,w=2.0){
    const g=new T.Group();
    g.add(makeShadow(T, w+0.4, 0.6));
    const body=new T.Mesh(roundedBox(T,w,.42,.44),m.champagne); body.position.y=.21; body.castShadow=true; body.receiveShadow=true; g.add(body);
    // open center slot
    const slot=new T.Mesh(new T.BoxGeometry(w*.32,.3,.4),new T.MeshStandardMaterial({color:0x1B1B1B,roughness:.85})); slot.position.set(0,.21,.03); g.add(slot);
    // side drawers with bronze bar pulls
    for(const s of [-1,1]){
      const dr=new T.Mesh(new T.BoxGeometry(w*.28,.34,.015),m.champagne); dr.position.set(s*w*.36,.21,.228); g.add(dr);
      const pull=new T.Mesh(new T.CylinderGeometry(.008,.008,.13,8),m.bronze); pull.rotation.z=Math.PI/2; pull.position.set(s*w*.36,.21,.245); g.add(pull);
    }
    // set-top box with status LED
    const techM=new T.MeshStandardMaterial({color:0x141414,metalness:.8,roughness:.2});
    const stb=new T.Mesh(new T.BoxGeometry(.26,.05,.2),techM); stb.position.set(-w*.22,.445,0); stb.castShadow=true; g.add(stb);
    const led=new T.Mesh(new T.SphereGeometry(.008,8,8),new T.MeshBasicMaterial({color:0x10B981})); led.position.set(-w*.22+.09,.445,.1); g.add(led);
    // remotes
    const rmat=new T.MeshStandardMaterial({color:0x111111,roughness:.4});
    const r1=new T.Mesh(new T.BoxGeometry(.18,.016,.055),rmat); r1.position.set(w*.16,.428,.08); r1.rotation.y=.18; r1.castShadow=true; g.add(r1);
    const r2=new T.Mesh(new T.BoxGeometry(.16,.016,.05),rmat); r2.position.set(w*.25,.428,-.04); r2.rotation.y=-.14; g.add(r2);
    // brochure stack
    const bro=new T.Mesh(new T.BoxGeometry(.22,.02,.3),new T.MeshStandardMaterial({color:0xEDEDED,roughness:.6})); bro.position.set(w*.42,.43,0); bro.rotation.y=.1; bro.castShadow=true; g.add(bro);
    g.userData={name:'TV console',cat:'Living'};
    return g;
  }
  function makeSofa(T,m,seats=3){
    const g=new T.Group();
    const w=seats*.72;
    g.add(makeShadow(T, w+0.4, 0.9+0.4));
    const base=new T.Mesh(roundedBox(T,w,.34,.84),m.tweed); base.position.y=.17; base.castShadow=true; base.receiveShadow=true; g.add(base);
    const back=new T.Mesh(roundedBox(T,w,.62,.18),m.tweed); back.position.set(0,.53,-.33); back.castShadow=true; g.add(back);
    const arm=(s)=>{ const a=new T.Mesh(roundedBox(T,.2,.52,.84),m.tweed); a.position.set(s*(w/2-.1),.34,0); a.castShadow=true; g.add(a); };
    arm(-1); arm(1);
    // individual seat cushions
    for(let i=0;i<seats;i++){ const c=new T.Mesh(roundedBox(T,w/seats-.1,.15,.62),m.fabric); c.position.set(-w/2+(i+.5)*(w/seats),.43,-.02); c.castShadow=true; g.add(c);
      const bc=new T.Mesh(roundedBox(T,w/seats-.12,.34,.13),m.fabric); bc.position.set(-w/2+(i+.5)*(w/seats),.62,-.26); bc.rotation.x=-.12; bc.castShadow=true; g.add(bc); }
    // casually rotated accent pillows
    const pil=(sx,ry,rz,col)=>{ const p=new T.Mesh(roundedBox(T,.34,.34,.13),col); p.position.set(sx,.62,-.18); p.rotation.set(-.2,ry,rz); p.castShadow=true; g.add(p); };
    pil(-w*.3,.18,-.14,m.fabric2); pil(w*.3,-.22,.16,m.green);
    // folded throw blanket on seat end
    const thr=new T.Mesh(new T.BoxGeometry(.55,.05,.66),new T.MeshStandardMaterial({color:0xDEDEDE,roughness:.92})); thr.position.set(-w/2+.42,.53,.02); thr.rotation.y=.06; thr.castShadow=true; g.add(thr);
    g.userData={name:`${seats}-seat sofa`,cat:'Living'};
    return g;
  }
  function makeArmchair(T,m){
    const g=new T.Group();
    g.add(makeShadow(T, 0.9, 0.8));
    const base=new T.Mesh(roundedBox(T,.7,.28,.68),m.leather); base.position.y=.14; base.castShadow=true; g.add(base);
    const seat=new T.Mesh(roundedBox(T,.6,.12,.56),m.leather); seat.position.y=.26; g.add(seat);
    const back=new T.Mesh(roundedBox(T,.7,.55,.14),m.leather); back.position.set(0,.46,-.27); back.castShadow=true; g.add(back);
    const arm=(s)=>{ const a=new T.Mesh(new T.BoxGeometry(.12,.4,.56),m.leather); a.position.set(s*.29,.3,0); g.add(a); };
    arm(-1); arm(1);
    const leg=(sx,sz)=>{ const l=new T.Mesh(new T.CylinderGeometry(.025,.025,.18,8),m.darkwood); l.position.set(sx,.09,sz); g.add(l); };
    leg(-.27,-.24); leg(.27,-.24); leg(-.27,.24); leg(.27,.24);
    g.userData={name:'Leather armchair',cat:'Living'};
    return g;
  }
  function makeCoffeeTable(T,m){
    const g=new T.Group();
    g.add(makeShadow(T, 1.3, 0.8));
    const top=new T.Mesh(roundedBox(T,1.1,.05,.6),m.counter); top.position.y=.38; top.castShadow=true; top.receiveShadow=true; g.add(top);
    const tray=new T.Mesh(new T.BoxGeometry(.5,.02,.3),m.stone); tray.position.set(-.2,.41,0); g.add(tray);
    const leg=(sx,sz)=>{ const l=new T.Mesh(new T.BoxGeometry(.05,.36,.05),m.metal); l.position.set(sx,.18,sz); g.add(l); };
    leg(-.5,-.25); leg(.5,-.25); leg(-.5,.25); leg(.5,.25);
    g.userData={name:'Coffee table',cat:'Living'};
    return g;
  }
  function makeDesk(T,m){
    const g=new T.Group();
    g.add(makeShadow(T, 1.5, 0.8));
    const top=new T.Mesh(new T.BoxGeometry(1.3,.04,.62),m.darkwood); top.position.y=.75; top.castShadow=true; top.receiveShadow=true; g.add(top);
    const side=new T.Mesh(new T.BoxGeometry(.04,.72,.6),m.darkwood); side.position.set(-.62,.39,0); g.add(side);
    const leg=new T.Mesh(new T.BoxGeometry(.04,.72,.04),m.metal); leg.position.set(.62,.39,.28); g.add(leg);
    const leg2=leg.clone(); leg2.position.z=-.28; g.add(leg2);
    g.userData={name:'Work desk',cat:'Living'};
    return g;
  }
  function makeChair(T,m){
    const g=new T.Group();
    const seat=new T.Mesh(new T.BoxGeometry(.44,.06,.44),m.fabric); seat.position.y=.46; seat.castShadow=true; g.add(seat);
    const back=new T.Mesh(new T.BoxGeometry(.44,.5,.05),m.fabric); back.position.set(0,.72,-.2); g.add(back);
    const leg=(sx,sz)=>{ const l=new T.Mesh(new T.CylinderGeometry(.018,.018,.44,8),m.metal); l.position.set(sx,.22,sz); g.add(l); };
    leg(-.18,-.18); leg(.18,-.18); leg(-.18,.18); leg(.18,.18);
    g.userData={name:'Desk chair',cat:'Living'};
    return g;
  }
  function makeWardrobe(T,m,w=1.6){
    const g=new T.Group();
    const body=new T.Mesh(roundedBox(T,w,2.1,.6),m.darkwood); body.position.y=1.05; body.castShadow=true; body.receiveShadow=true; g.add(body);
    const door=(sx)=>{ const d=new T.Mesh(new T.BoxGeometry(w/2-.03,2.0,.04),m.darkwood); d.position.set(sx*(w/4),1.05,.31); g.add(d);
      const h=new T.Mesh(new T.BoxGeometry(.02,.14,.03),m.gold); h.position.set(sx*(w/4-.06),1.05,.34); g.add(h); };
    door(-1); door(1);
    g.userData={name:'Wardrobe',cat:'Storage'};
    return g;
  }
  function makeKitchen(T,m,full=false){
    const g=new T.Group();
    const len=full?3.0:2.0;
    g.add(makeShadow(T, 2.5, 0.8));
    const base=new T.Mesh(new T.BoxGeometry(len,.9,.62),m.walnut); base.position.set(0,.45,0); base.castShadow=true; base.receiveShadow=true; g.add(base);
    const top=new T.Mesh(new T.BoxGeometry(len+.08,.05,.7),m.quartz); top.position.set(0,.93,0); top.castShadow=true; top.receiveShadow=true; g.add(top);
    const cabDoors=Math.floor(len/.6);
    for(let i=0;i<cabDoors;i++){ const h=new T.Mesh(new T.CylinderGeometry(.011,.011,.17,8),m.bronze); h.position.set(-len/2+(i+.5)*.6,.52,.325); g.add(h); }
    // sink
    const sink=new T.Mesh(new T.BoxGeometry(.5,.18,.4),m.metal); sink.position.set(-len*.3,1.0,0); g.add(sink);
    const basin=new T.Mesh(new T.BoxGeometry(.42,.08,.32),new T.MeshStandardMaterial({color:0x2A2A2A,roughness:.3,metalness:.6})); basin.position.set(-len*.3,1.05,0); g.add(basin);
    const tap=new T.Mesh(new T.CylinderGeometry(.012,.012,.22,8),m.metal); tap.position.set(-len*.3,1.18,-.12); tap.rotation.x=.4; g.add(tap);
    // stove
    const stove=new T.Mesh(new T.BoxGeometry(.56,.04,.46),m.black); stove.position.set(0,1.0,0); g.add(stove);
    for(let i=0;i<4;i++){ const b=new T.Mesh(new T.CylinderGeometry(.07,.07,.01,14),m.metal); b.position.set((i%2?.14:-.14),1.03,i>1?.1:-.1); g.add(b); }
    const knob=(sx)=>{ const k=new T.Mesh(new T.CylinderGeometry(.018,.018,.02,10),m.metal); k.position.set(sx,1.0,.25); k.rotation.x=Math.PI/2; g.add(k); };
    knob(-.12); knob(.12);
    // espresso machine with lit face
    const cm=new T.Mesh(new T.BoxGeometry(.24,.34,.26),new T.MeshStandardMaterial({color:0x1F242D,metalness:.75,roughness:.25})); cm.position.set(len*.33,1.13,-.1); cm.castShadow=true; g.add(cm);
    const cmFace=new T.Mesh(new T.PlaneGeometry(.15,.09),new T.MeshStandardMaterial({color:0x0E141C,emissive:0x2A5468,emissiveIntensity:.7})); cmFace.position.set(len*.33,1.22,.031); g.add(cmFace);
    // ceramic mugs on counter
    const mugM=new T.MeshStandardMaterial({color:0xFAF5EF,roughness:.3});
    for(let i=0;i<3;i++){ const mug=new T.Mesh(new T.CylinderGeometry(.04,.035,.09,14),mugM); mug.position.set(len*.33-.2+i*.1,1.0,.16); mug.castShadow=true; g.add(mug); }
    if(full){
      const oven=new T.Mesh(new T.BoxGeometry(.6,.5,.04),m.black); oven.position.set(.9,.65,-.32); g.add(oven);
      const oh=new T.Mesh(new T.BoxGeometry(.04,.18,.02),m.bronze); oh.position.set(.9,.72,-.34); g.add(oh);
      const mw=new T.Mesh(new T.BoxGeometry(.5,.28,.34),m.metal); mw.position.set(-.9,1.18,0); g.add(mw);
      const mwScreen=new T.Mesh(new T.PlaneGeometry(.3,.12),new T.MeshStandardMaterial({color:0x10202A,emissive:0x204050,emissiveIntensity:.4})); mwScreen.position.set(-.9,1.2,.171); g.add(mwScreen);
    }
    // upper cabinets
    const cab=new T.Mesh(new T.BoxGeometry(len,.5,.32),m.walnut); cab.position.set(0,1.85,-.15); cab.castShadow=true; g.add(cab);
    for(let i=0;i<cabDoors;i++){ const h=new T.Mesh(new T.CylinderGeometry(.011,.011,.14,8),m.bronze); h.position.set(-len/2+(i+.5)*.6,1.68,.02); g.add(h); }
    g.userData={name:full?'Full kitchenette':'Compact kitchenette',cat:'Kitchen'};
    return g;
  }
  function makeFridge(T,m){
    const g=new T.Group();
    g.add(makeShadow(T, 0.9, 0.8));
    const body=new T.Mesh(new T.BoxGeometry(.7,1.8,.62),m.metal); body.position.y=.9; body.castShadow=true; g.add(body);
    const split=new T.Mesh(new T.BoxGeometry(.68,.03,.02),m.black); split.position.set(0,1.25,.31); g.add(split);
    const hTop=new T.Mesh(new T.BoxGeometry(.03,.22,.02),m.black); hTop.position.set(.28,1.5,.32); g.add(hTop);
    const hBot=new T.Mesh(new T.BoxGeometry(.03,.28,.02),m.black); hBot.position.set(.28,.8,.32); g.add(hBot);
    g.userData={name:'Refrigerator',cat:'Kitchen'};
    return g;
  }
  function makeDining(T,m,seats=4){
    const g=new T.Group();
    const w=seats<=2?1.0:1.5;
    g.add(makeShadow(T, 2.2, 1.2));
    const top=new T.Mesh(new T.BoxGeometry(w,.05,.8),m.darkwood); top.position.y=.75; top.castShadow=true; top.receiveShadow=true; g.add(top);
    const leg=(sx,sz)=>{ const l=new T.Mesh(new T.BoxGeometry(.06,.72,.06),m.darkwood); l.position.set(sx,.36,sz); g.add(l); };
    leg(-w/2+.05,-.32); leg(w/2-.05,-.32); leg(-w/2+.05,.32); leg(w/2-.05,.32);
    for(let i=0;i<seats;i++){ const c=new T.Group(); const s=new T.Mesh(new T.BoxGeometry(.38,.05,.38),m.fabric); s.position.y=.46; c.add(s);
      const b=new T.Mesh(new T.BoxGeometry(.38,.42,.05),m.fabric); b.position.set(0,.68,-.17); c.add(b);
      const ll=(sx,sz)=>{ const l=new T.Mesh(new T.CylinderGeometry(.015,.015,.44,8),m.metal); l.position.set(sx,.22,sz); c.add(l); }; ll(-.16,-.16); ll(.16,-.16); ll(-.16,.16); ll(.16,.16);
      const side=i%2, idx=Math.floor(i/2); c.position.set(side===0?(idx===0?-w/2-.25:w/2+.25):(idx===0?-.32:.32),0,side===0?0:(idx===0?-.5:.5)); c.rotation.y=side===0?0:(idx===0?Math.PI/2:-Math.PI/2);
      c.userData={name:'Dining chair',cat:'Dining'}; g.add(c); }
    g.userData={name:`Dining table (${seats})`,cat:'Dining'};
    return g;
  }
  function makeBathroom(T,m){
    const g=new T.Group();
    const vanity=new T.Mesh(new T.BoxGeometry(.9,.85,.5),m.darkwood); vanity.position.set(-.5,.42,0); vanity.castShadow=true; g.add(vanity);
    const vtop=new T.Mesh(new T.BoxGeometry(.94,.04,.54),m.stone); vtop.position.set(-.5,.87,0); g.add(vtop);
    const basin=new T.Mesh(new T.CylinderGeometry(.22,.2,.08,18),m.metal); basin.position.set(-.5,.92,0); g.add(basin);
    const vtap=new T.Mesh(new T.CylinderGeometry(.01,.01,.18,8),m.metal); vtap.position.set(-.5,1.04,-.16); vtap.rotation.x=.4; g.add(vtap);
    const mirror=new T.Mesh(new T.PlaneGeometry(.7,.8),new T.MeshPhysicalMaterial({color:0xCFD8DC,roughness:.05,metalness:.1,transmission:.6,transparent:true,opacity:.55})); mirror.position.set(-.5,1.6,-.24); g.add(mirror);
    const toilet=new T.Mesh(new T.BoxGeometry(.42,.4,.6),m.white); toilet.position.set(.4,.2,0); toilet.castShadow=true; g.add(toilet);
    const tank=new T.Mesh(new T.BoxGeometry(.42,.4,.14),m.white); tank.position.set(.4,.4,-.24); g.add(tank);
    const shower=new T.Group();
    const tray=new T.Mesh(new T.BoxGeometry(.9,.05,.9),m.stone); tray.position.set(0,.025,0); shower.add(tray);
    const glass1=new T.Mesh(new T.BoxGeometry(.9,1.9,.02),m.glass); glass1.position.set(0,.975,-.44); shower.add(glass1);
    const glass2=new T.Mesh(new T.BoxGeometry(.02,1.9,.9),m.glass); glass2.position.set(-.44,.975,0); shower.add(glass2);
    shower.position.set(1.1,0,0); g.add(shower);
    g.userData={name:'Bathroom suite',cat:'Bathroom'};
    return g;
  }
  function makeRug(T,m,w=2.2,d=1.4){
    const r=new T.Mesh(new T.BoxGeometry(w,.02,d),m.rug); r.position.y=.011; r.receiveShadow=true; r.userData={name:'Area rug',cat:'Decor'}; return r;
  }
  function makeFloorLamp(T,m){
    const g=new T.Group();
    const base=new T.Mesh(new T.CylinderGeometry(.18,.2,.04,16),m.metal); base.position.y=.02; g.add(base);
    const pole=new T.Mesh(new T.CylinderGeometry(.015,.015,1.5,8),m.metal); pole.position.y=.78; g.add(pole);
    const shade=new T.Mesh(new T.CylinderGeometry(.18,.24,.3,16,1,true),m.fabric); shade.position.y=1.6; g.add(shade);
    const light=new T.PointLight(0xFFD9A0,.7,4,.9); light.position.y=1.6; g.add(light);
    g.userData={name:'Floor lamp',cat:'Lighting'};
    return g;
  }
  function makePlant(T,m){
    const g=new T.Group();
    const pot=new T.Mesh(new T.CylinderGeometry(.16,.13,.3,14),m.stone); pot.position.y=.15; g.add(pot);
    const leaves=new T.Mesh(new T.SphereGeometry(.34,10,8),m.green); leaves.position.y=.55; leaves.scale.set(1,1.2,1); g.add(leaves);
    const l2=new T.Mesh(new T.SphereGeometry(.24,8,7),m.green); l2.position.set(.12,.7,.1); g.add(l2);
    g.userData={name:'Potted plant',cat:'Decor'};
    return g;
  }
  function makeArt(T,m){
    const g=new T.Group();
    const frame=new T.Mesh(new T.BoxGeometry(.9,1.1,.04),m.gold); g.add(frame);
    const canvas=document.createElement('canvas'); canvas.width=128; canvas.height=160; const cx=canvas.getContext('2d');
    const gr=cx.createLinearGradient(0,0,0,160); gr.addColorStop(0,'#1E3A5F'); gr.addColorStop(1,'#D8A24A'); cx.fillStyle=gr; cx.fillRect(0,0,128,160);
    cx.fillStyle='#F2E0AE'; cx.beginPath(); cx.arc(90,40,16,0,Math.PI*2); cx.fill();
    cx.fillStyle='#2A3B4E'; cx.fillRect(0,110,128,50);
    const tex=new T.CanvasTexture(canvas); tex.colorSpace=T.SRGBColorSpace;
    const pic=new T.Mesh(new T.PlaneGeometry(.8,1.0),new T.MeshStandardMaterial({map:tex,roughness:.7})); pic.position.z=.021; g.add(pic);
    g.userData={name:'Framed artwork',cat:'Decor'};
    return g;
  }
  function makeCeilingLight(T,m){
    const g=new T.Group();
    const plate=new T.Mesh(new T.CylinderGeometry(.28,.28,.05,16),m.metal); plate.position.y=.025; g.add(plate);
    const rod=new T.Mesh(new T.CylinderGeometry(.012,.012,.4,8),m.metal); rod.position.y=.25; g.add(rod);
    const shade=new T.Mesh(new T.ConeGeometry(.22,.28,16,1,true),m.fabric); shade.position.y=.6; g.add(shade);
    const light=new T.PointLight(0xFFF1D0,1.0,7,.8); light.position.y=.7; g.add(light);
    g.userData={name:'Pendant light',cat:'Lighting'};
    return g;
  }
  function makeBathtub(T,m){
    const g=new T.Group();
    const tub=new T.Mesh(new T.BoxGeometry(1.6,.55,.75),m.stone); tub.position.y=.275; tub.castShadow=true; g.add(tub);
    const innie=new T.Mesh(new T.BoxGeometry(1.4,.35,.6),m.white); innie.position.y=.34; g.add(innie);
    g.userData={name:'Soaking bathtub',cat:'Bathroom'};
    return g;
  }
  function makeWoodSlats(T,m,w=2.4,h=2.6){
    const g=new T.Group();
    // fluted oak backing panel
    const back=new T.Mesh(new T.BoxGeometry(w,h,.04),m.oakPanel);
    back.position.set(0,h/2,0); back.receiveShadow=true;
    g.add(back);
    // vertical acoustic slats
    const slatCount=Math.floor(w/.085);
    const slatGeo=new T.BoxGeometry(.038,h,.05);
    for(let i=0;i<slatCount;i++){
      const slat=new T.Mesh(slatGeo,m.oakSlat);
      slat.position.set(-w/2+.04+i*.085,h/2,.035);
      slat.castShadow=true; slat.receiveShadow=true;
      g.add(slat);
    }
    g.userData={name:'Wood slat feature wall',cat:'Decor'};
    return g;
  }
  function makeSlidingDoor(T,m,w=3.0,h=2.4){
    const g=new T.Group();
    // frame
    const frameMat=m.darkwood;
    const top=new T.Mesh(new T.BoxGeometry(w+.2,.08,.08),frameMat); top.position.y=h+.04; g.add(top);
    const bot=new T.Mesh(new T.BoxGeometry(w+.2,.08,.08),frameMat); bot.position.y=.04; g.add(bot);
    const lSide=new T.Mesh(new T.BoxGeometry(.08,h+.16,.08),frameMat); lSide.position.x=-w/2-.04; lSide.position.y=h/2; g.add(lSide);
    const rSide=new T.Mesh(new T.BoxGeometry(.08,h+.16,.08),frameMat); rSide.position.x=w/2+.04; rSide.position.y=h/2; g.add(rSide);
    // glass panels (2 sliding) — high-clarity low-iron glazing
    const glassMat=new T.MeshPhysicalMaterial({color:0xEAF4FA,roughness:.03,metalness:.0,transmission:.92,transparent:true,opacity:.16,ior:1.45,clearcoat:1,envMapIntensity:1.2});
    const p1=new T.Mesh(new T.BoxGeometry(w/2-.04,h,.03),glassMat); p1.position.set(-w/4,h/2,.04); g.add(p1);
    const p2=new T.Mesh(new T.BoxGeometry(w/2-.04,h,.03),glassMat); p2.position.set(w/4,h/2,-.04); g.add(p2);
    // handles
    const hMat=m.blackMatte;
    const h1=new T.Mesh(new T.BoxGeometry(.04,.5,.04),hMat); h1.position.set(.02,h/2,.08); g.add(h1);
    const h2=new T.Mesh(new T.BoxGeometry(.04,.5,.04),hMat); h2.position.set(-.02,h/2,-.08); g.add(h2);
    // sheer curtains gathered to the sides (view stays open)
    const sheer=m.sheer;
    const sc1=new T.Mesh(new T.PlaneGeometry(w*.16,h*.92),sheer); sc1.position.set(-w*.42,h*.46,-.12); g.add(sc1);
    const sc2=new T.Mesh(new T.PlaneGeometry(w*.16,h*.92),sheer); sc2.position.set(w*.42,h*.46,-.12); g.add(sc2);
    // curtain rod
    const rod=new T.Mesh(new T.CylinderGeometry(.02,.02,w+.3,8),m.gold); rod.rotation.z=Math.PI/2; rod.position.y=h+.08; g.add(rod);
    g.userData={name:'Sliding glass door',cat:'Structural'};
    return g;
  }
  function makeFloatingShelf(T,m){
    const g=new T.Group();
    const shelf=new T.Mesh(new T.BoxGeometry(.8,.04,.22),m.darkwood); shelf.position.y=0; shelf.castShadow=true; g.add(shelf);
    const bracket=new T.Mesh(new T.BoxGeometry(.06,.3,.04),m.metal); bracket.position.set(0,-.15,-.1); g.add(bracket);
    // glass cup
    const cup=new T.Mesh(new T.CylinderGeometry(.05,.04,.12,12),m.glass); cup.position.set(-.2,.08,0); g.add(cup);
    // book
    const book=new T.Mesh(new T.BoxGeometry(.06,.1,.08),m.fabric); book.position.set(.1,.07,0); g.add(book);
    // small plant
    const pot=new T.Mesh(new T.CylinderGeometry(.04,.03,.06,8),m.gold); pot.position.set(.25,.05,0); g.add(pot);
    const leaf=new T.Mesh(new T.SphereGeometry(.05,8,6),m.green); leaf.position.set(.25,.1,0); g.add(leaf);
    g.userData={name:'Floating shelf + decor',cat:'Decor'};
    return g;
  }
  function makeSconce(T,m){
    const g=new T.Group();
    const mount=new T.Mesh(new T.CylinderGeometry(.04,.04,.06,8),m.gold); mount.rotation.x=Math.PI/2; mount.position.z=.02; g.add(mount);
    const arm=new T.Mesh(new T.CylinderGeometry(.015,.015,.15,8),m.gold); arm.rotation.x=Math.PI/2; arm.position.set(0,0,.08); g.add(arm);
    const shade=new T.Mesh(new T.SphereGeometry(.07,16,12),new T.MeshStandardMaterial({color:0xFFD9A0,emissive:0xFFB860,emissiveIntensity:1.8,roughness:.3,metalness:.2})); shade.position.set(0,0,.18); g.add(shade);
    const light=new T.PointLight(0xFFB860,.5,2.5,.8); light.position.set(0,0,.2); g.add(light);
    g.userData={name:'Brass wall sconce',cat:'Lighting'};
    return g;
  }

  /* ---------- room assembly ---------- */
  function buildRoom(T,m,type){
    const g=new T.Group(); const d=ROOM_TYPES[type];
    const W=d.w,D=d.d,H=2.7;
    // floor
    const floor=new T.Mesh(new T.BoxGeometry(W,.06,D), type==='onebhk'?m.floor2:m.floor); floor.position.y=-.03; floor.receiveShadow=true; g.add(floor);
    if(m.floor.map){ m.floor.map.repeat.set(Math.max(2,Math.ceil(W/2.5)), Math.max(2,Math.ceil(D/2.5))); m.floor.map.needsUpdate=true; }
    // ceiling — transparent so camera above can see into the room
    const ceil=new T.Mesh(new T.BoxGeometry(W,.06,D),m.ceiling.clone()); ceil.material.transparent=true; ceil.material.opacity=0.12; ceil.position.y=H; g.add(ceil);
    // walls (4 boxes with window/door gaps left as smaller segments)
    const wallH=H-.06;
    const back=new T.Mesh(new T.BoxGeometry(W,wallH,.12),m.wall); back.position.set(0,H/2,-D/2+.06); back.receiveShadow=true; g.add(back);
    const frontL=new T.Mesh(new T.BoxGeometry(W*.36,wallH,.12),m.wall); frontL.position.set(-W*.32,H/2,D/2-.06); g.add(frontL);
    const frontR=new T.Mesh(new T.BoxGeometry(W*.36,wallH,.12),m.wall); frontR.position.set(W*.32,H/2,D/2-.06); g.add(frontR);
    const frontTop=new T.Mesh(new T.BoxGeometry(W*.28,.6,.12),m.wall); frontTop.position.set(0,H-.3,D/2-.06); g.add(frontTop);
    const leftL=new T.Mesh(new T.BoxGeometry(.12,wallH,D*.3),m.wall); leftL.position.set(-W/2+.06,H/2,-D*.35); g.add(leftL);
    const leftR=new T.Mesh(new T.BoxGeometry(.12,wallH,D*.3),m.wall); leftR.position.set(-W/2+.06,H/2,D*.35); g.add(leftR);
    const leftTop=new T.Mesh(new T.BoxGeometry(.12,.6,D*.4),m.wall); leftTop.position.set(-W/2+.06,H-.3,0); g.add(leftTop);
    // window glass on left wall gap (skipped for studio — sliding door fills the opening)
    if(type!=='studio'){ const win=new T.Mesh(new T.BoxGeometry(.1,1.4,D*.4),m.glass); win.position.set(-W/2+.06,1.3,0); g.add(win); }
    // skyline backdrop outside the glazing — sky gradient, city silhouette, tree canopies
    const skCv=document.createElement('canvas'); skCv.width=1024; skCv.height=512;
    const sk=skCv.getContext('2d');
    const sg=sk.createLinearGradient(0,0,0,512);
    sg.addColorStop(0,'#0284C7'); sg.addColorStop(.5,'#7DD3FC'); sg.addColorStop(.72,'#BAE6FD'); sg.addColorStop(1,'#94A3B8');
    sk.fillStyle=sg; sk.fillRect(0,0,1024,512);
    // sun glow
    const sunG=sk.createRadialGradient(760,120,8,760,120,180);
    sunG.addColorStop(0,'rgba(255,250,220,.95)'); sunG.addColorStop(1,'rgba(255,250,220,0)');
    sk.fillStyle=sunG; sk.fillRect(0,0,1024,512);
    // distant city silhouette (seeded by room type so it's stable per view)
    let seed=type.length*7+3; const rnd=()=>{ seed=(seed*16807)%2147483647; return seed/2147483647; };
    sk.fillStyle='rgba(51,65,85,.42)';
    for(let bx=0;bx<1024;bx+=42){ const bw=30+rnd()*34, bh=90+rnd()*170; sk.fillRect(bx,512-60-bh,bw,bh);
      sk.fillStyle='rgba(51,65,85,.55)'; for(let wy=0;wy<bh-20;wy+=26){ for(let wx=4;wx<bw-8;wx+=14){ if(rnd()>.45)sk.fillRect(bx+wx,512-60-bh+10+wy,5,8); } } sk.fillStyle='rgba(51,65,85,.42)'; }
    // mid-tree canopies along the base
    sk.fillStyle='#166534';
    for(let tx=0;tx<1024;tx+=20){ const tr=24+rnd()*30; sk.beginPath(); sk.arc(tx,492+(rnd()-.5)*18,tr,0,Math.PI*2); sk.fill(); }
    sk.fillStyle='#14532D';
    for(let tx=10;tx<1024;tx+=34){ const tr=16+rnd()*22; sk.beginPath(); sk.arc(tx,506+(rnd()-.5)*10,tr,0,Math.PI*2); sk.fill(); }
    const skTex=new T.CanvasTexture(skCv); skTex.colorSpace=T.SRGBColorSpace;
    const skyline=new T.Mesh(new T.PlaneGeometry(12,6),new T.MeshBasicMaterial({map:skTex,fog:false}));
    skyline.position.set(-W/2-2.4,2.2,0); skyline.rotation.y=Math.PI/2; g.add(skyline);
    // curtains
    const cur=(sz)=>{ const c=new T.Mesh(new T.BoxGeometry(.08,2.2,.3),m.fabric); c.position.set(-W/2+.12,1.5,sz*(D*.25+.1)); g.add(c); };
    cur(-1); cur(1);
    // baseboards
    const bbMat=m.darkwood;
    const addBB=(w,l,x,z,ry)=>{ const b=new T.Mesh(new T.BoxGeometry(w,.08,l),bbMat); b.position.set(x,.04,z); b.rotation.y=ry; g.add(b); };
    addBB(W,.04,0,-D/2+.06,0); addBB(W,.04,0,D/2-.06,0); addBB(.04,D,W/2-.06,0,Math.PI/2); addBB(.04,D,-W/2+.06,0,Math.PI/2);

    // ceiling light
    const cl=makeCeilingLight(T,m); cl.position.set(0,H,0); g.add(cl);

    const place=(obj,x,z,ry=0,y=0)=>{ obj.position.set(x,y,z); obj.rotation.y=ry; g.add(obj); return obj; };

    if(type==='studio'){
      // wood slat feature wall behind TV
      place(makeWoodSlats(T,m,2.2,2.5), W*.25, -D/2+.08, 0);
      // bed (queen, white bedding) — sleeping area right
      place(makeBed(T,m,false), -W*.22, -D*.15, 0);
      place(makeNightstand(T,m), -W*.22-.85, -D*.15-.6, 0);
      place(makeNightstand(T,m), -W*.22+.85, -D*.15-.6, 0);
      // brass sconces flanking bed (mounted on the back wall)
      const sc1=makeSconce(T,m); place(sc1, -W*.22-.85, -D/2+.12, 0, 1.6);
      const sc2=makeSconce(T,m); place(sc2, -W*.22+.85, -D/2+.12, 0, 1.6);
      // TV on slat wall
      place(makeTVConsole(T,m,1.8), W*.25, -D/2+.55, 0);
      place(makeTV(T,m,1.5), W*.25, -D/2+.52, 0, 1.1);
      // living area — 3-seat sofa + armchair forming L-shape
      place(makeSofa(T,m,3), W*.15, D*.18, Math.PI);
      place(makeArmchair(T,m), W*.15-1.3, D*.32, -Math.PI/2);
      place(makeCoffeeTable(T,m), W*.15, D*.30, 0);
      place(makeRug(T,m,2.2,1.5), W*.15, D*.24);
      // C-shaped walnut side table by the sofa
      const st=new T.Group();
      const stTop=new T.Mesh(new T.BoxGeometry(.42,.025,.5),m.walnut); stTop.position.y=.6; stTop.castShadow=true; st.add(stTop);
      const stLeg=new T.Mesh(new T.BoxGeometry(.04,.6,.04),m.blackMatte); stLeg.position.set(-.17,.3,0); st.add(stLeg);
      const stBase=new T.Mesh(new T.BoxGeometry(.38,.02,.44),m.blackMatte); stBase.position.y=.01; st.add(stBase);
      const bottle=new T.Mesh(new T.CylinderGeometry(.032,.032,.2,12),new T.MeshPhysicalMaterial({color:0xE0F2FE,transmission:.9,roughness:.05,transparent:true,opacity:.85})); bottle.position.set(.06,.715,.05); st.add(bottle);
      st.userData={name:'Side table',cat:'Living'};
      place(st, W*.15+1.35, D*.18, 0);
      // kitchenette with under-cabinet lighting
      place(makeKitchen(T,m,false), W*.05, D/2-.6, Math.PI);
      place(makeFridge(T,m), W*.42, D/2-.55, Math.PI);
      // under-cabinet LED strip
      const ucl=new T.PointLight(0xFFE6B0,.4,2.5,1.5); ucl.position.set(W*.05,1.0,D/2-.4); g.add(ucl);
      // floating shelves above kitchenette
      const fs1=makeFloatingShelf(T,m); place(fs1, W*.02, D/2-.35, 0, 1.5);
      const fs2=makeFloatingShelf(T,m); place(fs2, W*.22, D/2-.35, 0, 1.5);
      // sliding glass doors replacing the window (on left wall)
      const sd=makeSlidingDoor(T,m,2.4,2.2); sd.position.set(-W/2+.1,1.1,0); sd.rotation.y=Math.PI/2; g.add(sd);
      // work desk near window
      place(makeDesk(T,m), -W*.38, D*.10, Math.PI/2);
      place(makeChair(T,m), -W*.38, D*.02, 0);
      // plant
      place(makePlant(T,m), W*.42, -D*.30, 0);
      place(makeFloorLamp(T,m), -W*.05, D*.05, 0);
      // bathroom
      const bath=makeBathroom(T,m); place(bath, -W*.4, -D*.42, 0);
      const bw1=new T.Mesh(new T.BoxGeometry(1.4,.12,wallH),m.wall); bw1.position.set(-W*.4,1.35,-D*.18); bw1.rotation.y=Math.PI/2; g.add(bw1);
      // art
      const art=makeArt(T,m); place(art, -W*.4, -D/2+.1, 0);
    }
    else if(type==='deluxe'){
      place(makeBed(T,m,true), -W*.24, -D*.12, 0);
      place(makeNightstand(T,m), -W*.24-1.0, -D*.12, 0);
      place(makeNightstand(T,m), -W*.24+1.0, -D*.12, 0);
      place(makeWardrobe(T,m,1.8), W*.32, -D/2+.65, 0);
      place(makeTVConsole(T,m,2.0), -W*.24, -D/2+.55, 0);
      place(makeTV(T,m,1.6), -W*.24, -D/2+.52, 0, 1.0);
      place(makeSofa(T,m,3), W*.22, D*.10, Math.PI);
      place(makeArmchair(T,m), W*.05, D*.32, -Math.PI/2);
      place(makeCoffeeTable(T,m), W*.22, D*.30, 0);
      place(makeDesk(T,m), W*.28, -D*.05, 0);
      place(makeChair(T,m), W*.28, .05, Math.PI);
      place(makeKitchen(T,m,false), W*.05, D/2-.55, Math.PI);
      place(makeFridge(T,m), W*.45, D/2-.55, Math.PI);
      place(makeRug(T,m,2.4,1.6), W*.22, D*.18);
      const bath=makeBathroom(T,m); place(bath, -W*.42, D*.28, 0);
      const bw1=new T.Mesh(new T.BoxGeometry(1.5,.12,wallH),m.wall); bw1.position.set(-W*.42,1.35,D*.08); bw1.rotation.y=Math.PI/2; g.add(bw1);
      place(makePlant(T,m), W*.46, -D*.28, 0);
      place(makeFloorLamp(T,m), W*.5, D*.20, 0);
      place(makeArt(T,m), W*.32, -D/2+.1, 0);
    }
    else if(type==='suite'){
      // bedroom (left half)
      place(makeBed(T,m,true), -W*.26, -D*.10, 0);
      place(makeNightstand(T,m), -W*.26-1.0, -D*.10, 0);
      place(makeNightstand(T,m), -W*.26+1.0, -D*.10, 0);
      place(makeWardrobe(T,m,2.0), -W*.4, D*.30, 0);
      place(makeTVConsole(T,m,1.8), -W*.26, -D/2+.55, 0);
      place(makeTV(T,m,1.5), -W*.26, -D/2+.52, 0, 1.0);
      // living (right half)
      place(makeSofa(T,m,3), W*.26, -D*.05, Math.PI);
      place(makeArmchair(T,m), W*.55, D*.20, -Math.PI/2);
      place(makeArmchair(T,m), W*.55, -D*.28, -Math.PI/2);
      place(makeCoffeeTable(T,m), W*.26, D*.15, 0);
      place(makeTVConsole(T,m,2.0), W*.26, D/2-.55, Math.PI);
      place(makeTV(T,m,1.6), W*.26, D/2-.52, Math.PI, 1.0);
      place(makeDining(T,m,4), W*.0, -D*.32, 0);
      place(makeKitchen(T,m,true), W*.30, D/2-.55, Math.PI);
      place(makeFridge(T,m), W*.62, D/2-.55, Math.PI);
      place(makeRug(T,m,2.6,1.8), W*.26, D*.05);
      place(makeRug(T,m,2.2,1.6), -W*.26, -D*.05);
      const bath=makeBathroom(T,m); place(bath, -W*.45, D*.32, 0);
      place(makeBathtub(T,m), -W*.45, D*.12, 0);
      const bw1=new T.Mesh(new T.BoxGeometry(1.6,.12,wallH),m.wall); bw1.position.set(-W*.45,1.35,D*.22); bw1.rotation.y=Math.PI/2; g.add(bw1);
      place(makePlant(T,m), W*.62, -D*.28, 0);
      place(makeFloorLamp(T,m), W*.66, D*.05, 0);
      place(makeArt(T,m), W*.0, -D/2+.1, 0);
      place(makeArt(T,m), -W*.4, D/2-.1, Math.PI);
    }
    else { // onebhk — bedroom + hall + full kitchen
      // bedroom (left/back)
      place(makeBed(T,m,false), -W*.28, -D*.18, 0);
      place(makeNightstand(T,m), -W*.28-.85, -D*.18, 0);
      place(makeWardrobe(T,m,1.8), -W*.42, D*.18, 0);
      place(makeTV(T,m,1.3), -W*.28, -D/2+.52, 0, 1.0);
      // hall (right)
      place(makeSofa(T,m,3), W*.26, -D*.10, Math.PI);
      place(makeArmchair(T,m), W*.56, D*.14, -Math.PI/2);
      place(makeCoffeeTable(T,m), W*.26, D*.10, 0);
      place(makeTVConsole(T,m,2.0), W*.26, D/2-.55, Math.PI);
      place(makeTV(T,m,1.6), W*.26, D/2-.52, Math.PI, 1.0);
      place(makeDining(T,m,4), W*.0, -D*.34, 0);
      // full kitchen (front wall)
      place(makeKitchen(T,m,true), W*.10, D/2-.55, Math.PI);
      place(makeFridge(T,m), W*.55, D/2-.55, Math.PI);
      place(makeRug(T,m,2.4,1.6), W*.26, D*.02);
      place(makeRug(T,m,2.0,1.4), -W*.28, -D*.08);
      const bath=makeBathroom(T,m); place(bath, -W*.45, D*.30, 0);
      const bw1=new T.Mesh(new T.BoxGeometry(1.6,.12,wallH),m.wall); bw1.position.set(-W*.45,1.35,D*.10); bw1.rotation.y=Math.PI/2; g.add(bw1);
      place(makePlant(T,m), W*.58, -D*.30, 0);
      place(makeFloorLamp(T,m), W*.66, D*.10, 0);
      place(makeArt(T,m), W*.0, -D/2+.1, 0);
    }
    return {g,W,D,H};
  }

  /* ---------- main engine ---------- */
  function create(stage){
    const T=window.THREE;
    const scene=new T.Scene();
    scene.background=null;
    scene.fog=new T.Fog(0xE9EDF2,12,28);
    const cam=new T.PerspectiveCamera(45,stage.clientWidth/stage.clientHeight,.1,100);
    const renderer=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});
    renderer.setSize(stage.clientWidth,stage.clientHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio,2));
    renderer.shadowMap.enabled=true;
    renderer.shadowMap.type=T.PCFSoftShadowMap;
    renderer.toneMapping=T.ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.05;
    renderer.outputColorSpace=T.SRGBColorSpace;
    stage.innerHTML='';stage.appendChild(renderer.domElement);

    const m=makeMats(T);

    // procedural warm interior environment map for realistic reflections
    const pmrem=new T.PMREMGenerator(renderer);
    const envScene=new T.Scene();
    const envGeo=new T.SphereGeometry(50,32,16);
    const envMat=new T.MeshBasicMaterial({side:T.BackSide});
    const envCanvas=document.createElement('canvas');envCanvas.width=512;envCanvas.height=512;
    const ex=envCanvas.getContext('2d');
    const eg=ex.createLinearGradient(0,0,0,512);
    eg.addColorStop(0,'#3A2E22');eg.addColorStop(.4,'#6B5036');eg.addColorStop(.65,'#C9A06A');eg.addColorStop(1,'#F2E2C4');
    ex.fillStyle=eg;ex.fillRect(0,0,512,512);
    // warm light window glow
    const rg=ex.createRadialGradient(380,180,10,380,180,160);rg.addColorStop(0,'rgba(255,240,210,.9)');rg.addColorStop(1,'rgba(255,240,210,0)');
    ex.fillStyle=rg;ex.fillRect(0,0,512,512);
    const envTex=new T.CanvasTexture(envCanvas);envTex.mapping=T.EquirectangularReflectionMapping;
    envMat.map=envTex;
    envScene.add(new T.Mesh(envGeo,envMat));
    const envRT=pmrem.fromScene(envScene,0.04);
    scene.environment=envRT.texture;
    pmrem.dispose();envTex.dispose();envMat.dispose();envGeo.dispose();

    // lighting — warm layered luxury
    const amb=new T.AmbientLight(0xFFF1E0,0.45); scene.add(amb);
    const hemi=new T.HemisphereLight(0xFFF5E0,0x4A3826,0.5); scene.add(hemi);
    const sun=new T.DirectionalLight(0xFFF1D0,2.8);
    sun.position.set(8,12,6); sun.castShadow=true;
    sun.shadow.mapSize.set(2048,2048);
    sun.shadow.camera.near=1; sun.shadow.camera.far=50;
    sun.shadow.camera.left=-15; sun.shadow.camera.right=15; sun.shadow.camera.top=15; sun.shadow.camera.bottom=-15;
    sun.shadow.bias=-.0002; sun.shadow.normalBias=0.02; scene.add(sun);
    const fill=new T.DirectionalLight(0xBCD4FF,.22); fill.position.set(-6,5,-4); scene.add(fill);
    const warm=new T.PointLight(0xFFB866,1.2,16,1.4); warm.position.set(0,2.3,0); scene.add(warm);
    const windowLight=new T.PointLight(0xFFE8C0,0.7,10,1.5); windowLight.position.set(-3,2,0); scene.add(windowLight);
    const warm2=new T.PointLight(0xFFC080,0.5,8,1.5); warm2.position.set(3,1.8,-2); scene.add(warm2);
    // recessed ceiling downlights with luminous trim rings
    const spots=[];
    [[-1.3,-.9],[1.3,-.9],[-1.3,.9],[1.3,.9]].forEach(([sx,sz])=>{
      const sp=new T.SpotLight(0xFFEBC7,.95,7,Math.PI/4.4,.5,1.3);
      sp.position.set(sx,2.56,sz); sp.target.position.set(sx,0,sz);
      scene.add(sp); scene.add(sp.target); spots.push(sp);
      const ring=new T.Mesh(new T.RingGeometry(.055,.1,20),new T.MeshBasicMaterial({color:0xFFF2DC,side:T.DoubleSide}));
      ring.position.set(sx,2.66,sz); ring.rotation.x=Math.PI/2; scene.add(ring);
    });

    const R={stage,scene,cam,renderer,sun,amb,hemi,fill,mats:m,room:null,sel:null,auto:true,camT:{th:0,ph:0.55,tr:10},camC:{th:0,ph:0.55,tr:10},t0:performance.now()};
    R.cam.position.set(6,3.5,7); R.cam.lookAt(0,1.2,0);

    function setRoom(type){
      if(R.room){ R.scene.remove(R.room.g); disposeGroup(R.room.g); }
      R.room=buildRoom(T,m,type);
      R.scene.add(R.room.g);
      R.camT.tr=Math.max(R.room.W,R.room.D)*0.95;
      R.camC.tr=R.camT.tr;
      fitCamera();
      updateInfo();
    }
    function disposeGroup(grp){
      grp.traverse(o=>{ if(o.geometry)o.geometry.dispose(); if(o.material){ (Array.isArray(o.material)?o.material:[o.material]).forEach(mm=>{ if(mm.map)mm.map.dispose(); mm.dispose(); }); } });
    }
    function fitCamera(){
      const d=R.room;
      R.camC.th=Math.PI/5; R.camC.ph=0.55;
      R.camT.th=R.camC.th; R.camT.ph=R.camC.ph;
    }

    const ray=new T.Raycaster(), mv=new T.Vector2();
    function pick(e){
      const rect=renderer.domElement.getBoundingClientRect();
      mv.x=((e.clientX-rect.left)/rect.width)*2-1;
      mv.y=-((e.clientY-rect.top)/rect.height)*2+1;
      ray.setFromCamera(mv,cam);
      const hits=ray.intersectObjects(R.room.g.children,true);
      for(const h of hits){ let o=h.object; while(o){ if(o.userData.name)return o; o=o.parent; } }
      return null;
    }
    function updateInfo(){
      const info=$('#room-info'); if(!info)return;
      const d=ROOM_TYPES[R.curType];
      info.innerHTML=`<div style="display:flex;align-items:center;gap:10px"><span style="width:36px;height:36px;border-radius:10px;display:grid;place-items:center;background:var(--gold-grad-soft);color:var(--gold-deep)">${icon('bed')}</span>
        <div><b style="display:block">${d.name}</b><small style="color:var(--mut)">${d.area} · ${d.bed} bed · ${d.tag}</small></div></div>`;
    }

    // loop
    function tick(){
      R.raf=requestAnimationFrame(tick);
      const t=(performance.now()-R.t0)/1000;
      if(R.auto){ R.camT.th+=.0016; }
      R.camC.th+=(R.camT.th-R.camC.th)*.08;
      R.camC.ph+=(R.camT.ph-R.camC.ph)*.08;
      R.camC.tr+=(R.camT.tr-R.camC.tr)*.08;
      const r=R.camC.tr, ph=R.camC.ph, th=R.camC.th;
      cam.position.set(Math.sin(th)*Math.cos(ph)*r, Math.sin(ph)*r+1.2, Math.cos(th)*Math.cos(ph)*r);
      cam.lookAt(0,1.0,0);
      if(R.sel){ R.sel.children.forEach(c=>{}); }
      renderer.render(scene,cam);
    }
    tick();

    // resize
    R.ro=new ResizeObserver(()=>{ renderer.setSize(stage.clientWidth,stage.clientHeight); cam.aspect=stage.clientWidth/stage.clientHeight; cam.updateProjectionMatrix(); });
    R.ro.observe(stage);

    // pointer
    const cv=renderer.domElement; cv.style.touchAction='none';
    let down=null,drag=false;
    const wake=()=>{ R.auto=false; clearTimeout(R.autoT); R.autoT=setTimeout(()=>{ if(R.room)R.auto=true; },8000); };
    cv.addEventListener('pointerdown',e=>{ down={x:e.clientX,y:e.clientY,th:R.camT.th,ph:R.camT.ph}; drag=false; cv.setPointerCapture(e.pointerId); wake(); });
    cv.addEventListener('pointermove',e=>{ if(down){ const dx=e.clientX-down.x,dy=e.clientY-down.y; if(!drag&&Math.hypot(dx,dy)>5)drag=true; if(drag){ R.camT.th=down.th-dx*.006; R.camT.ph=Math.max(.25,Math.min(1.4,down.ph-dy*.004)); wake(); } } });
    cv.addEventListener('pointerup',e=>{ if(down&&!drag){ const o=pick(e); select(o!==R.sel?o:null); } down=null; drag=false; });
    cv.addEventListener('wheel',e=>{ if(!(e.ctrlKey||e.metaKey))return; e.preventDefault(); R.camT.tr=Math.max(4,Math.min(24,R.camT.tr*(1+e.deltaY*.0012))); wake(); },{passive:false});

    function select(o){
      R.sel=o;
      const panel=$('#room-asset'); if(!panel)return;
      if(!o){ panel.innerHTML=`<div class="hk-rp-empty"><span class="hk-rp-ic">${icon('package')}</span><b>Select an asset</b><small>Click any furniture in the 3D plan to inspect it.</small></div>`; return; }
      const name=o.userData.name, cat=o.userData.cat;
      const inv=INVENTORY.find(i=>i.item.toLowerCase().includes(name.toLowerCase().split(' ')[0]))||INVENTORY[0];
      panel.innerHTML=`
        <div style="padding:4px 0 10px"><div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
          <span style="width:40px;height:40px;border-radius:12px;display:grid;place-items:center;background:var(--gold-grad-soft);color:var(--gold-deep)">${icon('package')}</span>
          <div><b style="display:block">${name}</b><small style="color:var(--mut)">${cat}</small></div></div>
        <div class="divider"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0">
          <div style="background:var(--surface-2);border:1px solid var(--line);border-radius:10px;padding:8px 10px"><small style="color:var(--mut)">SKU</small><b class="num" style="display:block">${inv.sku}</b></div>
          <div style="background:var(--surface-2);border:1px solid var(--line);border-radius:10px;padding:8px 10px"><small style="color:var(--mut)">Condition</small><b style="display:block;color:var(--emerald)">${inv.cond}</b></div>
          <div style="background:var(--surface-2);border:1px solid var(--line);border-radius:10px;padding:8px 10px"><small style="color:var(--mut)">Acquired</small><b style="display:block">${inv.acq}</b></div>
          <div style="background:var(--surface-2);border:1px solid var(--line);border-radius:10px;padding:8px 10px"><small style="color:var(--mut)">Value</small><b style="display:block">${inv.val}</b></div>
        </div>
        <small style="color:var(--mut);line-height:1.5">${inv.note}</small></div>`;
    }

    R.setRoom=setRoom; R.select=select; R.curType='studio';
    return R;
  }

  function boot(type='studio'){
    const stage=$('#room3d-stage'); if(!stage)return;
    destroy();
    stage.classList.add('room3d-loading');
    const start=ok=>{
      if(!ok){ stage.classList.remove('room3d-loading'); stage.innerHTML='<div class="hk-rp-empty" style="padding:40px"><b>WebGL unavailable</b><small>3D floor plans need a WebGL-capable browser.</small></div>'; return; }
      try{
        rt=create(stage);
        rt.curType=type;
        rt.setRoom(type);
        stage.classList.remove('room3d-loading');
      }catch(e){ stage.classList.remove('room3d-loading'); stage.innerHTML='<div class="hk-rp-empty" style="padding:40px"><b>Could not load 3D</b><small>'+(e.message||'').slice(0,80)+'</small></div>'; }
    };
    if(window.THREE){ start(true); return; }
    stage.innerHTML='<div class="hk3d-boot"><span class="hk3d-boot-ring"></span><b>Composing the interior…</b><small>WebGL engine loading</small></div>';
    withThree(start);
  }
  function destroy(){
    if(!rt)return;
    cancelAnimationFrame(rt.raf); clearTimeout(rt.autoT); rt.ro&&rt.ro.disconnect();
    rt.scene.traverse(o=>{ if(o.geometry)o.geometry.dispose(); if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(mm=>{ if(mm.map)mm.map.dispose(); mm.dispose(); }); });
    rt.renderer.dispose(); rt.renderer.domElement.remove(); rt=null;
  }
  function setType(t){ if(rt){ rt.curType=t; rt.setRoom(t); } }
  function setView(azDeg,phDeg){ if(!rt)return; rt.camT.th=azDeg*Math.PI/180; rt.camT.ph=Math.max(.12,Math.min(1.55,phDeg*Math.PI/180)); rt.auto=false; clearTimeout(rt.autoT); rt.autoT=setTimeout(()=>{ if(rt)rt.auto=true; },8000); }

  const api={boot,destroy,setType,setView};
  window.ROOM3D=api;
  return api;
})();

/* Room inventory — every bookable room with type, status & assigned assets */
const ROOMS=[
  {n:101,type:'studio',status:'clean',guest:'—'},
  {n:102,type:'deluxe',status:'occupied',guest:'Mr. Sharma'},
  {n:103,type:'suite',status:'clean',guest:'—'},
  {n:104,type:'onebhk',status:'dirty',guest:'—'},
  {n:201,type:'deluxe',status:'occupied',guest:'Ms. Chen'},
  {n:202,type:'studio',status:'clean',guest:'—'},
  {n:203,type:'suite',status:'maintenance',guest:'—'},
  {n:204,type:'deluxe',status:'occupied',guest:'Dr. Patel'},
  {n:301,type:'suite',status:'clean',guest:'—'},
  {n:302,type:'onebhk',status:'occupied',guest:'Mr. Khan'},
  {n:303,type:'deluxe',status:'clean',guest:'—'},
  {n:304,type:'studio',status:'dirty',guest:'—'},
];
const ROOM_STATUS={clean:['Clean & ready','tag-green'],occupied:['Occupied','tag-blue'],dirty:['Dirty · pending','tag-amber'],maintenance:['Maintenance','tag-red']};
const ROOM_TYPE_META={studio:['Studio','28 m² · queen'],deluxe:['Deluxe','42 m² · king'],suite:['Suite','68 m² · king'],onebhk:['1 BHK','58 m² · queen']};

/* Inventory master data (shared by 3D asset inspector + Inventory view) */
const INVENTORY=[
  {cat:'Bedroom',item:'King bed',sku:'BD-KG-200',qty:42,cond:'Excellent',acq:'Mar 2024',val:'$2,400',note:'Solid oak frame, premium pocket-spring mattress.'},
  {cat:'Bedroom',item:'Queen bed',sku:'BD-QN-160',qty:58,cond:'Excellent',acq:'Mar 2024',val:'$1,800',note:'Solid oak frame, premium pocket-spring mattress.'},
  {cat:'Bedroom',item:'Nightstand + lamp',sku:'NS-LP-01',qty:180,cond:'Good',acq:'Mar 2024',val:'$420',note:'Walnut veneer, dimmable LED lamp.'},
  {cat:'Bedroom',item:'Wardrobe',sku:'WR-WD-160',qty:100,cond:'Excellent',acq:'Feb 2024',val:'$1,650',val2:'',note:'2-door walnut with soft-close hinges.'},
  {cat:'Living',item:'3-seat sofa',sku:'SF-3S-01',qty:64,cond:'Good',acq:'Feb 2024',val:'$3,200',note:'Performance bouclé fabric, solid wood legs.'},
  {cat:'Living',item:'Leather armchair',sku:'AC-LT-01',qty:82,cond:'Excellent',acq:'Feb 2024',val:'$1,400',note:'Full-grain leather, swivel base.'},
  {cat:'Living',item:'Coffee table',sku:'CT-WD-01',qty:100,cond:'Excellent',acq:'Feb 2024',val:'$680',note:'Walnut top, brushed brass legs.'},
  {cat:'Living',item:'Work desk',sku:'DK-WD-130',qty:120,cond:'Good',acq:'Jan 2024',val:'$540',note:'Walnut top with metal trestle legs.'},
  {cat:'Living',item:'Desk chair',sku:'CH-MT-01',qty:120,cond:'Good',acq:'Jan 2024',val:'$380',note:'Ergonomic mesh, gas-lift height.'},
  {cat:'Living',item:'TV console',sku:'TVC-WD-200',qty:100,cond:'Excellent',acq:'Jan 2024',val:'$920',note:'Walnut, 2 soft-close drawers.'},
  {cat:'Dining',item:'Dining table',sku:'DT-WD-4',qty:86,cond:'Excellent',acq:'Mar 2024',val:'$1,100',note:'Solid walnut, seats 4.'},
  {cat:'Dining',item:'Dining chair',sku:'DC-FB-01',qty:344,cond:'Good',acq:'Mar 2024',val:'$220',note:'Upholstered, metal legs.'},
  {cat:'Electronics',item:'Smart TV 55"',sku:'TV-SM-55',qty:200,cond:'Excellent',acq:'Apr 2024',val:'$680',note:'4K UHD, smart OS, hotel mode.'},
  {cat:'Electronics',item:'Microwave',sku:'MW-28L',qty:100,cond:'Good',acq:'Apr 2024',val:'$180',note:'28L, inverter, hotel-safe.'},
  {cat:'Kitchen',item:'Refrigerator',sku:'FR-SS-320',qty:100,cond:'Excellent',acq:'Mar 2024',val:'$980',note:'Stainless, 320L, frost-free.'},
  {cat:'Kitchen',item:'Induction cooktop',sku:'ST-IN-4',qty:100,cond:'Excellent',acq:'Mar 2024',val:'$560',note:'4 zones, touch control.'},
  {cat:'Kitchen',item:'Oven',sku:'OV-BL-60',qty:100,cond:'Excellent',acq:'Mar 2024',val:'$720',note:'Built-in, 60cm, pyrolytic.'},
  {cat:'Kitchen',item:'Kitchenette counter',sku:'KT-CT-200',qty:100,cond:'Excellent',acq:'Feb 2024',val:'$1,850',note:'Stone top, walnut base, sink + tap.'},
  {cat:'Bathroom',item:'Bathroom suite',sku:'BR-WH-01',qty:100,cond:'Excellent',acq:'Jan 2024',val:'$2,200',note:'Vanity, basin, toilet, glass shower.'},
  {cat:'Bathroom',item:'Soaking bathtub',sku:'BT-ST-160',qty:24,cond:'Excellent',acq:'Jan 2024',val:'$1,600',note:'Stone resin, 160cm, suites only.'},
  {cat:'Lighting',item:'Pendant light',sku:'LT-PD-01',qty:200,cond:'Good',acq:'Feb 2024',val:'$180',note:'Fabric shade, warm LED.'},
  {cat:'Lighting',item:'Floor lamp',sku:'LT-FL-01',qty:100,cond:'Good',acq:'Feb 2024',val:'$260',note:'Brushed brass, dimmable.'},
  {cat:'Decor',item:'Area rug',sku:'RG-WV-220',qty:120,cond:'Good',acq:'Mar 2024',val:'$480',note:'Hand-woven wool blend.'},
  {cat:'Decor',item:'Potted plant',sku:'PL-GR-01',qty:200,cond:'Good',acq:'ongoing',val:'$90',note:'Live, horticulture rotation.'},
  {cat:'Decor',item:'Framed artwork',sku:'ART-FR-01',qty:160,cond:'Excellent',acq:'Apr 2024',val:'$320',note:'Gold leaf frame, giclée print.'},
  {cat:'Storage',item:'Mini bar',sku:'MB-GL-01',qty:100,cond:'Good',acq:'Mar 2024',val:'$540',note:'Glass door, silent compressor.'},
];



/* ============================================================
/* ============================================================
   FAC3D — Facility management · 3D resort map with live staff allocation
   ============================================================ */
const FAC3D=(()=>{
  let rt=null,loading=false,timer=0,q=[];
  function withThree(done){
    if(window.THREE){done(true);return;}
    q.push(done);if(loading)return;loading=true;
    const s=document.createElement('script');
    s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/0.158.0/three.min.js';s.async=true;
    const fin=ok=>{loading=false;clearTimeout(timer);const qq=q.splice(0);qq.forEach(f=>f(ok));};
    s.onload=()=>fin(true);s.onerror=()=>fin(false);
    (document.head||document.documentElement).appendChild(s);
    timer=setTimeout(()=>fin(false),12000);
  }

  const FACILITIES=[
    {id:'lobby',name:'Main lobby',type:'Reception',cap:80,occ:28,staff:5,status:'open',pos:[0,0,0],sz:[5,3],color:0x8A7E6E,roles:[['Reception',3],['Concierge',1],['Bell',1]]},
    {id:'pool',name:'Swimming pool',type:'Recreation',cap:120,occ:74,staff:6,status:'open',pos:[-9,0,-6],sz:[6,4],color:0x2E86AB,roles:[['Lifeguard',2],['Pool attendant',3],['Bartender',1]]},
    {id:'board',name:'Board rooms',type:'Meetings',cap:40,occ:18,staff:3,status:'open',pos:[0,0,-10],sz:[5,3],color:0x6B7280,roles:[['AV tech',1],['F&B service',2]]},
    {id:'kids',name:'Kids play area',type:'Recreation',cap:30,occ:12,staff:4,status:'open',pos:[9,0,-6],sz:[4.5,4],color:0xE0A83B,roles:[['Childcare',3],['First-aid',1]]},
    {id:'parking',name:'Car parking',type:'Infrastructure',cap:200,occ:142,staff:2,status:'open',pos:[13,0,4],sz:[5,6],color:0x4A5568,roles:[['Valet',1],['Security',1]]},
    {id:'spa',name:'Spa & wellness',type:'Wellness',cap:24,occ:16,staff:8,status:'open',pos:[-13,0,4],sz:[5,4],color:0x9B7BBF,roles:[['Therapist',5],['Reception',1],['Laundry',2]]},
    {id:'restaurant',name:'Restaurant',type:'Dining',cap:120,occ:64,staff:14,status:'open',pos:[-9,0,10],sz:[6,4],color:0xB8864A,roles:[['Chef',3],['Waiter',7],['Host',1],['Bartender',2],['Runner',1]]},
    {id:'gym',name:'Fitness center',type:'Wellness',cap:40,occ:22,staff:3,status:'open',pos:[9,0,10],sz:[4.5,3.5],color:0x5A8F6A,roles:[['Trainer',2],['Cleaner',1]]},
  ];

  /* realistic humanoid staff figure with walk cycle */
  function makeStaff(T,color){
    const g=new T.Group();
    const uniform=new T.MeshStandardMaterial({color,roughness:.72,metalness:.05});
    const skin=new T.MeshStandardMaterial({color:0xE0B48A,roughness:.65});
    const hair=new T.MeshStandardMaterial({color:0x2A1F14,roughness:.8});
    const legGeo=new T.CapsuleGeometry(.07,.24,4,10);
    const mkLeg=side=>{const p=new T.Group();p.position.set(side*.08,.3,0);const m=new T.Mesh(legGeo,uniform);m.position.y=-.13;m.castShadow=true;p.add(m);g.add(p);return p;};
    const legL=mkLeg(-1),legR=mkLeg(1);
    // torso (vest)
    const torso=new T.Mesh(new T.CapsuleGeometry(.15,.28,4,10),uniform);torso.position.y=.64;torso.castShadow=true;g.add(torso);
    // shirt collar detail
    const collar=new T.Mesh(new T.BoxGeometry(.18,.04,.1),skin);collar.position.set(0,.8,0);g.add(collar);
    // neck
    const neck=new T.Mesh(new T.CylinderGeometry(.05,.06,.08,8),skin);neck.position.y=.86;g.add(neck);
    // head
    const head=new T.Mesh(new T.SphereGeometry(.12,16,14),skin);head.position.y=1.0;head.scale.set(1,1.05,.95);head.castShadow=true;g.add(head);
    // hair
    const hairMesh=new T.Mesh(new T.SphereGeometry(.13,14,10,0,Math.PI*2,0,Math.PI*.55),hair);hairMesh.position.y=1.02;g.add(hairMesh);
    // arms
    const armGeo=new T.CapsuleGeometry(.05,.2,4,8);
    const mkArm=side=>{const p=new T.Group();p.position.set(side*.19,.64,0);const m=new T.Mesh(armGeo,uniform);m.position.y=-.13;m.castShadow=true;p.add(m);
      const hand=new T.Mesh(new T.SphereGeometry(.055,10,8),skin);hand.position.y=-.26;p.add(hand);g.add(p);return p;};
    const armL=mkArm(-1),armR=mkArm(1);
    g.userData={legL,legR,armL,armR,phase:Math.random()*Math.PI*2};
    return g;
  }

  /* facility prop builders */
  function buildPool(T,m){
    const g=new T.Group();
    const deck=new T.Mesh(new T.BoxGeometry(5.6,.14,3.6),m.stone);deck.position.y=.07;deck.receiveShadow=true;deck.castShadow=true;g.add(deck);
    const poolBasin=new T.Mesh(new T.BoxGeometry(4.6,.35,2.6),new T.MeshStandardMaterial({color:0x1B5F82,roughness:.3}));poolBasin.position.y=.06;g.add(poolBasin);
    const water=new T.Mesh(new T.PlaneGeometry(4.5,2.5),m.water);water.rotation.x=-Math.PI/2;water.position.y=.22;water.receiveShadow=true;g.add(water);
    // tiled edge
    const edgeMat=new T.MeshStandardMaterial({color:0xE8E2D4,roughness:.5});
    const tile=(x,z,w,d)=>{const t=new T.Mesh(new T.BoxGeometry(w,.06,d),edgeMat);t.position.set(x,.14,z);t.receiveShadow=true;g.add(t);};
    for(let i=-1;i<=1;i++){const l=new T.Mesh(new T.BoxGeometry(.55,.08,1.9),m.white);l.position.set(-1.4+i*1.4,.18,-1.0);l.castShadow=true;g.add(l);
      const c=new T.Mesh(new T.CylinderGeometry(.28,.32,.5,14),m.fabric);c.position.set(-1.4+i*1.4,.43,-1.0);c.castShadow=true;g.add(c);}
    const bar=new T.Mesh(new T.BoxGeometry(.4,.7,1.6),m.stone);bar.position.set(2.1,.35,-.6);bar.castShadow=true;g.add(bar);
    const barTop=new T.Mesh(new T.BoxGeometry(.5,.06,1.7),m.stone);barTop.position.set(2.1,.7,-.6);g.add(barTop);
    const stool=new T.Mesh(new T.CylinderGeometry(.16,.18,.5,14),m.metal);stool.position.set(1.8,.25,-.6);stool.castShadow=true;g.add(stool);
    // tensile shade canopy
    const canopyMat=new T.MeshStandardMaterial({color:0xF4F1EB,roughness:.6,side:T.DoubleSide});
    for(let i=-1;i<=1;i++){const pole=new T.Mesh(new T.CylinderGeometry(.03,.03,2.4,8),m.metal);pole.position.set(i*1.8,1.2,1.3);pole.castShadow=true;g.add(pole);}
    const canopy=new T.Mesh(new T.PlaneGeometry(5.2,3.0),canopyMat);canopy.rotation.x=-Math.PI/2;canopy.position.y=2.3,0;canopy.rotation.z=.04;g.add(canopy);
    return g;
  }
  function buildBoardroom(T,m){
    const g=new T.Group();
    const base=new T.Mesh(new T.BoxGeometry(4.6,.1,2.8),m.stone);base.position.y=.05;g.add(base);
    const wall=(w,x,z,ry)=>{const wa=new T.Mesh(new T.BoxGeometry(w,1.4,.08),m.wall);wa.position.set(x,.7,z);wa.rotation.y=ry;g.add(wa);};
    wall(4.6,0,-1.4,0);wall(4.6,0,1.4,0);wall(2.8,-2.3,0,Math.PI/2);wall(2.8,2.3,0,Math.PI/2);
    const table=new T.Mesh(new T.BoxGeometry(2.4,.08,1.0),m.darkwood);table.position.y=.55;g.add(table);
    for(let i=0;i<6;i++){const c=new T.Group();const s=new T.Mesh(new T.BoxGeometry(.4,.05,.4),m.fabric);s.position.y=.42;c.add(s);const b=new T.Mesh(new T.BoxGeometry(.4,.4,.05),m.fabric);b.position.set(0,.62,-.17);c.add(b);
      const side=i%2,idx=Math.floor(i/2);c.position.set(side===0?(-.9+idx*.9):(-.9+idx*.9),.2,side===0?-.7:.7);c.rotation.y=side?Math.PI:0;g.add(c);}
    const screen=new T.Mesh(new T.PlaneGeometry(1.6,.9),new T.MeshStandardMaterial({color:0x101820,emissive:0x1A2A3A,emissiveIntensity:.4}));screen.position.set(0,1.1,-1.35);g.add(screen);
    return g;
  }
  function buildKids(T,m){
    const g=new T.Group();
    const base=new T.Mesh(new T.BoxGeometry(4,.08,3.4),new T.MeshStandardMaterial({color:0xE8C54A,roughness:.8}));base.position.y=.04;base.receiveShadow=true;g.add(base);
    const slide=new T.Mesh(new T.BoxGeometry(2.4,.15,.3),new T.MeshStandardMaterial({color:0xE0615A,roughness:.7}));slide.position.set(.6,.5,-1.0);slide.rotation.z=-.35;g.add(slide);
    const tower=new T.Mesh(new T.BoxGeometry(.8,1.4,.8),new T.MeshStandardMaterial({color:0x5BAA6E,roughness:.7}));tower.position.set(-.6,.7,-1.0);g.add(tower);
    for(let i=0;i<4;i++){const b=new T.Mesh(new T.SphereGeometry(.22,10,10),new T.MeshStandardMaterial({color:[0xE0615A,0x5BAA6E,0x3A8FB7,0xE0A83B][i],roughness:.7}));b.position.set(-1.4+i*.9,.22,.8);g.add(b);}
    const net=new T.Mesh(new T.CylinderGeometry(.6,.6,.9,8),new T.MeshStandardMaterial({color:0xC9A85A,roughness:.8}));net.position.set(1.4,.45,.6);g.add(net);
    return g;
  }
  function buildParking(T,m){
    const g=new T.Group();
    const lot=new T.Mesh(new T.BoxGeometry(4.6,.06,5.6),new T.MeshStandardMaterial({color:0x3A3F47,roughness:.9}));lot.position.y=.03;g.add(lot);
    for(let r=0;r<7;r++)for(let c=0;c<3;c++){const line=new T.Mesh(new T.BoxGeometry(.04,.01,2.2),new T.MeshStandardMaterial({color:0xF2E0AE,roughness:.6}));line.position.set(-1.4+c*1.4,.04,-2.2+r*.7);g.add(line);}
    const colors=[0xFFFFFF,0x1A1A1A,0xC9A85A,0x3A5A85,0x96414F,0x5A8F6A];
    const glass=new T.MeshPhysicalMaterial({color:0x1A2230,roughness:.05,metalness:.3,transparent:true,opacity:.55,envMapIntensity:1.2});
    for(let i=0;i<14;i++){const car=new T.Group();const col=colors[i%colors.length];const bodyMat=new T.MeshStandardMaterial({color:col,roughness:.32,metalness:.6,envMapIntensity:1.0});
      const body=new T.Mesh(new T.BoxGeometry(.92,.38,1.8),bodyMat);body.position.y=.26;body.castShadow=true;car.add(body);
      // chassis lower
      const lower=new T.Mesh(new T.BoxGeometry(.96,.16,1.84),new T.MeshStandardMaterial({color:0x2A2A2A,roughness:.6,metalness:.3}));lower.position.y=.14;car.add(lower);
      // cabin
      const top=new T.Mesh(new T.BoxGeometry(.78,.32,1.0),bodyMat);top.position.set(0,.58,-.08);top.castShadow=true;car.add(top);
      // windshield + windows
      const ws=new T.Mesh(new T.BoxGeometry(.72,.28,.04),glass);ws.position.set(0,.58,.38);ws.rotation.x=-.4;car.add(ws);
      const rw=new T.Mesh(new T.BoxGeometry(.72,.26,.04),glass);rw.position.set(0,.58,-.58);rw.rotation.x=.4;car.add(rw);
      const sw=(z)=>{const w=new T.Mesh(new T.BoxGeometry(.03,.24,.7),glass);w.position.set(.4,.58,z);car.add(w);const w2=w.clone();w2.position.x=-.4;car.add(w2);};sw(-.08);
      // wheels
      for(const wx of[-.42,.42])for(const wz of[-.68,.68]){const w=new T.Mesh(new T.CylinderGeometry(.14,.14,.12,14),m.black);w.position.set(wx,.1,wz);w.rotation.x=Math.PI/2;car.add(w);
        const rim=new T.Mesh(new T.CylinderGeometry(.06,.06,.13,10),m.metal);rim.position.set(wx,.1,wz);rim.rotation.x=Math.PI/2;car.add(rim);}
      const r=Math.floor(i/3),c=i%3;car.position.set(-1.4+c*1.4,.08,-2.2+r*.7);car.rotation.y=(c%2?0:0);g.add(car);}
    return g;
  }
  function buildSpa(T,m){
    const g=new T.Group();
    const base=new T.Mesh(new T.BoxGeometry(4.6,.1,3.4),m.stone);base.position.y=.05;g.add(base);
    for(let i=0;i<4;i++){const tb=new T.Mesh(new T.BoxGeometry(.9,.12,1.8),m.white);tb.position.set(-1.3+i*1.3,.18,0);g.add(tb);
      const head=new T.Mesh(new T.CylinderGeometry(.12,.12,.1,10),m.white);head.position.set(-1.3+i*1.3,.28,.7);g.add(head);}
    const steam=new T.Mesh(new T.CylinderGeometry(.5,.6,1.2,14),new T.MeshStandardMaterial({color:0xA78FC0,roughness:.4,transparent:true,opacity:.7}));steam.position.set(1.6,.6,-.8);g.add(steam);
    const candle=(x,z)=>{const c=new T.Mesh(new T.CylinderGeometry(.04,.05,.14,8),new T.MeshStandardMaterial({color:0xF2E0AE,emissive:0xFFC870,emissiveIntensity:.6}));c.position.set(x,.14,z);g.add(c);};
    candle(-1.3,-.6);candle(1.3,.6);
    return g;
  }
  function buildRestaurant(T,m){
    const g=new T.Group();
    const floor=new T.Mesh(new T.BoxGeometry(5.6,.1,3.6),m.stone);floor.position.y=.05;g.add(floor);
    for(let i=0;i<8;i++){const t=new T.Mesh(new T.BoxGeometry(1.0,.06,1.0),m.darkwood);t.position.y=.55;const side=i%2,idx=Math.floor(i/2);t.position.set(-1.7+idx*1.5,.55,side?-.9:.9);g.add(t);
      for(let c=0;c<4;c++){const ch=new T.Group();const s=new T.Mesh(new T.BoxGeometry(.3,.04,.3),m.fabric);s.position.y=.42;ch.add(s);const b=new T.Mesh(new T.BoxGeometry(.3,.35,.04),m.fabric);b.position.set(0,.6,-.13);ch.add(b);
        const cs=c%2,ci=Math.floor(c/2);ch.position.set((-1.7+idx*1.5)+(cs?.22:-.22),.2,(side?-.9:.9)+(ci?.22:-.22));ch.rotation.y=ci?Math.PI:0;g.add(ch);}}
    const bar=new T.Mesh(new T.BoxGeometry(.5,.9,2.4),m.darkwood);bar.position.set(2.5,.45,0);g.add(bar);
    for(let i=0;i<3;i++){const stool=new T.Mesh(new T.CylinderGeometry(.16,.16,.45,12),m.metal);stool.position.set(2.5,.22,-.7+i*.7);g.add(stool);}
    return g;
  }
  function buildGym(T,m){
    const g=new T.Group();
    const base=new T.Mesh(new T.BoxGeometry(4,.08,3),m.stone);base.position.y=.04;g.add(base);
    for(let i=0;i<3;i++){const tr=new T.Mesh(new T.BoxGeometry(1.6,.1,.4),m.black);tr.position.set(-1.2+i*1.2,.18,.8);g.add(tr);
      const handle=new T.Mesh(new T.BoxGeometry(.04,.5,.04),m.metal);handle.position.set(-1.2+i*1.2,.4,.6);g.add(handle);}
    for(let i=0;i<4;i++){const w=new T.Mesh(new T.CylinderGeometry(.3,.3,.08,14),m.metal);w.position.set(-.6+i*.5,.22,-.7);w.rotation.x=Math.PI/2;g.add(w);}
    const bike=new T.Mesh(new T.BoxGeometry(.6,.8,.2),m.metal);bike.position.set(1.2,.4,-.6);g.add(bike);
    return g;
  }
  function buildLobby(T,m){
    const g=new T.Group();
    const floor=new T.Mesh(new T.BoxGeometry(4.6,.1,2.8),m.stone);floor.position.y=.05;g.add(floor);
    const desk=new T.Mesh(new T.BoxGeometry(2.2,.5,.6),m.darkwood);desk.position.set(0,.25,-.6);g.add(desk);
    const deskTop=new T.Mesh(new T.BoxGeometry(2.4,.06,.7),m.stone);deskTop.position.set(0,.53,-.6);g.add(deskTop);
    for(let i=0;i<2;i++){const c=new T.Group();const s=new T.Mesh(new T.BoxGeometry(.42,.05,.42),m.fabric);s.position.y=.42;c.add(s);const b=new T.Mesh(new T.BoxGeometry(.42,.5,.05),m.fabric);b.position.set(0,.68,-.18);c.add(s);c.position.set(-.9+i*1.8,.2,.6);g.add(c);}
    const plant=makePlant(T,m);plant.position.set(-1.9,0,.8);g.add(plant);
    const plant2=makePlant(T,m);plant2.position.set(1.9,0,.8);g.add(plant2);
    return g;
  }
  function makePlant(T,m){
    const g=new T.Group();
    const pot=new T.Mesh(new T.CylinderGeometry(.16,.13,.28,14),m.stone);pot.position.y=.14;g.add(pot);
    const leaves=new T.Mesh(new T.SphereGeometry(.3,10,8),m.green);leaves.position.y=.5;leaves.scale.set(1,1.2,1);g.add(leaves);
    return g;
  }

  const BUILDERS={pool:buildPool,board:buildBoardroom,kids:buildKids,parking:buildParking,spa:buildSpa,restaurant:buildRestaurant,gym:buildGym,lobby:buildLobby};

  function makeMats(T){
    const wood=woodTex(T), wall=wallTex(T), grass=grassTex(T);
    return {
      ground:new T.MeshStandardMaterial({map:grass,roughness:.95}),
      path:new T.MeshStandardMaterial({color:0xBFAE8E,roughness:.9}),
      stone:new T.MeshStandardMaterial({color:0xD9D2C4,roughness:.8}),
      wall:new T.MeshStandardMaterial({map:wall,color:0xEDE7DC,roughness:.92}),
      wood:new T.MeshStandardMaterial({map:wood,roughness:.5,metalness:.05}),
      darkwood:new T.MeshStandardMaterial({color:0x3B2A1E,roughness:.45,metalness:.1}),
      fabric:new T.MeshStandardMaterial({color:0xC9BFAE,roughness:.92}),
      metal:new T.MeshStandardMaterial({color:0xC9CCD1,roughness:.22,metalness:.92,envMapIntensity:1.1}),
      white:new T.MeshStandardMaterial({color:0xF4F1EB,roughness:.85}),
      black:new T.MeshStandardMaterial({color:0x1A1A1A,roughness:.4,metalness:.3}),
      gold:new T.MeshStandardMaterial({color:0xC9A85A,roughness:.24,metalness:.9,envMapIntensity:1.2}),
      green:new T.MeshStandardMaterial({color:0x4A6B4A,roughness:.8}),
      water:new T.MeshPhysicalMaterial({color:0x2A6B8E,roughness:.08,metalness:.0,transmission:.3,transparent:true,opacity:.82,ior:1.33,clearcoat:1,clearcoatRoughness:.05,envMapIntensity:1.3}),
    };
  }
  function grassTex(T){const c=document.createElement('canvas');c.width=c.height=512;const x=c.getContext('2d');const g=x.createLinearGradient(0,0,0,512);g.addColorStop(0,'#6B9A52');g.addColorStop(1,'#5A8245');x.fillStyle=g;x.fillRect(0,0,512,512);for(let i=0;i<6000;i++){const sh=40+Math.random()*40;x.fillStyle=`rgba(${30+Math.random()*30},${60+Math.random()*40},${20+Math.random()*20},${.2+Math.random()*.3})`;x.fillRect(Math.random()*512,Math.random()*512,1,1+Math.random()*2);}for(let i=0;i<200;i++){x.strokeStyle=`rgba(${80+Math.random()*40},${120+Math.random()*40},${50+Math.random()*30},.25)`;x.lineWidth=1;x.beginPath();x.moveTo(Math.random()*512,Math.random()*512);x.lineTo(Math.random()*512,Math.random()*512);x.stroke();}const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(12,10);t.anisotropy=8;return t;}
  function woodTex(T){const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');const g=x.createLinearGradient(0,0,0,256);g.addColorStop(0,'#6B4A2B');g.addColorStop(1,'#5E3F24');x.fillStyle=g;x.fillRect(0,0,256,256);for(let i=0;i<30;i++){x.strokeStyle='rgba(40,25,12,.15)';x.lineWidth=1+Math.random()*2;x.beginPath();x.moveTo(0,i*8);x.lineTo(256,i*8+4);x.stroke();}const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(2,2);return t;}
  function wallTex(T){const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d');x.fillStyle='#EDE7DC';x.fillRect(0,0,128,128);for(let i=0;i<400;i++){x.fillStyle=`rgba(120,100,70,${Math.random()*.05})`;x.fillRect(Math.random()*128,Math.random()*128,1,1);}const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(2,2);return t;}

  function makeLabel(T,text,color){
    const c=document.createElement('canvas');c.width=256;c.height=64;const x=c.getContext('2d');
    x.fillStyle='rgba(10,16,28,.78)';x.beginPath();x.roundRect(4,4,248,56,10);x.fill();
    x.fillStyle='#F2E0AE';x.font='bold 22px Inter, sans-serif';x.textAlign='center';x.fillText(text,128,34);
    const t=new T.CanvasTexture(c);const m=new T.SpriteMaterial({map:t,transparent:true,depthTest:false});
    const s=new T.Sprite(m);s.scale.set(2.4,.6,1);return s;
  }

  function create(stage){
    const T=window.THREE;
    const scene=new T.Scene();scene.fog=new T.Fog(0xBFD4EA,28,72);
    const cam=new T.PerspectiveCamera(45,stage.clientWidth/stage.clientHeight,.1,300);
    const renderer=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});
    renderer.setSize(stage.clientWidth,stage.clientHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,2));
    renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
    renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;
    renderer.outputColorSpace=T.SRGBColorSpace;stage.appendChild(renderer.domElement);

    const m=makeMats(T);

    // procedural sky environment map for realistic reflections on water, metal, glass
    const pmrem=new T.PMREMGenerator(renderer);
    const envScene=new T.Scene();
    const envGeo=new T.SphereGeometry(60,32,16);
    const envMat=new T.MeshBasicMaterial({side:T.BackSide});
    const ec=document.createElement('canvas');ec.width=512;ec.height=512;const ex=ec.getContext('2d');
    const eg=ex.createLinearGradient(0,0,0,512);eg.addColorStop(0,'#8DB8E0');eg.addColorStop(.45,'#C8DDF0');eg.addColorStop(.55,'#E8DCC0');eg.addColorStop(1,'#6B8A5A');ex.fillStyle=eg;ex.fillRect(0,0,512,512);
    const sunG=ex.createRadialGradient(380,160,8,380,160,180);sunG.addColorStop(0,'rgba(255,245,220,.95)');sunG.addColorStop(1,'rgba(255,245,220,0)');ex.fillStyle=sunG;ex.fillRect(0,0,512,512);
    const envTex=new T.CanvasTexture(ec);envTex.mapping=T.EquirectangularReflectionMapping;envMat.map=envTex;
    envScene.add(new T.Mesh(envGeo,envMat));
    const envRT=pmrem.fromScene(envScene,.04);scene.environment=envRT.texture;
    pmrem.dispose();envTex.dispose();envMat.dispose();envGeo.dispose();

    scene.add(new T.AmbientLight(0xFFFFFF,.32));
    scene.add(new T.HemisphereLight(0xFFF5E0,0x6B7A50,.42));
    const sun=new T.DirectionalLight(0xFFE9C4,1.25);sun.position.set(16,26,12);sun.castShadow=true;
    sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-34;sun.shadow.camera.right=34;sun.shadow.camera.top=34;sun.shadow.camera.bottom=-34;sun.shadow.camera.near=1;sun.shadow.camera.far=80;sun.shadow.bias=-.0003;sun.shadow.normalBias=.02;scene.add(sun);
    const fill=new T.DirectionalLight(0xBCD4FF,.18);fill.position.set(-12,14,-8);scene.add(fill);

    const R={stage,scene,cam,renderer,sun,mats:m,facs:[],staff:[],sel:null,auto:true,camT:{th:.6,ph:.7,tr:32},camC:{th:.6,ph:.7,tr:32},t0:performance.now()};
    cam.position.set(0,14,24);cam.lookAt(0,0,0);

    // ground with grass texture
    const ground=new T.Mesh(new T.BoxGeometry(46,.2,36),m.ground);ground.position.y=-.1;ground.receiveShadow=true;scene.add(ground);
    // paths
    const pathMat=m.path;
    scene.add(box(T,pathMat,44,.02,2,0,.01,0));
    scene.add(box(T,pathMat,2,.02,34,0,.01,0));
    for(const f of FACILITIES){
      const grp=new T.Group();grp.position.set(f.pos[0],0,f.pos[2]);
      grp.userData={fac:f};
      const slab=new T.Mesh(new T.BoxGeometry(f.sz[0]+.6,.08,f.sz[1]+.6),new T.MeshStandardMaterial({color:0xE8E2D4,roughness:.85}));
      slab.position.y=.04;slab.receiveShadow=true;grp.add(slab);
      const pickPlane=new T.Mesh(new T.PlaneGeometry(f.sz[0]+1.2,f.sz[1]+1.2),new T.MeshBasicMaterial({transparent:true,opacity:0}));
      pickPlane.rotation.x=-Math.PI/2;pickPlane.position.y=.05;pickPlane.userData={fac:f};grp.add(pickPlane);
      const prop=(BUILDERS[f.id]||buildLobby)(T,m);grp.add(prop);
      const halo=new T.Mesh(new T.RingGeometry(Math.max(f.sz[0],f.sz[1])*.7,Math.max(f.sz[0],f.sz[1])*.7+.18,32),new T.MeshBasicMaterial({color:f.color,transparent:true,opacity:.35,side:T.DoubleSide}));
      halo.rotation.x=-Math.PI/2;halo.position.y=.09;grp.add(halo);
      const label=makeLabel(T,f.name,f.color);label.position.set(0,3.4,0);grp.add(label);
      // staff
      const roleColors={Reception:0x3A5A85,Concierge:0x5A8F6A,Bell:0xB8864A,Lifeguard:0xE0615A,'Pool attendant':0x3A8FB7,Bartender:0x8A4A6B,'AV tech':0x4A5568,'F&B service':0xB8864A,Childcare:0xE0A83B,'First-aid':0x96414F,Valet:0x2A2A2A,Security:0x1A1A1A,Therapist:0x9B7BBF,Laundry:0x7A8B9A,Chef:0xF2E0AE,Waiter:0x5A8F6A,Host:0xC9A85A,Runner:0x8A7E6E,Trainer:0x5A8F6A,Cleaner:0x4A5568};
      f.roles.forEach(([role,n])=>{for(let i=0;i<n;i++){const s=makeStaff(T,roleColors[role]||0x8A7E6E);s.userData.role=role;s.userData.fac=f.id;s.position.set((Math.random()-.5)*(f.sz[0]-1),0,(Math.random()-.5)*(f.sz[1]-1));s.userData.tar=new T.Vector3(s.position.x,s.position.y,s.position.z);s.userData.phase=Math.random()*Math.PI*2;grp.add(s);R.staff.push(s);}});
      scene.add(grp);
      R.facs.push({grp,f,halo,label,slab});
    }
    // landscape trees — realistic trunk + layered canopy
    const trunkGeo=new T.CylinderGeometry(.1,.16,.7,8);
    const trunkMat=new T.MeshStandardMaterial({color:0x5A3F2A,roughness:.9});
    for(let i=0;i<24;i++){const tx=(Math.random()-.5)*42,tz=(Math.random()-.5)*32;if(FACILITIES.some(f=>Math.abs(tx-f.pos[0])<f.sz[0]*.7&&Math.abs(tz-f.pos[2])<f.sz[1]*.7))continue;const tree=new T.Group();const trunk=new T.Mesh(trunkGeo,trunkMat);trunk.position.y=.35;trunk.castShadow=true;tree.add(trunk);
      const green=[0x3E6B3A,0x4A7A42,0x558248];
      for(let j=0;j<3;j++){const s=.55-j*.08;const leaves=new T.Mesh(new T.SphereGeometry(s,10,9),new T.MeshStandardMaterial({color:green[j%3],roughness:.85}));leaves.position.y=.9+j*.32;leaves.castShadow=true;tree.add(leaves);}
      tree.position.set(tx,0,tz);tree.rotation.y=Math.random()*Math.PI;scene.add(tree);}

    function box(T,mat,w,h,d,x,y,z){const b=new T.Mesh(new T.BoxGeometry(w,h,d),mat);b.position.set(x,y,z);b.receiveShadow=true;return b;}

    function pick(e){
      const rect=renderer.domElement.getBoundingClientRect();
      const mv=new T.Vector2(((e.clientX-rect.left)/rect.width)*2-1,-((e.clientY-rect.top)/rect.height)*2+1);
      const ray=new T.Raycaster();ray.setFromCamera(mv,cam);
      const hits=ray.intersectObjects(scene.children,true);
      for(const h of hits){let o=h.object;while(o){if(o.userData&&o.userData.fac)return o.userData.fac;o=o.parent;}}
      return null;
    }
    function select(fac){
      R.sel=fac;
      R.facs.forEach(F=>{F.halo.material.opacity=F.f===fac?.id?.7:.3;F.slab.material.emissive=new T.Color(F.f===fac?.id?F.f.color:0);F.slab.material.emissiveIntensity=F.f===fac?.id?.25:0;});
      const panel=$('#fac-panel');if(!panel)return;
      if(!fac){panel.innerHTML=`<div class="hk-rp-empty"><span class="hk-rp-ic">${icon('mapPin')}</span><b>Select a facility</b><small>Click any zone on the 3D resort map to see live staff allocation.</small></div>`;return;}
      const pct=Math.round(fac.occ/fac.cap*100);
      const totalStaff=fac.roles.reduce((a,r)=>a+r[1],0);
      panel.innerHTML=`
        <div style="padding:2px 0 10px">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
            <span style="width:42px;height:42px;border-radius:12px;display:grid;place-items:center;background:var(--gold-grad-soft);color:var(--gold-deep)">${icon('mapPin')}</span>
            <div style="flex:1"><b style="display:block;font-size:14px">${fac.name}</b><small style="color:var(--mut)">${fac.type}</small></div>
            <span class="tag tag-green">${fac.status}</span></div>
          <div class="divider"></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0">
            <div style="background:var(--surface-2);border:1px solid var(--line);border-radius:10px;padding:8px 10px"><small style="color:var(--mut)">Capacity</small><b class="num" style="display:block">${fac.occ}/${fac.cap}</b></div>
            <div style="background:var(--surface-2);border:1px solid var(--line);border-radius:10px;padding:8px 10px"><small style="color:var(--mut)">Occupancy</small><b class="num" style="display:block">${pct}%</b></div>
          </div>
          <div style="height:6px;background:var(--surface-2);border-radius:3px;overflow:hidden;margin-bottom:14px"><div style="width:${pct}%;height:100%;background:var(--gold-grad);border-radius:3px"></div></div>
          <b style="font-size:12px">Staff allocation · ${totalStaff} on duty</b>
          <div style="display:flex;flex-direction:column;gap:6px;margin-top:8px">
            ${fac.roles.map(r=>`<div style="display:flex;align-items:center;gap:10px"><span style="width:8px;height:8px;border-radius:50%;background:#${(r[2]||0x8A7E6E).toString(16).padStart(6,'0')}"></span><span style="flex:1;font-size:12px">${r[0]}</span><b class="num">${r[1]}</b></div>`).join('')}
          </div>
        </div>`;
      updFeed(fac);
    }
    function updFeed(fac){
      const feed=$('#fac-staff-feed');if(!feed)return;
      const entries=[];
      fac.roles.forEach(([role,n])=>{for(let i=0;i<Math.min(n,3);i++)entries.push(`${role} ${i+1} · patrolling ${fac.name.toLowerCase()}`);});
      feed.innerHTML=entries.slice(0,6).map(e=>`<div class="lrow"><span class="dot dot-green"></span><div class="lrow-main" style="font-size:11.5px">${e}</div></div>`).join('')||'<small style="color:var(--mut)">No staff logged</small>';
    }

    // pointer
    const cv=renderer.domElement;cv.style.touchAction='none';
    let down=null,drag=false;
    const wake=()=>{R.auto=false;clearTimeout(R.autoT);R.autoT=setTimeout(()=>{if(R)R.auto=true;},8000);};
    cv.addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY,th:R.camT.th,ph:R.camT.ph};drag=false;cv.setPointerCapture(e.pointerId);wake();});
    cv.addEventListener('pointermove',e=>{if(down){const dx=e.clientX-down.x,dy=e.clientY-down.y;if(!drag&&Math.hypot(dx,dy)>5)drag=true;if(drag){R.camT.th=down.th-dx*.005;R.camT.ph=Math.max(.2,Math.min(1.3,down.ph-dy*.004));wake();}}});
    cv.addEventListener('pointerup',e=>{if(down&&!drag){const f=pick(e);if(f)select(f.id===R.sel?.id?null:f);}down=null;drag=false;});
    cv.addEventListener('wheel',e=>{if(!(e.ctrlKey||e.metaKey))return;e.preventDefault();R.camT.tr=Math.max(12,Math.min(60,R.camT.tr*(1+e.deltaY*.0012)));wake();},{passive:false});

    R.ro=new ResizeObserver(()=>{renderer.setSize(stage.clientWidth,stage.clientHeight);cam.aspect=stage.clientWidth/stage.clientHeight;cam.updateProjectionMatrix();});
    R.ro.observe(stage);

    function tick(){
      R.raf=requestAnimationFrame(tick);
      const t=(performance.now()-R.t0)/1000;
      if(R.auto)R.camT.th+=.0012;
      R.camC.th+=(R.camT.th-R.camC.th)*.07;R.camC.ph+=(R.camT.ph-R.camC.ph)*.07;R.camC.tr+=(R.camT.tr-R.camC.tr)*.07;
      const r=R.camC.tr,ph=R.camC.ph,th=R.camC.th;
      cam.position.set(Math.sin(th)*Math.cos(ph)*r,Math.sin(ph)*r+2,Math.cos(th)*Math.cos(ph)*r);
      cam.lookAt(0,0,0);
      // staff walk
      R.staff.forEach(s=>{
        const fac=FACILITIES.find(f=>f.id===s.userData.fac);if(!fac)return;
        const bw=fac.sz[0]-1,bd=fac.sz[1]-1;
        if(s.position.distanceTo(s.userData.tar)<.15){s.userData.tar.set((Math.random()-.5)*bw,s.position.y,(Math.random()-.5)*bd);}
        const dir=new T.Vector3().subVectors(s.userData.tar,s.position);dir.y=0;
        if(dir.length()>0.02){const sp=.012;s.position.x+=dir.x*sp;s.position.z+=dir.z*sp;s.rotation.y=Math.atan2(dir.x,dir.z);s.userData.phase+=.18;const sw=Math.sin(s.userData.phase)*.5;s.userData.legL.rotation.x=sw;s.userData.legR.rotation.x=-sw;s.userData.armL.rotation.x=-sw;s.userData.armR.rotation.x=sw;s.position.y=Math.abs(Math.sin(s.userData.phase*2))*.02;}
      });
      renderer.render(scene,cam);
    }
    tick();

    R.select=select;R.setView=(az,ph)=>{R.camT.th=az*Math.PI/180;R.camT.ph=Math.max(.2,Math.min(1.3,ph*Math.PI/180));wake();};
    return R;
  }

  function boot(){
    const stage=$('#fac3d-stage');if(!stage)return;destroy();
    const start=ok=>{if(!ok){stage.innerHTML='<div class="hk-rp-empty" style="padding:40px"><b>WebGL unavailable</b><small>3D facility map needs a WebGL-capable browser.</small></div>';return;}
      try{rt=create(stage);rt.select(FACILITIES[0]);}catch(e){stage.innerHTML='<div class="hk-rp-empty" style="padding:40px"><b>Could not load 3D</b><small>'+(e.message||'').slice(0,80)+'</small></div>';}};
    if(window.THREE){start(true);return;}
    stage.innerHTML='<div class="hk3d-boot"><span class="hk3d-boot-ring"></span><b>Composing the resort map…</b><small>WebGL engine loading</small></div>';
    withThree(start);
  }
  function destroy(){
    if(!rt)return;
    cancelAnimationFrame(rt.raf);clearTimeout(rt.autoT);rt.ro&&rt.ro.disconnect();
    rt.scene.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(mm=>{if(mm.map)mm.map.dispose();mm.dispose();});});
    rt.renderer.dispose();rt.renderer.domElement.remove();rt=null;
  }
  return {boot,destroy,setView:(az,ph)=>{if(rt)rt.setView(az,ph);},selectFacility:(id)=>{if(rt){const f=FACILITIES.find(x=>x.id===id);if(f)rt.select(f);}},facilities:FACILITIES};
})();

/* ============================================================
   CT3D — Command Tower 3D · unified property command center
   Hotel tower + lobby + staff live allocation + guest flow
   + day/night cycle + productivity HUD
   ============================================================ */
const CT3D=(()=>{
  let rt=null,loading=false,timer=0,q=[];
  function withThree(done){
    if(window.THREE){done(true);return;}
    q.push(done);if(loading)return;loading=true;
    const s=document.createElement('script');
    s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/0.158.0/three.min.js';s.async=true;
    const fin=ok=>{loading=false;clearTimeout(timer);const qq=q.splice(0);qq.forEach(f=>f(ok));};
    s.onload=()=>fin(true);s.onerror=()=>fin(false);
    (document.head||document.documentElement).appendChild(s);
    timer=setTimeout(()=>fin(false),12000);
  }

  const ROOM_STATUSES=['clean','occupied','dirty','maintenance'];
  const STATUS_COLORS={clean:0x6FCF97,occupied:0x5B9BD5,dirty:0xF0A45A,maintenance:0xE06B6B};
  const STATUS_LABEL={clean:'Clean & ready',occupied:'Occupied',dirty:'Dirty · pending',maintenance:'Maintenance'};
  const ROLES=[
    {id:'hk',name:'Housekeeping',color:0x3FA34D,n:10,area:[0,2]},
    {id:'fb',name:'F&B Service',color:0xE8843A,n:6,area:[8,-4]},
    {id:'eng',name:'Engineering',color:0x3A78E8,n:4,area:[-8,-4]},
    {id:'sec',name:'Security',color:0x2E3A59,n:4,area:[8,6]},
  ];
  const FLOORS=10,ROOMS_PER_FLOOR=8;
  const TOWER=[],STAFF=[],GUESTS=[];
  const WAYPOINTS=[[0,2],[8,-4],[-8,-4],[8,6],[-8,6],[0,10],[4,8],[-4,8],[10,0],[-10,0],[5,-7],[-5,-7]];

  function randRooms(){
    TOWER.length=0;
    for(let f=0;f<FLOORS;f++)for(let r=0;r<ROOMS_PER_FLOOR;r++){
      const p=Math.random();
      const st=p<.5?'clean':p<.78?'occupied':p<.92?'dirty':'maintenance';
      TOWER.push({floor:f,idx:r,status:st,guest:st==='occupied'?Math.floor(Math.random()*900+100):null});
    }
  }
  function randStaff(){
    STAFF.length=0;let sid=0;
    ROLES.forEach(role=>{for(let i=0;i<role.n;i++){
      const tasks=['Cleaning room '+Math.floor(Math.random()*80+101),'Restocking minibar','Turndown service','Delivering luggage','Maintenance check','Guest request','Inspection round','F&B setup'];
      STAFF.push({
        id:'S'+(++sid),role,
        name:['Aarav','Priya','Rohan','Ananya','Kabir','Isha','Vikram','Sara','Arjun','Meera','Dev','Nisha'][sid%12]+' '+['K.','S.','M.','R.'][sid%4],
        task:tasks[Math.floor(Math.random()*tasks.length)],
        progress:Math.floor(Math.random()*80+10),
        pos:[role.area[0]+(Math.random()-.5)*3,0,role.area[1]+(Math.random()-.5)*3],
        target:WAYPOINTS[Math.floor(Math.random()*WAYPOINTS.length)],
        speed:.04+Math.random()*.02,phase:Math.random()*Math.PI*2,
      });
    }});
  }
  function randGuests(){
    GUESTS.length=0;
    for(let i=0;i<10;i++)GUESTS.push({
      pos:[(Math.random()-.5)*6,0,(Math.random()-.5)*3],
      target:[(Math.random()-.5)*6,0,(Math.random()-.5)*3],
      speed:.03+Math.random()*.02,phase:Math.random()*Math.PI*2,
      color:[0xC9A66B,0x6B8FA3,0xA36B6B,0x6BA38C,0x8C6BA3][i%5],
    });
  }

  function boot(){
    const stage=document.getElementById('ct3d-stage');if(!stage)return;
    if(rt){return;}
    if(!window.THREE){
      stage.innerHTML='<div class="hk3d-boot"><div class="hk3d-boot-ring"></div><div style="margin-top:12px;font-size:12px;color:var(--mut)">Loading command tower…</div></div>';
      withThree(ok=>{if(ok)start();else stage.innerHTML='<div style="padding:30px;color:var(--mut)">Three.js failed to load.</div>';});
    } else start();
  }

  function start(){
    const T=window.THREE;
    const stage=document.getElementById('ct3d-stage');
    randRooms();randStaff();randGuests();
    const W=stage.clientWidth,H=stage.clientHeight;

    const scene=new T.Scene();
    scene.background=new T.Color(0xBFD4EA);
    scene.fog=new T.Fog(0xBFD4EA,40,95);

    const cam=new T.PerspectiveCamera(45,W/H,0.1,300);
    const camC={th:.7,ph:1.0,tr:46};
    const camT={th:camC.th,ph:camC.ph,tr:camC.tr};

    const renderer=new T.WebGLRenderer({antialias:true,alpha:false});
    renderer.setSize(W,H);renderer.setPixelRatio(Math.min(devicePixelRatio,2));
    renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
    renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
    stage.innerHTML='';stage.appendChild(renderer.domElement);

    const hemi=new T.HemisphereLight(0xffffff,0x8A9BB5,.55);scene.add(hemi);
    const sun=new T.DirectionalLight(0xFFE9C4,1.2);sun.position.set(30,40,20);sun.castShadow=true;
    sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-40;sun.shadow.camera.right=40;sun.shadow.camera.top=40;sun.shadow.camera.bottom=-40;sun.shadow.camera.near=1;sun.shadow.camera.far=120;
    scene.add(sun);
    const amb=new T.AmbientLight(0x4A5A78,.25);scene.add(amb);

    // ground
    const ground=new T.Mesh(new T.PlaneGeometry(120,120),new T.MeshStandardMaterial({color:0x9EC98A,roughness:1}));
    ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);
    const pathMat=new T.MeshStandardMaterial({color:0xCFC8B8,roughness:.9});
    const path=new T.Mesh(new T.PlaneGeometry(3,60),pathMat);path.rotation.x=-Math.PI/2;path.position.y=.01;path.receiveShadow=true;scene.add(path);
    const path2=new T.Mesh(new T.PlaneGeometry(60,3),pathMat);path2.rotation.x=-Math.PI/2;path2.position.y=.01;path2.receiveShadow=true;scene.add(path2);

    // tower
    const towerGrp=new T.Group();scene.add(towerGrp);
    const slabMat=new T.MeshStandardMaterial({color:0xE8E2D4,roughness:.85});
    const roomGeo=new T.BoxGeometry(1.3,.9,1.3);
    TOWER.forEach(room=>{
      const x=(room.idx-ROOMS_PER_FLOOR/2+.5)*1.55;
      const y=room.floor*1.4+.6;
      const z=-2;
      const cell=new T.Mesh(roomGeo,new T.MeshStandardMaterial({color:STATUS_COLORS[room.status],roughness:.6,emissive:STATUS_COLORS[room.status],emissiveIntensity:statusEmissive(room.status)}));
      cell.position.set(x,y,z);cell.castShadow=true;cell.receiveShadow=true;
      cell.userData={room};towerGrp.add(cell);
      room.mesh=cell;
    });
    for(let f=0;f<FLOORS;f++){
      const slab=new T.Mesh(new T.BoxGeometry(13,.16,5),slabMat);
      slab.position.set(0,f*1.4+.12,-2);slab.receiveShadow=true;slab.castShadow=true;towerGrp.add(slab);
    }
    // roof
    const roof=new T.Mesh(new T.BoxGeometry(13.4,.3,5.4),new T.MeshStandardMaterial({color:0x5A6470,roughness:.7}));
    roof.position.set(0,FLOORS*1.4+.1,-2);roof.castShadow=true;towerGrp.add(roof);

    // Novotel realistic shell — makes the facility tower read as the Novotel twin
    if(activeProperty().id==='novotel'){
      const tH=FLOORS*1.4;
      // teal glass curtain wall behind the status cells (physically correct reflections)
      const pm=new T.PMREMGenerator(renderer);
      const ec=document.createElement('canvas');ec.width=256;ec.height=64;const ex=ec.getContext('2d');
      const eg=ex.createLinearGradient(0,0,0,64);eg.addColorStop(0,'#1B2E4A');eg.addColorStop(.5,'#5A7AA8');eg.addColorStop(.85,'#E8A86A');eg.addColorStop(1,'#F0B078');
      ex.fillStyle=eg;ex.fillRect(0,0,256,64);
      const envTex=new T.CanvasTexture(ec);envTex.mapping=T.EquirectangularReflectionMapping;
      scene.environment=pm.fromEquirectangular(envTex).texture;envTex.dispose();pm.dispose();
      renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;
      const cwMat=new T.MeshPhysicalMaterial({color:0x123040,roughness:.06,metalness:.18,transparent:true,opacity:.2,envMapIntensity:1.5,clearcoat:1,clearcoatRoughness:.04,depthWrite:false});
      const cwF=new T.Mesh(new T.BoxGeometry(13.6,tH,0.1),cwMat);cwF.position.set(0,tH/2+.6,-2-2.7);towerGrp.add(cwF);
      const cwB=cwF.clone();cwB.position.z=-2+2.7;towerGrp.add(cwB);
      // curved white LED ribbons down each facade
      for(let r=0;r<3;r++)for(const fz of [-4.7,0.7]){
        const pts=[];for(let i=0;i<=22;i++){const t=i/22;const y=tH-t*(tH-1.5)+.6;
          pts.push(new T.Vector3(Math.sin(t*Math.PI*1.6+r*1.7)*2.0,y,fz));}
        const cv=new T.CatmullRomCurve3(pts,false,'catmullrom',.5);
        towerGrp.add(new T.Mesh(new T.TubeGeometry(cv,70,.06,7,false),
          new T.MeshStandardMaterial({color:0xFFFFFF,emissive:0xFFFFFF,emissiveIntensity:1.5,roughness:.2})));
      }
      // NOVOTEL blue signage — flat on the roof so it reads from the overhead facility camera
      const sMat=new T.MeshStandardMaterial({color:0x0A2E6E,emissive:0x1E6FFF,emissiveIntensity:1.6,roughness:.3,metalness:.2});
      const sw=.9,hh=.55,d=.1,gp=.12,txt='NOVOTEL';
      let c=-(((sw+gp)*(txt.length-1))/2);
      txt.split('').forEach(ch=>{if(ch===' '){c+=sw+gp;return;}const sg=new T.Mesh(new T.BoxGeometry(sw,hh,d),sMat);
        sg.position.set(c,tH+.4,0);sg.rotation.x=-Math.PI/2;towerGrp.add(sg);c+=sw+gp;});
      // vertical facade signage too (visible from low angles)
      for(const sf of [1,-1]){let cc=-(((.5+.1)*(txt.length-1))/2);
        txt.split('').forEach(ch=>{if(ch===' '){cc+=.6;return;}const sg=new T.Mesh(new T.BoxGeometry(.5,.9,.1),sMat);
          sg.position.set(cc,tH+1.0,-2+sf*2.7);if(sf<0)sg.rotation.y=Math.PI;towerGrp.add(sg);cc+=.6;});}
      // rooftop pool + umbrellas
      const pB=new T.Mesh(new T.BoxGeometry(4,.25,2.4),new T.MeshStandardMaterial({color:0x123A4E,roughness:.2}));pB.position.set(-4,tH+.5,-2);towerGrp.add(pB);
      const pW=new T.Mesh(new T.PlaneGeometry(3.8,2.2),new T.MeshPhysicalMaterial({color:0x2EC4D9,roughness:.05,metalness:.1,transmission:.7,ior:1.33,transparent:true,opacity:.85,envMapIntensity:1.4,clearcoat:1}));
      pW.rotation.x=-Math.PI/2;pW.position.set(-4,tH+.66,-2);towerGrp.add(pW);
      [0xE0453A,0xE08A2A,0xE0453A].forEach((uc,i)=>{const po=new T.Mesh(new T.CylinderGeometry(.03,.9,1.4,8),new T.MeshStandardMaterial({color:0xD9D2C2,roughness:.5}));po.position.set(-5+i*1,tH+1.2,-2);towerGrp.add(po);
        const um=new T.Mesh(new T.ConeGeometry(.7,.2,12),new T.MeshStandardMaterial({color:uc,roughness:.7,side:T.DoubleSide}));um.position.set(-5+i*1,tH+1.8,-2);um.castShadow=true;towerGrp.add(um);});
      // terrace greenery every 3rd floor
      const hM=new T.MeshStandardMaterial({color:0x3F6B2E,roughness:.95});
      for(let f=2;f<FLOORS;f+=3)for(const sz of [-4.9,0.9]){const h=new T.Mesh(new T.BoxGeometry(11,0.4,0.5),hM);h.position.set(0,f*1.4+.4,sz);h.castShadow=true;towerGrp.add(h);}
    }

    // lobby
    const lobby=new T.Mesh(new T.BoxGeometry(11,2.4,7),new T.MeshStandardMaterial({color:0xDED8C8,roughness:.8,transparent:true,opacity:.92}));
    lobby.position.set(0,1.2,4.5);lobby.receiveShadow=true;lobby.castShadow=true;scene.add(lobby);
    const lobbyRoof=new T.Mesh(new T.BoxGeometry(11.6,.25,7.6),new T.MeshStandardMaterial({color:0x5A6470,roughness:.7}));
    lobbyRoof.position.set(0,2.55,4.5);lobbyRoof.castShadow=true;scene.add(lobbyRoof);
    // check-in desks
    for(let i=-1;i<=1;i++){
      const desk=new T.Mesh(new T.BoxGeometry(2,.8,.6),new T.MeshStandardMaterial({color:0x8A7A5E,roughness:.6}));
      desk.position.set(i*3.2,.4,3);desk.castShadow=true;scene.add(desk);
    }

    // facilities (simplified blocks)
    const facMat=[
      {n:'Pool',c:0x2E86AB,pos:[-10,0,12],sz:[5,.3,3]},
      {n:'Restaurant',c:0xB8864A,pos:[10,0,10],sz:[5,1.6,4]},
      {n:'Parking',c:0x4A5568,pos:[0,0,-12],sz:[10,.05,5]},
      {n:'Spa',c:0x9B7BBF,pos:[-12,0,-2],sz:[3,1.6,3]},
    ];
    facMat.forEach(f=>{
      const b=new T.Mesh(new T.BoxGeometry(f.sz[0],f.sz[1],f.sz[2]),new T.MeshStandardMaterial({color:f.c,roughness:.65,transparent:f.n==='Pool',opacity:f.n==='Pool'?.85:1}));
      b.position.set(f.pos[0],f.sz[1]/2,f.pos[2]);b.castShadow=true;b.receiveShadow=true;scene.add(b);
    });
    // pool water
    const water=new T.Mesh(new T.BoxGeometry(4.2,.1,2.2),new T.MeshStandardMaterial({color:0x4FB3D9,roughness:.1,transparent:true,opacity:.8}));
    water.position.set(-10,.25,12);scene.add(water);

    // trees
    const treeGeo=new T.ConeGeometry(.5,1.6,8);
    const trunkGeo=new T.CylinderGeometry(.1,.12,.6,6);
    for(let i=0;i<26;i++){
      const a=Math.random()*Math.PI*2,rr=14+Math.random()*22;
      const x=Math.cos(a)*rr,z=Math.sin(a)*rr;
      if(Math.abs(x)<16&&Math.abs(z)<16)continue;
      const trunk=new T.Mesh(trunkGeo,new T.MeshStandardMaterial({color:0x6B4A2B,roughness:1}));
      trunk.position.set(x,.3,z);trunk.castShadow=true;scene.add(trunk);
      const leaf=new T.Mesh(treeGeo,new T.MeshStandardMaterial({color:0x4A8B3A,roughness:.9}));
      leaf.position.set(x,1.3,z);leaf.castShadow=true;scene.add(leaf);
    }

    // staff + guests
    const staffMats={};
    const staffGrp=new T.Group();scene.add(staffGrp);
    STAFF.forEach(s=>{
      const m=makeHuman(T,s.role.color);m.position.set(s.pos[0],0,s.pos[2]);staffGrp.add(m);s.mesh=m;
    });
    const guestGrp=new T.Group();scene.add(guestGrp);
    GUESTS.forEach(g=>{const m=makeHuman(T,g.color);m.position.set(g.pos[0],0,g.pos[2]);guestGrp.add(m);g.mesh=m;});

    // task labels + room lights (point lights for night)
    const nightLights=[];
    for(let f=0;f<FLOORS;f++){
      const pl=new T.PointLight(0xFFD9A0,.0,12,2);pl.position.set(0,f*1.4+.8,-2);scene.add(pl);nightLights.push(pl);
    }
    const lobbyLight=new T.PointLight(0xFFE9B0,.0,14,2);lobbyLight.position.set(0,2,4.5);scene.add(lobbyLight);nightLights.push(lobbyLight);

    // HUD
    const hud=document.createElement('div');
    hud.style.cssText='position:absolute;top:14px;left:14px;display:flex;gap:10px;z-index:5;pointer-events:none;flex-wrap:wrap;max-width:60%';
    hud.innerHTML=metricsHTML();
    stage.appendChild(hud);

    // selection panel
    const panel=document.createElement('div');
    panel.style.cssText='position:absolute;top:14px;right:14px;width:260px;background:var(--elev);border:1px solid var(--line);border-radius:16px;padding:16px;box-shadow:var(--shadow);z-index:5;font-size:12px;display:none';
    panel.id='ct-panel';stage.appendChild(panel);

    // staff feed
    const feed=document.createElement('div');
    feed.style.cssText='position:absolute;bottom:14px;left:14px;width:280px;max-height:150px;overflow:auto;background:var(--elev);border:1px solid var(--line);border-radius:14px;padding:10px;z-index:5;font-size:11px';
    feed.id='ct-feed';stage.appendChild(feed);

    rt={scene,cam,renderer,camC,camT,sun,amb,hemi,nightLights,hud,panel,feed,staffGrp,guestGrp,auto:true,autoT:0,time:0,sel:null,raf:0,ro:null};

    // controls
    let down=null,drag=false;
    const cv=renderer.domElement;
    const wake=()=>{rt.auto=false;clearTimeout(rt.autoT);rt.autoT=setTimeout(()=>{if(rt)rt.auto=true;},7000);};
    cv.addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY,th:rt.camT.th,ph:rt.camT.ph};drag=false;try{cv.setPointerCapture(e.pointerId);}catch(_){}wake();});
    cv.addEventListener('pointermove',e=>{if(down){const dx=e.clientX-down.x,dy=e.clientY-down.y;if(!drag&&Math.hypot(dx,dy)>5)drag=true;if(drag){rt.camT.th=down.th-dx*.005;rt.camT.ph=Math.max(.2,Math.min(1.35,down.ph-dy*.004));wake();}}});
    cv.addEventListener('pointerup',e=>{if(down&&!drag){pick(e);}down=null;drag=false;});
    cv.addEventListener('wheel',e=>{if(!(e.ctrlKey||e.metaKey))return;e.preventDefault();rt.camT.tr=Math.max(18,Math.min(70,rt.camT.tr*(1+e.deltaY*.0012)));wake();},{passive:false});

    rt.ro=new ResizeObserver(()=>{const w=stage.clientWidth,h=stage.clientHeight;renderer.setSize(w,h);cam.aspect=w/h;cam.updateProjectionMatrix();});
    rt.ro.observe(stage);

    animate();
    updateHUD();
    updateFeed();
    setInterval(updateHUD,1500);
    setInterval(updateFeed,1200);
  }

  function statusEmissive(st){return st==='occupied'?.12:st==='dirty'?.08:st==='maintenance'?.1:.04;}

  function makeHuman(T,color){
    const g=new T.Group();
    const legGeo=new T.CapsuleGeometry(.07,.22,4,8);
    const mat=new T.MeshStandardMaterial({color,roughness:.8});
    const skin=new T.MeshStandardMaterial({color:0xE0B48A,roughness:.7});
    const mkLeg=side=>{const p=new T.Group();p.position.set(side*.08,.3,0);const m=new T.Mesh(legGeo,mat);m.position.y=-.13;m.castShadow=true;p.add(m);g.add(p);return p;};
    const legL=mkLeg(-1),legR=mkLeg(1);
    const torso=new T.Mesh(new T.CapsuleGeometry(.16,.3,4,10),mat);torso.position.y=.68;torso.castShadow=true;g.add(torso);
    const head=new T.Mesh(new T.SphereGeometry(.13,12,12),skin);head.position.y=1.0;g.add(head);
    const cap=new T.Mesh(new T.CylinderGeometry(.13,.15,.09,12),new T.MeshStandardMaterial({color:0x1A1A1A,roughness:.6}));cap.position.y=1.08;g.add(cap);
    const armGeo=new T.CapsuleGeometry(.05,.2,4,8);
    const mkArm=side=>{const p=new T.Group();p.position.set(side*.2,.68,0);const m=new T.Mesh(armGeo,mat);m.position.y=-.13;p.add(m);g.add(p);return p;};
    const armL=mkArm(-1),armR=mkArm(1);
    g.userData={legL,legR,armL,armR,phase:Math.random()*Math.PI*2};
    return g;
  }

  function metricsHTML(){
    const occ=TOWER.filter(r=>r.status==='occupied').length;
    const occPct=Math.round(occ/TOWER.length*100);
    const active=STAFF.length;
    const util=Math.round(STAFF.reduce((a,s)=>a+s.progress,0)/STAFF.length);
    const sla=Math.floor(Math.random()*4+1);
    const card=(t,v,s,c)=>`<div style="background:var(--elev);border:1px solid var(--line);border-radius:12px;padding:9px 13px;box-shadow:var(--shadow-sm)"><div style="font-size:9.5px;text-transform:uppercase;letter-spacing:.12em;color:var(--mut);font-weight:700">${t}</div><div style="font-size:20px;font-weight:700;color:${c};line-height:1.1">${v}</div><div style="font-size:10px;color:var(--mut);margin-top:2px">${s}</div></div>`;
    return card('Occupancy',occPct+'%',occ+'/'+TOWER.length+' rooms','var(--gold)')+
      card('Staff on duty',active,util+'% avg utilization','var(--emerald)')+
      card('Tasks live',STAFF.length,Math.floor(STAFF.length*.7)+' in progress','var(--azure)')+
      card('SLA watch',sla,sla<=2?'All on track':sla+' near breach','var(--amber)');
  }

  function updateHUD(){if(rt&&rt.hud)rt.hud.innerHTML=metricsHTML();}

  function updateFeed(){
    if(!rt||!rt.feed)return;
    const items=STAFF.slice(0,8).map(s=>`<div style="display:flex;gap:8px;padding:4px 0;border-bottom:1px solid var(--line)"><span style="width:8px;height:8px;border-radius:50%;background:#${s.role.color.toString(16).padStart(6,'0')};margin-top:4px;flex-shrink:0"></span><div style="flex:1"><b style="font-size:11px">${s.name}</b> <small style="color:var(--mut)">· ${s.role.name}</small><div style="font-size:10px;color:var(--mut)">${s.task} · ${s.progress}%</div></div></div>`).join('');
    rt.feed.innerHTML='<div style="font-weight:700;font-size:11px;margin-bottom:6px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)">Live staff activity</div>'+items;
  }

  function pick(e){
    const T=window.THREE;const cv=rt.renderer.domElement;const r=cv.getBoundingClientRect();
    const m=new T.Vector2(((e.clientX-r.left)/r.width)*2-1,-((e.clientY-r.top)/r.height)*2+1);
    const rc=new T.Raycaster();rc.setFromCamera(m,rt.cam);
    const hits=rc.intersectObjects(rt.scene.children,true);
    for(const h of hits){
      let o=h.object;
      while(o){if(o.userData&&o.userData.room){selectRoom(o.userData.room);return;}o=o.parent;}
    }
    // check staff
    const staffHits=rc.intersectObjects(rt.staffGrp.children,true);
    for(const h of staffHits){
      let o=h.object;while(o){if(o.userData&&o.userData._staff){selectStaff(o.userData._staff);return;}o=o.parent;}
    }
  }

  function selectRoom(room){
    rt.sel=room;
    const occ=room.status==='occupied'?'Guest #'+room.guest:'—';
    rt.panel.style.display='block';
    rt.panel.innerHTML=`<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px"><span style="width:14px;height:14px;border-radius:4px;background:#${STATUS_COLORS[room.status].toString(16).padStart(6,'0')}"></span><b style="font-size:14px">Room ${room.floor*100+room.idx+101}</b></div>
      <div style="color:var(--mut);font-size:11px;margin-bottom:8px">${STATUS_LABEL[room.status]}</div>
      <div style="display:flex;justify-content:space-between;padding:6px 0;border-top:1px solid var(--line)"><span style="color:var(--mut)">Floor</span><b>${room.floor+1}</b></div>
      <div style="display:flex;justify-content:space-between;padding:6px 0;border-top:1px solid var(--line)"><span style="color:var(--mut)">Guest</span><b>${occ}</b></div>
      <div style="display:flex;justify-content:space-between;padding:6px 0;border-top:1px solid var(--line)"><span style="color:var(--mut)">Assigned HK</span><b>${STAFF[Math.floor(Math.random()*10)].name}</b></div>
      <div style="margin-top:10px"><div style="font-size:10px;color:var(--mut);margin-bottom:4px">Cleanliness progress</div><div style="height:6px;background:var(--surface-2);border-radius:4px;overflow:hidden"><div style="width:${room.status==='clean'?100:room.status==='dirty'?20:60}%;height:100%;background:var(--gold-grad)"></div></div></div>`;
  }
  function selectStaff(s){
    rt.sel=s;
    rt.panel.style.display='block';
    rt.panel.innerHTML=`<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px"><span style="width:34px;height:34px;border-radius:10px;background:#${s.role.color.toString(16).padStart(6,'0')};display:grid;place-items:center;color:#fff;font-weight:700">${s.name[0]}</span><div><b style="font-size:14px">${s.name}</b><div style="font-size:11px;color:var(--mut)">${s.role.name}</div></div></div>
      <div style="padding:6px 0;border-top:1px solid var(--line)"><div style="font-size:10px;color:var(--mut)">Current task</div><b style="font-size:12px">${s.task}</b></div>
      <div style="margin-top:8px"><div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:4px"><span style="color:var(--mut)">Progress</span><b>${s.progress}%</b></div><div style="height:6px;background:var(--surface-2);border-radius:4px;overflow:hidden"><div style="width:${s.progress}%;height:100%;background:var(--gold-grad)"></div></div></div>
      <div style="display:flex;justify-content:space-between;padding:6px 0;margin-top:6px;border-top:1px solid var(--line)"><span style="color:var(--mut)">Tasks today</span><b>${Math.floor(Math.random()*8+4)}</b></div>
      <div style="display:flex;justify-content:space-between;padding:6px 0;border-top:1px solid var(--line)"><span style="color:var(--mut)">Utilization</span><b style="color:var(--emerald)">${Math.floor(s.progress+10)}%</b></div>`;
  }

  function animate(){
    if(!rt)return;rt.raf=requestAnimationFrame(animate);
    const T=window.THREE;rt.time+=0.016;
    // day/night cycle (60s loop)
    const t=(rt.time%60)/60;
    const ang=t*Math.PI*2;
    rt.sun.position.set(Math.cos(ang)*40,Math.sin(ang)*45+5,20);
    const day=Math.max(0,Math.sin(ang));
    rt.sun.intensity=0.2+day*1.1;
    rt.amb.intensity=0.15+day*0.25;
    rt.hemi.intensity=0.2+day*0.5;
    const night=Math.max(0,-Math.sin(ang));
    rt.nightLights.forEach(l=>l.intensity=night*1.6);
    // sky
    const skyCol=new T.Color().setHSL(.58,.4,.35+day*.35);
    rt.scene.background=skyCol;rt.scene.fog.color=skyCol;

    // staff movement
    STAFF.forEach(s=>{
      const dx=s.target[0]-s.pos[0],dz=s.target[1]-s.pos[2];
      const d=Math.hypot(dx,dz);
      if(d<.4){s.target=WAYPOINTS[Math.floor(Math.random()*WAYPOINTS.length)];s.progress=Math.min(100,s.progress+Math.floor(Math.random()*15));if(s.progress>=100){s.progress=10;const tasks=['Cleaning room '+Math.floor(Math.random()*80+101),'Restocking minibar','Turndown service','Delivering luggage','Guest request','Inspection round'];s.task=tasks[Math.floor(Math.random()*tasks.length)];}}
      else{s.pos[0]+=dx/d*s.speed;s.pos[2]+=dz/d*s.speed;s.mesh.position.set(s.pos[0],0,s.pos[2]);s.mesh.rotation.y=Math.atan2(dx,dz);}
      s.phase+=0.2;const sw=Math.sin(s.phase)*.4;
      s.mesh.userData.legL.rotation.x=sw;s.mesh.userData.legR.rotation.x=-sw;
      s.mesh.userData.armL.rotation.x=-sw*.6;s.mesh.userData.armR.rotation.x=sw*.6;
      s.mesh.userData._staff=s;
    });
    // guests
    GUESTS.forEach(g=>{
      const dx=g.target[0]-g.pos[0],dz=g.target[1]-g.pos[2];
      const d=Math.hypot(dx,dz);
      if(d<.3){g.target=[(Math.random()-.5)*6,0,(Math.random()-.5)*3];}
      else{g.pos[0]+=dx/d*g.speed;g.pos[2]+=dz/d*g.speed;g.mesh.position.set(g.pos[0],0,g.pos[2]);g.mesh.rotation.y=Math.atan2(dx,dz);}
      g.phase+=0.18;const sw=Math.sin(g.phase)*.35;
      g.mesh.userData.legL.rotation.x=sw;g.mesh.userData.legR.rotation.x=-sw;
    });

    // camera
    if(rt.auto)rt.camT.th+=0.0012;
    rt.camT.th+=(rt.camC.th-rt.camT.th)*0;
    const th=rt.camT.th,ph=rt.camT.ph,tr=rt.camT.tr;
    rt.cam.position.set(Math.sin(th)*Math.cos(ph)*tr,Math.sin(ph)*tr+6,Math.cos(th)*Math.cos(ph)*tr);
    rt.cam.lookAt(0,5,0);

    rt.renderer.render(rt.scene,rt.cam);
  }

  function setView(az,ph){if(rt){rt.camT.th=az*Math.PI/180;rt.camT.ph=ph*Math.PI/180;}}

  function destroy(){
    if(!rt)return;cancelAnimationFrame(rt.raf);clearTimeout(rt.autoT);rt.ro&&rt.ro.disconnect();
    rt.scene.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(mm=>{if(mm.map)mm.map.dispose();mm.dispose();});});
    rt.renderer.dispose();rt.renderer.domElement.remove();rt=null;
  }
  return {boot,destroy,setView,rooms:TOWER,staff:STAFF};
})();

/* ============================================================
   NOV3D — Novotel Grand Saigon · ultra-realistic 3D twin
   Glass curtain-wall tower · curved LED ribbons · rooftop pool
   Landscaped plaza · day/night cycle · floor-plan interiors
   ============================================================ */
const NOV3D=(()=>{
  let rt=null,extRt=null,loading=false,timer=0,q=[];
  let mode='exterior';            /* 'exterior' | 'floor' */
  let curFloor=NOV_FLOORS[0].id;
  function withThree(done){
    if(window.THREE){done(true);return;}
    q.push(done);if(loading)return;loading=true;
    const s=document.createElement('script');
    s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/0.158.0/three.min.js';s.async=true;
    const fin=ok=>{loading=false;clearTimeout(timer);const qq=q.splice(0);qq.forEach(f=>f(ok));};
    s.onload=()=>fin(true);s.onerror=()=>fin(false);
    (document.head||document.documentElement).appendChild(s);
    timer=setTimeout(()=>fin(false),12000);
  }

  /* Procedural canvas textures — grass, asphalt, marble, glass tint */
  function texGrass(T){
    const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');
    x.fillStyle='#4F7A3A';x.fillRect(0,0,256,256);
    for(let i=0;i<9000;i++){const g=120+Math.random()*90|0;x.fillStyle=`rgba(${g},${g+30},${g-10},${.06+Math.random()*.1})`;x.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*2,1+Math.random()*2);}
    const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(40,40);t.anisotropy=8;return t;
  }
  function texAsphalt(T){
    const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');
    x.fillStyle='#3A3D42';x.fillRect(0,0,256,256);
    for(let i=0;i<5000;i++){const v=40+Math.random()*40|0;x.fillStyle=`rgba(${v},${v},${v},${.18})`;x.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*2,1+Math.random()*2);}
    const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(12,12);t.anisotropy=8;return t;
  }
  function texPlaza(T){
    const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');
    x.fillStyle='#C9C2B0';x.fillRect(0,0,256,256);
    for(let i=0;i<30;i++){x.strokeStyle='rgba(120,110,90,.35)';x.lineWidth=1;x.beginPath();x.moveTo(i*8.5,0);x.lineTo(i*8.5,256);x.stroke();}
    for(let i=0;i<2000;i++){const v=180+Math.random()*40|0;x.fillStyle=`rgba(${v},${v-10},${v-30},${.12})`;x.fillRect(Math.random()*256,Math.random()*256,1,1);}
    const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(20,20);t.anisotropy=8;return t;
  }
  /* Twilight sky gradient → baked into PMREM env for physically-correct reflections */
  function envMap(T,renderer){
    const c=document.createElement('canvas');c.width=256;c.height=64;const x=c.getContext('2d');
    const g=x.createLinearGradient(0,0,0,64);
    g.addColorStop(0,'#1B2E4A');g.addColorStop(.4,'#3A5A8C');g.addColorStop(.7,'#7E9CBF');g.addColorStop(.88,'#E8A86A');g.addColorStop(1,'#F0B078');
    x.fillStyle=g;x.fillRect(0,0,256,64);
    const tex=new T.CanvasTexture(c);tex.mapping=T.EquirectangularReflectionMapping;
    const pmrem=new T.PMREMGenerator(renderer);const env=pmrem.fromEquirectangular(tex).texture;tex.dispose();pmrem.dispose();
    return env;
  }

  /* Mature layered tree (trunk + 3 canopy spheres) */
  function buildTree(T){
    const g=new T.Group();
    const trunkMat=new T.MeshStandardMaterial({color:0x5A3E22,roughness:.95});
    const trunk=new T.Mesh(new T.CylinderGeometry(.18,.28,1.4,8),trunkMat);trunk.position.y=.7;trunk.castShadow=true;g.add(trunk);
    const leafMat=new T.MeshStandardMaterial({color:0x3F6B2E,roughness:.9});
    const leafMat2=new T.MeshStandardMaterial({color:0x4E8238,roughness:.9});
    const leafMat3=new T.MeshStandardMaterial({color:0x5C9442,roughness:.9});
    const c1=new T.Mesh(new T.SphereGeometry(1.05,14,12),leafMat);c1.position.y=1.7;c1.castShadow=true;g.add(c1);
    const c2=new T.Mesh(new T.SphereGeometry(.82,12,10),leafMat2);c2.position.set(.55,2.15,.3);c2.castShadow=true;g.add(c2);
    const c3=new T.Mesh(new T.SphereGeometry(.72,12,10),leafMat3);c3.position.set(-.45,2.25,-.25);c3.castShadow=true;g.add(c3);
    return g;
  }
  /* Realistic car (body, glass cabin, wheels, lights) */
  function buildCar(T,col){
    const g=new T.Group();
    const bodyMat=new T.MeshStandardMaterial({color:col,roughness:.28,metalness:.55,envMapIntensity:1.1});
    const body=new T.Mesh(new T.BoxGeometry(.92,.34,1.85),bodyMat);body.position.y=.32;body.castShadow=true;g.add(body);
    const lower=new T.Mesh(new T.BoxGeometry(.86,.16,1.78),new T.MeshStandardMaterial({color:0x1A1C20,roughness:.5,metalness:.6}));lower.position.y=.16;g.add(lower);
    const cabinMat=new T.MeshPhysicalMaterial({color:0x14202C,roughness:.05,metalness:.2,transparent:true,opacity:.55,envMapIntensity:1.4,transmission:.15,ior:1.4});
    const cabin=new T.Mesh(new T.BoxGeometry(.78,.26,1.05),cabinMat);cabin.position.set(0,.54,-.05);cabin.castShadow=true;g.add(cabin);
    const hood=new T.Mesh(new T.BoxGeometry(.86,.07,.34),bodyMat);hood.position.set(0,.42,.72);g.add(hood);
    const wheelGeo=new T.CylinderGeometry(.13,.13,.1,16);
    const wheelMat=new T.MeshStandardMaterial({color:0x111316,roughness:.85});
    [[-.5,.85],[-.5,-.85],[.5,.85],[.5,-.85]].forEach(p=>{const w=new T.Mesh(wheelGeo,wheelMat);w.rotation.z=Math.PI/2;w.position.set(p[0],.13,p[1]);w.castShadow=true;g.add(w);
      const hub=new T.Mesh(new T.CylinderGeometry(.06,.06,.11,8),new T.MeshStandardMaterial({color:0x9A9A9A,metalness:.8,roughness:.3}));hub.rotation.z=Math.PI/2;hub.position.set(p[0],.13,p[1]);g.add(hub);});
    const hlMat=new T.MeshStandardMaterial({color:0xFFF4D0,emissive:0xFFE9A0,emissiveIntensity:.6});
    [-.28,.28].forEach(z=>{const hl=new T.Mesh(new T.BoxGeometry(.08,.08,.04),hlMat);hl.position.set(.45,.34,z+.78);g.add(hl);});
    const tlMat=new T.MeshStandardMaterial({color:0xFF3A2A,emissive:0xFF2A1A,emissiveIntensity:.5});
    [-.28,.28].forEach(z=>{const tl=new T.Mesh(new T.BoxGeometry(.06,.08,.04),tlMat);tl.position.set(-.45,.34,z-.86);g.add(tl);});
    return g;
  }
  /* "NOVOTEL" signage letters (box extrusions, emissive blue) */
  function buildSignage(T,txt,scale){
    const g=new T.Group();
    const mat=new T.MeshStandardMaterial({color:0x0A2E6E,emissive:0x1E6FFF,emissiveIntensity:1.4,roughness:.3,metalness:.2});
    const w=.62*scale,h=1.1*scale,d=.16*scale,gap=.14*scale;
    let cursor=-(((w+gap)*(txt.length-1))/2);
    txt.split('').forEach(ch=>{
      if(ch===' '){cursor+=w+gap;return;}
      const seg=new T.Mesh(new T.BoxGeometry(w,h,d),mat);seg.position.x=cursor;g.add(seg);
      cursor+=w+gap;
    });
    return g;
  }
  /* Curved LED ribbon — organic spline flowing down the facade */
  function buildRibbon(T,seed,faceZ){
    const g=new T.Group();
    const pts=[];const startY=72;const span=66;
    for(let i=0;i<=24;i++){
      const t=i/24;const y=startY-t*span;
      const wave=Math.sin(t*Math.PI*1.6+seed)*2.4+Math.sin(t*Math.PI*3.1+seed*1.7)*1.1;
      const x=Math.cos(seed)*wave;
      pts.push(new T.Vector3(x,y,faceZ));
    }
    const curve=new T.CatmullRomCurve3(pts,false,'catmullrom',.5);
    const mat=new T.MeshStandardMaterial({color:0xFFFFFF,emissive:0xFFFFFF,emissiveIntensity:1.8,roughness:.2,metalness:.1});
    const tube=new T.Mesh(new T.TubeGeometry(curve,90,.09,8,false),mat);g.add(tube);
    /* glow halo strip */
    const haloMat=new T.MeshBasicMaterial({color:0xBFE0FF,transparent:true,opacity:.35});
    const halo=new T.Mesh(new T.TubeGeometry(curve,90,.22,8,false),haloMat);g.add(halo);
    g.userData={mat,haloMat,seed};
    return g;
  }

  /* ---------- EXTERIOR SCENE ---------- */
  function bootExterior(stage){
    const T=window.THREE;destroyExterior();
    const W=stage.clientWidth,H=Math.max(stage.clientHeight,360);
    const scene=new T.Scene();scene.background=new T.Color(0x2E4A6E);scene.fog=new T.Fog(0x335270,90,200);
    const cam=new T.PerspectiveCamera(42,W/H,.1,400);
    const camC={th:.55,ph:.32,tr:88};const camT={th:camC.th,ph:camC.ph,tr:camC.tr};
    const renderer=new T.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
    renderer.setSize(W,H);renderer.setPixelRatio(Math.min(devicePixelRatio,2));
    renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
    renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;
    stage.innerHTML='';stage.appendChild(renderer.domElement);
    scene.environment=envMap(T,renderer);

    /* lights */
    const hemi=new T.HemisphereLight(0xBFE0FF,0x2A3A2A,.5);scene.add(hemi);
    const sun=new T.DirectionalLight(0xFFE0A8,1.25);sun.position.set(60,80,40);sun.castShadow=true;
    sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-70;sun.shadow.camera.right=70;sun.shadow.camera.top=90;sun.shadow.camera.bottom=-30;sun.shadow.camera.near=1;sun.shadow.camera.far=220;sun.shadow.bias=-.0002;
    scene.add(sun);
    const amb=new T.AmbientLight(0x3A5070,.3);scene.add(amb);
    const fill=new T.DirectionalLight(0x6090C0,.35);fill.position.set(-40,30,-50);scene.add(fill);

    /* ground + plaza + road */
    const grass=new T.Mesh(new T.PlaneGeometry(400,400),new T.MeshStandardMaterial({map:texGrass(T),roughness:1}));grass.rotation.x=-Math.PI/2;grass.receiveShadow=true;scene.add(grass);
    const plaza=new T.Mesh(new T.PlaneGeometry(70,80),new T.MeshStandardMaterial({map:texPlaza(T),roughness:.85}));plaza.rotation.x=-Math.PI/2;plaza.position.set(0,.02,12);plaza.receiveShadow=true;scene.add(plaza);
    const road=new T.Mesh(new T.PlaneGeometry(90,12),new T.MeshStandardMaterial({map:texAsphalt(T),roughness:.95}));road.rotation.x=-Math.PI/2;road.position.set(0,.03,40);road.receiveShadow=true;scene.add(road);
    /* drop-off canopy */
    const canopyMat=new T.MeshStandardMaterial({color:0xE8E2D4,roughness:.6,side:T.DoubleSide});
    const canopy=new T.Mesh(new T.BoxGeometry(14,.12,5),canopyMat);canopy.position.set(0,4.2,22);canopy.castShadow=true;canopy.receiveShadow=true;scene.add(canopy);
    for(let i=-1;i<=1;i++){const col=new T.Mesh(new T.CylinderGeometry(.12,.14,4.2,10),new T.MeshStandardMaterial({color:0x8A8A8A,metalness:.6,roughness:.3}));col.position.set(i*6,2.1,24);col.castShadow=true;scene.add(col);}

    /* ---- TOWER ---- */
    const tower=new T.Group();scene.add(tower);
    const FLOORS=22,FH=3.4,TW=20,TD=14;
    const totalH=FLOORS*FH;
    /* glass curtain wall */
    const glassMat=new T.MeshPhysicalMaterial({color:0x16323E,roughness:.04,metalness:.15,transparent:true,opacity:.78,envMapIntensity:1.6,clearcoat:1,clearcoatRoughness:.04,transmission:.18,ior:1.45});
    const glass=new T.Mesh(new T.BoxGeometry(TW,totalH,TD),glassMat);glass.position.y=totalH/2+2;glass.castShadow=true;glass.receiveShadow=true;tower.add(glass);
    /* floor slab bands (concrete between glass) */
    const slabMat=new T.MeshStandardMaterial({color:0xD9D2C2,roughness:.85,metalness:.05});
    for(let f=0;f<=FLOORS;f++){const slab=new T.Mesh(new T.BoxGeometry(TW+.3,.28,TD+.3),slabMat);slab.position.y=f*FH+2;slab.castShadow=true;slab.receiveShadow=true;tower.add(slab);}
    /* vertical mullions (dark metal fins) */
    const mullMat=new T.MeshStandardMaterial({color:0x2A3036,roughness:.4,metalness:.7});
    for(let i=-3;i<=3;i++){const m=new T.Mesh(new T.BoxGeometry(.18,totalH,.18),mullMat);m.position.set(i*3,2+totalH/2,TD/2+.02);m.castShadow=true;tower.add(m);
      const m2=m.clone();m2.position.z=-(TD/2+.02);tower.add(m2);}
    /* interior floor plates (visible through glass, warm emissive at night) */
    const floorLights=[];
    const intMat=new T.MeshStandardMaterial({color:0xE8D9B0,roughness:.9,emissive:0xFFCE82,emissiveIntensity:.0});
    for(let f=1;f<FLOORS;f++){const ip=new T.Mesh(new T.BoxGeometry(TW-1,.1,TD-1),intMat);ip.position.y=f*FH+2;tower.add(ip);floorLights.push(ip);}
    /* curved balcony terraces with greenery every 3rd floor */
    const hedgeMat=new T.MeshStandardMaterial({color:0x3F6B2E,roughness:.95});
    for(let f=2;f<FLOORS;f+=3){
      const bal=new T.Mesh(new T.BoxGeometry(TW+.6,.2,1.6),slabMat);bal.position.set(0,f*FH+2,TD/2+.7);bal.castShadow=true;tower.add(bal);
      const bal2=bal.clone();bal2.position.z=-(TD/2+.7);tower.add(bal2);
      for(let i=-3;i<=3;i++){const hedge=new T.Mesh(new T.BoxGeometry(1.4,.5,.6),hedgeMat);hedge.position.set(i*2.7,f*FH+2.25,TD/2+1.1);hedge.castShadow=true;tower.add(hedge);
        const h2=hedge.clone();h2.position.z=-(TD/2+1.1);tower.add(h2);}
    }

    /* curved white LED ribbons down facade (4 organic ribbons) */
    const ribbons=[];
    for(let r=0;r<4;r++){const rib=buildRibbon(T,r*1.7,TD/2+.05);tower.add(rib);ribbons.push(rib);
      const rib2=buildRibbon(T,r*1.7+0.9,-(TD/2+.05));tower.add(rib2);ribbons.push(rib2);}

    /* crown — rooftop slab + NOVOTEL signage + pool deck */
    const crown=new T.Mesh(new T.BoxGeometry(TW+.6,.5,TD+.6),new T.MeshStandardMaterial({color:0x4A5560,roughness:.7,metalness:.3}));crown.position.set(0,totalH+2.25,0);crown.castShadow=true;tower.add(crown);
    const sign=buildSignage(T,'NOVOTEL',1.6);sign.position.set(0,totalH+3.4,TD/2+.1);tower.add(sign);
    const sign2=buildSignage(T,'NOVOTEL',1.6);sign2.position.set(0,totalH+3.4,-(TD/2+.1));sign2.rotation.y=Math.PI;tower.add(sign2);
    /* rooftop pool deck */
    const deckMat=new T.MeshStandardMaterial({color:0xE8E2D4,roughness:.7});
    const deck=new T.Mesh(new T.BoxGeometry(TW-2,.2,TD-2),deckMat);deck.position.set(0,totalH+2.6,0);deck.receiveShadow=true;tower.add(deck);
    const poolBasin=new T.Mesh(new T.BoxGeometry(6,.4,4),new T.MeshStandardMaterial({color:0x123A4E,roughness:.2}));poolBasin.position.set(-4,totalH+2.8,2);tower.add(poolBasin);
    const poolWater=new T.Mesh(new T.PlaneGeometry(5.6,3.6),new T.MeshPhysicalMaterial({color:0x2EC4D9,roughness:.05,metalness:.1,transmission:.7,ior:1.33,transparent:true,opacity:.85,envMapIntensity:1.4,clearcoat:1}));poolWater.rotation.x=-Math.PI/2;poolWater.position.set(-4,totalH+3.05,2);poolWater.receiveShadow=true;tower.add(poolWater);
    /* pool umbrellas (red + orange) */
    const umbColors=[0xE0453A,0xE08A2A,0xE0453A,0xE08A2A];
    umbColors.forEach((uc,i)=>{const pole=new T.Mesh(new T.CylinderGeometry(.04,1.2,1.8,8),new T.MeshStandardMaterial({color:0xD9D2C2,roughness:.5}));pole.position.set(-1.5+i*1.6,totalH+3.5,3.6);tower.add(pole);
      const umb=new T.Mesh(new T.ConeGeometry(.9,.25,12),new T.MeshStandardMaterial({color:uc,roughness:.7,side:T.DoubleSide}));umb.position.set(-1.5+i*1.6,totalH+4.3,3.6);umb.castShadow=true;tower.add(umb);});

    /* podium (lower 2 floors, warm glow) */
    const podium=new T.Mesh(new T.BoxGeometry(TW+4,6.5,TD+4),new T.MeshStandardMaterial({color:0xC9C2B0,roughness:.7}));podium.position.set(0,3.25,0);podium.castShadow=true;podium.receiveShadow=true;scene.add(podium);
    const podSign=buildSignage(T,'NOVOTEL',1.0);podSign.position.set(0,5,TD/2+2.1);scene.add(podSign);
    const podLight=new T.PointLight(0xFFCE82,0,30,2);podLight.position.set(0,3,12);scene.add(podLight);
    /* street-level warm interior bloom */
    const bloom=new T.PointLight(0xFFB060,0,40,2);bloom.position.set(0,2,16);scene.add(bloom);

    /* adjacent elliptical arena */
    const arena=new T.Mesh(new T.CylinderGeometry(11,11.5,7,32,1,false,0,Math.PI*2),new T.MeshStandardMaterial({color:0x9AA2AB,roughness:.6,metalness:.2}));arena.position.set(28,3.5,-6);arena.castShadow=true;arena.receiveShadow=true;scene.add(arena);
    const arenaRoof=new T.Mesh(new T.SphereGeometry(11.5,32,16,0,Math.PI*2,0,Math.PI/2.4),new T.MeshPhysicalMaterial({color:0x2A4A5A,roughness:.1,metalness:.3,transparent:true,opacity:.6,envMapIntensity:1.2,clearcoat:1}));arenaRoof.position.set(28,7,-6);arenaRoof.castShadow=true;scene.add(arenaRoof);

    /* plaza trees */
    const treeSpots=[[-26,18],[-30,4],[-26,-10],[26,18],[30,4],[26,-10],[-14,28],[14,28],[-34,24],[34,24],[-34,-8],[34,-8]];
    treeSpots.forEach(p=>{const tr=buildTree(T);tr.position.set(p[0],0,p[1]);tr.scale.setScalar(1.1+Math.random()*.3);scene.add(tr);});

    /* parking lot with cars */
    const lotMat=new T.MeshStandardMaterial({color:0x3A3F47,roughness:.9});
    const lot=new T.Mesh(new T.PlaneGeometry(18,12),lotMat);lot.rotation.x=-Math.PI/2;lot.position.set(-32,.04,30);lot.receiveShadow=true;scene.add(lot);
    const lineMat=new T.MeshStandardMaterial({color:0xF2E0AE,roughness:.6});
    for(let r=0;r<4;r++)for(let c=0;c<3;c++){const ln=new T.Mesh(new T.PlaneGeometry(.08,2.2),lineMat);ln.rotation.x=-Math.PI/2;ln.position.set(-36+c*2,-34+r*2.6,30);scene.add(ln);}
    const carCols=[0xFFFFFF,0x1A1A1A,0xC9A85A,0x3A5A85,0x96414F,0x5A8F6A,0xE0453A,0x2A2A2A];
    for(let i=0;i<10;i++){const car=buildCar(T,carCols[i%carCols.length]);car.position.set(-36+(i%3)*2,0,30+Math.floor(i/3)*2.6);car.rotation.y=(i%2?1:-1)*0.08;scene.add(car);}

    /* selection/HUD */
    const hud=document.createElement('div');
    hud.style.cssText='position:absolute;top:14px;left:14px;display:flex;gap:8px;z-index:5;pointer-events:none;flex-wrap:wrap;max-width:55%';
    hud.innerHTML=`<span style="background:rgba(10,20,32,.55);backdrop-filter:blur(8px);color:#E8F0FA;font-size:11px;font-weight:600;padding:6px 12px;border-radius:20px;border:1px solid rgba(120,180,230,.3)">${icon('building')}Novotel Grand Saigon · 22F · 248 keys</span>`;
    stage.appendChild(hud);

    rt={scene,cam,renderer,camC,camT,sun,amb,hemi,fill,glass,floorLights,ribbons,podLight,bloom,sign,sign2,auto:true,autoT:0,time:0,raf:0,ro:null,hud,stage};

    /* controls */
    let down=null,drag=false;const cv=renderer.domElement;
    const wake=()=>{rt.auto=false;clearTimeout(rt.autoT);rt.autoT=setTimeout(()=>{if(rt)rt.auto=true;},8000);};
    cv.addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY,th:rt.camT.th,ph:rt.camT.ph};drag=false;try{cv.setPointerCapture(e.pointerId);}catch(_){}wake();});
    cv.addEventListener('pointermove',e=>{if(down){const dx=e.clientX-down.x,dy=e.clientY-down.y;if(!drag&&Math.hypot(dx,dy)>5)drag=true;if(drag){rt.camT.th=down.th-dx*.004;rt.camT.ph=Math.max(.12,Math.min(1.2,down.ph-dy*.0035));wake();}}});
    cv.addEventListener('pointerup',()=>{down=null;drag=false;});
    cv.addEventListener('wheel',e=>{if(!(e.ctrlKey||e.metaKey))return;e.preventDefault();rt.camT.tr=Math.max(45,Math.min(160,rt.camT.tr*(1+e.deltaY*.001)));wake();},{passive:false});
    rt.ro=new ResizeObserver(()=>{const w=stage.clientWidth,h=Math.max(stage.clientHeight,360);renderer.setSize(w,h);cam.aspect=w/h;cam.updateProjectionMatrix();});rt.ro.observe(stage);
    animateExterior();
  }

  function animateExterior(){
    if(!rt)return;rt.raf=requestAnimationFrame(animateExterior);
    const T=window.THREE;rt.time+=0.016;
    /* day/night cycle (90s loop) */
    const cyc=(rt.time%90)/90;const ang=cyc*Math.PI*2;
    rt.sun.position.set(Math.cos(ang)*70,Math.sin(ang)*85+10,30);
    const day=Math.max(0,Math.sin(ang));const night=Math.max(0,-Math.sin(ang));
    rt.sun.intensity=.15+day*1.2;rt.amb.intensity=.15+day*.28;rt.hemi.intensity=.3+day*.35;
    /* sky colour */
    const skyCol=new T.Color().setHSL(.58,.45,.16+day*.32);rt.scene.background=skyCol;rt.scene.fog.color=skyCol;
    /* warm interior + LED intensities ramp at night */
    rt.floorLights.forEach(fl=>fl.material.emissiveIntensity=night*.55);
    rt.bloom.intensity=night*1.4;rt.podLight.intensity=night*1.2;
    rt.ribbons.forEach(r=>{r.userData.mat.emissiveIntensity=.55+night*1.6+Math.sin(rt.time*2+r.userData.seed)*.15;r.userData.haloMat.opacity=.18+night*.32;});
    /* signage brighter at night */
    [rt.sign,rt.sign2].forEach(s=>s&&s.traverse(c=>{if(c.material)c.material.emissiveIntensity=.8+night*1.8;}));
    /* camera auto-orbit */
    if(rt.auto)rt.camT.th+=0.0014;
    const th=rt.camT.th,ph=rt.camT.ph,tr=rt.camT.tr;
    rt.cam.position.set(Math.sin(th)*Math.cos(ph)*tr,Math.sin(ph)*tr+20,Math.cos(th)*Math.cos(ph)*tr);
    rt.cam.lookAt(0,30,0);
    rt.renderer.render(rt.scene,rt.cam);
  }

  function destroyExterior(){
    if(!rt)return;cancelAnimationFrame(rt.raf);clearTimeout(rt.autoT);rt.ro&&rt.ro.disconnect();
    rt.scene.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{if(m.map)m.map.dispose();m.dispose();});});
    rt.renderer.dispose();rt.renderer.domElement.remove();rt=null;
  }

  /* ---------- FLOOR INTERIOR SCENE ---------- */
  function bootFloor(stage,floorId){
    const T=window.THREE;destroyFloor();
    const f=NOV_FLOORS.find(x=>x.id===floorId)||NOV_FLOORS[0];
    const W=stage.clientWidth,H=Math.max(stage.clientHeight,360);
    const scene=new T.Scene();scene.background=new T.Color(0x0E1620);scene.fog=new T.Fog(0x14212E,18,55);
    const cam=new T.PerspectiveCamera(48,W/H,.1,200);const camC={th:.6,ph:.42,tr:26};const camT={th:camC.th,ph:camC.ph,tr:camC.tr};
    const renderer=new T.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
    renderer.setSize(W,H);renderer.setPixelRatio(Math.min(devicePixelRatio,2));
    renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
    renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
    stage.innerHTML='';stage.appendChild(renderer.domElement);
    scene.environment=envMap(T,renderer);
    const hemi=new T.HemisphereLight(0xC9D8EC,0x3A2A20,.55);scene.add(hemi);
    const sun=new T.DirectionalLight(0xFFE9C0,1.1);sun.position.set(12,18,8);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-18;sun.shadow.camera.right=18;sun.shadow.camera.top=14;sun.shadow.camera.bottom=-14;sun.shadow.camera.near=1;sun.shadow.camera.far=50;scene.add(sun);
    const amb=new T.AmbientLight(0x44557A,.32);scene.add(amb);
    const fill=new T.PointLight(0xFFCE82,.5,18,2);fill.position.set(0,3,0);scene.add(fill);

    buildFloorScene(T,scene,f);

    extRt={scene,cam,renderer,camC,camT,time:0,raf:0,ro:null,auto:true,autoT:0,stage};
    let down=null,drag=false;const cv=renderer.domElement;
    const wake=()=>{extRt.auto=false;clearTimeout(extRt.autoT);extRt.autoT=setTimeout(()=>{if(extRt)extRt.auto=true;},8000);};
    cv.addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY,th:extRt.camT.th,ph:extRt.camT.ph};drag=false;try{cv.setPointerCapture(e.pointerId);}catch(_){}wake();});
    cv.addEventListener('pointermove',e=>{if(down){const dx=e.clientX-down.x,dy=e.clientY-down.y;if(!drag&&Math.hypot(dx,dy)>5)drag=true;if(drag){extRt.camT.th=down.th-dx*.005;extRt.camT.ph=Math.max(.15,Math.min(1.3,down.ph-dy*.004));wake();}}});
    cv.addEventListener('pointerup',()=>{down=null;drag=false;});
    cv.addEventListener('wheel',e=>{if(!(e.ctrlKey||e.metaKey))return;e.preventDefault();extRt.camT.tr=Math.max(12,Math.min(45,extRt.camT.tr*(1+e.deltaY*.0012)));wake();},{passive:false});
    extRt.ro=new ResizeObserver(()=>{const w=stage.clientWidth,h=Math.max(stage.clientHeight,360);renderer.setSize(w,h);cam.aspect=w/h;cam.updateProjectionMatrix();});extRt.ro.observe(stage);
    animateFloor();
  }
  function animateFloor(){
    if(!extRt)return;extRt.raf=requestAnimationFrame(animateFloor);extRt.time+=0.016;
    if(extRt.auto)extRt.camT.th+=0.0016;
    const th=extRt.camT.th,ph=extRt.camT.ph,tr=extRt.camT.tr;
    extRt.cam.position.set(Math.sin(th)*Math.cos(ph)*tr,Math.sin(ph)*tr+3,Math.cos(th)*Math.cos(ph)*tr);
    extRt.cam.lookAt(0,1.5,0);
    extRt.renderer.render(extRt.scene,extRt.cam);
  }
  function destroyFloor(){
    if(!extRt)return;cancelAnimationFrame(extRt.raf);clearTimeout(extRt.autoT);extRt.ro&&extRt.ro.disconnect();
    extRt.scene.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{if(m.map)m.map.dispose();m.dispose();});});
    extRt.renderer.dispose();extRt.renderer.domElement.remove();extRt=null;
  }

  /* floor-scene builder — different layout per floor */
  function buildFloorScene(T,scene,f){
    const m={
      floor:new T.MeshStandardMaterial({color:0xE8E2D4,roughness:.4,metalness:.1}),
      floor2:new T.MeshStandardMaterial({color:0x3A4A5A,roughness:.5}),
      wall:new T.MeshStandardMaterial({color:0xDED8C8,roughness:.85}),
      wallDark:new T.MeshStandardMaterial({color:0x9A9484,roughness:.8}),
      glass:new T.MeshPhysicalMaterial({color:0x2A4A5A,roughness:.05,metalness:.1,transparent:true,opacity:.4,envMapIntensity:1.3,clearcoat:1,transmission:.2,ior:1.4}),
      wood:new T.MeshStandardMaterial({color:0x8A6A3E,roughness:.6}),
      darkwood:new T.MeshStandardMaterial({color:0x4A3420,roughness:.55}),
      fabric:new T.MeshStandardMaterial({color:0x6A8FA8,roughness:.85}),
      fabric2:new T.MeshStandardMaterial({color:0xA86A8A,roughness:.85}),
      metal:new T.MeshStandardMaterial({color:0x9A9A9A,metalness:.8,roughness:.3}),
      white:new T.MeshStandardMaterial({color:0xF4F1EB,roughness:.7}),
      gold:new T.MeshStandardMaterial({color:0xC9A85A,metalness:.7,roughness:.35,emissive:0xC9A85A,emissiveIntensity:.05}),
      bulb:new T.MeshStandardMaterial({color:0xFFF4D0,emissive:0xFFE9A0,emissiveIntensity:.8}),
    };
    /* shell — floor, ceiling, 4 walls with one glass window-wall */
    const R=14;const floor=new T.Mesh(new T.PlaneGeometry(R*2,R*2),m.floor);floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;scene.add(floor);
    const ceil=new T.Mesh(new T.PlaneGeometry(R*2,R*2),m.white);ceil.rotation.x=Math.PI/2;ceil.position.y=3.4;scene.add(ceil);
    const wN=new T.Mesh(new T.BoxGeometry(R*2,3.4,.2),m.wall);wN.position.set(0,1.7,-R);wN.receiveShadow=true;scene.add(wN);
    const wS=new T.Mesh(new T.BoxGeometry(R*2,3.4,.2),m.glass);wS.position.set(0,1.7,R);scene.add(wS);
    const wE=new T.Mesh(new T.BoxGeometry(.2,3.4,R*2),m.wall);wE.position.set(R,1.7,0);scene.add(wE);
    const wW=new T.Mesh(new T.BoxGeometry(.2,3.4,R*2),m.wall);wW.position.set(-R,1.7,0);scene.add(wW);
    /* warm downlights */
    for(let i=-2;i<=2;i++){const pl=new T.PointLight(0xFFD9A0,.4,10,2);pl.position.set(i*5,3,0);scene.add(pl);
      const fix=new T.Mesh(new T.CylinderGeometry(.18,.18,.08,12),m.gold);fix.position.set(i*5,3.3,0);scene.add(fix);}

    if(f.id==='2F'){
      /* GRAND BALLROOM — round tables, stage, chandelier */
      const tables=[[-9,-6],[-3,-6],[3,-6],[9,-6],[-9,0],[-3,0],[3,0],[9,0],[-9,6],[-3,6],[3,6],[9,6],[-6,-3],[0,-3],[6,-3],[-6,3],[0,3],[6,3],[-9,-3],[9,3],[-9,3],[9,-3],[0,0],[6,0]];
      tables.forEach(p=>{const t=new T.Mesh(new T.CylinderGeometry(.85,.85,.05,18),m.darkwood);t.position.set(p[0],.5,p[1]);t.castShadow=true;t.receiveShadow=true;scene.add(t);
        const cl=new T.Mesh(new T.CylinderGeometry(.12,.12,1.1,8),m.white);cl.position.set(p[0],1.05,p[1]);scene.add(cl);
        const top=new T.Mesh(new T.BoxGeometry(.3,.05,.3),m.gold);top.position.set(p[0],1.6,p[1]);scene.add(top);
        for(let s=0;s<8;s++){const a=s/8*Math.PI*2;const ch=new T.Mesh(new T.CylinderGeometry(.16,.18,.45,10),m.fabric);ch.position.set(p[0]+Math.cos(a)*1.4,.45,p[1]+Math.sin(a)*1.4);ch.castShadow=true;scene.add(ch);}});
      /* stage */
      const stage=new T.Mesh(new T.BoxGeometry(10,.4,3),m.darkwood);stage.position.set(0,.2,-R+2.5);stage.castShadow=true;scene.add(stage);
      const sWall=new T.Mesh(new T.BoxGeometry(10,2,.1),m.white);sWall.position.set(0,1.4,-R+.3);scene.add(sWall);
      const screen=new T.Mesh(new T.PlaneGeometry(7,1.8),new T.MeshStandardMaterial({color:0x101820,emissive:0x1A4A6A,emissiveIntensity:.5}));screen.position.set(0,1.6,-R+.25);scene.add(screen);
      /* chandelier */
      const ch=new T.Group();for(let r=0;r<3;r++){const ring=new T.Mesh(new T.TorusGeometry(1+r*.5,.04,8,24),m.gold);ring.position.y=2.8;ring.rotation.x=Math.PI/2;ch.add(ring);
        for(let i=0;i<12;i++){const a=i/12*Math.PI*2;const drop=new T.Mesh(new T.SphereGeometry(.06,6,6),m.bulb);drop.position.set((1+r*.5)*Math.cos(a),2.5-r*.1,(1+r*.5)*Math.sin(a));ch.add(drop);}}
      ch.position.set(0,0,2);scene.add(ch);
    } else if(f.id==='1F'){
      /* GROUND — lobby reception, restaurant tables, kitchen */
      const desk=new T.Mesh(new T.BoxGeometry(5,.9,.6),m.darkwood);desk.position.set(0,.45,-R+3);desk.castShadow=true;scene.add(desk);
      const deskTop=new T.Mesh(new T.BoxGeometry(5.2,.08,.7),m.gold);deskTop.position.set(0,.92,-R+3);scene.add(deskTop);
      for(let i=-1;i<=1;i++){const pc=new T.Mesh(new T.BoxGeometry(.5,.04,.35),new T.MeshStandardMaterial({color:0x101820,emissive:0x1A3A6A,emissiveIntensity:.3}));pc.position.set(i*1.5,.96,-R+3);scene.add(pc);
        const lamp=new T.Mesh(new T.CylinderGeometry(.15,.18,.35,10),m.gold);lamp.position.set(i*2,.7,-R+3.3);scene.add(lamp);}
      /* restaurant tables */
      const rTables=[[-9,2],[-6,2],[-3,2],[3,2],[6,2],[9,2],[-9,5],[-6,5],[3,5],[6,5],[-7.5,-3],[-4.5,-3],[-1.5,-3],[1.5,-3],[4.5,-3],[7.5,-3]];
      rTables.forEach(p=>{const t=new T.Mesh(new T.CylinderGeometry(.5,.5,.05,14),m.darkwood);t.position.set(p[0],.5,p[1]);t.castShadow=true;scene.add(t);
        for(let s=0;s<4;s++){const a=s/4*Math.PI*2+Math.PI/4;const ch=new T.Mesh(new T.CylinderGeometry(.14,.16,.4,8),m.fabric2);ch.position.set(p[0]+Math.cos(a)*.7,.3,p[1]+Math.sin(a)*.7);ch.castShadow=true;scene.add(ch);}});
      /* kitchen counter */
      const counter=new T.Mesh(new T.BoxGeometry(6,.9,.6),m.metal);counter.position.set(8,.45,-6);counter.castShadow=true;scene.add(counter);
      const pass=new T.Mesh(new T.BoxGeometry(6,.08,.7),m.gold);pass.position.set(8,.92,-6);scene.add(pass);
      /* sofa lounge */
      const sofa=new T.Mesh(new T.BoxGeometry(3,.5,.9),m.fabric);sofa.position.set(-9,.25,6);sofa.castShadow=true;scene.add(sofa);
      const sofaB=new T.Mesh(new T.BoxGeometry(3,.6,.25),m.fabric);sofaB.position.set(-9,.5,6.5);scene.add(sofaB);
      /* planter */
      const planter=new T.Mesh(new T.CylinderGeometry(.6,.7,.5,12),m.darkwood);planter.position.set(0,.25,5);planter.castShadow=true;scene.add(planter);
      const plant=new T.Mesh(new T.SphereGeometry(.7,12,10),new T.MeshStandardMaterial({color:0x3F6B2E,roughness:.95}));plant.position.set(0,.8,5);plant.castShadow=true;scene.add(plant);
    } else if(f.id==='3F'){
      /* MEETING ROOMS — subdivided rooms with boardroom tables */
      const dividers=[[-7,0],[-2,0],[3,0],[8,0]];
      dividers.forEach(d=>{const dv=new T.Mesh(new T.BoxGeometry(.2,3.4,16),m.wall);dv.position.set(d[0],1.7,0);dv.receiveShadow=true;scene.add(dv);});
      const rooms=[[[-11,-4],2,4,6],[[-4.5,-4],4,6,4],[[0.5,-4],4,6,6],[[5.5,-4],4,4,4],[[-11,4],2,4,4],[[-4.5,4],4,6,8],[[0.5,4],4,6,4],[[5.5,4],4,4,6]];
      rooms.forEach(r=>{const[cx,cz,wl,dl,ch]=r;const t=new T.Mesh(new T.BoxGeometry(wl,.05,dl),m.darkwood);t.position.set(cx,.5,cz);t.castShadow=true;scene.add(t);
        for(let i=0;i<ch;i++){const a=i/ch*Math.PI*2;const seat=new T.Mesh(new T.CylinderGeometry(.18,.2,.4,10),m.fabric);seat.position.set(cx+Math.cos(a)*(wl/2-.5),.3,cz+Math.sin(a)*(dl/2-.5));seat.castShadow=true;scene.add(seat);}});
      /* boardroom big table */
      const bt=new T.Mesh(new T.BoxGeometry(4,.05,1.4),m.darkwood);bt.position.set(-4.5,.5,4);bt.castShadow=true;scene.add(bt);
      for(let i=0;i<6;i++){const seat=new T.Mesh(new T.BoxGeometry(.4,.4,.05),m.fabric);seat.position.set(-4.5+(-2+i)*.7,.3,3.5);scene.add(seat);
        const s2=seat.clone();s2.position.z=4.5;s2.rotation.y=Math.PI;scene.add(s2);}
      /* screen on far wall */
      const scr=new T.Mesh(new T.PlaneGeometry(3,1.4),new T.MeshStandardMaterial({color:0x101820,emissive:0x1A4A6A,emissiveIntensity:.45}));scr.position.set(-4.5,1.7,-R+.2);scene.add(scr);
    } else if(f.id==='4F'){
      /* POOL DECK + guest rooms */
      const poolBasin=new T.Mesh(new T.BoxGeometry(7,.4,5),new T.MeshStandardMaterial({color:0x123A4E,roughness:.2}));poolBasin.position.set(5,.2,5);scene.add(poolBasin);
      const poolWater=new T.Mesh(new T.PlaneGeometry(6.6,4.6),new T.MeshPhysicalMaterial({color:0x2EC4D9,roughness:.05,metalness:.1,transmission:.7,ior:1.33,transparent:true,opacity:.85,envMapIntensity:1.4,clearcoat:1}));poolWater.rotation.x=-Math.PI/2;poolWater.position.set(5,.45,5);poolWater.receiveShadow=true;scene.add(poolWater);
      /* loungers */
      for(let i=0;i<6;i++){const lr=new T.Mesh(new T.BoxGeometry(.6,.15,1.8),m.fabric);lr.position.set(-2+i*.9,.15,8);lr.castShadow=true;scene.add(lr);
        const post=new T.Mesh(new T.CylinderGeometry(.04,1.2,1.8,8),m.gold);post.position.set(-2+i*.9,.7,8.5);scene.add(post);
        const umb=new T.Mesh(new T.ConeGeometry(.9,.25,12),new T.MeshStandardMaterial({color:[0xE0453A,0xE08A2A,0x2E86AB][i%3],roughness:.7,side:T.DoubleSide}));umb.position.set(-2+i*.9,1.5,8.5);umb.castShadow=true;scene.add(umb);}
      /* pool bar */
      const bar=new T.Mesh(new T.BoxGeometry(2,.8,.6),m.darkwood);bar.position.set(9,.4,5);bar.castShadow=true;scene.add(bar);
      const barTop=new T.Mesh(new T.BoxGeometry(2.2,.08,.7),m.gold);barTop.position.set(9,.84,5);scene.add(barTop);
      for(let i=0;i<3;i++){const st=new T.Mesh(new T.CylinderGeometry(.16,.18,.5,12),m.metal);st.position.set(10.5,.25,4+i*.8);st.castShadow=true;scene.add(st);}
      /* guest room block (north) */
      const roomWall=new T.Mesh(new T.BoxGeometry(.2,3.4,12),m.wall);roomWall.position.set(-6,1.7,0);scene.add(roomWall);
      for(let i=0;i<4;i++){const bed=new T.Mesh(new T.BoxGeometry(1.6,.35,2),m.fabric);bed.position.set(-9+i*1.8,.5,-4);bed.castShadow=true;scene.add(bed);
        const head=new T.Mesh(new T.BoxGeometry(1.8,.6,.1),m.darkwood);head.position.set(-9+i*1.8,.65,-5);scene.add(head);
        const nt=new T.Mesh(new T.CylinderGeometry(.15,.18,.4,10),m.gold);nt.position.set(-9+i*1.8-.6,.5,-3.1);scene.add(nt);}
    } else { /* TF — technical floor */
      const chiller=new T.Mesh(new T.BoxGeometry(3,2.4,1.6),m.metal);chiller.position.set(-8,1.2,-6);chiller.castShadow=true;scene.add(chiller);
      for(let i=0;i<3;i++){const fan=new T.Mesh(new T.CylinderGeometry(.5,.5,.2,16),new T.MeshStandardMaterial({color:0x2A2A2A,metalness:.6,roughness:.4}));fan.position.set(-8+i*1,-.0,-5.2);fan.rotation.x=Math.PI/2;scene.add(fan);}
      const pump=new T.Mesh(new T.CylinderGeometry(.6,.6,1.2,14),m.metal);pump.position.set(2,.6,-6);pump.castShadow=true;scene.add(pump);
      const tank=new T.Mesh(new T.CylinderGeometry(1.2,1.2,2.2,16),new T.MeshStandardMaterial({color:0x4A6A7A,roughness:.4,metalness:.4}));tank.position.set(8,1.1,-6);tank.castShadow=true;scene.add(tank);
      const server=new T.Mesh(new T.BoxGeometry(2.5,2,1),new T.MeshStandardMaterial({color:0x1A1A1A,roughness:.5}));server.position.set(-8,1,-2);server.castShadow=true;scene.add(server);
      for(let i=0;i<6;i++){const led=new T.Mesh(new T.BoxGeometry(.04,.04,.04),new T.MeshStandardMaterial({color:0x00FF66,emissive:0x00FF44,emissiveIntensity:1.5}));led.position.set(-9.2,1.6+i*.3,-1.5);scene.add(led);
        const led2=led.clone();led2.position.set(-9.2,1.6+i*.3,-1.4);led2.material=new T.MeshStandardMaterial({color:0xFF3322,emissive:0xFF2211,emissiveIntensity:1.2});scene.add(led2);}
      const locker=new T.Mesh(new T.BoxGeometry(4,1.8,.5),m.metal);locker.position.set(6,.9,2);locker.castShadow=true;scene.add(locker);
      for(let i=0;i<8;i++){const door=new T.Mesh(new T.BoxGeometry(.4,1.6,.04),m.white);door.position.set(4.5+i*.45,.9,1.75);scene.add(door);}
      /* pipe runs */
      for(let i=0;i<4;i++){const pipe=new T.Mesh(new T.CylinderGeometry(.12,.12,16,10),new T.MeshStandardMaterial({color:0x8A8A6A,metalness:.5,roughness:.4}));pipe.rotation.z=Math.PI/2;pipe.position.set(0,2.8+i*.3,-8);scene.add(pipe);}
    }
  }

  function boot(){
    const stage=document.getElementById('nov3d-stage');if(!stage)return;
    if(!window.THREE){
      stage.innerHTML='<div class="hk3d-boot"><div class="hk3d-boot-ring"></div><b>Composing the Novotel twin…</b><small>WebGL engine loading</small></div>';
      withThree(ok=>{if(ok)start();else stage.innerHTML='<div style="padding:30px;color:var(--mut)">Three.js failed to load.</div>';});
    } else start();
  }
  function start(){
    const stage=document.getElementById('nov3d-stage');
    if(mode==='exterior')bootExterior(stage);else bootFloor(stage,curFloor);
  }
  function setView(az,ph){const r=mode==='exterior'?rt:extRt;if(r){r.camT.th=az*Math.PI/180;r.camT.ph=ph*Math.PI/180;}}
  function selectFloor(id){curFloor=id;mode='floor';const stage=document.getElementById('nov3d-stage');if(stage&&window.THREE)bootFloor(stage,id);}
  function showExterior(){mode='exterior';const stage=document.getElementById('nov3d-stage');if(stage&&window.THREE)bootExterior(stage);}
  function destroy(){destroyExterior();destroyFloor();}
  return {boot,destroy,setView,selectFloor,showExterior,floors:NOV_FLOORS,get mode(){return mode;}};
})();

/* ============================================================
   VIEW · 3D FLOOR PLANS
   ============================================================ */
const ROOM_SEL=[
  {v:'studio',l:'Studio',ic:'bed',sub:'28 m² · queen'},
  {v:'deluxe',l:'Deluxe',ic:'bed',sub:'42 m² · king'},
  {v:'suite',l:'Suite',ic:'building',sub:'68 m² · king'},
  {v:'onebhk',l:'1 BHK',ic:'home',sub:'58 m² · queen'},
];
VIEWS.floorplan = () => `
  <div class="row">
    <div class="c-8 rise">
      <div class="card room3d-card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">In-house 3D floor plans</div><div class="card-sub">Ultra-realistic interiors · every asset inventoried</div></div>
          <div class="chips" id="room-type-chips">
            ${ROOM_SEL.map(r=>`<button class="chip ${r.v==='studio'?'on':''}" data-room="${r.v}">${icon(r.ic)}${r.l}</button>`).join('')}
          </div></div>
        <div class="hk3d-stage room3d-stage" id="room3d-stage"></div>
      </div>
      <div class="card">
        <div class="card-h"><div><div class="card-title">Floor plan controls</div><div class="card-sub">Navigate the interior</div></div></div>
        <div class="card-body" style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px">
          <button class="btn-ghost" data-action="room-view" data-az="45" data-ph="45">${icon('eye')}Perspective</button>
          <button class="btn-ghost" data-action="room-view" data-az="0" data-ph="89">${icon('layers')}Top-down</button>
          <button class="btn-ghost" data-action="room-view" data-az="0" data-ph="12">${icon('monitor')}Front</button>
          <button class="btn-ghost" data-action="room-view" data-az="90" data-ph="12">${icon('monitor')}Side</button>
        </div>
      </div>
    </div>
    <div class="c-4 rise rise-1">
      <div class="card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">Room specification</div><div class="card-sub">Live from the 3D plan</div></div>
          <span class="tag tag-gold">3D</span></div>
        <div class="card-body" id="room-info">
          <div class="hk-rp-empty"><span class="hk-rp-ic">${icon('bed')}</span><b>Loading plan…</b><small>Composing the interior.</small></div>
        </div>
      </div>
      <div class="card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">Asset inspector</div><div class="card-sub">Click any furniture in the plan</div></div>
          <span class="tag tag-gold">Inventory</span></div>
        <div class="card-body" id="room-asset">
          <div class="hk-rp-empty"><span class="hk-rp-ic">${icon('package')}</span><b>Select an asset</b><small>Click any furniture in the 3D plan to inspect it.</small></div>
        </div>
      </div>
      <div class="card">
        <div class="card-h"><div><div class="card-title">Plan stats</div><div class="card-sub">Furniture count by category</div></div></div>
        <div class="card-body" style="display:flex;flex-direction:column;gap:8px">
          ${[['Bedroom','bed',4],['Living','sofa',6],['Kitchen','coffee',4],['Bathroom','droplet',3],['Decor','sparkles',6],['Lighting','bulb',4]].map(c=>`
            <div style="display:flex;align-items:center;gap:10px"><span style="width:28px;height:28px;border-radius:8px;display:grid;place-items:center;background:var(--gold-grad-soft);color:var(--gold-deep)">${icon(c[1])}</span>
            <span style="flex:1;font-size:12px">${c[0]}</span><b class="num" style="font-family:var(--font-d)">${c[2]}</b></div>`).join('')}
        </div>
      </div>
    </div>
  </div>`;
INIT.floorplan=()=>{
  ROOM3D.boot('studio');
  $$('[data-room]').forEach(b=>b.addEventListener('click',()=>{
    $$('[data-room]').forEach(x=>x.classList.toggle('on',x===b));
    ROOM3D.setType(b.dataset.room);
  }));
  $$('[data-action="room-view"]').forEach(b=>b.addEventListener('click',()=>{
    ROOM3D.setView(+b.dataset.az,+b.dataset.ph);
  }));
};

/* ============================================================
   VIEW · INVENTORY
   ============================================================ */
const INV_CATS=['All','Bedroom','Living','Dining','Electronics','Kitchen','Bathroom','Lighting','Decor','Storage'];
VIEWS.inventory = () => {
  const total=INVENTORY.reduce((a,i)=>a+i.qty,0);
  const valTotal=INVENTORY.reduce((a,i)=>a+parseFloat(i.val.replace(/[$,]/g,'')),0);
  const cats={}; INVENTORY.forEach(i=>{ cats[i.cat]=(cats[i.cat]||0)+i.qty; });
  const roomsByFloor={}; ROOMS.forEach(r=>{const f=Math.floor(r.n/100);(roomsByFloor[f]=roomsByFloor[f]||[]).push(r);});
  const statusDot={clean:'#6FCF97',occupied:'#5B9BD5',dirty:'#F0A45A',maintenance:'#E06B6B'};
  return `
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:14px" class="rise">
    ${[['Total assets',total,'items','package','green'],['Categories',Object.keys(cats).length,'groups','layers','gold'],
       ['Asset value','$'+(valTotal/1000).toFixed(1)+'k','book value','dollar','blue'],['Rooms',ROOMS.length,'inspected','building','green']].map(k=>`
      <div class="card kpi-card" style="padding:14px 16px">
        <div class="kpi-top"><span class="kpi-ic" style="color:var(--${k[4]});background:var(--${k[4]}-soft)">${icon(k[3])}</span>
          <span class="kpi-label">${k[0]}</span></div>
        <div class="kpi-value"><span data-count="${k[1]}" data-suffix="">0</span></div>
        <div class="kpi-note" style="margin-top:6px">${k[2]}</div>
      </div>`).join('')}
  </div>

  <div class="card rise" style="margin-bottom:14px">
    <div class="card-h"><div><div class="card-title">Room inventory · 3D floor plan</div><div class="card-sub">Click any room to open its ultra-realistic 3D interior & inspect assets</div></div>
      <div class="chips"><span class="tag tag-gold">${ROOMS.filter(r=>r.status==='clean').length} ready</span><span class="tag tag-blue">${ROOMS.filter(r=>r.status==='occupied').length} occupied</span><span class="tag tag-amber">${ROOMS.filter(r=>r.status==='dirty').length} dirty</span><span class="tag tag-red">${ROOMS.filter(r=>r.status==='maintenance').length} maintenance</span></div></div>
    <div class="card-body">
      ${Object.keys(roomsByFloor).sort().map(f=>`
        <div style="margin-bottom:14px">
          <div style="font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--mut);margin-bottom:8px">Floor ${f}</div>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px">
            ${roomsByFloor[f].map(r=>{const st=ROOM_STATUS[r.status];const tm=ROOM_TYPE_META[r.type];return `
              <button class="room-tile" data-room="${r.n}" data-type="${r.type}" style="text-align:left;padding:12px;border-radius:14px;background:var(--surface-2);border:1px solid var(--line);cursor:pointer;transition:all .2s">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
                  <b style="font-size:15px">${r.n}</b>
                  <span style="width:10px;height:10px;border-radius:50%;background:${statusDot[r.status]}"></span>
                </div>
                <div style="font-size:11.5px;color:var(--ink-2);font-weight:600">${tm[0]}</div>
                <div style="font-size:10px;color:var(--mut);margin-top:2px">${tm[1]}</div>
                <div style="margin-top:8px"><span class="tag ${st[1]}" style="font-size:9.5px;padding:2px 7px">${st[0]}</span></div>
              </button>`;}).join('')}
          </div>
        </div>`).join('')}
    </div>
  </div>

  <div class="row">
    <div class="c-8 rise">
      <div class="card room3d-card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title" id="inv-room-title">Room interior · 3D</div><div class="card-sub" id="inv-room-sub">Select a room above to load its interior</div></div>
          <div class="chips" id="room-type-chips">
            ${['studio','deluxe','suite','onebhk'].map(r=>`<button class="chip" data-room-type="${r}">${icon('bed')}${ROOM_TYPE_META[r][0]}</button>`).join('')}
          </div></div>
        <div class="hk3d-stage room3d-stage" id="room3d-stage"></div>
      </div>
      <div class="card">
        <div class="card-h"><div><div class="card-title">Interior controls</div><div class="card-sub">Navigate the luxury interior</div></div></div>
        <div class="card-body" style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px">
          <button class="btn-ghost" data-action="room-view" data-az="45" data-ph="45">${icon('eye')}Perspective</button>
          <button class="btn-ghost" data-action="room-view" data-az="0" data-ph="89">${icon('layers')}Top-down</button>
          <button class="btn-ghost" data-action="room-view" data-az="0" data-ph="12">${icon('monitor')}Front</button>
          <button class="btn-ghost" data-action="room-view" data-az="90" data-ph="12">${icon('monitor')}Side</button>
        </div>
      </div>
    </div>
    <div class="c-4 rise rise-1">
      <div class="card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">Room specification</div><div class="card-sub">Live from the 3D interior</div></div>
          <span class="tag tag-gold">3D</span></div>
        <div class="card-body" id="room-info">
          <div class="hk-rp-empty"><span class="hk-rp-ic">${icon('bed')}</span><b>Select a room</b><small>Pick a room tile above to view its 3D interior.</small></div>
        </div>
      </div>
      <div class="card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">Asset inspector</div><div class="card-sub">Click any furniture in the 3D plan</div></div>
          <span class="tag tag-gold">Inventory</span></div>
        <div class="card-body" id="room-asset">
          <div class="hk-rp-empty"><span class="hk-rp-ic">${icon('package')}</span><b>Select an asset</b><small>Click any furniture in the 3D interior to inspect it.</small></div>
        </div>
      </div>
    </div>
  </div>

  <div class="card rise rise-1" style="margin-top:14px;padding:0;overflow:hidden">
    <div class="card-h"><div><div class="card-title">Asset register</div><div class="card-sub">Every furnishing & appliance across the property</div></div>
      <div class="chips" id="inv-cats">${INV_CATS.map((c,i)=>`<button class="chip ${i===0?'on':''}" data-invcat="${c}">${c}</button>`).join('')}</div></div>
    <div style="padding:6px 8px 14px">
      <table class="tbl" id="inv-table">
        <thead><tr><th>Item</th><th>Category</th><th>SKU</th><th>Qty</th><th>Condition</th><th>Acquired</th><th>Unit value</th><th></th></tr></thead>
        <tbody>${INVENTORY.map(i=>`
          <tr data-cat="${i.cat}">
            <td><div class="cell-main"><span class="av av-32 av-2" style="background:var(--gold-grad-soft);color:var(--gold-deep)">${icon('package')}</span>
              <div><b>${i.item}</b><div class="cm-meta">${i.note}</div></div></div></td>
            <td><span class="tag tag-grey">${i.cat}</span></td>
            <td class="num" style="font-family:var(--font-mono,monospace);font-size:11.5px">${i.sku}</td>
            <td class="num">${i.qty}</td>
            <td><span class="tag ${i.cond==='Excellent'?'tag-green':'tag-amber'}">${i.cond}</span></td>
            <td>${i.acq}</td>
            <td class="num">${i.val}</td>
            <td style="text-align:right"><button class="icon-btn" data-action="toast" data-t="${i.item}" data-s="SKU ${i.sku} · ${i.qty} units">${icon('chevronRight')}</button></td>
          </tr>`).join('')}</tbody>
      </table>
    </div>
  </div>`;
};
INIT.inventory=()=>{
  let curType='studio';
  const loadRoom=(type,roomNum)=>{
    curType=type;
    ROOM3D.boot(type);
    $$('[data-room-type]').forEach(x=>x.classList.toggle('on',x.dataset.roomType===type));
    const tm=ROOM_TYPE_META[type];
    const info=$('#room-info');
    if(info&&roomNum){const r=ROOMS.find(x=>x.n===roomNum);const st=ROOM_STATUS[r.status];info.innerHTML=`<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px"><span style="width:36px;height:36px;border-radius:10px;display:grid;place-items:center;background:var(--gold-grad-soft);color:var(--gold-deep)">${icon('bed')}</span><div><b style="display:block">Room ${r.n} · ${tm[0]}</b><small style="color:var(--mut)">${tm[1]} · ${st[0]}</small></div></div><div style="display:flex;justify-content:space-between;padding:6px 0;border-top:1px solid var(--line)"><span style="color:var(--mut)">Guest</span><b>${r.guest}</b></div>`;}
    else if(info){info.innerHTML=`<div style="display:flex;align-items:center;gap:10px"><span style="width:36px;height:36px;border-radius:10px;display:grid;place-items:center;background:var(--gold-grad-soft);color:var(--gold-deep)">${icon('bed')}</span><div><b style="display:block">${tm[0]}</b><small style="color:var(--mut)">${tm[1]}</small></div></div>`;}
    const t=$('#inv-room-title');if(t)t.textContent=roomNum?`Room ${roomNum} · ${tm[0]} interior`:`${tm[0]} interior`;
    const s=$('#inv-room-sub');if(s)s.textContent=roomNum?'Click furniture to inspect assets · drag to orbit':'Select a room tile to load a specific room';
  };
  $$('[data-room]').forEach(b=>b.addEventListener('click',()=>{
    const n=+b.dataset.room,type=b.dataset.type;
    $$('[data-room]').forEach(x=>x.style.outline=(x===b)?'2px solid var(--gold)':'none');
    loadRoom(type,n);
  }));
  $$('[data-room-type]').forEach(b=>b.addEventListener('click',()=>loadRoom(b.dataset.roomType,null)));
  $$('[data-action="room-view"]').forEach(b=>b.addEventListener('click',()=>ROOM3D.setView(+b.dataset.az,+b.dataset.ph)));
  $$('[data-invcat]').forEach(b=>b.addEventListener('click',()=>{
    $$('[data-invcat]').forEach(x=>x.classList.toggle('on',x===b));
    const cat=b.dataset.invcat;
    $$('#inv-table tbody tr').forEach(r=>{ r.style.display=(cat==='All'||r.dataset.cat===cat)?'':'none'; });
  }));
  // auto-load the first clean room on entry
  const first=ROOMS.find(r=>r.status==='clean')||ROOMS[0];
  $$('[data-room]').forEach(x=>x.style.outline=(+x.dataset.room===first.n)?'2px solid var(--gold)':'none');
  loadRoom(first.type,first.n);
};

/* ============================================================
   VIEW · HOSPITALITY TV (fleet control · greetings · broadcast)
   ============================================================ */
const TV_MODELS=['Samsung 55" Hospitality','LG 43" Pro:Centric','Philips 50" MediaSuite'];
const TVS=ROOMS.map((r,i)=>({
  room:r.n,guest:r.guest,type:r.type,
  st:r.status==='occupied'?'online':(i%6===4?'offline':'standby'),
  model:TV_MODELS[i%3],fw:'v8.4.'+(i%4),
  vol:12+(i*7)%20,ch:1+(i*3)%48,
  input:['Live TV','Casting','HDMI 1'][i%3],
  greet:r.status==='occupied',
}));
const TV_STATUS={online:['Online','#6FCF97','tag-green'],standby:['Standby','#F0A45A','tag-amber'],offline:['Offline','#E06B6B','tag-red']};
const TV_GREET={
  tpl:`Welcome, {guest}\nWe're delighted to host you at {hotel}.\nYour suite {room} is ready — enjoy your stay.`,
  lang:'EN',dur:'until-dismissed',weather:true,checkout:true,
};
function tvGreetText(sample){
  const p=activeProperty();
  return TV_GREET.tpl
    .replace(/\{guest\}/g,sample.guest||'Honoured Guest')
    .replace(/\{hotel\}/g,p.name)
    .replace(/\{room\}/g,sample.room||'—');
}
VIEWS.hospitalitytv = () => {
  const on=TVS.filter(t=>t.st==='online').length, off=TVS.filter(t=>t.st==='offline').length, sb=TVS.length-on-off;
  const byFloor={}; TVS.forEach(t=>{const f=Math.floor(t.room/100);(byFloor[f]=byFloor[f]||[]).push(t);});
  const kpis=[['Fleet TVs',TVS.length,'screens','monitor','gold'],['Online now',on,'streaming','wifi','green'],['Standby',sb,'power-save','moon','blue'],['Offline',off,'need attention','alert','red']];
  return `
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:14px" class="rise">
    ${kpis.map(k=>`
      <div class="card kpi-card" style="padding:14px 16px">
        <div class="kpi-top"><span class="kpi-ic" style="color:var(--${k[4]});background:var(--${k[4]}-soft)">${icon(k[3])}</span>
          <span class="kpi-label">${k[0]}</span></div>
        <div class="kpi-value"><span data-count="${k[1]}">0</span></div>
        <div class="kpi-note" style="margin-top:6px">${k[2]}</div>
      </div>`).join('')}
  </div>

  <div class="row">
    <div class="c-8 rise">
      <div class="card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">TV fleet · by floor</div><div class="card-sub">Select a screen to control power, volume, channel & input</div></div>
          <div class="chips"><span class="tag tag-green">${on} online</span><span class="tag tag-amber">${sb} standby</span><span class="tag tag-red">${off} offline</span></div></div>
        <div class="card-body">
          ${Object.keys(byFloor).sort().map(f=>`
            <div style="margin-bottom:12px">
              <div style="font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--mut);margin-bottom:8px">Floor ${f}</div>
              <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px">
                ${byFloor[f].map(t=>{const st=TV_STATUS[t.st];return `
                  <button class="room-tile" data-tv="${t.room}" style="text-align:left;padding:12px;border-radius:14px;background:var(--surface-2);border:1px solid var(--line);cursor:pointer;transition:all .2s">
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
                      <b style="font-size:14px">${t.room}</b>
                      <span data-tv-dot="${t.room}" style="width:10px;height:10px;border-radius:50%;background:${st[1]}"></span>
                    </div>
                    <div style="font-size:11px;color:var(--ink-2);font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${t.guest!=='—'?t.guest:'Vacant'}</div>
                    <div style="font-size:10px;color:var(--mut);margin-top:2px">${t.model.split(' ')[0]} · ${t.input}</div>
                    <div style="margin-top:8px;display:flex;gap:6px;align-items:center">
                      <span class="tag ${st[2]}" data-tv-tag="${t.room}" style="font-size:9.5px;padding:2px 7px">${st[0]}</span>
                      ${t.greet?`<span class="tag tag-gold" style="font-size:9.5px;padding:2px 7px">${icon('sparkles')}Greeting</span>`:''}
                    </div>
                  </button>`;}).join('')}
              </div>
            </div>`).join('')}
        </div>
      </div>
    </div>
    <div class="c-4 rise rise-1">
      <div class="card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">Screen control</div><div class="card-sub" id="tv-ctl-sub">Remote for selected TV</div></div>
          <span class="tag tag-gold">${icon('monitor')}Live</span></div>
        <div class="card-body" id="tv-ctl"></div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="c-7 rise rise-2">
      <div class="card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">Greeting composer</div><div class="card-sub">Personalised welcome shown on TV at check-in</div></div>
          <span class="tag tag-gold">${icon('sparkles')}Template</span></div>
        <div class="card-body">
          <textarea id="tv-greet-tpl" rows="4" style="width:100%;resize:vertical;padding:12px;border-radius:12px;border:1px solid var(--line);background:var(--surface-2);color:var(--ink);font:500 13px/1.6 var(--font-b)">${TV_GREET.tpl}</textarea>
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin:10px 0 12px">
            ${['{guest}','{hotel}','{room}'].map(t=>`<button class="chip" data-tv-token="${t}" style="font-size:11px">${t}</button>`).join('')}
            <span style="flex:1"></span>
            ${['EN','VI','FR','JA'].map(l=>`<button class="chip ${l===TV_GREET.lang?'on':''}" data-tv-lang="${l}" style="font-size:11px">${l}</button>`).join('')}
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
            <label style="font-size:11.5px;color:var(--mut);font-weight:700">Display duration
              <select id="tv-greet-dur" class="input" style="width:100%;margin-top:6px;padding:9px 10px;border-radius:10px;border:1px solid var(--line);background:var(--surface-2);color:var(--ink)">
                <option value="until-dismissed" ${TV_GREET.dur==='until-dismissed'?'selected':''}>Until guest dismisses</option>
                <option value="30s" ${TV_GREET.dur==='30s'?'selected':''}>30 seconds</option>
                <option value="60s" ${TV_GREET.dur==='60s'?'selected':''}>60 seconds</option>
              </select></label>
            <div style="display:flex;flex-direction:column;gap:8px;justify-content:center;font-size:12px;font-weight:600">
              <label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" id="tv-greet-weather" ${TV_GREET.weather?'checked':''}/> Show weather</label>
              <label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" id="tv-greet-checkout" ${TV_GREET.checkout?'checked':''}/> Show check-out time</label>
            </div>
          </div>
          <div style="display:flex;gap:10px">
            <button class="btn-gold" data-tv-push="occupied" style="flex:1">${icon('send')}Push to occupied rooms</button>
            <button class="btn-ghost" data-tv-push="all" style="flex:1">${icon('send')}Push to entire fleet</button>
          </div>
        </div>
      </div>
    </div>
    <div class="c-5 rise rise-3">
      <div class="card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">Live preview</div><div class="card-sub" id="tv-prev-sub">What the guest sees</div></div>
          <span class="tag tag-green">${icon('eye')}Real-time</span></div>
        <div class="card-body">
          <div style="border-radius:16px;padding:10px;background:linear-gradient(145deg,#1A1C22,#0C0E12);box-shadow:0 18px 40px -18px rgba(0,0,0,.55)">
            <div id="tv-screen" style="aspect-ratio:16/9;border-radius:10px;overflow:hidden;position:relative;background:radial-gradient(120% 140% at 20% 10%,#233246 0%,#101826 55%,#0A0F1A 100%);color:#F4EFE6">
            </div>
            <div style="display:flex;justify-content:center;margin-top:6px"><span style="width:44px;height:4px;border-radius:99px;background:#2A2E36"></span></div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-h"><div><div class="card-title">Broadcast</div><div class="card-sub">Ticker message to in-room screens</div></div></div>
        <div class="card-body">
          <div style="display:flex;gap:8px">
            <input id="tv-bcast-msg" class="input" placeholder="e.g. Tonight: seafood gala at Azure Beach · 19:00" style="flex:1;padding:10px 12px;border-radius:10px;border:1px solid var(--line);background:var(--surface-2);color:var(--ink)"/>
            <select id="tv-bcast-target" class="input" style="padding:10px;border-radius:10px;border:1px solid var(--line);background:var(--surface-2);color:var(--ink)">
              <option value="all">All TVs</option><option value="occupied">Occupied</option><option value="online">Online only</option>
            </select>
            <button class="btn-gold" id="tv-bcast-send">${icon('send')}Send</button>
          </div>
          <small style="display:block;margin-top:8px;color:var(--mut)">Ticker scrolls along the bottom of the home screen. Urgent broadcasts pause playback for 10s.</small>
        </div>
      </div>
    </div>
  </div>`;
};
INIT.hospitalitytv=()=>{
  let sel=TVS.find(t=>t.st==='online')||TVS[0];
  const ctl=$('#tv-ctl'), prev=$('#tv-screen');
  function renderCtl(){
    const st=TV_STATUS[sel.st];
    $('#tv-ctl-sub').textContent=`Room ${sel.room} · ${sel.model} · ${sel.fw}`;
    ctl.innerHTML=`
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
        <span class="kpi-ic" style="width:42px;height:42px;border-radius:12px;display:grid;place-items:center;color:var(--gold-deep);background:var(--gold-grad-soft)">${icon('monitor')}</span>
        <div style="flex:1"><b style="display:block">Room ${sel.room}</b><small style="color:var(--mut)">${sel.guest!=='—'?sel.guest:'Vacant'} · ${ROOM_TYPE_META[sel.type][0]}</small></div>
        <span class="tag ${st[2]}">${st[0]}</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
        <button class="${sel.st==='online'?'btn-ghost':'btn-gold'}" id="tv-power">${icon('power')}${sel.st==='online'?'Sleep':'Wake'}</button>
        <button class="btn-ghost" id="tv-reboot">${icon('refresh')}Reboot</button>
      </div>
      <div style="margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;font-size:11px;font-weight:700;color:var(--mut);margin-bottom:6px"><span>VOLUME</span><span id="tv-vol-val">${sel.vol}</span></div>
        <input type="range" id="tv-vol" min="0" max="60" value="${sel.vol}" style="width:100%;accent-color:var(--gold)" ${sel.st!=='online'?'disabled':''}/>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
        <span style="font-size:11px;font-weight:700;color:var(--mut)">CHANNEL</span>
        <div style="display:flex;align-items:center;gap:8px">
          <button class="btn-ghost" id="tv-ch-dn" style="padding:6px 10px" ${sel.st!=='online'?'disabled':''}>−</button>
          <b class="num" id="tv-ch-val" style="min-width:34px;text-align:center;font-size:17px">${sel.ch}</b>
          <button class="btn-ghost" id="tv-ch-up" style="padding:6px 10px" ${sel.st!=='online'?'disabled':''}>+</button>
        </div>
      </div>
      <div style="font-size:11px;font-weight:700;color:var(--mut);margin-bottom:6px">INPUT SOURCE</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px">
        ${['Live TV','Casting','HDMI 1','HDMI 2'].map(s=>`<button class="chip ${s===sel.input?'on':''}" data-tv-input="${s}" ${sel.st!=='online'?'disabled':''}>${s}</button>`).join('')}
      </div>
      <button class="btn-ghost" id="tv-locate" style="width:100%">${icon('eye')}Flash screen · locate TV</button>`;
    $('#tv-power').onclick=()=>{
      sel.st=sel.st==='online'?'standby':'online';
      const dot=$(`[data-tv-dot="${sel.room}"]`),tag=$(`[data-tv-tag="${sel.room}"]`);
      const ns=TV_STATUS[sel.st]; if(dot)dot.style.background=ns[1]; if(tag){tag.textContent=ns[0];tag.className='tag '+ns[2];}
      toast(`Room ${sel.room} TV ${sel.st==='online'?'woken':'sleeping'}`, sel.st==='online'?'Resumed on '+sel.input:'Power-save mode engaged');
      renderCtl();
    };
    $('#tv-reboot').onclick=()=>toast(`Rebooting TV ${sel.room}`,'Firmware '+sel.fw+' · back in ~40s','alert');
    const vol=$('#tv-vol'); if(vol)vol.oninput=e=>{sel.vol=+e.target.value;$('#tv-vol-val').textContent=sel.vol;};
    const chDn=$('#tv-ch-dn'),chUp=$('#tv-ch-up');
    if(chDn)chDn.onclick=()=>{sel.ch=Math.max(1,sel.ch-1);$('#tv-ch-val').textContent=sel.ch;};
    if(chUp)chUp.onclick=()=>{sel.ch=Math.min(99,sel.ch+1);$('#tv-ch-val').textContent=sel.ch;};
    $$('[data-tv-input]').forEach(b=>b.onclick=()=>{sel.input=b.dataset.tvInput;renderCtl();toast(`Room ${sel.room} → ${sel.input}`,'Input source switched');});
    $('#tv-locate').onclick=()=>toast(`Flashing screen ${sel.room}`,'Screen border pulsing gold for 15s');
  }
  function renderPrev(){
    const p=activeProperty();
    const lines=tvGreetText({guest:sel.guest!=='—'?sel.guest:'Mr. Sharma',room:sel.room}).split('\n');
    prev.innerHTML=`
      <div style="position:absolute;top:10px;left:14px;right:14px;display:flex;justify-content:space-between;align-items:center;font-size:8px;letter-spacing:.14em;text-transform:uppercase;opacity:.75">
        <span>${p.brand}</span><span>${new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})} · ${TV_GREET.lang}</span>
      </div>
      <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:18px">
        <div style="width:26px;height:26px;margin-bottom:6px;opacity:.9">${BIRD}</div>
        ${lines.map((l,i)=>i===0
          ?`<div style="font-family:var(--font-d);font-size:17px;letter-spacing:.02em;color:#E9CE9B">${l}</div>`
          :`<div style="font-size:8.5px;opacity:.85;margin-top:4px;max-width:85%">${l}</div>`).join('')}
        <div style="display:flex;gap:10px;margin-top:8px;font-size:7.5px;opacity:.75">
          ${TV_GREET.weather?`<span>${p.weather}</span>`:''}
          ${TV_GREET.checkout?`<span>Check-out 12:00</span>`:''}
        </div>
      </div>
      <div style="position:absolute;left:0;right:0;bottom:0;padding:3px 12px;background:rgba(201,168,90,.16);border-top:1px solid rgba(201,168,90,.35);font-size:7.5px;white-space:nowrap;overflow:hidden">
        <span id="tv-ticker" style="display:inline-block">${p.name} · Room service 24/7 · Spa open till 22:00 · ${TV_GREET.dur==='until-dismissed'?'Press OK to dismiss':''}</span>
      </div>`;
    $('#tv-prev-sub').textContent=`Room ${sel.room} screen · ${sel.st==='offline'?'TV offline — queued':sel.st}`;
  }
  $$('[data-tv]').forEach(b=>b.onclick=()=>{
    sel=TVS.find(t=>t.room===+b.dataset.tv)||sel;
    $$('[data-tv]').forEach(x=>x.style.outline=(x===b)?'2px solid var(--gold)':'none');
    renderCtl(); renderPrev();
  });
  const tpl=$('#tv-greet-tpl');
  tpl.addEventListener('input',()=>{TV_GREET.tpl=tpl.value;renderPrev();});
  $$('[data-tv-token]').forEach(b=>b.onclick=()=>{const t=b.dataset.tvToken;const s=tpl.selectionStart||tpl.value.length;tpl.value=tpl.value.slice(0,s)+t+tpl.value.slice(tpl.selectionEnd||s);TV_GREET.tpl=tpl.value;tpl.focus();renderPrev();});
  $$('[data-tv-lang]').forEach(b=>b.onclick=()=>{TV_GREET.lang=b.dataset.tvLang;$$('[data-tv-lang]').forEach(x=>x.classList.toggle('on',x===b));renderPrev();});
  $('#tv-greet-dur').onchange=e=>{TV_GREET.dur=e.target.value;renderPrev();};
  $('#tv-greet-weather').onchange=e=>{TV_GREET.weather=e.target.checked;renderPrev();};
  $('#tv-greet-checkout').onchange=e=>{TV_GREET.checkout=e.target.checked;renderPrev();};
  $$('[data-tv-push]').forEach(b=>b.onclick=()=>{
    const n=b.dataset.tvPush==='all'?TVS.length:TVS.filter(t=>t.st==='online').length;
    toast('Greeting pushed',`Welcome template live on ${n} screen${n>1?'s':''} · ${TV_GREET.lang}`);
  });
  $('#tv-bcast-send').onclick=()=>{
    const msg=$('#tv-bcast-msg').value.trim();
    if(!msg){toast('Nothing to broadcast','Type a ticker message first','alert');return;}
    const tg=$('#tv-bcast-target').value;
    const n=tg==='all'?TVS.length:tg==='occupied'?TVS.filter(t=>t.st==='online').length:TVS.filter(t=>t.st!=='offline').length;
    const tick=$('#tv-ticker'); if(tick)tick.textContent=msg;
    toast('Broadcast sent',`“${msg.slice(0,42)}${msg.length>42?'…':''}” → ${n} screens`);
    $('#tv-bcast-msg').value='';
  };
  const firstBtn=$(`[data-tv="${sel.room}"]`); if(firstBtn)firstBtn.style.outline='2px solid var(--gold)';
  renderCtl(); renderPrev();
};

/* ============================================================
   VIEW · FACILITY MANAGEMENT (3D resort map)
   ============================================================ */
VIEWS.facilities = () => {
  const totalStaff=FAC3D.facilities.reduce((a,f)=>a+f.staff,0);
  const totalOcc=FAC3D.facilities.reduce((a,f)=>a+f.occ,0);
  return `
  <div class="row">
    <div class="c-8 rise">
      <div class="card room3d-card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">Resort facilities · live map</div><div class="card-sub">8 zones · ${totalStaff} staff allocated · live occupancy</div></div>
          <div class="chips"><span class="tag tag-green">${icon('check')}All open</span><span class="tag tag-gold">${totalOcc} guests on-site</span></div></div>
        <div class="hk3d-stage room3d-stage" id="fac3d-stage"></div>
      </div>
      <div class="card">
        <div class="card-h"><div><div class="card-title">Map controls</div><div class="card-sub">Navigate the resort</div></div></div>
        <div class="card-body" style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px">
          <button class="btn-ghost" data-action="fac-view" data-az="45" data-ph="50">${icon('eye')}Isometric</button>
          <button class="btn-ghost" data-action="fac-view" data-az="0" data-ph="88">${icon('layers')}Top-down</button>
          <button class="btn-ghost" data-action="fac-view" data-az="0" data-ph="12">${icon('monitor')}Front</button>
          <button class="btn-ghost" data-action="fac-view" data-az="90" data-ph="12">${icon('monitor')}Side</button>
        </div>
      </div>
    </div>
    <div class="c-4 rise rise-1">
      <div class="card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">Facility intelligence</div><div class="card-sub">Click any zone on the map</div></div>
          <span class="tag tag-gold">Live</span></div>
        <div class="card-body" id="fac-panel">
          <div class="hk-rp-empty"><span class="hk-rp-ic">${icon('mapPin')}</span><b>Select a facility</b><small>Click any zone on the 3D resort map to see live staff allocation.</small></div>
        </div>
      </div>
      <div class="card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">Staff movements</div><div class="card-sub">Live patrol feed</div></div></div>
        <div class="card-body"><div class="hk-feed" id="fac-staff-feed"><small style="color:var(--mut)">Select a facility to see its staff feed.</small></div></div>
      </div>
      <div class="card">
        <div class="card-h"><div><div class="card-title">Facility summary</div><div class="card-sub">All zones · occupancy</div></div></div>
        <div class="card-body" style="display:flex;flex-direction:column;gap:8px">
          ${FAC3D.facilities.map(f=>{const p=Math.round(f.occ/f.cap*100);return `<div class="fac-sum-row" data-fac="${f.id}" style="cursor:pointer;padding:4px;border-radius:8px;transition:background .15s"><div style="display:flex;align-items:center;gap:8px;margin-bottom:3px"><span style="width:10px;height:10px;border-radius:3px;background:#${f.color.toString(16).padStart(6,'0')}"></span><b style="font-size:11.5px;flex:1">${f.name}</b><small style="color:var(--mut)">${f.occ}/${f.cap}</small></div><div style="height:4px;background:var(--surface-2);border-radius:2px;overflow:hidden"><div style="width:${p}%;height:100%;background:var(--gold-grad)"></div></div></div>`;}).join('')}
        </div>
      </div>
    </div>
  </div>`;
};
INIT.facilities=()=>{
  FAC3D.boot();
  $$('[data-action="fac-view"]').forEach(b=>b.addEventListener('click',()=>{
    if(window.__fac3d)window.__fac3d.setView(+b.dataset.az,+b.dataset.ph);
  }));
  $$('[data-fac]').forEach(r=>r.addEventListener('click',()=>{
    if(window.__fac3d)window.__fac3d.selectFacility(r.dataset.fac);
    $$('[data-fac]').forEach(x=>x.style.background=x===r?'var(--gold-grad-soft)':'');
  }));
  window.__fac3d=FAC3D;
};

/* ============================================================
   VIEW · COMMAND TOWER 3D
   ============================================================ */
VIEWS.command = () => {
  const occ=Math.round(CT3D.rooms.filter(r=>r.status==='occupied').length/CT3D.rooms.length*100);
  return `
  <div class="row">
    <div class="c-12 rise">
      <div class="card room3d-card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">Property Command Tower</div><div class="card-sub">Live 3D digital twin · ${CT3D.rooms.length} rooms · ${CT3D.staff.length} staff · day/night cycle</div></div>
          <div class="chips"><span class="tag tag-green">${icon('check')}Live</span><span class="tag tag-gold">${occ}% occupancy</span></div></div>
        <div class="hk3d-stage room3d-stage" id="ct3d-stage"></div>
      </div>
    </div>
    <div class="c-8">
      <div class="card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">Camera & time</div><div class="card-sub">Orbit the property · zoom with ⌘/Ctrl-scroll</div></div></div>
        <div class="card-body" style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px">
          <button class="btn-ghost" data-action="ct-view" data-az="45" data-ph="50">${icon('eye')}Isometric</button>
          <button class="btn-ghost" data-action="ct-view" data-az="0" data-ph="88">${icon('layers')}Top-down</button>
          <button class="btn-ghost" data-action="ct-view" data-az="0" data-ph="12">${icon('monitor')}Front</button>
          <button class="btn-ghost" data-action="ct-view" data-az="90" data-ph="12">${icon('monitor')}Side</button>
        </div>
      </div>
    </div>
    <div class="c-4">
      <div class="card">
        <div class="card-h"><div><div class="card-title">How to use</div></div></div>
        <div class="card-body" style="font-size:12px;color:var(--mut);line-height:1.7">
          ${icon('mousePointer')} <b>Click a room</b> — status, guest & assigned housekeeper<br>
          ${icon('users')} <b>Click staff</b> — live task, progress & utilization<br>
          ${icon('clock')} <b>Day/night</b> runs automatically — lights switch on after dusk<br>
          ${icon('hand')} <b>Drag</b> to orbit · <b>⌘/Ctrl-scroll</b> to zoom
        </div>
      </div>
    </div>
  </div>`;
};
INIT.command=()=>{
  CT3D.boot();
  $$('[data-action="ct-view"]').forEach(b=>b.addEventListener('click',()=>{
    if(window.__ct3d)window.__ct3d.setView(+b.dataset.az,+b.dataset.ph);
  }));
  window.__ct3d=CT3D;
};

/* ============================================================
   VIEW · NOVOTEL 3D TWIN
   ============================================================ */
VIEWS.novotel = () => {
  const p=PROPERTIES.find(x=>x.id==='novotel');
  return `
  <div class="row">
    <div class="c-8 rise">
      <div class="card room3d-card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">Novotel Grand Saigon · 3D twin</div><div class="card-sub">Ultra-realistic exterior · glass curtain wall · curved LED ribbons · day/night cycle</div></div>
          <div class="chips">
            <button class="chip ${NOV3D.mode==='exterior'?'on':''}" data-nov-mode="exterior">${icon('building')}Exterior</button>
            <span class="tag tag-green">${icon('check')}Live</span>
            <span class="tag tag-gold">${p.keys} keys · 22F</span>
          </div></div>
        <div class="hk3d-stage room3d-stage" id="nov3d-stage"></div>
      </div>
      <div class="card">
        <div class="card-h"><div><div class="card-title">Camera & view</div><div class="card-sub">Orbit the property · zoom with ⌘/Ctrl-scroll</div></div></div>
        <div class="card-body" style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px">
          <button class="btn-ghost" data-action="nov-view" data-az="45" data-ph="25">${icon('eye')}Isometric</button>
          <button class="btn-ghost" data-action="nov-view" data-az="0" data-ph="78">${icon('layers')}Top-down</button>
          <button class="btn-ghost" data-action="nov-view" data-az="0" data-ph="14">${icon('monitor')}Street view</button>
          <button class="btn-ghost" data-action="nov-view" data-az="90" data-ph="20">${icon('monitor')}Side</button>
        </div>
      </div>
    </div>
    <div class="c-4 rise rise-1">
      <div class="card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">Floor plans</div><div class="card-sub">Click to render the interior in 3D</div></div>
          <span class="tag tag-gold">5 floors</span></div>
        <div class="card-body" style="display:flex;flex-direction:column;gap:8px">
          ${NOV_FLOORS.map(f=>`<div class="nov-floor" data-action="nov-floor" data-floor="${f.id}" style="cursor:pointer;padding:12px;border:1px solid var(--line);border-radius:12px;transition:all .2s">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
              <b style="font-size:13px">${f.id} · ${f.name}</b>
              <span style="font-size:11px;color:var(--mut)">GFA ${f.gfa} m²</span>
            </div>
            <div style="font-size:11px;color:var(--mut);line-height:1.5">${f.note}</div>
            <div style="display:flex;gap:4px;margin-top:6px;flex-wrap:wrap">${f.areas.slice(0,4).map(a=>`<span style="font-size:9.5px;background:var(--surface-2);padding:2px 7px;border-radius:6px;color:var(--mut)">${a.split(' ')[0]}</span>`).join('')}</div>
          </div>`).join('')}
        </div>
      </div>
      <div class="card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">Property fact sheet</div><div class="card-sub">Novotel Grand Saigon</div></div></div>
        <div class="card-body" style="font-size:12px;line-height:1.8">
          <div style="display:flex;justify-content:space-between;padding:5px 0;border-top:1px solid var(--line)"><span style="color:var(--mut)">Brand</span><b>Accor · Novotel</b></div>
          <div style="display:flex;justify-content:space-between;padding:5px 0;border-top:1px solid var(--line)"><span style="color:var(--mut)">Location</span><b>Nguyễn Tất Thành, Saigon</b></div>
          <div style="display:flex;justify-content:space-between;padding:5px 0;border-top:1px solid var(--line)"><span style="color:var(--mut)">Keys</span><b>248</b></div>
          <div style="display:flex;justify-content:space-between;padding:5px 0;border-top:1px solid var(--line)"><span style="color:var(--mut)">Floors</span><b>22 + technical</b></div>
          <div style="display:flex;justify-content:space-between;padding:5px 0;border-top:1px solid var(--line)"><span style="color:var(--mut)">Ballroom</span><b>1,911 m² · 24 tables</b></div>
          <div style="display:flex;justify-content:space-between;padding:5px 0;border-top:1px solid var(--line)"><span style="color:var(--mut)">Rooftop pool</span><b>4F · southeast</b></div>
          <div style="display:flex;justify-content:space-between;padding:5px 0;border-top:1px solid var(--line)"><span style="color:var(--mut)">GM</span><b>${p.gm}</b></div>
        </div>
      </div>
      <div class="card">
        <div class="card-h"><div><div class="card-title">How to use</div></div></div>
        <div class="card-body" style="font-size:12px;color:var(--mut);line-height:1.7">
          ${icon('mousePointer')} <b>Drag</b> to orbit · <b>⌘/Ctrl-scroll</b> to zoom<br>
          ${icon('layers')} <b>Exterior</b> shows the full tower with day/night cycle<br>
          ${icon('building')} <b>Floor plans</b> render each interior in 3D<br>
          ${icon('brush')} Housekeeping rooms sync when Novotel is the active property
        </div>
      </div>
    </div>
  </div>`;
};
INIT.novotel=()=>{
  NOV3D.boot();
  $$('[data-action="nov-view"]').forEach(b=>b.addEventListener('click',()=>{
    if(window.__nov3d)window.__nov3d.setView(+b.dataset.az,+b.dataset.ph);
  }));
  $$('[data-action="nov-floor"]').forEach(b=>b.addEventListener('click',()=>{
    const id=b.dataset.floor;
    NOV3D.selectFloor(id);
    $$('[data-action="nov-floor"]').forEach(x=>x.style.borderColor=x===b?'var(--gold)':'var(--line)');
    $$('[data-nov-mode]').forEach(x=>x.classList.toggle('on',x.dataset.novMode==='floor'));
    const f=NOV_FLOORS.find(x=>x.id===id);
    toast('Loaded '+id+' · '+f.name,'3D interior rendered · GFA '+f.gfa+' m²','gold');
  }));
  $$('[data-nov-mode]').forEach(b=>b.addEventListener('click',()=>{
    if(b.dataset.novMode==='exterior'){NOV3D.showExterior();$$('[data-nov-mode]').forEach(x=>x.classList.toggle('on',x.dataset.novMode==='exterior'));
      $$('[data-action="nov-floor"]').forEach(x=>x.style.borderColor='var(--line)');}
  }));
  window.__nov3d=NOV3D;
};

/* ============================================================
   VIEW · HOUSEKEEPING & FACILITIES
   ============================================================ */
VIEWS.housekeeping = () => {
  const p=activeProperty();
  const isNov=p.id==='novotel';
  return `
  <div class="row">
    <div class="c-8 rise">
      <div class="card hk3d-card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">${isNov?'Novotel tower · live twin':'Residence tower · live twin'}</div><div class="card-sub">${isNov?'22 floors · 248 keys · attendants streamed from beacon telemetry':'10 floors · 200 keys · attendants streamed from beacon telemetry'}</div></div>
          <div class="card-actions"><span class="tag tag-green" id="hk-tag-serviced">${icon('check')}0 serviced</span><span class="tag tag-red" id="hk-tag-open">0 turns open</span></div></div>
        <div class="hk3d-stage" id="hk3d-stage">
          <div class="hk3d-legend" id="hk3d-legend"></div>
          <div class="hk3d-floors" id="hk3d-floors"></div>
          <div class="hk3d-hint"><span class="hk-hint-dot"></span>Drag to orbit · pinch or ⌘-scroll to zoom · click a residence</div>
          <div class="hk3d-tip" id="hk3d-tip" hidden></div>
        </div>
      </div>
      <div class="card">
        <div class="card-h"><div><div class="card-title">Maintenance tickets</div><div class="card-sub">Engineering · SLA 38 minutes average</div></div>
          <button class="btn-ghost btn-sm" data-action="toast" data-t="New ticket" data-s="Engineering on-call notified">${icon('plus')}New ticket</button></div>
        <div class="card-body">
          ${TICKETS.map(t=>`
          <div class="ticket">
            <span class="tk-ic" style="background:var(--${t[0]}-soft);color:var(--${t[0]})">${icon(t[1])}</span>
            <div style="flex:1"><b style="font-size:12.8px">${t[2]}</b><div style="font-size:11.5px;color:var(--mut);margin-top:2px">${t[3]}</div></div>
            <span class="tag tag-${t[0]}">${t[4]}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
    <div class="c-4 rise rise-1">
      <div class="card" style="margin-bottom:14px" id="hk-rp">
        <div class="card-h"><div><div class="card-title">Residence intelligence</div><div class="card-sub">Live inspection · click any unit on the tower</div></div>
          <span class="tk-ic" style="background:var(--gold-grad-soft);color:var(--gold)">${icon('building')}</span></div>
        <div class="card-body" id="hk-rp-body">
          <div class="hk-rp-empty"><span class="hk-rp-ic">${icon('building')}</span><b>Select a unit</b><small>Click any residence on the tower for its live inspection report, telemetry and attendant.</small></div>
        </div>
      </div>
      <div class="card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">Live activity</div><div class="card-sub">Floor telemetry · attendants & IoT</div></div>
          <span class="tag tag-gold">Live</span></div>
        <div class="card-body"><div class="hk-feed" id="hk-feed-list"></div></div>
      </div>
      <div class="card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">Team on shift</div><div class="card-sub">12 attendants live · 2 floaters</div></div></div>
        <div class="card-body">
          ${TEAM.map(t=>`<div class="team-row">${avatar(t.n)}<div class="lrow-main"><b>${t.n}</b><small>${t.fl}</small></div>${miniRing(Math.round(t.done/t.total*100))}</div>`).join('')}
          <button class="btn-ghost" style="width:100%;justify-content:center;margin-top:12px" data-action="toast" data-t="Roster optimised" data-s="Aves rebalanced floor 4">${icon('zap')}Optimise roster</button>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="c-12 rise rise-2">
      <div class="card">
        <div class="card-h"><div><div class="card-title">Facility orchestration</div><div class="card-sub">Energy, water and climate across the estate · IoT mesh, 4,218 nodes</div></div>
          <span class="tag tag-green">${icon('leaf')}18% under energy budget</span></div>
        <div class="card-body">
          <div class="gauges" style="margin-bottom:8px">
            ${gauge(42,'Energy today','1.24MWh','target 1.52 · −18%')}
            ${gauge(64,'Potable water','78%','desal at 92%')}
            ${gauge(18,'Air particulate','9 PM2.5','excellent')}
            ${gauge(72,'Pool chemistry','28.6°C','pH 7.3 · ideal')}
          </div>
          <div class="divider"></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0 28px">
            <div>
              <div class="sys-row"><span class="sys-ic">${icon('bulb')}</span><div class="lrow-main"><b>Ambient landscape lighting</b><small>Golden-hour scene · 64% dim</small></div><div class="switch on" data-switch></div></div>
              <div class="sys-row"><span class="sys-ic">${icon('droplet')}</span><div class="lrow-main"><b>Fountains & water gardens</b><small>Flow economy mode after 22:00</small></div><div class="switch on" data-switch></div></div>
              <div class="sys-row"><span class="sys-ic">${icon('wind')}</span><div class="lrow-main"><b>Lobby & pavilion climate</b><small>23.5°C · occupancy aware</small></div><div class="switch on" data-switch></div></div>
              <div class="sys-row"><span class="sys-ic">${icon('leaf')}</span><div class="lrow-main"><b>Garden irrigation</b><small>Soil moisture scheduling · 05:30</small></div><div class="switch" data-switch></div></div>
            </div>
            <div>
              ${[['Elevator A · Villas','green','Smooth · 42 trips'],
                 ['Elevator B · Residences','green','Smooth · 38 trips'],
                 ['Elevator C · Service','amber','Inspection due · 11 Oct'],
                 ['Dumb waiters · F&B','green','All 4 synced'],
                 ['Desalination plant','green','92% reserve'],
                 ['Backup generators','green','Auto-test passed']].map(x=>`
                <div class="sys-row"><span class="sys-ic" style="background:var(--${x[1]}-soft);color:var(--${x[1]})">${icon('activity')}</span>
                <div class="lrow-main"><b style="font-size:12.5px">${x[0]}</b><small>${x[2]}</small></div>
                <span class="dot dot-${x[1]}"></span></div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
};
INIT.housekeeping=()=>{
  $$('[data-switch]').forEach(sw=>sw.addEventListener('click',()=>{sw.classList.toggle('on');toast('Facility command sent',sw.classList.contains('on')?'Scene activated':'System set to standby','gold');}));
  HK3D.boot();
};

/* ============================================================
   VIEW · DINING & POS
   ============================================================ */
VIEWS.fb = () => {
  return `
  <div class="row">
    ${OUTLETS.map((o,i)=>`
    <div class="c-3 rise rise-${i+1}">
      <div class="card outlet-card hover" style="height:100%">
        <div class="outlet-media">
          <img src="${o.img}" alt="${o.n}" loading="lazy"/>
          <span class="om-live"><i></i>${o.live}</span>
          <div class="om-name"><b>${o.n}</b><small>${o.d}</small></div>
        </div>
        <div class="outlet-body">
          <div class="ob-grid">
            <div class="kg" style="background:var(--surface-2);border:1px solid var(--line);border-radius:10px;padding:8px 10px">
              <small>Covers</small><b class="num">${o.covers}</b></div>
            <div class="kg" style="background:var(--surface-2);border:1px solid var(--line);border-radius:10px;padding:8px 10px">
              <small>Revenue</small><b class="num">${moneyK(o.rev)}</b></div>
            <div class="kg" style="background:var(--surface-2);border:1px solid var(--line);border-radius:10px;padding:8px 10px">
              <small>Avg ticket</small><b class="num">$${o.avg}</b></div>
          </div>
          ${o.cap?`<div style="margin-top:11px"><div style="display:flex;justify-content:space-between;font-size:10.5px;font-weight:700;color:var(--mut);margin-bottom:5px"><span>Occupancy</span><span>${o.cap}%</span></div>
          <div class="pbar"><span style="--w:${o.cap/100}"></span></div></div>`:
          `<div style="margin-top:11px;font-size:11px;color:var(--mut);display:flex;align-items:center;gap:6px">${icon('zap')}${Math.round(o.covers*.7)} orders in service</div>`}
        </div>
      </div>
    </div>`).join('')}
  </div>
  <div class="row">
    <div class="c-7 rise rise-3">
      <div class="card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">L'Or Bleu · live tables</div><div class="card-sub">Floor · tap a table to open its ePOS ticket</div></div>
          <div class="card-actions"><span class="lg"><i class="ts-free" style="border-radius:4px;width:10px;height:10px;display:inline-block;border:1px solid var(--line)"></i>Free</span>
          <span class="lg"><i class="ts-seated" style="border-radius:4px;width:10px;height:10px;display:inline-block;border:1px solid var(--line)"></i>Seated</span>
          <span class="lg"><i class="ts-course" style="border-radius:4px;width:10px;height:10px;display:inline-block;border:1px solid var(--line)"></i>On course</span>
          <span class="lg"><i class="ts-bill" style="border-radius:4px;width:10px;height:10px;display:inline-block;border:1px solid var(--line)"></i>Bill</span></div>
        </div>
        <div class="card-body"><div class="table-map">
          ${TABLES.map(t=>`<div class="tbl-seat ${t[1]}" data-action="toast" data-t="Table ${t[0]}" data-s="${t[2]} · ePOS ticket opened"><b>${t[0]}</b><small>${t[2]}</small></div>`).join('')}
        </div></div>
      </div>
      <div class="card">
        <div class="card-h"><div><div class="card-title">Top performers tonight</div><div class="card-sub">Kitchen course load · real-time</div></div></div>
        <div class="card-body">
          ${[['Wagyu tenderloin · A5',42,'$6,720','92'],['Lobster thermidor',31,'$4,030','88'],['Chef’s 9-course omakase',26,'$9,360','76'],['1989 Springbank pairing',18,'$5,040','44'],['Tasting of tropical soufflé',36,'$1,080','98']].map((x,i)=>`
          <div class="rc-row"><b class="num" style="width:22px;font-family:var(--font-d);color:var(--mut)">0${i+1}</b>
            <span style="font-size:12.5px;font-weight:600;flex:1">${x[0]}</span>
            <div class="rc-bar" style="max-width:180px"><i style="--w:${x[3]/100}"></i></div>
            <b class="num" style="width:52px;text-align:right;font-size:11.5px">${x[1]}</b>
            <b class="num" style="width:64px;text-align:right">${x[2]}</b></div>`).join('')}
        </div>
      </div>
    </div>
    <div class="c-5 rise rise-4">
      <div class="card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">Settlements · today</div><div class="card-sub">Embedded payments · auto-reconciled</div></div>
          <span class="tag tag-green">${icon('check')}balanced</span></div>
        <div class="card-body">
          <div class="pay-row"><span class="pay-ic pi-card">CARD</span>
            <div class="lrow-main"><b>Cards · terminals + tokenized</b><small>312 transactions · 1.4% fee</small></div>
            <b class="num">$48,920</b></div>
          <div class="pay-row"><span class="pay-ic pi-phonepe">Pe</span>
            <div class="lrow-main"><b>PhonePe</b><small>41 transactions</small></div><b class="num">$10,480</b></div>
          <div class="pay-row"><span class="pay-ic pi-gpay">G</span>
            <div class="lrow-main"><b>Google Pay</b><small>33 transactions</small></div><b class="num">$8,240</b></div>
          <div class="pay-row"><span class="pay-ic pi-upi">UPI</span>
            <div class="lrow-main"><b>UPI · other rails</b><small>28 transactions</small></div><b class="num">$6,110</b></div>
          <div class="pay-row"><span class="pay-ic pi-cash">$</span>
            <div class="lrow-main"><b>Cash & room charge</b><small>Posted to folio</small></div><b class="num">$19,680</b></div>
          <div class="divider"></div>
          <div style="display:flex;justify-content:space-between"><span class="muted" style="font-size:12px">Gross F&B revenue</span><b class="num" style="font-family:var(--font-d);font-size:18px">$93,430</b></div>
        </div>
      </div>
      <div class="card">
        <div class="card-h"><div><div class="card-title">Live order stream</div><div class="card-sub">Kitchen display · all outlets</div></div></div>
        <div class="card-body">
          ${[['gold','L’Or Bleu · T12','Omakase ×2 + Krug pairing','2m ago'],
             ['blue','Palm Court · T04','Two breakfasts · one vegan','6m ago'],
             ['green','In-suite · Villa 503','Afternoon tea for two · 15:30','11m ago'],
             ['amber','Ember · T07','Macallan 1989 · two glasses','14m ago'],
             ['red','Beach Club · Cabana 3','Gluten-free tasting menu','19m ago']].map(o=>`
          <div class="lrow"><span class="dot dot-${o[0]}"></span>
          <div class="lrow-main"><b style="font-size:12px">${o[1]}</b><small>${o[2]}</small></div><small style="font-size:10px;color:var(--faint)">${o[3]}</small></div>`).join('')}
        </div>
      </div>
    </div>
  </div>`;
};
INIT.fb=()=>{};

/* ============================================================
   VIEW · REVENUE & PRICING
   ============================================================ */
VIEWS.revenue = () => {
  const r3=mulberry32(777);
  const events={5:'Full-moon dinner',10:'Regatta weekend',12:'Jazz night',17:'Black-tie gala',24:'Wellness retreat',31:'Long weekend'};
  const cells=Array.from({length:35},(_,i)=>{
    const demand=clamp(Math.round(2+r3()*3+(i%7>4?1:0)+(i===10||i===17?1:0)),1,5);
    const rate=[1180,1340,1560,1890,2340][demand-1]+Math.round(r3()*180);
    const d=addDays(new Date(),i);
    return `<div class="hm-cell hm-${demand} ${S.hmSel===i?'sel':''}" data-hm="${i}">
      <small>${DAYS[d.getDay()].slice(0,3)} ${d.getDate()}</small>
      <b class="num">$${(rate/1000).toFixed(2)}k</b>
      <div class="hm-bar"><i style="width:${demand/5*100}%"></i></div>
      ${events[i]?`<span style="position:absolute;top:8px;right:9px">${icon('star')}</span>`:''}
    </div>`;
  }).join('');
  return `
  <div class="row">
    <div class="c-3 rise"><div class="card kpi-card"><div class="kpi-top"><span class="kpi-ic" style="background:var(--gold-grad-soft);color:var(--gold-deep)">${icon('dollar')}</span><span class="kpi-label">BAR tonight</span></div>
      <div class="kpi-value"><span class="cur">$</span><span class="num">1,980</span></div><div class="kpi-foot"><span class="delta up">${icon('arrowUp')}8% rec.</span><span class="kpi-note">comp avg $2,360</span></div></div></div>
    <div class="c-3 rise rise-1"><div class="card kpi-card"><div class="kpi-top"><span class="kpi-ic" style="background:var(--emerald-soft);color:var(--emerald)">${icon('trend')}</span><span class="kpi-label">90-day pace</span></div>
      <div class="kpi-value">+11.8%</div><div class="kpi-foot"><span class="delta up">${icon('arrowUp')}$89k</span><span class="kpi-note">vs same pickup LY</span></div></div></div>
    <div class="c-3 rise rise-2"><div class="card kpi-card"><div class="kpi-top"><span class="kpi-ic" style="background:var(--azure-soft);color:var(--azure)">${icon('activity')}</span><span class="kpi-label">7-day pickup</span></div>
      <div class="kpi-value">146 rms</div><div class="kpi-foot"><span class="delta up">${icon('arrowUp')}22%</span><span class="kpi-note">Regatta demand wave</span></div></div></div>
    <div class="c-3 rise rise-3"><div class="card kpi-card"><div class="kpi-top"><span class="kpi-ic" style="background:var(--crimson-soft);color:var(--crimson)">${icon('percent')}</span><span class="kpi-label">Cancel rate</span></div>
      <div class="kpi-value">2.1%</div><div class="kpi-foot"><span class="delta down" style="background:var(--emerald-soft);color:var(--emerald)">${icon('arrowDown')}0.8pt</span><span class="kpi-note">42% free-cancel window</span></div></div></div>
  </div>

  <div class="row">
    <div class="c-8 rise rise-3">
      <div class="card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">Dynamic pricing calendar</div><div class="card-sub">Next 35 days · Aves demand scores vs comp set · select a day</div></div>
          <div class="card-actions"><span class="lg">Low</span>
            <span style="display:inline-flex;gap:3px"><i style="width:18px;height:12px;border-radius:4px;background:#E8D09A;display:inline-block"></i><i style="width:18px;height:12px;border-radius:4px;background:#D9B46A;display:inline-block"></i><i style="width:18px;height:12px;border-radius:4px;background:#C2913F;display:inline-block"></i><i style="width:18px;height:12px;border-radius:4px;background:#8A6120;display:inline-block"></i><i style="width:18px;height:12px;border-radius:4px;background:#B0863A;display:inline-block"></i></span>
            <span class="lg">High</span></div>
        </div>
        <div class="card-body">
          <div class="hm-grid" style="margin-bottom:7px">
            ${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=>`<div class="hm-dow">${d}</div>`).join('')}
          </div>
          <div class="hm-grid">${cells}</div>
        </div>
      </div>
      <div class="card">
        <div class="card-h"><div><div class="card-title">Channel performance · 90 days</div><div class="card-sub">Production, mix and acquisition cost</div></div></div>
        <div class="card-body">
          ${CHANNELS.map(c=>`
          <div class="rc-row">
            <span style="width:11px;height:11px;border-radius:4px;background:${c.c};flex-shrink:0"></span>
            <span style="font-size:12.5px;font-weight:600;flex:1">${c.n}</span>
            <div class="rc-bar" style="max-width:220px"><i style="--w:${c.pct/44};background:${c.c}"></i></div>
            <b class="num" style="width:42px;text-align:right;font-size:11.5px">${c.pct}%</b>
            <b class="num" style="width:62px;text-align:right">$${c.v}k</b>
            <small class="num" style="width:38px;text-align:right;color:${c.fee? 'var(--amber)':'var(--emerald)'}">${c.fee?c.fee+'%':'0%'}</small>
          </div>`).join('')}
          <div class="divider"></div>
          <div style="display:flex;justify-content:space-between;gap:14px;text-align:center">
            <div><b class="num" style="font-family:var(--font-d);font-size:21px">$709k</b><div class="kpi-note">90-day room revenue</div></div>
            <div><b class="num gold-text" style="font-family:var(--font-d);font-size:21px">44%</b><div class="kpi-note">Direct mix · saves $31k fees</div></div>
            <div><b class="num" style="font-family:var(--font-d);font-size:21px">$1,295</b><div class="kpi-note">Blended RevPAR</div></div>
          </div>
        </div>
      </div>
    </div>
    <div class="c-4 rise rise-4">
      <div class="card" style="margin-bottom:14px">
        <div class="card-h"><div class="ai-orb" style="width:30px;height:30px;border-radius:10px;display:grid;place-items:center"><span style="width:15px">${icon('sparkles')}</span></div>
          <div style="margin-left:0"><div class="card-title">Aves recommendations</div><div class="card-sub">Modelled on demand, events & guests</div></div></div>
        <div class="card-body">
          <div class="ai-rec">
            <span class="air-ic">${icon('trend')}</span>
            <div style="flex:1"><b style="font-size:12.8px">Raise BAR 18 Oct to $2,140</b>
              <p style="font-size:11.5px;color:var(--mut);margin-top:3px">Regatta arrivals · comp set selling $2,360 · projected uplift <b style="color:var(--emerald)">+$18,400</b></p>
              <div style="display:flex;gap:7px;margin-top:9px"><button class="btn-gold btn-sm" data-action="toast" data-t="Rate approved" data-s="BAR 18 Oct now $2,140 across channels">Approve</button>
              <button class="btn-ghost btn-sm" data-action="toast" data-t="Simulation" data-s="Opening rate model">Simulate</button></div>
            </div>
          </div>
          <div class="ai-rec">
            <span class="air-ic">${icon('key')}</span>
            <div style="flex:1"><b style="font-size:12.8px">Open 3 overwater suites to waitlist</b>
              <p style="font-size:11.5px;color:var(--mut);margin-top:3px">9 qualified waitlist requests; release at 1.2× rack · <b style="color:var(--emerald)">+$14,200</b></p>
              <div style="display:flex;gap:7px;margin-top:9px"><button class="btn-gold btn-sm" data-action="toast" data-t="Waitlist release armed" data-s="Offers go out at 16:00">Release</button></div>
            </div>
          </div>
          <div class="ai-rec">
            <span class="air-ic">${icon('spa')}</span>
            <div style="flex:1"><b style="font-size:12.8px">Bundle spa on low-demand Tuesdays</b>
              <p style="font-size:11.5px;color:var(--mut);margin-top:3px">Wellness segment conversion +31% in A/B test · attach $280 credit.</p>
              <div style="display:flex;gap:7px;margin-top:9px"><button class="btn-ghost btn-sm" data-action="toast" data-t="Bundle drafted" data-s="Sent to guest web + booking engine">Configure</button></div>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-h"><div><div class="card-title">Comp-set radar</div><div class="card-sub">5 luxury resorts · 40km radius</div></div></div>
        <div class="card-body">
          ${[['Soneva Aqua',2360,94,'green'],['Cheval Blanc Atoll',2480,97,'green'],['Joali Spirit',2120,88,'amber'],['Anantara Reef',1840,81,'blue'],['Aurelia (you)',1980,92,'gold']].map(x=>`
          <div class="rc-row">
            <span style="font-size:12.5px;font-weight:${x[4]==='gold'?'800':'600'};flex:1;color:${x[4]==='gold'?'var(--gold-deep)':'inherit'}">${x[0]}</span>
            <b class="num" style="width:64px;text-align:right">$${x[1]}</b>
            <span class="tag tag-${x[3]}" style="width:42px;justify-content:center">${x[2]}%</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>`;
};
INIT.revenue=()=>{
  $$('.hm-cell').forEach(c=>c.addEventListener('click',()=>{
    $$('.hm-cell').forEach(x=>x.classList.remove('sel'));
    c.classList.add('sel');S.hmSel=+c.dataset.hm;
    const d=addDays(new Date(),S.hmSel);
    toast(`Demand view · ${fmtDate(d)}`,'Rate recommendation loaded in Aves panel','gold');
  }));
};

/* ============================================================
   VIEW · GUEST INTELLIGENCE
   ============================================================ */
VIEWS.intel = () => `
  <div class="row">
    <div class="c-3 rise"><div class="card kpi-card"><div class="kpi-top"><span class="kpi-ic" style="background:var(--azure-soft);color:var(--azure)">${icon('users')}</span><span class="kpi-label">Guest profiles</span></div>
      <div class="kpi-value"><span data-count="12840">0</span></div><div class="kpi-foot"><span class="delta up">${icon('arrowUp')}612 new</span><span class="kpi-note">90 days · enriched</span></div></div></div>
    <div class="c-3 rise rise-1"><div class="card kpi-card"><div class="kpi-top"><span class="kpi-ic" style="background:var(--gold-grad-soft);color:var(--gold-deep)">${icon('star')}</span><span class="kpi-label">NPS · 90d</span></div>
      <div class="kpi-value"><span data-count="72">0</span></div><div class="kpi-foot"><span class="delta up">${icon('arrowUp')}6 pts</span><span class="kpi-note">luxury benchmark 48</span></div></div></div>
    <div class="c-3 rise rise-2"><div class="card kpi-card"><div class="kpi-top"><span class="kpi-ic" style="background:var(--emerald-soft);color:var(--emerald)">${icon('refresh')}</span><span class="kpi-label">Repeat rate</span></div>
      <div class="kpi-value"><span data-count="41" data-suffix="%">0</span></div><div class="kpi-foot"><span class="delta up">${icon('arrowUp')}4.2%</span><span class="kpi-note">loyalty driven</span></div></div></div>
    <div class="c-3 rise rise-3"><div class="card kpi-card"><div class="kpi-top"><span class="kpi-ic" style="background:var(--crimson-soft);color:var(--crimson)">${icon('heart')}</span><span class="kpi-label">Sentiment</span></div>
      <div class="kpi-value">94<span style="font-size:18px">%</span></div><div class="kpi-foot"><span class="delta up">${icon('arrowUp')}2.4%</span><span class="kpi-note">1,284 mentions analysed</span></div></div></div>
  </div>
  <div class="row">
    <div class="c-8 rise rise-3">
      <div class="card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">Living segments</div><div class="card-sub">Aves clusters guests by behaviour, not spreadsheets</div></div>
          <button class="btn-ghost btn-sm" data-action="toast" data-t="Campaign studio" data-s="Composing segment campaign">${icon('send')}Campaign</button></div>
        <div class="card-body">
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:11px">
            ${SEGMENTS.map(s=>`
            <div class="seg-card" data-action="toast" data-t="${s.n}" data-s="${s.v} guests · ${s.ch}% of base">
              <div class="sc-top"><span style="width:32px;height:32px;border-radius:10px;display:grid;place-items:center;background:var(--${s.c}-soft);color:var(--${s.c})">${icon(s.ic)}</span>
                <span class="tag tag-${s.c}">${s.ch}%</span></div>
              <div class="sc-v num">${s.v}</div>
              <div style="font-size:11.5px;color:var(--mut);margin-top:2px;font-weight:600">${s.n}</div>
            </div>`).join('')}
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-h"><div><div class="card-title">Reputation stream</div><div class="card-sub">Every review, routed & translated</div></div>
          <span class="chip">${icon('refresh')}Synced 4m ago</span></div>
        <div class="card-body">
          ${REVIEWS.map(r=>`
          <div class="review">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:5px">
              <span class="tag tag-blue">${r.src}</span><span class="stars">★★★★★</span>
              <b style="margin-left:auto;font-family:var(--font-d);font-size:15px">${r.score}</b></div>
            <p style="font-size:12.8px;line-height:1.6">${r.txt}</p>
            <div style="display:flex;align-items:center;gap:10px;margin-top:8px"><small style="font-size:10.5px;color:var(--faint)">${r.who}</small>
            <button class="btn-ghost btn-sm" style="margin-left:auto" data-action="toast" data-t="Draft reply ready" data-s="Aves matched the guest’s tone & language">AI reply</button></div>
          </div>`).join('')}
        </div>
      </div>
    </div>
    <div class="c-4 rise rise-4">
      <div class="card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">Loyalty tiers</div></div></div>
        <div class="card-body">
          ${[['Noir','Invitation only',86,'#231E16'],['Aureate','20+ nights',412,'#A8843E'],['Pearl','Enrolled',12342,'#7C9A6E']].map((t,i)=>`
          <div class="lrow"><span style="width:34px;height:34px;border-radius:11px;display:grid;place-items:center;color:#F6E9CB;font-size:10px;font-weight:800;letter-spacing:.08em;background:${i===0?'linear-gradient(135deg,#3a3124,#0c0a06)':t[3]}">${t[0].slice(0,3).toUpperCase()}</span>
          <div class="lrow-main"><b>${t[0]}</b><small>${t[1]}</small></div><b class="num">${t[2].toLocaleString()}</b></div>`).join('')}
          <div class="divider"></div>
          <div style="text-align:center">${donut([{v:41,c:'#206A4E'},{v:29,c:'#C8A762'},{v:18,c:'#7C9A6E'},{v:12,c:'#9B3D50'}],130,'<span class="dc-v" style="font-size:26px">9.4</span><span class="dc-l">Guest score</span>')}</div>
        </div>
      </div>
      <div class="card">
        <div class="card-h"><div><div class="card-title">Moments worth remembering</div><div class="card-sub">Next 72 hours</div></div></div>
        <div class="card-body">
          ${[['cake','3 anniversaries','Noir turndown choreography','red'],['star','2 birthdays','Pastry kitchen briefed','gold'],
             ['heart','6 honeymoons','Petal & candle amenity','red'],['sparkles','4 first-time guests','Welcome letter from GM','blue']].map(m=>`
          <div class="lrow"><span style="width:32px;height:32px;border-radius:10px;display:grid;place-items:center;background:var(--${m[3]}-soft);color:var(--${m[3]})">${icon(m[0])}</span>
          <div class="lrow-main"><b style="font-size:12.3px">${m[1]}</b><small>${m[2]}</small></div>
          <button class="lrow-act" data-action="toast" data-t="Moments routed" data-s="Butler, pastry & florist">${icon('check')}</button></div>`).join('')}
        </div>
      </div>
    </div>
  </div>`;
INIT.intel=()=>{};

/* ============================================================
   VIEW · MESSAGES
   ============================================================ */
VIEWS.messages = () => {
  const c=CONVS[S.msgSel];
  return `
  <div class="row">
    <div class="c-12 rise">
      <div class="card msg-layout" style="padding:0">
        <div class="conv-list">
          <div style="padding:14px 16px;border-bottom:1px solid var(--line)">
            <div class="tb-search" style="margin-left:0;width:100%">${icon('search')}<span>Search conversations…</span></div>
          </div>
          ${CONVS.map((x,i)=>`
          <div class="conv-item ${S.msgSel===i?'on':''}" data-conv="${i}">
            ${avatar(x.n)}
            <div class="ci-main"><b>${x.n} <span class="tag tag-grey" style="font-weight:700">${x.ch}</span></b>
              <p>${x.last}</p></div>
            <div style="text-align:right"><div class="ci-time">${x.time}</div>${x.unread?`<span class="conv-unread" style="display:inline-block;margin-top:5px"></span>`:''}</div>
          </div>`).join('')}
        </div>
        <div class="thread">
          <div class="thread-head">
            ${avatar(c.n,'av-38')}
            <div style="flex:1"><b style="font-size:13.5px">${c.n}</b>
              <div style="font-size:11px;color:var(--mut);display:flex;align-items:center;gap:7px"><span class="tag tag-gold">${c.tier}</span>${c.ch} · <span style="color:var(--emerald);display:inline-flex;align-items:center;gap:4px"><span class="dot dot-green" style="width:6px;height:6px"></span>typically replies 12m</span></div></div>
            <button class="btn-ghost btn-sm" data-view="frontdesk">Guest profile</button>
            <button class="icon-btn" data-action="toast" data-t="Translation on" data-s="Auto-translate English ↔ native">${icon('globe')}</button>
          </div>
          <div class="thread-body" id="thread-body">
            ${c.msgs.map(m=>`<div class="bubble ${m[0]}">${m[1]}<small>${m[0]==='out'?'Aurelia · Aves':c.n.split(' ')[0]} · ${m[2]}</small></div>`).join('')}
          </div>
          <div style="display:flex;gap:7px;padding:0 20px 10px;flex-wrap:wrap">
            ${['Upgrade suite','Book spa table','Airport transfer','Late check-out'].map(q=>`<span class="chip" data-quick="${q}">${q}</span>`).join('')}
          </div>
          <div class="thread-foot">
            <button class="ch-ic">${icon('phone')}</button>
            <button class="ch-ic">${icon('sparkles')}</button>
            <input class="thread-input" id="msg-input" placeholder="Write a reply… Aves will polish your tone"/>
            <button class="btn-gold" id="msg-send">${icon('send')}Send</button>
          </div>
        </div>
      </div>
    </div>
  </div>`;
};
INIT.messages=()=>{
  $$('[data-conv]').forEach(el=>el.addEventListener('click',()=>{S.msgSel=+el.dataset.conv;$('#view').innerHTML=VIEWS.messages();INIT.messages();}));
  const send=()=>{const inp=$('#msg-input');if(!inp||!inp.value.trim())return;
    const body=$('#thread-body');
    body.insertAdjacentHTML('beforeend',`<div class="bubble out">${inp.value}<small>Aurelia · just now</small></div>`);
    inp.value='';body.scrollTop=body.scrollHeight;
    setTimeout(()=>{body.insertAdjacentHTML('beforeend',`<div class="bubble in"><i class="ai-typing"><i></i><i></i><i></i></i></div>`);body.scrollTop=body.scrollHeight;
      setTimeout(()=>{body.lastElementChild.innerHTML='Thank you so much! That sounds wonderful. 🙏<small>'+CONVS[S.msgSel].n.split(' ')[0]+' · just now</small>';body.scrollTop=body.scrollHeight;},1100);},500);
  };
  $('#msg-send')?.addEventListener('click',send);
  $('#msg-input')?.addEventListener('keydown',e=>{if(e.key==='Enter')send();});
  $$('[data-quick]').forEach(ch=>ch.addEventListener('click',()=>{$('#msg-input').value='I would love to arrange '+ch.dataset.quick.toLowerCase()+' for you.';$('#msg-input').focus();}));
};

/* ============================================================
   VIEW · AUTOMATIONS
   ============================================================ */
VIEWS.automations = () => `
  <div class="row">
    <div class="c-8 rise">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        ${AUTOMATIONS.map((a,i)=>`
        <div class="card auto-card hover rise rise-${(i%4)+1}">
          <div style="display:flex;align-items:center;gap:10px">
            <span class="kc-ic" style="width:34px;height:34px;border-radius:11px;display:grid;place-items:center;background:var(--gold-grad-soft);color:var(--gold-deep)">${icon('zap')}</span>
            <b style="font-size:13.5px;font-family:var(--font-d)">${a.t}</b>
            <span class="switch ${a.on2?'on':''}" data-switch style="margin-left:auto"></span>
          </div>
          <div class="auto-flow">
            <span class="flow-node">${icon('zap')}${a.on[0]}</span>
            <span class="flow-arrow">${icon('arrowRight')}</span>
            <span class="flow-node gold">${icon('sparkles')}${a.on[1]}</span>
            <span class="flow-arrow">${icon('arrowRight')}</span>
            <span class="flow-node">${icon('checkCircle')}${a.on[2]}</span>
          </div>
          <div class="auto-stats">
            <div class="as"><small>Runs · 30d</small><b class="num">${a.runs*4+120}</b></div>
            <div class="as"><small>Success</small><b style="color:var(--emerald)">${a.ok}%</b></div>
            <div class="as" style="margin-left:auto"><button class="btn-ghost btn-sm" data-action="toast" data-t="Flow studio" data-s="Opening ${a.t}">Edit flow</button></div>
          </div>
        </div>`).join('')}
      </div>
    </div>
    <div class="c-4 rise rise-2">
      <div class="card" style="margin-bottom:14px">
        <div class="card-h"><span class="ai-orb" style="width:32px;height:32px;border-radius:11px;display:grid;place-items:center">${icon('sparkles')}</span>
          <div><div class="card-title">Aves suggests</div><div class="card-sub">Drafted from today’s patterns</div></div></div>
        <div class="card-body">
          <div class="ai-rec" style="margin-bottom:12px">
            <span class="air-ic">${icon('car')}</span>
            <div style="flex:1"><b style="font-size:12.8px">Seaplane delay → proactive reassurance</b>
            <p style="font-size:11.5px;color:var(--mut);margin-top:3px">When a transfer is delayed >20m, message affected guests and re-time butler & spa automatically.</p>
            <button class="btn-gold btn-sm" style="margin-top:9px" data-action="toast" data-t="Automation armed" data-s="Transfer care flow now live">Enable flow</button></div>
          </div>
          <div class="ai-rec" style="margin-bottom:12px">
            <span class="air-ic">${icon('wine')}</span>
            <div style="flex:1"><b style="font-size:12.8px">Empty minibar → instant ticket</b>
            <p style="font-size:11.5px;color:var(--mut);margin-top:3px">IoT shelves can open a replenishment ticket before guests call.</p>
            <button class="btn-ghost btn-sm" style="margin-top:9px" data-action="toast" data-t="Draft ready" data-s="Review in flow studio">Review draft</button></div>
          </div>
          <div class="ai-rec">
            <span class="air-ic">${icon('star')}</span>
            <div style="flex:1"><b style="font-size:12.8px">Detractors → GM recovery within 30m</b>
            <p style="font-size:11.5px;color:var(--mut);margin-top:3px">Any score below 7 pauses survey routing and alerts duty manager with context.</p>
            <button class="btn-gold btn-sm" style="margin-top:9px" data-action="toast" data-t="Recovery flow armed" data-s="Service recovery SLA 30m">Enable flow</button></div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-h"><div><div class="card-title">Automation impact</div><div class="card-sub">Last 30 days</div></div></div>
        <div class="card-body">
          ${[['Staff hours returned','1,248 h','green'],['Manual charges automated','$1.84M','gold'],['Guest messages handled by Aves','71%','blue'],['Service recovery median','9 min','red']].map(x=>`
          <div class="dp-kv"><span>${x[0]}</span><b style="color:var(--${x[2]});font-family:var(--font-d);font-size:16px">${x[1]}</b></div>`).join('')}
        </div>
      </div>
    </div>
  </div>`;
INIT.automations=()=>{};

/* ============================================================
   VIEW · REPORTS & BI
   ============================================================ */
VIEWS.reports = () => {
  const cats=[
    ['clipboard','Night audit','Posted at 03:02 · zero exceptions','Daily · 03:00'],
    ['trend','Revenue & pacing','Pickup, wash, shoulder nights','Hourly'],
    ['users','Guest journey','Booking source → stay → NPS','Weekly'],
    ['brush','Housekeeping efficiency','SLA by floor, attendant & room type','Daily'],
    ['utensils','F&B cost & margin','Recipe-level margins, pour cost','Daily · 01:00'],
    ['globe','Channel & commissions','Fees, parity, content score','Weekly'],
    ['leaf','Sustainability','Energy, water, waste per guest-night','Monthly'],
    ['shield','Security & audit','Access, PII views, vault exports','Realtime'],
  ];
  return `
  <div class="row">
    <div class="c-8 rise">
      <div class="card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">Report library</div><div class="card-sub">Every ledger and signal, exportable or scheduled</div></div>
          <div class="chips"><span class="chip on">All</span><span class="chip">Finance</span><span class="chip">Operations</span><span class="chip">Guest</span></div></div>
        <div class="card-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:11px">
            ${cats.map((c,i)=>`
            <div class="seg-card" style="display:flex;gap:12px;align-items:flex-start" data-action="toast" data-t="${c[1]} report" data-s="Generating preview · saved to your library">
              <span style="width:36px;height:36px;border-radius:11px;display:grid;place-items:center;background:var(--gold-grad-soft);color:var(--gold-deep);flex-shrink:0">${icon(c[0])}</span>
              <div style="flex:1"><b style="font-size:13px;display:block">${c[1]}</b><div style="font-size:11px;color:var(--mut);margin:2px 0 7px">${c[2]}</div>
              <span class="tag tag-grey">${c[3]}</span></div>
              ${spark([20,24,22,28,26,32,30+i].map(v=>v+i),64,26)}
            </div>`).join('')}
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-h"><div><div class="card-title">Business intelligence snapshot</div><div class="card-sub">Consolidated KPI movement · trailing 30 days</div></div></div>
        <div class="card-body">
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:6px">
            ${[['GOPPAR','$194','+8.4%','green',SPARKS.gop],['Labour ratio','28.6%','-1.8pt','green',SPARKS.occ],
               ['F&B cost %','31.2%','-2.4pt','green',SPARKS.rev],['Spa attach','24%','+5.1%','green',SPARKS.adr]].map(k=>`
              <div style="padding:14px;border-radius:14px;border:1px solid var(--line);background:var(--surface-2)">
                <small style="font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--mut);font-weight:800">${k[0]}</small>
                <div class="num" style="font-family:var(--font-d);font-size:24px;margin:6px 0 2px">${k[1]}</div>
                <span class="delta up" style="font-size:10px">${icon('arrowUp')}${k[2]}</span>
                <div style="margin-top:8px">${spark(k[4],90,28)}</div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
    <div class="c-4 rise rise-1">
      <div class="card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">Scheduled deliveries</div></div>
          <button class="btn-ghost btn-sm" data-action="toast" data-t="Schedule builder" data-s="Choose reports, people & times">${icon('plus')}New</button></div>
        <div class="card-body">
          ${[['clipboard','Night audit pack','Owners · 06:30 email','Daily'],
             ['trend','Pace & pickup war-book','Commercial team · 07:00','Daily'],
             ['users','Weekly guest insight','GM & Heads of Dept','Mon 08:00'],
             ['leaf','Sustainability report','Asset manager','1st of month'],
             ['shield','PII access audit','DPO','Realtime digest']].map(s=>`
          <div class="lrow"><span style="width:32px;height:32px;border-radius:10px;display:grid;place-items:center;background:var(--surface-2);border:1px solid var(--line);color:var(--gold-deep)">${icon(s[0])}</span>
          <div class="lrow-main"><b style="font-size:12.3px">${s[1]}</b><small>${s[2]}</small></div><span class="tag tag-gold">${s[3]}</span></div>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-h"><div><div class="card-title">Export & data</div></div></div>
        <div class="card-body" style="display:flex;flex-direction:column;gap:9px">
          ${[['fileText','Board pack (.pdf)','Branded, ready for owners'],
             ['chart','Analytics workbook (.xlsx)','All ledgers, pivot-ready'],
             ['database','Data warehouse sync','Snowflake · nightly 02:30'],
             ['lock','Tax & fiscal export','MIRA-compliant package']].map(x=>`
          <button class="btn-ghost" style="justify-content:flex-start" data-action="toast" data-t="${x[1].split(' ')[0]} export" data-s="Preparing your download">
            <span style="width:30px;height:30px;border-radius:9px;display:grid;place-items:center;background:var(--gold-grad-soft);color:var(--gold-deep)">${icon(x[0])}</span>
            <span style="text-align:left"><b style="font-size:12.3px;display:block">${x[1]}</b><small style="color:var(--mut)">${x[2]}</small></span>
            <span style="margin-left:auto;color:var(--faint)">${icon('download')}</span></button>`).join('')}
        </div>
      </div>
    </div>
  </div>`;
};
INIT.reports=()=>{};

/* ============================================================
   VIEW · SETTINGS
   ============================================================ */
VIEWS.settings = () => `
  <div class="row">
    <div class="c-3 rise">
      <div class="card pad" style="margin-bottom:14px">
        <div style="display:flex;align-items:center;gap:13px;margin-bottom:14px">
          <span class="brand-mark" style="position:static">${BIRD}</span>
          <div><b style="font-family:var(--font-d);font-size:17px;display:block">BirdOS Console</b><small style="color:var(--mut);font-size:11px">v4.2 · Aurelia cloud</small></div>
        </div>
        <div class="set-nav">
          ${[['building','Property'],['sun','Appearance'],['monitor','Kiosks & identity'],['bell','Notifications'],['layers','Integrations'],['shield','Security & API']].map((s,i)=>`
          <button class="${i===0?'on':''}" data-action="toast" data-t="${s[1]} section" data-s="Scroll to settings group">${icon(s[0])}${s[1]}</button>`).join('')}
        </div>
      </div>
      <div class="card pad" style="text-align:center">
        <div style="width:70px;height:70px;margin:4px auto 12px;border-radius:22px;background:radial-gradient(130% 130% at 25% 15%,#1C2A42,#0C1422);display:grid;place-items:center;border:1px solid rgba(242,224,174,.32)">
          <span style="width:30px">${icon('sparkles')}</span></div>
        <b style="font-family:var(--font-d);font-size:15px;display:block">Aves AI copilot</b>
        <p style="font-size:11.5px;color:var(--mut);margin:6px 0 12px">Tone, autonomy thresholds and governed data access.</p>
        <button class="btn-gold btn-sm" style="width:100%;justify-content:center" data-action="open-ai">Open Aves console</button>
      </div>
    </div>
    <div class="c-9 rise rise-1">
      <div class="card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">Property</div><div class="card-sub">Legal entity shown on folios, kiosks and registration cards</div></div></div>
        <div class="card-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
            <div class="field"><label>Property name</label><input value="Aurelia Royal Sands"/></div>
            <div class="field"><label>Location</label><input value="Baa Atoll, Maldives"/></div>
            <div class="field"><label>Total keys</label><input value="342"/></div>
            <div class="field"><label>Currency</label><select><option>USD — US Dollar</option><option>EUR — Euro</option><option>MVR — Maldivian Rufiyaa</option></select></div>
            <div class="field"><label>Timezone</label><select><option>Indian / Malé (GMT+5)</option></select></div>
            <div class="field"><label>Default language</label><select><option>English</option><option>Français</option><option>日本語</option><option>中文</option></select></div>
          </div>
        </div>
      </div>
      <div class="card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">Appearance</div><div class="card-sub">Two signature moods · your choice is remembered on this device</div></div></div>
        <div class="card-body">
          <label class="field" style="margin:0 0 14px"><label>Theme style</label></label>
          <div style="display:flex;gap:12px;margin-bottom:18px">
            <button class="seg-card" data-mode-btn="classic" style="flex:1;text-align:left;display:flex;gap:12px;align-items:center">
              <span style="width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,#FFFFFF,#D4B872);border:1px solid var(--line-2)"></span>
              <span><b style="font-size:13px;display:block">Classic</b><small style="color:var(--mut)">Platinum & champagne gold</small></span></button>
            <button class="seg-card" data-mode-btn="modern" style="flex:1;text-align:left;display:flex;gap:12px;align-items:center">
              <span style="width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,#7C5CFC 0%,#FF8FA3 55%,#FFB37A 100%);border:1px solid var(--line-2)"></span>
              <span><b style="font-size:13px;display:block">Modern</b><small style="color:var(--mut)">Aurora · pastel & vibrant</small></span></button>
          </div>
          <label class="field" style="margin:0 0 10px"><label>Mood</label></label>
          <div style="display:flex;gap:12px;margin-bottom:18px">
            <button class="seg-card" style="flex:1;text-align:left;display:flex;gap:12px;align-items:center" data-theme="light">
              <span style="width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,#FFFFFF,#D4B872);border:1px solid var(--line-2)"></span>
              <span><b style="font-size:13px;display:block">Maison</b><small style="color:var(--mut)">Platinum white & champagne gold</small></span></button>
            <button class="seg-card" style="flex:1;text-align:left;display:flex;gap:12px;align-items:center" data-theme="dark">
              <span style="width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,#0A101C,#243047);border:1px solid var(--line-2)"></span>
              <span><b style="font-size:13px;display:block">Nuit</b><small style="color:var(--mut)">Midnight navy & champagne gold</small></span></button>
          </div>
          <label class="field" style="margin:0"><label>Signature metal</label></label>
          <div style="display:flex;gap:11px;margin-top:9px">
            ${[['Platinum Gold',['#B08D3C','#8A6B1F','#D4B872','#F4EDDB']],['Champagne Rosé',['#B07A68','#8A5348','#ECC4B6','#F8E4DC']],['Emerald Court',['#2F7D60','#144A37','#A6D3BE','#DCF0E4']],['Royal Sapphire',['#3E639E','#213F6E','#AEC6EE','#DCE7FA']]].map((a,i)=>`
              <span class="swatch ${i===0?'on':''}" data-accent="${i}" title="${a[0]}" style="background:linear-gradient(135deg,${a[1][2]},${a[1][0]},${a[1][1]})"></span>`).join('')}
          </div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px">
        <div class="card">
          <div class="card-h"><div><div class="card-title">Kiosk languages</div><div class="card-sub">Offered at identity step</div></div></div>
          <div class="card-body">
            ${['English','Français','日本語 Japanese','中文 Mandarin','العربية Arabic','Русский Russian','Deutsch','Italiano'].map((l,i)=>`
            <div class="set-row"><b style="font-size:12.8px">${l}</b><span class="switch ${i<6?'on':''}" data-switch style="margin-left:auto"></span></div>`).join('')}
          </div>
        </div>
        <div class="card">
          <div class="card-h"><div><div class="card-title">Notifications</div><div class="card-sub">How BirdOS reaches you</div></div></div>
          <div class="card-body">
            ${[['VIP arrivals & choreography',true],['Rate recommendations from Aves',true],['Night audit exceptions',true],['Housekeeping SLA breaches',true],['Channel parity warnings',false],['Marketing digest',false]].map(n=>`
            <div class="set-row"><div><b style="font-size:12.8px">${n[0]}</b><small>Push · email · guest app</small></div>
            <span class="switch ${n[1]?'on':''}" data-switch style="margin-left:auto"></span></div>`).join('')}
          </div>
        </div>
      </div>
      <div class="card" style="margin-bottom:14px">
        <div class="card-h"><div><div class="card-title">Marketplace integrations</div><div class="card-sub">Payments, channels, accounting & keys · 1,000+ more via Open API</div></div>
          <button class="btn-ghost btn-sm" data-action="toast" data-t="Marketplace" data-s="Opening 1,000+ integrations">${icon('plus')}Browse</button></div>
        <div class="card-body" style="display:grid;grid-template-columns:1fr 1fr;gap:0 26px">
          ${INTEGRATIONS.map(it=>`
          <div class="integ-row">
            <span class="integ-logo">${it[0].slice(0,2).toUpperCase()}</span>
            <div style="flex:1"><b style="font-size:12.8px">${it[0]}</b><div style="font-size:11px;color:var(--mut)">${it[1]}</div></div>
            <span class="tag tag-${it[3]==='green'?'green':'grey'}">${it[2]}</span>
            <span class="switch ${it[3]==='green'?'on':''}" data-switch></span>
          </div>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-h"><div><div class="card-title">Security & Open API</div><div class="card-sub">PCI-SSF · tokenized vault · regional data residency</div></div>
          <span class="tag tag-green">${icon('shield')}All systems compliant</span></div>
        <div class="card-body">
          <div class="set-row"><span class="sys-ic">${icon('key')}</span><div style="flex:1"><b>Live API key</b><small>sk_live_••••••••••••4F2A · last used 4 min ago</small></div>
          <button class="btn-ghost btn-sm" data-action="toast" data-t="Key rotation started" data-s="Grace window 24h · webhooks updated">Rotate</button></div>
          <div class="set-row"><span class="sys-ic">${icon('lock')}</span><div style="flex:1"><b>SSO & SCIM provisioning</b><small>Google Workspace · Okta · Microsoft Entra</small></div><span class="switch on" data-switch></span></div>
          <div class="set-row"><span class="sys-ic">${icon('database')}</span><div style="flex:1"><b>Data residency</b><small>Singapore primary · Frankfurt DR · PII regionalised</small></div><span class="tag tag-green">Active</span></div>
        </div>
      </div>
    </div>
  </div>`;
INIT.settings=()=>{syncModeUI();};

/* ============================================================
   OVERLAYS — command palette, modals, drawers
   ============================================================ */
const COMMANDS=[
  ['g','dashboard','Go to Command Center','overview'],['g','calendar','Go to Reservation Graph','reservations'],
  ['g','userCheck','Go to Front Desk','frontdesk'],['g','monitor','Go to Kiosks & Keys','kiosks'],
  ['g','brush','Go to Housekeeping','housekeeping'],['g','utensils','Go to Dining & POS','fb'],
  ['g','trend','Go to Revenue & Pricing','revenue'],['g','users','Go to Guest Intelligence','intel'],
  ['g','message','Go to Guest Messages','messages'],['g','zap','Go to Automations','automations'],
  ['g','pie','Go to Reports & BI','reports'],['g','settings','Go to Settings','settings'],
  ['a','calendarPlus','New reservation','act:new-reservation'],['a','sparkles','Ask Aves anything','act:open-ai'],
  ['a','key','Issue a digital key','act:toast:Digital key issued:Push to guest wallet'],
  ['a','monitor','Mirror kiosk 2 remotely','act:toast:Kiosk 2 mirrored:Camera + screen live'],
  ['a','clipboard','Run night audit now','act:toast:Night audit started:Posting 342 rooms'],
  ['a','sun','Toggle light / dark theme','act:toggle-theme'],
];
function openPalette(){
  const el=$('#palette');el.hidden=false;
  el.innerHTML=`<div class="ov-backdrop" data-close></div>
    <div class="palette-box">
      <div class="pm-search">${icon('search')}<input id="pm-input" placeholder="Search any guest, room, report or action…" autofocus/></div>
      <div class="pm-list" id="pm-list"></div>
    </div>`;
  const list=$('#pm-list'),inp=$('#pm-input');
  const draw=q=>{
    const items=COMMANDS.filter(c=>(c[2]+' '+c[1]).toLowerCase().includes(q.toLowerCase()));
    list.innerHTML=`<div class="pm-group">${items.length?'Actions':'No matches'}</div>`+
      items.map((c,i)=>`<div class="pm-item ${i===0?'on':''}" data-cmd="${c[3]}">
        <span class="pm-ic">${icon(c[1])}</span>${c[2]}<kbd class="pm-kbd">${c[0]==='g'?'Go':'Act'}</kbd></div>`).join('');
  };
  draw('');
  inp.oninput=()=>draw(inp.value);
  inp.onkeydown=e=>{if(e.key==='Enter'){const pick=$('.pm-item.on',list)||$('.pm-item',list);if(pick)runCommand(pick.dataset.cmd);}if(e.key==='Escape')closeOverlays();};
  list.onclick=e=>{const it=e.target.closest('.pm-item');if(it)runCommand(it.dataset.cmd);};
  setTimeout(()=>inp.focus(),20);
}
function runCommand(cmd){
  closeOverlays();
  if(cmd.startsWith('act:')){const a=cmd.slice(4);
    if(a.startsWith('toast:')){const [t,s]=a.slice(6).split(':');toast(t,s);}
    else if(a==='new-reservation')openReservationModal();
    else if(a==='open-ai')openAIDrawer();
    else if(a==='toggle-theme')toggleTheme();
  } else go(cmd);
}

function openReservationModal(){
  const el=$('#modal');el.hidden=false;
  el.innerHTML=`<div class="ov-backdrop" data-close></div>
  <div class="modal-box">
    <div class="modal-head"><span class="brand-mark" style="position:static;width:36px;height:36px;border-radius:11px">${BIRD}</span>
      <div><div class="card-title">New reservation</div><div class="card-sub">BirdOS will check rate & availability live</div></div>
      <button class="modal-x" data-close>${icon('x')}</button></div>
    <form class="modal-body" id="res-form">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        <div class="field"><label>Guest name</label><input placeholder="e.g. Isabella Moreau" required/></div>
        <div class="field"><label>Room category</label><select>
          <option>Royal Beach Villa</option><option>Overwater Suite</option><option>Grand Pool Pavilion</option>
          <option>Horizon Suite</option><option>Deluxe Lagoon</option><option>Premium Beach</option></select></div>
        <div class="field"><label>Check-in</label><input type="date" value="${new Date().toISOString().slice(0,10)}"/></div>
        <div class="field"><label>Check-out</label><input type="date" value="${addDays(new Date(),4).toISOString().slice(0,10)}"/></div>
        <div class="field"><label>Guests</label><select><option>2 adults</option><option>2 adults · 2 children</option><option>1 adult</option></select></div>
        <div class="field"><label>Source</label><select><option>Direct · booking engine</option><option>Booking.com</option><option>Expedia</option><option>Virtuoso</option><option>GDS</option></select></div>
      </div>
      <div class="field"><label>Notes</label><textarea rows="2" placeholder="Aves will detect celebrations, allergies & preferences…"></textarea></div>
      <div class="ai-rec" style="margin:6px 0 0"><span class="air-ic">${icon('sparkles')}</span>
        <div><b style="font-size:12.5px">Aves suggests</b><p style="font-size:11.5px;color:var(--mut);margin-top:2px">BAR $1,980 · prepay & save 6% · guest matching a returning Noir profile (82%).</p></div></div>
      <div class="modal-foot" style="margin-top:16px">
        <button type="button" class="btn-ghost" data-close>Cancel</button>
        <button type="submit" class="btn-gold">${icon('check')}Create & send confirmation</button>
      </div>
    </form></div>`;
  $('#res-form').onsubmit=e=>{e.preventDefault();closeOverlays();
    toast('Reservation created','Confirmation, upsell journey and folio provisioned by Aves','success');};
}

function openGuestDrawer(id){
  const g=GUESTS.find(x=>x.id===id);if(!g)return;
  const stMap={arriving:'Arriving today',inhouse:'In residence',dueout:'Due out today'};
  $('#drawer-root').innerHTML=`<aside class="drawer">
    <div class="drawer-head">
      <button class="modal-x" data-close>${icon('x')}</button>
      <div style="display:flex;gap:13px;align-items:center;width:100%">
        ${avatar(g.name,'av-46')}
        <div style="flex:1"><b style="font-family:var(--font-d);font-size:19px;display:block">${g.name}</b>
          <div style="display:flex;gap:6px;margin-top:4px;align-items:center">
            <span class="tag tag-${g.tier==='Noir'?'gold':'blue'}">${g.tier} tier</span>
            <span class="tag tag-grey">${g.source}</span>
            <span class="tag tag-green">${stMap[g.status]}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="drawer-body">
      ${g.note?`<div class="ai-rec" style="margin-bottom:16px"><span class="air-ic">${icon('sparkles')}</span><div><b style="font-size:12.3px">Guest brief</b><p style="font-size:11.5px;color:var(--mut);margin-top:2px">${g.note}</p></div></div>`:''}
      <div class="dp-kv"><span>${icon('key')} Room</span><b>${g.room}</b></div>
      <div class="dp-kv"><span>${icon('calendar')} Stay</span><b>${g.nights} nights · ${g.pax} guests</b></div>
      <div class="dp-kv"><span>${icon('clock')} ${g.status==='dueout'?'Departs':'Arrival'}</span><b>${g.time}</b></div>
      <div class="dp-kv"><span>${icon('dollar')} Nightly rate</span><b>${money(g.rate)}</b></div>
      <div class="dp-kv"><span>${icon('card')} Open balance</span><b style="color:${g.balance?'var(--amber)':'var(--emerald)'}">${g.balance?money(g.balance):'Settled'}</b></div>
      <div class="dp-kv"><span>${icon('refresh')} Loyalty points</span><b class="num">${(g.id*4280).toLocaleString()} pts</b></div>
      <div class="divider"></div>
      <b style="font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--mut)">Preferences & requests</b>
      <div class="prefs" style="margin:10px 0 16px">${g.prefs.map(p=>`<span class="p-pill">${icon('heart')}${p}</span>`).join('')}</div>
      <b style="font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--mut)">Folio preview</b>
      <div style="margin:10px 0 4px">
        ${[['Room · '+g.nights+' nights',g.rate*g.nights,'green'],['Spa & wellness',Math.round(g.rate*.35),'gold'],['Dining & in-suite',Math.round(g.rate*.22),'blue'],['Disputed / pending',g.balance?'view':'none']].filter(x=>x[2]!=='none').map(f=>`
        <div class="dp-kv"><span>${f[0]}</span><b style="color:var(--${f[2]});font-size:12px">${money(f[1])}</b></div>`).join('')}
      </div>
      <div class="divider"></div>
      <b style="font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--mut)">Journey</b>
      <div class="dp-timeline" style="margin-top:8px">
        ${['Profile enriched by Aves','Payment method tokenized','Registration card pre-signed',
           g.status==='arriving'?'Kiosk check-in pending':g.status==='dueout'?'Express departure ready':'Digital key active',
           'Post-stay NPS & review routing'].map((s,i)=>`
        <div class="dp-step"><span class="ds-dot" style="background:${i<3?'var(--emerald)':'var(--line-2)'};box-shadow:none"></span>
          <div><b style="font-size:12px">${s}</b><small>${i<3?'Completed':'Pending'}</small></div></div>`).join('')}
      </div>
    </div>
    <div class="drawer-foot">
      <button class="btn-gold" data-action="toast" data-t="${g.name}" data-s="Action confirmed · guest notified">
        ${g.status==='arriving'?icon('check')+' Check in':g.status==='dueout'?icon('logout')+' Express check-out':icon('key')+' Reissue key'}</button>
      <button class="btn-ghost" data-action="open-ai">${icon('message')}Message</button>
      <button class="btn-ghost" data-action="toast" data-t="Charge added" data-s="Posted to ${g.room} folio">${icon('plus')}Charge</button>
    </div>
  </aside>`;
}

function openAIDrawer(){
  $('#drawer-root').innerHTML=`<aside class="drawer ai-drawer">
    <div class="drawer-head">
      <span class="ai-orb" style="width:38px;height:38px;border-radius:12px">${icon('sparkles')}</span>
      <div style="flex:1"><b style="font-family:var(--font-d);font-size:18px;display:block">Aves <span class="gold-text">Intelligence</span></b>
      <small style="color:var(--mut);font-size:11px;display:flex;align-items:center;gap:6px;margin-top:2px"><span class="dot dot-green" style="width:6px;height:6px"></span>Connected to PMS · POS · RMS · IoT · channels</small></div>
      <button class="modal-x" data-close>${icon('x')}</button>
    </div>
    <div class="ai-msgs" id="ai-msgs">
      <div class="ai-msg"><span class="am-av">${icon('sparkles')}</span><div class="am-b">Bonsoir, Alexandre. The estate is at 87.4% with 42 arrivals inbound. I have 3 approvals queued and Isabella Moreau’s anniversary amenity is being set in Villa 501. What shall we refine first?</div></div>
    </div>
    <div class="ai-chips">
      ${['Summarise today’s risks','Draft arrivals briefing','Where can we earn more tonight?','Any unhappy guests?'].map(q=>`<span class="chip" data-aiq="${q}">${q}</span>`).join('')}
    </div>
    <div class="ai-input">
      <input id="ai-text" placeholder="Ask Aves about any guest, room or number…"/>
      <button class="btn-gold" id="ai-send">${icon('send')}</button>
    </div>
  </aside>`;
  const body=$('#ai-msgs');
  const respond=q=>{
    const reply=/risk/i.test(q)?'Two risks: Kiosk 2 needs passport-scan assistance (queue under 3 min), and Pavilion 401 thermostats are offline before a 16:00 return. Engineering is en route.'
      :/arrival|brief/i.test(q)?'Arrivals briefing: 42 expected, 31 already checked in. Six Noir guests include Isabella Moreau (anniversary) and Sofia Rinaldi (honeymoon). Two late check-outs compete with three early arrivals — I recommend turning Suites 405 and 410 first.'
      :/earn|revenue|more/i.test(q)?'Three moves tonight: approve +8% BAR on 18 Oct (+$18.4k), release 3 overwater suites to the waitlist (+$14.2k), and send pool upgrades to 14 eligible arrivals (+$12.4k modelled).'
      :/unhappy|sad|complaint/i.test(q)?'No unresolved detractors right now. Two soft signals: Room 210 wanted a printed folio (done), and one guest flagged wait-time at L’Or Bleu — host is compressing the bar course.'
      :/occupancy|housekeep/i.test(q)?'86 of 100 service tasks are complete; the at-risk zone is Floor 3 (Room 312 priority turn). I reassigned Lauren to support Priya — projected SLA restored by 15:10.'
      :'Noted — I have that in context. I can draft the message, model the rate, or open the relevant ledger. Shall I proceed with my recommended action?';
    body.insertAdjacentHTML('beforeend',`<div class="ai-msg"><span class="am-av">${icon('sparkles')}</span><div class="am-b" style="padding:0;border:none;background:none">
      <span class="am-b" style="display:inline-block"><i class="ai-typing"><i></i><i></i><i></i></i></span></div></div>`);
    body.scrollTop=body.scrollHeight;
    const node=body.lastElementChild;
    setTimeout(()=>{node.innerHTML=`<span class="am-av" style="visibility:hidden">${icon('sparkles')}</span><div class="am-b">${reply}</div>`;body.scrollTop=body.scrollHeight;},1250);
  };
  const ask=q=>{if(!q.trim())return;
    body.insertAdjacentHTML('beforeend',`<div class="ai-msg user"><span class="am-av" style="background:var(--gold-grad)">${icon('sparkles')}</span><div class="am-b">${q}</div></div>`);
    body.scrollTop=body.scrollHeight;respond(q);
  };
  $('#ai-send').onclick=()=>{const i=$('#ai-text');ask(i.value);i.value='';};
  $('#ai-text').onkeydown=e=>{if(e.key==='Enter'){ask(e.target.value);e.target.value='';}};
  $$('[data-aiq]').forEach(c=>c.onclick=()=>ask(c.dataset.aiq));
}

function closeOverlays(){
  $('#palette').hidden=true;$('#modal').hidden=true;$('#drawer-root').innerHTML='';
}
function toggleTheme(){
  const cur=document.documentElement.dataset.theme;
  setTheme(cur==='dark'?'light':'dark');
}
function setTheme(t){
  document.documentElement.dataset.theme=t;
  try{localStorage.setItem('birdos-theme',t);}catch(e){}
  syncModeUI();
}
function setMode(m){
  document.documentElement.dataset.mode=m;
  try{localStorage.setItem('birdos-mode',m);}catch(e){}
  syncModeUI();
}
function syncModeUI(){
  const m=document.documentElement.dataset.mode||'classic';
  $$('[data-mode-btn]').forEach(b=>b.classList.toggle('on',b.dataset.modeBtn===m));
  const t=document.documentElement.dataset.theme||'light';
  $$('button[data-theme]').forEach(b=>b.classList.toggle('on',b.dataset.theme===t));
}

/* ============================================================
   GLOBAL INTERACTIONS
   ============================================================ */
document.addEventListener('click',e=>{
  const viewLink=e.target.closest('[data-view]');
  if(viewLink){go(viewLink.dataset.view);$('#app').classList.remove('menu-open');closeOverlays();return;}

  const sw=e.target.closest('[data-switch]');
  if(sw){sw.classList.toggle('on');toast('Preference updated',sw.classList.contains('on')?'Enabled across the property':'Disabled','gold');return;}

  const acc=e.target.closest('[data-accent]');
  if(acc){
    $$('[data-accent]').forEach(s=>s.classList.remove('on'));acc.classList.add('on');
    const sets=[null,
      ['#B07A68','#8A5348','#ECC4B6','#F8E4DC'],
      ['#2F7D60','#144A37','#A6D3BE','#DCF0E4'],
      ['#3E639E','#213F6E','#AEC6EE','#DCE7FA']][+acc.dataset.accent];
    if(sets){const r=document.documentElement.style;
      r.setProperty('--gold',sets[0]);r.setProperty('--gold-deep',sets[1]);r.setProperty('--gold-2',sets[2]);r.setProperty('--gold-3',sets[3]);
      r.setProperty('--gold-grad',`linear-gradient(125deg,${sets[1]} 0%,${sets[2]} 45%,${sets[0]} 75%,${sets[1]} 100%)`);
      toast('Signature metal changed','Applied across the console','gold');
    } else {
      ['--gold','--gold-deep','--gold-2','--gold-3','--gold-grad'].forEach(p=>document.documentElement.style.removeProperty(p));
    }
    return;
  }

  const themeBtn=e.target.closest('button[data-theme]');
  if(themeBtn){setTheme(themeBtn.dataset.theme);toast('Mood set',themeBtn.dataset.theme==='dark'?'Nuit · midnight & gold':'Maison · platinum & gold','gold');return;}

  const modeBtn=e.target.closest('[data-mode-btn]');
  if(modeBtn){setMode(modeBtn.dataset.modeBtn);toast('Theme style',modeBtn.dataset.modeBtn==='modern'?'Modern · aurora & color':'Classic · platinum & gold','gold');return;}

  const bid=e.target.closest('[data-bid]');
  if(bid && S.view==='reservations'){
    const [ri,bi]=bid.dataset.bid.split('-').map(Number);
    const root=$('#dp-root');if(root){root.innerHTML=reservationPanel(ri,bi);root.closest('.card').classList.add('in');
      void root.offsetWidth;bid.style.filter='brightness(1.12)';}
    return;
  }

  const notifBtn=e.target.closest('#notif-btn');
  if(notifBtn){e.stopPropagation();const d=$('#notif-drop');d.hidden=!d.hidden;return;}
  if(!e.target.closest('#notif-drop')){const d=$('#notif-drop');if(d&&!d.hidden)d.hidden=true;}
  if(!e.target.closest('.tb-prop')){const d=$('#property-drop');if(d&&!d.hidden)d.hidden=true;}

  if(e.target.closest('[data-close]')){closeOverlays();return;}

  const actEl=e.target.closest('[data-action]');
  if(actEl){
    const a=actEl.dataset.action;
    if(a==='toggle-theme')toggleTheme();
    else if(a==='collapse')$('#app').classList.toggle('collapsed');
    else if(a==='menu')$('#app').classList.toggle('menu-open');
    else if(a==='open-palette')openPalette();
    else if(a==='new-reservation')openReservationModal();
    else if(a==='open-ai')openAIDrawer();
    else if(a==='open-property'){
      const d=$('#property-drop');
      if(d){d.hidden=!d.hidden;}
    }
    else if(a==='switch-property'){
      const id=actEl.dataset.id;
      setProperty(id);S.prop=id;
      $('#property-drop').hidden=true;
      renderTopbar();renderSidebar();renderPulse();
      toast('Property switched',activeProperty().name+' · '+activeProperty().location,activeProperty().accent);
      go(S.view);
      return;
    }
    else if(a==='guest-detail')openGuestDrawer(+actEl.dataset.id);
    else if(a==='mark-all'){$$('#notif-drop .drop-item').forEach(x=>x.style.opacity=.45);$('.ping').style.display='none';toast('All caught up','Notifications marked as read');}
    else if(a==='toast')toast(actEl.dataset.t||'Done',actEl.dataset.s||'','gold');
    return;
  }
});

document.addEventListener('keydown',e=>{
  if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openPalette();}
  if(e.key==='Escape')closeOverlays();
});

/* ============================================================
   BOOT
   ============================================================ */
(function boot(){
  const defs=document.createElementNS('http://www.w3.org/2000/svg','svg');
  defs.setAttribute('width','0');defs.setAttribute('height','0');defs.style.position='absolute';
  defs.innerHTML=`<defs><linearGradient id="gGold" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#8A6B1F"/><stop offset=".45" stop-color="#F2E0AE"/><stop offset="1" stop-color="#B8933F"/></linearGradient></defs>`;
  $('#app').prepend(defs);

  try{const saved=localStorage.getItem('birdos-theme');if(saved)document.documentElement.dataset.theme=saved;}catch(e){}
  try{const savedMode=localStorage.getItem('birdos-mode');document.documentElement.dataset.mode=savedMode||'classic';}catch(e){document.documentElement.dataset.mode='classic';}

  renderSidebar();renderTopbar();renderPulse();

  /* fixed chrome (topbar, pulse strip) is outside the scroll container —
     forward wheel over it so the page always feels scrollable */
  ['topbar','pulse'].forEach(id=>{
    const el=document.getElementById(id);
    if(el)el.addEventListener('wheel',e=>{const v=$('#view');if(v)v.scrollTop+=e.deltaY;},{passive:true});
  });

  go('overview');

  setInterval(()=>{const c=$('#tb-clock');if(c)c.textContent=clockNow();},30000);
  setTimeout(()=>toast('Welcome back, Alexandre','Aves has prepared your evening briefing','gold'),1200);
})();
