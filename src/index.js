import { Notify } from 'notiflix';

const refs = {
  formRef: document.querySelector('.todo__form'),
  inputRef: document.querySelector('.todo__field'),
  todoListRef: document.querySelector('.todo__list'),
};
const STORAGE_KEY = 'tasks';
let itemsCollection = [];

refs.formRef.addEventListener('submit', addTask);
refreshPage();

const btnListRef = document.getElementsByClassName('todo__btn-item');
for (const btnItem of btnListRef) {
  btnItem.addEventListener('click', onClickAction);
}

function addTask(event) {
  event.preventDefault();

  if (!refs.inputRef.value) {
    Notify.failure('You cannot add empty field!');
    return;
  } else {
    Notify.success('Your new ToDo has been added!');

    const newTask = {
      id: Date.now(),
      text: refs.inputRef.value,
    };

    itemsCollection.push(newTask);
    saveToLocalStorage();
    renderTask(newTask);
    event.currentTarget.reset();
  }
}

function refreshPage() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    return;
  } else {
    itemsCollection = JSON.parse(localStorage.getItem(STORAGE_KEY));
    itemsCollection.forEach(task => renderTask(task));
  }
}

function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(itemsCollection));
}

function renderTask(task) {
  const item = `<li id="${task.id}" class="todo__item">
            <input value="${task.text}" class="todo__input"></input>
            <div class="todo__btn-list">
              <button
                type="button"
                data-action="edit"
                class="todo__btn-item todo__edit"
              >
                Edit
              </button>
              <button
                type="button"
                data-action="done"
                class="todo__btn-item todo__done"
              >
                Done
              </button>
              <button
                type="button"
                data-action="delete"
                class="todo__btn-item todo__delete"
              >
                Delete
              </button>
            </div>
          </li>
    `;
  refs.todoListRef.insertAdjacentHTML('beforeend', item);
}

function onClickAction(event) {
  const { target } = event;
  const action = target.dataset.action;
  const item = target.closest('li');
  const id = +item.id;
  const input = item.children[0];
  switch (action) {
    case 'edit':
      // if (target.textContent.toLowerCase().trim() === action) {
      //   input.removeAttribute('readonly');
      //   input.focus();
      //   input.selectionStart = input.value.length;
      //   target.textContent = 'save';
      //   inputRef.value = input.value;
      //   // for (const item of itemsCollection) {
      //   //   if (item.includes(input.value)) {
      //   //     localStorage.setItem(
      //   //       itemsCollection.indexOf(item).toString(),
      //   //       parentLi.innerHTML
      //   //     );
      //   //   }
      //   // }
      // } else {
      //   target.textContent = 'edit';
      //   // input.setAttribute('readonly', 'readonly');
      // }
      break;
    case 'done':
      item.classList.toggle('todo__item-done');
      break;
    case 'delete':
      const index = itemsCollection.findIndex(item => {
        return item.id === id;
      });
      itemsCollection.splice(index, 1);
      item.remove();
      saveToLocalStorage();
  }
}
