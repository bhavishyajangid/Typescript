import './style.css'

interface Todo {
   tittle : string, 
   isChecked : boolean, 
    readonly id : string
}
const paraClass : string = "tittle text-white flex-1 text-xl capitalize font-medium "
const todos : Todo [] = []

const TodoContainer = document.querySelector(".todoContainer") as HTMLDListElement


const todoInput = document.getElementById("inputValue") as HTMLInputElement

const Form = document.querySelector(".inputForm") as HTMLFormElement

Form.onsubmit = (e : SubmitEvent) => {
  e.preventDefault()

  const todo : Todo = {
    tittle : todoInput.value ,
    isChecked : false,
    id : String(Math.floor(Math.random() * 100))
  }

  todos.push(todo)
  todoInput.value = ""
  renderTodos(todos)
}

const renderTodos = (todos : Todo[]):void => {
  TodoContainer.innerText = ''
  todos.forEach((item) => {
       generatedTodo(item.id, item.isChecked, item.tittle)
  })


}


const generatedTodo = (id:string , isChecked : boolean, tittle: string):void => {
  const todo: HTMLDivElement = document.createElement("div");
  todo.className = "w-[500px] bg-green-300 px-4 py-3 flex items-center justify-between rounded-md mt-3 shadow-md hover:shadow-lg transition-shadow mt-5";  // Added shadow for better effect
  
  // Creating the checkbox
  const checkbox: HTMLInputElement = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.className = "checkbox-style mr-3";  // Custom class for checkbox styling
  checkbox.checked = isChecked;
  checkbox.onchange = () => {
    todos.find((item) => {
      if(item.id === id){
        item.isChecked = checkbox.checked
      }
    })
    paragraph.className = checkbox.checked ? `line-through ${paraClass}` : paraClass;
  }
  
  // Creating paragraph for the title
  const paragraph: HTMLParagraphElement = document.createElement("p");
  paragraph.className = checkbox.checked ? `line-through ${paraClass}` : paraClass;  // Larger text, bold font
  paragraph.innerText = tittle;
  
  // Creating the delete button
  const deleteBtn: HTMLButtonElement = document.createElement("button");
  deleteBtn.className = 'deleteBtn text-red-600 text-xl hover:text-red-800 transition-colors duration-200 p-1';  // Added padding to button
  deleteBtn.innerText = 'X';
  deleteBtn.onclick = () => {
     deleteTodo(id)
     renderTodos(todos)
  }
  
  // Appending all the elements to the todo div
  todo.append(checkbox, paragraph, deleteBtn);
  
  // Appending the todo item to the TodoContainer
  TodoContainer.append(todo);
  
};

 const deleteTodo = (id:string) => {
   const idx = todos.findIndex(item => item.id ===id)
   todos.splice(idx , 1)
 }