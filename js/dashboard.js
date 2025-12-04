// =========================================
// 5. DASHBOARD & UI LOGIC
// =========================================

function updateKPIs() {
    // 1. Total Cars
    const totalCarsEl = document.getElementById('totalCarsDisplay');
    const totalFleetLabel = document.getElementById('totalFleetLabel');
    if (totalCarsEl && carData) {
        totalCarsEl.textContent = carData.length;
        if(totalFleetLabel) totalFleetLabel.textContent = carData.length + " Cars";
    }

    // 2. Active Rentals
    const activeRentalsEl = document.getElementById('activeRentalsDisplay');
    if (activeRentalsEl && carData) {
        activeRentalsEl.textContent = carData.filter(c => c.status === 'Rented').length;
    }

    // 3. Total Revenue (Paid Only)
    const totalRevenueEl = document.getElementById('totalRevenueDisplay');
    if (totalRevenueEl && rentalData) {
        const total = rentalData.reduce((sum, r) => {
            if (r.status === 'Paid') {
                // SIMPLE COMMAND: Remove first 3 chars ("RM ")
                const amount = parseInt(r.total.slice(3)) || 0; 
                return sum + amount;
            }
            return sum;
        }, 0);
        
        totalRevenueEl.textContent = 'RM ' + total.toLocaleString();
    }
}

// --- CHARTS & GRAPHS ---
function initCharts() {
    // 1. REVENUE CHART
    const revenueEl = document.querySelector("#revenueChart");
    if (revenueEl) {
        let monthlyRevenue = Array(12).fill(0);
        
        rentalData.forEach(r => {
            if (r.status === 'Paid' && r.month >= 0 && r.month < 12) {
                // SIMPLE COMMAND: Remove first 3 chars ("RM ")
                const amount = parseInt(r.total.slice(3)) || 0;
                monthlyRevenue[r.month] += amount;
            }
        });

        const options = {
            series: [{ name: 'Net Revenue', data: monthlyRevenue }],
            chart: { type: 'area', height: 350, toolbar: { show: false } },
            colors: ['#4f46e5'],
            dataLabels: { enabled: false },
            stroke: { curve: 'smooth' },
            xaxis: { 
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] 
            },
            tooltip: {
                y: { formatter: function (val) { return "RM " + val } }
            }
        };

        if(window.revenueChartInstance) window.revenueChartInstance.destroy();
        window.revenueChartInstance = new ApexCharts(revenueEl, options);
        window.revenueChartInstance.render();
    }

    // 2. FLEET STATUS CHART
    const statusEl = document.querySelector("#statusChart");
    if (statusEl) {
        let statusCounts = [
            carData.filter(c => c.status === 'Available').length,
            carData.filter(c => c.status === 'Rented').length,
            carData.filter(c => c.status === 'Maintenance').length
        ];

        const options = {
            series: statusCounts,
            labels: ['Available', 'Rented', 'Maintenance'],
            chart: { type: 'donut', height: 320 },
            colors: ['#10b981', '#f59e0b', '#ef4444'],
            dataLabels: { enabled: false },
            legend: { position: 'bottom' }
        };

        if(window.statusChartInstance) window.statusChartInstance.destroy();
        window.statusChartInstance = new ApexCharts(statusEl, options);
        window.statusChartInstance.render();
    }

    // 3. TOP CARS CHART
    const topCarsEl = document.querySelector("#topCarsChart");
    if (topCarsEl) {
        const carCounts = {};
        rentalData.forEach(rent => {
            const model = rent.car;
            carCounts[model] = (carCounts[model] || 0) + 1;
        });

        const sortedCars = Object.entries(carCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
        const models = sortedCars.map(item => item[0]);
        const counts = sortedCars.map(item => item[1]);

        const options = {
            series: [{ name: 'Times Rented', data: counts }],
            chart: { type: 'bar', height: 300, toolbar: { show: false } },
            colors: ['#4f46e5'],
            plotOptions: { bar: { borderRadius: 4, horizontal: true, barHeight: '50%' } },
            xaxis: { categories: models }
        };

        if(window.topCarsChartInstance) window.topCarsChartInstance.destroy();
        window.topCarsChartInstance = new ApexCharts(topCarsEl, options);
        window.topCarsChartInstance.render();
    }
}