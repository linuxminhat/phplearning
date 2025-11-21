<?php
require_once '../config/database.php';

header('Content-Type: application/json');

$conn = getDBConnection();
$result = $conn->query("SELECT id, full_name, specialty, email, phone FROM doctors ORDER BY full_name");

$doctors = [];
while ($row = $result->fetch_assoc()) {
    $doctors[] = $row;
}

echo json_encode(['success' => true, 'data' => $doctors]);
$conn->close();
?>

