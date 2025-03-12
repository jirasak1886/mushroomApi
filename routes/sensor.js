const express = require('express');
const router = express.Router();
const { getAllTestData, getTestDataById } = require('../controller/sensorController');

// ดึงข้อมูลทั้งหมด
router.get('/', getAllTestData);

// ดึงข้อมูลตาม `_id`
router.get('/:id', getTestDataById);

module.exports = router;
