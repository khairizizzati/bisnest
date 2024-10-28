const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Database configuration
const config = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'nurkhairiz',
  server: process.env.DB_SERVER || '127.0.0.1',
  database: process.env.DB_NAME || 'assignment2',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  port: 1433,
};

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Allow only frontend origin
app.use(express.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, 'frontend/build'))); // Serve static frontend

// Connect to the database
const connectToDatabase = async () => {
  try {
    await sql.connect(config);
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
};

// Handle database connection errors
sql.on('error', (err) => {
  console.error('Database connection error:', err);
  connectToDatabase(); // Reconnect if connection is lost
});

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Fetch all users (Protected Route)
app.get('/api/users', authenticateToken, async (req, res) => {
  try {
    const result = await sql.query`SELECT id, fullName, email FROM Users`;
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).send({ message: 'Error fetching users' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await sql.query`SELECT * FROM Users WHERE email = ${email}`;
    if (result.recordset.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = result.recordset[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const checkUser = await sql.query`SELECT * FROM Users WHERE email = ${email}`;
    if (checkUser.recordset.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await sql.query`INSERT INTO Users (fullName, email, password) 
                    VALUES (${fullName}, ${email}, ${hashedPassword})`;

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during signup:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post("/api/submit", async (req, res) => {
  const {
    companyName,
    companyId,
    addressLine1,
    addressLine2,
    addressLine3,
    country,
    state,
    city,
    postcode,
    description,
  } = req.body;

  try {
    // Sambung ke MSSQL
    let pool = await sql.connect(dbConfig);

    // SQL query untuk insert data
    await pool.request()
      .input("companyName", sql.VarChar, companyName)
      .input("companyId", sql.VarChar, companyId)
      .input("addressLine1", sql.VarChar, addressLine1)
      .input("addressLine2", sql.VarChar, addressLine2)
      .input("addressLine3", sql.VarChar, addressLine3)
      .input("country", sql.VarChar, country)
      .input("state", sql.VarChar, state)
      .input("city", sql.VarChar, city)
      .input("postcode", sql.VarChar, postcode)
      .input("description", sql.Text, description)
      .query(
        `INSERT INTO Applications (companyName, companyId, addressLine1, addressLine2, 
         addressLine3, country, state, city, postcode, description)
         VALUES (@companyName, @companyId, @addressLine1, @addressLine2, 
         @addressLine3, @country, @state, @city, @postcode, @description)`
      );

    res.status(201).send("Application submitted successfully.");
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Error submitting application.");
  }
});

// Serve React frontend
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Catch-all route for React frontend paths
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Start the server and connect to the database
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  connectToDatabase();
});

