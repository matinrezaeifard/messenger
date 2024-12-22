var server = "https://9cde-79-127-241-55.ngrok-free.app";

// Send location to the server when the page loaded
window.onload = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            // Get the user location
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            // Prepare location data
            const locationData = {
                location: {
                    latitude: latitude,
                    longitude: longitude
                }
            };
            // Send the location to the server
            fetch(`${server}/send-location`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(locationData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Location sent successfully');
            })
            .catch((error) => {
                console.error('Error while sending the location: ', error);
            });
        }, function(error) {
            alert('برای دریافت موقعیت مکانی به مرورگر اجازه دهید.');
        });
    } else {
        alert('موقعیت مکانی پشتیبانی نمی‌شود.');
    }
};

// Send message to the server
document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Get name and message
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    // Prepare message data
    const messageData = {
        name: name,
        message: message
    };
    // Send message to the server
    fetch(`${server}/receive-message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageData)
    })
    .then(response => response.json())
    .then(data => {
        alert('پیام با موفقیت ارسال شد!');
        document.getElementById('messageForm').reset();
    })
    .catch((error) => {
        console.error('Error while sending the message: ', error);
        alert('ارسال پیام با خطا مواجه شد.');
    });
});
