/* © 2026 CMI Community (Chiang Mai). Designed and made by 林可 (Link) for the 2026 CMI 水灯庆典. Original design; please credit CMI Community when reusing. */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const strings=window.UI_DATA;
let lang=localStorage.cmiLkLang||(/^zh/i.test(navigator.language)?'zh':/^th/i.test(navigator.language)?'th':'en'), muted=localStorage.cmiLkMute==='true', entered=false, current=[], last={}, drawCats=[]; const music=$('#music'); music.volume=0;
function translate(){let t=strings[lang];document.documentElement.lang=lang==='zh'?'zh-CN':lang;document.title=t.title;$$('[data-i]').forEach(e=>e.textContent=t[e.dataset.i]);$$('[data-lang]').forEach(e=>e.classList.toggle('active',e.dataset.lang===lang));$('#decks').innerHTML=t.names.map((n,i)=>`<button class="deck" data-cat="0${i+1}"><div class="stack">${Array(5).fill(`<img draggable="false" src="img/back-0${i+1}.webp" alt="">`).join('')}</div><strong>${n}</strong><small>${t.count}</small></button>`).join('');$('#singles').innerHTML=t.single.map((n,i)=>`<button data-cat="0${i+1}">${n}</button>`).join(''); $$('#decks button,#singles button').forEach(b=>b.onclick=()=>draw([b.dataset.cat]));if(current.length){renderCards();$$('#reveals .flipper').forEach(e=>e.classList.add('open'));if(!$('#large').hidden&&largeIndex>=0)showLarge(largeIndex)}renderParts();renderCulture(lang);}
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
function cardHTML(c){let d=c[lang]||c.zh, i=+c.cat-1;return `<div class="flipper"><div class="back"><img draggable="false" src="img/back-${c.cat}.webp" alt=""><span>${c.num}</span></div><div class="face"><span class="pill" style="background:${['#4A8C1A','#E0A24A','#E08A6A'][i]}">${d.pill}</span><span class="number">${c.num}</span><img class="illustration" draggable="false" src="s/${c.svg}.svg" alt=""><div class="card-text"><h3>${d.title}</h3><p>${d.sub}</p><p><b>${d.label}</b> ${d.line}</p></div><span class="card-foot">${d.foot}</span><img class="card-logo" src="img/logo.svg" alt=""></div></div>`}
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
 ctx.textAlign='center';ctx.fillStyle='#065e60';ctx.font=`bold ${w*.075}px serif`;wrapCanvas(ctx,d.title,w*.5,h*.56,w*.8,w*.09,2);
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
 if(combo){ctx.fillStyle='#fff9ec';ctx.textAlign='center';ctx.font='32px serif';ctx.fillText(strings[lang].title,720,75,1300);ctx.font='19px sans-serif';ctx.fillText(strings[lang].footer,720,975,1300);let logo=await loadImage('img/logo-white.webp');ctx.drawImage(logo,675,88,90,64)}
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
function route(){let tab=['cards','builder','culture'].includes(location.hash.slice(1))?location.hash.slice(1):'cards';['cards','builder','culture'].forEach(id=>$('#'+id).hidden=id!==tab);$$('[data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab))}$$('[data-tab]').forEach(b=>b.onclick=()=>location.hash=b.dataset.tab);window.addEventListener('hashchange',route);
const partNames={zh:['香蕉杆','蕉叶围边','蕉叶折瓣','蜡烛','线香','小佛像','万寿菊','兰花','茉莉','莲花苞','千日红','星星纸','缎带玫瑰'],en:['Banana trunk','Leaf wrap','Folded petals','Candle','Incense','Small Buddha','Marigold','Orchid','Jasmine','Lotus bud','Globe amaranth','Paper stars','Ribbon rose'],th:['หยวกกล้วย','ใบตองพันรอบ','กลีบใบตอง','เทียน','ธูป','พระพุทธรูปองค์เล็ก','ดาวเรือง','กล้วยไม้','มะลิ','ดอกบัวตูม','บานไม่รู้โรย','ดาวกระดาษ','กุหลาบริบบิ้น']};let scene=JSON.parse(localStorage.cmiLkBuilder||'[]'),history=[],selected=-1,lit=false,floating=false;const colors=['#8eb85f','#f1dfa6','#d99e4b','#e89a9a','#ac87b7','#f8f4dd','#d66557'];
function renderParts(){$('#parts').innerHTML=partNames[lang].map((n,i)=>`<button data-part="${i}">＋ ${n}</button>`).join('');$$('[data-part]').forEach(b=>b.onclick=()=>addPart(+b.dataset.part));renderScene()}
function addPart(type){history.push(JSON.stringify(scene));let x=200,y=type===0?290:type===1?275:type===2?240:type===3||type===4||type===5?200:235; if(type>=6)x=115+(scene.filter(p=>p.type>=6).length%5)*42;scene.push({type,x,y,color:type<3?0:type===3?1:type===4?2:type===5?2:type===6?2:type===7?4:type===8?5:type===9?3:type===10?4:type===11?3:6,variant:0,scale:1,mirror:1});selected=scene.length-1;renderScene()}
function shape(p){let c=colors[p.color],v=p.variant%2;switch(p.type){case 0:return `<ellipse cy="12" rx="112" ry="30" fill="#bfcf8c"/><path d="M-112 0 Q0 30 112 0 L112 28 Q0 58 -112 28Z" fill="${c}"/><ellipse rx="112" ry="28" fill="#e4e6ba"/><path d="M-95 5 Q0 28 95 5" fill="none" stroke="#a4b77b"/>`;case 1:return `<path d="M-110 0 Q0 33 110 0 L105 30 Q0 60 -105 30Z" fill="${c}" stroke="#d2d89b"/>${Array.from({length:9},(_,i)=>`<path d="M${-90+i*22} 5 l10 32" stroke="#c1df8f" opacity=".6"/>`).join('')}`;case 2:return Array.from({length:7},(_,i)=>`<path d="M${-90+i*30} 30 Q${-100+i*30} 0 ${-75+i*30} ${v?-35:-60} Q${-45+i*30} 0 ${-60+i*30} 30Z" fill="${c}" stroke="#c0da8d"/>`).join('');case 3:return `<rect x="-8" y="-48" width="16" height="70" rx="4" fill="${c}"/>${lit?'<path d="M0 -80 Q-16 -55 0 -50 Q16 -55 0 -80" fill="#ffc85b"/>':''}`;case 4:return [-6,0,6].map(x=>`<path d="M${x} 20 L${x} -60" stroke="#a85e40" stroke-width="2"/>`).join('');case 5:return `<circle cy="-40" r="11" fill="${c}"/><path d="M-10 -25 Q-24 -10 -15 10 Q-40 15 -38 24 Q0 34 38 24 Q40 15 15 10 Q24 -10 10 -25Z" fill="${c}"/>`;case 11:return `<path d="M0 -22 L6 -7 22 -7 10 3 14 20 0 11 -14 20 -10 3 -22 -7 -6 -7Z" fill="${c}" stroke="#fff4c3"/>`;default:return `<g fill="${c}" stroke="#fff1cd" stroke-width="1">${Array.from({length:6},(_,i)=>`<ellipse cy="-10" rx="8" ry="15" transform="rotate(${i*60})"/>`).join('')}<circle r="7" fill="#f3c25c"/></g>`}}
function renderScene(){localStorage.cmiLkBuilder=JSON.stringify(scene);$('#scene').innerHTML=`<path d="M0 320 Q100 300 200 320 T400 320 V400 H0Z" fill="#0a5b5c"/><path d="M0 340 Q100 320 200 340 T400 340 M0 365 Q100 345 200 365 T400 365" stroke="#c6d8a0" opacity=".35" fill="none"/>`+scene.map((p,i)=>`<g data-index="${i}" transform="translate(${p.x} ${p.y}) scale(${p.scale*p.mirror} ${p.scale})" style="cursor:move">${shape(p)}${selected===i?'<circle r="35" fill="none" stroke="#fff" stroke-dasharray="4 4" opacity=".6"/>':''}</g>`).join('');$('#partControls').innerHTML=selected<0?'':`<button data-op="variant">◀ ▶</button>${colors.map((c,i)=>`<button data-color="${i}" style="background:${c};padding:9px"></button>`).join('')}<button data-op="smaller">−</button><button data-op="bigger">＋</button><button data-op="mirror">⇄</button><button data-op="front">↑</button><button data-op="back">↓</button><button data-op="delete">×</button>`;$$('[data-color]').forEach(b=>b.onclick=()=>{scene[selected].color=+b.dataset.color;renderScene()});$$('[data-op]').forEach(b=>b.onclick=()=>{history.push(JSON.stringify(scene));let p=scene[selected];switch(b.dataset.op){case'variant':p.variant++;break;case'smaller':p.scale*=.9;break;case'bigger':p.scale*=1.1;break;case'mirror':p.mirror*=-1;break;case'delete':scene.splice(selected,1);selected=-1;break;case'front':if(selected<scene.length-1){scene.splice(selected,1);scene.splice(++selected,0,p)}break;case'back':if(selected>0){scene.splice(selected,1);scene.splice(--selected,0,p)}break}renderScene()})}
$('#scene').onpointerdown=e=>{let g=e.target.closest('[data-index]');if(!g)return;selected=+g.dataset.index;history.push(JSON.stringify(scene));e.currentTarget.setPointerCapture(e.pointerId);renderScene()};$('#scene').onpointermove=e=>{if(!e.buttons||selected<0)return;let r=$('#scene').getBoundingClientRect(),p=scene[selected];p.x=Math.round((e.clientX-r.left)/r.width*400/10)*10;p.y=Math.round((e.clientY-r.top)/r.height*400/10)*10;renderScene()};$('#undo').onclick=()=>{if(history.length){scene=JSON.parse(history.pop());selected=-1;renderScene()}};$('#clear').onclick=()=>{if(confirm(lang==='zh'?'清空作品？':lang==='th'?'ล้างผลงานหรือไม่?':'Clear your creation?')){history.push(JSON.stringify(scene));scene=[];selected=-1;renderScene()}};$('#light').onclick=()=>{lit=!lit;renderScene()};$('#float').onclick=()=>{floating=!floating;$('#scene').style.animation=floating?'bob 3s ease-in-out infinite':''};async function sceneCanvas(){let svg=$('#scene').cloneNode(true);svg.querySelectorAll('[stroke-dasharray]').forEach(e=>e.remove());let blob=new Blob([new XMLSerializer().serializeToString(svg)],{type:'image/svg+xml'}),url=URL.createObjectURL(blob),im=await loadImage(url),canvas=document.createElement('canvas');canvas.width=800;canvas.height=900;let ctx=canvas.getContext('2d');ctx.fillStyle='#065e60';ctx.fillRect(0,0,800,900);ctx.drawImage(im,0,40,800,800);ctx.fillStyle='#fff9ec';ctx.textAlign='center';ctx.font='24px sans-serif';ctx.fillText(strings[lang].builderTitle,400,35);ctx.font='16px sans-serif';ctx.fillText(strings[lang].footer,400,875);URL.revokeObjectURL(url);return canvas}$('#saveBuilder').onclick=async()=>download(await sceneCanvas());$('#keep').onclick=async()=>{let c=await withQr(await sceneCanvas()),small=document.createElement('canvas');small.width=160;small.height=Math.round(c.height/c.width*160);small.getContext('2d').drawImage(c,0,0,small.width,small.height);let gallery=JSON.parse(localStorage.cmiLkGallery||'[]');gallery.unshift(small.toDataURL('image/png'));localStorage.cmiLkGallery=JSON.stringify(gallery.slice(0,6));showGallery()};function showGallery(){$('#gallery').innerHTML=JSON.parse(localStorage.cmiLkGallery||'[]').map(s=>`<img src="${s}" alt="">`).join('')};translate();route();showGallery();

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
