google.charts.load('current',{packages:['corechart']});
google.charts.setOnLoadCallback(drawChart);


function drawChart() 
{
	var data_set = [];
	var row = [];
	$.ajax({type:'GET', url:'/draw'})
		.done(function (data)
			{
				var cats = [];
				var juice = [];

				data.category.forEach(function(e){ cats.push(e.category) });

				cats.forEach(function(e)
					{	
						data.juice[e].forEach(function(f)
						{
							var i = data_set.findIndex(function(g)
							{ return g[0]==f.date }); 
							
							row = [];
							var date = f.date
							//date = date.pop().toString()+date.pop().toString();
							if(i >= 0 )
							{
								for(cat in cats)
								{	
									 if(cat_index == cats.indexOf(e))
                                 						data_set[i][parseInt(cat_index)+1] = f.Total;
								}
							}
								
							if(i < 0)
							{	
								row.push(date);
								for(cat_index in cats)
								{	
									 if(cat_index == cats.indexOf(e))
                                 						row.push(f.Total);
                             						 else
                                 						row.push(0);
								}
								data_set.push(row);
							}
						});
					});
				data_set.sort();
				row = [];
				row.push('date');
				data_set.push(row.concat(cats));
				data_set.unshift(data_set.pop());
				console.log(data_set);
					
				// Set Data
				const g_data = google.visualization.arrayToDataTable(data_set);
				// Set Options
				const options = {
				  legend: {position: 'right',
					alignment: 'end'
				  	},
				 //orientation: 'vertical',
				  hAxis: {title: 'dates'},
				  vAxis: {title: 'spending in rupees'},
				  //backgroundColor: '#eee',
				  explorer: {axis: 'vertical',
				  	     keepInBounds: true,
					     maxZoomIn: 0.5,
					     maxZoomOut: 1
				  }
				};
				// Draw
				const chart = new google.visualization.LineChart(document.getElementById('myChart'));
				chart.draw(g_data, options);

			});
}
