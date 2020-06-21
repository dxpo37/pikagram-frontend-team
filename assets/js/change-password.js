
const editProfileDiv = document.querySelector('.editProfile')
const changePasswordSubmitButton = document.querySelector('.changePasswordSubmit');
const changePasswordForm = document.querySelector('.changePasswordForm');

editProfileDiv.addEventListener('click', ()=> window.location.href = '/edit-profile')

changePasswordForm.addEventListener('submit', async(event)=> {
  event.preventDefault()
  const formData = new FormData(changePasswordForm);
  const oldpassword = formData.get("oldpassword");
  const newpassword = formData.get("newpassword");

  //TODO make put to /users/id?
})

changePasswordForm.addEventListener('keyup', ()=>{
  const formData = new FormData(changePasswordForm);
  // const oldpassword = formData.get("oldpassword");
  let newpassword = formData.get("newpassword");
  let confirmpassword = formData.get("confirmpassword");
  if (confirmpassword && newpassword){ //inputs filled out
    if (confirmpassword === newpassword){ //passwords match
      changePasswordSubmitButton.removeAttribute('disabled')
    }
    else {
      console.log('passwordMustMatch') //TODO: change to userful info
    }
  }
})
