const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs')
const {Schema} = mongoose;

const UsersSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

UsersSchema.methods.encryptPassword = async (password) => {
  const salto = await bcryptjs.genSalt(10);
  const hash = bcryptjs.hash(password, salto);
  return hash;
};

UsersSchema.methods.matchPassword = async function(password){
    return await bcryptjs.compare(password, this.password);
}

module.exports = mongoose.model('User', UsersSchema);