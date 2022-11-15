function FilterSearch() {
    var searchBox = document.getElementById("search");
    var filter = searchBox.value.toUpperCase();
    const ul = document.getElementById("titles");
    const li = ul.getElementsByTagName("li");

    var a, i, txtValue;

    // Loop through all list items, and hide those which don't match the search query
    for (i = 0; i < li.length; i++) {
        //a = li[i].getElementsByTagName("a")[0];
        txtValue = li[i].textContent || li[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
        } else {
        li[i].style.display = "none";
        }
    }
}