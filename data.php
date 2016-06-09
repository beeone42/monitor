<?php

header('Content-Type: application/json');

$bws = Array('eth0', 'eth1');
$dfs = Array('/', '/space/');

if ($_REQUEST['t'] == 'bw')
  {
    foreach ($bws as $d)
      {
	$j[$d]['up'] = trim(@file_get_contents('/sys/class/net/'.$d.'/statistics/tx_bytes'));
	$j[$d]['dn'] = trim(@file_get_contents('/sys/class/net/'.$d.'/statistics/rx_bytes'));
      }
    echo json_encode(Array('bw' => $j));
  }

if ($_REQUEST['t'] == 'df')
  {
    foreach ($dfs as $d)
      {
	$k[$d] = trim(`df $d | tail -1 | awk '{print $5}' | tr -d '%'`);
      }
    echo json_encode(Array('df' => $j));
  }

?>