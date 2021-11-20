import {
  databaseInputFieldChecker,
  inputFieldChecker,
  changeColors,
  placeholderMovement,
} from "./utils.js";

const emailElement = document.querySelector(".signupBox__emailInput");
const firstnameElement = document.querySelector(".signupBox__firstnameInput");
const lastnameElement = document.querySelector(".signupBox__lastnameInput");
const usernameElement = document.querySelector(".signupBox__usernameInput");
const passwordElement = document.querySelector(".signupBox__passwordInput");

const emailPlaceholder = document.querySelector(".signupBox__emailPlaceholder");
const firstnamePlaceholder = document.querySelector(
  ".signupBox__firstnamePlaceholder"
);
const lastnamePlaceholder = document.querySelector(
  ".signupBox__lastnamePlaceholder"
);
const usernamePlaceholder = document.querySelector(
  ".signupBox__usernamePlaceholder"
);
const passwordPlaceholder = document.querySelector(
  ".signupBox__passwordPlaceholder"
);

const emailStatusImage = document.querySelector(".signupBox__emailStatusImage");
const firstnameStatusImage = document.querySelector(
  ".signupBox__firstnameStatusImage"
);
const lastnameStatusImage = document.querySelector(
  ".signupBox__lastnameStatusImage"
);
const usernameStatusImage = document.querySelector(
  ".signupBox__usernameStatusImage"
);
const passwordStatusImage = document.querySelector(
  ".signupBox__passwordStatusImage"
);

const emailText = document.querySelector(".signupBox__emailImageText");
const firstnameText = document.querySelector(".signupBox__firstnameImageText");
const lastnameText = document.querySelector(".signupBox__lastnameImageText");
const usernameText = document.querySelector(".signupBox__usernameImageText");
const passwordText = document.querySelector(".signupBox__passwordImageText");

const signupButton = document.querySelector(".signupButton");
const showButton = document.querySelector(".signupShowBtn");
const errorText = document.querySelector(".signupBox__errorText");

//query database and display icon indicating username or email availability
window.addEventListener("click", (e) => {
  databaseInputFieldChecker(
    emailElement,
    emailStatusImage,
    emailText,
    "email",
    e
  );
  databaseInputFieldChecker(
    usernameElement,
    usernameStatusImage,
    usernameText,
    "username",
    e
  );
  inputFieldChecker(firstnameElement, firstnameStatusImage, firstnameText, e);
  inputFieldChecker(lastnameElement, lastnameStatusImage, lastnameText, e);
});

window.addEventListener("keyup", (e) => {
  if (e.key === "Tab") {
    databaseInputFieldChecker(
      emailElement,
      emailStatusImage,
      emailText,
      "email",
      e
    );
    databaseInputFieldChecker(
      usernameElement,
      usernameStatusImage,
      usernameText,
      "username",
      e
    );
    inputFieldChecker(firstnameElement, firstnameStatusImage, firstnameText, e);
    inputFieldChecker(lastnameElement, lastnameStatusImage, lastnameText, e);
  }
});

//removed text from username field on reload
window.addEventListener("load", () => {
  emailElement.value = "";
  firstnameElement.value = "";
  lastnameElement.value = "";
  usernameElement.value = "";
  passwordElement.value = "";
});

//highlights signin button when password+username is correct length
passwordElement.addEventListener("keyup", (e) => {
  const passwordLength = passwordElement.value.length;
  const firstnameLength = firstnameElement.value.length;
  const lastnameLength = lastnameElement.value.length;

  if (
    passwordLength > 5 &&
    firstnameLength > 5 &&
    lastnameLength > 5 &&
    usernameStatusImage.classList.contains("available") &&
    emailStatusImage.classList.contains("available")
  )
    signupButton.removeAttribute("disabled");
  else signupButton.setAttribute("disabled", true);

  if (passwordLength >= 1 && passwordLength < 5)
    changeColors(
      passwordStatusImage,
      passwordText,
      "tooshort",
      "grey",
      "too short"
    );
  else if (passwordLength >= 5) {
    passwordStatusImage.classList.remove("tooshort");
    changeColors(
      passwordStatusImage,
      passwordText,
      "available",
      "green",
      "acceptable"
    );
  }
});

//display showbox for password and move placeholder when password is entered
passwordElement.addEventListener("keyup", (e) => {
  const passwordLength = e.target.value.length;
  if (passwordLength > 0) showButton.classList.remove("signinShowBtn--hidden");
  else showButton.classList.add("signinShowBtn--hidden");
});

//move placeholder
placeholderMovement(emailElement, emailPlaceholder);
placeholderMovement(firstnameElement, firstnamePlaceholder);
placeholderMovement(lastnameElement, lastnamePlaceholder);
placeholderMovement(usernameElement, usernamePlaceholder);
placeholderMovement(passwordElement, passwordPlaceholder);

//changes text of show button when clicked
showButton.addEventListener("click", (e) => {
  if (passwordElement.getAttribute("type") === "password") {
    passwordElement.setAttribute("type", "text");
    showButton.innerHTML = "Hide";
  } else {
    passwordElement.setAttribute("type", "password");
    showButton.innerHTML = "Show";
  }
});

signupButton.addEventListener("click", async () => {
  const res = await fetch(`http://localhost:8080/apiusers/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: `${emailElement.value}`,
      firstName: `${firstnameElement.value}`,
      lastName: `${lastnameElement.value}`,
      userName: `${usernameElement.value}`,
      password: `${passwordElement.value}`,
    }),
  });
  const response = await res.json();
  localStorage.token = response.token;
  localStorage.id = response.id;
  window.location.href = "/";
});
