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
const monthsToShow = 3;

// check if leap it is a Leap Year
if (parseInt(today.slice(12, 16), 10) % 4 === 0) {
    months[Feb] = 29;
}

// functions 
function startDate(currentDate) {
    const dayInd = daysOfWeekDict[today.slice(0, 3)];
    const dateNum = parseInt(today.slice(8, 10));

    if (dateNum > 7) {
        const remainder = dateNum % dayInd;
        return 7 - remainder + 1; 
        // returns starting index
    } else {
        if (dayInd / dateNum === 0) {
            return dayInd;
        } else {
            return Math.abs(dayInd - dateNum) + 1
        }
    }
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
                    monthsToDisplay.push(monthsList[countInd + x]);
                }
            }
        } 
        countInd++;
    }

    return monthsToDisplay;
}

function listDates(monthsToDisplay) {
    let listOfDates = [];
    console.log(monthsToDisplay);
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

console.log(listOfDates)
let newStartInd = 0;

// make calendar js objects
for (var x = 0; x < monthsToShow; x++){
    if (x > 0) {
        startInd = newStartInd;
        console.log(startInd + 'this is newInd')
    }

    //make table
    const divCalendar = document.createElement('div');
    const header = document.createElement('h1');
    header.innerText = monthsToDisplay[x];
    const calendarTable = document.createElement('table');
    calendarTable.classList;
    calendarTable.classList.add('table', 'textCenter');
    header.classList;
    header.classList.add('textCenter');

    // make table body
    const tableBody = document.createElement('tbody');

    let counting = 0;
    // make table rows and columns
    for (var i = 0; i < 6; i++) {
        const calendarRow = document.createElement('tr');
        if (i === 0) {
            for (var j = 0; j < 7; j++) {
                const calendarCol = document.createElement('td');
                calendarCol.classList;
                calendarCol.classList.add('textCenter');


                const cellText = document.createTextNode(daysOfWeek[j][1]);
                calendarCol.appendChild(cellText);
                calendarRow.appendChild(calendarCol);
            }
        } else {
            for (var j = 0; j < 7; j++) {
                const calendarCol = document.createElement('td');
                calendarCol.classList;
                calendarCol.classList.add('textCenter');
                calendarCol.classList;
                calendarCol.classList.add('table')

                console.log('I am j: ' + j)
                console.log('I am start: ' + startInd)
                if (i === 1 && startInd >= j) {
                    if (counting <= listOfDates[x][listOfDates[x].length - 1]) {
                        const cellText = document.createTextNode(listOfDates[x][counting]);
                        calendarCol.appendChild(cellText);
                    } else {
                        const cellText = document.createTextNode('I should be empty');
                        calendarCol.appendChild(cellText);
                    }
                } else if (i > 1 && startInd >= j){
                    if (counting < listOfDates[x][listOfDates[x].length - 1]) {
                        const cellText = document.createTextNode(listOfDates[x][counting]);
                        calendarCol.appendChild(cellText);
                    } else if (counting === listOfDates[x][listOfDates[x].length - 1]) {
                        // figure out how to save starting index
                        newStartInd = j + 1;
                        console.log('this is new index: '+j)
                    }
                }
                
                

                counting++;
                // calendarCol.appendChild(cellText);
                calendarRow.appendChild(calendarCol);
                
            }
            
        }

        
        tableBody.appendChild(calendarRow)
        
    }
    calendarTable.appendChild(tableBody);
    divCalendar.appendChild(header);
    divCalendar.append(calendarTable);
    calendarsContainer.appendChild(divCalendar);
    
};


