import express from 'express';
import { FighterController } from '../controllers/Fighter.controller';
import { body } from 'express-validator';
import { validate } from '../middleware/validation';

const router = express.Router();
const fighterController = new FighterController();

router.post('/fighters',[
    body('firstName').notEmpty(),
    body('lastName').notEmpty(),
    body('nationality').notEmpty(),
    body('weightClass').notEmpty(),
    body('team').notEmpty(),

    validate, 

],
async (req, res) => {
  try {
    const newFighter = await fighterController.createFighter(req.body);
    res.status(201).json(newFighter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/fighters', async (req, res) => {
  try {
    const fighters = await fighterController.getAllFighters();
    res.status(200).json(fighters);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/fighters/:id', async (req, res) => {
  const fighterId = parseInt(req.params.id, 10);
  try {
    const fighter = await fighterController.getFighterById(fighterId);
    if (!fighter) {
      res.status(404).json({ error: 'Fighter not found' });
    } else {
      res.status(200).json(fighter);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/fighters/:id', async (req, res) => {
  const fighterId = parseInt(req.params.id, 10);
  try {
    const updatedFighter = await fighterController.updateFighter(fighterId, req.body);
    res.status(200).json(updatedFighter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/fighters/:id', async (req, res) => {
  const fighterId = parseInt(req.params.id, 10);
  try {
    await fighterController.deleteFighter(fighterId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
