const conexion = require('../util/conexionDb')

const nameTable = 'section';

class SectionDAO {

  async createSection (section) {
    const query = await conexion.query('INSERT INTO ' + nameTable + ' SET ?', [section])
    if (query.affectedRows > 0) {
      return query.insertId;
    }
    return -1
  }

  async existingSection (user, app) {
    return await this.checkSection(user, app) == null ? false : true
  }

  async checkSection (user, app) {
    const query = await conexion.query('SELECT * FROM ' + nameTable + " WHERE login_user='" + user + "' AND state='1' AND app='" + app + "'");
    console.log(query)
    if (query.length > 0) {
      return query[0]
    }
    return null;
  }

  async signOff (token) {
    const query = await conexion.query('UPDATE ' + nameTable + ' SET state=? WHERE token=?', ['0', token])
    console.log(query.affectedRows)
    if (query.affectedRows > 0) {
      return query.insertId;
    }
    return -1
  }

  async signOffAll (user) {
    const query = await conexion.query('UPDATE ' + nameTable + ' SET state=? WHERE login_user=?', ['0', user])
    console.log(query.affectedRows)
    if (query.affectedRows > 0) {
      return query.insertId;
    }
    return -1
  }


}

module.exports = SectionDAO;