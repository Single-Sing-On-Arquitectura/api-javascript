const express = require('express');
const routers = express.Router();
const DAO = require('../DAO/loginDAO');
const SectionDAO = require('../DAO/sectionDAO');
const bcrypt = require('../util/bcrypt');
const jwt = require('jsonwebtoken')

routers.post('/login', async (req, res)=> {
  const { user, password, app } = req.body
  try {
    const loginDAO = new DAO()
    const account = await loginDAO.checkAccount(user)
    if (account == null) {
      res.status(500).json({mensaje: 'El usuario no es valido'})
    } else {
      const passwordCorrecta = await bcrypt.desencriptar_password(password, account.password);
      if (passwordCorrecta) {
        const token = jwt.sign({user}, 'sso')
        const sectionDAO = new SectionDAO()
        const codeApp = (app && app.length > 0) ? app : '1'
        const section = {
          token,
          login_user: user,
          app: codeApp
        }
        if (!await sectionDAO.existingSection(user, codeApp)) {
          if (await sectionDAO.createSection(section) !== -1) {
            res.status(200).json({
                token
            })
          }
        } else {
          res.status(403).json({mensaje:'Ya existe una sesión activa, debe cerrar sesión en el otro dispositivo'})
        }
      } else {
        res.status(200).json({mensaje:'Verifique su contraseña'})
      }
    }
  } catch (error) {
    res.status(500).json({mensaje: error})
  }
});

routers.post('/register', async (req, res)=> {
  const { user, password, name } = req.body
  try {
    if (user && user.length > 0) {
      if (password && password.length > 0) {
        const loginDAO = new DAO()
        const passwordEncryptada = await bcrypt.encriptrar_password(password)
        const account = {
          user,
          password: passwordEncryptada,
          name
        }
        if (!await loginDAO.existingAccount(user)) {
          if (await loginDAO.createAccount(account) !== -1) {
            res.status(200).json({mensaje:'Cuenta creada correctamente'})
          }
        } else {
          res.status(500).json({mensaje: 'El usuario ya existe'})
        }
      } else {
        res.status(500).json({mensaje: 'Ingrese la contraseña'})
      }
    } else {
      res.status(500).json({mensaje: 'Ingrese el usuario'})
    }
  } catch (error) {
    res.status(500).json({mensaje: error})
  }
});

routers.post('/signoff', async (req, res)=> {
  const { token } = req.body
  try {
    const sectionDAO = new SectionDAO()
    if (token && token.length > 0) {
      if (await sectionDAO.signOff(token) !== -1) {
        res.status(200).json({mensaje:'Se cerro la sesión correctamente'})
      } else {
        res.status(500).json({mensaje:'Ingrese un token valido'})
      }
    } else {
      res.status(500).json({mensaje:'Ingrese un token valido'})
    }
  } catch (error) {
    res.status(500).json({mensaje: error})
  }
});

routers.post('/signoffall', async (req, res)=> {
  const { user, password } = req.body
  try {
    const loginDAO = new DAO()
    const account = await loginDAO.checkAccount(user)
    if (account == null) {
      res.status(500).json({mensaje: 'El usuario no es valido'})
    } else {
      const passwordCorrecta = await bcrypt.desencriptar_password(password, account.password);
      if (passwordCorrecta) {
        const sectionDAO = new SectionDAO()
        if (await sectionDAO.signOffAll(user) != -1) {
          res.status(200).json({mensaje:'Se cerro todas las sesiones correctamente'})
        }
      } else {
        res.status(200).json({mensaje:'Verifique su contraseña'})
      }
    }
  } catch (error) {
    res.status(500).json({mensaje: error})
  }
});

module.exports = routers;