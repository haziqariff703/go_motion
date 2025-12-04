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

function initSidebarToggle() {
    const toggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar-wrapper');
    
    if (toggle && sidebar) {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Check if we are on mobile (screen smaller than 768px)
            if (window.innerWidth < 768) {
                // MOBILE LOGIC: Toggle 'sb-sidenav-open'
                if (document.body.classList.contains('sb-sidenav-open')) {
                    document.body.classList.remove('sb-sidenav-open');
                    removeBackdrop();
                } else {
                    document.body.classList.add('sb-sidenav-open');
                    addBackdrop();
                }
            } else {
                // DESKTOP LOGIC: Toggle 'sb-sidenav-collapsed'
                document.body.classList.toggle('sb-sidenav-collapsed');
            }
        });
    }
}

// Helper to add dark overlay on mobile
function addBackdrop() {
    // Check if backdrop already exists
    if (document.getElementById('sidebar-backdrop')) return;

    const backdrop = document.createElement('div');
    backdrop.id = 'sidebar-backdrop';
    backdrop.className = 'sidebar-backdrop'; 
    
    // Clicking backdrop closes sidebar
    backdrop.addEventListener('click', () => {
        document.body.classList.remove('sb-sidenav-open');
        backdrop.remove();
    });
    
    document.body.appendChild(backdrop);
}

// Helper to remove backdrop
function removeBackdrop() {
    const backdrop = document.getElementById('sidebar-backdrop');
    if (backdrop) backdrop.remove();
}

function initThemeSwitcher() {
    // 1. ALWAYS apply the saved theme on load (for all pages)
    const storedTheme = localStorage.getItem('crs_theme') || 'auto';
    const applyTheme = (theme) => {
        let effectiveTheme = theme;
        if (theme === 'auto') {
            effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        document.documentElement.setAttribute('data-bs-theme', effectiveTheme);
    };
    applyTheme(storedTheme); // Apply immediately

    // 2. IF the dropdown exists (Settings page), so it will sync it
    const select = document.getElementById('themeSelect');
    if (select) {
        select.value = storedTheme;
        select.addEventListener('change', function() {
            const selectedTheme = this.value;
            localStorage.setItem('crs_theme', selectedTheme);
            applyTheme(selectedTheme);
        });
    }

    // 3. Listen for system changes (if auto is selected)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (localStorage.getItem('crs_theme') === 'auto') applyTheme('auto');
    });
}

// --- INITIALIZE EVERYTHING ON LOAD ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Render all tables
    renderCars();
    renderRentals();
    renderCustomers();
    renderMaintenance();
    renderActivity(); 

    // 2. Initialize Dashboard & UI
    updateKPIs();
    initCharts(); 
    initSidebarToggle();
    initThemeSwitcher();
});