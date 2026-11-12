const $=s=>document.querySelector(s);
const pd=s=>new Date(s+'T00:00:00');
const BLN=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
const tgl=s=>{const d=pd(s);return d.getDate()+' '+BLN[d.getMonth()]+' '+d.getFullYear()};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let extra=[];
try{extra=JSON.parse(localStorage.getItem('gardena_mtn_extra')||'[]')||[]}catch(e){extra=[]}
let logs=[...SEED,...extra];
const mine=()=>{const dv=$('#div').value;return EQ.filter(e=>!dv||e.d===dv)};
const last=k=>logs.filter(l=>l.k===k).sort((a,b)=>a.t<b.t?1:a.t>b.t?-1:0)[0];
const days=s=>Math.round((pd(s)-T)/864e5);
const status=n=>{const d=days(n);return d<0?['bad','Terlambat '+(-d)+' hari']:d<=7?['warn','Jatuh tempo '+(d===0?'hari ini':d+' hari lagi')]:['ok','Aman']};
const nm=k=>(EQ.find(e=>e.k===k)||{n:k}).n;
const rows=(m,max)=>{const a=Object.entries(m).sort((x,y)=>y[1]-x[1]).slice(0,6);if(!a.length)return '<p class="empty">Belum ada data.</p>';const mx=Math.max(...a.map(x=>x[1]),1);
 return a.map(([n,v])=>`<div class="r"><span title="${esc(n)}">${esc(n)}</span><div class="bar"><i style="width:${v/mx*100}%"></i></div><b>${v}</b></div>`).join('')};
function render(){
 const eq=mine(),ks=new Set(eq.map(e=>e.k)),ls=logs.filter(l=>ks.has(l.k));
 const lasts=eq.map(e=>({e,l:last(e.k)})).filter(x=>x.l);
 const late=lasts.filter(x=>days(x.l.n)<0).length,soon=lasts.filter(x=>{const d=days(x.l.n);return d>=0&&d<=7}).length,fix=lasts.filter(x=>x.l.h==='Perbaikan').length;
 const ym=fmt(T).slice(0,7),thisM=ls.filter(l=>l.t.slice(0,7)===ym).length,pm=ls.filter(l=>l.j==='PM').length;
 $('#kpis').innerHTML=[['',eq.length,'Peralatan terdata'],['',thisM,'Kegiatan bulan ini'],['',ls.length?Math.round(pm/ls.length*100)+'%':'–','Porsi PM dari semua kegiatan'],['bad',late,'Pemeriksaan terlambat'],['warn',soon,'Jatuh tempo ≤ 7 hari'],['warn',fix,'Masih dalam perbaikan']].map(([c,v,t])=>`<div class="k ${c&&v?c:''}"><b>${v}</b><span>${t}</span></div>`).join('');
 let mh='';for(let i=5;i>=0;i--){const d=new Date(T.getFullYear(),T.getMonth()-i,1),key=fmt(d).slice(0,7);
  const p=ls.filter(l=>l.t.slice(0,7)===key&&l.j==='PM').length,c=ls.filter(l=>l.t.slice(0,7)===key&&l.j==='CM').length;
  mh+=`<div class="col"><div class="st" title="PM ${p}, CM ${c}"><i class="m" style="flex:${c}"></i><i class="p" style="flex:${p}"></i><i style="flex:${Math.max(0,6-p-c)}"></i></div>${p+c}<br>${BLN[d.getMonth()]}</div>`}
 $('#months').innerHTML=mh;
 const cm={},pt={},cr={};
 ls.forEach(l=>{if(l.j==='CM')cm[nm(l.k)]=(cm[nm(l.k)]||0)+1;if(l.s&&l.s!=='-')pt[l.s]=(pt[l.s]||0)+1;cr[l.p]=(cr[l.p]||0)+1});
 $('#topcm').innerHTML=rows(cm);$('#parts').innerHTML=rows(pt);$('#crew').innerHTML=rows(cr);
 $('#eqt').innerHTML=lasts.sort((a,b)=>a.l.n<b.l.n?-1:1).map(({e,l})=>{const s=status(l.n);
  return `<tr><td>${e.k}</td><td><b>${esc(e.n)}</b><br><small>${esc(e.m)} · ${e.y}</small></td><td>${e.d} · ${esc(e.l)}</td><td>${tgl(l.t)} <span class="chip ${l.j.toLowerCase()}">${l.j}</span></td><td><span class="chip ${l.h==='Normal'?'ok':'warn'}">${l.h}</span></td><td>${tgl(l.n)}</td><td><span class="chip ${s[0]}">${s[1]}</span></td></tr>`}).join('')||'<tr><td colspan="7" class="empty">Belum ada peralatan di divisi ini.</td></tr>';
 $('#hist').innerHTML=ls.slice().sort((a,b)=>a.t<b.t?1:-1).slice(0,12).map(l=>`<tr><td>${tgl(l.t)}</td><td>${esc(nm(l.k))}</td><td><span class="chip ${l.j.toLowerCase()}">${l.j}</span></td><td>${esc(l.c)}</td><td>${esc(l.a)}</td><td>${esc(l.s||'-')}</td><td>${esc(l.p)}</td><td><span class="chip ${l.h==='Normal'?'ok':'warn'}">${l.h}</span></td></tr>`).join('');
}
$('#today').textContent=tgl(fmt(T));
$('#div').innerHTML='<option value="">Semua divisi</option>'+[...new Set(EQ.map(e=>e.d))].map(d=>`<option>${d}</option>`).join('');
$('#n_k').innerHTML=EQ.map(e=>`<option value="${e.k}">${e.k} – ${esc(e.n)}</option>`).join('');
$('#n_t').value=fmt(T);
$('#div').onchange=render;
$('#save').onclick=()=>{
 const l={k:$('#n_k').value,t:$('#n_t').value,j:$('#n_j').value,c:$('#n_c').value.trim(),a:$('#n_a').value.trim(),s:$('#n_s').value.trim()||'-',p:$('#n_p').value.trim(),h:$('#n_h').value,n:$('#n_n').value};
 const m=$('#msg');m.style.color='var(--bd)';
 if(!l.t||!l.c||!l.a||!l.p||!l.n){m.textContent='Lengkapi tanggal, kondisi, tindakan, pelaksana, dan tanggal pemeriksaan berikutnya.';return}
 if(l.n<l.t){m.textContent='Tanggal pemeriksaan berikutnya tidak boleh sebelum tanggal kegiatan.';return}
 extra.push(l);logs.push(l);
 try{localStorage.setItem('gardena_mtn_extra',JSON.stringify(extra))}catch(e){}
 ['c','a','s','p'].forEach(x=>$('#n_'+x).value='');
 m.style.color='var(--ok)';m.textContent='Kegiatan tersimpan.';render();
};
render();
