let searchQuery = document.getElementById('searchQuery')

var highlight = new Mark(document.getElementById('results'))
function performMark() {

    var keyword = searchQuery.value;

    markInstance.unmark({
        done: function () {
            markInstance.mark(keyword);
        }
    });
};
resultsList.addEventListener("load", performMark);