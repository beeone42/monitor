
/**
 * Graph bandwidth with smoothie
 * @author BeeOne
 */

var devices = [];

function formatBw(vv, precision)
{
    var v = parseFloat(vv); // add *8 to convert in bits/s
    var res = '???';

    if (v < 1024*1024)
    {
        res = (parseFloat(v / 1024).toFixed(precision) + " KB/s");
    }
    else if (v < 1024*1024*1024)
    {
        res = (parseFloat(v / (1024 * 1024)).toFixed(precision) + " MB/s");
    }
    else
    {
        res = (parseFloat(v / (1024 * 1024 * 1024)).toFixed(precision) + " GB/s");
    }
    while (res.length < 11)
	res = ' ' + res;
    return (res);
}

function graph_bw(d, target)
{
    devices[d] = {};

    devices[d].smoothie = new SmoothieChart({
	grid: { strokeStyle:'rgb(128, 128, 128)', fillStyle:'rgb(0, 0, 0)',
		sharpLines:false, lineWidth: 1 },
	labels: { fillStyle:'rgb(255, 255, 255)', fontSize:12 },
	yMaxFormatter: formatBw,
	yMinFormatter: function(min, precision) { return ("") },
	minValue: 0
    });
    
    devices[d].smoothie.streamTo(document.getElementById(target), 1000);

    // Data
    devices[d].line1 = new TimeSeries();
    devices[d].line2 = new TimeSeries();
    
    devices[d].up = 0;
    devices[d].dn = 0;

    devices[d].sup = 0;
    devices[d].sdn = 0;

    // Add to SmoothieChart
    devices[d].smoothie.addTimeSeries(devices[d].line1, { strokeStyle:'rgb(0, 255, 0)', fillStyle:'rgba(0, 255, 0, 0.4)', lineWidth:3 });
    devices[d].smoothie.addTimeSeries(devices[d].line2, { strokeStyle:'rgb(255, 0, 255)', fillStyle:'rgba(255, 0, 255, 0.3)', lineWidth:3 });
}

function push_data(index, data)
{
    if (devices[index] == undefined)
	return ;
    if (devices[index].up != 0) // not the first value
    {
	devices[index].sup = data['up'] -  devices[index].up;
	devices[index].sdn = data['dn'] -  devices[index].dn;
	devices[index].line1.append(new Date().getTime(), devices[index].sup);
	devices[index].line2.append(new Date().getTime(), devices[index].sdn);
	$("#txt-" + index).html( '<span class="upload">UP:</span> ' + formatBw(devices[index].sup, 2)
			       + ' :: '
				 + '<span class="download">DN:</span> ' + formatBw(devices[index].sdn, 2));
    }
    devices[index].up = data['up'];
    devices[index].dn = data['dn'];
}

function create_bw_div(devname, v)
{
    $("#bws").append('<canvas net="' + devname + '" id="bw-' + devname + '" width="800px" height="100"></canvas>');
    $("#bws").append('<pre id="txt-' + devname + '">---</pre>');

    graph_bw(devname, 'bw-' + devname);
}

// first grab to create divs for each network interface


$(function () {
    //graph_bw('eth0', 'bw-eth0');
    //graph_bw('eth1', 'bw-eth1');

    $.getJSON('data.php?t=bw', function (data) {
	$.each(data['bw'], create_bw_div);
    });



});

// grab send and received bytes every second for every network interface
setInterval(function() {
    $.getJSON('data.php?t=bw', function (data) {
	$.each(data['bw'], push_data);
    });
}, 1000);
