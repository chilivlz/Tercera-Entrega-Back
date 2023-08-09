import dotenv from 'dotenv';

export const ent = { MODE: process.argv[2] };

dotenv.config({ path: process.argv[2] === 'DEV' ? './.env.development' : './.env.production' });

ent.PORT = process.env.PORT;
ent.MONGO_URL = process.env.MONGO_URL;
ent.CLIENT_ID = process.env.CLIENT_ID;
ent.GIT_KEY = process.env.GIT_KEY;