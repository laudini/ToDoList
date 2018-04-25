document.addEventListener("DOMContentLoaded", function () {


// All variables are here
        var hamburger = document.querySelector(".hamb");
        var leftMenuLis = document.getElementsByClassName("menu-list");
        var leftCol = document.querySelector(".main-col-1");
        var rightCol = document.querySelector(".main-col-2");
        var todayBtn = document.querySelector("#todayBtn");         // TODAY <button>
        var tomorrowBtn = document.querySelector("#tomorrowBtn");   // TOMORROW <button>
        var weekBtn = document.querySelector("#weekBtn");           // WEEK <button>
        var allBtn = document.querySelector("#allBtn");             // ALL <button>
        var tasksToDo = document.querySelector(".tasks-to-do");     // TASKS TO DO <ul>
        var currentCategoryChosen = 0;
        var categoriesTasks = [];
        var openHamburger = false;

// all required arrays
        var all = [];
        var today = [];
        var tomorrow = [];
        var week = [];
        var userCats = [];

// HAMBURGER

        hamburger.addEventListener("click", function () {
            leftCol.classList.toggle("wide-menu");
            rightCol.style.filter = rightCol.style.filter != "blur(10px)" ? "blur(10px)" : "blur(0)";
            var catButtons = document.getElementsByClassName("categ-list");

            if (openHamburger === false) {
                todayBtn.innerText = "TODAY";
                tomorrowBtn.innerText = "TOMORROW";
                weekBtn.innerText = "UPCOMING 7 DAYS";
                allBtn.innerText = "ALL TASKS";
                openHamburger = true;
                for (var i = 0; i < catButtons.length; i++) {
                    catButtons[i].innerText = userCats[i];
                }
            } else {
                todayBtn.innerText = "T";
                tomorrowBtn.innerText = "T";
                weekBtn.innerText = "7";
                allBtn.innerText = "A";
                openHamburger = false;
                for (var i = 0; i < catButtons.length; i++) {
                    catButtons[i].innerText = userCats[i][0];
                }
            }
            todayBtn.classList.toggle("wide-today-btn");
            tomorrowBtn.classList.toggle("wide-tomorrow-btn");
            weekBtn.classList.toggle("wide-week-btn");
            allBtn.classList.toggle("wide-all-btn");

            for (var i = 0; i < catButtons.length; i++) {
                catButtons[i].classList.toggle("wide-all-btn");
            }
        });

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
        tomorrowBtn.addEventListener("click", function () {
            // executing 'today task check' function
            checkTomorrowArray();
            // clearing <ul>
            while (tasksToDo.firstChild) {
                tasksToDo.removeChild(tasksToDo.firstChild);
            }

            // creating <li>, <div> inside and pushing elements into them.
            for (var i = 0; i < tomorrow.length; i++) {

                // creating new element <li>
                var newLi = document.createElement("li");
                // taking elements from object sent by user (name, date, priority)
                var tommorowElements = Object.values(tomorrow[i]);
                // assigning new <li> to <ul>
                tasksToDo.appendChild(newLi);

                // creating new divs in <li> and putting user information in divs
                for (var j = 0; j < 4; j++) {
                    var newDiv = document.createElement("div");
                    tasksToDo.children[i].append(newDiv);
                    if (j !== 0) {
                        newDiv.innerText = (tommorowElements[j - 1]);
                    }
                }
            }
        });

// Button "WEEK" functionality
        weekBtn.addEventListener("click", function () {
            // executing 'week task check' function
            checkWeekArray();
            // clearing <ul>
            while (tasksToDo.firstChild) {
                tasksToDo.removeChild(tasksToDo.firstChild);
            }

            // creating <li>, <div> inside and pushing elements into them.
            for (var i = 0; i < week.length; i++) {

                // creating new element <li>
                var newLi = document.createElement("li");

                // taking elements from object sent by user (name, date, priority)
                var weekElements = Object.values(week[i]);

                // assigning new <li> to <ul>
                tasksToDo.appendChild(newLi);

                // creating new divs in <li> and putting user information in divs
                for (var j = 0; j < 4; j++) {
                    var newDiv = document.createElement("div");
                    tasksToDo.children[i].append(newDiv);
                    if (j !== 0) {
                        newDiv.innerText = (weekElements[j - 1]);
                    }
                }
            }
        });


// Today Array filling
        function checkTodayArray() {

            // getting current date/time
            var currentDate = new Date();

            // day variable (need to add "0" if day is less than 10)
            var dd = "";
            if (currentDate.getDate() < 10) {
                dd = "0" + currentDate.getDate();
            } else {
                dd = currentDate.getDate();
            }

            // month variable (need to add "0" if month is less than 10)
            var mm = "";
            if (currentDate.getMonth() + 1 < 10) {
                mm = "0" + (currentDate.getMonth() + 1);
            } else {
                mm = currentDate.getMonth();
            }

            // year variable
            var yyyy = currentDate.getFullYear();

            // our date combined
            var todayDate = (yyyy + "-" + mm + "-" + dd);

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
        function checkTomorrowArray() {

            // getting current date/time
            var currentDate = new Date();
            // switching date + 24hours
            currentDate.setDate(currentDate.getDate() + 1);

            // day variable (need to add "0" if day is less than 10)
            var dd = "";
            if (currentDate.getDate() < 10) {
                dd = "0" + currentDate.getDate();
            } else {
                dd = currentDate.getDate();
            }

            // month variable (need to add "0" if month is less than 10)
            var mm = "";
            if (currentDate.getMonth() + 1 < 10) {
                mm = "0" + (currentDate.getMonth() + 1);
            } else {
                mm = currentDate.getMonth();
            }

            // year variable
            var yyyy = currentDate.getFullYear();

            // our date combined
            var todayDate = (yyyy + "-" + mm + "-" + dd);

            // clearing array before filling it
            tomorrow = [];
            // looping through ALL array to find today's tasks
            for (var i = 0; i < all.length; i++) {
                if (all[i].date === todayDate) {
                    tomorrow.push(all[i]);
                }
            }
        }


// Week Array filling
        function checkWeekArray() {

            // getting current date/time
            var currentDate = new Date();
            var sevenDays = [];

            // this for loop creates an array with next seven days date
            for (var k = 0; k < 7; k++) {

                // day variable (need to add "0" if day number is less than 10)
                var dd = "";
                if (currentDate.getDate() < 10) {
                    dd = "0" + currentDate.getDate();
                } else {
                    dd = currentDate.getDate();
                }

                // month variable (need to add "0" if month number is less than 10)
                var mm = "";
                if (currentDate.getMonth() + 1 < 10) {
                    mm = "0" + (currentDate.getMonth() + 1);
                } else {
                    mm = currentDate.getMonth();
                }

                // year variable
                var yyyy = currentDate.getFullYear();

                // our date combined
                var todayDate = (yyyy + "-" + mm + "-" + dd);

                sevenDays.push(todayDate);

                // Next day date for next loop
                currentDate.setDate(currentDate.getDate() + 1);
            }

            // clearing array before filling it
            week = [];

            // looping through ALL array to find next 7 days tasks
            for (var i = 0; i < all.length; i++) {

                //looping through SEVENDAYS array
                for (var h = 0; h < sevenDays.length; h++) {

                    if (all[i].date === sevenDays[h]) {

                        week.push(all[i]);

                    }

                }

            }
        }


// PRIORITY
// ---------TO BE DONE------------


//--------------------ADD CATEGORY------------------

        var addCategory = document.querySelector('.add-category');

        addCategory.addEventListener('click', function () {
            var parent = document.querySelector(".header-add-category");
            var element = document.createElement("div");
            if (document.querySelector(".window") === null) {
                element.classList.add("window");
                element.innerHTML =
                    '<input type="text" id="input-category" placeholder="Kategoria">' +
                    '<button id="btn-category">Dodaj Kat</button>' +
                    '<button id="cancel">Zakończ</button>';

                parent.appendChild(element);

                var btnCategory = document.querySelector("#btn-category");
                var inputCategory = document.querySelector("#input-category");
                var categList = document.querySelector("#categ");

                btnCategory.addEventListener('click', function () {

                        if (inputCategory.value !== "") {
                            var newCategory = document.createElement("li");
                            var newButton = document.createElement('button');


                            // ADD FIRST LETTER OF CAT NAME TO BUTTON
                            newButton.innerText = inputCategory.value[0];
                            userCats.push(inputCategory.value);
                            newButton.classList.add("categ-list");
                            newCategory.appendChild(newButton);
                            categList.append(newCategory);
                            //inputCategory.value="";

                            // categList.insertBefore(newCategory, categList.firstChild);
                            parent.removeChild(element);
                            // ADD ID to button
                            newButton.id = document.querySelectorAll(".categ-list").length - 1;
                            currentCategoryChosen = newButton.id;


                        }

                        catFilling();
                    }
                );


                var cancel = document.querySelector("#cancel");

                cancel.addEventListener('click', function () {
                    parent.removeChild(element);
                });
            }


        });

        // filling category buttons

        function catFilling() {
            var catButtons = document.getElementsByClassName('categ-list');
            for (var i = 0; i < catButtons.length; i++) {
                catButtons[i].addEventListener("click", function () {
                    categoriesTasks = [];
                    currentCategoryChosen = this.id;
                    for (var i = 0; i < all.length; i++) {
                        if (all[i].catId === currentCategoryChosen) {
                            categoriesTasks.push(all[i]);
                        }
                    }
                    // clearing <ul>
                    while (tasksToDo.firstChild) {
                        tasksToDo.removeChild(tasksToDo.firstChild);
                    }

                    // creating <li>, <div> inside and pushing elements into them.
                    for (var i = 0; i < categoriesTasks.length; i++) {

                        // creating new element <li>
                        var newLi = document.createElement("li");
                        // taking elements from object sent by user (name, date, priority)
                        var categoriesElements = Object.values(categoriesTasks[i]);
                        // assigning new <li> to <ul>
                        tasksToDo.appendChild(newLi);

                        // creating new divs in <li> and putting user information in divs
                        for (var j = 0; j < 4; j++) {
                            var newDiv = document.createElement("div");
                            tasksToDo.children[i].append(newDiv);
                            if (j !== 0) {
                                newDiv.innerText = (categoriesElements[j - 1]);
                            }
                        }
                    }
                })
            }
        }


//---------ADD CATEGORY--------FINISH----------------


// Task adding feature WORK IN PROGRESS

        // Create a "close" button and append it to each list item
        var myNodelist = document.getElementById("myUL");
        for (var q = 0; q < myNodelist.length; q++) {
            var span = document.createElement("SPAN");
            var txt = document.createTextNode("\u00D7");
            span.className = "close";
            span.appendChild(txt);
            myNodelist[q].appendChild(span);
        }


// Add a "checked" symbol when clicking on a list item
        var list = document.querySelector('ul');
        list.addEventListener('click', function (ev) {
            if (ev.target.tagName === 'LI') {
                ev.target.classList.toggle('checked');
            }
        }, false);

// MAIN ADD TASK button

        var mainAddTaskBtn = document.querySelector('.addTaskButton');
        var toggledSection = document.querySelector('.sectionAddTask');
        mainAddTaskBtn.addEventListener("click", function () {
            toggledSection.classList.toggle('invisible');
        });


// Create a new list item when clicking on the "Add" button
        var addTaskBtn = document.querySelector('.addBtn');
        addTaskBtn.addEventListener('click', newElement);

        function newElement() {

            var taskName = document.getElementById("myInput").value;
            var taskDate = document.getElementById("date").value;
            var options = document.getElementsByName("kolor");

            if (options) {
                for (var i = 0; i < options.length; i++) {
                    if (options[i].checked) {
                        var priorityValue = options[i].value;
                    }
                }
            }
            var categoryObject = {name: taskName, date: taskDate, priority: priorityValue, catId: currentCategoryChosen};
            all.push(categoryObject);
            document.getElementById("myInput").value = "";

            toggledSection.classList.toggle('invisible');
        }


//button finished - hide/show

        document.getElementById("t-f").onclick = function () {
            const el = document.querySelector('.tasks-finished');
            el.style.visibility = el.style.visibility === "hidden" ? "visible": "hidden";
        }
//////////////// SEARCH ////////////////////////
    document.querySelector('.search').addEventListener("click", function(){
        var searchFor = this.previousElementSibling.value;
        console.log(searchFor);
    })
        
        
        
}
);