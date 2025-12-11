import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    // MongoDB connection options for better reliability
    const options = {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      family: 4, // Use IPv4, skip trying IPv6
    };

    const conn = await mongoose.connect(mongoURI, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.error('Make sure:');
    console.error('1. MONGODB_URI is correctly set in your environment variables');
    console.error('2. Your IP address is whitelisted in MongoDB Atlas');
    console.error('3. For Render.com, whitelist 0.0.0.0/0 (allow all IPs) in MongoDB Atlas Network Access');
    console.error('4. Your MongoDB connection string is properly formatted');
    process.exit(1);
  }
};

export default connectDB;

