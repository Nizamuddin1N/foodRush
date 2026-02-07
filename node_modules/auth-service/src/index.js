import express from 'express';

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'auth',
    time: new Date().toISOString()
  });
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});
