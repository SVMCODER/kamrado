const auth = firebase.auth();

// Handle form submission for login/signup
document.getElementById("authForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from submitting normally

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Try to log in the user with email and password
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // If login is successful, redirect to the index page
            console.log("User logged in:", userCredential.user);
            window.location.href = "index.html"; // Redirect to index.html
        })
        .catch((error) => {
            // If login fails (user does not exist), sign up the user
            if (error.code === 'auth/user-not-found') {
                // Create a new user with email and password
                auth.createUserWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        // After signup, log the user in and redirect to index.html
                        console.log("User signed up:", userCredential.user);
                        window.location.href = "index.html"; // Redirect to index.html
                    })
                    .catch((error) => {
                        // Handle signup errors
                        console.error("Signup error:", error.message);
                        alert("Error during signup: " + error.message);
                    });
            } else {
                // Handle other login errors
                console.error("Login error:", error.message);
                alert("Error during login: " + error.message);
            }
        });
});