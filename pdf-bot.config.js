var htmlPdf = require('html-pdf-chrome');

// module.exports = {
//   api: {
//     port: 3000,
//     token: 'crazy-secret'
//   },
//   generator: {
//     completionTrigger: new htmlPdf.CompletionTrigger.Timer(15000) // 1 sec timeout
//   },
//   webhook: {
//     secret: '1234',
//     url: 'http://localhost:3000/webhooks/pdf'
//   },
//   "storagePath": "/Users/grigori.savustjan/dev/pdf-service/pdf-storage",
// };
var decaySchedule = [
  1000 * 60, // 1 minute
  1000 * 60 * 3, // 3 minutes
  1000 * 60 * 10, // 10 minutes
  1000 * 60 * 30, // 30 minutes
  1000 * 60 * 60 // 1 hour
];

module.exports = {
  // The settings of the API
  api: {
    // The port your express.js instance listens to requests from. (default: 3000)
    port: 3000,
    // Spawn command when a job has been pushed to the API
    postPushCommand: ['pdf-bot', ['-c', './pdf-bot.config.js', 'shift:all']],
    // The token used to validate requests to your API. Not required, but 100% recommended.
    token: 'api-token'
  },
  // db: LowDB(), // see other drivers under Database
  // html-pdf-chrome
  generator: {
    // Triggers that specify when the PDF should be generated
    completionTrigger: new htmlPdf.CompletionTrigger.Timer(5000), // waits for 1 sec
    // The port to listen for Chrome (default: 9222)
    // port: 9222
  },
  queue: {
    allowedUrls: [
        'internal.visma.com'
    ],
    // How frequent should pdf-bot retry failed generations?
    // (default: 1 min, 3 min, 10 min, 30 min, 60 min)
    generationRetryStrategy: function(job, retries) {
      return decaySchedule[retries - 1] ? decaySchedule[retries - 1] : 0
    },
    // How many times should pdf-bot try to generate a PDF?
    // (default: 5)
    generationMaxTries: 5,
    // How many generations to run at the same time when using shift:all
    parallelism: 4,
    // How frequent should pdf-bot retry failed webhook pings?
    // (default: 1 min, 3 min, 10 min, 30 min, 60 min)
    webhookRetryStrategy: function(job, retries) {
      return decaySchedule[retries - 1] ? decaySchedule[retries - 1] : 0
    },
    // How many times should pdf-bot try to ping a webhook?
    // (default: 5)
    webhookMaxTries: 5
  },
  // storage: {
  //   's3': createS3Config({
  //     bucket: '',
  //     accessKeyId: '',
  //     region: '',
  //     secretAccessKey: ''
  //   })
  // },
  storagePath: "/Users/grigori.savustjan/dev/pdf-service/pdf-storage",
  webhook: {
    // The prefix to add to all pdf-bot headers on the webhook response.
    // I.e. X-PDF-Transaction and X-PDF-Signature. (default: X-PDF-)
    headerNamespace: 'X-PDF-',
    // Extra request options to add to the Webhook ping.
    requestOptions: {

    },
    // The secret used to generate the hmac-sha1 signature hash.
    // !Not required, but should definitely be included!
    secret: '1234',
    // The endpoint to send PDF messages to.
    url: 'http://localhost:3000/webhooks/pdf'
  }
};
