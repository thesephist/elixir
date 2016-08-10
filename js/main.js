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
            var birthday = new Date([month, date.toString(), year].join(" "));

            // TODO custom modal
            if (birthday == "Invalid Date") {
                alert("Hm. Could you type that a bit differently? Doesn't seem like a date to me.");
                return;
            }

            var daysTotal,
                daysLived;
          
            // TODO take genders into account
            
            daysTotal = Elixir.c.meanAge.mean * 365;
            daysLived = Math.floor((new Date().getTime() - birthday.getTime()) / 86400000);

            // TODO custom modal here as well
            if (daysLived < 0) {
                alert("Hey, you aren't born yet! Stahp.");
                return;
            }

            return {
                lived: daysLived,
                total: daysTotal
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

            for (i = 0; i < colored; i ++) {
                dotsList.push(Elixir.c.dotHTML.colored);
            }

            for (i = 0; i < greyscale; i ++) {
                dotsList.push(Elixir.c.dotHTML.greyscale);
            }

            $(".dot-container").innerHTML = dotsList.join("");
            
        },

        go: function(evt) {
            // master task runner for "go" button
            if (evt instanceof KeyboardEvent && evt.keyCode != 13) return;

            var dateObject = Elixir.f.getBirthday();
            
            var dotCounts = Elixir.f.getDays(
                  dateObject.month,
                  dateObject.date,
                  dateObject.year
            );

            // errors
            if (!dotCounts) return;

            Elixir.f.drawDots(dotCounts.lived, dotCounts.total);
            scrollToHeight(window.innerHeight, 320);
        },

    },
    
    c: { // constants
        
        meanAge: {
            male: 76,
            female: 81,
            mean: 78.7
        },

        dotHTML: {
            // TODO change this into using sprites for performance boost on larger numbers of elements...
            colored: "<div class='colored dot'></div>",
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
