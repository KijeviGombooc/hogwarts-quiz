import { addData } from './firebase-firestore.js';

for (let questionIndex = 0; questionIndex < data.length; questionIndex++) {
    const questionData = data[questionIndex];
    let questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
    let questionH3 = document.createElement("h3");
    questionH3.textContent = questionData.title;
    questionDiv.appendChild(questionH3);
    for (let answerIndex = 0; answerIndex < questionData.answers.length; answerIndex++) {
        let answerData = questionData.answers[answerIndex];
        let answerLabel = document.createElement("label");
        let answerInput = document.createElement("input");
        answerInput.type = "radio";
        answerInput.name = "question" + questionIndex;
        answerInput.value = answerIndex;
        let answerSpan = document.createElement("span");
        answerSpan.classList.add("option");
        answerSpan.textContent = answerData.text;
        answerLabel.appendChild(answerInput);
        answerLabel.appendChild(answerSpan);
        questionDiv.appendChild(answerLabel);
    }
    optionsHolder.appendChild(questionDiv);
}

let resultText = document.getElementById("result");

function submitQuiz() {
    const quizForm = document.getElementById('quizForm');
    const inputs = quizForm.querySelectorAll('input[type="text"], input[type="radio"]');
    let allAnswered = true;

    // Clear previous highlights
    const questions = quizForm.querySelectorAll('.question');
    resultText.textContent = "";
    resultText.style.color = 'green';
    questions.forEach(question => {
        question.style.border = 'none';
    });

    // Collect radiobutton groups
    const radioGroups = {};
    inputs.forEach(input => {
        if (input.type === 'radio') {
            if (!radioGroups[input.name]) {
                radioGroups[input.name] = [];
            }
            radioGroups[input.name].push(input);
        }
    });
    // check if groups have been answered
    for (const groupName in radioGroups) {
        const group = radioGroups[groupName];
        console.log(typeof (group));
        const isSelected = group.some(input => input.checked);
        if (!isSelected) {
            allAnswered = false;
            const questionDiv = group[0].closest('.question');
            if (questionDiv) {
                questionDiv.style.border = '2px solid red';
            }
        }
    }

    if (!allAnswered) {
        resultText.textContent = "Please answer all questions";
        resultText.style.color = 'red';
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        return;
    }

    const formData = new FormData(quizForm);
    let results = {};
    for (let [key, value] of formData.entries()) {
        results[key] = value;
    }

    addData(results);
    resultText.textContent = "Successfully submitted!";
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

submitButton.addEventListener('click', submitQuiz);