const express = require('express');
const Data = require('../models/Data');
const router = express.Router();

// Get all data
router.get('/', async (req, res) => {
  try {
    const data = await Data.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Filter data
router.get('/filter', async (req, res) => {
  const { end_year, topic, sector, region, pestle, source, swot, country, city } = req.query;
  const query = {};

  if (end_year) query.end_year = end_year;
  if (topic) query.topic = topic;
  if (sector) query.sector = sector;
  if (region) query.region = region;
  if (pestle) query.pestle = pestle;
  if (source) query.source = source;
  if (country) query.country = country;

  try {
    const data = await Data.find(query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
