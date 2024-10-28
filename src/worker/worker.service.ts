import { Injectable } from '@nestjs/common';
import { MessageType } from 'src/messages/message-type';
import { MessageDto } from 'src/messages/message.dto';
import { Worker } from 'worker_threads';

@Injectable()
export class WorkerService {
  workers = {};

  async runWorker(type: MessageType): Promise<number[]> {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__dirname + '/worker.js', {
        workerData: { type },
      });

      this.workers[type] = worker;

      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  }

  sendMessage(message: MessageDto): void {
    this.workers[message.type]?.postMessage(message);
  }
}
