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
    var tasksFinished = document.querySelector(".tasks-finished");
    var currentCategoryChosen = 0;
    var categoriesTasks = [];
    var openHamburger = false;
    var shownTasks = document.getElementsByClassName("completeCheckbox");

// all required arrays
    var all = [];
    var today = [];
    var tomorrow = [];
    var week = [];
    var userCats = [];

    // LOCAL STORAGE
    function populateStorage() {
        localStorage["allArray"] = JSON.stringify(all);
        localStorage["userCats"] = JSON.stringify(userCats);
    }

    if (!localStorage.getItem('allArray')) {
        populateStorage();
    } else {
        all = JSON.parse(localStorage['allArray']);
    }
    if (!localStorage.getItem('userCats')) {
        populateStorage();
    } else {
        userCats = JSON.parse(localStorage['userCats']);
    }

    fillingCategoryBar();


// HAMBURGER
    function hamburgerChange () {

        leftCol.classList.toggle("wide-menu");
        rightCol.classList.toggle("hide-right-col");
        var catButtons = document.getElementsByClassName("categ-list");

        if (openHamburger === false) {

            addCategory.innerText = "Add new category";
            todayBtn.innerText = "TODAY";
            tomorrowBtn.innerText = "TOMORROW";
            weekBtn.innerText = "UPCOMING 7 DAYS";
            allBtn.innerText = "ALL TASKS";
            openHamburger = true;
            for (var i = 0; i < catButtons.length; i++) {
                catButtons[i].innerText = userCats[i].name;
            }
        } else {
            addCategory.innerText = "C";
            todayBtn.innerText = "T";
            tomorrowBtn.innerText = "T";
            weekBtn.innerText = "7";
            allBtn.innerText = "A";
            openHamburger = false;
            for (var i = 0; i < catButtons.length; i++) {
                catButtons[i].innerText = userCats[i].shortName;
            }
        }
        addCategory.classList.toggle("wide-addCat-btn");
        todayBtn.classList.toggle("wide-today-btn");
        tomorrowBtn.classList.toggle("wide-tomorrow-btn");
        weekBtn.classList.toggle("wide-week-btn");
        allBtn.classList.toggle("wide-all-btn");

        for (var i = 0; i < catButtons.length; i++) {
            catButtons[i].classList.toggle("wide-all-btn");
        }
    }
    hamburger.addEventListener("click", function () {
        hamburgerChange();
    });

// Button "ALL" functionality
    allBtn.addEventListener("click", function () {
        // clearing <ul>
        while (tasksToDo.firstChild) {
            tasksToDo.removeChild(tasksToDo.firstChild);
        }
        while (tasksFinished.firstChild) {
            tasksFinished.removeChild(tasksFinished.firstChild);
        }

        // creating <li>, <div> inside and pushing elements into them.
        for (var i = 0; i < all.length; i++) {
            if (all[i].finished) {
                // creating new element <li>
                var fnewLi = document.createElement("li");
                // taking elements from object sent by user (name, date, priority)
                var fallElements = Object.values(all[i]);
                // assigning new <li> to <ul>
                tasksFinished.appendChild(fnewLi);

                for (var j = 0; j < 4; j++) {
                    var fnewDiv = document.createElement("div");
                    fnewDiv.classList.add("taskDivs");
                    var currentFLenght = tasksFinished.children.length;
                    tasksFinished.children[currentFLenght - 1].append(fnewDiv);
                    if (j !== 0) {
                        fnewDiv.innerText = (fallElements[j - 1]);
                    } else {
                        var fcheckBox = document.createElement('input');
                        fnewDiv.append(fcheckBox);
                        fcheckBox.classList.add("completeCheckbox");
                        fcheckBox.type = "checkbox";
                        fcheckBox.checked = true;
                        fcheckBox.id = String(i);
                        fcheckBox.addEventListener("change", function (e) {

                            all[e.currentTarget.id].finished = false;
                        })
                    }
                }
            } else {
                // creating new element <li>
                var newLi = document.createElement("li");
                // taking elements from object sent by user (name, date, priority)
                var allElements = Object.values(all[i]);
                // assigning new <li> to <ul>
                tasksToDo.appendChild(newLi);
                // creating new divs in <li> and putting user information in divs
                for (var j = 0; j < 4; j++) {
                    var newDiv = document.createElement("div");
                    newDiv.classList.add("taskDivs");
                    var currentLength = tasksToDo.children.length;
                    tasksToDo.children[currentLength - 1].append(newDiv);
                    if (j !== 0) {
                        newDiv.innerText = (allElements[j - 1]);
                    } else {
                        var checkBox = document.createElement('input');
                        newDiv.append(checkBox);
                        checkBox.classList.add("completeCheckbox");
                        checkBox.type = "checkbox";
                        checkBox.id = String(i);
                        checkBox.addEventListener("change", function (e) {
                            all[e.currentTarget.id].finished = true;
                            populateStorage();
                        })
                    }
                }
            }
        }
        if (openHamburger === true) {
            hamburgerChange();
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
        while (tasksFinished.firstChild) {
            tasksFinished.removeChild(tasksFinished.firstChild);
        }
        // creating <li>, <div> inside and pushing elements into them.
        for (var i = 0; i < today.length; i++) {

            if (today[i].finished) {
                // creating new element <li>
                var fnewLi = document.createElement("li");
                // taking elements from object sent by user (name, date, priority)
                var ftodayElements = Object.values(today[i]);
                // assigning new <li> to <ul>
                tasksFinished.appendChild(fnewLi);

                for (var j = 0; j < 4; j++) {
                    var fnewDiv = document.createElement("div");
                    fnewDiv.classList.add("taskDivs");
                    var currentFLenght = tasksFinished.children.length;
                    tasksFinished.children[currentFLenght - 1].append(fnewDiv);
                    if (j !== 0) {
                        fnewDiv.innerText = (ftodayElements[j - 1]);
                    } else {
                        var fcheckBox = document.createElement('input');
                        fnewDiv.append(fcheckBox);
                        fcheckBox.classList.add("completeCheckbox");
                        fcheckBox.type = "checkbox";
                        fcheckBox.checked = true;
                        fcheckBox.id = String(i);
                        fcheckBox.addEventListener("change", function (e) {

                            today[e.currentTarget.id].finished = false;
                        })
                    }
                }
            } else {
                // creating new element <li>
                var newLi = document.createElement("li");
                // taking elements from object sent by user (name, date, priority)
                var todayElements = Object.values(all[i]);
                // assigning new <li> to <ul>
                tasksToDo.appendChild(newLi);
                // creating new divs in <li> and putting user information in divs
                for (var j = 0; j < 4; j++) {
                    var newDiv = document.createElement("div");
                    newDiv.classList.add("taskDivs");
                    var currentLength = tasksToDo.children.length;
                    tasksToDo.children[currentLength - 1].append(newDiv);
                    if (j !== 0) {
                        newDiv.innerText = (todayElements[j - 1]);
                    } else {
                        var checkBox = document.createElement('input');
                        newDiv.append(checkBox);
                        checkBox.classList.add("completeCheckbox");
                        checkBox.type = "checkbox";
                        checkBox.id = String(i);
                        checkBox.addEventListener("change", function (e) {
                            today[e.currentTarget.id].finished = true;
                        })
                    }
                }
            }
        }
        if (openHamburger === true) {
            hamburgerChange();
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
        while (tasksFinished.firstChild) {
            tasksFinished.removeChild(tasksFinished.firstChild);
        }
        // creating <li>, <div> inside and pushing elements into them.
        for (var i = 0; i < tomorrow.length; i++) {

            if (tomorrow[i].finished) {
                // creating new element <li>
                var fnewLi = document.createElement("li");
                // taking elements from object sent by user (name, date, priority)
                var ftomorrowElements = Object.values(tomorrow[i]);
                // assigning new <li> to <ul>
                tasksFinished.appendChild(fnewLi);

                for (var j = 0; j < 4; j++) {
                    var fnewDiv = document.createElement("div");
                    fnewDiv.classList.add("taskDivs");
                    var currentFLenght = tasksFinished.children.length;
                    tasksFinished.children[currentFLenght - 1].append(fnewDiv);
                    if (j !== 0) {
                        fnewDiv.innerText = (ftomorrowElements[j - 1]);
                    } else {
                        var fcheckBox = document.createElement('input');
                        fnewDiv.append(fcheckBox);
                        fcheckBox.classList.add("completeCheckbox");
                        fcheckBox.type = "checkbox";
                        fcheckBox.checked = true;
                        fcheckBox.id = String(i);
                        fcheckBox.addEventListener("change", function (e) {

                            tomorrow[e.currentTarget.id].finished = false;
                        })
                    }
                }
            } else {
                // creating new element <li>
                var newLi = document.createElement("li");
                // taking elements from object sent by user (name, date, priority)
                var tomorrowElements = Object.values(tomorrow[i]);
                // assigning new <li> to <ul>
                tasksToDo.appendChild(newLi);
                // creating new divs in <li> and putting user information in divs
                for (var j = 0; j < 4; j++) {
                    var newDiv = document.createElement("div");
                    newDiv.classList.add("taskDivs");
                    var currentLength = tasksToDo.children.length;
                    tasksToDo.children[currentLength - 1].append(newDiv);
                    if (j !== 0) {
                        newDiv.innerText = (tomorrowElements[j - 1]);
                    } else {
                        var checkBox = document.createElement('input');
                        newDiv.append(checkBox);
                        checkBox.classList.add("completeCheckbox");
                        checkBox.type = "checkbox";
                        checkBox.id = String(i);
                        checkBox.addEventListener("change", function (e) {
                            tomorrow[e.currentTarget.id].finished = true;
                        })
                    }
                }
            }
        }
        if (openHamburger === true) {
            hamburgerChange();
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
        while (tasksFinished.firstChild) {
            tasksFinished.removeChild(tasksFinished.firstChild);
        }
        // creating <li>, <div> inside and pushing elements into them.
        for (var i = 0; i < week.length; i++) {

            if (week[i].finished) {
                // creating new element <li>
                var fnewLi = document.createElement("li");
                // taking elements from object sent by user (name, date, priority)
                var fweekElements = Object.values(week[i]);
                // assigning new <li> to <ul>
                tasksFinished.appendChild(fnewLi);

                for (var j = 0; j < 4; j++) {
                    var fnewDiv = document.createElement("div");
                    fnewDiv.classList.add("taskDivs");
                    var currentFLenght = tasksFinished.children.length;
                    tasksFinished.children[currentFLenght - 1].append(fnewDiv);
                    if (j !== 0) {
                        fnewDiv.innerText = (fweekElements[j - 1]);
                    } else {
                        var fcheckBox = document.createElement('input');
                        fnewDiv.append(fcheckBox);
                        fcheckBox.classList.add("completeCheckbox");
                        fcheckBox.type = "checkbox";
                        fcheckBox.checked = true;
                        fcheckBox.id = String(i);
                        fcheckBox.addEventListener("change", function (e) {

                            week[e.currentTarget.id].finished = false;
                        })
                    }
                }
            } else {
                // creating new element <li>
                var newLi = document.createElement("li");
                // taking elements from object sent by user (name, date, priority)
                var weekElements = Object.values(week[i]);
                // assigning new <li> to <ul>
                tasksToDo.appendChild(newLi);
                // creating new divs in <li> and putting user information in divs
                for (var j = 0; j < 4; j++) {
                    var newDiv = document.createElement("div");
                    newDiv.classList.add("taskDivs");
                    var currentLength = tasksToDo.children.length;
                    tasksToDo.children[currentLength - 1].append(newDiv);
                    if (j !== 0) {
                        newDiv.innerText = (weekElements[j - 1]);
                    } else {
                        var checkBox = document.createElement('input');
                        newDiv.append(checkBox);
                        checkBox.classList.add("completeCheckbox");
                        checkBox.type = "checkbox";
                        checkBox.id = String(i);
                        checkBox.addEventListener("change", function (e) {
                            week[e.currentTarget.id].finished = true;
                        })
                    }
                }
            }
        }
        if (openHamburger === true) {
            hamburgerChange();
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
        if (document.querySelector(".category-window") === null) {
            element.classList.add("category-window");
            element.innerHTML =
                '<input type="text" id="input-category" placeholder="Kategoria">' +
                '<button id="btn-category">Dodaj<br>Kategorię</button>' +
                '<button id="cancel">Zakończ</button>';

            parent.appendChild(element);

            var btnCategory = document.querySelector("#btn-category");
            var inputCategory = document.querySelector("#input-category");

            btnCategory.addEventListener('click', function () {

                    if (inputCategory.value !== "") {
                        var categObject = {
                            name: inputCategory.value,
                            shortName: inputCategory.value[0]
                        };
                        userCats.push(categObject);
                        fillingCategoryBar();
                        populateStorage();
                        parent.removeChild(element);
                    }
                }
            );

            var cancel = document.querySelector("#cancel");

            cancel.addEventListener('click', function () {
                parent.removeChild(element);
            });
        }


    });

    function fillingCategoryBar() {

        var addCategory = document.querySelector('.add-category');
        var categList = document.getElementById("categ");

        while (categList.firstChild) {
            categList.removeChild(categList.firstChild);
        }

        for (var i = 0; i < userCats.length; i++) {
            if (addCategory.classList.contains('wide-addCat-btn')) {
                var newCategory = document.createElement("li");
                var newButton = document.createElement('button');

                // ADD FIRST LETTER OF CAT NAME TO BUTTON
                newButton.innerText = userCats[i].name;
                newButton.classList.add("categ-list");
                newButton.classList.add("wide-all-btn");
                newCategory.appendChild(newButton);
                categList.append(newCategory);

                // ADD ID to button
                newButton.id = (i).toString();
                currentCategoryChosen = newButton.id;

            } else {

                var newCategory = document.createElement("li");
                var newButton = document.createElement('button');

                // ADD FIRST LETTER OF CAT NAME TO BUTTON
                newButton.innerText = userCats[i].shortName;
                newButton.classList.add("categ-list");
                newCategory.appendChild(newButton);
                categList.append(newCategory);

                // ADD ID to button
                newButton.id = (i).toString();
                currentCategoryChosen = newButton.id;
            }
        }
        if (openHamburger === true) {
            hamburgerChange();
        }
        catFilling();
    }

// filling category buttons

    function catFilling() {
        var catButtons = document.getElementsByClassName('categ-list');
        for (var i = 0; i < catButtons.length; i++) {
            catButtons[i].addEventListener("click", function () {
                console.log(document.querySelector(".categ-list-chosen"));
                if (document.querySelector(".categ-list-chosen") !== null) {
                    document.querySelector(".categ-list-chosen").classList.remove('categ-list-chosen');
                }

                categoriesTasks = [];
                currentCategoryChosen = this.id;
                console.log(this.id);
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
                    newLi.classList.add('taskLis');
                    // taking elements from object sent by user (name, date, priority)
                    var categoriesElements = Object.values(categoriesTasks[i]);
                    // assigning new <li> to <ul>
                    tasksToDo.appendChild(newLi);

                    // creating new divs in <li> and putting user information in divs
                    for (var j = 0; j < 4; j++) {
                        var newDiv = document.createElement("div");
                        newDiv.classList.add("taskDivs");
                        tasksToDo.children[i].append(newDiv);
                        if (j !== 0) {
                            newDiv.innerText = (categoriesElements[j - 1]);
                        } else {
                            var checkBox = document.createElement('input');
                            newDiv.append(checkBox);
                            checkBox.classList.add("completeCheckbox");
                            checkBox.type = "checkbox";
                        }
                    }
                }
                document.getElementById(this.id).classList.add("categ-list-chosen");

                if (openHamburger === true) {
                    hamburgerChange();
                }
            })
        }
    }


//---------ADD CATEGORY--------FINISH----------------


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
        var uniqueId = all.length;
        var categoryObject = {
            name: taskName,
            date: taskDate,
            priority: priorityValue,
            catId: currentCategoryChosen,
            finished: false,
            uniqueId: uniqueId
        };
        all.push(categoryObject);
        populateStorage();
        document.getElementById("myInput").value = "";

        toggledSection.classList.toggle('invisible');
    }


//button finished - hide/show

    document.getElementById("t-f").onclick = function () {
        const el = document.querySelector('.tasks-finished');
        el.style.visibility = el.style.visibility === "hidden" ? "visible" : "hidden";
    }
//////////////// SEARCH ////////////////////////
    document.querySelector('.search').addEventListener("click", function () {
        while (tasksToDo.firstChild) {
            tasksToDo.removeChild(tasksToDo.firstChild);
        }

        var value = this.nextElementSibling.value.toUpperCase();
        var n = 0;

        if (all.length == 0) {
            var newLi = document.createElement("li");
            newLi.innerText = "Brak zadań z wyszukiwaną frazą";
            tasksToDo.appendChild(newLi);

        } else {

            for (var i = 0; i < all.length; i++) {
                if (all[i].name.toUpperCase().search(value) > -1) {
                    n = n + 1;
                    var newLi = document.createElement("li");
                    var weekElements = Object.values(all[i]);
                    tasksToDo.appendChild(newLi);
                    for (var j = 0; j < 4; j++) {
                        var newDiv = document.createElement("div");
                        tasksToDo.children[n - 1].append(newDiv);
                        if (j !== 0) {
                            newDiv.innerText = (weekElements[j - 1]);
                        }

                    }

                }

            }
            if (n == 0) {
                var newLi = document.createElement("li");
                newLi.innerText = "Brak zadań z wyszukiwaną frazą";
                tasksToDo.appendChild(newLi);
            }
        }
    });
    /////////////////////////////// SEARCH FINISH //////////////////////////


    // PROGRESS


    document.querySelector('.progress-button').addEventListener("click", function () {

        document.querySelector('.show-progress').classList.toggle('invisible');
    });

    document.querySelector('.close-progress').addEventListener("click", function () {

        document.querySelector('.show-progress').classList.toggle('invisible');
    })


});

