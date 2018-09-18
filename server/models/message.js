const mongoose = require("mongoose");
const User = require("./user")

const messageSchema = new mongoose.Schema({
    text: {    
        type: String, 
        required: true, 
        maxLength: 160
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

messageSchema.pre('remove', async function(next){
    // find user 
    try {
        let user = await User.findById(this.userId);
        user.message.remove(this.id);
        await user.save();
        return next();
    } catch(e) {

    }
    // remove id 
    // save user
})

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;