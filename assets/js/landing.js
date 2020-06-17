const usernameElement  = document.querySelector(".loginBox__usernameInput")
const passwordElement = document.querySelector(".loginBox__passwordInput")
const passwordPlaceholder = document.querySelector(".loginBox__passwordPlaceholder")
const usernamePlaceholder = document.querySelector(".loginBox__usernamePlaceholder")
const buttons = document.querySelectorAll(".loginBox__button")
const showButton = document.querySelector(".loginShowBtn")


//highlights login button when password+username is correct length
passwordElement.addEventListener("keyup", e=>{
  const passwordLength = e.target.value.length
  const usernameLength=   usernameElement.value.length
  if(passwordLength>5 && usernameLength>0)  buttons.forEach(button => { button.removeAttribute('disabled') })
  else  buttons.forEach(button => { button.setAttribute('disabled', true) })
})

//highlights login button when password+username is correct length
usernameElement.addEventListener("keyup", e=>{
  const usernameLength = e.target.value.length
  const passwordLength= passwordElement.value.length
  if(passwordLength>5 && usernameLength>0) buttons.forEach(button => {button.removeAttribute('disabled')})
  else buttons.forEach(button => {button.setAttribute('disabled', true)})
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

//display showbox for password and move placeholder when password is entered
usernameElement.addEventListener("keyup", e=>{
  const usernameLength = e.target.value.length
  if(usernameLength>0) {
    usernamePlaceholder.classList.add("loginBox__usernamePlaceholder--active")
    usernamePlaceholder.classList.remove("loginBox__usernamePlaceholder--inactive")
  }
  else  {
    usernamePlaceholder.classList.remove("loginBox__usernamePlaceholder--active")
    usernamePlaceholder.classList.add("loginBox__usernamePlaceholder--inactive")
  }
})


//changes text of show button when clicked
showButton.addEventListener('click', e=>{
  if(passwordElement.getAttribute("type")==="password") {passwordElement.setAttribute("type", "text"); showButton.innerHTML="Hide"}
  else {passwordElement.setAttribute("type", "password");; showButton.innerHTML="Show"}
})