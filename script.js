// Initialize balance and transaction history from local storage
let balance = parseFloat(localStorage.getItem('balance')) || 0;
const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// DOM Elements
const balanceDisplay = document.getElementById('balance');
const amountInput = document.getElementById('amount');
const historyList = document.getElementById('historyList');
const transactionHistory = document.getElementById('transactionHistory');

// Update Balance and Save to Local Storage
function updateBalanceDisplay() {
    balanceDisplay.textContent = balance.toFixed(2);
    localStorage.setItem('balance', balance); // Save balance to local storage
}

// Add a Transaction to History
function addTransaction(type, amount) {
    const transaction = { type, amount, date: new Date().toLocaleString() };
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions)); // Save transactions to local storage
    renderTransactionHistory();
}

// Render Transactions in History
function renderTransactionHistory() {
    historyList.innerHTML = ''; // Clear history list
    transactions.forEach(({ type, amount, date }) => {
        const transaction = document.createElement('li');
        transaction.textContent = `${type}: ₹${amount.toFixed(2)} (${date})`;
        transaction.style.borderLeftColor = type === 'Deposit' ? '#4CAF50' : '#FF5722';
        historyList.appendChild(transaction);
    });
}

// Deposit Functionality
function deposit(amount) {
    if (amount > 0) {
        balance += amount;
        updateBalanceDisplay();
        addTransaction('Deposit', amount);
        amountInput.value = '';
    } else {
        alert('Please enter a valid amount.');
    }
}

// Withdraw Functionality
function withdraw(amount) {
    if (amount > 0) {
        if (amount <= balance) {
            balance -= amount;
            updateBalanceDisplay();
            addTransaction('Withdraw', amount);
            amountInput.value = '';
        } else {
            alert('Insufficient balance.');
        }
    } else {
        alert('Please enter a valid amount.');
    }
}

// Show/Hide Transaction History
function toggleTransactionHistory() {
    if (transactionHistory.style.display === 'none' || transactionHistory.style.display === '') {
        transactionHistory.style.display = 'block';
    } else {
        transactionHistory.style.display = 'none';
    }
}

// Event Listeners
document.getElementById('depositBtn').addEventListener('click', () => {
    const amount = parseFloat(amountInput.value);
    deposit(amount);
});

document.getElementById('withdrawBtn').addEventListener('click', () => {
    const amount = parseFloat(amountInput.value);
    withdraw(amount);
});

document.getElementById('historyBtn').addEventListener('click', toggleTransactionHistory);

// Initialize App
function initializeApp() {
    updateBalanceDisplay();
    renderTransactionHistory();
}

// Call initialize function on load
initializeApp();
