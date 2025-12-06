// CRUD OPERATIONS

// ===== UTILITY & VALIDATION FUNCTIONS =====

/**
 * Parses currency string to numeric value
 * @param {string} str - Currency string (e.g., "RM 180")
 * @returns {number} - Numeric value
 */
function parseCurrency(str) {
    return parseInt(String(str).replace(/[^\d.-]/g, '')) || 0;
}

/**
 * Validates car data
 * @param {Object} car - Car object to validate
 * @returns {Array} - Array of error messages (empty if valid)
 */
function validateCar(car) {
    const errors = [];
    if (!car.model?.trim()) errors.push("Model is required");
    if (!car.plateNumber?.trim()) errors.push("Plate number is required");
    if (!car.type?.trim()) errors.push("Type is required");
    if (!car.status?.trim()) errors.push("Status is required");
    if (car.price && isNaN(parseCurrency(car.price))) errors.push("Price must be numeric");
    return errors;
}

/**
 * Validates booking data
 * @param {Object} booking - Booking object to validate
 * @returns {Array} - Array of error messages (empty if valid)
 */
function validateBooking(booking) {
    const errors = [];
    if (!booking.customer?.trim()) errors.push("Customer name is required");
    if (!booking.car?.trim()) errors.push("Car selection is required");
    if (!booking.startDate?.trim()) errors.push("Start date is required");
    if (!booking.total?.trim()) errors.push("Total amount is required");
    if (booking.total && isNaN(parseCurrency(booking.total))) errors.push("Total must be numeric");
    return errors;
}

/**
 * Validates customer data
 * @param {Object} customer - Customer object to validate
 * @returns {Array} - Array of error messages (empty if valid)
 */
function validateCustomer(customer) {
    const errors = [];
    if (!customer.name?.trim()) errors.push("Name is required");
    if (customer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) errors.push("Valid email is required");
    if (!customer.status?.trim()) errors.push("Status is required");
    return errors;
}

/**
 * Validates maintenance data
 * @param {Object} maintenance - Maintenance object to validate
 * @returns {Array} - Array of error messages (empty if valid)
 */
function validateMaintenance(maintenance) {
    const errors = [];
    if (!maintenance.car?.trim()) errors.push("Car model is required");
    if (!maintenance.issue?.trim()) errors.push("Issue description is required");
    if (!maintenance.status?.trim()) errors.push("Status is required");
    if (maintenance.cost && isNaN(parseCurrency(maintenance.cost))) errors.push("Cost must be numeric");
    return errors;
}

/**
 * Displays validation errors to user
 * @param {Array} errors - Array of error messages
 */
function showValidationErrors(errors) {
    if (errors.length === 0) return;
    console.error("Validation errors:", errors);
    alert("Please fix the following errors:\n\n" + errors.join("\n"));
}

// ===== CAR CRUD OPERATIONS =====

/**
 * Opens the car modal for adding a new car
 */
function openCarModal() {
    document.getElementById('carForm').reset();
    const editInput = document.getElementById('editCarId');
    if (editInput) editInput.value = "";
    document.getElementById('carModalLabel').innerText = "Add New Car";
    new bootstrap.Modal(document.getElementById('carModal')).show();
}

/**
 * Edits an existing car
 * @param {string} id - Car ID to edit
 */
function editCar(id) {
    const car = carData.find(c => c.id === id);
    if (!car) {
        console.error("Car not found:", id);
        return;
    }

    // Fill form with existing data
    document.getElementById('editCarId').value = car.id;
    document.getElementById('carModel').value = car.model; 
    document.getElementById('carType').value = car.type || ""; 
    document.getElementById('carPlate').value = car.plateNumber;
    document.getElementById('carRate').value = parseCurrency(car.price); 
    document.getElementById('carStatus').value = car.status;

    document.getElementById('carModalLabel').innerText = "Edit Car Details";
    new bootstrap.Modal(document.getElementById('carModal')).show();
}

/**
 * Saves a car (add or update)
 */
function saveCar() {
    const id = document.getElementById('editCarId').value;
    const model = document.getElementById('carModel').value; 
    const type = document.getElementById('carType').value;  
    const plate = document.getElementById('carPlate').value;
    const rate = document.getElementById('carRate').value;
    const status = document.getElementById('carStatus').value;

    // Validate input
    const errors = validateCar({ model, type, plateNumber: plate, price: rate, status });
    if (errors.length > 0) {
        showValidationErrors(errors);
        return;
    }

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
            type: type,
            plateNumber: plate,
            price: 'RM ' + (rate || '0'),
            status: status,
        });
    }

    saveData();
    renderCars();
    bootstrap.Modal.getInstance(document.getElementById('carModal')).hide();
}

// ===== RENTAL CRUD OPERATIONS =====

/**
 * Populates available cars in the booking form
 */
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

/**
 * Opens the booking modal for adding a new rental
 */
function openBookingModal() {
    document.getElementById('bookingForm').reset();
    const editInput = document.getElementById('editRentalId');
    if (editInput) editInput.value = '';
    populateAvailableCars();
    new bootstrap.Modal(document.getElementById('bookingModal')).show();
}

/**
 * Saves a booking (add or update)
 */
function saveBooking() {
    const customer = document.getElementById('bookCustomer').value;
    const carModel = document.getElementById('bookCarModel').value;
    const total = document.getElementById('bookTotal').value;
    const startDate = document.getElementById('bookStartDate').value;
    const endDate = document.getElementById('bookEndDate').value;
    const status = document.getElementById('bookStatus').value;

    // Validate input
    const errors = validateBooking({ customer, car: carModel, total, startDate });
    if (errors.length > 0) {
        showValidationErrors(errors);
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

/**
 * Edits an existing rental
 * @param {string} id - Rental ID to edit
 */
function editRental(id) {
    const rent = rentalData.find(r => r.id === id);
    if (!rent) {
        console.error("Rental not found:", id);
        return;
    }

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

    document.getElementById('bookTotal').value = rent.total ? parseCurrency(rent.total) : '';
    document.getElementById('bookStatus').value = rent.status || 'Pending';

    new bootstrap.Modal(document.getElementById('bookingModal')).show();
}

/**
 * Deletes a rental
 * @param {string} id - Rental ID to delete
 */
function deleteRental(id) {
    if (confirm("Are you sure you want to delete this booking?")) {
        rentalData = rentalData.filter(item => item.id !== id);
        saveData();
        renderRentals();
        if (typeof initCharts === 'function') initCharts();
    }
}

// ===== CUSTOMER CRUD OPERATIONS =====

/**
 * Opens the customer modal for adding a new customer
 */
function openCustomerModal() {
    document.getElementById('customerForm').reset();
    const editInput = document.getElementById('customerForm').dataset;
    delete editInput.editId;
    new bootstrap.Modal(document.getElementById('customerModal')).show();
}

/**
 * Saves a customer (add or update)
 */
function saveCustomer() {
    const form = document.getElementById('customerForm');
    const name = document.getElementById('custName').value;
    const email = document.getElementById('custEmail').value;
    const phone = document.getElementById('custPhone').value;
    const status = document.getElementById('custStatus').value;

    // Validate input
    const errors = validateCustomer({ name, email, status });
    if (errors.length > 0) {
        showValidationErrors(errors);
        return;
    }

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

/**
 * Edits an existing customer
 * @param {string} id - Customer ID to edit
 */
function editCustomer(id) {
    const cust = customerData.find(c => c.id === id);
    if (!cust) {
        console.error("Customer not found:", id);
        return;
    }

    document.getElementById('custName').value = cust.name;
    document.getElementById('custEmail').value = cust.email;
    document.getElementById('custPhone').value = cust.phone;
    document.getElementById('custStatus').value = cust.status;

    document.getElementById('customerForm').dataset.editId = id;
    new bootstrap.Modal(document.getElementById('customerModal')).show();
}

/**
 * Deletes a customer
 * @param {string} id - Customer ID to delete
 */
function deleteCustomer(id) {
    if (confirm("Delete this customer?")) {
        customerData = customerData.filter(item => item.id !== id);
        saveData();
        renderCustomers();
    }
}

// ===== MAINTENANCE CRUD OPERATIONS =====

/**
 * Opens the maintenance modal for adding a new maintenance log
 */
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

/**
 * Edits an existing maintenance log
 * @param {number} index - Index of maintenance log to edit
 */
function editMaintenance(index) {
    const log = maintenanceData[index];
    if (!log) {
        console.error("Maintenance log not found at index:", index);
        return;
    }

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
    document.getElementById('maintCost').value = parseCurrency(log.cost);
    document.getElementById('maintStatus').value = log.status;
    
    new bootstrap.Modal(document.getElementById('maintenanceModal')).show();
}

/**
 * Saves a maintenance log (add or update)
 */
function saveMaintenance() {
    const index = document.getElementById('editMaintIndex').value;
    const car = document.getElementById('maintCar').value;
    const issue = document.getElementById('maintIssue').value;
    const cost = document.getElementById('maintCost').value;
    const status = document.getElementById('maintStatus').value;
    const date = document.getElementById('maintDate').value;

    // Validate input
    const errors = validateMaintenance({ car, issue, cost, status });
    if (errors.length > 0) {
        showValidationErrors(errors);
        return;
    }

    const logData = {
        id: maintenanceData[index]?.id || 'M' + (maintenanceData.length + 1).toString().padStart(3, '0'),
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

/**
 * Deletes a maintenance log
 * @param {number} index - Index of maintenance log to delete
 */
function deleteMaintenance(index) {
    if (confirm("Delete this log?")) {
        maintenanceData.splice(index, 1);
        saveData();
        renderMaintenance();
    }
}

/**
 * Deletes a car
 * @param {string} id - Car ID to delete
 */
function deleteCar(id) {
    if (confirm("Delete this car?")) {
        carData = carData.filter(item => item.id !== id);
        saveData();
        renderCars();
    }
}
