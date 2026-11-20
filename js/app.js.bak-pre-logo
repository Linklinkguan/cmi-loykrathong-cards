/* © 2026 CMI Community (Chiang Mai). Designed and made by 林可 (Link) for the 2026 CMI 水灯庆典. Original design; please credit CMI Community when reusing. */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const strings=window.UI_DATA;
let lang=localStorage.cmiLkLang||(/^zh/i.test(navigator.language)?'zh':/^th/i.test(navigator.language)?'th':'en'), muted=localStorage.cmiLkMute==='true', entered=false, current=[], last={}, drawCats=[]; const music=$('#music'); music.volume=0;
function translate(){let t=strings[lang];document.documentElement.lang=lang==='zh'?'zh-CN':lang;document.title=t.title;$$('[data-i]').forEach(e=>e.textContent=t[e.dataset.i]);$$('[data-lang]').forEach(e=>e.classList.toggle('active',e.dataset.lang===lang));$('#decks').innerHTML=t.names.map((n,i)=>`<button class="deck" data-cat="0${i+1}"><div class="stack">${Array(5).fill(`<img draggable="false" src="img/back-0${i+1}.webp" alt="">`).join('')}${lang==='zh'?'':`<span class="stack-subtitle">${{en:'Follow along, or make it your own',th:'ทำตามแบบ หรือสร้างในแบบของคุณ'}[lang]}</span>`}</div><strong>${n}</strong><small>${t.count}</small></button>`).join('');$('#singles').innerHTML=t.single.map((n,i)=>`<button data-cat="0${i+1}">${n}</button>`).join(''); $$('#decks button,#singles button').forEach(b=>b.onclick=()=>draw([b.dataset.cat]));if(current.length){renderCards();$$('#reveals .flipper').forEach(e=>e.classList.add('open'));if(!$('#large').hidden&&largeIndex>=0)showLarge(largeIndex)}renderParts();renderCulture(lang);}
$$('[data-lang]').forEach(b=>b.onclick=()=>{lang=b.dataset.lang;localStorage.cmiLkLang=lang;translate()});function setMute(){muted=!muted;localStorage.cmiLkMute=muted;$('#mute').textContent=muted?'♪̸':'♫';$('#mute').setAttribute('aria-label',muted?'播放音乐':'静音');if(muted)music.pause();else if(entered)startMusic()}$('#mute').onclick=setMute;function startMusic(){if(muted)return;music.volume=0;music.play().catch(()=>{});let n=0;let timer=setInterval(()=>{music.volume=Math.min(.5,++n/30*.5);if(n>=30)clearInterval(timer)},50)}document.addEventListener('visibilitychange',()=>{if(document.hidden)music.pause();else if(entered&&!muted)music.play().catch(()=>{})});$('#enter').onclick=enter;let started=Date.now();$('#greeting').onclick=()=>{if(Date.now()-started>1000)enter()};function enter(){if(entered)return;entered=true;$('#greeting').classList.add('hide');startMusic();setTimeout(()=>$('#greeting').hidden=true,900)}
function weighted(cat){let list=CARD_DATA.filter(c=>c.cat===cat);function pick(){let r=Math.random()*list.reduce((a,c)=>a+c.w,0);return list.find(c=>(r-=c.w)<=0)||list.at(-1)}let c=pick();if(c.num===last[cat])c=pick();last[cat]=c.num;return c}
let drawTimers=[],largeIndex=-1;
function draw(cats){
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
function ping(){if(muted)return;try{let a=new AudioContext(),o=a.createOscillator(),g=a.createGain();o.frequency.value=600;o.type='sine';g.gain.setValueAtTime(.04,a.currentTime);g.gain.exponentialRampToValueAtTime(.001,a.currentTime+.16);o.connect(g).connect(a.destination);o.start();o.stop(a.currentTime+.17)}catch(e){}}
function cardHTML(c){let d=c[lang]||c.zh, i=+c.cat-1;return `<div class="flipper"><div class="back"><img draggable="false" src="img/back-${c.cat}.webp" alt=""><span>${c.num}</span>${lang==='zh'?'':`<div class="back-subtitle">${{en:'Follow along, or make it your own',th:'ทำตามแบบ หรือสร้างในแบบของคุณ'}[lang]}</div>`}</div><div class="face"><span class="pill" style="background:${['#4A8C1A','#E0A24A','#E08A6A'][i]}">${d.pill}</span><span class="number">${c.num}</span><img class="illustration" draggable="false" src="s/${c.svg}.svg" alt=""><div class="card-text"><h3>${d.title}</h3><p>${d.sub}</p><p><b>${d.label}</b> ${d.line}</p></div><span class="card-foot">${d.foot}</span><img class="card-logo" src="img/logo.svg" alt=""></div></div>`}
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
 let logo=await loadImage('img/logo.svg');ctx.drawImage(logo,w*.78,h*.865,w*.13,w*.13);ctx.restore();
}
async function saveCards(){
 let canvas=document.createElement('canvas'),ctx=canvas.getContext('2d'),combo=current.length>1;
 canvas.width=combo?1440:720;canvas.height=combo?1020:Math.round(720*84/52);
 ctx.fillStyle=combo?'#065e60':'#fff9ec';ctx.fillRect(0,0,canvas.width,canvas.height);
 if(combo){ctx.fillStyle='#fff9ec';ctx.textAlign='center';ctx.font='32px sans-serif';ctx.fillText(strings[lang].title,720,75,1300);ctx.font='19px sans-serif';ctx.fillText(strings[lang].footer,720,975,1300);let logo=await loadImage('img/logo-white.webp');ctx.drawImage(logo,675,88,90,64)}
 for(let i=0;i<current.length;i++)await paintCard(ctx,current[i],combo?110+i*420:0,combo?175:0,combo?380:720);
 download(canvas);
}
async function withQr(source){
 const width=Math.max(1080,source.width),factor=width/source.width,strip=200,canvas=document.createElement('canvas');canvas.width=width;canvas.height=Math.round(source.height*factor)+strip;
 const ctx=canvas.getContext('2d');ctx.fillStyle='#065e60';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(source,0,0,width,source.height*factor);
 const y=canvas.height-strip,qr=await loadImage('img/site-qr.svg');ctx.fillStyle='#fff9ec';ctx.beginPath();ctx.roundRect(38,y+22,156,156,12);ctx.fill();ctx.drawImage(qr,45,y+29,142,142);
 ctx.fillStyle='#fff9ec';ctx.textAlign='left';ctx.font='bold 25px sans-serif';ctx.fillText(({zh:'CMI 水灯灵感卡',en:'CMI Krathong Inspiration Cards',th:'การ์ดไอเดียกระทง CMI'})[lang],220,y+84,width-250);
 ctx.font='17px sans-serif';ctx.fillStyle='#e8c77a';ctx.fillText('linklinkguan.github.io/cmi-loykrathong-cards',220,y+120,width-250);return canvas;
}
async function download(source){const canvas=await withQr(source);canvas.toBlob(blob=>{let url=URL.createObjectURL(blob);if(/iPad|iPhone|iPod/.test(navigator.userAgent)){$('#saveImage').src=url;$('#saveOverlay').hidden=false}else{let a=document.createElement('a');a.href=url;a.download='cmi-lantern-card-'+Date.now()+'.png';a.click();setTimeout(()=>URL.revokeObjectURL(url),30000)}},'image/png')}
$('#save').onclick=saveCards;
function route(){let tab=['cards','builder','culture'].includes(location.hash.slice(1))?location.hash.slice(1):'cards';['cards','builder','culture'].forEach(id=>$('#'+id).hidden=id!==tab);document.body.classList.toggle('builder-mode',tab==='builder');$$('[data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));if(tab==='builder')ensureBuilder()}$$('[data-tab]').forEach(b=>b.onclick=()=>location.hash=b.dataset.tab);window.addEventListener('hashchange',route);
window.builderLanguage=()=>lang;window.builderStrings=()=>strings[lang];window.builderMuted=()=>muted;window.builderPing=ping;window.builderDownload=download;window.builderWithQr=withQr;
function renderParts(){if(window.builderRefresh)window.builderRefresh()}
let builderLoading;
function ensureBuilder(){if(builderLoading)return builderLoading;const script=src=>new Promise((resolve,reject)=>{let el=document.createElement('script');el.src=src;el.onload=resolve;el.onerror=reject;document.head.append(el)});builderLoading=script('vendor/konva-10.10.0.min.js').then(()=>script('js/builder.js')).catch(e=>{builderLoading=null;$('#builder-workspace').textContent='Unable to load builder';console.error(e)});return builderLoading}
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
