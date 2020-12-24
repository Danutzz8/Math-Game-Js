const problemElement = document.querySelector('.problem')
const ourForm = document.querySelector('.our-form')
const ourField = document.querySelector('.our-field')
const pointsNeeded = document.querySelector('.points-needed')
const mistakesAllowed = document.querySelector('.mistakes-allowed')
const progressBar = document.querySelector('.progress-inner')
const endMessage = document.querySelector('.end-message')
const resetBtn = document.querySelector('.reset-btn')

let state = {
    score: 0,
    wrongAnswers: 0
}

function updateProblem() {
    state.currentProblem = generateProblem() // we asign thios to an obj and render on page
    problemElement.innerHTML = `
    ${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}
    `;
    ourField.value = ''; // clear fiels on subbmision
    ourField.focus()   // when the submit is clicked the field will still be highlighted
}

updateProblem()

function generateNumber(max) {
    return Math.floor(Math.random() * (max + 1 ))
    
}

function generateProblem() {        // this problem generator is a function that generates an obj. that generates 3 functions, one function per each element num1, num2 and operator.
    return {
        numberOne: generateNumber(10),
        numberTwo: generateNumber(10),
        operator: ['+', '-', 'x'][generateNumber(2)]
    }
}

ourForm.addEventListener('submit', handleSubmit)

function handleSubmit(e) {
    e.preventDefault() // to prevent default behaviour for submit

    let correctAnswer
    const problem = state.currentProblem  // asigning a variable to be shorter down the line
    if (problem.operator == '+') correctAnswer = problem.numberOne + problem.numberTwo
    if (problem.operator == '-') correctAnswer = problem.numberOne - problem.numberTwo
    if (problem.operator == 'x') correctAnswer = problem.numberOne * problem.numberTwo
    
    if (parseInt(ourField.value, 10) == correctAnswer) {
        state.score++
        //alert('right');
        pointsNeeded.textContent = 10 - state.score;
        updateProblem()
        renderProgressBar()

    } else {
        state.wrongAnswers++
       // alert('wrong')
       mistakesAllowed.textContent = 2 - state.wrongAnswers;
       problemElement.classList.add('animate-wrong');
       setTimeout(() => problemElement.classList.remove('animate-wrong') ,450)
    }
    checkLogic()
}

function checkLogic() {
    // if you won
    if (state.score === 10 ) {
        endMessage.textContent = 'Congrats, You Won!!!' 
        document.body.classList.add('overlay-is-open')
        setTimeout(() => resetBtn.focus(), 300)      // we set here the focus on the button because in the resetGame will not work and it will need setTimeout.   
    } 
    // if you lost
    if(state.wrongAnswers === 3) {
        endMessage.textContent = 'Sorry! You Lost.' 
        document.body.classList.add('overlay-is-open')
        setTimeout(() => resetBtn.focus(), 300)
       
    }
}

resetBtn.addEventListener('click', resetGame)

function resetGame() {
    document.body.classList.remove('overlay-is-open')
    updateProblem()
    state.score = 0;
    state.wrongAnswers = 0;
    pointsNeeded.textContent = 10;
    mistakesAllowed.textContent = 2;
    renderProgressBar()
}

function renderProgressBar() {
    progressBar.style.transform = `scaleX(${state.score / 10})`
}