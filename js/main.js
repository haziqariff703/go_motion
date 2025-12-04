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
    if (toggle) {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Check screen width
            if (window.innerWidth < 768) {
                // MOBILE: Add/Remove the 'Open' class
                if (document.body.classList.contains('sb-sidenav-open')) {
                    document.body.classList.remove('sb-sidenav-open');
                    // Remove backdrop if it exists
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
                // DESKTOP: Toggle Collapse
                document.body.classList.toggle('sb-sidenav-collapsed');
            }
        });
    }
}

// Helper: Create the dark overlay for mobile
function addBackdrop() {
    // Prevent multiple backdrops
    if (document.getElementById('sidebar-backdrop')) return;

    const backdrop = document.createElement('div');
    backdrop.id = 'sidebar-backdrop';
    backdrop.className = 'sidebar-backdrop'; // Uses your existing CSS
    
    // Close sidebar when clicking the background
    backdrop.addEventListener('click', () => {
        document.body.classList.remove('sb-sidenav-open');
        removeBackdrop();
    });
    
    document.body.appendChild(backdrop);
}

// Helper: Remove the dark overlay
function removeBackdrop() {
    const backdrop = document.getElementById('sidebar-backdrop');
    if (backdrop) backdrop.remove();
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