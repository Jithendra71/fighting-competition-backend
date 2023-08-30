import express from "express";
import { FightController } from '../controllers/Fight.controller';

const router = express.Router();
const fightController = new FightController();

router.post('/fights', async (req, res) => {
  try {
    const newFight = await fightController.createFight(req.body);
    res.status(201).json(newFight);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/fights', async (req, res) => {
  try {
    const fights = await fightController.getAllFights();
    res.status(200).json(fights);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/fights/:id', async (req, res) => {
  const fightId = parseInt(req.params.id, 10);
  try {
    const fight = await fightController.getFightById(fightId);
    if (!fight) {
      res.status(404).json({ error: 'Fight not found' });
    } else {
      res.status(200).json(fight);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/fights/:id', async (req, res) => {
  const fightId = parseInt(req.params.id, 10);
  try {
    const updatedFight = await fightController.updateFight(fightId, req.body);
    res.status(200).json(updatedFight);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/fights/:id', async (req, res) => {
  const fightId = parseInt(req.params.id, 10);
  try {
    await fightController.deleteFight(fightId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
