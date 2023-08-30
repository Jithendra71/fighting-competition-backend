
import express from 'express';
import fighterRoutes from './routes/Fighter.route';
import fightRoutes from './routes/Fight.route';
import eventRoutes from './routes/Event.route';
import { AppDataSource } from './data-source';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api', fighterRoutes);
app.use('/api', fightRoutes);
app.use('/api', eventRoutes);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Database connection setup
async function startServer() {
  try {
    await AppDataSource.initialize();
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

startServer();
