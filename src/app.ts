import express from 'express';

const app = express();
app.use(express.json());

// Root route
app.get('/', (_req, res) => {
  res.send('Flash Sale API running 🚀');
});

export default app;
