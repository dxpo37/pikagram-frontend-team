const usernameElement  = document.querySelector(".loginBox__usernameInput")
const passwordElement = document.querySelector(".loginBox__passwordInput")
const passwordPlaceholder = document.querySelector(".loginBox__passwordPlaceholder")
const usernamePlaceholder = document.querySelector(".loginBox__usernamePlaceholder")
const usernameContainer = document.querySelector(".loginBox__usernameFieldContainer")
const passwordContainer = document.querySelector(".loginBox__passwordFieldContainer")
const buttons = document.querySelectorAll(".loginBox__buttons")
const loginButton = document.querySelector(".login__button")
const demoButton = document.querySelector(".demo__button")
const showButton = document.querySelector(".loginShowBtn")
const rotatingImage = document.querySelector(".phoneBox__rotatingPhoto")
const errorText = document.querySelector(".loginBox__errorText")
import {login} from "./utils.js"

//login users
loginButton.addEventListener('click', ()=> { login(usernameElement, passwordElement, errorText) })
demoButton.addEventListener("click", async ()=>{ login('demo@gmail.com', 'password')})

//rotate images for phone display
setInterval(async ()=>{
  let image = await fetch("https://picsum.photos/240/427?random=11")
  rotatingImage.setAttribute("src", image.url)
},3500)

//removed text from username field on reload
window.addEventListener("load", ()=> usernameElement.value="")

//highlights login button when password+username is correct length
passwordElement.addEventListener("keyup", ()=>{
  const passwordLength = passwordElement.value.length
  const usernameLength=   usernameElement.value.length
  if(passwordLength>5 && usernameLength>0)  buttons.forEach(button => { button.removeAttribute('disabled') })
  else  buttons.forEach(button => { button.setAttribute('disabled', true) })
})

//highlights login button when password+username is correct length
usernameElement.addEventListener("keyup", ()=>{
  const usernameLength = usernameElement.value.length
  const passwordLength= passwordElement.value.length
  if(passwordLength>5 && usernameLength>0) loginButton.removeAttribute('disabled')
  else loginButton.setAttribute('disabled', true)
})

//display showbox for password and move placeholder when password is entered
passwordElement.addEventListener("keyup", e=>{
  const passwordLength = e.target.value.length
  if(passwordLength>0) {
    showButton.classList.remove('loginShowBtn--hidden')
    passwordPlaceholder.classList.add("loginBox__passwordPlaceholder--active")
    passwordPlaceholder.classList.remove("loginBox__passwordPlaceholder--inactive")
  }
  else {
    showButton.classList.add('loginShowBtn--hidden')
    passwordPlaceholder.classList.remove("loginBox__passwordPlaceholder--active")
    passwordPlaceholder.classList.add("loginBox__passwordPlaceholder--inactive")
  }
})

//move placeholder when username is entered
usernameElement.addEventListener("keyup", e=>{
  const usernameLength = e.target.value.length
  if(usernameLength>0) {
    usernamePlaceholder.classList.add("loginBox__usernamePlaceholder--active")
    usernamePlaceholder.classList.remove("loginBox__usernamePlaceholder--inactive")
  }
  else {
    usernamePlaceholder.classList.remove("loginBox__usernamePlaceholder--active")
    usernamePlaceholder.classList.add("loginBox__usernamePlaceholder--inactive")
  }
})

//move input field for username when user starts to type
usernameElement.addEventListener("keydown", e=>{
  const usernameLength = e.target.value.length
  const key = e.key
  if(usernameLength === 1  ) {
    if(usernameElement.selectionStart === 0 && key === "Delete" || usernameElement.selectionStart === 1 && key === "Backspace")  
    usernameElement.classList.remove("loginBox__inputText--active")   
  }
  else {
    usernameElement.classList.add("loginBox__inputText--active")
  }
})

//move input field for password when user starts to type
passwordElement.addEventListener("keydown", e=>{
  const passwordLength = e.target.value.length
  const key = e.key
  if(passwordLength === 1  ) {
    if(passwordElement.selectionStart === 0 && key === "Delete" || passwordElement.selectionStart === 1 && key === "Backspace")  
    passwordElement.classList.remove("loginBox__inputText--active")   
  }
  else {
    passwordElement.classList.add("loginBox__inputText--active")
  }
})

//changes text of show button when clicked
showButton.addEventListener('click', e=>{
  if(passwordElement.getAttribute("type")==="password") {passwordElement.setAttribute("type", "text"); showButton.innerHTML="Hide"}
  else {passwordElement.setAttribute("type", "password");; showButton.innerHTML="Show"}
})

usernameContainer.addEventListener('click', e=> {usernameElement.focus()})
passwordContainer.addEventListener('click', e=> {passwordElement.focus()})

