let inputField = document.querySelector(".input h2");
let output = document.querySelector(".output h2");

const displayEquation = e => {
    let targetValue = e.target.innerHTML;
    if (e.target.classList.contains("operator") && inputField.innerHTML.length === 0) {
        inputField.innerHTML += output.innerHTML;
        inputField.innerHTML += targetValue;
    } else {
        inputField.innerHTML += targetValue;
    }
}

const calculate = (input) => {
    try {
        const power = /\^+/g;
        const sqrt = /√+/g;
        const numPrecedingSqrt = /(?<=[\d])√/g;
        const trailingZeros = /(?<=[\.\d]+)[0]+$/;

        //Check whether there is a power symbol
        if (input.match(power)) {
            input = input.replace(power, "**");
        }
        
        // Check whether there are any square roots at all
        if (input.match(sqrt)) {
            // Check whether the square root is preceded by a number
            if (input.match(numPrecedingSqrt)) {
                input = input.replace(numPrecedingSqrt, "* Math.sqrt");
            } else {
                input = input.replace(sqrt, "Math.sqrt");
            }
        }

        // Parse the output to 12 digits and replace any trailing zeros
        const parsed = parseFloat(eval(input)).toPrecision(12).replace(trailingZeros, "");
        if (parsed[parsed.length-1] == "."){
            // Remove final decimal - still trying to get trailingZeros regex to catch this
            output.innerHTML = parsed.slice(0, parsed.length - 1);
            inputField.innerHTML = "";
        } else {
            output.innerHTML = parsed;
            inputField.innerHTML = "";
        }

        return parsed;
    }
    catch {
        alert("Please check this equation is valid. All parentheses must be closed.");
    }
};

const clearFunction = () => {
    inputField.innerHTML = "";
    output.innerHTML = "";
}

const removeCharacter = () => {
    inputField.innerHTML = inputField.innerHTML.slice(0, inputField.innerHTML.length - 1);
}

const square = () => {
    inputField.innerHTML += "(";
}

const buttons = document.querySelectorAll(".buttons div");
buttons.forEach(button => {
    button.addEventListener("click", displayEquation)
});

const squareRoot = document.querySelector(".square-root");
squareRoot.addEventListener("click", square);

const equals = document.querySelector("button.equals");
equals.addEventListener("click", () => {
    calculate(inputField.innerHTML);
});

const clear = document.querySelector(".clear");
clear.addEventListener("click", clearFunction);

const backspace = document.querySelector(".backspace");
backspace.addEventListener("click", removeCharacter);