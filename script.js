const agenda = [
  {time:"10:00 AM", title:"Prayer Song", icon:"🎵", text:"Good morning everyone. To begin this wonderful event, let us seek blessings and positive energy through the prayer song. Kindly maintain silence and join us respectfully."},
  {time:"10:30 AM", title:"Chief 3", icon:"🎤", text:"It is our great pleasure and privilege to warmly welcome our esteemed Chief Guest, Ms. Sofia J Deepanraj, Founder and CEO of Rohil Groups, Virudhunagar, to this special occasion.Ma’am, your journey as a successful entrepreneur and leader is truly inspiring. Your vision, dedication, and commitment to excellence serve as a great motivation for young minds, especially for students who aspire to build their own path in the world of innovation and entrepreneurship.On behalf of the Computer Science and Engineering Association – Codeynix, we extend our heartfelt welcome and sincere gratitude for graciously joining us and making this occasion more meaningful.We are honoured to have you with us today, and we look forward to gaining valuable insights and inspiration from your presence.Once again, a very warm welcome to you, Ms. Sofia J Deepanraj. We are delighted and honoured to have you as our Chief Guest."},
  {time:"10:40 AM", title:"Chief 4", icon:"👤", text:"It is our pleasure to warmly welcome Mr. Vinoth, Founder of AdroitFirm, a distinguished Marketing Automation and MarTech Professional, and an enthusiastic advocate of Artificial Intelligence and Digital Transformation.With his expertise in marketing technology, automation, and emerging digital solutions, he brings valuable industry knowledge and a forward-thinking perspective to our gathering. His journey reflects the importance of continuously adapting to technology and transforming innovative ideas into meaningful solutions.On behalf of the Computer Science and Engineering Association – Codeynix, we are delighted to have you with us today. We sincerely appreciate your valuable presence and look forward to gaining insights and inspiration from your experience.A very warm welcome to you, Mr. Vinoth. We are honoured to have you with us."},
  {time:"10:50 AM", title:"President’s Introduction to Codeynix", icon:"👥", text:"Codeynix, the Computer Science and Engineering Association, stands as a platform that brings together the students of our department through knowledge, innovation, technical excellence, and teamwork. It provides students with opportunities to explore emerging technologies, develop their skills, and actively participate in various technical and academic activities. We are proud to introduce Codeynix as a vibrant community that inspires every CSE student to learn, innovate, and grow.   It is our pleasure to welcome our respected President, Mr. S. Bala Mathan, whose leadership, vision, and encouragement continue to inspire the members of the CSE Association – Codeynix. We are honoured to have his valuable presence with us today."},
  {time:"11:00 AM", title:"Vice President’s Perspective on Codeynix", icon:"👤", text:"Codeynix is not just an association; it is a community built on collaboration, creativity, and continuous learning. Through various activities and initiatives, Codeynix encourages CSE students to share ideas, enhance their technical knowledge, and develop leadership and teamwork skills. It is a space where talent is recognised, innovation is encouraged, and every student gets an opportunity to contribute and shine.  It is our pleasure to welcome our respected Vice President, Ms. Raja Lakshmi. Her valuable guidance, support, and encouragement have always been an important part of the growth and activities of the CSE Association – Codeynix. We are delighted to have her presence with us and sincerely appreciate her continued support and contribution"},
  {time:"11:10 AM", title:"Honouring the Batch Presidents", icon:"🏆", text:"It is now time to recognise and honour the leaders who represent the voice and spirit of their respective batches.Our Batch Presidents have taken on the responsibility of bringing students together, coordinating activities, and strengthening the bond between their batches and the CSE Association – Codeynix.Their leadership, dedication, teamwork, and willingness to take responsibility truly deserve our appreciation. Today, we proudly acknowledge and honour all our Batch Presidents for their valuable contribution and commitment.We request all the Batch Presidents to kindly come forward and receive this honour. Let us welcome and appreciate them with a big round of applause!"},
];

const agendaEl = document.getElementById("agenda");
const titleEl = document.getElementById("currentTitle");
const scriptEl = document.getElementById("script");
const voiceEl = document.getElementById("voice");
const languageEl = document.getElementById("language");
const rateEl = document.getElementById("rate");
const pitchEl = document.getElementById("pitch");
const contentTitle=document.getElementById("contentTitle"), contentTime=document.getElementById("contentTime"), contentIcon=document.getElementById("contentIcon"), contentSubtitle=document.getElementById("contentSubtitle"), contentText=document.getElementById("contentText");
let selectedIndex = -1;
let voices = [];

agenda.forEach((item, i) => {
  const el = document.createElement("div");
  el.className = "agenda-item";
  el.innerHTML = `<div class="num">${String(i+1).padStart(2,"0")}</div>
    <div><div class="agenda-title">${item.icon} ${item.title}</div><div class="agenda-sub">AI Host Announcement</div></div>
    <div class="agenda-time">${item.time}</div>`;
  el.addEventListener("click", () => selectAgenda(i));
  agendaEl.appendChild(el);
});

function selectAgenda(i){
  selectedIndex = i;
  document.querySelectorAll(".agenda-item").forEach((x,n)=>x.classList.toggle("active",n===i));
  titleEl.textContent = agenda[i].title;
  scriptEl.value = agenda[i].text;
  contentTitle.textContent=agenda[i].title; contentTime.textContent=agenda[i].time; contentIcon.textContent=agenda[i].icon; contentSubtitle.textContent="Announcement for "+agenda[i].title; contentText.textContent=agenda[i].text;
  window.scrollTo({top:document.querySelector(".control-panel").offsetTop-70,behavior:"smooth"});
}

function loadVoices(){
  voices = speechSynthesis.getVoices();
  const lang = languageEl.value.toLowerCase();
  const filtered = voices.filter(v => v.lang.toLowerCase().startsWith(lang.split("-")[0]));
  const list = filtered.length ? filtered : voices;
  voiceEl.innerHTML = "";
  list.forEach(v => {
    const o=document.createElement("option");
    o.value=v.name;
    o.textContent=`${v.name} — ${v.lang}`;
    voiceEl.appendChild(o);
  });
}
speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

function speak(){
  if(!scriptEl.value.trim()) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(scriptEl.value);
  u.lang = languageEl.value;
  u.rate = Number(rateEl.value);
  u.pitch = Number(pitchEl.value);
  const chosen = voices.find(v=>v.name===voiceEl.value);
  if(chosen) u.voice=chosen;
  speechSynthesis.speak(u);
}
document.getElementById("speak").onclick=speak;
document.getElementById("contentSpeak").onclick=()=>{if(selectedIndex>=0)speak()};
document.getElementById("contentEdit").onclick=()=>document.querySelector(".control-panel").scrollIntoView({behavior:"smooth"});
document.getElementById("pause").onclick=()=>speechSynthesis.pause();
document.getElementById("resume").onclick=()=>speechSynthesis.resume();
document.getElementById("stopHost").onclick=()=>speechSynthesis.cancel();
document.getElementById("startHost").onclick=()=>{
  if(selectedIndex<0) selectAgenda(0);
  speak();
};
document.getElementById("clear").onclick=()=>{
  speechSynthesis.cancel();
  scriptEl.value="";
  titleEl.textContent="Select an agenda item";
  document.querySelectorAll(".agenda-item").forEach(x=>x.classList.remove("active"));
  selectedIndex=-1;
};
languageEl.onchange=loadVoices;
rateEl.oninput=()=>document.getElementById("rateValue").textContent=rateEl.value;
pitchEl.oninput=()=>document.getElementById("pitchValue").textContent=pitchEl.value;

function updateClock(){
  document.getElementById("clock").textContent=new Date().toLocaleTimeString("en-IN",{hour12:false});
}
setInterval(updateClock,1000); updateClock();
