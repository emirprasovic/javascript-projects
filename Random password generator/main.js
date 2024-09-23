const passwordField = document.querySelector(".password_field");
const generate = document.querySelector(".btn_generate");
const copy = document.getElementById("copy");
const length = 14;

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYUZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyuz";
const numbers = "1234567890";
const symbols = "!#$%&()[]@{}+-=/*";

const allChars = upperCase + lowerCase + numbers + symbols;
//console.log(allChars);

const generatePassword = () => {
    //console.log(Math.floor(Math.random() * upperCase.length));
    let password = "";
    while(password.length < length) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    //console.log(password);
    passwordField.value = password;
}

const copyPassword = () => {
    passwordField.select();
    navigator.clipboard.writeText(passwordField.value);

    /*navigator.clipboard.writeText(passwordField.value): This line uses the navigator.clipboard API to write the text value of the passwordField to the clipboard. Here's how it works:
    navigator.clipboard: This is a JavaScript API that provides access to the clipboard. It allows you to interact with the system clipboard for copying 
    and pasting text or other data
    .writeText(passwordField.value): This part of the code instructs the clipboard to write the text contained in the passwordField.
    In your case, passwordField.value represents the current value of the password input field. */

    // A clipboard is a software feature or a temporary storage area 
    // in a computer's operating system that allows you to copy and paste data 
    // (text, images, files, etc.) from one location to another within or between applications.
    // It acts as an intermediary for transferring data, making it easy to move or duplicate information.
}

generate.addEventListener("click", generatePassword);
copy.addEventListener("click", copyPassword);