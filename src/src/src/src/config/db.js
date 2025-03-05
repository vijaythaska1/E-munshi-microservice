import o from 'mongoose';
import n from './config';
export const connectDB = async () => {
  console.log('Attempting DB connection');
  try {
    let c = await o.connect(n.mongoose.url);
    console.log(`MongoDB Connected: ${c.connection.host}`);
  } catch (o) {
    console.log('Db connection error', o);
  }
};
