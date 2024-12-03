// Retrieve user data from localStorage
const username = localStorage.getItem('username');
const role = localStorage.getItem('role');

// Role-specific menu definitions
const menuOptions = {
    Customer: [
        { label: "Home", url: "#dashboard" },
        { label: "Booking Service", url: "booking.html" },
        { label: "Tracking", url: "tracking.html" },
        { label: "Previous Booking", url: "bookingHistory.html" },
        { label: "Contact Support", url: "customer.html" },
        { label: "Logout", url: "#logout", handler: logout },
    ],
    Officer: [
        { label: "Home", url: "#dashboard" },
        { label: "Manage Services", url: "booking.html" },
        { label: "Delivery Status", url: "delivery.html" },
        { label: "Pickup Scheduling", url: "scheduling.html" },
        { label: "Previous Booking", url: "bookingHistory.html" },
        { label: "Logout", url: "#logout", handler: logout },
    ],
};

// Populate the menu based on the user's role
function initializeMenu() {
    const navItems = document.getElementById("navItems");
    const userGreeting = document.getElementById("userGreeting");
    const pageTitle = document.getElementById("pageTitle");

    if (username && role) {
        userGreeting.textContent = `Hello, ${username}`;
        pageTitle.textContent = `${role} Dashboard`;

        // Build the role-specific menu
        const menu = menuOptions[role];
        navItems.innerHTML = ""; // Clear existing menu items

        menu.forEach(({ label, url, handler }) => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.textContent = label;
            a.href = url;

            // Attach the custom handler for actions like logout
            if (handler) a.addEventListener("click", handler);

            li.appendChild(a);
            navItems.appendChild(li);
        });
    } else {
        // Redirect to login if user data is missing
        window.location.href = "login.html";
    }
}

// Logout function
function logout(event) {
    event.preventDefault();
    localStorage.clear();
    window.location.href = "login.html";
}

// Initialize the dashboard
initializeMenu();