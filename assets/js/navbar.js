const homeurl = "https://cryptic-river-74579.herokuapp.com";
const token = localStorage.token;
const id = localStorage.id;
const submitButton = document.querySelector('.formSubmit');
const file= document.querySelector('.file')
const caption= document.querySelector('.caption')
submitButton.addEventListener('click', async(event) =>{
  event.preventDefault()
  await fetch('')
} )


async function post(apiEndPoint, body) {
  const res = await fetch(homeurl + apiEndPoint, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { Authorization: `Bearer ${token}` },
  });
  const response = await res.json();
  return response;
}