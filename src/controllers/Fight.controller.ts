import { Fight } from '../Entities/Fight';
import { Fighter } from '../Entities/Fighter';
import { AppDataSource } from '../data-source';
import { Ranking } from '../Entities/Ranking';

export class FightController {
  async createFight(data: any): Promise<Fight> {
    const fightRepository = AppDataSource.getRepository(Fight);
    const fighterRepository = AppDataSource.getRepository(Fighter);
    const {fighter1Name,fighter2Name, event} = data;
    const fighter1 = await fighterRepository.findOne({where:{firstName:fighter1Name.split(" ")[0], lastName:fighter1Name.split(" ")[1]}});
    const fighter2 = await fighterRepository.findOne({where:{firstName:fighter2Name.split(" ")[0], lastName:fighter2Name.split(" ")[1]}})

    const newFight = fightRepository.create({event,fighter1,fighter2,result:""});
    await fightRepository.save(newFight);
    return newFight;
  }

  async getAllFights(): Promise<Fight[]> {
    const fightRepository = AppDataSource.getRepository(Fight);
    return await fightRepository.find();
  }

  async getFightById(id: number): Promise<Fight | undefined> {
    const fightRepository = AppDataSource.getRepository(Fight);
    return await fightRepository.findOne({where:{id}});
  }

  async updateFight(id: number, data: any): Promise<Fight> {
    const fightRepository = AppDataSource.getRepository(Fight);
    const fight = await fightRepository.findOne({where:{id}});

    if (!fight) {
      throw new Error('Fight not found');
    }

    await fightRepository.update(id, {result:data.result});
    await this.updateFighterRankings(data);
    return await fightRepository.findOne({where:{id}});
  }



  async updateFighterRankings(data): Promise<void> {
    try {
      const fightRepository = AppDataSource.getRepository(Fight);
      const fight = await fightRepository.findOne({where:{id:data.fightId}});

      if (!fight) {
        throw new Error('Fight not found');
      }

      const winner = fight.result === 'fighter1 win' ? fight.fighter1 : fight.fighter2;
      const loser = fight.result === 'fighter1 win' ? fight.fighter2 : fight.fighter1;

      const rankingRepository = AppDataSource.getRepository(Ranking);

    
      const winnerRanking = await rankingRepository.findOne({where:{
        fighter: winner,
      }});

      const loserRanking = await rankingRepository.findOne({where:{
        fighter: loser,
      }});

      if (!winnerRanking || !loserRanking) {
        throw new Error('Ranking not found');
      }

      
      const newWinnerScore = winnerRanking.score + 1;
      const newLoserScore = loserRanking.score - 1;

      await rankingRepository.update({id:winnerRanking.id}, {
        score: newWinnerScore,
      });

      await rankingRepository.update({id:loserRanking.id}, {
        score: newLoserScore,
      });
      const weightClassRankings = rankingRepository.find({where:{weightClass:winnerRanking.weightClass}})
      let sortable = [];
      (await weightClassRankings).forEach(temp=>{
        sortable.push([temp.id, temp.score, temp.position])
      })
      sortable.sort(function(a, b) {
        return a[1] - b[1];
      });
			let pos = 1;
			sortable.forEach(async arr=>{
				await rankingRepository.update({id:arr[0]}, {
					position: pos,
				});
				pos++;
			})

    } catch (error) {
      throw new Error(`Failed to update rankings: ${error.message}`);
    }
  }

  async deleteFight(id: number): Promise<void> {
    const fightRepository = AppDataSource.getRepository(Fight);
    await fightRepository.delete(id);
  }
}
