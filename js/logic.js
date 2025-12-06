// CRUD OPERATIONS

// Open and edit car details
function openCarModal() {
    document.getElementById('carForm').reset();
    const editInput = document.getElementById('editCarId');
    if (editInput) editInput.value = "";
    document.getElementById('carModalLabel').innerText = "Add New Car";
    new bootstrap.Modal(document.getElementById('carModal')).show();
}

function editCar(id) {
    const car = carData.find(c => c.id === id);
    if (!car) return;

    // Fill form with existing data
    document.getElementById('editCarId').value = car.id;
    
    
    document.getElementById('carModel').value = car.model; 
    document.getElementById('carType').value = car.type || ""; 
    
    document.getElementById('carPlate').value = car.plateNumber;
    document.getElementById('carRate').value = car.price.replace(/[^\d.]/g, ''); 
    document.getElementById('carStatus').value = car.status;

    document.getElementById('carModalLabel').innerText = "Edit Car Details";
    new bootstrap.Modal(document.getElementById('carModal')).show();
}

// Save car (add or update)
function saveCar() {
    const id = document.getElementById('editCarId').value;
    
    
    const model = document.getElementById('carModel').value; 
    const type = document.getElementById('carType').value;  
    
    const plate = document.getElementById('carPlate').value;
    const rate = document.getElementById('carRate').value;
    const status = document.getElementById('carStatus').value;

    if (!model || !plate) { alert("Details required!"); return; }

    if (id) {
        // Update Existing car data
        const index = carData.findIndex(c => c.id === id);
        if (index !== -1) {
            carData[index].model = model;
            carData[index].type = type; 
            carData[index].plateNumber = plate;
            carData[index].price = 'RM ' + rate;
            carData[index].status = status;
        }
    } else {
        // Create new car data
        carData.push({
            id: 'C' + (carData.length + 1).toString().padStart(3, '0'),
            model: model,
            type: type, // Save type
            plateNumber: plate,
            price: 'RM ' + (rate || '0'),
            status: status,
        });
    }

    saveData();
    renderCars();
    bootstrap.Modal.getInstance(document.getElementById('carModal')).hide();
}

// Rentals - Populate available cars in booking form
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
    const editInput = document.getElementById('editRentalId');
    if (editInput) editInput.value = '';
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

    const editIdInput = document.getElementById('editRentalId');
    const editId = editIdInput ? editIdInput.value : '';

    if (editId) {
        const index = rentalData.findIndex(r => r.id === editId);
        if (index !== -1) {
            rentalData[index].customer = customer;
            rentalData[index].car = carModel;
            rentalData[index].dates = `${startDate} - ${endDate}`;
            rentalData[index].total = `RM ${parseFloat(total).toFixed(2)}`;
            rentalData[index].status = status;
            rentalData[index].month = monthIndex;
        }
        if (editIdInput) editIdInput.value = '';
    } else {
        rentalData.push({
            id: 'R' + Date.now().toString().slice(-4),
            customer: customer,
            car: carModel,
            dates: `${startDate} - ${endDate}`,
            total: `RM ${parseFloat(total).toFixed(2)}`,
            status: status,
            month: monthIndex 
        });
    }

    saveData();
    renderRentals();
    bootstrap.Modal.getInstance(document.getElementById('bookingModal')).hide();
    
    if (typeof initCharts === 'function') initCharts();
}

// Customers: Open,Edit and Save
function openCustomerModal() {
    document.getElementById('customerForm').reset();
    const editInput = document.getElementById('customerForm').dataset;
    delete editInput.editId;
    new bootstrap.Modal(document.getElementById('customerModal')).show();
}

function saveCustomer() {
    const form = document.getElementById('customerForm');
    const name = document.getElementById('custName').value;
    const email = document.getElementById('custEmail').value;
    const phone = document.getElementById('custPhone').value;
    const status = document.getElementById('custStatus').value;

    if (!name) { alert("Name required"); return; }

    const editId = form.dataset.editId;
    if (editId) {
        const index = customerData.findIndex(c => c.id === editId);
        if (index !== -1) {
            customerData[index].name = name;
            customerData[index].email = email;
            customerData[index].phone = phone;
            customerData[index].status = status;
            customerData[index].avatar = `https://ui-avatars.com/api/?name=${name}+${status}&background=random`;
        }
        delete form.dataset.editId;
    } else {
        customerData.push({
            id: 'C-' + (customerData.length + 101),
            name: name,
            email: email,
            phone: phone,
            joinDate: new Date().toLocaleDateString('en-GB'),
            status: status,
            avatar: `https://ui-avatars.com/api/?name=${name}+${status}&background=random`
        });
    }

    saveData();
    renderCustomers();
    bootstrap.Modal.getInstance(document.getElementById('customerModal')).hide();
}

// Maintenance Logs: Open, Edit, Save
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

// Maintenance save functions
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

function editCustomer(id) {
    const cust = customerData.find(c => c.id === id);
    if (!cust) return;

    document.getElementById('custName').value = cust.name;
    document.getElementById('custEmail').value = cust.email;
    document.getElementById('custPhone').value = cust.phone;
    document.getElementById('custStatus').value = cust.status;

    document.getElementById('customerForm').dataset.editId = id;
    new bootstrap.Modal(document.getElementById('customerModal')).show();
}

function deleteCustomer(id) {
    if (confirm("Delete this customer?")) {
        customerData = customerData.filter(item => item.id !== id);
        saveData();
        renderCustomers();
    }
}

function deleteCar(id) {
    if (confirm("Delete this car?")) {
        carData = carData.filter(item => item.id !== id);
        saveData();
        renderCars();
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

function editRental(id) {
    const rent = rentalData.find(r => r.id === id);
    if (!rent) return;

    const editInput = document.getElementById('editRentalId');
    if (editInput) editInput.value = rent.id;

    document.getElementById('bookCustomer').value = rent.customer || '';

    
    populateAvailableCars();

    const carSelect = document.getElementById('bookCarModel');
    let found = false;
    for (let i = 0; i < carSelect.options.length; i++) {
        if (carSelect.options[i].value === rent.car) {
            carSelect.selectedIndex = i;
            found = true;
            break;
        }
    }
    if (!found) {
        const opt = document.createElement('option');
        opt.value = rent.car;
        opt.textContent = rent.car;
        carSelect.appendChild(opt);
        carSelect.value = rent.car;
    }

    if (rent.dates && rent.dates.includes('-')) {
        const parts = rent.dates.split('-').map(s => s.trim());
        document.getElementById('bookStartDate').value = parts[0] || '';
        document.getElementById('bookEndDate').value = parts[1] || '';
    } else {
        document.getElementById('bookStartDate').value = '';
        document.getElementById('bookEndDate').value = '';
    }

    document.getElementById('bookTotal').value = rent.total ? rent.total.replace(/[^\d.]/g,'') : '';
    document.getElementById('bookStatus').value = rent.status || 'Pending';

    new bootstrap.Modal(document.getElementById('bookingModal')).show();
}