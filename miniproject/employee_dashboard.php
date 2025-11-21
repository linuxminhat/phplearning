<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Nhân viên - HTPLUS</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Dashboard Nhân viên HTPLUS</h1>
            <button class="btn btn-secondary" onclick="logout()">Đăng xuất</button>
        </div>

        <div class="tabs">
            <button class="tab active" onclick="switchTab('profile-tab')">Thông tin cá nhân</button>
            <button class="tab" onclick="switchTab('appointment-tab')">Đăng ký lịch khám</button>
            <button class="tab" onclick="switchTab('my-appointments-tab')">Lịch khám của tôi</button>
        </div>

        <!-- Profile Tab -->
        <div id="profile-tab" class="tab-content active">
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
        </div>

        <!-- Appointment Tab -->
        <div id="appointment-tab" class="tab-content">
            <div class="card">
                <h3>Đăng ký lịch khám</h3>
                <form id="appointmentForm">
                    <div class="form-group">
                        <label for="appointment_doctor">Chọn bác sĩ:</label>
                        <select id="appointment_doctor" required>
                            <option value="">-- Chọn bác sĩ --</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="appointment_date">Ngày và giờ khám:</label>
                        <input type="datetime-local" id="appointment_date" required>
                    </div>
                    <div class="form-group">
                        <label for="appointment_reason">Lý do khám:</label>
                        <textarea id="appointment_reason" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-success">Đăng ký lịch khám</button>
                </form>
            </div>
        </div>

        <!-- My Appointments Tab -->
        <div id="my-appointments-tab" class="tab-content">
            <div class="card">
                <h3>Lịch khám của tôi</h3>
                <div id="appointmentsList"></div>
            </div>
        </div>
    </div>

    <script src="js/app.js"></script>
    <script src="js/employee.js"></script>
</body>
</html>

