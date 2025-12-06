// Datasets for Car Rental System

const defaultCarData = [
    { id: 'C001', model: 'Perodua Myvi', type: 'Compact', plateNumber: 'ABC1234', price: 'RM 60', status: 'Available', image: 'images/myvi.jpg' },
    { id: 'C002', model: 'Honda City', type: 'Sedan', plateNumber: 'DEF5678', price: 'RM 120', status: 'Available', image: 'images/city.jpg' },
    { id: 'C003', model: 'Proton X50', type: 'SUV', plateNumber: 'GHI9012', price: 'RM 150', status: 'Available', image: 'images/x50.jpg' },
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

const defaultRentalData = [
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

const defaultCustomerData = [
    { id: 'C-101', name: 'Ali Ahmad', email: 'ali@email.com', phone: '+6012-345 6789', joinDate: '12 Jan 2024', status: 'Verified', avatar: 'images/ali.jpeg' },
    { id: 'C-102', name: 'Sarah Tan', email: 'sarah@email.com', phone: '+6019-888 9999', joinDate: '15 Feb 2024', status: 'Pending', avatar: 'images/sarah.jpg' },
    { id: 'C-103', name: 'Muthu Kumar', email: 'muthu@email.com', phone: '+6017-777 6666', joinDate: '20 Mar 2024', status: 'Verified', avatar: 'https://ui-avatars.com/api/?name=Muthu+Kumar&background=random' },
    { id: 'C-104', name: 'Jenny Lo', email: 'jenny@email.com', phone: '+6012-222 3333', joinDate: '05 Apr 2024', status: 'Rejected', avatar: 'https://ui-avatars.com/api/?name=Jenny+Lo&background=random' },
    { id: 'C-105', name: 'David Lee', email: 'david@email.com', phone: '+6013-555 4444', joinDate: '10 May 2024', status: 'Verified', avatar: 'https://ui-avatars.com/api/?name=David+Lee&background=random' },
    { id: 'C-106', name: 'Aishah Binti Omar', email: 'aishah@email.com', phone: '+6014-123 4567', joinDate: '22 Jun 2024', status: 'Pending', avatar: 'https://ui-avatars.com/api/?name=Aishah+Binti+Omar&background=random' },
    { id: 'C-107', name: 'Zulfadli Jumaat', email: 'pali@email.com', phone: '+6018-765 4321', joinDate: '30 Jul 2024', status: 'Verified', avatar: 'https://ui-avatars.com/api/?name=Zulfadli+Jumaat&background=random' }
];

const defaultMaintenanceData = [
    { car: 'Proton X50', issue: 'Regular Service (10k KM)', date: '20 Oct 2024', cost: 'RM 350', status: 'Completed' },
    { car: 'Myvi Gen3', issue: 'Aircond Not Cold', date: '23 Oct 2024', cost: 'RM 120', status: 'In Progress' },
    { car: 'Honda City', issue: 'Brake Pad Replacement', date: '25 Oct 2024', cost: 'RM 250', status: 'Pending' },
    { car: 'Toyota Vios', issue: 'Tyre Alignment', date: '26 Oct 2024', cost: 'RM 80', status: 'Pending' }
];

// Data Initialization

// Helper to check if data exists AND is not empty
function loadData(key, defaultData) {
    const stored = JSON.parse(localStorage.getItem(key));
    // If stored data exists AND has items, use it. Otherwise, use default.
    return (stored && stored.length > 0) ? stored : defaultData;
}

// Initialize Variables
let carData = loadData('crs_cars', defaultCarData);
let rentalData = loadData('crs_rentals', defaultRentalData);
let customerData = loadData('crs_customers', defaultCustomerData);
let maintenanceData = loadData('crs_maintenance', defaultMaintenanceData);

// Save Function 
function saveData() {
    localStorage.setItem('crs_cars', JSON.stringify(carData));
    localStorage.setItem('crs_rentals', JSON.stringify(rentalData));
    localStorage.setItem('crs_customers', JSON.stringify(customerData));
    localStorage.setItem('crs_maintenance', JSON.stringify(maintenanceData));
    if (typeof updateKPIs === 'function') updateKPIs();
}
