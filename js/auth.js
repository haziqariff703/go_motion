
// auth.js manages client-side authentication, page protection, and form interactions on the login page.


// --- Authentication & Page Protection ---
// Checks if the user is authenticated upon page load.
// If not authenticated, it redirects any page other than the login page (`index.html`) back to the login page.
const isLoggedIn = localStorage.getItem('crs_auth');
const currentPage = window.location.pathname.split("/").pop();

if (!isLoggedIn && currentPage !== 'index.html' && currentPage !== '') {
    window.location.href = 'index.html';
}
// --- Login Form Submission ---
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;

        /**
         * @todo Replace with a secure, server-side authentication method.
         * @description The current implementation uses hardcoded credentials for demonstration purposes.
         * This is a major security vulnerability and should not be used in a production environment.
         */
        if (user === 'admin' && pass === '1234') {
            localStorage.setItem('crs_auth', 'true');
            window.location.href = 'dashboard.html';
        } else {
            document.getElementById('errorMsg').classList.remove('d-none');
        }
    });
}

// Logs the user out by clearing authentication from localStorage and redirecting to the login page.
function logout() {
    localStorage.removeItem('crs_auth');
    window.location.href = 'index.html';
}


// Toggles the visibility between the login and registration form sections.
// Assumes 'd-none' class is used for hiding elements.

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

/**
 * Toggles the input type of a password field between 'password' and 'text'.
 * @param {string} inputId The ID of the password input field.
 * @param {HTMLElement} btn The button element that triggers the toggle.
 */
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

// --- Registration Form Submission ---
const regForm = document.getElementById('registerForm');
if (regForm) {
    regForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert("Account created successfully! Please login.");
        toggleForms(); // Switch back to login
    });
}