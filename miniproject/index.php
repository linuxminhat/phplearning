<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng nhập - HTPLUS Appointment System</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="login-container">
        <div class="container">
            <h1>HTPLUS Appointment System</h1>
            <form id="loginForm" onsubmit="event.preventDefault(); login();">
                <div class="form-group">
                    <label for="username">Tên đăng nhập:</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Mật khẩu:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">Đăng nhập</button>
            </form>
            <div style="margin-top: 20px; padding: 15px; background: #e8f4f8; border-radius: 5px; font-size: 12px;">
                <strong>Thông tin đăng nhập mẫu:</strong><br>
                Admin: username: admin, password: password123<br>
                Nhân viên: username: employee1, password: password123<br>
                Bác sĩ: username: doctor1, password: password123
            </div>
        </div>
    </div>
    <script src="js/app.js"></script>
</body>
</html>

