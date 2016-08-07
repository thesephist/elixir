// Elixir utility functions

var $ = document.querySelector.bind(document),
    $$ = document.querySelectorAll.bind(document);

function eventAdder(selector, eventName, callback) {
    var targets = $(selector) || [],
        tLength = targets.length;

    for (i = 0; i < tLength; i++) {
        targets[i].addEventListener(eventName, callback);
    }

    return targets;
}


