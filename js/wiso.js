/* WiSo-Prüfungstrainer: alle 150 Aufgaben der IHK-WiSo-Prüfungen Sommer 2024 bis Sommer 2026
   mit Lösung laut IHK-Lösungsbogen und Erklärung. Daten in wiso-daten.js (WISO), Lernstand in state.wiso. */

const WX = {S24:"Sommer 2024", W2425:"Winter 2024/25", S25:"Sommer 2025", W2526:"Winter 2025/26", S26:"Sommer 2026"};
const WT = {
  recht:"Recht & Verträge", vollmacht:"Vollmachten", unternehmen:"Unternehmensformen", markt:"Markt & Preis",
  wipo:"Wirtschaftspolitik & Konjunktur", arbeit:"Arbeitsrecht", ausbildung:"Ausbildung & Jugendschutz",
  mitbest:"Betriebsrat & JAV", tarif:"Tarifrecht & Streik", org:"Organisation & Führung",
  sicher:"Arbeitsschutz & Unfallversicherung", umwelt:"Umweltschutz", digital:"Digitalisierung"
};
const WTYPE = {mc:"Auswahl", multi:"Mehrfachauswahl", num:"Offene Antwort", order:"Reihenfolge", assign:"Zuordnung"};
const wById = Object.fromEntries(WISO.map(q=>[q.id, q]));
const wKind = q => q.k || "mc";
function wStore(){
  const w = state.wiso || (state.wiso = {});
  w.ok = w.ok || {}; w.wrong = w.wrong || {}; w.fx = w.fx || []; w.ft = w.ft || []; w.runs = w.runs || [];
  return w;
}
let wr = null, wTimer = null;

/* ---------- Auswertung ---------- */
function wNorm(s){ return String(s).replace(/\s/g,"").replace(/€|stück|wochen|arbeitnehmer|mitglieder|personen/gi,""); }
function wNum(s){
  s = wNorm(s); if(/^\d{1,2}\.\d{1,2}\.\d{2,4}$/.test(s)) return s.split(".").map((p,i)=>i<2?p.padStart(2,"0"):p.length===2?"20"+p:p).join(".");
  if(s.includes(",")) s = s.replace(/\./g,"").replace(",", "."); else if(/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g,"");
  const n = parseFloat(s); return isFinite(n) ? n : NaN;
}
function wScore(q, ans){
  if(q.a===null) return null;
  const k = wKind(q);
  if(ans===undefined || ans===null) return 0;
  if(k==="mc") return (Array.isArray(q.a) ? q.a.includes(ans) : ans===q.a) ? 1 : 0;
  if(k==="multi"){ const hit = ans.filter(v=>q.a.includes(v)).length; return Math.max(0, hit - Math.max(0, ans.length - q.a.length)) / q.a.length; }
  if(k==="num"){ const v = wNum(ans); return (typeof q.v==="string" ? v===q.v : Math.abs(v - q.v) < 0.005) ? 1 : 0; }
  return q.a.filter((v,i)=>+ans[i]===v).length / q.a.length;
}
function wSolution(q){
  const k = wKind(q);
  if(q.a===null) return "Keine Auswertung (Aufgabe wurde von der IHK nicht gewertet)";
  if(k==="mc") return Array.isArray(q.a) ? q.a.join(" oder ") + " (beides wird gewertet)" : String(q.a);
  if(k==="multi") return q.a.join(" und ") + " (Reihenfolge egal)";
  if(k==="num") return q.a + (q.u && q.u!=="Datum" ? " " + q.u : "");
  return q.a.join(" · ");
}
function wAnsText(q, ans){
  const k = wKind(q);
  if(ans===undefined || ans===null || (Array.isArray(ans) && !ans.some(v=>v!==""&&v!==undefined))) return "keine Antwort";
  if(k==="num") return String(ans);
  if(Array.isArray(ans)) return ans.map(v=>v===""||v===undefined?"–":v).join(k==="multi"?" und ":" · ");
  return String(ans);
}
function wRecord(q, sc){
  if(sc===null) return;
  const w = wStore();
  if(sc===1){ w.ok[q.id] = 1; delete w.wrong[q.id]; } else { w.wrong[q.id] = 1; }
  track(); save();
}

/* ---------- Auswahl ---------- */
function wPool(){
  const w = wStore();
  return WISO.filter(q=>(!w.fx.length || w.fx.includes(q.x)) && (!w.ft.length || w.ft.includes(q.t)));
}
function wStart(kind, opts={}){
  const w = wStore();
  let ids;
  if(kind==="exam") ids = WISO.filter(q=>q.x===opts.x).map(q=>q.id);
  else {
    let pool = wPool();
    if(kind==="new") pool = pool.filter(q=>!w.ok[q.id] && q.a!==null);
    if(kind==="wrong") pool = WISO.filter(q=>w.wrong[q.id]);
    ids = pool.map(q=>q.id);
    if(opts.order!=="seq") shuffle(ids);
    if(opts.n) ids = ids.slice(0, opts.n);
  }
  if(!ids.length){ toast("Keine Aufgaben für diese Auswahl."); return; }
  wr = {kind, ids, pos:0, ans:{}, sc:{}, checked:{}, x:opts.x||null, start:Date.now(), done:false};
  wDraft = null; renderWiso(); window.scrollTo({top:0, behavior:"smooth"});
}

/* ---------- Ansicht ---------- */
let wDraft = null;
function renderWiso(){
  const p = $("#panel-wiso"); if(!p) return;
  clearInterval(wTimer); wTimer = null;
  if(!wr) return wSetup(p);
  if(wr.done) return wResult(p);
  wQuestion(p);
}
function wSetup(p){
  const w = wStore(), pool = wPool();
  const okN = WISO.filter(q=>w.ok[q.id]).length, wrongN = Object.keys(w.wrong).filter(id=>wById[id]).length;
  const newN = pool.filter(q=>!w.ok[q.id] && q.a!==null).length;
  const chipsX = Object.entries(WX).map(([id,n])=>`<button class="chip" data-wx="${id}" aria-pressed="${w.fx.includes(id)}">${n}</button>`).join("");
  const chipsT = Object.entries(WT).map(([id,n])=>{ const c = WISO.filter(q=>q.t===id).length; return `<button class="chip" data-wt="${id}" aria-pressed="${w.ft.includes(id)}">${esc(n)} <span class="pts">${c}</span></button>`; }).join("");
  const lastRuns = w.runs.slice(-5).reverse().map(r=>`<div><b>${esc(WX[r.x]||r.x)}</b> · ${r.pts} Punkte · Note ${grade(r.pts)} <span class="muted">· ${new Date(r.d).toLocaleDateString("de-DE")}</span></div>`).join("");
  p.innerHTML = `<div class="box-card wiso-intro">
      <span class="label">WiSo-Prüfungstrainer</span>
      <h3>Alle 150 Aufgaben aus 5 IHK-WiSo-Prüfungen</h3>
      <p>Original-Aufgaben Sommer 2024 bis Sommer 2026 mit der Lösung laut IHK-Lösungsbogen und einer Erklärung zu jeder Aufgabe. Zuordnungen und Reihenfolgen gibst du wie im Lösungsbogen mit Ziffern ein.</p>
      <div class="bar" style="--bc:var(--t-wiso)"><i style="width:${okN/WISO.length*100}%"></i></div>
      <div class="row muted" style="margin-top:6px"><span><b>${okN}</b> / ${WISO.length} richtig gelöst</span><span>· <b>${wrongN}</b> offene Fehler</span></div>
    </div>
    <div class="setup">
      <div class="box-card"><span class="label">Originalprüfung schreiben</span><h3>30 Aufgaben · 60 Minuten</h3>
        <p>Eine komplette IHK-Prüfung in Originalreihenfolge. Die Lösungen siehst du erst am Ende, mit Punkten und Note.</p>
        <div class="row"><select id="wxSel" aria-label="Prüfung">${Object.entries(WX).map(([id,n])=>`<option value="${id}">${n}</option>`).join("")}</select>
        <button class="btn primary" id="wExam">Prüfung starten</button></div>
        ${lastRuns?`<div class="history" style="margin-top:10px">${lastRuns}</div>`:""}</div>
      <div class="box-card"><span class="label">Üben mit Erklärung</span><h3>${pool.length} Aufgaben in der Auswahl</h3>
        <p>Nach jeder Aufgabe siehst du die IHK-Lösung und warum sie stimmt. Filter unten wählen.</p>
        <div class="row"><select id="wN" aria-label="Anzahl"><option value="10">10 Aufgaben</option><option value="20">20 Aufgaben</option><option value="0">Alle</option></select>
        <select id="wOrd" aria-label="Reihenfolge"><option value="mix">gemischt</option><option value="seq">der Reihe nach</option></select>
        <button class="btn primary" id="wGo" ${pool.length?"":"disabled"}>Üben</button></div></div>
      <div class="box-card"><span class="label">Noch nicht gelöst</span><h3>${newN} Aufgaben</h3>
        <p>Nur Aufgaben aus der Auswahl, die du noch nie ganz richtig hattest.</p>
        <div class="row"><button class="btn" id="wNew" ${newN?"":"disabled"}>10 neue Aufgaben</button></div></div>
      <div class="box-card"><span class="label">Fehler wiederholen</span><h3>${wrongN} offene Fehler</h3>
        <p>Eine Aufgabe verschwindet hier, sobald du sie einmal ganz richtig löst.</p>
        <div class="row"><button class="btn again" id="wWrong" ${wrongN?"":"disabled"}>Fehler wiederholen</button></div></div>
    </div>
    <div class="box-card wiso-filter"><span class="label">Filter für Üben und neue Aufgaben</span>
      <p class="muted" style="margin:6px 0">Prüfung</p><div class="topics">${chipsX}</div>
      <p class="muted" style="margin:10px 0 6px">Thema</p><div class="topics">${chipsT}</div>
      ${w.fx.length||w.ft.length?`<div class="row" style="margin-top:10px"><button class="btn ghost sm" id="wClear">Filter zurücksetzen</button></div>`:""}
    </div>`;
  p.querySelectorAll("[data-wx]").forEach(b=>b.onclick=()=>{ const v=b.dataset.wx, a=w.fx; a.includes(v)?a.splice(a.indexOf(v),1):a.push(v); save(); renderWiso(); });
  p.querySelectorAll("[data-wt]").forEach(b=>b.onclick=()=>{ const v=b.dataset.wt, a=w.ft; a.includes(v)?a.splice(a.indexOf(v),1):a.push(v); save(); renderWiso(); });
  const c = $("#wClear"); if(c) c.onclick = ()=>{ w.fx = []; w.ft = []; save(); renderWiso(); };
  $("#wExam").onclick = ()=>wStart("exam", {x:$("#wxSel").value});
  $("#wGo").onclick = ()=>wStart("practice", {n:+$("#wN").value, order:$("#wOrd").value});
  $("#wNew").onclick = ()=>wStart("new", {n:10, order:"mix"});
  $("#wWrong").onclick = ()=>wStart("wrong", {});
}
function wInputHtml(q, ans, locked){
  const k = wKind(q);
  const optList = (sel, cls)=>q.o.map((o,i)=>{
    const n = i+1; let c = cls ? cls(n) : "";
    if(!c && sel(n)) c = "sel";
    return `<button class="opt ${c}" data-n="${n}" ${locked?"disabled":""}><span class="k">${n}</span><span>${esc(o)}</span></button>`;
  }).join("");
  const res = locked && wr.kind!=="exam-review";
  if(k==="mc" || k==="multi"){
    const arr = k==="multi" ? (ans||[]) : (ans==null?[]:[ans]);
    const good = q.a===null ? [] : Array.isArray(q.a) ? q.a : [q.a];
    const cls = res ? n=> good.includes(n) ? "right" : arr.includes(n) ? "wrong" : "" : null;
    return (k==="multi"?`<p class="muted">Wähle ${q.a.length} Antworten.</p>`:"") + `<div class="opts">${optList(n=>arr.includes(n), cls)}</div>`;
  }
  if(k==="num"){
    return `<div class="row wnum"><input type="text" id="wNumIn" inputmode="${q.u==="Datum"?"text":"decimal"}" placeholder="${q.u==="Datum"?"TT.MM.JJJJ":"Ergebnis"}" value="${esc(ans||"")}" ${locked?"disabled":""} autocomplete="off"><span class="mono">${esc(q.u==="Datum"?"":q.u||"")}</span></div>`;
  }
  const items = k==="order" ? q.o : q.z;
  const max = k==="order" ? q.o.length : q.o.length;
  const list = k==="assign" ? `<ol class="wlist">${q.o.map((o,i)=>`<li><span class="k mono">${i+1}</span><span>${esc(o)}</span></li>`).join("")}</ol>` : "";
  const a = ans || [];
  return list + `<div class="wslots">${items.map((it,i)=>{
    const v = a[i]===undefined ? "" : a[i];
    const st = res ? (+v===q.a[i] ? "right" : "wrong") : "";
    return `<label class="wslot ${st}"><select data-i="${i}" ${locked?"disabled":""} aria-label="Ziffer"><option value="">–</option>${Array.from({length:max},(_,j)=>`<option ${+v===j+1?"selected":""}>${j+1}</option>`).join("")}</select><span>${esc(it)}</span>${res && +v!==q.a[i] ? `<b class="mono wfix">${q.a[i]}</b>` : ""}</label>`;
  }).join("")}</div>`;
}
function wFeedback(q, ans, sc){
  const k = wKind(q);
  let extra = "";
  if(k==="assign") extra = `<ul class="wmap">${q.z.map((z,i)=>`<li>${esc(z)} → <b>${q.a[i]}</b> ${esc(q.o[q.a[i]-1])}</li>`).join("")}</ul>`;
  if(k==="order") extra = `<ol class="wmap">${q.a.map((pos,i)=>({pos, t:q.o[i]})).sort((x,y)=>x.pos-y.pos).map(r=>`<li>${esc(r.t)}</li>`).join("")}</ol>`;
  const head = sc===null ? "Keine IHK-Wertung" : sc===1 ? "Richtig" : sc>0 ? `Teilweise richtig (${Math.round(sc*100)} %)` : "Nicht richtig";
  return `<div class="explain ${sc===1?"ok":sc===null?"":"bad"}"><span class="label">${head}</span><div class="wsol"><span>IHK-Lösung:</span> <b>${esc(wSolution(q))}</b>${sc!==1 && sc!==null ? ` <span class="muted">· deine Antwort: ${esc(wAnsText(q, ans))}</span>`:""}</div>${extra}<p>${esc(q.e)}</p><div class="src">Quelle: IHK-Abschlussprüfung ${esc(WX[q.x])}, WiSo, Aufgabe ${q.n} · Lösung laut IHK-Lösungsbogen</div></div>`;
}
const wSit = s => esc(s.includes("→") ? s.replace(/ · /g, "\n") : s);
function wQuestion(p){
  const r = wr, q = wById[r.ids[r.pos]], k = wKind(q), exam = r.kind==="exam";
  const checked = !!r.checked[q.id];
  const ans = r.ans[q.id] !== undefined ? r.ans[q.id] : null;
  const sc = checked ? r.sc[q.id] : undefined;
  const done = Object.keys(r.ans).length;
  const left = exam ? Math.max(0, 3600 - Math.floor((Date.now()-r.start)/1000)) : 0;
  const nav = exam ? `<div class="qnav">${r.ids.map((id,i)=>`<button data-go="${i}" class="${i===r.pos?"cur":""} ${r.ans[id]!==undefined?"done":""}">${i+1}</button>`).join("")}</div>` : "";
  p.innerHTML = `<div class="qcard wq" style="--tc:var(--t-wiso)">
    <div class="qhead"><span class="label">IHK ${esc(WX[q.x])} · Aufgabe ${q.n} · ${esc(WT[q.t])}</span>
      <span class="mono">${exam?`<span class="timer ${left<600?"low":""}" id="wClock">${wClock(left)}</span> · `:""}${r.pos+1} / ${r.ids.length}${exam?` · ${done} beantwortet`:""}</span></div>
    <div class="bar" style="--bc:var(--t-wiso)"><i style="width:${(r.pos)/r.ids.length*100}%"></i></div>
    ${nav}
    ${q.s?`<div class="wsit">${wSit(q.s)}</div>`:""}
    <div class="qtext">${esc(q.q)}</div>
    <div class="wtype mono">${WTYPE[k]}${q.a===null?" · von der IHK nicht gewertet":""}</div>
    <div id="wIn">${wInputHtml(q, ans, checked)}</div>
    ${checked ? wFeedback(q, ans, sc) : ""}
    <div class="row">${exam
      ? `<button class="btn ghost" id="wPrev" ${r.pos?"":"disabled"}>Zurück</button><button class="btn primary" id="wNext">${r.pos+1<r.ids.length?"Weiter":"Abgeben"} <span class="mono">↵</span></button><button class="btn ghost" id="wFinish">Prüfung abgeben</button>`
      : checked
        ? `<button class="btn primary" id="wNext">${r.pos+1<r.ids.length?"Nächste Aufgabe":"Auswertung"} <span class="mono">↵</span></button><button class="btn ghost" id="wStop">Beenden</button>`
        : `${k!=="mc"?`<button class="btn primary" id="wCheck">Prüfen <span class="mono">↵</span></button>`:""}<button class="btn ghost" id="wSkip">Lösung zeigen</button><button class="btn ghost" id="wStop">Beenden</button>`}
    </div></div>`;
  // Eingaben
  const setAns = v=>{ r.ans[q.id] = v; };
  if(!checked){
    if(k==="mc") p.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{ setAns(+b.dataset.n); if(exam){ renderWiso(); } else wCheck(); });
    if(k==="multi") p.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{
      const a = (r.ans[q.id]||[]).slice(), n = +b.dataset.n;
      if(a.includes(n)) a.splice(a.indexOf(n),1); else { if(a.length>=q.a.length) a.shift(); a.push(n); }
      setAns(a.sort((x,y)=>x-y)); renderWiso();
    });
    if(k==="num"){ const i = $("#wNumIn"); i.oninput = ()=>{ if(i.value.trim()) setAns(i.value.trim()); else delete r.ans[q.id]; }; if(!exam) i.focus({preventScroll:true}); }
    if(k==="order" || k==="assign") p.querySelectorAll(".wslot select").forEach(s=>s.onchange=()=>{
      const n = (k==="order"?q.o:q.z).length, a = (r.ans[q.id]||Array(n).fill("")).slice();
      a[+s.dataset.i] = s.value ? +s.value : ""; setAns(a);
    });
  }
  const nx = $("#wNext"), ck = $("#wCheck"), sk = $("#wSkip"), st = $("#wStop"), pv = $("#wPrev"), fi = $("#wFinish");
  if(ck) ck.onclick = wCheck;
  if(sk) sk.onclick = ()=>{ wCheck(true); };
  if(st) st.onclick = ()=>{ wr = null; renderWiso(); };
  if(nx) nx.onclick = wNext;
  if(pv) pv.onclick = ()=>{ r.pos--; renderWiso(); };
  if(fi) fi.onclick = ()=>{ if(!fi.dataset.c){ fi.dataset.c = 1; fi.textContent = "Wirklich abgeben?"; return; } wFinish(); };
  p.querySelectorAll(".qnav [data-go]").forEach(b=>b.onclick=()=>{ r.pos = +b.dataset.go; renderWiso(); });
  if(checked && nx) nx.focus({preventScroll:true});
  if(exam){ wTimer = setInterval(()=>{ const el = $("#wClock"); if(!el){ clearInterval(wTimer); return; } const l = Math.max(0, 3600 - Math.floor((Date.now()-r.start)/1000)); el.textContent = wClock(l); el.classList.toggle("low", l<600); }, 1000); }
}
function wClock(s){ return s<=0 ? "Zeit um" : `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`; }
function wCheck(reveal){
  const r = wr, q = wById[r.ids[r.pos]], k = wKind(q);
  let ans = r.ans[q.id];
  if(!reveal){
    if(ans===undefined || ans===null || (Array.isArray(ans) && ans.every(v=>v===""))){ toast("Bitte zuerst eine Antwort eingeben."); return; }
    if(k==="multi" && ans.length<q.a.length){ toast(`Bitte ${q.a.length} Antworten wählen.`); return; }
  }
  const sc = wScore(q, ans);
  r.sc[q.id] = sc; r.checked[q.id] = 1;
  wRecord(q, sc===null ? null : sc);
  renderWiso();
}
function wNext(){
  const r = wr;
  if(r.pos+1 < r.ids.length){ r.pos++; renderWiso(); window.scrollTo({top:0, behavior:"smooth"}); }
  else if(r.kind==="exam") wFinish();
  else { r.done = true; renderWiso(); }
}
function wFinish(){
  const r = wr;
  r.ids.forEach(id=>{ const q = wById[id]; r.sc[id] = wScore(q, r.ans[id]); wRecord(q, r.sc[id]); });
  r.done = true;
  if(r.kind==="exam"){
    const ev = r.ids.filter(id=>wById[id].a!==null), sum = ev.reduce((s,id)=>s+r.sc[id],0);
    r.pts = Math.round(sum/ev.length*100);
    const w = wStore(); w.runs.push({x:r.x, pts:r.pts, d:Date.now(), min:Math.round((Date.now()-r.start)/60000)}); if(w.runs.length>30) w.runs.shift(); save();
  }
  renderWiso(); window.scrollTo({top:0, behavior:"smooth"});
}
function wResult(p){
  const r = wr, ids = r.ids;
  const ev = ids.filter(id=>wById[id].a!==null && r.sc[id]!==undefined);
  const sum = ev.reduce((s,id)=>s+(r.sc[id]||0),0);
  const pts = r.kind==="exam" ? r.pts : (ev.length ? Math.round(sum/ev.length*100) : 0), g = grade(pts);
  const rightN = ev.filter(id=>r.sc[id]===1).length;
  const byT = {};
  ev.forEach(id=>{ const t = wById[id].t; const b = byT[t] || (byT[t] = {n:0, s:0}); b.n++; b.s += r.sc[id]; });
  const rows = Object.entries(byT).sort((a,b)=>a[1].s/a[1].n - b[1].s/b[1].n).map(([t,b])=>`<div class="line"><span>${esc(WT[t])}</span><span class="mono">${fmt(b.s,b.s%1?1:0)} / ${b.n}</span><div class="bar" style="--bc:var(--t-wiso)"><i style="width:${b.s/b.n*100}%"></i></div></div>`).join("");
  const review = ids.map(id=>{ const q = wById[id], sc = r.sc[id];
    return `<details class="wrev ${sc===1?"ok":sc===null||sc===undefined?"":"bad"}"><summary><span class="mono">A${q.n}</span> ${esc(q.q.length>110?q.q.slice(0,107)+"…":q.q)} <span class="mono wrs">${sc===null?"–":sc===undefined?"übersprungen":sc===1?"✓":sc>0?Math.round(sc*100)+" %":"✗"}</span></summary>
      ${q.s?`<div class="wsit">${wSit(q.s)}</div>`:""}<div class="qtext">${esc(q.q)}</div>
      ${wKind(q)!=="num"?`<ol class="wlist">${(q.o||[]).map((o,i)=>`<li><span class="k mono">${i+1}</span><span>${esc(o)}</span></li>`).join("")}</ol>`:""}
      ${wFeedback(q, r.ans[id], sc===undefined?0:sc)}</details>`; }).join("");
  p.innerHTML = `<div class="qcard result"><span class="label">${r.kind==="exam"?`Ergebnis IHK ${esc(WX[r.x])}`:"Ergebnis"}</span>
      <div class="grade ${g==="✗"?"fail":""}">${g}</div>
      <div class="big">${pts} Punkte</div>
      <p>${rightN} von ${ev.length} gewerteten Aufgaben ganz richtig${r.kind==="exam"?` · ${Math.round((Date.now()-r.start)/60000)} Minuten`:""}. Teilbewertung bei Zuordnung, Reihenfolge und Mehrfachauswahl wie bei der IHK.</p>
      <span class="mono">IHK-Schlüssel: 1 ab 92 · 2 ab 81 · 3 ab 67 · 4 ab 50 Punkten</span>
      <div class="row" style="justify-content:center"><button class="btn primary" id="wAgain">Zur Übersicht</button><button class="btn again" id="wW" ${Object.keys(wStore().wrong).length?"":"disabled"}>Fehler wiederholen</button></div></div>
    ${rows?`<div class="box-card"><span class="label">Nach Thema (schwächstes zuerst)</span><div class="breakdown">${rows}</div></div>`:""}
    ${r.kind==="exam"?`<div class="box-card"><span class="label">Alle Aufgaben mit IHK-Lösung und Erklärung</span>${review}</div>`:""}`;
  $("#wAgain").onclick = ()=>{ wr = null; renderWiso(); };
  $("#wW").onclick = ()=>wStart("wrong", {});
}

/* ---------- Tastatur ---------- */
document.addEventListener("keydown", e=>{
  if(state.mode!=="wiso" || !wr || wr.done) return;
  if(e.metaKey || e.ctrlKey || e.altKey) return;
  const inField = e.target.closest && e.target.closest("select,input,textarea");
  const q = wById[wr.ids[wr.pos]], k = wKind(q), checked = !!wr.checked[q.id];
  if(e.key==="Enter"){
    if(inField && e.target.tagName==="SELECT") return;
    e.preventDefault();
    if(wr.kind==="exam" || checked) wNext(); else if(k!=="mc") wCheck();
    return;
  }
  if(inField) return;
  if(!checked && (k==="mc" || k==="multi") && /^[1-9]$/.test(e.key) && +e.key<=q.o.length){
    const b = document.querySelector(`#wIn .opt[data-n="${e.key}"]`); if(b) b.click();
  }
  if(wr.kind==="exam"){ if(e.key==="ArrowRight" && wr.pos+1<wr.ids.length){ wr.pos++; renderWiso(); } else if(e.key==="ArrowLeft" && wr.pos>0){ wr.pos--; renderWiso(); } }
});

$("#cntWiso").textContent = WISO.length;
renderWiso();
