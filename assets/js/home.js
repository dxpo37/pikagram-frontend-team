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
  const following = await get(`/api/posts/following/${id}`) 
  // postsContainer.innerHTML = JSON.stringify(following)

  
  
  const posts = following.sortedPosts.map(post=> {
    return `
          <img src="${post.photoPath}" alt="${post.photoPath}">
          <div class="individualPostCaption">${post.caption}</div>
          <div class="individualPostComments">${post.Comments}</div>
          <div class="individualPostLikes">${post.Likes.length}</div>
          `
        })
    
  postsContainer.innerHTML = posts
} 

const getFirstFiveUsers = async() => {
  debugger
  const usersAll = await get(`/api/users/all`) 
  // const usersAll = await res.json()
  const firstFive = usersAll.users.slice(0,5).map(user => user.userName)
  console.log(firstFive)
  firstFive.forEach((username, index) => {
    const profileContainer = document.querySelector(`.profile${index+1}`)
    profileContainer.innerHTML = username
  })
}

getFollows(id)
getFirstFiveUsers()