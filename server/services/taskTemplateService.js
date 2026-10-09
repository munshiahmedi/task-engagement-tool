const pool = require("../config/database");

const createTaskTemplate = async (templateData) => {
  const {
    service_type_id,
    title,
    description
  } = templateData;

  const [result] = await pool.query(
    `INSERT INTO task_templates
     (service_type_id, title, description)
     VALUES (?, ?, ?)`,
    [
      service_type_id,
      title,
      description
    ]
  );

  const [templates] = await pool.query(
    `SELECT * FROM task_templates WHERE id = ?`,
    [result.insertId]
  );

  return templates[0];
};
const getAllTaskTemplates = async () => {
  const [templates] = await pool.query(
    `SELECT * FROM task_templates
     ORDER BY created_at DESC`
  );

  return templates;
};

const getTaskTemplateById = async (id) => {
  const [templates] = await pool.query(
    `SELECT * FROM task_templates
     WHERE id = ?`,
    [id]
  );

  return templates[0];
};
const updateTaskTemplate = async (id, templateData) => {
  const {
    service_type_id,
    title,
    description
  } = templateData;

  const [result] = await pool.query(
    `UPDATE task_templates
     SET service_type_id = ?, title = ?, description = ?
     WHERE id = ?`,
    [
      service_type_id,
      title,
      description,
      id
    ]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  const [templates] = await pool.query(
    `SELECT * FROM task_templates WHERE id = ?`,
    [id]
  );

  return templates[0];
};
const deleteTaskTemplate = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM task_templates
     WHERE id = ?`,
    [id]
  );

  return result.affectedRows > 0;
};
module.exports = {
  createTaskTemplate,getAllTaskTemplates,getTaskTemplateById,updateTaskTemplate,deleteTaskTemplate
};