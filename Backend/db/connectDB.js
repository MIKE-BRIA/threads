import mongoose from "mongoose";

function mongooseConnect() {
  mongoose.Promise = global.Promise;

  // Check if already connected or connecting
  if (mongoose.connection.readyState === 0) {
    return mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => {
        console.log("Database connected");
      })
      .catch((err) => {
        console.error("Database connection error:", err);
      });
  } else {
    // If already connected or connecting, return a resolved promise
    return Promise.resolve().then(() => {
      console.log("Database already connected or connecting");
    });
  }
}

export default mongooseConnect;
