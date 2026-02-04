import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {TranslocoService} from "@jsverse/transloco";
import {HttpClient} from '@angular/common/http';
import {catchError, finalize} from 'rxjs/operators';
import {ActivatedRoute} from "@angular/router";
import {CookieService} from "./cookie.service";

export interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'system' | 'helper';
  context: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messages = new BehaviorSubject<ChatMessage[]>([]);
  private isOpen = new BehaviorSubject<boolean>(false);
  private isLoading = new BehaviorSubject<boolean>(false);
  activeLang: string;
  availableLangs = ['en', 'es', 'it', 'hu', 'ca', 'fr'];
  constructor(
    private translocoService: TranslocoService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private cookieService: CookieService,
  ) {

    const queryLang = this.route.snapshot.queryParamMap.get('lang');

    if (queryLang && this.availableLangs.includes(queryLang)) {
      // If language is specified in URL and valid, use it
      this.activeLang = queryLang;
      this.translocoService.setActiveLang(queryLang);
      // Update cookie to match URL parameter
      this.cookieService.setCookie('lang', queryLang);
    } else {
      // If no language in URL, check cookie or use service default
      const cookieLang = this.cookieService.getCookie('lang');
      if (cookieLang && this.availableLangs.includes(cookieLang)) {
        this.activeLang = cookieLang;
        this.translocoService.setActiveLang(cookieLang);
      } else {
        this.activeLang = this.translocoService.getActiveLang();
      }
    }
    // Initialize with a welcome message
    console.log(this.translocoService.translate('chat.welcome_message', {}, this.activeLang))
    this.addMessage({
      text: this.translocoService.translate('chat.welcome_message', {}, this.activeLang) || 'Welcome to the chat! How can I help you with the water governance assessment?',
      sender: 'system'
    });
  }

  getMessages(): Observable<ChatMessage[]> {
    return this.messages.asObservable();
  }

  getLoadingState(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  getChatOpenState(): Observable<boolean> {
    return this.isOpen.asObservable();
  }

  toggleChat(): void {
    this.isOpen.next(!this.isOpen.value);
  }

  openChat(): void {

    this.isOpen.next(true);
  }

  closeChat(): void {
    this.isOpen.next(false);
  }

  openChatWithContext(context: any): void {
    this.openChat();
    const text = JSON.stringify(context, null, 2);
    const currentMessages = this.messages.value;
    const newMessage: ChatMessage = {
      id: currentMessages.length > 0 ? Math.max(...currentMessages.map(m => m.id)) + 1 : 1,
      text: this.translocoService.translate('chat.help_question', {}, this.activeLang) + ' ' + context.question,
      sender: 'helper',
      context: text,
      timestamp: new Date()
    };
    this.messages.next([...currentMessages, newMessage]);
    this.askLanguageModel();
  }

  addMessage(message: Omit<ChatMessage, 'id' | 'timestamp' | 'context'>): void {
    const currentMessages = this.messages.value;
    const newMessage: ChatMessage = {
      id: currentMessages.length > 0 ? Math.max(...currentMessages.map(m => m.id)) + 1 : 1,
      text: message.text,
      sender: message.sender,
      context: '',
      timestamp: new Date()
    };

    this.messages.next([...currentMessages, newMessage]);
  }

  sendMessage(text: string): void {
    if (!text.trim()) return;

    // Add user message
    this.addMessage({
      text,
      sender: 'user'
    });

    // Prepare current messages for API
    this.askLanguageModel();
  }

  private askLanguageModel() {
    let messagesForApi = [{
      role: 'system',
      content: this.translocoService.translate('chat.system_message') || "When answering a query, please, be brief. Answer the query with 3 lines if you can. This is a chat, so there is not much space."
    }].concat(this.messages.value.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.sender === 'helper' ? msg.context : msg.text
    })));


    // Show loading indicator
    this.isLoading.next(true);

    // Call the external API similar to your Python code
    this.http.post('https://innwater.eurecatprojects.com/assistant/api/query/water_tool', {
      messages: messagesForApi
    }, {responseType: 'text'}).pipe(
      catchError(error => {
        // Handle errors
        this.addMessage({
          text: 'Sorry, there was an error processing your request. Please try again later.',
          sender: 'system'
        });
        throw error;
      }),
      finalize(() => {
        this.isLoading.next(false);
      })
    ).subscribe(response => {
      // Add API response to chat
      this.addMessage({
        text: response,
        sender: 'system'
      });
    });
  }

  clearChat(): void {
    this.messages.next([]);
    // Add welcome message again
    this.addMessage({
      text: this.translocoService.translate('chat.welcome_message') || 'Welcome to the chat! How can I help you with the water governance assessment?',
      sender: 'system'
    });
  }
}
