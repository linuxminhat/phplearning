<?php
require_once '../config/database.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    echo json_encode(['success' => false, 'message' => 'Không có quyền truy cập']);
    exit;
}

$conn = getDBConnection();
$result = $conn->query("SELECT id, full_name, specialty, email, phone, address, created_at FROM doctors ORDER BY created_at DESC");

$doctors = [];
while ($row = $result->fetch_assoc()) {
    $doctors[] = $row;
}

echo json_encode(['success' => true, 'data' => $doctors]);
$conn->close();
?>

