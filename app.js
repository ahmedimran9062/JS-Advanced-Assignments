// Q1. Create a function that takes an array of numbers and returns a new array where each number is squared. Use map method.
console.log("Q.01");

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const squaredNums = function (arr) {
  return arr.map((num) => num ** 2);
};

console.log(squaredNums(nums));

// Q2. Write a function that takes an array of objects with name and age properties. Filter out only the users whose age is greater than 18.
console.log("Q.02");

const users = [
  { name: "Sarah", age: 16 },
  { name: "Ali", age: 23 },
  { name: "Omar", age: 19 },
  { name: "Ahmed", age: 15 },
  { name: "Fatima", age: 30 },
  { name: "Bilal", age: 13 },
];

const usersAdult = function (arr) {
  return arr.filter((user) => user.age > 18);
};

console.log(usersAdult(users));

// Q3. Given an array of products with price, use reduce to calculate the total price of all products.
console.log("Q.03");

const products = [
  { id: 1, name: "Pen", price: 2 },
  { id: 2, name: "Notebook", price: 5 },
  { id: 3, name: "Backpack", price: 40 },
  { id: 4, name: "Lunchbox", price: 15 },
  { id: 5, name: "Marker", price: 3 },
];

const totalPrice = products.reduce(
  (total, product) => total + product.price,
  0,
);

console.log(totalPrice);

// Q4. Create an array of students with marks. Sort the array in descending order based on marks.
console.log("Q.04");

const students = [
  { name: "Hamza", marks: 93 },
  { name: "Fahad", marks: 40 },
  { name: "Zainab", marks: 78 },
  { name: "Mohsin", marks: 20 },
  { name: "Hina", marks: 79 },
  { name: "Hooriya", marks: 82 },
  { name: "Mahad", marks: 35 },
  { name: "Iqra", marks: 89 },
  { name: "Ahmed", marks: 97 },
];

const studentsSortedByMarks = [...students].sort((a, b) => b.marks - a.marks);

console.log(studentsSortedByMarks);

// Q5. Write a function that takes an array of strings and finds the first string with length greater than 5 using find method.
console.log("Q.05");

const words = [
  "Car",
  "Hammer",
  "Wheelchair",
  "Pen",
  "Computer",
  "Chair",
  "Rocket",
];

const findWordByLength = function (arr, length) {
  return arr.find((word) => word.length > length);
};

console.log(findWordByLength(words, 5));

// Q6. Create an object named person with properties firstName, lastName and a method fullName that returns the full name using this keyword. Explain how this works in this context.
console.log("Q.06");

const person = {
  firstName: "Subhan",
  lastName: "Riaz",
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
};
console.log(person.fullName());

/* Explanation: this refers to the object that called the method 
In person.fullName() the object before the dot is 'person'
So this.firstName is the same as person.firstName */

// Q7. What will be the output of this code and why? Create an example to show the difference between regular function and arrow function when using this inside an object.
console.log("Q.07");

/* ANS. Regular function gets its own "this", a regular function sets 'this' based on how its called i.e the object before the dot
An arrow function has no 'this' of its own, it uses the 'this' from its surrounding code where it was written
So inside the object, arrow function 'this' is the outer scope and not the object where it was called*/

const user2 = {
  firstName: "Ali",
  lastName: "Raza",
  regularFullName: function () {
    return `${this.firstName} ${this.lastName}`;
  },
  arrowFullName: () => {
    return `${this.firstName} ${this.lastName}`;
  },
};

console.log(user2.regularFullName()); // Ali Raza
console.log(user2.arrowFullName()); // undefined undefined

// Arrow function gave undefined ignoring user2 and used this from the global scope which has no firstName or lastName

// Q8. Write a function that takes an array of numbers, filters even numbers, then doubles them using map, and finally returns the sum of those doubled numbers using reduce. Do it in a chain.
console.log("Q.08");

const numbers = [1, 2, 3, 4, 5, 6, 8, 9, 12, 15, 16, 23, 26, 29];

const numbersSumDoubledEvens = function (arr) {
  return arr
    .filter((num) => num % 2 === 0)
    .map((num) => num * 2)
    .reduce((total, num) => total + num, 0);
};

console.log(numbersSumDoubledEvens(numbers));

// Q9. Create an array of employees with name, department and salary
console.log("Q.09");

const employees = [
  { name: "Ali Khan", department: "Engineering", salary: 150000 },
  { name: "Fatima Ahmed", department: "Marketing", salary: 120000 },
  { name: "Usman Tariq", department: "HR", salary: 95000 },
  { name: "Ayesha Malik", department: "Finance", salary: 180000 },
  { name: "Bilal Raza", department: "Engineering", salary: 165000 },
  { name: "Zainab Sheikh", department: "Sales", salary: 110000 },
  { name: "Hamza Farooq", department: "Marketing", salary: 135000 },
  { name: "Sana Mir", department: "Finance", salary: 140000 },
  { name: "Hassan Ali", department: "Research", salary: 200000 },
  { name: "Mehwish Hayat", department: "HR", salary: 105000 },
];

// a) Find an Employee by department | function
const findEmployee = function (arr, dept) {
  return arr.find((employee) => employee.department === dept);
};
console.log(findEmployee(employees, "HR"));

// b) Sort employees by salary
const employeesSortBySalary = [...employees].sort(
  (a, b) => a.salary - b.salary,
);

console.log(employeesSortBySalary);

// Q10. Create a function that takes an object and returns an array of its keys and values separately, then create a new object from an array of key-value pairs. Use Object.keys, Object.values, and Object.fromEntries.
console.log("Q.10");

const user = { name: "Sara", age: 22, city: "Karachi" };

// a) Function to extract keys and values from an object
function splitObject(obj) {
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  return [keys, values];
}
const [userKeys, userValues] = splitObject(user);

console.log(userKeys);
console.log(userValues);

//b) An array of key-value pair and a new object using the pair

const keyValuePair = [
  ["name", "Sara"],
  ["age", 22],
  ["city", "Karachi"],
];
const newObject = Object.fromEntries(keyValuePair);

console.log(newObject);
