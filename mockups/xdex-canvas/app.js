(() => {
'use strict';
const $=(s,root=document)=>root.querySelector(s), $$=(s,root=document)=>[...root.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const paths={
 plus:'M12 5v14M5 12h14',close:'m6 6 12 12M18 6 6 18',search:'m20 20-5-5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0',
 board:'M3 3h7v8H3zM14 3h7v5h-7zM3 15h7v6H3zM14 12h7v9h-7z',library:'M4 4h5v16H4zM11 4h4v16h-4zM17 5l3-1 4 15-3 1z',
 inbox:'M4 4h16l2 15H2L4 4ZM2 14h6l2 3h4l2-3h6',archive:'M4 8v13h16V8M3 3h18v5H3zM9 12h6',
 layers:'m12 3 10 6-10 6L2 9l10-6ZM2 13l10 6 10-6M2 17l10 6 10-6',lock:'M6 10h12v10H6zM8 10V6a4 4 0 0 1 8 0v4',
 'arrow-up-right':'M6 18 18 6M6 6h12v12',arrow:'M4 12h16m-6-6 6 6-6 6',back:'M20 12H4m6-6-6 6 6 6',
 flask:'M9 3h6M10 3v7L4 20h16l-6-10V3M7 15h10',spark:'m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z',
 list:'M9 5h12M9 12h12M9 19h12M3 5h1M3 12h1M3 19h1',grid:'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
 check:'m5 12 4 4L19 6',grip:'M8 5h.01M16 5h.01M8 12h.01M16 12h.01M8 19h.01M16 19h.01',
 minus:'M5 12h14',fit:'M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5',link:'m9 15 6-6M7 14l-2 2a3 3 0 0 0 4 4l3-3M12 7l3-3a3 3 0 0 1 5 5l-2 2',
 file:'M5 3h9l5 5v13H5zM14 3v6h5M8 13h8M8 17h6',code:'m8 7-5 5 5 5M16 7l5 5-5 5M14 3l-4 18',
 refresh:'M20 9a8 8 0 0 0-14-4L3 8M3 3v5h5M4 15a8 8 0 0 0 14 4l3-3M21 21v-5h-5',note:'M4 3h16v13l-5 5H4zM15 21v-5h5M8 8h8M8 12h6',
 home:'m3 10 9-7 9 7v11h-7v-7h-4v7H3V10Z',help:'M9 8a3 3 0 0 1 6 0c0 2-3 2-3 5M12 17h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
 expand:'M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5',collapse:'M3 8h5V3M21 8h-5V3M3 16h5v5M21 16h-5v5',
 up:'m6 14 6-6 6 6',down:'m6 10 6 6 6-6'};
const icon=(name,extra='')=>`<svg class="icon ${extra}" viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name]||paths.file}"/></svg>`;
const hydrate=(root=document)=>$$('[data-icon]',root).forEach(el=>el.innerHTML=icon(el.dataset.icon));
const sources={youtube:{name:'YouTube',mark:'▶'},reddit:{name:'Reddit',mark:'r'},discord:{name:'Discord',mark:'◒'},x:{name:'X',mark:'𝕏'},manual:{name:'Manuel',mark:'+'}};
const sourceLogo=name=>`<span class="source-logo ${name}" aria-label="${sources[name].name}">${sources[name].mark}</span>`;
const resources=structuredClone(window.CANVAS_DATA.resources),bookmarks=structuredClone(window.CANVAS_DATA.bookmarks),topics=window.CANVAS_DATA.topics;
const tabs=[],workspace=$('#workspace'),tablist=$('#tablist'),modal=$('#modal');
let active='home',counter=0,undoChange=null,toastTimer=null,modalOpener=null,moveTopic=null,drag=null,suppressMoveClick=false,pan=null;
let note='Les bonnes idées ne vivent pas dans des dossiers. Elles se rencontrent.';
const getResource=id=>resources.find(r=>r.id===Number(id));
const captures=id=>bookmarks.filter(b=>b.resourceId===Number(id));
const topicBy=id=>topics.find(t=>t.id===id);
const normalize=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const stateName=s=>({pending:'À trier',kept:'Gardé',archived:'Archivé'}[s]);
function art(type,cls='card-cover'){
 if(type==='architecture')return `<img class="${cls}" src="assets/architecture.jpg" alt="Escaliers et volumes en béton éclairés par le soleil" loading="eager">`;
 const begin=`<svg class="${cls}" viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">`;
 const arts={
 interface:'<rect width="600" height="320" fill="#e3ddec"/><rect x="45" y="42" width="310" height="232" rx="13" fill="#fdfaf3" stroke="#c6bdd5"/><circle cx="67" cy="63" r="4" fill="#d99079"/><circle cx="82" cy="63" r="4" fill="#d4bb7c"/><circle cx="97" cy="63" r="4" fill="#a6b790"/><path d="M45 82h310" stroke="#dfd8e5"/><text x="68" y="142" font-family="Georgia,serif" font-size="43" fill="#4c414f">Less, but better.</text><rect x="68" y="163" width="130" height="9" rx="4" fill="#d4ccd8"/><rect x="68" y="183" width="240" height="7" rx="3" fill="#e9e2e9"/><rect x="68" y="202" width="205" height="7" rx="3" fill="#e9e2e9"/><rect x="329" y="111" width="218" height="132" rx="15" fill="#807096"/><rect x="350" y="137" width="110" height="9" rx="4" fill="#ede5f0"/><rect x="350" y="160" width="173" height="7" rx="3" fill="#afa1be"/><rect x="350" y="193" width="77" height="27" rx="13" fill="#f1c89e"/><circle cx="503" cy="65" r="26" fill="#b9c6a5"/>',
 agents:'<rect width="600" height="320" fill="#dcb5a0"/><path d="M90 0v320M180 0v320M270 0v320M360 0v320M450 0v320M540 0v320M0 70h600M0 140h600M0 210h600M0 280h600" stroke="#ebcdba" stroke-width="1"/><path d="M155 164h108M337 164h108M300 109V61M300 217v52" stroke="#795e71" stroke-width="3"/><rect x="222" y="106" width="157" height="116" rx="20" fill="#544364"/><path d="m300 132 8 18 18 8-18 8-8 18-8-18-18-8 18-8Z" fill="#f5e9d3"/><text x="256" y="207" font-size="13" font-family="sans-serif" letter-spacing="2" fill="#e6d8ef">CONTEXT</text><rect x="48" y="129" width="123" height="75" rx="10" fill="#faf3e5"/><path d="M72 153h68M72 169h51M72 185h59" stroke="#a895a0" stroke-width="5"/><rect x="432" y="129" width="123" height="75" rx="10" fill="#e4edce"/><path d="m473 166 10 10 24-27" fill="none" stroke="#658155" stroke-width="6"/><circle cx="300" cy="52" r="25" fill="#fae9c9"/><path d="M290 52h20M300 42v20" stroke="#b17d51" stroke-width="3"/><rect x="272" y="262" width="56" height="21" rx="10" fill="#f9e4ce"/>',
 local:'<rect width="600" height="320" fill="#cfddd8"/><circle cx="484" cy="85" r="58" fill="#b4cabe"/><circle cx="82" cy="278" r="81" fill="#dce8d7"/><rect x="113" y="58" width="363" height="201" rx="10" fill="#f6f4e9" stroke="#98aea4" stroke-width="2"/><path d="M113 94h363" stroke="#c8d2c5"/><circle cx="134" cy="77" r="4" fill="#abbd9d"/><circle cx="149" cy="77" r="4" fill="#ddcaa2"/><text x="156" y="146" font-size="19" font-family="monospace" fill="#516151">your ideas,</text><text x="156" y="177" font-size="28" font-family="monospace" fill="#334e41">on your terms.</text><rect x="156" y="204" width="118" height="23" rx="11" fill="#dce7ce"/><circle cx="169" cy="215" r="4" fill="#6a8855"/><text x="181" y="219" font-size="11" font-family="sans-serif" fill="#4e6940">available offline</text><rect x="382" y="180" width="131" height="98" rx="12" fill="#859682"/><path d="M411 207h72M411 223h50M411 239h59" stroke="#e2e7d7" stroke-width="5"/>',
 summary:'<rect width="600" height="320" fill="#ece2d4"/><g transform="translate(125 48) rotate(-8 100 100)"><rect width="239" height="232" rx="9" fill="#c1aecb"/><path d="M28 42h175M28 65h145M28 88h167M28 111h159M28 134h149" stroke="#e3d7e9" stroke-width="7"/></g><g transform="translate(270 77) rotate(6 100 100)"><rect width="218" height="208" rx="9" fill="#fffbf2" stroke="#d9cdbc"/><text x="25" y="49" font-size="22" font-family="Georgia,serif" fill="#5e4d60">L’essentiel.</text><rect x="25" y="74" width="168" height="14" fill="#f5e4a9"/><path d="M25 104h150M25 125h167M25 146h127" stroke="#bdb3bf" stroke-width="6"/><circle cx="172" cy="174" r="14" fill="#bdcdaa"/></g>',
 code:'<rect width="600" height="320" fill="#283d37"/><text x="38" y="56" fill="#9aae9c" font-size="12" font-family="monospace" letter-spacing="2">SMALL TOOLS, BIG IDEAS</text><g font-family="monospace" font-size="22"><text x="38" y="110" fill="#c6baad">const <tspan fill="#e8ead6">ideas</tspan> = await</text><text x="65" y="149" fill="#dac995">db<tspan fill="#b8d0c4">.search({</tspan></text><text x="94" y="188" fill="#c2d5c8">  topic: <tspan fill="#e0ad8f">"curiosity"</tspan></text><text x="65" y="227" fill="#b8d0c4">});</text></g><rect x="38" y="263" width="140" height="25" rx="5" fill="#41564a"/><text x="49" y="280" fill="#cee0b9" font-size="11" font-family="monospace">✓ 12 ideas found</text>',
 grid:'<rect width="600" height="320" fill="#d4dae3"/><g stroke="#a7b1c1" stroke-width="1"><path d="M30 0v320M100 0v320M170 0v320M240 0v320M310 0v320M380 0v320M450 0v320M520 0v320M590 0v320M0 45h600M0 115h600M0 185h600M0 255h600"/></g><rect x="30" y="45" width="210" height="210" rx="3" fill="#526379"/><circle cx="380" cy="150" r="105" fill="#f3dfab"/><rect x="380" y="185" width="140" height="70" fill="#a489a9"/><text x="56" y="175" font-family="Georgia,serif" font-size="72" fill="#f3efe5">Aa.</text>'};
 return begin+(arts[type]||arts.grid)+'</svg>';
}
function matched(tab){
 const st=tab.state,q=normalize(st.query||'');
 return bookmarks.filter(b=>{
  const r=getResource(b.resourceId);
  return (!st.source||st.source==='all'||b.source===st.source)&&(!st.topic||st.topic==='all'||r.topic===st.topic)&&
   (!st.triage||st.triage==='all'||(st.triage==='active'?b.triage!=='archived':b.triage===st.triage))&&
   (!q||normalize([r.title,r.summary,...r.tags,b.author,sources[b.source].name].join(' ')).includes(q));
 });
}
function uniqueResources(items){return [...new Set(items.map(b=>b.resourceId))].map(getResource);}
const sourceOptions=value=>`<option value="all" ${value==='all'?'selected':''}>Toutes les sources</option>`+Object.entries(sources).filter(([id])=>id!=='manual'||bookmarks.some(b=>b.source==='manual')).map(([id,s])=>`<option value="${id}" ${value===id?'selected':''}>${s.name}</option>`).join('');
const topicOptions=value=>`<option value="all">Tous les sujets</option>`+topics.map(t=>`<option value="${t.id}" ${value===t.id?'selected':''}>${t.name}</option>`).join('');
function card(r){
 const bs=captures(r.id),first=bs.find(b=>b.triage!=='archived')||bs[0],pending=bs.some(b=>b.triage==='pending');
 return `<article class="resource-card" data-resource="${r.id}"><button class="card-open" data-open="${r.id}" aria-label="Ouvrir ${esc(r.title)} dans un onglet">${r.cover?art(r.cover):''}<div class="card-body"><div class="card-meta"><span>${r.kind}</span><span>${r.duration}</span></div><h3>${esc(r.title)}</h3>${!r.cover?`<p class="card-summary">${esc(r.summary)}</p>`:''}</div></button><div class="card-tags">${r.tags.map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div><div class="card-bottom">${sourceLogo(first.source)}<span class="source-by">${esc(first.author)}</span>${bs.length>1?`<span class="source-count" title="${bs.length} sauvegardes de cette ressource">${icon('link') .replace('class="icon ','class="icon tiny ')} ${bs.length}</span>`:pending?'<span class="state-dot">À trier</span>':icon('check')}</div></article>`;
}
function createTab(id,kind,title,resourceId=null){
 const tab={id,kind,title,resourceId,state:{query:'',source:'all',topic:'all',triage:'active',mode:innerWidth<=900?'list':'canvas',manualMode:false,zoom:1,overview:false,expanded:false,positions:{}}};
 const panel=document.createElement('section');panel.id=`panel-${id}`;panel.className='view-panel';panel.role='tabpanel';panel.setAttribute('aria-labelledby',`tab-${id}`);panel.hidden=true;panel.tabIndex=0;workspace.append(panel);tab.panel=panel;tabs.push(tab);renderView(tab);return tab;
}
function renderTabs(){
 tablist.innerHTML=tabs.map(t=>`<div class="tab-slot ${t.kind!=='home'?'closable':''} ${t.id===active?'selected':''}" role="presentation"><button id="tab-${t.id}" class="tab-button" role="tab" aria-controls="panel-${t.id}" aria-selected="${t.id===active}" tabindex="${t.id===active?0:-1}" data-activate="${t.id}" title="${esc(t.title)}">${icon(t.kind==='home'?'home':t.kind==='library'?'library':t.kind==='new'?'plus':'file')}<span class="tab-name">${esc(t.title)}</span></button></div>`).join('');
 const closeLayer=$('#tab-close-layer');
 closeLayer.innerHTML=tabs.filter(t=>t.kind!=='home').map(t=>{const slot=$(`#tab-${t.id}`).parentElement;return `<button class="tab-close" style="left:${slot.offsetLeft+slot.offsetWidth-28}px" data-close="${t.id}" tabindex="${t.id===active?0:-1}" aria-label="Fermer l’onglet ${esc(t.title)}" title="Fermer cet onglet">×</button>`;}).join('');
 const tab=tabs.find(t=>t.id===active);$$('.nav-item').forEach(n=>n.classList.remove('active'));
 const nav=tab.kind==='home'?'home':tab.kind==='library'?(tab.state.triage==='pending'?'pending':tab.state.triage==='archived'?'archived':'library'):null;
 if(nav)$(`#nav-${nav}`).classList.add('active');
 $('#resource-count').textContent=resources.length;$('#pending-count').textContent=bookmarks.filter(b=>b.triage==='pending').length;
}
function activate(id,focusTab=false){
 if(!tabs.some(t=>t.id===id))return;active=id;tabs.forEach(t=>t.panel.hidden=t.id!==id);syncCanvasShell();renderTabs();
 const button=$(`#tab-${id}`);button.scrollIntoView({block:'nearest',inline:'nearest'});if(focusTab)button.focus({preventScroll:true});
}
function openResource(id){
 id=Number(id);const r=getResource(id);if(!r)return;
 let tab=tabs.find(t=>t.kind==='resource'&&t.resourceId===id);
 if(!tab){const current=tabs.find(t=>t.id===active);if(current.kind==='new'){current.kind='resource';current.resourceId=id;current.title=r.title;tab=current;renderView(tab);}else tab=createTab(`resource-${id}`,'resource',r.title,id);}
 activate(tab.id,true);
}
function openLibrary(opts={},focusSearch=false){let tab=tabs.find(t=>t.kind==='library');if(!tab)tab=createTab('library','library','Bibliothèque');Object.assign(tab.state,opts);renderView(tab);activate(tab.id);if(focusSearch)$(`#query-${tab.id}`).focus();else $(`#tab-${tab.id}`).focus({preventScroll:true});}
function closeTab(id){
 const idx=tabs.findIndex(t=>t.id===id);if(idx<0||tabs[idx].kind==='home')return;
 const wasActive=id===active,wasFocus=$('.tabs-row').contains(document.activeElement);tabs[idx].panel.remove();tabs.splice(idx,1);
 if(wasActive)activate(tabs[Math.min(idx,tabs.length-1)].id,true);else{renderTabs();if(wasFocus)$(`#tab-${active}`).focus({preventScroll:true});}
}
function renderView(tab){
 const panel=tab.panel,focus=panel.contains(document.activeElement)?document.activeElement:null,focusId=focus?.id,selection=focus instanceof HTMLInputElement?[focus.selectionStart,focus.selectionEnd]:null;
 const scrollTop=panel.scrollTop,frame=$('.board-frame',panel),list=$('.home-list',panel),canvasScroll=frame?[frame.scrollLeft,frame.scrollTop]:null,listScroll=list?.scrollTop;
 panel.className=`view-panel ${tab.kind==='home'?'home-panel':''}`;
 if(tab.kind==='home')panel.innerHTML=renderHome(tab);else if(tab.kind==='library')panel.innerHTML=renderLibrary(tab);else if(tab.kind==='resource')panel.innerHTML=renderResource(tab);else panel.innerHTML=renderNew(tab);
 if(tab.kind==='home')syncCanvasShell();
 panel.scrollTop=scrollTop;
 if(canvasScroll&&$('.board-frame',panel)){const f=$('.board-frame',panel);f.scrollLeft=canvasScroll[0];f.scrollTop=canvasScroll[1];}
 if(listScroll!==undefined&&$('.home-list',panel))$('.home-list',panel).scrollTop=listScroll;
 if(focus){const next=focusId?document.getElementById(focusId):null;if(next){next.focus({preventScroll:true});if(selection&&next instanceof HTMLInputElement&&selection[0]!==null)try{next.setSelectionRange(...selection);}catch{}}else $('h1',panel)?.focus({preventScroll:true});}
}
function refresh(){tabs.forEach(renderView);renderTabs();}
function renderHome(tab){
 const st=tab.state,visible=uniqueResources(matched(tab)),pending=bookmarks.filter(b=>b.triage==='pending').length;
 const heading=`<div class="page-heading"><div><div class="eyebrow"><i></i>Mercredi 9 septembre · aperçu fictif</div><h1 tabindex="-1">Le bureau des idées.</h1><p>${resources.length} ressources, ${new Set(bookmarks.filter(b=>b.source!=='manual').map(b=>b.source)).size} sources. De la curiosité aux connexions.</p></div><button class="heading-action" data-action="pending"><span class="pending-orbit">${icon('inbox')}</span><span><strong>${pending} sauvegarde${pending===1?'':'s'} à trier</strong><small>Un peu de place pour la suite.</small></span>${icon('arrow')}</button></div>`;
 const toolbar=`<div class="board-toolbar"><span class="board-title">${icon('layers')}Mes collections <span class="link-count">${visible.length}</span></span><label class="sr-only" for="home-source">Filtrer le bureau par source</label><select id="home-source" data-filter="source" data-tab="${tab.id}">${sourceOptions(st.source)}</select><div class="view-switch" aria-label="Présentation du bureau"><button data-mode="canvas" aria-pressed="${st.mode==='canvas'}">${icon('board')}Canvas</button><button data-mode="list" aria-pressed="${st.mode==='list'}">${icon('list')}Liste</button></div></div>`;
 const workbar=`<div class="canvas-workbar"><div class="canvas-workbar-title"><h1 tabindex="-1">Le bureau des idées.</h1><span>${visible.length} ressources · ${topics.length} collections</span></div><div class="canvas-workbar-actions"><button class="heading-action" data-action="pending">${icon('inbox')}<strong>${pending} à trier</strong></button><label class="sr-only" for="home-source">Filtrer le bureau par source</label><select id="home-source" data-filter="source" data-tab="${tab.id}">${sourceOptions(st.source)}</select><div class="view-switch" aria-label="Présentation du bureau"><button data-mode="canvas" aria-pressed="true">${icon('board')}Canvas</button><button data-mode="list" aria-pressed="false">${icon('list')}Liste</button></div><button class="button small canvas-expand" id="canvas-expand" data-action="expand-canvas" aria-pressed="${st.expanded}" title="${st.expanded?'Réduire le canvas (Échap)':'Agrandir le canvas dans la fenêtre'}">${icon(st.expanded?'collapse':'expand')}${st.expanded?'Réduire':'Agrandir'}</button></div></div>`;
 if(!visible.length)return (st.mode==='canvas'?workbar:heading+toolbar)+empty('Aucune ressource ici','Essaie une autre source pour retrouver tes idées.','Réinitialiser le filtre','reset-home');
 if(st.mode==='list')return heading+toolbar+`<div class="home-list"><div class="compact-grid">${visible.map(card).join('')}</div></div>`;
 const groups=topics.map(t=>{
  const rs=visible.filter(r=>r.topic===t.id),pos=st.positions[t.id]||t;
  return `<section class="topic-group ${t.color}" data-group="${t.id}" style="left:${pos.x}px;top:${pos.y}px" aria-labelledby="group-${t.id}"><div class="group-head"><span class="group-symbol">${icon(t.id==='design'?'spark':t.id==='ai'?'flask':'code')}</span><h2 id="group-${t.id}">${t.name}</h2><span class="count">${rs.length}</span><button class="icon-button group-move" id="move-${t.id}" data-move="${t.id}" aria-label="Déplacer le groupe ${t.name}" title="Glisser pour déplacer, ou cliquer pour les commandes">${icon('grip')}</button></div><p class="group-caption">${t.caption}</p><div class="group-stack">${rs.map((r,i)=>card(r)+(t.id==='ai'&&i===0?`<button class="group-note" data-action="edit-note" aria-label="Modifier la note d’exploration"><span class="eyebrow">${icon('note')} Note d’exploration</span><p>${esc(note)}</p><small>Note fictive · cliquer pour modifier</small></button>`:'')).join('')}${!rs.length?'<p class="group-caption">Aucune ressource pour cette source.</p>':''}</div><div class="group-footer"><button data-topic="${t.id}">Explorer ce sujet ${icon('arrow')}</button></div></section>`;
 }).join('');
 return workbar+`<div class="canvas-area"><div class="board-frame" id="canvas-viewport" tabindex="0" aria-label="Canvas de collections" aria-describedby="canvas-instructions"><div class="scene-sizer"><div class="board-world">${groups}</div></div></div><div class="canvas-footer"><div class="canvas-navigation"><label class="sr-only" for="canvas-jump">Aller à une collection</label><select id="canvas-jump"><option value="">Aller à une collection…</option>${topics.map(t=>`<option value="${t.id}">${t.name}</option>`).join('')}</select><span id="canvas-instructions">Glisse le fond pour naviguer. Clique sur une carte pour l’ouvrir.</span></div><div class="canvas-controls" aria-label="Outils du canvas"><button class="icon-button" id="zoom-out" data-zoom="out" aria-label="Dézoomer" title="Dézoomer">${icon('minus')}</button><button class="zoom-label" id="zoom-actual" data-zoom="actual" aria-label="Revenir à la taille de lecture, 100 %" title="Revenir à 100 %">${Math.round(st.zoom*100)} %</button><button class="icon-button" id="zoom-in" data-zoom="in" aria-label="Zoomer" title="Zoomer">${icon('plus')}</button><span class="divider"></span><button class="canvas-overview" id="zoom-fit" data-zoom="fit" aria-pressed="${st.overview}">${icon('fit')}Vue d’ensemble</button><button class="icon-button" id="zoom-reset" data-zoom="reset" aria-label="Réinitialiser la disposition" title="Ranger les groupes à leur place initiale">${icon('refresh')}</button></div></div></div>`;

}
function empty(title,description,label,action){return `<div class="empty-state">${icon('search')}<h2>${title}</h2><p>${description}</p>${label?`<button class="button" data-action="${action}">${label}</button>`:''}</div>`;}
function renderLibrary(tab){
 const st=tab.state,items=matched(tab),label=st.triage==='pending'?'À trier':st.triage==='archived'?'Les archives':'La bibliothèque';
 return `<div class="page-heading"><div><div class="eyebrow">${icon('library')}Le même espace, une autre vue</div><h1 tabindex="-1">${label}</h1><p>Retrouver une ressource, garder une idée, faire de la place.</p></div></div><div class="library-content"><div class="library-filters"><div class="search-field">${icon('search')}<label class="sr-only" for="query-${tab.id}">Rechercher dans la bibliothèque</label><input id="query-${tab.id}" data-query="${tab.id}" value="${esc(st.query)}" placeholder="Titre, idée, sujet ou auteur…" type="search" autocomplete="off"></div><label class="sr-only" for="source-${tab.id}">Source</label><select id="source-${tab.id}" data-filter="source" data-tab="${tab.id}">${sourceOptions(st.source)}</select><label class="sr-only" for="topic-${tab.id}">Sujet</label><select id="topic-${tab.id}" data-filter="topic" data-tab="${tab.id}">${topicOptions(st.topic)}</select><label class="sr-only" for="triage-${tab.id}">État des sauvegardes</label><select id="triage-${tab.id}" data-filter="triage" data-tab="${tab.id}">${[['active','Hors archives'],['all','Tous les états'],['pending','À trier'],['kept','Gardés'],['archived','Archivés']].map(([v,l])=>`<option value="${v}" ${st.triage===v?'selected':''}>${l}</option>`).join('')}</select></div><div class="results-meta"><span role="status">${items.length} sauvegarde${items.length===1?'':'s'} · ${uniqueResources(items).length} ressource${uniqueResources(items).length===1?'':'s'}</span><button data-action="reset-library">Effacer les filtres</button></div><div class="library-list">${items.length?items.map(b=>libraryRow(b,tab)).join(''):empty('Rien pour cette recherche','Change un mot ou enlève un filtre. Tes ressources sont toujours là.','Effacer les filtres','reset-library')}</div></div>`;
}
function triageActions(b,tab){
 const button=(state,label,primary=false)=>`<button class="button small ${primary?'primary':''}" id="triage-${tab.id}-${b.id}-${state}" data-bookmark="${b.id}" data-triage="${state}" aria-label="${label} la sauvegarde de ${esc(b.author)}">${label}</button>`;
 return b.triage==='pending'?button('kept','Garder',true)+button('archived','Archiver'):b.triage==='kept'?button('archived','Archiver'):button('pending','Restaurer');
}
function libraryRow(b,tab){const r=getResource(b.resourceId);return `<article class="library-row" data-bookmark-row="${b.id}"><div class="row-preview">${r.cover?art(r.cover,''):icon('file')}</div><div class="row-main"><button class="row-title" data-open="${r.id}">${esc(r.title)}</button><p>${esc(r.summary)}</p><div class="row-metadata">${sourceLogo(b.source)}<span>${esc(b.author)}</span><span>·</span><span>${r.kind} · ${r.duration}</span><span class="tag">${esc(topicBy(r.topic).name)}</span></div></div><div class="row-actions"><span class="triage-label">${stateName(b.triage)}</span>${triageActions(b,tab)}</div></article>`;}
function renderResource(tab){
 const r=getResource(tab.resourceId),bs=captures(r.id),topic=topicBy(r.topic);
 return `<article class="reader"><div class="reader-top"><button data-topic="${r.topic}">${icon('back')}${topic.name}</button><span>${r.kind} · ${r.duration}</span></div><div class="card-tags" style="padding:0">${r.tags.map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div><h1 class="reader-title" tabindex="-1">${esc(r.title)}</h1><p class="reader-intro">${esc(r.summary)}</p>${r.cover?art(r.cover,'reader-cover'):''}<div class="reader-grid"><div class="reader-content"><h2>Les idées à retenir</h2><p>${esc(r.summary)} Cette fiche de démonstration illustre la manière dont une ressource pourrait être résumée et reliée à ta bibliothèque.</p><ul><li>Partir d’une question concrète avant de choisir les outils.</li><li>Conserver le contexte et les limites de la source.</li><li>Relier cette lecture aux autres ressources du même sujet.</li></ul><div class="reader-note"><strong>Un point de départ pour explorer</strong><p>Ouvre une ressource liée dans un nouvel onglet. Tu pourras revenir ici sans perdre ta position de lecture.</p></div>${r.url?`<a class="button" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">Ouvrir le lien ajouté ${icon('arrow-up-right')}</a>`:''}<p class="demo-inline">Contenu fictif pour le prototype. Aucun article ni compte personnel n’est chargé.</p>${r.cover==='architecture'?'<p class="copyright">Photo illustrative : <a href="https://unsplash.com/photos/concrete-staircases-and-beams-create-an-architectural-design-uXmdRJFPjcs" target="_blank" rel="noopener noreferrer">Declan Sun / Unsplash</a>.</p>':''}</div><aside class="reader-aside"><section><h2>${bs.length} sauvegarde${bs.length===1?'':'s'} de cette ressource</h2>${bs.map(b=>`<div class="capture"><div class="capture-head">${sourceLogo(b.source)}<strong>${sources[b.source].name}</strong></div><p>${esc(b.author)} · ${b.date.split('-').reverse().join('/')}<br>${stateName(b.triage)}</p><div class="capture-actions">${triageActions(b,tab)}</div></div>`).join('')}</section><section class="related"><h2>À rapprocher</h2>${r.related.map(id=>getResource(id)).filter(Boolean).map(item=>`<button data-open="${item.id}">${esc(item.title)} ${icon('arrow-up-right')}</button>`).join('')}</section></aside></div></article>`;
}
function renderNew(tab){const q=normalize(tab.state.query),rs=resources.filter(r=>normalize(r.title+' '+r.tags.join(' ')).includes(q));return `<div class="launcher"><div class="eyebrow">${icon('plus')}Nouvel onglet</div><h1 tabindex="-1">Une nouvelle piste.</h1><p>Ouvre une ressource ou retrouve un sujet de ta bibliothèque.</p><div class="launch-actions"><button class="button" data-action="home">${icon('board')}Tableau de bord</button><button class="button" data-action="library">${icon('library')}Bibliothèque</button></div><div class="search-field">${icon('search')}<label for="query-${tab.id}" class="sr-only">Chercher une ressource à ouvrir</label><input id="query-${tab.id}" data-query="${tab.id}" placeholder="Chercher une ressource…" value="${esc(tab.state.query)}" autocomplete="off" type="search"></div>${rs.length?rs.map(r=>`<button class="launch-result" data-open="${r.id}">${icon('file')}<span>${esc(r.title)}</span><small>${r.kind}</small>${icon('arrow-up-right')}</button>`).join(''):empty('Aucune ressource trouvée','Essaie un titre ou un sujet différent.','','')}</div>`;}
function notify(message,undo=false){
 clearTimeout(toastTimer);$('#toast-text').textContent=message;$('#undo').hidden=!undo;$('#toast').hidden=false;
 if(!undo)toastTimer=setTimeout(()=>$('#toast').hidden=true,5000);
}
function changeTriage(id,state){const b=bookmarks.find(x=>x.id===Number(id));if(!b||b.triage===state)return;undoChange={id:b.id,from:b.triage,to:state};b.triage=state;refresh();notify(state==='kept'?'Sauvegarde gardée.':state==='archived'?'Sauvegarde archivée.':'Sauvegarde remise à trier.',true);}
function undo(){if(!undoChange)return;const b=bookmarks.find(x=>x.id===undoChange.id);if(b)b.triage=undoChange.from;undoChange=null;refresh();notify('Action annulée.');}
function openModal(title,body){modalOpener=document.activeElement;$('#modal-content').innerHTML=`<div class="modal-head"><h2 id="modal-title">${title}</h2><button class="icon-button" data-action="close-modal" aria-label="Fermer">${icon('close')}</button></div><div class="modal-body">${body}</div>`;modal.showModal();}
function closeModal(){modal.close();if(modalOpener?.isConnected)modalOpener.focus({preventScroll:true});else $(`#tab-${active}`).focus({preventScroll:true});}
function showSources(){openModal('Les sources de tes idées',`<p>Un aperçu de tes connexions et du budget d’enrichissement. Les données et la synchronisation sont simulées dans ce prototype.</p>${Object.entries(sources).filter(([id])=>id!=='manual').map(([id,s])=>`<div class="source-line">${sourceLogo(id)}<div><strong>${s.name}</strong><small>${bookmarks.filter(b=>b.source===id).length} sauvegardes dans la démo</small></div><span class="connection-note"><i></i>Connecté</span></div>`).join('')}<div class="cost-box"><p>Enrichissement · 30 derniers jours</p><strong>2,40 €</strong><div class="cost-meter"><span></span></div><div class="cost-details"><span>Budget : 10,00 €</span><span>Projection : 3,10 €</span></div><p style="margin-top:10px">Aujourd’hui : 0,18 € · valeurs fictives</p></div><p id="sync-result" role="status" style="margin-top:16px;margin-bottom:0">Dernière synchronisation simulée : 14:32.</p><div class="modal-footer"><button class="button" data-action="close-modal">Fermer</button><button class="button primary" data-action="sync">${icon('refresh')}Simuler une synchronisation</button></div>`);}
function showAdd(){openModal('Une idée à garder',`<p>Ajoute un lien au jeu de démonstration. Le contenu n’est pas téléchargé et reste uniquement dans cette session.</p><form id="add-form"><div class="form-field"><label for="add-url">Lien</label><input id="add-url" name="url" type="url" required placeholder="https://…" maxlength="2000"></div><div class="form-field"><label for="add-title">Titre</label><input id="add-title" name="title" required maxlength="180" placeholder="Ce qui a retenu ton attention"></div><div class="form-field"><label for="add-topic">Sujet</label><select id="add-topic" name="topic">${topics.map(t=>`<option value="${t.id}">${t.name}</option>`).join('')}</select></div><p class="form-error" id="add-error" role="alert"></p><div class="modal-footer"><button type="button" class="button" data-action="close-modal">Annuler</button><button class="button primary" type="submit">Ajouter au bureau</button></div></form>`);$('#add-url').focus();}
function showNote(){openModal('La note du laboratoire',`<form id="note-form"><div class="form-field"><label for="note-text">Ton idée du moment</label><textarea id="note-text" name="note" maxlength="180" required>${esc(note)}</textarea><small>180 caractères maximum · conservé dans cette session</small></div><div class="modal-footer"><button type="button" class="button" data-action="close-modal">Annuler</button><button type="submit" class="button primary">Enregistrer</button></div></form>`);$('#note-text').focus();}
function showMove(id){moveTopic=id;openModal('Déplacer le groupe',`<p>${topicBy(id).name}. Utilise les flèches pour déplacer le groupe sur le canvas, ou glisse sa poignée.</p><div class="move-controls"><button data-nudge="up" aria-label="Déplacer vers le haut">${icon('up')}</button><button data-nudge="left" aria-label="Déplacer vers la gauche">${icon('back')}</button><button data-nudge="reset" aria-label="Replacer ce groupe">${icon('refresh')}</button><button data-nudge="right" aria-label="Déplacer vers la droite">${icon('arrow')}</button><button data-nudge="down" aria-label="Déplacer vers le bas">${icon('down')}</button></div><p id="move-position" role="status"></p><div class="modal-footer"><button class="button primary" data-action="close-modal">Terminé</button></div>`);updateMovePosition();}
function getPosition(id){const home=tabs[0];return home.state.positions[id]||{x:topicBy(id).x,y:topicBy(id).y};}
function placeGroup(id,x,y){const home=tabs[0],pos={x:Math.max(0,Math.min(2400,Math.round(x))),y:Math.max(0,Math.min(2400,Math.round(y)))};home.state.positions[id]=pos;const group=$(`[data-group="${id}"]`,home.panel);if(group){group.style.left=pos.x+'px';group.style.top=pos.y+'px';sizeScene();}}
function syncCanvasShell(){
 const home=tabs[0];if(!home)return;
 $('.app-shell').classList.toggle('canvas-focus',active==='home'&&home.state.mode==='canvas'&&home.state.expanded);
 if(!home.panel.hidden)sizeScene();
}
function sizeScene(){
 const home=tabs[0],world=$('.board-world',home.panel),frame=$('.board-frame',home.panel);if(!world||home.panel.hidden)return;
 const groups=$$('[data-group]',world),width=Math.max(...groups.map(g=>g.offsetLeft+g.offsetWidth))+24,height=Math.max(...groups.map(g=>g.offsetTop+g.offsetHeight))+24;
 world.style.width=width+'px';world.style.height=height+'px';
 if(home.state.overview)home.state.zoom=Math.min(1,(frame.clientWidth-16)/width,(frame.clientHeight-16)/height);
 paintZoom();
}
function paintZoom(){
 const home=tabs[0],st=home.state,world=$('.board-world',home.panel);if(!world)return;
 $('.board-frame',home.panel).classList.toggle('is-overview',st.overview);world.style.transform=`scale(${st.zoom})`;const sizer=$('.scene-sizer',home.panel);sizer.style.width=world.offsetWidth*st.zoom+'px';sizer.style.height=world.offsetHeight*st.zoom+'px';
 $('#zoom-out').disabled=st.zoom<=.1;$('#zoom-in').disabled=st.zoom>=1.4;$('#zoom-actual').textContent=Math.round(st.zoom*100)+' %';$('#zoom-fit').setAttribute('aria-pressed',st.overview);$('#canvas-instructions').textContent=st.overview?'Vue d’ensemble. Choisis une collection pour revenir à la taille de lecture.':'Glisse le fond pour naviguer. Clique sur une carte pour l’ouvrir.';
}
function updateMovePosition(){const pos=getPosition(moveTopic);$('#move-position').textContent=`Position : ${pos.x}, ${pos.y}.`;}
function zoom(action){
 const home=tabs[0],st=home.state,frame=$('.board-frame',home.panel);if(!frame)return;
 const center={x:(frame.scrollLeft+frame.clientWidth/2-$('.scene-sizer',home.panel).offsetLeft)/st.zoom,y:(frame.scrollTop+frame.clientHeight/2)/st.zoom};
 st.overview=action==='fit';
 if(action==='reset'){st.zoom=1;st.positions={};renderView(home);$('.board-frame',home.panel).scrollTo(0,0);notify('Disposition initiale retrouvée.');return;}
 if(st.overview){sizeScene();frame.scrollTo(0,0);return;}
 st.zoom=action==='actual'?1:Math.max(.1,Math.min(1.4,Math.round((st.zoom+(action==='in'?.1:-.1))*100)/100));
 paintZoom();frame.scrollTo(center.x*st.zoom+$('.scene-sizer',home.panel).offsetLeft-frame.clientWidth/2,center.y*st.zoom-frame.clientHeight/2);
}
function jumpToGroup(id){
 const home=tabs[0],group=$(`[data-group="${id}"]`,home.panel);if(!group)return;
 home.state.overview=false;home.state.zoom=1;paintZoom();
 $('.board-frame',home.panel).scrollTo(Math.max(0,group.offsetLeft-24),Math.max(0,group.offsetTop-24));
 const target=$('h2',group);target.tabIndex=-1;target.focus({preventScroll:true});$('#canvas-jump').value='';
}
function expandCanvas(){const home=tabs[0];home.state.expanded=!home.state.expanded;renderView(home);renderTabs();$('#canvas-expand')?.focus({preventScroll:true});}
function onAction(action){
 if(action==='expand-canvas')expandCanvas();
 else if(action==='home')activate('home',true);
 else if(action==='library')openLibrary();
 else if(action==='pending')openLibrary({triage:'pending',query:'',source:'all',topic:'all'});
 else if(action==='archived')openLibrary({triage:'archived',query:'',source:'all',topic:'all'});
 else if(action==='search')openLibrary({},true);
 else if(action==='new-tab'){const tab=createTab(`new-${++counter}`,'new','Nouvel onglet');activate(tab.id);$(`#query-${tab.id}`).focus();}
 else if(action==='sources')showSources();else if(action==='add')showAdd();else if(action==='edit-note')showNote();
 else if(action==='close-modal')closeModal();else if(action==='undo')undo();else if(action==='dismiss-toast')$('#toast').hidden=true;
 else if(action==='reset-home'){tabs[0].state.source='all';renderView(tabs[0]);}
 else if(action==='reset-library'){openLibrary({query:'',source:'all',topic:'all',triage:'active'},true);}
 else if(action==='sync'){const button=$('[data-action="sync"]',modal);button.disabled=true;button.textContent='Synchronisation simulée…';$('#sync-result').textContent='Vérification fictive des quatre sources…';setTimeout(()=>{if(!button.isConnected)return;button.disabled=false;button.innerHTML=icon('refresh')+'Simuler une synchronisation';$('#sync-result').textContent='Simulation terminée. Tes sauvegardes et tes choix de tri sont conservés.';},900);}
}
document.addEventListener('click',event=>{
 const el=event.target.closest('button,a[data-action]');if(!el)return;
 if(el.dataset.action){event.preventDefault();onAction(el.dataset.action);}
 else if(el.dataset.open)openResource(el.dataset.open);
 else if(el.dataset.activate)activate(el.dataset.activate,true);
 else if(el.dataset.close)closeTab(el.dataset.close);
 else if(el.dataset.topic)openLibrary({topic:el.dataset.topic,source:'all',query:'',triage:'active'});
 else if(el.dataset.triage)changeTriage(el.dataset.bookmark,el.dataset.triage);
 else if(el.dataset.mode){const home=tabs[0];home.state.mode=el.dataset.mode;home.state.manualMode=true;renderView(home);$(`[data-mode="${el.dataset.mode}"]`,home.panel).focus({preventScroll:true});}
 else if(el.dataset.zoom)zoom(el.dataset.zoom);
 else if(el.dataset.move){if(suppressMoveClick){suppressMoveClick=false;return;}showMove(el.dataset.move);}
 else if(el.dataset.nudge){const pos=getPosition(moveTopic),dir=el.dataset.nudge;if(dir==='reset')placeGroup(moveTopic,topicBy(moveTopic).x,topicBy(moveTopic).y);else placeGroup(moveTopic,pos.x+(dir==='left'?-24:dir==='right'?24:0),pos.y+(dir==='up'?-24:dir==='down'?24:0));updateMovePosition();}
});
document.addEventListener('change',event=>{const el=event.target;if(el.id==='canvas-jump'){jumpToGroup(el.value);return;}if(el.dataset.filter){const tab=tabs.find(t=>t.id===el.dataset.tab);tab.state[el.dataset.filter]=el.value;renderView(tab);renderTabs();}});
document.addEventListener('input',event=>{const el=event.target;if(el.id==='note-text')el.setCustomValidity('');if(el.dataset.query){const tab=tabs.find(t=>t.id===el.dataset.query);tab.state.query=el.value;renderView(tab);}});
document.addEventListener('submit',event=>{
 if(event.target.id==='note-form'){event.preventDefault();const val=$('#note-text').value.trim();if(!val){$('#note-text').setCustomValidity('Écris une idée avant d’enregistrer.');$('#note-text').reportValidity();return;}note=val;closeModal();renderView(tabs[0]);notify('Note mise à jour.');}
 if(event.target.id==='add-form'){event.preventDefault();const title=$('#add-title').value.trim(),value=$('#add-url').value.trim();let url;try{url=new URL(value);if(!['https:','http:'].includes(url.protocol)||url.username||url.password)throw Error();}catch{$('#add-error').textContent='Utilise un lien http ou https sans identifiants.';$('#add-url').focus();return;}if(!title){$('#add-error').textContent='Ajoute un titre pour retrouver cette ressource.';$('#add-title').focus();return;}
 const found=resources.find(r=>r.url===url.href);if(found){closeModal();openResource(found.id);notify('Ce lien est déjà dans le bureau.');return;}
 const id=Math.max(...resources.map(r=>r.id))+1,topic=$('#add-topic').value;resources.push({id,title,summary:'Lien ajouté manuellement dans le prototype. Son contenu n’a pas été chargé.',topic,tags:[topicBy(topic).name],kind:'Lien',duration:'Ajout manuel',cover:null,related:[],url:url.href});bookmarks.push({id:Math.max(...bookmarks.map(b=>b.id))+1,resourceId:id,source:'manual',author:'Ajout personnel',triage:'pending',date:'2026-09-09'});closeModal();refresh();openResource(id);notify('Lien ajouté au bureau, prêt à trier.');}
});
modal.addEventListener('cancel',event=>{event.preventDefault();closeModal();});
document.addEventListener('keydown',event=>{
 if(event.target.closest('[role="tablist"]')&&event.target.getAttribute('role')==='tab'){
  const id=event.target.dataset.activate,idx=tabs.findIndex(t=>t.id===id);let next;
  if(event.key==='ArrowRight')next=(idx+1)%tabs.length;else if(event.key==='ArrowLeft')next=(idx-1+tabs.length)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;
  if(next!==undefined){event.preventDefault();activate(tabs[next].id,true);}else if(event.key==='Delete'){event.preventDefault();closeTab(id);}
 }
 if(event.key==='Escape'&&!modal.open&&active==='home'&&tabs[0].state.mode==='canvas'&&tabs[0].state.expanded){event.preventDefault();expandCanvas();}
 if(event.key==='/'&&!event.metaKey&&!event.ctrlKey&&!event.altKey&&!modal.open&&!event.target.closest('input,textarea,select,[contenteditable]')){event.preventDefault();openLibrary({},true);}
});
document.addEventListener('pointerdown',event=>{
 if(event.button!==0)return;
 const handle=event.target.closest('[data-move]');
 if(handle){const pos=getPosition(handle.dataset.move);tabs[0].state.overview=false;paintZoom();drag={id:handle.dataset.move,handle,pointerId:event.pointerId,sx:event.clientX,sy:event.clientY,x:pos.x,y:pos.y,moved:false};handle.setPointerCapture(event.pointerId);return;}
 const frame=event.target.closest('.board-frame');
 // Touch keeps native scrolling; cards and group controls retain their usual clicks.
 if(frame&&!event.target.closest('.topic-group')&&event.pointerType!=='touch'){
  pan={frame,pointerId:event.pointerId,sx:event.clientX,sy:event.clientY,x:frame.scrollLeft,y:frame.scrollTop};frame.setPointerCapture(event.pointerId);frame.classList.add('panning');event.preventDefault();frame.focus({preventScroll:true});
 }
});
document.addEventListener('pointermove',event=>{
 if(pan&&event.pointerId===pan.pointerId){pan.frame.scrollTo(pan.x-(event.clientX-pan.sx),pan.y-(event.clientY-pan.sy));return;}
 if(!drag||event.pointerId!==drag.pointerId)return;const dx=event.clientX-drag.sx,dy=event.clientY-drag.sy;if(Math.abs(dx)+Math.abs(dy)>5)drag.moved=true;if(drag.moved){event.preventDefault();placeGroup(drag.id,drag.x+dx/tabs[0].state.zoom,drag.y+dy/tabs[0].state.zoom);}
});
function finishPointer(event){
 if(pan&&event.pointerId===pan.pointerId){pan.frame.classList.remove('panning');pan=null;}
 if(!drag||event.pointerId!==drag.pointerId)return;
 if(event.type==='pointercancel')placeGroup(drag.id,drag.x,drag.y);
 else if(drag.moved){suppressMoveClick=true;setTimeout(()=>suppressMoveClick=false,100);notify('Groupe déplacé.');}
 drag=null;
}
document.addEventListener('pointerup',finishPointer);
document.addEventListener('pointercancel',finishPointer);
let resizeTimer;addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{renderTabs();const home=tabs[0];if(!home.state.manualMode){const mode=innerWidth<=900?'list':'canvas';if(home.state.mode!==mode){home.state.mode=mode;renderView(home);}}syncCanvasShell();},100);});
hydrate();createTab('home','home','Tableau de bord');createTab('library','library','Bibliothèque');createTab('resource-1','resource','Faire de la place à ce qui compte',1);activate('home');
})();
