const conexion = require('../util/conexionDb')

const nameTable = 'login';

class LoginDAO {

  async createAccount (account) {
    const query = await conexion.query('INSERT INTO ' + nameTable + ' SET ?', [account])
    if (query.affectedRows > 0) {
      return query.insertId;
    }
    return -1
  }

  async existingAccount (user) {
    return await this.checkAccount(user) == null ? false : true
  }

  async checkAccount (user) {
    const query = await conexion.query('SELECT * FROM ' + nameTable + " WHERE user='" + user + "'");
    if (query.length > 0) {
      return query[0]
    }
    return null;
  }

}

module.exports = LoginDAO;