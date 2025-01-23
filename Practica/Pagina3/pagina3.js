document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            text: "Divide el número x entre y y dame su residuo",
            id: "q1",
            generateQuestion: function() {
                this.x = getRandomNonZero();
                this.y = getRandomNonZero();
                return `Divide el número ${this.x} entre ${this.y} y dame su residuo`;
            },
            answer: function() {
                return `${this.x} Mod ${this.y}`;
            }
        },
        {
            text: "Divide el número x entre y y encuentra su parte entera",
            id: "q2",
            generateQuestion: function() {
                this.x = getRandomNonZero();
                this.y = getRandomNonZero();
                return `Divide el número ${this.x} entre ${this.y} y encuentra su parte entera`;
            },
            answer: function() {
                return `TRUNC(${this.x}/${this.y})`;
            }
        },
        {
            text: "Divide el número x entre y y encuentra su parte entera",
            id: "q3",
            generateQuestion: function() {
                this.x = getRandomNonZero();
                this.y = getRandomNonZero();
                return `Divide el número ${this.x} entre ${this.y} y encuentra su parte entera`;
            },
            answer: function() {
                return `TRUNC(${this.x}/${this.y})`;
            }
        },
        {
            text: "Divide el número x entre dos y encuentra su parte entera. Luego, divide el resultado por 50 y dame su residuo",
            id: "q4",
            generateQuestion: function() {
                this.x = getRandomNonZero();
                return `Divide el número ${this.x} entre dos y encuentra su parte entera. Luego, divide el resultado por 50 y dame su residuo`;
            },
            answer: function() {
                return `TRUNC(${this.x}/2) Mod 50`;
            }
        },
        {
            text: "Divide el número x entre y y encuentra su parte entera",
            id: "q5",
            generateQuestion: function() {
                this.x = getRandomNonZero();
                this.y = getRandomNonZero();
                return `Divide el número ${this.x} entre ${this.y} y encuentra su parte entera`;
            },
            answer: function() {
                return `TRUNC(${this.x}/${this.y})`;
            }
        },
        {
            text: "Divide el número x entre 7 y dame su residuo",
            id: "q6",
            generateQuestion: function() {
                this.x = getRandomNonZero();
                return `Divide el número ${this.x} entre 7 y dame su residuo`;
            },
            answer: function() {
                return `${this.x} Mod 7`;
            }
        },
        {
            text: "Divide el número x entre 100 y dame su residuo",
            id: "q7",
            generateQuestion: function() {
                this.x = getRandomNonZero();
                return `Divide el número ${this.x} entre 100 y dame su residuo`;
            },
            answer: function() {
                return `${this.x} Mod 100`;
            }
        },
        {
            text: "Divide el número x entre 10 y encuentra su parte entera",
            id: "q8",
            generateQuestion: function() {
                this.x = getRandomNonZero();
                return `Divide el número ${this.x} entre 10 y encuentra su parte entera`;
            },
            answer: function() {
                return `TRUNC(${this.x}/10)`;
            }
        },
        {
            text: "Divide el número x entre 5 y encuentra su parte entera. Luego, divide el resultado por 23 y dame su residuo",
            id: "q9",
            generateQuestion: function() {
                this.x = getRandomNonZero();
                return `Divide el número ${this.x} entre 5 y encuentra su parte entera. Luego, divide el resultado por 23 y dame su residuo`;
            },
            answer: function() {
                return `TRUNC(${this.x}/5) Mod 23`;
            }
        },
        {
            text: "Divide el número x entre 10 y encuentra su parte entera",
            id: "q10",
            generateQuestion: function() {
                this.x = getRandomNonZero();
                return `Divide el número ${this.x} entre 10 y encuentra su parte entera`;
            },
            answer: function() {
                return `TRUNC(${this.x}/10)`;
            }
        }
    ];

    function getRandomNonZero() {
        let randomNumber = Math.floor(Math.random() * 20) + 1; // Genera números aleatorios entre 1 y 20
        randomNumber *= Math.random() < 0.5 ? 1 : -1; // Añade aleatoriamente signo positivo o negativo
        return randomNumber;
    }

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
        
        // Genera la pregunta y guarda los valores específicos para la respuesta
        const questionText = question.generateQuestion();
        const correctAnswer = question.answer();
        
        questionDiv.innerHTML = `
            <h3>${questionText}</h3>
            <input type="text" id="${question.id}" placeholder="Escribe tu respuesta aquí"><br>
            <span id="feedback${question.id}" class="feedback"></span>
        `;
        questionsContainer.appendChild(questionDiv);
        
        // Guarda la respuesta correcta en minúsculas para comparar más adelante
        questionDiv.correctAnswer = correctAnswer.toLowerCase();
    });
});

function checkAnswers() {
    const questions = document.querySelectorAll('.question');
    let correctCount = 0;

    questions.forEach(questionDiv => {
        const id = questionDiv.querySelector('input').id;
        const userAnswer = document.getElementById(id).value.trim().toLowerCase();
        const feedback = document.getElementById(`feedback${id}`);

        const correctAnswer = questionDiv.correctAnswer;

        // Reemplaza "Mod" por "%" para aceptar ambas formas
        const formattedCorrectAnswer = correctAnswer.replace(" mod ", " % ").replace(" mod", " %").replace("mod ", "% ").replace("mod", "%");

        // Verifica si la respuesta del usuario coincide con alguna de las formas aceptadas
        const acceptableAnswers = [
            correctAnswer.toLowerCase(),  // Respuesta original en minúsculas
            correctAnswer.replace("mod", "%"),  // Respuesta con "mod" reemplazado por "%"
            formattedCorrectAnswer,  // Respuesta formateada con "%"
            correctAnswer.replace(/\s/g, ''),  // Respuesta sin espacios
            formattedCorrectAnswer.replace(/\s/g, '')  // Respuesta formateada sin espacios
        ];

        if (acceptableAnswers.includes(userAnswer)) {
            feedback.textContent = `Correcto: ${correctAnswer.replace('%', 'Mod')}`;
            feedback.className = "feedback correct";
            correctCount++;
        } else {
            feedback.textContent = `Incorrecto. La respuesta correcta es: ${correctAnswer.replace('%', 'Mod')}`;
            feedback.className = "feedback incorrect";
        }
    });

    const resultDiv = document.getElementById('result');
    resultDiv.textContent = `Has acertado ${correctCount} de ${questions.length} preguntas.`;
}













