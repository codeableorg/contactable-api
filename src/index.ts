import express from "express";
import methodOverride from "method-override";
import cors from "cors";
import { ContactController } from "./controllers/contacts.controller";

const app = express();
const port = 5500;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Routes
app.get("/", ContactController.index);
app.get("/favorites", ContactController.favorites);
app.post("/contacts", ContactController.create);
app.put("/contacts/:id", ContactController.update);
app.get("/contacts/:id", ContactController.show);
app.delete("/contacts/:id", ContactController.delete);
app.post("/contacts/:id/toggle-favorite", ContactController.toggleFavorite);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
