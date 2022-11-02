const bcrypt = {};
const bcryptjs = require('bcryptjs');

bcrypt.encriptrar_password = async (password) =>{
const salt = await bcryptjs.genSalt(10);
const password_cifrado = await bcryptjs.hash(password, salt);
return password_cifrado;
};

bcrypt.desencriptar_password = async (password, password_guardado) =>{
  try {
    return await bcryptjs.compare(password, password_guardado);
  } catch (error) {
      console.log(error);
  }
}

module.exports= bcrypt;