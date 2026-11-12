(function(){
'use strict';
var P='__goleiro_srj3__';
var el=document.getElementById(P);
if(el){el.style.display=el.style.display==='none'?'flex':'none';return;}
var WEB='https://script.google.com/a/macros/mercadolivre.com/s/AKfycbxCTBSBPXM50OlxZSF5qG7-U39cv5cHN2ZOLdeH-AN3X2Ni5GnbRegJHsGkw8qZGPUO/exec';
var BASE='https://envios.adminml.com/logistics/sorting/api/monitoring';
var BASE_SORT='https://envios.adminml.com/logistics/sorting';
var FAC='SRJ3';
function nb(){return new Date(new Date().toLocaleString('en-US',{timeZone:'America/Sao_Paulo'}));}
function pz(n){return String(n).padStart(2,'0');}
function ymd(d){return''+d.getFullYear()+pz(d.getMonth()+1)+pz(d.getDate());}
function dmy(d){return pz(d.getDate())+'/'+pz(d.getMonth()+1)+'/'+d.getFullYear();}
function hms(d){return pz(d.getHours())+':'+pz(d.getMinutes())+':'+pz(d.getSeconds());}
function cicloAuto(d){var h=d.getHours();if(h<8)return'CHP';if(h<12)return'AM1';if(h<16)return'PM1';return'SD';}
async function batch(items,fn,c){var res=[],i=0;async function w(){while(i<items.length){var x=i++;res[x]=await fn(items[x]);}}var ws=[];for(var k=0;k<Math.min(c,items.length);k++)ws.push(w());await Promise.all(ws);return res;}
var st=document.createElement('style');
st.textContent='#'+P+'{position:fixed;bottom:20px;right:20px;width:440px;max-height:92vh;background:#1a1a1a;color:#f0f0f0;border:1px solid #f2b705;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,.8);display:flex;flex-direction:column;font-family:Arial,sans-serif;font-size:13px;z-index:2147483647;overflow:hidden;user-select:none}'
+'#'+P+' *{box-sizing:border-box;margin:0;padding:0}'
+'#__gh__{background:linear-gradient(90deg,#1a1a1a,#2a2000);border-bottom:2px solid #f2b705;padding:10px 14px;display:flex;align-items:center;justify-content:space-between;cursor:grab;flex-shrink:0}'
+'#__gt__{font-size:15px;font-weight:700;color:#f2b705}'
+'#__ghb__{display:flex;gap:6px}'
+'#__ghb__ button{background:transparent;border:1px solid #555;color:#aaa;width:24px;height:24px;border-radius:4px;cursor:pointer;font-size:13px}'
+'#__ghb__ button:hover{border-color:#f2b705;color:#f2b705}'
+'#__gb__{display:flex;flex-direction:column;overflow-y:auto;flex:1;padding:12px;gap:10px}'
+'#__gb__::-webkit-scrollbar{width:5px}'
+'#__gb__::-webkit-scrollbar-thumb{background:#f2b705;border-radius:4px}'
+'#__gk__{display:grid;grid-template-columns:1fr 1fr;gap:8px}'
+'.gkpi{background:#242424;border:1px solid #333;border-radius:8px;padding:8px 10px;display:flex;flex-direction:column;gap:2px}'
+'.gkl{font-size:10px;color:#888;text-transform:uppercase}'
+'.gkv{font-size:20px;font-weight:700;color:#fff}'
+'.gkv.g{color:#4caf50}.gkv.y{color:#f2b705}.gkv.r{color:#f44336}'
+'#__gciclos__{background:#1e1e1e;border:1px solid #333;border-radius:8px;padding:10px 12px}'
+'#__gciclos__ p{font-size:10px;color:#f2b705;text-transform:uppercase;font-weight:700;margin-bottom:8px;letter-spacing:.5px}'
+'.ciclo-grid{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:6px}'
+'.cbtn{background:#2a2a2a;border:1px solid #444;border-radius:6px;padding:6px 0;font-size:12px;font-weight:700;color:#aaa;cursor:pointer;text-align:center;transition:all .2s}'
+'.cbtn.ativo{background:#f2b705;border-color:#f2b705;color:#1a1a1a}'
+'.cbtn:hover{border-color:#f2b705;color:#f2b705}'
+'#__grw__{background:#1e1e1e;border:1px solid #333;border-radius:8px;overflow:hidden}'
+'#__grt__{padding:6px 10px;font-size:11px;font-weight:600;color:#f2b705;background:#242424;border-bottom:1px solid #333;text-transform:uppercase}'
+'#__grtb__{width:100%;border-collapse:collapse;font-size:12px}'
+'#__grtb__ th{padding:5px 8px;text-align:left;color:#888;border-bottom:1px solid #2a2a2a}'
+'#__grtb__ td{padding:4px 8px;border-bottom:1px solid #222;color:#ddd}'
+'#__grtb__ tr:hover td{background:#2a2a2a}'
+'#__gbe__{background:#f2b705;color:#1a1a1a;border:none;border-radius:8px;padding:12px 0;font-size:14px;font-weight:700;cursor:pointer;width:100%;flex-shrink:0}'
+'#__gbe__:disabled{opacity:.4;cursor:not-allowed}'
+'#__glw__{background:#0d0d0d;border:1px solid #2a2a2a;border-radius:8px;padding:8px 10px;max-height:130px;overflow-y:auto;display:flex;flex-direction:column;gap:2px}'
+'.gl{font-size:11px;color:#ccc;font-family:monospace;line-height:1.5}'
+'.gl.ok{color:#4caf50}.gl.er{color:#f44336}.gl.wn{color:#f2b705}.gl.in{color:#64b5f6}'
+'#__gft__{text-align:center;font-size:10px;color:#555;padding:4px 0 2px;flex-shrink:0}';
document.head.appendChild(st);
var pn=document.createElement('div');
pn.id=P;
pn.innerHTML='<div id="__gh__"><span id="__gt__">&#x1F945; GOLEIRO SRJ3</span><div id="__ghb__"><button id="__gmn__">&ndash;</button><button id="__gcl__">&#x2715;</button></div></div>'
+'<div id="__gb__">'
+'<div id="__gk__">'
+'<div class="gkpi"><span class="gkl">&#x1F4E6; Total Goleiro</span><span class="gkv" id="__gvt__">&ndash;</span></div>'
+'<div class="gkpi"><span class="gkl">&#x1F3AF; Unid. Esperadas</span><span class="gkv" id="__gve__">&ndash;</span></div>'
+'<div class="gkpi"><span class="gkl">&#x1F4CA; Efici&ecirc;ncia</span><span class="gkv" id="__gvef__">&ndash;</span></div>'
+'<div class="gkpi"><span class="gkl">&#x26A0; Goleiro Recebeu</span><span class="gkv" id="__gvg__">&ndash;</span></div>'
+'</div>'
+'<div id="__gciclos__"><p>&#x1F504; Selecione os ciclos</p>'
+'<div class="ciclo-grid">'
+'<div class="cbtn" data-ciclo="CHP">CHP</div>'
+'<div class="cbtn ativo" data-ciclo="AM1">AM1</div>'
+'<div class="cbtn ativo" data-ciclo="PM1">PM1</div>'
+'<div class="cbtn ativo" data-ciclo="SD">SD</div>'
+'</div></div>'
+'<div id="__grw__"><div id="__grt__">&#x1F4CB; Ruas / Gaiolas</div>'
+'<table id="__grtb__"><thead><tr><th>Rua</th><th>Gaiolas</th><th>Pacotes</th><th>Ciclos</th></tr></thead>'
+'<tbody id="__grtbd__"><tr><td colspan="4" style="color:#555;padding:8px">Aguardando...</td></tr></tbody></table></div>'
+'<button id="__gbe__">&#x25B6; EXTRAIR DADOS</button>'
+'<div id="__glw__"><span class="gl in">Selecione os ciclos e clique em EXTRAIR DADOS.</span></div>'
+'<div id="__gft__">-</div>'
+'</div>';
document.body.appendChild(pn);
var bd=document.getElementById('__gb__'),bmn=document.getElementById('__gmn__'),bcl=document.getElementById('__gcl__'),bex=document.getElementById('__gbe__'),lw=document.getElementById('__glw__'),ft=document.getElementById('__gft__'),kvt=document.getElementById('__gvt__'),kve=document.getElementById('__gve__'),kvef=document.getElementById('__gvef__'),kvg=document.getElementById('__gvg__'),rtbd=document.getElementById('__grtbd__');
var mini=false;
bmn.onclick=function(){mini=!mini;bd.style.display=mini?'none':'flex';bmn.textContent=mini?'+':'\u2013';};
bcl.onclick=function(){pn.style.display='none';};
var hd=document.getElementById('__gh__'),dr=false,ox=0,oy=0;
hd.addEventListener('mousedown',function(e){if(e.target.tagName==='BUTTON')return;dr=true;var r=pn.getBoundingClientRect();ox=e.clientX-r.left;oy=e.clientY-r.top;pn.style.bottom='auto';pn.style.right='auto';e.preventDefault();});
document.addEventListener('mousemove',function(e){if(!dr)return;pn.style.left=(e.clientX-ox)+'px';pn.style.top=(e.clientY-oy)+'px';});
document.addEventListener('mouseup',function(){dr=false;});
document.querySelectorAll('.cbtn').forEach(function(btn){btn.addEventListener('click',function(){btn.classList.toggle('ativo');});});
function getCiclos(){var s=[];document.querySelectorAll('.cbtn.ativo').forEach(function(b){s.push(b.getAttribute('data-ciclo'));});return s;}
function lg(m,t){var l=document.createElement('span');l.className='gl'+(t?' '+t:'');l.textContent='['+hms(nb())+'] '+m;lw.appendChild(l);lw.scrollTop=lw.scrollHeight;}
function clg(){lw.innerHTML='';}
function ukpi(tot,exp){kvt.textContent=tot.toLocaleString('pt-BR');kve.textContent=exp?exp.toLocaleString('pt-BR'):'-';var g=exp>0?(tot/exp)*100:0;var ef=Math.max(0,100-g);kvef.textContent=ef.toFixed(2)+'%';kvg.textContent=g.toFixed(2)+'%';kvef.className='gkv '+(ef>=90?'g':ef>=70?'y':'r');kvg.className='gkv '+(g<10?'g':g<30?'y':'r');}
function urt(sm){var ks=Object.keys(sm).sort();if(!ks.length){rtbd.innerHTML='<tr><td colspan="4" style="color:#555">Nenhum dado.</td></tr>';return;}rtbd.innerHTML=ks.map(function(r){var s=sm[r];return'<tr><td><b style="color:#f2b705">'+r+'</b></td><td>'+s.g.size+'</td><td>'+s.p.toLocaleString('pt-BR')+'</td><td style="font-size:10px;color:#aaa">'+Array.from(s.c).sort().join(', ')+'</td></tr>';}).join('');}

bex.addEventListener('click',async function(){
var ciclosSel=getCiclos();
if(!ciclosSel.length){alert('Selecione pelo menos 1 ciclo!');return;}
bex.disabled=true;bex.textContent='\u23F3 Extraindo...';clg();
var now=nb(),de=dmy(now),he=hms(now),ym=ymd(now),cicloAtivo=cicloAuto(now);
lg('Iniciando '+de+' '+he,'in');
lg('Ciclos: '+ciclosSel.join(', '),'in');
try{

// ── PASSO 1: busca grupos e filtra pelos ciclos selecionados ──
lg('Buscando grupos...','in');
var r1=await fetch(BASE+'/groups',{credentials:'include',headers:{Accept:'application/json'}});
if(!r1.ok)throw new Error('Grupos HTTP '+r1.status);
var grupos=await r1.json();
if(!Array.isArray(grupos))throw new Error('Formato inesperado em grupos');

// Filtra grupos pelos ciclos selecionados
// grupo.name = "AM1", "PM1", "SD", "CPM"
// grupo.id   = "SRJ3_20261112_CPM_0"
var gruposFiltrados=grupos.filter(function(g){
  return ciclosSel.indexOf(g.name)!==-1;
});
lg('\u2705 '+gruposFiltrados.length+' grupo(s) encontrado(s): '+gruposFiltrados.map(function(g){return g.name;}).join(', '),'ok');

if(!gruposFiltrados.length){
  lg('\u26A0 Nenhum grupo encontrado para: '+ciclosSel.join(', '),'wn');
  bex.disabled=false;bex.textContent='\u25B6 EXTRAIR DADOS';return;
}

// ── PASSO 2: para cada grupo busca o layout (ruas + gaiolas) ──
var ac=[];
for(var gi=0;gi<gruposFiltrados.length;gi++){
  var grupo=gruposFiltrados[gi];
  lg('Layout: '+grupo.name+' ('+grupo.id+')...','in');
  try{
    var rl=await fetch(BASE+'/layout?groupName='+encodeURIComponent(grupo.id),{credentials:'include',headers:{Accept:'application/json'}});
    if(!rl.ok)throw new Error('Layout HTTP '+rl.status);
    var layout=await rl.json();
    if(!Array.isArray(layout))throw new Error('Layout formato inesperado');
    layout.forEach(function(rua){
      var prefix=rua.prefix||'?';
      if(!Array.isArray(rua.containers))return;
      rua.containers.forEach(function(c){
        ac.push({
          rp:prefix,
          id:c.id,
          as:c.assignment||'',
          dk:c.dock||'',
          wv:c.wave||'',
          cg:grupo.name,
          gid:grupo.id
        });
      });
    });
    lg('\u2705 '+grupo.name+': '+layout.reduce(function(s,r){return s+(r.containers?r.containers.length:0);},0)+' gaiolas','ok');
  }catch(e){lg('\u26A0 Layout '+grupo.name+': '+e.message,'wn');}
}

lg('Total: '+ac.length+' gaiolas para extrair.','in');
if(!ac.length){bex.disabled=false;bex.textContent='\u25B6 EXTRAIR DADOS';return;}

// ── PASSO 3: detalhes de cada gaiola (shipment IDs) ───────────
var ar=[],sm={},pr=0;
await batch(ac,async function(ct){
  var dt={load:[],expected_load:0};
  try{
    var r=await fetch(BASE+'/'+ct.id+'/details',{credentials:'include',headers:{Accept:'application/json'}});
    if(!r.ok)throw new Error('HTTP '+r.status);
    dt=await r.json();
  }catch(e){lg('\u26A0 '+ct.as+': '+e.message,'wn');}
  var ld=Array.isArray(dt.load)?dt.load:[];
  ld.forEach(function(pk){
    ar.push({
      shipmentId:String(pk.shipment_id||pk.shipmentId||''),
      gaiola:ct.as,rua:ct.rp,ciclo:ct.cg,
      status:pk.status||'',substatus:pk.substatus||'',
      tags:Array.isArray(pk.tags)?pk.tags.join(','):'',
      dock:ct.dk,wave:ct.wv,
      unitsExpected:dt.expected_load||0,
      dataExtracao:de,horaExtracao:he
    });
  });
  var ru=ct.rp;
  if(!sm[ru])sm[ru]={g:new Set(),p:0,c:new Set()};
  sm[ru].g.add(ct.as);sm[ru].p+=ld.length;sm[ru].c.add(ct.cg);
  pr++;if(pr%10===0||pr===ac.length)lg(pr+'/'+ac.length+' gaiolas...','');
},5);
lg('\u2705 '+ar.length+' pacotes no goleiro.','ok');

// ── PASSO 4: etiquetagem ──────────────────────────────────────
var ld2={ul:0,ue:0};
for(var i=0;i<gruposFiltrados.length;i++){
  var gf=gruposFiltrados[i];
  try{
    var re=await fetch(BASE_SORT+'/monitoring/label?group='+encodeURIComponent(gf.id),{credentials:'include',headers:{Accept:'application/json'}});
    if(!re.ok)throw new Error('HTTP '+re.status);
    var ldd=await re.json();
    if(gf.name===cicloAtivo&&ldd.unitsExpected){ld2.ue=ldd.unitsExpected||0;ld2.ul=ldd.unitsLabelled||0;}
    if(ldd.unitsLabelled)ld2.ul=Math.max(ld2.ul,ldd.unitsLabelled);
    lg('Etiq '+gf.name+': '+(ldd.unitsLabelled||0)+' / '+(ldd.unitsExpected||0),'');
  }catch(e){lg('Etiq '+gf.name+': '+e.message,'wn');}
}

var tot=ar.length,ue=ld2.ue||0;
var gr=ue>0?+((tot/ue)*100).toFixed(2):0;
var ef=Math.max(0,+(100-gr).toFixed(2));
ukpi(tot,ue);urt(sm);
ft.textContent='Extr: '+de+' '+he+' | '+ciclosSel.join('+');

// ── PASSO 5: envia para planilha ──────────────────────────────
var pl={action:'goleiro_sync',data:ar,meta:{facility:FAC,dataExtracao:de,horaExtracao:he,totalPacotes:tot,unitsExpected:ue,unitsLabelled:ld2.ul,eficiencia:ef,goleiroRecebeu:gr,ciclosSelecionados:ciclosSel}};
lg('\uD83D\uDCE4 Enviando '+tot+' pacotes...','in');
try{
  var rs=await fetch(WEB,{method:'POST',headers:{'Content-Type':'text/plain'},body:JSON.stringify(pl)});
  var tx=await rs.text(),pp=null;
  try{pp=JSON.parse(tx);}catch(_){}
  if(rs.ok){
    lg('\u2705 '+tot+' enviados!','ok');
    lg('Efic:'+ef+'% | Gol:'+gr+'%','ok');
    if(pp&&pp.message)lg(pp.message,'ok');
  }else throw new Error('HTTP '+rs.status);
}catch(e){lg('\u274C Envio: '+e.message,'er');}

}catch(e){lg('\u274C '+e.message,'er');}
finally{bex.disabled=false;bex.textContent='\u25B6 EXTRAIR DADOS';}
});
lg('Goleiro SRJ3 carregado. Ciclo: '+cicloAuto(nb()),'ok');
})();
