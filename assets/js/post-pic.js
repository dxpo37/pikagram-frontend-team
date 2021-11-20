const file = document.querySelector("[name=fileUpload]");
const captionInput = document.querySelector("[name=fileCaption]");
const send = document.querySelector("[name=fileSend]");

send.addEventListener("click", async (e) => {
  const token = localStorage.token;
  const caption = captionInput.value;
  const fileValue = file.value;

  const photoPath = await handleImageUpload(e);
  const body = { caption, photoPath };
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
  fetch("https://pikagram-api.herokuapp.com/api/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  window.location.href = "/";
});

const handleImageUpload = async () => {
  const files = file.files;
  const formData = new FormData();
  formData.append("file", files[0]);

  let res = await fetch("/image", { method: "POST", body: formData });
  let response = await res.json();
  return response;
};

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
