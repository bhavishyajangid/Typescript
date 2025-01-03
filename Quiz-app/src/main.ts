import './style.css'
import quizData from './QuizData'


const question = document.getElementById("question") as HTMLParagraphElement
const score = document.getElementById("score") as HTMLSpanElement
const previousBtn = document.getElementById("previous") as HTMLButtonElement
const nextBtn = document.getElementById("next") as HTMLButtonElement
const optionContainer = document.getElementById("optionContainer") as HTMLDivElement
const optionList = document.getElementsByClassName("option")



interface allDetails {
    score : number,
    previous : number,
    next : number,
}

const questionDetails : allDetails = {
      score : 0,
      previous : 1,
      next :0,

}

const isOptionCorrect = (optionValue : number) => {
console.log(optionValue);

  quizData[questionDetails.next].options.forEach((option , index) => {
    quizData[questionDetails.next].checked = true;
    optionList[index].setAttribute("disabled", "true");
    if(quizData[questionDetails.next].correct == optionValue){
            if(optionValue !==  index){
               optionList[index].className += " bg-gray-500"
            }else{
              optionList[index].className += " bg-green-500"

              handleScore(questionDetails.score += 1)
            }
    }else{
      if(index ==  quizData[questionDetails.next].correct){
        optionList[index].className += " bg-green-500"
    }else{
     optionList[index].className += " bg-red-500"
    }
    }
  })
}




const displayOption = (option : string , index : number) => {
  const optionBtn = document.createElement("button");
   optionBtn.className = "option h-10 w-[95%] border border-black rounded-md text-sm py-2 px-4 mt-2 ml-2 text-left cursor-pointer transition-all duration-500 option"
   optionBtn.setAttribute("value" , String(index))
   optionBtn.innerText = option;
   optionContainer.appendChild(optionBtn)

   optionBtn.addEventListener("click" , () => {
        isOptionCorrect(Number(optionBtn.value))
        
   })
}

const handleScore = (latestScore : number) => {
  score.innerText =  String(latestScore)
}

 const displayQuestion = (questionNumber : number):void => {
     
     handleScore(questionDetails.score)
     question.innerText = ` ${questionNumber + 1}. ${quizData[questionNumber].question}`
     
     quizData[questionNumber].options.forEach((option , index)  => { 
        displayOption(option , index)
     })
     
     
     

 }

 displayQuestion(questionDetails.next)


 nextBtn.addEventListener("click" , ():void => {
  if(questionDetails.next < quizData.length - 1){
    questionDetails.next += 1;
    optionContainer.innerHTML =""
    
    displayQuestion(questionDetails.next)
  }
      
 })

 previousBtn.addEventListener("click" , ():void => {
     if(questionDetails.next > 0){
       questionDetails.next -= 1;
        optionContainer.innerHTML =""

        
        // quizData.forEach((item) => {
        //   if(item.checked){
        //      item.options.forEach((option , index) => {
        //       if(index ==  item.correct){
        //         optionList[index].className += " bg-green-500"
        //     }else{
        //      optionList[index].className += " bg-red-500"
        //     }
        //     })
        //   }
        // })
        displayQuestion(questionDetails.next)
     } 

 })

 

