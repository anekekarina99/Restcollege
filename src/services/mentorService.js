const db = require('../database');

const findMentor = async ({ name, email, expertise }) => {
  const query = `
    SELECT * FROM mentors
    WHERE (name ILIKE $1 OR email ILIKE $1)
      AND expertise ILIKE $2
  `;
  const values = ['%' + name + '%', '%' + expertise + '%'];

  try {
    const mentors = await db.query(query, values);
    return mentors.rows;
  } catch (error) {
    throw new Error('Failed to find mentors: ' + error.message);
  }
};

const createMentor = async ({ name, email, expertise, password }) => {
    const query = `
      INSERT INTO mentors (name, email, expertise, password)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [name, email, expertise, password];
  
    try {
      const mentor = await db.query(query, values);
      return mentor.rows[0];
    } catch (error) {
      throw new Error('Failed to create mentor: ' + error.message);
    }
  };

module.exports = {
  findMentor,
  createMentor
};
