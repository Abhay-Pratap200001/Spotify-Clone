import express from 'express'
import dotenv from 'dotenv'
import { clerkMiddleware } from '@clerk/express'
import path from 'path'
import fileUpload from 'express-fileupload'



import { connectDB } from './lib/dbConnection.js'
import { errorHandler } from './middleware.js/error.midleware.js'

// routes
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import adminRoutes from './routes/admin.routes.js'
import songRoutes from './routes/song.routes.js'
import albumRoutes from './routes/album.routes.js'
import statRoutes from './routes/stat.routes.js'

dotenv.config()

const __dirname = path.resolve()
const app = express()
const PORT = process.env.PORT || 7000

app.use(express.json()) //to accept data from client

app.use(clerkMiddleware()) //this will add auth to req.body so we can verify user by using => req.auth

app.use(fileUpload({
  tempFileDir: path.join(__dirname, "temp"),
  createParentPath:true,
  limits:{
    fileSize:10 * 1024 * 1024   //10 mb max file
  }
}))


app.use("/api/users", userRoutes) 
app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/songs", songRoutes)
app.use("/api/albums", albumRoutes)
app.use("/api/stats", statRoutes)




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