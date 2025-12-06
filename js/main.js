// GLOBAL UI HELPERS & INITIALIZATION

/**
 * Debounce function to limit function execution frequency
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, delay = 300) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// 1. Filter Helper
/**
 * Filters car table by status
 * @param {string} status - Status to filter by ('all', 'Available', 'Rented', 'Maintenance')
 */
function filterCarStatus(status) {
    const rows = document.querySelectorAll('#carsTableBody tr');
    rows.forEach(row => {
        const badge = row.querySelector('.badge');
        if (badge) {
            row.style.display = (status === 'all' || badge.textContent.trim() === status) ? '' : 'none';
        }
    });
}

// 2. Sidebar Toggle Logic (Mobile & Desktop)
function initSidebarToggle() {
    const toggle = document.getElementById('menu-toggle');
    if (toggle) {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Mobile Logic (< 768px)
            if (window.innerWidth < 768) {
                if (document.body.classList.contains('sb-sidenav-open')) {
                    closeSidebar();
                } else {
                    openSidebar();
                }
            } else {
                // Desktop Logic
                document.body.classList.toggle('sb-sidenav-collapsed');
            }
        });
    }
}

function openSidebar() {
    document.body.classList.add('sb-sidenav-open');
    if (!document.getElementById('sidebar-backdrop')) {
        const backdrop = document.createElement('div');
        backdrop.id = 'sidebar-backdrop';
        backdrop.className = 'sidebar-backdrop';
        backdrop.addEventListener('click', closeSidebar);
        document.body.appendChild(backdrop);
    }
}

function closeSidebar() {
    document.body.classList.remove('sb-sidenav-open');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (backdrop) backdrop.remove();
}

// 3. Theme Switcher
function initThemeSwitcher() {
    const select = document.getElementById('themeSelect');
    const storedTheme = localStorage.getItem('crs_theme') || 'light';
    
    const applyTheme = (theme) => {
        let effectiveTheme = theme;
        if (theme === 'auto') {
            effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        document.documentElement.setAttribute('data-bs-theme', effectiveTheme);
    };
    
    applyTheme(storedTheme);

    if (select) {
        select.value = storedTheme;
        select.addEventListener('change', function() {
            localStorage.setItem('crs_theme', this.value);
            applyTheme(this.value);
        });
    }
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (localStorage.getItem('crs_theme') === 'auto') applyTheme('auto');
    });
}

// 4. Main Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Only run these if the functions exist (prevents errors on index.html)
    if (typeof renderCars === 'function') renderCars();
    if (typeof renderRentals === 'function') renderRentals();
    if (typeof renderCustomers === 'function') renderCustomers();
    if (typeof renderMaintenance === 'function') renderMaintenance();
    if (typeof renderActivity === 'function') renderActivity();
    if (typeof updateKPIs === 'function') updateKPIs();
    if (typeof initCharts === 'function') initCharts(); 
    
    initSidebarToggle();
    initThemeSwitcher();
});

function resetSystem() {
    if(confirm("Are you sure? This will wipe all your changes and restore default data.")) {
        localStorage.clear();
        window.location.reload();
    }
}