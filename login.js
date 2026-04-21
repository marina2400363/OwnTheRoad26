// --- SELECTORS ---
const authForm = document.getElementById('auth-form');
const authTitle = document.getElementById('auth-title');
const submitBtn = document.getElementById('submit-btn');
const switchAuthLink = document.getElementById('switch-auth');
const msgBox = document.getElementById('msg-box');

const passwordInput = document.getElementById('password');
const togglePassIcon = document.getElementById('togglePassword');

const loginView = document.getElementById('login-view');
const dashboardView = document.getElementById('dashboard-view');

const navItems = document.querySelectorAll('.nav-item');
const tabContents = document.querySelectorAll('.tab-content');
const logoutBtn = document.getElementById('logout-trigger');

let isLoginMode = true;

// --- FUNCTIONS ---

function showMessage(text, type) {
  msgBox.textContent = text;
  msgBox.className = `msg-box ${type}`;
  msgBox.classList.remove('hid');
  
  setTimeout(() => {
    msgBox.classList.add('hid');
  }, 3000);
}

function toggleAuth() {
  isLoginMode = !isLoginMode;
  
  authTitle.textContent = isLoginMode ? "LOGIN" : "SIGN UP";
  submitBtn.textContent = isLoginMode ? "LOGIN" : "CREATE ACCOUNT";
  switchAuthLink.innerHTML = isLoginMode 
    ? "New here? <span>Create Account</span>" 
    : "Have an account? <span>Login</span>";
  
  document.getElementById('signup-fields').classList.toggle('hid', isLoginMode);
  document.getElementById('confirm-fields').classList.toggle('hid', isLoginMode);
}

function handleTabSwitch(targetTabId, activeElement) {
  tabContents.forEach(tab => tab.classList.add('hid'));
  navItems.forEach(item => item.classList.remove('active'));

  document.getElementById(targetTabId).classList.remove('hid');
  activeElement.classList.add('active');
}

function loadDashboardData(user) {
  loginView.classList.add('hid');
  dashboardView.classList.remove('hid');
  
  document.getElementById('user-display').textContent = user.email.split('@')[0].toUpperCase();
  document.getElementById('prof-email').textContent = user.email;
  document.getElementById('prof-phone').textContent = user.phone || "N/A";
}

// --- EVENT LISTENERS ---

// Toggle Password Visibility
togglePassIcon.addEventListener('click', function() {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  this.classList.toggle('fa-eye');
  this.classList.toggle('fa-eye-slash');
});

// Switch between Login and Signup
switchAuthLink.addEventListener('click', toggleAuth);

// Sidebar Navigation
navItems.forEach(item => {
  item.addEventListener('click', function() {
    const tabId = this.getAttribute('data-tab');
    handleTabSwitch(tabId, this);
  });
});

// Form Submission
authForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const emailValue = document.getElementById('email').value;
  const passValue = document.getElementById('password').value;

  if (isLoginMode) {
    // Login Logic
    const savedAccount = JSON.parse(localStorage.getItem('userAccount'));
    
    if (savedAccount && savedAccount.email === emailValue && savedAccount.pass === passValue) {
      loadDashboardData(savedAccount);
    } else {
      showMessage("Incorrect email or password.", "error");
    }
  } else {
    // Signup Logic
    const phoneValue = document.getElementById('phone').value;
    const confirmPass = document.getElementById('confirm-password').value;

    if (passValue.length < 6) {
      showMessage("Password must be at least 6 characters.", "error");
      return;
    }

    if (passValue !== confirmPass) {
      showMessage("Passwords do not match.", "error");
      return;
    }

    const newUser = { email: emailValue, pass: passValue, phone: phoneValue };
    localStorage.setItem('userAccount', JSON.stringify(newUser));
    
    showMessage("Account created successfully! Please login.", "success");
    setTimeout(toggleAuth, 1500);
  }
});

// Logout
logoutBtn.addEventListener('click', function() {
  window.location.reload();
});