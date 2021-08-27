//DOM Elements
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const locStoTrans = JSON.parse(
    localStorage.getItem('transactions')
    );

let transactions = 
    localStorage.getItem('transactions') !== null ?
    locStoTrans : [];

//Add Transaction
function addTrans(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add Transaction Heading and amount');
    } else {
        const transaction = {
            id: genID(),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(transaction);
        
        addTransDOM(transaction);
        
        updVal();
        
        updLocSto();
        
        text.value = '';
        amount.value = '';
    }
}

//Generate Ramdom ID
function genID() {
    return Math.floor(Math.random() * 100000000);
}

//Add transaction to DOM list
function addTransDOM(transaction) {
    //Get sign
    const sign = transaction.amount < 0 ? '-': '+'; 

    const item = document.createElement('li');
    
    //Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(
        transaction.amount
    )}</span><button class="delete-btn" onclick="remTrans(${
        transaction.id
    })">x</button> 
    `;

    list.appendChild(item);
}

//Update the balance income and expense 
function updVal() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);    
    
    const expense = (amounts
        .filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0) * 
        -1
    ).toFixed(2);
    
    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

//Remove transaction by ID
function remTrans(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    
    updLocSto();

    init();
}

//Update local storage transactions 
function updLocSto() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

//initialize app 
function init() {
    list.innerHTML = '';  

    transactions.forEach(addTransDOM);
    updVal();
}

init();

form.addEventListener('submit', addTrans);