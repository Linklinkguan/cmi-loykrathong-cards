/* © 2026 CMI Community (Chiang Mai). Designed and made by 林可 (Link) for the 2026 CMI 水灯庆典. Original design; please credit CMI Community when reusing. */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const strings=window.UI_DATA;
let lang=localStorage.cmiLkLang||(/^zh/i.test(navigator.language)?'zh':/^th/i.test(navigator.language)?'th':'en'), muted=localStorage.cmiLkMute==='true', entered=false, current=[], last={}, drawCats=[]; const music=$('#music'); music.volume=0;
function translate(){let t=strings[lang];Object.assign(t,({zh:{cardsTab:'灵感卡',builderTab:'生成器',riverTab:'做水灯',cultureTab:'文化'},en:{cardsTab:'Cards',builderTab:'Create',riverTab:'Make Krathong',cultureTab:'Culture'},th:{cardsTab:'การ์ด',builderTab:'สร้าง',riverTab:'ทำกระทง',cultureTab:'วัฒนธรรม'}})[lang]);document.documentElement.lang=lang==='zh'?'zh-CN':lang;t.title=({zh:'2026 CMI 水灯庆典',en:'2026 CMI Loy Krathong Festival',th:'งานลอยกระทง CMI 2026'})[lang];document.title=t.title;let about=$('.about-link');about.textContent=({zh:'活动背景',en:'About',th:'เกี่ยวกับงาน'})[lang];about.href='about.html?lang='+lang;$$('[data-i]').forEach(e=>e.textContent=t[e.dataset.i]);$$('[data-lang]').forEach(e=>e.classList.toggle('active',e.dataset.lang===lang));$('#decks').innerHTML=t.names.map((n,i)=>`<button class="deck" data-cat="0${i+1}"><div class="stack">${Array(5).fill(`<img draggable="false" src="img/back-0${i+1}${lang==='th'?'-th':''}.webp" alt="">`).join('')}${lang==='zh'?'':lang==='th'?'<span class="stack-th"><span>ทำตามแบบ หรือสร้างในแบบของคุณ</span></span>':`<span class="stack-subtitle">Follow along, or make it your own</span>`}</div><strong>${n}</strong><small>${t.count}</small></button>`).join('');$('#singles').innerHTML=t.single.map((n,i)=>`<button data-cat="0${i+1}">${n}</button>`).join(''); $$('#decks button,#singles button').forEach(b=>b.onclick=()=>draw([b.dataset.cat]));if(current.length){renderCards();$$('#reveals .flipper').forEach(e=>e.classList.add('open'));if(!$('#large').hidden&&largeIndex>=0)showLarge(largeIndex)}renderParts();renderCulture(lang);$('#siteCredit').innerHTML=cultureText[lang].organisers;musicCredit();}
$$('[data-lang]').forEach(b=>b.onclick=()=>{lang=b.dataset.lang;localStorage.cmiLkLang=lang;translate()});/* v14 audio: music and UI sounds are separate; both default ON, the user's own choice is remembered */
let sfxOff=localStorage.cmiLkSfx==='off';const audioSubs=[];const audioNotify=()=>audioSubs.forEach(f=>{try{f()}catch(e){}});
function musicPlaying(){return !music.paused&&!muted}
function setMusic(on){muted=!on;localStorage.cmiLkMute=muted;if(muted)music.pause();else{entered=true;startMusic()}audioNotify()}
function setMute(){setMusic(muted)}
function setSfx(on){sfxOff=!on;localStorage.cmiLkSfx=on?'on':'off';audioNotify();if(on){entered=true;sfx('click',.3)}}
function paintAudio(){let p=musicPlaying();$('#mute').textContent=p?'♫':'♪̸';$('#mute').setAttribute('aria-label',({zh:p?'暂停音乐':'播放音乐',en:p?'Pause music':'Play music',th:p?'หยุดเพลง':'เล่นเพลง'})[lang]);$('#mute').classList.toggle('off',!p);let s=$('#sfx');if(s){s.classList.toggle('off',sfxOff);s.setAttribute('aria-label',({zh:sfxOff?'打开音效':'关闭音效',en:sfxOff?'Sound effects on':'Sound effects off',th:sfxOff?'เปิดเสียงเอฟเฟกต์':'ปิดเสียงเอฟเฟกต์'})[lang]);s.title=s.getAttribute('aria-label')}
 $$('.music-toggle').forEach(b=>{b.classList.toggle('playing',p);b.setAttribute('aria-pressed',p);let l=b.querySelector('span');if(l)l.textContent=({zh:p?'暂停音乐':'播放音乐',en:p?'Pause music':'Play music',th:p?'หยุดเพลง':'เล่นเพลง'})[lang];let i=b.querySelector('i');if(i)i.textContent=p?'❚❚':'▶'})}
audioSubs.push(paintAudio);music.addEventListener('play',audioNotify);music.addEventListener('pause',audioNotify);
$('#mute').onclick=()=>setMusic(!musicPlaying());{let s=$('#sfx');if(s)s.onclick=()=>setSfx(sfxOff)}
document.addEventListener('click',e=>{let b=e.target.closest&&e.target.closest('.music-toggle');if(b)setMusic(!musicPlaying())});
paintAudio();$$('[data-lang]').forEach(b=>b.addEventListener('click',()=>setTimeout(paintAudio,0)));window.cmiAudio={paint:()=>paintAudio(),musicPlaying,setMusic,toggleMusic:()=>setMusic(!musicPlaying()),sfxOn:()=>!sfxOff,setSfx,onChange:f=>audioSubs.push(f),sfx:(n,v)=>sfx(n,v),stats:()=>({sfxPlayed:SFX_COUNT,ctx:actx&&actx.state,unlocked:audioUnlocked})};function startMusic(){if(muted)return;music.volume=0;music.play().catch(()=>{});let n=0;let timer=setInterval(()=>{music.volume=Math.min(.5,++n/30*.5);if(n>=30)clearInterval(timer)},50)}document.addEventListener('visibilitychange',()=>{if(document.hidden)music.pause();else if(entered&&!muted)music.play().catch(()=>{})});function enter(){unlockAudio();if(entered)return;entered=true;startMusic();audioNotify()}['pointerdown','keydown','touchstart','touchend'].forEach(ev=>document.addEventListener(ev,enter,{capture:true,passive:true}));
function weighted(cat){let list=CARD_DATA.filter(c=>c.cat===cat);function pick(){let r=Math.random()*list.reduce((a,c)=>a+c.w,0);return list.find(c=>(r-=c.w)<=0)||list.at(-1)}let c=pick();if(c.num===last[cat])c=pick();last[cat]=c.num;return c}
let drawTimers=[],largeIndex=-1;
function draw(cats){
 sfx('draw',.5);
 drawTimers.forEach(clearTimeout);drawTimers=[];drawCats=cats;current=cats.map(weighted);
 const sources=cats.map(cat=>$(`.deck[data-cat="${cat}"]`).getBoundingClientRect());
 $('#stage').hidden=false;renderCards();
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 $$('#reveals .reveal-card').forEach((el,i)=>{
  const dst=el.getBoundingClientRect(),src=sources[i];
  const dx=src.left+src.width/2-dst.left-dst.width/2,dy=src.top+src.height*.4-dst.top-dst.height/2;
  const delay=i*150;
  if(!reduced){
   el.animate([{transform:`translate(${dx}px,${dy}px) scale(.55) rotate(-7deg)`,opacity:.5},{transform:`translate(${dx*.45}px,${dy*.45-45}px) scale(.82) rotate(4deg)`,opacity:1,offset:.56},{transform:'translate(0,0) scale(1) rotate(0deg)'}],{duration:720,delay,easing:'cubic-bezier(.34,1.56,.64,1)',fill:'backwards'});
  }
  drawTimers.push(setTimeout(()=>{el.querySelector('.flipper').classList.add('open');if(!reduced){el.classList.add('bang');ping()}},reduced?30:800+i*350));
 });
}
var SFX={},SFXBUF={},SFX_COUNT=0,audioUnlocked=false;
function unlockAudio(){try{actx=actx||new(window.AudioContext||window.webkitAudioContext)();if(actx.state==='suspended')actx.resume();if(!audioUnlocked){let b=actx.createBuffer(1,1,22050),s=actx.createBufferSource();s.buffer=b;s.connect(actx.destination);s.start(0);audioUnlocked=true;['click','reveal'].forEach(loadSfx)}}catch(e){}}
function loadSfx(n){if(SFXBUF[n]||!actx)return SFXBUF[n];return SFXBUF[n]=fetch('audio/sfx-'+n+'.mp3').then(r=>r.arrayBuffer()).then(d=>new Promise((res,rej)=>actx.decodeAudioData(d,res,rej))).then(buf=>SFXBUF[n]=buf).catch(()=>{SFXBUF[n]=null})}
function sfx(n,v){if(sfxOff)return;try{unlockAudio();let buf=SFXBUF[n];if(buf&&buf instanceof AudioBuffer&&actx.state!=='closed'){let s=actx.createBufferSource(),g=actx.createGain();s.buffer=buf;g.gain.value=v||.5;s.connect(g).connect(actx.destination);s.start();SFX_COUNT++;return}if(!buf)loadSfx(n);let a=SFX[n];if(!a){a=SFX[n]=new Audio('audio/sfx-'+n+'.mp3');a.preload='auto'}let b=a.cloneNode();b.volume=v||.5;b.play().then(()=>SFX_COUNT++).catch(()=>{})}catch(e){}}
function ping(){sfx('reveal',.4)}
/* builder add: ranat note, pitch walks a major-pentatonic scale over ~2 octaves (Thai tuning approximated) */
var PENTA=[-12,-10,-8,-5,-3,0,2,4,7,9,12],pIdx=5,actx,popBuf,popLoading;
function addNote(){if(sfxOff)return;unlockAudio();try{actx=actx||new(window.AudioContext||window.webkitAudioContext)();if(actx.state==='suspended')actx.resume();
 const play=()=>{const src=actx.createBufferSource(),g=actx.createGain();src.buffer=popBuf;src.playbackRate.value=Math.pow(2,PENTA[pIdx]/12);g.gain.value=.5;src.connect(g).connect(actx.destination);src.start();SFX_COUNT++;
  const step=(Math.random()<.5?-1:1)*(Math.random()<.5?1:2);let j=pIdx+step;if(j<0||j>=PENTA.length)j=pIdx-step;pIdx=Math.max(0,Math.min(PENTA.length-1,j))};
 if(popBuf)play();else if(!popLoading){popLoading=fetch('audio/sfx-pop.mp3').then(r=>r.arrayBuffer()).then(b=>actx.decodeAudioData(b)).then(b=>{popBuf=b;play()}).catch(()=>{popLoading=null})}}catch(e){}}
/* soft wooden tap on UI buttons (not on draw/add/flip, which have their own sounds) */
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('button,[data-tab],[data-lang],summary,[role=tab]');if(!t||t.disabled)return;if(t.closest('[data-id],#decks,#singles,#drawAll,.reveal-card,.flipper,#mute,.deck'))return;sfx('click',.28)},true);
var MUSIC_CREDIT={zh:'音乐：Lopkerjo《Thai Love Song》，CC BY 4.0，来自 Free Music Archive。音效：CC0 录音——兰纳/泰式木琴 ranat（SieuAmThanh，Freesound）与铃（the-very-real-horst）。',en:'Music: “Thai Love Song” by Lopkerjo, CC BY 4.0, via Free Music Archive. Sound effects: CC0 recordings — ranat (Thai xylophone) by SieuAmThanh via Freesound, bell by the-very-real-horst.',th:'ดนตรี: “Thai Love Song” โดย Lopkerjo, CC BY 4.0, ผ่าน Free Music Archive เสียงประกอบ: บันทึกเสียง CC0 — ระนาดโดย SieuAmThanh (Freesound) และระฆังโดย the-very-real-horst'};
function musicCredit(){let t=MUSIC_CREDIT[lang]||MUSIC_CREDIT.en,e=$('#musicCredit');if(e)e.innerHTML=t.replace(/(Thai Love Song)/,'<a href="https://freemusicarchive.org/music/john-lopker/best-free-background-music-by-lopkerjo-vol-01/thai-love-song/" target="_blank" rel="noopener">$1</a>').replace('CC BY 4.0','<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a>').replace('Free Music Archive','<a href="https://freemusicarchive.org/" target="_blank" rel="noopener">Free Music Archive</a>').replace('Freesound','<a href="https://freesound.org/people/SieuAmThanh/sounds/454675/" target="_blank" rel="noopener">Freesound</a>')}
function cardHTML(c){let d=c[lang]||c.zh, i=+c.cat-1;return `<div class="flipper"><div class="back"><img draggable="false" src="img/back-${c.cat}${lang==='th'?'-th':''}.webp" alt=""><span>${c.num}</span>${lang==='zh'?'':`<div class="back-subtitle${lang==='th'?' th-line':''}">${{en:'Follow along, or make it your own',th:'ทำตามแบบ หรือสร้างในแบบของคุณ'}[lang]}</div>`}</div><div class="face"><span class="pill" style="background:${['#4A8C1A','#E0A24A','#E08A6A'][i]}">${d.pill}</span><span class="number">${c.num}</span><img class="illustration" draggable="false" src="s/${c.svg}.svg" alt=""><div class="card-text"><h3>${d.title}</h3><p>${d.sub}</p><p><b>${d.label}</b> ${d.line}</p></div><span class="card-foot">${d.foot}</span><img class="card-logo" src="img/logo.svg" alt=""></div></div>`}
function fitCard(el){
 const text=el.querySelector('.card-text');if(!text)return;
 const blocks=[...text.querySelectorAll('h3,p')];
 blocks.forEach(b=>b.style.fontSize='');
 let scale=1;
 while((text.scrollHeight>text.clientHeight+1 || blocks.some(b=>b.scrollWidth>b.clientWidth+1)) && scale>.48){
  scale-=.04;blocks.forEach(b=>b.style.fontSize=`${(b.tagName==='H3'?9:4.5)*scale}cqw`);
 }
}
function showLarge(index){
 largeIndex=index;const c=current[index],large=$('#largeCard');let wasOpen=large.querySelector('.flipper')?.classList.contains('open')??true;
 large.innerHTML='';let copy=document.createElement('div');copy.className='reveal-card';copy.innerHTML=cardHTML(c);copy.querySelector('.flipper').classList.toggle('open',wasOpen);copy.onclick=()=>copy.querySelector('.flipper').classList.toggle('open');large.append(copy);$('#large').hidden=false;fitCard(copy);
}
function renderCards(){let box=$('#reveals');box.innerHTML='';current.forEach((c,i)=>{let el=document.createElement('div');el.className='reveal-card'+(current.length===1?' single':'');el.innerHTML=cardHTML(c);box.append(el);fitCard(el);el.onclick=()=>{if(el.querySelector('.flipper').classList.contains('open')){largeIndex=-1;showLarge(i)}}});}
$('#drawAll').onclick=()=>draw(['01','02','03']);$('#again').onclick=()=>draw(drawCats);$('#close').onclick=()=>{drawTimers.forEach(clearTimeout);$('#stage').hidden=true};$('#closeLarge').onclick=()=>$('#large').hidden=true;
async function loadImage(src){return new Promise((resolve,reject)=>{let i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src=src})}function wrapCanvas(ctx,text,x,y,maxWidth,lineHeight,maxLines=4){
 const words=lang==='zh'?[...text]:text.split(/(?<=\s)|(?=\s)/);let lines=[],line='';
 for(const word of words){let test=line+word;if(ctx.measureText(test).width>maxWidth && line.trim()){lines.push(line.trim());line=word.trimStart()}else line=test}
 if(line.trim())lines.push(line.trim());lines.slice(0,maxLines).forEach((l,i)=>ctx.fillText(l,x,y+i*lineHeight,maxWidth));return lines.length*lineHeight;
}
async function paintCard(ctx,c,x,y,w){
 const d=c[lang]||c.zh,h=w*84/52;ctx.save();ctx.translate(x,y);ctx.fillStyle='#fff9ec';ctx.fillRect(0,0,w,h);
 ctx.strokeStyle='#83a7a0';ctx.lineWidth=w*.003;ctx.strokeRect(w*.06,h*.06,w*.88,h*.88);
 ctx.fillStyle=['#4a8c1a','#e0a24a','#e08a6a'][+c.cat-1];ctx.beginPath();ctx.roundRect(w*.10,h*.09,w*.4,h*.045,h*.022);ctx.fill();
 ctx.fillStyle='#fff';ctx.textAlign='center';ctx.font=`bold ${w*.035}px sans-serif`;ctx.fillText(d.pill,w*.30,h*.12,w*.37);
 ctx.fillStyle='#065e60';ctx.textAlign='right';ctx.font=`${w*.04}px sans-serif`;ctx.fillText(c.num,w*.89,h*.12);
 let illustration=await loadImage('s/'+c.svg+'.svg');ctx.drawImage(illustration,w*.12,h*.15,w*.76,h*.35);
 ctx.textAlign='center';ctx.fillStyle='#065e60';ctx.font=`bold ${w*.075}px sans-serif`;wrapCanvas(ctx,d.title,w*.5,h*.56,w*.8,w*.09,2);
 ctx.fillStyle='#6f5c4c';ctx.font=`${w*.039}px sans-serif`;wrapCanvas(ctx,d.sub,w*.5,h*.64,w*.8,w*.052,3);
 ctx.fillStyle='#b8782a';ctx.font=`bold ${w*.035}px sans-serif`;ctx.fillText(d.label,w*.5,h*.745,w*.8);
 ctx.fillStyle='#6f5c4c';ctx.font=`${w*.035}px sans-serif`;wrapCanvas(ctx,d.line,w*.5,h*.78,w*.8,w*.048,3);
 ctx.textAlign='left';ctx.fillStyle='#595959';ctx.font=`${w*.024}px sans-serif`;ctx.fillText(d.foot,w*.10,h*.92,w*.65);
 let logo=await loadImage('img/logo.svg');ctx.drawImage(logo,w*.765,h*.845,w*.17,w*.17);ctx.restore();
}
async function saveCards(){
 let canvas=document.createElement('canvas'),ctx=canvas.getContext('2d'),combo=current.length>1;
 canvas.width=combo?1440:720;canvas.height=combo?1020:Math.round(720*84/52);
 ctx.fillStyle=combo?'#065e60':'#fff9ec';ctx.fillRect(0,0,canvas.width,canvas.height);
 if(combo){ctx.fillStyle='#fff9ec';ctx.textAlign='center';ctx.font='32px sans-serif';ctx.fillText(strings[lang].title,720,75,1300);ctx.font='19px sans-serif';ctx.fillText(strings[lang].footer,720,975,1300);}
 for(let i=0;i<current.length;i++)await paintCard(ctx,current[i],combo?110+i*420:0,combo?215:0,combo?380:720);
 download(canvas,combo);
}
async function withQr(source,logoCorner){
 const width=Math.max(1080,source.width),factor=width/source.width,strip=200,canvas=document.createElement('canvas');canvas.width=width;canvas.height=Math.round(source.height*factor)+strip;
 const ctx=canvas.getContext('2d');ctx.fillStyle='#065e60';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(source,0,0,width,source.height*factor);
 const y=canvas.height-strip,qr=await loadImage('img/site-qr.svg');ctx.fillStyle='#fff9ec';ctx.beginPath();ctx.roundRect(38,y+22,156,156,12);ctx.fill();ctx.drawImage(qr,45,y+29,142,142);
 ctx.fillStyle='#fff9ec';ctx.textAlign='left';ctx.font='bold 25px sans-serif';ctx.fillText(({zh:'CMI 水灯灵感卡',en:'CMI Krathong Inspiration Cards',th:'การ์ดไอเดียกระทง CMI'})[lang],220,y+84,width-440);
 ctx.font='17px sans-serif';ctx.fillStyle='#e8c77a';ctx.fillText('linklinkguan.github.io/cmi-loykrathong-cards',220,y+120,width-440);if(logoCorner!==undefined){const lg=await loadImage('img/logo-white.webp'),lh=logoCorner?170:100,lw=lh*(lg.naturalWidth/lg.naturalHeight||1);ctx.drawImage(lg,width-lw-40,y+(strip-lh)/2,lw,lh)}return canvas;
}
async function download(source,logoCorner){const canvas=await withQr(source,logoCorner);canvas.toBlob(blob=>{let url=URL.createObjectURL(blob);if(/iPad|iPhone|iPod/.test(navigator.userAgent)){$('#saveImage').src=url;$('#saveOverlay').hidden=false}else{let a=document.createElement('a');a.href=url;a.download='cmi-lantern-card-'+Date.now()+'.png';a.click();setTimeout(()=>URL.revokeObjectURL(url),30000)}},'image/png')}
$('#save').onclick=saveCards;
function route(){let tab=['cards','builder','culture','river','upload'].includes(location.hash.slice(1))?location.hash.slice(1):'cards';['cards','builder','culture'].forEach(id=>$('#'+id).hidden=id!==tab);document.body.classList.toggle('builder-mode',tab==='builder');$$('[data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab||(b.dataset.tab==='river'&&(tab==='builder'||tab==='upload'))));if(tab==='builder')ensureBuilder().then(()=>window.builderOnEnter&&window.builderOnEnter())}$$('[data-tab]').forEach(b=>b.onclick=()=>location.hash=b.dataset.tab);window.addEventListener('hashchange',route);
window.builderLanguage=()=>lang;window.builderStrings=()=>strings[lang];window.builderMuted=()=>sfxOff;window.builderPing=addNote;window.builderDownload=download;window.builderWithQr=withQr;
function renderParts(){if(window.builderRefresh)window.builderRefresh()}
let builderLoading;
function ensureBuilder(){if(builderLoading)return builderLoading;const script=src=>new Promise((resolve,reject)=>{let el=document.createElement('script');el.src=src;el.onload=resolve;el.onerror=reject;document.head.append(el)});builderLoading=script('vendor/konva-10.10.0.min.js').then(()=>/* v14.1: load inspiration before the builder. */script('js/inspire.js?v=144')).then(()=>script('js/builder.js?v=1501')).catch(e=>{builderLoading=null;$('#builder-workspace').textContent='Unable to load builder';console.error(e)});return builderLoading}
translate();route();

if(new URLSearchParams(location.search).has('selftest')){
 window.runCardSelfTest=()=>{
  let previous=lang,host=document.createElement('div'),failures=[];
  host.style.cssText='position:fixed;left:-2000px;top:0;width:108px;visibility:hidden';document.body.append(host);
  for(const l of ['zh','en','th']){lang=l;for(const card of CARD_DATA){
   let el=document.createElement('div');el.className='reveal-card';el.style.width='108px';el.innerHTML=cardHTML(card);host.replaceChildren(el);fitCard(el);
   let text=el.querySelector('.card-text');if(text.scrollHeight>text.clientHeight+1||[...text.querySelectorAll('h3,p')].some(b=>b.scrollWidth>b.clientWidth+1))failures.push(l+':'+card.num);
  }}host.remove();lang=previous;return {tested:CARD_DATA.length*3,failures};
 };
}
