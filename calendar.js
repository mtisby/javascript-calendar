// global variables
const months = {
     Jan: 31, Feb: 28, Mar: 31, April: 30, May: 31, Jun: 30, Jul: 31, Aug: 31,
    Sep: 30, Oct: 31, Nov: 30, Dec: 31
};
const daysOfWeek = [[1, "Sun"], [2, "Mon"], [3, "Tue"],  [4, "Wed"],  [5, "Thu"],  [6, "Fri"],  [7, "Sat"] ]
const daysOfWeekDict = { Sun: 1, Mon: 2, Tue: 3, Wed: 4, Thu: 5, Fri: 6, Sat: 7};
const today = Date();
const start = 1;
const monthsToShow = 1;

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
    currentMonth = months[today.slice(12, 16)];
    monthsList = Object.keys(months);
    let monthsToDisplay = [];

    let countInd = 0;
    for (var month of monthsList) {
        if (month === currentMonth) {
            if (monthsToShow <= 1) {
                monthsToDisplay.push(month);
            } else {
                for (var x = 0; x <= monthsToShow; x++) {
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
    for (var month of monthsToDisplay) {
        for (var x = 1; x >= months[month]; x++) {
            listOfDates.push(x);
        }
    }
    return listOfDates;
}

// select js objects
const calendarsContainer = document.querySelector('#calendarContainer');
const count = 1;

const startInd = startDate(today);

//
const monthsToDisplay= listOfMonths();
const listOfDates = listDates();
// make calendar js objects
for (var x = 0; x < monthsToShow ; x++){
    //make table
    const calendarTable = document.createElement('table');

    // make table body
    const tableBody = document.createElement('tbody');

    // make table rows and columns
    for (var i = 0; i < 6; i++) {
        const calendarRow = document.createElement('tr');
        if (i === 0) {
            for (var j = 0; j < 7; j++) {
                
                const calendarCol = document.createElement('td');
                const cellText = document.createTextNode(daysOfWeek[j][1]);
                calendarCol.appendChild(cellText);
                calendarRow.appendChild(calendarCol);
            }
        } else {
            counting = 0;
            for (var j = 0; j < 7; j++) {
                const calendarCol = document.createElement('td');
                if (i === 1 && startInd >= j) {
                    const cellText = document.createTextNode(listOfDates[counting]);
                }
                
                

                counting++;
                calendarCol.appendChild(cellText);
                calendarRow.appendChild(calendarCol);
            }
        }
        tableBody.appendChild(calendarRow)
    }

    calendarTable.appendChild(tableBody);
    calendarsContainer.appendChild(calendarTable);
};


// // make table rows and columns
// for (var i = 0; i < 6; i++) {
//     const calendarRow = document.createElement('tr');
    
//     for (var j = 0; j < 7; j++) {
//         console.logo
//         const calendarCol = document.createElement('td');
//         const cellText = document.createTextNode("heyyyy");

        
//         calendarCol.appendChild(cellText);
//         calendarRow.appendChild(calendarCol);
//     }
//     tableBody.appendChild(calendarRow)
// }

// calendarTable.appendChild(tableBody);
// calendarsContainer.appendChild(calendarTable);



// // functions
// // make the rows for the calendar
// function makeRows(index) {
//     if (index = 0) {
//         const tableHead = document.createElement('th');
//         table.appendChild(tableHead);

//         for (var i = 0; i <= 6; i++) {
//             const tableData = document.createElement('td');
//             tableData.innerHTML = daysOfWeek[i];
//             tableHead.appendChild(tableData);
//         }

//     } else {
//         const calendarRow = document.createElement('tr');
//     }
// }

// // make the columns for each row
// function makeColumns(counter, startInd, lastDay) {
//     for (var day = 1; day <= 7; day++) {
//         if (counter >= startInd && counter <= lastDay) {
//             const tableData = document.createElement('td');
//             tableData.innerHTML = counter;
//         } else {
//             const tableData = document.createElement('td');
//         }
//     }

// }

// // main