const knex = require('knex')(require('knexfile'));

const {
  MATCHES_TABLE
} = process.env;

const TAG = '[MatchRepository]';
/**
 * @module MatchRepository
 */
class MatchRepository {
  /**
   * @constructor
   */
  constructor() {
    // super(MATCHES_TABLE);
  }

  /**
   * get all matches
   */
  async getAll() {
    let result;
    try {
      result = await knex(MATCHES_TABLE)
          .select();
    } catch (DBError) {
      throw new Error(DBError);
    }
    return result;
  }

  /**
   * inserts data
   * @param {object} data
   */
  async insert(data) {
    try {
      return await knex(MATCHES_TABLE)
          .insert(data);
    } catch (SQLError) {
      throw new Error(SQLError);
    }
  }

  /**
   * delete data
   * @param {object} where
   */
  async delete(where) {
    try {
      return await knex(MATCHES_TABLE)
          .where(where)
          .del()
    } catch (SQLError) {
      throw new Error(SQLError);
    }
  }

  /**
   * delete data
   * @param {integer} id
   * @param {string} team
   */
  async updateScore(id, team) {
    try {
      return await knex(MATCHES_TABLE)
          .where({id})
          .increment(team, 1)
    } catch (SQLError) {
      throw new Error(SQLError);
    }
  }
  

  /**
   * find with conditions
   * @param {object} where
   */
  async findWithCondition(where) {
    try {
      return await knex(MATCHES_TABLE)
          .select()
          .where(where);
    } catch (SQLError) {
      throw new Error(SQLError);
    }
  }
}

module.exports = MatchRepository;
