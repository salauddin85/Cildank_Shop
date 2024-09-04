
function handleSubscribe() {
    const emailInput = document.getElementById('email');
    const email = emailInput.value;
    const toastContainer = document.getElementById('toast-container');
    const successToast = new bootstrap.Toast(document.getElementById('success-toast'));
    const errorToast = new bootstrap.Toast(document.getElementById('error-toast'));
    const errorMessage = document.getElementById('error-message');

    // Regular expression for validating email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        errorMessage.textContent = "Email address is required.";
        errorToast.show();
        return;
    }

    if (!emailPattern.test(email)) {
        errorMessage.textContent = "Please enter a valid email address.";
        errorToast.show();
        return;
    }

    // Assuming successful subscription
    // Replace this part with actual subscription logic
    successToast.show();
    emailInput.value = ''; // Clear the input field
}

