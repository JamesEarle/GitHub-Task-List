/*
  Developed By:
      James Earle
      James.Earle@microsoft.com
      www.jamesearle.ca
*/

function makeStateButton(state) {
    return "<span style='width:83.59px;' class='state state-" + state.toLowerCase() + "'> \
          <svg aria-hidden='true' class='octicon octicon-issue-opened' height='16' version='1.1' viewBox='0 0 14 16' width='14'><path d='M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1\ 3H6v5h2V4zm0 6H6v2h2v-2z'></path></svg>\
          " + state + "</span>";
}

// Refresh the page when an input is checked to maintain the state buttons
// $("input:checkbox").change(function() {
//     setTimeout(function() {}, 500)
//     location.reload();
// });

// See below for PATCH API requests that can open/close issues dynamically
// https://developer.github.com/v3/issues/

// Find task list
var checklist = document.querySelectorAll("li.task-list-item");

if (checklist.length != 0) {
    console.log("Fetching information on issues and pull requests...");

    for (var i = 0; i < checklist.length; i++) {
        // Collect children elements for the containing div
        var children = checklist[i].childNodes;

        // We need to find <input> and <a>
        var elems = []
        for (var j = 0; j < children.length; j++) {
            if (children[j].tagName == "INPUT") {
                elems.push(children[j]);
            } else if (children[j].tagName == "A") {
                elems.push(children[j]);
            }
        }

        // This assumes we find always find checkbox first (proper structure)
        var checkbox = elems[0];
        var anchor = elems[1];

        // Make synchronous AJAX (SJAX?) calls to the related issues pages
        // NOTE asynchronous will iterate the for loop we are in while 
        // putting ajax calls in the queue, then will call all at the end.
        // this results in anchor.href being the same in each call (wrong)
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
            }
        });
    };

    console.log("Finished!")
}