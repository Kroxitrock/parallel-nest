import { Body, Controller, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageDto } from './message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  sendMessage(@Body() message: MessageDto): void {
    this.messagesService.sendMessage(message);
  }
}
