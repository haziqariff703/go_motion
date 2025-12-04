function filterCarStatus(status) {
    const rows = document.querySelectorAll('#carsTableBody tr');
    rows.forEach(row => {
        const badge = row.querySelector('.badge');
        if (badge) {
            row.style.display = (status === 'all' || badge.textContent.trim() === status) ? '' : 'none';
        }
    });
}

// --- SIDEBAR LOGIC (MOBILE SUPPORTED) ---
function initSidebarToggle() {
    const toggle = document.getElementById('menu-toggle');
    if (toggle) {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            
            // CHECK: Are we on Mobile?
            if (window.innerWidth < 768) {
                if (document.body.classList.contains('sb-sidenav-open')) {
                    document.body.classList.remove('sb-sidenav-open');
                    const bd = document.getElementById('sidebar-backdrop');
                    if (bd) bd.remove();
                } else {
                    document.body.classList.add('sb-sidenav-open');
                    // Add Backdrop
                    const backdrop = document.createElement('div');
                    backdrop.id = 'sidebar-backdrop';
                    backdrop.className = 'sidebar-backdrop';
                    backdrop.addEventListener('click', () => {
                         document.body.classList.remove('sb-sidenav-open');
                         backdrop.remove();
                    });
                    document.body.appendChild(backdrop);
                }
            } else {
                document.body.classList.toggle('sb-sidenav-collapsed');
            }
        });
    }
}

function initThemeSwitcher() {
    const select = document.getElementById('themeSelect');
    const storedTheme = localStorage.getItem('crs_theme') || 'auto';
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
}

document.addEventListener('DOMContentLoaded', () => {
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