const express = require('express')
const imageroutes = require('./assets/routes/image-upload')

const app = express()
const ah = (handler) => (req, res, next) => handler(req, res, next).catch(next)

app.use('/staticImages', express.static('assets/images'))
app.use('/staticCSS', express.static('assets/stylesheets'))
app.use('/staticFonts', express.static('assets/fonts'))
app.use('/staticIcons', express.static('assets/icons'))
app.use('/staticJs', express.static('assets/js'))

app.use('/image', imageroutes)

app.get("/splash", ah(async (req, res) => {
  res.render('splash.pug')
}))

app.get("/", ah(async (req, res) => {
  res.render('home.pug')
}))

app.get("/login", ah(async (req, res) => {
  res.render('login.pug') //this is just placeholder
}))

app.get("/edit-profile", ah(async (req, res) => {

  res.render('edit-profile.pug') //this is just placeholder
}))

app.get("/change-password", ah(async (req, res) => {
  res.render('change-password.pug') //this is just placeholder
}))

app.get("/signup", ah(async (req, res) => {
  res.render('signup.pug') //this is just placeholder
}))

app.get("/user-:userId(\\d+)", ah(async (req, res) => {
  res.render('profile.pug', {profileId: req.params.userId})
  // res.end('hello from the would be pug')
}))


app.get("/posts/:postId(\\d+)", ah(async (req, res) => {
  res.render('post.pug', {postId: req.params.userId})

}))

app.get("/error", ah(async (req, res) => {
  res.send('something went wrong...i think?')
  // res.end('hello from the would be pug')
}))

app.get("/imagetest", ah(async (req, res) => {
  res.render('imagetest.pug')
}))

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8877;
}
app.listen(port, console.log(`listening on ${port}`));
