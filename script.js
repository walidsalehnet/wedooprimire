// تحديد زر الاشتراك
const subscribeButton = document.getElementById("subscribeButton");
const message = document.getElementById("message");

// استرجاع قائمة الـ IPs من LocalStorage
const authorizedIPs = JSON.parse(localStorage.getItem("authorizedIPs")) || [];

// الحصول على IP المستخدم
fetch("https://api.ipify.org?format=json")
    .then(response => response.json())
    .then(data => {
        const userIP = data.ip;

        // فحص إذا كان IP المستخدم مصرحاً
        if (authorizedIPs.includes(userIP)) {
            subscribeButton.textContent = "الدخول إلى القسم";
            subscribeButton.addEventListener("click", () => {
                window.location.href = "wedoo.html";
            });
        } else {
            subscribeButton.addEventListener("click", () => {
                message.textContent = "هذا القسم مدفوع. لتفعيل القسم يرجى التواصل مع الدعم.";
            });
        }
    })
    .catch(error => {
        message.textContent = "حدث خطأ في الحصول على IP.";
        console.error(error);
    });
