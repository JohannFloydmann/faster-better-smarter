from requests import get
from json import loads
import eel
from random import shuffle
eel.init('web')

Questions = []
UserAnswers = []
CurrentQuestion = 0
UserCorrectAnswers = 0
UserIncorrectAnswers = 0

@eel.expose
def ApiRequest(category):
    global Questions, CurrentQuestion
    CurrentQuestion = 0
    Questions = loads(get(f"https://the-trivia-api.com/v2/questions?categories={category}").text)
    return NextQuestion(True)
 
def NextQuestion(IfStart = False):
    global CurrentQuestion
    if IfStart == False:
        CurrentQuestion += 1
    if CurrentQuestion < len(Questions):
        QuestionText = Questions[CurrentQuestion]['question']['text']
        print(Questions[CurrentQuestion]['correctAnswer'])
        Questions[CurrentQuestion]['incorrectAnswers'].append(Questions[CurrentQuestion]['correctAnswer'])
        Answers = Questions[CurrentQuestion]['incorrectAnswers']
        shuffle(Answers)
        return [QuestionText, Answers, True]
    return [UserCorrectAnswers, UserIncorrectAnswers, False]
        
    

@eel.expose
def CheckQuestion(answer):
    global UserCorrectAnswers, UserIncorrectAnswers, UserAnswers
    UserAnswers.append(answer)
    if CurrentQuestion < len(Questions):
        print(f"User: {answer}")
        print(f"Correct: {Questions[CurrentQuestion]['correctAnswer']}\n")
        if answer == Questions[CurrentQuestion]['correctAnswer']:
            UserCorrectAnswers += 1
        else:
            UserIncorrectAnswers += 1
    return NextQuestion()


eel.start('index.html', size =(900, 600), position=(500, 250))