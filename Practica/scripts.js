// Generar valores aleatorios para num1 y num2, asegurándose de que sean distintos de 0
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let num1_q2 = getRandomInt(1, 20);
let num2_q2 = getRandomInt(1, 20);
let num1_q3 = getRandomInt(1, 20);
let num2_q3 = getRandomInt(1, 20);
let num1_q4 = getRandomInt(1, 20);
let num2_q4 = getRandomInt(1, 20);
let num1_q5 = getRandomInt(1, 20);
let num2_q5 = getRandomInt(1, 20);
let num1_q6 = getRandomInt(1, 20);
let num2_q6 = getRandomInt(1, 10); // Limitar el exponente a un rango razonable
let num1_q7 = getRandomInt(1, 20);
let num1_q8 = getRandomInt(1, 20);
let num2_q8 = getRandomInt(1, 20);
let num1_q9 = getRandomInt(1, 20);
let num1_q10 = getRandomInt(1, 20);
let num2_q10 = getRandomInt(1, 20);

// Asegurarse de que num1 y num2 sean diferentes para la pregunta 5
while (num1_q5 === num2_q5) {
    num2_q5 = getRandomInt(1, 20);
}

const questions = [
    {
        question: "¿Cómo obtengo la suma de num1 y num2?",
        id: "q1"
    },
    {
        question: `¿Cómo obtengo la diferencia de num1 y num2 si num1 es ${num1_q2} y num2 es ${num2_q2} ?`,
        id: "q2"
    },
    {
        question: `¿Cómo obtengo la diferencia de num1 y num2 si num1 es ${num1_q3} y num2 es ${num2_q3} ?`,
        id: "q3"
    },
    {
        question: `¿Cómo obtengo el producto de num1 y num2 si num1 es ${num1_q4} y num2 es ${num2_q4} ?`,
        id: "q4"
    },
    {
        question: `¿Cómo obtengo el cociente de la división de num1 y num2 si num1 es ${num1_q5} y num2 es ${num2_q5} ?`,
        id: "q5"
    },
    {
        question: `¿Cómo obtengo num1 elevado a num2 si num1 es ${num1_q6} y num2 es ${num2_q6} ?`,
        id: "q6"
    },
    {
        question: `¿Cómo obtengo la raíz de num1 si num1 es ${num1_q7} ?`,
        id: "q7"
    },
    {
        question: `¿Cómo obtengo el residuo de la división de num1 y num2 si num1 es ${num1_q8} y num2 es ${num2_q8} ?`,
        id: "q8"
    },
    {
        question: `¿Cómo obtengo la parte entera de num1 si num1 es ${num1_q9} ?`,
        id: "q9"
    },
    {
        question: `¿Cómo obtengo la parte entera del cociente de la división de num1 entre num2 si num1 es ${num1_q10} y num2 es ${num2_q10} ?`,
        id: "q10"
    }
];

// Función para barajar las preguntas
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Insertar las preguntas barajadas en el contenedor
function insertQuestions() {
    const questionsContainer = document.getElementById('questions-container');
    const shuffledQuestions = shuffle(questions);

    shuffledQuestions.forEach(question => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <h3>${question.question}</h3>
            <input type="text" id="${question.id}" placeholder="Escribe tu respuesta aquí"><br>
            <span id="feedback${question.id.slice(1)}" class="feedback"></span>
        `;
        questionsContainer.appendChild(questionDiv);
    });
}

insertQuestions();

function checkAnswers() {
    const correctAnswers = {
        q1: 'resultado<-num1+num2',
        q2: num2_q2 > num1_q2 ? 'resultado<-num2-num1' : 'resultado<-num1-num2',
        q3: num2_q3 > num1_q3 ? 'resultado<-num2-num1' : 'resultado<-num1-num2',
        q4: [
            'resultado<-num1*num2',
            'resultado<-num2*num1'
        ],
        q5: 'resultado<-num1/num2',
        q6: 'resultado<-num1^num2',
        q7: [
            'resultado<-RAIZ(num1)',
            'resultado<-RC(num1)'
        ],
        q8: [
            'resultado<-num1%num2',
            'resultado<-num1 Mod num2'
        ],
        q9: 'resultado<-TRUNC(num1)',
        q10: 'resultado<-TRUNC(num1/num2)'
    };

    let score = 0;
    let totalQuestions = 10;

    for (let i = 1; i <= totalQuestions; i++) {
        let questionId = 'q' + i;
        let userAnswer = document.getElementById(questionId).value.trim();
        let correctAnswer = correctAnswers[questionId];
        let feedbackId = 'feedback' + i;

        if (Array.isArray(correctAnswer)) {
            if (correctAnswer.includes(userAnswer)) {
                document.getElementById(feedbackId).innerText = `Respuesta correcta: ${correctAnswer.join(' o ')}`;
                document.getElementById(feedbackId).classList.add('correct-answer');
                document.getElementById(feedbackId).classList.remove('incorrect-answer');
                score++;
            } else {
                document.getElementById(feedbackId).innerText = `Respuesta incorrecta: ${correctAnswer.join(' o ')}`;
                document.getElementById(feedbackId).classList.add('incorrect-answer');
                document.getElementById(feedbackId).classList.remove('correct-answer');
            }
        } else {
            if (userAnswer === correctAnswer) {
                document.getElementById(feedbackId).innerText = `Respuesta correcta: ${correctAnswer}`;
                document.getElementById(feedbackId).classList.add('correct-answer');
                document.getElementById(feedbackId).classList.remove('incorrect-answer');
                score++;
            } else {
                document.getElementById(feedbackId).innerText = `Respuesta incorrecta: ${correctAnswer}`;
                document.getElementById(feedbackId).classList.add('incorrect-answer');
                document.getElementById(feedbackId).classList.remove('correct-answer');
            }
        }
    }

    document.getElementById('result').innerText = `Tu puntuación es ${score} de ${totalQuestions}.`;
}

function retry() {
    location.reload();
}



