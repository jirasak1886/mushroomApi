const Test = require('../models/sensor');

// ดึงข้อมูลทั้งหมดจาก `test1`
const getAllTestData = async (req, res) => {
    try {
        const data = await Test.find(); // ดึงทุกเอกสารจาก `test1`
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ดึงข้อมูลตาม `_id`
const getTestDataById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Test.findById(id);

        if (data) {
            res.json(data);
        } else {
            res.status(404).json({ message: 'Data not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllTestData, getTestDataById };
