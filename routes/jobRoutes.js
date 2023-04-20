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
