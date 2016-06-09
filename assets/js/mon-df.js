
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
    },
	
	title: {
	    text: 'Free Space',
	},

	colors: ['rgba(0, 255, 0, 0.6)', 'rgba(255, 0, 255, 0.6)'],

	xAxis: {
	    categories: ['/dev/sda', '/dev/sdb'],
	},
	yAxis: {
	    min: 0, max: 100,
	    title: { text: '' }
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
    }));
    
});
