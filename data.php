<?php

header('Content-Type: application/json');

$config = json_decode(file_get_contents(file_exists('config.json') ? 'config.json' : 'config.sample.json'), TRUE);

$bws = $config['networks'];    // Array('eth0');
$dfs = $config['filesystems']; // Array('/', '/home/', '/usr/', '/var/');

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
    $k = Array();
    $i = 0;
    foreach ($dfs as $d)
      {
	$tmp = split(',', trim(`df -B 1 $d | tail -1 | awk '{print $3","$4}' | tr -d '%'`));
	$k['used'][$i] = intval($tmp[0]);
	$k['free'][$i] = intval($tmp[1]);
	$i++;
      }
    echo json_encode(Array('df' => $k, 'df-devs' => $dfs));
  }

?>