<?php
ini_set('session.use_only_cookies', 1);
ini_set('session.use_strict_mode', 1);
session_start();

$serverName = "localhost"; 
$database = "QuanLyPhongTro";
$username = "sa";
$password = "123456";

// Kết nối
try {
    $conn = new PDO("sqlsrv:Server=$serverName;Database=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Nhận dữ liệu từ form
    $user = $_POST['username'];
    $pass = $_POST['password'];

    // Chuẩn bị câu lệnh SQL
    $sql = "SELECT * FROM NguoiDung WHERE TenDangNhap = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$user]);
    $nguoiDung = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($nguoiDung) {  // ✅ chỉ xử lý nếu tìm thấy user
        if ($pass === $nguoiDung['MatKhau']) {
            if ($nguoiDung['VaiTro'] === 'Admin') {
                $_SESSION['user'] = $nguoiDung['TenDangNhap'];
                $_SESSION['role'] = $nguoiDung['VaiTro'];

               header("Location: ../index.php");
                exit();
            } else {
                echo "❌ Bạn không có quyền admin.";
            }
        } else {
            echo "❌ Sai mật khẩu!";
        }
    } else {
        echo "❌ Không tìm thấy tài khoản!";
    }

} catch (PDOException $e) {
    echo "Lỗi kết nối: " . $e->getMessage();
}
?>
