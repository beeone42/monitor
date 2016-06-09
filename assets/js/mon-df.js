
function formatDf(vv, precision)
{
    var v = parseFloat(vv); // add *8 to convert in bits/s
    var res = '???';

    if (v < 1024*1024*1024)
    {
        res = (parseFloat(v / (1024 * 1024)).toFixed(precision) + " MB");
    }
    else  if (v < 1024*1024*1024*1024)
    {
        res = (parseFloat(v / (1024 * 1024 * 1024)).toFixed(precision) + " GB");
    }
    else
    {
        res = (parseFloat(v / (1024 * 1024 * 1024 * 1024)).toFixed(precision) + " TB");
    }
    return (res);
}


$(function () {

/**
 * Dark theme for Highcharts JS
 * @author Torstein Honsi
 */
    
    // Load the fonts
    Highcharts.createElement('link', {
	href: 'https://fonts.googleapis.com/css?family=Unica+One',
	rel: 'stylesheet',
	type: 'text/css'
    }, null, document.getElementsByTagName('head')[0]);
    
    var chart = new Highcharts.Chart(Highcharts.merge(Highcharts.theme, {
	chart: {
	    type: 'bar',
	    renderTo: 'hdd',
	    height: 200
	},

	tooltip: {
	    formatter: function () {
                return this.series.name + ': ' + '<b>' + formatDf(this.y, 0) + '</b>';
	    },
	},
	title: {
	    text: 'Free Space',
	},

	colors: ['rgba(0, 255, 0, 0.6)', 'rgba(255, 0, 255, 0.6)'],

	xAxis: {
	    categories: [],
	},
	yAxis: {
	    min: 0,
	    title: { text: '' }
	},
	legend: { reversed: true },
	plotOptions: { series: { stacking: 'normal', pointWidth: 40 } },
	series: [{
	    name: 'Free',
	    data: []
	}, {
	    name: 'Used',
	    data: []
	}]
    }));

    $.getJSON('data.php?t=df', function (data) {
	chart.xAxis[0].setCategories(data['df-devs']);
	chart.series[0].update({data: data['df']['free']})
	chart.series[1].update({data: data['df']['used']})
	chart.setSize(chart.chartWidth, 150 + (data['df-devs'].length * 50));
	chart.redraw();
    });


    setInterval(function() {
    $.getJSON('data.php?t=df', function (data) {
	chart.series[0].update({data: data['df']['free']})
	chart.series[1].update({data: data['df']['used']})
    });
}, 10000);

    
});
