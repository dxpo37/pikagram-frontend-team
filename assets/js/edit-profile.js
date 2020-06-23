// const changePasswordDiv = document.querySelector(".changePassword");
// changePasswordDiv.addEventListener(
//   "click",
//   () => (window.location.href = "/change-password")
// );

const editProfileForm = document.querySelector(".editProfileForm");
import { get, putPika } from "./utils.js";

editProfileForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(editProfileForm);
  const editProfileName = formData.get("name");
  const editProfileUsername = formData.get("username");
  const editProfileBio = formData.get("bio");
  const editProfileEmail = formData.get("email");
  const editProfileGender = formData.get("gender");

  putPika(`/users/${id}`)
  window.location.href = `/user-${id}`
  //TODO make put to /users/id?
});

function updateInput(uniqueClassName, value) {
  const element = document.querySelector("." + uniqueClassName);
  element.value = value;
}


const fetchEditProfileContent = async () => {

  const response = await get(`/users/${id}`);
  const fields = [
    "editProfileName",
    "editProfileUsername",
    "editProfileBio",
    "editProfileEmail",
    "editProfileAge",
    "editProfileGender",
  ];

  const { firstName, lastName, userName, bio, email, age, gender, profilePicPath } = response.user
  const returned = [firstName + ' ' + lastName, userName, bio, email, age, gender]
  fields.forEach((field, i) => updateInput(field, returned[i]))

  document.querySelector('.editProfile__username').innerHTML = userName
  document.querySelector('#profilePic').setAttribute('src', profilePicPath)

}


fetchEditProfileContent()
