const express = require('express');
const { getAllJobs, createJob, getJob, updateJob, deleteJob } = require('../controllers/jobController');
const { isAuthenticated } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllJobs);
router.post('/', isAuthenticated, createJob);
router.get('/:id', getJob);
router.put('/:id', isAuthenticated, updateJob);
router.delete('/:id', isAuthenticated, deleteJob);

module.exports = router;

const express = require('express');
const jobController = require('../controllers/jobController');
const router = express.Router();

router.get('/', jobController.getJobListings);
// Add other routes for job-related operations like create, update, and delete

module.exports = router;
