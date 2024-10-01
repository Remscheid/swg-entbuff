<?php

$_db_host = ""; // Fill out with real values
$_db_port = "";
$_db_name = "";
$_db_user = "";
$_db_pass = "";

$db = mysqli_connect($_db_host . ":" . $_db_port, $_db_user, $_db_pass);
if (!$db) {
    echo '{ "error": "Database Connect Error" }';
    exit();
}

mysqli_select_db($db, $_db_name);
if (!mysqli_query($db, "SET CHARACTER SET utf8")) {
    echo '{ "error": "Setting charset failed" }';
    exit();
}

$json = file_get_contents('php://input');
$array = json_decode($json, true);

$date = date(DATE_ATOM);
$ip = $_SERVER['REMOTE_ADDR'];
$href = $array['href'];
$pathname = $array['pathname'];
$search = $array['search'];

if (strpos($search, 'notrack=1') !== false) {
    return '{}';
}

// DB

$sql = 'INSERT INTO `statistics` (ip, href, pathname, `search`) VALUES ('
    . '"' . mysqli_real_escape_string($db, $ip) . '", '
    . '"' . mysqli_real_escape_string($db, $href) . '", '
    . '"' . mysqli_real_escape_string($db, $pathname) . '", '
    . '"' . mysqli_real_escape_string($db, $search) . '"'
    . ')';
$query = mysqli_query($db, $sql);

if (!$query) {
    echo '{ "error": "' . "Database Error: ".mysqli_error($db) . '" }';
    exit();
}

// TXT

$row = $date . "\t" . $ip . "\t" . $href . "\t" . $pathname . "\t" . $search . "\n";
file_put_contents('./log.txt', $row, FILE_APPEND);

// CSV

$row = $date . ";" . $ip . ";" . $href . ";" . $pathname . ";" . $search . "\n";
file_put_contents('./log.csv', $row, FILE_APPEND);

echo '{}';