const form = document.querySelector('#task-form');
const tasksContainer = document.querySelector('#tasks');
const message = document.querySelector('#message');
const counter = document.querySelector('#counter');

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Erro inesperado.');
  return data;
}

function taskCard(task) {
  const article = document.createElement('article');
  article.className = `task ${task.completed ? 'done' : ''}`;
  article.dataset.priority = task.priority;
  article.innerHTML = `
    <div><h3></h3><p></p><small>Prioridade: ${task.priority}</small></div>
    <div class="actions">
      <button class="toggle">${task.completed ? 'Reabrir' : 'Concluir'}</button>
      <button class="delete">Excluir</button>
    </div>`;
  article.querySelector('h3').textContent = task.title;
  article.querySelector('p').textContent = task.description || 'Sem descrição';
  article.querySelector('.toggle').addEventListener('click', async () => {
    await request(`/api/tasks/${task.id}`, { method: 'PUT', body: JSON.stringify({ completed: !task.completed }) });
    loadTasks();
  });
  article.querySelector('.delete').addEventListener('click', async () => {
    await request(`/api/tasks/${task.id}`, { method: 'DELETE' });
    loadTasks();
  });
  return article;
}

async function loadTasks() {
  const tasks = await request('/api/tasks');
  counter.textContent = `${tasks.length} ${tasks.length === 1 ? 'tarefa' : 'tarefas'}`;
  tasksContainer.replaceChildren();
  if (tasks.length === 0) {
    tasksContainer.innerHTML = '<p class="empty">Nenhuma tarefa cadastrada.</p>';
    return;
  }
  tasks.forEach((task) => tasksContainer.appendChild(taskCard(task)));
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  message.textContent = '';
  try {
    await request('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        priority: document.querySelector('#priority').value
      })
    });
    form.reset();
    loadTasks();
  } catch (error) {
    message.textContent = error.message;
  }
});

loadTasks();
