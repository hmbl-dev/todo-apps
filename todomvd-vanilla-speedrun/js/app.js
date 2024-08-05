const newTodoInput = document.getElementById('new-todo')
const listElement = document.getElementById('todo-list')
const template = document.getElementById('todo-item-template')
const storagePrefix = 'todos-vanilla-speedrun'

newTodoInput.addEventListener('keypress', (e) => { if (e.key == "Enter") { addNewTodo() } })
newTodoInput.addEventListener('paste', (e) => setTimeout(addNewTodo))

renderFromStorage()

function addNewTodo() {
  // todo: localstorage, separate render
  const title = newTodoInput.value.trim()
  if (!title) { return }
  const todo = { id: +new Date(), title, completed: false }
  renderTodo(todo)
  newTodoInput.value = ''
  newTodoInput.focus()
  storeTodo(todo)
}

function renderTodo(todo) {
  const fragment = template.content.cloneNode(true)
  fragment.querySelector('label').textContent = todo.title
  const element = fragment.querySelector('.todo-item')
  element.id = `todo-item-${todo.id}`
  if (todo.completed) {
    element.classList.add('completed')
  }
  listElement.appendChild(fragment)
  element.querySelector('.toggle').addEventListener('click', (e) => toggleTodo(todo))
  element.querySelector('.destroy').addEventListener('click', (e) => destroyTodo(todo))
}

function toggleTodo(todo) {
  const element = document.getElementById(`todo-item-${todo.id}`)
  todo.completed = !todo.completed
  if (todo.completed) {
    element.classList.add('completed')
  } else {
    element.classList.remove('completed')
  }
  storeTodo(todo)
}

function destroyTodo(todo) {
  const element = document.getElementById(`todo-item-${todo.id}`)
  element.remove()
  unstoreTodo(todo)
}

function storeTodo(todo) {
  setTimeout(() => {
    localStorage.setItem(`${storagePrefix}.${todo.id}`, JSON.stringify(todo))
  })
}

function unstoreTodo(todo) {
  setTimeout(() => {
    localStorage.removeItem(`${storagePrefix}.${todo.id}`)
  })
}

function renderFromStorage() {
  Object
    .entries(localStorage)
    .filter(([key, value]) => key.startsWith(storagePrefix))
    .map(([key, value]) => JSON.parse(value))
    .sort((a, b) => a.id - b.id)
    .forEach(renderTodo)
}
