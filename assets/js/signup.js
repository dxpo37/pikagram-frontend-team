import {databaseInputFieldChecker, inputFieldChecker} from "./utils.js"

const emailElement = document.querySelector(".signinBox__emailInput")
const fullnameElement  = document.querySelector(".signinBox__fullnameInput")
const usernameElement  = document.querySelector(".signinBox__usernameInput")
const passwordElement = document.querySelector(".signinBox__passwordInput")

const emailPlaceholder = document.querySelector(".signinBox__emailPlaceholder")
const fullnamePlaceholder = document.querySelector(".signinBox__fullnamePlaceholder")
const passwordPlaceholder = document.querySelector(".signinBox__passwordPlaceholder")
const usernamePlaceholder = document.querySelector(".signinBox__usernamePlaceholder")

const emailContainer = document.querySelector(".signinBox__emailFieldContainer")
const fullnameContainer = document.querySelector(".signinBox__fullnameFieldContainer")
const usernameContainer = document.querySelector(".signinBox__usernameFieldContainer")
const passwordContainer = document.querySelector(".signinBox__passwordFieldContainer")

const emailStatusImage = document.querySelector(".signinBox__emailStatusImage")
const fullnameStatusImage = document.querySelector(".signinBox__fullnameStatusImage")
const usernameStatusImage = document.querySelector(".signinBox__usernameStatusImage")
const passwordStatusImage = document.querySelector(".signinBox__passwordStatusImage")

const emailText = document.querySelector(".signinBox__emailImageText")
const usernameText = document.querySelector(".signinBox__usernameImageText")
const fullnameText = document.querySelector(".signinBox__fullnameImageText")
const passwordText = document.querySelector(".signinBox__usernameImageText")

const buttons = document.querySelectorAll(".signinBox__buttons")
const signinButton = document.querySelector(".signupButton")
const showButton = document.querySelector(".signinShowBtn")
const errorText = document.querySelector(".signinBox__errorText")

//query database and display icon indicating username or email availability
window.addEventListener('click', (e) => { 
  databaseInputFieldChecker(emailElement, emailStatusImage, emailText, 'email', e)
  databaseInputFieldChecker(usernameElement, usernameStatusImage, usernameText, 'username', e)
  inputFieldChecker(fullnameElement,fullnameStatusImage, fullnameText, e)
  // inputFieldChecker(passwordElement,passwordStatusImage,e)
});


//removed text from username field on reload
window.addEventListener("load", ()=> {
  emailElement.value = "" 
  fullnameElement.value = "" 
  usernameElement.value = "" 
  passwordElement.value = "" 


})

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

//highlights signin button when password+username is correct length
passwordElement.addEventListener("keyup", (e)=>{
  const passwordLength = passwordElement.value.length
  const fullnameLength = fullnameElement.value.length

  if(passwordLength>=1&&passwordLength<5){
    passwordStatusImage.classList.add("tooshort")
    passwordStatusImage.addEventListener("mouseleave" , ()=> {imageLabel.style.visibility="hidden" })
    passwordStatusImage.addEventListener("mouseenter" , ()=> {
      imageLabel.style.visibility="visible"
      imageLabel.style.color="grey" 
      imageLabel.innerHTML="too short"
    })
  }

  else if(passwordLength>5) passwordStatusImage.classList.remove("tooshort"); passwordStatusImage.classList.add("available") 

  if(passwordLength>5 && 
    fullnameLength>5 && 
    usernameStatusImage.classList.contains("available") && 
    emailStatusImage.classList.contains("available")) signinButton.removeAttribute('disabled')
  else  signinButton.setAttribute('disabled', true)
})


// //display showbox for password and move placeholder when password is entered
// passwordElement.addEventListener("keyup", e=>{
//   const passwordLength = e.target.value.length
//   if(passwordLength>0) {
//     showButton.classList.remove('signinShowBtn--hidden')
//     passwordPlaceholder.classList.add("signinBox__passwordPlaceholder--active")
//     passwordPlaceholder.classList.remove("signinBox__passwordPlaceholder--inactive")
//   }
//   else {
//     showButton.classList.add('signinShowBtn--hidden')
//     passwordPlaceholder.classList.remove("signinBox__passwordPlaceholder--active")
//     passwordPlaceholder.classList.add("signinBox__passwordPlaceholder--inactive")
//   }
// })

//move placeholder when username is entered

usernameElement.addEventListener("keyup", e=>{
  const usernameLength = e.target.value.length
  if(usernameLength>0) {
    usernamePlaceholder.classList.add("signinBox__usernamePlaceholder--active")
    usernamePlaceholder.classList.remove("signinBox__usernamePlaceholder--inactive")
  }
  else {
    usernamePlaceholder.classList.remove("signinBox__usernamePlaceholder--active")
    usernamePlaceholder.classList.add("signinBox__usernamePlaceholder--inactive")
  }
})

// //move input field for username when user starts to type
// usernameElement.addEventListener("keydown", e=>{
//   const usernameLength = e.target.value.length
//   const key = e.key
//   if(usernameLength === 1  ) {
//     if(usernameElement.selectionStart === 0 && key === "Delete" || usernameElement.selectionStart === 1 && key === "Backspace")  
//     usernameElement.classList.remove("signinBox__inputText--active")   
//   }
//   else {
//     usernameElement.classList.add("signinBox__inputText--active")
//   }
// })

// //move input field for password when user starts to type
// passwordElement.addEventListener("keydown", e=>{
//   const passwordLength = e.target.value.length
//   const key = e.key
//   if(passwordLength === 1  ) {
//     if(passwordElement.selectionStart === 0 && key === "Delete" || passwordElement.selectionStart === 1 && key === "Backspace")  
//     passwordElement.classList.remove("signinBox__inputText--active")   
//   }
//   else {
//     passwordElement.classList.add("signinBox__inputText--active")
//   }
// })

// //changes text of show button when clicked
// showButton.addEventListener('click', e=>{
//   if(passwordElement.getAttribute("type")==="password") {passwordElement.setAttribute("type", "text"); showButton.innerHTML="Hide"}
//   else {passwordElement.setAttribute("type", "password");; showButton.innerHTML="Show"}
// })

emailContainer.addEventListener('click', e=> {emailElement.focus()})
fullnameContainer.addEventListener('click', e=> {fullnameElement.focus()})
usernameContainer.addEventListener('click', e=> {usernameElement.focus()})
passwordContainer.addEventListener('click', e=> {passwordElement.focus()})
