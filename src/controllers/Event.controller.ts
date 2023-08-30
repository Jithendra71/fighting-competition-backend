import { Event } from '../Entities/Event';
import { AppDataSource } from '../data-source';
import { FightController } from './Fight.controller';

export class EventController {
  async createEvent(data: any): Promise<Event> {
    const eventRepository = AppDataSource.getRepository(Event);
    const {eventName, date, location} = data;
    const {fightDataArray} = data.fights;
    const fightController = new FightController();
    const newEvent = eventRepository.create({eventName,date,location});
    fightDataArray.forEach(async (fightdata:Object) => {
        await fightController.createFight({...fightdata,event:newEvent})
    });
    await eventRepository.save(newEvent);
    return newEvent;
  }

  async getAllEvents(): Promise<Event[]> {
    const eventRepository = AppDataSource.getRepository(Event);
    return await eventRepository.find();
  }

  async getEventById(id: number): Promise<Event | undefined> {
    const eventRepository = AppDataSource.getRepository(Event);
    return await eventRepository.findOne({where:{id}});
  }

  async updateEvent(id: number, data: any): Promise<Event> {
    const eventRepository = AppDataSource.getRepository(Event);
    const event = await eventRepository.findOne({where:{id}});

    if (!event) {
      throw new Error('Event not found');
    }

    await eventRepository.update(id, {...data});
    return await eventRepository.findOne({where:{id}});
  }

  async deleteEvent(id: number): Promise<void> {
    const eventRepository = AppDataSource.getRepository(Event);
    await eventRepository.delete(id);
  }
}
