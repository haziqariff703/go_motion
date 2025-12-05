// =========================================
// 5. DASHBOARD & UI LOGIC
// =========================================

function updateKPIs() {
    // Safety check: ensure elements exist before trying to update them
    const totalCarsEl = document.getElementById('totalCarsDisplay');
    const totalFleetLabel = document.getElementById('totalFleetLabel');
    if (totalCarsEl && carData) {
        totalCarsEl.textContent = carData.length;
        if(totalFleetLabel) totalFleetLabel.textContent = carData.length + " Cars";
    }

    const activeRentalsEl = document.getElementById('activeRentalsDisplay');
    if (activeRentalsEl && carData) {
        activeRentalsEl.textContent = carData.filter(c => c.status === 'Rented').length;
    }

    const totalRevenueEl = document.getElementById('totalRevenueDisplay');
    if (totalRevenueEl && rentalData) {
        const total = rentalData.reduce((sum, r) => {
            if (r.status === 'Paid' && r.total) {
                // SAFETY FIX: Convert to string first, then clean
                const cleanStr = String(r.total).replace(/[^\d.-]/g, '');
                const amount = parseInt(cleanStr) || 0; 
                return sum + amount;
            }
            return sum;
        }, 0);
        
        totalRevenueEl.textContent = 'RM ' + total.toLocaleString();
    }
}

// --- CHARTS & GRAPHS ---
function initCharts() {
    // 1. DETERMINE THEME COLOR
    const isDark = localStorage.getItem('crs_theme') === 'dark' || 
                   (!localStorage.getItem('crs_theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    const textColor = isDark ? '#f8fafc' : '#1e293b'; // White or Dark Blue

    // 2. REVENUE CHART
    const revenueEl = document.querySelector("#revenueChart");
    if (revenueEl) {
        let monthlyRevenue = Array(12).fill(0);
        
        if (Array.isArray(rentalData)) {
            rentalData.forEach(r => {
                if (r.status === 'Paid' && r.month >= 0 && r.month < 12 && r.total) {
                    const cleanStr = String(r.total).replace(/[^\d.-]/g, '');
                    const amount = parseInt(cleanStr) || 0;
                    monthlyRevenue[r.month] += amount;
                }
            });
        }

        const options = {
            series: [{ name: 'Net Revenue', data: monthlyRevenue }],
            chart: { 
                type: 'area', 
                height: 350, 
                toolbar: { show: false },
                foreColor: textColor 
            },
            colors: ['#4f46e5'],
            dataLabels: { enabled: false },
            stroke: { curve: 'smooth' },
            xaxis: { 
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] 
            },
            tooltip: {
                theme: isDark ? 'dark' : 'light',
                y: { formatter: function (val) { return "RM " + val } }
            }
        };

        if(window.revenueChartInstance) window.revenueChartInstance.destroy();
        window.revenueChartInstance = new ApexCharts(revenueEl, options);
        window.revenueChartInstance.render();
    }

    // 3. FLEET STATUS CHART (Fixed: Adds Center Label)
    const statusEl = document.querySelector("#statusChart");
    if (statusEl) {
        let statusCounts = [0, 0, 0];
        if (Array.isArray(carData)) {
            statusCounts = [
                carData.filter(c => c.status === 'Available').length,
                carData.filter(c => c.status === 'Rented').length,
                carData.filter(c => c.status === 'Maintenance').length
            ];
        }

        const options = {
            series: statusCounts,
            labels: ['Available', 'Rented', 'Maintenance'],
            chart: { 
                type: 'donut', 
                height: 320,
                foreColor: textColor 
            },
            colors: ['#10b981', '#f59e0b', '#ef4444'],
            // --- THIS ADDS THE PERCENTAGE IN THE MIDDLE ---
            plotOptions: {
                pie: {
                    donut: {
                        size: '70%',
                        labels: {
                            show: true,
                            name: { show: true, fontSize: '14px' },
                            value: { 
                                show: true, 
                                fontSize: '22px', 
                                fontWeight: 600,
                                color: textColor 
                            },
                            total: {
                                show: true,
                                showAlways: true,
                                label: 'Availability',
                                color: textColor,
                                formatter: function (w) {
                                    const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                    const available = w.globals.seriesTotals[0]; // Index 0 = Available
                                    if(total === 0) return "0%";
                                    return Math.round((available / total) * 100) + "%";
                                }
                            }
                        }
                    }
                }
            },
            // ----------------------------------------------
            dataLabels: { enabled: false },
            legend: { position: 'bottom' },
            tooltip: { theme: isDark ? 'dark' : 'light' }
        };

        if(window.statusChartInstance) window.statusChartInstance.destroy();
        window.statusChartInstance = new ApexCharts(statusEl, options);
        window.statusChartInstance.render();
    }

    // 4. TOP CARS CHART
    const topCarsEl = document.querySelector("#topCarsChart");
    if (topCarsEl) {
        const carCounts = {};
        if (Array.isArray(rentalData)) {
            rentalData.forEach(rent => {
                const model = rent.car || "Unknown";
                carCounts[model] = (carCounts[model] || 0) + 1;
            });
        }

        const sortedCars = Object.entries(carCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
        const models = sortedCars.map(item => item[0]);
        const counts = sortedCars.map(item => item[1]);

        const options = {
            series: [{ name: 'Times Rented', data: counts }],
            chart: { 
                type: 'bar', 
                height: 300, 
                toolbar: { show: false },
                foreColor: textColor 
            },
            colors: ['#4f46e5'],
            plotOptions: { bar: { borderRadius: 4, horizontal: true, barHeight: '50%' } },
            xaxis: { categories: models },
            tooltip: { theme: isDark ? 'dark' : 'light' }
        };

        if(window.topCarsChartInstance) window.topCarsChartInstance.destroy();
        window.topCarsChartInstance = new ApexCharts(topCarsEl, options);
        window.topCarsChartInstance.render();
    }
}