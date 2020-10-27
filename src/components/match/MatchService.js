require('app-module-path').addPath(require('app-root-path').toString());
require('dotenv').config();

const {
  MATCHES_TABLE,
} = process.env;

const TAG = '[MatchService]';

/**
 * @module MatchService
 */
class MatchService {
  /**
   * @constructor
   */
  constructor({MatchRepository}) {
    this._matchRepository = MatchRepository;
  }

  /**
   * get all matches in db
   */
  async getAllMatches() {
    const METHOD = '[getAllMatches]';
    console.log(`${TAG} ${METHOD}`);
    // get all matches
    const matches = await this._matchRepository.getAll();
    return matches;
  }

  /**
   * create new match
   * @param {string} set_number - number of set
   */
  async createMatch(set_number) {
    const METHOD = '[createMatch]';
    console.log(`${TAG} ${METHOD}`);
    // compose data to be added
    const data = {
      set_number
    };
    try {
      const match = await this._matchRepository.insert(data);
      return {
        "success": true,
        "message": `Match created with id ${match}`,
      };
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * create new match
   * @param {string} id - id of match
   * @param {string} team - what team to increase score
   */
  async updateScore(id, team) {
    const METHOD = '[updateScore]';
    console.log(`${TAG} ${METHOD}`);
    try {
      if(await this._verifyMatch(id, team)) {
        const match = await this._matchRepository.updateScore(id, team);
        return {
          "success": true,
          "message": `Match with id ${match} is updated.`,
        };
      } else {
        return {
          "success": false,
          "message": `Match is not valid`,
        };
      }
    } catch (e) {
      console.log(e);
    }
  }
  /**
   * create new match
   * @param {string} id - id of match
   */
  async deleteMatch(id) {
    const METHOD = '[deleteMatch]';
    console.log(`${TAG} ${METHOD}`);
    if (await this._verifyMatch(id)) {
      try {
        const match = await this._matchRepository.delete({id});
        return {
          success: true,
          message: "deleted"
        };
      } catch (e) {
        console.log(e);
      }
    } else {
      return {
        success: false,
        message: "no match with that id"
      };
    }
  }

  async _verifyMatch(id, team = null) {
    try {
      const match = await this._matchRepository.findWithCondition({id});
      if (match.length > 0) {
        if(team !== null) {
          if(match.team_one === 21 || match.team_two === 21){
            return false;
          } else {
            switch (team) {
              case 'team_one':
                if((match.team_one + 1) === 21) {
                  this.createMatch(match.set_number++)
                }
                break;
              case 'team_two':
                if((match.team_two + 1) === 21) {
                  this.createMatch(match.set_number++)
                }
                break;
              default:
                break;
            }
            return true;
          }
        }
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

}

module.exports = MatchService;
