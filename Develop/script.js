// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

      // For some reason i can't comment this out in the html?
// (src="https://cdn.jsdelivr.net/npm/dayjs-plugin-advanced-format@1.0.0/dayjs-plugin-advanced-format.min.js")


//figure out how to get to use 'advanced formats'

//get the dayjs library
var today = dayjs();
var currentHour = dayjs();
var currentHour = dayjs();

//set the text at the top of the calender to Today ie 'Today is Tuesday, December 19'
$('#currentDay').text(today.format('[Today is ]dddd MMMM D'));




$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

///////////////////////////////////////////////////////////////////////////////////////////////////
  // Basically how this function works
  // When the save button is clicked, the code looks at the id of the parent element
  // (that id is then saved under hour. It'll be the key that'll be used to retrieve the different data sets)
  // Also when the button is clicked, the code will grab the value of the text in the .description class (the <textarea>) of that id
  // this string will then be saved with the variable description
  // these two variables are then saved into the local storage
  // the description is stored with the key hour

  // how it works with an analogy. It makes sense in my head but i'm having a hard time writing it down
  // when the save button on row 9am is clicked, a key is created labeled '9' 
  // the program looks at what is in the <textarea> of <div id='9'> and saves that text/string
  // that string is put into a symbolic box that can only be accessed with the '9 key'
  // when I change the text in row 9am, the code will take 'key 9' unlock, the box, remove the string, and place the new string into the box

  //each <div> gets it's own key made for it that unlocks it's coresponding box.

  function setDescription(){
    //goes to the parent of the clicked button than selects the attribute which is the id
    //example, click the save button for the row 9am, get's the data in row 9am and stores that in 'hour'
    var hour = $(this).parent().attr("id");
    // Gets the textarea for all the siblings on the button that use the class name .description
    // Gets the value/the text that is stored in that <textarea> and stores it under description
    var description = $(this).siblings(".description").val();

    //tells me the hour the save button was clicked for ie 9am
    console.log("click hour: "+hour);
    //will be used to tell me the text that is in the description
    console.log("click description: "+description);

    // these comments are how i'm thinking of this
    // stores the key and the value that key can retreive
    // the key is 'hour' which is what the row that the user clicked save on
    // the hour 'key' then opens the lock for what's in that row (the description)
    localStorage.setItem(hour, description);
    //sets the text in the <textarea> as the stored description/text
      $(this).siblings(".description").text(description);  

  }
  
// the click event to set each description
  $(".saveBtn").on("click", setDescription);
  

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?


    //this for loop is set up as 9-18 because that represents the hours in 24hr time. (ie 9am-5pm)
       for(var i = 9; i<18; i++){
        //I changed the Ids in the html to just be a number so it would make it easier for this for loop to select the correct id
        //this grabs the text that is in that <div> with the id of i 
        var calenderHour = $('#'+i).text();


        console.log(calenderHour+" calenderHour value");


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
