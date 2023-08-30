import { Fighter } from '../Entities/Fighter';
import { Stats } from '../Entities/Stats';
import { Ranking } from '../Entities/Ranking';
import { AppDataSource } from '../data-source';

export class FighterController {
  async createFighter(data: any): Promise<Fighter> {
    const fighterRepository = AppDataSource.getRepository(Fighter);
    const statsRepository = AppDataSource.getRepository(Stats);
    const rankingRepository = AppDataSource.getRepository(Ranking);

    const {firstName,lastName, nationality, weightClass, team} = data;
    const {wins, losses, knockouts, submissions} = data.stats;
    const {position} = data.ranking
    const newFighter = fighterRepository.create({firstName,lastName,nationality,weightClass,team});
    const newStats = statsRepository.create({fighter:newFighter, wins, knockouts, losses, submissions});
    const newRanking = rankingRepository.create({fighter:newFighter, position, score:0, weightClass});

    newFighter.stats = newStats;
    newFighter.rankings = [newRanking];

    await fighterRepository.save(newFighter);
    return newFighter;
  }

  async getAllFighters(): Promise<Fighter[]> {
    const fighterRepository = AppDataSource.getRepository(Fighter);
    return await fighterRepository.find();
  }

  async getFighterById(id: number): Promise<Fighter | undefined> {
    const fighterRepository = AppDataSource.getRepository(Fighter);
    return await fighterRepository.findOne({where:{id}});
  }

  async updateFighter(id: number, data: any): Promise<Fighter> {
    const fighterRepository = AppDataSource.getRepository(Fighter);
    const fighter = await fighterRepository.findOne({where:{id}});

    if (!fighter) {
      throw new Error('Fighter not found');
    }

    await fighterRepository.update(id, data);
    return await fighterRepository.findOne({where:{id}});
  }

  async deleteFighter(id: number): Promise<void> {
    const fighterRepository = AppDataSource.getRepository(Fighter);
    await fighterRepository.delete(id);
  }

  async updateFighterRankings(fighterId: number, newRanking: number): Promise<void> {
    const rankingRepository = AppDataSource.getRepository(Ranking);
    await rankingRepository.update(fighterId, { position: newRanking });
  }
}
