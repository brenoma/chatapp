const mongoose = require('mongoose')
const User = mongoose.model('User')
const sha256 = require('js-sha256')
const jwt = require('jwt-then')

exports.register = async (req, res) => {
    const {name, email, password} = req.body;

    /*
    //  Padrão email oficial RFC 2822
    //  Documentação: https://datatracker.ietf.org/doc/html/rfc2822#section-3.4.1 
    */

    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/

    if (!emailRegex.test(email)) throw 'Email inválido'
    if (!passwordRegex.test(password)) throw 'Sua senha deve ter no mínimo 6 digitos, uma letra maíuscula e uma minúscula'

    const userExists = await User.findOne({ 
        email
    })

    if (userExists) throw 'Usuário com o mesmo email já cadastrado'

    const user = new User({
        name,
        email,
        password: sha256(password + process.env.ENCRYPT)
    })

    await user.save();

    res.json({
        message: 'Usuário: ' + name + ' cadastrado com sucesso'
    })
}

exports.login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({
        email,
        password: sha256(password + process.env.ENCRYPT)
    })

    if (!user) throw 'Email e/ou senhas estão incorretos'

    const token = await jwt.sign({id: user.id}, process.env.SECRET)

    res.json({
        message: 'Bem vindo, ' + user.name,
        token,
    })
}