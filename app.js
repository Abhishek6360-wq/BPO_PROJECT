const people = [
  {name:'Priya Sharma',initials:'PS',role:'Customer success associate',team:'Client care',signal:'High',change:'↑ 12%',trend:'up',checkin:'Oct 28',bg:'#f6e7df',fg:'#9b654d'},
  {name:'Daniel Kim',initials:'DK',role:'Quality analyst',team:'Quality',signal:'High',change:'↑ 8%',trend:'up',checkin:'Oct 30',bg:'#e6edf6',fg:'#587397'},
  {name:'Aisha Patel',initials:'AP',role:'Team supervisor',team:'Operations',signal:'Moderate',change:'↓ 3%',trend:'down',checkin:'Oct 25',bg:'#f0e8f5',fg:'#86699b'},
  {name:'Marcus Johnson',initials:'MJ',role:'Customer care specialist',team:'Client care',signal:'Moderate',change:'↑ 2%',trend:'up',checkin:'Oct 29',bg:'#e7efe9',fg:'#62856a'},
  {name:'Sofia Reyes',initials:'SR',role:'Workforce planner',team:'Operations',signal:'Low',change:'↓ 6%',trend:'down',checkin:'Oct 31',bg:'#f5eadb',fg:'#a47c4c'},
  {name:'Arjun Mehta',initials:'AM',role:'Senior support associate',team:'Client care',signal:'Low',change:'↓ 4%',trend:'down',checkin:'Oct 27',bg:'#e5eeee',fg:'#56817d'}
];
const rows=document.getElementById('peopleRows');
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function renderPeople(query=''){
 const matches=people.filter(p=>(p.name+' '+p.role+' '+p.team).toLowerCase().includes(query.toLowerCase())).slice(0,4);
 rows.innerHTML=matches.length?matches.map(p=>`<tr><td><div class="person-cell"><span class="person-avatar" style="background:${p.bg};color:${p.fg}">${p.initials}</span><span><strong>${esc(p.name)}</strong><small>${esc(p.role)}</small></span></div></td><td class="team-tag">${esc(p.team)}</td><td><span class="signal ${p.signal==='High'?'high':p.signal==='Low'?'low':'medium'}"><i></i>${p.signal} signal</span></td><td class="change ${p.trend}">${p.change}</td><td class="last-check">${p.checkin}</td><td><button class="row-action" data-person="${esc(p.name)}">Check in</button></td></tr>`).join(''):'<tr><td colspan="6" style="height:70px;text-align:center;color:#98a3a8">No teammates match your search.</td></tr>';
 document.getElementById('peopleCount').textContent=query?`Showing ${matches.length} matches`:'Showing 4 of 18';
}
renderPeople();
let toastTimer;
function toast(message){const t=document.getElementById('toast');t.textContent=message;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),2600)}
const modal=document.getElementById('modalBackdrop');let selectedPerson='';
function openModal(name='') {selectedPerson=name;document.getElementById('modalTitle').textContent=name?`Check in with ${name.split(' ')[0]}`:'Start with a conversation';document.getElementById('modalBody').textContent=name?`A private, low-pressure conversation can help ${name.split(' ')[0]} feel heard. Choose a time that works for you both and listen for what would make work better.`:'A simple check-in can help someone feel heard. Choose a low-pressure next step that works for you both.';document.getElementById('modalConfirm').textContent=name?'Plan a check-in':'Plan a check-in';modal.classList.add('open');document.getElementById('modalConfirm').focus()}
function closeModal(){modal.classList.remove('open')}
rows.addEventListener('click',e=>{const b=e.target.closest('[data-person]');if(b)openModal(b.dataset.person)});
document.getElementById('peopleSearch').addEventListener('input',e=>renderPeople(e.target.value));
document.getElementById('modalClose').onclick=closeModal;document.getElementById('modalCancel').onclick=closeModal;modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
document.getElementById('modalConfirm').onclick=()=>{closeModal();toast(selectedPerson?`Check-in planned with ${selectedPerson}.`:'Your check-in is ready to plan.')};
document.querySelector('.summary-close').onclick=()=>document.querySelector('.summary-strip').remove();
document.getElementById('exportButton').onclick=()=>toast('Your overview report is ready to export.');
document.getElementById('periodButton').onclick=()=>{const b=document.getElementById('periodButton');b.innerHTML=b.dataset.alt==='1'?'Last 30 days <span>⌄</span>':'Last 7 days <span>⌄</span>';b.dataset.alt=b.dataset.alt==='1'?'0':'1';toast('Overview period updated.')};
document.getElementById('chartPeriod').onclick=()=>{const b=document.getElementById('chartPeriod');b.innerHTML=b.dataset.alt==='1'?'This year <span>⌄</span>':'Last 30 days <span>⌄</span>';b.dataset.alt=b.dataset.alt==='1'?'0':'1';toast('Chart period updated.')};
document.getElementById('filterButton').onclick=()=>toast('Showing all teams and signal levels.');document.getElementById('learnMore').onclick=()=>{document.querySelector('[data-view="playbooks"]').click()};
document.getElementById('searchFocus').onclick=()=>{document.getElementById('peopleSearch').focus();document.querySelector('.people-panel').scrollIntoView({behavior:'smooth',block:'center'})};
document.getElementById('menuToggle').onclick=()=>document.getElementById('sidebar').classList.toggle('open');
const viewCopy={overview:['Overview','A healthier team starts here.','See the signals, understand the story, and make a difference.'],people:['People','Every person has a story.','A thoughtful check-in starts with understanding.'],insights:['Insights','Find the signal in the noise.','Patterns that can help your people do their best work.'],accounts:['Client accounts','Healthy teams build stronger partnerships.','A people-first view across your client operations.'],playbooks:['Retention playbooks','Small actions. Meaningful change.','Practical ways to support your team, one conversation at a time.'],reports:['Reports','A clearer picture of how your team is doing.','Your people insights, ready to share.']};
document.querySelectorAll('[data-view]').forEach(btn=>btn.addEventListener('click',()=>{const v=btn.dataset.view;document.querySelectorAll('.nav-item[data-view]').forEach(n=>n.classList.toggle('active',n.dataset.view===v));document.getElementById('crumbCurrent').textContent=viewCopy[v][0];document.getElementById('pageTitle').textContent=viewCopy[v][1];document.getElementById('pageSub').textContent=viewCopy[v][2];document.getElementById('sidebar').classList.remove('open');if(v!=='overview')toast(`${viewCopy[v][0]} preview`);window.scrollTo({top:0,behavior:'smooth'})}));
const roleDetails={operations:{label:'Operations manager',title:'Your team, doing well.',sub:'Check the signals and see who may need a little support.'},people:{label:'People & HR',title:'A healthier team starts here.',sub:'See the bigger picture across teams and track progress.'},clients:{label:'Client accounts',title:'Healthy teams. Strong partnerships.',sub:'Keep an eye on account health and team coverage.'}};
function chooseRole(role){const details=roleDetails[role]||roleDetails.operations;document.getElementById('roleScreen').hidden=true;document.body.classList.add('app-ready');document.getElementById('roleLabel').textContent=details.label;document.getElementById('profileRole').textContent=details.label;document.getElementById('pageTitle').textContent=details.title;document.getElementById('pageSub').textContent=details.sub;document.getElementById('crumbCurrent').textContent='Overview';document.querySelectorAll('.nav-item[data-view]').forEach(n=>n.classList.toggle('active',n.dataset.view==='overview'));window.scrollTo(0,0)}
document.getElementById('demoLogin').onclick=()=>{document.getElementById('loginScreen').hidden=true;document.getElementById('roleScreen').hidden=false};
document.getElementById('backToLogin').onclick=()=>{document.getElementById('roleScreen').hidden=true;document.getElementById('loginScreen').hidden=false};
document.querySelectorAll('[data-role]').forEach(card=>card.addEventListener('click',()=>chooseRole(card.dataset.role)));
document.getElementById('switchRole').onclick=()=>{document.body.classList.remove('app-ready');document.getElementById('roleScreen').hidden=false;window.scrollTo(0,0)};
document.getElementById('signOut').onclick=()=>{document.body.classList.remove('app-ready');document.getElementById('roleScreen').hidden=true;document.getElementById('loginScreen').hidden=false;document.getElementById('demoEmail').focus()};
document.querySelector('.notification').onclick=()=>toast('You’re all caught up.');
