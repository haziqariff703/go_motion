// UI Helpers
function filterCarStatus(status) {
    const rows = document.querySelectorAll('#carsTableBody tr');
    rows.forEach(row => {
        const badge = row.querySelector('.badge');
        if (badge) {
            row.style.display = (status === 'all' || badge.textContent.trim() === status) ? '' : 'none';
        }
    });
}

// --- SIDEBAR TOGGLE LOGIC ---
function initSidebarToggle() {
    const toggle = document.getElementById('menu-toggle');
    
    if (toggle) {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Check if Mobile (Screen < 768px)
            if (window.innerWidth < 768) {
                // Mobile Logic
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
    
    // Create Backdrop
    if (!document.getElementById('sidebar-backdrop')) {
        const backdrop = document.createElement('div');
        backdrop.id = 'sidebar-backdrop';
        backdrop.className = 'sidebar-backdrop';
        // CLICKING BACKDROP CLOSES SIDEBAR
        backdrop.addEventListener('click', closeSidebar);
        document.body.appendChild(backdrop);
    }
}

function closeSidebar() {
    document.body.classList.remove('sb-sidenav-open');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (backdrop) backdrop.remove();
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

    if(select) {
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

// --- INITIALIZE ---
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