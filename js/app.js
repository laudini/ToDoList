document.addEventListener("DOMContentLoaded", function() {

    var hamburger= document.querySelector(".hamb");
    var menuToggle = document.getElementsByClassName("menu-list");

    hamburger.addEventListener("click", function () {
        for (var i=0;i<menuToggle.length;i++){
            menuToggle[i].classList.toggle("wide-menu");
        }
    });
});