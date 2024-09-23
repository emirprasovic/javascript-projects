// link for sheet: https://docs.google.com/spreadsheets/d/1qMttAgleUcr_1UF5FaCfj4BNIZ43OIFE5JZpOC2aUyM/edit?gid=0#gid=0

const scriptURL =
  "https://script.google.com/macros/s/AKfycbxRU9Y6PolQe8Ug06-rjkR03v8E0oa_R2aydSEcsJGFmoUbG4ORhaEKCKG8E7LN540u/exec";
const form = document.forms["submit-to-google-sheet"];

const msgSuccess = document.querySelector(".subscribe__success--message");
const inputEmail = document.querySelector(".input__submit-to-sheet");
const btnSubmit = document.querySelector(".btn__submit-to-sheet--content");

form.addEventListener("submit", (e) => {
    msgSuccess.classList.add("hidden");
  e.preventDefault();
  btnSubmit.innerHTML = ""
  btnSubmit.classList.add("loader")
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
        console.log("Success!", response)
        msgSuccess.classList.remove("hidden");
        inputEmail.value = ""

        btnSubmit.classList.remove("loader")
        btnSubmit.innerHTML = `<img src="assets/img/send-icon.png" alt="Icon send" />`;
    })
    .catch((error) => console.error("Error!", error.message));

});
