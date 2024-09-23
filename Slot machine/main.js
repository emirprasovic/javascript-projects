// deposit some money
// check number of lines to bet on
// place a bet
// spin
// check if user won
// give winnings
// play again

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;
const SYMBOLS_COUNT = {
    "🍓": 3,
    "🍌": 6,
    "🍒": 7,
    "🍇":12
   // "🍋": 15
}
const SYMBOL_VALUES = {
    "🍓": 10,
    "🍌": 7,
    "🍒": 5,
    "🍇": 3
    // "🍋": 2
}



const deposit = () => { 
    while(true) {
        const depositAmount = prompt("Enter deposit amount: ");
        const deposit = parseFloat(depositAmount);
        if(isNaN(deposit) || deposit < 0) {
            console.log("Invalid deposit amount");
        }
        else {
            return deposit;
        }
    }
}

const getNumberOfLines = () => {
    while(true) {
        const numberOfLines = parseInt(prompt("Enter number of lines(1-3): "));
        if(isNaN(numberOfLines) || numberOfLines > 3 || numberOfLines < 1) {
            console.log("Invalid input");
        }
        else {
            return numberOfLines;
        }
    }
}

const getBet = (balance, numberOfLines) => {
    while(true) {
        const betAmount = parseFloat(prompt("Input bet: "));
        if(isNaN(betAmount) || betAmount > balance/numberOfLines || betAmount < 0) {
            console.log("Invalid input");
        }
        else {
            return betAmount;
        }
    }
}

const spin = () => {
    // dodamo sve simbole u jedan array
    const symbols = [];
    for(const[symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for(let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    // sada te simbole poredamo u slotove
    const slots = [];
    for(let i = 0; i < ROWS; i++) {
        slots.push([]);
        const reelSymbols = [...symbols];
        for(let j = 0; j < COLS; j++) {
            let randomSymbolIndex = Math.floor(Math.random() * reelSymbols.length);
            slots[i].push(reelSymbols[randomSymbolIndex]);
            reelSymbols.splice(randomSymbolIndex, 1);
        }
    }
    return slots;
}

// {A A A}      {A B C}
// {B D A} ==>  {A D C}
// {C C B}      {A A B}

const transpose = (slots) => {
    const newSlots = [];

    for(let i = 0; i < ROWS; i++) {
        newSlots.push([]);
        for(let j = 0; j < COLS; j++) {
            newSlots[i].push(slots[j][i]);
        }
    }
    return newSlots;
} 

const printSlots1 = (slots) => {
    for(let i = 0; i < ROWS; i++) {
        console.log(slots[i]);
    }
}
const printSlots = (slots) => {
    for(let j = 0; j < ROWS; j++) {
        let rowString = "";
        for(let i = 0; i < COLS; i++) {
            rowString += slots[j][i];
            if(i != COLS - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
}

const getWinnings = (slots, bet, lines) => {
    let winnings = 0;

    for(let i = 0; i < lines; i++) {
        let allSame = true;
        for(let j = 1; j < COLS; j++) {
            if(slots[i][j] != slots[i][0]) {
                allSame = false;
                break;
            }
        }
        if(allSame) {
            winnings+= bet * SYMBOL_VALUES[slots[i][0]];
            console.log("ROW " + i + ", winnings : " + bet * SYMBOL_VALUES[slots[i][0]]);
        }
        else {
            console.log("You didn't win at ROW " + i);
        }
    }
    return winnings;
}


const game = () => { 
    let balance = deposit();

    while(true) {
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        
        balance -= bet * numberOfLines;
        console.log("New balance: " + balance);

        let slots = spin();
        //console.log(slots);
        let transposedSlots = transpose(slots);
        //console.log(transposedSlots);
        printSlots(transposedSlots);
        
        let winnings = getWinnings(transposedSlots, bet, numberOfLines);
        balance += winnings;
        console.log("New balance: ", balance);

        if(balance == 0) {
            break;
        }

        let playAgain = prompt("Do you want to play again(y/n): ");
        if(playAgain == "n") {
            console.log("Goodbye!");
            break;
        }
    }
}

game();