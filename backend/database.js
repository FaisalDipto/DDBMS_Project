const mysql = require('mysql2/promise');
require('dotenv').config();

// Function to get database and table based on blood type
function getDatabaseAndTable(bloodType) {
    const bloodGroupMap = {
        'A+': { database: 'donors_a', table: 'a_positive' },
        'A-': { database: 'donors_a', table: 'a_negative' },
        'B+': { database: 'donors_b', table: 'b_positive' },
        'B-': { database: 'donors_b', table: 'b_negative' },
        'AB+': { database: 'donors_ab', table: 'ab_positive' },
        'AB-': { database: 'donors_ab', table: 'ab_negative' },
        'O+': { database: 'donors_o', table: 'o_positive' },
        'O-': { database: 'donors_o', table: 'o_negative' }
    };
    return bloodGroupMap[bloodType];
}

// Add Donor Function
async function addDonor(donorData) {
    const { database, table } = getDatabaseAndTable(donorData.blood_type);
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: database
    });
    
    try {
        const [result] = await connection.query(
            `INSERT INTO ${table} (user_id, full_name, date_of_birth, 
            gender, weight, last_donation_date, medical_history, 
            eligibility_status, address, contact_number) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                donorData.user_id, 
                donorData.full_name, 
                donorData.date_of_birth,
                donorData.gender,
                donorData.weight,
                donorData.last_donation_date,
                donorData.medical_history,
                donorData.eligibility_status,
                donorData.address,
                donorData.contact_number
            ]
        );
        return result.insertId;
    } finally {
        await connection.end();
    }
}

// Search Donors Function
async function searchDonors(bloodType, address) {
    const { database, table } = getDatabaseAndTable(bloodType);
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: database
    });
    
    try {
        const [donors] = await connection.query(
            `SELECT * FROM ${table} 
            WHERE address LIKE ?`,
            [`%${address}%`]
        );
        // Add the blood_type to each donor record
        donors.forEach(donor => {
            donor.blood_type = bloodType;
        });
        return donors;
    } finally {
        await connection.end();
    }
}


// Get All Donors Function
async function getAllDonors() {
    const databases = ['donors_a', 'donors_b', 'donors_ab', 'donors_o'];
    const tables = {
        'donors_a': { 'a_positive': 'A+', 'a_negative': 'A-' },
        'donors_b': { 'b_positive': 'B+', 'b_negative': 'B-' },
        'donors_ab': { 'ab_positive': 'AB+', 'ab_negative': 'AB-' },
        'donors_o': { 'o_positive': 'O+', 'o_negative': 'O-' }
    };

    let allDonors = [];

    for (const database of databases) {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: database
        });

        try {
            for (const [table, bloodType] of Object.entries(tables[database])) {
                const [donors] = await connection.query(`SELECT * FROM ${table}`);
                // Add the blood type to each donor record
                donors.forEach(donor => {
                    donor.blood_type = bloodType;
                });
                allDonors = [...allDonors, ...donors];
            }
        } finally {
            await connection.end();
        }
    }

    return allDonors;
}


// Update Donor Function
async function updateDonor(donorId, donorData) {
    const { database, table } = getDatabaseAndTable(donorData.blood_type);
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: database
    });
    
    try {
        await connection.query(
            `UPDATE ${table} 
            SET full_name = ?, date_of_birth = ?, gender = ?, 
            weight = ?, last_donation_date = ?, medical_history = ?, 
            eligibility_status = ?, address = ?, contact_number = ?
            WHERE donor_id = ?`,
            [
                donorData.full_name,
                donorData.date_of_birth,
                donorData.gender,
                donorData.weight,
                donorData.last_donation_date,
                donorData.medical_history,
                donorData.eligibility_status,
                donorData.address,
                donorData.contact_number,
                donorId
            ]
        );
        return true;
    } finally {
        await connection.end();
    }
}

// Delete Donor Function
async function deleteDonor(donorId, bloodType) {
    const { database, table } = getDatabaseAndTable(bloodType);
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: database
    });
    
    try {
        await connection.query(`DELETE FROM ${table} WHERE donor_id = ?`, [donorId]);
        return true;
    } finally {
        await connection.end();
    }
}

module.exports = {
    addDonor,
    searchDonors,
    getAllDonors,
    updateDonor,
    deleteDonor
};