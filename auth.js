function showMsg(el, message, type) {
  el.textContent = message;
  el.className = 'form-msg ' + type;
}

function clearMsg(el) {
  el.textContent = '';
  el.className = 'form-msg';
}

function getUsers() {
  var raw = localStorage.getItem('atlas_users');
  return raw ? JSON.parse(raw) : [];
}

function saveUsers(users) {
  localStorage.setItem('atlas_users', JSON.stringify(users));
}

function getCurrentUser() {
  var raw = localStorage.getItem('atlas_current_user');
  return raw ? JSON.parse(raw) : null;
}

function setCurrentUser(user) {
  localStorage.setItem('atlas_current_user', JSON.stringify(user));
}

function clearCurrentUser() {
  localStorage.removeItem('atlas_current_user');
}

function updateNavForAuth() {
  var user     = getCurrentUser();
  var authHide = document.querySelectorAll('.auth-hide');
  var authShow = document.querySelectorAll('.auth-show');

  if (user) {
    authHide.forEach(function(el) { el.style.display = 'none'; });
    authShow.forEach(function(el) { el.style.display = ''; });
  } else {
    authHide.forEach(function(el) { el.style.display = ''; });
    authShow.forEach(function(el) { el.style.display = 'none'; });
  }
}


var loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', function() {
  var email    = document.getElementById('login-email').value.trim();
  var password = document.getElementById('login-pass').value;
  var errEl    = document.getElementById('login-error');
  var sucEl    = document.getElementById('login-success');

  clearMsg(errEl);
  clearMsg(sucEl);

  if (email === '' && password === '') { showMsg(errEl, 'Please enter your email and password.', 'error'); return; }
  if (email === '')    { showMsg(errEl, 'Please enter your email address.', 'error'); return; }
  if (password === '') { showMsg(errEl, 'Please enter your password.', 'error'); return; }

  var users = getUsers();
  var match = null;

  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      match = users[i];
      break;
    }
  }

  if (!match) { showMsg(errEl, 'Incorrect email or password. Please try again.', 'error'); return; }

  setCurrentUser(match);
  updateNavForAuth();
  showMsg(sucEl, 'Welcome back, ' + match.name + '! Redirecting...', 'success');

  setTimeout(function() {
    window.location.hash = '#dashboard';
    clearMsg(sucEl);
    document.getElementById('login-email').value = '';
    document.getElementById('login-pass').value  = '';
  }, 1200);
});

var regBtn = document.getElementById('reg-btn');

regBtn.addEventListener('click', function() {
  var name    = document.getElementById('reg-name').value.trim();
  var company = document.getElementById('reg-company').value.trim();
  var email   = document.getElementById('reg-email').value.trim();
  var pass    = document.getElementById('reg-pass').value;
  var confirm = document.getElementById('reg-confirm').value;
  var errEl   = document.getElementById('reg-error');
  var sucEl   = document.getElementById('reg-success');

  clearMsg(errEl);
  clearMsg(sucEl);

  if (name === '')    { showMsg(errEl, 'Please enter your full name.', 'error'); return; }
  if (company === '') { showMsg(errEl, 'Please enter your company name.', 'error'); return; }
  if (email === '')   { showMsg(errEl, 'Please enter your email address.', 'error'); return; }
  if (!email.includes('@') || !email.includes('.')) { showMsg(errEl, 'Please enter a valid email address.', 'error'); return; }
  if (pass === '')    { showMsg(errEl, 'Please choose a password.', 'error'); return; }
  if (pass.length < 6) { showMsg(errEl, 'Password must be at least 6 characters.', 'error'); return; }
  if (confirm === '') { showMsg(errEl, 'Please confirm your password.', 'error'); return; }
  if (pass !== confirm) { showMsg(errEl, 'Passwords do not match.', 'error'); return; }

  var users = getUsers();

  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email) { showMsg(errEl, 'An account with that email already exists.', 'error'); return; }
  }

  var newUser = {
    name: name,
    company: company,
    email: email,
    password: pass,
    joined: new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
  };

  users.push(newUser);
  saveUsers(users);
  setCurrentUser(newUser);
  updateNavForAuth();
  showMsg(sucEl, 'Account created! Taking you to your dashboard...', 'success');

  setTimeout(function() {
    window.location.hash = '#dashboard';
    document.getElementById('reg-name').value    = '';
    document.getElementById('reg-company').value = '';
    document.getElementById('reg-email').value   = '';
    document.getElementById('reg-pass').value    = '';
    document.getElementById('reg-confirm').value = '';
    clearMsg(sucEl);
  }, 1200);
});

var mobileLogout = document.getElementById('mobile-logout');

mobileLogout.addEventListener('click', function(e) {
  e.preventDefault();
  clearCurrentUser();
  updateNavForAuth();
  window.location.hash = '#home';
});

window.addEventListener('hashchange', function() {
  if (window.location.hash === '#dashboard') {
    var user = getCurrentUser();
    if (!user) window.location.hash = '#portal';
  }
});

updateNavForAuth();
