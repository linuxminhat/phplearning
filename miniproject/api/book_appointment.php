<?php
require_once '../config/database.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'employee') {
    echo json_encode(['success' => false, 'message' => 'Không có quyền truy cập']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $doctor_id = $data['doctor_id'] ?? 0;
    $appointment_date = $data['appointment_date'] ?? '';
    $reason = $data['reason'] ?? '';
    
    if (empty($doctor_id) || empty($appointment_date)) {
        echo json_encode(['success' => false, 'message' => 'Vui lòng điền đầy đủ thông tin']);
        exit;
    }
    
    $conn = getDBConnection();
    $stmt = $conn->prepare("INSERT INTO appointments (user_id, doctor_id, appointment_date, reason) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("iiss", $_SESSION['user_id'], $doctor_id, $appointment_date, $reason);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Đăng ký lịch khám thành công']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Đăng ký thất bại']);
    }
    
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
?>

