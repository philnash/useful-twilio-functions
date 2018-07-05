exports.handler = function(context, event, callback) {

  // Extract environment variables
  const numbers = context.PHONE_NUMBERS.split(',').map(number => number.trim());
  const callerId = context.CALLER_ID || null;
  const ringTone = context.RING_TONE || null;
  const timeout = context.TIMEOUT || 30;
  const finalUrl = context.FINAL_URL || null;

  // Setup the response
  const response = new Twilio.twiml.VoiceResponse();

  if (event.DialCallStatus === 'complete' || event.DialCallStatus === 'answered') {
    // Call was answered and completed
    response.hangup();
  } else if (event.finished === 'true') {
    if (finalUrl) {
      response.redirect(finalUrl);
    } else {
      response.hangup();
    }
  } else {
    const numberToDial = event.nextNumber ? event.nextNumber : numbers[0];
    const currentNumberIndex = numbers.indexOf(numberToDial);
    let url;
    if (currentNumberIndex + 1 === numbers.length) {
      // No more numbers to call after this.
      url = '/hunt?finished=true';
    } else {
      const nextNumber = numbers[currentNumberIndex + 1];
      url = '/hunt?nextNumber=' + encodeURIComponent(nextNumber);
    }

    // Setup opts deleting any null values
    const opts = { callerId, ringTone, timeout, action: url }
    Object.keys(opts).forEach(key => (opts[key] === null) && delete opts[key]);

    // Dial the next recipient using human detection
    const dial = response.dial(opts);
    dial.number({ url: '/humandetect?detection=required' }, numberToDial);
  }
  callback(null, response);
};
