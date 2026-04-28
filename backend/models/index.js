const User = require('./User');
const Task = require('./Task');

// One user → many tasks
User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Task };