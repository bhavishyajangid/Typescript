import "./style.css";
import quizData from "./QuizData";

const question = document.getElementById("question") as HTMLParagraphElement;
const score = document.getElementById("score") as HTMLSpanElement;
const previousBtn = document.getElementById("previous") as HTMLButtonElement;
const nextBtn = document.getElementById("next") as HTMLButtonElement;
const optionContainer = document.getElementById(
  "optionContainer"
) as HTMLDivElement;

interface allDetails {
  score: number;
  previous: number;
  next: number;
}

const questionDetails: allDetails = {
  score: 0,
  previous: 1,
  next: 0,
};

const isOptionCorrect = (optionValue: number, index?: number) => {

  // take a list of the btn change its according to condition
  const optionList = document.getElementsByClassName("option");
  const isChecked = quizData[questionDetails.next].correct

  // if the question is not attempt before
  if (index == null) {
    quizData[questionDetails.next].btnNumber = optionValue;
    quizData[questionDetails.next].checked = true;
    quizData[questionDetails.next].options.forEach((item, index) => {
      optionList[index].setAttribute("disabled", "true");
      if (
        isChecked !== index &&
        optionValue !== index
      ) {

        optionList[index].className += " bg-red-500";
      } else {
        if (
          (optionValue == index &&
            isChecked == index) ||
            isChecked == index
        ) {
          optionList[index].className += " bg-green-500";
          if (
            optionValue == index &&
            isChecked == index
          ) {
            handleScore((questionDetails.score += 1));
          }
        } else {
          optionList[index].className += " bg-gray-500";
        }
      }
    });
  } else {

    // if question attempt before dont able to again attempt
    if (
      isChecked!== index &&
      optionValue !== index
    ) {
      optionList[index].className += " bg-red-500";
    } else {
      if (
        isChecked == index &&
        optionValue !== index
      ) {
        optionList[index].className += " bg-green-500";
      } else {
        optionList[index].className += " bg-gray-500";
      }
    }
  }
};

const displayOption = (option: string, index: number) => {

  // make btn and append into btncontainer
  const optionBtn = document.createElement("button");
  optionBtn.className =
    "option h-10 w-[95%] border border-black rounded-md text-sm py-2 px-4 mt-2 ml-2 text-left cursor-pointer transition-all duration-500 option";
  optionBtn.setAttribute("value", String(index));
  optionBtn.innerText = option;
  optionContainer.appendChild(optionBtn);

  // if attempt question is not attempt again 
  if (quizData[questionDetails.next].checked) {
    isOptionCorrect(Number(quizData[questionDetails.next].btnNumber), index);
  } else {
    optionBtn.addEventListener("click", () => {
      isOptionCorrect(Number(optionBtn.value));
    });
  }
};

const handleScore = (latestScore: number) => {
  score.innerText = String(latestScore);
};

const displayQuestion = (questionNumber: number): void => {
  handleScore(questionDetails.score);
  question.innerText = ` ${questionNumber + 1}. ${
    quizData[questionNumber].question
  }`;

  // display all the option
  quizData[questionNumber].options.forEach((option, index) => {
    displayOption(option, index);
  });
};




nextBtn.addEventListener("click", (): void => {
  if (questionDetails.next < quizData.length - 1) {
    questionDetails.next += 1;
    optionContainer.innerHTML = "";

    displayQuestion(questionDetails.next);
  }
});

previousBtn.addEventListener("click", (): void => {
  if (questionDetails.next > 0) {
    questionDetails.next -= 1;
    optionContainer.innerHTML = "";
    displayQuestion(questionDetails.next);
  }
});

displayQuestion(questionDetails.next);
