


/*
TODOS

---PENDING REQUIREMENTS---

______TO SHIP
            DONE Weighted Exchanges
            DONE----Uniform size, randomly filled lists
3. Remove boundary conditions
5. Organize so much...
6. Add flags to each stacklist

______BUGS
    Blows up when noone to exchange with    

______NEXT
4. Iterate all lists



            DONE----Set up debbuging
High entropy list maker 
Include chance in the switching
            DONE----Restrict exchange range
            DONE----Add variable control over list parameters

---IDEAS---
change color of changing rows


---FIXES---
            DONE----Check random list maker
            DONE----Check random int function (?)
            DONE----Random  x10 and x100 fix: Separate into fucmctions and call the algorithm
Update graphics instead of redrawing: http://www.chartjs.org/docs/latest/developers/updates.html
            DONE----Fix bar index markers
            DONE----Fix list changing when hovering

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

//Max range for exchanges
var exchangeRange = 1;

//Main list of stacks
var mainStack;

//Current chart
var chart;

var mainCanvas;



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

//Generates an array of @nlists@ stacks with @maxsize@, filled a random amount


function uniformStacks(nlists, maxsize) {

    var stacklist = new Array(nlists);
    var curlimStack;

    for (i = 0; i < nlists; i++) {

        curlimStack = new limStack(maxsize);
        var curStackFill = getRandomInt(0, maxsize);

        for (j = 0; j < curStackFill; j++) {
            curlimStack.push(j);
        }
        stacklist[i] = curlimStack;
    }

    return stacklist;

}



//Generates a random int between min and max (Inclusive)

function getRandomInt(min, max) {

    if (min > max) return getRandomInt(max, min);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//TODO Partial rewrite
/* 
    Add exchanges candidates to list, if exchange is impossible, return false
    Add option to alter algorithm

*/

function randChange(range, force) {

    //Pick a random (non empty) stack (sender). This should work pretty much the same as before


    var sendi;
    var sender

    do {
        sendi = getRandomInt(0, listsize - 1);
        sender = mainStack[sendi];

    } while (sender.length == 0)
    

    //Set list of exchange candidates, allow warpping
    var receiveimin = sendi - range;

    var receiveimax = sendi + range;



    receivei = getRandomInt(receiveimin, receiveimax);
    receiver = mainStack[receivei];

    var candidates = new Array;

    //Go forwards...
    for (i = receivei + 1; i <= receivei + range; i++) {
        if (i <= listsize) {
            candidates.push(i);

        }
        else {
            candidates.push(i - listsize);
        }
    }

    //...and backwards 
    for (i = receivei - 1; i >= receivei - range; i--) {
        if (i >= 0) {
            candidates.push(i);

        }
        else {
            candidates.push(i + listsize);
        }
    }
    console.log("Target: " + receivei + " Candidates: " + candidates);

    //Pick from candidates. Before proceding, make sure exchange is possible
    var target = -1;

    while (candidates.length > 0 && target == -1) {

        targeti = getRandomInt(candidates.length - 1, 0)
        target = mainStack[candidates[targeti]];


        if (target.limit == target.length) {
            //full... remove this one
            candidates.splice(targeti, 1);
            target = -1;
        }


    }

    if (candidates.length == 0) {
        console.log("Exchange impossible");
        return false;
    }


    if (!force) {

        //Find probability and exchange if possible
        var chanceEx = receiver.length / (receiver.length + sender.length);
        var chance = Math.random();

        if (chance < chanceEx) {
            console.log(" to [" + receiveimin + "," + receiveimax + "]." + " Final = " + receivei + " Chance " + chanceEx + " Was " + chance);
        }
        else {
            return true;
        }
    }

    receiver.push(sender.pop());


    //document.getElementById("console").innerHTML = "\n " + sender.length + "/" + sender.limit + "_____" + receiver.length + "/" + receiver.limit;


}

//Empty bar: randChange on a single bar until empty
//TODO: Actually call the function on force mode

//First, know when a bar gets pressed

function emptyBar(barIndex) {

    var curstack = mainStack[barIndex];

    while (curstack.length > 0) {


        //Pick a different random (non full) stack (receiver), now in range
        var receiveimin = barIndex - exchangeRange >= 0 ? barIndex - exchangeRange : 0;

        var receiveimax = barIndex + exchangeRange <= listsize - 1 ? barIndex + exchangeRange : listsize - 1;
        var receiver;

        do {
            receivei = getRandomInt(receiveimin, receiveimax);
            receiver = mainStack[receivei];

        } while (receiver.limit - receiver.length == 0 || barIndex == receivei)


        //document.getElementById("console").innerHTML = "\n " + sender.length + "/" + sender.limit + "_____" + receiver.length + "/" + receiver.limit;

        console.log("Element from " + barIndex + " to [" + receiveimin + "," + receiveimax + "]." + " Final = " + receivei);
        receiver.push(curstack.pop());
        console.log(curstack.length);
    }

}

//b_newRandList();
//mainCanvas.addEventListener('click', handleClick, false);


/*
    ------------------------------GUI------------------------------
*/

//Creates a new randomized list and calls for redraw
function b_newRandList() {

    mainStack = randStacks(listsize, stacksize);


    paintList(mainStack);



}

function b_newUniList() {

    mainStack = uniformStacks(listsize, stacksize);

    paintList(mainStack);
}

function b_newMinMaxList() {


}

//TODO: change redraw to update

//Calls one random change and updates lists
function b_randChange() {

    randChange(exchangeRange);
    paintList(mainStack);
    //updateChart();

}


function b_randChangex10() {

    for (i = 0; i < 10; i++) {
        randChange(exchangeRange);
        console.log(i);

    }
    paintList(mainStack);

}

function b_randChangex100() {

    for (i = 0; i < 100; i++) {
        randChange(exchangeRange);
        console.log(i);

    }
    paintList(mainStack);

}

function i_changeListN() {

    listsize = parseInt(document.getElementById("listNumberIn").value);

}

function i_changeListS() {

    stacksize = parseInt(document.getElementById("listSizeIn").value);

}

function i_changeRange() {

    exchangeRange = parseInt(document.getElementById("exchangeRangeIn").value);
    //console.log(exchangeRange);

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
    var mainCanvas = document.getElementById("myData").getContext("2d");
    //new Chart(mainCanvas).Pie(pieData);
    /* New way to instantiate so that it do not thows Uncaught
     TypeError: (intermediate value).Pie is not a function" */
    var myPieChart = new Chart(mainCanvas, {
        type: 'bar',
        data: pieData

    });


}

function updateChart() {

    console.log(data);
    chart.data = genChartData(mainStack);
    chart.update();
}

function genChartData(stacklist) {

    ilimit = new Array(stacklist.length);
    isize = new Array(stacklist.length);
    iindex = new Array(stacklist.length);

    for (i = 0; i < stacklist.length; i++) {

        ilimit[i] = stacklist[i].getLimit() - stacklist[i].length;
        isize[i] = stacklist[i].length;
        iindex[i] = i + 1;
    }
    //alert(stacklist);
    var barData = {
        labels: iindex,
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

    return barData;

}

function paintList(stacklist) {

    var data = genChartData(stacklist);


    // Get the context of the canvas element we want to select
    mainCanvas = document.getElementById("mainCanvas").getContext("2d");
    //new Chart(mainCanvas).Pie(pieData);
    /* New way to instantiate so that it do not thows Uncaught
     TypeError: (intermediate value).Pie is not a function" */

    if (chart) {
        chart.destroy();
    }
    chart = new Chart(mainCanvas, {
        type: 'bar',
        data: data,
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
            },
            onClick: handleClick
        }


    });

}

function handleClick(evt) {
    var activeElement = chart.getElementAtEvent(evt);
    console.log("CLICK");
    console.log(activeElement[0]._index);

    emptyBar(activeElement[0]._index);

    paintList(mainStack);
}


