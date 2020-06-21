export {login, databaseInputFieldChecker, inputFieldChecker, changeColors, placeholderMovement}

const login = async (username, password, error) => {
  const credentials = { email: username || username.value, password: password || password.value }
  let response 
  try{
    const res = await fetch('https://cryptic-river-74579.herokuapp.com/api/users/token', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(credentials)
    })
    response = await res.json()
    if(response.status=401) error.innerHTML = "Please Check Username and Password"

  } catch(err) {window.location.href = '/error'}

    const {token, user} = response;  
    localStorage.setItem('token', token)
    localStorage.setItem('id', user.id)
    window.location.href = '/'
}
let changeColors = (imageElement, imageLabel, className, color, text)=> {
  imageElement.classList.add(className) 
  imageElement.addEventListener("mouseleave" , ()=> {imageLabel.style.visibility="hidden" })
  imageElement.addEventListener("mouseenter" , ()=> {
    imageLabel.style.visibility="visible" 
    imageLabel.style.color=color 
    imageLabel.innerHTML=text
  })
}
//Will check if username or password is already in use
const databaseInputFieldChecker = async (targetElement, imageElement, imageLabel, type, e)=> {
  if (targetElement.contains(e.target)) {
    imageElement.classList.remove("available");  imageElement.classList.remove("inuse");  imageElement.classList.remove("tooshort")
    imageLabel.innerHTML=""
  }
  else {
    const res = await fetch(`https://cryptic-river-74579.herokuapp.com/api/users/check/${type}`, {
      method:"POST", 
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({"value":`${targetElement.value}`})
    })
    const response = await res.json()

    //if username/email is available in db
    if(response.message===true && targetElement.value.length>5) changeColors(imageElement, imageLabel, "available", "green", "available" )
    else if (response.title==="User found" && targetElement.value.length>5 ) changeColors(imageElement, imageLabel, "inuse", "red", "in use" )
    else if (targetElement.value.length>=1) changeColors(imageElement, imageLabel, "tooshort", "grey", "too short" )
  }
}

const inputFieldChecker = async (targetElement, imageElement, imageLabel, e)=> {
  if (targetElement.contains(e.target)) {
    imageElement.classList.remove("available"); imageElement.classList.remove("inuse"); imageElement.classList.remove("tooshort")
    }
  else {
    if(targetElement.value.length>5) imageElement.classList.add("available") 
    else if (targetElement.value.length<=5&&targetElement.value.length>=1) changeColors(imageElement, imageLabel, "tooshort", "grey", "too short" )
}
}


const placeholderMovement = (element, placeholder)=> {

  element.addEventListener("keyup", e=>{
    if(e.target.value.length>0) {
      placeholder.classList.add(`signupBox__placeholder--active`)
      placeholder.classList.remove(`signupBox__placeholder--inactive`)
    }
    else {
      placeholder.classList.remove(`signupBox__placeholder--active`)
      placeholder.classList.add(`signupBox__placeholder--inactive`)
    }
  })

  element.addEventListener("keydown", e=>{
    const key = e.key
    if(e.target.value.length === 1) {
      if(element.selectionStart === 0 && key === "Delete" || element.selectionStart === 1 && key === "Backspace")  
      element.classList.remove("signupBox__inputText--active")   
    }
    else {
      element.classList.add("signupBox__inputText--active")
    }
  })

}
