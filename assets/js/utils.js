export {login, databaseInputFieldChecker, inputFieldChecker}

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
//Will find if username or password is already in use
const databaseInputFieldChecker = async (targetElement, imageElement, imageLabel, type, e)=> {
  let changeColors = (className, color, text)=> {
    imageElement.classList.add(className) 
    imageElement.addEventListener("mouseleave" , ()=> {imageLabel.style.visibility="hidden" })
    imageElement.addEventListener("mouseenter" , ()=> {
      imageLabel.style.visibility="visible" 
      imageLabel.style.color=color 
      imageLabel.innerHTML=text
    })
  }
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
    if(response.message===true && targetElement.value.length>5) changeColors("available", "green", "available" )
    else if (response.title==="User found" && targetElement.value.length>5 ) changeColors("inuse", "red", "in use" )
    else if (targetElement.value.length>=1) changeColors("tooshort", "grey", "too short" )
  }
}

const inputFieldChecker = async (targetElement, imageElement, imageLabel, e)=> {
  if (targetElement.contains(e.target)) {
    imageElement.classList.remove("available"); imageElement.classList.remove("inuse"); imageElement.classList.remove("tooshort")
    }
  else {
    if(targetElement.value.length>5) imageElement.classList.add("available") 
    else if (targetElement.value.length<=5&&targetElement.value.length>=1) {
      imageElement.classList.add("tooshort")
      imageElement.addEventListener("mouseleave" , ()=> {imageLabel.style.visibility="hidden" })
      imageElement.addEventListener("mouseenter" , ()=> {
        imageLabel.style.visibility="visible"
        imageLabel.style.color="grey" 
        imageLabel.innerHTML="too short"
    })
  }
}
}
