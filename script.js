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

// Datasets (Static for Demo)
const carData = [
    { id: 'C001', model: 'Perodua Myvi', type: 'Compact', plateNumber: 'ABC1234', price: 'RM 60', status: 'Available', image: 'myvi.jpg' },
    { id: 'C002', model: 'Honda City', type: 'Sedan', plateNumber: 'DEF5678', price: 'RM 120', status: 'Available', image: 'city.jpg' },
    { id: 'C003', model: 'Proton X50', type: 'SUV', plateNumber: 'GHI9012', price: 'RM 150', status: 'Available', image: 'x50.jpg' },
    { id: 'C004', model: 'Toyota Vios', type: 'Sedan', plateNumber: 'JKL3456', price: 'RM 130', status: 'Maintenance', image: 'vios.jpg' },
    { id: 'C005', model: 'Mazda CX-5', type: 'SUV', plateNumber: 'MNO7890', price: 'RM 180', status: 'Rented', image: 'cx5.jpg' },
    { id: 'C006', model: 'Nissan Almera', type: 'Sedan', plateNumber: 'PQR1234', price: 'RM 110', status: 'Rented', image: 'almera.jpg' },
    { id: 'C007', model: 'Hyundai Tucson', type: 'SUV', plateNumber: 'STU5678', price: 'RM 170', status: 'Available', image: 'tucson.jpg' },
    { id: 'C008', model: 'Ford Fiesta', type: 'Compact', plateNumber: 'VWX9012', price: 'RM 70', status: 'Maintenance', image: 'fiesta.jpg' },
    { id: 'C009', model: 'Volkswagen Polo', type: 'Compact', plateNumber: 'YZA3456', price: 'RM 80', status: 'Rented', image: 'polo.jpg' },
    { id: 'C010', model: 'Kia Sportage', type: 'SUV', plateNumber: 'BCD7890', price: 'RM 160', status: 'Maintenance', image: 'sportage.jpg' },
    { id: 'C011', model: 'Chevrolet Malibu', type: 'Sedan', plateNumber: 'EFG1234', price: 'RM 140', status: 'Available', image: 'malibu.jpg' },
    { id: 'C012', model: 'Subaru Forester', type: 'SUV', plateNumber: 'HIJ5678', price: 'RM 175', status: 'Rented', image: 'forester.jpg' },
    { id: 'C013', model: 'Audi A3', type: 'Sedan', plateNumber: 'KLM9012', price: 'RM 200', status: 'Available', image: 'audi_a3.jpg' },
    { id: 'C014', model: 'BMW X1', type: 'SUV', plateNumber: 'NOP3456', price: 'RM 220', status: 'Available', image: 'bmw_x1.jpg' },
    { id: 'C015', model: 'Mercedes-Benz A-Class', type: 'Sedan', plateNumber: 'QRS7890', price: 'RM 210', status: 'Available', image: 'mercedes_a_class.jpg' },
    { id: 'C016', model: 'Honda CR-V', type: 'SUV', plateNumber: 'TUV1234', price: 'RM 180', status: 'Rented', image: 'crv.jpg' },
    { id: 'C017', model: 'Proton X70', type: 'SUV', plateNumber: 'WXY5678', price: 'RM 115', status: 'Available', image: 'x70.jpg' },
];

const rentalData = [
    { id: 'R1001', customer: 'Ali Ahmad', car: 'Perodua Myvi', dates: '15 Jan - 18 Jan', total: 'RM 180', status: 'Paid', month: 0 }, 
    { id: 'R1002', customer: 'Sarah Tan', car: 'Honda City', dates: '10 Feb - 14 Feb', total: 'RM 480', status: 'Paid', month: 1 },
    { id: 'R1003', customer: 'David Lee', car: 'Proton X50', dates: '05 Mar - 08 Mar', total: 'RM 450', status: 'Paid', month: 2 },
    { id: 'R1004', customer: 'Jenny Lo', car: 'Toyota Vios', dates: '12 Apr - 15 Apr', total: 'RM 390', status: 'Paid', month: 3 },
    { id: 'R1005', customer: 'Muthu Kumar', car: 'Honda City', dates: '20 May - 25 May', total: 'RM 900', status: 'Paid', month: 4 },
    { id: 'R1006', customer: 'Ali Ahmad', car: 'Honda City', dates: '10 Jun - 12 Jun', total: 'RM 240', status: 'Paid', month: 5 },
    { id: 'R1007', customer: 'Sarah Tan', car: 'Honda City', dates: '01 Jul - 05 Jul', total: 'RM 300', status: 'Paid', month: 6 },
    { id: 'R1008', customer: 'David Lee', car: 'Nissan Almera', dates: '15 Aug - 18 Aug', total: 'RM 330', status: 'Paid', month: 7 },
    { id: 'R1009', customer: 'Jenny Lo', car: 'Proton X50', dates: '10 Sep - 12 Sep', total: 'RM 300', status: 'Paid', month: 8 },
    { id: 'R1024', customer: 'Ali Bin Ahmad', car: 'Honda City', dates: '10 Oct - 12 Oct', total: 'RM 240', status: 'Paid', month: 9 },
    { id: 'R1025', customer: 'Sarah Tan', car: 'Proton X50', dates: '15 Oct - 18 Oct', total: 'RM 540', status: 'Pending', month: 9 },
    { id: 'R1026', customer: 'Zulfadli Jumaat', car: 'Proton X50', dates: '27 Oct- 28 Oct', total: 'RM 180', status: 'Paid', month: 9 }

];

const customerData = [
    { id: 'C-101', name: 'Ali Ahmad', email: 'ali@email.com', phone: '+6012-345 6789', joinDate: '12 Jan 2024', status: 'Verified', avatar: 'ali.jpeg' },
    { id: 'C-102', name: 'Sarah Tan', email: 'sarah@email.com', phone: '+6019-888 9999', joinDate: '15 Feb 2024', status: 'Pending', avatar: 'sarah.jpg' },
    { id: 'C-103', name: 'Muthu Kumar', email: 'muthu@email.com', phone: '+6017-777 6666', joinDate: '20 Mar 2024', status: 'Verified', avatar: 'https://ui-avatars.com/api/?name=Muthu+Kumar&background=random' },
    { id: 'C-104', name: 'Jenny Lo', email: 'jenny@email.com', phone: '+6012-222 3333', joinDate: '05 Apr 2024', status: 'Rejected', avatar: 'https://ui-avatars.com/api/?name=Jenny+Lo&background=random' },
    { id: 'C-105', name: 'David Lee', email: 'david@email.com', phone: '+6013-555 4444', joinDate: '10 May 2024', status: 'Verified', avatar: 'https://ui-avatars.com/api/?name=David+Lee&background=random' },
    { id: 'C-106', name: 'Aishah Binti Omar', email: 'aishah@email,com', phone: '+6014-123 4567', joinDate: '22 Jun 2024', status: 'Pending', avatar: 'https://ui-avatars.com/api/?name=Aishah+Binti+Omar&background=random' },
    { id: 'C-107', name: 'Zulfadli Jumaat', email: 'pali@email.com', phone: '+6018-765 4321', joinDate: '30 Jul 2024', status: 'Verified', avatar: 'https://ui-avatars.com/api/?name=Zulfadli+Jumaat&background=random' }
];

const maintenanceData = [
    { car: 'Proton X50', issue: 'Regular Service (10k KM)', date: '20 Oct 2024', cost: 'RM 350', status: 'Completed' },
    { car: 'Myvi Gen3', issue: 'Aircond Not Cold', date: '23 Oct 2024', cost: 'RM 120', status: 'In Progress' },
    { car: 'Honda City', issue: 'Brake Pad Replacement', date: '25 Oct 2024', cost: 'RM 250', status: 'Pending' },
    { car: 'Toyota Vios', issue: 'Tyre Alignment', date: '26 Oct 2024', cost: 'RM 80', status: 'Pending' }
];

// Data Table Population (Dynamic)
// Cars Table
const carsTable = document.getElementById('carsTableBody');
if (carsTable) {
    carsTable.innerHTML = carData.map(car => `
        <tr>
            <td class="ps-4">
                <div class="d-flex align-items-center">
                    <img src="${car.image}" onerror="this.src='https://placehold.co/60x40?text=No+Img'" class="rounded-3 me-3" style="width: 60px; height: 40px; object-fit: cover;">
                    <div>
                        <div class="fw-bold text-dark">${car.model}</div>
                        <div class="small text-muted font-monospace">${car.id}</div>    
                    </div>
                </div>
            </td>
            <td class="text-muted">${car.type}</td>
            <td class="text-dark fw-bold font-monospace">${car.plateNumber}</td>
            <td class="fw-bold text-primary">${car.price}</td>
            <td>
                <span class="badge rounded-pill ${car.status === 'Available' ? 'bg-success-subtle text-success' : car.status === 'Rented' ? 'bg-warning-subtle text-warning' : 'bg-danger-subtle text-danger'} px-3 py-2">
                    ${car.status}
                </span>
            </td>
            <td class="text-end pe-4">
                <button class="btn btn-sm btn-light text-secondary me-1"><i class="fas fa-edit"></i></button>
            </td>
        </tr>
    `).join('');
}

// Rentals Table
const rentalsTable = document.getElementById('rentalsTableBody');
if (rentalsTable)
    rentalsTable.innerHTML = rentalData.map(rent => `
    <tr>
        <td class="ps-4 fw-bold text-secondary">${rent.id}</td>
        <td>${rent.customer}</td>
        <td class="text-muted">${rent.car}</td>
        <td class="small">${rent.dates}</td>
        <td class="fw-bold">${rent.total}</td>
        <td>
            <span class="badge rounded-pill ${rent.status === 'Paid' ? 'bg-success-subtle text-success' : rent.status === 'Pending' ? 'bg-warning-subtle text-warning' : 'bg-secondary-subtle text-secondary'} px-3 py-2">
                ${rent.status}
            </span>
        </td>
        <td class="text-end pe-4">
            <button class="btn btn-sm btn-light text-danger" onclick="deleteRow(this)">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    </tr>
`).join('');

// Customers Table
const customerTable = document.getElementById('customerTableBody');
if (customerTable) {
    customerTable.innerHTML = customerData.map(cust => `
        <tr>
            <td class="ps-4">
                <div class="d-flex align-items-center">
                    <img src="${cust.avatar}" class="rounded-circle me-3 shadow-sm" width="40" height="40">
                    <div>
                        <div class="fw-bold text-dark">${cust.name}</div>
                        <div class="small text-muted font-monospace">${cust.id}</div>
                    </div>
                </div>
            </td>
            <td>
                <div class="text-dark">${cust.email}</div>
                <div class="small text-muted">${cust.phone}</div>
            </td>
            <td class="text-muted">${cust.joinDate}</td>
            <td>
                <span class="badge rounded-pill px-3 py-2 ${cust.status === 'Verified' ? 'bg-success-subtle text-success' : cust.status === 'Pending' ? 'bg-warning-subtle text-warning' : 'bg-danger-subtle text-danger'}">
                    ${cust.status}
                </span>
            </td>
            <td class="text-end pe-4">
                <button class="btn btn-sm btn-light text-secondary hover-primary" title="Edit"><i class="fas fa-edit"></i></button>
            </td>
        </tr>
    `).join('');
}

// Maintenance Table
const maintenanceTable = document.getElementById('maintenanceTableBody');
if (maintenanceTable) {
    maintenanceTable.innerHTML = maintenanceData.map(item => `
        <tr>
            <td class="ps-4 fw-bold text-dark">${item.car}</td>
            <td>${item.issue}</td>
            <td class="text-muted">${item.date}</td>
            <td class="fw-bold">${item.cost}</td>
            <td>
                <span class="badge rounded-pill px-3 py-2 
                    ${item.status === 'Completed' ? 'bg-success-subtle text-success' : 
                      item.status === 'In Progress' ? 'bg-warning-subtle text-warning' : 
                      'bg-secondary-subtle text-secondary'}">
                    ${item.status}
                </span>
            </td>
            <td class="text-end pe-4">
                <button class="btn btn-sm btn-light text-danger" onclick="deleteRow(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Dashboard Data Processing
function processDashboardData() {
    // 1. Calculate Fleet Status
    let statusCounts = { Available: 0, Rented: 0, Maintenance: 0 };
    
    carData.forEach(car => {
        if (car.status === 'Available') statusCounts.Available++;
        else if (car.status === 'Rented') statusCounts.Rented++;
        else statusCounts.Maintenance++;
    });

    // 2. Calculate Monthly Revenue & Count (For Charts)
    let monthlyRevenue = Array(12).fill(0); 
    let monthlyRentalsCount = Array(12).fill(0); 

    rentalData.forEach(rent => {
        let amount = parseInt(rent.total.replace('RM ', '')) || 0;
        
        if (rent.month >= 0 && rent.month < 12) {
            // Only count 'Paid' for revenue
            if (rent.status === 'Paid') {
                monthlyRevenue[rent.month] += amount;
            }
            // Count all rentals for activity volume
            monthlyRentalsCount[rent.month]++;
        }
    });

    return { statusCounts, monthlyRevenue, monthlyRentalsCount };
}

// KPI Updates
function updateKPIs() {
    // 1. Total Fleet
    const totalCarsEl = document.getElementById('totalCarsDisplay');
    const totalFleetLabel = document.getElementById('totalFleetLabel');
    
    if (totalCarsEl && typeof carData !== 'undefined') {
        const count = carData.length;
        totalCarsEl.textContent = count;
        if(totalFleetLabel) totalFleetLabel.textContent = count + " Cars";
    }

    // 2. Active Rentals
    const activeRentalsEl = document.getElementById('activeRentalsDisplay');
    if (activeRentalsEl && typeof carData !== 'undefined') {
        const rentedCount = carData.filter(car => car.status === 'Rented').length;
        activeRentalsEl.textContent = rentedCount;
    }

    // 3. Total Revenue (Only Paid)
    const totalRevenueEl = document.getElementById('totalRevenueDisplay');
    if (totalRevenueEl && typeof rentalData !== 'undefined') {
        const totalRev = rentalData.reduce((sum, record) => {
            if (record.status === 'Paid') {
                const amount = parseInt(record.total.replace('RM ', '')) || 0;
                return sum + amount;
            }
            return sum;
        }, 0);
        totalRevenueEl.textContent = 'RM ' + totalRev.toLocaleString();
    }
}

document.addEventListener('DOMContentLoaded', updateKPIs);

// =========================================
// 5. APEXCHARTS CONFIGURATION (Dynamic)
// =========================================

const dashboardData = processDashboardData(); // Get Real Data

// 1. REVENUE CHART (Connected to rentalData)
const revenueChartEl = document.querySelector("#revenueChart");
if (revenueChartEl) {
    const revenueOptions = {
        series: [
            { name: 'Net Income (RM)', type: 'area', data: dashboardData.monthlyRevenue }, // Real Revenue
            { name: 'Total Rentals', type: 'line', data: dashboardData.monthlyRentalsCount } // Real Count
        ],
        stroke: { curve: 'smooth', width: [3, 3] }, 
        colors: ['#4f46e5', '#f59e0b'], 
        yaxis: [
            { title: { text: 'Revenue (RM)' }, labels: { formatter: (val) => "RM " + val } },
            { opposite: true, title: { text: 'Rentals Count' } } 
        ],
        chart: { 
            type: 'area', 
            height: 350, 
            fontFamily: 'Inter, sans-serif', 
            toolbar: { show: false }, 
            zoom: { enabled: false } 
        },
        fill: { 
            type: 'gradient', 
            gradient: { shadeIntensity: 1, opacityFrom: 0.6, opacityTo: 0.1, stops: [0, 90, 100] } 
        },
        dataLabels: { enabled: false },
        xaxis: { 
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], 
            axisBorder: { show: false }, 
            axisTicks: { show: false } 
        },
        grid: { borderColor: '#f1f5f9', strokeDashArray: 4 },
        tooltip: { theme: 'light' }
    };
    new ApexCharts(revenueChartEl, revenueOptions).render();
}

// 2. FLEET STATUS CHART (Connected to carData)
const statusChartEl = document.querySelector("#statusChart");
if (statusChartEl) {
    const statusOptions = {
        series: [
            dashboardData.statusCounts.Available, 
            dashboardData.statusCounts.Rented, 
            dashboardData.statusCounts.Maintenance
        ], 
        labels: ['Available', 'On Rental', 'Maintenance'],
        chart: { 
            type: 'donut', 
            height: 320, 
            fontFamily: 'Inter, sans-serif',
            events: {
                dataPointSelection: function(event, chartContext, config) {
                    const label = config.w.config.labels[config.dataPointIndex];
                    // Interaction demo: Alert the user (replace with filter logic in real app)
                    console.log("Filtered by: " + label);
                }
            }
        },
        colors: ['#10b981', '#f59e0b', '#ef4444'], 
        plotOptions: { 
            pie: { 
                donut: { 
                    size: '75%', 
                    labels: { 
                        show: true, 
                        total: { 
                            show: true, 
                            label: 'Availability', 
                            color: '#64748b', 
                            formatter: function (w) { 
                                const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                const available = w.globals.seriesTotals[0]; 
                                return Math.round((available / total) * 100) + "%"; 
                            } 
                        } 
                    } 
                } 
            } 
        },
        dataLabels: { enabled: false },
        legend: { position: 'bottom', markers: { radius: 12 } }
    };
    new ApexCharts(statusChartEl, statusOptions).render();
}

// --- 3. TOP CARS CHART (Bar Chart) ---
const topCarsChartEl = document.querySelector("#topCarsChart");
if (topCarsChartEl) {
    const topCarsData = processTopCarsData(); // <--- Get the Dynamic Data

    const topCarsOptions = {
        series: [{
            name: 'Times Rented',
            data: topCarsData.counts // <--- Real Numbers
        }],
        chart: {
            type: 'bar',
            height: 300,
            fontFamily: 'Inter, sans-serif',
            toolbar: { show: false }
        },
        colors: ['#4f46e5'],
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true, // Bars go sideways
                barHeight: '50%'
            }
        },
        dataLabels: { enabled: true }, // Show numbers on bars
        xaxis: {
            categories: topCarsData.models, // <--- Real Car Names
            title: { text: 'Number of Rentals' }
        },
        grid: { borderColor: '#f1f5f9', strokeDashArray: 4 },
        tooltip: { theme: 'light' }
    };
    new ApexCharts(topCarsChartEl, topCarsOptions).render();
}

function processTopCarsData() {
    // 1. Count rentals per car model
    const carCounts = {};
    rentalData.forEach(rent => {
        const model = rent.car;
        // If model exists, add 1. If not, start at 1.
        carCounts[model] = (carCounts[model] || 0) + 1;
    });

    // 2. Convert to array and sort by highest count
    const sortedCars = Object.entries(carCounts)
        .sort((a, b) => b[1] - a[1]) // Sort Descending (Highest first)
        .slice(0, 5); // Keep only Top 5

    // 3. Separate into two arrays for ApexCharts
    return {
        models: sortedCars.map(item => item[0]), // e.g. ['Honda City', 'Myvi']
        counts: sortedCars.map(item => item[1])  // e.g. [5, 3]
    };
}

// =========================================
// 6. RECENT ACTIVITY (Dynamic List)
// =========================================
const activityData = [
    { type: 'customer', title: 'Rental Completed', user: 'Ali Ahmad', details: 'Returned Honda City (JJU 9999)', time: '2m ago', image: 'ali.jpeg' },
    { type: 'system', title: 'New Car Added', details: 'Proton X50 (Premium) joined the fleet', time: '1h ago', icon: 'fas fa-car', color: 'bg-primary' },
    { type: 'customer', title: 'New Registration', user: 'Sarah Tan', details: 'Created a new account', time: '3h ago', image: 'https://ui-avatars.com/api/?name=Sarah+Tan&background=random' },
    { type: 'system', title: 'Maintenance Alert', details: 'Toyota Vios reported for tyre alignment', time: '5h ago', icon: 'fas fa-tools', color: 'bg-warning text-dark' }
];

const activityList = document.getElementById('recentActivityList');
if (activityList) {
    activityList.innerHTML = activityData.map(item => {
        let visual;
        if (item.type === 'customer') {
            visual = `<img src="${item.image}" class="rounded-circle me-3 border border-2 border-white shadow-sm" style="width:40px; height:40px; object-fit: cover;">`;
        } else {
            visual = `<div class="${item.color} text-white rounded-circle d-flex justify-content-center align-items-center me-3 shadow-sm" style="width:40px; height:40px;"><i class="${item.icon} small"></i></div>`;
        }
        return `
        <li class="list-group-item d-flex justify-content-between align-items-center px-0 py-3 border-bottom bg-transparent">
            <div class="d-flex align-items-center">
                ${visual}
                <div>
                    <p class="mb-0 fw-bold text-dark">${item.title}</p>
                    <small class="text-muted">${item.user ? `<span class="fw-bold text-primary">${item.user}</span> - ` : ''} ${item.details}</small>
                </div>
            </div>
            <span class="small text-muted text-nowrap ms-2">${item.time}</span>
        </li>`;
    }).join('');
}

// --- CAR STATUS FILTER ---
function filterCarStatus(status) {
    const rows = document.querySelectorAll('#carsTableBody tr');
    rows.forEach(row => {
        // Find the badge inside the row
        const badge = row.querySelector('.badge');
        if (badge) {
            const badgeText = badge.textContent.trim();
            // Show if 'all' is selected OR badge text matches selection
            if (status === 'all' || badgeText === status) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    });
}

// =========================================
// 7. UI LOGIC (Sidebar, Search, Theme)
// =========================================

// Search Filter (Local)
function filterTable() {
    const input = document.getElementById("searchInput");
    if (!input) return;
    const filter = input.value.toUpperCase();
    const table = document.querySelector("table");
    const tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName("td")[0]; 
        if (td) {
            const txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

// Sidebar Toggle (Button & Profile Click)
function initSidebarToggle() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar-wrapper');
    const sidebarProfile = document.querySelector('.sidebar-profile'); 

    if (!menuToggle || !sidebar) return;

    // Helper functions inside scope
    const isMobile = () => window.innerWidth < 768;

    function openOverlay() {
        document.body.classList.add('sb-sidenav-open');
        let bd = document.getElementById('sidebar-backdrop');
        if (!bd) {
            bd = document.createElement('div');
            bd.id = 'sidebar-backdrop';
            bd.className = 'sidebar-backdrop';
            bd.addEventListener('click', closeOverlay);
            document.body.appendChild(bd);
        }
    }

    function closeOverlay() {
        document.body.classList.remove('sb-sidenav-open');
        const bd = document.getElementById('sidebar-backdrop');
        if (bd) bd.remove();
    }

    const toggleAction = () => {
        if (isMobile()) {
            if (document.body.classList.contains('sb-sidenav-open')) closeOverlay();
            else openOverlay();
        } else {
            document.body.classList.toggle('sb-sidenav-collapsed');
        }
    };

    menuToggle.addEventListener('click', function (e) {
        e.preventDefault();
        toggleAction();
    });

    if (sidebarProfile) {
        sidebarProfile.style.cursor = 'pointer'; 
        sidebarProfile.addEventListener('click', toggleAction);
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && document.body.classList.contains('sb-sidenav-open')) closeOverlay();
    });
}
initSidebarToggle();

// Theme Switcher
function initThemeSwitcher() {
    const themeSelect = document.getElementById('themeSelect');
    const storedTheme = localStorage.getItem('crs_theme') || 'auto';

    const applyTheme = (theme) => {
        let effectiveTheme = theme;
        if (theme === 'auto') {
            effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        document.documentElement.setAttribute('data-bs-theme', effectiveTheme);
    };

    applyTheme(storedTheme);
    if (themeSelect) {
        themeSelect.value = storedTheme;
        themeSelect.addEventListener('change', function() {
            const selectedTheme = this.value;
            localStorage.setItem('crs_theme', selectedTheme);
            applyTheme(selectedTheme);
        });
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (localStorage.getItem('crs_theme') === 'auto') applyTheme('auto');
    });
}
initThemeSwitcher();