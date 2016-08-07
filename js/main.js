// main elixir JS file

// initializing app object
var Elixir = {
    e: {},
    f: {},
    c: {}
}

Elixir = {
    e: { // events
        "keydown input": "go",
        "click button.go": "go"
    },

    f: { // functions
      
        getDays: function(month, date, year) {
            var birthday = new Date([month, date.toString(), year].join(""));

            var daysTotal,
                daysAvailable;

            // do stuff here
            return {
                lived: 0,
                total: 0
            };
        },

        getBirthday: function() {
            return {
                month: $("#b-month").value,
                date: $("#b-date").value,
                year: $("#b-year").value
            };
        },

        drawDots: function(colored, total) {
            var dotsList = [],
                greyscale = total - colored;

            // TODO improve this scenario
            if (greyscale < 0) greyscale = 0;

            for (i = 0; i < greyscale; i ++) {
                dotsList.push(Elixir.c.dotHTML.greyscale);
            }

            for (i = 0; i < colored; i ++) {
                dotsList.push(Elixir.c.dotHTML.colored);
            }

            $(".dot-container").innerHTML = dotsList.join("");
            
        },

        go: function(evt) {
            if (evt instanceof KeyboardEvent && evt.keyCode != 13) return;

            // master task runner for "go" button
            var dateObject = Elixir.f.getBirthday();
            
            var dotCounts = Elixir.f.getDays(
                  dateObject.month,
                  dateObject.date,
                  dateObject.year
            );

            Elixir.f.drawDots(dotCounts.lived, dotCounts.total);
            scrollToHeight(window.innerHeight, 320);
        },

    },
    
    c: { // constants
        
        MeanAge: {
            male: 75,
            female: 85,
            total: 80
        },

        dotHTML: {
            colored: "<div class='colord dot'></div>",
            greyscale: "<div class='dot'></div>"
        }

    }
};

function init() {
    // add event listeners
    Object.keys(Elixir.e).forEach(function(identifier) {
        var eventName = identifier.split(" ")[0],
            selector = identifier.split(" ").splice(1).join(" "), // this should probably be less messy
            fn = Elixir.f[Elixir.e[identifier]];

        eventAdder(selector, eventName, fn);
    });

    // ...

    console.info("Elixir initialized");

}

init();
