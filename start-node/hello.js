'use strict';

var s = 'Hello';

function greet(name){
    console.log(s + ','+ name + '!');
}

function sayHi(){
    console.log('hi');
}
module.exports = {
    greet: greet,
    sayHi: sayHi
}