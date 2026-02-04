import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoDirective } from '@jsverse/transloco';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-button',
  standalone: true,
  imports: [CommonModule, TranslocoDirective],
  templateUrl: './chat-button.component.html',
  styleUrls: ['./chat-button.component.css']
})
export class ChatButtonComponent {
  constructor(private chatService: ChatService) {}

  toggleChat(): void {
    this.chatService.toggleChat();
  }
}
