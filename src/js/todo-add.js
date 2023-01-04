export { itemsCollection };

const formRef = document.querySelector('.todo__form');
const inputRef = document.querySelector('.todo__field');
const todoListRef = document.querySelector('.todo__list');
const itemsCollection = [];

formRef.addEventListener('submit', onFormSubmit);
refreshPage();

function onFormSubmit(event) {
  event.preventDefault();

  //create html

  const newItem = `<li class="todo__item">
            <input value="${inputRef.value}" class="todo__input"></input>
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

  if (!inputRef.value) {
    alert('You cannot add empty field!');
    return;
  }

  todoListRef.insertAdjacentHTML('beforeend', newItem);
  itemsCollection.push(newItem);
  event.currentTarget.reset();

  // local storage

  for (const item of itemsCollection) {
    const index = itemsCollection.indexOf(item);
    localStorage.setItem(`${index}`, item);
  }
}

function refreshPage() {
  if (!localStorage.length) {
    return;
  }

  for (let i = 0; i < localStorage.length; i++) {
    itemsCollection.push(localStorage.getItem(i));
  }
  todoListRef.insertAdjacentHTML('beforeend', itemsCollection.join(''));
}
