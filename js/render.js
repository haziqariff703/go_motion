// =========================================
// 3. RENDER FUNCTIONS
// =========================================

function renderCars() {
    const table = document.getElementById('carsTableBody');
    if (!table) return;
    table.innerHTML = carData.map(car => `
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
                <button class="btn btn-sm btn-light text-primary me-1" onclick="editCar('${car.id}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function renderRentals() {
    const table = document.getElementById('rentalsTableBody');
    if (!table) return;
    table.innerHTML = rentalData.map(rent => `
        <tr>
            <td class="ps-4 fw-bold text-secondary">${rent.id}</td>
            <td>${rent.customer}</td>
            <td class="text-muted">${rent.car}</td>
            <td class="small">${rent.dates}</td>
            <td class="fw-bold">${rent.total}</td>
            <td><span class="badge rounded-pill ${rent.status === 'Paid' ? 'bg-success-subtle text-success' : rent.status === 'Pending' ? 'bg-warning-subtle text-warning' : 'bg-secondary-subtle text-secondary'} px-3 py-2">${rent.status}</span></td>
            <td class="text-end pe-4">
                <button class="btn btn-sm btn-light text-danger" onclick="deleteRental('${rent.id}')" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function renderCustomers() {
    const table = document.getElementById('customerTableBody');
    if (!table) return;
    table.innerHTML = customerData.map(cust => `
        <tr>
            <td class="ps-4">
                <div class="d-flex align-items-center">
                    <img src="${cust.avatar}" class="rounded-circle me-3 shadow-sm" width="40" height="40">
                    <div><div class="fw-bold text-dark">${cust.name}</div><div class="small text-muted font-monospace">${cust.id}</div></div>
                </div>
            </td>
            <td><div class="text-dark">${cust.email}</div><div class="small text-muted">${cust.phone}</div></td>
            <td class="text-muted">${cust.joinDate}</td>
            <td><span class="badge rounded-pill px-3 py-2 ${cust.status === 'Verified' ? 'bg-success-subtle text-success' : cust.status === 'Pending' ? 'bg-warning-subtle text-warning' : 'bg-danger-subtle text-danger'}">${cust.status}</span></td>
            <td class="text-end pe-4"><button class="btn btn-sm btn-light text-secondary"><i class="fas fa-edit"></i></button></td>
        </tr>
    `).join('');
}

function renderMaintenance() {
    const table = document.getElementById('maintenanceTableBody');
    if (!table) return;
    
    // We use 'index' because maintenance logs don't have unique IDs in your data
    table.innerHTML = maintenanceData.map((item, index) => `
        <tr>
            <td class="ps-4 fw-bold text-dark">${item.car}</td>
            <td>${item.issue}</td>
            <td class="text-muted">${item.date}</td>
            <td class="fw-bold">${item.cost}</td>
            <td>
                <span class="badge rounded-pill px-3 py-2 ${item.status === 'Completed' ? 'bg-success-subtle text-success' : item.status === 'In Progress' ? 'bg-warning-subtle text-warning' : 'bg-secondary-subtle text-secondary'}">
                    ${item.status}
                </span>
            </td>
            <td class="text-end pe-4">
                <button class="btn btn-sm btn-light text-primary me-1" onclick="editMaintenance(${index})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-light text-danger" onclick="deleteMaintenance(${index})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Activity Data
const activityData = [
    { type: 'customer', title: 'Rental Completed', user: 'Ali Ahmad', details: 'Returned Honda City (JJU 9999)', time: '2m ago', image: 'images/ali.jpeg' },
    { type: 'system', title: 'New Car Added', details: 'Proton X50 (Premium) joined the fleet', time: '1h ago', icon: 'fas fa-car', color: 'bg-primary' },
    { type: 'customer', title: 'New Registration', user: 'Sarah Tan', details: 'Created a new account', time: '3h ago', image: 'https://ui-avatars.com/api/?name=Sarah+Tan&background=random' },
    { type: 'system', title: 'Maintenance Alert', details: 'Toyota Vios reported for tyre alignment', time: '5h ago', icon: 'fas fa-tools', color: 'bg-warning text-dark' }
];

function renderActivity() {
    const list = document.getElementById('recentActivityList');
    if (!list) return;
    
    list.innerHTML = activityData.map(item => {
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