document.addEventListener("DOMContentLoaded", function () {


// All variables are here
    var todayBtn = document.querySelector("#todayBtn");         // TODAY <button>
    var tomorrowBtn = document.querySelector("#tomorrowBtn");   // TOMORROW <button>
    var weekBtn = document.querySelector("#weekBtn");           // WEEK <button>
    var allBtn = document.querySelector("#allBtn");             // ALL <button>
    var tasksToDo = document.querySelector(".tasks-to-do");     // TASKS TO DO <ul>

// all required arrays
    var all = [
        {
            name: "umyj naczynia",
            date: "2018-04-01",
            priority: 3
        },
        {
            name: "ustaw nowe zadanie",
            date: "2018-04-02",
            priority: 4
        },
        {
            name: "ustaw nowe zadanie",
            date: "2018-05-01",
            priority: 5
        }];
    var today = [];
    var tomorrow = [];
    var week = [];
    var userCats = [];

// Button "ALL" functionality
    allBtn.addEventListener("click", function () {

        // clearing <ul>
        while (tasksToDo.firstChild) {
            tasksToDo.removeChild(tasksToDo.firstChild);
        }

        // creating <li>, <div> inside and pushing elements into them.
        for (var i = 0; i < all.length; i++) {

            // creating new element <li>
            var newLi = document.createElement("li");
            // taking elements from object sent by user (name, date, priority)
            var allElements = Object.values(all[i]);
            // assigning new <li> to <ul>
            tasksToDo.appendChild(newLi);

            // creating new divs in <li> and putting user information in divs
            for (var j = 0; j < 4; j++) {
                var newDiv = document.createElement("div");
                tasksToDo.children[i].append(newDiv);
                if (j !== 0) {
                    newDiv.innerText = (allElements[j - 1]);
                }
            }
        }
    });


// Button "TODAY" functionality
    todayBtn.addEventListener("click", function () {
        // executing 'today task check' function
        checkTodayArray();
        // clearing <ul>
        while (tasksToDo.firstChild) {
            tasksToDo.removeChild(tasksToDo.firstChild);
        }

        // creating <li>, <div> inside and pushing elements into them.
        for (var i = 0; i < today.length; i++) {

            // creating new element <li>
            var newLi = document.createElement("li");
            // taking elements from object sent by user (name, date, priority)
            var todayElements = Object.values(today[i]);
            // assigning new <li> to <ul>
            tasksToDo.appendChild(newLi);

            // creating new divs in <li> and putting user information in divs
            for (var j = 0; j < 4; j++) {
                var newDiv = document.createElement("div");
                tasksToDo.children[i].append(newDiv);
                if (j !== 0) {
                    newDiv.innerText = (todayElements[j - 1]);
                }
            }
        }
    });


// Button "TOMORROW" functionality


// Button "WEEK" functionality


// Today Array filling
    function checkTodayArray () {

        // getting current date/time
        var currentDate = new Date();

        // day variable (need to ad "0" if day is less than 10)
        var dd = "";
        if (currentDate.getDate() < 10) {
            dd = "0" + currentDate.getDate();
        } else {
            dd = currentDate.getDate();
        }

        // month variable (need to ad "0" if month is less than 10)
        var mm = "";
        if (currentDate.getMonth() + 1 < 10) {
            mm = "0" + (currentDate.getMonth() + 1);
        } else {
            mm = currentDate.getMonth();
        }

        // year variable
        var yyyy = currentDate.getFullYear();

        // our date combined
        todayDate = (yyyy + "-" + mm + "-" + dd);

        // clearing array before filling it
        today = [];
        // looping through ALL array to find today's tasks
        for (var i = 0; i < all.length; i++) {
            if (all[i].date === todayDate) {
                today.push(all[i]);
            }
        }
    }


// Tomorrow Array filling


// Week Array filling

});