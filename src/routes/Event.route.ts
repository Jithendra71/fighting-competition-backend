import express from 'express';
import { EventController } from '../controllers/Event.controller';

const router = express.Router();
const eventController = new EventController();

router.post('/events', async (req, res) => {
  try {
    const newEvent = await eventController.createEvent(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/events', async (req, res) => {
  try {
    const events = await eventController.getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/events/:id', async (req, res) => {
  const eventId = parseInt(req.params.id, 10);
  try {
    const event = await eventController.getEventById(eventId);
    if (!event) {
      res.status(404).json({ error: 'Event not found' });
    } else {
      res.status(200).json(event);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/events/:id', async (req, res) => {
  const eventId = parseInt(req.params.id, 10);
  try {
    const updatedEvent = await eventController.updateEvent(eventId, req.body);
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/events/:id', async (req, res) => {
  const eventId = parseInt(req.params.id, 10);
  try {
    await eventController.deleteEvent(eventId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
