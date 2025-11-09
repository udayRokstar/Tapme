import mongoose from 'mongoose';

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // This preserves the cached connection across hot reloads in development
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}



/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// Initialize cached connection object with proper type
let cached: MongooseCache = global.mongoose || {
  conn: null,
  promise: null,
};

// Update the global mongoose cache if it wasn't initialized
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
  cached = global.mongoose;
}

async function dbConnect(): Promise<MongooseCache> {
  // Return cached connection if it exists
  if (cached.conn) {
    console.log('✅ MongoDB connection already exists');
    return cached;
  }

  // Create a new connection promise if none exists
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log('✅ MongoDB connected successfully');
        return mongooseInstance;
      })
      .catch((error) => {
        console.error('❌ MongoDB connection error:', error);
        // Clear the promise on error to allow retries
        cached.promise = null;
        throw error;
      });
  }

  try {
    // Wait for the connection promise to resolve
    cached.conn = await cached.promise;
    return cached;
  } catch (e) {
    // Clear the promise on error to allow retries
    cached.promise = null;
    throw e;
  }
}

export default dbConnect;
