const axois = require('axios');
class ForgetPassword{
    constructor(email, date, password){
        this.email = email;
        this.date = date;
        this.password = password;

    }
}

// app.js
    function validatePasswords() {
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');

        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (password === confirmPassword) {
            return alert('Passwords match! You can proceed.');
            // You can perform other actions here, such as submitting the form
        } else {
            return alert('Passwords do not match. Please try again.');
            // You may choose to clear the input fields or take other actions on mismatch
        }
    }

    // Attach the validatePasswords function to the button's click event
    // let result = validatePasswords();
    // let button = document.getElementById('btn');
    // button.addEventListener('click', function() {
    // console.log('hello');
        
    // });

    module.exports = ForgetPassword;