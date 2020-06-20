export {login}

const login = async (username, password, error) => {
  const credentials = { email: username.value || usernameElement.value, password: password.value || passwordElement.value }
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

