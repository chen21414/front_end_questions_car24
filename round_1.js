//what is going to be the console log of a
function abc() {
  console.log(a, b, c);

  const c = 30; //still undefined, store in temporary dead zone
  let b = 20; //still undefined, store in temporary dead zone
  var a = 10;
}
// answer: undefined
abc();

//Question 2: Implicit and Explicit Binding
var obj = {
  name: "Piyush",
  display: function () {
    console.log(this.name);
  },
};

var obj1 = {
  name: "ABC",
};

obj.display.call(obj1); //with the help of using explicit binding by using call
//we take the context as obj1, it will refer to obj1 and return ABC

//obj.display(); if we only call this, we will get return Piyush

//if we change display into arrow function, we won't get anything by using call
//the this inside arrow refer to window
var obj = {
  name: "Piyush",
  display: () => {
    console.log(this.name);
  },
};

//question#3, implementing a caching or a memorize function in js
const clumsysquare = (num1, num2) => {
  for (let i = 1; i <= 1000000000; i++) {}

  return num1 * num2;
};

console.log("First call");
console.log(clumsysquare(9467, 7649));
console.timeEnd("first call"); //40.2109375ms

console.log("second call");
console.log(clumsysquare(9467, 7649));
console.timeEnd("second call"); //42.37109375ms

//how can we minimize the calculation, if the parameter of the function
//are same, we need to cache the result of previous function somewhere

//answer:
function myMemoize(fn, context) {
  const res = {};
  return function (...args) {
    var argsCache = JSON.stringify(args);
    //this args cache will contain all of these arguments
    if (!res[argsCache]) {
      //if we don't have this argument inside this object
      //res[9467, 7649]
      res[argsCache] = fn.call(context || this, ...args); //context is optional, if don't exist use current contetxt
    }
    return res[argsCache];
  };
}

//if provide 5, 6
// res = {
//   "5, 6": 30,
// }

const clumsyProduct = (num1, num2) => {
  for (let i = 1; i <= 1000000000; i++) {}

  return num1 * num2;
};

const memoizedClumzyProduct = myMemoize(clumsyProduct);

console.log("First call");
console.log(memoizedClumzyProduct(9467, 7649));
console.timeEnd("first call"); //49.2109375ms

console.log("second call");
console.log(memoizedClumzyProduct(9467, 7649));
console.timeEnd("second call"); //0.37109375ms

//much faster when runs again

//Question#4 Output based question on event loop
console.log("a");
setTimeout(() => console.log("set"), 0);
Promise.resolve(() => console.log("pro")).then((res) => res());
console.log("b");

//which one of the above will run first
//a
//b
//pro, promise runs after our complete code inside js. It goes to micro task queue (priority queue)
//set, setTimeout is not part of js. It's part of our web apis. settimeout ran when complete code inside of our js file has ran successfully. It goes inside the task queue

//question#5: Infinite Currying
// function add(a) {
//   return function (b) {
//     return function () {
//       return a + b;
//     };
//   };
// } with two only

function add(a) {
  return function (b) {
    if (b) return add(a + b);
    return a; //if b dont have any value, return a (total)
  };
}
console.log(add(5)(2)(4)(5)());

//question#6: Implement this code

const calc = {
  total: 0,
  add(a) {
    this.total += a;
    return this; //why return this; because need to return this whole object over here
  },
  multiply(a) {
    this.toal *= a;
    return this;
  },
  substract(a) {
    this.total -= a;
    return this;
  },
};

const result = calc.add(10).multiply(5).subtract(30).add(10);
console.log(result.total);
