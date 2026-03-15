function renderDashboard() {
  var user = getCurrentUser();
  if (!user) return;

  var dashProjects = [
    {
      name: 'Westgate Bridge Rehab',
      status: 'Active',
      progress: 28,
      budget: 38000000,
      spent: 10200000,
      forecast: 37400000,
      start: 'Mar 2024',
      est: 'Feb 2025'
    },
    {
      name: 'Southern Ring Road',
      status: 'Tendering',
      progress: 0,
      budget: 210000000,
      spent: 0,
      forecast: 210000000,
      start: 'TBC',
      est: 'TBC'
    },
    {
      name: 'District Water Upgrade',
      status: 'Under Review',
      progress: 0,
      budget: 65000000,
      spent: 0,
      forecast: 65000000,
      start: 'TBC',
      est: 'TBC'
    },
    {
      name: 'Harbour Freight Terminal',
      status: 'Active',
      progress: 11,
      budget: 52000000,
      spent: 5800000,
      forecast: 51200000,
      start: 'Jan 2024',
      est: 'Dec 2025'
    }
  ];

  var totalBudget = 0;
  var activeCount = 0;
  var avgProgress = 0;
  var progressCount = 0;

  dashProjects.forEach(function(p) {
    totalBudget += p.budget;
    if (p.status === 'Active') activeCount++;
    if (p.progress > 0) { avgProgress += p.progress; progressCount++; }
  });

  var avgPct    = progressCount > 0 ? Math.round(avgProgress / progressCount) : 0;
  var budgetFmt = '$' + (totalBudget / 1000000).toFixed(0) + 'M';

  var projectCards = '';

  dashProjects.forEach(function(p) {
    var variance    = p.budget - p.forecast;
    var variancePct = p.budget > 0 ? ((variance / p.budget) * 100).toFixed(1) : '0.0';
    var varDir      = variance >= 0 ? 'Under' : 'Over';
    var varClass    = variance >= 0 ? 'under' : 'over';
    var varFmt      = '$' + Math.abs(variance / 1000000).toFixed(1) + 'M';
    var budFmt      = '$' + (p.budget / 1000000).toFixed(1) + 'M';
    var spentFmt    = '$' + (p.spent / 1000000).toFixed(1) + 'M';
    var forecastFmt = '$' + (p.forecast / 1000000).toFixed(1) + 'M';

    var statusColor = p.status === 'Active'
      ? 'rgba(232,98,10,0.15);color:#c4520a'
      : 'rgba(200,200,200,0.2);color:#888';

    projectCards += '<div class="dash-project-card">'
      + '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px;">'
      + '<h4>' + p.name + '</h4>'
      + '<span style="font-size:0.68rem;font-weight:700;text-transform:uppercase;padding:2px 8px;border-radius:99px;background:' + statusColor + '">' + p.status + '</span>'
      + '</div>'
      + '<div class="dp-meta">' + p.start + ' → ' + p.est + '</div>'
      + '<div class="dp-row"><span>Budget</span><strong>' + budFmt + '</strong></div>'
      + '<div class="dp-row"><span>Spent to Date</span><strong>' + spentFmt + '</strong></div>'
      + '<div class="dp-row"><span>Forecasted Total</span><strong>' + forecastFmt + '</strong></div>'
      + '<div class="dp-row"><span>Budget Variance</span>'
      + '<strong><span class="dash-variance ' + varClass + '">' + varDir + ' ' + varFmt + ' (' + Math.abs(variancePct) + '%)</span></strong>'
      + '</div>'
      + '<div class="bar-labels" style="margin-top:10px;"><span>Progress</span><span>' + p.progress + '%</span></div>'
      + '<div class="bar-wrap"><div class="bar-fill" style="width:' + p.progress + '%"></div></div>'
      + '</div>';
  });

  var html = '<div class="dash-header">'
    + '<div class="dash-header-inner">'
    + '<div class="dash-welcome"><h1>Welcome back, ' + user.name + '</h1>'
    + '<p>' + user.company + ' · Member since ' + user.joined + '</p></div>'
    + '<button class="btn" id="logout-btn" type="button" style="background:#333;border-color:#333;">'
    + '<i class="fa-solid fa-right-from-bracket"></i> Logout</button>'
    + '</div></div>'
    + '<div class="dash-body">'
    + '<div class="dash-stats">'
    + '<div class="dash-stat"><div class="dash-stat-val">' + dashProjects.length + '</div><div class="dash-stat-lbl">Total Projects</div></div>'
    + '<div class="dash-stat"><div class="dash-stat-val">' + activeCount + '</div><div class="dash-stat-lbl">Active Sites</div></div>'
    + '<div class="dash-stat"><div class="dash-stat-val">' + budgetFmt + '</div><div class="dash-stat-lbl">Total Budget</div></div>'
    + '<div class="dash-stat"><div class="dash-stat-val">' + avgPct + '%</div><div class="dash-stat-lbl">Avg Progress</div></div>'
    + '</div>'
    + '<p class="dash-section-title">Your Projects</p>'
    + '<div class="dash-grid">' + projectCards + '</div>'
    + '<div class="dash-chart-box">'
    + '<p class="chart-title"><i class="fa-solid fa-chart-line" style="color:var(--orange);margin-right:6px;"></i> Cash Flow — Westgate Bridge Rehab (2024)</p>'
    + '<canvas id="cashflow-chart"></canvas>'
    + '<div class="chart-legend">'
    + '<span><span class="legend-dot" style="background:var(--orange);"></span> Actual Spend</span>'
    + '<span><span class="legend-dot" style="background:#bbb;"></span> Planned Spend</span>'
    + '</div></div></div>';

  document.getElementById('dashboard-container').innerHTML = html;

  document.getElementById('logout-btn').addEventListener('click', function() {
    clearCurrentUser();
    updateNavForAuth();
    window.location.hash = '#home';
  });

  drawCashflowChart();
}

function drawCashflowChart() {
  var canvas = document.getElementById('cashflow-chart');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var W   = canvas.offsetWidth;
  var H   = 200;
  canvas.width  = W;
  canvas.height = H;

  var planned = [0, 1.2, 2.8, 4.5, 6.4, 8.2, 10.0, 11.6, 13.0, 14.1, 14.9, 15.4];
  var actual  = [0, 1.0, 2.4, 4.1, 5.8, 7.2, 8.9,  10.2, null, null, null, null];
  var months  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  var maxVal = 16;
  var padL = 40, padR = 16, padT = 12, padB = 28;
  var chartW = W - padL - padR;
  var chartH = H - padT - padB;

  function xPos(i) { return padL + (i / (months.length - 1)) * chartW; }
  function yPos(v) { return padT + chartH - (v / maxVal) * chartH; }

  ctx.clearRect(0, 0, W, H);

  ctx.strokeStyle = '#eee';
  ctx.lineWidth   = 1;
  for (var g = 0; g <= 4; g++) {
    var gv = (g / 4) * maxVal;
    var gy = yPos(gv);
    ctx.beginPath();
    ctx.moveTo(padL, gy);
    ctx.lineTo(W - padR, gy);
    ctx.stroke();
    ctx.fillStyle = '#aaa';
    ctx.font = '10px Nunito Sans, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('$' + gv.toFixed(0) + 'M', padL - 4, gy + 3);
  }

  ctx.fillStyle = '#ccc';
  ctx.font = '10px Nunito Sans, sans-serif';
  ctx.textAlign = 'center';
  months.forEach(function(m, i) {
    ctx.fillText(m, xPos(i), H - 6);
  });

  function drawLine(data, color, dashed) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth   = 2.5;
    ctx.lineJoin    = 'round';
    if (dashed) ctx.setLineDash([6, 4]);
    else        ctx.setLineDash([]);

    var started = false;
    data.forEach(function(v, i) {
      if (v === null) return;
      if (!started) { ctx.moveTo(xPos(i), yPos(v)); started = true; }
      else          { ctx.lineTo(xPos(i), yPos(v)); }
    });
    ctx.stroke();
    ctx.setLineDash([]);

    data.forEach(function(v, i) {
      if (v === null) return;
      ctx.beginPath();
      ctx.arc(xPos(i), yPos(v), 3.5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });
  }

  drawLine(planned, '#ccc', true);
  drawLine(actual,  '#E8620A', false);
}

window.addEventListener('hashchange', function() {
  if (window.location.hash === '#dashboard') {
    var user = getCurrentUser();
    if (!user) { window.location.hash = '#portal'; return; }
    renderDashboard();
  }
});

if (window.location.hash === '#dashboard') {
  var u = getCurrentUser();
  if (u) renderDashboard();
  else window.location.hash = '#portal';
}

