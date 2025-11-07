import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Conexión MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));

// Modelos
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

const moodSchema = new mongoose.Schema({
  userId: String,
  date: String,
  mood: String,
  note: String,
  color: String
});
const Mood = mongoose.model("Mood", moodSchema);

const habitSchema = new mongoose.Schema({
  userId: String,
  date: String,
  name: String,
  value: String, // o number según tu necesidad
});
const Habit = mongoose.model("Habit", habitSchema);


// Rutas
app.get("/", (req, res) => res.send("API Vita-Tracker funcionando"));

// Registrar usuario
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  const bcrypt = await import("bcryptjs");
  const hashed = await bcrypt.default.hash(password, 10);
  const user = new User({ username, email, password: hashed });
  await user.save();
  res.json({ message: "Usuario registrado" });
});

// Iniciar sesión
app.post("/api/login", async (req, res) => {
  const jwt = await import("jsonwebtoken");
  const bcrypt = await import("bcryptjs");
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

  const valid = await bcrypt.default.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Contraseña incorrecta" });

  const token = jwt.default.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, user });
});

// Registrar estado de ánimo
app.post("/api/moods", async (req, res) => {
  const mood = new Mood(req.body);
  await mood.save();
  res.json({ message: "Estado de ánimo guardado" });
});

// Obtener estados de ánimo
app.get("/api/moods/:userId", async (req, res) => {
  const moods = await Mood.find({ userId: req.params.userId });
  res.json(moods);
});

// Guardar hábito
app.post("/api/habits", async (req, res) => {
  const habit = new Habit(req.body);
  await habit.save();
  res.json({ message: "Hábito guardado" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Servidor en puerto", PORT));
