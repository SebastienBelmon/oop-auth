const axios = require('axios');

/**
 * Interface : c'est le "blueprint" de notre classe AuthManager
 * Chaque implémentation devra avoir au moins les mêmes méthodes
 * de IAuthManager.
 * 
 * On met "I" devant le nom de classe par convention pour dire que c'est
 * une interface.
 */
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

/**
 * Première implémentation de l'interface, qui accepte systématiquement
 * les identifiants de connexions.
 * 
 * Chaque implémentation ne sera pas forcément dévoiler au client. (voir 
 * fonction authManFactory(authMode)).
 */
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


/**
 * Implémentation qui refuse systématiquement les identifiants de connexions.
 */
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
// -hardcoded

// +implementation avec API REST
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
// -rest

/**
 * fonction de test, uniquement comme moyen de debug pendant le développement.
 * On le laisse comme historique, mais ne sert à rien dans l'example.
 */
function test_restAuthMan() {
  const a = new RestAPIAuthManager();
  return a._getJson('http://zhln.eu:8000/users.json');
}

/**
 * fonction FACTORY qui permet de choisir l'implementation et de l'instancier.
 * Il y a plusieurs méthode pour faire ça. Ici, le client devra utiliser la
 * classe AuthManager de cette façon:
 * const AuthManager = require('./authman')('nom du mode d'auth');
 */ 
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

//? si on voulait dévoiler uniquement le mode REST API
// module.exports = new RestAPIAuthManager();
