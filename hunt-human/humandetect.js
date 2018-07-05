exports.handler = function(context, event, callback) {

  const response = new Twilio.twiml.VoiceResponse();

  // URL to this Function
  let url = '/humandetect';
  if (event.detection === 'required') {
    response.gather({ timeout: 5, numDigits: 1, action: url })
    .say('Press any key to accept the incoming call');
    response.hangup();
  }
  callback(null, response);
};
