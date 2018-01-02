<<<<<<< HEAD

function limStack(i_lim) {

    Array.call(this);

    this.limit = i_lim;
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

function runCode() {


    /*
    function Stack(i_lim) {
    
        i_limit;

        this.stac = new Array();

        this.pop = function () {
            return this.stac.pop();
        }

        this.push = function (item) {
            this.stac.push(item);
        }
    }
    */

    //var stack = new Array;
    var stack = new limStack(3);

    alert("hello world");

    
    stack.push("A");
    stack.push("B");
    stack.push("C");

    document.getElementById("console").innerHTML = "\n " + stack.pop();
    document.getElementById("console").innerHTML += "\n " + stack.pop();
    document.getElementById("console").innerHTML += "\n " + stack.pop();

    document.getElementById("console").innerHTML += "\n " + stack.limit;

    /*
    
        function Stack(i_lim) {
    
            i_limit;
    
            this.stac = new Array();
    
            this.pop = function () {
                return this.stac.pop();
            }
    
            this.push = function (item) {
                this.stac.push(item);
            }
        }
    
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
=======

function limStack(i_lim) {

    Array.call(this);

    this.limit = i_lim;
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

function runCode() {


    /*
    function Stack(i_lim) {
    
        i_limit;

        this.stac = new Array();

        this.pop = function () {
            return this.stac.pop();
        }

        this.push = function (item) {
            this.stac.push(item);
        }
    }
    */

    //var stack = new Array;
    var stack = new limStack(3);

    alert("hello world");

    
    stack.push("A");
    stack.push("B");
    stack.push("C");

    document.getElementById("console").innerHTML = "\n " + stack.pop();
    document.getElementById("console").innerHTML += "\n " + stack.pop();
    document.getElementById("console").innerHTML += "\n " + stack.pop();

    document.getElementById("console").innerHTML += "\n " + stack.limit;

    /*
    
        function Stack(i_lim) {
    
            i_limit;
    
            this.stac = new Array();
    
            this.pop = function () {
                return this.stac.pop();
            }
    
            this.push = function (item) {
                this.stac.push(item);
            }
        }
    
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
>>>>>>> df17e4a04c80db139cd57c0dee505f3071bb0ae5
}