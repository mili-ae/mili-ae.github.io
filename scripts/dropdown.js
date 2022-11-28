const cropEvent = new Event("cropend");
var image_workspace = document.querySelector(".image-workspace img");

//Populate titles dropdown
var dropdown_titles = document.getElementById("titles");

fetch(window.location.href + "/data/titles.json")
    .then((response) => response.json())
    .then((json) => json.titles.forEach(title => {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(title));
        dropdown_titles.appendChild(li);
    }));


setTimeout(function() {
    //Get all dropdowns
    var dropdowns = document.querySelectorAll('.dropdown');

    //Loop through all dropdown elements
    dropdowns.forEach(dropdown => {
        const select = dropdown.querySelector('.select');
        const caret = dropdown.querySelector('.caret');
        const menu = dropdown.querySelector('.menu');
        var options = dropdown.querySelectorAll('.menu li');
        const selected = dropdown.querySelector('.selected');

        //Add a click event to the select element
        select.addEventListener("click", () => {
            //Add the clicked select styles to the select element
            select.classList.toggle("select-clicked");
            //Add rotate style to the caret element
            caret.classList.toggle("caret-rotate");
            //Add the open styles to the menu element
            menu.classList.toggle("menu-open");
        });

        //Loop through all option elements
        options.forEach(option => {
            //Add a click event to the option element
            option.addEventListener("click", () => {
                //Change selected inner text to clicked option inner text
                selected.innerText = option.innerText;
                //Add the clicked select styles to the select element
                select.classList.remove("select-clicked");
                //Add rotate style to the caret element
                caret.classList.remove("caret-rotate");
                //Add the open styles to the menu element
                menu.classList.remove("menu-open");
                //Remove active class from all option elements
                options.forEach(option => {
                    option.classList.remove('active');
                });

                //Add active class to clicked option element
                option.classList.add("active");
                image_workspace.dispatchEvent(cropEvent);
            });
        });
    });
}, 1000)

