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
    Notify.success('Your new ToDo has been added');

    const newTask = {
      id: Date.now(),
      text: refs.inputRef.value,
      done: 'todo__item',
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
  const item = `<li id="${task.id}" class="${task.done}">
              <input value="${task.text}" class="todo__input" readonly></input>
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
  const itemTag = target.closest('li');
  const itemID = +itemTag.id;
  const inputTag = itemTag.children[0];
  const itemInd = itemsCollection.findIndex(elem => elem.id === itemID);
  const itemObj = itemsCollection[itemInd];

  switch (action) {
    case 'edit':
      if (target.textContent.toLowerCase().trim() === action) {
        inputTag.removeAttribute('readonly');
        inputTag.focus();
        inputTag.selectionStart = inputTag.value.length;
        target.textContent = 'save';
        target.addEventListener('click', changeName);

        function changeName() {
          inputTag.setAttribute('readonly', 'readonly');
          target.textContent = 'edit';
          itemObj.text = inputTag.value;
          itemsCollection.splice(itemInd, 1, itemObj);
          saveToLocalStorage();
        }
      }
      break;

    case 'done':
      const className = 'todo__item-done';
      itemTag.classList.toggle(className);

      if (itemObj.done === 'todo__item') {
        itemObj.done = `todo__item ${className}`;
      } else {
        itemObj.done = 'todo__item';
      }

      itemsCollection.splice(itemInd, 1, itemObj);
      saveToLocalStorage();
      break;

    case 'delete':
      itemsCollection.splice(itemInd, 1);
      itemTag.remove();
      Notify.success(`Task "${inputTag.value}" has been deleted`);
      saveToLocalStorage();
  }
}
