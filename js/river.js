/* © 2026 CMI Community (Chiang Mai). 上传我的水灯 / 水灯列表 / 全屏放水灯. All user text is rendered with textContent. */
(()=>{
const API='https://cmi-krathong-api.cmi-studio-brand.workers.dev';
const $=s=>document.querySelector(s);
const el=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=text;return e};
const lang=()=>{try{return localStorage.cmiLkLang||'zh'}catch(e){return 'zh'}};
const S={
zh:{home:'水灯',homeSub:'放一盏水灯，许一个心愿。现场实拍的、在线创作的，都会漂进这条河。',floatD:'全屏观看大家的水灯缓缓漂远',uploadD:'拍下你在现场做的水灯',make:'在线制作水灯',makeD:'用兰纳材料做一盏，再送进水灯河',everyone:'大家的水灯',back:'水灯',upload:'上传水灯',list:'水灯列表',float:'放水灯',closed:'上传已截止',title:'水灯河',sub:'现场实拍和在线创作的水灯，都漂在这里。',all:'全部',photo:'实拍',composed:'在线创作',empty:'还没有水灯，来做第一盏吧！',more:'加载中…',end:'已经到底啦',formTitle:'上传我的水灯',formTitleC:'把这盏水灯提交到水灯河',take:'拍照',pick:'从相册选择',retake:'重新选择',name:'名字',namePh:'只写昵称就好',intro:'介绍',introPh:'介绍一下你的水灯（可选）',wish:'祝福',wishPh:'写一句祝福（可选）',notice:'提交后会公开展示；为防滥用，提交时会记录设备和网络信息，仅管理员可见。请不要填写电话、微信等联系方式。',submit:'提交到水灯河',sending:'提交中…',cancel:'取消',needImg:'请先拍一张或选一张水灯照片',needName:'请填写名字（昵称即可）',tooLong:'字数超过了',done:'提交成功，你的水灯已经漂进水灯河！',pending:'提交成功，审核后会出现在水灯河。',badImg:'这张图片读不出来，请换一张（JPG/PNG）',e413:'图片太大了，请换一张或重新拍',e415:'只支持 JPG、PNG、WebP 图片',e429:'提交太频繁了，请 {s} 秒后再试',e403:'上传已截止，谢谢你的参与',enet:'网络不太稳，正在重试…',efail:'提交失败，请检查网络后再试',close:'关闭',by:'',introL:'介绍',wishL:'祝福',floatEmpty:'水面还很安静，等第一盏水灯漂过来…',exit:'退出',mine:'我的',count:'共 {n} 盏',submitBuilder:'提交到水灯河',emptyBuilder:'先在画布上做一盏水灯，再提交吧'},
en:{home:'Krathong',homeSub:'Float a krathong, make a wish. Photos from the day and krathongs made online all drift down this river.',floatD:'Watch everyone’s krathongs drift away, full screen',uploadD:'Share a photo of the krathong you made',make:'Make one online',makeD:'Build one from Lanna materials, then send it to the river',everyone:'Everyone’s krathongs',back:'Krathong',upload:'Upload a krathong',list:'Krathong river',float:'Float them all',closed:'Uploads closed',title:'Krathong river',sub:'Photos from the day and krathongs made on this site, all floating together.',all:'All',photo:'Photos',composed:'Made online',empty:'No krathongs yet. Be the first!',more:'Loading…',end:'That’s all for now',formTitle:'Upload my krathong',formTitleC:'Send this krathong to the river',take:'Take a photo',pick:'Choose from album',retake:'Choose again',name:'Name',namePh:'A nickname is enough',intro:'About it',introPh:'Tell us about your krathong (optional)',wish:'Wish',wishPh:'A wish or blessing (optional)',notice:'Your krathong will be shown publicly. To prevent abuse, device and network information is recorded with each submission and is visible only to the organisers. Please don’t include phone numbers or messaging IDs.',submit:'Send to the river',sending:'Sending…',cancel:'Cancel',needImg:'Please take or choose a photo first',needName:'Please enter a name (a nickname is fine)',tooLong:'Too long',done:'Done! Your krathong is floating on the river.',pending:'Sent! It will appear after review.',badImg:'This image can’t be read. Please try another (JPG/PNG).',e413:'The image is too large. Please try another.',e415:'Only JPG, PNG or WebP images are supported',e429:'Too many submissions. Please try again in {s} s.',e403:'Uploads are closed. Thank you for joining!',enet:'Weak connection, retrying…',efail:'Could not send. Please check your connection and try again.',close:'Close',introL:'About',wishL:'Wish',floatEmpty:'The water is still quiet. Waiting for the first krathong…',exit:'Exit',mine:'Mine',count:'{n} krathongs',submitBuilder:'Send to the river',emptyBuilder:'Make a krathong on the canvas first'},
th:{home:'กระทง',homeSub:'ลอยกระทง อธิษฐานขอพร กระทงจากรูปถ่ายในงานและที่สร้างออนไลน์ ลอยไปด้วยกันในสายน้ำนี้',floatD:'ชมกระทงของทุกคนลอยไปแบบเต็มจอ',uploadD:'แชร์รูปกระทงที่คุณทำในงาน',make:'ทำกระทงออนไลน์',makeD:'ประกอบจากวัสดุล้านนา แล้วส่งลงสายน้ำ',everyone:'กระทงของทุกคน',back:'กระทง',upload:'อัปโหลดกระทง',list:'สายน้ำกระทง',float:'ลอยกระทง',closed:'ปิดรับอัปโหลดแล้ว',title:'สายน้ำกระทง',sub:'กระทงจากรูปถ่ายในงานและกระทงที่สร้างออนไลน์ ลอยอยู่ด้วยกันที่นี่',all:'ทั้งหมด',photo:'รูปถ่าย',composed:'สร้างออนไลน์',empty:'ยังไม่มีกระทง มาเป็นคนแรกกันเถอะ!',more:'กำลังโหลด…',end:'หมดแล้ว',formTitle:'อัปโหลดกระทงของฉัน',formTitleC:'ส่งกระทงนี้ลงสายน้ำ',take:'ถ่ายรูป',pick:'เลือกจากอัลบั้ม',retake:'เลือกใหม่',name:'ชื่อ',namePh:'ใช้ชื่อเล่นก็พอ',intro:'แนะนำ',introPh:'เล่าเรื่องกระทงของคุณ (ไม่บังคับ)',wish:'คำอธิษฐาน',wishPh:'คำอวยพร (ไม่บังคับ)',notice:'กระทงของคุณจะแสดงต่อสาธารณะ เพื่อป้องกันการใช้งานในทางที่ผิด ระบบจะบันทึกข้อมูลอุปกรณ์และเครือข่าย ซึ่งผู้ดูแลเท่านั้นที่เห็น กรุณาอย่าใส่เบอร์โทรหรือไอดีแชท',submit:'ส่งลงสายน้ำ',sending:'กำลังส่ง…',cancel:'ยกเลิก',needImg:'กรุณาถ่ายหรือเลือกรูปก่อน',needName:'กรุณาใส่ชื่อ (ชื่อเล่นก็ได้)',tooLong:'ยาวเกินไป',done:'สำเร็จ! กระทงของคุณลอยอยู่ในสายน้ำแล้ว',pending:'ส่งแล้ว จะแสดงหลังตรวจสอบ',badImg:'อ่านรูปนี้ไม่ได้ ลองรูปอื่น (JPG/PNG)',e413:'รูปใหญ่เกินไป ลองรูปอื่น',e415:'รองรับเฉพาะ JPG, PNG, WebP',e429:'ส่งถี่เกินไป ลองใหม่ใน {s} วินาที',e403:'ปิดรับอัปโหลดแล้ว ขอบคุณที่ร่วมงาน',enet:'สัญญาณไม่ดี กำลังลองใหม่…',efail:'ส่งไม่สำเร็จ กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองใหม่',close:'ปิด',introL:'แนะนำ',wishL:'คำอธิษฐาน',floatEmpty:'สายน้ำยังเงียบอยู่ รอกระทงใบแรก…',exit:'ออก',mine:'ของฉัน',count:'{n} กระทง',submitBuilder:'ส่งลงสายน้ำ',emptyBuilder:'ทำกระทงบนผืนผ้าใบก่อน'}};
const SV='<svg class="ri" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
const ICON={upload:SV+'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5"/><path d="M12 3v12"/></svg>',
 list:SV+'<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',
 lotus:SV+'<path d="M12 5c-2 2.2-2.8 4.6-2.8 7S10 16.4 12 18c2-1.6 2.8-3.6 2.8-6S14 7.2 12 5z"/><path d="M9.3 9.2C7.4 8.4 5.4 8.3 3.6 8.8c.2 3.8 2.8 7.6 8.4 9.2"/><path d="M14.7 9.2c1.9-.8 3.9-.9 5.7-.4-.2 3.8-2.8 7.6-8.4 9.2"/><path d="M3 20.5c3 0 3-1.5 6-1.5s3 1.5 6 1.5 3-1.5 6-1.5"/></svg>',
 camera:SV+'<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3.5"/></svg>',
 image:SV+'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/></svg>',
 make:SV+'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
 redo:SV+'<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></svg>'};
const ib=(tag,cls,icon,label)=>{let e=el(tag,cls);e.insertAdjacentHTML('afterbegin',ICON[icon]);e.append(el('span','',label));return e};
window.riverIcon=k=>ICON[k];
const t=k=>(S[lang()]||S.en)[k]??S.en[k];
let config={open:true,limits:{name:20,intro:80,wish:60,image_bytes:2097152,thumb_bytes:307200}};
const cp=s=>[...(s||'')].length;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function getJSON(path,tries=3){let err;for(let i=0;i<tries;i++){try{let r=await fetch(API+path,{cache:'no-store'});if(r.status>=500)throw new Error('server');return await r.json()}catch(e){err=e;await sleep(600*(i+1))}}throw err}
const bkk=iso=>{try{return new Intl.DateTimeFormat(lang()==='zh'?'zh-CN':lang(),{timeZone:'Asia/Bangkok',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(iso))+' (UTC+7)'}catch(e){return ''}};
const mine=()=>{try{return JSON.parse(localStorage.cmiLkMine||'[]')}catch(e){return[]}};

/* ---------- entry pills ---------- */
function renderPills(){document.querySelectorAll('.river-pill').forEach(n=>n.remove())}
function markPills(){}
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
let pendingUpload=null;
function openForm(opts){if(!config.open){toast(t('e403'));return}pendingUpload=opts||{kind:'photo'};if(location.hash!=='#upload')location.hash='upload';else renderUpload()}
function renderUpload(){let opts=pendingUpload&&(pendingUpload.kind==='photo'||pendingUpload.blobs)?pendingUpload:{kind:'photo'};let sec=$('#upload');if(!sec)return;sec.textContent='';formState={kind:opts.kind,blobs:opts.blobs||null};
 if(!config.open){sec.append(el('p','river-closed',t('e403')));return}
 let ov=el('div','upload-wrap');let card=el('form','river-form');card.noValidate=true;ov.append(card);
 card.append(el('h2','',opts.kind==='composed'?t('formTitleC'):t('formTitle')));
 let pv=el('div','river-preview');let img=el('img');img.alt='';pv.append(img);
 let pick=el('div','river-pick');
 if(opts.kind==='photo'){let cam=ib('label','river-btn river-btn-gold','camera',t('take'));let ci=el('input');ci.type='file';ci.accept='image/*';ci.setAttribute('capture','environment');cam.append(ci);
  let alb=ib('label','river-btn','image',t('pick'));let ai=el('input');ai.type='file';ai.accept='image/*';alb.append(ai);
  let again=ib('button','river-btn river-again','redo',t('retake'));again.type='button';again.hidden=true;again.onclick=()=>{again.hidden=true;cam.hidden=alb.hidden=false};pick.append(cam,alb,again);
  const onfile=async e=>{let f=e.target.files&&e.target.files[0];if(!f)return;msg('');pv.classList.add('busy');try{formState.blobs=await photoBlobs(f);img.src=formState.blobs.preview;pv.classList.add('has');cam.hidden=alb.hidden=true;again.hidden=false}catch(err){msg(t('badImg'),true)}pv.classList.remove('busy');e.target.value=''};
  ci.onchange=onfile;ai.onchange=onfile}
 else{img.src=opts.blobs.preview;pv.classList.add('has','alpha')}
 card.append(pv,pick);
 const field=(key,max,multi)=>{let wrap=el('label','river-field');let head=el('span','river-label');head.append(el('span','',t(key)+(key==='name'?' *':'')));let cnt=el('span','river-count','0/'+max);head.append(cnt);let inp=el(multi?'textarea':'input');if(!multi)inp.type='text';inp.name=key;inp.placeholder=t(key+'Ph');if(multi)inp.rows=2;inp.autocomplete='off';
  inp.oninput=()=>{let n=cp(inp.value);cnt.textContent=n+'/'+max;cnt.classList.toggle('over',n>max)};wrap.append(head,inp);card.append(wrap);return inp};
 let L=config.limits,fn=field('name',L.name),fi=field('intro',L.intro,true),fw=field('wish',L.wish,true);
 try{let last=localStorage.cmiLkNick;if(last){fn.value=last;fn.oninput()}}catch(e){}if(opts.info){[[fn,'name'],[fi,'intro'],[fw,'wish']].forEach(([inp,k])=>{if(opts.info[k]){inp.value=opts.info[k];inp.oninput()}})}
 card.append(el('p','river-notice',t('notice')));
 let bar=el('div','river-progress');let fill=el('i');bar.append(fill);bar.hidden=true;card.append(bar);
 let m=el('p','river-msg');m.setAttribute('aria-live','polite');card.append(m);
 function msg(s,bad){m.textContent=s;m.classList.toggle('bad',!!bad)}
 let acts=el('div','river-actions');let cancel=el('button','river-btn',t('cancel'));cancel.type='button';cancel.onclick=goBack;let send=el('button','river-btn river-btn-gold',t('submit'));send.type='submit';acts.append(cancel,send);card.append(acts);
 card.onsubmit=async e=>{e.preventDefault();if(send.disabled)return;
  if(!formState.blobs)return msg(t('needImg'),true);let name=fn.value.trim(),intro=fi.value.trim(),wish=fw.value.trim();
  if(!name)return msg(t('needName'),true);if(cp(name)>L.name||cp(intro)>L.intro||cp(wish)>L.wish)return msg(t('tooLong'),true);
  send.disabled=true;send.textContent=t('sending');bar.hidden=false;fill.style.width='3%';msg('');
  let fd=new FormData();fd.append('kind',formState.kind);fd.append('name',name);fd.append('intro',intro);fd.append('wish',wish);fd.append('lang',lang());
  let ext=formState.kind==='photo'?'jpg':(formState.blobs.type==='image/webp'?'webp':'png');fd.append('image',formState.blobs.main,'lantern.'+ext);if(formState.blobs.thumb&&formState.blobs.thumb.size<=L.thumb_bytes)fd.append('thumb',formState.blobs.thumb,'thumb.'+ext);
  try{let res=await upload(fd,p=>fill.style.width=Math.max(3,p*100)+'%',()=>msg(t('enet')));
   if(res.ok){try{localStorage.cmiLkNick=name;let ids=mine();ids.unshift(res.id);localStorage.cmiLkMine=JSON.stringify(ids.slice(0,30))}catch(e){}
    fill.style.width='100%';pendingUpload=null;toast(res.pending?t('pending'):t('done'));highlight=res.id;goHome()}
   else{msg(errText(res),true)}}
  catch(err){msg(t('efail'),true)}
  send.disabled=false;send.textContent=t('submit')};
 sec.append(ov);scrollTo(0,0)}
function closeForm(){}
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
 let intro=el('div','section-intro');intro.append(el('span','','✧'),el('h2','',t('home')),el('p','',t('homeSub')));
 let tools=el('div','river-entries');
 const entry=(id,icon,title,desc,act)=>{let b=el('button','river-entry');b.type='button';b.dataset.entry=id;let ic=el('span','river-entry-icon');ic.insertAdjacentHTML('afterbegin',ICON[icon]);let tx=el('span','river-entry-text');tx.append(el('strong','',title),el('small','',desc));b.append(ic,tx);b.onclick=act;return b};
 tools.append(entry('float','lotus',t('float'),t('floatD'),openFloat));
 tools.append(config.open?entry('upload','upload',t('upload'),t('uploadD'),()=>openForm({kind:'photo'})):entry('upload','upload',t('closed'),t('e403'),()=>toast(t('e403'))));
 tools.append(entry('make','make',t('make'),t('makeD'),()=>{location.hash='builder'}));
 let lh=el('h3','river-list-title',t('everyone'));
 let chips=el('div','river-chips');['all','photo','composed'].forEach(k=>{let c=el('button','river-chip'+(k===filter?' on':''),t(k));c.type='button';c.onclick=()=>{filter=k;chips.querySelectorAll('.river-chip').forEach(x=>x.classList.toggle('on',x===c));applyFilter()};chips.append(c)});
 let cnt=el('p','river-total');let grid=el('div','river-grid');let foot=el('p','river-foot',t('more'));
 s.append(intro,tools,lh,chips,cnt,grid,foot);
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

/* ---------- full-screen float (v14: uniform size, collision boxes, reflection under the lantern) ---------- */
/* v14: float settings (persisted), presets, live polling, scene registry */
const FS={zh:{settings:'设置',scene:'换背景',presets:'预设',repeat:'同一盏再出现间隔',rate:'新水灯出现频率',speed:'漂流速度',spread:'左右散开宽度',vdist:'上下分布',max:'同屏最多',size:'水灯大小',reset:'恢复默认',live:'实时',sec:'秒',every:'每 {s} 秒',n:'{n} 盏',fresh:'新',p:{calm:'静谧',lively:'热闹',galaxy:'星河',def:'默认'}},
 en:{settings:'Settings',scene:'Scene',presets:'Presets',repeat:'Same krathong returns after',rate:'New krathong every',speed:'Drift speed',spread:'Spread (width)',vdist:'Vertical spread',max:'Max on screen',size:'Krathong size',reset:'Reset',live:'Live',sec:'s',every:'{s} s',n:'{n}',fresh:'New',p:{calm:'Calm',lively:'Lively',galaxy:'Galaxy',def:'Default'}},
 th:{settings:'ตั้งค่า',scene:'เปลี่ยนฉาก',presets:'ค่าสำเร็จรูป',repeat:'กระทงเดิมกลับมาอีกหลัง',rate:'กระทงใหม่ทุก',speed:'ความเร็วลอย',spread:'ความกว้างการกระจาย',vdist:'การกระจายแนวตั้ง',max:'มากสุดบนจอ',size:'ขนาดกระทง',reset:'ค่าเริ่มต้น',live:'สด',sec:'วิ',every:'ทุก {s} วิ',n:'{n} ใบ',fresh:'ใหม่',p:{calm:'สงบ',lively:'คึกคัก',galaxy:'ทางช้างเผือก',def:'ค่าเริ่มต้น'}}};
const ft=k=>(FS[lang()]||FS.en)[k];
const FDEF={repeat:20,rate:2.4,speed:1,spread:.84,vdist:.15,max:10,size:1,scene:'s01'};
const FPRE={calm:{repeat:60,rate:4.5,speed:.7,spread:.7,vdist:.1,max:5,size:1.15,scene:'river'},lively:{repeat:8,rate:1,speed:1.35,spread:1,vdist:.55,max:18,size:.85,scene:'river'},galaxy:{repeat:15,rate:1.5,speed:.55,spread:1,vdist:1,max:20,size:.7,scene:'galaxy'},def:FDEF};
const FRNG={repeat:[0,180,5],rate:[.5,8,.1],speed:[.3,2.5,.05],spread:[.3,1,.02],vdist:[0,1,.05],max:[1,24,1],size:[.5,1.8,.05]};
let FSET=(()=>{try{return {...FDEF,...JSON.parse(localStorage.cmiLkFloat||'{}')}}catch(e){return {...FDEF}}})();
const saveFset=()=>{try{localStorage.cmiLkFloat=JSON.stringify(FSET)}catch(e){}};
/* Scene registry. A scene is {id,name:{zh,en,th},hz:0..1 horizon,draw(ctx,F,now)} or a layered spec
   {id,name,hz,layers:[{src,depth,y,h,blend,alpha}],stars:n,shimmer:true} — layered scenes (sky/far/near-shore) get subtle parallax.
   Drop-in later: put files + assets/scenes/manifest.json {"scenes":[layered specs]} and they register on open. */
const SCENES=[];const sceneById=id=>SCENES.find(s=>s.id===id)||SCENES[0];
function registerScene(s){let i=SCENES.findIndex(x=>x.id===s.id);if(i>=0)SCENES[i]=s;else SCENES.push(s)}
window.riverRegisterScene=registerScene;window.riverScenes=SCENES;
function skyStars(ctx,F,now,list,top){for(let s of list){let a=s[4]*(.55+.45*Math.sin(now/(700+s[3]*90)+s[3]));ctx.fillStyle=`rgba(255,244,214,${a})`;let x=s[0]*F.W+(F.px||0)*s[2]*2,y=s[1]*top;ctx.fillRect(x,y,s[2],s[2])}}
function moon(ctx,F,mx,my,mr){let mg=ctx.createRadialGradient(mx,my,mr*.2,mx,my,mr*4);mg.addColorStop(0,'rgba(255,236,180,.35)');mg.addColorStop(1,'rgba(255,236,180,0)');ctx.fillStyle=mg;ctx.fillRect(mx-mr*4,my-mr*4,mr*8,mr*8);ctx.fillStyle='#f6e7bd';ctx.beginPath();ctx.arc(mx,my,mr,0,7);ctx.fill()}
function water(ctx,F,now,c0,c1,mx){let {W,H,hz}=F;let wg=ctx.createLinearGradient(0,hz,0,H);wg.addColorStop(0,c0);wg.addColorStop(1,c1);ctx.fillStyle=wg;ctx.fillRect(0,hz,W,H-hz);
 ctx.fillStyle='rgba(246,231,189,.08)';for(let i=0;i<14;i++){let y=hz+(H-hz)*Math.pow(i/14,1.6)+6,w=W*(.06+.02*i);ctx.fillRect(mx-w/2+Math.sin(now/1300+i)*8,y,w,1.5)}
 ctx.strokeStyle='rgba(232,199,122,.10)';ctx.lineWidth=1;for(let i=1;i<9;i++){let y=hz+(H-hz)*Math.pow(i/9,1.8);ctx.beginPath();for(let x=0;x<=W;x+=24)ctx.lineTo(x,y+Math.sin(x/70+now/1600+i)*2*(i/9));ctx.stroke()}}
const mkStars=(n,maxY)=>Array.from({length:n},()=>[Math.random(),Math.random()*maxY,Math.random()*1.4+.3,Math.random()*6,.5+Math.random()*.5]);
const ST1=mkStars(70,1),ST2=mkStars(260,1),ST3=mkStars(140,1);
registerScene({id:'river',name:{zh:'水灯夜河',en:'Lantern river',th:'สายน้ำยามค่ำ'},hz:.38,draw(ctx,F,now){let {W,H,hz}=F;let g=ctx.createLinearGradient(0,0,0,hz);g.addColorStop(0,'#04122a');g.addColorStop(1,'#123a4e');ctx.fillStyle=g;ctx.fillRect(0,0,W,hz);skyStars(ctx,F,now,ST1,hz*.95);let mx=W*.78;moon(ctx,F,mx,hz*.42,Math.min(W,H)*.05);water(ctx,F,now,'#0e3a48','#021c22',mx)}});
registerScene({id:'galaxy',name:{zh:'星河',en:'Milky Way',th:'ทางช้างเผือก'},hz:.46,draw(ctx,F,now){let {W,H,hz}=F;let g=ctx.createLinearGradient(0,0,0,hz);g.addColorStop(0,'#020617');g.addColorStop(.7,'#0b1840');g.addColorStop(1,'#1b2f5c');ctx.fillStyle=g;ctx.fillRect(0,0,W,hz);
 ctx.save();ctx.translate(W*.5,hz*.5);ctx.rotate(-.42);let band=ctx.createLinearGradient(0,-hz*.22,0,hz*.22);band.addColorStop(0,'rgba(150,170,255,0)');band.addColorStop(.5,'rgba(205,190,255,.20)');band.addColorStop(1,'rgba(150,170,255,0)');ctx.fillStyle=band;ctx.fillRect(-W,-hz*.22,W*2,hz*.44);ctx.restore();
 skyStars(ctx,F,now,ST2,hz);let wg=ctx.createLinearGradient(0,hz,0,H);wg.addColorStop(0,'#16285a');wg.addColorStop(1,'#030a1c');ctx.fillStyle=wg;ctx.fillRect(0,hz,W,H-hz);
 for(let s of ST3){let a=s[4]*.35*(.5+.5*Math.sin(now/600+s[3]));ctx.fillStyle=`rgba(220,215,255,${a})`;ctx.fillRect(s[0]*W+Math.sin(now/1400+s[3])*3,hz+(H-hz)*Math.pow(s[1],1.4),s[2]*1.6,1)}}});
registerScene({id:'dusk',name:{zh:'古城黄昏',en:'Old-city dusk',th:'เมืองเก่ายามสนธยา'},hz:.4,draw(ctx,F,now){let {W,H,hz}=F;let g=ctx.createLinearGradient(0,0,0,hz);g.addColorStop(0,'#1a1035');g.addColorStop(.55,'#5b2a52');g.addColorStop(1,'#c46a4a');ctx.fillStyle=g;ctx.fillRect(0,0,W,hz);skyStars(ctx,F,now,ST1.slice(0,40),hz*.45);
 ctx.fillStyle='#120b22';let px=(F.px||0)*4;ctx.beginPath();ctx.moveTo(0,hz);for(let x=0;x<=W+40;x+=40){let k=Math.sin(x*.013)+Math.sin(x*.031);ctx.lineTo(x+px,hz-14-k*8)}ctx.lineTo(W,hz);ctx.fill();
 let cx=W*.3+px*1.5,cy=hz;ctx.beginPath();ctx.moveTo(cx-26,cy-10);ctx.lineTo(cx,cy-hz*.32);ctx.lineTo(cx+26,cy-10);ctx.fill();water(ctx,F,now,'#3a2448','#0a0716',W*.5)}});
const sceneImgs=new Map();
function loadSceneImg(src){if(!sceneImgs.has(src)){let im=new Image();im.decoding='async';let promise=new Promise(resolve=>{im.onload=()=>resolve(im);im.onerror=()=>resolve(null)});im.src=src;sceneImgs.set(src,{im,promise})}return sceneImgs.get(src)}
function sceneTransform(s,F){let portrait=F.W/F.H<1,scale=portrait?F.H/1440:F.W/2560;return {scale,portrait,ultra:F.W/F.H>21/9,x:portrait?F.W/2-(s.portraitFocusX??.5)*2560*scale:0,y:portrait?F.H*.5-s.horizonY*1440*scale:(F.H-1440*scale)/2}}
function bandPx(s,F){let t=sceneTransform(s,F),b=s.calmBand,x=Math.max(0,t.x+b.x*2560*t.scale),y=Math.max(0,t.y+b.y*1440*t.scale),right=Math.min(F.W,t.x+(b.x+b.w)*2560*t.scale),bottom=Math.min(F.H,t.y+(b.y+b.h)*1440*t.scale);return {x,y,w:Math.max(0,right-x),h:Math.max(0,bottom-y)}}
function sceneAssets(s){return Promise.all([...s.layers.map(l=>loadSceneImg('assets/scenes/'+l.file).promise),loadSceneImg('assets/scenes/'+s.shimmer.file).promise])}
function layerBitmap(s,L,F,scale,feather){let key=[L.file,Math.round(scale*10000),feather].join(':');s.cache??=new Map();if(s.cache.has(key))return s.cache.get(key);let im=loadSceneImg('assets/scenes/'+L.file).im;if(!im.complete||!im.naturalWidth)return null;let c=document.createElement('canvas');c.width=Math.max(1,Math.round(L.size[0]*scale));c.height=Math.max(1,Math.round(L.size[1]*scale));let x=c.getContext('2d');x.drawImage(im,0,0,c.width,c.height);if(feather){x.globalCompositeOperation='destination-out';let n=Math.min(c.width,120*scale),g=x.createLinearGradient(L.name==='near_l'?c.width-n:0,0,L.name==='near_l'?c.width:n,0);g.addColorStop(0,L.name==='near_l'?'transparent':'#000');g.addColorStop(1,L.name==='near_l'?'#000':'transparent');x.fillStyle=g;x.fillRect(0,0,c.width,c.height)}s.cache.set(key,c);return c}
function drawLayered(s,ctx,F,now){let {W,H}=F,t=sceneTransform(s,F),sky=s.layers.find(l=>l.name==='sky'),water=s.layers.find(l=>l.name==='water');ctx.fillStyle=sky.extendUp.color;ctx.fillRect(0,0,W,H);ctx.fillStyle=water.extendDown.color;ctx.fillRect(0,Math.max(0,t.y+s.horizonY*1440*t.scale),W,H);
 let nearL=s.layers.find(l=>l.name==='near_l'),nearR=s.layers.find(l=>l.name==='near_r');
 for(let L of s.layers.slice().sort((a,b)=>a.z-b.z)){if(t.ultra&&L.name==='near_c')continue;let scale=t.scale*(t.portrait&&L.group==='near'?.7:1),bm=layerBitmap(s,L,F,scale,t.ultra&&(L.name==='near_l'||L.name==='near_r'));if(!bm)continue;let dx=t.x+L.plate.x*t.scale,dy=t.y+L.plate.y*t.scale,shift=(F.px||0)*(L.parallax||0)*14;if(L.fit==='pin-left'){dx=0;dy=t.portrait?H-bm.height:t.y+(L.plate.y+L.size[1])*t.scale-bm.height}else if(L.fit==='pin-right'){dx=W-bm.width;dy=t.portrait?H-bm.height:t.y+(L.plate.y+L.size[1])*t.scale-bm.height}else if(L.fit==='tile-x-mirror'){let left=nearL?nearL.size[0]*scale:0,right=W-(nearR?nearR.size[0]*scale:0);dy=t.portrait?H-bm.height:t.y+(L.plate.y+L.size[1])*t.scale-bm.height;ctx.save();ctx.beginPath();ctx.rect(left,0,Math.max(0,right-left),H);ctx.clip();for(let x=left,i=0;x<right;x+=bm.width,i++){ctx.save();ctx.translate(x+shift+(i%2?bm.width:0),dy);if(i%2)ctx.scale(-1,1);ctx.drawImage(bm,0,0);ctx.restore()}ctx.restore();continue}ctx.drawImage(bm,dx+shift,dy);
 if(L.name==='sky'&&dy>0){let g=ctx.createLinearGradient(0,dy,0,dy+Math.min(80*t.scale,bm.height));g.addColorStop(0,sky.extendUp.color);g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.fillRect(0,dy,W,Math.min(80*t.scale,bm.height))}
 if(L.name==='sky'){let st=s.stars,region=st.skyRegion;ctx.fillStyle=st.color==='cool-white'?'#e4efff':st.color==='amber'?'#ffce80':'#fff0c7';for(let star of s.starPoints){let x=t.x+star[0]*2560*t.scale,y=t.y+(region.y0+star[1]*(region.y1-region.y0))*1440*t.scale;ctx.globalAlpha=.25+.65*(.5+.5*Math.sin(now/star[3]*Math.PI*2+star[4]));ctx.fillRect(x,y,star[2],star[2])}ctx.globalAlpha=1;if(st.shooting){if(!s.nextShooting)s.nextShooting=now+8000+Math.random()*7000;if(now>s.nextShooting){s.shootingAt=now;s.nextShooting=now+(st.shootingIntervalSec[0]+Math.random()*(st.shootingIntervalSec[1]-st.shootingIntervalSec[0]))*1000;s.shootX=Math.random()*W*.7;s.shootY=Math.random()*Math.max(1,F.hz*.6)}let p=(now-(s.shootingAt||-10000))/800;if(p>=0&&p<1){ctx.save();ctx.globalAlpha=Math.sin(p*Math.PI);let x=s.shootX+p*100,y=s.shootY+p*40,g=ctx.createLinearGradient(x-70,y-28,x,y);g.addColorStop(0,'transparent');g.addColorStop(1,'#fff8df');ctx.strokeStyle=g;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x-70,y-28);ctx.lineTo(x,y);ctx.stroke();ctx.restore()}}}
 if(L.name==='water'){let im=loadSceneImg('assets/scenes/'+s.shimmer.file).im;if(im.complete&&im.naturalWidth){let r=s.waterRect,y=t.y+r.y*1440*t.scale,h=r.h*1440*t.scale,offset=(now/1000*s.shimmer.speedPxPerSec)%W;ctx.save();ctx.beginPath();ctx.rect(0,y,W,h);ctx.clip();ctx.globalCompositeOperation=s.shimmer.blend;ctx.globalAlpha=s.shimmer.opacity;let mask=s.shimmerCanvas;if(!mask||mask.width!==Math.ceil(W)||mask.height!==Math.ceil(Math.max(1,h))){mask=document.createElement('canvas');mask.width=Math.ceil(W);mask.height=Math.ceil(Math.max(1,h));s.shimmerCanvas=mask}let mx=mask.getContext('2d');mx.clearRect(0,0,mask.width,mask.height);mx.globalCompositeOperation='source-over';mx.drawImage(im,-W+offset,0,W,h);mx.drawImage(im,offset,0,W,h);mx.globalCompositeOperation='destination-in';let fade=mx.createLinearGradient(0,0,0,h);fade.addColorStop(0,'rgba(0,0,0,.8)');fade.addColorStop(.4,'rgba(0,0,0,.15)');fade.addColorStop(1,'rgba(0,0,0,.65)');mx.fillStyle=fade;mx.fillRect(0,0,W,h);ctx.drawImage(mask,0,y);ctx.restore()}}}
 if(!s.prefetched){s.prefetched=true;let i=SCENES.indexOf(s),next=SCENES[(i+1)%SCENES.length];if(next&&next.layers)(window.requestIdleCallback||((f)=>setTimeout(f,1000)))(()=>sceneAssets(next))}}
let manifestPromise;function loadSceneManifest(){if(manifestPromise)return manifestPromise;manifestPromise=(async()=>{try{let r=await fetch('assets/scenes/scenes.json?v=1430',{cache:'no-cache'});if(!r.ok)return;let m=await r.json(),byId=new Map(m.scenes.filter(s=>s.enabled!==false).map(s=>[s.id,s]));for(let id of m.rotation){let s=byId.get(id);if(!s)continue;s.name=s.title;s.hz=s.horizonY;s.starPoints=Array.from({length:s.stars.count},()=>[Math.random(),Math.random(),Math.random()*s.stars.maxSize+.3,s.stars.twinkleMs[0]+Math.random()*(s.stars.twinkleMs[1]-s.stars.twinkleMs[0]),Math.random()*7]);s.draw=(ctx,F,now)=>drawLayered(s,ctx,F,now);registerScene(s)}SCENES.sort((a,b)=>{let ai=m.rotation.indexOf(a.id),bi=m.rotation.indexOf(b.id);return (ai<0?100:ai)-(bi<0?100:bi)})}catch(e){}})();return manifestPromise}
function applyFset(){if(!F)return;let sc=sceneById(FSET.scene);F.scene=sc;F.sceneId=sc.id;F.calmBandPx=sc.calmBand?bandPx(sc,F):null;F.maxOnScreen=Math.max(1,Math.floor(FSET.max*(sc.maxLanternsFactor??1)));F.hz=sc.calmBand?F.calmBandPx.y:F.H*(sc.hz??.38);F.base=F.base0*FSET.size;F.speed=(sc.calmBand?F.calmBandPx.h:F.H-F.hz)*.62/30*FSET.speed;if(sc.layers)sceneAssets(sc)}
function sceneBand(){return F.calmBandPx||{x:0,y:F.hz,w:F.W,h:F.H-F.hz}}
function switchScene(id){if(!F)return;let now=performance.now(),live=F.live.slice().sort((a,b)=>b.t0-a.t0);FSET.scene=id;applyFset();F.live=[];for(let l of live){let progress=Math.max(0,Math.min(1,(l.y0-l.y)/Math.max(1,l.y0-l.yEnd))),position=packLantern(l,F.live,progress);if(position&&F.live.length<F.maxOnScreen){Object.assign(l,position);delete l.remap;F.live.push(l)}}F.fillTarget=Math.ceil(F.maxOnScreen/2);F.fillAt=now;paintScene()}
window.riverSetScene=async id=>{await loadSceneManifest();let sc=SCENES.find(s=>s.id===id);if(!sc)throw new Error('Unknown scene: '+id);FSET.scene=id;saveFset();if(F)switchScene(id);if(sc.layers)await sceneAssets(sc)};
window.__riverF=()=>F;
let F=null;
async function openFloat(){if(F)return;await loadSceneManifest();if(F)return;let ov=el('div','river-float');let cv=el('canvas');let ui=el('div','river-float-ui');let mt=el('button','river-btn music-toggle');mt.type='button';mt.append(el('i','','▶'),el('span','',''));let x=el('button','river-btn',t('exit'));x.type='button';x.onclick=closeFloat;let sb=el('button','river-btn rf-scene');sb.type='button';sb.append(el('i','','◐'),el('span','',''));sb.onclick=cycleScene;let gb=el('button','river-btn rf-gear');gb.type='button';gb.setAttribute('aria-expanded','false');gb.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>';gb.setAttribute('aria-label',ft('settings'));gb.title=ft('settings');let panel=el('div','rf-panel');panel.hidden=true;gb.onclick=()=>{panel.hidden=!panel.hidden;gb.setAttribute('aria-expanded',String(!panel.hidden));if(!panel.hidden)renderPanel()};let live=el('span','rf-live','');ui.append(live,sb,gb,mt,x);let note=el('p','river-float-note','');ov.append(cv,note,ui,panel);document.body.append(ov);document.body.classList.add('river-lock');
 F={ov,cv,ctx:cv.getContext('2d'),note,panel,sb,liveEl:live,items:[],queue:[],fresh:[],seen:new Set(),shown:new Map(),live:[],imgs:new Map(),spawnAt:0,fillTarget:0,fillAt:0,liveCount:0,fetchedAt:0,polledAt:0,stars:[],raf:0,zone:0,lastT:0,px:0};ov.addEventListener('pointermove',e=>{if(F){F.pxT=(e.clientX/(F.W||1)-.5)*2;riverPointer(e,false)}});ov.addEventListener('pointerleave',()=>{if(F)F.hover=null});ov.addEventListener('click',e=>riverPointer(e,true));
 let rq=ov.requestFullscreen||ov.webkitRequestFullscreen;if(rq){try{let p=rq.call(ov);if(p&&p.catch)p.catch(()=>ov.classList.add('pseudo'))}catch(e){ov.classList.add('pseudo')}}else ov.classList.add('pseudo');
 document.addEventListener('fullscreenchange',fsChange);document.addEventListener('webkitfullscreenchange',fsChange);document.addEventListener('keydown',escKey);
 resize();addEventListener('resize',resize);for(let i=0;i<70;i++)F.stars.push([Math.random(),Math.random()*.36,Math.random()*1.4+.3,Math.random()*6]);
 if(window.cmiAudio&&localStorage.cmiLkMute!=='true')window.cmiAudio.setMusic(true);
 applyFset();F.fillTarget=Math.ceil(F.maxOnScreen/2);paintScene();refresh();document.addEventListener('visibilitychange',visPoll);if(window.cmiAudio)window.cmiAudio.paint();F.raf=requestAnimationFrame(tick)}
function visPoll(){if(F&&!document.hidden)poll()}
function paintScene(){if(!F)return;let s=sceneById(FSET.scene);F.sb.querySelector('span').textContent=s.name[lang()]||s.name.en;F.sb.title=ft('scene');F.liveEl.textContent='● '+ft('live')}
function cycleScene(){let i=SCENES.indexOf(sceneById(FSET.scene)),id=SCENES[(i+1)%SCENES.length].id;FSET.scene=id;saveFset();switchScene(id);if(F&&!F.panel.hidden)renderPanel()}
function renderPanel(){if(!F)return;let P=F.panel;P.textContent='';let h=el('div','rf-head');h.append(el('b','',ft('settings')));let rs=el('button','rf-reset',ft('reset'));rs.type='button';rs.onclick=()=>{FSET={...FDEF,scene:FSET.scene};saveFset();applyFset();renderPanel()};h.append(rs);P.append(h);
 let pr=el('div','rf-presets');Object.keys(FPRE).forEach(k=>{let b=el('button','rf-preset',ft('p')[k]);b.type='button';let v=FPRE[k],on=Object.keys(FRNG).every(q=>Math.abs(FSET[q]-v[q])<1e-6);b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));b.onclick=()=>{FSET={...FSET,...v};saveFset();applyFset();paintScene();renderPanel()};pr.append(b)});P.append(pr);
 const fmt=(k,v)=>k==='repeat'?(v?v+' '+ft('sec'):'0'):k==='rate'?ft('every').replace('{s}',v.toFixed(1)):k==='max'?ft('n').replace('{n}',v):k==='speed'||k==='size'?v.toFixed(2)+'×':Math.round(v*100)+'%';
 Object.keys(FRNG).forEach(k=>{let [mn,mxv,st]=FRNG[k],row=el('label','rf-row'),top=el('span','rf-l'),val=el('em','',fmt(k,FSET[k]));top.append(el('span','',ft(k)),val);let r=el('input');r.type='range';r.min=mn;r.max=mxv;r.step=st;r.value=FSET[k];r.oninput=()=>{FSET[k]=+r.value;val.textContent=fmt(k,FSET[k]);applyFset();saveFset();pr.querySelectorAll('.rf-preset').forEach((b,i)=>{let v=FPRE[Object.keys(FPRE)[i]];b.classList.toggle('active',Object.keys(FRNG).every(q=>Math.abs(FSET[q]-v[q])<1e-6))})};row.append(top,r);P.append(row)})}
async function poll(){if(!F||document.hidden)return;F.polledAt=performance.now();try{let j=await getJSON('/api/lanterns?limit=20',1);if(!F||!j.ok)return;let add=j.items.filter(it=>!F.seen.has(it.id));if(!add.length)return;add.forEach(it=>{F.seen.add(it.id);F.items.unshift(it);prep(it);F.fresh.push(it)});F.spawnAt=0;F.note.textContent=''}catch(e){}}

function fsChange(){if(F&&!(document.fullscreenElement||document.webkitFullscreenElement)&&!F.ov.classList.contains('pseudo'))closeFloat()}
function escKey(e){if(e.key==='Escape')closeFloat()}
function closeFloat(){if(!F)return;cancelAnimationFrame(F.raf);removeEventListener('resize',resize);document.removeEventListener('fullscreenchange',fsChange);document.removeEventListener('webkitfullscreenchange',fsChange);document.removeEventListener('keydown',escKey);document.removeEventListener('visibilitychange',visPoll);
 let ov=F.ov;F=null;if(document.fullscreenElement||document.webkitFullscreenElement){(document.exitFullscreen||document.webkitExitFullscreen).call(document)}ov.remove();document.body.classList.remove('river-lock')}
function resize(){if(!F)return;let d=Math.min(devicePixelRatio||1,2),w=F.ov.clientWidth||innerWidth,h=F.ov.clientHeight||innerHeight;F.cv.width=w*d;F.cv.height=h*d;F.cv.style.width=w+'px';F.cv.style.height=h+'px';F.ctx.setTransform(d,0,0,d,0,0);F.W=w;F.H=h;F.mobile=w<600;F.live=[];
 SCENES.forEach(s=>{if(s.cache)s.cache.clear()});F.base0=F.mobile?Math.min(w*.34,160):Math.min(h*.2,w*.14,210);F.fs=F.mobile?13:12;applyFset()}
async function refresh(){if(!F)return;F.fetchedAt=performance.now();try{let j=await getJSON('/api/lanterns?random=1&limit=100');if(F&&j.ok){let fr=new Set(F.fresh.map(x=>x.id));F.items=j.items.concat(F.items.filter(x=>fr.has(x.id)&&!j.items.some(y=>y.id===x.id)));F.items.forEach(it=>F.seen.add(it.id));F.queue=shuffle(F.items.slice());F.items.forEach(prep)}}catch(e){}if(F)F.note.textContent=F.items.length?'':t('floatEmpty')}
const shuffle=a=>{for(let i=a.length-1;i>0;i--){let j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const canFilter=(()=>{try{let x=document.createElement('canvas').getContext('2d');x.filter='blur(2px)';return x.filter==='blur(2px)'}catch(e){return false}})();
function trim(im){let long=Math.max(im.naturalWidth,im.naturalHeight),s=Math.min(1,900/long),c=document.createElement('canvas');c.width=Math.round(im.naturalWidth*s);c.height=Math.round(im.naturalHeight*s);let x=c.getContext('2d');x.drawImage(im,0,0,c.width,c.height);
 try{let d=x.getImageData(0,0,c.width,c.height).data,W=c.width,H=c.height,l=W,r=-1,tp=H,b=-1;for(let y=0;y<H;y+=2)for(let i=0;i<W;i+=2){if(d[(y*W+i)*4+3]>16){if(i<l)l=i;if(i>r)r=i;if(y<tp)tp=y;if(y>b)b=y}}
  if(r<0)return c;l=Math.max(0,l-2);tp=Math.max(0,tp-2);r=Math.min(W,r+3);b=Math.min(H,b+3);let o=document.createElement('canvas');o.width=r-l;o.height=b-tp;o.getContext('2d').drawImage(c,l,tp,r-l,b-tp,0,0,r-l,b-tp);return o}catch(e){return c}}
/* v14.1: square photo with a strictly circular feather and masked tint. */
const PHOTO_DISC_RADIUS=.48, PHOTO_DISC_RATIO=PHOTO_DISC_RADIUS;
function photoCard(im){
 let S=320,R=S/2,c=document.createElement('canvas');c.width=c.height=S;let x=c.getContext('2d'),scale=Math.max(S/im.naturalWidth,S/im.naturalHeight);
 x.drawImage(im,(S-im.naturalWidth*scale)/2,(S-im.naturalHeight*scale)/2,im.naturalWidth*scale,im.naturalHeight*scale);
 let image=x.getImageData(0,0,S,S),d=image.data,samples=[[],[],[]];
 for(let y=0;y<S;y++)for(let px=0;px<S;px++){let r=Math.hypot(px+.5-R,y+.5-R)/R;if(r>=.35&&r<=.45){let i=(y*S+px)*4;for(let k=0;k<3;k++)samples[k].push(d[i+k])}}
 let bg=samples.map(v=>{v.sort((a,b)=>a-b);return v[Math.floor(v.length/2)]}),xs=[];
 for(let y=0;y<S;y++)for(let px=0;px<S;px++){let i=(y*S+px)*4,r=Math.hypot(px+.5-R,y+.5-R)/R,dist=Math.hypot(d[i]-bg[0],d[i+1]-bg[1],d[i+2]-bg[2]);
  if(r<.48&&d[i+3]>128&&dist>45)xs.push(px);
  let t=.35*Math.max(0,1-dist/85);for(let k=0;k<3;k++)d[i+k]=Math.round(d[i+k]*(1-t)+[15,59,64][k]*t);
 }
 xs.sort((a,b)=>a-b);c.subject=xs.length>=40?Math.max(.1,(xs[Math.floor(xs.length*.95)]-xs[Math.floor(xs.length*.05)]+1)/S):.55;
 x.putImageData(image,0,0);x.globalCompositeOperation='destination-in';let g=x.createRadialGradient(R,R,R*.30,R,R,R*PHOTO_DISC_RADIUS);g.addColorStop(0,'#000');g.addColorStop(1,'transparent');x.fillStyle=g;x.fillRect(0,0,S,S);
 x.globalCompositeOperation='source-over';x.beginPath();x.arc(R,R,R*.41,0,Math.PI*2);x.strokeStyle='rgba(227,176,75,.8)';x.lineWidth=1.4;x.shadowColor='rgba(227,176,75,.55)';x.shadowBlur=7;x.stroke();return c
}
function photoSubject(c){return c.subject||.55}
function reflect(art){let w=art.width,h=Math.max(2,Math.round(art.height*.35)),c=document.createElement('canvas');c.width=w;c.height=h;let x=c.getContext('2d'),blur=Math.max(2,w/75);
 const flip=(ctx,cw,ch)=>{ctx.save();ctx.translate(0,ch);ctx.scale(1,-ch/art.height);ctx.drawImage(art,0,0,cw,art.height);ctx.restore()};
 if(canFilter){x.filter=`blur(${blur}px)`;flip(x,w,h);x.filter='none'}else{let sm=document.createElement('canvas');sm.width=Math.max(1,Math.round(w/4));sm.height=Math.max(1,Math.round(h/4));let sx=sm.getContext('2d');flip(sx,sm.width,sm.height);x.imageSmoothingQuality='high';x.drawImage(sm,0,0,w,h)}
 x.globalCompositeOperation='destination-out';for(let y=0;y<h;y+=Math.max(3,h/14)){x.fillStyle='rgba(0,0,0,.45)';x.fillRect(0,y,w,Math.max(1,h/40))}
 x.globalCompositeOperation='destination-in';let g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#000');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,w,h);return c}
function prep(it){if(F.imgs.has(it.id))return;let rec={ready:false};F.imgs.set(it.id,rec);let im=new Image();im.crossOrigin='anonymous';im.decoding='async';
 im.onload=()=>{try{rec.art=it.kind==='photo'?photoCard(im):trim(im);/* v14.1: retain subject fraction for sizing. */rec.subj=it.kind==='photo'?photoSubject(rec.art):1;let reflectionArt=rec.art;if(it.kind==='photo'){let side=rec.art.width*PHOTO_DISC_RATIO, crop=document.createElement('canvas');crop.width=crop.height=Math.round(side);crop.getContext('2d').drawImage(rec.art,(rec.art.width-side)/2,(rec.art.height-side)/2,side,side,0,0,crop.width,crop.height);reflectionArt=crop}rec.refl=reflect(reflectionArt);rec.ar=rec.art.width/rec.art.height;rec.ready=true}catch(e){}};im.src=(F.W>900?it.image_url:(it.thumb_url||it.image_url))}
function fitText(ctx,s,max){if(ctx.measureText(s).width<=max)return s;let a=[...s];while(a.length>1&&ctx.measureText(a.join('')+'…').width>max)a.pop();return a.join('')+'…'}
function geom(l,y){let {base,hz,fs}=F,sc=(.6+.4*Math.max(0,Math.min(1,(y-hz)/Math.max(1,l.y0-hz))))*(l.row==='back'?.85:1),subject=base*sc*.65,visW=subject,visH=subject;
 if(l.it.kind!=='photo'){visH=visW/l.r.ar;if(visH>subject*1.15){visH=subject*1.15;visW=visH*l.r.ar}}
 let photo=l.it.kind==='photo',w=photo?visW/PHOTO_DISC_RATIO:visW,h=photo?w:visH,rh=visH*.35,f=Math.max(fs,Math.round(15*sc+1)),capW=Math.max(1,Math.min(260,visW*1.8)),capH=f*1.3+(l.it.wish?f*1.25:0),bw=Math.max(visW,Math.min(capW,l.capW*f/l.f0)),x=l.x,discBottom=y+(photo?.12*visH:0),bottom=Math.max(discBottom,y+rh),labelY=bottom+9,top=photo?discBottom-visH:y-visH;
 return {sc,w,h,visW,visH,rh,f,capW,capH,x,y,discBottom,labelY,bodyBox:[x-visW/2,top,x+visW/2,Math.max(discBottom,y+rh)],box:[x-bw/2-6,top-4,x+bw/2+6,labelY+capH+4],labelBox:[x-bw/2,labelY,x+bw/2,labelY+capH]}}
const hit=(a,b)=>a[0]<b[2]&&b[0]<a[2]&&a[1]<b[3]&&b[1]<a[3];
function packLantern(l,live,progress=null){let band=sceneBand(),mid=band.y+band.h/2;
 for(let row of ['front','back']){let lo=row==='front'?mid:band.y,hi=(row==='front'?band.y+band.h:mid)-(l.it.kind==='photo'?F.base*.65*.12:0);
  if(row==='back'&&F.calmBandPx){let frontHi=band.y+band.h,frontProbe={...l,row:'front',y0:frontHi,yEnd:mid,y:frontHi},typical=geom(frontProbe,frontHi).visH;if(band.h<1.3*typical){let frontTop=mid-geom(frontProbe,mid).visH;for(let other of live.filter(o=>o.row==='front')){let g=geom(other,other.yEnd);frontTop=Math.min(frontTop,g.bodyBox[1])}hi=Math.min(hi,frontTop-8);let backProbe={...l,row,y0:hi,yEnd:lo,y:hi},backH=geom(backProbe,hi).visH;if(hi-backH<band.y-.1*backH)continue}}
  let p=progress===null?.05+Math.random()*.4:progress,y=hi-(hi-lo)*p,probe={...l,row,y0:hi,yEnd:lo,y},g=geom(probe,y),left=band.x+g.visW/2,right=band.x+band.w-g.visW/2;if(right<left||hi<=lo)continue;
  let rowLive=live.filter(other=>other.row===row),candidates=[left,right,(left+right)/2];for(let other of rowLive){let distance=1.1*Math.max(g.visW,geom(other,other.y).visW);candidates.push(other.x-distance,other.x+distance)}shuffle(candidates);
  for(let x of candidates)if(x>=left&&x<=right&&!rowLive.some(other=>Math.abs(x-other.x)+1e-7<1.1*Math.max(g.visW,geom(other,other.y).visW)))return {row,x,y,y0:hi,yEnd:lo};
 }return null}
function spawn(now,fill=false){if(!F.queue.length){if(!F.items.length&&!F.fresh.length)return false;F.queue=shuffle(F.items.slice())}
 let liveIds=new Set(F.live.map(l=>l.it.id)),ok=it=>{let r=F.imgs.get(it.id);return r&&r.ready&&!liveIds.has(it.id)},fi=F.fresh.findIndex(ok),src=F.queue,k;
 if(fi>=0){src=F.fresh;k=fi}else{let rep=FSET.repeat*1000;k=F.queue.findIndex(it=>ok(it)&&!(F.shown.has(it.id)&&now-F.shown.get(it.id)<rep));if(k<0)return false}
 let isFresh=src===F.fresh,it=src[k],r=F.imgs.get(it.id),{fs,ctx}=F;ctx.font=`600 ${fs+4}px system-ui,-apple-system,"Noto Sans Thai",sans-serif`;let capW0=Math.max(ctx.measureText(it.name).width,it.wish?ctx.measureText(it.wish).width*.9:0),l={it,r,x:0,f0:fs+4,capW:capW0,fresh:isFresh},position=packLantern(l,F.live);if(!position)return false;
 src.splice(k,1);if(isFresh){let qi=F.queue.findIndex(q=>q.id===it.id);if(qi>=0)F.queue.splice(qi,1)}F.shown.set(it.id,now);F.live.push({...l,...position,t0:now,ph:Math.random()*6});return true}
function riverPointer(e,tap){if(!F||e.target!==F.cv)return;let rect=F.cv.getBoundingClientRect(),x=e.clientX-rect.left,y=e.clientY-rect.top,found=F.live.slice().reverse().find(l=>{let g=geom(l,l.y),top=l.it.kind==='photo'?g.discBottom-g.visH:g.y-g.visH;return Math.abs(x-g.x)<=g.visW/2&&y>=top&&y<=g.discBottom});if(tap)F.selected=found?found.it.id:null;else F.hover=found?found.it.id:null}
window.__riverLayout=()=>F?F.live.map(l=>{let g=geom(l,l.y);return {id:l.it.id,kind:l.it.kind,x:g.x,y:g.y,visW:g.visW,visH:g.visH,discBottom:g.discBottom,labelY:g.labelY,row:l.row,gapLabel:g.labelY-Math.max(g.discBottom,g.y+g.rh)}}):[];
function tick(now){if(!F)return;F.raf=requestAnimationFrame(tick);let {ctx,W,H,hz}=F,dt=Math.min(.05,(now-(F.lastT||now))/1000);F.lastT=now;
 if(now-F.fetchedAt>120000)refresh();if(now-F.polledAt>12000)poll();F.px+=((F.pxT||0)-F.px)*.03;
 let maxLive=F.maxOnScreen,active=F.live.filter(l=>!l.cullAt).length;if(active<F.fillTarget&&active<maxLive&&now>=F.fillAt){spawn(now,true);F.fillAt=now+150}else if(active>=F.fillTarget){F.fillTarget=0;if(now>F.spawnAt&&F.live.length<maxLive)F.spawnAt=now+(spawn(now)?FSET.rate*1000*(.8+Math.random()*.4):400)}
 F.scene.draw(ctx,F,now);
 for(let l of F.live)l.y-=F.speed*dt;F.live=F.live.filter(l=>l.y>l.yEnd&&(!l.cullAt||now-l.cullAt<600));F.liveCount=F.live.length;
 let order=F.live.slice().sort((a,b)=>a.y-b.y);
 let frontBodies=order.filter(l=>l.row==='front').map(l=>geom(l,l.y).bodyBox),labels=[];for(let l of order.slice().sort((a,b)=>(a.row==='front'?0:1)-(b.row==='front'?0:1)||a.t0-b.t0)){let g=geom(l,l.y);l.labelHidden=labels.some(b=>hit(b,g.labelBox))||(l.row==='back'&&frontBodies.some(b=>hit(b,g.labelBox)));if(!l.labelHidden)labels.push(g.labelBox)}
 for(let l of order){let G=geom(l,l.y),p=(l.y0-l.y)/Math.max(1,l.y0-l.yEnd),a=Math.min(1,p/.06,(now-l.t0)/900)*(p>.8?Math.max(0,(1-p)/.2):1)*(l.row==='back'?.9:1),x=G.x,y=G.y,{w,h,rh,f}=G,rot=0;if(l.cullAt)a*=Math.max(0,1-(now-l.cullAt)/600);
  ctx.save();ctx.globalCompositeOperation='lighter';let gr=ctx.createRadialGradient(x,y-G.visH*.45,1,x,y-G.visH*.45,G.visW*.85);gr.addColorStop(0,`rgba(255,190,100,${.20*a})`);gr.addColorStop(1,'rgba(255,190,100,0)');ctx.fillStyle=gr;ctx.fillRect(x-G.visW,y-G.visH*1.3,G.visW*2,G.visH*2);
  let fl=.6+.4*Math.sin(now/130+l.ph*3)*Math.sin(now/370+l.ph);let cg=ctx.createRadialGradient(x,y-G.visH*.6,0,x,y-G.visH*.6,G.visW*.28);cg.addColorStop(0,`rgba(255,190,90,${.2*a*fl})`);cg.addColorStop(1,'rgba(255,190,90,0)');ctx.fillStyle=cg;ctx.fillRect(x-G.visW*.3,y-G.visH*.6-G.visW*.3,G.visW*.6,G.visW*.6);ctx.restore();
  ctx.save();ctx.globalAlpha=a*.28;ctx.drawImage(l.r.refl,x-G.visW/2+Math.sin(now/700+l.ph)*1.5,y,G.visW,rh);ctx.restore();
  ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.rotate(rot);ctx.drawImage(l.r.art,-w/2,l.it.kind==='photo'?G.discBottom-y-G.visH/2-h/2:-h,w,h);ctx.restore();
  if(!l.labelHidden||F.hover===l.it.id||F.selected===l.it.id){ctx.save();ctx.globalAlpha=a;ctx.textAlign='center';ctx.textBaseline='top';ctx.shadowColor='rgba(0,0,0,.6)';ctx.shadowOffsetY=1;ctx.shadowBlur=3;let ty=G.labelY;
  ctx.font=`600 ${f}px system-ui,-apple-system,"Noto Sans Thai",sans-serif`;ctx.fillStyle='#ffe9b0';let nm=fitText(ctx,l.it.name,G.capW);ctx.fillText(nm,x,ty);if(l.fresh&&now-l.t0<20000){let nw=ctx.measureText(nm).width,bt=ft('fresh');ctx.font=`700 ${Math.max(10,f-3)}px system-ui,sans-serif`;let bw=ctx.measureText(bt).width+10,bx=x+nw/2+5;ctx.shadowColor='transparent';ctx.fillStyle='#e3be6a';ctx.beginPath();ctx.roundRect?ctx.roundRect(bx,ty,bw,f+1,6):ctx.rect(bx,ty,bw,f+1);ctx.fill();ctx.fillStyle='#173f3d';ctx.textAlign='left';ctx.fillText(bt,bx+5,ty+1);ctx.textAlign='center';ctx.shadowColor='rgba(0,0,0,.6)'}
  if(l.it.wish){ctx.font=`${f}px system-ui,-apple-system,"Noto Sans Thai",sans-serif`;ctx.fillStyle='#fff9ec';ctx.fillText(fitText(ctx,l.it.wish,G.capW),x,ty+f*1.3)}ctx.restore()}}
 /* v14.1: expose live subject widths for visual checks. */if(window.__riverDebug)window.__riverSubj=order.map(l=>({id:l.it.id,kind:l.it.kind,subjectW:geom(l,l.y).w*l.r.subj}));if(window.__riverDebug)window.__riverBoxes=order.map(l=>geom(l,l.y).box);
}

/* ---------- routing (cards | 水灯 home → builder / upload) & language ---------- */
const navStack=[];let lastHash=null;
function track(){let h=location.hash.slice(1)||'cards';if(navStack.length>1&&navStack[navStack.length-2]===h)navStack.pop();else if(navStack[navStack.length-1]!==h)navStack.push(h)}
function goBack(){let prev=navStack[navStack.length-2];if(prev)history.back();else location.replace('#river')}
function goHome(){if(location.hash==='#river'){loadList(true);return}let prev=navStack[navStack.length-2];if(prev==='river')history.back();else location.replace('#river')}
window.riverBack=goBack;
const backBtn=el('button','sub-back');backBtn.type='button';backBtn.onclick=goBack;document.body.append(backBtn);
function route(){track();let tab=location.hash.slice(1)||'cards';if(!['cards','builder','culture','river','upload'].includes(tab))tab='cards';document.body.dataset.tab=tab;let sub=tab==='builder'||tab==='upload';document.body.classList.toggle('sub-mode',sub);
 backBtn.textContent='';backBtn.insertAdjacentHTML('afterbegin','<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>');backBtn.append(el('span','',t('back')));backBtn.setAttribute('aria-label',t('back'));
 let s=section(),u=$('#upload');if(s)s.hidden=tab!=='river';if(u)u.hidden=tab!=='upload';
 if(tab==='river'){if(F)closeFloat();loadList(true)}if(tab==='upload')renderUpload();if(tab!=='upload'&&u)u.textContent=''}
addEventListener('hashchange',route);
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('[data-lang]'))setTimeout(()=>{if(F)paintScene();else route()},30)});
renderPills();route();
{const vp=document.querySelector('meta[name=viewport]'),base=vp&&vp.content;const sync=()=>{if(vp)vp.content=document.body.classList.contains('builder-mode')?base+',maximum-scale=1':base};new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['class']});sync()}
const onScroll=()=>document.body.classList.toggle('scrolled',scrollY>80);addEventListener('scroll',onScroll,{passive:true});onScroll();
getJSON('/api/config').then(j=>{if(j&&j.ok){config=j;if(!j.limits)config.limits={name:20,intro:80,wish:60,image_bytes:2097152,thumb_bytes:307200};if(location.hash==='#river')loadList(true);if(location.hash==='#upload')renderUpload();window.dispatchEvent(new Event('river-config'))}}).catch(()=>{});
window.riverConfig=()=>config;window.riverText=t;
})();
