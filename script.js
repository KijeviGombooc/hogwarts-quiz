data.forEach(questionData => {
    let questionDiv = document.createElement("div")
    questionDiv.classList.add("question")

    let questionH3 = document.createElement("h3")
    questionH3.textContent = questionData.title
    questionDiv.appendChild(questionH3)
    questionData.answers.forEach(answerData => {
        let answerLabel = document.createElement("label")
        let answerInput = document.createElement("input")
        answerInput.type = "radio"
        answerInput.name = questionData.title
        answerInput.value = answerData.text
        let answerSpan = document.createElement("span")
        answerSpan.classList.add("option")
        answerSpan.textContent = answerData.text
        answerLabel.appendChild(answerInput)
        answerLabel.appendChild(answerSpan)
        questionDiv.appendChild(answerLabel)
    });
    optionsHolder.appendChild(questionDiv)
});


function submitQuiz() {
    const quizForm = document.getElementById('quizForm');
    const formData = new FormData(quizForm);
    let allAnswered = true;

    // Clear previous highlights
    const questions = quizForm.querySelectorAll('.question');
    questions.forEach(question => {
        question.style.border = 'none';
    });

    // Check if all questions have been answered and highlight if not
    for (let i = 1; i <= 4; i++) {
        if (!formData.has(`question${i}`)) {
            allAnswered = false;
            // Highlight the unanswered question
            const questionDiv = document.querySelector(`.question:nth-of-type(${i})`);
            if (questionDiv) {
                questionDiv.style.border = '2px solid red';
            }
        }
    }

    if (!allAnswered) {
        document.getElementById('result').innerText = 'Please answer all questions before submitting.';
        return;
    }

    let quizResults = '';
    for (let [key, value] of formData.entries()) {
        quizResults += `${key}: ${value}\n`;
    }

    sendEmail(quizResults);
}

function sendEmail(results) {
    emailjs.send("service_harrypotter", "harrypotter_template", {
        quiz_results: results
    })
        .then(function (response) {
            document.getElementById('result').innerText = 'Quiz submitted successfully! You are a true wizard!';
        }, function (error) {
            document.getElementById('result').innerText = 'There was an error submitting the quiz. Maybe a Muggle is to blame.';
            console.error('Email sending error:', error);
        });
}
