
const homeurl = "https:/cryptic-river-74579.herokuapp.com/api";

const token = localStorage.token;
const id = localStorage.id;


// const aws = require("aws-sdk");
// const multer = require("multer");
// const multerS3 = require("multer-s3");
// const stuff = {
//   secretAccessKey: 's2gF3sF64TLJakNRs4jLf+Ac5jhadMSgHDLS5qPp',
//   accessKeyId: 'AKIARLQL5NMR3JDIV35O',
//   region: 'us-east-2',
// };


// const s3 = new aws.S3();

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true)
//   } else {
//     cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
//   }
// }

//  const upload = multer({
//   fileFilter: fileFilter,
//   storage: multerS3({
//     s3: s3,
//     bucket: "pikagram-pics",
//     acl: 'public-read',
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//       cb(null, `${req.user.id}-${Date.now()}`);
//     },
//   }),
// });
// singleFileUpload = upload.single('image')


const submitButton = document.querySelector('.formSubmit');
const profileButton = document.querySelector('.navBar__profile')
const homeButton = document.querySelector('.navBar__homepage')
const postButton = document.querySelector('.navBar__addPost')
const postFormContainer = document.querySelector('.addPostContainer')

postButton.addEventListener('click', ()=> {
  postFormContainer.classList.remove('addPostContainer--hidden')
})
profileButton.addEventListener('click', ()=> window.location.href = `/user-${id}`)
homeButton.addEventListener('click', ()=> window.location.href = '/')
submitButton.addEventListener('click', async(event) =>{
  event.preventDefault()
  const file= document.querySelector('.file')
  const caption= document.querySelector('.caption')
  const body = {
    file, caption
  }
  post('/posts/',body)

})


async function post(apiEndPoint, body) {
  debugger
  const res = await fetch(homeurl + apiEndPoint, {
    method: 'POST',
    body: {
      "file": "banana",
    },
    headers: { Authorization: `Bearer ${token}` },
  });
  const response = await res.json();
  return response;
}


// const { awsConfig } = require('../config');
