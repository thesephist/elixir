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
            // TODO improve this scenario
            if (colored > total) total = colored;

            // TODO set an event listener on window.onresize to recalc this part

            // clear out any clipping margins
            var dc = $(".dot-container");
            var spriteSize = Elixir.c.dot.spriteSize;
            dc.style.width = ""; // normalize

            var dcWidth = getWidthOf(dc);
            dc.style.width = `${dcWidth - dcWidth % spriteSize}px`; // make this get the right width from 
            
            var horizCount = parseFloat(dc.style.width) / spriteSize;

            var livedHeight = Math.floor(colored / horizCount) * spriteSize,
                livedWidth = (colored % horizCount) * spriteSize,
                totalHeight = Math.floor(total / horizCount) * spriteSize,
                totalWidth = (total % horizCount) * spriteSize;

            $("#dots-lived .rect").style.height = `${livedHeight}px`;
            $("#dots-lived .line").style.width = `${livedWidth}px`;

            $("#dots-total .rect").style.height = `${totalHeight}px`;
            $("#dots-total .line").style.width = `${totalWidth}px`;

            dc.style.display = "block";

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

        dot: {
            spriteSize: 5
        }

    }
};

function init() {

    $(".dot-container").style.display = "none";

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
