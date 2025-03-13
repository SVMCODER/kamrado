// Check if Service Workers and Push Notifications are supported
if ("serviceWorker" in navigator && "PushManager" in window) {
    navigator.serviceWorker.register("service-worker.js")
        .then(reg => console.log("Service Worker Registered:", reg))
        .catch(err => console.error("Service Worker Registration Failed:", err));
} else {
    console.log("Push Notifications not supported in this browser.");
}

// Request notification permission
document.getElementById("enableNotifications").addEventListener("click", async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
        console.log("Notifications enabled.");
        alert("Notifications enabled!");
    } else {
        console.log("Notifications denied.");
        alert("You need to allow notifications.");
    }
});

// Send a test notification
document.getElementById("sendNotification").addEventListener("click", () => {
    if (navigator.serviceWorker) {
        navigator.serviceWorker.ready.then(registration => {
            registration.showNotification("KAMRADO KA OWNER CHAKKA HAI", {
                body: "RAND",
                
                
                actions: [
                    { action: "open_app", title: "Book Rooms" },
                    { action: "dismiss", title: "Dismiss" }
                ],
                vibrate: [200, 100, 200], // Vibration pattern
                requireInteraction: true // Keeps notification visible until dismissed
            });
        });
    }
}); 