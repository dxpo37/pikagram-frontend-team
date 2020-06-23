const homeurl = 'https://cryptic-river-74579.herokuapp.com';
const token = localStorage.token
const id = localStorage.id

const postsContainer = document.querySelector(".postsContainer");
import { get, postPika, deletePika } from "./utils.js";
if(!localStorage.token) {window.location.href="/splash"}
//render feed
const getFollows = async (id) => {
  const following = await get(`/posts/following/${id}`);
  let withLikes;
  let hasCommentUser;
  let hasComment;
  const posts = following.sortedPosts
    .map((post) => {
      if(JSON.stringify(post.Likes[0])){
         withLikes = `<div class="individualPostLikes" likedBy="${post.Likes.length}"  id="numLikes-${post.id}">liked by ${JSON.stringify(post.Likes[0].User.userName)} and <span class="numLikesSpan-${post.id}">${post.Likes.length-1}</span> others` 
      } else{
         withLikes = ""
      }
      
      return `
          <div class="individualPost">
            <div class="mainFeed__profileUsernameContainer">
              <div class="mainFeed__profilePhotoContainer">
                <img class="mainFeed__profilePhoto" id="${post.user.userName}"  src="${post.user.profilePicPath}">
              </div>
              <div class="author">${post.user.userName}</div>
            </div>
            <img class="mainFeed__postPhoto" src="${post.photoPath}" alt="${post.photoPath}">
            <div class="mainFeed__captionContainer">
              <div class="author">${post.user.userName}: </div>
              <div class="individualPostCaption"> ${post.caption} </div>
            </div>
            </div>
            ${withLikes}
            <div class="likeContainer"><img class="addLike" id="addLike-${post.id}" src="/staticIcons/bulbasaur.svg"> </div>
            <a class="mainFeed__viewAllComments" href="/posts/${post.id}"> View all ${post.Comments.length} comments</a>
            <div class="mainFeed__addCommentContainer">
              <input class="addComment" type="text" id="input-${post.id}" placeholder="Add comment..." >
              <button class="postButton" id="button-${post.id}"> POST
            </div>
            <div class="individualPostComments">
              ${post.Comments.slice(2).map(comment=> { 
                if(comment.length === 0){
                  hasCommentUser = ""
                  hasComment = ""
                } else {
                                   hasCommentUser = comment.User.userName;
                  hasComment = comment.comment
                }
                return `
                  <div>${hasCommentUser}: ${hasComment}</div>
                  
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
      const numLikesSpan = document.querySelector(`.numLikesSpan-${id}`);
      if (e.target.classList.value.includes("liked")) {
        numLikesSpan.innerHTML = parseInt(numLikesSpan.innerHTML) - 1;
        e.target.classList.remove("liked");
        deletePika(`/posts/${id}/likes`);
      } else {
        postPika(`/posts/${id}/likes`);
        numLikesSpan.innerHTML = parseInt(numLikesSpan.innerHTML) + 1;
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
      postPika(`/posts/${id}/comments`, {comment: comment.value})
    })
  })
}
