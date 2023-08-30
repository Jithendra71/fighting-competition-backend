import "reflect-metadata"
import { DataSource } from "typeorm"
require('dotenv').config();
import { Fight } from './Entities/Fight';
import { Stats } from './Entities/Stats';
import { Ranking } from './Entities/Ranking';
import { User } from "./Entities/User";
import { Fighter } from "./Entities/Fighter";
import { Event } from "./Entities/Event";

export const AppDataSource = new DataSource({
    type: "postgres",
    url:process.env.POSTGRES_URI,
    synchronize: true,
    logging: false,
    entities: [User, Fight, Fighter, Event, Ranking, Stats],
    migrations: [],
    subscribers: [],
})
