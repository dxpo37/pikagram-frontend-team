// const homeurl = "https://cryptic-river-74579.herokuapp.com";

// const token = localStorage.token;
// const id = localStorage.id;
const profileContainer = document.querySelector(".profileContainer");
const postsContainer = document.querySelector(".postsContainer");
const username = document.querySelector('.username');
const profilePic = document.querySelector('.profilePic');//(????default)
const fullName = document.querySelector('.fullName');// (first and last)
const bio = document.querySelector('.bio');
const numFollowers = document.querySelector('.numFollowers');
const numFollowing = document.querySelector('.numFollowing');
import {get, numberOfFollowers, numberOfFollowing} from './utils.js'


const fetchProfile = async (id) => {
  const profileInfo = await get(`/users/${id}`);
  // profileContainer.innerHTML = JSON.stringify(profileInfo);
  // debugger
  username.innerHTML =profileInfo.user.userName
  profilePic.setAttribute('src',profileInfo.user.profilePicPath || '/')
  fullName.innerHTML = `${profileInfo.user.firstName} ${profileInfo.user.lastName}`
  bio.innerHTML = profileInfo.user.bio || 'default bio'
  numFollowers.innerHTML = await numberOfFollowers(id)
  numFollowing.innerHTML = await numberOfFollowing(id)
};

const fetchOwnPosts = async (id) => {
  const ownPosts = await get(`/posts/user/${id}`);
  // debugger
  postsContainer.innerHTML = `
  ${
    ownPosts.userPosts.posts.map(post => {
    return `
    <img src="${post.photoPath}">
    <div> ${post.caption}</div>
    `
  })}
  `;

};

fetchProfile(id);
fetchOwnPosts(id);
