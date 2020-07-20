const cahngeBordHeight = function () {
  const bord = document.getElementById('bord');

  const bordTop = bord.getBoundingClientRect().top;

  const defaultFontSize = parseInt(window.getComputedStyle(document.body).fontSize, 10);

  bord.style.height ='calc(100vh - ' + (bordTop + defaultFontSize) + 'px)';
};
window.addEventListener('resize', cahngeBordHeight);
cahngeBordHeight();

let dragTask = null;
let dragList = null;

const taskDragOverClass = 'task-drag-over';
const listDragOverClass = 'list-drag-over';

document.addEventListener('dragover', function (event) {
  event.preventDefault();
}, false);

document.addEventListener('drop', function (event) {
  event.preventDefault();
}, false);

const addTaskDragEventHandlers = function (task) {
  task.addEventListener('dragstart', function (event) {
    dragTask = event.target;
  },false);

  task.addEventListener('dragend', function () {
    dragTask = null;
  },)

  task.addEventListener('dragenter', function (event) {
    if (dragTask) {
      event.target.classList.add(taskDragOverClass);
    }
  }, false);

  task.addEventListener('dragleave', function (event) {
    if(dragTask) {
      event.target.classList.remove(taskDragOverClass);
    }
  }, false);

  task.addEventListener('drop', function (event) {
    event.target.classList.remove(taskDragOverClass);
    if (dragTask) {
      event.target.insertAdjacentElement('beforebegin',dragTask);
      dragTask = null;
    }
  },false);
};

const addListDragEventHandlers = function (list) {
  const listHeader = list.querySelector('.card-header');

  listHeader.addEventListener('dragstart', function (event) {
    dragList = event.target.parentElement;
  }, false);

  listHeader.addEventListener('dragend', function () {
    dragList = null;
  },false);

  listHeader.addEventListener('dragend', function () {
    dragList = null;
  }, false);

  const listBody = list.querySelector('.card-body');

  listBody.addEventListener('dragenter', function (event) {
    if(dragTask) {
      event.target.classList.add(taskDragOverClass);
    }
  }, false);

  listBody.addEventListener('dragleave', function (event) {
    if(dragTask) {
      event.target.classList.remove(taskDragOverClass);
    }
  }, false);

  listBody.addEventListener('drop', function (event) {
    if (dragTask) {
      event.target.classList.remove(taskDragOverClass);

      event.target.appendChild(dragTask);
      dragTask = null;
    }
  }, false);

  list.addEventListener('dragover', function () {
    if(dragList) {
      list.classList.add(listDragOverClass);
    }
  }, false);

  list.addEventListener('dragleave', function () {
    if (dragList) {
      list.classList.remove(listDragOverClass);
    }
  }, false);

  list.addEventListener('drop', function () {
    if (dragList) {
      list.classList.remove(listDragOverClass);

      list.insertAdjacentElement('beforebegin', dragList);
      dragList = null;
    }
  }, false);
};

document.getElementById('bord').querySelectorAll('.list').forEach(function (list) {
  addListDragEventHandlers(list);
});

document.getElementById('bord').querySelectorAll('.task').forEach(function (task) {
  addTaskDragEventHandlers(task);
});

const dNone = 'd-none';

let addType = null;

const types = {
  task: {
    title: 'タスク追加',
    alert: 'タスクを入力してください',
    add: function (taskName) {
      const task = document.querySelector('.js-template')
    .querySelector('.task')
    .cloneNode();
    task.textContent = taskName;

    addTaskDragEventHandlers(task);

    document.getElementById('bord')
    .querySelector('.list')
    .querySelector('.card-body')
    .appendChild(task);
    console.log(task);
    }
  },
  list: {
    title: 'リスト追加',
    alert: 'リスト名を入力してください',
    add: function (listName) {
      const list = document.querySelector('.js-template')
      .querySelector('.list')
      .cloneNode(true);

      list.querySelector('.card-header').textContent = listName;

      addListDragEventHandlers(list);

      document.getElementById('bord')
      .appendChild(list);
    }
  },
};

const modalAdd = document.getElementById('modal-add');

const modalInput = modalAdd.querySelector('input');

const showModal = function () {
  modalAdd.classList.remove(dNone);
};

const hideModal = function () {
  modalAdd.classList.add(dNone);
};

document.querySelectorAll('.js-add').forEach(function(btnAdd) {
  btnAdd.addEventListener('click', function (event) {
    addType = event.target.dataset.type;

    modalAdd.querySelector('.mdl-header').textContent = types[addType].title;
    modalInput.value = '';
    showModal();
  });
});

modalAdd.querySelector('.js-btn-close').addEventListener('click', hideModal);

modalAdd.querySelector('.js-btn-add').addEventListener('click', function () {
  if (modalInput.value === '') {
    alert(types[addType].alert);
    return;
  }
  types[addType].add(modalInput.value);
  hideModal();
});