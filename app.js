let inputField = document.querySelector(".input h2");
let output = document.querySelector(".output h2");

const displayEquation = e => {
    let input = e.target.innerHTML;
    if (e.target.classList.contains("operator") && inputField.innerHTML.length === 0) {
        inputField.innerHTML += output.innerHTML;
        inputField.innerHTML += input;
    } else {
        // input = "";
        inputField.innerHTML += input;
    }
}

const calculate = () => {
    input = inputField.innerHTML.match(/[\d\.]+|[^\d^\.]/g);
    output.innerHTML = eval(input.join(""));
    inputField.innerHTML = "";
};

const clearFunction = () => {
    inputField.innerHTML = "";
    output.innerHTML = "";
}

const buttons = document.querySelectorAll(".buttons div");
buttons.forEach(button => {
    button.addEventListener("click", displayEquation)
});

const removeCharacter = () => {
    inputField.innerHTML = inputField.innerHTML.slice(0, inputField.innerHTML.length - 1);
}

const equals = document.querySelector("button.equals");
equals.addEventListener("click", calculate);

const clear = document.querySelector("button.top");
clear.addEventListener("click", clearFunction);

const backspace = document.querySelector(".backspace");
backspace.addEventListener("click", removeCharacter);