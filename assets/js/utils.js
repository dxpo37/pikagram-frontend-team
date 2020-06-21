 export const login = async (username, password, error) => {
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

export async function postPika(apiEndPoint, payload){
  const res = await fetch(homeurl + apiEndPoint, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
    body: JSON.stringify(payload)
  });
}

export async function deletePika(apiEndPoint){
  const res = await fetch(homeurl + apiEndPoint, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
  });
}

export async function get(apiEndPoint) {
  const res = await fetch(homeurl + apiEndPoint, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const response = await res.json();
  return response;
}

export const numberOfFollowers = async (id) => {
  const user = await get(`/users/${id}/followers`);
  const followersNum = user.user.followers.length;
  return followersNum;
};

export const numberOfFollowing = async (id) => {
  const user = await get(`/users/${id}/following`);
  const followingNum = user.user.following.length;
  return followingNum;
};



