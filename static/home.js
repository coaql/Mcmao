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
		var msg = "Amount : " + statement.amount + "\n" +
		 	 "Category : " + statement.category + "\n" +
		 	 "on Date : " + statement.date + "\n" +
		 	 "for : " + statement.description

		if (confirm(msg))
		{
			$.ajax({ data: statement, type :'POST', url :'/ledge'})
			$('#add-stat > input').val('');
			$('#add-stat > select').val('');
			report();
		}
		e.preventDefault();
	});
	report();
});


function report()
{
 
	$.ajax({data:{"recent":"1"},type:'GET', url:'/ledge'})
		.done(function (data)
			{
				$('tbody > tr').remove();
				for (i in data)
				$('tbody')
					.append('<tr><td class="recent-date">'
						+ data[i].date 
						+ '</td><td class="recent-category">' 
						+ data[i].category 
						+ '</td><td class="recent-amount">₹'

						+ data[i].amount 
						+ '</td></tr>'
					);
			});
}


