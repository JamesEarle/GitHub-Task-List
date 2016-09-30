/*
  Developed By:
      James Earle
      James.Earle@microsoft.com
      www.jamesearle.ca
*/

function makeStateButton(state, isIssue) {
    var iconClass = {
        "Opened": "octicon-issue-opened",
        "Closed": "octicon-issue-closed",
        "Merged": "octicon-git-pull-request"
    }

    return "<span id='injected-state'><span style='width:83.59px;' class='state state-" + state.toLowerCase() + "'> \
            <svg aria-hidden='true' class='octicon " + iconClass[state] +"' height='16' version='1.1' viewBox='0 0 14 16' width='14'><path d='M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1\ 3H6v5h2V4zm0 6H6v2h2v-2z'></path></svg>\
            " + state + "</span></span>";
}

// See below for PATCH API requests that can open/close issues dynamically
// https://developer.github.com/v3/issues/


function collectLinks() {

    // Just in case you navigate and the state buttons already exist, remove them
    $("span#injected-state").remove();

    // Find task list
    var checklist = document.querySelectorAll("a.issue-link");

    if (checklist.length != 0) {

        // Collect children elements for the containing div
        for (var i = 0; i < checklist.length; i++) {
            (function(anchor) {
                $.ajax({
                    url: anchor.href,
                    type: 'GET',
                    context: checklist[i],
                    success: function(data) {
                        // Find state button in requested HTML
                        var state = $(data).find("div.state")[0].classList[1];
                        var span = "<span> </span>";
                        
                        switch (state) {
                            case "state-open":
                                anchor.insertAdjacentHTML("beforebegin", makeStateButton("Open") + span);
                                break;
                            case "state-closed":
                                anchor.insertAdjacentHTML("beforebegin", makeStateButton("Closed") + span);
                                break;
                            case "state-merged":
                                anchor.insertAdjacentHTML("beforebegin", makeStateButton("Merged") + span);
                                break;
                        }
                    }
                });
            })(checklist[i]);
        };
    }
}

// Call once when we start
$(document).ready(function() {
    collectLinks();  
});

// And call again for every page navigation.
document.addEventListener("pjax:end", function() {
    collectLinks();
});