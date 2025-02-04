const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const usuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Validação de email
    },
    telefone: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    dataCadastro: { type: Date, default: Date.now }, // Campo adicional
});

usuarioSchema.plugin(uniqueValidator);

// Criptografa a senha antes de salvar
usuarioSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) return next();
    this.senha = await bcrypt.hash(this.senha, 10);
    next();
});

// Método para validar senha
usuarioSchema.methods.validarSenha = async function (senha) {
    return await bcrypt.compare(senha, this.senha);
};

// Método para gerar token JWT
usuarioSchema.methods.gerarToken = function () {
    return jwt.sign(
        { id: this._id, email: this.email },
        process.env.JWT_SECRET || 'chave-secreta',
        { expiresIn: '1h' }
    );
};

module.exports = mongoose.model('Usuario', usuarioSchema);