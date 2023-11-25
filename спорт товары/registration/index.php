<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "userse";

// Создание подключения
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Проверка соединения
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstname = $_POST['firstName'];
    $lastname = $_POST['lastName'];
    $tel = $_POST['tel'];
    $password = $_POST['password'];

    // Хеширование пароля
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // SQL запрос для вставки данных в таблицу
    $sql = "INSERT INTO users (firstName, lastName, tel, password)
    VALUES ('$firstname', '$lastname',  '$tel', '$hashed_password')";

    if (mysqli_query($conn, $sql)) {
        // Если данные успешно добавлены, перенаправляем на другую страницу
        header("Location: ../index.html");
        exit();
    } else {
        echo "Ошибка: " . $sql . "<br>" . mysqli_error($conn);
    }
}

// Закрытие соединения
mysqli_close($conn);
?>
