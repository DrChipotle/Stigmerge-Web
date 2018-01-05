
function limStack(i_lim) {

    Array.call(this);

    this.limit = i_lim;

    this.getLimit = function() {
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

function randStacks(nlists, maxsize) {

    var stacklist = new Array(nlists);

    var curlimStack;

    for (i = 0; i < nlists; i++) {

        var curStackSize = Math.floor((Math.random() * maxsize) + 1);;
        curlimStack = new limStack(curStackSize);

        for (j = 0; j < curStackSize; j++) {

            curlimStack.push(j);
        }
        stacklist[i] = curlimStack;
    }
    return stacklist;

}

// inherit Person
limStack.prototype = Object.create(Array.prototype);

// correct the constructor pointer because it points to Person
limStack.prototype.constructor = limStack;



function runCode() {



    document.getElementById("console").innerHTML = "\n " + " 1";


    var testStack = randStacks(3, 4);

    document.getElementById("console").innerHTML = "\n " + testStack[0].getLimit();


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


new Chart(document.getElementById("bar-chart"), {
    type: 'bar',
    data: {
      labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [2478,5267,734,784,433]
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Predicted world population (millions) in 2050'
      }
    }
});