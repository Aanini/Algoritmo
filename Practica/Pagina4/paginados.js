document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            text: "X + Y = suma",
            id: "q1",
            answerTemplate: "suma<-X+Y"
        },
        {
            text: "X - Y = resta",
            id: "q2",
            answerTemplate: "resta<-X-Y"
        },
        {
            text: "X * Y = producto",
            id: "q3",
            answerTemplate: "producto<-X*Y"
        },
        {
            text: "X / Y = cociente",
            id: "q4",
            answerTemplate: "cociente<-X/Y"
        },
        {
            text: "X * Y% = porcentaje",
            id: "q5",
            answerTemplate: "porcentaje<-X*(Y/100)"
        }
    ];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function generateQuestion(question) {
        const x = Math.floor(Math.random() * 100) + 1; // Número aleatorio entre 1 y 100
        const y = Math.floor(Math.random() * 100) + 1; // Número aleatorio entre 1 y 100
        const questionText = question.text.replace("X", x).replace("Y", y);
        const answer = question.answerTemplate.replace("X", x).replace("Y", y);
        const percentageAnswer = (question.id === "q5") ? `${x}*(0.${y})` : null;
        return { text: questionText, id: question.id, answer: answer, percentageAnswer: percentageAnswer };
    }

    shuffle(questions);

    const generatedQuestions = questions.map(generateQuestion);

    const questionsContainer = document.getElementById('questionsContainer');
    generatedQuestions.forEach(question => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `
            <h3>${question.text}</h3>
            <input type="text" id="${question.id}" placeholder="Escribe tu respuesta aquí"><br>
            <span id="feedback${question.id}" class="feedback"></span>
        `;
        questionsContainer.appendChild(questionDiv);
    });

    window.generatedQuestions = generatedQuestions; // Save the generated questions globally for access in checkAnswers
});

function checkAnswers() {
    const answers = {};
    window.generatedQuestions.forEach(q => {
        answers[q.id] = q.answer;
        if (q.percentageAnswer) {
            answers[q.id + "_alt"] = q.percentageAnswer;
        }
    });

    let correctCount = 0;

    for (const [id, correctAnswer] of Object.entries(answers)) {
        const userAnswer = document.getElementById(id.split("_")[0]).value.trim();
        const feedback = document.getElementById(`feedback${id.split("_")[0]}`);
        if (userAnswer === correctAnswer || (answers[id + "_alt"] && userAnswer === answers[id + "_alt"])) {
            feedback.textContent = `Correcto: ${correctAnswer}`;
            feedback.className = "feedback correct";
            correctCount++;
        } else {
            feedback.textContent = `Incorrecto. La respuesta correcta es: ${correctAnswer}`;
            feedback.className = "feedback incorrect";
        }
    }

    const resultDiv = document.getElementById('result');
    resultDiv.textContent = `Has acertado ${correctCount} de ${Object.keys(answers).length / 2} preguntas.`;
}








