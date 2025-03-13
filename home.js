const firebaseConfig = {

    apiKey: "AIzaSyCOA_2bf_b1o1nXSHZO5Re5DjSD66Pa6MY",

    authDomain: "raona0.firebaseapp.com",
    projectId: "raona0",
    storageBucket: "raona0.appspot.com",
    messagingSenderId: "797719983777",
    appId: "1:797719983777:web:aa4490f3e9f6f435ec62e0"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Redirect if not logged in
auth.onAuthStateChanged(user => {

  

    if (!user) {
        window.location.href = "index.html";
    }
    else {
      localStorage.setItem("user",user.email)
    }
});
const listings = document.getElementById("listings")
async function getData() {
  try {
    
    
   listings.innerHTML = `
    <div class="load">

      <div class="dots">

      <div class="dot"></div>  
      <div class="dot"></div>
      <div class="dot"></div>
      </div>
      <div class="text">Loading Top Rooms</div>
    </div>
   `
    
    const querySnapshot = await db.collection("listings").get();
    listings.innerHTML= ""
    querySnapshot.forEach((doc) => {
      const data = doc.data(); // Get document data correctly
      
      const list = `
            <div class="card">
                <div class="cname">${data.name}</div>
                <div class="cname" style="font-size: 18px;">₹${data.rent}/Day</div>
                <div class="ctag">${data.location}</div>
                <div class="cbtns">
                    <div class="cbtn" 
                        onclick="opx('${data.name}', '${data.rent}', '${data.location}', '${data.id}', 
                        '${data.imageUrls?.a || ""}', '${data.imageUrls?.b || ""}', 
                        '${data.imageUrls?.c || ""}', '${data.imageUrls?.d || ""}','${data.features}')">
                        Book Now
                    </div>
                </div>
            </div>`;
      
      listings.innerHTML += list; // Append listing to the container
    });
    
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}
getData()
function closex() {
  document.getElementById("cvk").innerHTML =""
  document.querySelector('.overlay').style.opacity = '0';
            document.querySelector('.overlay').style.pointerEvents = 'none';
            document.body.style.pointerEvents = 'auto';  // Re-enable entire body
        
}
function opx(name, rent, location, id, a,b,c,d, features) {
  const template = `
  <div class="mod">
    <div class="flx">
    <div class="mtitle">${name}</div>
<div class="mtitle fas fa-x" onclick="closex()"></div>

    </div>
    <div class="banner">

    <div class="img">
      <img src="banner.png" alt="" id="scroll" />
    </div>  
    </div>
    <div class="desc">
      <div class="mname">Room Details</div>
      <div class="dxsc">${features}</div>
    </div>
    <div class="option">
      <div class="oname">Poeple</div>
      <div class="input">
        <input value="1" type="number" placeholder="1" id="fpp">
      </div>
    </div>
    
      <div class="option">

      <div class="oname">Duration</div>

      <div class="input">
        <input value="1" type="number"  placeholder="1" id="fdp">
      </div>
    </div>
    <div class="xxv" align="center">
    <div class="cbxp" >
      <div class="bxop" style=" text-align: center" onclick="buy('${id}', '${rent}', '${location}', '${name}')">Proceed Booking</div>
    </div>
    </div>
    </div>
  `
 
  document.getElementById("cvk").innerHTML = template;
  document.querySelector('.overlay').style.opacity = '0.5';
            document.querySelector('.overlay').style.pointerEvents = 'auto';
            document.body.style.pointerEvents = 'none';  
            document.getElementById("cvk").style.pointerEvents = 'auto'; 
        
        
  scroll(a,b,c,d)
  up()
}
function buy(id, rent, location, name) {
  const time = document.getElementById("fdp").value 
  const person = document.getElementById("fpp").value 
  
  if (time<1 || time>7) {
    showToast("Time value 1-7 days only", "error")
  }
  else if (person<1||person>5) {
    showToast("Person should be 1-5 only","error")
  }
  else {
    
    const time = document.getElementById("fdp").value 
  const person = document.getElementById("fpp").value 
    const prix = Number(Number(rent)*Number(time)*Number(person))
    document.querySelector(".bxop").innerText = "Waiting..."
    document.querySelector(".bxop").disabled=true;
    // Razorpay payment options
            var options = {
                "key": "rzp_test_3ADFKimnCz8iXo", // Replace with your Razorpay Key
                "amount": Number(prix) * 100, // 257 INR (in paisa)
                "currency": "INR",
                "name": "KAMRADO",
                "description": "Room Booking",
                "image": "logo.png",
                "handler": function (response) {
                    console.log("Payment successful: ", response);
                    const otpx = Math.floor(100000 + Math.random() * 900000);
                    // Save payment details to Firestore
                    user = auth.currentUser;
                    db.collection("bookings").add({
                      
                      user:localStorage.getItem("user"),
                      username: localStorage.getItem("username"),
                      email: localStorage.getItem("email"),
                        name: name,
                        paymentId: response.razorpay_payment_id,
                        amount: Number(prix),
                        duration: time,
                        person:person,
                        id: id,
                        status: "Active",
                        approved:false,
                        location:location,
                        otp:otpx,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    })
                    .then(() => {
                        console.log("Payment details saved to Firestore");
                        showToast("Room Booked!", "success")
                        nav('book')
                    })
                    .catch((error) => {
                        console.error("Error saving payment details: ", error);
                    });
                },
                "prefill": {
                    "name": "Kamrado user",
                    "email": "user@gmail.com",
                    "contact": "9999999999",
                },
                "theme": {
                    "color": "#332ffd"
                }
            };

            // Open Razorpay Checkout
            const razorpay = new Razorpay(options);
            razorpay.open();
        

  }
}
function nav(x) {
  if(x == 'home') {
    window.location.href = "home.html"
  }
  else if(x == 'fav') {
    window.location.href = "liked.html"
  }
  else if(x == 'profile') {
    window.location.href = "profile.html"
  }
  else if (x== "noti") {
    window.location.href = "noti.html"
  }
  else if(x == 'back') {
    window.location.back;
  }
  else if(x == 'book') {
    window.location.href = "show.html"
  }
  
}
//SCROLL FUNCTIONALITY 

function scroll(a,b,c,d) {
  const img = document.getElementById("scroll")
  img.src = a;
  setTimeout(()=>{
    img.src =b;
    setTimeout(()=>{
      img.src = c;
      setTimeout(()=>{
      img.src = d;
      setTimeout(()=>{
      scroll(a,b,c,d)
    }, 3000)
    }, 3000)
    }, 3000)
  }, 3000)
}

function up() {
  
  document.getElementById("cvk").classList.add("open")
  document.getElementById("cvk").style.opacity = "1"
  
}
auth.onAuthStateChanged(user => {



 

    if (user) {
      localStorage.setItem("user", user.email)
      saveData(user)
    }
    
   
}); 

function saveData(user) {
  const userRef = db.collection("users").doc(user.uid);



    userRef.get().then(doc => {
        if (doc.exists) {
            const userData = doc.data();
            localStorage.setItem("username", userData.username)
            localStorage.setItem("email", userData.email)
        }
    })
}