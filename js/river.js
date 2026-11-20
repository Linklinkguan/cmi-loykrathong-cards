/* © 2026 CMI Community (Chiang Mai). 上传我的水灯 / 水灯列表 / 全屏放水灯. All user text is rendered with textContent. */
(()=>{
const API='https://cmi-krathong-api.cmi-studio-brand.workers.dev';
const $=s=>document.querySelector(s);
const el=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=text;return e};
const lang=()=>{try{return localStorage.cmiLkLang||'zh'}catch(e){return 'zh'}};
const S={
zh:{upload:'上传我的水灯',list:'水灯列表',float:'放水灯',closed:'上传已截止',title:'水灯河',sub:'现场实拍和网站合成的水灯，都漂在这里。',all:'全部',photo:'实拍',composed:'合成',empty:'还没有水灯，来做第一盏吧！',more:'加载中…',end:'已经到底啦',formTitle:'上传我的水灯',formTitleC:'把这盏水灯提交到水灯河',take:'📷 拍一张水灯',pick:'从相册选择',retake:'重新选择',name:'名字',namePh:'只写昵称就好',intro:'介绍',introPh:'介绍一下你的水灯（可选）',wish:'祝福',wishPh:'写一句祝福（可选）',notice:'提交后会公开展示；为防滥用，提交时会记录设备和网络信息，仅管理员可见。请不要填写电话、微信等联系方式。',submit:'提交到水灯河',sending:'提交中…',cancel:'取消',needImg:'请先拍一张或选一张水灯照片',needName:'请填写名字（昵称即可）',tooLong:'字数超过了',done:'提交成功，你的水灯已经漂进水灯河！',pending:'提交成功，审核后会出现在水灯河。',badImg:'这张图片读不出来，请换一张（JPG/PNG）',e413:'图片太大了，请换一张或重新拍',e415:'只支持 JPG、PNG、WebP 图片',e429:'提交太频繁了，请 {s} 秒后再试',e403:'上传已截止，谢谢你的参与',enet:'网络不太稳，正在重试…',efail:'提交失败，请检查网络后再试',close:'关闭',by:'',introL:'介绍',wishL:'祝福',floatEmpty:'水面还很安静，等第一盏水灯漂过来…',exit:'退出',mine:'我的',count:'共 {n} 盏',submitBuilder:'提交到水灯河',emptyBuilder:'先在画布上做一盏水灯，再提交吧'},
en:{upload:'Upload my krathong',list:'Krathong river',float:'Float them all',closed:'Uploads closed',title:'Krathong river',sub:'Photos from the day and krathongs made on this site, all floating together.',all:'All',photo:'Photos',composed:'Made here',empty:'No krathongs yet. Be the first!',more:'Loading…',end:'That’s all for now',formTitle:'Upload my krathong',formTitleC:'Send this krathong to the river',take:'📷 Take a photo',pick:'Choose from album',retake:'Choose again',name:'Name',namePh:'A nickname is enough',intro:'About it',introPh:'Tell us about your krathong (optional)',wish:'Wish',wishPh:'A wish or blessing (optional)',notice:'Your krathong will be shown publicly. To prevent abuse, device and network information is recorded with each submission and is visible only to the organisers. Please don’t include phone numbers or messaging IDs.',submit:'Send to the river',sending:'Sending…',cancel:'Cancel',needImg:'Please take or choose a photo first',needName:'Please enter a name (a nickname is fine)',tooLong:'Too long',done:'Done! Your krathong is floating on the river.',pending:'Sent! It will appear after review.',badImg:'This image can’t be read. Please try another (JPG/PNG).',e413:'The image is too large. Please try another.',e415:'Only JPG, PNG or WebP images are supported',e429:'Too many submissions. Please try again in {s} s.',e403:'Uploads are closed. Thank you for joining!',enet:'Weak connection, retrying…',efail:'Could not send. Please check your connection and try again.',close:'Close',introL:'About',wishL:'Wish',floatEmpty:'The water is still quiet. Waiting for the first krathong…',exit:'Exit',mine:'Mine',count:'{n} krathongs',submitBuilder:'Send to the river',emptyBuilder:'Make a krathong on the canvas first'},
th:{upload:'อัปโหลดกระทงของฉัน',list:'สายน้ำกระทง',float:'ลอยกระทง',closed:'ปิดรับอัปโหลดแล้ว',title:'สายน้ำกระทง',sub:'กระทงจากรูปถ่ายในงานและกระทงที่ทำบนเว็บไซต์ ลอยอยู่ด้วยกันที่นี่',all:'ทั้งหมด',photo:'รูปถ่าย',composed:'ทำบนเว็บ',empty:'ยังไม่มีกระทง มาเป็นคนแรกกันเถอะ!',more:'กำลังโหลด…',end:'หมดแล้ว',formTitle:'อัปโหลดกระทงของฉัน',formTitleC:'ส่งกระทงนี้ลงสายน้ำ',take:'📷 ถ่ายรูปกระทง',pick:'เลือกจากอัลบั้ม',retake:'เลือกใหม่',name:'ชื่อ',namePh:'ใช้ชื่อเล่นก็พอ',intro:'แนะนำ',introPh:'เล่าเรื่องกระทงของคุณ (ไม่บังคับ)',wish:'คำอธิษฐาน',wishPh:'คำอวยพร (ไม่บังคับ)',notice:'กระทงของคุณจะแสดงต่อสาธารณะ เพื่อป้องกันการใช้งานในทางที่ผิด ระบบจะบันทึกข้อมูลอุปกรณ์และเครือข่าย ซึ่งผู้ดูแลเท่านั้นที่เห็น กรุณาอย่าใส่เบอร์โทรหรือไอดีแชท',submit:'ส่งลงสายน้ำ',sending:'กำลังส่ง…',cancel:'ยกเลิก',needImg:'กรุณาถ่ายหรือเลือกรูปก่อน',needName:'กรุณาใส่ชื่อ (ชื่อเล่นก็ได้)',tooLong:'ยาวเกินไป',done:'สำเร็จ! กระทงของคุณลอยอยู่ในสายน้ำแล้ว',pending:'ส่งแล้ว จะแสดงหลังตรวจสอบ',badImg:'อ่านรูปนี้ไม่ได้ ลองรูปอื่น (JPG/PNG)',e413:'รูปใหญ่เกินไป ลองรูปอื่น',e415:'รองรับเฉพาะ JPG, PNG, WebP',e429:'ส่งถี่เกินไป ลองใหม่ใน {s} วินาที',e403:'ปิดรับอัปโหลดแล้ว ขอบคุณที่ร่วมงาน',enet:'สัญญาณไม่ดี กำลังลองใหม่…',efail:'ส่งไม่สำเร็จ กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองใหม่',close:'ปิด',introL:'แนะนำ',wishL:'คำอธิษฐาน',floatEmpty:'สายน้ำยังเงียบอยู่ รอกระทงใบแรก…',exit:'ออก',mine:'ของฉัน',count:'{n} กระทง',submitBuilder:'ส่งลงสายน้ำ',emptyBuilder:'ทำกระทงบนผืนผ้าใบก่อน'}};
const t=k=>(S[lang()]||S.en)[k]??S.en[k];
let config={open:true,limits:{name:20,intro:80,wish:60,image_bytes:2097152,thumb_bytes:307200}};
const cp=s=>[...(s||'')].length;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function getJSON(path,tries=3){let err;for(let i=0;i<tries;i++){try{let r=await fetch(API+path,{cache:'no-store'});if(r.status>=500)throw new Error('server');return await r.json()}catch(e){err=e;await sleep(600*(i+1))}}throw err}
const bkk=iso=>{try{return new Intl.DateTimeFormat(lang()==='zh'?'zh-CN':lang(),{timeZone:'Asia/Bangkok',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(iso))+' (UTC+7)'}catch(e){return ''}};
const mine=()=>{try{return JSON.parse(localStorage.cmiLkMine||'[]')}catch(e){return[]}};

/* ---------- entry pills ---------- */
function renderPills(){let box=$('.event-links');if(!box)return;box.querySelectorAll('.river-pill').forEach(n=>n.remove());
 const mk=(id,label,act)=>{let b=el('button','event-link river-pill'+(id==='up'?' river-pill-main':''),label);b.type='button';b.dataset.river=id;b.onclick=act;return b};
 if(config.open)box.append(mk('up','⇪ '+t('upload'),()=>openForm({kind:'photo'})));else box.append(mk('closed','⇪ '+t('closed'),()=>{location.hash='river'}));
 box.append(mk('list','☷ '+t('list'),()=>{location.hash='river'}),mk('float','🪷 '+t('float'),()=>openFloat()))}

/* ---------- image processing ---------- */
async function decode(file){try{return await createImageBitmap(file,{imageOrientation:'from-image'})}catch(e){}
 return await new Promise((res,rej)=>{let u=URL.createObjectURL(file),im=new Image();im.onload=()=>res(im);im.onerror=rej;im.src=u})}
function draw(src,long,type,q){let w=src.width,h=src.height,s=Math.min(1,long/Math.max(w,h)),c=document.createElement('canvas');c.width=Math.round(w*s);c.height=Math.round(h*s);let x=c.getContext('2d');if(type==='image/jpeg'){x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height)}x.imageSmoothingQuality='high';x.drawImage(src,0,0,c.width,c.height);return new Promise(r=>c.toBlob(b=>r(b),type,q))}
async function photoBlobs(file){let bm=await decode(file);let main=await draw(bm,1600,'image/jpeg',.8);if(main&&main.size>config.limits.image_bytes)main=await draw(bm,1280,'image/jpeg',.7);let thumb=await draw(bm,480,'image/jpeg',.75);return {main,thumb,preview:URL.createObjectURL(thumb)}}
async function alphaBlobs(canvas){let probe=await new Promise(r=>canvas.toBlob(r,'image/webp',.9)),type=probe&&probe.type==='image/webp'?'image/webp':'image/png';
 let main=type==='image/webp'?probe:await new Promise(r=>canvas.toBlob(r,'image/png'));if(main.size>config.limits.image_bytes)main=await draw(canvas,900,type,.85);let thumb=await draw(canvas,480,type,.8);return {main,thumb,type,preview:URL.createObjectURL(thumb)}}
window.riverAlphaBlobs=alphaBlobs;

/* ---------- upload form ---------- */
let formState=null;
function openForm(opts){if(!config.open){toast(t('e403'));return}closeForm();formState={kind:opts.kind,blobs:opts.blobs||null};
 let ov=el('div','river-modal');ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');let card=el('form','river-form');card.noValidate=true;ov.append(card);
 card.append(el('h2','',opts.kind==='composed'?t('formTitleC'):t('formTitle')));
 let pv=el('div','river-preview');let img=el('img');img.alt='';pv.append(img);
 let pick=el('div','river-pick');
 if(opts.kind==='photo'){let cam=el('label','river-btn river-btn-gold');let ci=el('input');ci.type='file';ci.accept='image/*';ci.setAttribute('capture','environment');cam.append(el('span','',t('take')),ci);
  let alb=el('label','river-btn');let ai=el('input');ai.type='file';ai.accept='image/*';alb.append(el('span','',t('pick')),ai);pick.append(cam,alb);
  const onfile=async e=>{let f=e.target.files&&e.target.files[0];if(!f)return;msg('');pv.classList.add('busy');try{formState.blobs=await photoBlobs(f);img.src=formState.blobs.preview;pv.classList.add('has');cam.firstChild.textContent=t('retake')}catch(err){msg(t('badImg'),true)}pv.classList.remove('busy');e.target.value=''};
  ci.onchange=onfile;ai.onchange=onfile}
 else{img.src=opts.blobs.preview;pv.classList.add('has','alpha')}
 card.append(pv,pick);
 const field=(key,max,multi)=>{let wrap=el('label','river-field');let head=el('span','river-label');head.append(el('span','',t(key)+(key==='name'?' *':'')));let cnt=el('span','river-count','0/'+max);head.append(cnt);let inp=el(multi?'textarea':'input');if(!multi)inp.type='text';inp.name=key;inp.placeholder=t(key+'Ph');if(multi)inp.rows=2;inp.autocomplete='off';
  inp.oninput=()=>{let n=cp(inp.value);cnt.textContent=n+'/'+max;cnt.classList.toggle('over',n>max)};wrap.append(head,inp);card.append(wrap);return inp};
 let L=config.limits,fn=field('name',L.name),fi=field('intro',L.intro,true),fw=field('wish',L.wish,true);
 try{let last=localStorage.cmiLkNick;if(last){fn.value=last;fn.oninput()}}catch(e){}
 card.append(el('p','river-notice',t('notice')));
 let bar=el('div','river-progress');let fill=el('i');bar.append(fill);bar.hidden=true;card.append(bar);
 let m=el('p','river-msg');m.setAttribute('aria-live','polite');card.append(m);
 function msg(s,bad){m.textContent=s;m.classList.toggle('bad',!!bad)}
 let acts=el('div','river-actions');let cancel=el('button','river-btn',t('cancel'));cancel.type='button';cancel.onclick=closeForm;let send=el('button','river-btn river-btn-gold',t('submit'));send.type='submit';acts.append(cancel,send);card.append(acts);
 card.onsubmit=async e=>{e.preventDefault();if(send.disabled)return;
  if(!formState.blobs)return msg(t('needImg'),true);let name=fn.value.trim(),intro=fi.value.trim(),wish=fw.value.trim();
  if(!name)return msg(t('needName'),true);if(cp(name)>L.name||cp(intro)>L.intro||cp(wish)>L.wish)return msg(t('tooLong'),true);
  send.disabled=true;send.textContent=t('sending');bar.hidden=false;fill.style.width='3%';msg('');
  let fd=new FormData();fd.append('kind',formState.kind);fd.append('name',name);fd.append('intro',intro);fd.append('wish',wish);fd.append('lang',lang());
  let ext=formState.kind==='photo'?'jpg':(formState.blobs.type==='image/webp'?'webp':'png');fd.append('image',formState.blobs.main,'lantern.'+ext);if(formState.blobs.thumb&&formState.blobs.thumb.size<=L.thumb_bytes)fd.append('thumb',formState.blobs.thumb,'thumb.'+ext);
  try{let res=await upload(fd,p=>fill.style.width=Math.max(3,p*100)+'%',()=>msg(t('enet')));
   if(res.ok){try{localStorage.cmiLkNick=name;let ids=mine();ids.unshift(res.id);localStorage.cmiLkMine=JSON.stringify(ids.slice(0,30))}catch(e){}
    fill.style.width='100%';closeForm();toast(res.pending?t('pending'):t('done'));highlight=res.id;if(location.hash==='#river')loadList(true);else location.hash='river'}
   else{msg(errText(res),true)}}
  catch(err){msg(t('efail'),true)}
  send.disabled=false;send.textContent=t('submit')};
 ov.addEventListener('click',e=>{if(e.target===ov)closeForm()});document.body.append(ov);document.body.classList.add('river-lock');setTimeout(()=>fn.focus({preventScroll:true}),50)}
function closeForm(){let o=$('.river-modal');if(o)o.remove();document.body.classList.remove('river-lock')}
function errText(res){let st=res._status;if(res.messages&&res.messages[lang()])return res.messages[lang()];if(st===413)return t('e413');if(st===415)return t('e415');if(st===429)return t('e429').replace('{s}',res._retry||60);if(st===403)return t('e403');return res.message||t('efail')}
function upload(fd,onp,onretry){return new Promise((resolve,reject)=>{let tries=0;const go=()=>{let x=new XMLHttpRequest();x.open('POST',API+'/api/lanterns');x.timeout=60000;x.upload.onprogress=e=>{if(e.lengthComputable)onp(e.loaded/e.total*.95)};
  x.onload=()=>{let j={};try{j=JSON.parse(x.responseText)}catch(e){}j._status=x.status;j._retry=x.getResponseHeader('Retry-After');if(x.status>=500&&tries<2){tries++;onretry();setTimeout(go,1500*tries);return}if(!('ok' in j))j.ok=x.status<300;resolve(j)};
  const fail=()=>{if(tries<2){tries++;onretry();setTimeout(go,1500*tries)}else reject(new Error('net'))};x.onerror=fail;x.ontimeout=fail;x.send(fd)};go()})}
function toast(s){let o=el('div','river-toast',s);document.body.append(o);setTimeout(()=>o.classList.add('show'),10);setTimeout(()=>{o.classList.remove('show');setTimeout(()=>o.remove(),400)},3600)}
window.riverOpenUpload=openForm;window.riverToast=toast;

/* ---------- list ---------- */
let cursor=null,loading=false,done=false,filter='all',highlight=null,total=0,observer=null;
function section(){return $('#river')}
function renderShell(){let s=section();if(!s)return;s.textContent='';
 let intro=el('div','section-intro');intro.append(el('span','','✧'),el('h2','',t('title')),el('p','',t('sub')));
 let tools=el('div','river-tools');
 if(config.open){let up=el('button','river-btn river-btn-gold','⇪ '+t('upload'));up.type='button';up.onclick=()=>openForm({kind:'photo'});tools.append(up)}
 let fl=el('button','river-btn','🪷 '+t('float'));fl.type='button';fl.onclick=openFloat;tools.append(fl);
 let chips=el('div','river-chips');['all','photo','composed'].forEach(k=>{let c=el('button','river-chip'+(k===filter?' on':''),t(k));c.type='button';c.onclick=()=>{filter=k;chips.querySelectorAll('.river-chip').forEach(x=>x.classList.toggle('on',x===c));applyFilter()};chips.append(c)});
 let cnt=el('p','river-total');let grid=el('div','river-grid');let foot=el('p','river-foot',t('more'));
 s.append(intro,tools,chips,cnt,grid,foot);
 if(observer)observer.disconnect();observer=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting))loadMore()},{rootMargin:'600px'});observer.observe(foot)}
function applyFilter(){section().querySelectorAll('.river-card').forEach(c=>c.hidden=filter!=='all'&&c.dataset.kind!==filter);updateFoot()}
function updateFoot(){let s=section(),foot=s&&s.querySelector('.river-foot');if(!foot)return;let vis=[...s.querySelectorAll('.river-card')].filter(c=>!c.hidden).length;foot.textContent=loading?t('more'):done?(vis?t('end'):t('empty')):t('more');let tot=s.querySelector('.river-total');if(tot)tot.textContent=total?t('count').replace('{n}',total):''}
async function loadList(reset){if(reset){cursor=null;done=false;renderShell()}await loadMore()}
async function loadMore(){if(loading||done)return;loading=true;updateFoot();try{let q='/api/lanterns?limit=30'+(cursor?'&cursor='+encodeURIComponent(cursor):'');let j=await getJSON(q);if(j.ok){total=j.total||0;let grid=section().querySelector('.river-grid');j.items.forEach(it=>grid.append(card(it)));cursor=j.next_cursor;done=!cursor;applyFilter();
  if(highlight){let c=grid.querySelector(`[data-id="${CSS.escape(highlight)}"]`);if(c){c.classList.add('hl');c.scrollIntoView({block:'center',behavior:'smooth'});highlight=null}}}}catch(e){}loading=false;updateFoot();
 let foot=section().querySelector('.river-foot');if(!done&&foot&&foot.getBoundingClientRect().top<innerHeight+600)setTimeout(loadMore,50)}
function card(it){let b=el('button','river-card');b.type='button';b.dataset.id=it.id;b.dataset.kind=it.kind;if(mine().includes(it.id))b.classList.add('is-mine');
 let fig=el('div','river-thumb'+(it.kind==='composed'?' alpha':''));let im=el('img');im.loading='lazy';im.decoding='async';im.alt='';im.src=it.thumb_url||it.image_url;fig.append(im);
 let tag=el('span','river-kind',t(it.kind));fig.append(tag);if(b.classList.contains('is-mine'))fig.append(el('span','river-mine',t('mine')));
 b.append(fig,el('strong','river-name',it.name));if(it.wish)b.append(el('span','river-wish',it.wish));b.onclick=()=>openDetail(it);return b}
function openDetail(it){let ov=el('div','river-modal river-detail');let box=el('div','river-detail-box');let im=el('img');im.alt='';im.src=it.image_url;let fig=el('div','river-big'+(it.kind==='composed'?' alpha':''));fig.append(im);
 let meta=el('div','river-meta');meta.append(el('span','river-kind',t(it.kind)),el('h3','',it.name));if(it.intro){meta.append(el('h4','',t('introL')),el('p','',it.intro))}if(it.wish){meta.append(el('h4','',t('wishL')),el('p','river-wish-big',it.wish))}meta.append(el('small','',bkk(it.created_at)));
 let x=el('button','river-x','×');x.type='button';x.setAttribute('aria-label',t('close'));x.onclick=()=>ov.remove();box.append(x,fig,meta);ov.append(box);ov.onclick=e=>{if(e.target===ov)ov.remove()};document.body.append(ov)}

/* ---------- full-screen float ---------- */
let F=null;
function openFloat(){if(F)return;let ov=el('div','river-float');let cv=el('canvas');let ui=el('div','river-float-ui');let x=el('button','river-btn',t('exit'));x.type='button';x.onclick=closeFloat;ui.append(x);let note=el('p','river-float-note','');ov.append(cv,note,ui);document.body.append(ov);document.body.classList.add('river-lock');
 F={ov,cv,ctx:cv.getContext('2d'),note,items:[],queue:[],live:[],imgs:new Map(),last:0,spawnAt:0,fetchedAt:0,stars:[],raf:0};
 let rq=ov.requestFullscreen||ov.webkitRequestFullscreen;if(rq){try{let p=rq.call(ov);if(p&&p.catch)p.catch(()=>ov.classList.add('pseudo'))}catch(e){ov.classList.add('pseudo')}}else ov.classList.add('pseudo');
 document.addEventListener('fullscreenchange',fsChange);document.addEventListener('webkitfullscreenchange',fsChange);document.addEventListener('keydown',escKey);
 resize();addEventListener('resize',resize);for(let i=0;i<70;i++)F.stars.push([Math.random(),Math.random()*.36,Math.random()*1.4+.3,Math.random()*6]);
 let music=$('#music');if(music&&!(window.builderMuted&&window.builderMuted())){try{music.volume=.5;music.play().catch(()=>{})}catch(e){}}
 refresh();F.raf=requestAnimationFrame(tick)}
function fsChange(){if(F&&!(document.fullscreenElement||document.webkitFullscreenElement)&&!F.ov.classList.contains('pseudo'))closeFloat()}
function escKey(e){if(e.key==='Escape')closeFloat()}
function closeFloat(){if(!F)return;cancelAnimationFrame(F.raf);removeEventListener('resize',resize);document.removeEventListener('fullscreenchange',fsChange);document.removeEventListener('webkitfullscreenchange',fsChange);document.removeEventListener('keydown',escKey);
 let ov=F.ov;F=null;if(document.fullscreenElement||document.webkitFullscreenElement){(document.exitFullscreen||document.webkitExitFullscreen).call(document)}ov.remove();document.body.classList.remove('river-lock')}
function resize(){if(!F)return;let d=Math.min(devicePixelRatio||1,2),w=F.ov.clientWidth||innerWidth,h=F.ov.clientHeight||innerHeight;F.cv.width=w*d;F.cv.height=h*d;F.cv.style.width=w+'px';F.cv.style.height=h+'px';F.ctx.setTransform(d,0,0,d,0,0);F.W=w;F.H=h}
async function refresh(){if(!F)return;F.fetchedAt=performance.now();try{let j=await getJSON('/api/lanterns?random=1&limit=100');if(F&&j.ok){F.items=j.items;F.queue=shuffle(j.items.slice());j.items.forEach(prep)}}catch(e){}if(F)F.note.textContent=F.items.length?'':t('floatEmpty')}
const shuffle=a=>{for(let i=a.length-1;i>0;i--){let j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
function prep(it){if(F.imgs.has(it.id))return;let rec={ready:false,art:null};F.imgs.set(it.id,rec);let im=new Image();im.crossOrigin='anonymous';im.decoding='async';
 im.onload=()=>{rec.art=it.kind==='photo'?photoCard(im):im;rec.ar=(rec.art.width||1)/(rec.art.height||1);rec.ready=true};im.src=(F.W>900?it.image_url:(it.thumb_url||it.image_url))}
function photoCard(im){let S=320,c=document.createElement('canvas');c.width=S;c.height=Math.round(S*.82);let x=c.getContext('2d'),w=c.width,h=c.height,s=Math.max(w/im.width,h/im.height);x.drawImage(im,(w-im.width*s)/2,(h-im.height*s)/2,im.width*s,im.height*s);
 x.globalCompositeOperation='destination-in';x.save();x.translate(w/2,h/2);x.scale(w/2,h/2);let g=x.createRadialGradient(0,0,0,0,0,1);g.addColorStop(0,'#000');g.addColorStop(.72,'#000');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(-1,-1,2,2);x.restore();return c}
function spawn(now){if(!F.queue.length){if(!F.items.length)return;F.queue=shuffle(F.items.slice())}
 for(let k=0;k<F.queue.length;k++){let it=F.queue[k],r=F.imgs.get(it.id);if(r&&r.ready){F.queue.splice(k,1);let lanes=F.live.map(l=>l.x0);let x0;for(let a=0;a<8;a++){x0=.12+Math.random()*.76;if(lanes.every(v=>Math.abs(v-x0)>.12))break}
   F.live.push({it,r,x0,t0:now,dur:26000+Math.random()*10000,ph:Math.random()*6,drift:(Math.random()-.5)*.16});return}}}
function tick(now){if(!F)return;F.raf=requestAnimationFrame(tick);let {ctx,W,H}=F,hz=H*.38;
 if(now-F.fetchedAt>120000)refresh();
 let maxLive=W<600?8:12;if(now>F.spawnAt&&F.live.length<maxLive){spawn(now);F.spawnAt=now+(W<600?3200:2400)+Math.random()*1200}
 // sky + water
 let g=ctx.createLinearGradient(0,0,0,hz);g.addColorStop(0,'#04122a');g.addColorStop(1,'#123a4e');ctx.fillStyle=g;ctx.fillRect(0,0,W,hz);
 for(let s of F.stars){let a=.35+.35*Math.sin(now/900+s[3]);ctx.fillStyle=`rgba(255,244,214,${a})`;ctx.fillRect(s[0]*W,s[1]*H,s[2],s[2])}
 let mx=W*.78,my=hz*.42,mr=Math.min(W,H)*.05;let mg=ctx.createRadialGradient(mx,my,mr*.2,mx,my,mr*4);mg.addColorStop(0,'rgba(255,236,180,.35)');mg.addColorStop(1,'rgba(255,236,180,0)');ctx.fillStyle=mg;ctx.fillRect(mx-mr*4,my-mr*4,mr*8,mr*8);ctx.fillStyle='#f6e7bd';ctx.beginPath();ctx.arc(mx,my,mr,0,7);ctx.fill();
 let wg=ctx.createLinearGradient(0,hz,0,H);wg.addColorStop(0,'#0e3a48');wg.addColorStop(1,'#021c22');ctx.fillStyle=wg;ctx.fillRect(0,hz,W,H-hz);
 ctx.fillStyle='rgba(246,231,189,.08)';for(let i=0;i<14;i++){let y=hz+(H-hz)*Math.pow(i/14,1.6)+6,w=W*(.06+.02*i);ctx.fillRect(mx-w/2+Math.sin(now/1300+i)*8,y,w,1.5)}
 ctx.strokeStyle='rgba(232,199,122,.10)';ctx.lineWidth=1;for(let i=1;i<9;i++){let y=hz+(H-hz)*Math.pow(i/9,1.8);ctx.beginPath();for(let x=0;x<=W;x+=24)ctx.lineTo(x,y+Math.sin(x/70+now/1600+i)*2*(i/9));ctx.stroke()}
 // lanterns: far ones first
 F.live=F.live.filter(l=>now-l.t0<l.dur);let order=F.live.map(l=>({l,p:(now-l.t0)/l.dur})).sort((a,b)=>b.p-a.p);
 let base=Math.min(W,H)*(W<600?.42:.30);
 for(let {l,p} of order){let e=1-Math.pow(1-p,1.35),y=H+base*.35-(H+base*.35-hz-6)*e,sc=1-.86*e,x=W*(l.x0+l.drift*e)+Math.sin(now/1400+l.ph)*10*sc,w=base*sc,h=w/l.r.ar;if(h>w*1.3){h=w*1.3;w=h*l.r.ar}x=Math.min(W-w*.55,Math.max(w*.55,x));
  let a=Math.min(1,p*8)*(p>.82?Math.max(0,(1-p)/.18):1),rot=Math.sin(now/1700+l.ph)*.04;
  // glow
  let gr=ctx.createRadialGradient(x,y-h*.35,1,x,y-h*.35,w*.9);gr.addColorStop(0,`rgba(255,200,110,${.30*a})`);gr.addColorStop(1,'rgba(255,200,110,0)');ctx.fillStyle=gr;ctx.fillRect(x-w,y-h*1.3,w*2,h*2);
  // reflection
  ctx.save();ctx.globalAlpha=a*.22;ctx.translate(x,y+2);ctx.scale(1,-.42);ctx.rotate(-rot);ctx.drawImage(l.r.art,-w/2,-h,w,h);ctx.restore();
  ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.rotate(rot);ctx.drawImage(l.r.art,-w/2,-h,w,h);ctx.restore();
  // flicker
  let fl=.6+.4*Math.sin(now/130+l.ph*3)*Math.sin(now/370+l.ph);ctx.save();ctx.globalCompositeOperation='lighter';let cg=ctx.createRadialGradient(x,y-h*.6,0,x,y-h*.6,w*.28);cg.addColorStop(0,`rgba(255,190,90,${.22*a*fl})`);cg.addColorStop(1,'rgba(255,190,90,0)');ctx.fillStyle=cg;ctx.fillRect(x-w*.3,y-h*.6-w*.3,w*.6,w*.6);ctx.restore();
  if(sc>.42){let ta=a*Math.min(1,(sc-.42)/.2),fs=Math.max(11,Math.round(15*sc+3));ctx.globalAlpha=ta;ctx.textAlign='center';ctx.font=`600 ${fs}px system-ui,-apple-system,"Noto Sans Thai",sans-serif`;ctx.fillStyle='#ffe9b0';ctx.shadowColor='rgba(0,0,0,.6)';ctx.shadowBlur=4;let ty=y+fs*1.3;ctx.fillText(l.it.name,x,ty,w*1.6);if(l.it.wish){ctx.font=`${fs-2}px system-ui,-apple-system,"Noto Sans Thai",sans-serif`;ctx.fillStyle='#fff9ec';ctx.fillText(l.it.wish.length>26?l.it.wish.slice(0,25)+'…':l.it.wish,x,ty+fs*1.25,Math.max(w*1.9,180))}ctx.shadowBlur=0;ctx.globalAlpha=1}}
}

/* ---------- routing & language ---------- */
function route(){let on=location.hash==='#river',s=section();if(!s)return;s.hidden=!on;if(on){['cards','builder','culture'].forEach(id=>{let e=$('#'+id);if(e)e.hidden=true});document.querySelectorAll('[data-tab]').forEach(b=>b.classList.remove('active'));loadList(true)}}
addEventListener('hashchange',route);
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('[data-lang]'))setTimeout(()=>{renderPills();if(location.hash==='#river')loadList(true)},30)});
renderPills();route();
getJSON('/api/config').then(j=>{if(j&&j.ok){config=j;if(!j.limits)config.limits={name:20,intro:80,wish:60,image_bytes:2097152,thumb_bytes:307200};renderPills();if(location.hash==='#river')renderShell(),loadList(true);window.dispatchEvent(new Event('river-config'))}}).catch(()=>{});
window.riverConfig=()=>config;window.riverText=t;
})();
