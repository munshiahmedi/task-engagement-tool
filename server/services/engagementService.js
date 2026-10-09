const pool = require("../config/database");

const createEngagement = async (engagementData) => {
  const {
    client_id,
    service_type_id,
    period_start,
    period_end,
    created_by
  } = engagementData;

  const [result] = await pool.query(
    `INSERT INTO engagements
     (client_id, service_type_id, period_start, period_end, created_by)
     VALUES (?, ?, ?, ?, ?)`,
    [
      client_id,
      service_type_id,
      period_start,
      period_end,
      created_by
    ]
  );

  const [engagements] = await pool.query(
    `SELECT * FROM engagements
     WHERE id = ?`,
    [result.insertId]
  );

  return engagements[0];
};
const checkClientExists = async (clientId) => {
  const [clients] = await pool.query(
    `SELECT id FROM clients WHERE id = ?`,
    [clientId]
  );

  return clients.length > 0;
};

const checkServiceTypeExists = async (serviceTypeId) => {
  const [services] = await pool.query(
    `SELECT id FROM service_types WHERE id = ?`,
    [serviceTypeId]
  );

  return services.length > 0;
};
const getAllEngagements = async () => {
  const [engagements] = await pool.query(
    `SELECT * FROM engagements
     ORDER BY created_at DESC`
  );

  return engagements;
};

const getEngagementById = async (id) => {
  const [engagements] = await pool.query(
    `SELECT * FROM engagements
     WHERE id = ?`,
    [id]
  );

  return engagements[0];
};
const updateEngagement = async (id, engagementData) => {
  const {
    client_id,
    service_type_id,
    period_start,
    period_end
  } = engagementData;

  const [result] = await pool.query(
    `UPDATE engagements
     SET client_id = ?,
         service_type_id = ?,
         period_start = ?,
         period_end = ?
     WHERE id = ?`,
    [
      client_id,
      service_type_id,
      period_start,
      period_end,
      id
    ]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  const [engagements] = await pool.query(
    `SELECT * FROM engagements
     WHERE id = ?`,
    [id]
  );

  return engagements[0];
};
const deleteEngagement = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM engagements
     WHERE id = ?`,
    [id]
  );

  return result.affectedRows > 0;
};
module.exports = {
  createEngagement,
  checkClientExists,
  checkServiceTypeExists,
  getAllEngagements,
  getEngagementById,updateEngagement,deleteEngagement
};