let notificationArea = document.querySelector('.notification');
let notifyButton = document.getElementById('notify');

function isPushNotificationSupported() {
    return "serviceWorker" in navigator && "Notification" in window;
}

function initializePushNotifications() {
    // request user grant to show notification
    return Notification.requestPermission(function (result) {
        return result;
    });
}

function sendNotification(title, description) {
    const img = "assets/stocksignals.png";
    const options = {
        body: description,
        icon: "assets/stocksignals.png",
        vibrate: [200, 100, 200],
        tag: "OI Alert",
        image: img,
        badge: "https://stocksignal.github.io/assets/icon/apple-icon-180.png",
        actions: [{ action: "Detail", title: "View" }]
    };
    navigator.serviceWorker.ready.then(function (serviceWorker) {
        serviceWorker.showNotification(title, options);
    });
}

if (isPushNotificationSupported()) {
    console.log("Push notification supported");
    notificationArea.style.display = 'flex';
}

notifyButton.addEventListener('click', ()=>{

    initializePushNotifications().then((res)=>{
        console.log(res);
        if (res == 'granted'){
            console.log("Notification enabled")
            notifyButton.style.outline = '1px solid var(--put)';
            notifyButton.style.color = 'var(--put)';

            sendNotification('Test title', 'Test Description');

        } else {
            console.log("Notification denied")
            notifyButton.style.outline = '1px solid var(--call)';
            notifyButton.style.color = 'var(--call)';
        }
    })
})

initializePushNotifications()