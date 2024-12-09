<?php
$host = 'localhost';
$user = 'root';
$password = ''; // Default for XAMPP
$database = 'music_user';

// Create connection
$con = mysqli_connect($host, $user, $password, $database, 3306);

// Check connection
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
