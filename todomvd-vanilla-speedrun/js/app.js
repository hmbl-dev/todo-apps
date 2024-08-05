const newTodoInput = document.getElementById('new-todo')
const listElement = document.getElementById('todo-list')
const template = document.getElementById('todo-item-template')
const storagePrefix = 'todos-vanilla-speedrun'

newTodoInput.addEventListener('keypress', (e) => { if (e.key == "Enter") { addNewTodo() } })
newTodoInput.addEventListener('paste', (e) => setTimeout(addNewTodo))

let todoCount = 0
renderFromStorage()
todoCount = listElement.childElementCount

function addNewTodo() {
  // todo: localstorage, separate render
  const title = newTodoInput.value.trim()
  if (!title) { return }
  const todo = { id: ++todoCount, title, completed: false }
  renderTodo(todo)
  newTodoInput.value = ''
  newTodoInput.focus()
  setTimeout(() => storeTodo(todo))
}

function renderTodo(todo) {
  const fragment = template.content.cloneNode(true)
  fragment.querySelector('label').textContent = todo.title
  fragment.querySelector('.todo-item').id = `todo-item-${todo.id}`
  if (todo.completed) {
    fragment.querySelector('.todo-item').classList.add('completed')
  }
  listElement.appendChild(fragment)
}

function storeTodo(todo) {
  localStorage.setItem(`${storagePrefix}.${todo.id}`, JSON.stringify(todo))
}

function renderFromStorage() {
  // assumes keys are ordered
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(storagePrefix)) {
      const todo = JSON.parse(localStorage.getItem(key))
      renderTodo(todo)
    }
  })
}
