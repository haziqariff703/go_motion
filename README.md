# GoMotion - Car Rental Management System (IMS566)

## 📖 Project Description
**GoMotion** is a modern, web-based administration dashboard designed for car rental businesses. It provides a seamless interface for managing vehicle fleets, tracking rental history, and monitoring financial performance in real-time.

This project demonstrates advanced front-end development skills, utilizing dynamic DOM manipulation to simulate a real-world application environment without a backend database.

---

## 🚀 Key Features

### 🔐 Authentication & Security
- **Secure Login:** Simulated authentication system with credential validation.
- **Session Management:** Prevents access to internal pages without logging in (via LocalStorage).
- **Logout Safety:** Includes a confirmation modal to prevent accidental logouts.

### 📊 Interactive Dashboard
- **Real-Time KPIs:** Automatically calculates Total Fleet, Active Rentals, and Revenue based on data.
- **Data Visualization:**
  - **Revenue Area Chart:** Visualizes monthly income trends.
  - **Fleet Status Donut Chart:** Shows real-time car availability.
  - **Top 5 Cars:** Bar chart ranking the most popular vehicles.
- **Recent Activity:** A dynamic log showing user actions and system alerts.

### 🚗 Fleet & Rental Management
- **Dynamic Tables:** All data (Cars, Rentals, Customers) is rendered via JavaScript, making it easy to scale.
- **Smart Filtering:** Dropdown filters to quickly view Available, Rented, or Maintenance vehicles.
- **Status Indicators:** Color-coded badges (e.g., Green for "Paid", Red for "Maintenance") for instant status recognition.
- **CRUD Actions:** Functional "Delete" buttons to remove records from the view.

### 🎨 UI/UX Design
- **"GoMotion" Theme:** A custom Teal & Dark Blue color scheme for a professional look.
- **Responsive Sidebar:** Collapsible navigation that works on Desktop and Mobile.
- **Dark Mode:** Fully functional theme switcher (Light / Dark / Auto) that persists user preference.

---

## 🛠️ Tech Stack
- **HTML5:** Semantic structure.
- **CSS3:** Custom styling + **Bootstrap 5.3** framework.
- **JavaScript (ES6):** Core logic for data processing, DOM manipulation, and interactivity.
- **ApexCharts.js:** For interactive data visualization.
- **FontAwesome 6:** For scalable icons.

---

## 💻 How to Run
1. **Download** or **Clone** this repository.
2. Open the project folder.
3. Double-click `index.html` to open it in your web browser (Chrome recommended).
4. Login using the credentials below.

### 🔑 Demo Credentials
- **Username:** `admin`
- **Password:** `1234`

---

## 📂 Project Structure
```text
/
├── index.html          # Login Page
├── dashboard.html      # Main Overview (Charts & KPIs)
├── cars.html           # Vehicle Inventory Management
├── rentals.html        # Rental Transaction Logs
├── customers.html      # Customer Database
├── maintenance.html    # Service & Repair Logs
├── profile.html        # Admin Profile Settings
├── settings.html       # System Configuration (Theme/Notifications)
├── style.css           # Custom Styles & Theming
├── script.js           # Core Logic (Auth, Data, Charts)
└── images/             # Car & User avatars