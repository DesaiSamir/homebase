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
      if (status === 200) console.log('login success')
      else console.log('login failed')
    })
})

const CreateCategory = document.querySelector('.CreateCategory')
CreateCategory.addEventListener('submit', (e) => {
  e.preventDefault()
  const category = CreateCategory.querySelector('.categoryName').value
  // console.log(`createCategory: ${category} ` )
  post('/createCategory', { category })
})

const GetCategory = document.querySelector('.GetCategory')
GetCategory.addEventListener('submit',(e)=>{
  e.preventDefault()
//   var response = get('/category');
  get('/category')
    .then(function(res){
      if (res.ok) {
        res.json().then(function(data) {
          console.log(data.entries);
        });
      } else {
        console.log("Looks like the response wasn't perfect, got status", res.status);
      }
    })
})

const GetExpense = document.querySelector('.GetExpense')
GetExpense.addEventListener('submit',(e)=>{
  e.preventDefault()
//   var response = get('/expense');
  get('/expense')
    .then(function(res){
      if (res.ok) {
        res.json().then(function(data) {
          console.log(data.entries);
        });
      } else {
        console.log("Looks like the response wasn't perfect, got status", res.status);
      }
    })
})
const CreateExpense = document.querySelector('.CreateExpense')
CreateExpense.addEventListener('submit', (e) => {
  e.preventDefault()
  const expense_date = CreateExpense.querySelector('.expense_date').value
  const title = CreateExpense.querySelector('.title').value
  const categoryid = CreateExpense.querySelector('.categoryid').value
  const cost = CreateExpense.querySelector('.cost').value
  // console.log(`createCategory: ${category} ` )
  post('/createExpense', { expense_date, title, categoryid, cost })
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

function get (path){
  console.log(path)
  return window.fetch(path,{
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}
