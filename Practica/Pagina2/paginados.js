document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            text: "La cantidad de años de una persona",
            id: "q1",
            answer: "Entero"
        },
        {
            text: "El sueldo mínimo en Perú",
            id: "q2",
            answer: "Real"
        },
        {
            text: "El precio de los TV Smart TV LG 2024 en la tienda La Curacao",
            id: "q3",
            answer: "Real"
        },
        {
            text: "Los nombres de los presidentes del Perú en el último siglo",
            id: "q4",
            answer: "Carácter"
        },
        {
            text: "El nombre de los departamentos del Perú",
            id: "q5",
            answer: "Carácter"
        },
        {
            text: "La altura del monte Everest",
            id: "q6",
            answer: "Real"
        },
        {
            text: "La cantidad de ciudadanos en México",
            id: "q7",
            answer: "Entero"
        },
        {
            text: "La temperatura media anual en Lima",
            id: "q8",
            answer: "Real"
        },
        {
            text: "La población total de Japón",
            id: "q9",
            answer: "Entero"
        },
        {
            text: "El nombre de los océanos del mundo",
            id: "q10",
            answer: "Carácter"
        },
        {
            text: "El precio del iPhone 14 Pro",
            id: "q11",
            answer: "Real"
        },
        {
            text: "Los días de la semana",
            id: "q12",
            answer: "Carácter"
        },
        {
            text: "El número de continentes en el mundo",
            id: "q13",
            answer: "Entero"
        },
        {
            text: "El valor de pi (π)",
            id: "q14",
            answer: "Real"
        }
    ];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffle(questions);

    const questionsContainer = document.getElementById('questionsContainer');
    questions.forEach(question => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `
            <h3>${question.text}</h3>
            <input type="text" id="${question.id}" placeholder="Escribe tu respuesta aquí"><br>
            <span id="feedback${question.id}" class="feedback"></span>
        `;
        questionsContainer.appendChild(questionDiv);
    });
});

function checkAnswers() {
    const answers = {
        q1: "Entero",
        q2: "Real",
        q3: "Real",
        q4: "Carácter",
        q5: "Carácter",
        q6: "Real",
        q7: "Entero",
        q8: "Real",
        q9: "Entero",
        q10: "Carácter",
        q11: "Real",
        q12: "Carácter",
        q13: "Entero",
        q14: "Real"
    };

    let correctCount = 0;

    for (const [id, correctAnswer] of Object.entries(answers)) {
        const userAnswer = document.getElementById(id).value.trim();
        const feedback = document.getElementById(`feedback${id}`);
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            feedback.textContent = `Correcto: ${correctAnswer}`;
            feedback.className = "feedback correct";
            correctCount++;
        } else {
            feedback.textContent = `Incorrecto. La respuesta correcta es: ${correctAnswer}`;
            feedback.className = "feedback incorrect";
        }
    }

    const resultDiv = document.getElementById('result');
    resultDiv.textContent = `Has acertado ${correctCount} de ${Object.keys(answers).length} preguntas.`;
}






