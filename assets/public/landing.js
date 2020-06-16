const usernameElement  = document.querySelector(".loginBox__usernameInput")
const passwordElement = document.querySelector(".loginBox__passwordInput")
const buttons = document.querySelectorAll(".loginBox__button")
const showButton = document.querySelector(".loginShowBtn")

passwordElement.addEventListener("keyup", e=>{
  const passwordLength = e.target.value.length
  const usernameLength=   usernameElement.value.length
  if(passwordLength>5 && usernameLength>0)  buttons.forEach(button => { button.removeAttribute('disabled') })
  else  buttons.forEach(button => { button.setAttribute('disabled', true) })
})

usernameElement.addEventListener("keyup", e=>{
  const usernameLength = e.target.value.length
  const passwordLength= passwordElement.value.length
  if(passwordLength>5 && usernameLength>0) buttons.forEach(button => {button.removeAttribute('disabled')})
  else buttons.forEach(button => {button.setAttribute('disabled', true)})
})


passwordElement.addEventListener("keyup", e=>{
  const passwordLength = e.target.value.length
  if(passwordLength>0) showButton.classList.remove('loginShowBtn--hidden')
  else showButton.classList.add('loginShowBtn--hidden')
})

showButton.addEventListener('click', e=>{
  if(passwordElement.getAttribute("type")==="password") {passwordElement.setAttribute("type", "text"); showButton.innerHTML="Hide"}
  else {passwordElement.setAttribute("type", "password");; showButton.innerHTML="Show"}
})