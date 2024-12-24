// login admin
let isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
let bookings = [];
function handleAdminLogin(event) {
    event.preventDefault();

    const username = document.getElementById("admin-username").value;
    const password = document.getElementById("admin-password").value;

    if (username === "admin" && password === "admin123") {
        isAdminLoggedIn = true;
        alert("Login berhasil!");
        showSection("admin-panel");
        showBookings();
    } else {
        alert("Username atau password salah!");
    }
}

// tampilan admin
function showBookings() {
    let bookings = [];
    let isAdminLoggedIn = false;
    if (!isAdminLoggedIn) {
        alert("Anda tidak memiliki akses untuk melihat data pemesan.");
        return;
    }
    const tbody = document.querySelector("#booking-list tbody");
    tbody.innerHTML = ""; // Kosongkan tabel sebelum mengisi ulang
    bookings.forEach(booking => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${booking.name}</td>
            <td>${booking.email}</td>
            <td>${booking.match}</td>
            <td>${booking.quantity}</td>
            <td>Rp ${booking.totalPrice.toLocaleString()}</td>
        `;
        tbody.appendChild(row);
    });
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    if (sectionId === "admin-panel" && !isAdminLoggedIn) {
        alert("Anda tidak memiliki akses ke halaman admin.");
        return;
    }

    document.querySelectorAll(".content section").forEach(section => {
        section.style.display = "none";
    });
    document.getElementById(sectionId).style.display = "block";
}
function handleBooking(event) {
    event.preventDefault(); 
    const match = document.getElementById("match").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const quantity = parseInt(document.getElementById("quantity").value, 10);
    const totalPrice = quantity * 50000; 
    if (!match || !name || !email || isNaN(quantity)) {
        alert("Mohon lengkapi semua data pemesanan.");
        return;
    }
    const confirmation = confirm(`Anda akan memesan ${quantity} tiket untuk pertandingan ${match}. Total: Rp ${totalPrice.toLocaleString()}\nKlik OK untuk melanjutkan ke pembayaran.`);

    if (confirmation) {
        proceedToPayment(totalPrice);
    }
    
//EMAIL
}
function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('active');
}
function openEmail3() {
    window.location.href = "mailto:cuqonkbadict06@gmail.com";
}
function openEmail1() {
    window.location.href = "mailto:syaaabdilah@gmail.com";
}
function openEmail2() {
    window.location.href = "mailto:arafpratama14@gmail.com";
}

//WA
function openWhatsapp1() {
    window.location.href = "https://api.whatsapp.com/send?phone=6281223062748&text=Apakah%20tiket%20masih%20tersedia?";
}
function openWhatsapp2() {
    window.location.href = "https://api.whatsapp.com/send?phone=6285697835731&text=Apakah%20tiket%20masih%20tersedia?";
}
function openWhatsapp3() {
    window.location.href = "https://api.whatsapp.com/send?phone=6283184857676&text=Apakah%20tiket%20masih%20tersedia?";
}
function openGooglemaps() {
    window.location.href = "https://maps.app.goo.gl/x6jEgov7sdDuQqQ69";
}

//verifikasi 
function verifyEmail(email, totalPrice) {
    const verificationCode = Math.floor(100000 + Math.random() * 900000); // Generate kode verifikasi 6 digit
    alert(`Kode verifikasi telah dikirim ke email: ${email}. Masukkan kode untuk melanjutkan.`);

    const userCode = prompt("Masukkan kode verifikasi:");

    if (parseInt(userCode, 10) === verificationCode) {
        alert("Verifikasi berhasil! Melanjutkan ke pembayaran.");
        proceedToPayment(totalPrice);
    } else {
        alert("Kode verifikasi salah. Mohon coba lagi.");
    }
}

//DANA
function proceedToPayment(totalPrice) {
    alert(`Melanjutkan ke pembayaran melalui DANA untuk total Rp ${totalPrice.toLocaleString()}.`);
    window.location.href = "https://link.dana.id/m/checkout"; 
}

window.onload = function () {
    isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    updateSidebar();

    if (isAdminLoggedIn) {
        showSection("admin-panel");
        showBookings();
    } else {
        showSection("home");
    }
};
