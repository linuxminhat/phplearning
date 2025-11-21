<?php
require_once '../config/database.php';

session_destroy();
echo json_encode(['success' => true, 'message' => 'Đăng xuất thành công']);
?>

