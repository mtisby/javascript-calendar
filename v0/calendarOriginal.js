// global variables
const months = {
    Jan: 31, Feb: 28, Mar: 31, April: 30, May: 31, Jun: 30, Jul: 31, Aug: 31,
   Sep: 30, Oct: 31, Nov: 30, Dec: 31
};
const monthsList = Object.keys(months);
const daysOfWeek = [[1, "Sun"], [2, "Mon"], [3, "Tue"],  [4, "Wed"],  [5, "Thu"],  [6, "Fri"],  [7, "Sat"] ]
const daysOfWeekDict = { Sun: 1, Mon: 2, Tue: 3, Wed: 4, Thu: 5, Fri: 6, Sat: 7};
const today = Date();
const start = 1;
const monthsToShow = 6;

// debugging 
const debugging = false;
const debugging2 = false;
const debugging3 = true;

// check if leap it is a Leap Year
if (parseInt(today.slice(12, 16), 10) % 4 === 0) {
   months[Feb] = 29;
}

// functions 
function startDate(currentDate) {
   const dayInd = daysOfWeekDict[today.slice(0, 3)];
   const dateNum = parseInt(today.slice(8, 10));

   if (debugging === true) {
       console.log(`THIS IS DATE NUM: ${dateNum}`);
   }

   const remainder = dateNum % 7;
   return Math.abs(dayInd - remainder);
}

function listOfMonths() {
   currentMonth = today.slice(4, 7);
   let monthsToDisplay = [];

   let countInd = 0;
   for (var month of monthsList) {
       if (month === currentMonth) {
           if (monthsToShow <= 1) {
               monthsToDisplay.push(month);
           } else {
               for (var x = 0; x < monthsToShow; x++) {
                   if (monthsList[countInd + x] === undefined) {
                       countInd = 0;
                       console.log(monthsToShow - (x + 1))
                       for (var restart = 0; restart < (monthsToShow - x); restart++) {
                           console.log(restart);
                           monthsToDisplay.push(monthsList[restart]);
                       }
                       break
                   } else {
                       monthsToDisplay.push(monthsList[countInd + x]);
                   }
                   
               }
           }
       } 
       countInd++;
   }
   console.log(monthsToDisplay)
   return monthsToDisplay;
}

function listDates(monthsToDisplay) {
   let listOfDates = [];
   for (var i of monthsToDisplay) {
       let addlist = [];
       for (var x = 1; x <= months[i]; x++) {
           addlist.push(x);
       }
       listOfDates.push(addlist);
   }
   return listOfDates;
}

// select js objects
const calendarsContainer = document.querySelector('#calendarContainer');
const count = 1;

let startInd = startDate(today);

// get what months and their dates to display
const monthsToDisplay= listOfMonths();
const listOfDates = listDates(monthsToDisplay);

if (debugging === true) {
   console.log(listOfDates)
}

let newStartInd = 0;

// make calendar js objects
for (var x = 0; x < monthsToShow; x++) {
   if (x > 0) {
       startInd = newStartInd;
   }

   if (debugging3 === true) {
       console.log(`current month ${monthsToDisplay[x]} and ${today.slice(4,7)}`)
       console.log(`number of dates ${listOfDates[x]}`)
       console.log(`this is the new index: ${startInd}`)
   }
   //make table
   const divCalendar = document.createElement('div');
   divCalendar.classList;
   divCalendar.classList.add('calendarDiv');
   const header = document.createElement('h1');
   header.innerText = monthsToDisplay[x];
   const calendarTable = document.createElement('table');
   calendarTable.classList;
   calendarTable.classList.add('textCenter');
   header.classList;
   header.classList.add('textCenter', 'calendarHeading');

   // make table body
   const tableBody = document.createElement('tbody');

   let counting = 0;
   let numOfRows = 0;
   if (startInd >= 5) {
       numOfRows = Math.ceil(listOfDates[x][(listOfDates[x]).length - 1] / 7) + 2;
   } else if (monthsToDisplay[x] === 'Feb' && startInd != 1) {
       numOfRows = Math.ceil(listOfDates[x][(listOfDates[x]).length - 1] / 7) + 2;
   }else {
       numOfRows = Math.ceil(listOfDates[x][(listOfDates[x]).length - 1] / 7) + 1;
   }
   
   if (debugging3 === true) {
       console.log(`num of rows: ${numOfRows}`)
   }
   // make table rows and columns
   for (var i = 0; i < numOfRows; i++) {
       if (debugging3 === true) {
           console.log(`ignore`)
       }
       const calendarRow = document.createElement('tr');
       if (i === 0) {
           for (var j = 0; j < 7; j++) {
               const calendarCol = document.createElement('td');
               calendarCol.classList;
               calendarCol.classList.add('textCenter', 'cellDesign', 'tableHead');


               const cellText = document.createTextNode(daysOfWeek[j][1]);
               calendarCol.appendChild(cellText);
               calendarRow.appendChild(calendarCol);
           }
       } else if (i === 1) {
           for (var j = 0; j < 7; j++) {
               const calendarCol = document.createElement('td');
               calendarCol.classList;
               calendarCol.classList.add('textCenter', 'cellDesign');

               if (j < startInd) {
                   // keep empty
               } else if (j + 1 >= startInd) {
                   const cellText = document.createTextNode(listOfDates[x][counting]);
                   calendarCol.appendChild(cellText);
                   if (listOfDates[x][counting] === parseInt(today.slice(8, 10)) && monthsToDisplay[x] === today.slice(4,7)) {
                       calendarCol.classList;
                       calendarCol.classList.add('today');
                   } else if (listOfDates[x][counting] < parseInt(today.slice(8, 10)) && monthsToDisplay[x] === today.slice(4, 7)) {
                       calendarCol.classList;
                       calendarCol.classList.add('beforeToday');
                   } else {
                       calendarCol.classList;
                       calendarCol.classList.add('dates');
                   }

                   counting++
               }
               calendarRow.appendChild(calendarCol);
               
           }
       } else {
           if (debugging === true) {
               console.log(`this is counting ${counting}`)
           }
           for (var j = 0; j < 7; j++) {
               const calendarCol = document.createElement('td');
               calendarCol.classList;
               calendarCol.classList.add('textCenter', 'cellDesign');

               if (debugging2 === true) {
                   console.log(`this is j ${j} and this is the current date ${listOfDates[x][counting]}`)
               }


               if (counting < listOfDates[x][listOfDates[x].length - 1]) {
                   const cellText = document.createTextNode(listOfDates[x][counting]);
                   calendarCol.appendChild(cellText);

                   if (listOfDates[x][counting] === parseInt(today.slice(8, 10)) && monthsToDisplay[x] === today.slice(4, 7)) {
                       calendarCol.classList;
                       calendarCol.classList.add('today');
                   } else if (listOfDates[x][counting] < parseInt(today.slice(8, 10)) && monthsToDisplay[x] === today.slice(4, 7)) {
                       calendarCol.classList;
                       calendarCol.classList.add('beforeToday');
                   } else {
                       calendarCol.classList;
                       calendarCol.classList.add('dates');
                   }

                   counting++
               }

               if (listOfDates[x][counting] === listOfDates[x][(listOfDates[x]).length - 1]) {
                   if (debugging2 === true) {
                       console.log(`last date: ${listOfDates[x][counting]}`)
                       console.log(`this is j ${j}`)
                   }

                   if (j === 6) {
                       newStartInd = 1;
                   } else {
                       newStartInd = j + 2;
                   }
               }
   
               calendarRow.appendChild(calendarCol);
           }

           
       }

       
       tableBody.appendChild(calendarRow)
       
   }
   calendarTable.appendChild(tableBody);
   divCalendar.appendChild(header);
   divCalendar.append(calendarTable);
   calendarsContainer.appendChild(divCalendar);
   
   calendarsContainer.classList.add('flexboxCalendar');
};


