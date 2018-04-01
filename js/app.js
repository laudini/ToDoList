document.addEventListener("DOMContentLoaded", function () {

// All variables are here
    var todayBtn = document.querySelector("#todayBtn");         // TODAY <button>
    var tomorrowBtn = document.querySelector("#tomorrowBtn");   // TOMORROW <button>
    var weekBtn = document.querySelector("#weekBtn");           // WEEK <button>
    var allBtn = document.querySelector("#allBtn");             // ALL <button>
    var tasksToDo = document.querySelector(".tasks-to-do");     // TASKS TO DO <ul>

// all required arrays
    var all = [];
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
                    newDiv.innerText = (allElements[j-1]);
                }
            }
        }
    });


});