const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors(
    {
        // https://rentify-api-gules.vercel.app/
        origin:["https://rentify-mern.vercel.app"],
        methods:["POST","GET","PUT"],
        credentials:true,
        allowedHeaders: ["Content-Type", "Authorization"]
    }

));

// MongoDB Connection
mongoose.connect('mongodb+srv://root:root@cluster0.id3pu4o.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Successfully connected to the database');
})
.catch((err) => {
    console.error('Error connecting to the database', err);
});

// Routes
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes');

app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
