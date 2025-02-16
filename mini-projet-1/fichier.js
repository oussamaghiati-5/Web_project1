/* let form = document.getElementById("Preferences");
let number_of_Q = document.getElementById("number_of_questions");
let category = document.getElementById("Category");
let level = document.getElementById("Difficulty");
let type = document.getElementById("type");

let quiz_page = document.getElementById("quiz-page");
let Question_count = document.getElementById("Q-number");
let timer  = document.getElementById("timer");
let score = document.getElementById("score-count");
let Que = document.getElementById("question-text");
let answers = document.getElementById("answers");

// Ensure the input event captures the number change
document.addEventListener("DOMContentLoaded", function() {
    number_of_Q.addEventListener("input", function() {
        console.log("Selected number:", this.value);
    });
});

// Handle form submission
form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevents the form from reloading the page

    // Declare the API inside the function to start fresh on each submit
    let api = `https://opentdb.com/api.php?amount=${number_of_Q.value}`;

    if (category.value !== "any") {
        api += `&category=${category.value}`;
    }
    if (level.value !== "any") {
        api += `&difficulty=${level.value}`;
    }
    if (type.value !== "any") {
        api += `&type=${type.value}`;
    }

    form.style.display = "none";

    fetch(api)
        .then(response => response.json()) // Convert response to JSON
        .then(data => {
            questions = data.results; // Store questions
            console.log(questions);
            let n = 1;
            questions.forEach(Element => {
                let Q = Element.question;
                let incorrect_answers = Element.incorrect_answers;
                let correct_answer = Element.correct_answer;

                // Add the correct answer to the incorrect_answers array
                incorrect_answers.push(correct_answer);

                // Shuffle the answers array (to randomize the answers)
                let shuffled_answers = shuffleArray(incorrect_answers);

                // Update question text
                Que.innerHTML = `${Q}`;
                n++;

                // Clear previous answers
                answers.innerHTML = '';

                // Create answer options dynamically
                shuffled_answers.forEach(answer => {
                    let answerOption = document.createElement("button");
                    answerOption.innerText = answer;
                    answerOption.classList.add("answer-option");
                    answers.appendChild(answerOption);

                    // Add event listener to check if the answer is correct
                   /*  answerOption.addEventListener("click", function() {
                        if (answer === correct_answer) {
                            score.innerText = parseInt(score.innerText) + 1; // Increase score if correct
                        } */
                    /* }); */
/*                 });
                quiz_page.style.display = "";

            });
        })
        .catch(error => {
            console.error("Error fetching questions:", error);
            alert("Failed to load questions. Check your internet connection.");
        });
});

// Function to shuffle the answers array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}
 */ 
/* 
let form = document.getElementById("Preferences");
let number_of_Q = document.getElementById("number_of_questions");
let category = document.getElementById("Category");
let level = document.getElementById("Difficulty");
let type = document.getElementById("type");

let quiz_page = document.getElementById("quiz-page");
let Question_count = document.getElementById("Q-number");
let timer = document.getElementById("timer");
let score = document.getElementById("score-count");
let Que = document.getElementById("question-text");
let answers = document.getElementById("answers");
let nextButton = document.getElementById("next-question");

let currentQuestionIndex = 0;
let scoreValue = 0;
let questionTime = 15;
let intervalId;

document.addEventListener("DOMContentLoaded", function() {
    number_of_Q.addEventListener("input", function() {
        console.log("Selected number:", this.value);
    });
});

// Handle form submission
form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevents the form from reloading the page

    let api = `https://opentdb.com/api.php?amount=${number_of_Q.value}`;

    if (category.value !== "any") {
        api += `&category=${category.value}`;
    }
    if (level.value !== "any") {
        api += `&difficulty=${level.value}`;
    }
    if (type.value !== "any") {
        api += `&type=${type.value}`;
    }

    form.style.display = "none";

    fetch(api)
        .then(response => response.json())
        .then(data => {
            questions = data.results;
            console.log(questions);
            startQuiz(questions); // Start the quiz with the fetched questions
        })
        .catch(error => {
            console.error("Error fetching questions:", error);
            alert("Failed to load questions. Check your internet connection.");
        });
});

// Start the quiz and display the first question
function startQuiz(questions) {
    quiz_page.style.display = ""; // Show the quiz page
    displayQuestion(questions[currentQuestionIndex]); // Display the first question

    // Start the timer for the first question
    intervalId = setInterval(() => {
        if (questionTime > 0) {
            timer.innerText = questionTime--;
        } else {
            nextQuestion(questions); // Move to the next question when time is up
        }
    }, 1000);
}

// Display the current question and answers
function displayQuestion(question) {
    Que.innerHTML = question.question;
    Question_count.innerText = currentQuestionIndex + 1;
    answers.innerHTML = ''; // Clear previous answers

    let answersArray = [...question.incorrect_answers, question.correct_answer];
    let shuffled_answers = shuffleArray(answersArray);

    shuffled_answers.forEach(answer => {
        let answerOption = document.createElement("button");
        answerOption.innerText = answer;
        answerOption.classList.add("answer-option");
        answers.appendChild(answerOption);

        // Event listener for selecting an answer
        answerOption.addEventListener("click", function() {
            if (answer === question.correct_answer) {
                scoreValue++;
                score.innerText = scoreValue; // Increase score if correct
            }
            nextQuestion(questions); // Move to the next question after an answer is selected
        });
    });

    // Reset the timer for the new question
    questionTime = 15;
    timer.innerText = questionTime;
}

// Move to the next question
function nextQuestion(questions) {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion(questions[currentQuestionIndex]);
        questionTime = 15; // Reset timer for the next question
    } else {
        clearInterval(intervalId); // Stop the timer when all questions are answered

        // Hide the quiz page
        quiz_page.style.display = "none";

        // Create a new div to display the score
        let scoreDiv = document.createElement("div");
        scoreDiv.classList.add("final-score"); // Optional: You can style this div with CSS
        scoreDiv.innerHTML = `<h2>Game Over</h2><p>Your score: ${scoreValue}</p>`;

        // Append the score div to the body
        document.body.appendChild(scoreDiv);
    }
}

// Shuffle the answers array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

// Event listener for the "Next Question" button
nextButton.addEventListener("click", function() {
    clearInterval(intervalId); // Stop the timer when the user clicks "Next Question"
    nextQuestion(questions); // Move to the next question
});
 */


let form = document.getElementById("Preferences");
let number_of_Q = document.getElementById("number_of_questions");
let category = document.getElementById("Category");
let level = document.getElementById("Difficulty");
let type = document.getElementById("type");

let quiz_page = document.getElementById("quiz-page");
let Question_count = document.getElementById("Q-number");
let timer = document.getElementById("timer");
let score = document.getElementById("score-count");
let Que = document.getElementById("question-text");
let answers = document.getElementById("answers");
let nextButton = document.getElementById("next-question");

let currentQuestionIndex = 0;
let scoreValue = 0;
let questionTime = 15;
let intervalId;

document.addEventListener("DOMContentLoaded", function() {
    number_of_Q.addEventListener("input", function() {
        console.log("Selected number:", this.value);
    });
});

// Handle form submission
form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevents the form from reloading the page

    let api = `https://opentdb.com/api.php?amount=${number_of_Q.value}`;

    if (category.value !== "any") {
        api += `&category=${category.value}`;
    }
    if (level.value !== "any") {
        api += `&difficulty=${level.value}`;
    }
    if (type.value !== "any") {
        api += `&type=${type.value}`;
    }

    form.style.display = "none";

    fetch(api)
        .then(response => response.json())
        .then(data => {
            questions = data.results;
            console.log(questions);
            startQuiz(questions); // Start the quiz with the fetched questions
        })
        .catch(error => {
            console.error("Error fetching questions:", error);
            alert("Failed to load questions. Check your internet connection.");
        });
});

// Start the quiz and display the first question
function startQuiz(questions) {
    quiz_page.style.display = ""; // Show the quiz page
    displayQuestion(questions[currentQuestionIndex]); // Display the first question

    // Start the timer for the first question
    intervalId = setInterval(() => {
        if (questionTime > 0) {
            timer.innerText = questionTime--;

            if (questionTime < 5) {
                timer.style.color = "red";
            } else {
                timer.style.color = "black"; // Reset to default color
            }
        } else {
            nextQuestion(questions); // Move to the next question when time is up
        }
    }, 1000);
}

// Display the current question and answers
function displayQuestion(question) {
    Que.innerHTML = question.question;
    Question_count.innerText = currentQuestionIndex + 1;
    answers.innerHTML = ''; // Clear previous answers

    let answersArray = [...question.incorrect_answers, question.correct_answer];
    let shuffled_answers = shuffleArray(answersArray);

    shuffled_answers.forEach(answer => {
        let answerOption = document.createElement("button");
        answerOption.innerText = answer;
        answerOption.classList.add("answer-option");
        answers.appendChild(answerOption);

        // Event listener for selecting an answer
        answerOption.addEventListener("click", function() {
            // Disable further answer selections
            disableAnswerButtons();

            // Check if the selected answer is correct
            if (answer === question.correct_answer) {
                scoreValue++;
                score.innerText = scoreValue; // Increase score if correct
                answerOption.style.backgroundColor = "green"; // Correct answer (Green)
            } else {
                answerOption.style.backgroundColor = "red"; // Incorrect answer (Red)
            }
        });
    });

    // Reset the timer for the new question
    questionTime = 15;
    timer.innerText = questionTime;
}

// Disable answer buttons after one is clicked
function disableAnswerButtons() {
    let allButtons = answers.getElementsByTagName("button");
    for (let btn of allButtons) {
        btn.disabled = true; // Disable all buttons after one is clicked
    }
}

// Move to the next question
function nextQuestion(questions) {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion(questions[currentQuestionIndex]);
        questionTime = 15; // Reset timer for the next question
    } else {
        clearInterval(intervalId); // Stop the timer when all questions are answered

        // Hide the quiz page
        quiz_page.style.display = "none";

        // Create a new div to display the score
        let scoreDiv = document.createElement("div");
        scoreDiv.classList.add("final-score"); // Optional: You can style this div with CSS
        scoreDiv.innerHTML = `<h2>Game Over</h2><p>Your score: ${scoreValue}</p>`;

        // Append the score div to the body
        document.body.appendChild(scoreDiv);
    }
}

// Shuffle the answers array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

// Event listener for the "Next Question" button
nextButton.addEventListener("click", function() {
    clearInterval(intervalId); // Stop the timer when the user clicks "Next Question"
    nextQuestion(questions); // Move to the next question
});
