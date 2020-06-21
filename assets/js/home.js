// const homeurl = 'https://cryptic-river-74579.herokuapp.com';
// const token = localStorage.token
// const id = localStorage.id
const postsContainer = document.querySelector(".postsContainer");
import { get, postPika, deletePika } from "./utils.js";

//render feed
const getFollows = async (id) => {
  const following = await get(`/posts/following/${id}`);
  const posts = following.sortedPosts
    .map((post) => {
      return `
          <div class="individualPost">
            <div class="mainFeed__profileUsernameContainer">
              <img class="mainFeed_profilePhoto" id="${post.user.userName}"  src="${post.user.profilePicPath}">
              <div class="author">${post.user.userName}</div>
            </div>
            <img class="mainFeed__postPhoto" src="${post.photoPath}" alt="${post.photoPath}">
            <div class="mainFeed__captionContainer">
              <div class="author">${post.user.userName}</div>
              <div class="individualPostCaption">${post.caption}</div>
            </div>
            <div class="individualPostLikes" likedBy="${post.Likes.length}"  id="numLikes-${post.id}">liked by ${JSON.stringify(post.Likes[0].User.userName)} and ${post.Likes.length-1} others </div>
            <div class="likeContainer"><img class="addLike" id="addLike-${post.id}" src="/staticIcons/bulbasaur.svg"> </div>
            <a class="mainFeed__viewAllComments" href="/posts/${post.id}"> View all ${post.Comments.length} comments</a>
            <div class="mainFeed__addCommentContainer">
              <input class="addComment" type="text" id="input-${post.id}" placeholder="Add comment..." >
              <button class="postButton" id="button-${post.id}"> POST
            </div>
            <div class="individualPostComments">
              ${post.Comments.slice(2).map(comment=> { 
                return `
                  <div>${comment.userId}</div>
                  <div>${comment.comment}</div>
                `
                }).join("") 
              }
            </div>
          </div>
          `;
    })
    .join("");
  //TODO: add comments-> <div class="individualPostComments">${post.Comments}</div>
  //TODO: add logic so front end knows if user has previously liked
  postsContainer.innerHTML = posts;
  addTrigger();
};

//render suggestions
const getFirstFiveUsers = async () => {
  const usersAll = await get(`/users/all`);
  const firstFiveUsers = usersAll.users
    .slice(0, 5)
    .map((user) => user.userName);
  firstFiveUsers.forEach((username, index) => {
    const profileContainer = document.querySelector(`.profile${index + 1}`);
    profileContainer.innerHTML = username;
  });
};

getFollows(id);
getFirstFiveUsers();

//add hook to likes icons
function addTrigger() {
  const likes = document.querySelectorAll(".addLike");
  likes.forEach((like) => {
    like.addEventListener("click", (e) => {
      const id = e.target.id.slice('addLike-'.length)
      const numLikes = document.getElementById(`numLikes-${id}`);
      if (e.target.classList.value.includes("liked")) {
        numLikes.innerHTML = parseInt(numLikes.innerHTML) - 1;
        e.target.classList.remove("liked");
        deletePika(`/posts/${id}/likes`);
      } else {
        postPika(`/posts/${id}/likes`);
        numLikes.innerHTML = parseInt(numLikes.innerHTML) + 1;
        e.target.classList.add("liked");
      }
    });
  });

  const postButtons = document.querySelectorAll(".postButton");
  postButtons.forEach(post => {
    post.addEventListener('click', event=> {
      event.preventDefault
      const id = event.target.id.slice('button-'.length)
      const comment = document.getElementById(`input-${id}`)
      postPika(`/posts/${id}/comments`, {comment})
    })
  })
}
