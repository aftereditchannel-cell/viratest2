<?php
// upload.php

// فقط POST اجازه داره
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// بررسی فایل
if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => 'No image uploaded']);
    exit;
}

// گرفتن متن اختیاری
$text = isset($_POST['text']) ? $_POST['text'] : '';

// مسیر موقت فایل
$imagePath = $_FILES['image']['tmp_name'];
$imageName = $_FILES['image']['name'];

// خواندن فایل برای ارسال به API
$imageData = file_get_contents($imagePath);

// آماده‌سازی فرم دیتای Multipart
$boundary = uniqid();
$delimiter = '-------------' . $boundary;

$postData = '';
$postData .= "--$delimiter\r\n";
$postData .= "Content-Disposition: form-data; name=\"image\"; filename=\"$imageName\"\r\n";
$postData .= "Content-Type: " . mime_content_type($imagePath) . "\r\n\r\n";
$postData .= $imageData . "\r\n";
$postData .= "--$delimiter\r\n";
$postData .= "Content-Disposition: form-data; name=\"text\"\r\n\r\n";
$postData .= $text . "\r\n";
$postData .= "--$delimiter--\r\n";

// API Key امن
$apiKey = "AIzaSyDzJEG1ucF4umvMyxn0Xqe6JbQO1SiACNE";

// درخواست به Gemini API
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://gemini.googleapis.com/v1/models/gemini:generateMessage");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $apiKey",
    "Content-Type: multipart/form-data; boundary=$delimiter"
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);

$response = curl_exec($ch);
$err = curl_error($ch);
curl_close($ch);

header('Content-Type: application/json');

if ($err) {
    echo json_encode(['error' => $err]);
} else {
    echo $response;
}
?>
