const Messages = require('../models/messages');
const Users = require('../models/users');

class messagesController {
    getMessages = async (req, res, next) => {
        try {
            const { from, to } = req.body;

            const messages = await Messages.find({
                users: {
                    $all: [from, to],
                },
            }).sort({ updatedAt: 1 });

            const getUserById=await Users.findById(to)

            const projectedMessages = messages.map((msg) => {
                return {
                    fromSelf: msg.sender.toString() === from,
                    message: msg.message.text,
                    infoReceiver:getUserById
                };
            });
            res.json(projectedMessages);
        } catch (ex) {
            next(ex);
        }
    };

    addMessage = async (req, res, next) => {
        try {
            const { from, to, message } = req.body;
            const data = await Messages.create({
                message: { text: message },
                users: [from, to],
                sender: from,
            });

            if (data) return res.json({ msg: "Message added successfully." });
            else return res.json({ msg: "Failed to add message to the database" });
        } catch (ex) {
            next(ex);
        }
    };
}

module.exports = new messagesController();