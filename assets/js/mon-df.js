
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
    
    var chart = new Highcharts.Chart({
    chart: {
	type: 'bar',
	renderTo: 'hdd',
	
	backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
            stops: [
		[0, '#2a2a2b'],
		[1, '#3e3e40']
            ]
	},
	style: {
            fontFamily: "'Unica One', sans-serif",
	},
	plotBorderColor: '#606063',
    },

	title: {
	    text: 'Free Space',
	    style: {
		color: '#E0E0E3',
		textTransform: 'uppercase',
		fontSize: '20px'
	    }
	},

	colors: ['rgba(0, 255, 0, 0.6)', 'rgba(255, 0, 255, 0.6)', "#2b908f", "#f45b5b", "#90ee7e", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
		 "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
	legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
	background2: '#505053',
	dataLabelsColor: '#B0B0B3',
	textColor: '#E0E0E0',
	contrastTextColor: '#F0F0F3',
	maskColor: 'rgba(255,255,255,0.3)',


	xAxis: {
	    categories: ['/dev/sda', '/dev/sdb'],
	    gridLineColor: '#707073',
	    labels: {
		style: {
		    color: '#E0E0E3'
		}
	    },
	    lineColor: '#707073',
	    minorGridLineColor: '#505053',
	    tickColor: '#707073',
	    title: {
		style: {
		    color: '#A0A0A3'
		    
		}
	    }
	},
	yAxis: {
	    min: 0, max: 100,
	    title: { text: '', style: { color: '#A0A0A3' } },
	    gridLineColor: '#707073',
	    labels: { style: { color: '#E0E0E3' } },
	    lineColor: '#707073',
	    minorGridLineColor: '#505053',
	    tickColor: '#707073',
	    tickWidth: 1
	},
	tooltip: {
	    backgroundColor: 'rgba(0, 0, 0, 0.85)',
	    style: { color: '#F0F0F0' }
	},
	legend: { reversed: true },
	plotOptions: { series: { stacking: 'normal' } },
	series: [{
	    name: 'Free',
	    data: [16, 58]
	}, {
	    name: 'Used',
	    data: [84, 42]
	}]
    });
});
