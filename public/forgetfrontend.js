const axois = require('axios');


var b = "bknnll";

function setData(params) {
    b = params;
}

// app.js
    function validatePasswords() {
        var r = "hjkl";
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');

        const password = passwordInput.value;
        if (!password) {
            alert(`Not input anything ${r}`);
        }else{
            const confirmPassword = confirmPasswordInput.value;

            if (password === confirmPassword) {
            return alert('Passwords match! You can proceed.');
            // You can perform other actions here, such as submitting the form
            } else {
            return alert('Passwords do not match. Please try again.');
            // You may choose to clear the input fields or take other actions on mismatch
            }
        }
        
    }

    // Attach the validatePasswords function to the button's click event
    // let result = validatePasswords();
    // let button = document.getElementById('btn');
    // button.addEventListener('click', function() {
    // console.log('hello');
        
    // });

    module.exports = {setData};
    