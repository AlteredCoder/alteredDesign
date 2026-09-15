/* Fictional prototype fixtures. Canonical resources and source bookmarks are separate. */
window.CANVAS_DATA={
 topics:[{id:'design',name:'Design & produit',caption:'Des interfaces qui ont du sens.',color:'lavender',x:24,y:24},{id:'ai',name:'Laboratoire IA',caption:'Comprendre. Essayer. Recommencer.',color:'apricot',x:378,y:70},{id:'local',name:'Construire autrement',caption:'Des outils qui nous appartiennent.',color:'sage',x:732,y:24}],
 resources:[
 {id:1,title:'Faire de la place à ce qui compte',summary:'Une interface se comprend aussi par ses espaces. Observer le rythme, les volumes et la place laissée à chaque information.',topic:'design',tags:['Design','Inspiration'],kind:'Article',duration:'6 min',cover:'architecture',related:[2,3]},
 {id:2,title:'Les détails qui font une bonne interface',summary:'États vides, focus visible, retours d’action : penser les moments entre deux écrans.',topic:'design',tags:['Design','Accessibilité'],kind:'Article',duration:'8 min',cover:'interface',related:[1,7]},
 {id:3,title:'Prototyper pour apprendre',summary:'Transformer une question produit en une interaction que l’on peut essayer.',topic:'design',tags:['Produit','Prototypage'],kind:'Vidéo',duration:'18 min',cover:null,related:[2,5]},
 {id:4,title:'Donner du contexte aux agents',summary:'Relier objectifs, documents et vérification dans un même espace de travail.',topic:'ai',tags:['IA','Agents'],kind:'Vidéo',duration:'24 min',cover:'agents',related:[5,6]},
 {id:5,title:'Un prompt, une hypothèse',summary:'Définir ce que l’on veut observer, puis comparer les résultats sur les mêmes exemples.',topic:'ai',tags:['IA','Évaluation'],kind:'Discussion',duration:'5 min',cover:null,related:[3,4]},
 {id:6,title:'Des résumés qui gardent le contexte',summary:'Retenir les idées utiles sans perdre les limites et l’intention du document original.',topic:'ai',tags:['IA','Connaissance'],kind:'Article',duration:'7 min',cover:'summary',related:[4,9]},
 {id:7,title:'Local-first, par où commencer ?',summary:'Une application qui reste utile hors ligne. Données locales, synchronisation et choix simples.',topic:'local',tags:['Local-first','Développement'],kind:'Article',duration:'12 min',cover:'local',related:[2,8]},
 {id:8,title:'SQLite est un excellent point de départ',summary:'Stocker, rechercher et sauvegarder les données d’un outil personnel avec une base embarquée.',topic:'local',tags:['Développement','Données'],kind:'Discussion',duration:'9 min',cover:'code',related:[7,9]},
 {id:9,title:'Une bibliothèque qui vous ressemble',summary:'Moins de dossiers, de meilleurs liens et une routine de tri que l’on peut tenir.',topic:'local',tags:['Connaissance','Organisation'],kind:'Vidéo',duration:'16 min',cover:null,related:[6,7]},
 {id:10,title:'Un autre outil de prise de notes',summary:'Une piste mise de côté pendant le tri, toujours accessible dans les archives.',topic:'local',tags:['Outils'],kind:'Article',duration:'4 min',cover:null,related:[9]},
 {id:11,title:'De la grille au rythme',summary:'Faire varier la composition pour hiérarchiser les informations et guider le regard.',topic:'design',tags:['Design','Composition'],kind:'Article',duration:'6 min',cover:'grid',related:[1,2]},
 {id:12,title:'Une première liste de modèles',summary:'Un ancien panorama, archivé pour laisser de la place aux ressources plus utiles.',topic:'ai',tags:['IA','Outils'],kind:'Discussion',duration:'3 min',cover:null,related:[4]}
 ],
 bookmarks:[
 {id:1,resourceId:1,source:'x',author:'Interface Journal',triage:'kept',date:'2026-09-09'},
 {id:2,resourceId:1,source:'discord',author:'Design & Code',triage:'pending',date:'2026-09-09'},
 {id:3,resourceId:2,source:'x',author:'Frontend Notes',triage:'pending',date:'2026-09-09'},
 {id:4,resourceId:3,source:'youtube',author:'Product Fieldnotes',triage:'kept',date:'2026-09-08'},
 {id:5,resourceId:4,source:'youtube',author:'The Build Lab',triage:'pending',date:'2026-09-09'},
 {id:6,resourceId:4,source:'reddit',author:'Build Together',triage:'kept',date:'2026-09-08'},
 {id:7,resourceId:5,source:'discord',author:'AI Workshop',triage:'pending',date:'2026-09-08'},
 {id:8,resourceId:6,source:'x',author:'The Build Lab',triage:'kept',date:'2026-09-07'},
 {id:9,resourceId:6,source:'discord',author:'Design & Code',triage:'kept',date:'2026-09-07'},
 {id:10,resourceId:7,source:'reddit',author:'Build Together',triage:'pending',date:'2026-09-08'},
 {id:11,resourceId:8,source:'reddit',author:'Engineering Notes',triage:'pending',date:'2026-09-07'},
 {id:12,resourceId:9,source:'youtube',author:'Everyday Systems',triage:'kept',date:'2026-09-06'},
 {id:13,resourceId:10,source:'x',author:'Frontend Notes',triage:'archived',date:'2026-09-02'},
 {id:14,resourceId:11,source:'discord',author:'Design & Code',triage:'kept',date:'2026-09-05'},
 {id:15,resourceId:12,source:'reddit',author:'AI Workshop',triage:'archived',date:'2026-09-01'}
 ]};
