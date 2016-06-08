<?php

header('Content-Type: application/json');

$devs = Array('eth0', 'eth1');

foreach ($devs as $d)
  {
    $j[$d]['up'] = trim(@file_get_contents('/sys/class/net/'.$d.'/statistics/tx_bytes'));
    $j[$d]['dn'] = trim(@file_get_contents('/sys/class/net/'.$d.'/statistics/rx_bytes'));
  }
echo json_encode($j)

?>