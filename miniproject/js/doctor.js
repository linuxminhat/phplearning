// Load profile data
function loadProfile() {
    fetch(API_BASE + 'get_profile.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('profile_full_name').value = data.data.full_name || '';
                document.getElementById('profile_email').value = data.data.email || '';
                document.getElementById('profile_phone').value = data.data.phone || '';
                document.getElementById('profile_address').value = data.data.address || '';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Update profile
document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const data = {
        full_name: document.getElementById('profile_full_name').value,
        email: document.getElementById('profile_email').value,
        phone: document.getElementById('profile_phone').value,
        address: document.getElementById('profile_address').value
    };
    
    fetch(API_BASE + 'update_profile.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showAlert('Cập nhật thông tin thành công', 'success');
        } else {
            showAlert(data.message || 'Cập nhật thất bại', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showAlert('Có lỗi xảy ra', 'error');
    });
});

// Load appointments
function loadAppointments() {
    fetch(API_BASE + 'get_appointments.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const container = document.getElementById('appointmentsList');
                if (data.data.length === 0) {
                    container.innerHTML = '<p>Chưa có lịch khám nào.</p>';
                    return;
                }
                
                let html = '<div class="table-container"><table><thead><tr><th>Bệnh nhân</th><th>Ngày giờ</th><th>Lý do</th><th>Trạng thái</th></tr></thead><tbody>';
                data.data.forEach(appointment => {
                    const date = new Date(appointment.appointment_date);
                    const statusColors = {
                        'pending': '#f39c12',
                        'confirmed': '#27ae60',
                        'completed': '#3498db',
                        'cancelled': '#e74c3c'
                    };
                    html += `<tr>
                        <td>${appointment.patient_name}</td>
                        <td>${date.toLocaleString('vi-VN')}</td>
                        <td>${appointment.reason}</td>
                        <td style="color: ${statusColors[appointment.status] || '#000'}">${getStatusText(appointment.status)}</td>
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

function getStatusText(status) {
    const statusMap = {
        'pending': 'Chờ xác nhận',
        'confirmed': 'Đã xác nhận',
        'completed': 'Hoàn thành',
        'cancelled': 'Đã hủy'
    };
    return statusMap[status] || status;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProfile();
    loadAppointments();
});

