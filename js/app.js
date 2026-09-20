"use strict";
/* ============================================================================
   SmartPark — Smart Parking Management System
   Layout, palette and component language preserved from the reference app.
   ========================================================================== */

/* ---------------------------------- Icons -------------------------------- */
const ICON = {
  dashboard:'<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
  map:'<path d="M9 20l-5.4 2.3A1 1 0 0 1 2 21.4V6.6a1 1 0 0 1 .6-.9L9 3m0 17 6 2m-6-2V3m6 19 5.4-2.3a1 1 0 0 0 .6-.9V4a1 1 0 0 0-1.4-.9L15 5m0 17V5m0 0L9 3"/>',
  pin:'<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  car:'<path d="M5 17h14M6.5 17a1.5 1.5 0 1 0 0 .01M17.5 17a1.5 1.5 0 1 0 0 .01"/><path d="M3 17v-3.5L5 8a2 2 0 0 1 1.9-1.4h10.2A2 2 0 0 1 19 8l2 5.5V17"/><path d="M3.5 13.5h17"/>',
  bell:'<path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
  shield:'<path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
  zap:'<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>',
  ambulance:'<path d="M3 17V7a1 1 0 0 1 1-1h10v11"/><path d="M14 9h4l3 4v4h-3"/><circle cx="7.5" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/><path d="M8 8v4M6 10h4"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  check:'<path d="m5 12 5 5L20 7"/>',
  checkCircle:'<circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.5 2.5 4.5-5"/>',
  x:'<path d="M18 6 6 18M6 6l12 12"/>',
  xCircle:'<circle cx="12" cy="12" r="9"/><path d="m15 9-6 6m0-6 6 6"/>',
  warn:'<path d="M10.3 3.9 2.4 17a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 4h.01"/>',
  alert:'<circle cx="12" cy="12" r="9"/><path d="M12 8v4.5m0 3.5h.01"/>',
  gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8M12 8v13"/><path d="M12 8S10.5 3 8 3a2.5 2.5 0 0 0 0 5h4Zm0 0s1.5-5 4-5a2.5 2.5 0 0 1 0 5h-4Z"/>',
  trend:'<path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7.5 19.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3.6 14H3a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 4.6 7.5l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 10 3.6V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.5 1.4l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z"/>',
  users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',
  card:'<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20"/>',
  history:'<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 4v4h4"/><path d="M12 8v4.5l3 1.8"/>',
  wifiOff:'<path d="m2 2 20 20"/><path d="M8.5 16.4a5 5 0 0 1 7 0"/><path d="M5 12.9a10 10 0 0 1 3.5-2.2"/><path d="M15.5 10.7A10 10 0 0 1 19 12.9"/><path d="M2 8.8A15 15 0 0 1 7 6"/><path d="M17 6a15 15 0 0 1 5 2.8"/><path d="M12 20h.01"/>',
  wifi:'<path d="M5 12.9a10 10 0 0 1 14 0"/><path d="M2 8.8a15 15 0 0 1 20 0"/><path d="M8.5 16.4a5 5 0 0 1 7 0"/><path d="M12 20h.01"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  filter:'<path d="M3 5h18l-7 8v5l-4 2v-7L3 5Z"/>',
  chevronR:'<path d="m9 18 6-6-6-6"/>',
  chevronD:'<path d="m6 9 6 6 6-6"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  trash:'<path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m3 0v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6"/><path d="M10 11v6M14 11v6"/>',
  logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
  camera:'<path d="M3 8a2 2 0 0 1 2-2h2.5l1.3-2h6.4L16.5 6H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><circle cx="12" cy="13" r="3.5"/>',
  ai:'<path d="m12 3 1.9 4.6L18.5 9.5 13.9 11.4 12 16l-1.9-4.6L5.5 9.5l4.6-1.9Z"/><path d="M18.5 15.5 19.4 18l2.5.9-2.5.9-.9 2.5-.9-2.5-2.5-.9 2.5-.9Z"/>',
  menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
  eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  lock:'<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3"/>',
  ban:'<circle cx="12" cy="12" r="9"/><path d="m5.6 5.6 12.8 12.8"/>',
  activity:'<path d="M3 12h4l3 8 4-16 3 8h4"/>',
  file:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/>',
  arrowR:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  refresh:'<path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 3v6h-6"/>',
  star:'<path d="m12 3 2.8 5.8 6.2.9-4.5 4.4 1.1 6.2L12 17.4 6.4 20.3l1.1-6.2L3 9.7l6.2-.9Z"/>',
  route:'<circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M9 19h6a4 4 0 0 0 0-8H9a4 4 0 0 1 0-8h3"/>',
  battery:'<rect x="2" y="7" width="16" height="10" rx="2.5"/><path d="M22 10v4"/><path d="m11 9-2 3h3l-2 3"/>',
  rupee:'<path d="M7 4h10M7 9h10M15 4c0 4-3.2 5-6 5l7 10"/>',
  accessible:'<circle cx="12" cy="4.5" r="1.8"/><path d="M9 9.5h6M12 8v6h4l2 5"/><path d="M13.5 14a4.5 4.5 0 1 1-4.7-3.5"/>',
  download:'<path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 19h16"/>',
  play:'<path d="M6 4v16l14-8Z"/>',
  book:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2Z"/><path d="M4 19a2 2 0 0 1 2-2h13"/>',
  inbox:'<path d="M3 12h5l2 3h4l2-3h5"/><path d="M5 5h14l2 7v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6Z"/>',
  sliders:'<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h10M18 18h2"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="16" cy="18" r="2"/>',
};
function icon(name, size, cls){
  const p = ICON[name] || ICON.alert;
  return `<svg class="${cls||''}" width="${size||20}" height="${size||20}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
}

/* --------------------------------- Helpers -------------------------------- */
const MIN = 60000, HOUR = 3600000;
const esc = s => String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid = p => p + '-' + Math.random().toString(36).slice(2,8) + Date.now().toString(36).slice(-3);
const pad = n => String(n).padStart(2,'0');
const fmtT = d => d ? new Date(d).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : '—';
const fmtDT = d => d ? new Date(d).toLocaleDateString([], {month:'short', day:'numeric'}) + ', ' + fmtT(d) : '—';
const fmtD = d => d ? new Date(d).toLocaleDateString([], {month:'short', day:'numeric', year:'numeric'}) : '—';
const money = n => '₹' + Math.round(n||0).toLocaleString('en-IN');
const minsLeft = (t, now) => Math.max(0, Math.ceil((new Date(t) - now)/MIN));
const minsBetween = (a,b) => Math.max(0, Math.round((new Date(b)-new Date(a))/MIN));
function cdown(t, now){
  const ms = Math.max(0, new Date(t) - now); const s = Math.floor(ms/1000);
  return Math.floor(s/60) + ':' + pad(s%60);
}
function durText(m){ m = Math.max(0, Math.round(m)); const h = Math.floor(m/60); return h ? `${h}h ${m%60}m` : `${m}m`; }
function hash(str){ let h=2166136261; for(let i=0;i<str.length;i++){ h^=str.charCodeAt(i); h=Math.imul(h,16777619);} return (h>>>0)/4294967295; }
function clamp(v,a,b){ return Math.min(b, Math.max(a, v)); }
function toLocalInput(d){ d=new Date(d); return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`; }

/* ------------------------------- Seed / Store ----------------------------- */
const KEY = 'smartpark.v3';

const USERS = [
  { id:'aarav',  name:'Aarav Mehta',  role:'user',  email:'aarav@smartpark.io',  phone:'+91 98765 43210', since:'2024-07-11' },
  { id:'priya',  name:'Priya Nair',   role:'user',  email:'priya@smartpark.io',  phone:'+91 98220 11884', since:'2025-01-03' },
  { id:'rohan',  name:'Rohan Gupta',  role:'user',  email:'rohan@smartpark.io',  phone:'+91 99881 20034', since:'2025-05-19' },
  { id:'admin',  name:'Admin',        role:'admin', email:'ops@smartpark.io',    phone:'+91 98100 00000', since:'2024-01-01' },
];

function seedSlots(){
  const out = [];
  const mk = (id, floor, kind, dist) => ({ id, name:id, floor, kind, dist, status:'free', vehicleNo:null });
  for (let i=1;i<=10;i++) out.push(mk('A'+i, 'A', 'normal', 10 + i*4));
  for (let i=1;i<=12;i++){
    const kind = (i<=2) ? 'accessible' : (i>=9 ? 'ev' : 'normal');
    out.push(mk('B'+i, 'B', kind, 45 + i*4));
  }
  for (let i=1;i<=8;i++) out.push(mk('C'+i, 'C', i>=7 ? 'ev' : 'normal', 95 + i*5));
  for (let i=1;i<=3;i++) out.push(mk('E'+i, 'E', 'emergency', 5 + i*3));
  return out;
}

const VEHICLE_TYPES = ['Hatchback','Sedan','SUV','EV Sedan','EV SUV','Bike','Van'];
const EMERGENCY_TYPES = ['Ambulance','Fire Truck','Police Vehicle','Emergency Response Vehicle','Disaster Response Unit'];

function seedDb(now){
  const t = now.getTime();
  const at = m => new Date(t + m*MIN);

  const vehicles = [
    { id:'v1', userId:'aarav', no:'PB65 AB 1234', type:'Sedan',    ev:false, make:'Honda City',   primary:true },
    { id:'v2', userId:'aarav', no:'PB10 EV 4455', type:'EV Sedan', ev:true,  make:'Tata Nexon EV',primary:false },
    { id:'v3', userId:'priya', no:'CH01 CJ 7788', type:'SUV',      ev:false, make:'Hyundai Creta',primary:true },
    { id:'v4', userId:'rohan', no:'DL08 KA 9021', type:'Hatchback',ev:false, make:'Maruti Swift', primary:true },
    { id:'v5', userId:'priya', no:'PB11 EV 0099', type:'EV SUV',   ev:true,  make:'MG ZS EV',     primary:false },
  ];

  const bookings = [];
  const B = o => { bookings.push(Object.assign({
    id: uid('rsv'), userId:'aarav', userName:'Aarav Mehta', vehicleNo:'PB65 AB 1234', vehicleType:'Sedan', ev:false,
    slotId:'A1', start:at(-60), end:at(0), graceEnd:at(15), status:'Active', rate:40, amount:0, paid:false,
    penaltyId:null, benefitApplied:null, compensationId:null, exitTime:null, source:'app', flags:{}
  }, o)); return bookings[bookings.length-1]; };

  // --- Live sessions on the floor -----------------------------------------
  // The demo user's own session: ends in ~9 minutes so the full expiry →
  // grace → overstay lifecycle plays out during a normal demo.
  B({ slotId:'A4', userId:'aarav', userName:'Aarav Mehta', vehicleNo:'PB65 AB 1234',
      start:at(-111), end:at(9), graceEnd:at(24), status:'Active', rate:40 });

  // Another driver's vehicle that has already overstayed, blocking B3.
  const over = B({ id:'rsv-over', slotId:'B3', userId:'rohan', userName:'Rohan Gupta', vehicleNo:'DL08 KA 9021',
      vehicleType:'Hatchback', start:at(-140), end:at(-32), graceEnd:at(-17), status:'Overstayed', rate:40 });

  // The demo user's reservation on that same slot — the compensation case.
  B({ slotId:'B3', userId:'aarav', userName:'Aarav Mehta', vehicleNo:'PB10 EV 4455', vehicleType:'EV Sedan', ev:true,
      start:at(-3), end:at(117), graceEnd:at(132), status:'Reserved', rate:45 });

  // An upcoming reservation.
  B({ slotId:'A2', userId:'aarav', userName:'Aarav Mehta', vehicleNo:'PB65 AB 1234',
      start:at(95), end:at(215), graceEnd:at(230), status:'Reserved', rate:40 });

  // Background occupancy from other drivers.
  const bg = [['A1','priya','Priya Nair','CH01 CJ 7788','SUV',-70,40],
              ['A7','rohan','Rohan Gupta','DL08 KA 9021','Hatchback',-25,95],
              ['B1','priya','Priya Nair','CH01 CJ 7788','SUV',-48,52],
              ['B6','rohan','Rohan Gupta','DL08 KA 9021','Hatchback',-90,30],
              ['B9','priya','Priya Nair','PB11 EV 0099','EV SUV',-40,80],
              ['C1','priya','Priya Nair','CH01 CJ 7788','SUV',-15,165],
              ['C4','rohan','Rohan Gupta','DL08 KA 9021','Hatchback',-33,27]];
  bg.forEach(([slot,uidv,nm,no,ty,st,dur]) => B({
    slotId:slot, userId:uidv, userName:nm, vehicleNo:no, vehicleType:ty, ev:no.includes('EV'),
    start:at(st), end:at(st+dur), graceEnd:at(st+dur+15), status:'Active', rate: ty.startsWith('EV')?45:40
  }));

  // --- History -------------------------------------------------------------
  const hist = [];
  const names = {aarav:'Aarav Mehta', priya:'Priya Nair', rohan:'Rohan Gupta'};
  const vno  = {aarav:'PB65 AB 1234', priya:'CH01 CJ 7788', rohan:'DL08 KA 9021'};
  const slotPool = ['A1','A3','A5','A6','A8','A9','B2','B4','B5','B7','B8','B10','C2','C3','C5','C6','B11','C7'];
  for (let d=1; d<=26; d++){
    const perDay = 3 + Math.floor(hash('d'+d)*4);
    for (let k=0; k<perDay; k++){
      const seed = hash('h'+d+'-'+k);
      const uidv = ['aarav','priya','rohan'][Math.floor(hash('u'+d+k)*3)];
      const slot = slotPool[Math.floor(seed*slotPool.length)];
      const startH = 7 + Math.floor(hash('s'+d+k)*13);
      const dur = 1 + Math.floor(hash('dur'+d+k)*4);
      const s = new Date(t - d*86400000); s.setHours(startH, Math.floor(hash('m'+d+k)*59), 0, 0);
      const e = new Date(s.getTime() + dur*HOUR);
      const overstayed = hash('o'+d+k) > 0.86;
      const rate = slot[0]==='B' && +slot.slice(1) >= 9 ? 45 : 40;
      const pen = overstayed ? 100 + 50*Math.ceil((10+hash('p'+d+k)*80)/60) : 0;
      hist.push({
        id: uid('rsv'), userId:uidv, userName:names[uidv], vehicleNo:vno[uidv], vehicleType:'Sedan', ev:slot==='B11'||slot==='C7',
        slotId:slot, start:s, end:e, graceEnd:new Date(e.getTime()+15*MIN),
        exitTime: new Date(e.getTime() + (overstayed ? (20+hash('x'+d+k)*70)*MIN : -hash('y'+d+k)*8*MIN)),
        status:'Completed', rate, amount: rate*dur + pen, paid:true, penaltyAmount:pen,
        overstayed, benefitApplied:null, compensationId:null, source:'app', flags:{}
      });
    }
  }

  const penalties = [
    { id:'pen-seed-1', userId:'rohan', userName:'Rohan Gupta', bookingId:'rsv-over', vehicleNo:'DL08 KA 9021',
      slotId:'B3', minutes: 17, amount: 150, status:'Unpaid', createdAt: at(-17) },
    { id:'pen-seed-2', userId:'priya', userName:'Priya Nair', bookingId:'old-1', vehicleNo:'CH01 CJ 7788',
      slotId:'C3', minutes: 42, amount: 150, status:'Paid', createdAt: new Date(t-2*86400000), settledAt:new Date(t-2*86400000+3*HOUR) },
  ];

  const violations = [
    { id:'vio-1', type:'EV-only', vehicleNo:'HR26 XX 1102', slotId:'B11', owner:'—', detectedAt: at(-38),
      status:'Open', action:null, note:'Non-EV vehicle detected in EV charging bay.' },
    { id:'vio-2', type:'Reserved slot', vehicleNo:'PB08 ZZ 7781', slotId:'C2', owner:'Priya Nair', detectedAt: at(-12),
      status:'Open', action:null, note:'Vehicle parked in a slot reserved by another user.' },
    { id:'vio-3', type:'Emergency-only', vehicleNo:'CH04 QQ 3390', slotId:'E3', detectedAt: new Date(t-86400000),
      owner:'—', status:'Resolved', action:'Towed', note:'Blocked the emergency access lane.' },
  ];

  return {
    slots: seedSlots(),
    vehicles,
    bookings: bookings.concat(hist),
    penalties,
    benefits: [],
    violations,
    notifications: [
      { id:uid('ntf'), audience:'all', title:'High parking demand', kind:'info',
        message:'Parking demand is currently high. Dynamic pricing is in effect.', createdAt: at(-6), read:false },
      { id:uid('ntf'), audience:'admin', title:'Unauthorized vehicle detected', kind:'violation',
        message:'HR26 XX 1102 was detected in EV-only bay B11.', createdAt: at(-38), read:false },
    ],
    emergencyVehicles: [
      { id:'ev-1', no:'AMB-101',  type:'Ambulance',  auth:'Authorized', slotId:null, addedAt: at(-6000) },
      { id:'ev-2', no:'FIRE-77',  type:'Fire Truck', auth:'Authorized', slotId:null, addedAt: at(-6000) },
      { id:'ev-3', no:'PCR-455',  type:'Police Vehicle', auth:'Pending', slotId:null, addedAt: at(-300) },
    ],
    emergencyReservations: [],
    overrides: [],
    events: [
      { id:uid('evt'), at: at(-38), kind:'violation', text:'Unauthorized vehicle HR26 XX 1102 detected in EV bay B11.' },
      { id:uid('evt'), at: at(-17), kind:'overstay',  text:'Vehicle DL08 KA 9021 exceeded grace period in slot B3.' },
    ],
    charging: { 'B9': { pct: 62, kw: 7.4 }, 'B11': { pct: 0, kw: 0 } },
    settings: {
      graceMinutes: 15, penaltyBase: 100, penaltyPerHour: 50, baseRate: 40, evRate: 45,
      peakSurcharge: 10, demandSurcharge: 10, occupancyThreshold: 75,
      allowMultipleBenefits: false, timeSpeed: 1, anprConfidence: 92, autoResolveHours: 24,
    },
    sync: { lastSync: at(-2), pending: [] },
  };
}

/* ------------------------------ Persistence ------------------------------ */
const DATE_KEYS = new Set(['start','end','graceEnd','exitTime','createdAt','settledAt','issuedAt','usedAt','detectedAt','addedAt','at','lastSync','startTime','endTime','timestamp','queuedAt']);
function save(db){ try{ localStorage.setItem(KEY, JSON.stringify(db)); }catch(e){} }
function load(now){
  try{
    const raw = localStorage.getItem(KEY);
    if (!raw) return seedDb(now);
    const parsed = JSON.parse(raw, (k,v) =>
      DATE_KEYS.has(k) && typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(v) ? new Date(v) : v);
    const base = seedDb(now);
    return Object.assign({}, base, parsed, { settings: Object.assign({}, base.settings, parsed.settings||{}) });
  }catch(e){ return seedDb(now); }
}
function resetAll(){ try{ localStorage.removeItem(KEY); }catch(e){} }

/* ============================== Application state ========================= */
const S = {
  user: null,
  tab: 'dashboard',
  db: null,
  offset: 0,          // virtual-clock offset, for demo acceleration
  now: new Date(),
  offline: false,
  booting: true,
  ui: {
    navOpen: false, notifOpen: false, modal: null, toasts: [],
    mapFloor: 'all', mapFilter: 'all', evOnly: false,
    histSearch: '', histFilter: 'all', histSort: 'recent', histPage: 1,
    notifFilter: 'all', slotSearch: '', resFilter: 'all', vioFilter: 'open',
    userSearch: '', analyticsRange: 'week', selectedSlot: null,
    form: {}, anpr: { scanning:false, result:null },
    syncing: false, seenNotif: null,
  },
};
const now = () => S.now;

/* ================================ Engine ================================== */
function notify(db, audience, title, message, kind, extra){
  db.notifications.unshift(Object.assign({
    id: uid('ntf'), audience, title, message, kind, createdAt: S.now, read:false
  }, extra||{}));
  if (db.notifications.length > 250) db.notifications.length = 250;
}
function logEvent(db, kind, text){
  db.events.unshift({ id: uid('evt'), at: S.now, kind, text });
  if (db.events.length > 200) db.events.length = 200;
}
function penaltyFor(minutes, st){
  if (minutes <= 0) return 0;
  return st.penaltyBase + Math.ceil(minutes/60) * st.penaltyPerHour;
}
const holds = b => !b.exitTime && ['Reserved','Active','Grace','Overstayed'].includes(b.status);

/** Advance every session, raise penalties, issue compensation, emit alerts. */
function tick(db, t){
  const st = db.settings;
  let dirty = false;
  const blocked = new Set(db.bookings.filter(b => b.status === 'Overstayed' && !b.exitTime).map(b => b.slotId));

  for (const b of db.bookings){
    if (b.status === 'Completed' || b.status === 'Cancelled') continue;
    b.flags = b.flags || {};

    // Other drivers are simulated: most clear their bay inside the grace period,
    // a few overstay, incur a penalty and then leave.
    if (S.user && b.userId !== S.user.id && (b.status === 'Grace' || b.status === 'Overstayed')){
      const r = hash(b.id + 'leave');
      const overstays = b.id === 'rsv-over' || r > 0.82;
      const leaveAt = overstays
        ? new Date(b.graceEnd.getTime() + (b.id === 'rsv-over' ? 12 : 6 + r*40) * MIN)
        : new Date(b.end.getTime() + r * st.graceMinutes * MIN);
      const leaving = overstays ? (b.status === 'Overstayed' && t >= leaveAt) : t >= leaveAt;
      if (leaving){
        b.exitTime = t;
        b.status = 'Completed';
        b.overstayed = !!b.penaltyId;
        b.paid = true;
        b.amount = (b.amount || b.rate * Math.max(1, Math.ceil(minsBetween(b.start, t)/60)))
          + (b.penaltyId ? (db.penalties.find(p => p.id === b.penaltyId)||{amount:0}).amount : 0);
        if (b.penaltyId){ const p = db.penalties.find(x => x.id === b.penaltyId); if (p && p.status === 'Unpaid'){ p.status = 'Paid'; p.settledAt = t; } }
        db.violations.filter(v => v.slotId === b.slotId && v.type === 'Overstay' && v.status === 'Open')
          .forEach(v => { v.status = 'Resolved'; v.action = 'Vehicle removed'; });
        logEvent(db, 'exit', `${b.vehicleNo} left slot ${b.slotId}.`);
        db.bookings.filter(n => n.slotId === b.slotId && n.status === 'Reserved' && n.start <= t && !n.flags.readyNotice)
          .forEach(n => { n.flags.readyNotice = true;
            notify(db, n.userId, 'Your reserved slot is ready', `Slot ${n.slotId} has been vacated and is ready for ${n.vehicleNo}.`, 'benefit', { slotId: n.slotId }); });
        dirty = true;
        continue;
      }
    }

    // Reserved → Active, unless a previous vehicle is still sitting in the slot.
    if (b.status === 'Reserved' && t >= b.start){
      if (blocked.has(b.slotId)){
        if (!b.flags.conflict){
          b.flags.conflict = true; b.conflict = true; dirty = true;
          const blocker = db.bookings.find(x => x.slotId === b.slotId && x.status === 'Overstayed' && !x.exitTime);
          b.delayedBy = blocker ? blocker.id : null;
          notify(db, b.userId, 'Your reservation has been affected',
            `Slot ${b.slotId} is still occupied by a vehicle that overstayed its allowed time. We are resolving it now.`,
            'warning', { slotId: b.slotId, vehicleNo: b.vehicleNo });
          notify(db, 'admin', 'Reservation conflict',
            `Reservation on ${b.slotId} (${b.userName}) is blocked by an overstaying vehicle.`, 'warning', { slotId: b.slotId });
          logEvent(db, 'conflict', `Reservation conflict on slot ${b.slotId}: ${b.userName} delayed by an overstaying vehicle.`);
          issueCompensation(db, b, 'Affected by a previous vehicle overstay');
        }
      } else if (t >= b.start) {
        b.status = 'Active'; dirty = true;
        if (b.flags.conflict) logEvent(db, 'conflict', `Slot ${b.slotId} released — ${b.userName} checked in.`);
      }
    }

    // Expiry warning, 10 minutes out.
    if (b.status === 'Active' && !b.flags.warn10 && (b.end - t) <= 10*MIN && (b.end - t) > 0){
      b.flags.warn10 = true; dirty = true;
      notify(db, b.userId, 'Parking expires soon',
        `Your parking in slot ${b.slotId} expires in ${minsLeft(b.end, t)} minutes.`, 'warning',
        { slotId:b.slotId, vehicleNo:b.vehicleNo, endTime:b.end });
    }

    // Active → Grace period.
    if (b.status === 'Active' && t >= b.end){
      b.status = 'Grace'; dirty = true;
      if (!b.flags.grace){
        b.flags.grace = true;
        notify(db, b.userId, 'Parking session expired',
          `Your session has expired. You are in the ${st.graceMinutes}-minute grace period — please exit slot ${b.slotId} to avoid a penalty.`,
          'warning', { slotId:b.slotId, vehicleNo:b.vehicleNo, graceEnd:b.graceEnd });
      }
    }

    // Inside the grace period.
    if (b.status === 'Grace'){
      if (!b.flags.grace5 && (b.graceEnd - t) <= 5*MIN){
        b.flags.grace5 = true; dirty = true;
        notify(db, b.userId, 'Grace period ending',
          'Your grace period ends in under 5 minutes. Please remove your vehicle immediately.', 'warning',
          { slotId:b.slotId, vehicleNo:b.vehicleNo, graceEnd:b.graceEnd });
      }
      if (t > b.graceEnd){ b.status = 'Overstayed'; blocked.add(b.slotId); dirty = true; }
    }

    // Overstay → penalty, kept current while the vehicle is still there.
    if (b.status === 'Overstayed'){
      const mins = Math.max(0, Math.ceil(((b.exitTime || t) - b.graceEnd)/MIN));
      const amt = penaltyFor(mins, st);
      let p = b.penaltyId ? db.penalties.find(x => x.id === b.penaltyId) : null;
      if (!p){
        p = { id: uid('pen'), userId:b.userId, userName:b.userName, bookingId:b.id, vehicleNo:b.vehicleNo,
              slotId:b.slotId, minutes:mins, amount:amt, status:'Unpaid', createdAt:t };
        db.penalties.push(p); b.penaltyId = p.id; dirty = true;
        notify(db, b.userId, 'Your vehicle has overstayed',
          `Vehicle ${b.vehicleNo} has overstayed in slot ${b.slotId}. A penalty of ${money(amt)} has been applied.`,
          'penalty', { slotId:b.slotId, vehicleNo:b.vehicleNo });
        notify(db, 'admin', 'Overstay detected',
          `${b.vehicleNo} has overstayed in slot ${b.slotId}.`, 'penalty', { slotId:b.slotId, vehicleNo:b.vehicleNo });
        logEvent(db, 'overstay', `Vehicle ${b.vehicleNo} overstayed in slot ${b.slotId}; penalty ${money(amt)} applied.`);
        db.violations.unshift({ id: uid('vio'), type:'Overstay', vehicleNo:b.vehicleNo, slotId:b.slotId,
          owner:b.userName, detectedAt:t, status:'Open', action:null, note:'Vehicle remained past the grace period.' });
      } else if (p.status === 'Unpaid' && !b.exitTime && (p.minutes !== mins || p.amount !== amt)){
        p.minutes = mins; p.amount = amt; dirty = true;
      }
    }
  }
  // Ambient arrivals keep the facility realistic: new vehicles turn up while
  // occupancy sits below the level the forecast expects for this hour.
  db.sim = db.sim || { lastArrival: t };
  if (t - new Date(db.sim.lastArrival) >= 3*MIN){
    db.sim.lastArrival = t;
    const parking = db.slots.filter(s => s.kind !== 'emergency');
    const free = parking.filter(s => liveStatus(db, s, t) === 'free');
    const occPct = Math.round((parking.length - free.length) / Math.max(1, parking.length) * 100);
    const target = demandCurve(t.getHours());
    if (free.length && occPct < target){
      const pool = [['priya','Priya Nair','CH01 CJ 7788','SUV'], ['rohan','Rohan Gupta','DL08 KA 9021','Hatchback'],
                    ['priya','Priya Nair','PB11 EV 0099','EV SUV']];
      const who = pool[Math.floor(Math.random()*pool.length)];
      const ev = who[3].startsWith('EV');
      const pick = (ev ? free.filter(s => s.kind === 'ev') : free.filter(s => s.kind !== 'ev'))[0] || free[0];
      const dur = (1 + Math.floor(Math.random()*3)) * 60;
      const end = new Date(t.getTime() + dur*MIN);
      db.bookings.unshift({ id: uid('rsv'), userId:who[0], userName:who[1], vehicleNo:who[2], vehicleType:who[3], ev,
        slotId: pick.id, start: t, end, graceEnd: new Date(end.getTime() + st.graceMinutes*MIN), status:'Active',
        rate: pick.kind === 'ev' ? st.evRate : st.baseRate, amount:0, paid:false, penaltyId:null,
        benefitApplied:null, compensationId:null, exitTime:null, source:'gate', flags:{} });
      dirty = true;
    }
  }

  if (dirty) save(db);
  return dirty;
}

/** Free-parking compensation for a user whose reservation was disrupted. */
function issueCompensation(db, booking, reason){
  const st = db.settings;
  const held = db.benefits.some(x => x.userId === booking.userId && x.status === 'Available');
  if (held && !st.allowMultipleBenefits){
    notify(db, booking.userId, 'Reservation affected',
      'Your reservation was affected, but you already hold an unused free-parking credit, so no extra credit was issued.',
      'info', { slotId: booking.slotId });
    return null;
  }
  const ben = { id: uid('ben'), userId:booking.userId, userName:booking.userName, reason,
                status:'Available', issuedAt: S.now, bookingId: booking.id, usedAt:null, usedOn:null, value:'One free session' };
  db.benefits.push(ben);
  booking.compensationId = ben.id;
  notify(db, booking.userId, 'Your compensation has been added',
    'Your reservation was affected by a previous overstay. Compensation has been added to your account — your next eligible parking session is free.',
    'benefit', { slotId: booking.slotId });
  logEvent(db, 'compensation', `Free-parking credit issued to ${booking.userName} (${reason}).`);
  return ben;
}

/* ============================ Derived selectors =========================== */
function liveStatus(db, slot, t){
  if (slot.kind === 'emergency') return slot.status === 'occupied' ? 'emergency-occupied' : 'emergency';
  const vio = db.violations.find(v => v.slotId === slot.id && v.status === 'Open' && v.type !== 'Overstay');
  if (vio) return 'unauthorized';
  const live = db.bookings.filter(b => b.slotId === slot.id && holds(b));
  const cur = live.find(b => b.start <= t && t <= b.graceEnd) || live.find(b => b.status === 'Overstayed');
  if (cur){
    if (cur.status === 'Active') return 'occupied';
    if (cur.status === 'Grace') return 'grace';
    if (cur.status === 'Overstayed') return 'overstayed';
    return 'reserved';
  }
  return live.length ? 'reserved' : 'free';
}
function bookingFor(db, slotId, t){
  const live = db.bookings.filter(b => b.slotId === slotId && holds(b));
  return live.find(b => b.start <= t && t <= b.graceEnd)
      || live.find(b => b.status === 'Overstayed')
      || live.sort((a,b) => a.start - b.start)[0] || null;
}
/** Slots with live status, current vehicle, and AI availability prediction. */
function liveSlots(){
  const db = S.db, t = S.now;
  return db.slots.map(s => {
    const status = liveStatus(db, s, t);
    const b = s.kind === 'emergency' ? null : bookingFor(db, s.id, t);
    let pred = null;
    if (status === 'occupied' || status === 'grace'){
      const raw = Math.max(1, minsLeft(b ? (b.status==='Grace' ? b.graceEnd : b.end) : t, t));
      const jitter = Math.round((hash(s.id+'p') - .5) * 4);
      const eta = Math.max(1, raw + jitter);
      const conf = clamp(Math.round(96 - eta*0.9 - hash(s.id+'c')*10), 52, 97);
      pred = { eta, conf, soon: eta <= 15 };
    } else if (status === 'overstayed'){
      pred = { eta: 0, conf: 40, soon: false, note: 'Blocked by overstay' };
    }
    const vio = db.violations.find(v => v.slotId === s.id && v.status === 'Open' && v.type !== 'Overstay') || null;
    const charge = db.charging[s.id] || null;
    return Object.assign({}, s, { live: status, booking: b, pred, violation: vio, charge });
  });
}
function statsOf(slots){
  const parking = slots.filter(s => s.kind !== 'emergency');
  const occ = parking.filter(s => ['occupied','grace','overstayed','unauthorized'].includes(s.live)).length;
  return {
    total: parking.length,
    free: parking.filter(s => s.live === 'free').length,
    occupied: occ,
    reserved: parking.filter(s => s.live === 'reserved').length,
    grace: parking.filter(s => s.live === 'grace').length,
    overstayed: parking.filter(s => s.live === 'overstayed').length,
    unauthorized: parking.filter(s => s.live === 'unauthorized').length,
    ev: slots.filter(s => s.kind === 'ev').length,
    evFree: slots.filter(s => s.kind === 'ev' && s.live === 'free').length,
    emergency: slots.filter(s => s.kind === 'emergency').length,
    emergencyUsed: slots.filter(s => s.kind === 'emergency' && s.live === 'emergency-occupied').length,
    pct: Math.round(occ / Math.max(1, parking.length) * 100),
  };
}

/* ---------------------------- Dynamic pricing ---------------------------- */
function isPeak(t){ const h = t.getHours(); return (h>=8 && h<11) || (h>=17 && h<21); }
function pricing(kind){
  const st = S.db.settings, t = S.now, s = statsOf(liveSlots());
  const base = kind === 'ev' ? st.evRate : st.baseRate;
  const peak = isPeak(t) ? st.peakSurcharge : 0;
  const demand = s.pct >= st.occupancyThreshold ? st.demandSurcharge : (s.pct >= 55 ? Math.round(st.demandSurcharge/2) : 0);
  const night = (t.getHours() >= 23 || t.getHours() < 6) ? -5 : 0;
  const total = Math.max(10, base + peak + demand + night);
  return { base, peak, demand, night, total, occupancy: s.pct,
    level: s.pct >= st.occupancyThreshold ? 'High' : s.pct >= 55 ? 'Moderate' : 'Low',
    peakOn: isPeak(t) };
}

/* --------------------------- Demand forecasting -------------------------- */
function demandCurve(hour){
  const shape = [22,18,15,14,16,24,38,58,76,84,79,71,68,72,70,74,82,90,93,88,74,58,42,30];
  return shape[((hour % 24) + 24) % 24];
}
function forecast(hours){
  const t = S.now, out = [], cur = statsOf(liveSlots());
  const total = cur.total;
  const bias = cur.pct - demandCurve(t.getHours());
  for (let i=0; i<(hours||8); i++){
    const d = new Date(t.getTime() + i*HOUR);
    let pct = clamp(Math.round(demandCurve(d.getHours()) + bias*Math.max(0, 1 - i*0.22) + (hash('f'+d.getHours())-.5)*6), 8, 99);
    if (i === 0) pct = cur.pct;
    out.push({ time: d, hour: d.getHours(), pct, free: Math.max(0, Math.round(total*(1-pct/100))),
      level: pct >= 80 ? 'High' : pct >= 55 ? 'Medium' : 'Low' });
  }
  return out;
}
function peakWindow(){
  const f = forecast(12), best = f.filter(x => x.pct >= 80);
  if (!f.length) return null;
  if (!best.length){ const m = f.reduce((a,b)=> b.pct>a.pct?b:a, f[0]); return { from:m.time, to:new Date(m.time.getTime()+HOUR), pct:m.pct, high:false }; }
  return { from: best[0].time, to: new Date(best[best.length-1].time.getTime()+HOUR), pct: Math.max.apply(null,best.map(x=>x.pct)), high:true };
}

/* ------------------------ Smart slot recommendation ---------------------- */
function recommend(opts){
  opts = opts || {};
  const wantEv = !!opts.ev, wantAcc = !!opts.accessible, t = S.now;
  const slots = liveSlots().filter(s => s.kind !== 'emergency');
  const scored = slots.map(s => {
    const reasons = [];
    let score = 0;
    if (s.live === 'free'){ score += 60; reasons.push('Available now'); }
    else if (s.pred && s.pred.soon){ score += 34 - s.pred.eta*0.6; reasons.push(`Predicted free in ~${s.pred.eta} min`); }
    else return null;
    const prox = clamp(28 - s.dist*0.16, 2, 28);
    score += prox;
    if (s.dist <= 40) reasons.push('Close to the entrance');
    if (wantEv){
      if (s.kind === 'ev'){ score += 34; reasons.push('EV charging available'); } else score -= 45;
    } else if (s.kind === 'ev') score -= 10;
    if (wantAcc){
      if (s.kind === 'accessible'){ score += 34; reasons.push('Accessible bay'); } else score -= 40;
    } else if (s.kind === 'accessible') score -= 14;
    if (opts.vehicleType === 'SUV' || opts.vehicleType === 'Van'){
      if (['A','B'].includes(s.floor)) { score += 5; reasons.push('Wide bay suits larger vehicles'); }
    }
    if (s.floor === 'A') score += 6;
    score += hash(s.id+'r')*4;
    return { slot:s, score: Math.round(score), reasons, pct: clamp(Math.round(score), 5, 99) };
  }).filter(Boolean).sort((a,b) => b.score - a.score);
  return scored;
}

/* ------------------------------ Notifications ---------------------------- */
function myNotifications(){
  const u = S.user; if (!u) return [];
  return S.db.notifications.filter(n =>
    n.audience === u.id || n.audience === 'all' || (u.role === 'admin' && n.audience === 'admin'));
}
const unreadCount = () => myNotifications().filter(n => !n.read).length;
function myBookings(){
  const u = S.user; if (!u) return [];
  return u.role === 'admin' ? S.db.bookings : S.db.bookings.filter(b => b.userId === u.id);
}
function activeSessions(){
  return myBookings().filter(b => ['Reserved','Active','Grace','Overstayed'].includes(b.status) && !b.exitTime)
    .sort((a,b) => a.start - b.start);
}
function myVehicles(){
  const u = S.user; if (!u) return [];
  return u.role === 'admin' ? S.db.vehicles : S.db.vehicles.filter(v => v.userId === u.id);
}
const myBenefits = () => S.db.benefits.filter(b => S.user.role === 'admin' || b.userId === S.user.id);
const availableBenefit = () => S.db.benefits.find(b => b.userId === S.user.id && b.status === 'Available');
const myPenalties = () => S.db.penalties.filter(p => S.user.role === 'admin' || p.userId === S.user.id);

/* ============================== UI primitives ============================= */
const CARD = 'bg-white rounded-[32px] shadow-sm border border-slate-100';
const BTN  = 'inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed';
const BTN_P = BTN + ' bg-[#6C63FF] text-white hover:bg-[#5B52F0] shadow-sm';
const BTN_S = BTN + ' bg-white text-slate-700 border border-slate-200 hover:border-[#6C63FF] hover:text-[#6C63FF]';
const BTN_G = BTN + ' bg-slate-100 text-slate-600 hover:bg-slate-200';
const INPUT = 'w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#6C63FF] outline-none transition-all';
const LABEL = 'block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2';

const SLOT_STYLE = {
  free:                 { card:'bg-white border-slate-100 hover:border-emerald-400', badge:'bg-emerald-50 text-emerald-600', text:'text-emerald-600', label:'Available' },
  occupied:             { card:'bg-rose-50 border-rose-100',      badge:'bg-rose-100 text-rose-600',      text:'text-rose-600',   label:'Occupied' },
  reserved:             { card:'bg-amber-50 border-amber-100',    badge:'bg-amber-100 text-amber-700',    text:'text-amber-600',  label:'Reserved' },
  grace:                { card:'bg-orange-50 border-orange-200',  badge:'bg-orange-100 text-orange-700',  text:'text-orange-600', label:'Grace Period' },
  overstayed:           { card:'bg-red-100 border-red-300',       badge:'bg-red-200 text-red-700',        text:'text-red-700',    label:'Overstayed' },
  unauthorized:         { card:'bg-fuchsia-50 border-fuchsia-200',badge:'bg-fuchsia-100 text-fuchsia-700',text:'text-fuchsia-700',label:'Unauthorized' },
  emergency:            { card:'bg-white border-dashed border-rose-200 hover:border-rose-400', badge:'bg-rose-50 text-rose-600', text:'text-rose-600', label:'Emergency Slot' },
  'emergency-occupied': { card:'bg-rose-50 border-rose-200',      badge:'bg-rose-100 text-rose-700',      text:'text-rose-700',   label:'Emergency In Use' },
};
const STATUS_BADGE = {
  Reserved:'bg-amber-100 text-amber-700', Active:'bg-emerald-100 text-emerald-700',
  Grace:'bg-orange-100 text-orange-700', Overstayed:'bg-red-100 text-red-700',
  Completed:'bg-slate-100 text-slate-600', Cancelled:'bg-slate-100 text-slate-400',
};
const KIND_ICON = { info:['inbox','bg-blue-50 text-blue-500'], warning:['warn','bg-amber-50 text-amber-500'],
  penalty:['ban','bg-red-50 text-red-500'], benefit:['gift','bg-emerald-50 text-emerald-500'],
  emergency:['ambulance','bg-rose-50 text-rose-500'], violation:['shield','bg-fuchsia-50 text-fuchsia-500'],
  system:['refresh','bg-slate-100 text-slate-500'] };

const pill = (txt, cls) => `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${cls}">${esc(txt)}</span>`;
const kindOf = s => s === 'ev' ? 'EV' : s === 'accessible' ? 'Accessible' : s === 'emergency' ? 'Emergency' : 'Standard';

function statCard(label, value, ic, color, sub){
  const c = { blue:'text-blue-500 bg-blue-50', emerald:'text-emerald-500 bg-emerald-50', rose:'text-rose-500 bg-rose-50',
              amber:'text-amber-500 bg-amber-50', violet:'text-[#6C63FF] bg-[#EFEEFF]', slate:'text-slate-500 bg-slate-100' }[color||'violet'];
  return `<div class="${CARD} p-6 flex items-center gap-4">
    <div class="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${c}">${icon(ic,22)}</div>
    <div class="min-w-0">
      <p class="text-xs font-bold uppercase tracking-wider text-slate-400 truncate">${esc(label)}</p>
      <p class="text-2xl font-bold text-slate-900 leading-tight">${value}</p>
      ${sub ? `<p class="text-xs text-slate-500 truncate">${sub}</p>` : ''}
    </div></div>`;
}
function sectionHead(title, sub, right){
  return `<div class="flex items-start justify-between gap-4 flex-wrap mb-6">
    <div><h3 class="text-lg font-bold text-slate-900">${esc(title)}</h3>
    ${sub ? `<p class="text-sm text-slate-500 mt-0.5">${sub}</p>` : ''}</div>
    ${right || ''}</div>`;
}
function emptyState(ic, title, sub, action){
  return `<div class="p-12 rounded-[32px] text-center border border-dashed border-slate-200 bg-white">
    <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">${icon(ic,28)}</div>
    <p class="font-bold text-slate-700">${esc(title)}</p>
    <p class="text-sm text-slate-500 mt-1">${esc(sub||'')}</p>${action ? `<div class="mt-5">${action}</div>` : ''}</div>`;
}
function progressBar(pct, cls){
  return `<div class="h-2 bg-slate-100 rounded-full overflow-hidden"><div class="h-full rounded-full ${cls||'bg-[#6C63FF]'}" style="width:${clamp(pct,0,100)}%"></div></div>`;
}
function toast(message, type){
  const id = uid('t');
  S.ui.toasts.push({ id, message, type: type||'success' });
  renderToasts();
  setTimeout(() => { S.ui.toasts = S.ui.toasts.filter(t => t.id !== id); renderToasts(); }, 3200);
}
function renderToasts(){
  const map = { success:['checkCircle','text-emerald-500'], info:['inbox','text-[#6C63FF]'], error:['xCircle','text-rose-500'] };
  document.getElementById('toasts').innerHTML = S.ui.toasts.map(t => {
    const [ic, col] = map[t.type] || map.success;
    return `<div class="pop pointer-events-auto flex items-center gap-3 bg-white pl-4 pr-5 py-3 rounded-2xl shadow-lg border border-slate-100 max-w-[88vw]">
      <span class="${col}">${icon(ic,20)}</span><span class="text-sm font-semibold text-slate-800">${esc(t.message)}</span></div>`;
  }).join('');
}

/* --------------------------------- Charts -------------------------------- */
function chartLabels(labels){
  return `<div class="flex mt-2">${labels.map(l => `<div class="flex-1 text-center text-[10px] font-bold text-slate-400 truncate px-0.5">${esc(l)}</div>`).join('')}</div>`;
}
function barChart(data, opts){
  opts = opts || {};
  const h = opts.height || 220;
  const max = Math.max.apply(null, data.map(d => Math.max(d.value, d.track||0)).concat([1]));
  const n = data.length, bw = 100/n;
  return `<div class="w-full">
  <svg viewBox="0 0 100 ${h}" preserveAspectRatio="none" class="w-full block" style="height:${h}px" role="img" aria-label="${esc(opts.label||'Bar chart')}">
    ${[0,.25,.5,.75,1].map(f => `<line x1="0" x2="100" y1="${(h*f).toFixed(1)}" y2="${(h*f).toFixed(1)}" stroke="#EEF2F7" stroke-width="1" vector-effect="non-scaling-stroke"/>`).join('')}
    ${data.map((d,i) => {
      const x = i*bw + bw*0.25, w = bw*0.5;
      const bh = (d.value/max)*h, th = ((d.track||0)/max)*h;
      return `${d.track ? `<rect x="${x}" y="${h-th}" width="${w}" height="${Math.max(2,th)}" rx="2" fill="#EEF2F7"/>` : ''}
        <rect x="${x}" y="${h-bh}" width="${w}" height="${Math.max(2,bh)}" rx="2" fill="${d.color || '#6C63FF'}">
          <title>${esc(d.label)}: ${esc(d.display != null ? d.display : d.value)}</title></rect>`;
    }).join('')}
  </svg>${chartLabels(data.map(d => d.label))}</div>`;
}
let gradSeq = 0;
function lineChart(points, opts){
  opts = opts || {};
  const h = opts.height || 200, gid = 'lg' + (++gradSeq);
  const max = Math.max.apply(null, points.map(p => p.value).concat([opts.max||1]));
  const step = points.length > 1 ? 100/(points.length-1) : 100;
  const xy = points.map((p,i) => [i*step, (1 - p.value/max)*(h-10) + 5]);
  const path = xy.map((p,i) => (i?'L':'M') + p[0].toFixed(2) + ' ' + p[1].toFixed(2)).join(' ');
  return `<div class="w-full">
  <svg viewBox="0 0 100 ${h}" preserveAspectRatio="none" class="w-full block" style="height:${h}px" role="img" aria-label="${esc(opts.label||'Line chart')}">
    <defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#6C63FF" stop-opacity=".26"/><stop offset="100%" stop-color="#6C63FF" stop-opacity="0"/></linearGradient></defs>
    ${[0,.5,1].map(f => `<line x1="0" x2="100" y1="${(h*f).toFixed(1)}" y2="${(h*f).toFixed(1)}" stroke="#EEF2F7" stroke-width="1" vector-effect="non-scaling-stroke"/>`).join('')}
    <path d="${path} L 100 ${h} L 0 ${h} Z" fill="url(#${gid})"/>
    <path d="${path}" fill="none" stroke="#6C63FF" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linejoin="round" stroke-linecap="round"/>
    ${xy.map((p,i) => `<circle cx="${p[0]}" cy="${p[1]}" r="3" fill="#fff" stroke="#6C63FF" stroke-width="2" vector-effect="non-scaling-stroke" style="transform-box:fill-box"><title>${esc(points[i].label)}: ${esc(points[i].display != null ? points[i].display : points[i].value)}</title></circle>`).join('')}
  </svg>${chartLabels(points.map(p => p.label))}</div>`;
}
function donut(pct, label, color){
  const r = 42, c = 2*Math.PI*r, off = c * (1 - clamp(pct,0,100)/100);
  return `<div class="relative w-[140px] h-[140px] mx-auto">
    <svg viewBox="0 0 110 110" class="w-full h-full -rotate-90" role="img" aria-label="${esc(label)} ${pct}%">
      <circle cx="55" cy="55" r="${r}" fill="none" stroke="#EEF2F7" stroke-width="11"/>
      <circle cx="55" cy="55" r="${r}" fill="none" stroke="${color||'#6C63FF'}" stroke-width="11" stroke-linecap="round"
        stroke-dasharray="${c}" stroke-dashoffset="${off}"/></svg>
    <div class="absolute inset-0 flex flex-col items-center justify-center">
      <span class="text-2xl font-bold text-slate-900">${pct}%</span>
      <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">${esc(label)}</span></div></div>`;
}

/* ================================= Shell ================================== */
const NAV_USER = [
  ['dashboard','dashboard','Dashboard'], ['map','map','Live Parking Map'], ['recommend','ai','Smart Recommendation'],
  ['reserve','book','Reservation'], ['vehicles','camera','Vehicles & ANPR'], ['session','clock','Active Session'],
  ['ev','zap','EV Parking'], ['emergency','ambulance','Emergency Parking'], ['pricing','card','Payments & Pricing'],
  ['history','history','Parking History'], ['notifications','bell','Notifications'], ['profile','users','My Profile'],
];
const NAV_ADMIN = [
  ['admin','shield','Admin Dashboard'], ['analytics','trend','Analytics'], ['slots','pin','Parking Management'],
  ['reservations','book','Reservation Management'], ['violations','ban','Violations & Overstay'],
  ['manageusers','users','Users & Vehicles'], ['settings','settings','System Settings'], ['offline','wifiOff','Offline Safety'],
];
const TITLES = Object.fromEntries(NAV_USER.concat(NAV_ADMIN).map(n => [n[0], n[2]]));

function navItem(tab, ic, label, badge){
  const active = S.tab === tab;
  return `<button data-act="tab" data-tab="${tab}" aria-current="${active?'page':'false'}"
    class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${active ? 'bg-white text-[#6C63FF] font-bold shadow-sm' : 'text-white/75 hover:text-white hover:bg-white/10 font-medium'}">
    <span class="shrink-0">${icon(ic,20)}</span><span class="text-sm truncate">${esc(label)}</span>
    ${badge ? `<span class="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${active?'bg-[#EFEEFF] text-[#6C63FF]':'bg-white/20 text-white'}">${badge}</span>` : ''}</button>`;
}
function sidebar(){
  const u = S.user, unread = unreadCount();
  const pending = S.db.violations.filter(v => v.status === 'Open').length;
  return `<div class="flex flex-col h-full p-6">
    <div class="flex items-center gap-3 mb-8 px-2">
      <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">${icon('car',24)}</div>
      <span class="text-xl font-bold tracking-tight">SmartPark</span>
      <button data-act="closenav" class="ml-auto lg:hidden text-white/70 hover:text-white p-1" aria-label="Close navigation">${icon('x',20)}</button>
    </div>
    <nav class="flex-1 overflow-y-auto -mr-2 pr-2 space-y-1" aria-label="Main">
      <p class="px-4 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-white/40">Driver</p>
      ${NAV_USER.map(([t,i,l]) => navItem(t,i,l, t==='notifications' && unread ? unread : null)).join('')}
      ${u.role === 'admin' ? `<p class="px-4 pt-4 pb-1 text-[10px] font-bold uppercase tracking-wider text-white/40">Administration</p>
      ${NAV_ADMIN.map(([t,i,l]) => navItem(t,i,l, t==='violations' && pending ? pending : null)).join('')}` : ''}
    </nav>
    <div class="mt-4 pt-5 border-t border-white/10">
      <div class="flex items-center gap-3 px-2 mb-4">
        <div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-sm font-bold">${esc(u.name[0])}</div>
        <div class="min-w-0"><p class="text-sm font-semibold truncate">${esc(u.name)}</p>
          <p class="text-xs text-white/60 capitalize">${esc(u.role)}</p></div>
      </div>
      <button data-act="logout" class="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all">
        ${icon('logout',20)}<span class="font-medium text-sm">Logout</span></button>
    </div></div>`;
}
function notifPanel(){
  const list = myNotifications().slice(0, 12);
  return `<div class="pop absolute right-0 mt-3 w-[min(380px,calc(100vw-2.5rem))] ${CARD} overflow-hidden z-50" role="dialog" aria-label="Notifications">
    <div class="flex items-center justify-between px-5 py-4 border-b border-slate-100">
      <h4 class="font-bold text-slate-900">Notifications</h4>
      <div class="flex items-center gap-2">
        <button data-act="readall" class="text-xs font-bold text-[#6C63FF] hover:underline">Mark all read</button>
        <button data-act="closenotif" class="text-slate-400 hover:text-slate-600" aria-label="Close">${icon('x',18)}</button></div></div>
    <div class="max-h-[60vh] overflow-y-auto divide-y divide-slate-50">
      ${list.length ? list.map(n => {
        const [ic, cls] = KIND_ICON[n.kind] || KIND_ICON.info;
        return `<div class="flex gap-3 px-5 py-4 ${n.read ? '' : 'bg-[#F8F8FF]'}">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${cls}">${icon(ic,17)}</div>
          <div class="min-w-0"><p class="text-sm font-bold text-slate-900">${esc(n.title)}</p>
            <p class="text-xs text-slate-500 mt-0.5 leading-relaxed">${esc(n.message)}</p>
            <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1.5">${fmtT(n.createdAt)}</p></div></div>`;
      }).join('') : `<div class="px-5 py-10 text-center text-sm text-slate-400">You're all caught up.</div>`}
    </div>
    <button data-act="tab" data-tab="notifications" class="w-full py-3.5 text-sm font-bold text-[#6C63FF] hover:bg-slate-50 border-t border-slate-100">Open notification centre</button></div>`;
}
function offlineBanner(){
  if (!S.offline && !S.ui.syncing) return '';
  if (S.ui.syncing) return `<div class="mb-6 flex items-center gap-3 px-5 py-4 rounded-2xl bg-[#EFEEFF] border border-[#6C63FF]/20 text-[#4F46E5]">
    <span class="spin">${icon('refresh',18)}</span><p class="text-sm font-bold">Connection restored — synchronising local records…</p></div>`;
  return `<div class="mb-6 flex items-center gap-3 px-5 py-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 flex-wrap">
    ${icon('wifiOff',18)}<p class="text-sm font-bold">Offline Safety Mode — Limited Connectivity</p>
    <span class="text-xs font-medium text-amber-700">Sensors, entry/exit detection and slot status continue locally. ${S.db.sync.pending.length} record(s) queued for sync.</span>
    <button data-act="tab" data-tab="offline" class="ml-auto text-xs font-bold underline">View status</button></div>`;
}
function header(){
  const unread = unreadCount();
  return `<header class="flex items-center justify-between gap-4 mb-8">
    <div class="flex items-center gap-3 min-w-0">
      <button data-act="opennav" class="lg:hidden p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-500 shrink-0" aria-label="Open navigation">${icon('menu',20)}</button>
      <div class="min-w-0">
        <h2 class="text-xl sm:text-2xl font-bold text-slate-900 truncate">${S.tab === 'dashboard' ? 'Welcome back, ' + esc(S.user.name) + '!' : esc(TITLES[S.tab] || 'SmartPark')}</h2>
        <div class="flex items-center gap-2 text-slate-500 mt-1">
          ${icon('clock',15)}<span class="text-sm font-medium">${S.now.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit',second:'2-digit'})}</span>
          <span class="text-slate-300 hidden sm:inline">•</span>
          <span class="text-sm hidden sm:inline">${S.now.toLocaleDateString([], {weekday:'long', month:'long', day:'numeric'})}</span>
          ${S.db.settings.timeSpeed > 1 ? pill(S.db.settings.timeSpeed + '× demo clock','bg-[#EFEEFF] text-[#6C63FF] ml-1') : ''}
        </div></div></div>
    <div class="flex items-center gap-3 shrink-0">
      <button data-act="toggleoffline" data-tip="${S.offline ? 'Restore connectivity' : 'Simulate connection loss'}"
        class="p-3 rounded-2xl shadow-sm border transition-all ${S.offline ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-white border-slate-100 text-slate-400 hover:text-[#6C63FF]'}"
        aria-label="Toggle offline mode">${icon(S.offline ? 'wifiOff' : 'wifi', 20)}</button>
      <div class="relative">
        <button data-act="togglenotif" class="p-3 bg-white rounded-2xl text-slate-400 hover:text-[#6C63FF] transition-all shadow-sm border border-slate-100 relative" aria-label="Notifications">
          ${icon('bell',20)}
          ${unread ? `<span class="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white pulse-dot"></span>` : ''}</button>
        ${S.ui.notifOpen ? notifPanel() : ''}
      </div></div></header>`;
}

/* ================================= Login ================================== */
function loginScreen(){
  return `<div class="min-h-screen flex items-center justify-center p-4">
    <div class="fade-in w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
      <div class="bg-[#6C63FF] p-8 text-center text-white">
        <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">${icon('car',32)}</div>
        <h1 class="text-2xl font-bold">SmartPark</h1>
        <p class="text-white/80 mt-1">Next-Gen Smart Parking Management</p>
      </div>
      <div class="p-8 space-y-5">
        <div><label class="${LABEL}" for="who">Sign in as</label>
          <select id="who" class="${INPUT}" data-model="loginUser">
            ${USERS.map(u => `<option value="${u.id}" ${S.ui.form.loginUser === u.id ? 'selected':''}>${esc(u.name)} — ${u.role === 'admin' ? 'Administrator' : 'Driver'}</option>`).join('')}
          </select></div>
        <button data-act="login" class="${BTN_P} w-full py-3.5">${icon('arrowR',18)} Enter dashboard</button>
        <div class="grid grid-cols-2 gap-3">
          <button data-act="login" data-as="aarav" class="${BTN_S} py-3">Demo driver</button>
          <button data-act="login" data-as="admin" class="${BTN_S} py-3">Administrator</button></div>
        <p class="text-xs text-slate-400 text-center leading-relaxed">Prototype with live simulation: ANPR, dynamic pricing, 15-minute grace period, overstay penalties, compensation and offline safety mode.</p>
      </div></div></div>`;
}

/* ============================== Slot components =========================== */
function slotCard(s){
  const st = SLOT_STYLE[s.live] || SLOT_STYLE.free;
  const kindTag = s.kind === 'ev' ? `<span class="text-emerald-500" data-tip="EV charging bay">${icon('zap',14)}</span>`
    : s.kind === 'accessible' ? `<span class="text-blue-500" data-tip="Accessible bay">${icon('accessible',14)}</span>`
    : s.kind === 'emergency' ? `<span class="text-rose-500" data-tip="Emergency only">${icon('ambulance',14)}</span>` : '';
  const predicted = s.pred && s.pred.soon;
  return `<button data-act="slot" data-slot="${s.id}"
    class="group text-left p-5 rounded-[26px] border transition-all w-full ${st.card} ${predicted ? 'ring-2 ring-[#6C63FF]/25' : ''}">
    <div class="flex items-start justify-between mb-3">
      <div class="flex items-center gap-1.5">
        <span class="text-lg font-bold text-slate-900">${esc(s.name)}</span>${kindTag}</div>
      <span class="${st.badge} px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">${st.label}</span></div>
    <div class="space-y-1">
      ${s.vehicleNo || (s.booking && s.booking.vehicleNo) ? `<p class="text-xs font-mono font-bold text-slate-600 truncate">${esc(s.vehicleNo || s.booking.vehicleNo)}</p>` : ''}
      ${s.violation ? `<p class="text-xs font-bold text-fuchsia-700 truncate">${esc(s.violation.vehicleNo)} · ${esc(s.violation.type)}</p>` : ''}
      <p class="text-[11px] text-slate-400 font-medium">${s.dist}m from entrance · ${kindOf(s.kind)}</p>
      ${predicted ? `<p class="text-[11px] font-bold text-[#6C63FF] flex items-center gap-1">${icon('ai',12)} Free in ~${s.pred.eta} min · ${s.pred.conf}%</p>` : ''}
    </div></button>`;
}
function legend(){
  const items = [['free','Available'],['occupied','Occupied'],['reserved','Reserved'],['grace','Grace'],['overstayed','Overstayed'],['unauthorized','Unauthorized'],['emergency','Emergency'],['ev','EV']];
  const dot = k => k === 'ev' ? 'bg-emerald-400' : ({free:'bg-emerald-500',occupied:'bg-rose-500',reserved:'bg-amber-400',grace:'bg-orange-500',overstayed:'bg-red-600',unauthorized:'bg-fuchsia-500',emergency:'bg-rose-300'})[k];
  return `<div class="flex flex-wrap gap-x-4 gap-y-2">${items.map(([k,l]) =>
    `<span class="flex items-center gap-1.5 text-xs font-medium text-slate-500"><span class="w-2.5 h-2.5 rounded-full ${dot(k)}"></span>${l}</span>`).join('')}</div>`;
}
function sessionStatusCard(b){
  if (!b) return '';
  const t = S.now;
  const map = {
    Reserved:{ ic:'clock', col:'amber',   title:'Reserved', line:`Starts ${fmtDT(b.start)}` },
    Active:{ ic:'checkCircle', col:'emerald', title: (b.end - t) <= 10*MIN ? 'Expiring Soon' : 'Active', line:`Ends ${fmtT(b.end)} · ${cdown(b.end, t)} left` },
    Grace:{ ic:'warn', col:'orange', title:'Grace Period', line:`Grace ends ${fmtT(b.graceEnd)} · ${cdown(b.graceEnd, t)} left` },
    Overstayed:{ ic:'ban', col:'red', title:'Overstayed', line:`Over by ${durText(minsBetween(b.graceEnd, t))} · penalty accruing` },
  };
  const m = map[b.status] || map.Active;
  const bg = { amber:'bg-amber-50 text-amber-700 border-amber-200', emerald:'bg-emerald-50 text-emerald-700 border-emerald-200',
               orange:'bg-orange-50 text-orange-700 border-orange-200', red:'bg-red-50 text-red-700 border-red-200' }[m.col];
  const pen = b.penaltyId ? S.db.penalties.find(p => p.id === b.penaltyId) : null;
  const totalMs = b.end - b.start, doneMs = clamp((t - b.start)/totalMs*100, 0, 100);
  return `<div class="${CARD} p-6 sm:p-8">
    <div class="flex items-start justify-between gap-4 flex-wrap">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-2xl border flex items-center justify-center ${bg}">${icon(m.ic,22)}</div>
        <div><p class="text-lg font-bold text-slate-900">Slot ${esc(b.slotId)} · ${m.title}</p>
          <p class="text-sm text-slate-500 font-medium">${esc(m.line)}</p></div></div>
      <div class="flex gap-2 flex-wrap">
        ${b.status === 'Reserved' ? `<button data-act="checkin" data-id="${b.id}" class="${BTN_P}">${icon('play',16)} Check in</button>
          <button data-act="cancel" data-id="${b.id}" class="${BTN_S}">Cancel</button>` : ''}
        ${['Active','Grace','Overstayed'].includes(b.status) ? `<button data-act="extend" data-id="${b.id}" class="${BTN_S}">${icon('plus',16)} Extend</button>
          <button data-act="checkout" data-id="${b.id}" class="${BTN_P}">${icon('arrowR',16)} Exit & pay</button>` : ''}
      </div></div>
    <div class="mt-6">${progressBar(doneMs, b.status==='Overstayed'?'bg-red-500':b.status==='Grace'?'bg-orange-500':'bg-[#6C63FF]')}
      <div class="flex justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-2">
        <span>${fmtT(b.start)}</span><span>${durText(minsBetween(b.start, b.end))} booked</span><span>${fmtT(b.end)}</span></div></div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      ${[['Vehicle', esc(b.vehicleNo)], ['Entry time', fmtT(b.start)], ['Rate', money(b.rate)+'/hr'],
         ['Charges', b.isFree ? 'Free (credit)' : money((b.rate||0)*Math.max(1, Math.ceil(minsBetween(b.start, Math.min(t, b.end))/60))) ]]
        .map(([k,v]) => `<div class="p-4 bg-slate-50 rounded-2xl"><p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">${k}</p>
          <p class="text-sm font-bold text-slate-900 mt-1 truncate">${v}</p></div>`).join('')}</div>
    ${pen ? `<div class="mt-4 p-4 rounded-2xl bg-red-50 border border-red-100 flex items-center gap-3 flex-wrap">
      ${icon('ban',18,'text-red-500')}<p class="text-sm font-bold text-red-700">Penalty applied: ${money(pen.amount)}</p>
      <span class="text-xs text-red-600">${pen.minutes} min past the grace period · ${esc(pen.status)}</span></div>` : ''}
    ${b.conflict ? `<div class="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-100 flex items-start gap-3">
      ${icon('warn',18,'text-amber-500 mt-0.5')}<div><p class="text-sm font-bold text-amber-800">Your reservation was affected by a previous overstay.</p>
      <p class="text-xs text-amber-700 mt-0.5">Compensation has been added to your account. Your next eligible session is free.</p></div></div>` : ''}
  </div>`;
}

/* =============================== User pages =============================== */
function pageDashboard(){
  const slots = liveSlots(), s = statsOf(slots), p = pricing(), f = forecast(8), pw = peakWindow();
  const active = activeSessions()[0];
  const recs = recommend({ ev:false }).slice(0,3);
  const soon = slots.filter(x => x.pred && x.pred.soon).sort((a,b)=>a.pred.eta-b.pred.eta).slice(0,4);
  const ben = availableBenefit();
  return `${offlineBanner()}
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
    ${statCard('Total Slots', s.total, 'car', 'blue', `${s.ev} EV · ${s.emergency} emergency`)}
    ${statCard('Free Slots', s.free, 'checkCircle', 'emerald', `${s.evFree} EV bays free`)}
    ${statCard('Occupied', s.occupied, 'xCircle', 'rose', `${s.pct}% occupancy`)}
    ${statCard('Current Rate', money(p.total)+'/hr', 'rupee', 'violet', `${p.level} demand`)}
  </div>

  ${active ? `<div class="mt-8">${sessionStatusCard(active)}</div>` : ''}

  <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 mt-8">
    <div class="xl:col-span-2 ${CARD} p-6 sm:p-8">
      ${sectionHead('Predicted demand — next 8 hours','AI forecast from historical patterns and live occupancy',
        `<span class="px-3 py-1.5 rounded-xl text-xs font-bold ${p.level==='High'?'bg-red-50 text-red-600':p.level==='Moderate'?'bg-amber-50 text-amber-600':'bg-emerald-50 text-emerald-600'}">${p.level} demand now</span>`)}
      ${lineChart(f.map(x => ({ label: pad(x.hour)+':00', value:x.pct, display:x.pct+'%' })), { height:220, max:100, label:'Demand forecast' })}
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
        ${f.slice(1,5).map(x => `<div class="p-4 bg-slate-50 rounded-2xl">
          <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">${pad(x.hour)}:00</p>
          <p class="text-lg font-bold text-slate-900">${x.pct}%</p>
          <p class="text-[11px] font-semibold ${x.level==='High'?'text-red-500':x.level==='Medium'?'text-amber-500':'text-emerald-500'}">${x.level} · ${x.free} free</p></div>`).join('')}
      </div>
      ${pw && pw.high ? `<p class="text-sm text-slate-500 mt-5 flex items-center gap-2">${icon('trend',16,'text-[#6C63FF]')}
        High demand expected between ${fmtT(pw.from)} and ${fmtT(pw.to)} — expected occupancy ${pw.pct}%.</p>` : ''}
    </div>

    <div class="${CARD} p-6 sm:p-8">
      ${sectionHead('Recommended for you','Best match right now',
        `<button data-act="tab" data-tab="recommend" class="text-sm font-bold text-[#6C63FF] hover:underline">See all</button>`)}
      <div class="space-y-3">
        ${recs.length ? recs.map((r,i) => `<button data-act="slot" data-slot="${r.slot.id}" class="w-full text-left p-4 rounded-2xl border ${i===0?'border-[#6C63FF] bg-[#F8F8FF]':'border-slate-100 bg-slate-50 hover:border-slate-200'} transition-all">
          <div class="flex items-center justify-between"><span class="font-bold text-slate-900">${esc(r.slot.name)}</span>
            ${i===0?pill('Best match','bg-[#6C63FF] text-white'):pill(r.pct+'% match','bg-white text-slate-500')}</div>
          <p class="text-xs text-slate-500 mt-1">${esc(r.reasons.slice(0,2).join(' · '))}</p></button>`).join('')
          : `<p class="text-sm text-slate-400">No slots available — check the prediction panel.</p>`}
      </div>
      <div class="mt-6 space-y-3">
        <div class="p-4 bg-slate-50 rounded-2xl flex items-center gap-3">
          <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#6C63FF] shadow-sm">${icon('plus',18)}</div>
          <div class="min-w-0"><p class="text-sm font-bold text-slate-900">New reservation</p><p class="text-xs text-slate-500">Reserve a slot in advance</p></div>
          <button data-act="tab" data-tab="reserve" class="ml-auto p-2 hover:bg-slate-200 rounded-lg" aria-label="Go to reservation">${icon('chevronR',16)}</button></div>
        ${ben ? `<div class="p-4 bg-emerald-50 rounded-2xl flex items-center gap-3">
          <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm">${icon('gift',18)}</div>
          <div class="min-w-0"><p class="text-sm font-bold text-slate-900">Free parking credit</p><p class="text-xs text-slate-500">Compensation ready to use</p></div>
          <button data-act="tab" data-tab="pricing" class="ml-auto p-2 hover:bg-emerald-100 rounded-lg" aria-label="View credit">${icon('chevronR',16)}</button></div>` : ''}
        ${s.overstayed ? `<div class="p-4 bg-red-50 rounded-2xl flex items-center gap-3">
          <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-500 shadow-sm">${icon('ban',18)}</div>
          <div class="min-w-0"><p class="text-sm font-bold text-slate-900">${s.overstayed} vehicle(s) overstayed</p><p class="text-xs text-slate-500">Slots held past grace period</p></div>
          <button data-act="tab" data-tab="map" class="ml-auto p-2 hover:bg-red-100 rounded-lg" aria-label="View map">${icon('chevronR',16)}</button></div>` : ''}
        <div class="p-4 bg-rose-50 rounded-2xl flex items-center gap-3">
          <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-rose-500 shadow-sm">${icon('ambulance',18)}</div>
          <div class="min-w-0"><p class="text-sm font-bold text-slate-900">${s.emergencyUsed}/${s.emergency} emergency in use</p><p class="text-xs text-slate-500">Emergency lane status</p></div>
          <button data-act="tab" data-tab="emergency" class="ml-auto p-2 hover:bg-rose-100 rounded-lg" aria-label="Emergency lane">${icon('chevronR',16)}</button></div>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 mt-8">
    <div class="xl:col-span-2 ${CARD} p-6 sm:p-8">
      ${sectionHead('Occupancy by floor','Live sensor readings', `<div class="flex items-center gap-4">
        <span class="flex items-center gap-2 text-xs text-slate-500 font-medium"><span class="w-3 h-3 rounded-full bg-[#6C63FF]"></span>Occupied</span>
        <span class="flex items-center gap-2 text-xs text-slate-500 font-medium"><span class="w-3 h-3 rounded-full bg-slate-100"></span>Total</span></div>`)}
      ${barChart(['A','B','C'].map(fl => {
        const all = slots.filter(x => x.floor === fl && x.kind !== 'emergency');
        const occ = all.filter(x => x.live !== 'free').length;
        return { label:'Floor '+fl, value: occ, track: all.length, display: occ+' of '+all.length+' occupied' };
      }), { height:240, label:'Occupancy by floor' })}
    </div>
    <div class="${CARD} p-6 sm:p-8">
      ${sectionHead('Becoming available','AI parking prediction')}
      <div class="space-y-3">${soon.length ? soon.map(x => `
        <div class="p-4 rounded-2xl bg-[#F8F8FF] border border-[#6C63FF]/15">
          <div class="flex items-center justify-between"><span class="font-bold text-slate-900">Slot ${esc(x.name)}</span>
            ${pill(x.pred.conf+'% confidence','bg-white text-[#6C63FF]')}</div>
          <p class="text-xs text-slate-500 mt-1">Likely to become available in approximately ${x.pred.eta} minute${x.pred.eta===1?'':'s'}.</p>
          <div class="mt-2">${progressBar(x.pred.conf)}</div></div>`).join('')
        : `<p class="text-sm text-slate-400">No slots are predicted to free up in the next 15 minutes.</p>`}</div>
    </div>
  </div>`;
}

function pageMap(){
  const all = liveSlots();
  const f = S.ui.mapFloor, filter = S.ui.mapFilter;
  const filtered = all.filter(s =>
    (f === 'all' || s.floor === f) &&
    (filter === 'all' || (filter === 'ev' ? s.kind === 'ev'
      : filter === 'predicted' ? (s.pred && s.pred.soon)
      : filter === 'emergency' ? s.kind === 'emergency' : s.live === filter)));
  const floors = ['A','B','C','E'];
  const s = statsOf(all);
  const chip = (val, label, cur, act) => `<button data-act="${act}" data-val="${val}"
    class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${cur===val ? 'bg-[#6C63FF] text-white shadow-sm' : 'bg-white text-slate-500 border border-slate-200 hover:border-[#6C63FF]'}">${esc(label)}</button>`;
  return `${offlineBanner()}
  <div class="${CARD} p-6 mb-6">
    <div class="flex flex-wrap items-center gap-3">
      <div class="flex flex-wrap gap-2">${chip('all','All floors', f, 'mapfloor')}${floors.map(x => chip(x, 'Floor '+x, f, 'mapfloor')).join('')}</div>
      <div class="ml-auto flex flex-wrap gap-2">
        ${['all','free','occupied','reserved','overstayed','predicted','ev','emergency'].map(x =>
          chip(x, x === 'all' ? 'All status' : x === 'predicted' ? 'Predicted free' : x[0].toUpperCase()+x.slice(1), filter, 'mapfilter')).join('')}
      </div></div>
    <div class="mt-5 pt-5 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
      ${legend()}
      <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">${filtered.length} slot(s) shown · ${s.pct}% occupancy</p></div>
  </div>
  ${filtered.length ? floors.filter(fl => filtered.some(x => x.floor === fl)).map(fl => `
    <div class="mb-8">
      <div class="flex items-center gap-3 mb-4">
        <h4 class="text-sm font-bold text-slate-400 uppercase tracking-wider">${fl === 'E' ? 'Emergency lane' : 'Floor '+fl}</h4>
        <span class="text-xs text-slate-400">${filtered.filter(x=>x.floor===fl).length} slots</span></div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        ${filtered.filter(x => x.floor === fl).map(slotCard).join('')}</div></div>`).join('')
    : emptyState('search','No slots match these filters','Try clearing the status filter or selecting another floor.',
        `<button data-act="mapfilter" data-val="all" class="${BTN_P}">Clear filters</button>`)}`;
}

function pageRecommend(){
  const fm = S.ui.form;
  const opts = { ev: !!fm.recEv, accessible: !!fm.recAcc, vehicleType: fm.recType || 'Sedan' };
  const recs = recommend(opts);
  const top = recs[0];
  const toggle = (key, label, ic) => `<button data-act="rectoggle" data-key="${key}"
    class="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold border transition-all ${fm[key] ? 'bg-[#6C63FF] text-white border-[#6C63FF]' : 'bg-white text-slate-600 border-slate-200 hover:border-[#6C63FF]'}">${icon(ic,16)} ${label}</button>`;
  return `${offlineBanner()}
  <div class="${CARD} p-6 sm:p-8 mb-6">
    ${sectionHead('What do you need?','The recommendation engine weighs distance, availability, vehicle type and predicted turnover')}
    <div class="flex flex-wrap items-center gap-3">
      ${toggle('recEv','EV charging','zap')}${toggle('recAcc','Accessible bay','accessible')}
      <select class="${INPUT} max-w-[200px]" data-model="recType" aria-label="Vehicle type">
        ${VEHICLE_TYPES.map(v => `<option ${opts.vehicleType===v?'selected':''}>${v}</option>`).join('')}</select>
      <button data-act="rerank" class="${BTN_S}">${icon('refresh',16)} Re-rank</button>
    </div>
  </div>
  ${top ? `<div class="${CARD} p-6 sm:p-8 mb-6 border-[#6C63FF]/30">
    <div class="flex flex-col sm:flex-row sm:items-center gap-6">
      <div class="w-20 h-20 rounded-3xl bg-[#EFEEFF] text-[#6C63FF] flex flex-col items-center justify-center shrink-0">
        <span class="text-2xl font-bold">${esc(top.slot.name)}</span><span class="text-[10px] font-bold uppercase tracking-wider">Best</span></div>
      <div class="min-w-0 flex-1">
        <p class="text-lg font-bold text-slate-900">Recommended for you: ${esc(top.slot.name)} — ${esc(top.reasons[0] || 'best available match')}.</p>
        <p class="text-sm text-slate-500 mt-1">${esc(top.reasons.join(' · '))} · ${top.slot.dist}m from entrance · ${kindOf(top.slot.kind)} bay</p>
        <div class="mt-4 max-w-sm">${progressBar(top.pct)}<p class="text-xs font-bold text-slate-400 mt-2">${top.pct}% match score</p></div>
      </div>
      <div class="flex sm:flex-col gap-2 shrink-0">
        <button data-act="reserveslot" data-slot="${top.slot.id}" class="${BTN_P}">${icon('book',16)} Reserve</button>
        <button data-act="slot" data-slot="${top.slot.id}" class="${BTN_S}">Details</button></div>
    </div></div>` : emptyState('ai','No recommendation available','Every bay is currently taken. Check predicted availability on the live map.')}
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    ${recs.slice(1,10).map(r => `<div class="${CARD} p-6">
      <div class="flex items-center justify-between mb-3">
        <span class="text-lg font-bold text-slate-900">${esc(r.slot.name)}</span>${pill(r.pct+'% match','bg-[#EFEEFF] text-[#6C63FF]')}</div>
      <p class="text-xs text-slate-500 leading-relaxed min-h-[32px]">${esc(r.reasons.join(' · '))}</p>
      <div class="mt-3">${progressBar(r.pct)}</div>
      <div class="flex gap-2 mt-4">
        <button data-act="reserveslot" data-slot="${r.slot.id}" class="${BTN_P} flex-1">Reserve</button>
        <button data-act="slot" data-slot="${r.slot.id}" class="${BTN_S}">Info</button></div></div>`).join('')}
  </div>`;
}

function pageReserve(){
  const fm = S.ui.form, t = S.now;
  const typed = fm.resStart ? new Date(fm.resStart) : null;
  const start = typed && !isNaN(typed) ? typed : new Date(t.getTime() + 10*MIN);
  const hours = +(fm.resHours || 2);
  const vehicles = myVehicles();
  const veh = vehicles.find(v => v.id === fm.resVehicle) || vehicles[0];
  const end = new Date(start.getTime() + hours*HOUR);
  const graceEnd = new Date(end.getTime() + S.db.settings.graceMinutes*MIN);
  const ev = veh ? veh.ev : false;
  const available = liveSlots().filter(s => s.kind !== 'emergency').filter(s => isFreeBetween(s.id, start, graceEnd))
    .filter(s => ev ? true : s.kind !== 'ev');
  const ranked = recommend({ ev, vehicleType: veh && veh.type }).filter(r => available.some(a => a.id === r.slot.id));
  const best = ranked[0];
  const chosen = fm.resSlot || (best && best.slot.id);
  const p = pricing(ev ? 'ev' : 'normal');
  const ben = availableBenefit();
  const useBen = fm.resUseBenefit !== false && !!ben;
  const cost = useBen ? 0 : p.total * hours;
  const upcoming = myBookings().filter(b => b.status === 'Reserved').sort((a,b)=>a.start-b.start);
  if (!vehicles.length) return emptyState('car','No vehicle registered','Add a vehicle before making a reservation.',
    `<button data-act="tab" data-tab="vehicles" class="${BTN_P}">Register a vehicle</button>`);
  return `${offlineBanner()}
  <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
    <div class="xl:col-span-2 space-y-6">
      <div class="${CARD} p-6 sm:p-8">
        ${sectionHead('1 · When and what','Reserved slots are locked and never offered to another driver')}
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div><label class="${LABEL}" for="rs">Start</label>
            <input id="rs" type="datetime-local" class="${INPUT}" data-model="resStart" value="${toLocalInput(start)}"></div>
          <div><label class="${LABEL}" for="rh">Duration</label>
            <select id="rh" class="${INPUT}" data-model="resHours">
              ${[1,2,3,4,6,8,12].map(h => `<option value="${h}" ${hours===h?'selected':''}>${h} hour${h>1?'s':''}</option>`).join('')}</select></div>
          <div><label class="${LABEL}" for="rv">Vehicle</label>
            <select id="rv" class="${INPUT}" data-model="resVehicle">
              ${vehicles.map(v => `<option value="${v.id}" ${veh && veh.id===v.id?'selected':''}>${esc(v.no)} · ${esc(v.type)}</option>`).join('')}</select></div>
        </div>
        <p class="text-xs text-slate-500 mt-4">Session ${fmtDT(start)} → ${fmtT(end)}, plus a ${S.db.settings.graceMinutes}-minute grace period until ${fmtT(graceEnd)}.</p>
      </div>

      <div class="${CARD} p-6 sm:p-8">
        ${sectionHead('2 · Choose a slot', available.length + ' slot(s) free for this window',
          best ? `<span class="text-xs font-bold text-[#6C63FF]">Recommended: ${esc(best.slot.name)}</span>` : '')}
        ${available.length ? `<div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          ${ranked.slice(0,20).map((r,i) => {
            const sel = chosen === r.slot.id;
            return `<button data-act="pickslot" data-slot="${r.slot.id}"
              class="p-4 rounded-2xl border text-left transition-all ${sel ? 'border-[#6C63FF] bg-[#F8F8FF] ring-2 ring-[#6C63FF]/20' : 'border-slate-100 bg-white hover:border-slate-300'}">
              <div class="flex items-center justify-between"><span class="font-bold text-slate-900">${esc(r.slot.name)}</span>
                ${r.slot.kind === 'ev' ? `<span class="text-emerald-500">${icon('zap',14)}</span>` : r.slot.kind === 'accessible' ? `<span class="text-blue-500">${icon('accessible',14)}</span>` : ''}</div>
              <p class="text-[11px] text-slate-400 mt-1">${r.slot.dist}m · ${i===0?'best match':r.pct+'%'}</p></button>`;
          }).join('')}</div>` : emptyState('search','No slots free for that window','Try a different start time or a shorter duration.')}
      </div>
    </div>

    <div class="space-y-6">
      <div class="${CARD} p-6 sm:p-8">
        ${sectionHead('3 · Confirm','Review before locking the slot')}
        <div class="space-y-3 text-sm">
          ${[['Slot', chosen ? esc(chosen) : '—'], ['Vehicle', veh ? esc(veh.no) : '—'],
             ['Start', fmtDT(start)], ['End', fmtDT(end)], ['Duration', hours+' hour'+(hours>1?'s':'')],
             ['Rate', money(p.total)+'/hr']].map(([k,v]) =>
            `<div class="flex justify-between gap-4"><span class="text-slate-500 font-medium">${k}</span><span class="font-bold text-slate-900 text-right">${v}</span></div>`).join('')}
          <div class="pt-3 border-t border-slate-100 flex justify-between">
            <span class="text-slate-500 font-medium">Estimated total</span>
            <span class="font-bold text-lg ${useBen?'text-emerald-600':'text-slate-900'}">${useBen ? 'Free' : money(cost)}</span></div>
        </div>
        ${ben ? `<label class="mt-4 flex items-start gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 cursor-pointer">
          <input type="checkbox" data-model="resUseBenefit" ${useBen?'checked':''} class="mt-0.5 accent-[#6C63FF] w-4 h-4">
          <span><span class="text-sm font-bold text-emerald-800 block">Apply free-parking credit</span>
          <span class="text-xs text-emerald-700">${esc(ben.reason)}</span></span></label>` : ''}
        <button data-act="confirmreserve" data-slot="${chosen||''}" class="${BTN_P} w-full mt-5 py-3.5" ${chosen?'':'disabled'}>
          ${icon('lock',16)} Confirm & lock slot</button>
        <p class="text-[11px] text-slate-400 mt-3 text-center">The slot is locked immediately and hidden from other drivers.</p>
      </div>

      <div class="${CARD} p-6 sm:p-8">
        ${sectionHead('Upcoming reservations', upcoming.length + ' active')}
        <div class="space-y-3">${upcoming.length ? upcoming.map(b => `
          <div class="p-4 bg-slate-50 rounded-2xl">
            <div class="flex items-center justify-between gap-2">
              <span class="font-bold text-slate-900">Slot ${esc(b.slotId)}</span>${pill('Locked','bg-amber-100 text-amber-700')}</div>
            <p class="text-xs text-slate-500 mt-1">${esc(b.vehicleNo)} · ${fmtDT(b.start)}</p>
            <p class="text-xs font-bold text-[#6C63FF] mt-1">Starts in ${durText(minsBetween(t, b.start))}</p>
            <div class="flex gap-2 mt-3">
              <button data-act="checkin" data-id="${b.id}" class="${BTN_P} text-xs px-3 py-2">Check in now</button>
              <button data-act="cancel" data-id="${b.id}" class="${BTN_G} text-xs px-3 py-2">Cancel</button></div></div>`).join('')
          : `<p class="text-sm text-slate-400">No upcoming reservations.</p>`}</div>
      </div>
    </div>
  </div>`;
}
function isFreeBetween(slotId, from, to){
  return !S.db.bookings.some(b => b.slotId === slotId && holds(b) && b.start < to && from < b.graceEnd)
    && !S.db.violations.some(v => v.slotId === slotId && v.status === 'Open');
}

function pageVehicles(){
  const vs = myVehicles(), anpr = S.ui.anpr, fm = S.ui.form;
  const sessions = myBookings().filter(b => holds(b));
  return `${offlineBanner()}
  <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
    <div class="${CARD} p-6 sm:p-8 xl:col-span-2">
      ${sectionHead('Automatic Number Plate Recognition','Capture the plate at the gate, type it, or scan with the camera')}
      <div class="rounded-[26px] bg-slate-900 text-white p-6 relative overflow-hidden">
        <div class="absolute inset-0 opacity-20" style="background:radial-gradient(circle at 30% 20%, #6C63FF 0%, transparent 55%)"></div>
        <div class="relative">
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs font-bold uppercase tracking-wider text-white/60">Gate camera · Entry lane 1</span>
            <span class="flex items-center gap-2 text-xs font-bold ${S.offline?'text-amber-300':'text-emerald-300'}">
              <span class="w-2 h-2 rounded-full ${S.offline?'bg-amber-300':'bg-emerald-400'} pulse-dot"></span>${S.offline?'Local capture':'Live'}</span></div>
          <div class="aspect-[16/7] rounded-2xl border-2 border-dashed border-white/25 flex flex-col items-center justify-center gap-3 bg-black/25">
            ${anpr.scanning ? `<span class="spin text-white/80">${icon('refresh',30)}</span>
              <p class="text-sm font-bold text-white/80">Scanning plate…</p>
              <div class="w-40 h-1.5 bg-white/15 rounded-full overflow-hidden"><div class="h-full bg-[#6C63FF] skel" style="width:70%"></div></div>`
            : anpr.result ? `<p class="font-mono text-2xl sm:text-3xl font-bold tracking-widest">${esc(anpr.result.no)}</p>
              <p class="text-xs font-bold text-emerald-300">${anpr.result.conf}% confidence · ${esc(anpr.result.type)}</p>`
            : `<span class="text-white/40">${icon('camera',34)}</span><p class="text-sm text-white/50 font-medium">Camera idle — start a scan to detect a plate</p>`}
          </div>
          <div class="flex flex-wrap gap-3 mt-5">
            <button data-act="anprscan" class="${BTN} bg-white text-slate-900 hover:bg-white/90">${icon('camera',16)} ${anpr.result?'Re-scan':'Start camera scan'}</button>
            ${anpr.result ? `<button data-act="anprattach" class="${BTN} bg-[#6C63FF] text-white hover:bg-[#5B52F0]">${icon('check',16)} Attach to my session</button>` : ''}
            ${anpr.result ? `<button data-act="anprclear" class="${BTN} bg-white/10 text-white hover:bg-white/20">Clear</button>` : ''}
          </div>
        </div>
      </div>

      <div class="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
        <div class="sm:col-span-2"><label class="${LABEL}" for="vno">Vehicle number (manual entry)</label>
          <input id="vno" class="${INPUT} font-mono uppercase" placeholder="PB65 AB 1234" data-model="newVehNo" value="${esc(fm.newVehNo||'')}"></div>
        <div><label class="${LABEL}" for="vty">Type</label>
          <select id="vty" class="${INPUT}" data-model="newVehType">${VEHICLE_TYPES.map(v => `<option ${fm.newVehType===v?'selected':''}>${v}</option>`).join('')}</select></div>
        <button data-act="addvehicle" class="${BTN_P} py-3">${icon('plus',16)} Register</button>
      </div>

      <div class="mt-8">
        ${sectionHead('Registered vehicles', vs.length + ' on your account')}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${vs.length ? vs.map(v => {
            const live = sessions.find(b => b.vehicleNo === v.no);
            return `<div class="p-5 rounded-2xl border border-slate-100 bg-slate-50">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <p class="font-mono font-bold text-slate-900">${esc(v.no)}</p>
                  <p class="text-xs text-slate-500 mt-0.5">${esc(v.make)} · ${esc(v.type)}</p></div>
                <div class="flex flex-col items-end gap-1">
                  ${v.ev ? pill('EV','bg-emerald-100 text-emerald-700') : ''}
                  ${v.primary ? pill('Primary','bg-[#EFEEFF] text-[#6C63FF]') : ''}</div></div>
              <div class="mt-4 pt-4 border-t border-slate-200 grid grid-cols-2 gap-2 text-xs">
                <div><p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</p>
                  <p class="font-bold ${live?'text-emerald-600':'text-slate-500'}">${live ? esc(live.status) : 'Not parked'}</p></div>
                <div><p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Entry time</p>
                  <p class="font-bold text-slate-700">${live ? fmtT(live.start) : '—'}</p></div>
                <div><p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Slot</p>
                  <p class="font-bold text-slate-700">${live ? esc(live.slotId) : '—'}</p></div>
                <div><p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Reservation</p>
                  <p class="font-bold text-slate-700">${live ? (live.status==='Reserved'?'Locked':'In progress') : 'None'}</p></div></div>
              <div class="flex gap-2 mt-4">
                ${!v.primary ? `<button data-act="setprimary" data-id="${v.id}" class="${BTN_S} text-xs px-3 py-2">Make primary</button>` : ''}
                <button data-act="delvehicle" data-id="${v.id}" class="${BTN_G} text-xs px-3 py-2">${icon('trash',14)} Remove</button></div></div>`;
          }).join('') : emptyState('car','No vehicles yet','Register a vehicle to start parking.')}
        </div>
      </div>
    </div>

    <div class="${CARD} p-6 sm:p-8 h-fit">
      ${sectionHead('Recent gate detections','Last ANPR reads at the entry lane')}
      <div class="space-y-3">
        ${S.db.bookings.filter(b => holds(b)).slice(0,6).map(b => `
          <div class="p-4 rounded-2xl bg-slate-50 flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#6C63FF]">${icon('camera',17)}</div>
            <div class="min-w-0"><p class="font-mono text-sm font-bold text-slate-900 truncate">${esc(b.vehicleNo)}</p>
              <p class="text-xs text-slate-500">${esc(b.slotId)} · ${fmtT(b.start)} · ${esc(b.vehicleType||'Vehicle')}</p></div>
            <span class="ml-auto text-xs font-bold ${STATUS_BADGE[b.status]} px-2 py-1 rounded-lg">${esc(b.status)}</span></div>`).join('')
          || `<p class="text-sm text-slate-400">No detections yet.</p>`}
      </div>
    </div>
  </div>`;
}

function pageSession(){
  const act = activeSessions();
  const t = S.now;
  if (!act.length) return `${offlineBanner()}${emptyState('clock','No active parking session','Reserve a slot or check in a vehicle at the gate to start a session.',
    `<button data-act="tab" data-tab="reserve" class="${BTN_P}">Make a reservation</button>`)}`;
  return `${offlineBanner()}<div class="space-y-6">
    ${act.map(b => sessionStatusCard(b)).join('')}
    <div class="${CARD} p-6 sm:p-8">
      ${sectionHead('Session lifecycle','Every stage is tracked automatically by the sensors and gate camera')}
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        ${[['Entry / ANPR','camera'],['Slot assigned','pin'],['Active','checkCircle'],['Expiring soon','clock'],
           ['Grace '+S.db.settings.graceMinutes+'m','warn'],['Overstay penalty','ban'],['Exit & payment','card']]
          .map(([l,ic], i) => {
            const b = act[0];
            const stage = b.status === 'Reserved' ? 1 : b.status === 'Active' ? ((b.end - t) <= 10*MIN ? 3 : 2) : b.status === 'Grace' ? 4 : b.status === 'Overstayed' ? 5 : 6;
            const done = i <= stage;
            return `<div class="p-4 rounded-2xl text-center ${done ? 'bg-[#EFEEFF] text-[#6C63FF]' : 'bg-slate-50 text-slate-400'}">
              <div class="flex justify-center mb-2">${icon(ic,18)}</div>
              <p class="text-[11px] font-bold leading-tight">${l}</p></div>`;
          }).join('')}
      </div>
    </div>
  </div>`;
}

function pageEv(){
  const slots = liveSlots().filter(s => s.kind === 'ev');
  const free = slots.filter(s => s.live === 'free').length;
  const p = pricing('ev');
  return `${offlineBanner()}
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
    ${statCard('EV Bays', slots.length, 'zap','emerald')}
    ${statCard('Available', free, 'checkCircle','emerald', free ? 'Ready to charge' : 'All in use')}
    ${statCard('Charging Now', slots.filter(s => s.charge && s.charge.kw > 0).length, 'battery','violet')}
    ${statCard('EV Rate', money(p.total)+'/hr','rupee','blue','Includes charging')}
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    ${slots.map(s => {
      const ch = s.charge, b = s.booking;
      const pct = ch ? ch.pct : 0;
      const eta = ch && ch.kw > 0 ? Math.round((100-pct)/100 * 60 * (30/ch.kw)) : null;
      return `<div class="${CARD} p-6">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-2"><span class="text-lg font-bold text-slate-900">${esc(s.name)}</span>
            <span class="text-emerald-500">${icon('zap',16)}</span></div>
          ${pill((SLOT_STYLE[s.live]||SLOT_STYLE.free).label, (SLOT_STYLE[s.live]||SLOT_STYLE.free).badge)}</div>
        ${b ? `<p class="font-mono text-sm font-bold text-slate-700">${esc(b.vehicleNo)}</p>
          <p class="text-xs text-slate-500 mb-4">${esc(b.vehicleType||'EV')} · since ${fmtT(b.start)}</p>` :
          `<p class="text-sm text-slate-400 mb-4">Bay free · ${s.dist}m from entrance</p>`}
        <div class="space-y-2">
          <div class="flex justify-between text-xs font-bold"><span class="text-slate-400 uppercase tracking-wider">Charge</span>
            <span class="text-slate-700">${pct}%</span></div>
          ${progressBar(pct, 'bg-emerald-500')}
          <div class="flex justify-between text-xs text-slate-500 pt-1">
            <span>${ch && ch.kw ? ch.kw+' kW' : 'Idle'}</span>
            <span>${eta != null ? 'Full in ~'+durText(eta) : '—'}</span></div>
        </div>
        <div class="flex gap-2 mt-5">
          ${s.live === 'free' ? `<button data-act="reserveslot" data-slot="${s.id}" class="${BTN_P} flex-1">Reserve bay</button>` :
            `<button data-act="slot" data-slot="${s.id}" class="${BTN_S} flex-1">View details</button>`}
          ${b && b.userId === S.user.id ? `<button data-act="checkout" data-id="${b.id}" class="${BTN_G}">Exit</button>` : ''}
        </div></div>`;
    }).join('')}
  </div>`;
}

function pageEmergency(){
  const slots = liveSlots().filter(s => s.kind === 'emergency');
  const evs = S.db.emergencyVehicles;
  const active = S.db.emergencyReservations.filter(r => r.status === 'Active');
  const isAdmin = S.user.role === 'admin';
  const fm = S.ui.form;
  return `${offlineBanner()}
  <div class="rounded-[32px] p-6 sm:p-8 mb-8 bg-rose-600 text-white shadow-sm">
    <div class="flex flex-wrap items-center gap-4">
      <div class="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">${icon('ambulance',28)}</div>
      <div class="min-w-0"><h3 class="text-lg font-bold">Emergency access lane</h3>
        <p class="text-white/80 text-sm">Reserved for ambulances, fire trucks and authorised response vehicles. Access route kept clear at all times.</p></div>
      <div class="sm:ml-auto flex gap-6">
        <div><p class="text-2xl font-bold">${slots.filter(s=>s.live==='emergency').length}</p><p class="text-xs text-white/70 font-bold uppercase tracking-wider">Free</p></div>
        <div><p class="text-2xl font-bold">${slots.filter(s=>s.live==='emergency-occupied').length}</p><p class="text-xs text-white/70 font-bold uppercase tracking-wider">In use</p></div>
        <div><p class="text-2xl font-bold">${evs.filter(v=>v.auth==='Authorized').length}</p><p class="text-xs text-white/70 font-bold uppercase tracking-wider">Authorised</p></div>
      </div></div>
  </div>

  <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
    <div class="xl:col-span-2 space-y-6">
      <div class="${CARD} p-6 sm:p-8">
        ${sectionHead('Emergency slots','Visually distinct and never offered to regular drivers')}
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">${slots.map(slotCard).join('')}</div>
        <div class="mt-6 p-4 rounded-2xl bg-slate-50 flex items-start gap-3">
          ${icon('route',18,'text-rose-500 mt-0.5')}
          <div><p class="text-sm font-bold text-slate-800">Access route: Gate 1 → Ramp A → Emergency lane E</p>
            <p class="text-xs text-slate-500 mt-0.5">Route status: clear · average response access time 45 seconds</p></div></div>
      </div>

      ${isAdmin ? `<div class="${CARD} p-6 sm:p-8">
        ${sectionHead('Assign an emergency vehicle','Authorised vehicles only')}
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
          <div><label class="${LABEL}" for="evv">Vehicle</label>
            <select id="evv" class="${INPUT}" data-model="emVehicle">
              ${evs.filter(v=>v.auth==='Authorized').map(v => `<option value="${v.id}" ${fm.emVehicle===v.id?'selected':''}>${esc(v.no)} · ${esc(v.type)}</option>`).join('')}</select></div>
          <div><label class="${LABEL}" for="evs">Slot</label>
            <select id="evs" class="${INPUT}" data-model="emSlot">
              ${slots.filter(s=>s.live==='emergency').map(s => `<option value="${s.id}" ${fm.emSlot===s.id?'selected':''}>${esc(s.name)}</option>`).join('')}</select></div>
          <button data-act="assignem" class="${BTN_P} py-3">${icon('ambulance',16)} Assign slot</button>
        </div>
        <div class="mt-6 pt-6 border-t border-slate-100">
          <p class="text-sm font-bold text-slate-800 mb-3">Emergency override</p>
          <p class="text-xs text-slate-500 mb-4">If every emergency bay is taken, an authorised vehicle can override a regular reservation. The affected driver is notified, compensated and the event is logged.</p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
            <div><label class="${LABEL}" for="ovv">Vehicle</label>
              <select id="ovv" class="${INPUT}" data-model="ovVehicle">
                ${evs.filter(v=>v.auth==='Authorized').map(v => `<option value="${v.id}" ${fm.ovVehicle===v.id?'selected':''}>${esc(v.no)}</option>`).join('')}</select></div>
            <div><label class="${LABEL}" for="ovs">Occupied / reserved slot</label>
              <select id="ovs" class="${INPUT}" data-model="ovSlot">
                ${liveSlots().filter(s => s.kind!=='emergency' && ['reserved','occupied','grace'].includes(s.live))
                  .map(s => `<option value="${s.id}" ${fm.ovSlot===s.id?'selected':''}>${esc(s.name)} · ${esc((SLOT_STYLE[s.live]||{}).label||'')}</option>`).join('')}</select></div>
            <button data-act="override" class="${BTN} bg-rose-600 text-white hover:bg-rose-700 py-3">${icon('warn',16)} Trigger override</button>
          </div></div>
      </div>` : `<div class="${CARD} p-6 sm:p-8">
        ${sectionHead('What happens during an override','Drivers are always protected')}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${[['Vehicle identified','The emergency vehicle is verified against the authorised register.'],
             ['Reservation released','Your slot is temporarily released and you are moved to the next best slot.'],
             ['You are notified','A notification explains exactly what happened and why.'],
             ['Compensation applied','A free-parking credit is added to your account automatically.']]
            .map(([t2,d]) => `<div class="p-4 rounded-2xl bg-slate-50"><p class="text-sm font-bold text-slate-900">${t2}</p>
              <p class="text-xs text-slate-500 mt-1 leading-relaxed">${d}</p></div>`).join('')}</div>
      </div>`}
    </div>

    <div class="space-y-6">
      <div class="${CARD} p-6 sm:p-8">
        ${sectionHead('Authorised vehicles', evs.length + ' registered')}
        <div class="space-y-3">${evs.map(v => `
          <div class="p-4 rounded-2xl bg-slate-50">
            <div class="flex items-center justify-between gap-2">
              <span class="font-mono font-bold text-slate-900 text-sm">${esc(v.no)}</span>
              ${pill(v.auth, v.auth==='Authorized'?'bg-emerald-100 text-emerald-700':v.auth==='Pending'?'bg-amber-100 text-amber-700':'bg-slate-200 text-slate-600')}</div>
            <p class="text-xs text-slate-500 mt-1">${esc(v.type)}${v.slotId ? ' · in slot '+esc(v.slotId) : ''}</p>
            ${isAdmin ? `<div class="flex gap-2 mt-3">
              ${v.auth !== 'Authorized' ? `<button data-act="emauth" data-id="${v.id}" data-val="Authorized" class="${BTN_P} text-xs px-3 py-1.5">Authorise</button>` : ''}
              ${v.auth === 'Authorized' ? `<button data-act="emauth" data-id="${v.id}" data-val="Revoked" class="${BTN_G} text-xs px-3 py-1.5">Revoke</button>` : ''}
            </div>` : ''}</div>`).join('')}</div>
        ${isAdmin ? `<div class="mt-5 pt-5 border-t border-slate-100 grid grid-cols-1 gap-3">
          <input class="${INPUT} font-mono uppercase" placeholder="AMB-202" data-model="newEmNo" value="${esc(fm.newEmNo||'')}" aria-label="Emergency vehicle number">
          <select class="${INPUT}" data-model="newEmType" aria-label="Emergency vehicle type">${EMERGENCY_TYPES.map(t2=>`<option ${fm.newEmType===t2?'selected':''}>${t2}</option>`).join('')}</select>
          <button data-act="addem" class="${BTN_P}">${icon('plus',16)} Register vehicle</button></div>` : ''}
      </div>

      <div class="${CARD} p-6 sm:p-8">
        ${sectionHead('Active emergency use', active.length ? active.length + ' in progress' : 'None right now')}
        <div class="space-y-3">${active.length ? active.map(r => `
          <div class="p-4 rounded-2xl bg-rose-50 border border-rose-100">
            <p class="font-mono font-bold text-rose-800 text-sm">${esc(r.no)}</p>
            <p class="text-xs text-rose-600 mt-0.5">Slot ${esc(r.slotId)} · since ${fmtT(r.startTime)} · ${esc(r.type)}</p>
            ${isAdmin ? `<button data-act="releaseem" data-id="${r.id}" class="${BTN_S} text-xs px-3 py-1.5 mt-3">Release slot</button>` : ''}</div>`).join('')
          : `<p class="text-sm text-slate-400">All emergency bays are clear and ready.</p>`}</div>
      </div>

      <div class="${CARD} p-6 sm:p-8">
        ${sectionHead('Override log', S.db.overrides.length + ' recorded')}
        <div class="space-y-3">${S.db.overrides.length ? S.db.overrides.slice(0,6).map(o => `
          <div class="p-4 rounded-2xl bg-slate-50">
            <p class="text-sm font-bold text-slate-900">Slot ${esc(o.slotId)} overridden</p>
            <p class="text-xs text-slate-500 mt-0.5">${esc(o.vehicleNo)} · ${fmtDT(o.at)}${o.affectedUser ? ' · affected '+esc(o.affectedUser) : ''}</p>
            ${o.compensated ? pill('Compensation issued','bg-emerald-100 text-emerald-700 mt-2 inline-block') : ''}</div>`).join('')
          : `<p class="text-sm text-slate-400">No overrides have been required.</p>`}</div>
      </div>
    </div>
  </div>`;
}

function pagePricing(){
  const p = pricing(), pe = pricing('ev');
  const bens = myBenefits(), pens = myPenalties();
  const unpaid = pens.filter(x => x.status === 'Unpaid');
  const paid = myBookings().filter(b => b.status === 'Completed' && b.paid).slice(0,8);
  const row = (k,v,cls) => `<div class="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
    <span class="text-sm text-slate-500 font-medium">${k}</span><span class="text-sm font-bold ${cls||'text-slate-900'}">${v}</span></div>`;
  return `${offlineBanner()}
  <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
    <div class="xl:col-span-2 space-y-6">
      <div class="${CARD} p-6 sm:p-8">
        ${sectionHead('Dynamic pricing','Rates respond to occupancy, time of day and live demand',
          `<span class="px-3 py-1.5 rounded-xl text-xs font-bold ${p.level==='High'?'bg-red-50 text-red-600':p.level==='Moderate'?'bg-amber-50 text-amber-600':'bg-emerald-50 text-emerald-600'}">${p.level} demand</span>`)}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div class="p-6 rounded-[26px] bg-[#6C63FF] text-white">
            <p class="text-xs font-bold uppercase tracking-wider text-white/70">Current rate — standard</p>
            <p class="text-4xl font-bold mt-1">${money(p.total)}<span class="text-lg font-semibold">/hour</span></p>
            <div class="mt-4 space-y-1 text-sm text-white/85">
              <p>Base rate: ${money(p.base)}/hour</p>
              ${p.peak ? `<p>Peak-period adjustment: +${money(p.peak)}/hour</p>` : `<p>Off-peak period: no surcharge</p>`}
              ${p.demand ? `<p>High-demand adjustment: +${money(p.demand)}/hour</p>` : ''}
              ${p.night ? `<p>Overnight discount: ${money(p.night)}/hour</p>` : ''}
            </div></div>
          <div class="p-6 rounded-[26px] bg-slate-50 border border-slate-100">
            <p class="text-xs font-bold uppercase tracking-wider text-slate-400">EV bays (with charging)</p>
            <p class="text-4xl font-bold mt-1 text-slate-900">${money(pe.total)}<span class="text-lg font-semibold text-slate-500">/hour</span></p>
            <div class="mt-4 space-y-2">
              ${row('Occupancy', p.occupancy + '%')}
              ${row('Period', p.peakOn ? 'Peak' : 'Off-peak')}
              ${row('Estimated 2-hour stay', money(p.total*2))}
            </div></div>
        </div>
        <div class="mt-6">
          <p class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Rate through the day</p>
          ${barChart(Array.from({length:12}, (_,i) => {
            const h = (S.now.getHours() + i) % 24;
            const d = demandCurve(h);
            const v = S.db.settings.baseRate + ((h>=8&&h<11)||(h>=17&&h<21) ? S.db.settings.peakSurcharge : 0) + (d>=75?S.db.settings.demandSurcharge:d>=55?5:0);
            return { label: pad(h), value: v, display: money(v)+'/hr', color: i===0 ? '#6C63FF' : '#C7D2FE' };
          }), { height:200, label:'Projected hourly rate' })}
        </div>
      </div>

      <div class="${CARD} p-6 sm:p-8">
        ${sectionHead('Recent payments', paid.length + ' settled session(s)')}
        <div class="scroll-x"><table class="w-full text-sm min-w-[620px]">
          <thead><tr class="text-left text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
            <th class="py-3">Date</th><th>Slot</th><th>Vehicle</th><th>Duration</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody>${paid.length ? paid.map(b => `<tr class="border-b border-slate-50 last:border-0">
            <td class="py-3 text-slate-600">${fmtD(b.start)}</td><td class="font-bold text-slate-900">${esc(b.slotId)}</td>
            <td class="font-mono text-xs text-slate-600">${esc(b.vehicleNo)}</td>
            <td class="text-slate-600">${durText(minsBetween(b.start, b.exitTime||b.end))}</td>
            <td class="font-bold text-slate-900">${money(b.amount)}</td>
            <td>${pill('Paid','bg-emerald-100 text-emerald-700')}</td></tr>`).join('')
            : `<tr><td colspan="6" class="py-8 text-center text-slate-400">No payments yet.</td></tr>`}</tbody>
        </table></div>
      </div>
    </div>

    <div class="space-y-6">
      <div class="${CARD} p-6 sm:p-8">
        ${sectionHead('Free-parking credits', bens.filter(b=>b.status==='Available').length + ' available')}
        <div class="space-y-3">${bens.length ? bens.map(b => `
          <div class="p-4 rounded-2xl ${b.status==='Available'?'bg-emerald-50 border border-emerald-100':'bg-slate-50'}">
            <div class="flex items-center justify-between gap-2">
              <span class="text-sm font-bold text-slate-900">${esc(b.value||'One free session')}</span>
              ${pill(b.status, b.status==='Available'?'bg-emerald-100 text-emerald-700':'bg-slate-200 text-slate-500')}</div>
            <p class="text-xs text-slate-500 mt-1">${esc(b.reason)}</p>
            <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-2">Issued ${fmtDT(b.issuedAt)}</p></div>`).join('')
          : `<p class="text-sm text-slate-400">No compensation credits. Credits are issued automatically when a reservation is disrupted.</p>`}</div>
      </div>
      <div class="${CARD} p-6 sm:p-8">
        ${sectionHead('Penalties', unpaid.length ? money(unpaid.reduce((a,b)=>a+b.amount,0)) + ' outstanding' : 'Nothing outstanding')}
        <div class="space-y-3">${pens.length ? pens.map(p2 => `
          <div class="p-4 rounded-2xl ${p2.status==='Unpaid'?'bg-red-50 border border-red-100':'bg-slate-50'}">
            <div class="flex items-center justify-between gap-2">
              <span class="text-sm font-bold text-slate-900">Slot ${esc(p2.slotId)} · ${money(p2.amount)}</span>
              ${pill(p2.status, p2.status==='Unpaid'?'bg-red-100 text-red-700':p2.status==='Paid'?'bg-emerald-100 text-emerald-700':'bg-slate-200 text-slate-500')}</div>
            <p class="text-xs text-slate-500 mt-1">${esc(p2.vehicleNo)} · ${p2.minutes} min past grace · ${fmtDT(p2.createdAt)}</p>
            ${p2.status === 'Unpaid' ? `<button data-act="paypenalty" data-id="${p2.id}" class="${BTN_P} text-xs px-3 py-1.5 mt-3">${icon('card',14)} Pay now</button>` : ''}</div>`).join('')
          : `<p class="text-sm text-slate-400">No penalties on your account.</p>`}</div>
      </div>
    </div>
  </div>`;
}

function pageHistory(){
  const ui = S.ui, q = ui.histSearch.trim().toLowerCase();
  let rows = myBookings().filter(b => b.status === 'Completed' || b.status === 'Cancelled' || b.exitTime);
  if (q) rows = rows.filter(b => (b.vehicleNo+' '+b.slotId+' '+b.userName).toLowerCase().includes(q));
  if (ui.histFilter === 'overstay') rows = rows.filter(b => b.overstayed || b.penaltyId);
  if (ui.histFilter === 'free') rows = rows.filter(b => b.isFree);
  if (ui.histFilter === 'ev') rows = rows.filter(b => b.ev);
  if (ui.histFilter === 'unpaid') rows = rows.filter(b => !b.paid);
  rows.sort((a,b) => ui.histSort === 'recent' ? b.start - a.start
    : ui.histSort === 'oldest' ? a.start - b.start
    : ui.histSort === 'amount' ? (b.amount||0) - (a.amount||0)
    : minsBetween(b.start, b.exitTime||b.end) - minsBetween(a.start, a.exitTime||a.end));
  const per = 10, pages = Math.max(1, Math.ceil(rows.length/per));
  const page = clamp(ui.histPage, 1, pages);
  const shown = rows.slice((page-1)*per, page*per);
  const totalSpend = rows.reduce((a,b) => a + (b.amount||0), 0);
  const chip = (v,l) => `<button data-act="histfilter" data-val="${v}" class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${ui.histFilter===v?'bg-[#6C63FF] text-white':'bg-white text-slate-500 border border-slate-200 hover:border-[#6C63FF]'}">${l}</button>`;
  return `${offlineBanner()}
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
    ${statCard('Sessions', rows.length, 'history','violet')}
    ${statCard('Total spend', money(totalSpend), 'rupee','blue')}
    ${statCard('Overstays', rows.filter(b=>b.overstayed||b.penaltyId).length, 'ban','rose')}
    ${statCard('Free sessions', rows.filter(b=>b.isFree).length, 'gift','emerald')}
  </div>
  <div class="${CARD} p-6 sm:p-8">
    <div class="flex flex-wrap items-center gap-3 mb-6">
      <div class="relative flex-1 min-w-[220px]">
        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">${icon('search',17)}</span>
        <input class="${INPUT} pl-11" placeholder="Search vehicle, slot or driver…" data-model="histSearch" value="${esc(ui.histSearch)}" aria-label="Search parking history"></div>
      <div class="flex flex-wrap gap-2">${chip('all','All')}${chip('overstay','Overstay')}${chip('free','Free')}${chip('ev','EV')}${chip('unpaid','Unpaid')}</div>
      <select class="${INPUT} max-w-[180px]" data-model="histSort" aria-label="Sort history">
        <option value="recent" ${ui.histSort==='recent'?'selected':''}>Newest first</option>
        <option value="oldest" ${ui.histSort==='oldest'?'selected':''}>Oldest first</option>
        <option value="amount" ${ui.histSort==='amount'?'selected':''}>Highest amount</option>
        <option value="duration" ${ui.histSort==='duration'?'selected':''}>Longest stay</option></select>
    </div>
    ${shown.length ? `<div class="scroll-x"><table class="w-full text-sm min-w-[1000px]">
      <thead><tr class="text-left text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
        <th class="py-3">Vehicle</th><th>Slot</th><th>Entry</th><th>Exit</th><th>Duration</th><th>Amount</th>
        <th>Reservation</th><th>Overstay</th><th>Penalty</th><th>Compensation</th><th>Payment</th></tr></thead>
      <tbody>${shown.map(b => {
        const pen = b.penaltyId ? S.db.penalties.find(p => p.id === b.penaltyId) : null;
        const penAmt = pen ? pen.amount : (b.penaltyAmount || 0);
        return `<tr class="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
          <td class="py-3.5 font-mono text-xs font-bold text-slate-900">${esc(b.vehicleNo)}</td>
          <td class="font-bold text-slate-700">${esc(b.slotId)}</td>
          <td class="text-slate-600 whitespace-nowrap">${fmtDT(b.start)}</td>
          <td class="text-slate-600 whitespace-nowrap">${fmtDT(b.exitTime || b.end)}</td>
          <td class="text-slate-600 whitespace-nowrap">${durText(minsBetween(b.start, b.exitTime||b.end))}</td>
          <td class="font-bold text-slate-900">${b.isFree ? 'Free' : money(b.amount)}</td>
          <td>${pill(b.status === 'Cancelled' ? 'Cancelled' : 'Confirmed', b.status==='Cancelled'?'bg-slate-100 text-slate-500':'bg-[#EFEEFF] text-[#6C63FF]')}</td>
          <td>${(b.overstayed || penAmt) ? pill('Yes','bg-red-100 text-red-700') : pill('No','bg-slate-100 text-slate-500')}</td>
          <td class="font-semibold ${penAmt?'text-red-600':'text-slate-400'}">${penAmt ? money(penAmt) : '—'}</td>
          <td>${b.compensationId || b.isFree ? pill('Applied','bg-emerald-100 text-emerald-700') : '<span class="text-slate-400">—</span>'}</td>
          <td>${pill(b.paid ? 'Paid' : 'Pending', b.paid?'bg-emerald-100 text-emerald-700':'bg-amber-100 text-amber-700')}</td></tr>`;
      }).join('')}</tbody></table></div>
      <div class="flex items-center justify-between flex-wrap gap-3 mt-6 pt-5 border-t border-slate-100">
        <p class="text-xs font-bold uppercase tracking-wider text-slate-400">Showing ${(page-1)*per+1}–${Math.min(page*per, rows.length)} of ${rows.length}</p>
        <div class="flex items-center gap-2">
          <button data-act="histpage" data-val="${page-1}" class="${BTN_G} px-3 py-2" ${page<=1?'disabled':''}>Previous</button>
          ${Array.from({length: Math.min(pages,5)}, (_,i) => {
            const n = clamp(page-2,1,Math.max(1,pages-4)) + i;
            return n <= pages ? `<button data-act="histpage" data-val="${n}" class="w-9 h-9 rounded-xl text-sm font-bold ${n===page?'bg-[#6C63FF] text-white':'bg-white border border-slate-200 text-slate-500 hover:border-[#6C63FF]'}">${n}</button>` : '';
          }).join('')}
          <button data-act="histpage" data-val="${page+1}" class="${BTN_G} px-3 py-2" ${page>=pages?'disabled':''}>Next</button></div></div>`
      : emptyState('history','No sessions found', q ? 'No records match your search.' : 'Completed parking sessions will appear here.',
          q ? `<button data-act="clearhist" class="${BTN_P}">Clear search</button>` : '')}
  </div>`;
}

function pageNotifications(){
  const f = S.ui.notifFilter;
  let list = myNotifications();
  if (f !== 'all') list = list.filter(n => n.kind === f);
  const chip = (v,l) => `<button data-act="notiffilter" data-val="${v}" class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${f===v?'bg-[#6C63FF] text-white':'bg-white text-slate-500 border border-slate-200 hover:border-[#6C63FF]'}">${l}</button>`;
  return `${offlineBanner()}
  <div class="${CARD} p-6 sm:p-8">
    ${sectionHead('Notification centre', unreadCount() + ' unread',
      `<button data-act="readall" class="${BTN_S}">${icon('check',16)} Mark all read</button>`)}
    <div class="flex flex-wrap gap-2 mb-6">${chip('all','All')}${chip('warning','Alerts')}${chip('penalty','Penalties')}${chip('benefit','Compensation')}${chip('emergency','Emergency')}${chip('violation','Violations')}${chip('info','Updates')}</div>
    <div class="space-y-3">${list.length ? list.map(n => {
      const [ic, cls] = KIND_ICON[n.kind] || KIND_ICON.info;
      return `<div class="p-5 rounded-2xl border ${n.read ? 'border-slate-100 bg-white' : 'border-[#6C63FF]/20 bg-[#F8F8FF]'} flex gap-4">
        <div class="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${cls}">${icon(ic,19)}</div>
        <div class="min-w-0 flex-1">
          <div class="flex items-start justify-between gap-3 flex-wrap">
            <p class="font-bold text-slate-900">${esc(n.title)}</p>
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">${fmtDT(n.createdAt)}</span></div>
          <p class="text-sm text-slate-500 mt-1 leading-relaxed">${esc(n.message)}</p>
          <div class="flex flex-wrap gap-2 mt-3">
            ${n.slotId ? pill('Slot '+n.slotId,'bg-slate-100 text-slate-600') : ''}
            ${n.vehicleNo ? pill(n.vehicleNo,'bg-slate-100 text-slate-600') : ''}
            ${!n.read ? pill('New','bg-[#6C63FF] text-white') : ''}</div></div></div>`;
    }).join('') : emptyState('bell','Nothing here yet','Notifications about expiry, grace periods, penalties and compensation will appear here.')}</div>
  </div>`;
}

function pageProfile(){
  const u = USERS.find(x => x.id === S.user.id) || S.user;
  const vs = myVehicles(), hist = myBookings().filter(b => b.status === 'Completed');
  const spend = hist.reduce((a,b) => a + (b.amount||0), 0);
  const fm = S.ui.form;
  return `${offlineBanner()}
  <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
    <div class="${CARD} p-6 sm:p-8">
      <div class="flex flex-col items-center text-center">
        <div class="w-20 h-20 rounded-3xl bg-[#6C63FF] text-white flex items-center justify-center text-2xl font-bold">${esc(u.name[0])}</div>
        <h3 class="text-lg font-bold text-slate-900 mt-4">${esc(u.name)}</h3>
        <p class="text-sm text-slate-500">${esc(u.email||'')}</p>
        ${pill(u.role === 'admin' ? 'Administrator' : 'Driver','bg-[#EFEEFF] text-[#6C63FF] mt-3')}
      </div>
      <div class="mt-6 space-y-3">
        ${[['Phone', esc(u.phone||'—')], ['Member since', fmtD(u.since)], ['Vehicles', vs.length],
           ['Sessions', hist.length], ['Lifetime spend', money(spend)]].map(([k,v]) =>
          `<div class="flex justify-between py-2.5 border-b border-slate-50 last:border-0">
            <span class="text-sm text-slate-500 font-medium">${k}</span><span class="text-sm font-bold text-slate-900">${v}</span></div>`).join('')}
      </div>
    </div>
    <div class="xl:col-span-2 space-y-6">
      <div class="${CARD} p-6 sm:p-8">
        ${sectionHead('Parking preferences','Used by the smart recommendation engine')}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${[['prefEv','Prefer EV charging bays','zap'],['prefAcc','Need an accessible bay','accessible'],
             ['prefNear','Prefer slots near the entrance','pin'],['prefNotify','Send expiry reminders','bell']].map(([k,l,ic]) => `
            <button data-act="pref" data-key="${k}" class="flex items-center gap-3 p-4 rounded-2xl border text-left transition-all ${fm[k] ? 'border-[#6C63FF] bg-[#F8F8FF]' : 'border-slate-100 bg-slate-50 hover:border-slate-300'}">
              <span class="${fm[k]?'text-[#6C63FF]':'text-slate-400'}">${icon(ic,18)}</span>
              <span class="text-sm font-bold text-slate-800 flex-1">${l}</span>
              <span class="w-10 h-6 rounded-full p-1 transition-all ${fm[k]?'bg-[#6C63FF]':'bg-slate-200'}">
                <span class="block w-4 h-4 bg-white rounded-full transition-all ${fm[k]?'translate-x-4':''}"></span></span></button>`).join('')}
        </div>
      </div>
      <div class="${CARD} p-6 sm:p-8">
        ${sectionHead('My vehicles', vs.length + ' registered',
          `<button data-act="tab" data-tab="vehicles" class="${BTN_S}">${icon('plus',16)} Manage</button>`)}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${vs.map(v => `<div class="p-4 rounded-2xl bg-slate-50 flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center ${v.ev?'text-emerald-500':'text-[#6C63FF]'}">${icon(v.ev?'zap':'car',18)}</div>
            <div class="min-w-0"><p class="font-mono text-sm font-bold text-slate-900 truncate">${esc(v.no)}</p>
              <p class="text-xs text-slate-500">${esc(v.make)}</p></div>
            ${v.primary ? pill('Primary','bg-[#EFEEFF] text-[#6C63FF] ml-auto') : ''}</div>`).join('')}
        </div>
      </div>
      <div class="${CARD} p-6 sm:p-8">
        ${sectionHead('Account actions','Manage your data')}
        <div class="flex flex-wrap gap-3">
          <button data-act="tab" data-tab="history" class="${BTN_S}">${icon('history',16)} View parking history</button>
          <button data-act="tab" data-tab="pricing" class="${BTN_S}">${icon('card',16)} Payments & credits</button>
          <button data-act="resetdemo" class="${BTN_G}">${icon('refresh',16)} Reset demo data</button></div>
      </div>
    </div>
  </div>`;
}

/* =============================== Admin pages ============================== */
function analytics(range){
  const days = range === 'month' ? 30 : range === 'week' ? 7 : 1;
  const t = S.now, out = [];
  for (let i = days-1; i >= 0; i--){
    const d = new Date(t.getTime() - i*86400000);
    const rows = S.db.bookings.filter(b => new Date(b.start).toDateString() === d.toDateString());
    out.push({ date:d, sessions: rows.length,
      revenue: rows.reduce((a,b) => a + (b.isFree ? 0 : (b.amount || (b.rate||40) * Math.max(1, Math.ceil(minsBetween(b.start, b.exitTime||b.end)/60)))), 0),
      overstays: rows.filter(b => b.overstayed || b.penaltyId).length });
  }
  const hours = Array.from({length:24}, (_,h) => ({ hour:h,
    count: S.db.bookings.filter(b => new Date(b.start).getHours() === h).length }));
  const penalties = S.db.penalties;
  return { series: out, hours,
    revenue: out.reduce((a,b) => a + b.revenue, 0),
    sessions: out.reduce((a,b) => a + b.sessions, 0),
    overstays: out.reduce((a,b) => a + b.overstays, 0),
    penaltiesCollected: penalties.filter(p => p.status === 'Paid').reduce((a,p) => a + p.amount, 0),
    penaltiesOutstanding: penalties.filter(p => p.status === 'Unpaid').reduce((a,p) => a + p.amount, 0),
    peak: hours.reduce((a,b) => b.count > a.count ? b : a, hours[0]) };
}
function pageAdmin(){
  const slots = liveSlots(), s = statsOf(slots), a = analytics('week'), p = pricing();
  const openVio = S.db.violations.filter(v => v.status === 'Open');
  const res = S.db.bookings.filter(b => b.status === 'Reserved').length;
  return `${offlineBanner()}
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
    ${statCard('Occupancy', s.pct+'%','activity','violet', `${s.occupied}/${s.total} slots in use`)}
    ${statCard('Revenue (7d)', money(a.revenue),'rupee','emerald', a.sessions + ' sessions')}
    ${statCard('Open violations', openVio.length,'ban','rose', S.db.penalties.filter(x=>x.status==='Unpaid').length + ' unpaid penalties')}
    ${statCard('Reservations', res,'book','blue','Locked ahead of time')}
  </div>
  <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 mt-8">
    <div class="xl:col-span-2 ${CARD} p-6 sm:p-8">
      ${sectionHead('Revenue and sessions — last 7 days','Includes penalties collected',
        `<button data-act="tab" data-tab="analytics" class="text-sm font-bold text-[#6C63FF] hover:underline">Full analytics</button>`)}
      ${barChart(a.series.map(d => ({ label: d.date.toLocaleDateString([], {weekday:'short'}), value: d.revenue, display: money(d.revenue) })), { height:240, label:'Revenue' })}
    </div>
    <div class="${CARD} p-6 sm:p-8">
      ${sectionHead('Live occupancy','Across all parking floors')}
      ${donut(s.pct, 'Occupied')}
      <div class="grid grid-cols-2 gap-3 mt-6">
        ${[['Free', s.free,'text-emerald-600'],['Occupied', s.occupied,'text-rose-600'],
           ['Reserved', s.reserved,'text-amber-600'],['Overstayed', s.overstayed,'text-red-600'],
           ['EV free', s.evFree+'/'+s.ev,'text-emerald-600'],['Emergency', s.emergencyUsed+'/'+s.emergency,'text-rose-600']]
          .map(([k,v,c]) => `<div class="p-3 rounded-2xl bg-slate-50 text-center">
            <p class="text-lg font-bold ${c}">${v}</p><p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">${k}</p></div>`).join('')}
      </div>
    </div>
  </div>
  <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 mt-8">
    <div class="${CARD} p-6 sm:p-8">
      ${sectionHead('Pricing right now','Dynamic engine output')}
      <p class="text-3xl font-bold text-slate-900">${money(p.total)}<span class="text-base text-slate-500">/hour</span></p>
      <div class="mt-4 space-y-2 text-sm">
        ${[['Base rate', money(p.base)],['Peak adjustment', p.peak?'+'+money(p.peak):'—'],
           ['Demand adjustment', p.demand?'+'+money(p.demand):'—'],['Occupancy', p.occupancy+'%']].map(([k,v]) =>
          `<div class="flex justify-between"><span class="text-slate-500">${k}</span><span class="font-bold text-slate-900">${v}</span></div>`).join('')}</div>
      <button data-act="tab" data-tab="settings" class="${BTN_S} w-full mt-5">${icon('sliders',16)} Adjust pricing rules</button>
    </div>
    <div class="xl:col-span-2 ${CARD} p-6 sm:p-8">
      ${sectionHead('System event log','Overstays, overrides, conflicts and violations')}
      <div class="space-y-3 max-h-[320px] overflow-y-auto pr-1">
        ${S.db.events.length ? S.db.events.slice(0,12).map(e => {
          const col = { overstay:'bg-red-50 text-red-500', conflict:'bg-amber-50 text-amber-500', override:'bg-rose-50 text-rose-500',
            compensation:'bg-emerald-50 text-emerald-500', violation:'bg-fuchsia-50 text-fuchsia-500', sync:'bg-blue-50 text-blue-500' }[e.kind] || 'bg-slate-100 text-slate-500';
          return `<div class="flex gap-3 p-4 rounded-2xl bg-slate-50">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${col}">${icon('activity',16)}</div>
            <div class="min-w-0"><p class="text-sm font-semibold text-slate-800">${esc(e.text)}</p>
              <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">${fmtDT(e.at)} · ${esc(e.kind)}</p></div></div>`;
        }).join('') : `<p class="text-sm text-slate-400">No events recorded.</p>`}</div>
    </div>
  </div>`;
}

function pageAnalytics(){
  const r = S.ui.analyticsRange, a = analytics(r), slots = liveSlots(), s = statsOf(slots);
  const evSessions = S.db.bookings.filter(b => b.ev).length;
  const chip = v => `<button data-act="range" data-val="${v}" class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${r===v?'bg-[#6C63FF] text-white':'bg-white text-slate-500 border border-slate-200 hover:border-[#6C63FF]'}">${v[0].toUpperCase()+v.slice(1)}</button>`;
  return `${offlineBanner()}
  <div class="flex flex-wrap items-center gap-3 mb-6">
    <div class="flex gap-2">${chip('day')}${chip('week')}${chip('month')}</div>
    <button data-act="export" class="${BTN_S} ml-auto">${icon('download',16)} Export summary</button></div>
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
    ${statCard('Revenue', money(a.revenue),'rupee','emerald', a.sessions + ' sessions')}
    ${statCard('Occupancy now', s.pct+'%','activity','violet', s.free + ' free of ' + s.total)}
    ${statCard('Overstay violations', a.overstays,'ban','rose', money(a.penaltiesCollected) + ' collected')}
    ${statCard('Peak hour', pad(a.peak.hour)+':00','trend','blue', a.peak.count + ' sessions started')}
  </div>
  <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 mt-8">
    <div class="xl:col-span-2 ${CARD} p-6 sm:p-8">
      ${sectionHead('Revenue trend', r === 'day' ? 'Today' : r === 'week' ? 'Last 7 days' : 'Last 30 days')}
      ${lineChart(a.series.map(d => ({ label: r === 'month' ? String(d.date.getDate()) : d.date.toLocaleDateString([], {weekday:'short'}),
        value: d.revenue, display: money(d.revenue) })), { height:240, label:'Revenue trend' })}
    </div>
    <div class="${CARD} p-6 sm:p-8">
      ${sectionHead('Slot mix','Share of inventory')}
      ${donut(Math.round(s.ev/s.total*100), 'EV share', '#10B981')}
      <div class="mt-6 space-y-3">
        ${[['Standard bays', slots.filter(x=>x.kind==='normal').length, 'bg-[#6C63FF]'],
           ['EV bays', s.ev, 'bg-emerald-500'],
           ['Accessible bays', slots.filter(x=>x.kind==='accessible').length, 'bg-blue-500'],
           ['Emergency bays', s.emergency, 'bg-rose-500']].map(([k,v,c]) => `
          <div><div class="flex justify-between text-xs font-bold mb-1.5"><span class="text-slate-500">${k}</span><span class="text-slate-900">${v}</span></div>
          ${progressBar(v/slots.length*100, c)}</div>`).join('')}
      </div>
    </div>
  </div>
  <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 mt-8">
    <div class="${CARD} p-6 sm:p-8">
      ${sectionHead('Peak hours','Sessions started, by hour of day')}
      ${barChart(a.hours.filter(h => h.hour >= 6 && h.hour <= 22).map(h => ({ label: h.hour%2===0?pad(h.hour):'',
        value: h.count, display: h.count + ' sessions', color: h.hour === a.peak.hour ? '#6C63FF' : '#C7D2FE' })), { height:230, label:'Peak hours' })}
    </div>
    <div class="${CARD} p-6 sm:p-8">
      ${sectionHead('Forecast — next 12 hours','Expected occupancy')}
      ${lineChart(forecast(12).map(f => ({ label: pad(f.hour), value: f.pct, display: f.pct+'%' })), { height:230, max:100, label:'Forecast' })}
    </div>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
    ${statCard('Reservations', S.db.bookings.filter(b=>b.status==='Reserved').length,'book','violet')}
    ${statCard('Penalties collected', money(a.penaltiesCollected),'card','emerald', money(a.penaltiesOutstanding) + ' outstanding')}
    ${statCard('EV slot usage', evSessions,'zap','emerald', s.ev - s.evFree + ' bays in use now')}
    ${statCard('Emergency usage', S.db.emergencyReservations.length,'ambulance','rose', s.emergencyUsed + ' active')}
  </div>
  <div class="${CARD} p-6 sm:p-8 mt-8">
    ${sectionHead('Daily breakdown','Sessions, revenue and violations')}
    <div class="scroll-x"><table class="w-full text-sm min-w-[560px]">
      <thead><tr class="text-left text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
        <th class="py-3">Date</th><th>Sessions</th><th>Revenue</th><th>Overstays</th><th>Avg / session</th></tr></thead>
      <tbody>${a.series.slice().reverse().slice(0,12).map(d => `<tr class="border-b border-slate-50 last:border-0">
        <td class="py-3 text-slate-600">${fmtD(d.date)}</td><td class="font-bold text-slate-900">${d.sessions}</td>
        <td class="font-bold text-slate-900">${money(d.revenue)}</td>
        <td>${d.overstays ? pill(d.overstays+'','bg-red-100 text-red-700') : '<span class="text-slate-400">0</span>'}</td>
        <td class="text-slate-600">${money(d.sessions ? d.revenue/d.sessions : 0)}</td></tr>`).join('')}</tbody></table></div>
  </div>`;
}

function pageSlots(){
  const q = S.ui.slotSearch.trim().toLowerCase();
  const slots = liveSlots().filter(s => !q || s.id.toLowerCase().includes(q) || s.kind.includes(q) || s.live.includes(q));
  const fm = S.ui.form;
  return `${offlineBanner()}
  <div class="${CARD} p-6 sm:p-8 mb-6">
    ${sectionHead('Add a parking slot','New bays appear on the live map immediately')}
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
      <div><label class="${LABEL}" for="sn">Slot name</label>
        <input id="sn" class="${INPUT} uppercase" placeholder="A11" data-model="newSlotName" value="${esc(fm.newSlotName||'')}"></div>
      <div><label class="${LABEL}" for="sf">Floor</label>
        <select id="sf" class="${INPUT}" data-model="newSlotFloor">${['A','B','C','E'].map(f => `<option ${fm.newSlotFloor===f?'selected':''}>${f}</option>`).join('')}</select></div>
      <div><label class="${LABEL}" for="sk">Type</label>
        <select id="sk" class="${INPUT}" data-model="newSlotKind">${['normal','ev','accessible','emergency'].map(k => `<option value="${k}" ${fm.newSlotKind===k?'selected':''}>${kindOf(k)}</option>`).join('')}</select></div>
      <button data-act="addslot" class="${BTN_P} py-3">${icon('plus',16)} Add slot</button></div>
  </div>
  <div class="${CARD} p-6 sm:p-8">
    ${sectionHead('All slots', slots.length + ' bays',
      `<div class="relative"><span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">${icon('search',16)}</span>
        <input class="${INPUT} pl-11 max-w-[260px]" placeholder="Search slots…" data-model="slotSearch" value="${esc(S.ui.slotSearch)}" aria-label="Search slots"></div>`)}
    <div class="scroll-x"><table class="w-full text-sm min-w-[820px]">
      <thead><tr class="text-left text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
        <th class="py-3">Slot</th><th>Floor</th><th>Type</th><th>Distance</th><th>Status</th><th>Vehicle</th><th>Until</th><th class="text-right">Actions</th></tr></thead>
      <tbody>${slots.map(s => {
        const st = SLOT_STYLE[s.live] || SLOT_STYLE.free;
        return `<tr class="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
          <td class="py-3 font-bold text-slate-900">${esc(s.name)}</td><td class="text-slate-600">${esc(s.floor)}</td>
          <td class="text-slate-600">${kindOf(s.kind)}</td><td class="text-slate-600">${s.dist}m</td>
          <td>${pill(st.label, st.badge)}</td>
          <td class="font-mono text-xs text-slate-600">${esc(s.vehicleNo || (s.booking && s.booking.vehicleNo) || (s.violation && s.violation.vehicleNo) || '—')}</td>
          <td class="text-slate-600">${s.booking ? fmtT(s.booking.graceEnd) : '—'}</td>
          <td class="text-right whitespace-nowrap">
            <button data-act="slot" data-slot="${s.id}" class="${BTN_G} text-xs px-3 py-1.5">View</button>
            ${s.live !== 'free' && s.live !== 'emergency' ? `<button data-act="freeslot" data-slot="${s.id}" class="${BTN_S} text-xs px-3 py-1.5 ml-1">Release</button>` : ''}
            <button data-act="delslot" data-slot="${s.id}" class="${BTN_G} text-xs px-2.5 py-1.5 ml-1" aria-label="Delete slot">${icon('trash',13)}</button></td></tr>`;
      }).join('')}</tbody></table></div>
  </div>`;
}

function pageReservations(){
  const f = S.ui.resFilter;
  let rows = S.db.bookings.filter(b => ['Reserved','Active','Grace','Overstayed'].includes(b.status));
  if (f !== 'all') rows = rows.filter(b => b.status === f);
  rows.sort((a,b) => a.start - b.start);
  const chip = (v,l) => `<button data-act="resfilter" data-val="${v}" class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${f===v?'bg-[#6C63FF] text-white':'bg-white text-slate-500 border border-slate-200 hover:border-[#6C63FF]'}">${l}</button>`;
  return `${offlineBanner()}
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
    ${statCard('Reserved', S.db.bookings.filter(b=>b.status==='Reserved').length,'book','amber')}
    ${statCard('Active', S.db.bookings.filter(b=>b.status==='Active').length,'checkCircle','emerald')}
    ${statCard('In grace', S.db.bookings.filter(b=>b.status==='Grace').length,'warn','amber')}
    ${statCard('Overstayed', S.db.bookings.filter(b=>b.status==='Overstayed').length,'ban','rose')}
  </div>
  <div class="${CARD} p-6 sm:p-8">
    ${sectionHead('Live reservations', rows.length + ' record(s)',
      `<div class="flex flex-wrap gap-2">${chip('all','All')}${chip('Reserved','Reserved')}${chip('Active','Active')}${chip('Grace','Grace')}${chip('Overstayed','Overstayed')}</div>`)}
    ${rows.length ? `<div class="scroll-x"><table class="w-full text-sm min-w-[900px]">
      <thead><tr class="text-left text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
        <th class="py-3">Driver</th><th>Vehicle</th><th>Slot</th><th>Window</th><th>Grace until</th><th>Status</th><th>Flags</th><th class="text-right">Actions</th></tr></thead>
      <tbody>${rows.map(b => `<tr class="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
        <td class="py-3 font-semibold text-slate-800">${esc(b.userName)}</td>
        <td class="font-mono text-xs text-slate-600">${esc(b.vehicleNo)}</td>
        <td class="font-bold text-slate-900">${esc(b.slotId)}</td>
        <td class="text-slate-600 whitespace-nowrap">${fmtT(b.start)} – ${fmtT(b.end)}</td>
        <td class="text-slate-600">${fmtT(b.graceEnd)}</td>
        <td>${pill(b.status, STATUS_BADGE[b.status])}</td>
        <td>${b.conflict ? pill('Conflict','bg-amber-100 text-amber-700') : ''}${b.isFree ? pill('Free','bg-emerald-100 text-emerald-700') : ''}${b.override ? pill('Override','bg-rose-100 text-rose-700') : ''}</td>
        <td class="text-right whitespace-nowrap">
          ${b.status === 'Reserved' ? `<button data-act="checkin" data-id="${b.id}" class="${BTN_G} text-xs px-3 py-1.5">Check in</button>` : ''}
          ${['Active','Grace','Overstayed'].includes(b.status) ? `<button data-act="checkout" data-id="${b.id}" class="${BTN_G} text-xs px-3 py-1.5">Check out</button>` : ''}
          <button data-act="cancel" data-id="${b.id}" class="${BTN_S} text-xs px-3 py-1.5 ml-1">Cancel</button></td></tr>`).join('')}</tbody></table></div>`
      : emptyState('book','No reservations in this view','Change the filter to see other reservation states.')}
  </div>`;
}

function pageViolations(){
  const f = S.ui.vioFilter;
  let rows = S.db.violations.slice();
  if (f === 'open') rows = rows.filter(v => v.status === 'Open');
  if (f === 'resolved') rows = rows.filter(v => v.status === 'Resolved');
  rows.sort((a,b) => b.detectedAt - a.detectedAt);
  const pens = S.db.penalties.slice().sort((a,b) => b.createdAt - a.createdAt);
  const chip = (v,l) => `<button data-act="viofilter" data-val="${v}" class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${f===v?'bg-[#6C63FF] text-white':'bg-white text-slate-500 border border-slate-200 hover:border-[#6C63FF]'}">${l}</button>`;
  return `${offlineBanner()}
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
    ${statCard('Open violations', S.db.violations.filter(v=>v.status==='Open').length,'ban','rose')}
    ${statCard('Overstays today', S.db.bookings.filter(b => b.status==='Overstayed' || (b.overstayed && new Date(b.start).toDateString()===S.now.toDateString())).length,'warn','amber')}
    ${statCard('Penalties unpaid', money(S.db.penalties.filter(p=>p.status==='Unpaid').reduce((a,p)=>a+p.amount,0)),'rupee','rose')}
    ${statCard('Collected', money(S.db.penalties.filter(p=>p.status==='Paid').reduce((a,p)=>a+p.amount,0)),'card','emerald')}
  </div>
  <div class="${CARD} p-6 sm:p-8 mb-8">
    ${sectionHead('Unauthorized parking detection','Vehicles detected in reserved, restricted, EV-only or emergency bays',
      `<div class="flex flex-wrap gap-2">${chip('open','Open')}${chip('resolved','Resolved')}${chip('all','All')}
        <button data-act="simviolation" class="${BTN_S}">${icon('camera',16)} Simulate detection</button></div>`)}
    ${rows.length ? `<div class="scroll-x"><table class="w-full text-sm min-w-[900px]">
      <thead><tr class="text-left text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
        <th class="py-3">Vehicle</th><th>Slot</th><th>Type</th><th>Reservation owner</th><th>Detected</th><th>Status</th><th class="text-right">Admin action</th></tr></thead>
      <tbody>${rows.map(v => `<tr class="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
        <td class="py-3 font-mono text-xs font-bold text-slate-900">${esc(v.vehicleNo)}</td>
        <td class="font-bold text-slate-700">${esc(v.slotId)}</td>
        <td><span class="text-slate-600">${esc(v.type)}</span><p class="text-[11px] text-slate-400">${esc(v.note||'')}</p></td>
        <td class="text-slate-600">${esc(v.owner||'—')}</td>
        <td class="text-slate-600 whitespace-nowrap">${fmtDT(v.detectedAt)}</td>
        <td>${pill(v.status, v.status==='Open'?'bg-fuchsia-100 text-fuchsia-700':'bg-emerald-100 text-emerald-700')}${v.action ? `<p class="text-[11px] text-slate-400 mt-1">${esc(v.action)}</p>` : ''}</td>
        <td class="text-right whitespace-nowrap">
          ${v.status === 'Open' ? `<button data-act="resolvevio" data-id="${v.id}" data-val="Warned" class="${BTN_G} text-xs px-3 py-1.5">Warn</button>
            <button data-act="resolvevio" data-id="${v.id}" data-val="Fined" class="${BTN_G} text-xs px-3 py-1.5 ml-1">Fine</button>
            <button data-act="resolvevio" data-id="${v.id}" data-val="Towed" class="${BTN_P} text-xs px-3 py-1.5 ml-1">Resolve</button>`
            : `<span class="text-xs text-slate-400">Closed ${esc(v.action||'')}</span>`}</td></tr>`).join('')}</tbody></table></div>`
      : emptyState('shield','No violations in this view','Unauthorized vehicles are flagged automatically by the bay sensors.')}
  </div>
  <div class="${CARD} p-6 sm:p-8">
    ${sectionHead('Overstay penalties', pens.length + ' record(s)')}
    ${pens.length ? `<div class="scroll-x"><table class="w-full text-sm min-w-[820px]">
      <thead><tr class="text-left text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
        <th class="py-3">Driver</th><th>Vehicle</th><th>Slot</th><th>Overstay</th><th>Amount</th><th>Raised</th><th>Status</th><th class="text-right">Actions</th></tr></thead>
      <tbody>${pens.map(p => `<tr class="border-b border-slate-50 last:border-0">
        <td class="py-3 font-semibold text-slate-800">${esc(p.userName)}</td>
        <td class="font-mono text-xs text-slate-600">${esc(p.vehicleNo)}</td>
        <td class="font-bold text-slate-700">${esc(p.slotId)}</td>
        <td class="text-slate-600">${durText(p.minutes)}</td>
        <td class="font-bold text-slate-900">${money(p.amount)}</td>
        <td class="text-slate-600 whitespace-nowrap">${fmtDT(p.createdAt)}</td>
        <td>${pill(p.status, p.status==='Unpaid'?'bg-red-100 text-red-700':p.status==='Paid'?'bg-emerald-100 text-emerald-700':'bg-slate-200 text-slate-500')}</td>
        <td class="text-right whitespace-nowrap">${p.status === 'Unpaid' ? `
          <button data-act="penstatus" data-id="${p.id}" data-val="Paid" class="${BTN_P} text-xs px-3 py-1.5">Mark paid</button>
          <button data-act="penstatus" data-id="${p.id}" data-val="Waived" class="${BTN_G} text-xs px-3 py-1.5 ml-1">Waive</button>` : '<span class="text-xs text-slate-400">Settled</span>'}</td></tr>`).join('')}</tbody></table></div>`
      : `<p class="text-sm text-slate-400">No penalties raised.</p>`}
  </div>`;
}

function pageManageUsers(){
  const q = S.ui.userSearch.trim().toLowerCase();
  const users = USERS.filter(u => !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  return `${offlineBanner()}
  <div class="${CARD} p-6 sm:p-8 mb-8">
    ${sectionHead('Users', users.length + ' account(s)',
      `<div class="relative"><span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">${icon('search',16)}</span>
        <input class="${INPUT} pl-11 max-w-[260px]" placeholder="Search users…" data-model="userSearch" value="${esc(S.ui.userSearch)}" aria-label="Search users"></div>`)}
    <div class="scroll-x"><table class="w-full text-sm min-w-[840px]">
      <thead><tr class="text-left text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
        <th class="py-3">Name</th><th>Role</th><th>Email</th><th>Vehicles</th><th>Sessions</th><th>Penalties</th><th>Credits</th></tr></thead>
      <tbody>${users.map(u => {
        const vs = S.db.vehicles.filter(v => v.userId === u.id);
        const bs = S.db.bookings.filter(b => b.userId === u.id);
        const ps = S.db.penalties.filter(p => p.userId === u.id && p.status === 'Unpaid');
        const bn = S.db.benefits.filter(b => b.userId === u.id && b.status === 'Available');
        return `<tr class="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
          <td class="py-3"><div class="flex items-center gap-3">
            <span class="w-9 h-9 rounded-xl bg-[#EFEEFF] text-[#6C63FF] flex items-center justify-center font-bold">${esc(u.name[0])}</span>
            <span class="font-semibold text-slate-800">${esc(u.name)}</span></div></td>
          <td>${pill(u.role, u.role==='admin'?'bg-[#EFEEFF] text-[#6C63FF]':'bg-slate-100 text-slate-600')}</td>
          <td class="text-slate-600">${esc(u.email)}</td>
          <td class="text-slate-600">${vs.length}</td><td class="text-slate-600">${bs.length}</td>
          <td class="${ps.length?'text-red-600 font-bold':'text-slate-400'}">${ps.length ? money(ps.reduce((a,p)=>a+p.amount,0)) : '—'}</td>
          <td>${bn.length ? pill(bn.length+' free','bg-emerald-100 text-emerald-700') : '<span class="text-slate-400">—</span>'}</td></tr>`;
      }).join('')}</tbody></table></div>
  </div>
  <div class="${CARD} p-6 sm:p-8">
    ${sectionHead('Registered vehicles', S.db.vehicles.length + ' vehicle(s)')}
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      ${S.db.vehicles.map(v => {
        const owner = USERS.find(u => u.id === v.userId);
        const live = S.db.bookings.find(b => b.vehicleNo === v.no && holds(b));
        return `<div class="p-5 rounded-2xl bg-slate-50 border border-slate-100">
          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0"><p class="font-mono font-bold text-slate-900 text-sm">${esc(v.no)}</p>
              <p class="text-xs text-slate-500 mt-0.5">${esc(v.make)} · ${esc(v.type)}</p></div>
            ${v.ev ? pill('EV','bg-emerald-100 text-emerald-700') : ''}</div>
          <p class="text-xs text-slate-500 mt-3">Owner: <span class="font-semibold text-slate-700">${esc(owner ? owner.name : '—')}</span></p>
          <p class="text-xs mt-1 ${live?'text-emerald-600 font-bold':'text-slate-400'}">${live ? 'Parked in '+esc(live.slotId)+' · '+esc(live.status) : 'Not parked'}</p>
          <button data-act="delvehicle" data-id="${v.id}" class="${BTN_G} text-xs px-3 py-1.5 mt-3">${icon('trash',13)} Remove</button></div>`;
      }).join('')}</div>
  </div>`;
}

function pageSettings(){
  const st = S.db.settings;
  const num = (key, label, hint, min, max, step) => `<div>
    <label class="${LABEL}" for="set-${key}">${label}</label>
    <input id="set-${key}" type="number" class="${INPUT}" data-setting="${key}" value="${st[key]}" min="${min||0}" max="${max||9999}" step="${step||1}">
    <p class="text-[11px] text-slate-400 mt-1.5">${hint}</p></div>`;
  return `${offlineBanner()}
  <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
    <div class="${CARD} p-6 sm:p-8">
      ${sectionHead('Parking rules','Applied to every new and running session')}
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        ${num('graceMinutes','Grace period (minutes)','Free buffer after a session expires.',0,60)}
        ${num('penaltyBase','Penalty base (₹)','Charged as soon as the grace period is exceeded.',0,1000,10)}
        ${num('penaltyPerHour','Penalty per hour (₹)','Added for each hour, or part hour, of overstay.',0,1000,10)}
        ${num('autoResolveHours','Auto-resolve violations (hours)','Open violations close automatically after this.',1,168)}
      </div>
    </div>
    <div class="${CARD} p-6 sm:p-8">
      ${sectionHead('Dynamic pricing','Drives the rate shown to every driver')}
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        ${num('baseRate','Base rate (₹/hour)','Standard bays, off-peak.',0,1000,5)}
        ${num('evRate','EV rate (₹/hour)','Includes charging.',0,1000,5)}
        ${num('peakSurcharge','Peak surcharge (₹/hour)','Applied 08:00–11:00 and 17:00–21:00.',0,500,5)}
        ${num('demandSurcharge','High-demand surcharge (₹/hour)','Applied above the occupancy threshold.',0,500,5)}
        ${num('occupancyThreshold','Demand threshold (% occupancy)','Occupancy at which demand pricing starts.',10,100,5)}
        ${num('anprConfidence','ANPR confidence floor (%)','Plates below this are sent for manual review.',50,100)}
      </div>
    </div>
    <div class="${CARD} p-6 sm:p-8">
      ${sectionHead('Compensation policy','How drivers are made whole')}
      <label class="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 cursor-pointer">
        <input type="checkbox" data-setting="allowMultipleBenefits" ${st.allowMultipleBenefits?'checked':''} class="accent-[#6C63FF] w-4 h-4">
        <span><span class="text-sm font-bold text-slate-800 block">Allow multiple unused credits</span>
        <span class="text-xs text-slate-500">When off, a driver holding an unused credit is notified instead of receiving another.</span></span></label>
      <div class="mt-4 p-4 rounded-2xl bg-[#F8F8FF] border border-[#6C63FF]/15">
        <p class="text-sm font-bold text-slate-800">Current rule</p>
        <p class="text-xs text-slate-500 mt-1 leading-relaxed">A driver whose reservation is blocked by an overstaying vehicle, or released by an emergency override, automatically receives one free parking session, applied to their next eligible booking.</p></div>
    </div>
    <div class="${CARD} p-6 sm:p-8">
      ${sectionHead('Simulation controls','For demonstrating the full lifecycle quickly')}
      <label class="${LABEL}" for="speed">Demo clock speed</label>
      <div class="flex flex-wrap gap-2" id="speed">
        ${[1,5,15,60].map(v => `<button data-act="speed" data-val="${v}" class="px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${st.timeSpeed===v?'bg-[#6C63FF] text-white':'bg-white border border-slate-200 text-slate-600 hover:border-[#6C63FF]'}">${v}× </button>`).join('')}
      </div>
      <p class="text-[11px] text-slate-400 mt-2">Accelerates the clock so expiry, the grace period and overstay penalties can be observed in seconds.</p>
      <div class="flex flex-wrap gap-3 mt-6 pt-6 border-t border-slate-100">
        <button data-act="toggleoffline" class="${BTN_S}">${icon(S.offline?'wifi':'wifiOff',16)} ${S.offline?'Restore connection':'Simulate outage'}</button>
        <button data-act="simviolation" class="${BTN_S}">${icon('camera',16)} Simulate unauthorized vehicle</button>
        <button data-act="resetdemo" class="${BTN_G}">${icon('refresh',16)} Reset all demo data</button></div>
    </div>
  </div>`;
}

function pageOffline(){
  const q = S.db.sync.pending;
  const systems = [
    ['Bay occupancy sensors', true, 'Local mesh · updating every 2s'],
    ['Entry / exit barrier', true, 'Operating on cached authorisations'],
    ['ANPR camera', true, 'Plates captured locally, queued for upload'],
    ['Reservation lock', true, 'Last synced state held on the local controller'],
    ['Emergency access', true, 'Always available — highest priority'],
    ['Cloud analytics', !S.offline, S.offline ? 'Unavailable until connectivity returns' : 'Streaming normally'],
    ['Payments', !S.offline, S.offline ? 'Queued — settled on reconnect' : 'Online'],
    ['Push notifications', !S.offline, S.offline ? 'Shown locally only' : 'Delivered'],
  ];
  return `${offlineBanner()}
  <div class="rounded-[32px] p-6 sm:p-8 mb-8 ${S.offline ? 'bg-amber-500' : 'bg-emerald-600'} text-white">
    <div class="flex flex-wrap items-center gap-4">
      <div class="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">${icon(S.offline?'wifiOff':'wifi',28)}</div>
      <div><h3 class="text-lg font-bold">${S.offline ? 'Offline Safety Mode — Limited Connectivity' : 'All systems online'}</h3>
        <p class="text-white/85 text-sm">${S.offline ? 'Core parking operations continue locally. Data will synchronise automatically when the connection returns.' : 'Cloud services, payments and analytics are fully operational.'}</p></div>
      <button data-act="toggleoffline" class="sm:ml-auto ${BTN} bg-white/20 text-white hover:bg-white/30">
        ${icon('refresh',16)} ${S.offline ? 'Restore connection' : 'Simulate outage'}</button></div>
  </div>
  <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
    <div class="xl:col-span-2 ${CARD} p-6 sm:p-8">
      ${sectionHead('Subsystem status','Critical safety functions never depend on the internet')}
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        ${systems.map(([n, ok, note]) => `<div class="p-4 rounded-2xl ${ok?'bg-slate-50':'bg-amber-50 border border-amber-100'}">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full ${ok?'bg-emerald-500':'bg-amber-500'} ${ok?'':'pulse-dot'}"></span>
            <p class="text-sm font-bold text-slate-900">${n}</p></div>
          <p class="text-xs text-slate-500 mt-1 ml-[18px]">${note}</p></div>`).join('')}
      </div>
    </div>
    <div class="${CARD} p-6 sm:p-8">
      ${sectionHead('Synchronisation', q.length + ' record(s) queued')}
      <div class="space-y-2 max-h-[260px] overflow-y-auto">${q.length ? q.map(p => `
        <div class="p-3 rounded-2xl bg-slate-50 flex items-center gap-3">
          ${icon('file',16,'text-slate-400')}<div class="min-w-0">
            <p class="text-xs font-bold text-slate-800 truncate">${esc(p.label)}</p>
            <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">${fmtT(p.queuedAt)}</p></div></div>`).join('')
        : `<p class="text-sm text-slate-400">Nothing pending. Everything is synchronised.</p>`}</div>
      <div class="mt-5 pt-5 border-t border-slate-100 space-y-2 text-sm">
        <div class="flex justify-between"><span class="text-slate-500">Last sync</span><span class="font-bold text-slate-900">${fmtDT(S.db.sync.lastSync)}</span></div>
        <div class="flex justify-between"><span class="text-slate-500">Mode</span><span class="font-bold ${S.offline?'text-amber-600':'text-emerald-600'}">${S.offline?'Local only':'Cloud connected'}</span></div></div>
      ${S.offline ? `<button data-act="toggleoffline" class="${BTN_P} w-full mt-5">${icon('refresh',16)} Reconnect & sync now</button>` : ''}
    </div>
  </div>`;
}

/* ================================= Modals ================================= */
function modalShell(title, sub, body, footer, size){
  return `<div class="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-6" role="dialog" aria-modal="true" aria-label="${esc(title)}">
    <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" data-act="closemodal"></div>
    <div class="pop relative w-full ${size||'sm:max-w-lg'} bg-white rounded-t-[32px] sm:rounded-[32px] shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto">
      <div class="flex items-start justify-between gap-4 p-6 sm:p-8 pb-4">
        <div><h3 class="text-lg font-bold text-slate-900">${title}</h3>
          ${sub ? `<p class="text-sm text-slate-500 mt-0.5">${sub}</p>` : ''}</div>
        <button data-act="closemodal" class="p-2 -mr-2 text-slate-400 hover:text-slate-600 rounded-xl" aria-label="Close">${icon('x',20)}</button></div>
      <div class="px-6 sm:px-8 pb-2">${body}</div>
      ${footer ? `<div class="p-6 sm:p-8 pt-4 flex flex-wrap gap-3 justify-end">${footer}</div>` : '<div class="pb-6"></div>'}
    </div></div>`;
}
function renderModal(){
  const m = S.ui.modal, el = document.getElementById('overlay');
  if (!m){ el.innerHTML = ''; return; }
  let html = '';
  if (m.type === 'slot') html = modalSlot(m.slotId);
  else if (m.type === 'confirm') html = modalShell(esc(m.title), esc(m.sub||''),
    `<p class="text-sm text-slate-600 leading-relaxed">${esc(m.body||'')}</p>`,
    `<button data-act="closemodal" class="${BTN_G}">Cancel</button>
     <button data-act="confirmyes" class="${m.danger ? BTN + ' bg-rose-600 text-white hover:bg-rose-700' : BTN_P}">${esc(m.ok||'Confirm')}</button>`);
  else if (m.type === 'checkout') html = modalCheckout(m.id);
  else if (m.type === 'extend') html = modalExtend(m.id);
  el.innerHTML = html;
}
function modalSlot(slotId){
  const s = liveSlots().find(x => x.id === slotId);
  if (!s) return '';
  const st = SLOT_STYLE[s.live] || SLOT_STYLE.free, b = s.booking, isAdmin = S.user.role === 'admin';
  const p = pricing(s.kind === 'ev' ? 'ev' : 'normal');
  const rows = [
    ['Status', st.label], ['Type', kindOf(s.kind)], ['Floor', s.floor],
    ['Distance from entrance', s.dist + ' m'], ['Rate', money(p.total) + '/hour'],
  ];
  if (b) rows.push(['Vehicle', b.vehicleNo], ['Driver', b.userName], ['Entry time', fmtDT(b.start)],
    ['Booked until', fmtT(b.end)], ['Grace until', fmtT(b.graceEnd)], ['Reservation', b.status]);
  if (s.violation) rows.push(['Unauthorized vehicle', s.violation.vehicleNo], ['Detected', fmtDT(s.violation.detectedAt)], ['Violation', s.violation.type]);
  if (s.charge) rows.push(['Charge level', s.charge.pct + '%'], ['Charging rate', (s.charge.kw||0) + ' kW']);
  return modalShell(`Slot ${esc(s.name)}`, `${kindOf(s.kind)} bay · Floor ${esc(s.floor)}`,
    `<div class="p-4 rounded-2xl ${st.card} border mb-5">
      <div class="flex items-center justify-between">
        <span class="text-2xl font-bold text-slate-900">${esc(s.name)}</span>${pill(st.label, st.badge)}</div>
      ${s.pred && s.pred.soon ? `<p class="text-sm font-bold text-[#6C63FF] mt-3 flex items-center gap-2">${icon('ai',15)}
        Slot ${esc(s.name)} is likely to become available in approximately ${s.pred.eta} minutes (${s.pred.conf}% confidence).</p>` : ''}
      ${s.pred && s.pred.note ? `<p class="text-sm font-bold text-red-600 mt-3">${esc(s.pred.note)}</p>` : ''}</div>
    <div class="space-y-0.5">${rows.map(([k,v]) => `<div class="flex justify-between gap-4 py-2.5 border-b border-slate-50 last:border-0">
      <span class="text-sm text-slate-500 font-medium">${esc(k)}</span><span class="text-sm font-bold text-slate-900 text-right">${esc(v)}</span></div>`).join('')}</div>`,
    `${s.live === 'free' ? `<button data-act="reserveslot" data-slot="${s.id}" class="${BTN_P}">${icon('book',16)} Reserve this slot</button>` : ''}
     ${s.live === 'emergency' && isAdmin ? `<button data-act="tab" data-tab="emergency" class="${BTN_P}">Assign emergency vehicle</button>` : ''}
     ${b && b.userId === S.user.id && ['Active','Grace','Overstayed'].includes(b.status) ? `<button data-act="checkout" data-id="${b.id}" class="${BTN_P}">Exit & pay</button>` : ''}
     ${isAdmin && s.live !== 'free' ? `<button data-act="freeslot" data-slot="${s.id}" class="${BTN_S}">Release slot</button>` : ''}
     ${!isAdmin && s.live !== 'free' && s.live !== 'emergency' ? `<button data-act="reportslot" data-slot="${s.id}" class="${BTN_S}">Report a problem</button>` : ''}
     <button data-act="closemodal" class="${BTN_G}">Close</button>`);
}
function checkoutTotals(b){
  const t = S.now;
  const exit = t;
  const hours = Math.max(1, Math.ceil(minsBetween(b.start, exit)/60));
  const parking = b.isFree ? 0 : (b.rate || S.db.settings.baseRate) * hours;
  const pen = b.penaltyId ? (S.db.penalties.find(p => p.id === b.penaltyId) || {amount:0}) : {amount:0};
  return { exit, hours, parking, penalty: pen.amount || 0, total: parking + (pen.amount||0) };
}
function modalCheckout(id){
  const b = S.db.bookings.find(x => x.id === id); if (!b) return '';
  const c = checkoutTotals(b), ben = availableBenefit();
  const late = S.now > b.graceEnd;
  return modalShell('Exit and payment', `Slot ${esc(b.slotId)} · ${esc(b.vehicleNo)}`,
    `<div class="space-y-0.5 mb-4">
      ${[['Entry time', fmtDT(b.start)], ['Exit time', fmtDT(c.exit)], ['Duration', durText(minsBetween(b.start, c.exit))],
         ['Billed hours', c.hours + ' hour' + (c.hours>1?'s':'')], ['Rate', money(b.rate)+'/hour']]
        .map(([k,v]) => `<div class="flex justify-between py-2.5 border-b border-slate-50">
          <span class="text-sm text-slate-500 font-medium">${k}</span><span class="text-sm font-bold text-slate-900">${v}</span></div>`).join('')}
      <div class="flex justify-between py-2.5 border-b border-slate-50">
        <span class="text-sm text-slate-500 font-medium">Parking charge</span>
        <span class="text-sm font-bold ${b.isFree?'text-emerald-600':'text-slate-900'}">${b.isFree ? 'Free (credit applied)' : money(c.parking)}</span></div>
      ${c.penalty ? `<div class="flex justify-between py-2.5 border-b border-slate-50">
        <span class="text-sm text-red-500 font-medium">Overstay penalty</span><span class="text-sm font-bold text-red-600">${money(c.penalty)}</span></div>` : ''}
      <div class="flex justify-between py-3.5">
        <span class="text-base font-bold text-slate-900">Total payable</span>
        <span class="text-xl font-bold text-slate-900">${money(c.total)}</span></div></div>
    ${late ? `<div class="p-4 rounded-2xl bg-red-50 border border-red-100 mb-4 flex items-start gap-3">
      ${icon('warn',18,'text-red-500 mt-0.5')}<p class="text-xs text-red-700 leading-relaxed">This vehicle exited after the ${S.db.settings.graceMinutes}-minute grace period, so an overstay penalty has been added and recorded in the parking history.</p></div>` : ''}
    ${ben && !b.isFree ? `<label class="flex items-start gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 cursor-pointer mb-2">
      <input type="checkbox" data-model="coUseBenefit" ${S.ui.form.coUseBenefit?'checked':''} class="mt-0.5 accent-[#6C63FF] w-4 h-4">
      <span><span class="text-sm font-bold text-emerald-800 block">Use free-parking credit (waives ${money(c.parking)})</span>
      <span class="text-xs text-emerald-700">${esc(ben.reason)}</span></span></label>` : ''}
    ${S.offline ? `<p class="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-2xl p-3 mt-3">Offline: this payment will be queued locally and settled automatically when the connection returns.</p>` : ''}`,
    `<button data-act="closemodal" class="${BTN_G}">Cancel</button>
     <button data-act="confirmcheckout" data-id="${b.id}" class="${BTN_P}">${icon('card',16)} ${S.offline ? 'Queue payment & exit' : 'Pay ' + money(c.total)}</button>`);
}
function modalExtend(id){
  const b = S.db.bookings.find(x => x.id === id); if (!b) return '';
  const add = +(S.ui.form.extendHours || 1);
  const p = pricing(b.ev ? 'ev' : 'normal');
  const newEnd = new Date(new Date(b.end).getTime() + add*HOUR);
  const conflict = S.db.bookings.some(o => o.id !== b.id && o.slotId === b.slotId && holds(o) && o.start < new Date(newEnd.getTime()+S.db.settings.graceMinutes*MIN));
  return modalShell('Extend parking', `Slot ${esc(b.slotId)} · currently until ${fmtT(b.end)}`,
    `<label class="${LABEL}" for="eh">Additional time</label>
     <select id="eh" class="${INPUT}" data-model="extendHours">${[1,2,3,4].map(h => `<option value="${h}" ${add===h?'selected':''}>${h} hour${h>1?'s':''}</option>`).join('')}</select>
     <div class="mt-4 space-y-2 text-sm">
       <div class="flex justify-between"><span class="text-slate-500">New end time</span><span class="font-bold text-slate-900">${fmtDT(newEnd)}</span></div>
       <div class="flex justify-between"><span class="text-slate-500">Rate</span><span class="font-bold text-slate-900">${money(p.total)}/hour</span></div>
       <div class="flex justify-between"><span class="text-slate-500">Additional cost</span><span class="font-bold text-slate-900">${money(p.total*add)}</span></div></div>
     ${conflict ? `<p class="mt-4 text-xs text-red-700 bg-red-50 border border-red-100 rounded-2xl p-3">Another reservation starts on this slot before the new end time. Extending is not possible — the recommendation engine can find you a different bay.</p>` : ''}`,
    `<button data-act="closemodal" class="${BTN_G}">Cancel</button>
     <button data-act="confirmextend" data-id="${b.id}" class="${BTN_P}" ${conflict?'disabled':''}>Extend to ${fmtT(newEnd)}</button>`);
}

/* ================================= Actions ================================ */
function queueOffline(label){
  if (!S.offline) return false;
  S.db.sync.pending.push({ id: uid('q'), label, queuedAt: S.now });
  return true;
}
function goOffline(){
  S.offline = true; S.ui.modal = null;
  notify(S.db, 'all', 'Offline Safety Mode active',
    'Connectivity has been lost. Sensors, entry/exit detection and slot status continue to operate locally.', 'system');
  logEvent(S.db, 'sync', 'Connectivity lost — offline safety mode engaged.');
  toast('Offline Safety Mode — Limited Connectivity', 'info');
  save(S.db); render();
}
function goOnline(){
  S.ui.syncing = true; render();
  setTimeout(() => {
    const n = S.db.sync.pending.length;
    S.db.sync.pending = []; S.db.sync.lastSync = S.now; S.offline = false; S.ui.syncing = false;
    notify(S.db, 'all', 'Connection restored', `All systems are back online. ${n} local record(s) were synchronised.`, 'system');
    logEvent(S.db, 'sync', `Connection restored — ${n} record(s) synchronised.`);
    toast(`Synchronised ${n} local record(s)`, 'success');
    save(S.db); render();
  }, 1600);
}
function createBooking(slotId, vehicle, start, hours, useBenefit){
  const slot = S.db.slots.find(s => s.id === slotId);
  if (!slot) return toast('Slot not found', 'error');
  if (slot.kind === 'emergency') return toast('Emergency bays cannot be reserved by drivers', 'error');
  const end = new Date(start.getTime() + hours*HOUR);
  const graceEnd = new Date(end.getTime() + S.db.settings.graceMinutes*MIN);
  if (!isFreeBetween(slotId, start, graceEnd)) return toast(`Slot ${slotId} is not free for that window`, 'error');
  const ben = useBenefit ? availableBenefit() : null;
  const p = pricing(slot.kind === 'ev' ? 'ev' : 'normal');
  const b = { id: uid('rsv'), userId: S.user.id, userName: S.user.name, vehicleNo: vehicle.no, vehicleType: vehicle.type,
    ev: vehicle.ev, slotId, start, end, graceEnd, status: start <= S.now ? 'Active' : 'Reserved',
    rate: p.total, amount: 0, paid: false, isFree: !!ben, benefitApplied: ben ? ben.id : null,
    penaltyId: null, compensationId: null, exitTime: null, source: S.offline ? 'offline' : 'app', flags: {} };
  S.db.bookings.unshift(b);
  if (ben){ ben.status = 'Used'; ben.usedAt = S.now; ben.usedOn = b.id; }
  notify(S.db, S.user.id, 'Your reserved slot is ready',
    `Slot ${slotId} is locked for ${esc(vehicle.no)} from ${fmtDT(start)}.${ben ? ' Your free-parking credit has been applied.' : ''}`,
    'info', { slotId, vehicleNo: vehicle.no });
  queueOffline(`Reservation ${slotId} · ${vehicle.no}`);
  save(S.db);
  toast(ben ? `Slot ${slotId} reserved — credit applied` : `Slot ${slotId} reserved and locked`);
  S.ui.modal = null; S.ui.form.resSlot = null;
}
function doCheckout(id){
  const b = S.db.bookings.find(x => x.id === id); if (!b) return;
  const c = checkoutTotals(b);
  const useBen = S.ui.form.coUseBenefit && !b.isFree;
  let parking = c.parking;
  if (useBen){ const ben = availableBenefit(); if (ben){ ben.status='Used'; ben.usedAt=S.now; ben.usedOn=b.id; b.isFree = true; parking = 0; } }
  b.exitTime = c.exit;
  b.status = 'Completed';
  b.amount = parking + c.penalty;
  b.overstayed = !!b.penaltyId;
  b.paid = !S.offline;
  if (b.penaltyId){ const p = S.db.penalties.find(x => x.id === b.penaltyId); if (p && !S.offline){ p.status = 'Paid'; p.settledAt = S.now; } }
  const queued = queueOffline(`Payment ${money(b.amount)} · slot ${b.slotId}`);
  notify(S.db, b.userId, queued ? 'Exit recorded offline' : 'Payment successful',
    queued ? `Exit from slot ${b.slotId} recorded locally. ${money(b.amount)} will be settled when the connection returns.`
           : `${money(b.amount)} paid for slot ${b.slotId}. Thank you for parking with SmartPark.`, 'info', { slotId: b.slotId });
  logEvent(S.db, 'exit', `${b.vehicleNo} exited slot ${b.slotId}; ${money(b.amount)} ${queued ? 'queued' : 'paid'}.`);
  // Whoever was waiting on this slot can now be released.
  S.db.bookings.filter(n => n.slotId === b.slotId && n.status === 'Reserved' && n.start <= S.now).forEach(n => {
    notify(S.db, n.userId, 'Your reserved slot is ready', `Slot ${n.slotId} has been vacated and is ready for ${n.vehicleNo}.`, 'info', { slotId: n.slotId });
  });
  save(S.db); S.ui.modal = null; S.ui.form.coUseBenefit = false;
  toast(queued ? 'Exit recorded — payment queued offline' : `Checked out · ${money(b.amount)} paid`);
}
function emergencyOverride(vehId, slotId){
  const v = S.db.emergencyVehicles.find(x => x.id === vehId);
  const slot = S.db.slots.find(s => s.id === slotId);
  if (!v || !slot) return toast('Select a vehicle and a slot', 'error');
  if (v.auth !== 'Authorized') return toast(`${v.no} is not authorised`, 'error');
  const affected = bookingFor(S.db, slotId, S.now);
  const rec = { id: uid('ovr'), at: S.now, slotId, vehicleNo: v.no, vehicleType: v.type,
    affectedUser: affected ? affected.userName : null, affectedBooking: affected ? affected.id : null, compensated: false };
  if (affected && ['Reserved','Active'].includes(affected.status)){
    affected.status = 'Cancelled'; affected.override = true; affected.exitTime = S.now;
    const alt = recommend({ ev: affected.ev })[0];
    notify(S.db, affected.userId, 'Your reservation has been affected',
      `Slot ${slotId} was released for an emergency vehicle (${v.no}). ${alt ? 'Slot ' + alt.slot.name + ' has been recommended as a replacement.' : ''}`,
      'emergency', { slotId, vehicleNo: affected.vehicleNo });
    const ben = issueCompensation(S.db, affected, 'Reservation released for an emergency vehicle');
    rec.compensated = !!ben;
  }
  slot.status = 'occupied'; slot.vehicleNo = v.no; v.slotId = slotId;
  S.db.emergencyReservations.unshift({ id: uid('emr'), vehicleId: v.id, no: v.no, type: v.type, slotId,
    startTime: S.now, status: 'Active', createdBy: S.user.name, override: true });
  S.db.overrides.unshift(rec);
  notify(S.db, 'admin', 'Emergency override executed',
    `${v.no} took slot ${slotId}${affected ? ' — ' + affected.userName + ' was notified and compensated' : ''}.`, 'emergency', { slotId });
  logEvent(S.db, 'override', `Emergency override: ${v.no} assigned to slot ${slotId}${affected ? ', releasing ' + affected.userName + "'s reservation" : ''}.`);
  save(S.db); toast(`Override recorded — slot ${slotId} released to ${v.no}`, 'info');
}

/* =============================== Dispatcher =============================== */
const PAGES = { dashboard:pageDashboard, map:pageMap, recommend:pageRecommend, reserve:pageReserve,
  vehicles:pageVehicles, session:pageSession, ev:pageEv, emergency:pageEmergency, pricing:pagePricing,
  history:pageHistory, notifications:pageNotifications, profile:pageProfile, admin:pageAdmin,
  analytics:pageAnalytics, slots:pageSlots, reservations:pageReservations, violations:pageViolations,
  manageusers:pageManageUsers, settings:pageSettings, offline:pageOffline };

function markAllRead(){
  myNotifications().forEach(n => n.read = true); save(S.db);
}
document.addEventListener('click', ev => {
  const el = ev.target.closest('[data-act]'); if (!el) return;
  const a = el.dataset.act, d = el.dataset, db = S.db, fm = S.ui.form;
  const stop = () => ev.preventDefault();

  switch(a){
    case 'login': {
      const id = d.as || fm.loginUser || 'aarav';
      const u = USERS.find(x => x.id === id) || USERS[0];
      S.user = { id:u.id, name:u.name, role:u.role };
      S.tab = u.role === 'admin' ? 'admin' : 'dashboard';
      S.ui.seenNotif = (myNotifications()[0]||{}).id || null;
      toast(`Signed in as ${u.name}`); break; }
    case 'logout': S.user = null; S.tab = 'dashboard'; S.ui.notifOpen = false; toast('Logged out', 'info'); break;
    case 'tab': S.tab = d.tab; S.ui.navOpen = false; S.ui.notifOpen = false; S.ui.modal = null;
      if (d.tab === 'notifications') markAllRead();
      if (d.tab === 'reserve' && !fm.resStart) fm.resStart = toLocalInput(new Date(S.now.getTime()+10*MIN));
      window.scrollTo({top:0, behavior:'smooth'}); break;
    case 'opennav': S.ui.navOpen = true; break;
    case 'closenav': S.ui.navOpen = false; break;
    case 'togglenotif': S.ui.notifOpen = !S.ui.notifOpen; if (S.ui.notifOpen) markAllRead(); break;
    case 'closenotif': S.ui.notifOpen = false; break;
    case 'readall': markAllRead(); toast('All notifications marked read', 'info'); break;
    case 'toggleoffline': S.offline ? goOnline() : goOffline(); return;

    case 'slot': S.ui.modal = { type:'slot', slotId:d.slot }; break;
    case 'closemodal': S.ui.modal = null; break;
    case 'confirmyes': { const m = S.ui.modal; S.ui.modal = null; if (m && m.run) m.run(); break; }

    case 'mapfloor': S.ui.mapFloor = d.val; break;
    case 'mapfilter': S.ui.mapFilter = d.val; break;
    case 'rectoggle': fm[d.key] = !fm[d.key]; break;
    case 'rerank': toast('Recommendations refreshed', 'info'); break;
    case 'pickslot': fm.resSlot = d.slot; break;
    case 'reserveslot': S.ui.modal = null; S.tab = 'reserve'; fm.resSlot = d.slot;
      if (!fm.resStart) fm.resStart = toLocalInput(new Date(S.now.getTime()+10*MIN)); toast(`Slot ${d.slot} selected`, 'info'); break;

    case 'confirmreserve': {
      const vehicles = myVehicles();
      const veh = vehicles.find(v => v.id === fm.resVehicle) || vehicles[0];
      if (!veh){ toast('Register a vehicle first', 'error'); break; }
      const typed = fm.resStart ? new Date(fm.resStart) : null;
      const start = typed && !isNaN(typed) ? typed : new Date(S.now.getTime()+10*MIN);
      createBooking(d.slot, veh, start, +(fm.resHours||2), fm.resUseBenefit !== false && !!availableBenefit());
      break; }
    case 'checkin': {
      const b = db.bookings.find(x => x.id === d.id);
      if (!b) break;
      const blocker = db.bookings.find(x => x.slotId === b.slotId && x.status === 'Overstayed' && !x.exitTime);
      if (blocker){ toast(`Slot ${b.slotId} is still occupied by ${blocker.vehicleNo}`, 'error'); break; }
      b.status = 'Active'; b.start = S.now < b.start ? S.now : b.start;
      queueOffline(`Check-in ${b.slotId}`); save(db); toast(`Checked in at slot ${b.slotId}`); break; }
    case 'cancel': {
      const b = db.bookings.find(x => x.id === d.id); if (!b) break;
      S.ui.modal = { type:'confirm', title:'Cancel this reservation?', sub:`Slot ${b.slotId} · ${b.vehicleNo}`,
        body:'The slot will be released back to other drivers. No penalty applies to a cancellation made before the session starts.',
        ok:'Cancel reservation', danger:true, run:() => {
          b.status = 'Cancelled'; b.exitTime = S.now;
          if (b.benefitApplied){ const bn = db.benefits.find(x => x.id === b.benefitApplied); if (bn){ bn.status = 'Available'; bn.usedAt = null; bn.usedOn = null; } }
          save(db); toast('Reservation cancelled', 'info'); render();
        } };
      break; }
    case 'checkout': S.ui.modal = { type:'checkout', id:d.id }; S.ui.form.coUseBenefit = false; break;
    case 'confirmcheckout': doCheckout(d.id); break;
    case 'extend': S.ui.modal = { type:'extend', id:d.id }; break;
    case 'confirmextend': {
      const b = db.bookings.find(x => x.id === d.id); if (!b) break;
      const add = +(fm.extendHours || 1);
      b.end = new Date(new Date(b.end).getTime() + add*HOUR);
      b.graceEnd = new Date(b.end.getTime() + db.settings.graceMinutes*MIN);
      b.flags = {}; if (b.status === 'Grace' || b.status === 'Overstayed') b.status = 'Active';
      notify(db, b.userId, 'Parking extended', `Slot ${b.slotId} is now booked until ${fmtT(b.end)}.`, 'info', { slotId:b.slotId });
      queueOffline(`Extension ${b.slotId}`); save(db); S.ui.modal = null;
      toast(`Extended to ${fmtT(b.end)}`); break; }

    case 'anprscan': {
      S.ui.anpr = { scanning:true, result:null }; render();
      setTimeout(() => {
        const mine = myVehicles();
        const pick = mine[Math.floor(Math.random()*mine.length)] || { no:'PB65 AB 1234', type:'Sedan' };
        S.ui.anpr = { scanning:false, result:{ no:pick.no, type:pick.type, conf: 90 + Math.floor(Math.random()*9) } };
        toast(`Plate detected: ${pick.no}`); render();
      }, 1500); return; }
    case 'anprclear': S.ui.anpr = { scanning:false, result:null }; break;
    case 'anprattach': {
      const r = S.ui.anpr.result; if (!r) break;
      const b = activeSessions()[0];
      if (b){ b.vehicleNo = r.no; b.vehicleType = r.type; save(db); toast(`${r.no} linked to slot ${b.slotId}`); }
      else { S.tab = 'reserve'; toast('No active session — start a reservation for this vehicle', 'info'); }
      break; }
    case 'addvehicle': {
      const no = (fm.newVehNo||'').trim().toUpperCase();
      if (!no){ toast('Enter a vehicle number', 'error'); break; }
      if (db.vehicles.some(v => v.no === no)){ toast('That vehicle is already registered', 'error'); break; }
      const type = fm.newVehType || 'Sedan';
      db.vehicles.push({ id: uid('v'), userId:S.user.id, no, type, ev: type.startsWith('EV'), make:'—',
        primary: !db.vehicles.some(v => v.userId === S.user.id && v.primary) });
      fm.newVehNo = ''; queueOffline(`Vehicle ${no}`); save(db); toast(`${no} registered`); break; }
    case 'delvehicle': {
      const v = db.vehicles.find(x => x.id === d.id); if (!v) break;
      S.ui.modal = { type:'confirm', title:'Remove vehicle?', sub:v.no, body:'Active sessions for this vehicle are not affected.',
        ok:'Remove', danger:true, run:() => { db.vehicles = db.vehicles.filter(x => x.id !== d.id); save(db); toast('Vehicle removed','info'); render(); } };
      break; }
    case 'setprimary': db.vehicles.forEach(v => { if (v.userId === S.user.id) v.primary = v.id === d.id; }); save(db); toast('Primary vehicle updated'); break;
    case 'pref': fm[d.key] = !fm[d.key]; toast('Preference saved', 'info'); break;

    case 'histfilter': S.ui.histFilter = d.val; S.ui.histPage = 1; break;
    case 'histpage': S.ui.histPage = +d.val; break;
    case 'clearhist': S.ui.histSearch = ''; break;
    case 'notiffilter': S.ui.notifFilter = d.val; break;
    case 'range': S.ui.analyticsRange = d.val; break;
    case 'export': {
      const a2 = analytics(S.ui.analyticsRange);
      toast(`Summary exported · ${money(a2.revenue)} over ${a2.sessions} sessions`); break; }

    case 'addslot': {
      const name = (fm.newSlotName||'').trim().toUpperCase();
      if (!name){ toast('Enter a slot name', 'error'); break; }
      if (db.slots.some(s => s.id === name)){ toast('That slot already exists', 'error'); break; }
      const kind = fm.newSlotKind || 'normal';
      db.slots.push({ id:name, name, floor: fm.newSlotFloor || (kind==='emergency'?'E':'A'), kind,
        dist: 20 + db.slots.length*3, status:'free', vehicleNo:null });
      fm.newSlotName = ''; save(db); toast(`Slot ${name} added`); break; }
    case 'delslot': {
      S.ui.modal = { type:'confirm', title:`Delete slot ${d.slot}?`, body:'The bay is removed from the live map and from future recommendations.',
        ok:'Delete slot', danger:true, run:() => { db.slots = db.slots.filter(s => s.id !== d.slot); save(db); toast('Slot deleted','info'); render(); } };
      break; }
    case 'freeslot': {
      const slot = db.slots.find(s => s.id === d.slot); if (!slot) break;
      db.bookings.filter(b => b.slotId === d.slot && holds(b)).forEach(b => { b.exitTime = S.now; b.status = 'Completed'; b.paid = true;
        b.amount = b.amount || (b.rate * Math.max(1, Math.ceil(minsBetween(b.start, S.now)/60)));
        notify(db, b.userId, 'Your session was closed by an administrator', `Slot ${b.slotId} has been released.`, 'info', { slotId:b.slotId }); });
      db.violations.filter(v => v.slotId === d.slot && v.status === 'Open').forEach(v => { v.status = 'Resolved'; v.action = 'Cleared'; });
      db.emergencyReservations.filter(r => r.slotId === d.slot && r.status === 'Active').forEach(r => { r.status = 'Released'; r.endTime = S.now;
        const veh = db.emergencyVehicles.find(x => x.id === r.vehicleId); if (veh) veh.slotId = null; });
      slot.status = 'free'; slot.vehicleNo = null;
      logEvent(db, 'admin', `Slot ${d.slot} released by ${S.user.name}.`);
      save(db); S.ui.modal = null; toast(`Slot ${d.slot} is now free`); break; }

    case 'resfilter': S.ui.resFilter = d.val; break;
    case 'viofilter': S.ui.vioFilter = d.val; break;
    case 'resolvevio': {
      const v = db.violations.find(x => x.id === d.id); if (!v) break;
      v.status = 'Resolved'; v.action = d.val; v.resolvedAt = S.now;
      const slot = db.slots.find(s => s.id === v.slotId); if (slot && slot.status !== 'free') slot.status = 'free';
      logEvent(db, 'violation', `Violation on slot ${v.slotId} marked ${d.val} by ${S.user.name}.`);
      save(db); toast(`Violation marked ${d.val}`); break; }
    case 'penstatus': {
      const p = db.penalties.find(x => x.id === d.id); if (!p) break;
      p.status = d.val; p.settledAt = S.now;
      notify(db, p.userId, `Penalty ${d.val.toLowerCase()}`, `Your ${money(p.amount)} penalty for slot ${p.slotId} has been marked ${d.val.toLowerCase()}.`, 'penalty');
      save(db); toast(`Penalty marked ${d.val}`, 'info'); break; }
    case 'paypenalty': {
      const p = db.penalties.find(x => x.id === d.id); if (!p) break;
      if (S.offline){ queueOffline(`Penalty payment ${money(p.amount)}`); toast('Payment queued — will settle when online', 'info'); save(db); break; }
      p.status = 'Paid'; p.settledAt = S.now; save(db); toast(`${money(p.amount)} paid`); break; }
    case 'simviolation': {
      const pool = liveSlots().filter(s => ['free','reserved'].includes(s.live) || s.kind === 'ev' || s.kind === 'accessible');
      const target = pool[Math.floor(Math.random()*pool.length)] || liveSlots()[0];
      const plate = 'HR' + (10+Math.floor(Math.random()*80)) + ' XX ' + (1000+Math.floor(Math.random()*8999));
      const type = target.kind === 'ev' ? 'EV-only' : target.kind === 'emergency' ? 'Emergency-only'
        : target.kind === 'accessible' ? 'Restricted bay' : target.live === 'reserved' ? 'Reserved slot' : 'No active session';
      db.violations.unshift({ id: uid('vio'), type, vehicleNo:plate, slotId:target.id,
        owner: target.booking ? target.booking.userName : '—', detectedAt:S.now, status:'Open', action:null,
        note:'Detected by bay sensor and gate camera.' });
      notify(db, 'admin', 'Unauthorized vehicle detected', `${plate} was detected in ${type.toLowerCase()} bay ${target.id}.`, 'violation', { slotId:target.id });
      logEvent(db, 'violation', `Unauthorized vehicle ${plate} detected in slot ${target.id} (${type}).`);
      save(db); toast(`Unauthorized vehicle detected in ${target.id}`, 'error'); break; }
    case 'reportslot': toast('Thanks — the parking team has been notified', 'info'); S.ui.modal = null; break;

    case 'assignem': {
      const v = db.emergencyVehicles.find(x => x.id === (fm.emVehicle || (db.emergencyVehicles.find(y=>y.auth==='Authorized')||{}).id));
      const sId = fm.emSlot || (db.slots.find(s => s.kind === 'emergency' && s.status === 'free')||{}).id;
      const slot = db.slots.find(s => s.id === sId);
      if (!v || !slot){ toast('Select a vehicle and a free emergency bay', 'error'); break; }
      if (v.auth !== 'Authorized'){ toast(`${v.no} is not authorised`, 'error'); break; }
      slot.status = 'occupied'; slot.vehicleNo = v.no; v.slotId = slot.id;
      db.emergencyReservations.unshift({ id: uid('emr'), vehicleId:v.id, no:v.no, type:v.type, slotId:slot.id,
        startTime:S.now, status:'Active', createdBy:S.user.name });
      notify(db, 'all', 'Emergency slot in use', `Emergency bay ${slot.id} has been assigned to ${v.no}.`, 'emergency', { slotId:slot.id });
      logEvent(db, 'emergency', `Emergency vehicle ${v.no} assigned to bay ${slot.id}.`);
      save(db); toast(`${v.no} assigned to ${slot.id}`); break; }
    case 'releaseem': {
      const r = db.emergencyReservations.find(x => x.id === d.id); if (!r) break;
      r.status = 'Released'; r.endTime = S.now;
      const slot = db.slots.find(s => s.id === r.slotId); if (slot){ slot.status = 'free'; slot.vehicleNo = null; }
      const veh = db.emergencyVehicles.find(x => x.id === r.vehicleId); if (veh) veh.slotId = null;
      logEvent(db, 'emergency', `Emergency bay ${r.slotId} released.`);
      save(db); toast(`Bay ${r.slotId} released`, 'info'); break; }
    case 'emauth': {
      const v = db.emergencyVehicles.find(x => x.id === d.id); if (!v) break;
      v.auth = d.val; save(db); toast(`${v.no} ${d.val.toLowerCase()}`, d.val==='Authorized'?'success':'info'); break; }
    case 'addem': {
      const no = (fm.newEmNo||'').trim().toUpperCase();
      if (!no){ toast('Enter a vehicle number', 'error'); break; }
      if (db.emergencyVehicles.some(v => v.no === no)){ toast('Already registered', 'error'); break; }
      db.emergencyVehicles.push({ id: uid('ev'), no, type: fm.newEmType || 'Ambulance', auth:'Authorized', slotId:null, addedAt:S.now });
      fm.newEmNo = ''; save(db); toast(`${no} authorised for emergency parking`); break; }
    case 'override': {
      const vId = fm.ovVehicle || (db.emergencyVehicles.find(v => v.auth === 'Authorized')||{}).id;
      const sId = fm.ovSlot || (liveSlots().find(s => s.kind!=='emergency' && ['reserved','occupied','grace'].includes(s.live))||{}).id;
      if (!sId){ toast('No occupied or reserved slot to override', 'error'); break; }
      S.ui.modal = { type:'confirm', title:'Trigger emergency override?', sub:`Slot ${sId}`,
        body:'The current reservation will be released, the driver notified and compensated, and the event logged for administrators.',
        ok:'Override slot', danger:true, run:() => { emergencyOverride(vId, sId); render(); } };
      break; }

    case 'speed': db.settings.timeSpeed = +d.val; save(db); toast(`Demo clock set to ${d.val}×`, 'info'); break;
    case 'resetdemo':
      S.ui.modal = { type:'confirm', title:'Reset all demo data?', body:'Slots, sessions, penalties, credits and violations return to their seeded state.',
        ok:'Reset everything', danger:true, run:() => { resetAll(); S.db = seedDb(new Date()); S.offset = 0; S.offline = false;
          S.ui.form = {}; save(S.db); toast('Demo data reset'); render(); } };
      break;
    default: return;
  }
  stop();
  render();
});

/* Inputs: two-way binding without losing focus on re-render */
document.addEventListener('input', ev => {
  const el = ev.target;
  if (el.dataset.model){
    const k = el.dataset.model;
    const val = el.type === 'checkbox' ? el.checked : el.value;
    if (['histSearch','slotSearch','userSearch','histSort','notifFilter'].includes(k)){ S.ui[k] = val; if (k==='histSearch') S.ui.histPage = 1; }
    else S.ui.form[k] = val;
    render();
  } else if (el.dataset.setting){
    const k = el.dataset.setting;
    S.db.settings[k] = el.type === 'checkbox' ? el.checked : (+el.value || 0);
    save(S.db); render();
  }
});
document.addEventListener('keydown', ev => {
  if (ev.key === 'Escape'){ if (S.ui.modal){ S.ui.modal = null; render(); } else if (S.ui.notifOpen){ S.ui.notifOpen = false; render(); } }
});
document.addEventListener('click', ev => {
  if (S.ui.notifOpen && !ev.target.closest('[role="dialog"]') && !ev.target.closest('[data-act="togglenotif"]')
      && !ev.target.closest('[data-act]')){ S.ui.notifOpen = false; render(); }
});

/* ================================= Render ================================= */
function render(){
  const app = document.getElementById('app');
  const act = document.activeElement;
  const key = act && (act.dataset.model || act.dataset.setting) ? (act.dataset.model || 'set:'+act.dataset.setting) : null;
  const pos = key && act.setSelectionRange ? act.selectionStart : null;

  if (!S.user){ app.innerHTML = loginScreen(); renderModal(); return; }
  if (S.booting){
    app.innerHTML = `<div class="min-h-screen flex items-center justify-center">
      <div class="text-center"><div class="w-14 h-14 rounded-2xl bg-[#6C63FF] text-white flex items-center justify-center mx-auto mb-4">${icon('car',26)}</div>
      <div class="w-40 h-2 rounded-full skel mx-auto"></div>
      <p class="text-sm text-slate-400 mt-4 font-medium">Connecting to parking sensors…</p></div></div>`;
    return;
  }
  const page = (PAGES[S.tab] || pageDashboard)();
  app.innerHTML = `<div class="flex min-h-screen bg-[#F4F6FB]">
    <aside class="hidden lg:flex w-72 bg-[#6C63FF] text-white flex-col fixed h-full z-20">${sidebar()}</aside>
    ${S.ui.navOpen ? `<div class="lg:hidden fixed inset-0 z-[60]">
      <div class="absolute inset-0 bg-slate-900/40" data-act="closenav"></div>
      <aside class="pop absolute left-0 top-0 h-full w-72 max-w-[85vw] bg-[#6C63FF] text-white flex flex-col">${sidebar()}</aside></div>` : ''}
    <main class="flex-1 lg:ml-72 p-4 sm:p-6 lg:p-8 min-w-0">
      ${header()}
      <div class="fade-in" key="${S.tab}">${page}</div>
      <footer class="mt-12 pt-6 border-t border-slate-200/70 flex flex-wrap items-center gap-3 justify-between">
        <p class="text-xs text-slate-400">SmartPark · Smart Parking Management System prototype</p>
        <p class="text-xs text-slate-400">${S.offline ? 'Offline safety mode' : 'All systems online'} · ${statsOf(liveSlots()).pct}% occupancy</p>
      </footer>
    </main></div>`;
  renderModal();

  if (key){
    const sel = key.startsWith('set:') ? `[data-setting="${key.slice(4)}"]` : `[data-model="${key}"]`;
    const next = document.querySelector(sel);
    if (next){ next.focus(); if (pos != null && next.setSelectionRange){ try{ next.setSelectionRange(pos,pos); }catch(e){} } }
  }
}

/* ================================== Boot ================================== */
function loop(){
  const speed = S.db.settings.timeSpeed || 1;
  S.offset += (speed - 1) * 1000;
  S.now = new Date(Date.now() + S.offset);
  const changed = tick(S.db, S.now);
  const latest = myNotifications()[0];
  if (S.user && latest && S.ui.seenNotif !== latest.id){
    if (S.ui.seenNotif !== null) toast(latest.title, latest.kind === 'benefit' ? 'success' : latest.kind === 'penalty' ? 'error' : 'info');
    S.ui.seenNotif = latest.id;
  }
  if (S.user && !S.booting) render();
}
(function boot(){
  S.now = new Date();
  S.db = load(S.now);
  S.ui.form.loginUser = 'aarav';
  S.ui.form.newVehType = 'Sedan';
  S.ui.form.newEmType = 'Ambulance';
  S.ui.form.newSlotFloor = 'A';
  S.ui.form.newSlotKind = 'normal';
  S.ui.form.prefNear = true; S.ui.form.prefNotify = true;
  S.ui.form.resHours = 2;
  S.ui.form.resStart = toLocalInput(new Date(S.now.getTime() + 10*MIN));
  tick(S.db, S.now);
  S.booting = false;
  render();
  setInterval(loop, 1000);
})();
