require('dotenv').config();
const express = require('express');
const cors = require('cors');

const sequelize = require('./config/db');
require('./models'); // import relationships

const app = express();
const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);
const taskRoutes = require('./routes/taskRoutes');

app.use('/api/tasks', taskRoutes);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Running...');
});

// DB connection
sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
