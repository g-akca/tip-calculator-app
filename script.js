const inputs = document.querySelectorAll(".input-wrapper input");
const tipButtons = document.querySelectorAll("#tip-options button");
const bill = document.getElementById("bill");
const peopleAmount = document.getElementById("people");
const tipAmount = document.getElementById("tip-amount");
const total = document.getElementById("total");
const resetBtn = document.getElementById("reset-btn");

function calculateResults() {
    if (tipPercentage != 0 && bill.value != 0 && peopleAmount.value != 0) {
        const tipPerPerson = bill.value * tipPercentage / peopleAmount.value;
        const totalPerPerson = tipPerPerson + (bill.value / peopleAmount.value);
        tipAmount.innerText = `$${Math.round(tipPerPerson * 100) / 100}`;
        total.innerText = `$${Math.round(totalPerPerson * 100) / 100}`;
        resetBtn.disabled = false;
    }
    else {
        resetResults();
    }
}

function resetInputs() {
    inputs.forEach(inputEl => inputEl.value = "");
    tipButtons.forEach(btn => btn.classList.remove("selected"));
}

function resetResults() {
    tipAmount.innerText = "$0.00";
    total.innerText = "$0.00";
    resetBtn.disabled = true;
}

inputs.forEach(inputEl => inputEl.addEventListener("change", calculateResults));

tipButtons.forEach(tipBtn => {
    tipBtn.addEventListener("click", () => {
        if (tipBtn.classList.contains("selected")) {
            tipBtn.classList.remove("selected");
            tipPercentage = 0;
        }
        else {
            tipButtons.forEach(btn => btn.classList.remove("selected"));
            tipBtn.classList.add("selected");
            tipPercentage = tipBtn.value / 100;
        }

        calculateResults();
    })
});

resetBtn.addEventListener("click", () => {
    resetInputs();
    resetResults();
});

let tipPercentage = 0;