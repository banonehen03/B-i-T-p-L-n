<?php
session_start();
session_unset();  // Xóa tất cả session
session_destroy(); // Hủy session

// Quay lại form đăng nhập
header("Location: LoginForm/login.html");
exit();
