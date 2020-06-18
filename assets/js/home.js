console.log('hello from home');
(async()=>{
  const res = await fetch('http://localhost:8080/api/users/all')
  // const res = await fetch('https://cryptic-river-74579.herokuapp.com/api/users/all')
  
  // const res = await fetch('https://cryptic-river-74579.herokuapp.com/api/users/all')
  const users = await res.json()
  console.log(users)
})()

