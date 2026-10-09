const pool = require("../config/database");

const createServiceType = async (serviceData) => {
  const {
    name,
    description,
    is_recurring
  } = serviceData;

  const [result] = await pool.query(
    `INSERT INTO service_types
     (name, description, is_recurring)
     VALUES (?, ?, ?)`,
    [
      name,
      description,
      is_recurring
    ]
  );

  const [serviceTypes] = await pool.query(
    `SELECT * FROM service_types WHERE id = ?`,
    [result.insertId]
  );

  return serviceTypes[0];
};
const getAllServiceTypes = async () => {
  const [serviceTypes] = await pool.query(
    `SELECT * FROM service_types
     ORDER BY created_at DESC`
  );

  return serviceTypes;
};

const getServiceTypeById = async (id) => {
  const [serviceTypes] = await pool.query(
    `SELECT * FROM service_types
     WHERE id = ?`,
    [id]
  );

  return serviceTypes[0];
};
const updateServiceType = async (id, serviceData) => {
  const {
    name,
    description,
    is_recurring
  } = serviceData;

  const [result] = await pool.query(
    `UPDATE service_types
     SET name = ?, description = ?, is_recurring = ?
     WHERE id = ?`,
    [
      name,
      description,
      is_recurring,
      id
    ]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  const [serviceTypes] = await pool.query(
    `SELECT * FROM service_types WHERE id = ?`,
    [id]
  );

  return serviceTypes[0];
};
const deleteServiceType = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM service_types WHERE id = ?`,
    [id]
  );

  return result.affectedRows > 0;
};
module.exports = {
  createServiceType,getAllServiceTypes,getServiceTypeById,updateServiceType,deleteServiceType
};