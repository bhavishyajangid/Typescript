import './style.css'

const passwordAppearInput = document.getElementById("password") as HTMLInputElement
const passwordLength = document.getElementById('length') as HTMLInputElement
const  specialCheckbox = document.getElementById("number") as HTMLInputElement
const alphaCheckbox = document.getElementById("alpha") as HTMLInputElement
const generateBtn = document.getElementById("generateBtn") as HTMLButtonElement

 interface Password{
   isSpecialChecked : boolean,
   isAlphaChecked : boolean,
   password : String,
   length : number,
}

const newPassword : Password = {
  isAlphaChecked : false,
  isSpecialChecked : false,
  password : "",
  length : Number(passwordLength.value),
}

generateBtn.addEventListener("click" , () => {
  passwordGenerate(newPassword)
})

specialCheckbox.addEventListener("change" , () => {
  newPassword.isSpecialChecked = specialCheckbox.checked
})


alphaCheckbox.addEventListener("change" , () => {
  newPassword.isAlphaChecked = alphaCheckbox.checked
})

passwordLength.addEventListener("change" , () => {
     newPassword.length = Number(passwordLength.value)
})

const passwordGenerate = (newPassword : Password) => {
 
   const passwordArray = getPasswordArray(newPassword)

  for (let i  = 0; i < newPassword.length; i++) {
    newPassword.password += passwordArray[Math.floor(Math.random() * passwordArray.length)]
    
  }

  passwordAppearInput.value = String(newPassword.password)
  newPassword.password = ""
 
}

const getPasswordArray = (newPassword : Password) : string[] => {
  const alpha  = 'abcdefghijklmnopqrstuvwxysABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const number  = '0123456789'.split("")
  const special  = '@$%&!~?#'.split("")

   let passwordArray : string[];
 
    if(newPassword.isAlphaChecked && newPassword.isSpecialChecked){
     passwordArray = number.concat(alpha).concat(special)
    }else if(newPassword.isAlphaChecked){
      passwordArray = number.concat(alpha)
    }else if(newPassword.isSpecialChecked){
      passwordArray = number.concat(special)
    }else{
      passwordArray = number
    }

    

  return passwordArray
}

