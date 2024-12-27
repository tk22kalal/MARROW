// Get the quiz content
const quizContent = await getQuizContent();

// Initialize the quiz
let currentQuestion = 0;
let score = 0;

// Display the first question
displayQuestion();

// Function to display the question
function displayQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const submitButton = document.getElementById('submit');
    const explanationElement = document.getElementById('explanation');
    const scoreElement = document.getElementById('score');

    questionElement.textContent = quizContent[currentQuestion].question;
    optionsElement.innerHTML = '';

    quizContent[currentQuestion].options.forEach((option) => {
        const optionElement = document.createElement('li');
        optionElement.textContent = option;
        optionsElement.appendChild(optionElement);
   Submit');
    explanationElement.textContent = '';
    scoreElement.textContent = `Score: ${score}`;

    // Add event listener to the submit button
    submitButton.addEventListener('click', checkAnswer);
}

// Function to check the answer
function checkAnswer() {
    const optionsElement = document.getElementById('options');
    const selectedOption = optionsElement.querySelector('li:hover');
    const correctOption = quizContent[currentQuestion].options[0];

    if (selectedOption.textContent === correctOption) {
        score++;
    }

    const explanationElement = document.getElementById('explanation');
    explanationElement.textContent = quizContent[currentQuestion].explanation;

    // Move to the next question
    currentQuestion++;

    if (currentQuestion >= quizContent.length) {
        // Display the final score
        const scoreElement = document.getElementById('score');
        scoreElement.textContent = `Final Score: ${score} / ${quizContent.length}`;
    } else {
        displayQuestion();
    }
}

// Function to get the quiz content
async function getQuizContent() {
    // Use the pdf.js library to extract the quiz content from the PDF
    const pdfDoc = await pdfjsLib.getDocument('https://drive.google.com/uc?export=download&id=1xZc0Ro3bZcMNb17mJxCsE1FXYc4YXEM3').promise;
    const pdfPage = await pdfDoc.getPage(1);
    const text = await pdfPage.getTextContent();
    const quizContent = parseQuizContent(text.items);

    return quizContent;
}

// Function to parse the quiz content
function parseQuizContent(items) {
    const quizContent = [];
    let question = '';
    let options = [];
    let explanation = '';

    items.forEach((item) => {
        if (item.str.startsWith('Question')) {
            if (question) {
                quizContent.push({ question, options, explanation });
            }
            question = item.str;
            options = [];
            explanation = '';
        } else if (item.str.startsWith('A)') || item.str.startsWith('B)') || item.str.startsWith('C)') || item.str.startsWith('D)')) {
            options.push(item.str);
        } else {
            explanation += item.str + ' ';
        }
    });

    quizContent.push({ question, options, explanation });

    return quizContent;
}
