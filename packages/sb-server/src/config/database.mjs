import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://socialpred:0wtawMZvTqp8GkHA@socialprediction.xten2vr.mongodb.net/social_prediction?retryWrites=true&w=majority');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err}`);
    process.exit(1);
  }
};

export default connectDB;
