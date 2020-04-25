const axios = require('axios');

class IAuthManager {
  /**
   * valide les logs d'un utilisateur
   * @param {string} username username de l'utilisateur
   * @param {string} password password de l'utilisateur
   * @return {bool} Boolean
   */
  validateCredentials(username, password) {
    return true;
  }
}

class AcceptAuthManager extends IAuthManager {
  /**
   * valide les logs d'un utilisateur
   * @param {string} username username de l'utilisateur
   * @param {string} password password de l'utilisateur
   * @return {bool} Boolean
   */
  validateCredentials(username, password) {
    return true;
  }
}

class DenyAuthManager extends IAuthManager {
  /**
   * valide les logs d'un utilisateur
   * @param {string} username username de l'utilisateur
   * @param {string} password password de l'utilisateur
   * @return {bool} Boolean
   */
  validateCredentials(username, password) {
    return false;
  }
}

// +implementation avec credentiels hardcoded
// -hardcoded
class HardcodedAuthManager extends IAuthManager {
  constructor() {
    super();
    this.userRecords = [
      { username: 'Nenu', password: '123' },
      { username: 'Saeth', password: '456' },
    ];
  }

  /**
   * valide les logs d'un utilisateur
   * @param {string} username username de l'utilisateur
   * @param {string} password password de l'utilisateur
   * @return {bool} Boolean
   */
  validateCredentials(username, password) {
    return (
      this.userRecords.filter(
        (user) => user.username === username && user.password === password
      ).length > 0
    );
  }
}

// +implementation avec fichier local de database
// -implementation avec fichier local

// +implementation avec API REST
// -rest
class RestAPIAuthManager extends IAuthManager {
  constructor() {
    super();
  }
  /**
   * valide les logs d'un utilisateur
   * @param {string} username username de l'utilisateur
   * @param {string} password password de l'utilisateur
   * @return {bool} Boolean
   */
  async validateCredentials(username, password) {
    const userRecords = await this._getJson('http://zhln.eu:8000/users.json'); // ca ?

    return (
      userRecords.filter(
        (user) => user.username === username && user.password === password
      ).length > 0
    );
  }

  async _getJson(url) {
    const usersJSON = await axios.get(url);
    console.log(usersJSON.data);
    return usersJSON.data;
  }
}

function test_restAuthMan() {
  const a = new RestAPIAuthManager();
  return a._getJson('http://zhln.eu:8000/users.json');
}

// fonction FACTORY qui permet de choisir l'implementation et de l'instancier
function authManFactory(authMode) {
  // string -> IAuthManager
  switch (authMode) {
    case 'hardcoded':
      return new HardcodedAuthManager();
      break;
    case 'rest':
      return new RestAPIAuthManager();
      break;
    default:
      throw new Error('specify a mode, fdp');
      break;
  }
}

module.exports = authManFactory;

// module.exports = new RestAPIAuthManager();
