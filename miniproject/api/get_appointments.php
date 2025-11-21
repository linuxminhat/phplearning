<?php
require_once '../config/database.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Chưa đăng nhập']);
    exit;
}

$conn = getDBConnection();

if ($_SESSION['role'] === 'employee') {
    $stmt = $conn->prepare("SELECT a.id, a.appointment_date, a.reason, a.status, d.full_name as doctor_name, d.specialty 
                           FROM appointments a 
                           JOIN doctors d ON a.doctor_id = d.id 
                           WHERE a.user_id = ? 
                           ORDER BY a.appointment_date DESC");
    $stmt->bind_param("i", $_SESSION['user_id']);
} else if ($_SESSION['role'] === 'doctor') {
    // Get doctor record linked to this user
    $doctor_stmt = $conn->prepare("SELECT id FROM doctors WHERE user_id = ?");
    $doctor_stmt->bind_param("i", $_SESSION['user_id']);
    $doctor_stmt->execute();
    $doctor_result = $doctor_stmt->get_result();
    
    if ($doctor_result->num_rows > 0) {
        $doctor = $doctor_result->fetch_assoc();
        $doctor_id = $doctor['id'];
        
        $stmt = $conn->prepare("SELECT a.id, a.appointment_date, a.reason, a.status, u.full_name as patient_name 
                               FROM appointments a 
                               JOIN users u ON a.user_id = u.id 
                               WHERE a.doctor_id = ? 
                               ORDER BY a.appointment_date DESC");
        $stmt->bind_param("i", $doctor_id);
    } else {
        // If no doctor record linked, show empty
        echo json_encode(['success' => true, 'data' => []]);
        $doctor_stmt->close();
        $conn->close();
        exit;
    }
    $doctor_stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Không có quyền truy cập']);
    exit;
}

$stmt->execute();
$result = $stmt->get_result();

$appointments = [];
while ($row = $result->fetch_assoc()) {
    $appointments[] = $row;
}

echo json_encode(['success' => true, 'data' => $appointments]);
$stmt->close();
$conn->close();
?>

