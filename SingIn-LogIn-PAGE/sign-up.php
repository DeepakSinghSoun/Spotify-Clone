<?php
session_start();

include('db_connect.php'); // Ensure db_connect.php establishes a valid $con connection
$msg = false;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_name =$_POST['user_name'];
    $user_email =$_POST['user_email'];
    $user_password = $_POST['user_password'];
    $user_re_password = $_POST['user_re_password'];

    if (!empty($user_name) && !empty($user_email) && !empty($user_password) && !is_numeric($user_name)) {
            if ($user_password === $user_re_password) {

                // Use a prepared statement to prevent SQL injection
                $query = "INSERT INTO user (user, email, password) VALUES ('$user_name', '$user_email', '$user_password')";
                mysqli_query($con, $query);

                    header("Location: log-in.php");
                    
            } else {
                $msg = "Passwords do not match.";
            }
        }
    }
?>





<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign up - Spotify</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
    <link rel="stylesheet" href="Sign-Up.css">
</head>
<body>
    <header>
        <div class="logo">
            <a href="index.html"><i class="fa-brands fa-spotify"></i></a>
        </div>
    </header>

    <section>
        <div class="sign-up-to-start-listening">
            <header>
                <h1>Sign up to start listening</h1>
            </header>

            <form action="" method="post">
                <div class="form">
                    <label for="user_name">Name</label>
                    <input type="text" class="email-text" name="user_name" placeholder="Enter Your Username..." required>

                    <label for="user_email">Email</label>
                    <input type="email" class="email-text" name="user_email" placeholder="name@domain.com" required>

                    <label for="user_password">Password</label>
                    <input type="password" class="email-text" name="user_password" placeholder="Enter Your Password..." required>

                    <label for="user_re_password">Re-Password</label>
                    <input type="password" class="email-text" name="user_re_password" placeholder="Enter Your Re-Password..." required>
                    
                    <button type="submit" value="sign-in">Sign Up</button>

                    <div class="check">
                        <input type="checkbox" id="remember_me">
                        <label for="remember_me">Remember Me</label>
                    </div>
                </div>

                <div class="link--for--sign-up">
                    <span>
                        Already have an account? <a href="log-in.php">Log in here.</a>
                    </span>

                    <?php if ($msg): ?>
                        <h3 style="color: red;"><?= htmlspecialchars($msg) ?></h3>
                    <?php endif; ?>
                </div>
            </form>
        </div>
    </section>
</body>
</html>
