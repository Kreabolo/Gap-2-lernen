/* GAP II Trainer: App-Logik. Inhalte kommen aus inhalte.js und inhalte-extra.js (TOPICS, SUMS, CARDS, QUIZ). */

/* ---------- Zustand ---------- */
const STORE_KEY = "gap2-trainer-v1";
const MODES = ["home","sum","cards","quiz","exam","calc"];
const FILTER_MODES = ["sum","cards","quiz"];
function defaults(){
  return {topics:[], mode:"home", cards:{}, quiz:{answered:0, right:0, wrong:{}, ok:{}, byT:{}},
    days:{}, goal:30, theme:"auto", read:{}, star:{}, onlyStar:false, exams:[], examRun:null};
}
let state = defaults();
function load(raw){
  const s = Object.assign(defaults(), raw);
  s.quiz = Object.assign(defaults().quiz, raw.quiz||{});
  if(!MODES.includes(s.mode)) s.mode = "home";
  return s;
}
try{ const raw = localStorage.getItem(STORE_KEY); if(raw) state = load(JSON.parse(raw)); }catch(e){}
try{ const h = location.hash.replace("#",""); if(MODES.includes(h)) state.mode = h; }catch(e){}
function save(){ try{ localStorage.setItem(STORE_KEY, JSON.stringify(state)); }catch(e){} }

const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const topicName = id => (TOPICS.find(t=>t.id===id)||{}).name || id;
const tc = id => `--tc:var(--t-${id})`;
const active = id => state.topics.length===0 || state.topics.includes(id);
const fmt = (n, d=0) => n.toLocaleString("de-DE",{minimumFractionDigits:d, maximumFractionDigits:d});
const eur = n => n.toLocaleString("de-DE",{style:"currency",currency:"EUR"});
const shuffle = a => { for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
const range = n => Array.from({length:n},(_, i)=>i);
const box = i => Math.min(state.cards[i]||0, 3);
const grade = pct => pct>=92?1:pct>=81?2:pct>=67?3:pct>=50?4:pct>=30?5:6;
function dayKey(d=new Date()){ return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
function track(n=1){
  const k = dayKey(); state.days[k] = (state.days[k]||0) + n;
  const keys = Object.keys(state.days).sort(); while(keys.length>120) delete state.days[keys.shift()];
}
function streak(){
  let n = 0; const d = new Date();
  if(!state.days[dayKey(d)]) d.setDate(d.getDate()-1);
  while(state.days[dayKey(d)]){ n++; d.setDate(d.getDate()-1); }
  return n;
}
let toastT;
function toast(msg){ const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(()=>t.classList.remove("show"), 2200); }
function hl(text, q){
  const s = esc(text); if(!q) return s;
  const re = new RegExp(esc(q).replace(/[.*+?^${}()|[\]\\]/g,"\\$&"), "gi");
  return s.replace(re, m=>`<mark>${m}</mark>`);
}
/* Zahlen in deutscher oder englischer Schreibweise lesen: 1.500,50 / 1500.5 / 1500 */
function num(v){
  v = String(v).trim().replace(/\s|€|%/g,"");
  if(v.includes(",")) v = v.replace(/\./g,"").replace(",",".");
  else if(/^\d{1,3}(\.\d{3})+$/.test(v)) v = v.replace(/\./g,"");
  const n = parseFloat(v); return isFinite(n) ? n : NaN;
}

/* ---------- Kennzahlen je Thema ---------- */
const cardsOf = id => range(CARDS.length).filter(i=>CARDS[i][0]===id);
const quizOf = id => range(QUIZ.length).filter(i=>QUIZ[i].t===id);
function topicStats(id){
  const c = cardsOf(id), q = quizOf(id);
  const known = c.filter(i=>box(i)>=2).length, ok = q.filter(i=>state.quiz.ok[i]).length;
  const bt = state.quiz.byT[id] || {a:0,r:0};
  const mastery = Math.round(((c.length?known/c.length:0) + (q.length?ok/q.length:0)) / 2 * 100);
  return {nc:c.length, nq:q.length, known, ok, rate: bt.a ? Math.round(bt.r/bt.a*100) : null, mastery};
}

/* ---------- Countdown ---------- */
const EXAM1 = new Date("2026-11-24T08:00:00+01:00"), EXAM2 = new Date("2026-11-25T14:00:00+01:00");
const daysTo = d => Math.max(0, Math.ceil((d - new Date())/864e5));
function countdown(){ $("#cdDays").textContent = daysTo(EXAM1); $("#cdDays2").textContent = daysTo(EXAM2); }

/* ---------- Design ---------- */
function applyTheme(){
  const r = document.documentElement;
  if(state.theme==="auto") r.removeAttribute("data-theme"); else r.dataset.theme = state.theme;
  const dark = state.theme==="dark" || (state.theme==="auto" && matchMedia("(prefers-color-scheme: dark)").matches);
  document.querySelector('meta[name="theme-color"]').content = dark ? "#0f1817" : "#0f6b66";
  return dark;
}
$("#btnTheme").onclick = ()=>{
  const dark = state.theme==="dark" || (state.theme==="auto" && matchMedia("(prefers-color-scheme: dark)").matches);
  state.theme = dark ? "light" : "dark"; save(); applyTheme();
};

/* ---------- Themenfilter ---------- */
function renderTopics(){
  const el = $("#topics");
  el.innerHTML = `<button class="chip" data-t="" aria-pressed="${state.topics.length===0}">Alle Themen</button>` +
    TOPICS.map(t=>`<button class="chip" style="${tc(t.id)}" data-t="${t.id}" aria-pressed="${state.topics.includes(t.id)}"><span class="dot"></span>${esc(t.name)}<span class="pts">${esc(t.pts)}</span></button>`).join("");
  el.querySelectorAll(".chip").forEach(b=>b.onclick=()=>{
    const id = b.dataset.t;
    if(!id) state.topics = [];
    else state.topics = state.topics.includes(id) ? state.topics.filter(x=>x!==id) : [...state.topics, id];
    save(); deck = null; quizRun = null; renderAll();
  });
}
function focusTopic(id, mode){
  state.topics = [id]; deck = null; quizRun = null; save(); renderAll(); setMode(mode);
  window.scrollTo({top:0, behavior:"smooth"});
}

/* ---------- Bereiche ---------- */
function setMode(m){
  state.mode = m; save();
  document.querySelectorAll("nav.modes button").forEach(b=>b.setAttribute("aria-selected", b.dataset.mode===m));
  MODES.forEach(k=> $("#panel-"+k).hidden = k!==m);
  $("#topicbar").hidden = !FILTER_MODES.includes(m);
  if(m==="home") renderHome();
  try{ history.replaceState(null,"","#"+m); }catch(e){}
}
document.querySelectorAll("nav.modes button").forEach(b=>b.onclick=()=>setMode(b.dataset.mode));
function renderCounts(){
  $("#cntCards").textContent = CARDS.filter(c=>active(c[0])).length;
  $("#cntQuiz").textContent = QUIZ.filter(q=>active(q.t)).length;
}

/* ---------- Start ---------- */
function renderHome(){
  const d1 = daysTo(EXAM1), learnDays = Math.max(1, d1 - 1);
  const openCards = range(CARDS.length).filter(i=>box(i)<2).length;
  const openQ = range(QUIZ.length).filter(i=>!state.quiz.ok[i]).length;
  const wrongN = Object.keys(state.quiz.wrong).length;
  const known = CARDS.length - openCards;
  const todayN = state.days[dayKey()]||0, goalP = Math.min(100, Math.round(todayN/state.goal*100));
  const st = streak();
  const last14 = range(14).map(k=>{ const d = new Date(); d.setDate(d.getDate()-13+k); return state.days[dayKey(d)]||0; });
  const max14 = Math.max(10, ...last14);
  const a = state.quiz.answered, r = state.quiz.right;
  const lastExam = state.exams[state.exams.length-1];
  const ts = TOPICS.map(t=>({...t, ...topicStats(t.id)}));
  const weak = [...ts].sort((x,y)=>x.mastery-y.mastery)[0];
  const msg = d1===0 ? "Prüfungszeit. Viel Erfolg!" :
    known===0 && a===0 ? "Los geht’s. Starte mit einem Thema und arbeite dich durch Karten und Quiz." :
    goalP>=100 ? "Tagesziel geschafft. Alles darüber hinaus ist Bonus." : "Bleib dran: Kleine tägliche Einheiten bringen am meisten.";

  $("#panel-home").innerHTML = `
    <div class="hero">
      <div class="box-card hero-main">
        <span class="label">Lernplan bis zum Fachteil</span>
        <h2>${d1===0 ? "Heute ist Prüfung" : `Noch ${d1} ${d1===1?"Tag":"Tage"}. ${esc(msg)}`}</h2>
        <p>Damit du bis zum Vortag alles einmal sicher hast, nimm dir täglich ungefähr Folgendes vor:</p>
        <div class="plan">
          <div><b>${Math.ceil(openCards/learnDays)}</b><small>Karten pro Tag<br>${openCards} noch unsicher</small></div>
          <div><b>${Math.ceil(openQ/learnDays)}</b><small>Fragen pro Tag<br>${openQ} noch nicht gelöst</small></div>
          <div><b>${wrongN}</b><small>offene Fehler<br>zum Wiederholen</small></div>
        </div>
        <div class="row">
          <button class="btn primary" data-go="cards">Karten lernen</button>
          <button class="btn" data-go="quiz">Quiz starten</button>
          <button class="btn ghost" data-go="exam">Prüfung simulieren</button>
        </div>
      </div>
      <div class="box-card">
        <div class="goal">
          <div class="ring" style="--p:${goalP}" role="img" aria-label="Tagesziel ${todayN} von ${state.goal}"><div><div><b>${todayN}</b><small>von ${state.goal}</small></div></div></div>
          <div class="goal-side">
            <span class="label">Heute gelernt</span>
            <span class="streak"><svg><use href="#i-flame"/></svg>${st} ${st===1?"Tag":"Tage"} in Folge</span>
            <small class="muted">Jede bewertete Karte und jede beantwortete Frage zählt.</small>
          </div>
        </div>
        <div class="days" aria-label="Lernaktivität der letzten 14 Tage">${last14.map((n,k)=>`<i class="${n?"":"zero"} ${k===13?"today":""}" style="height:${n?Math.max(8,n/max14*100):6}%" title="${n} Aktionen"></i>`).join("")}</div>
        <div class="row spread"><small class="muted">vor 14 Tagen</small><small class="muted">heute</small></div>
      </div>
    </div>

    <div class="stats">
      <div class="stat"><span class="label">Karten sicher</span><b>${known} / ${CARDS.length}</b><div class="bar"><i style="width:${known/CARDS.length*100}%"></i></div></div>
      <div class="stat"><span class="label">Quiz-Trefferquote</span><b>${a?Math.round(r/a*100)+" %":"–"}</b><div class="bar"><i style="width:${a?r/a*100:0}%"></i></div></div>
      <div class="stat"><span class="label">Fragen gelöst</span><b>${QUIZ.length-openQ} / ${QUIZ.length}</b><div class="bar"><i style="width:${(QUIZ.length-openQ)/QUIZ.length*100}%"></i></div></div>
      <div class="stat"><span class="label">Letzte Simulation</span><b>${lastExam?Math.round(lastExam.r/lastExam.n*100)+" %":"–"}</b><small>${lastExam?`Note ${grade(Math.round(lastExam.r/lastExam.n*100))} · ${new Date(lastExam.d).toLocaleDateString("de-DE")}`:"noch keine Prüfung simuliert"}</small></div>
    </div>

    ${weak && (known||a) ? `<div class="tip" style="${tc(weak.id)}"><div><span class="label">Empfehlung</span>
      <p>Dein schwächstes Thema ist <b>${esc(weak.name)}</b> (${weak.mastery} % beherrscht). Lies den Lernzettel und gehe danach die Karten durch.</p>
      <div class="row" style="margin-top:8px"><button class="btn sm" data-ft="${weak.id}" data-fm="sum">Lernzettel</button><button class="btn sm" data-ft="${weak.id}" data-fm="cards">Karten</button><button class="btn sm" data-ft="${weak.id}" data-fm="quiz">Quiz</button></div></div></div>` : ""}

    <div class="section-h"><h2>Themen</h2><span class="muted mono">beherrscht = Ø aus sicheren Karten und gelösten Fragen</span></div>
    <div class="tgrid">${ts.map(t=>`
      <div class="tcard" style="${tc(t.id)}">
        <div class="row spread"><h3>${esc(t.name)}</h3><span class="tag-px">${esc(t.pts)}</span></div>
        <div class="nums"><span><b>${t.known}</b>/${t.nc} Karten</span><span><b>${t.ok}</b>/${t.nq} Fragen</span><span>${t.rate===null?"–":`<b>${t.rate} %</b> Quote`}</span></div>
        <div class="bar" style="--bc:var(--t-${t.id})"><i style="width:${t.mastery}%"></i></div>
        <div class="acts"><button class="btn sm" data-ft="${t.id}" data-fm="sum">Lesen</button><button class="btn sm" data-ft="${t.id}" data-fm="cards">Karten</button><button class="btn sm" data-ft="${t.id}" data-fm="quiz">Quiz</button></div>
      </div>`).join("")}
    </div>`;
  $("#panel-home").querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>setMode(b.dataset.go));
  $("#panel-home").querySelectorAll("[data-ft]").forEach(b=>b.onclick=()=>focusTopic(b.dataset.ft, b.dataset.fm));
}

/* ---------- Lernzettel ---------- */
let sumQuery = "";
function renderSum(){
  const p = $("#panel-sum");
  if(!$("#sumQ")){
    p.innerHTML = `<div class="sumtools">
        <input type="search" id="sumQ" placeholder="In den Lernzetteln suchen …" aria-label="In den Lernzetteln suchen">
        <button class="btn ghost sm" id="sumOpen">Alle aufklappen</button>
        <button class="btn ghost sm" id="sumClose">Alle zuklappen</button>
        <button class="btn ghost sm" id="sumPrint"><svg><use href="#i-print"/></svg>Drucken</button>
      </div><div class="panel" id="sumList" style="animation:none"></div>`;
    $("#sumQ").oninput = e=>{ sumQuery = e.target.value.trim(); renderSumList(); };
    $("#sumOpen").onclick = ()=>p.querySelectorAll("details.sum").forEach(d=>d.open=true);
    $("#sumClose").onclick = ()=>p.querySelectorAll("details.sum").forEach(d=>d.open=false);
    $("#sumPrint").onclick = ()=>{ p.querySelectorAll("details.sum").forEach(d=>d.open=true); window.print(); };
  }
  $("#sumQ").value = sumQuery;
  renderSumList();
}
function renderSumList(){
  const q = sumQuery.toLowerCase();
  const ids = TOPICS.map(t=>t.id).filter(active);
  let hits = 0;
  const html = ids.map((id,idx)=>{
    const s = SUMS[id];
    const secs = s.sections.map(([h,items])=>[h, q ? items.filter(i=>i.toLowerCase().includes(q) || h.toLowerCase().includes(q)) : items]).filter(([,it])=>it.length);
    const keys = q ? s.keys.filter(([k,v])=>(k+" "+v).toLowerCase().includes(q)) : s.keys;
    if(q && !secs.length && !keys.length) return "";
    hits += secs.reduce((n,[,it])=>n+it.length,0);
    const nCards = cardsOf(id).length, nQ = quizOf(id).length;
    return `<details class="sum" style="${tc(id)}" ${q||idx===0?"open":""}>
      <summary><h2>${esc(topicName(id))}</h2><span class="meta">${state.read[id]?`<span class="read-badge">gelesen</span>`:""}<span class="mono">${nCards} Karten · ${nQ} Fragen</span><span class="tog" aria-hidden="true">+</span></span></summary>
      <div class="sum-body">
        <section>${secs.map(([h,items])=>`<h3>${hl(h,sumQuery)}</h3><ul>${items.map(i=>`<li>${hl(i,sumQuery)}</li>`).join("")}</ul>`).join("")}
          <div class="sum-foot"><div class="src">Quellen: ${esc(s.src)}</div>
            <div class="row"><button class="btn sm ${state.read[id]?"good":""}" data-read="${id}">${state.read[id]?"✓ Gelesen":"Als gelesen markieren"}</button><button class="btn sm" data-ft="${id}" data-fm="cards">Karten dazu</button></div></div></section>
        ${keys.length?`<aside class="keys"><span class="label">Zahlen und Paragrafen</span><dl>${keys.map(([k,v])=>`<dt>${hl(k,sumQuery)}</dt><dd>${hl(v,sumQuery)}</dd>`).join("")}</dl></aside>`:"<div></div>"}
      </div></details>`;
  }).join("");
  const list = $("#sumList");
  list.innerHTML = html || `<div class="empty">Nichts gefunden für „${esc(sumQuery)}“.</div>`;
  list.querySelectorAll("[data-read]").forEach(b=>b.onclick=()=>{
    const id = b.dataset.read; if(state.read[id]) delete state.read[id]; else { state.read[id]=1; track(); toast("Lernzettel als gelesen markiert"); }
    save(); renderSumList();
  });
  list.querySelectorAll("[data-ft]").forEach(b=>b.onclick=()=>focusTopic(b.dataset.ft, b.dataset.fm));
}

/* ---------- Karteikarten (Leitner, Fächer 0–3) ---------- */
let deck = null, deckPos = 0, flipped = false;
function deckPool(){
  return range(CARDS.length).filter(i=>active(CARDS[i][0]) && (!state.onlyStar || state.star[i]));
}
function buildDeck(){
  const idx = shuffle(deckPool());
  idx.sort((a,b)=>box(a)-box(b));
  deck = idx; deckPos = 0; flipped = false;
}
function renderCards(){
  if(!deck) buildDeck();
  const p = $("#panel-cards");
  const all = range(CARDS.length).filter(i=>active(CARDS[i][0]));
  const boxes = [0,1,2,3].map(b=>all.filter(i=>box(i)===b).length);
  const nStar = all.filter(i=>state.star[i]).length;
  const colors = ["var(--bad)","var(--warn)","var(--petrol)","var(--ok)"];
  const head = `<div class="deckbar">
      <div class="boxes" aria-label="Lernfächer">${["Neu/Nochmal","Fach 1","Fach 2","Sicher"].map((n,b)=>`<span class="box"><i style="background:${colors[b]}"></i>${n}: ${boxes[b]}</span>`).join("")}</div>
      <div class="deckopts">
        <button class="btn ghost sm" id="onlyStar" aria-pressed="${state.onlyStar}">${state.onlyStar?"★ Nur markierte":"☆ Alle Karten"} (${nStar})</button>
        <button class="btn ghost sm" id="shuffle">Neu mischen</button>
        <button class="btn ghost sm" id="resetCards">Fächer zurücksetzen</button>
      </div>
    </div>
    <div class="bar split" aria-hidden="true">${boxes.map((n,b)=>`<i style="width:${all.length?n/all.length*100:0}%;background:${colors[b]}"></i>`).join("")}</div>`;
  if(deck.length===0){
    p.innerHTML = head + `<div class="empty">${state.onlyStar?"Du hast in diesen Themen noch keine Karten markiert. Tippe auf den Stern einer Karte, um sie zu merken.":"Für die gewählten Themen gibt es keine Karten."}</div>`;
    bindDeckBar(); return;
  }
  if(deckPos>=deck.length){
    p.innerHTML = head + `<div class="qcard result"><span class="label">Durchgang beendet</span><div class="big">${deck.length}</div><p>Karten wiederholt. Karten mit „Nochmal“ kommen im nächsten Durchgang zuerst.</p><button class="btn primary" id="again">Nächster Durchgang</button></div>`;
    bindDeckBar(); $("#again").onclick=()=>{buildDeck(); renderCards();}; return;
  }
  const i = deck[deckPos], c = CARDS[i];
  p.innerHTML = head + `
    <div class="row spread"><span class="label">${esc(topicName(c[0]))} · Fach ${box(i)}</span><span class="mono">${deckPos+1} / ${deck.length}</span></div>
    <div class="card-stage" style="${tc(c[0])}">
      <button class="star" id="star" aria-pressed="${!!state.star[i]}" aria-label="Karte markieren (Taste S)" title="Markieren ( S )"><svg><use href="#i-star"/></svg></button>
      <button class="card ${flipped?"flipped":""}" id="card" aria-label="Karte umdrehen">
        <div class="card-inner">
          <div class="face front"><span class="label">Frage</span><div class="q">${esc(c[1])}</div><div class="hint">Antippen oder Leertaste zum Umdrehen</div></div>
          <div class="face back"><span class="label">Antwort</span><div class="qsmall">${esc(c[1])}</div><div class="a">${esc(c[2])}</div><div class="hint">Wischen: rechts = gewusst, links = nochmal</div></div>
        </div>
      </button>
    </div>
    <div class="rate">
      <button class="btn again" id="rAgain" ${flipped?"":"disabled"}>Nochmal <span class="mono">1</span></button>
      <button class="btn hard" id="rHard" ${flipped?"":"disabled"}>Schwer <span class="mono">2</span></button>
      <button class="btn good" id="rGood" ${flipped?"":"disabled"}>Gewusst <span class="mono">3</span></button>
    </div>`;
  bindDeckBar();
  const card = $("#card");
  let sx = null, moved = false;
  card.onpointerdown = e=>{ sx = e.clientX; moved = false; try{ card.setPointerCapture(e.pointerId); }catch(_){} };
  card.onpointermove = e=>{ if(sx===null) return; const dx = e.clientX - sx; if(Math.abs(dx)>8){ moved = true; card.style.transform = `translateX(${dx}px) rotate(${dx/40}deg)`; } };
  card.onpointerup = card.onpointercancel = e=>{
    const dx = sx===null ? 0 : e.clientX - sx; sx = null; card.style.transform = "";
    if(moved && flipped && Math.abs(dx)>90) rate(dx>0 ? 2 : 0);
  };
  card.onclick = ()=>{ if(moved){ moved = false; return; } flip(); };
  $("#star").onclick = toggleStar;
  $("#rAgain").onclick = ()=>rate(0);
  $("#rHard").onclick = ()=>rate(1);
  $("#rGood").onclick = ()=>rate(2);
}
function flip(){
  flipped = !flipped; $("#card").classList.toggle("flipped", flipped);
  ["#rAgain","#rHard","#rGood"].forEach(s=>$(s).disabled = !flipped);
}
function toggleStar(){
  const i = deck[deckPos]; if(state.star[i]) delete state.star[i]; else state.star[i] = 1;
  save(); $("#star").setAttribute("aria-pressed", !!state.star[i]); toast(state.star[i] ? "Karte markiert" : "Markierung entfernt");
}
function bindDeckBar(){
  $("#shuffle").onclick = ()=>{ buildDeck(); renderCards(); };
  $("#onlyStar").onclick = ()=>{ state.onlyStar = !state.onlyStar; save(); buildDeck(); renderCards(); };
  const r = $("#resetCards");
  r.onclick = ()=>{
    if(r.dataset.confirm){ CARDS.forEach((c,i)=>{ if(active(c[0])) delete state.cards[i]; }); save(); buildDeck(); renderCards(); toast("Fächer zurückgesetzt"); }
    else { r.dataset.confirm="1"; r.textContent="Wirklich zurücksetzen?"; setTimeout(()=>{ if(r.isConnected){ delete r.dataset.confirm; r.textContent="Fächer zurücksetzen"; } },3000); }
  };
}
/* 0 = nochmal (zurück in Fach 0), 1 = schwer (Fach bleibt, Karte kommt später erneut), 2 = gewusst (ein Fach weiter) */
function rate(level){
  const i = deck[deckPos];
  if(level===0) state.cards[i] = 0;
  else if(level===2) state.cards[i] = Math.min((state.cards[i]||0)+1, 3);
  else deck.splice(Math.min(deck.length, deckPos+5), 0, i);
  track(); save(); deckPos++; flipped = false; renderCards();
}

/* ---------- Quiz ---------- */
let quizRun = null;
function recordAnswer(qi, ok){
  const t = QUIZ[qi].t, bt = state.quiz.byT[t] || (state.quiz.byT[t] = {a:0, r:0});
  state.quiz.answered++; bt.a++;
  if(ok){ state.quiz.right++; bt.r++; state.quiz.ok[qi] = 1; delete state.quiz.wrong[qi]; } else state.quiz.wrong[qi] = 1;
  track();
}
function quizStart(kind, n){
  let pool = range(QUIZ.length).filter(i=>active(QUIZ[i].t));
  if(kind==="wrong") pool = pool.filter(i=>state.quiz.wrong[i]);
  if(kind==="new") pool = pool.filter(i=>!state.quiz.ok[i]);
  shuffle(pool);
  const items = pool.slice(0, n||pool.length);
  quizRun = {items, orders: items.map(qi=>shuffle(range(QUIZ[qi].o.length))), pos:0, right:0, picked:null, kind, log:[]};
  renderQuiz();
}
function renderQuiz(){
  const p = $("#panel-quiz");
  const poolIdx = range(QUIZ.length).filter(i=>active(QUIZ[i].t));
  const wrongN = poolIdx.filter(i=>state.quiz.wrong[i]).length;
  const newN = poolIdx.filter(i=>!state.quiz.ok[i]).length;
  if(!quizRun){
    p.innerHTML = `<div class="setup">
      <div class="box-card"><span class="label">Übungsquiz</span><h3>${poolIdx.length} Fragen in den gewählten Themen</h3>
        <p>Nach jeder Antwort siehst du den Lösungsweg mit Quelle. Die Antworten werden jedes Mal neu gemischt.</p>
        <div class="row"><select id="qN" aria-label="Anzahl Fragen"><option value="10">10 Fragen</option><option value="20">20 Fragen</option><option value="0">Alle</option></select>
        <button class="btn primary" id="qGo" ${poolIdx.length?"":"disabled"}>Quiz starten</button></div></div>
      <div class="box-card"><span class="label">Noch nicht gelöst</span><h3>${newN} Fragen</h3>
        <p>Nur Fragen, die du noch nie richtig beantwortet hast. Ideal, um systematisch alles einmal zu schaffen.</p>
        <div class="row"><button class="btn" id="qNew" ${newN?"":"disabled"}>10 neue Fragen</button></div></div>
      <div class="box-card"><span class="label">Fehler wiederholen</span><h3>${wrongN} offene Fehler</h3>
        <p>Eine Frage verschwindet aus dieser Liste, sobald du sie richtig beantwortest.</p>
        <div class="row"><button class="btn again" id="qWrong" ${wrongN?"":"disabled"}>Fehler wiederholen</button></div></div>
    </div>`;
    $("#qGo").onclick = ()=>quizStart("all", +$("#qN").value);
    $("#qNew").onclick = ()=>quizStart("new", 10);
    $("#qWrong").onclick = ()=>quizStart("wrong", 0);
    return;
  }
  const r = quizRun;
  if(r.pos>=r.items.length){
    const pct = r.items.length ? Math.round(r.right/r.items.length*100) : 0, g = grade(pct);
    p.innerHTML = `<div class="qcard result"><span class="label">Ergebnis</span>
      <div class="grade ${g>4?"fail":""}">${g}</div>
      <div class="big">${r.right} / ${r.items.length}</div>
      <p>${pct} % richtig. ${g===1?"Hervorragend!":g===2?"Sehr ordentlich.":g===3?"Solide, da geht noch was.":g===4?"Bestanden, aber knapp. Wiederhole die Fehler.":"Noch nicht bestanden. Lies die Lernzettel und wiederhole die Fehler."}</p>
      <span class="mono">IHK-Schlüssel: 1 ab 92 · 2 ab 81 · 3 ab 67 · 4 ab 50 · 5 ab 30 Punkten</span>
      <div class="row" style="justify-content:center"><button class="btn primary" id="qNew">Neues Quiz</button><button class="btn again" id="qW2" ${Object.keys(state.quiz.wrong).length?"":"disabled"}>Fehler wiederholen</button></div></div>`;
    $("#qNew").onclick = ()=>{ quizRun = null; renderQuiz(); };
    $("#qW2").onclick = ()=>quizStart("wrong", 0);
    return;
  }
  const qi = r.items[r.pos], q = QUIZ[qi], order = r.orders[r.pos], done = r.picked!==null;
  p.innerHTML = `<div class="qcard" style="${tc(q.t)}">
    <div class="qhead"><span class="label">${esc(topicName(q.t))}${r.kind==="wrong"?" · Fehler wiederholen":r.kind==="new"?" · neue Fragen":""}</span><span class="mono">Frage ${r.pos+1} / ${r.items.length} · ${r.right} richtig</span></div>
    <div class="bar" style="--bc:var(--t-${q.t})"><i style="width:${r.pos/r.items.length*100}%"></i></div>
    <div class="qtext">${esc(q.q)}</div>
    <div class="opts">${order.map((k,pos)=>{
      let cls = ""; if(done){ if(k===q.c) cls="right"; else if(k===r.picked) cls="wrong"; }
      return `<button class="opt ${cls}" data-k="${k}" ${done?"disabled":""}><span class="k">${pos+1}</span><span>${esc(q.o[k])}</span></button>`;}).join("")}</div>
    ${done?`<div class="explain"><span class="label">${r.picked===q.c?"Richtig":"Nicht ganz"} · Lösung</span>${esc(q.e)}<div class="src">Quelle: ${esc(q.s)}</div></div>
      <div class="row"><button class="btn primary" id="qNext">${r.pos+1<r.items.length?"Nächste Frage":"Auswertung"} <span class="mono">↵</span></button><button class="btn ghost" id="qStop">Quiz beenden</button></div>`:""}
  </div>`;
  p.querySelectorAll(".opt").forEach(b=>b.onclick=()=>pick(+b.dataset.k));
  if(done){ $("#qNext").onclick = next; $("#qStop").onclick = ()=>{ quizRun = null; renderQuiz(); }; $("#qNext").focus({preventScroll:true}); }
}
function pick(k){
  const r = quizRun; if(r.picked!==null) return;
  const qi = r.items[r.pos], ok = k===QUIZ[qi].c;
  r.picked = k; if(ok) r.right++;
  recordAnswer(qi, ok); save(); renderQuiz(); renderCounts();
}
function next(){ quizRun.pos++; quizRun.picked = null; renderQuiz(); window.scrollTo({top:0, behavior:"smooth"}); }

/* ---------- Prüfungssimulation ---------- */
/* Fragen werden nach Prüfungspunkten der Themen gewichtet gezogen (Efraimidis-Spirakis), Antworten erst am Ende ausgewertet. */
let examTimer = null, examView = "all";
const weightOf = t => parseFloat(String(t.pts).replace(",", ".")) || 10;
function examStart(kind, n, secPer){
  const ids = TOPICS.filter(t=> kind==="wiso" ? t.id==="wiso" : kind==="fach" ? t.id!=="wiso" : true);
  const pools = ids.map(t=>({id:t.id, w:weightOf(t), q:shuffle(quizOf(t.id))}));
  n = Math.min(n, pools.reduce((s,p)=>s+p.q.length, 0));
  // Sitze nach dem Verfahren der größten Reste verteilen, begrenzt durch die vorhandenen Fragen je Thema
  const quota = {}; let left = n, open = pools.filter(p=>p.q.length);
  while(left>0 && open.length){
    const sw = open.reduce((s,p)=>s+p.w, 0);
    const share = open.map(p=>({p, x:left*p.w/sw}));
    share.forEach(s=>{ s.k = Math.min(Math.floor(s.x), s.p.q.length-(quota[s.p.id]||0)); });
    let given = share.reduce((s,x)=>s+x.k, 0);
    share.sort((a,b)=>(b.x-Math.floor(b.x))-(a.x-Math.floor(a.x)));
    for(const s of share){ if(given>=left) break; if((quota[s.p.id]||0)+s.k < s.p.q.length){ s.k++; given++; } }
    share.forEach(s=>{ quota[s.p.id] = (quota[s.p.id]||0) + s.k; });
    left -= given; open = open.filter(p=>quota[p.id] < p.q.length);
    if(!given) break;
  }
  const items = shuffle(pools.flatMap(p=>p.q.slice(0, quota[p.id]||0)));
  state.examRun = {kind, items, orders: items.map(qi=>shuffle(range(QUIZ[qi].o.length))), ans:{}, pos:0, start:Date.now(), dur:items.length*secPer*1000, done:false};
  examView = "all"; save(); renderExam();
}
function examFinish(){
  const x = state.examRun; if(!x || x.done) return;
  x.done = true; x.end = Date.now();
  let right = 0;
  x.items.forEach((qi,pos)=>{ if(x.ans[pos]===undefined) return; const ok = x.ans[pos]===QUIZ[qi].c; if(ok) right++; recordAnswer(qi, ok); });
  x.items.forEach((qi,pos)=>{ if(x.ans[pos]===undefined) state.quiz.wrong[qi] = 1; });
  x.right = right;
  state.exams.push({d:Date.now(), n:x.items.length, r:right, kind:x.kind});
  if(state.exams.length>30) state.exams.shift();
  save(); renderExam(); renderCounts();
}
function examRemaining(){ const x = state.examRun; return Math.max(0, x.start + x.dur - Date.now()); }
function mmss(ms){ const s = Math.ceil(ms/1000); return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0"); }
function tickExam(){
  const x = state.examRun; const el = $("#timer");
  if(!x || x.done){ clearInterval(examTimer); examTimer = null; return; }
  const left = examRemaining();
  if(el){ el.querySelector("span").textContent = mmss(left); el.classList.toggle("low", left < 5*60000); }
  if(left<=0){ examFinish(); toast("Die Zeit ist abgelaufen."); }
}
function renderExam(){
  const p = $("#panel-exam"), x = state.examRun;
  if(!x){
    const hist = [...state.exams].reverse().slice(0,8);
    const fachN = QUIZ.filter(q=>q.t!=="wiso").length, wisoN = QUIZ.filter(q=>q.t==="wiso").length;
    p.innerHTML = `<div class="box-card" style="display:flex;flex-direction:column;gap:14px">
        <span class="label">Prüfungssimulation</span>
        <h2 style="font-size:1.5rem">Teste dich unter Prüfungsbedingungen</h2>
        <p class="muted" style="margin:0;max-width:62ch">Die Fragen werden nach den Prüfungspunkten der Themen gewichtet gezogen. Es läuft die Zeit, die Lösungen siehst du erst bei der Abgabe. Danach bekommst du Note, Auswertung je Thema und alle Lösungswege.</p>
        <div class="fields" style="max-width:560px">
          <label>Bereich<select id="exKind"><option value="fach">Fachteil (${fachN} Fragen im Pool)</option><option value="wiso">WiSo (${wisoN} Fragen im Pool)</option><option value="mix">Alles gemischt</option></select></label>
          <label>Umfang<select id="exN"><option value="20">20 Fragen</option><option value="30" selected>30 Fragen</option><option value="50">50 Fragen</option></select></label>
          <label>Zeit je Frage<select id="exT"><option value="60">1 Minute (knapp)</option><option value="90" selected>1,5 Minuten</option><option value="120">2 Minuten</option></select></label>
        </div>
        <div class="row"><button class="btn primary" id="exGo"><svg><use href="#i-timer"/></svg>Simulation starten</button></div>
      </div>
      ${hist.length?`<div class="box-card"><span class="label">Bisherige Simulationen</span><div class="history" style="margin-top:8px">${hist.map(h=>{ const pct = Math.round(h.r/h.n*100); return `<div><span>${new Date(h.d).toLocaleDateString("de-DE")} · ${h.kind==="wiso"?"WiSo":h.kind==="fach"?"Fachteil":"Gemischt"}</span><span class="mono">${h.r}/${h.n} · ${pct} % · Note ${grade(pct)}</span></div>`; }).join("")}</div></div>`:""}`;
    $("#exGo").onclick = ()=>{ const k = $("#exKind").value, n = +$("#exN").value, t = +$("#exT").value; examStart(k, n, t); };
    return;
  }
  if(x.done){
    const n = x.items.length, pct = Math.round(x.right/n*100), g = grade(pct);
    const byT = {};
    x.items.forEach((qi,pos)=>{ const t = QUIZ[qi].t; byT[t] = byT[t] || {n:0, r:0}; byT[t].n++; if(x.ans[pos]===QUIZ[qi].c) byT[t].r++; });
    const used = Math.min(x.dur, (x.end||Date.now()) - x.start);
    const list = x.items.map((qi,pos)=>({qi,pos,ok:x.ans[pos]===QUIZ[qi].c})).filter(e=>examView==="all" || !e.ok);
    p.innerHTML = `<div class="qcard result">
        <span class="label">Auswertung der Simulation</span>
        <div class="grade ${g>4?"fail":""}">${g}</div>
        <div class="big">${x.right} / ${n}</div>
        <p style="margin:0">${pct} % richtig · ${g<=4?"bestanden":"nicht bestanden"} · Zeit ${mmss(used)} von ${mmss(x.dur)}</p>
        <div class="breakdown">${Object.entries(byT).map(([t,v])=>`<div class="line"><span>${esc(topicName(t))}</span><span class="mono" style="text-align:right">${v.r}/${v.n}</span><div class="bar" style="--bc:var(--t-${t})"><i style="width:${v.r/v.n*100}%"></i></div></div>`).join("")}</div>
        <div class="row" style="justify-content:center"><button class="btn primary" id="exNew">Neue Simulation</button><button class="btn again" id="exWrong">Fehler im Quiz wiederholen</button></div>
      </div>
      <div class="row spread"><h2 style="font-size:1.25rem">Lösungen</h2>
        <div class="seg"><button data-v="all" aria-pressed="${examView==="all"}">Alle</button><button data-v="wrong" aria-pressed="${examView==="wrong"}">Nur Fehler</button></div></div>
      <div class="review">${list.map(({qi,pos,ok})=>{ const q = QUIZ[qi], a = x.ans[pos];
        return `<div class="qcard" style="${tc(q.t)}"><div class="qhead"><span class="label">${pos+1} · ${esc(topicName(q.t))}</span><span class="mono" style="color:${ok?"var(--ok)":"var(--bad)"}">${ok?"richtig":a===undefined?"nicht beantwortet":"falsch"}</span></div>
          <div class="qtext">${esc(q.q)}</div>
          <div class="opts">${x.orders[pos].map((k,i)=>`<div class="opt ${k===q.c?"right":k===a?"wrong":""}"><span class="k">${i+1}</span><span>${esc(q.o[k])}</span></div>`).join("")}</div>
          <div class="explain">${esc(q.e)}<div class="src">Quelle: ${esc(q.s)}</div></div></div>`; }).join("") || `<div class="empty">Keine Fehler. Stark!</div>`}</div>`;
    $("#exNew").onclick = ()=>{ state.examRun = null; save(); renderExam(); };
    $("#exWrong").onclick = ()=>{ state.examRun = null; save(); renderExam(); state.topics = []; quizRun = null; renderAll(); setMode("quiz"); quizStart("wrong", 0); };
    p.querySelectorAll(".seg button").forEach(b=>b.onclick=()=>{ examView = b.dataset.v; renderExam(); });
    return;
  }
  if(examRemaining()<=0){ examFinish(); return; }
  const qi = x.items[x.pos], q = QUIZ[qi], a = x.ans[x.pos], answered = Object.keys(x.ans).length;
  p.innerHTML = `<div class="exam-head">
      <span class="timer" id="timer"><svg><use href="#i-timer"/></svg><span>${mmss(examRemaining())}</span></span>
      <span class="mono">${answered} / ${x.items.length} beantwortet</span>
      <button class="btn primary sm" id="exEnd">Abgeben</button>
    </div>
    <div class="qcard" style="${tc(q.t)}">
      <div class="qhead"><span class="label">Frage ${x.pos+1} von ${x.items.length} · ${esc(topicName(q.t))}</span></div>
      <div class="qtext">${esc(q.q)}</div>
      <div class="opts">${x.orders[x.pos].map((k,i)=>`<button class="opt ${a===k?"sel":""}" data-k="${k}"><span class="k">${i+1}</span><span>${esc(q.o[k])}</span></button>`).join("")}</div>
      <div class="row spread"><button class="btn" id="exPrev" ${x.pos===0?"disabled":""}>← Zurück</button><button class="btn ${a!==undefined?"primary":""}" id="exNext">${x.pos+1<x.items.length?"Weiter →":"Zur Abgabe"}</button></div>
    </div>
    <div class="box-card"><span class="label">Übersicht</span><div class="qnav" style="margin-top:10px">${x.items.map((_,i)=>`<button class="${x.ans[i]!==undefined?"done":""} ${i===x.pos?"cur":""}" data-p="${i}" aria-label="Frage ${i+1}">${i+1}</button>`).join("")}</div></div>`;
  p.querySelectorAll(".opt").forEach(b=>b.onclick=()=>examPick(+b.dataset.k));
  p.querySelectorAll(".qnav button").forEach(b=>b.onclick=()=>examGo(+b.dataset.p));
  $("#exPrev").onclick = ()=>examGo(x.pos-1);
  $("#exNext").onclick = ()=>{ if(x.pos+1<x.items.length) examGo(x.pos+1); else examSubmit(); };
  const end = $("#exEnd");
  end.onclick = examSubmit;
  if(!examTimer) examTimer = setInterval(tickExam, 1000);
}
function examSubmit(){
  const x = state.examRun, open = x.items.length - Object.keys(x.ans).length, end = $("#exEnd");
  if(open && !end.dataset.confirm){
    end.dataset.confirm = "1"; end.textContent = `${open} offen – trotzdem abgeben?`;
    toast(`Noch ${open} ${open===1?"Frage":"Fragen"} unbeantwortet`);
    setTimeout(()=>{ if(end.isConnected){ delete end.dataset.confirm; end.textContent = "Abgeben"; } }, 4000);
    return;
  }
  examFinish(); window.scrollTo({top:0, behavior:"smooth"});
}
function examPick(k){ const x = state.examRun; x.ans[x.pos] = k; save(); renderExam(); }
function examGo(pos){ const x = state.examRun; if(pos<0 || pos>=x.items.length) return; x.pos = pos; save(); renderExam(); }

/* ---------- Rechner ---------- */
const CALCS = [
  {id:"unter", title:"Unterversicherung", desc:"Proportionalregel nach § 75 VVG.", fields:[["Schaden in €","20000"],["Versicherungssumme in €","150000"],["Versicherungswert in €","200000"]],
   run:([s,vs,vw])=>{ if(vs>=vw) return [eur(s), "keine Unterversicherung: voller Ersatz"]; const e = s*vs/vw; return [eur(e), `${fmt(s)} × ${fmt(vs)} ÷ ${fmt(vw)} · Kürzung ${eur(s-e)} (${fmt((1-vs/vw)*100,1)} %)`]; }},
  {id:"inv", title:"Invaliditätsleistung", desc:"Grundsumme × Invaliditätsgrad mit Progression (Staffel laut Proximus 5).", fields:[["Grundsumme in €","100000"],["Invaliditätsgrad in %","60"],["Progression",["einfach","U 225","U 350","U 500"]]],
   run:([g,ig,prog])=>{
     const f = {"einfach":[1,1,1],"U 225":[1,2,3],"U 350":[1,3,5],"U 500":[1,5,7]}[prog];
     ig = Math.min(100, Math.max(0, ig));
     const a = Math.min(ig,25), b = Math.min(Math.max(ig-25,0),25), c = Math.max(ig-50,0);
     const p = a*f[0] + b*f[1] + c*f[2];
     return [eur(g*p/100), prog==="einfach" ? `${fmt(ig)} % von ${eur(g)}` : `${fmt(a)} × ${f[0]} + ${fmt(b)} × ${f[1]} + ${fmt(c)} × ${f[2]} = ${fmt(p)} %`];
   }},
  {id:"zins", title:"Zinsen (kaufmännisch)", desc:"Z = K × p × t ÷ 36.000, Monat mit 30 Tagen.", fields:[["Kapital in €","10000"],["Zinssatz in % p. a.","4"],["Tage","90"]],
   run:([k,p,t])=>[eur(k*p*t/36000), `${fmt(k)} × ${fmt(p,2)} × ${fmt(t)} ÷ 36.000 · Endkapital ${eur(k + k*p*t/36000)}`]},
  {id:"spar", title:"Sparplan mit Zinseszins", desc:"Monatliche Einzahlung, monatliche Verzinsung.", fields:[["Startkapital in €","0"],["Monatliche Rate in €","100"],["Rendite in % p. a.","5"],["Laufzeit in Jahren","20"]],
   run:([k,r,p,j])=>{ const n = Math.round(j*12), i = p/100/12, q = Math.pow(1+i,n); const end = k*q + (i ? r*(q-1)/i : r*n); const ein = k + r*n; return [eur(end), `eingezahlt ${eur(ein)} · Ertrag ${eur(end-ein)}`]; }},
  {id:"afa", title:"Lineare Abschreibung", desc:"Monatsgenau im ersten Jahr, mit optionalem Verkauf.", fields:[["Anschaffungskosten in €","20000"],["Nutzungsdauer in Jahren","5"],["Anschaffungsmonat (1–12)","1"],["Restbuchwert am Ende von Jahr","3"],["Verkaufspreis in € (optional)","9000"]],
   run:([ak,nd,m,y,vk])=>{
     const ja = ak/nd, first = ja*(13-Math.min(12,Math.max(1,Math.round(m))))/12;
     const afa = Math.min(ak, first + ja*Math.max(0, Math.round(y)-1)), rbw = ak - afa;
     let sub = `AfA pro Jahr ${eur(ja)} · im 1. Jahr ${eur(first)}`;
     if(isFinite(vk) && vk>0){ const d = vk - rbw; sub += ` · Verkauf: ${d>=0?"a. o. Ertrag":"a. o. Aufwand"} ${eur(Math.abs(d))}`; }
     return [eur(rbw), sub];
   }},
  {id:"fonds", title:"Fondsanteile", desc:"Ausgabepreis = Anteilwert × (1 + Ausgabeaufschlag).", fields:[["Anlagebetrag in €","10000"],["Anteilwert (Rücknahmepreis) in €","50"],["Ausgabeaufschlag in %","4,25"]],
   run:([b,w,aa])=>{ const ap = w*(1+aa/100), n = b/ap; return [fmt(n,3)+" Anteile", `Ausgabepreis ${eur(ap)} · angelegt ${eur(n*w)} · Aufschlag ${eur(b-n*w)}`]; }},
  {id:"bezug", title:"Wert des Bezugsrechts", desc:"BR = (Kurs alt − Emissionskurs) ÷ (Bezugsverhältnis + 1).", fields:[["Kurs der alten Aktie in €","73,10"],["Emissionskurs in €","59"],["Bezugsverhältnis alt","4"],["Bezugsverhältnis neu","1"]],
   run:([ka,ke,a,n])=>{ const br = (ka-ke)/(a/n+1); return [eur(br), `(${fmt(ka,2)} − ${fmt(ke,2)}) ÷ (${fmt(a)}/${fmt(n)} + 1) · Mischkurs ${eur(ka-br)}`]; }},
  {id:"quote", title:"Versicherungskennzahlen", desc:"Quoten bezogen auf die verdienten Beiträge.", fields:[["Beiträge","618,5"],["Schadenaufwand","492"],["Kosten (Verwaltung + Abschluss)","120"]],
   run:([b,s,k])=>{ const sq = s/b*100, kq = k/b*100; return [`${fmt(sq+kq,1)} % Combined Ratio`, `Schadenquote ${fmt(sq,1)} % · Kostenquote ${fmt(kq,1)} %${sq+kq>100?" · versicherungstechnischer Verlust":""}`]; }},
  {id:"be", title:"Gewinnschwelle", desc:"Break-even = Fixkosten ÷ Deckungsbeitrag je Stück.", fields:[["Fixkosten in €","12000"],["Preis je Stück in €","50"],["Variable Kosten je Stück in €","20"]],
   run:([f,p,v])=>{ const db = p-v; if(db<=0) return ["–","Deckungsbeitrag muss positiv sein"]; return [fmt(Math.ceil(f/db))+" Stück", `DB je Stück ${eur(db)} · genau ${fmt(f/db,2)} Stück`]; }}
];
function renderCalc(){
  const p = $("#panel-calc");
  p.innerHTML = `<p class="muted" style="margin:0">Rechenhilfen zu den typischen Prüfungsaufgaben. Zahlen kannst du mit Komma oder Punkt eingeben. Die Vorbelegungen stammen aus Aufgaben in Quiz und Lernzetteln.</p>
    <div class="calcs">${CALCS.map(c=>`<div class="box-card calc" data-c="${c.id}"><h3>${esc(c.title)}</h3><p class="d">${esc(c.desc)}</p>
      <div class="fields">${c.fields.map(([l,v],i)=>`<label>${esc(l)}${Array.isArray(v)?`<select data-i="${i}">${v.map(o=>`<option>${esc(o)}</option>`).join("")}</select>`:`<input type="text" inputmode="decimal" data-i="${i}" value="${esc(v)}">`}</label>`).join("")}</div>
      <div class="out" aria-live="polite"><b></b><small></small></div></div>`).join("")}</div>`;
  p.querySelectorAll(".calc").forEach(el=>{
    const c = CALCS.find(x=>x.id===el.dataset.c);
    const run = ()=>{
      const vals = c.fields.map((f,i)=>{ const inp = el.querySelector(`[data-i="${i}"]`); return Array.isArray(f[1]) ? inp.value : num(inp.value); });
      const bad = vals.some((v,i)=>!Array.isArray(c.fields[i][1]) && isNaN(v) && !/optional/.test(c.fields[i][0]));
      const [main, sub] = bad ? ["–","Bitte alle Felder ausfüllen"] : c.run(vals);
      el.querySelector(".out b").textContent = main; el.querySelector(".out small").textContent = sub;
    };
    el.querySelectorAll("input,select").forEach(i=>i.addEventListener("input", run));
    run();
  });
}

/* ---------- Suche ---------- */
const dlgSearch = $("#dlgSearch"), dlgSettings = $("#dlgSettings");
document.querySelectorAll("dialog").forEach(d=>{
  d.addEventListener("click", e=>{ if(e.target===d || e.target.closest("[data-close]")) d.close(); });
  d.addEventListener("keydown", e=>{ if(e.key==="Escape"){ e.preventDefault(); d.close(); } });
});
function openSearch(){ dlgSearch.showModal(); const i = $("#searchInput"); i.select(); runSearch(); }
$("#btnSearch").onclick = openSearch;
$("#searchInput").oninput = runSearch;
function runSearch(){
  const raw = $("#searchInput").value.trim(), q = raw.toLowerCase(), out = $("#searchResults");
  if(q.length<2){ out.innerHTML = `<p class="muted" style="margin:4px">Durchsucht Lernzettel, ${CARDS.length} Karteikarten und ${QUIZ.length} Quizfragen. Tipp: Taste <span class="mono">/</span> öffnet die Suche.</p>`; return; }
  const res = [];
  TOPICS.forEach(t=>SUMS[t.id].sections.forEach(([h,items])=>items.forEach(it=>{ if(it.toLowerCase().includes(q)) res.push({type:"sum", t:t.id, title:h, body:it}); })));
  TOPICS.forEach(t=>SUMS[t.id].keys.forEach(([k,v])=>{ if((k+" "+v).toLowerCase().includes(q)) res.push({type:"sum", t:t.id, title:"Zahlen und Paragrafen", body:k+": "+v}); }));
  CARDS.forEach((c,i)=>{ if((c[1]+" "+c[2]).toLowerCase().includes(q)) res.push({type:"card", t:c[0], i, title:c[1], body:c[2]}); });
  QUIZ.forEach((x,i)=>{ if((x.q+" "+x.o.join(" ")+" "+x.e).toLowerCase().includes(q)) res.push({type:"quiz", t:x.t, i, title:x.q, body:"Lösung: "+x.o[x.c]+". "+x.e}); });
  const label = {sum:"Lernzettel", card:"Karteikarte", quiz:"Quizfrage"};
  out.innerHTML = res.length ? `<span class="mono muted">${res.length} Treffer${res.length>80?", die ersten 80":""}</span>` + res.slice(0,80).map((r,n)=>`
    <button class="hit" style="${tc(r.t)}" data-n="${n}"><span class="label">${label[r.type]} · ${esc(topicName(r.t))}</span><span class="qq">${hl(r.title,raw)}</span><span class="aa">${hl(r.body,raw)}</span></button>`).join("")
    : `<p class="muted" style="margin:4px">Keine Treffer für „${esc(raw)}“.</p>`;
  out.querySelectorAll(".hit").forEach(b=>b.onclick=()=>{
    const r = res[+b.dataset.n]; dlgSearch.close();
    if(r.type==="sum"){ state.topics = [r.t]; sumQuery = raw; deck = null; quizRun = null; renderAll(); setMode("sum"); }
    else if(r.type==="card"){ deck = null; state.onlyStar = false; renderCards(); deck = [r.i, ...deck.filter(i=>i!==r.i)]; deckPos = 0; flipped = false; setMode("cards"); renderCards(); }
    else { quizRun = {items:[r.i], orders:[shuffle(range(QUIZ[r.i].o.length))], pos:0, right:0, picked:null, kind:"single"}; setMode("quiz"); renderQuiz(); }
    window.scrollTo({top:0});
  });
}

/* ---------- Einstellungen, Sicherung ---------- */
$("#btnSettings").onclick = ()=>{ renderSettings(); dlgSettings.showModal(); };
function renderSettings(){
  const b = $("#settingsBody");
  b.innerHTML = `
    <section><h3>Darstellung</h3><div class="seg" id="setTheme">${[["auto","Automatisch"],["light","Hell"],["dark","Dunkel"]].map(([v,l])=>`<button data-v="${v}" aria-pressed="${state.theme===v}">${l}</button>`).join("")}</div></section>
    <section><h3>Tagesziel</h3><p>Wie viele Karten und Fragen willst du pro Tag schaffen?</p>
      <div class="seg" id="setGoal">${[20,30,50,80,120].map(v=>`<button data-v="${v}" aria-pressed="${state.goal===v}">${v}</button>`).join("")}</div></section>
    <section><h3>Lernstand sichern</h3><p>Der Lernstand liegt nur in diesem Browser. Lade ihn als Datei herunter, um ihn zu sichern oder auf ein anderes Gerät zu übertragen.</p>
      <div class="row"><button class="btn" id="setExport">Sicherung herunterladen</button><label class="btn ghost" style="cursor:pointer">Sicherung laden<input type="file" id="setImport" accept="application/json,.json" hidden></label></div></section>
    <section><h3>Zurücksetzen</h3><p>Löscht Karteifächer, Quiz-Statistik, Markierungen, Lernaktivität und Simulationen.</p>
      <div class="row"><button class="btn again" id="setReset">Gesamten Lernstand löschen</button></div></section>
    <section><h3>Tastatur</h3><p><span class="mono">/</span> Suche · Karten: <span class="mono">Leertaste</span> umdrehen, <span class="mono">1 2 3</span> bewerten, <span class="mono">S</span> markieren · Quiz: <span class="mono">1–5</span> antworten, <span class="mono">Enter</span> weiter · Prüfung: <span class="mono">← →</span> blättern</p></section>`;
  b.querySelectorAll("#setTheme button").forEach(x=>x.onclick=()=>{ state.theme = x.dataset.v; save(); applyTheme(); renderSettings(); });
  b.querySelectorAll("#setGoal button").forEach(x=>x.onclick=()=>{ state.goal = +x.dataset.v; save(); renderSettings(); renderHome(); });
  $("#setExport").onclick = ()=>{
    const blob = new Blob([JSON.stringify({app:"gap2-trainer", v:1, saved:new Date().toISOString(), state}, null, 1)], {type:"application/json"});
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `gap2-lernstand-${dayKey()}.json`; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(()=>URL.revokeObjectURL(a.href), 1000); toast("Sicherung heruntergeladen");
  };
  $("#setImport").onchange = e=>{
    const f = e.target.files[0]; if(!f) return;
    f.text().then(t=>{
      const data = JSON.parse(t), s = data.state || data;
      if(!s || typeof s.cards!=="object" || typeof s.quiz!=="object") throw new Error("format");
      state = load(s); save(); deck = null; quizRun = null; applyTheme(); renderAll(); renderSettings(); toast("Lernstand geladen");
    }).catch(()=>toast("Die Datei ist keine gültige Sicherung."));
  };
  const r = $("#setReset");
  r.onclick = ()=>{
    if(!r.dataset.confirm){ r.dataset.confirm = "1"; r.textContent = "Wirklich alles löschen?"; setTimeout(()=>{ if(r.isConnected){ delete r.dataset.confirm; r.textContent = "Gesamten Lernstand löschen"; } }, 3000); return; }
    const keep = {theme:state.theme, goal:state.goal}; state = Object.assign(defaults(), keep); save();
    deck = null; quizRun = null; renderAll(); renderSettings(); toast("Lernstand gelöscht");
  };
}

/* ---------- Tastatur ---------- */
document.addEventListener("keydown", e=>{
  if(e.target.closest && e.target.closest("select,input,textarea,dialog")) return;
  if(e.metaKey || e.ctrlKey || e.altKey) return;
  if(e.key==="/"){ e.preventDefault(); openSearch(); return; }
  if(state.mode==="cards" && deck && deckPos<deck.length && $("#card")){
    if(e.key===" "){ e.preventDefault(); flip(); }
    else if(e.key==="s" || e.key==="S") toggleStar();
    else if(flipped && /^[123]$/.test(e.key)) rate(+e.key-1);
  }
  if(state.mode==="quiz" && quizRun && quizRun.pos<quizRun.items.length){
    const order = quizRun.orders[quizRun.pos];
    if(quizRun.picked===null && /^[1-5]$/.test(e.key)){ const k = +e.key-1; if(k<order.length) pick(order[k]); }
    else if(quizRun.picked!==null && e.key==="Enter"){ e.preventDefault(); next(); }
  }
  const x = state.examRun;
  if(state.mode==="exam" && x && !x.done){
    if(/^[1-5]$/.test(e.key)){ const k = +e.key-1; if(k<x.orders[x.pos].length) examPick(x.orders[x.pos][k]); }
    else if(e.key==="ArrowRight") examGo(x.pos+1);
    else if(e.key==="ArrowLeft") examGo(x.pos-1);
  }
});

function renderAll(){ renderTopics(); renderCounts(); renderHome(); renderSum(); renderCards(); renderQuiz(); renderExam(); setMode(state.mode); }
applyTheme();
matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", applyTheme);
countdown(); setInterval(countdown, 60000);
renderCalc(); renderAll();
