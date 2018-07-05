# Hunt / Find Me with Human Detection

The first Function "hunt" takes an array of numbers and will return the TwiML required to dial each number in order until one answers. This is an initial implementation of the ["Find Me" Twimlet](https://www.twilio.com/labs/twimlets/findme).

The second Function "humandetect" is called by the first Function and prompts the recipient of the call to press any key to accept the call to ensure the call is received by a human and not an answering machine.  Thanks to Alan Klein at Twilio support for help with this flow.

## Environment variables

This Function expects one environment variable to be set.

| Variable          | Meaning | Required |
| :---------------- | :------ | :------- |
| `PHONE_NUMBERS` | A comma separated list of numbers [in E.164 format](https://support.twilio.com/hc/en-us/articles/223183008-Formatting-International-Phone-Numbers) that you want to dial in order | Yes |
| `CALLER_ID` | A valid phone number to present as the caller | No |
| `RING_TONE` | A country code for the ring tone [in ISO 3166-1 alpha-2 format](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) | No |
| `TIMEOUT` | Duration in seconds that should wait when calling a number before giving up | No |
| `FINAL_URL` | A URL to redirect the call to if none of the numbers answer. If this is not supplied then the call will just hang up once it has exhausted all the options | No |


## Parameters

This Function expects the incoming request to be a voice webhook. The parameters that will be used are `DialCallStatus` and  custom parameters, `nextNumber` and `detection` that the function itself provides.
