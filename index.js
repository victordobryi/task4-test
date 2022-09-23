import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json('hello this is the backend');
});

app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/users', (req, res) => {
  const query =
    'INSERT INTO users (`id`, `username`, `password`, `isAuth`, `isLoading`) VALUES (?)';
  const values = [
    req.body.id,
    req.body.username,
    req.body.password,
    req.body.isAuth,
    req.body.isLoading,
  ];
  db.query(query, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json('User has been created successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
