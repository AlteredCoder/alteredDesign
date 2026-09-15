(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const icons = {
    overview:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    home:'<path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 21v-8h6v8"/>',
    inbox:'<path d="M4 4h16l2 12v4H2v-4z"/><path d="M2 15h6l2 3h4l2-3h6"/>',
    library:'<path d="M4 4v16M9 4v16M14 4v16M18 4l3 16"/>',
    bookmark:'<path d="M6 3h12v18l-6-4-6 4z"/>',
    archive:'<rect x="3" y="3" width="18" height="5" rx="1"/><path d="M5 8v13h14V8M10 12h4"/>',
    layers:'<path d="m12 3 10 5-10 5L2 8zM2 12l10 5 10-5M2 16l10 5 10-5"/>',
    settings:'<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="9" cy="6" r="2" fill="currentColor" stroke="none"/><circle cx="16" cy="12" r="2" fill="currentColor" stroke="none"/><circle cx="7" cy="18" r="2" fill="currentColor" stroke="none"/>',
    plug:'<path d="M8 3v5M16 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4"/>',
    search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
    close:'<path d="m6 6 12 12M6 18 18 6"/>',
    'chevron-down':'<path d="m7 10 5 5 5-5"/>',
    'chevron-right':'<path d="m9 6 6 6-6 6"/>',
    'arrow-right':'<path d="M4 12h16m-6-6 6 6-6 6"/>',
    'arrow-up-right':'<path d="M6 18 18 6M6 6h12v12"/>',
    refresh:'<path d="M20 7v5h-5M4 17v-5h5"/><path d="M6 7a7 7 0 0 1 12-2l2 3M4 16l2 3a7 7 0 0 0 12-2"/>',
    cross:'<circle cx="8" cy="12" r="5"/><circle cx="16" cy="12" r="5"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    sort:'<path d="M8 4v16m-4-4 4 4 4-4M16 20V4m-4 4 4-4 4 4"/>',
    'check-circle':'<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
    check:'<path d="m5 12 4 4L19 6"/>',
    menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
    folder:'<path d="M3 6a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v10H3z"/>',
    code:'<path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18"/>',
    spark:'<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z"/>',
    book:'<path d="M12 5v16M3 3l9 2 9-2v16l-9 2-9-2z"/>',
    leaf:'<path d="M20 3C5 2 2 9 5 16s16 4 15-13ZM5 20 15 9"/>',
    x:'<path d="M5 4h4l10 16h-4zM19 4 5 20"/>',
    reddit:'<circle cx="7" cy="13" r="1" fill="currentColor"/><circle cx="16" cy="13" r="1" fill="currentColor"/><path d="M7 17c2 2 6 2 8 0M12 9l1-5 5 1"/><ellipse cx="12" cy="14" rx="9" ry="6"/><circle cx="19" cy="5" r="2"/>',
    youtube:'<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none"/>',
    discord:'<path d="M7 5 4 6 2 18l5 2 1-2h8l1 2 5-2-2-12-3-1-1 2H8z"/><circle cx="8" cy="13" r="1" fill="currentColor"/><circle cx="16" cy="13" r="1" fill="currentColor"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v.2"/>',
    restore:'<path d="M4 4v6h6M4 10a8 8 0 1 1 1 8"/>'
  };
  const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.book}</svg>`;
  const paintIcons = () => $$('[data-icon]').forEach(el => { el.innerHTML = icon(el.dataset.icon); el.setAttribute('aria-hidden','true'); });
  const names = {x:'X',reddit:'Reddit',youtube:'YouTube',discord:'Discord'};
  const stateNames = {pending:'À trier',kept:'Gardé',archived:'Archivé'};
  const topics = [
    {name:'Design',label:'Design d’interface',icon:'overview',color:''},
    {name:'Développement',label:'Développement',icon:'code',color:'blue'},
    {name:'Intelligence artificielle',label:'Intelligence artificielle',icon:'spark',color:'purple'},
    {name:'Local-first',label:'Local-first',icon:'leaf',color:'amber'}
  ];
  let items = window.XDEX_DEMO.map(item => ({...item,tags:[...item.tags]}));
  let source = 'all';
  let sorting = 'recent';
  let query = '';
  let page = 'overview';
  let topic = '';
  let undo = null;
  let syncing = false;
  let syncTimer = null;
  let lastSync = 'il y a 12 min';
  const dialogTriggers = new WeakMap();
  const counts = () => ({pending:items.filter(x=>x.triage==='pending').length,kept:items.filter(x=>x.triage==='kept').length,archived:items.filter(x=>x.triage==='archived').length,crossed:items.filter(x=>x.crossed>1).length});
  const sourceMark = key => `<span class="source-mark ${key}" role="img" aria-label="Source : ${names[key]}">${icon(key)}</span>`;
  const fold = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('fr');
  const match = (item, term) => fold([item.title,item.summary,item.author,names[item.source],...item.tags].join(' ')).includes(fold(term.trim()));
  const date = value => new Date(value).toLocaleDateString('fr-FR',{day:'numeric',month:'short'});
  const dayLabel = value => value.startsWith('2026-09-09') ? 'Aujourd’hui' : value.startsWith('2026-09-08') ? 'Hier' : date(value);
  function order(list) {
    return [...list].sort((a,b)=>sorting==='crossed' ? b.crossed-a.crossed || b.date.localeCompare(a.date) : sorting==='oldest' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date));
  }
  function filtered(list) { return order(list.filter(item => (source==='all'||item.source===source) && (!topic||item.tags.includes(topic)) && (!query||match(item,query)))); }
  function filters(list) {
    return `<div class="section-controls" role="group" aria-label="Filtrer par source">${['all','x','reddit','youtube','discord'].map(key => `<button class="filter-button" data-source="${key}" aria-pressed="${source===key}">${key==='all'?'Tout':names[key]}${key==='all'?`<span class="filter-count">${list.length}</span>`:''}</button>`).join('')}<label class="sort-control">${icon('sort')}<span class="sr-only">Ordre des ressources</span><select data-sort><option value="recent" ${sorting==='recent'?'selected':''}>Plus récentes</option><option value="oldest" ${sorting==='oldest'?'selected':''}>Plus anciennes</option><option value="crossed" ${sorting==='crossed'?'selected':''}>Plus croisées</option></select></label></div>`;
  }
  function resource(item, {triage=false}={}) {
    return `<article class="resource-row" data-row="${item.id}">
      ${sourceMark(item.source)}
      <div class="resource-body"><button class="resource-title" data-detail="${item.id}">${esc(item.title)}</button><p class="resource-summary">${esc(item.summary)}</p>
      <div class="resource-meta"><span class="author-meta">${esc(item.author)}</span><span class="meta-dot author-meta">·</span><span>${dayLabel(item.date)}</span>${item.tags.slice(0,1).map(tag=>`<button class="tag" data-topic="${esc(tag)}">${esc(tag)}</button>`).join('')}${item.crossed>1?`<span class="crossed" title="Référencée par ${item.crossed} signets">${icon('cross')} Croisé ${item.crossed}×</span>`:''}</div></div>
      <div class="row-actions">${triage ? `<button class="button keep-button" data-triage="kept" data-id="${item.id}" aria-label="Garder : ${esc(item.title)}">${icon('bookmark')} Garder</button><button class="icon-button" data-triage="archived" data-id="${item.id}" aria-label="Archiver : ${esc(item.title)}" title="Archiver">${icon('archive')}</button>` : item.triage==='archived' ? `<button class="button secondary" data-triage="pending" data-id="${item.id}" aria-label="Remettre à trier : ${esc(item.title)}">${icon('restore')} Restaurer</button>` : `<button class="icon-button" data-triage="archived" data-id="${item.id}" aria-label="Archiver : ${esc(item.title)}" title="Archiver">${icon('archive')}</button>`}</div>
    </article>`;
  }
  function empty(isInbox=false) {
    const hasFilter = source!=='all'||query||topic;
    return `<div class="empty-state"><span class="empty-icon">${icon(hasFilter?'search':isInbox?'check':'archive')}</span><h3>${hasFilter?'Aucun résultat':isInbox?'Tout est trié.':'Rien ici pour le moment.'}</h3><p>${hasFilter?'Essayez une autre recherche ou retirez les filtres.':isInbox?'Les bonnes idées sont dans votre bibliothèque. Vous pouvez passer à autre chose.':'Les ressources apparaîtront ici au fil de votre tri.'}</p>${hasFilter?'<button class="button secondary" data-action="clear-filters">Effacer les filtres</button>':isInbox?'<a class="button secondary" href="#library">Ouvrir la bibliothèque</a>':''}</div>`;
  }
  function overview() {
    const c = counts();
    const inbox = items.filter(x=>x.triage==='pending');
    const rows = filtered(inbox);
    return `<div class="page-heading"><div><p class="eyebrow">MERCREDI 9 SEPTEMBRE</p><h1>Bonjour, Kevin.</h1><p class="page-description">${c.pending?`${c.pending} nouvelles ressources vous attendent. Faites de la place aux bonnes idées.`:'Tout est trié. Vos bonnes idées sont à portée de main.'}</p></div><div class="heading-actions"><button class="button secondary ${syncing?'syncing':''}" data-action="sync" ${syncing?'disabled':''}>${icon('refresh')}<span>${syncing?'Synchronisation…':'Synchroniser'}</span></button></div></div>
      <section class="metrics" aria-label="Votre index en chiffres">
        <div class="metric"><strong class="metric-value">${items.length}</strong><div><div class="metric-label">Ressources indexées</div><span class="metric-note">${c.kept} dans la bibliothèque</span></div></div>
        <div class="metric"><strong class="metric-value">${c.pending.toString().padStart(2,'0')}</strong><div><div class="metric-label">À trier</div><span class="metric-note">${c.pending?'À votre rythme':'Tout est à jour'}</span></div></div>
        <div class="metric"><strong class="metric-value">${c.crossed.toString().padStart(2,'0')}</strong><div><div class="metric-label">Ressources croisées</div><span class="metric-note">Retrouvées plusieurs fois</span></div></div>
      </section>
      <div class="dashboard-grid"><div class="primary-column"><section class="triage-section" aria-labelledby="triage-title"><div class="section-heading"><h2 id="triage-title">Un peu de tri</h2><span class="count-pill">${c.pending}</span><a class="button primary triage-link" href="#inbox">Tout voir ${icon('arrow-right')}</a></div><p class="section-description">Les résumés sont prêts. Gardez ce qui mérite une place.</p>${filters(inbox)}<div id="resource-list">${rows.length?rows.slice(0,4).map(x=>resource(x,{triage:true})).join(''):empty(true)}</div>${rows.length?`<div class="list-footer"><span>${Math.min(rows.length,4)} sur ${rows.length} ressource${rows.length>1?'s':''}</span><a class="text-link" href="#inbox">Continuer le tri ${icon('arrow-right')}</a></div>`:''}</section>${recent()}</div><aside class="supporting-column" aria-label="Votre bibliothèque et vos sources">${supporting()}</aside></div>`;
  }
  function recent() {
    const recentItems = items.filter(x=>x.triage==='kept').sort((a,b)=>(b.keptAt||b.date).localeCompare(a.keptAt||a.date)).slice(0,2);
    if(!recentItems.length) return '';
    return `<section class="recent-section" aria-labelledby="recent-title"><div class="section-heading"><h2 id="recent-title">Gardés récemment</h2><a class="text-link" href="#library">Bibliothèque ${icon('arrow-right')}</a></div><div class="recent-grid">${recentItems.map(item=>`<button class="recent-card" data-detail="${item.id}"><span class="recent-symbol ${item.cover}">${icon(item.cover==='local'?'layers':item.cover==='code'?'code':'book')}</span><span><strong>${esc(item.title)}</strong><small>${names[item.source]} · ${item.kind.split(' · ')[0]}</small></span></button>`).join('')}</div></section>`;
  }
  function supporting() {
    return `<section aria-labelledby="topics-title"><div class="aside-heading"><h2 id="topics-title">Vos sujets</h2><a class="icon-button" href="#library" aria-label="Explorer tous les sujets">${icon('arrow-up-right')}</a></div>${topics.slice(0,3).map(t=>`<a class="topic-card" href="#library?topic=${encodeURIComponent(t.name)}"><span class="topic-symbol ${t.color}">${icon(t.icon)}</span><span><span class="topic-name">${t.label}</span><span class="topic-count">${items.filter(x=>x.triage==='kept'&&x.tags.includes(t.name)).length} ressources gardées</span></span>${icon('chevron-right')}</a>`).join('')}</section>
      <section class="sources-section" aria-labelledby="sources-title"><div class="aside-heading"><h2 id="sources-title">Sources connectées</h2><button class="icon-button" data-action="sources" aria-label="Gérer les sources">${icon('settings')}</button></div>${Object.entries(names).map(([key,name])=>`<div class="source-status">${sourceMark(key)}<span>${name}</span><span class="status-text"><span class="connected-dot"></span>Connecté</span></div>`).join('')}<p class="source-footnote">${icon('clock')} Dernière synchro ${lastSync}</p></section>
      <section class="budget-card" aria-labelledby="budget-title"><div class="aside-heading"><h2 id="budget-title">Un budget sous contrôle</h2><span class="budget-period">30 jours</span></div><div class="budget-line"><strong class="budget-amount">4,28 $</strong><span class="budget-total">/ 10,00 $</span></div><progress class="budget-track" value="4.28" max="10" aria-label="4,28 dollars utilisés sur un budget de 10 dollars"></progress><div class="budget-caption"><span>43 % du budget utilisé</span><span>5,72 $ disponibles</span></div><button class="text-link" data-action="costs">Voir le détail ${icon('arrow-right')}</button></section>`;
  }
  function collection() {
    const definitions = {
      inbox:{title:'À trier',description:'Gardez ce qui vous sera utile. Archivez le reste, sans le perdre.',state:'pending',eyebrow:'VOTRE VEILLE'},
      library:{title:topic||'Bibliothèque',description:'Les ressources que vous avez choisi de garder, faciles à retrouver.',state:'kept',eyebrow:'LES IDÉES QUI RESTENT'},
      archive:{title:'Archives',description:'Mises de côté, toujours accessibles. Vous pouvez les remettre à trier.',state:'archived',eyebrow:'RIEN N’EST PERDU'}
    };
    const d = definitions[page];
    const base = items.filter(x=>x.triage===d.state);
    const list = filtered(base);
    return `<div class="page-heading"><div><p class="eyebrow">${d.eyebrow}</p><h1>${esc(d.title)}</h1><p class="page-description">${d.description}</p></div><a class="text-link" href="#overview">Vue d’ensemble ${icon('arrow-right')}</a></div>
      <div class="library-toolbar"><label class="inline-search">${icon('search')}<span class="sr-only">Filtrer les ressources affichées</span><input id="library-query" type="search" placeholder="Filtrer les ressources…" autocomplete="off" value="${esc(query)}"></label>${topic?`<button class="active-filter" data-action="clear-topic" aria-label="Retirer le filtre ${esc(topic)}">${esc(topic)} ${icon('close')}</button>`:''}</div>
      ${filters(base)}<p class="results-label" role="status">${list.length} ressource${list.length>1?'s':''}${topic?' dans ce sujet':''}</p><div id="resource-list" class="library-list">${list.length?list.map(x=>resource(x,{triage:page==='inbox'})).join(''):empty(page==='inbox')}</div>`;
  }
  function parseRoute() {
    const [route,params] = location.hash.slice(1).split('?');
    page = ['overview','inbox','library','archive'].includes(route)?route:'overview';
    topic = page==='library' ? (new URLSearchParams(params||'').get('topic')||'') : '';
  }
  function render({restoreFocus=null}={}) {
    const active = document.activeElement;
    const searchFocused = active?.id==='library-query';
    const cursor = searchFocused ? active.selectionStart : null;
    $('#main').innerHTML = page==='overview'?overview():collection();
    const c = counts();
    $$('[data-count]').forEach(el=>el.textContent=c[el.dataset.count]);
    $$('[data-nav]').forEach(el=>{if(el.dataset.nav===page)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');});
    $('#breadcrumb-current').textContent = {overview:'Vue d’ensemble',inbox:'À trier',library:'Bibliothèque',archive:'Archives'}[page];
    document.title = `${$('#breadcrumb-current').textContent} — xdex`;
    paintIcons();
    if(searchFocused && $('#library-query')) { $('#library-query').focus(); try{$('#library-query').setSelectionRange(cursor,cursor);}catch{} }
    if(restoreFocus) $(restoreFocus)?.focus({preventScroll:true});
  }
  function openDialog(id,trigger) {
    const dialog = $('#'+id);
    if(dialog.open) return;
    dialogTriggers.set(dialog, trigger || document.activeElement);
    dialog.showModal();
  }
  function closeDialog(id) { const dialog=$('#'+id); if(dialog.open) dialog.close(); }
  function showDetail(id,trigger) {
    const item = items.find(x=>x.id===Number(id));
    if(!item)return;
    const dialog = $('#detail-dialog');
    dialog.dataset.item = item.id;
    dialog.innerHTML = `<div class="dialog-top"><span class="dialog-top-label">${sourceMark(item.source)}${names[item.source]}<span>·</span>${item.kind}</span><button class="icon-button" data-close="detail-dialog" aria-label="Fermer la ressource" autofocus>${icon('close')}</button></div>
      <div class="dialog-content"><h2 id="detail-title">${esc(item.title)}</h2><p class="detail-meta">${esc(item.author)} · Enregistré le ${date(item.date)}</p><div class="detail-tags">${item.tags.map(t=>`<button class="tag" data-topic="${esc(t)}">${esc(t)}</button>`).join('')}</div><section class="detail-section"><h3>En quelques mots</h3><p>${esc(item.summary)}</p></section><section class="detail-section"><h3>Pourquoi le garder</h3><p>Une piste à retrouver lors de votre prochain projet ${item.tags.includes('Design')?'d’interface':item.tags.includes('Développement')?'de développement':'ou de votre prochaine recherche'}. Les sujets associés permettent de la relier au reste de votre bibliothèque.</p></section>${item.crossed>1?`<p class="detail-note">Retrouvé dans ${item.crossed} signets : cette ressource revient dans votre veille.</p>`:''}<p class="detail-meta">Ressource fictive créée pour cette maquette.</p></div>
      <div class="detail-actions">${item.triage!=='kept'?`<button class="button primary" data-triage="kept" data-id="${item.id}">${icon('bookmark')}Garder</button>`:''}${item.triage!=='archived'?`<button class="button secondary" data-triage="archived" data-id="${item.id}">${icon('archive')}Archiver</button>`:`<button class="button secondary" data-triage="pending" data-id="${item.id}">${icon('restore')}Remettre à trier</button>`}<span class="detail-state">${stateNames[item.triage]}</span></div>`;
    openDialog('detail-dialog',trigger);
  }
  function notify(message,{canUndo=false}={}) {
    $('#notice-text').textContent = message;
    $('#undo-button').hidden = !canUndo;
    $('#notification').hidden = false;
  }
  function triage(id,next) {
    const item=items.find(x=>x.id===Number(id));
    if(!item||item.triage===next)return;
    undo={id:item.id,state:item.triage,keptAt:item.keptAt};
    item.triage=next;
    if(next==='kept')item.keptAt=new Date().toISOString();
    const row=$(`[data-row="${id}"]`);
    const nextRow=row?.nextElementSibling?.dataset.row || row?.previousElementSibling?.dataset.row;
    const detailWasOpen=$('#detail-dialog').open;
    render();
    const nextButton=nextRow?$(`[data-row="${nextRow}"] [data-detail]`):$('#resource-list [data-detail]');
    const focusTarget=nextButton||$('#main');
    if(detailWasOpen){dialogTriggers.set($('#detail-dialog'),focusTarget);closeDialog('detail-dialog');}
    focusTarget.focus({preventScroll:true});
    notify(next==='kept'?'Ressource ajoutée à la bibliothèque.':next==='archived'?'Ressource déplacée dans les archives.':'Ressource remise dans « À trier ».',{canUndo:true});
  }
  function undoTriage() {
    if(!undo)return;
    const item=items.find(x=>x.id===undo.id);
    item.triage=undo.state;item.keptAt=undo.keptAt;
    const id=undo.id;undo=null;
    render();
    notify('Dernière action annulée.');
    const target=$(`[data-detail="${id}"]`)||$('#main');target.focus({preventScroll:true});
  }
  function searchResults() {
    const term=$('#global-query').value;
    const matches=order(items.filter(item=>match(item,term)));
    $('#search-results').innerHTML=matches.length?matches.slice(0,12).map(item=>`<button class="search-result" data-search-detail="${item.id}">${sourceMark(item.source)}<span class="search-result-body"><strong>${esc(item.title)}</strong><small>${names[item.source]} · ${stateNames[item.triage]} · ${esc(item.tags[0])}</small></span>${icon('arrow-up-right')}</button>`).join(''):`<div class="empty-state"><span class="empty-icon">${icon('search')}</span><h3>Aucune ressource trouvée</h3><p>Essayez un autre mot ou un sujet plus général.</p></div>`;
    $('#search-count').textContent=`${matches.length} résultat${matches.length>1?'s':''}${matches.length>12?' · 12 affichés':''}`;
  }
  function showSearch(trigger) { $('#global-query').value='';searchResults();openDialog('search-dialog',trigger);$('#global-query').focus(); }
  function utility(kind,trigger) {
    let title,content,footer;
    if(kind==='sources') {
      title='Vos sources';
      content=`<p>Les signets de vos espaces préférés, réunis dans une seule bibliothèque.</p>${Object.entries(names).map(([key,name])=>`<div class="source-status">${sourceMark(key)}<span class="source-status-name"><strong>${name}</strong><small>${items.filter(x=>x.source===key).length} ressources dans l’index</small></span><span class="status-text"><span class="connected-dot"></span>Connecté</span></div>`).join('')}<p style="margin-top:20px">Connexions simulées pour la maquette. Aucun compte réel n’est connecté.</p>`;
      footer='<button class="button secondary" data-close="utility-dialog">Fermer</button>';
    } else if(kind==='costs') {
      title='Votre budget';
      const bars=[12,23,18,36,30,17,45,29,22,50,35,20,38,48,28,40,32,24,49,36,18,30,26,16,39,27,41,20,35,25];
      content=`<p>Un aperçu des dépenses liées à l’indexation et aux résumés. Tous les montants sont des exemples.</p><div class="budget-line"><strong class="budget-amount">4,28 $</strong><span class="budget-total">sur les 30 derniers jours</span></div><div class="cost-chart" role="img" aria-label="Répartition illustrative des dépenses sur les trente derniers jours, total 4,28 dollars">${bars.map(n=>`<span style="height:${n}px"></span>`).join('')}</div><div class="chart-labels"><span>11 août</span><span>9 septembre</span></div><dl class="cost-breakdown"><div><dt>Résumés Claude</dt><dd>3,58 $</dd></div><div><dt>Signets X</dt><dd>0,70 $</dd></div><div><dt>Budget mensuel</dt><dd>10,00 $</dd></div><div><dt>Disponible</dt><dd>5,72 $</dd></div></dl><p>Projection illustrative sur 30 jours : <strong>5,12 $</strong>.</p>`;
      footer='<button class="button secondary" data-close="utility-dialog">Fermer</button>';
    } else {
      title='Préférences';
      content=`<p>Un espace sobre, adapté à votre façon de parcourir les ressources.</p><div class="preference-row"><label for="compact">Affichage compact<small>Réduire l’espace entre les ressources et masquer leurs résumés dans les listes.</small></label><input id="compact" type="checkbox" ${document.body.classList.contains('compact')?'checked':''}></div><div class="preference-row"><div><strong style="font-size:12px;font-weight:500">Recommencer la démonstration</strong><small>Rétablir le tri et les filtres de départ.</small></div><button class="button secondary" data-action="reset">Réinitialiser</button></div>`;
      footer='<button class="button primary" data-close="utility-dialog">Terminé</button>';
    }
    $('#utility-dialog').innerHTML=`<div class="dialog-top"><h2 id="utility-title">${title}</h2><button class="icon-button" data-close="utility-dialog" aria-label="Fermer" autofocus>${icon('close')}</button></div><div class="dialog-content">${content}</div><div class="utility-footer">${footer}</div>`;
    openDialog('utility-dialog',trigger);
  }
  function sync() {
    if(syncing)return;
    syncing=true;render();
    notify('Synchronisation de démonstration en cours…');
    syncTimer=setTimeout(()=>{syncing=false;lastSync='à l’instant';render();notify('Synchronisation terminée. Vos 4 sources sont à jour.');},1400);
  }
  function clearFilters() {
    source='all';query='';sorting='recent';
    if(topic){topic='';location.hash='#library';}else render();
  }
  function reset() {
    clearTimeout(syncTimer);syncing=false;lastSync='il y a 12 min';
    items=window.XDEX_DEMO.map(item=>({...item,tags:[...item.tags]}));
    undo=null;source='all';query='';sorting='recent';topic='';
    document.body.classList.remove('compact');
    $$('dialog[open]').forEach(dialog=>dialog.close());
    if(location.hash!=='#overview')location.hash='#overview';else {page='overview';render();}
    notify('La démonstration a été réinitialisée.');
  }
  $('#topic-nav').innerHTML=topics.map(t=>`<a href="#library?topic=${encodeURIComponent(t.name)}"><span class="topic-dot ${t.color}"></span>${t.name==='Intelligence artificielle'?'Intelligence artificielle':t.label}</a>`).join('');
  document.addEventListener('click',event=>{
    const el=event.target.closest('button,a');if(!el)return;
    if(el.dataset.close){closeDialog(el.dataset.close);return;}
    if(el.dataset.searchDetail){const original=$('[data-action="search"]');closeDialog('search-dialog');showDetail(el.dataset.searchDetail,original);return;}
    if(el.dataset.detail){showDetail(el.dataset.detail,el);return;}
    if(el.dataset.triage){triage(el.dataset.id,el.dataset.triage);return;}
    if(el.dataset.source){source=el.dataset.source;render({restoreFocus:`[data-source="${source}"]`});return;}
    if(el.dataset.topic){$$('dialog[open]').forEach(d=>d.close());location.hash='#library?topic='+encodeURIComponent(el.dataset.topic);return;}
    if(el.tagName==='A'&&el.getAttribute('href')?.startsWith('#')){$$('dialog[open]').forEach(d=>d.close());return;}
    const action=el.dataset.action;
    if(action==='search')showSearch(el);
    else if(action==='menu')openDialog('nav-dialog',el);
    else if(['sources','costs','preferences'].includes(action)){closeDialog('nav-dialog');utility(action,el);}
    else if(action==='sync')sync();
    else if(action==='undo')undoTriage();
    else if(action==='dismiss-notice'){$('#notification').hidden=true;undo=null;}
    else if(action==='clear-filters')clearFilters();
    else if(action==='clear-topic'){topic='';location.hash='#library';}
    else if(action==='reset')reset();
  });
  document.addEventListener('input',event=>{
    if(event.target.id==='global-query')searchResults();
    if(event.target.id==='library-query'){query=event.target.value;render();}
  });
  document.addEventListener('change',event=>{
    if(event.target.matches('[data-sort]')){sorting=event.target.value;render({restoreFocus:'[data-sort]'});}
    if(event.target.id==='compact')document.body.classList.toggle('compact',event.target.checked);
  });
  document.addEventListener('keydown',event=>{
    const modal = $('dialog[open]');
    if(event.key==='Escape' && modal){event.preventDefault();modal.close();return;}
    // Keep the dialog's forward and backward Tab sequence within its controls.
    if(event.key==='Tab' && modal){
      const controls=$$('button,a[href],input,select,textarea,[tabindex="0"]',modal).filter(el=>!el.disabled && el.getClientRects().length);
      const first=controls[0],last=controls[controls.length-1];
      if(first && event.shiftKey && document.activeElement===first){event.preventDefault();last.focus();}
      else if(last && !event.shiftKey && document.activeElement===last){event.preventDefault();first.focus();}
    }
    if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){
      event.preventDefault();
      if($('#search-dialog').open){closeDialog('search-dialog');return;}
      if($('dialog[open]'))return;
      showSearch($('[data-action="search"]'));
    }
  });
  $$('dialog').forEach(dialog=>{
    dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
    dialog.addEventListener('close',()=>{if(!$('dialog[open]')){const target=dialogTriggers.get(dialog);if(target?.isConnected)target.focus({preventScroll:true});else $('#main').focus({preventScroll:true});}});
  });
  window.addEventListener('hashchange',()=>{source='all';query='';sorting='recent';parseRoute();render();window.scrollTo(0,0);$('#main').focus({preventScroll:true});});
  parseRoute();render();
})();
