const pool = require("../config/database");

const createClient = async (clientData) => {
  const {
    name,
    email,
    phone
  } = clientData;

  const [result] = await pool.query(
    `INSERT INTO clients
     (name, email, phone)
     VALUES (?, ?, ?)`,
    [
      name,
      email,
      phone
    ]
  );

  const [clients] = await pool.query(
    `SELECT * FROM clients WHERE id = ?`,
    [result.insertId]
  );

  return clients[0];
};
const getAllClients = async () => {
  const [clients] = await pool.query(
    `SELECT * FROM clients
     ORDER BY created_at DESC`
  );

  return clients;
};
const getClientById = async (id) => {
  const [clients] = await pool.query(
    `SELECT * FROM clients WHERE id = ?`,
    [id]
  );

  return clients[0];
};
const updateClient = async (id, clientData) => {
  const {
    name,
    email,
    phone
  } = clientData;

  const [result] = await pool.query(
    `UPDATE clients
     SET name = ?, email = ?, phone = ?
     WHERE id = ?`,
    [
      name,
      email,
      phone,
      id
    ]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  const [clients] = await pool.query(
    `SELECT * FROM clients WHERE id = ?`,
    [id]
  );

  return clients[0];
};
const deleteClient = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM clients WHERE id = ?`,
    [id]
  );

  return result.affectedRows > 0;
};
module.exports = {
  createClient,getAllClients,getClientById,updateClient,deleteClient
};