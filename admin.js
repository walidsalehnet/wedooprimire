// استرجاع قائمة الـ IPs من LocalStorage أو تهيئتها إذا كانت فارغة
let authorizedIPs = JSON.parse(localStorage.getItem("authorizedIPs")) || [];

// عناصر DOM
const ipInput = document.getElementById("ipInput");
const addIpButton = document.getElementById("addIpButton");
const ipList = document.getElementById("ipList");

// تحديث قائمة الـ IPs المعروضة
function updateIpList() {
    ipList.innerHTML = ""; // مسح القائمة
    authorizedIPs.forEach((ip, index) => {
        const li = document.createElement("li");
        li.textContent = ip;

        // زر حذف IP
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "حذف";
        deleteButton.style.marginLeft = "10px";
        deleteButton.addEventListener("click", () => {
            authorizedIPs.splice(index, 1); // حذف الـ IP من القائمة
            localStorage.setItem("authorizedIPs", JSON.stringify(authorizedIPs));
            updateIpList();
        });

        li.appendChild(deleteButton);
        ipList.appendChild(li);
    });
}

// إضافة IP جديد
addIpButton.addEventListener("click", () => {
    const newIp = ipInput.value.trim();
    if (newIp && !authorizedIPs.includes(newIp)) {
        authorizedIPs.push(newIp); // إضافة الـ IP
        localStorage.setItem("authorizedIPs", JSON.stringify(authorizedIPs));
        ipInput.value = ""; // تفريغ الحقل
        updateIpList();
    } else {
        alert("IP موجود بالفعل أو غير صالح!");
    }
});

// التحديث الأولي لقائمة الـ IPs
updateIpList();
