class TaskService {
  constructor() {
    this.tasks = [];
    this.nextId = 1;
  }

  list() {
    return [...this.tasks];
  }

  findById(id) {
    return this.tasks.find((task) => task.id === Number(id));
  }

  create(data) {
    const title = String(data.title || '').trim();
    if (title.length < 3) {
      throw new Error('O título deve possuir pelo menos 3 caracteres.');
    }

    const priority = ['baixa', 'media', 'alta'].includes(data.priority)
      ? data.priority
      : 'media';

    const task = {
      id: this.nextId++,
      title,
      description: String(data.description || '').trim(),
      priority,
      completed: false,
      createdAt: new Date().toISOString()
    };

    this.tasks.push(task);
    return task;
  }

  update(id, data) {
    const task = this.findById(id);
    if (!task) throw new Error('Tarefa não encontrada.');

    if (data.title !== undefined) {
      const title = String(data.title).trim();
      if (title.length < 3) {
        throw new Error('O título deve possuir pelo menos 3 caracteres.');
      }
      task.title = title;
    }

    if (data.description !== undefined) task.description = String(data.description).trim();
    if (['baixa', 'media', 'alta'].includes(data.priority)) task.priority = data.priority;
    if (typeof data.completed === 'boolean') task.completed = data.completed;

    return task;
  }

  remove(id) {
    const index = this.tasks.findIndex((task) => task.id === Number(id));
    if (index === -1) throw new Error('Tarefa não encontrada.');
    return this.tasks.splice(index, 1)[0];
  }
}

module.exports = TaskService;
