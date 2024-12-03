document.addEventListener('DOMContentLoaded', () => {
    const role = localStorage.getItem('role');
    const customerSection = document.getElementById('customerSection');
    const officerSection = document.getElementById('officerSection');

    // Show section based on role
    if (role === 'Customer') {
        customerSection.classList.remove('hidden');
    } else if (role === 'Officer') {
        officerSection.classList.remove('hidden');
    }

    // Customer Section
    const trackButton = document.getElementById('trackButton');
    const bookingInput = document.getElementById('bookingInput');
    const parcelDetails = document.getElementById('parcelDetails');
    const trackingDetails = document.getElementById('trackingDetails');
    const currentStatus = document.getElementById('currentStatus');
    const errorNotice = document.getElementById('errorNotice');

    // Officer Section
    const officerSearchBtn = document.getElementById('officerSearchBtn');
    const officerSearch = document.getElementById('officerSearch');
    const parcelRecords = document.getElementById('parcelRecords');

    // Stored data in localStorage
    const bookingId = localStorage.getItem('bookingId');
    const customerId = localStorage.getItem('username');
    const deliveryDate = localStorage.getItem('deliveryDate');
    const deliveryTime = localStorage.getItem('deliveryTime');

    // Track Parcel
    trackButton.addEventListener('click', () => {
        const enteredId = bookingInput.value.trim();
        const deliveryDateTime = new Date(`${deliveryDate}T${deliveryTime}`);

        if (enteredId === bookingId) {
            const currentDate = new Date();
            const status = currentDate >= deliveryDateTime ? 'Delivered' : 'In Transit';

            trackingDetails.textContent = `Booking ID: ${enteredId}`;
            currentStatus.textContent = `Status: ${status}`;
            parcelDetails.classList.remove('hidden');
            errorNotice.classList.add('hidden');
        } else {
            parcelDetails.classList.add('hidden');
            errorNotice.classList.remove('hidden');
        }
    });

    // Officer Search
    officerSearchBtn.addEventListener('click', () => {
        const searchQuery = officerSearch.value.trim();

        if (searchQuery === bookingId || searchQuery === customerId) {
            const currentDate = new Date();
            const status = currentDate >= new Date(`${deliveryDate}T${deliveryTime}`) ? 'Delivered' : 'In Transit';

            parcelRecords.innerHTML = `
                <p>Booking ID: ${bookingId}</p>
                <p>Customer ID: ${customerId}</p>
                <p>Delivery Date: ${deliveryDate}</p>
                <p>Delivery Time: ${deliveryTime}</p>
                <p>Status: ${status}</p>
            `;
        } else {
            parcelRecords.innerHTML = '<p>No parcels match your query.</p>';
        }
    });
});
