
let transactions = JSON.parse(

localStorage.getItem("expense")

) || [];

function save(){

localStorage.setItem(

"expense",

JSON.stringify(transactions)

);

}

function addTransaction(){

const desc = document.getElementById(

'desc').value;

const amount = Number(

document.getElementById(

'amount').value);

const category =

document.getElementById(

'category').value;

const type =

document.getElementById(

'type').value;

transactions.push({

desc,

amount,

category,

type

});

save();

display();

}

function display(){

let tbody =

document.getElementById(

'tbody');

tbody.innerHTML='';

let income=0;

let expense=0;

transactions.forEach((t,i)=>{

tbody.innerHTML+=`

<tr>

<td>${t.desc}</td>

<td>${t.category}</td>

<td>₹${t.amount}</td>

<td>${t.type}</td>

<td>

<button onclick=
"remove(${i})">

Delete

</button>

</td>

</tr>

`;

if(t.type==='income')

income+=t.amount;

else

expense+=t.amount;

});

document.getElementById(

'income').innerHTML=

'₹'+income;

document.getElementById(

'expense').innerHTML=

'₹'+expense;

document.getElementById(

'balance').innerHTML=

'₹'+(income-expense);

drawChart(income,expense);

}

function remove(i){

transactions.splice(i,1);

save();

display();

}

let chart;

function drawChart(income,expense){

if(chart){

chart.destroy();

}

chart = new Chart(

document.getElementById(

'myChart'),

{

type:'doughnut',

data:{

labels:[

'Income',

'Expense'

],

datasets:[{

data:[

income,

expense

],

backgroundColor:[

'green',

'red'

]

}]

}

}

);

}

document.getElementById(

'themeBtn')

.onclick=function(){

document.body.classList.toggle(

'dark'

);

}

display();
