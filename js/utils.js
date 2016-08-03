// Elixir utility functions

var $ = document.querySelector,
    $$ = document.querySelectorAll;

function eventAdder(selector, eventName, function) {
    var targets = $(selector),
        tLength = targets.length;

    for (i = 0; i < tLength; i++) {
        targets[i].addEventListener(eventName, function);
    }

    return targets;
},


