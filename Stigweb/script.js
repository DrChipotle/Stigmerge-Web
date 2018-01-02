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
    


    
    alert("hello world");

    document.getElementById("console").innerHTML += 5 + 6;

    

    /*
    var stack = new Stack();

    
    stack.push("A");
    stack.push("B");
    stack.push("C");

    alert(stack.pop());
    alert(stack.pop());
    alert(stack.pop());

*/
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
}