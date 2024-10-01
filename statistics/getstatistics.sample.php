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

$data = [];
for ($dateOffset = 0; $dateOffset <= 31; $dateOffset++) {

    $sql = 'SELECT *, CURDATE() - INTERVAL ' . $dateOffset. ' DAY as `day` FROM `statistics` WHERE `date` BETWEEN CURDATE() - INTERVAL ' . ($dateOffset) . ' DAY AND CURDATE() - INTERVAL ' . ($dateOffset - 1) . ' DAY  GROUP BY `ip`, `pathname`';
    $res = mysqli_query($db, $sql);

    if (!$res) {
        echo '{ "error": "' . "Database Error: ".mysqli_error($db) . '" }';
        exit();
    }

    $data[$dateOffset] = [];
    while ($row = mysqli_fetch_assoc($res)) {
        $data[$dateOffset][] = $row;
    }
}

// $content = file_get_contents('./log.txt');
echo json_encode($data);
