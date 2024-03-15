const { StatusCodes } = require('http-status-codes');
const {BookingService} = require('../services/index'); 

const { createChannel,publishMessage } = require('../utils/messageQueue');
const { REMINDER_BINDING_KEY } = require('../config/serverConfig');

const bookingService = new BookingService();

class BookingController {

  constructor() {

  }

  async sendMessageToQueue(req,res){
    const channel = await createChannel();
    const data = {message: 'Success'}
    publishMessage(channel,REMINDER_BINDING_KEY, JSON.stringify(data));
    return res.status(200).json({
        message: 'Message sent to queue',
        data: {},
        success: true,
        err: {}
    })
  }

  async create(req, res) {
    try {
      const booking = await bookingService.createBooking(req.body);
      res.status(StatusCodes.OK).json({
        message: "Booking created successfully",
        data: booking,
        success: true,
        err: {},
      });
    } catch (error) {
      console.log("ERROR: ", error);
      return res.status(500).json({
        message: error.message,
        data: {},
        success: false,
        err: error.explanation,
      });
    }
  }

}


module.exports = BookingController;