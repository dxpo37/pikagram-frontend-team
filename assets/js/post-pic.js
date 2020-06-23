const file = document.querySelector("[name=fileUpload]")
const captionInput = document.querySelector("[name=fileCaption]")
const send = document.querySelector("[name=fileSend]")
console.log(file)

send.addEventListener("click", async (e) => {
  const token = localStorage.token;
  const caption = captionInput.value;
  const fileValue = file.value;
  console.log(fileValue);
  const photoPath = await handleImageUpload(e);
  const body = { caption, photoPath };
  // console.log(body)

  fetch("https://cryptic-river-74579.herokuapp.com/api/posts", {
<<<<<<< HEAD
  method: "POST",
  headers: {
    "Authorization" : `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body)
=======
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "caption": "aaaaaaaaaaaaaaa",
      "photoPath": "https://pikagram-pics1.s3.us-east-2.amazonaws.com/1592884110554.png"
    })
>>>>>>> 2d390d81df1a0c399727bd2c7ff1c13e0785cb8d
  });
});


const handleImageUpload = async () => {
  const files = file.files
  const formData = new FormData()
  formData.append('file', files[0])

  let res = await fetch('/image', { method: 'POST', body: formData })
  let response = await res.json()
  return response

}


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
