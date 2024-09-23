const createBtn = document.querySelector(".create");
const notes = document.querySelector(".notes");
//let note = document.querySelectorAll(".note");

const saveData = () => {
    localStorage.setItem("notesData", notes.innerHTML);
}

const showData = () => {
    notes.innerHTML = localStorage.getItem("notesData");
    //console.log(localStorage.getItem("data"));
}

showData();
//console.log(notes.innerHTML);
//console.log(showData());

createBtn.addEventListener("click", () => {
    let textbox = document.createElement("textarea");
    let deleteIcon = document.createElement("span");
    let textWrap = document.createElement("div");
    
    deleteIcon.classList.add("material-symbols-outlined");
    deleteIcon.innerHTML = "delete";
    textbox.classList.add("note");

    textWrap.classList.add("note_element");
    textWrap.appendChild(textbox);
    textWrap.appendChild(deleteIcon);

    notes.appendChild(textWrap);

     saveData(); // saveamo svaki textbox iako je prazan
})

notes.addEventListener("click", (e) => {
    if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
    else if(e.target.tagName === "TEXTAREA") {
       //console.log("TEXTAREA");
       let noteList = document.querySelectorAll(".note");
       noteList.forEach(note => {
            note.addEventListener("input", (e) => {
            //console.log("hello");
            note.innerHTML = e.target.value; // OVAJ LINE JE POTREBAN DA SE SAVEA TEXT, JER MORAMO PRVO UPDATEAT HTML PA GA SPASITI
            //console.log(localStorage.getItem("data"));
            saveData();
            })
       })
    }
})

// let noteList = document.querySelectorAll(".note");
//        noteList.forEach(note => {
//             note.addEventListener("input", (e) => {
//             console.log(e.target.value);
//             //console.log(localStorage.getItem("data"));
//             //saveData();
//             })
//        })