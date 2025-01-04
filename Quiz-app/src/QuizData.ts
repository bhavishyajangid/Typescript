interface question {
  question : string,
  options : string[],
  correct : number
  checked  : boolean,
  btnNumber : null | number
}

  const quizData : question[] = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Rome"],
        correct: 0 ,// Index of correct option
        checked : false,
        btnNumber : null
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: 1 ,
        checked : false,
        btnNumber : null
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 2 ,
        checked : false,
        btnNumber : null
    },
    {
        question: "Which programming language is used for web development?",
        options: ["Python", "JavaScript", "C++", "Java"],
        correct: 1,
        checked : false,
        btnNumber : null
    }
];

export default quizData
