'use strict';
// To install art: upload images/day-01.webp through images/day-24.webp.
// Allowed formats: webp (preferred), jpg/jpeg, png. Adjust EXTENSION as necessary.
// All times are evaluated in Europe/Paris; the season is December 2026.
const YEAR = 2026;
const TIMEZONE = 'Europe/Paris';
const EXTENSION = 'webp';
const STORAGE_KEY = 'pinup-advent-opened-2026';
// Testing shortcut: ?preview=1 ... ?preview=24 simulates that many unlocked doors.
// This is a convenience only, not a private or secure feature.
const previewParam = new URLSearchParams(window.location.search).get('preview');
const PREVIEW_DAY = previewParam !== null && /^([1-9]|1[0-9]|2[0-4])$/.test(previewParam) ? Number(previewParam) : null;
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
  if(PREVIEW_DAY !== null) return PREVIEW_DAY;
  const {year,month,day}=todayParis();
  if(year<YEAR || (year===YEAR && month<12)) return 0;
  if(year>YEAR || (year===YEAR && month>12)) return 24;
  return Math.min(day,24);
}
function saveOpened(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify([...opened]));}catch(_){}}
function setStatus(){
  const through=availableThrough();
  if(PREVIEW_DAY !== null){status.textContent='PREVIEW MODE — testing as December '+PREVIEW_DAY+'. Normal visitors still follow the real date.';return;}
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
      opened.add(day);saveOpened();button.classList.add('swinging');
      const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.setTimeout(()=>{draw();show(day)},reducedMotion?0:250);
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

// Calendar links: Google can prefill a 24-day recurring event without a file download.
// Build its UTC start based on the visitor's local 9 AM, not the site owner's timezone.
const reminderToggle=document.getElementById('reminder-toggle');
const reminderOptions=document.getElementById('reminder-options');
const googleLink=document.getElementById('google-calendar-link');
const outlookHelp=document.getElementById('outlook-help');
const outlookUrl=document.getElementById('outlook-url');
const copyFeedback=document.getElementById('copy-feedback');
const calendarFeed=outlookUrl.value;
function gcalTimestamp(date) {
  return date.toISOString().replace(/[-:]/g,'').replace(/\\.\\d{3}Z$/,'Z');
}
function googleReminderUrl() {
  const start=new Date(YEAR,11,1,9,0,0);
  const end=new Date(YEAR,11,1,9,5,0);
  const params=new URLSearchParams({
    action:'TEMPLATE',
    text:'Open your Christmas pin-up door',
    dates:gcalTimestamp(start)+'/'+gcalTimestamp(end),
    details:'24 days of vintage Christmas pin-up surprises. Open today’s door: https://theguywithahat0.github.io/pinup-advent-calendar/',
    recur:'RRULE:FREQ=DAILY;COUNT=24'
  });
  const timezone=Intl.DateTimeFormat().resolvedOptions().timeZone;
  if(timezone) params.set('ctz',timezone);
  return 'https://calendar.google.com/calendar/render?'+params.toString();
}
googleLink.href=googleReminderUrl();
reminderToggle.addEventListener('click',()=>{
  reminderOptions.hidden=!reminderOptions.hidden;
  reminderToggle.setAttribute('aria-expanded',String(!reminderOptions.hidden));
});
async function copyFeed(){
  try{
    await navigator.clipboard.writeText(calendarFeed);
    copyFeedback.textContent='Link copied. Paste it into Outlook’s Subscribe from web field.';
  } catch (_) {
    outlookUrl.focus();outlookUrl.select();
    copyFeedback.textContent='Copy the selected link, then paste it into Outlook.';
  }
}
document.getElementById('outlook-copy').addEventListener('click',copyFeed);
function openOutlook(url){
  // Open synchronously on user gesture to avoid popup blocking.
  window.open(url,'_blank','noopener');
  outlookHelp.hidden=false;
  copyFeed();
}
document.getElementById('outlook-personal').addEventListener('click',()=>openOutlook('https://outlook.live.com/calendar/0/addcalendar'));
document.getElementById('outlook-work').addEventListener('click',()=>openOutlook('https://outlook.office.com/calendar/0/addcalendar'));

// Visit ?preview=1 to test the first day, or ?preview=24 to test all doors.
// Remove the preview query to see the real date-locked experience.
