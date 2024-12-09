<?php
session_start();

include('db_connect.php'); // Ensure db_connect.php establishes a valid $con connection
$msg = false;

{
if(isset($_POST['user_email'])) {
    $user_email = $_POST['user_email'];
    $user_password = $_POST['user_password'];


    $query = "SELECT * FROM user WHERE email = '$user_email' AND password = '$user_password'";
    $result = mysqli_query($con, $query);
    $count = mysqli_num_rows($result);
    if($count == 1) {
        header("Location: ../index.php");
    } else {
        $msg = "Inccorect Password";
    }
}
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Log in - Spotify</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
    <link rel="stylesheet" href="Log-In.css">
</head>
<body>
<div class="log-in--page">
    <div class="log-in">
        <div class="link--for--log-in">
            <header>
                <a href="index.html"><i class="fa-brands fa-spotify"></i></a>
            </header>

            <div class="log-in-spotify">
                <h1>Log in to Spotify</h1>
            </div>

            <form action="log-in.php" method="post">
                <div class="email-password-button">
                    <div class="form">
                        <div class="email-password">
                            <div class="email-text">
                                <label for="user_name">Email</label><br>
                                <input type="text" id="user_email" name="user_email" placeholder="Email" required autocomplete="off">
                            </div>

                            <div class="password-text">
                                <label for="user_password">Password</label><br>
                                <input type="password" id="user_password" name="user_password" placeholder="Password" required autocomplete="off">
                            </div>
                        </div>

                        <button type="submit">Log In</button>

                        <div class="check">
                            <input type="checkbox" id="remember_me" name="remember_me">
                            <label for="remember_me">Remember Me</label>
                        </div>
                    </div>
                </div>

                <div class="text-in-footer">
                    <span>Don't have an account? <a href="sign-up.php">Sign up for Spotify</a></span>
                    <?php if ($msg): ?>
                        <h3 style="color: red;"><?= htmlspecialchars($msg) ?></h3>
                    <?php endif; ?>
                </div>
            </form>
        </div>
    </div>
</div>

</body>
</html>
