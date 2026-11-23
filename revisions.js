// Локальные дополнения к исходному сайту. Демо-сведения помечены в HTML.
(()=>{const $=s=>document.querySelector(s),all=s=>Array.from(document.querySelectorAll(s)),escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const achievements=[
 {number:'2017',label:'Год создания',description:'Год создания Централизованной бухгалтерии Московской области.'},
 {number:'359',label:'Обслуживаемых организаций',description:'Государственные учреждения и государственные органы Московской области.'},
 {number:'394 000',label:'Сотрудников, которым рассчитывается зарплата',description:'Ежемесячный расчёт и начисление заработной платы.'},
 {number:'1 350',label:'Сотрудников ЦБ МО',description:'Команда Централизованной бухгалтерии Московской области.'},
 {number:'15',label:'Управлений в Московской области',description:'Бухгалтерские подразделения ЦБ МО.'}
];let slide=0;
function showAchievement(i){slide=(i+achievements.length)%achievements.length;const item=achievements[slide];$('#hero-number').textContent=item.number;$('#hero-label').textContent=item.label;$('#hero-description').textContent=item.description;$('#achievement-count').textContent=`${slide+1} / ${achievements.length}`;all('[data-hero-slide]').forEach(b=>b.setAttribute('aria-current',String(+b.dataset.heroSlide===slide)))}
all('[data-achievement]').forEach(b=>b.onclick=()=>showAchievement(slide+(b.dataset.achievement==='next'?1:-1)));all('[data-hero-slide]').forEach(b=>b.onclick=()=>showAchievement(+b.dataset.heroSlide));
const hero=$('.revision-hero-slider');if(hero)hero.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();showAchievement(slide+(e.key==='ArrowRight'?1:-1))}});
function search(input,update){let clear=input.parentElement.querySelector('.revision-clear');input.addEventListener('input',()=>{clear.hidden=!input.value;update(input.value)});clear.onclick=()=>{input.value='';clear.hidden=true;update('');input.focus()};update('')}
const items=all('.map_item_map');let map=null,markers=[];
if(items.length){
 if(window.L){map=L.map('map',{scrollWheelZoom:false}).setView([55.65,37.7],8);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);map.zoomControl._zoomInButton.setAttribute('aria-label','Приблизить');map.zoomControl._zoomOutButton.setAttribute('aria-label','Отдалить');let groups={};items.forEach((x,i)=>(groups[x.dataset.map]??=[]).push(i));Object.values(groups).forEach(ids=>{let x=items[ids[0]],names=ids.map(i=>items[i].querySelector(':scope>span').textContent),label=ids.length>1?ids.length:names[0].match(/№\s*(\d+)/)[1];let m=L.marker(JSON.parse(x.dataset.map),{icon:L.divIcon({className:'revision-map-marker',html:String(label),iconSize:[32,32]}),title:names.join(', ')}).addTo(map).bindPopup(ids.map(i=>items[i].querySelector('.baloon_content').innerHTML).join('<hr>'));markers.push({ids,m})});map.fitBounds(items.map(x=>JSON.parse(x.dataset.map)),{padding:[30,30]})}
 items.forEach((x,i)=>{let title=x.querySelector(':scope>span'),button=document.createElement('button');button.type='button';button.className='revision-map-focus';button.setAttribute('aria-label',title.textContent+' — показать на карте');title.before(button);button.append(title);button.onclick=()=>{if(map){map.setView(JSON.parse(x.dataset.map),13);markers.find(m=>m.ids.includes(i))?.m.openPopup()}else window.open('https://yandex.ru/maps/?pt='+JSON.parse(x.dataset.map).reverse().join(',')+'&z=15','_blank','noopener')}})}
all('a[target="_blank"]').forEach(a=>a.rel='noopener');})();
// Подменю «О нас»: наведение мышью, клавиатура и нажатие на сенсорном экране.
document.querySelectorAll('.about-nav-dropdown').forEach(menu=>{
 const trigger=menu.querySelector('button');
 const setOpen=open=>{menu.classList.toggle('is-open',open);trigger.setAttribute('aria-expanded',String(open))};
 menu.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')setOpen(true)});
 menu.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse'&&!menu.contains(document.activeElement))setOpen(false)});
 trigger.addEventListener('click',()=>setOpen(!menu.classList.contains('is-open')));
 menu.addEventListener('focusout',e=>{if(!menu.contains(e.relatedTarget))setOpen(false)});
 menu.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();setOpen(false);trigger.focus()}if(e.key==='ArrowDown'&&e.target===trigger){e.preventDefault();setOpen(true);menu.querySelector('a').focus()}});
 document.addEventListener('click',e=>{if(!menu.contains(e.target))setOpen(false)});
});
// Карусель направлений: кнопки, клавиатура и нативное перелистывание пальцем.
(()=>{
 const viewport=document.querySelector('.activity-viewport');if(!viewport)return;
 const cards=Array.from(viewport.querySelectorAll('.activity-card')),prev=document.querySelector('.activity-prev'),next=document.querySelector('.activity-next'),dots=Array.from(document.querySelectorAll('[data-activity-index]')),status=document.querySelector('.activity-status');
 let index=0;
 const step=()=>cards[1].offsetLeft-cards[0].offsetLeft;
 const visible=()=>Math.max(1,Math.round((viewport.clientWidth+(step()-cards[0].offsetWidth))/step()));
 const maximum=()=>Math.max(0,cards.length-visible());
 function sync(){index=Math.min(maximum(),Math.max(0,Math.round(viewport.scrollLeft/step())));prev.disabled=index===0;next.disabled=index===maximum();status.textContent=visible()===1?`Направление ${index+1} из ${cards.length}`:`Направления ${index+1}–${Math.min(cards.length,index+visible())} из ${cards.length}`;dots.forEach((b,i)=>{b.hidden=i>maximum();b.setAttribute('aria-current',String(i===index));b.setAttribute('aria-label',visible()===1?`Показать направление ${i+1}`:`Показать направления ${i+1}–${Math.min(cards.length,i+visible())}`)})}
 function go(i){const target=Math.max(0,Math.min(maximum(),i));viewport.scrollTo({left:target*step(),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}
 prev.onclick=()=>go(index-1);next.onclick=()=>go(index+1);dots.forEach(b=>b.onclick=()=>go(+b.dataset.activityIndex));
 viewport.addEventListener('scroll',sync,{passive:true});viewport.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();go(index+(e.key==='ArrowRight'?1:-1))}});
 new ResizeObserver(sync).observe(viewport);sync();
})();
