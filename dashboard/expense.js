// =======================================
// DOM Elements
// =======================================

const desc = document.querySelector("#desc");
const amount = document.querySelector("#amount");
const category = document.querySelector("#category");
const type = document.querySelector("#type");

const addBtn = document.querySelector("#addBtn");
const tbody = document.querySelector("#tbody");

const incomeEl = document.querySelector("#income");
const expenseEl = document.querySelector("#expense");
const balanceEl = document.querySelector("#balance");

const search = document.querySelector("#search");
const filter = document.querySelector("#filter");

const themeBtn = document.querySelector("#themeBtn");

const countEl = document.querySelector("#count");
const monthExpenseEl = document.querySelector("#monthExpense");

let chart;

// =======================================
// State
// =======================================

let transactions =
JSON.parse(
localStorage.getItem("transactions")
) || [];

// =======================================
// Save
// =======================================

function save() {

localStorage.setItem(

"transactions",

JSON.stringify(transactions)

);

}

// =======================================
// Add Transaction
// =======================================

function addTransaction(){

if(

desc.value.trim()===""

||

amount.value===""

){

alert(

"Please fill all fields"

);

return;

}

const transaction = {

id: crypto.randomUUID(),

description:

desc.value,

amount:

Number(

amount.value

),

category:

category.value,

type:

type.value,

date:

new Date()

.toLocaleDateString()

};

transactions.push(

transaction

);

save();

render();

clearInputs();

}

// =======================================
// Clear Inputs
// =======================================

function clearInputs(){

desc.value="";

amount.value="";

category.selectedIndex=0;

type.selectedIndex=0;

}

// =======================================
// Delete
// =======================================

function deleteTransaction(id){

transactions =

transactions.filter(

t => t.id !== id

);

save();

render();

}

// =======================================
// Edit
// =======================================

function editTransaction(id){

const transaction =

transactions.find(

t => t.id===id

);

desc.value =

transaction.description;

amount.value =

transaction.amount;

category.value =

transaction.category;

type.value =

transaction.type;

transactions =

transactions.filter(

t=>t.id!==id

);

save();

render();

}

// =======================================
// Summary
// =======================================

function calculateSummary(){

const income =

transactions

.filter(

t=>t.type==="income"

)

.reduce(

(sum,t)=>

sum+t.amount,

0

);

const expense =

transactions

.filter(

t=>t.type==="expense"

)

.reduce(

(sum,t)=>

sum+t.amount,

0

);

incomeEl.textContent =

`₹${income}`;

expenseEl.textContent =

`₹${expense}`;

balanceEl.textContent =

`₹${income-expense}`;

const currentMonth =

new Date()

.getMonth();

const monthlyExpense =

transactions

.filter(

t=>

t.type==="expense"

&&

new Date(

t.date

)

.getMonth()

===

currentMonth

)

.reduce(

(sum,t)=>

sum+t.amount,

0

);

if(monthExpenseEl){

monthExpenseEl.textContent =

`₹${monthlyExpense}`;

}

updateChart(

income,

expense

);

}

// =======================================
// Render
// =======================================

function render(

list = transactions

){

tbody.innerHTML="";

if(

list.length===0

){

tbody.innerHTML =

`

<tr>

<td colspan="6">

No Transactions Found

</td>

</tr>

`;

calculateSummary();

if(countEl){

countEl.textContent = 0;

}

return;

}

list.forEach(

t=>{

const row =

document.createElement(

"tr"

);

row.innerHTML =

`

<td>

${t.description}

</td>

<td>

${t.category}

</td>

<td>

₹${t.amount}

</td>

<td>

${t.type}

</td>

<td>

${t.date}

</td>

<td>

<button

class="edit"

data-id="${t.id}"

>

Edit

</button>

<button

class="delete"

data-id="${t.id}"

>

Delete

</button>

</td>

`;

if(

transactions.indexOf(t)

===

transactions.length-1

){

row.classList.add(

"latest"

);

}

tbody.append(

row

);

}

);

if(countEl){

countEl.textContent =

list.length;

}

calculateSummary();

}

// =======================================
// Search
// =======================================

search.addEventListener(

"input",

()=>{

const value =

search.value

.toLowerCase();

const filtered =

transactions.filter(

t=>

t.description

.toLowerCase()

.includes(

value

)

);

render(

filtered

);

}

);

// =======================================
// Filter
// =======================================

filter.addEventListener(

"change",

()=>{

const value =

filter.value;

if(

value==="all"

){

render();

return;

}

const filtered =

transactions.filter(

t=>

t.type===value

);

render(

filtered

);

}

);

// =======================================
// Table Events
// =======================================

tbody.addEventListener(

"click",

e=>{

const id =

e.target.dataset.id;

if(

e.target.classList

.contains(

"delete"

)

){

deleteTransaction(

id

);

}

if(

e.target.classList

.contains(

"edit"

)

){

editTransaction(

id

);

}

}

);

// =======================================
// Sort Amount
// =======================================

const sortAmount =

document.querySelector(

"#sortAmount"

);

if(sortAmount){

sortAmount

.addEventListener(

"click",

()=>{

transactions.sort(

(a,b)=>

a.amount

-

b.amount

);

render();

}

);

}

// =======================================
// Sort Date
// =======================================

const sortDate =

document.querySelector(

"#sortDate"

);

if(sortDate){

sortDate

.addEventListener(

"click",

()=>{

transactions.sort(

(a,b)=>

new Date(

a.date

)

-

new Date(

b.date

)

);

render();

}

);

}

// =======================================
// Export CSV
// =======================================

const exportBtn =

document.querySelector(

"#export"

);

if(exportBtn){

exportBtn

.addEventListener(

"click",

()=>{

let csv =

"Description,Category,Amount,Type,Date\n";

transactions.forEach(

t=>{

csv +=

`${t.description},

${t.category},

${t.amount},

${t.type},

${t.date}\n`;

}

);

const blob =

new Blob(

[csv],

{

type:

"text/csv"

}

);

const url =

URL.createObjectURL(

blob

);

const a =

document.createElement(

"a"

);

a.href = url;

a.download =

"transactions.csv";

a.click();

}

);

}

// =======================================
// Clear All
// =======================================

const clearAll =

document.querySelector(

"#clearAll"

);

if(clearAll){

clearAll

.addEventListener(

"click",

()=>{

if(

confirm(

"Delete all transactions?"

)

){

transactions=[];

save();

render();

}

}

);

}

// =======================================
// Chart
// =======================================

function updateChart(

income,

expense

){

const ctx =

document.getElementById(

"myChart"

);

if(!ctx) return;

if(chart){

chart.destroy();

}

chart =

new Chart(

ctx,

{

type:

"doughnut",

data:{

labels:[

"Income",

"Expense"

],

datasets:[{

data:[

income,

expense

],

backgroundColor:[

"#22c55e",

"#ef4444"

],

borderWidth:0

}]

},

options:{

responsive:true,

plugins:{

legend:{

position:

"bottom"

}

}

}

}

);

}

// =======================================
// Theme
// =======================================

themeBtn

.addEventListener(

"click",

()=>{

document.body

.classList.toggle(

"dark"

);

localStorage

.setItem(

"theme",

document.body

.classList.contains(

"dark"

)

);

}

);

// =======================================
// Load Theme
// =======================================

if(

localStorage.getItem(

"theme"

)==="true"

){

document.body

.classList.add(

"dark"

);

}

// =======================================
// Enter Key Support
// =======================================

document.addEventListener(

"keypress",

e=>{

if(

e.key==="Enter"

){

addTransaction();

}

}

);

// =======================================
// Add Button
// =======================================

addBtn

.addEventListener(

"click",

addTransaction

);

// =======================================
// Initial Render
// =======================================

render();
