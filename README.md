# 05 Third-Party APIs: Work Day Scheduler

In this project, I have created a simple work calendar/planner. The calendar has the current day at the top and depending on the current time, the hour row will be gray (in the past), red (present), or green(in the future). The user can type in the row, and click the save button. Their input will be stored in the local memory and will be displayed when the page is refreshed.


## Basics on how this application works


### Setting the local storage
How the save button/setting the local storage works: When the user puts text in the row and then clicks the save button, I look at the button's parent id and set that as a variable. 

Then I look in the  < textarea >  and see if the user put anything in it. This is accomplished by looking at the siblings of the button that have the class '.description' and I get it's data by using .val();

I then store both of these variables in the local storage with the 'parent id' as the key and the description.val() as the data/string stored.


### Getting the data from the local storage

When the page loads, I run a loop looking for each class called '.time-block', then look for the 'id' of the < div > with the .time-block class and store this as a variable. 

I then create a variable that gets the string that was stored under that id from the local storage.

Next I use the .find() method to search for anything with class="description" (all of the < textarea >) and I set the text of that < textarea > to the string that was stored in local storage under  the Id of that section.


### How I update my colors

To start with, I changed the id of each time block to just be 9, 10, 11, 12 etc. This made it easier to work with my for loop.

In the loop, I target each id and look for the text within it with '.text()'. This is easy because the only text in each < div > is the time.

Once I have that string, I convert it into an int with '.parseInt()'

Now I need to convert that int from 12 hour time to 24 hour time. To accomplish this, I just looked to see if there was ('PM') in the original string data I grabbed at the start and if there is a 'pm' then I just added 12 hours to the int  I created. The only exception was if it was 12pm. (If I didn't exclude 12 then it would make 12pm be midnight).

Now that I have the calendar's times, I used 'dayjs()' to get the current time. 

I originally have each div class be colored for the future but then I check it all to see if it is in the future, present or past.

Now I just need to compare my int to the current time. less? I set the class to past. Equal? I set the class to present. I don't worry about checking if it's greater cause every class is listed as future from the get go.

An example of what the application will look like when it's 12:08pm
![what the application looks like](./Assets/images/Screenshot%202023-12-21%20120815.png)


