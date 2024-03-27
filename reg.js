// const logoutBtn = document.querySelector(	`.logout-btn`);

// logoutBtn.addEventListener(	'click', () => {
//     window.location.replace("login.html")
// })

// document.getElementById('registerForm').addEventListener('submit', function(event) {
    // Prevent the default form submission
    function validateForm(event){
    event.preventDefault();

    // Retrieve form values
    const firstName = document.getElementById('firstName').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Perform validation 
    if(firstName.trim() === '' || surname.trim() === '' || email.trim() === '' || password.trim() === '') {
        alert('Please fill out all fields.');
        return;
    }

}