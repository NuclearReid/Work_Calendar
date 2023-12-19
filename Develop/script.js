// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


//figure out how to get to use 'advanced formats'

//get the dayjs library
var today = dayjs();
var currentHour = dayjs();
var currentHour = dayjs();



$(function () {
  // Basically how this function works
  // When the save button is clicked, the code looks at the id of the parent element
  // (that id is then saved under hour. It'll be the key that'll be used to retrieve the different data sets)
  // Also when the button is clicked, the code will grab the value of the text in the .description class (the <textarea>) of that id
  // this string will then be saved with the variable description
  // these two variables are then saved into the local storage
  // the description is stored with the key hour

  // how it works with an analogy. (It makes sense in my head but i'm having a hard time writing it down)
  // when the save button on row 9am is clicked, a key is created labeled '9' (i'll call it '9 key')
  // the program looks at what is in the <textarea> of <div id='9'> and saves that text/string
  // that string is put into a symbolic box that can only be accessed with the '9 key'
  // when I change the text in row 9am and click on the save button, the code will take 'key 9', unlock the box, remove the string, and place the new string into the box
  // this new string is what will be saved/displayed

  //each <div> gets it's own key made for it and that key unlocks it's coresponding box.

  function setDescription(){

    //this is creating a key that will be assigned to each <div> 
    var hour = $(this).parent().attr("id");
    // Gets the string/value within the <textarea> of the selected <div>
        //this string will be saved as 'description'
    var description = $(this).siblings(".description").val();

    // example how these two variables work with the analogy: the user clicks on the row corresponding to 9am
      // using the DOM (branching from the button clicked), a key is created (hour) that is based off the <div>'s id
      // 'description' is getting the string that is in <textarea> and storing it's value


      /////////////this is just for debugging////////////
    //tells me the hour the save button was clicked for ie 9am
    console.log("click hour: "+hour);
    //will be used to tell me the text that is in the description
    console.log("click description: "+description);


    //this just stores the data I collected into the local storage
    //using the analogy from before: 'hour' is the key and 'description' is the box that I'm putting the string in
    localStorage.setItem(hour, description);

  }
  
// the click event to set each description
  $(".saveBtn").on("click", setDescription);
  

////////////////////////////////////////////////////////////////////////////////////////////

//this is where I'm setting the colors to show if the time is in the past, persent, or future
  function setColors(){
      // this for loop is set up as 9-18 because that represents the hours, 9am-5pm, in 24hr time. 
        // (this could be done with dayjs but i found this way to be pretty easy)
        for(var i = 9; i<18; i++){
          // (I changed the <div> id's in the html to just be a number so it would make it easier for this for loop to select the id)

          // this grabs the text that is in that <div> with the id of i 
          // this works because the only text content in the html for the selected <div> is the hour (ie 9am)
          var calendarHour = $('#'+i).text();


          // this is just used for debugging
          console.log(calendarHour+" calenderHour value");

          // this converts that text content in the html into an int. (strips the am & pm)
          var calendarHourInt = parseInt(calendarHour);

          // used to confirm that i'm getting just a number back
          console.log('calendarHourInt '+ calendarHourInt);


          // This if statement converts the time from 12 hr to 24 hr time
          // Basically if the text content in htlm includes 'pm' and isn't 12, 12 hours is added to it. 
            // for example: 1pm drops the 'pm' and adds 12. So, 1pm becomes 13
          if (calendarHour.includes('PM') && calendarHourInt != 12) { 
            calendarHourInt += 12;
          }
          
          // gets the current hour with dayjs
          currentHour = today.format('HH');

          // logs the current hour, just used to confirm the time/helps with debugging
          console.log('currentHour '+currentHour);

          
          //initially the class of every <div> is set to 'future'
            //ie <div id="12" class="row time-block future">

          // if the calendarHour is less than the current hour, it's in the past
          // I remove the 'future' class and replace it with the 'past' class
          if(calendarHourInt < currentHour){
            $('#'+i).removeClass("future").addClass("past");
          }
          // if the calendarHour is the same as the currentHourInt than that means that's the current hour
          // i replace the 'future' class with 'present'
          else if(calendarHourInt == currentHour){
            $('#'+i).removeClass("future").addClass("present");
          }
          
          // Because every <div> is already set to future, i don't need to check if anything is in the future


          // *side note, the user will have to refresh the page to have the classes change.
              //basically, when the hour ticks over, the user will have to refresh to see the new colors (same if the app is left on over night)
        }
      }

  
  // This will get the text that was set/stored with the function setDescription() and display it when the page is loaded
  function getDescription(){

    //runs a loop for every <div> with the class 'time-block' (basically every <div>)
    $(".time-block").each(function() {

      // creates the variable hour that looks for the 'id' in the <div class='time-block'> (ie 12, 13, 14 etc )
      var hour = $(this).attr("id");

      // creates a variable that looks for anything in the local storage that is stored within each id (hour)
      var description = localStorage.getItem(hour);

      //find's the class '.description' and sets the text to whatever is in the local storage
      $(this).find(".description").text(description);
    });
  };

  //this runs when the app starts to display the correct colors, and all the data that is in the local storage
  setColors();
  getDescription();
  
  //set the text at the top of the calender to Today ie 'Today is Tuesday, December 19'
  $('#currentDay').text(today.format('[Today is ]dddd MMMM D'));
});
