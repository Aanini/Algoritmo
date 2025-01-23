document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            text: "Crear una calculadora que su única función sea la suma de 2 numeros",
            id: "q1",
            answer: 3
        },
        {
            text: "Crear una calculadora que su única función sea calcular la diferencia de 2 numeros",
            id: "q2",
            answer: 3
        },
        {
            text: "Crear un seudocódigo que me permita calcular la edad de una persona en 20 años",
            id: "q3",
            answer: 2
        },
        {
            text: "Crear un seudocódigo que me permita calcular el promedio final de un curso. Teniendo en cuenta que según el silabo el TI vale 30%, el PA1 25%, el PA2 25% y el cuestionario 20%.",
            id: "q4",
            answer: 5
        },
        {
            text: "Crear un seudocódigo que me permita calcular el promedio final de un curso. Teniendo en cuenta que según el silabo el TI vale 20%, el PA1 25%, el PA2 25% y el cuestionario 10%, informe webinar 20%.",
            id: "q5",
            answer: 6
        },
        {
            text: "Crear un seudocódigo que me permita calcular el promedio final de un curso. Teniendo en cuenta que según el silabo el TI vale 30%, el PA1 50% y el cuestionario 20%.",
            id: "q6",
            answer: 4
        },
        {
            text: "Crear un seudocódigo que me permita calcular el número de pulsaciones que una persona debe tener por cada 10 segundos de ejercicio, si la fórmula es: Número de pulsaciones: (220 - edad) /10.",
            id: "q7",
            answer: 2
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
            <input type="number" id="${question.id}" placeholder="Escribe tu respuesta aquí"><br>
            <span id="feedback${question.id}" class="feedback"></span>
        `;
        questionsContainer.appendChild(questionDiv);
    });
});

function checkAnswers() {
    const answers = {
        q1: 3,
        q2: 3,
        q3: 2,
        q4: 5,
        q5: 6,
        q6: 4,
        q7: 2,
    };

    let correctCount = 0;

    for (const [id, correctAnswer] of Object.entries(answers)) {
        const userAnswer = parseInt(document.getElementById(id).value);
        const feedback = document.getElementById(`feedback${id}`);
        if (userAnswer === correctAnswer) {
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



