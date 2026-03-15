var projectData = [
  {
    id: 'northgate',
    name: 'Northgate Interchange',
    category: 'public',
    year: 2018,
    budget: 120000000,
    spent: 118200000,
    forecast: 119000000,
    status: 'Completed',
    progress: 100,
    duration: '24 months',
    location: 'Northern District',
    image: 'https://images.unsplash.com/photo-1508916319692-80a99da75692?w=1000&q=80',
    description: 'The Northgate Interchange is a six-lane highway interchange connecting the northern industrial zone to the main port access road. The project involved significant earthworks across a 3.2km corridor, concrete retaining walls, and the installation of a fully signalised multi-level junction system.',
    description2: 'Delivered under budget by $1.8M and completed two weeks ahead of schedule. The interchange now serves over 120,000 vehicles per day and has reduced average journey times through the corridor by 34%.'
  },
  {
    id: 'redline',
    name: 'Redline Processing Plant',
    category: 'private',
    year: 2021,
    budget: 85000000,
    spent: 87400000,
    forecast: 87400000,
    status: 'Completed',
    progress: 100,
    duration: '30 months',
    location: 'Eastern Industrial Zone',
    image: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=1000&q=80',
    description: 'A high-capacity mineral processing facility commissioned by Redline Resources Ltd.',
    description2: 'The project came in 2.8% over budget due to steel price escalation. The facility opened on schedule in Q3 2021.'
  },
  {
    id: 'meru',
    name: 'Meru Valley Bridge',
    category: 'public',
    year: 2015,
    budget: 47000000,
    spent: 45600000,
    forecast: 45600000,
    status: 'Completed',
    progress: 100,
    duration: '18 months',
    location: 'Meru Valley, Eastern Region',
    image: 'https://plus.unsplash.com/premium_photo-1661875784169-6a0a656e752e?w=1000&q=80',
    description: 'A twin-span post-tensioned concrete bridge crossing the Meru River at its widest navigable point.',
    description2: 'The bridge serves 80,000 vehicles daily. The project came in $1.4M under budget.'
  },
  {
    id: 'solaris',
    name: 'Solaris Power Substation',
    category: 'private',
    year: 2020,
    budget: 34000000,
    spent: 33100000,
    forecast: 33100000,
    status: 'Completed',
    progress: 100,
    duration: '14 months',
    location: 'Western Grid Zone',
    image: 'https://images.unsplash.com/photo-1679374422220-afacebb2dfa0?w=1000&q=80',
    description: 'A 132/33kV bulk supply substation built for Solaris Energy to serve a newly developed industrial corridor.',
    description2: 'All civil works were coordinated with the client\'s electrical contractor across 14 months.'
  },
  {
    id: 'civic',
    name: 'Civic Court Complex',
    category: 'public',
    year: 2016,
    budget: 92000000,
    spent: 91200000,
    forecast: 91200000,
    status: 'Completed',
    progress: 100,
    duration: '36 months',
    location: 'City Centre',
    image: 'https://images.unsplash.com/photo-1720480917497-6e45a89576c0?w=1000&q=80',
    description: 'A five-building judicial complex for the regional government. Total gross floor area of 28,500sqm.',
    description2: 'Phased occupation began in month 30. The complex finished on time and $800,000 under budget.'
  },
  {
    id: 'greenlane',
    name: 'Greenlane Warehouse Park',
    category: 'private',
    year: 2022,
    budget: 29000000,
    spent: 28200000,
    forecast: 28200000,
    status: 'Completed',
    progress: 100,
    duration: '12 months',
    location: 'Greenlane Business Park',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&q=80',
    description: 'A 12-unit light industrial and logistics warehousing complex built in a single phase.',
    description2: 'All 12 units were pre-sold to tenants before practical completion.'
  }
];
var filterBtns   = document.querySelectorAll('.filter-btns button');
var projectCards = document.querySelectorAll('#project-cards .card');

filterBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    var filter = btn.getAttribute('data-filter');

    filterBtns.forEach(function(b) { b.className = 'btn-outline'; });
    btn.className = 'btn active-filter';

    projectCards.forEach(function(card) {
      if (filter === 'all' || card.getAttribute('data-cat') === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

var allCards = document.querySelectorAll('.card[data-id]');

allCards.forEach(function(card) {
  card.addEventListener('click', function(e) {
    if (e.target.classList.contains('card-bid-btn') || e.target.closest('.card-bid-btn')) return;
    var projectId = card.getAttribute('data-id');
    openProjectDetail(projectId);
  });
});

function openProjectDetail(id) {
  var project = null;
  for (var i = 0; i < projectData.length; i++) {
    if (projectData[i].id === id) { project = projectData[i]; break; }
  }

  if (!project) return;

  var budgetFmt   = '$' + (project.budget / 1000000).toFixed(1) + 'M';
  var spentFmt    = '$' + (project.spent / 1000000).toFixed(1) + 'M';
  var variance    = project.budget - project.spent;
  var variancePct = ((variance / project.budget) * 100).toFixed(1);
  var varDir      = variance >= 0 ? 'Under budget' : 'Over budget';
  var varClass    = variance >= 0 ? 'under' : 'over';
  var varianceFmt = '$' + Math.abs(variance / 1000000).toFixed(1) + 'M';
  var catLabel    = project.category === 'public' ? 'Public' : 'Private';

  var html = '<div class="detail-hero">'
    + '<img src="' + project.image + '" alt="' + project.name + '"/>'
    + '<div class="detail-hero-overlay"></div>'
    + '<div class="detail-hero-content">'
    + '<a href="#projects" class="detail-back"><i class="fa-solid fa-arrow-left"></i> Back to Projects</a>'
    + '<h1 class="detail-title">' + project.name + '</h1>'
    + '<div class="detail-tags">'
    + '<span class="card-overlay-tag ' + project.category + '">' + catLabel + '</span>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '<div class="detail-body">'
    + '<div class="detail-grid">'
    + '<div class="detail-description">'
    + '<h3>About This Project</h3>'
    + '<p>' + project.description + '</p>'
    + '<p>' + project.description2 + '</p>'
    + '<div class="detail-progress-section">'
    + '<h4>Completion</h4>'
    + '<div class="bar-labels"><span>Progress</span><span>' + project.progress + '%</span></div>'
    + '<div class="bar-wrap"><div class="bar-fill" style="width:' + project.progress + '%"></div></div>'
    + '</div>'
    + '<div class="detail-cta"><a href="#portal" class="btn">Request a Similar Bid</a></div>'
    + '</div>'
    + '<div class="detail-stats-box">'
    + '<h4>Project Summary</h4>'
    + '<div class="detail-stat-row"><span>Location</span><span>' + project.location + '</span></div>'
    + '<div class="detail-stat-row"><span>Completed</span><span>' + project.year + '</span></div>'
    + '<div class="detail-stat-row"><span>Duration</span><span>' + project.duration + '</span></div>'
    + '<div class="detail-stat-row"><span>Budget</span><span>' + budgetFmt + '</span></div>'
    + '<div class="detail-stat-row"><span>Actual Cost</span><span>' + spentFmt + '</span></div>'
    + '<div class="detail-stat-row"><span>Variance</span><span><span class="dash-variance ' + varClass + '">' + varDir + ' ' + variancePct + '%</span></span></div>'
    + '<div class="detail-stat-row"><span>Dollar Variance</span><span>' + varianceFmt + '</span></div>'
    + '</div>'
    + '</div>'
    + '</div>';

  document.getElementById('detail-container').innerHTML = html;
  window.location.hash = '#project-detail';
  window.scrollTo(0, 0);
}
var liveData = {
  d4road:  { pct: 62, max: 70 },
  stadium: { pct: 38, max: 45 },
  harbour: { pct: 11, max: 18 }
};

function tickLiveProgress() {
  var keys = Object.keys(liveData);
  keys.forEach(function(key) {
    var item = liveData[key];
    if (item.pct >= item.max) return;

    var bump = Math.random() * 0.3;
    item.pct = Math.min(item.max, +(item.pct + bump).toFixed(1));

    var barEl = document.getElementById('bar-' + key);
    var pctEl = document.getElementById('pct-' + key);

    if (barEl) barEl.style.width = item.pct + '%';
    if (pctEl) pctEl.textContent = item.pct.toFixed(1) + '%';
  });
}

setInterval(tickLiveProgress, 7000);

window.addEventListener('load', function() {
  if (window.location.hash === '#project-detail') {
    window.location.hash = '#projects';
  }
});