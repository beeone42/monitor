
/**
 * Graph bandwidth with smoothie
 * @author BeeOne
 */

var devices = [];

function formatBw(v, precision)
{
    if (v < 1024*1024)
    {
        return (parseFloat(v / 1024).toFixed(precision) + " KB/s");
    }
    if (v < 1024*1024*1024)
    {
        return (parseFloat(v / (1024 * 1024)).toFixed(precision) + " MB/s");
    }
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
	devices[index].line1.append(new Date().getTime(), data['up'] -  devices[index].up);
	devices[index].line2.append(new Date().getTime(), data['dn'] -  devices[index].dn);
    }
    devices[index].up = data['up'];
    devices[index].dn = data['dn'];
}

// grab send and received bytes every second for every network interface
setInterval(function() {
    
    $.getJSON('data.php', function (data) {
	$.each(data, push_data);
    });
}, 1000);
