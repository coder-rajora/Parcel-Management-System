document.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem('username') || 'User';
    const calculatedCost = parseFloat(localStorage.getItem('calculatedCost')) || 0;
    const serviceCost = 100; // Fixed service cost
    const totalCost = calculatedCost + serviceCost;

    // Save the service cost in localStorage (if not already stored)
    if (!localStorage.getItem('serviceCost')) {
        localStorage.setItem('serviceCost', serviceCost);
    }

    // Elements
    const paymentMode = document.getElementById('paymentMode');
    const cardDetails = document.getElementById('cardDetails');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const billAmount = document.getElementById('billAmount');

    // Display username and bill amount
    welcomeMessage.textContent = `Welcome, ${username}`;
    billAmount.textContent = totalCost;

    // Logout functionality
    document.getElementById('logout').addEventListener('click', function () {
        localStorage.clear();
        window.location.href = 'Login.html';
    });

    // Toggle card details based on payment mode
    paymentMode.addEventListener('change', function () {
        if (paymentMode.value === 'credit' || paymentMode.value === 'debit') {
            cardDetails.classList.remove('hidden');
        } else {
            cardDetails.classList.add('hidden');
        }
    });

    // Back to booking page
    document.getElementById('backNow').addEventListener('click', function () {
        window.location.href = 'booking.html';
    });

    // Handle payment
    document.getElementById('payNow').addEventListener('click', function () {
        const cardNumber = document.getElementById('cardNumber').value.trim();
        const expiryDate = document.getElementById('expiryDate').value.trim();
        const cvv = document.getElementById('cvv').value.trim();

        let isValid = true;

        // Clear errors
        document.querySelectorAll('.error').forEach(err => (err.textContent = ''));

        // Validate card details
        if (!cardNumber || cardNumber.length !== 16 || isNaN(cardNumber)) {
            document.getElementById('cardNumberError').textContent = 'Invalid card number. Must be 16 digits.';
            isValid = false;
        }
        if (!expiryDate) {
            document.getElementById('expiryDateError').textContent = 'Expiry date is required.';
            isValid = false;
        }
        if (!cvv || cvv.length !== 3 || isNaN(cvv)) {
            document.getElementById('cvvError').textContent = 'Invalid CVV. Must be 3 digits.';
            isValid = false;
        }

        // Finalize payment if valid
        if (isValid) {
            const bookingId = `BKG${Math.floor(100000 + Math.random() * 900000)}`;
            const paymentTime = new Date().toLocaleString();

            localStorage.setItem('bookingId', bookingId);
            localStorage.setItem('paymentTime', paymentTime);
            localStorage.setItem('finalCost', totalCost);

            alert(`Payment Successful!\nBooking ID: ${bookingId}`);
            window.location.href = 'invoice.html';
        }
    });
});
