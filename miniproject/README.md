# HTPLUS Appointment System

Ứng dụng đăng ký lịch khám bệnh cho nhân viên công ty HTPLUS

## Công nghệ sử dụng

- **Frontend**: HTML/CSS, JavaScript, AJAX
- **Backend**: PHP thuần
- **Database**: MySQL (XAMPP)

## Cài đặt

### 1. Cài đặt XAMPP

- Tải và cài đặt XAMPP từ https://www.apachefriends.org/
- Khởi động Apache và MySQL trong XAMPP Control Panel

### 2. Cấu hình Database

1. Mở phpMyAdmin (http://localhost/phpmyadmin)
2. Import file `database/init.sql` để tạo database và tables
3. Hoặc chạy SQL script trong file `database/init.sql`

### 3. Cấu hình Project

1. Copy thư mục project vào `C:\xampp\htdocs\` hoặc cấu hình virtual host
2. Nếu đặt trong `htdocs`, truy cập: `http://localhost/miniproject/`

### 4. Cấu hình Database Connection

Kiểm tra file `config/database.php` và đảm bảo thông tin kết nối đúng:
- DB_HOST: localhost
- DB_USER: root
- DB_PASS: (để trống nếu dùng XAMPP mặc định)
- DB_NAME: htplus_appointment

## Tài khoản mẫu

Sau khi import database, bạn có thể đăng nhập với các tài khoản sau:

### Admin
- Username: `admin`
- Password: `password123`

### Nhân viên
- Username: `employee1`
- Password: `password123`

### Bác sĩ
- Username: `doctor1`
- Password: `password123`

## Chức năng

### Nhân viên (Employee)
- Đăng nhập
- Chỉnh sửa thông tin cá nhân
- Đăng ký lịch khám với bác sĩ
- Xem lịch khám đã đăng ký

### Bác sĩ (Doctor)
- Đăng nhập
- Chỉnh sửa thông tin cá nhân
- Xem lịch khám đã được đăng ký

### Admin
- Đăng nhập
- Quản lý Users (CRUD)
- Quản lý Bác sĩ (CRUD)

## Cấu trúc thư mục

```
miniproject/
├── api/              # API endpoints
├── config/           # Cấu hình database
├── css/              # Stylesheets
├── database/         # SQL scripts
├── js/               # JavaScript files
├── index.php         # Trang đăng nhập
├── employee_dashboard.php
├── doctor_dashboard.php
└── admin_dashboard.php
```

## Lưu ý

- Tất cả mật khẩu mặc định là `password123`
- Trong môi trường production, cần bảo mật tốt hơn
- Đảm bảo PHP version >= 7.0
- Cần extension mysqli được bật trong PHP

