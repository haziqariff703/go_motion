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
    if (!toggle) return;

    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Check if Mobile (Screen < 768px)
        if (window.innerWidth < 768) {
            const body = document.body;
            
            if (body.classList.contains('sb-sidenav-open')) {
                // CLOSE Sidebar
                body.classList.remove('sb-sidenav-open');
                removeBackdrop();
            } else {
                // OPEN Sidebar
                body.classList.add('sb-sidenav-open');
                addBackdrop();
            }
        } else {
            // Desktop Logic
            document.body.classList.toggle('sb-sidenav-collapsed');
        }
    });
}

// Helper: Add Backdrop
function addBackdrop() {
    if (document.getElementById('sidebar-backdrop')) return; // Prevent duplicates

    const backdrop = document.createElement('div');
    backdrop.id = 'sidebar-backdrop';
    backdrop.className = 'sidebar-backdrop';
    
    // Close sidebar when clicking outside
    backdrop.addEventListener('click', () => {
        document.body.classList.remove('sb-sidenav-open');
        removeBackdrop();
    });
    
    document.body.appendChild(backdrop);
}

// Helper: Remove Backdrop
function removeBackdrop() {
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