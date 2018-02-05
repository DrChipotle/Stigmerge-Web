


/*
TODOS

---PENDING REQUIREMENTS---
            DONE----Set up debbuging

High entropy list maker 

Restrict exchange range

Add variable control over list parameters

---IDEAS---
change color of changing rows


---FIXES---
            DONE----Check random list maker
            DONE----Check random int function (?)
            DONE----Random  x10 and x100 fix: Separate into fucmctions and call the algorithm
Update graphics instead of redrawing: http://www.chartjs.org/docs/latest/developers/updates.html
Fix bar index markers
Fix list changing when hovering

Organize code

Change HTML to follow good practice lists
    Programatic event handlers



Good practices list
https://en.wikipedia.org/wiki/Unobtrusive_JavaScript
    Add listeners to the buttons
    Set a function per button
    Separate GUI changes from function code

    Some (?) Documentation



*/

//Defines the max possible size of an individual stack
var stacksize = 10;

//Defines the number of stacks
var listsize = 10;

//Main list of stacks
var mainStack;



/*
    ------------------------------OBJECTS------------------------------
*/

function limStack(i_lim) {

    Array.call(this);

    this.limit = i_lim;

    this.getLimit = function () {
        return this.limit;
    }


    /*


    this.pop = function () {
        return this.stac.pop();
    }

    this.push = function (item) {
        this.stac.push(item);
    }
    */
}
// inherit Person
limStack.prototype = Object.create(Array.prototype);

// correct the constructor pointer because it points to Person
limStack.prototype.constructor = limStack;


/*

 ------------------------------FUNCTIONS------------------------------

*/

//Generates an array of @nlists@ stacks with random size @maxsize@, filled a random amount

function randStacks(nlists, maxsize) {

    var stacklist = new Array(nlists);
    var curlimStack;

    for (i = 0; i < nlists; i++) {

        var curStackLimit = getRandomInt(1, maxsize);
        curlimStack = new limStack(curStackLimit);

        var curStackFill = getRandomInt(0, curStackLimit);
        //console.log("List limit " + curStackLimit + " size " + curStackFill);

        for (j = 0; j < curStackFill; j++) {

            curlimStack.push(j);
        }
        stacklist[i] = curlimStack;
    }

    return stacklist;

}

//Generates a random int between min and max (Inclusive)

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//TODO Add timeout (?)
function randChange() {
    
    //Pick a random (non empty) stack (sender)
    document.getElementById("console").innerHTML = "Searching random";

    var sendi;
    var sender

    var receivei;
    var receiver;

    do {
        sendi = getRandomInt(0, listsize - 1);
        sender = mainStack[sendi];

    } while (sender.length == 0)

    //Pick a different random (non full) stack (receiver)
    do {
        receivei = getRandomInt(0, listsize - 1);
        receiver = mainStack[receivei];

    } while (receiver.limit - receiver.length == 0 || sendi == receivei)


    //document.getElementById("console").innerHTML = "\n " + sender.length + "/" + sender.limit + "_____" + receiver.length + "/" + receiver.limit;

    console.log("Moved element from " + sendi + " to " + receivei);
    //Move

    //var temp = sender.pop();
    receiver.push(sender.pop());

}


/*
    ------------------------------GUI------------------------------
*/

//Creates a new randomized list and calls for redraw
function b_newRandList() {

    mainStack = randStacks(listsize, stacksize);
    paintList(mainStack);

}

function b_newMinMaxList() {


 }

//TODO: change redraw to update

//Calls one random change and updates lists
function b_randChange() {

    randChange();
    paintList(mainStack);


}


function b_randChangex10() {

    for (i = 0; i < 10; i++) {
        randChange();

    }
    paintList(mainStack);

}

function b_randChangex100() {

    for (i = 0; i < 100; i++) {
        randChange();

    }
    paintList(mainStack);

}


function paint() {

    var pieData = {
        labels: ["Purple", "Green", "Orange", "Yellow"],
        datasets: [
            {
                data: [20, 40, 10, 30],
                backgroundColor: [
                    "#878BB6",
                    "#4ACAB4",
                    "#FF8153",
                    "#FFEA88"
                ]
            }]
    };
    // Get the context of the canvas element we want to select
    var ctx = document.getElementById("myData").getContext("2d");
    //new Chart(ctx).Pie(pieData);
    /* New way to instantiate so that it do not thows Uncaught
     TypeError: (intermediate value).Pie is not a function" */
    var myPieChart = new Chart(ctx, {
        type: 'bar',
        data: pieData

    });


}

function paintList(stacklist) {


    ilimit = new Array(stacklist.length);
    isize = new Array(stacklist.length);

    for (i = 0; i < stacklist.length; i++) {

        ilimit[i] = stacklist[i].getLimit() - stacklist[i].length;
        isize[i] = stacklist[i].length;
    }
    //alert(stacklist);
    var barData = {
        labels: ilimit,
        datasets: [
            {
                label: 'Filled',
                data: isize,
                backgroundColor: "#4ACAB4"

            },
            {
                label: 'Empty',
                data: ilimit,
                backgroundColor: "#555555"
            }

        ]
    };


    // Get the context of the canvas element we want to select
    var ctx = document.getElementById("myData").getContext("2d");
    //new Chart(ctx).Pie(pieData);
    /* New way to instantiate so that it do not thows Uncaught
     TypeError: (intermediate value).Pie is not a function" */
    var myPieChart = new Chart(ctx, {
        type: 'bar',
        data: barData,
        options: {
            scales: {
                yAxes: [{
                    stacked: true,
                    ticks: {
                        beginAtZero: true,
                        suggestedMax: stacksize
                    }
                }],
                xAxes: [{
                    stacked: true,
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },

            hover: {
                // Overrides the global setting
                mode: 'index'
            }
        }

    });


}
