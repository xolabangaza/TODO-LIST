document.getElementById('signup,login').addEventListener('click', function(event) {
    
    window.location.href = "./login.html";
    window.location.href = "./index.html";
    event.preventDefault();
});

// document.getElementById('loginForm').addEventListener('submit', function(event) {
//     // Prevent the default form submission
//     event.preventDefault();

    // Retrieve form values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Perform validation 
    if(email.trim() === '' || password.trim() === '') {
        alert('Please fill out all fields.');
        return;
    }
    
    //    });