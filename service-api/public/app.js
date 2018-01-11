const CreateUser = document.querySelector('.CreateUser')
CreateUser.addEventListener('submit', (e) => {
  e.preventDefault()
  const username = CreateUser.querySelector('.username').value
  const firstname = CreateUser.querySelector('.firstname').value
  const lastname = CreateUser.querySelector('.lastname').value
  const password = CreateUser.querySelector('.password').value
  console.log(`Add user: ${firstname} ${lastname} with username: ${username} and password: ${password}`)
  post('/createUser', { username, firstname, lastname, password })
})

const Login = document.querySelector('.Login')
Login.addEventListener('submit', (e) => {
  e.preventDefault()
  const username = Login.querySelector('.username').value
  const password = Login.querySelector('.password').value
  post('/login', { username, password })
    .then(({ status }) => {
      if (status === 200) alert('login success')
      else alert('login failed')
    })
})

function post (path, data) {
  console.log(data)
  return window.fetch(path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}