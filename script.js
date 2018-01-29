
var stacksize = 5;
var listsize = 5;
var mainStack;


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


/*

        var curStackSize = getRandomInt(1, maxsize);
        curlimStack = new limStack(curStackSize);

        for (j = 0; j < getRandomInt(0, curStackSize); j++) {




                    var curStackSize = Math.floor((Math.random() * maxsize) + 1);
        curlimStack = new limStack(curStackSize);

        for (j = 0; j < Math.floor((Math.random() * curStackSize) + 1); j++) {
*/


//TODO stacks arent empty
function randStacks(nlists, maxsize) {

    var stacklist = new Array(nlists);
    var curlimStack;

    for (i = 0; i < nlists; i++) {

        var curStackSize = getRandomInt(1, maxsize);
        curlimStack = new limStack(curStackSize);

        for (j = 0; j < getRandomInt(0, curStackSize); j++) {

            curlimStack.push(j);
        }
        stacklist[i] = curlimStack;
    }

    paintList(stacklist);
    return stacklist;

}

// inherit Person
limStack.prototype = Object.create(Array.prototype);

// correct the constructor pointer because it points to Person
limStack.prototype.constructor = limStack;



function runCode() {



    document.getElementById("console").innerHTML = "\n " + " 1";


    mainStack = randStacks(listsize, stacksize);

    document.getElementById("console").innerHTML = "\n " + testStack[0].getLimit() + "---" + testStack[0].length;


    /*
    var stack = new limStack(3);

    alert("hello world");


    stack.push("A");
    stack.push("B");
    stack.push("C");

    document.getElementById("console").innerHTML = "\n " + stack.pop();
    document.getElementById("console").innerHTML += "\n " + stack.pop();
    document.getElementById("console").innerHTML += "\n " + stack.pop();

    document.getElementById("console").innerHTML += "\n " + stack.limit;

*/
}

//Inclusive values
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randChange() {
    //Pick a random (non empty) stack (sender)

    do {
        var sender = mainStack[getRandomInt(0, listsize)];

    } while (sender.length == 0)

    //Pick a different random (non full) stack (receiver)

    do {
        var receiver = mainStack[getRandomInt(0, listsize)];

    } while (receiver.limit - receiver.length == 0)


    document.getElementById("console").innerHTML = "\n " + sender.length + "/" + sender.limit + "_____" + receiver.length + "/" + receiver.limit;
    //Move

    //var temp = sender.pop();
    receiver.push(sender.pop());

    paintList(mainStack)

}

function myMove() {
    var elem = document.getElementById("myAnimation");
    var pos = 0;
    var id = setInterval(frame, 10);
    function frame() {
        if (pos == 350) {
            clearInterval(id);
        } else {
            pos++;
            elem.style.top = pos + 'px';
            elem.style.left = pos + 'px';
        }
    }
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