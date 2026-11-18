import pool from "../config/db.js";

export async function fetchAllMedicines() {
    const [rows] = await pool.query(
        "SELECT * FROM medicine ORDER BY id DESC"
    );

    return rows;
}

export async function findMedicineById(id) {
    const [rows] = await pool.query(
        "SELECT * FROM medicine WHERE id = ?",
        [id]
    );

    return rows;
}

export async function insertMedicine(medicine) {
    const { name, category, quantity, expiration, description } = medicine;

    return await pool.query(
        `INSERT INTO medicine
        (name, category, quantity, expiration, description)
        VALUES (?, ?, ?, ?, ?)`,
        [name, category, quantity, expiration, description]
    );
}

export async function updateMedicine(id, medicine) {
    const { name, category, quantity, expiration, description } = medicine;

    return await pool.query(
        `UPDATE medicine
        SET name = ?, category = ?, quantity = ?, expiration = ?, description = ?
        WHERE id = ?`,
        [name, category, quantity, expiration, description, id]
    );
}

export async function updateMedicineQuantity(id, quantity) {
    return await pool.query(
        "UPDATE medicine SET quantity = ? WHERE id = ?",
        [quantity, id]
    );
}

export async function deleteMedicine(id) {
    return await pool.query(
        "DELETE FROM medicine WHERE id = ?",
        [id]
    );
}