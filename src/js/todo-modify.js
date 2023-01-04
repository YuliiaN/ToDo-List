import { itemsCollection } from './todo-add.js';

const btnListRef = document.querySelectorAll('.todo__btn-list');
btnListRef.forEach(buttonItem =>
  buttonItem.addEventListener('click', onClickAction)
);

function onClickAction(event) {
  const { target } = event;
  const action = target.dataset.action;
  const parentLi = target.closest('li');
  const input = document.querySelector('.todo__input');
  const inputValue = input.value;

  switch (action) {
    case 'edit':
      if (target.textContent.toLowerCase().trim() === action) {
        input.removeAttribute('readonly');
        input.focus();
        input.selectionStart = inputValue.length;
        target.textContent = 'save';
      } else {
        target.textContent = 'edit';
        // input.setAttribute('readonly', 'readonly');
      }
      break;
    case 'done':
      console.log('done');
      break;
    case 'delete':
      parentLi.remove();

      for (const item of itemsCollection) {
        if (item.includes(inputValue)) {
          localStorage.removeItem(itemsCollection.indexOf(item).toString());
        }
      }
  }
}
