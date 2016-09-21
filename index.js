// Some javascript

function makeStateButton(state) {
    return "<span class='state state-" + state.toLowerCase() + "'> \
          <svg aria-hidden='true' class='octicon octicon-issue-opened' height='16' version='1.1' viewBox='0 0 14 16' width='14'><path d='M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1\ 3H6v5h2V4zm0 6H6v2h2v-2z'></path></svg>\
          " + state + "</span>";
}

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
            var state = $(data).find("div.state")[0].classList[1];

            switch (state) {
                case "state-open":
                    anchor.insertAdjacentHTML("beforebegin", makeStateButton("Open"));
                    anchor.insertAdjacentHTML("beforebegin", "<span> </span>");
                    break;
                case "state-closed":
                    anchor.insertAdjacentHTML("beforebegin", makeStateButton("Closed"));
                    anchor.insertAdjacentHTML("beforebegin", "<span> </span>");
                    break;
                case "state-merged":
                    anchor.insertAdjacentHTML("beforebegin", makeStateButton("Merged"));
                    anchor.insertAdjacentHTML("beforebegin", "<span> </span>");
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