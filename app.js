function loader() {
  
  
  document.getElementById("container").innerHTML = `
  
<div class="mas" align="center">
  <div class="spin"></div>
</div>
  <div class="txt">Loggin In, please wait!</div>
  
  `
}

// Toast Notification
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.classList.add('toast', `toast-${type}`, 'show');
    
    // Icons for Toasts
    let icon = '';
    switch(type) {
      case 'success':
        icon = '<i class="fas fa-check-circle"></i>';
        break;
      case 'error':
        icon = '<i class="fas fa-exclamation-circle"></i>';
        break;
      case 'info':
        icon = '<i class="fas fa-info-circle"></i>';
        break;
    }
    
    toast.innerHTML = `${icon} ${message}`;
    toastContainer.appendChild(toast);
  
    // Auto hide after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 500);
    }, 5000);
  }


// LOGIN PART
 // Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyCOA_2bf_b1o1nXSHZO5Re5DjSD66Pa6MY",
    authDomain: "raona0.firebaseapp.com",
    projectId: "raona0",
    storageBucket: "raona0.appspot.com",
    messagingSenderId: "797719983777",
    appId: "1:797719983777:web:aa4490f3e9f6f435ec62e0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

  // Email validation function
  function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

// Password validation function (minimum 6 characters)
function isValidPassword(password) {
    return password.length >= 6;
}

// Handle form submission for login/signup

// Login/Signup with Google


// **Show login panel**
  function loginPanel() {
      document.getElementById("container").innerHTML = `
          <div id="spinner"></div>
          <div class="cell" align="center" style="width: fit-content">
              <div class="ccc">Login to your account</div>
              <div class="title">KAMRADO</div>
          </div>
          <input type="text" id="email" placeholder="Email"/>
          <input type="password" id="password" placeholder="Password"/>
           <div class="pqow" align="center">

    <button class="login-button" id="btn" onclick="login()">Log In</button>

  </div>
          <div class="cc" align="center">New User? Signup <a class="a" onclick="regPanel()">here</a>.</div>
      `;
  }

  // **Show registration panel**
  function regPanel() {
      document.getElementById("container").innerHTML = `
          <div id="spinner"></div>
          <div class="cell" align="center" style="width: fit-content">
              <div class="ccc">Create a new account</div>
              <div class="title">KAMRADO</div>
          </div>
          <input type="text" id="username" placeholder="Username"/>
          <input type="text" id="email" placeholder="Email"/>
          <input type="password" id="password" placeholder="Password"/>
            <div class="pqow" align="center">

    <button class="login-button" id="btn" onclick="register()">Sign Up</button>

  </div>
          <div class="cc" align="center">Already a user? Login <a class="a" onclick="loginPanel()">here</a>.</div>
      `;
  }

  // **Email validation function**
function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

// **Password validation function (minimum 6 characters)**
function isValidPassword(password) {
    return password.length >= 6;
}

// **Username validation function (3 to 20 characters)**
function isValidUsername(username) {
    return username.length >= 3 && username.length <= 20;
}

// **Login Function**
function login() {
  loader()
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!isValidEmail(email)) {
        showToast("Invalid email format.", "error"); 
        normal()
        return;
    }
    if (!isValidPassword(password)) {
        showToast("Password must be at least 6 characters long.", "error");
        normal()
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            localStorage.setItem("user", userCredential.user.email);
            showToast("Logged in successfully!", "success");
            window.location.href = "home.html";
        })
        .catch((error) => {
          normal()
            console.error("Login Error:", error.message);
            showToast("Invalid email or password.", "error");
        });
}

// **Register Function**
function register() {
  loader()
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!isValidUsername(username)) {
        showToast("Username must be between 3 and 20 characters.", "error");
        normal()
        return;
    }
    if (!isValidEmail(email)) {
        showToast("Invalid email format.", "error");
        normal()
        return;
    }
    if (!isValidPassword(password)) {
        showToast("Password must be at least 6 characters long.", "error");
        normal()
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            db.collection("users").doc(user.uid).set({
                username: username,
                email: email,
                profilePicture: "user.png",
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                localStorage.setItem("user", email);
                showToast("Registration successful!", "success");
                window.location.href = "home.html";
            })
            .catch((error) => {
              normal()
                console.error("Error saving user data:", error);
                showToast("Error saving user data.", "error");
            });
        })
        .catch((error) => {
          normal()
            console.error("Registration Error:", error.message);
            showToast(error.message, "error");
        });
}

function loader() {
  btn = document.getElementById("btn")
  btn.disabled = true;
  btn.innerHTML = `
  <div class="spin"></div> Please wait
  `
  
} 
function normal() {
  btx= document.getElementById("btn")

  btx.disabled = false;

  btx.innerHTML = "Continue"
}