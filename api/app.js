const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

const userRoutes = require('./routes/user/userRoutes');

app.use(express.json());
app.use(cors());
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})