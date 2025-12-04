// =========================================
// 4. BUSINESS LOGIC (CRUD & MODALS)
// =========================================

// --- CARS: OPEN & EDIT ---
function openCarModal() {
    document.getElementById('carForm').reset();
    document.getElementById('editCarId').value = ""; // Clear ID
    document.getElementById('carModalLabel').innerText = "Add New Car";
    new bootstrap.Modal(document.getElementById('carModal')).show();
}

function editCar(id) {
    const car = carData.find(c => c.id === id);
    if (!car) return;

    // Fill form with existing data
    document.getElementById('editCarId').value = car.id;
    
    // UPDATED IDs to match your new HTML
    document.getElementById('carModel').value = car.model; // Was 'carName'
    document.getElementById('carType').value = car.type || ""; // New Field
    
    document.getElementById('carPlate').value = car.plateNumber;
    document.getElementById('carRate').value = car.price.replace(/[^\d.]/g, ''); 
    document.getElementById('carStatus').value = car.status;

    document.getElementById('carModalLabel').innerText = "Edit Car Details";
    new bootstrap.Modal(document.getElementById('carModal')).show();
}

// --- CARS: SAVE ---
function saveCar() {
    const id = document.getElementById('editCarId').value;
    
    // UPDATED IDs to match your new HTML
    const model = document.getElementById('carModel').value; // Was 'carName'
    const type = document.getElementById('carType').value;   // New Field
    
    const plate = document.getElementById('carPlate').value;
    const rate = document.getElementById('carRate').value;
    const status = document.getElementById('carStatus').value;

    if (!model || !plate) { alert("Details required!"); return; }

    if (id) {
        // UPDATE Existing
        const index = carData.findIndex(c => c.id === id);
        if (index !== -1) {
            carData[index].model = model;
            carData[index].type = type; // Update type
            carData[index].plateNumber = plate;
            carData[index].price = 'RM ' + rate;
            carData[index].status = status;
        }
    } else {
        // CREATE New
        carData.push({
            id: 'C' + (carData.length + 1).toString().padStart(3, '0'),
            model: model,
            type: type, // Save type
            plateNumber: plate,
            price: 'RM ' + (rate || '0'),
            status: status,
            image: 'https://placehold.co/60x40?text=New'
        });
    }

    saveData();
    renderCars();
    bootstrap.Modal.getInstance(document.getElementById('carModal')).hide();
}

// --- BOOKINGS ---
function populateAvailableCars() {
    const carSelect = document.getElementById('bookCarModel');
    if (!carSelect) return;

    carSelect.innerHTML = '<option value="" selected disabled>Select a car...</option>';

    const availableCars = carData.filter(car => car.status === 'Available');

    availableCars.forEach(car => {
        const option = document.createElement('option');
        option.value = `${car.model} (${car.plateNumber})`; 
        option.textContent = `${car.model} - ${car.plateNumber} (${car.price})`;
        carSelect.appendChild(option);
    });

    if (availableCars.length === 0) {
        const option = document.createElement('option');
        option.textContent = "No cars available";
        option.disabled = true;
        carSelect.appendChild(option);
    }
}

function openBookingModal() {
    document.getElementById('bookingForm').reset();
    populateAvailableCars();
    new bootstrap.Modal(document.getElementById('bookingModal')).show();
}

function saveBooking() {
    const customer = document.getElementById('bookCustomer').value;
    const carModel = document.getElementById('bookCarModel').value;
    const total = document.getElementById('bookTotal').value;
    const startDate = document.getElementById('bookStartDate').value;
    const endDate = document.getElementById('bookEndDate').value;
    const status = document.getElementById('bookStatus').value;

    if (!customer || !carModel || !total || !startDate) {
        alert("Please fill in all booking details.");
        return;
    }

    const dateObj = new Date(startDate);
    const monthIndex = dateObj.getMonth(); 

    rentalData.push({
        id: 'R' + Date.now().toString().slice(-4),
        customer: customer,
        car: carModel,
        dates: `${startDate} - ${endDate}`,
        total: `RM ${parseFloat(total).toFixed(2)}`,
        status: status,
        month: monthIndex 
    });

    saveData();
    renderRentals();
    bootstrap.Modal.getInstance(document.getElementById('bookingModal')).hide();
    
    if (typeof initCharts === 'function') initCharts();
}

// --- CUSTOMERS ---
function openCustomerModal() {
    document.getElementById('customerForm').reset();
    new bootstrap.Modal(document.getElementById('customerModal')).show();
}

function saveCustomer() {
    const name = document.getElementById('custName').value;
    const email = document.getElementById('custEmail').value;
    const phone = document.getElementById('custPhone').value;
    const status = document.getElementById('custStatus').value;

    if (!name) { alert("Name required"); return; }

    customerData.push({
        id: 'C-' + (customerData.length + 101),
        name: name,
        email: email,
        phone: phone,
        joinDate: new Date().toLocaleDateString('en-GB'),
        status: status,
        avatar: `https://ui-avatars.com/api/?name=${name}+${status}&background=random`
    });

    saveData();
    renderCustomers();
    bootstrap.Modal.getInstance(document.getElementById('customerModal')).hide();
}

// --- MAINTENANCE: OPEN & EDIT ---
function openMaintenanceModal() {
    document.getElementById('maintenanceForm').reset();
    document.getElementById('editMaintIndex').value = ""; 
    
    const carSelect = document.getElementById('maintCar');
    if (carSelect) {
        carSelect.innerHTML = '<option value="" selected disabled>Select a car...</option>';
        carData.forEach(car => {
            const option = document.createElement('option');
            option.value = car.model; 
            option.textContent = `${car.model} - ${car.plateNumber}`;
            carSelect.appendChild(option);
        });
    }
    
    new bootstrap.Modal(document.getElementById('maintenanceModal')).show();
}

function editMaintenance(index) {
    const log = maintenanceData[index];
    if (!log) return;

    const carSelect = document.getElementById('maintCar');
    carSelect.innerHTML = '<option value="" selected disabled>Select a car...</option>';
    carData.forEach(car => {
        const option = document.createElement('option');
        option.value = car.model;
        option.textContent = `${car.model} - ${car.plateNumber}`;
        if (car.model === log.car) option.selected = true; 
        carSelect.appendChild(option);
    });

    document.getElementById('editMaintIndex').value = index;
    document.getElementById('maintIssue').value = log.issue;
    document.getElementById('maintCost').value = log.cost.replace(/[^\d.]/g, '');
    document.getElementById('maintStatus').value = log.status;
    
    new bootstrap.Modal(document.getElementById('maintenanceModal')).show();
}

// --- MAINTENANCE: SAVE ---
function saveMaintenance() {
    const index = document.getElementById('editMaintIndex').value;
    const car = document.getElementById('maintCar').value;
    const issue = document.getElementById('maintIssue').value;
    const cost = document.getElementById('maintCost').value;
    const status = document.getElementById('maintStatus').value;
    const date = document.getElementById('maintDate').value;

    if (!car) { alert("Car Model required"); return; }

    const logData = {
        car: car,
        issue: issue,
        date: date ? new Date(date).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB'),
        cost: `RM ${parseFloat(cost || 0).toFixed(2)}`,
        status: status
    };

    if (index !== "") {
        maintenanceData[index] = logData;
    } else {
        maintenanceData.push(logData);
    }

    const carIdx = carData.findIndex(c => c.model === car);
    if (carIdx !== -1) {
        if (status === 'In Progress') {
            carData[carIdx].status = 'Maintenance';
        } else if (status === 'Completed') {
            carData[carIdx].status = 'Available';
        }
    }

    saveData();
    renderMaintenance();
    bootstrap.Modal.getInstance(document.getElementById('maintenanceModal')).hide();
}

function deleteMaintenance(index) {
    if (confirm("Delete this log?")) {
        maintenanceData.splice(index, 1);
        saveData();
        renderMaintenance();
    }
}

function deleteRental(id) {
    if (confirm("Are you sure you want to delete this booking?")) {
        rentalData = rentalData.filter(item => item.id !== id);
        saveData();
        renderRentals();
        if (typeof initCharts === 'function') initCharts();
    }
}