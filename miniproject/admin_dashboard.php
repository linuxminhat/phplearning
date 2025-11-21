<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Admin - HTPLUS</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Dashboard Admin - HTPLUS</h1>
            <button class="btn btn-secondary" onclick="logout()">Đăng xuất</button>
        </div>

        <div class="tabs">
            <button class="tab active" onclick="switchTab('users-tab')">Quản lý Users</button>
            <button class="tab" onclick="switchTab('doctors-tab')">Quản lý Bác sĩ</button>
        </div>

        <!-- Users Tab -->
        <div id="users-tab" class="tab-content active">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2>Quản lý Users</h2>
                <button class="btn btn-primary" onclick="openModal('userModal')">+ Thêm User mới</button>
            </div>
            <div id="usersTable"></div>
        </div>

        <!-- Doctors Tab -->
        <div id="doctors-tab" class="tab-content">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2>Quản lý Bác sĩ</h2>
                <button class="btn btn-primary" onclick="openModal('doctorModal')">+ Thêm Bác sĩ mới</button>
            </div>
            <div id="doctorsTable"></div>
        </div>
    </div>

    <!-- User Modal -->
    <div id="userModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="userModalTitle">Thêm User mới</h2>
                <span class="close" onclick="closeModal('userModal')">&times;</span>
            </div>
            <form id="userForm">
                <input type="hidden" id="user_id">
                <div class="form-group">
                    <label for="user_username">Tên đăng nhập:</label>
                    <input type="text" id="user_username" required>
                </div>
                <div class="form-group">
                    <label for="user_password">Mật khẩu:</label>
                    <input type="password" id="user_password">
                    <small style="color: #666;">(Để trống nếu không muốn đổi mật khẩu khi cập nhật)</small>
                </div>
                <div class="form-group">
                    <label for="user_role">Vai trò:</label>
                    <select id="user_role" required>
                        <option value="employee">Nhân viên</option>
                        <option value="doctor">Bác sĩ</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="user_full_name">Họ và tên:</label>
                    <input type="text" id="user_full_name" required>
                </div>
                <div class="form-group">
                    <label for="user_email">Email:</label>
                    <input type="email" id="user_email">
                </div>
                <div class="form-group">
                    <label for="user_phone">Số điện thoại:</label>
                    <input type="text" id="user_phone">
                </div>
                <button type="submit" class="btn btn-primary">Lưu</button>
                <button type="button" class="btn btn-secondary" onclick="closeModal('userModal')">Hủy</button>
            </form>
        </div>
    </div>

    <!-- Doctor Modal -->
    <div id="doctorModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="doctorModalTitle">Thêm Bác sĩ mới</h2>
                <span class="close" onclick="closeModal('doctorModal')">&times;</span>
            </div>
            <form id="doctorForm">
                <input type="hidden" id="doctor_id">
                <div class="form-group">
                    <label for="doctor_full_name">Họ và tên:</label>
                    <input type="text" id="doctor_full_name" required>
                </div>
                <div class="form-group">
                    <label for="doctor_specialty">Chuyên khoa:</label>
                    <input type="text" id="doctor_specialty" required>
                </div>
                <div class="form-group">
                    <label for="doctor_email">Email:</label>
                    <input type="email" id="doctor_email">
                </div>
                <div class="form-group">
                    <label for="doctor_phone">Số điện thoại:</label>
                    <input type="text" id="doctor_phone">
                </div>
                <div class="form-group">
                    <label for="doctor_address">Địa chỉ:</label>
                    <textarea id="doctor_address"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Lưu</button>
                <button type="button" class="btn btn-secondary" onclick="closeModal('doctorModal')">Hủy</button>
            </form>
        </div>
    </div>

    <script src="js/app.js"></script>
    <script src="js/admin.js"></script>
</body>
</html>

