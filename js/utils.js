// Elixir utility functions

var $ = document.querySelector.bind(document),
    $$ = document.querySelectorAll.bind(document);

function eventAdder(selector, eventName, callback) {
    var targets = $$(selector) || [],
        tLength = targets.length;

    for (i = 0; i < tLength; i++) {
        targets[i].addEventListener(eventName, callback);
    }

    return targets;
}

function scrollToHeight(targetPos, milliseconds) {
    var currentPos = document.body.scrollTop;
    var counter = 0;

    var scrollInterval = setInterval(function(){
        document.body.scrollTop = targetPos + (currentPos - targetPos) * (milliseconds / 16 - counter) / milliseconds * 16;
        counter ++;

        // add a halted? check here
        if (counter > milliseconds / 16) clearInterval(scrollInterval);
    }, 16)
}

function getWidthOf(element) {
    var rect = element.getBoundingClientRect();

    return rect.right - rect.left;
}

function closeAlert() {
    $(".modal").classList.remove("show");

    $(".modal button").removeEventListener("click", closeAlert);
}

function openAlert(message) {
    $(".modal p").innerText = message;
    $(".modal").classList.add("show");

    $(".modal button").addEventListener("click", closeAlert);
}
