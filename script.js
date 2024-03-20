const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const phone = document.querySelector('#phone'); // Add phone input selection
const form = document.querySelector('#signup');
const togglePassword = document.querySelector("#togglePassword");

// Function to show error message
const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove('success');
    formField.classList.add('error');
    const error = formField.querySelector('small');
    error.textContent = message;
};

// Function to show success message
const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove('error');
    formField.classList.add('success');
    const error = formField.querySelector('small');
    error.textContent = '';
};

// Function to check if a value is required
const isRequired = value => value.trim() === '';

// Function to check if a value is between a specified length range
const isBetween = (length, min, max) => length >= min && length <= max;

// Function to check if an email is valid using a regular expression
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

// Function to check if a password is secure using a regular expression
const isPasswordSecure = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return re.test(password);
};

// Function to check if a phone number is valid (10 digits)
const isPhoneValid = (phone) => {
    const re = /^\d{10}$/;
    return re.test(phone);
};

// Function to validate the username field
const checkUsername = () => {
    const min = 3;
    const max = 25;
    const usernameVal = username.value.trim();

    if (isRequired(usernameVal)) {
        showError(username, 'Username cannot be blank.');
    } else if (!isBetween(usernameVal.length, min, max)) {
        showError(username, `Username must be between ${min} and ${max} characters.`);
    } else {
        showSuccess(username);
    }
};

// Function to validate the email field
const checkEmail = () => {
    const emailVal = email.value.trim();

    if (isRequired(emailVal)) {
        showError(email, 'Email cannot be blank.');
    } else if (!isEmailValid(emailVal)) {
        showError(email, 'Email is not valid.');
    } else {
        showSuccess(email);
    }
};

// Function to validate the password field
const checkPassword = () => {
    const passwordVal = password.value.trim();

    if (isRequired(passwordVal)) {
        showError(password, 'Password cannot be blank.');
    } else if (!isPasswordSecure(passwordVal)) {
        showError(password, 'Password must have at least 8 characters including 1 lowercase, 1 uppercase, 1 number, and 1 special character.');
    } else {
        showSuccess(password);
    }
};

// Function to validate the confirm password field
const checkConfirmPassword = () => {
    const confirmPasswordVal = confirmPassword.value.trim();
    const passwordVal = password.value.trim();

    if (isRequired(confirmPasswordVal)) {
        showError(confirmPassword, 'Confirm Password is required.');
    } else if (passwordVal !== confirmPasswordVal) {
        showError(confirmPassword, 'Confirm Password does not match.');
    } else {
        showSuccess(confirmPassword);
    }
};

// Function to validate the phone number field
const checkPhone = () => {
    const phoneVal = phone.value.trim();

    if (isRequired(phoneVal)) {
        showError(phone, 'Phone number cannot be blank.');
    } else if (!isPhoneValid(phoneVal)) {
        showError(phone, 'Phone number must be 10 digits.');
    } else {
        showSuccess(phone);
    }
};

togglePassword.addEventListener("click", function () {
    const type = confirmPassword.getAttribute("type") === "password" ? "text" : "password";
    confirmPassword.setAttribute("type", type);
    this.classList.toggle("bi-eye");
});

form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkUsername();
    checkEmail();
    checkPassword();
    checkConfirmPassword();
    checkPhone();

    const isUsernameValid = !username.parentElement.classList.contains('error');
    const isEmailValid = !email.parentElement.classList.contains('error');
    const isPasswordValid = !password.parentElement.classList.contains('error');
    const isConfirmPasswordValid = !confirmPassword.parentElement.classList.contains('error');
    const isPhoneValid = !phone.parentElement.classList.contains('error');

    const isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isPhoneValid;

    if (isFormValid) {
        // Submit the form to the server
        form.submit();
    }
});

