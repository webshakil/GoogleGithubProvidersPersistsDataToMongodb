import mongoose from 'mongoose';

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log('MongoDB already connected');
    return mongoose.connection.getClient(); 
  }

  const username = process.env.MONGO_USERNAME;
  const password = process.env.MONGO_PASSWORD;
  const dbName = process.env.MONGO_DBNAME;

  if (!username || !password || !dbName) {
    throw new Error('MONGO_USERNAME, MONGO_PASSWORD, or MONGO_DBNAME is not defined');
  }

  const uri = `mongodb+srv://${username}:${password}@mernstack-pagination.dmkoc.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  try {
    const connection = await mongoose.connect(uri, {
      
    });
    console.log('MongoDB connected successfully');
    return connection.connection.getClient(); 
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export default dbConnect;
