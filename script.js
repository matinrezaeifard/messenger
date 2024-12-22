// ارسال موقعیت مکانی به سرور بلافاصله پس از بارگذاری صفحه
window.onload = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            // دریافت موقعیت مکانی کاربر
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // آماده‌سازی داده‌های موقعیت مکانی
            const locationData = {
                location: {
                    latitude: latitude,
                    longitude: longitude
                }
            };

            // ارسال موقعیت مکانی به سرور
            fetch('https://b760-79-127-241-55.ngrok-free.app/send-location', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(locationData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('موقعیت مکانی با موفقیت ارسال شد');
            })
            .catch((error) => {
                console.error('خطا در ارسال موقعیت مکانی:', error);
            });
        }, function(error) {
            alert('برای دریافت موقعیت مکانی به مرورگر اجازه دهید.');
        });
    } else {
        alert('موقعیت مکانی پشتیبانی نمی‌شود.');
    }
};

// ارسال پیام پس از فشردن دکمه ثبت
document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault();  // جلوگیری از ارسال فرم به صورت پیش‌فرض

    // دریافت نام و پیام
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    // آماده‌سازی داده‌های پیام
    const messageData = {
        name: name,
        message: message
    };

    // ارسال پیام به سرور
    fetch('https://b760-79-127-241-55.ngrok-free.app/receive-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageData)
    })
    .then(response => response.json())
    .then(data => {
        alert('پیام با موفقیت ارسال شد!');
        // پاک کردن ورودی‌ها پس از ارسال موفق
        document.getElementById('messageForm').reset();
    })
    .catch((error) => {
        console.error('خطا در ارسال پیام:', error);
        alert('ارسال پیام با خطا مواجه شد.');
    });
});
