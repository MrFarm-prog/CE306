// Array สำหรับเก็บข้อมูลธุรกรรม
let transactions = [];

let nextId = 1;

function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}


// ==========================
// โจทย์ที่ 1
// เพิ่มรายการธุรกรรม
// ==========================
function addTransaction() {

    const name = document.getElementById("name").value.trim(); // trim กันช่องว่างล้วน
    const type = document.getElementById("type").value;
    const category = document.getElementById("category").value;
    const amount = Number(document.getElementById("amount").value);

    if (name === "" || isNaN(amount) || amount <= 0) {
        alert("กรุณากรอกข้อมูลให้ครบและถูกต้อง");
        return;
    }

    const transaction = {
        id: nextId++,
        type: type,
        name: name,
        category: category,
        amount: amount
    };

    transactions.push(transaction);

    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";

    displayTransactions();
}


// ==========================
// โจทย์ที่ 2 และ 3
// ค้นหา + แสดงประวัติ
// ==========================
function displayTransactions() {

    const list = document.getElementById("transactionList");
    const searchText = document
        .getElementById("search")
        .value
        .toLowerCase();

    list.innerHTML = "";

    // Filter ข้อมูลตามชื่อรายการ
    const filteredTransactions = transactions.filter(transaction =>
        transaction.name.toLowerCase().includes(searchText)
    );

    filteredTransactions.forEach(transaction => {

        const li = document.createElement("li");

        const typeText =
            transaction.type === "income"
                ? "รายรับ"
                : "รายจ่าย";

       
        li.innerHTML = `
            <span>
                <strong>ID: ${transaction.id}</strong>
                | ${typeText}
                | ${escapeHtml(transaction.name)}
                | ${transaction.category}
            </span>

            <span>
                ฿${transaction.amount.toFixed(2)}
            </span>
        `;

        list.appendChild(li);
    });

    updateSummary();
}


// ==========================
// โจทย์ที่ 4
// สรุปรายงานการเงิน
// ==========================
function updateSummary() {

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(transaction => {

        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }

    });

    const balance = totalIncome - totalExpense;

    document.getElementById("totalIncome").textContent =
        `฿${totalIncome.toFixed(2)}`;

    document.getElementById("totalExpense").textContent =
        `฿${totalExpense.toFixed(2)}`;

    document.getElementById("balance").textContent =
        `฿${balance.toFixed(2)}`;
}


// ==========================
// โจทย์ที่ 5
// ล้างข้อมูลทั้งหมด
// ==========================
function clearAll() {

    const confirmClear = confirm(
        "คุณต้องการล้างข้อมูลทั้งหมดใช่หรือไม่?"
    );

    if (confirmClear) {

        transactions = [];
        nextId = 1; 

        displayTransactions();
    }
}

displayTransactions();