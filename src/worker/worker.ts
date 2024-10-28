import { MessageDto } from 'src/messages/message.dto';
import { workerData, parentPort } from 'worker_threads';

const messages = [];

console.log('Worker is working on ' + workerData.type);
parentPort.on('message', (message: MessageDto) => {
  const shouldStartMessaging = !messages.length;
  messages.push(message);

  if (shouldStartMessaging) {
    sendMessages();
  }
});

function sendMessages() {
  if (messages.length == 0) {
    return;
  }

  setTimeout(() => {
    const message = messages.shift();
    console.log(
      `Successfully sent ${message.type} message with text ${message.text}`,
    );
    sendMessages();
  }, 2000); // Long CPU task
}
