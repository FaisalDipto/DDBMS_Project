const express = require('express');
const router = express.Router();
const db = require('./database');

// Add Donor Route
router.post('/donors', async (req, res) => {
    try {
        const donorId = await db.addDonor(req.body);
        res.status(201).json({ message: 'Donor added successfully', donor_id: donorId });
    } catch (error) {
        res.status(500).json({ message: 'Error adding donor', error: error.message });
    }
});

// Search Donors Route
router.get('/donors/search', async (req, res) => {
    const { blood_type, address } = req.query;
    console.log("Search params:", { blood_type, address });

    try {
        const donors = await db.searchDonors(blood_type, address);
        res.json(donors);
    } catch (error) {
        console.error("Error in searchDonors:", error.message);
        res.status(500).json({ message: 'Error searching donors', error: error.message });
    }
});


// Get All Donors Route
router.get('/donors', async (req, res) => {
    try {
        const donors = await db.getAllDonors();
        res.json(donors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching donors', error: error.message });
    }
});

// Update Donor Route
router.put('/donors/:id', async (req, res) => {
    const donorId = req.params.id;
    try {
        const success = await db.updateDonor(donorId, req.body);
        if (success) {
            res.json({ message: 'Donor updated successfully' });
        } else {
            res.status(404).json({ message: 'Donor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating donor', error: error.message });
    }
});

// Delete Donor Route
router.delete('/donors/:id', async (req, res) => {
    const donorId = req.params.id;
    const { blood_type } = req.body;
    try {
        const success = await db.deleteDonor(donorId, blood_type);
        if (success) {
            res.json({ message: 'Donor deleted successfully' });
        } else {
            res.status(404).json({ message: 'Donor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting donor', error: error.message });
    }
});

module.exports = router;