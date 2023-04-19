

$(document).ready(function()
{	
	report();
});

function report()
{
	$.ajax({type:'GET', url:'/ledge'})
		.done(function (data)
			{
				for (i in data)
				$('tbody')
					.prepend('<tr><td class="date">'
						+ data[i].date 
						+ '</td><td class="category">' 
						+ data[i].category 
						+ '</td><td class="amount"> ₹'
						+ data[i].amount 
						+ '</td><td class="description">'
						+ data[i].description 
						+ '</td></tr>'
					);
			});
}


function filter()
{
	let option = $("select").val();
	var from_date = Number($('#from-date').val().split('-').join(''));
	var to_date = Number($('#to-date').val().split('-').join(''));
	$(".category").parent().show();

//category condition
	if (option !== "recent")
	{
		$(".category").each(function()
			{
				if(this.innerHTML !== option)
					$(this).parent().hide();
			});
		$('select').css('background-color','#675cff').css('color','white');
	}
	else
		$("select").css('background-color','#f0ffff').css('color','#000000');
	
//from date condition
	if(from_date)
	{
		$(".date").each(function()
			{
				var date = Number(this.innerHTML.split('-').join(''));
				if(date < from_date)
					$(this).parent().hide();
			});
		$('#from-date').css('background-color','#675cff').css('color','white');
	}
	else
		$("#from-date").css('background-color','#f0ffff').css('color','#000000');

//to date condition
	if(to_date)
	{
		$(".date").each(function()
			{
				var date = Number(this.innerHTML.split('-').join(''));
				if(date > to_date)
					$(this).parent().hide();
			});
		$('#to-date').css('background-color','#675cff').css('color','white');
	}
	else
		$("#to-date").css('background-color','#f0ffff').css('color','#000000');
}


