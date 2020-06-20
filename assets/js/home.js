// const homeurl = 'https://cryptic-river-74579.herokuapp.com';
// const token = localStorage.token
// const id = localStorage.id
const postsContainer = document.querySelector('.postsContainer');
import {get, post, deletePika} from './utils.js'

const getFollows = async (id) =>{
  const following = await get(`/posts/following/${id}`) 
  const posts = following.sortedPosts.map(post=> {
    return `
          <img class="profilePhoto" id="${post.user.userName}"  src="${post.user.profilePicPath}">
          <div class="author">${post.user.userName}</div>
          <img class="postPhoto" src="${post.photoPath}" alt="${post.photoPath}">
          <div class="individualPostCaption">${post.caption}</div>
          <div class="individualPostLikes" id="numLikes-${post.id}">${post.Likes.length}</div>
          <img class="addLike" id="${post.id}" src="/staticIcons/bulbasaur.svg">`
        })
        // <div class="individualPostComments">${post.Comments}</div>
    
  postsContainer.innerHTML = posts
  addTrigger()
} 

const getFirstFiveUsers = async() => {
  const usersAll = await get(`/users/all`) 
  const firstFiveUsers = usersAll.users.slice(0,5).map(user => user.userName)
  firstFiveUsers.forEach((username, index) => {
    const profileContainer = document.querySelector(`.profile${index+1}`)
    profileContainer.innerHTML = username
  })
}



getFollows(id)
getFirstFiveUsers();


function addTrigger(){
  const likes = document.querySelectorAll('.addLike')
    likes.forEach(like=> {
      like.addEventListener('click', e => {
        const numLikes = document.getElementById(`numLikes-${e.target.id}`)

        if (e.target.classList.value.includes('liked')){
          numLikes.innerHTML = parseInt(numLikes.innerHTML) - 1
          e.target.classList.remove('liked')
          deletePika(`/posts/${e.target.id}/likes`)
        } else {
          post(`/posts/${e.target.id}/likes`)
          numLikes.innerHTML = parseInt(numLikes.innerHTML) + 1
          e.target.classList.add('liked')
        }
      })
    })
}

// '/posts/:postId(\\d+)/likes'