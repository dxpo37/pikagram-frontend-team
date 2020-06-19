const homeurl = "https://cryptic-river-74579.herokuapp.com";
const token = localStorage.token;
const id = localStorage.id;
const profileContainer = document.querySelector(".profileContainer");
const postsContainer = document.querySelector(".postsContainer");
const username = document.querySelector('.username');
const profilePic = document.querySelector('.profilePic');//(????default)
const fullName = document.querySelector('.fullName');// (first and last)
const bio = document.querySelector('.bio');
const numFollowers = document.querySelector('.numFollowers');
const numFollowing = document.querySelector('.numFollowing');



async function get(apiEndPoint) {
  const res = await fetch(homeurl + apiEndPoint, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const response = await res.json();
  return response;


const numberOfFollowers = async (id) => {
  const user = await get(`/api/users/${id}/followers`);
  const followersNum = user.user.followers.length;
  return followersNum;
};

const numberOfFollowing = async (id) => {
  const user = await get(`/api/users/${id}/following`);
  const followingNum = user.user.following.length;
  return followingNum;
};

const fetchProfile = async (id) => {
  const profileInfo = await get(`/api/users/${id}`);
  // profileContainer.innerHTML = JSON.stringify(profileInfo);
  debugger
username.innerHTML =profileInfo.user.userName
profilePic.setAttribute('src',profileInfo.user.profilePicPath || '/')
fullName.innerHTML = `${profileInfo.user.firstName} ${profileInfo.user.lastName}`
bio.innerHTML = profileInfo.user.bio || 'default bio'
numFollowers.innerHTML = await numberOfFollowers(id)
numFollowing.innerHTML = await numberOfFollowing(id)
};

const fetchOwnPosts = async (id) => {
  const ownPosts = await get(`/api/posts/user/${id}`);
  postsContainer.innerHTML = JSON.stringify(ownPosts.userPosts.posts);

};


fetchProfile(31);
fetchOwnPosts(31);
