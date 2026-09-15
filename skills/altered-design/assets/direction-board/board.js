
const filter=document.querySelector('#direction-filter');
const sections=[...document.querySelectorAll('.direction')];
function show(value){for(const s of sections)s.hidden=value!=='all'&&s.id!==value;filter.value=value;}
filter.addEventListener('change',()=>{show(filter.value);if(filter.value!=='all'){const s=document.getElementById(filter.value);s.querySelector('h2').focus({preventScroll:true});s.scrollIntoView();}else document.querySelector('.board-tools').scrollIntoView();});
for(const link of document.querySelectorAll('[data-jump]'))link.addEventListener('click',()=>show(link.dataset.jump));
for(const link of document.querySelectorAll('.back'))link.addEventListener('click',()=>show('all'));
window.addEventListener('hashchange',()=>{const id=location.hash.slice(1);if(sections.some(s=>s.id===id))show(id);});
if(sections.some(s=>s.id===location.hash.slice(1)))show(location.hash.slice(1));

