const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Job } = require('../models');

// User registration
exports.register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// User authentication
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(400).json({ error: 'Email not found' });
    }
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'User logged in successfully', token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get job listings
exports.getJobListings = async (req, res) => {
  try {
    const jobs = await Job.findAll({ where: req.query });
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Other job-related operations like create, update, and delete can be added here
