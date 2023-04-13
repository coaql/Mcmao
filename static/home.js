statement = {
		'amount':'',
		'date':'',
		'description':'',
		'category':''
	}

$(document).ready(function()
{	$('#add-stat').on('submit',function(e)
	{	statement.amount = $('#Amount').val();
		statement.date = $('#Date').val();
		statement.category = $('#Category').val();
		statement.description = $('#Description').val();

		$.ajax({ data: statement, type :'POST', url :'/ledge'})
			.done(function(data)
			{
				$('tbody')
					.prepend('<tr><td>'
						+ data[0].date 
						+ '</td><td>' 
						+ data[0].category 
						+ '</td><td>'
						+ data[0].amount 
						+ '</td></tr>'
					);
				
				//alert(data.length);
			});
		e.preventDefault();
	});
	//report();
});

/* 

function report()
{
	$.ajax({type:'GET', url:'/ledge'})
		.done(function (data)
			{
				for (i in data)
				$('tbody')
					.prepend('<tr><td>'
						+ data[i].date 
						+ '</td><td>' 
						+ data[i].category 
						+ '</td><td>'
						+ data[i].amount 
						+ '</td></tr>'
					);
			});
}


*/
