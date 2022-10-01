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

    initializePushNotifications().then((res) => {
        if (res == 'granted') {
            const options = {
                body: description,
                icon: "assets/stocksignals.png",
                vibrate: [200, 100, 200],
                tag: "OI Alert",
                badge: "https://stocksignal.github.io/assets/icon/apple-icon-180.png",
                actions: [{ action: "Detail", title: "View" }]
            };
            navigator.serviceWorker.ready.then(function (serviceWorker) {
                serviceWorker.showNotification(title, options);
            });
        }
    })
}

if (isPushNotificationSupported()) {
    console.log("Push notification supported");
    notificationArea.style.display = 'flex';
}

notifyButton.addEventListener('click', () => {

    initializePushNotifications().then((res) => {
        console.log(res);
        if (res == 'granted') {
            console.log("Notification enabled")
            notifyButton.style.outline = '1px solid var(--put)';
            notifyButton.style.color = 'var(--put)';
        } else {
            console.log("Notification denied")
            notifyButton.style.outline = '1px solid var(--call)';
            notifyButton.style.color = 'var(--call)';
        }
    })
})


function scanner(data) {

    if ((data[0]['signal'] == 'BUY') && (data[1]['signal'] == 'BUY')) {

        if ((data[0]['difference'] < 1000000) && (data[1]['difference'] < 1000000)) {
            let title = `${data[0]['index']} : Bullish`;
            let description = `20 lakh more CALLS are sold than PUTS`;
            sendNotification(title, description)
        }
    } else if ((data[0]['signal'] == 'SELL') && (data[1]['signal'] == 'SELL')) {

        if ((data[0]['difference'] > 1000000) && (data[1]['difference'] > 1000000)) {
            let title = `${data[0]['index']} : Bearish`;
            let description = `20 lakh more PUTS are sold than CALLS`;
            sendNotification(title, description)
        }
    }
}