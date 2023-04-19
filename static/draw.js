google.charts.load('current',{packages:['corechart']});
google.charts.setOnLoadCallback(drawChart);

particulars = []

function draw_data()
{
	$.ajax({type:'GET', url:'/draw'})
		.done(function (data)
			{
				console.log(data);
			/*	for(i in data)
				{
					var row = [];
					row.push(data.date);
					row.push(data.date);
					row.push(data.date);
				}
			*/

			});
		
}


function drawChart() {
// Set Data
const data = google.visualization.arrayToDataTable([
  ['Price', 'Size', 'Varaity','cats','dogs'],
  [50,7,2,0,0],[60,8,5,0,0],[70,8,6,0,0],[80,9,6,0,0],[90,9,6,0,0],
  [100,9,7,0,0],[110,10,0,0,0],[120,11,8,0,0],
  [130,14,9,0,0],[140,14,11,0,0],[150,15,9,0,0]
]);
// Set Options
const options = {
  legend: {position: 'bottom'},
  hAxis: {title: 'Square Meters'},
  vAxis: {title: 'Price in Millions'}
  
};
// Draw
const chart = new google.visualization.LineChart(document.getElementById('myChart'));
chart.draw(data, options);
}
