<?php
header('Content-Type: application/json');

// گرفتن فایل و متن
$file = $_FILES['image'] ?? null;
$text = $_POST['text'] ?? '';

if (!$file) {
    echo json_encode(['error' => 'هیچ فایلی ارسال نشده']);
    exit;
}

// اعتبارسنجی ساده فایل
$allowedTypes = ['image/jpeg','image/png','image/gif'];
if (!in_array($file['type'], $allowedTypes)) {
    echo json_encode(['error' => 'فرمت فایل معتبر نیست']);
    exit;
}

// تبدیل فایل به base64
$fileData = base64_encode(file_get_contents($file['tmp_name']));

// آماده کردن payload برای API Gemini
$payload = [
    "instances" => [
        [
            "input_image" => $fileData,
            "input_text" => $text
        ]
    ]
];

// تماس با API
$ch = curl_init("https://gemini.googleapis.com/v1/models/gemini:generateMessage");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer AIzaSyDzJEG1ucF4umvMyxn0Xqe6JbQO1SiACNE",
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200) {
    echo json_encode(['error' => 'خطا در ارسال به API']);
    exit;
}

// برگردوندن پاسخ API به JS
echo $response;
exit;
