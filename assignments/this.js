/* The four principles of "this";
 * in your own words. explain the four principle for the "this" keyword below.
 *
 * 1. Gobal Scope
 * 2. Implicit Binding
 * 3. New Binding
 * 4. Explicit Binding
 *
 * write out a code example of each explanation above
 */

// Principle 1
// In the global scope, the value of “this” will be the window Object for Browsers / console Object for Node;

//Global scope
// code example for Window
function sayName(name) {
  console.log(this);
  return name;
}
sayName('Ike'); // window{}, Ike

// Principle 2
// Calling a function by a preceding dot, the object before that dot is this.

// code example for Implicit Binding
const myObj = {
  greeting: 'Hello',
  sayHello: function(name) {
    console.log(`${this.greeting} my name is ${name}`);
    console.log(this);
  }
};
myObj.sayHello('Ryan'); // 'Hello', myObj{}

// Principle 3
// Whenever a constructor function is used, this refers to the specific instance of the object that is created and returned by the constructor function.

// code example for New Binding
function CordialPerson(greeter) {
  this.greeting = 'Hello ';
  this.greeter = greeter;
  this.speak = function() {
    console.log(this.greeting + this.greeter);
    console.log(this);
  };
}

const jerry = new CordialPerson('Newman');
const newman = new CordialPerson('Jerry');

jerry.speak(); // Hello, Newman
newman.speak(); // hello, Jerry

// Principle 4
// Whenever JavaScript’s call or apply method is used, this is explicitly defined.
// code example for Explicit Binding
jerry.speak.call(newman); // Hello Jerry
newman.speak.apply(jerry); // Hello Newman
