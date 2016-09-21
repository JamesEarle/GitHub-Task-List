// Some javascript

var checklist = document.querySelectorAll("li.task-list-item");

var res = []
var url = []

console.log("above for loop")

for (var i = 0; i < checklist.length; i++) {
    // Collect children elements for the containing div
    var children = checklist[i].childNodes;
    // Checkbox is always 3rd child element
    var checkbox = children[2];
    // <a> tag is always 5th element
    var anchor = children[4];

    // url.push(anchor.href);
    $.ajax({
        url: anchor.href,
        type: 'GET',
        async: false,
        success: function(data) {
            var stateList = $(data).find("div.state")[0].classList;

            switch (stateList[1]) {
                case "state-open":
                    console.log("openn")
                    break;
                case "state-closed":
                    console.log("closedd")
                    break;
                case "state-merged":
                    console.log("mergedd")
                    break;
            }
            // if (state.classList.contains("state-merged")) {
            //     console.log("merged");
            // } else if (state.classList.contains("state-open")) {
            //     console.log("open");
            // } else {
            //     console.log("closed");
            // }
        }
    });
};

console.log("we made it!")