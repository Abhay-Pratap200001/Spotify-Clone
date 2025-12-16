import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './lib/dbConnection.js'
import { errorHandler } from './middleware.js/error.midleware.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 7000



connectDB().then(() => {
    const server = app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });

    // Handle runtime errors gracefully
    server.on("error", (error) => {
      console.error("❌ Server Error:", error);
      process.exit(1);
    });
  }).catch((error) => {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  });


  //  Error handler 
app.use(errorHandler);