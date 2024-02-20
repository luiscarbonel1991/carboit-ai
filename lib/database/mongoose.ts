
import mongoose, { ConnectOptions, Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

let cache = (global as any).mongoose;

if(!cache) {
  cache = (global as any).mongoose = { conn: null, promise: null };
}

export const dbConnect = async () => {
    if(cache.conn) {
        return cache.conn;
    }

    if(!MONGODB_URL) throw new Error('MONGODB_URL is not defined');

    if(!cache.promise) {
        const opts = {
            dbName: 'carbo-ai',
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
            bufferMaxEntries: 0,
            useFindAndModify: false,
            useCreateIndex: true,
        } as ConnectOptions;

        cache.promise = mongoose.connect(MONGODB_URL, opts).then((mongoose) => {
            return mongoose;
        });
    }

    cache.conn = await cache.promise;
    return cache.conn;
}

