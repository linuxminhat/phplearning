<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Bác sĩ - HTPLUS</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Dashboard Bác sĩ</h1>
            <button class="btn btn-secondary" onclick="logout()">Đăng xuất</button>
        </div>

        <div class="card">
            <h3>Chỉnh sửa thông tin cá nhân</h3>
            <form id="profileForm">
                <div class="form-group">
                    <label for="profile_full_name">Họ và tên:</label>
                    <input type="text" id="profile_full_name" required>
                </div>
                <div class="form-group">
                    <label for="profile_email">Email:</label>
                    <input type="email" id="profile_email">
                </div>
                <div class="form-group">
                    <label for="profile_phone">Số điện thoại:</label>
                    <input type="text" id="profile_phone">
                </div>
                <div class="form-group">
                    <label for="profile_address">Địa chỉ:</label>
                    <textarea id="profile_address"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Cập nhật thông tin</button>
            </form>
        </div>

        <div class="card">
            <h3>Lịch khám đã đăng ký</h3>
            <div id="appointmentsList"></div>
        </div>
    </div>

    <script src="js/app.js"></script>
    <script src="js/doctor.js"></script>
</body>
</html>

