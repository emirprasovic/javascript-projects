// const questions = [
//     {
//         question: "Pitanje 1",
//         answer: {
//             "Answer1": false,
//             "Answer2": true,
//             "Answer3": false,
//             "Answer4": false,
//         }
//     }
// ]

const questions = [
    {
        question: "Koje je naljepse ime na svijetu?",
        answers: [
            {text: "Emir", value: true},
            {text: "Amar", value: false},
            {text: "Amer", value: false},
            {text: "Aner", value: false}
        ]
    },
    {
        question: "Koje je najruznije ime na svijetu?",
        answers: [
            {text: "Emir", value: false},
            {text: "Amar", value: true},
            {text: "Amer", value: true},
            {text: "Aner", value: true}
        ]
    },
    {
        question: "Kako se zove najjaci momak na svijetu?",
        answers: [
            {text: "Emir Prasovic", value: true},
            {text: "Amar Prasovic", value: false},
            {text: "Amer P", value: false},
            {text: "Aner P", value: false}
        ]
    },    {
        question: "Ko je naljepsi na svijetu?",
        answers: [
            {text: "Emir", value: true},
            {text: "Amar", value: false},
            {text: "Amer", value: false},
            {text: "Aner", value: false}
        ]
    }

]

const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const actionBtn = document.querySelector(".action_btn");

let questionIndex = 0;
let score = 0;

const startQuiz = () => {
    questionIndex = 0;
    score = 0;
    actionBtn.innerHTML = "Next";
    showQuestions();
}

const showQuestions = () => {
    resetState(); // remove previous answers
    let currentQuestion = questions[questionIndex];
    let questionNumber = questionIndex + 1;
    question.innerHTML = questionNumber + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        let answerBtn = document.createElement("button");
        answerBtn.classList.add("answer");
        answerBtn.innerHTML = answer.text;
        answers.appendChild(answerBtn);

        if(answer.value)  { //if answer.value == true, onda na answer dugme dodamo dataset value i damo mu value = true
            answerBtn.dataset.value = answer.value;
        }
        //console.log(answerBtn.dataset);

        answerBtn.addEventListener("click", selectAnswer);
        // isto sto i answerBtn.addEventListener("click", (e) => {
        //    
        //})
    })
}

const resetState = () => {
    actionBtn.style.display = "none";
    while(answers.firstChild) {
        answers.removeChild(answers.firstChild);
    }
}

const selectAnswer = (e) => {
    const selectedBtn = e.target;
            const isCorrect = selectedBtn.dataset.value === "true";
            //console.log(isCorrect);
            if(isCorrect) {
                selectedBtn.classList.add("correct");
                score++;
            }else {
                selectedBtn.classList.add("incorrect");
            }
            // answers.forEach(answerBtn => {
            //     if(answerBtn.dataset.value === "true") {
            //         answerBtn.classList.add("correct");
            //     }
            // })
            // NAPRAVIMO ARRAY OD answers children (answer) i onda foreach kroz taj array
            Array.from(answers.children).forEach(answerBtn => {
                if(answerBtn.dataset.value === "true") {
                    answerBtn.classList.add("correct");
                }
                answerBtn.disabled = true; // DA IH NE MOZEMO VISE CLICKATI
            })
            actionBtn.style.display = "block";
}

const handleNextButton = () => {
    questionIndex++;
    if(questionIndex < questions.length) {
        showQuestions();
    }else {
        showScore();
    }
}

const showScore = () => {
    resetState();
    question.innerHTML = "Your score: " + score + "/" + questions.length;
    actionBtn.style.display = "block";   
    actionBtn.innerHTML = "Play again";
}

actionBtn.addEventListener("click", () => {
    if(questionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();