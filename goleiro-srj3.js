javascript:(function(){
'use strict';

var PANEL_ID = '__goleiro_srj3_panel__';
var existing = document.getElementById(PANEL_ID);
if (existing) {
  existing.style.display = existing.style.display === 'none' ? 'flex' : 'none';
  return;
}

var WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyzz9fbDbX9zqpEOgBi9KQx6PBpjrwDjJoqIF_vcv6nZO4Nu4Z_-dtsuL_xui1ra5JP/exec';
var BASE_URL    = 'https://envios.adminml.com/logistics/sorting';
var FACILITY    = 'SRJ3';
var CICLOS      = ['CHP','AM1','PM1','SD'];
var CONCURRENCY = 5;

function nowBrasilia() {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
}
function padZ(n) { return String(n).padStart(2, '0'); }
function yyyymmdd(d) { return '' + d.getFullYear() + padZ(d.getMonth()+1) + padZ(d.getDate()); }
function ddmmyyyy(d) { return padZ(d.getDate()) + '/' + padZ(d.getMonth()+1) + '/' + d.getFullYear(); }
function hhmmss(d) { return padZ(d.getHours()) + ':' + padZ(d.getMinutes()) + ':' + padZ(d.getSeconds()); }
function cicloAtual(d) {
  var h = d.getHours();
  if (h < 8) return 'CHP';
  if (h < 12) return 'AM1';
  if (h < 16) return 'PM1';
  return 'SD';
}

async function batchAsync(items, fn, concurrency) {
  var results = [];
  var idx = 0;
  async function worker() {
    while (idx < items.length) {
      var i = idx++;
      results[i] = await fn(items[i], i);
    }
  }
  var workers = [];
  for (var w = 0; w < Math.min(concurrency, items.length); w++) workers.push(worker());
  await Promise.all(workers);
  return results;
}

var CSS = `
  #${PANEL_ID} {
    position:fixed;bottom:20px;right:20px;width:420px;max-height:88vh;
    background:#1a1a1a;color:#f0f0f0;border:1px solid #f2b705;
    border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,.7);
    display:flex;flex-direction:column;font-family:'Segoe UI',Arial,sans-serif;
    font-size:13px;z-index:2147483647;user-select:none;overflow:hidden;
  }
  #${PANEL_ID} * { box-sizing:border-box;margin:0;padding:0; }
  #__g_header__ {
    background:linear-gradient(90deg,#1a1a1a 0%,#2a2000 100%);
    border-bottom:2px solid #f2b705;padding:10px 14px;
    display:flex;align-items:center;justify-content:space-between;cursor:grab;flex-shrink:0;
  }
  #__g_title__ { font-size:15px;font-weight:700;color:#f2b705;letter-spacing:1px; }
  #__g_header_btns__ { display:flex;gap:6px; }
  #__g_header_btns__ button {
    background:transparent;border:1px solid #555;color:#aaa;
    width:24px;height:24px;border-radius:4px;cursor:pointer;font-size:13px;
    display:flex;align-items:center;justify-content:center;transition:border-color .2s,color .2s;
  }
  #__g_header_btns__ button:hover { border-color:#f2b705;color:#f2b705; }
  #__g_body__ { display:flex;flex-direction:column;overflow-y:auto;flex:1;padding:12px;gap:10px; }
  #__g_body__::-webkit-scrollbar { width:5px; }
  #__g_body__::-webkit-scrollbar-thumb { background:#f2b705;border-radius:4px; }
  #__g_kpis__ { display:grid;grid-template-columns:1fr 1fr;gap:8px; }
  .g-kpi { background:#242424;border:1px solid #333;border-radius:8px;padding:8px 10px;display:flex;flex-direction:column;gap:2px; }
  .g-kpi-label { font-size:10px;color:#888;text-transform:uppercase;letter-spacing:.5px; }
  .g-kpi-value { font-size:20px;font-weight:700;color:#fff; }
  .g-kpi-value.green { color:#4caf50; }
  .g-kpi-value.yellow { color:#f2b705; }
  .g-kpi-value.red { color:#f44336; }
  #__g_ruas_wrap__ { background:#1e1e1e;border:1px solid #333;border-radius:8px;overflow:hidden; }
  #__g_ruas_title__ { padding:6px 10px;font-size:11px;font-weight:600;color:#f2b705;background:#242424;border-bottom:1px solid #333;text-transform:uppercase; }
  #__g_ruas_table__ { width:100%;border-collapse:collapse;font-size:12px; }
  #__g_ruas_table__ th { padding:5px 8px;text-align:left;color:#888;font-weight:600;border-bottom:1px solid #2a2a2a; }
  #__g_ruas_table__ td { padding:4px 8px;border-bottom:1px solid #222;color:#ddd; }
  #__g_ruas_table__ tr:hover td { background:#2a2a2a; }
  #__g_btn_extrair__ {
    background:#f2b705;color:#1a1a1a;border:none;border-radius:8px;
    padding:12px 0;font-size:14px;font-weight:700;cursor:pointer;letter-spacing:.5px;
    transition:opacity .2s,transform .1s;flex-shrink:0;
  }
  #__g_btn_extrair__:hover:not(:disabled) { opacity:.9;transform:scale(1.01); }
  #__g_btn_extrair__:disabled { opacity:.4;cursor:not-allowed; }
  #__g_log_wrap__ {
    background:#0d0d0d;border:1px solid #2a2a2a;border-radius:8px;
    padding:8px 10px;max-height:130px;overflow-y:auto;display:flex;flex-direction:column;gap:2px;
  }
  .g-log-line { font-size:11px;color:#ccc;font-family:monospace;line-height:1.5; }
  .g-log-line.ok { color:#4caf50; }
  .g-log-line.err { color:#f44336; }
  .g-log-line.warn { color:#f2b705; }
  .g-log-line.info { color:#64b5f6; }
  #__g_footer__ { text-align:center;font-size:10px;color:#555;padding:4px 0 2px;flex-shrink:0; }
`;

var styleEl = document.createElement('style');
styleEl.textContent = CSS;
document.head.appendChild(styleEl);

var panel = document.createElement('div');
panel.id = PANEL_ID;
panel.innerHTML = `
  <div id="__g_header__">
    <span id="__g_title__">🥅 GOLEIRO ${FACILITY}</span>
    <div id="__g_header_btns__">
      <button id="__g_btn_min__" title="Minimizar">–</button>
      <button id="__g_btn_close__" title="Fechar">✕</button>
    </div>
  </div>
  <div id="__g_body__">
    <div id="__g_kpis__">
      <div class="g-kpi"><span class="g-kpi-label">📦 Total Goleiro</span><span class="g-kpi-value" id="__g_kpi_total__">–</span></div>
      <div class="g-kpi"><span class="g-kpi-label">🎯 Unid. Esperadas</span><span class="g-kpi-value" id="__g_kpi_expected__">–</span></div>
      <div class="g-kpi"><span class="g-kpi-label">📊 Eficiência</span><span class="g-kpi-value" id="__g_kpi_efic__">–</span></div>
      <div class="g-kpi"><span class="g-kpi-label">⚠️ Goleiro Recebeu</span><span class="g-kpi-value" id="__g_kpi_goleiro__">–</span></div>
    </div>
    <div id="__g_ruas_wrap__">
      <div id="__g_ruas_title__">📋 Ruas / Gaiolas</div>
      <table id="__g_ruas_table__">
        <thead><tr><th>Rua</th><th>Gaiolas</th><th>Pacotes</th><th>Ciclos</th></tr></thead>
        <tbody id="__g_ruas_tbody__"><tr><td colspan="4" style="color:#555;padding:10px 8px;">Aguardando extração...</td></tr></tbody>
      </table>
    </div>
    <button id="__g_btn_extrair__">▶ EXTRAIR DADOS</button>
    <div id="__g_log_wrap__"><span class="g-log-line info">Pronto. Clique em EXTRAIR DADOS para iniciar.</span></div>
    <div id="__g_footer__">Última extração: –</div>
  </div>
`;
document.body.appendChild(panel);

var body = document.getElementById('__g_body__');
var btnMin = document.getElementById('__g_btn_min__');
var btnClose = document.getElementById('__g_btn_close__');
var btnExtrair = document.getElementById('__g_btn_extrair__');
var logWrap = document.getElementById('__g_log_wrap__');
var footer = document.getElementById('__g_footer__');
var kpiTotal = document.getElementById('__g_kpi_total__');
var kpiExpected = document.getElementById('__g_kpi_expected__');
var kpiEfic = document.getElementById('__g_kpi_efic__');
var kpiGoleiro = document.getElementById('__g_kpi_goleiro__');
var ruasTbody = document.getElementById('__g_ruas_tbody__');

var minimized = false;
btnMin.addEventListener('click', function() {
  minimized = !minimized;
  body.style.display = minimized ? 'none' : 'flex';
  btnMin.textContent = minimized ? '+' : '–';
});
btnClose.addEventListener('click', function() { panel.style.display = 'none'; });

(function() {
  var header = document.getElementById('__g_header__');
  var dragging = false, ox = 0, oy = 0;
  header.addEventListener('mousedown', function(e) {
    if (e.target.tagName === 'BUTTON') return;
    dragging = true;
    var r = panel.getBoundingClientRect();
    ox = e.clientX - r.left; oy = e.clientY - r.top;
    panel.style.bottom = 'auto'; panel.style.right = 'auto';
    e.preventDefault();
  });
  document.addEventListener('mousemove', function(e) { if (!dragging) return; panel.style.left=(e.clientX-ox)+'px'; panel.style.top=(e.clientY-oy)+'px'; });
  document.addEventListener('mouseup', function() { dragging = false; });
})();

function log(msg, type) {
  var line = document.createElement('span');
  line.className = 'g-log-line' + (type ? ' ' + type : '');
  line.textContent = '[' + hhmmss(nowBrasilia()) + '] ' + msg;
  logWrap.appendChild(line);
  logWrap.scrollTop = logWrap.scrollHeight;
}
function clearLog() { logWrap.innerHTML = ''; }

function updateKPIs(total, expected) {
  kpiTotal.textContent = total.toLocaleString('pt-BR');
  kpiExpected.textContent = expected ? expected.toLocaleString('pt-BR') : '–';
  var gol = expected > 0 ? (total / expected) * 100 : 0;
  var efic = Math.max(0, 100 - gol);
  kpiEfic.textContent = efic.toFixed(2) + '%';
  kpiGoleiro.textContent = gol.toFixed(2) + '%';
  kpiEfic.className = 'g-kpi-value ' + (efic >= 90 ? 'green' : efic >= 70 ? 'yellow' : 'red');
  kpiGoleiro.className = 'g-kpi-value ' + (gol < 10 ? 'green' : gol < 30 ? 'yellow' : 'red');
}

function updateRuasTable(statsMap) {
  var keys = Object.keys(statsMap).sort();
  if (!keys.length) { ruasTbody.innerHTML = '<tr><td colspan="4" style="color:#555">Nenhum dado.</td></tr>'; return; }
  ruasTbody.innerHTML = keys.map(function(rua) {
    var s = statsMap[rua];
    return '<tr><td><b style="color:#f2b705">' + rua + '</b></td><td>' + s.gaiolas.size + '</td><td>' + s.pacotes.toLocaleString('pt-BR') + '</td><td style="font-size:10px;color:#aaa">' + Array.from(s.ciclos).sort().join(', ') + '</td></tr>';
  }).join('');
}

btnExtrair.addEventListener('click', async function() {
  btnExtrair.disabled = true;
  btnExtrair.textContent = '⏳ Extraindo...';
  clearLog();

  var now = nowBrasilia();
  var dataEx = ddmmyyyy(now);
  var horaEx = hhmmss(now);
  var ciclo = cicloAtual(now);
  var ymd = yyyymmdd(now);

  log('Iniciando extração — ' + dataEx + ' ' + horaEx, 'info');
  log('Ciclo atual: ' + ciclo, 'info');

  try {
    log('🔍 Buscando ruas e gaiolas...', 'info');
    var resp1 = await fetch(BASE_URL + '/monitoring', { credentials: 'include', headers: { 'Accept': 'application/json' } });
    if (!resp1.ok) throw new Error('API 1 HTTP ' + resp1.status);
    var ruas = await resp1.json();
    if (!Array.isArray(ruas)) throw new Error('API 1 formato inesperado');

    var allContainers = [];
    ruas.forEach(function(rua) {
      if (!Array.isArray(rua.containers)) return;
      rua.containers.forEach(function(c) {
        allContainers.push({
          ruaPrefix: rua.prefix, containerId: c.id, assignment: c.assignment,
          status: c.status, dock: c.dock, wave: c.wave,
          cicloGaiola: (c.assignment || '').split('_').pop() || ''
        });
      });
    });
    log('✅ ' + ruas.length + ' ruas, ' + allContainers.length + ' gaiolas.', 'ok');

    var allRows = [];
    var statsMap = {};
    var processed = 0;

    await batchAsync(allContainers, async function(cont) {
      var detail = { load: [], expected_load: 0 };
      try {
        var r = await fetch(BASE_URL + '/api/monitoring/' + cont.containerId + '/details', { credentials: 'include', headers: { 'Accept': 'application/json' } });
        if (!r.ok) throw new Error('HTTP ' + r.status);
        detail = await r.json();
      } catch(e) { log('⚠️ ' + cont.assignment + ': ' + e.message, 'warn'); }

      var loads = Array.isArray(detail.load) ? detail.load : [];
      loads.forEach(function(pkg) {
        allRows.push({
          shipmentId: String(pkg.shipment_id || pkg.shipmentId || ''),
          gaiola: cont.assignment, rua: cont.ruaPrefix,
          ciclo: cont.cicloGaiola || ciclo, status: pkg.status || '',
          substatus: pkg.substatus || '',
          tags: Array.isArray(pkg.tags) ? pkg.tags.join(',') : '',
          dock: cont.dock, wave: cont.wave,
          unitsExpected: detail.expected_load || 0,
          dataExtracao: dataEx, horaExtracao: horaEx
        });
      });

      var rua = cont.ruaPrefix;
      if (!statsMap[rua]) statsMap[rua] = { gaiolas: new Set(), pacotes: 0, ciclos: new Set() };
      statsMap[rua].gaiolas.add(cont.assignment);
      statsMap[rua].pacotes += loads.length;
      if (cont.cicloGaiola) statsMap[rua].ciclos.add(cont.cicloGaiola);

      processed++;
      if (processed % 10 === 0 || processed === allContainers.length)
        log('  → ' + processed + '/' + allContainers.length + ' gaiolas...', '');
    }, CONCURRENCY);

    log('✅ ' + allRows.length + ' pacotes encontrados.', 'ok');

    log('🏷️ Buscando etiquetagem...', 'info');
    var labelData = { unitsLabelled: 0, unitsExpected: 0 };
    for (var ci = 0; ci < CICLOS.length; ci++) {
      var c = CICLOS[ci];
      try {
        var rl = await fetch(BASE_URL + '/monitoring/label?group=' + encodeURIComponent(FACILITY+'_'+ymd+'_'+c+'_0'), { credentials: 'include', headers: { 'Accept': 'application/json' } });
        if (!rl.ok) throw new Error('HTTP ' + rl.status);
        var ld = await rl.json();
        if (c === ciclo && ld.unitsExpected) { labelData.unitsExpected = ld.unitsExpected || 0; labelData.unitsLabelled = ld.unitsLabelled || 0; }
        if (ld.unitsLabelled) labelData.unitsLabelled = Math.max(labelData.unitsLabelled, ld.unitsLabelled);
        log('  → ' + c + ': ' + (ld.unitsLabelled||0) + ' etiq / ' + (ld.unitsExpected||0) + ' esperadas', '');
      } catch(e) { log('  ⚠️ Etiq ' + c + ': ' + e.message, 'warn'); }
    }

    var totalPacotes = allRows.length;
    var unitsExpected = labelData.unitsExpected || 0;
    var goleiroRecebeu = unitsExpected > 0 ? +((totalPacotes / unitsExpected) * 100).toFixed(2) : 0;
    var eficiencia = Math.max(0, +(100 - goleiroRecebeu).toFixed(2));

    updateKPIs(totalPacotes, unitsExpected);
    updateRuasTable(statsMap);
    footer.textContent = 'Última extração: ' + dataEx + ' ' + horaEx;

    var payload = {
      action: 'goleiro_sync',
      data: allRows,
      meta: { facility: FACILITY, dataExtracao: dataEx, horaExtracao: horaEx, totalPacotes: totalPacotes, unitsExpected: unitsExpected, unitsLabelled: labelData.unitsLabelled, eficiencia: eficiencia, goleiroRecebeu: goleiroRecebeu, cicloAtual: ciclo }
    };

    log('📤 Enviando ' + totalPacotes + ' pacotes para a planilha...', 'info');
    try {
      var respSheet = await fetch(WEB_APP_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(payload) });
      var txt = await respSheet.text();
      var parsed; try { parsed = JSON.parse(txt); } catch(_) { parsed = null; }
      if (respSheet.ok) {
        log('✅ Concluído! ' + totalPacotes + ' pacotes enviados.', 'ok');
        log('   Eficiência: ' + eficiencia + '% | Goleiro recebeu: ' + goleiroRecebeu + '%', 'ok');
        if (parsed && parsed.message) log('   Planilha: ' + parsed.message, 'ok');
      } else { throw new Error('HTTP ' + respSheet.status); }
    } catch(e) { log('❌ Erro ao enviar: ' + e.message, 'err'); }

  } catch(e) {
    log('❌ Erro crítico: ' + e.message, 'err');
  } finally {
    btnExtrair.disabled = false;
    btnExtrair.textContent = '▶ EXTRAIR DADOS';
  }
});

log('Goleiro SRJ3 carregado. Ciclo: ' + cicloAtual(nowBrasilia()), 'ok');
})();