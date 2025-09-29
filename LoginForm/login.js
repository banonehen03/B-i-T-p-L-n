// Chờ cho toàn bộ trang được tải xong
document.addEventListener('DOMContentLoaded', function() {
    // Định nghĩa tài khoản admin - TUYỆT ĐỐI KHÔNG DÙNG CÁCH NÀY CHO WEBSITE THẬT
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = '123456'; // Đặt mật khẩu của bạn ở đây

    // Lấy form đăng nhập
    const loginForm = document.getElementById('login-form');

    // Thêm sự kiện "submit" cho form
    loginForm.addEventListener('submit', function(event) {
        // Ngăn form gửi đi và tải lại trang
        event.preventDefault(); 

        // Lấy giá trị từ các ô input
        const usernameInput = document.getElementById('username').value;
        const passwordInput = document.getElementById('password').value;

        // Kiểm tra thông tin đăng nhập
        if (usernameInput === ADMIN_USERNAME && passwordInput === ADMIN_PASSWORD) {
            // Nếu đúng, đánh dấu là đã đăng nhập và chuyển hướng
            alert('Đăng nhập thành công!');
            sessionStorage.setItem('isLoggedIn', 'true'); // Lưu trạng thái đăng nhập
            window.location.href = '../index.html'; // Chuyển đến trang quản lý
        } else {
            // Nếu sai, thông báo lỗi
            alert('Tên tài khoản hoặc mật khẩu không chính xác.');
        }
    });
});