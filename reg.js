// const logoutBtn = document.querySelector(	`.logout-btn`);

// logoutBtn.addEventListener(	'click', () => {
//     window.location.replace("login.html")
// })

document.getElementById('registerForm').addEventListener('submit', function(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Retrieve form values
    const firstName = document.getElementById('firstName').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Perform validation (you can customize this part)
    if(firstName.trim() === '' || surname.trim() === '' || email.trim() === '' || password.trim() === '') {
        alert('Please fill out all fields.');
        return;
    }

});