'use strict';
// To install art: upload images/day-01.webp through images/day-24.webp.
// Allowed formats: webp (preferred), jpg/jpeg, png. Adjust EXTENSION as necessary.
// All times are evaluated in Europe/Paris; the season is December 2026.
const YEAR = 2026;
const TIMEZONE = 'Europe/Paris';
const EXTENSION = 'webp';
const STORAGE_KEY = 'pinup-advent-opened-2026';
const doors = [
  ['The Early Present','Gil Elvgren'],['Christmas Cookies','Zoë Mozert'],
  ['The Mistletoe Trap','Earl Moran'],['Stocking Stuffers','George Petty'],
  ['The Christmas Tree','Joyce Ballantyne'],['Snow Angel','Rolf Armstrong'],
  ['The Gift Wrapper','Peter Driben'],["Santa’s Little Helper",'Billy DeVorss'],
  ['The Ice Skater','Pearl Frush'],['The Chimney Surprise','Art Frahm'],
  ['The Christmas Card','Harry Ekman'],['The Naughty List','Fritz Willis'],
  ['Hot Chocolate','Arnold Armitage'],['The Snowball Fight','Joyce Ballantyne'],
  ['The Carol Singer',"Edward D’Ancona"],['The Reindeer Games','Earl Moran'],
  ['The Christmas Shopping Spree','Vaughan Alden Bass'],['The Nutcracker','Enoch Bolles'],
  ['The Holiday Cocktail','Alberto Vargas'],["Santa’s Laundry",'Zoë Mozert'],
  ['The Christmas Lights','Gil Elvgren'],['The Midnight Visitor','Ben-Hur Baz'],
  ['The Christmas Eve Surprise','Gil Elvgren'],['The Ultimate Christmas Present','Peter Driben']
];
const layout = [16,3,21,8,1,13,6,24,11,17,4,12,19,9,2,20,15,7,22,5,18,10,23,14];
const calendar = document.getElementById('calendar');
const status = document.getElementById('status');
const dialog = document.getElementById('reveal');
const artwork = document.getElementById('artwork');
const missing = document.getElementById('missing');
const prev = document.getElementById('previous');
const next = document.getElementById('next');
let selected = null;
let opened;
try { opened = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')); }
catch (_) { opened = new Set(); }
function todayParis() {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB',{
    timeZone:TIMEZONE,year:'numeric',month:'2-digit',day:'2-digit'
  }).formatToParts(new Date()).filter(x=>x.type!=='literal').map(x=>[x.type,Number(x.value)]));
  return parts;
}
function availableThrough(){
  const {year,month,day}=todayParis();
  if(year<YEAR || (year===YEAR && month<12)) return 0;
  if(year>YEAR || (year===YEAR && month>12)) return 24;
  return Math.min(day,24);
}
function saveOpened(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify([...opened]));}catch(_){}}
function setStatus(){
  const through=availableThrough();
  if(through===0) status.textContent='The first door opens December 1, 2026 — midnight Paris time.';
  else if(through<24) status.textContent='December '+through+' is ready! Find today’s door and open your Christmas surprise.';
  else status.textContent='All 24 Christmas surprises are ready to unwrap. Merry Christmas!';
}
function draw(){
  const through=availableThrough();
  calendar.replaceChildren();
  for (const day of layout){
    const button=document.createElement('button');
    button.type='button';
    button.className='door '+(day>through?'locked':opened.has(day)?'opened':'available');
    button.setAttribute('aria-label',day>through?'Door '+day+', opens December '+day:'Open door '+day+', '+doors[day-1][0]);
    button.innerHTML='<span class="decoration" aria-hidden="true">✧ ❧ ✧</span><span class="number">'+day+'</span><span class="tiny-label">'+(opened.has(day)&&day<=through?'OPENED':'DECEMBER')+'</span><span class="keyhole" aria-hidden="true"></span>';
    button.addEventListener('click',()=>{
      if(day>availableThrough()){
        button.classList.remove('shake');void button.offsetWidth;button.classList.add('shake');
        status.textContent='Door '+day+' opens on December '+day+', '+YEAR+'. Come back then!';
        return;
      }
      opened.add(day);saveOpened();draw();show(day);
    });
    calendar.append(button);
  }
}
function show(day){
  if(day<1||day>availableThrough()) return;
  selected=day;
  document.getElementById('reveal-day').textContent='DECEMBER '+String(day).padStart(2,'0')+' • '+YEAR;
  document.getElementById('reveal-title').textContent=doors[day-1][0];
  document.getElementById('reveal-credit').textContent='An original illustration paying tribute to '+doors[day-1][1];
  artwork.hidden=true;missing.hidden=true;artwork.removeAttribute('src');
  const imagePath='./images/day-'+String(day).padStart(2,'0')+'.'+EXTENSION;
  artwork.onload=()=>{artwork.hidden=false;missing.hidden=true};
  artwork.onerror=()=>{artwork.hidden=true;missing.hidden=false};
  artwork.alt=doors[day-1][0]+', a vintage Christmas pin-up tribute to '+doors[day-1][1];
  artwork.src=imagePath;
  prev.disabled=day<=1;
  next.disabled=day>=availableThrough();
  if(!dialog.open)dialog.showModal();
}
prev.addEventListener('click',()=>{if(selected>1)show(selected-1)});
next.addEventListener('click',()=>{if(selected<availableThrough())show(selected+1)});
document.getElementById('close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
setStatus();draw();
document.addEventListener('visibilitychange',()=>{if(!document.hidden){setStatus();draw()}});
// For convenient testing before December: temporarily change YEAR, then restore it before publishing.
