import { Injectable } from '@nestjs/common';
import { MessageDto } from './message.dto';
import { MessageType } from './message-type';
import { WorkerService } from 'src/worker/worker.service';

@Injectable()
export class MessagesService {
  constructor(private readonly workerService: WorkerService) {
    Object.keys(MessageType).forEach((type) =>
      this.workerService.runWorker(type as MessageType),
    );
  }

  sendMessage(message: MessageDto): void {
    switch (message.type) {
      case MessageType.SMS:
        console.log('SMS message received!');
        break;
      case MessageType.VIBER:
        console.log('Viber message received!');
        break;
      case MessageType.WHATSAPP:
        console.log('WHATSAPP message received!');
        break;
    }
    this.workerService.sendMessage(message);
  }
}
