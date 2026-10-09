const pool = require("../config/database");

const getAllTasks = async () => {
  const [rows] = await pool.query(`
    SELECT
      id,
      engagement_id,
      task_template_id,
      title,
      description,
      assigned_to,
      due_date,
      status,
      created_at,
      updated_at
    FROM tasks
    ORDER BY created_at DESC
  `);

  return rows;
};

const getTaskById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT
      id,
      engagement_id,
      task_template_id,
      title,
      description,
      assigned_to,
      due_date,
      status,
      created_at,
      updated_at
    FROM tasks
    WHERE id = ?
    `,
    [id]
  );

  return rows[0] || null;
};

const createTask = async ({
  engagement_id,
  task_template_id,
  title,
  description,
  assigned_to,
  due_date
}) => {
  const [result] = await pool.query(
    `
    INSERT INTO tasks
    (
      engagement_id,
      task_template_id,
      title,
      description,
      assigned_to,
      due_date
    )
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      engagement_id,
      task_template_id,
      title,
      description || null,
      assigned_to || null,
      due_date || null
    ]
  );

  return getTaskById(result.insertId);
};

const updateTask = async (
  id,
  {
    title,
    description,
    assigned_to,
    due_date
  }
) => {
  const [result] = await pool.query(
    `
    UPDATE tasks
    SET
      title = ?,
      description = ?,
      assigned_to = ?,
      due_date = ?
    WHERE id = ?
    `,
    [
      title,
      description || null,
      assigned_to || null,
      due_date || null,
      id
    ]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return getTaskById(id);
};

const deleteTask = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM tasks WHERE id = ?",
    [id]
  );

  return result.affectedRows > 0;
};
const assignTask = async (taskId, userId) => {
  const [result] = await pool.query(
    `
    UPDATE tasks
    SET assigned_to = ?
    WHERE id = ?
    `,
    [userId, taskId]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return getTaskById(taskId);
};
module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  assignTask
};