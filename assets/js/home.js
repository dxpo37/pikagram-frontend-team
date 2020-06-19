const homeurl = 'https://cryptic-river-74579.herokuapp.com';
const token = localStorage.token
const id = localStorage.id
const postsContainer = document.querySelector('.postsContainer');
async function get(apiEndPoint){
  const res = await fetch(homeurl + apiEndPoint,
    {headers: { Authorization: `Bearer ${token}`}
  });
  const response = await res.json()
  return response
}

const getFollows = async (id) =>{
  const posts = await get(`/api/posts/following/${id}`) 

  stringifiedPost = `<div>${JSON.stringify(posts)}</div>`

  postsContainer.innerHTML = stringifiedPost

} 


getFollows(id)