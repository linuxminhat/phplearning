let editingUserId = null;
let editingDoctorId = null;

// Load users
function loadUsers() {
    fetch(API_BASE + 'admin_get_users.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const container = document.getElementById('usersTable');
                if (data.data.length === 0) {
                    container.innerHTML = '<p>Chưa có user nào.</p>';
                    return;
                }
                
                let html = '<div class="table-container"><table><thead><tr><th>ID</th><th>Tên đăng nhập</th><th>Họ tên</th><th>Vai trò</th><th>Email</th><th>SĐT</th><th>Ngày tạo</th><th>Thao tác</th></tr></thead><tbody>';
                data.data.forEach(user => {
                    const roleText = {
                        'admin': 'Admin',
                        'doctor': 'Bác sĩ',
                        'employee': 'Nhân viên'
                    };
                    html += `<tr>
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.full_name}</td>
                        <td>${roleText[user.role] || user.role}</td>
                        <td>${user.email || ''}</td>
                        <td>${user.phone || ''}</td>
                        <td>${new Date(user.created_at).toLocaleDateString('vi-VN')}</td>
                        <td>
                            <button class="btn btn-primary" onclick="editUser(${user.id})" style="padding: 5px 10px; margin-right: 5px;">Sửa</button>
                            <button class="btn btn-danger" onclick="deleteUser(${user.id})" style="padding: 5px 10px;">Xóa</button>
                        </td>
                    </tr>`;
                });
                html += '</tbody></table></div>';
                container.innerHTML = html;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Load doctors
function loadDoctors() {
    fetch(API_BASE + 'admin_get_doctors.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const container = document.getElementById('doctorsTable');
                if (data.data.length === 0) {
                    container.innerHTML = '<p>Chưa có bác sĩ nào.</p>';
                    return;
                }
                
                let html = '<div class="table-container"><table><thead><tr><th>ID</th><th>Họ tên</th><th>Chuyên khoa</th><th>Email</th><th>SĐT</th><th>Ngày tạo</th><th>Thao tác</th></tr></thead><tbody>';
                data.data.forEach(doctor => {
                    html += `<tr>
                        <td>${doctor.id}</td>
                        <td>${doctor.full_name}</td>
                        <td>${doctor.specialty}</td>
                        <td>${doctor.email || ''}</td>
                        <td>${doctor.phone || ''}</td>
                        <td>${new Date(doctor.created_at).toLocaleDateString('vi-VN')}</td>
                        <td>
                            <button class="btn btn-primary" onclick="editDoctor(${doctor.id})" style="padding: 5px 10px; margin-right: 5px;">Sửa</button>
                            <button class="btn btn-danger" onclick="deleteDoctor(${doctor.id})" style="padding: 5px 10px;">Xóa</button>
                        </td>
                    </tr>`;
                });
                html += '</tbody></table></div>';
                container.innerHTML = html;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Edit user
function editUser(userId) {
    fetch(API_BASE + 'admin_get_users.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const user = data.data.find(u => u.id == userId);
                if (user) {
                    editingUserId = userId;
                    document.getElementById('userModalTitle').textContent = 'Sửa User';
                    document.getElementById('user_id').value = user.id;
                    document.getElementById('user_username').value = user.username;
                    document.getElementById('user_role').value = user.role;
                    document.getElementById('user_full_name').value = user.full_name;
                    document.getElementById('user_email').value = user.email || '';
                    document.getElementById('user_phone').value = user.phone || '';
                    document.getElementById('user_password').value = '';
                    openModal('userModal');
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Delete user
function deleteUser(userId) {
    if (!confirm('Bạn có chắc chắn muốn xóa user này?')) {
        return;
    }
    
    fetch(API_BASE + 'admin_delete_user.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: userId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showAlert('Xóa user thành công', 'success');
            loadUsers();
        } else {
            showAlert(data.message || 'Xóa thất bại', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showAlert('Có lỗi xảy ra', 'error');
    });
}

// Edit doctor
function editDoctor(doctorId) {
    fetch(API_BASE + 'admin_get_doctors.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const doctor = data.data.find(d => d.id == doctorId);
                if (doctor) {
                    editingDoctorId = doctorId;
                    document.getElementById('doctorModalTitle').textContent = 'Sửa Bác sĩ';
                    document.getElementById('doctor_id').value = doctor.id;
                    document.getElementById('doctor_full_name').value = doctor.full_name;
                    document.getElementById('doctor_specialty').value = doctor.specialty;
                    document.getElementById('doctor_email').value = doctor.email || '';
                    document.getElementById('doctor_phone').value = doctor.phone || '';
                    document.getElementById('doctor_address').value = doctor.address || '';
                    openModal('doctorModal');
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Delete doctor
function deleteDoctor(doctorId) {
    if (!confirm('Bạn có chắc chắn muốn xóa bác sĩ này?')) {
        return;
    }
    
    fetch(API_BASE + 'admin_delete_doctor.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: doctorId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showAlert('Xóa bác sĩ thành công', 'success');
            loadDoctors();
        } else {
            showAlert(data.message || 'Xóa thất bại', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showAlert('Có lỗi xảy ra', 'error');
    });
}

// User form submit
document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userId = document.getElementById('user_id').value;
    const data = {
        username: document.getElementById('user_username').value,
        role: document.getElementById('user_role').value,
        full_name: document.getElementById('user_full_name').value,
        email: document.getElementById('user_email').value,
        phone: document.getElementById('user_phone').value
    };
    
    if (userId) {
        // Update
        data.id = userId;
        fetch(API_BASE + 'admin_update_user.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showAlert('Cập nhật user thành công', 'success');
                closeModal('userModal');
                loadUsers();
            } else {
                showAlert(data.message || 'Cập nhật thất bại', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showAlert('Có lỗi xảy ra', 'error');
        });
    } else {
        // Create
        const password = document.getElementById('user_password').value || 'password123';
        data.password = password;
        fetch(API_BASE + 'admin_create_user.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showAlert('Tạo user thành công', 'success');
                closeModal('userModal');
                document.getElementById('userForm').reset();
                loadUsers();
            } else {
                showAlert(data.message || 'Tạo thất bại', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showAlert('Có lỗi xảy ra', 'error');
        });
    }
});

// Doctor form submit
document.getElementById('doctorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const doctorId = document.getElementById('doctor_id').value;
    const data = {
        full_name: document.getElementById('doctor_full_name').value,
        specialty: document.getElementById('doctor_specialty').value,
        email: document.getElementById('doctor_email').value,
        phone: document.getElementById('doctor_phone').value,
        address: document.getElementById('doctor_address').value
    };
    
    if (doctorId) {
        // Update
        data.id = doctorId;
        fetch(API_BASE + 'admin_update_doctor.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showAlert('Cập nhật bác sĩ thành công', 'success');
                closeModal('doctorModal');
                loadDoctors();
            } else {
                showAlert(data.message || 'Cập nhật thất bại', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showAlert('Có lỗi xảy ra', 'error');
        });
    } else {
        // Create
        fetch(API_BASE + 'admin_create_doctor.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showAlert('Tạo bác sĩ thành công', 'success');
                closeModal('doctorModal');
                document.getElementById('doctorForm').reset();
                loadDoctors();
            } else {
                showAlert(data.message || 'Tạo thất bại', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showAlert('Có lỗi xảy ra', 'error');
        });
    }
});

// Reset forms when opening modals
document.getElementById('userModal').addEventListener('click', function(e) {
    if (e.target === this) {
        document.getElementById('userForm').reset();
        document.getElementById('user_id').value = '';
        document.getElementById('userModalTitle').textContent = 'Thêm User mới';
        editingUserId = null;
    }
});

document.getElementById('doctorModal').addEventListener('click', function(e) {
    if (e.target === this) {
        document.getElementById('doctorForm').reset();
        document.getElementById('doctor_id').value = '';
        document.getElementById('doctorModalTitle').textContent = 'Thêm Bác sĩ mới';
        editingDoctorId = null;
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
    loadDoctors();
});

