let categories = "science,film_and_tv,music,history,geography,art_and_literature,sport_and_leisure,food_and_drink,society_and_culture"
let Categories = categories.split(",")
let Question = ' ' // 0 - QuestionText, 1 - Answers
QuestionTextIndex = 0
AnswersIndex = 1

async function SendCategory(categoryNum) {
    Question = await eel.ApiRequest(Categories[categoryNum])()
    document.getElementById("cat_container").style.display = "none"
    document.getElementById("game_container").style.display = "flex"
    StartGame(Question[QuestionTextIndex], Question[AnswersIndex])
}

function StartGame(questionText, answers) {
    buttons = document.getElementsByClassName("game_choise")
    label = document.getElementById('game_question')
    for (let i = 0; i < buttons.length; i++) {
        removeAllChildNodes(buttons[i])
        addText(buttons[i], answers[i])
    }
    removeAllChildNodes(label)
    addText(label, questionText)
}

async function ChosenAnswer(AnswerNum) {
    Question = await eel.CheckQuestion(Question[AnswersIndex][AnswerNum])()
    if (Question[2]) // if CurrentQuestion <= questions amount
        StartGame(Question[QuestionTextIndex], Question[AnswersIndex])
    else {
        document.getElementById("game_container").style.display = "none"
        document.getElementById("endscreen_container").style.display = "flex"
        correctLabel = document.getElementById('correct_label')
        incorrectLabel = document.getElementById('incorrect_label')
        removeAllChildNodes(correctLabel)
        removeAllChildNodes(incorrectLabel)
        addText(correctLabel, `Your correct answers: ${Question[0]}`)
        addText(incorrectLabel, `Your incorrect answers: ${Question[1]}`)
    }
}

function replay(){
    document.getElementById("cat_container").style.display = "block"
    document.getElementById("game_container").style.display = "none"
    document.getElementById("endscreen_container").style.display = "none"
}

function addText(element, text) {
    element.appendChild(document.createTextNode(text))
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
