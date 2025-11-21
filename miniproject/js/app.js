// API Base URL
const API_BASE = 'api/';

// Check session on page load
document.addEventListener('DOMContentLoaded', function() {
    checkSession();
});

// Check if user is logged in
function checkSession() {
    fetch(API_BASE + 'check_session.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // User is logged in, redirect based on role
                const currentPage = window.location.pathname;
                if (currentPage.includes('index.php') || currentPage.endsWith('/')) {
                    redirectToDashboard(data.user.role);
                }
            } else {
                // User is not logged in
                const currentPage = window.location.pathname;
                if (!currentPage.includes('index.php') && !currentPage.endsWith('/')) {
                    window.location.href = 'index.php';
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Redirect to dashboard based on role
function redirectToDashboard(role) {
    switch(role) {
        case 'admin':
            window.location.href = 'admin_dashboard.php';
            break;
        case 'doctor':
            window.location.href = 'doctor_dashboard.php';
            break;
        case 'employee':
            window.location.href = 'employee_dashboard.php';
            break;
    }
}

// Login function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        showAlert('Vui lòng điền đầy đủ thông tin', 'error');
        return;
    }
    
    fetch(API_BASE + 'login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showAlert('Đăng nhập thành công', 'success');
            setTimeout(() => {
                redirectToDashboard(data.role);
            }, 500);
        } else {
            showAlert(data.message || 'Đăng nhập thất bại', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showAlert('Có lỗi xảy ra', 'error');
    });
}

// Logout function
function logout() {
    fetch(API_BASE + 'logout.php')
        .then(response => response.json())
        .then(data => {
            window.location.href = 'index.php';
        })
        .catch(error => {
            console.error('Error:', error);
            window.location.href = 'index.php';
        });
}

// Show alert message
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'error' ? 'error' : 'success'}`;
    alertDiv.textContent = message;
    
    const container = document.querySelector('.container');
    container.insertBefore(alertDiv, container.firstChild);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Open modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Tab switching
function switchTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked tab
    event.target.classList.add('active');
}

