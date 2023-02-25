const catchAsync = require("./../../utils/catchAsync");
const Message = require("./../../models/Chat/messageModel");
const User = require("./../../models/userModel");
const Chat = require("./../../models/Chat/chatModel");

exports.sendMessage = catchAsync(async (req, res, next) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };
  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    res.status(201).json(message);
  } catch (err) {
    console.log(err);
    // res.status(400);
    return next(new AppError(err.message, 400));
    //  new Error(err.message);
  }
});

exports.getAllMessage = catchAsync(async (req, res, next) => {
  try {
    const message = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(message);
  } catch (error) {
    console.log(error);
    // res.status(400);
    // throw new Error(err.message);
    return next(new AppError(error.message, 400));
  }
});