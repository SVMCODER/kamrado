self.addEventListener("push", function (event) {
    const data = event.data ? event.data.json() : {};

    self.registration.showNotification(data.title || "Default Title", {
        body: data.body || "Default body message",
        icon: data.icon || "https://yourapp.com/logo.png",
        image: data.image || "https://yourapp.com/banner.jpg",
        actions: data.actions || [
            { action: "open_app", title: "Open App" },
            { action: "dismiss", title: "Dismiss" }
        ],
        vibrate: [200, 100, 200]
    });
});

// Handle notification click events
self.addEventListener("notificationclick", function (event) {
    event.notification.close();
    if (event.action === "open_app") {
        clients.openWindow("https://yourapp.com"); // Change to your app URL
    }
});