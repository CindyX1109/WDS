//get the current date and time 
var currentHour = moment().hours(); 
console.log(currentHour); 
var currentDate = moment().format("dddd MMMM Do, YYYY"); 
$("#currentDay").text(currentDate); 

//create an array for the hours in a business day 
var businessHours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"]

//implement some containers for each hour of the day
for (var i = 0; i < 9; i++)
{
var content = $('<div>', {
    id: "event-container-" + businessHours[i],
    class: 'row time-block',
    title: 'Event-Container'
}).appendTo('.container');
}

//add the hour of the day 
for (var j = 0; j < 9; j++)
{
var eventText = $("<div>")
 .addClass("col-md-1 hour")
 .text(businessHours[j]);
 eventText.appendTo("#event-container-" + businessHours[j]); 

 //add input box for event content
 var content = $('<textarea>', {
    id: "input-" + businessHours[j],
    class: 'col-md-10 description',
}).appendTo("#event-container-" + businessHours[j]);

//add button
 var abtn = $("<button><i>")
 .addClass("btn saveBtn col-md-1");
 abtn.appendTo("#event-container-" + businessHours[j]); 
 
}

function backGroundColourChanger()
{
    //loop through the business hours array 
    $('.time-block').each(function () {

        //get just the number 
        var eventHour = parseInt($(this).attr('id').replace(/\D/g, ""));
        console.log(eventHour); 

        //convert to 24hr clock
        if (eventHour < 8)
        {
             eventHour += 12;    
        }
        //change the classes of the text containers to reflect the current hour
        if (eventHour < currentHour)
        {
        $(this).addClass('past'); 
        }
        else if (eventHour === currentHour) {
            $(this).removeClass('past'); 
            $(this).addClass('present');
        }
        else {
            $(this).removeClass('present'); 
            $(this).removeClass('past'); 
            $(this).addClass('future');
        }

    })
}

//set items from local storage
var SetItems = function (){

    for (var q = 0; q < businessHours.length; q++)
    {
        var item = localStorage.getItem("event-container-" + businessHours[q]); 
        if (item)
        {
            $("#input-" + businessHours[q]).val(item); 
        }
    }
}

//run the commands 
backGroundColourChanger(); 
SetItems(); 

//save button function commits changes to local storage 
$('.saveBtn').on('click', function () {

    var value = $(this).siblings(".description").val(); 
    var time = $(this).parent().attr('id'); 
    console.log(time); 
    console.log(value); 

    if (value)
        localStorage.setItem(time,value); 
    }); 