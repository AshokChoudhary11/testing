import mongoose from "mongoose";

// MongoDB connection string
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://2019civashok7500:YqiS4hLXo3zQwdne@cluster0.mg0zg97.mongodb.net/blogwebsite?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
if (!mongoose.connections[0].readyState) {
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// Define Mongoose schema and model
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // Assuming image is stored as a URL or Base64 string
  date: { type: Date, default: Date.now },
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export { Post };
