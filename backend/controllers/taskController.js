const { Task } = require('../models');

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      userId: req.user.id, // 🔥 attach logged-in user
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET USER TASKS
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id }, // 🔥 only user's tasks
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task || task.userId !== req.user.id)
      return res.status(403).json({ error: 'Unauthorized' });

    task.status = 'completed';
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task || task.userId !== req.user.id)
      return res.status(403).json({ error: 'Unauthorized' });

    await task.destroy();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};