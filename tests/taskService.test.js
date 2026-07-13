const test = require('node:test');
const assert = require('node:assert/strict');
const TaskService = require('../src/taskService');

test('cria tarefa com dados válidos', () => {
  const service = new TaskService();
  const task = service.create({ title: 'Separar pedidos', priority: 'alta' });
  assert.equal(task.id, 1);
  assert.equal(task.title, 'Separar pedidos');
  assert.equal(task.priority, 'alta');
  assert.equal(task.completed, false);
});

test('rejeita título com menos de três caracteres', () => {
  const service = new TaskService();
  assert.throws(() => service.create({ title: 'Oi' }), /pelo menos 3/);
});

test('atualiza uma tarefa existente', () => {
  const service = new TaskService();
  const task = service.create({ title: 'Conferir rota' });
  const updated = service.update(task.id, { completed: true, priority: 'alta' });
  assert.equal(updated.completed, true);
  assert.equal(updated.priority, 'alta');
});

test('remove uma tarefa existente', () => {
  const service = new TaskService();
  const task = service.create({ title: 'Emitir relatório' });
  service.remove(task.id);
  assert.equal(service.list().length, 0);
});
