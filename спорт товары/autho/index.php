<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "userse";
$conn = mysqli_connect($servername, $username, $password,$dbname);
if ($conn->connect_error) {
    die("Connection failed: " . mysqli_connect_error()); 
}
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка соединения
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

// Получение данных из формы
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstname = $_POST['firstName'];
    $password = $_POST['password'];

    // Запрос к базе данных для получения пользователя
    $sql = "SELECT * FROM users WHERE firstName='$firstname'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Пользователь найден
        $row = $result->fetch_assoc();
        $hashed_password = $row['password'];

        // Проверка пароля
        if (password_verify($password, $hashed_password)) {
            // Авторизация успешна
            session_start(); // Начать сессию
            $_SESSION['user'] = $firstname; // Сохранить информацию о пользователе в сессии

            // Перенаправление на другую страницу
            header("Location: ../index.html");
            exit();
        } else {
            echo "Неправильный никнейм или пароль";
        }
    } else {
        echo "Неправильный никнейм или пароль";
    }
}
if(isset($_SESSION['user_id'])) {
    // Use your database connection logic here
    $userId = $_SESSION['user_id'];
    
    // Modify your SQL query to fetch only the data for the authenticated user
    $sql = "SELECT id, username, email FROM users WHERE id = :user_id";
    // Execute the query with the user_id parameter
    // (Make sure to use prepared statements to prevent SQL injection)
    
    // Fetch and output the result as JSON
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
} else {
    // Return an empty array or an error message if the user is not authenticated
    echo json_encode([]);
}
// Закрытие соединения
$conn->close();
?>
