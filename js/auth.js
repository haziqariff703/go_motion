// Authentication Check
const isLoggedIn = localStorage.getItem('crs_auth');
const currentPage = window.location.pathname.split("/").pop();

if (!isLoggedIn && currentPage !== 'index.html' && currentPage !== '') {
    window.location.href = 'index.html';
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;

        if (user === 'admin' && pass === '1234') {
            localStorage.setItem('crs_auth', 'true');
            window.location.href = 'dashboard.html';
        } else {
            document.getElementById('errorMsg').classList.remove('d-none');
        }
    });
}

function logout() {
    localStorage.removeItem('crs_auth');
    window.location.href = 'index.html';
}

// 1. Toggle between Login and Register Forms
function toggleForms() {
    const loginSec = document.getElementById('loginSection');
    const regSec = document.getElementById('registerSection');
    
    if (loginSec.classList.contains('d-none')) {
        // Show Login
        loginSec.classList.remove('d-none');
        regSec.classList.add('d-none');
    } else {
        // Show Register
        loginSec.classList.add('d-none');
        regSec.classList.remove('d-none');
    }
}

// 2. Show/Hide Password
function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    const icon = btn.querySelector('i');
    
    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    } else {
        input.type = "password";
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    }
}

// 3. Handle Register Form Submit (For create account simulation)
const regForm = document.getElementById('registerForm');
if (regForm) {
    regForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert("Account created successfully! Please login.");
        toggleForms(); // Switch back to login
    });
}