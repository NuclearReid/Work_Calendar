// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

      // For some reason i can't comment this out in the html?
// (src="https://cdn.jsdelivr.net/npm/dayjs-plugin-advanced-format@1.0.0/dayjs-plugin-advanced-format.min.js")


//figure out how to get to use 'advanced formats'
var today = dayjs();
var currentHour = dayjs();

$('#currentDay').text(today.format('[Today is ]dddd MMMM D'));

// this was just to make sure i have the current hour
// $('#currentDay').text(today.format('HH'));

var currentHour = dayjs();


$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  function setDescription(){

    // Get the id of the time-block containing the button
    var hour = $(this).parent().attr("id");
    // Get the user input from the textarea
    var description = $(this).siblings(".description").val();

    console.log("click hour: "+hour);
    console.log("click description: "+description);

    // if(description == ""){
    //   localStorage.setItem(hour, description);
    //   $(this).siblings(".description").text(description);

    // }
    // else if(description != ""){
    //   localStorage.removeItem(hour);
    //   $(this).siblings(".description").val("");
    // }
    


    localStorage.setItem(hour, description);
      $(this).siblings(".description").text(description);

    // if(description != ""){
    //   localStorage.removeItem(hour, description);
    // }
    // else if(description == ""){
    //   localStorage.setItem(hour, description);
    // }

    

  }
  

  $(".saveBtn").on("click", setDescription);
  

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
       for(var i = 9; i<18; i++){
        var calenderHour = $('#'+i+' .hour').text();
        var calenderHourInt = parseInt(calenderHour);
        if (calenderHour.includes('PM') && calenderHourInt != 12) { 
          calenderHourInt += 12;
        }
        
        currentHour = today.format('HH');
        var currentHourInt = parseInt(currentHour);
        

        if(calenderHourInt < currentHourInt){
          $('#'+i).removeClass("future").addClass("past");
        }
        else if(calenderHourInt == currentHourInt){
          $('#'+i).removeClass("future").addClass("present");
        }
        else if(calenderHourInt > currentHourInt){
          console.log('this is just for fun');
        }
       }

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  function getDescription(){
    $(".time-block").each(function() {
      var hour = $(this).attr("id");
      var description = localStorage.getItem(hour);
      $(this).find(".description").text(description);
    });
  };



  // function removeDescription(){

  // }
  // $(".saveBtn").on("dblclick", removeDescription);


  getDescription();
  //
  // TODO: Add code to display the current date in the header of the page.
});
