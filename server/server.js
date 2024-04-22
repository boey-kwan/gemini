import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
// app.use(path, handler); // TODO: mount handler as middleware at path

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});