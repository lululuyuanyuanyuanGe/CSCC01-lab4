import express from 'express';
import cors from 'cors';
import { sequelize } from './database.js';
import { usersRouter } from './routes/usersRouter.js';
import { postsRouter } from './routes/postsRouter.js';
import "dotenv/config";
import session from 'express-session';

// Initialize the application
const port = 8080;
const app = express();

// Middleware
/* TODO: Configure CORS here */

/* TODO: Configure express-session here */

app.use(express.json());

// Routes
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

// Sync the database
try {
  await sequelize.authenticate();
  await sequelize.sync({ alter: { drop: false } });
  console.log('Database synced successfully.');
}
catch (err) {
  console.error('Failed to sync the database:', err);
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});