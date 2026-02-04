import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Interface based on the API response model
interface RetrieveQuestionnaire {
  id: number;
  date: string;
  content: Record<string, any>;
}

interface SavingQuestionnnaire {
  status: string;
  message: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslocoDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {
  @Input() questionnaireForm!: FormGroup;

  @Input() mandatoryQuestions!: string[];

  @Output() resetQuestionnaire: EventEmitter<any> = new EventEmitter();
  @Output() questionnaireRetrieved = new EventEmitter<any>();

  @ViewChild('retrieveConfirmationModal') modalEl!: ElementRef;


  showPassword: boolean = false;
  questionnaires: RetrieveQuestionnaire[] = [];
  showSelectQuestionnaireModal = false;
  saveStatus: 'success' | 'error' | null = null;

  mandatoryQuestionsUnanswered: number[] = [];

  registerForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    role: new FormControl(''),
    company: new FormControl(''),
    pilotArea: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    privacyPolicy: new FormControl('', Validators.requiredTrue),
  });

  private subscription!: Subscription;

  constructor(
    private router: Router,
    private http: HttpClient,
    private translocoService: TranslocoService
  ) { }

  ngOnInit(): void {
    // Retrieve the register form data if any
    const register = localStorage.getItem("register");
    if (register) {
      try {
        this.registerForm.setValue(JSON.parse(register));
      } catch (e) {
        this.registerForm.reset();
      }
    }

    // Save the register form data as it changes
    this.subscription = this.registerForm.valueChanges.subscribe(value =>
      localStorage.setItem("register", JSON.stringify(value))
    );
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.mandatoryQuestionsUnanswered = Object.entries(this.questionnaireForm.value).map(
      ([k, _], index) => this.mandatoryQuestions.includes(k) && !this.questionnaireForm.get(k)?.dirty ? index + 1 : null).filter(Boolean) as number[];

    if (this.mandatoryQuestionsUnanswered.length == 0) {
    // Evaluate only the questions which are mandatory or have been answered
    const questionsToEvaluate = Object.fromEntries(Object.entries(this.questionnaireForm.value).filter(
      ([k, _]: [string, any]) => this.mandatoryQuestions.includes(k) || this.questionnaireForm.get(k)?.dirty
    ));
    const headers = { 'Content-Type': 'application/json' };
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;

    // Post questionsToEvaluate to the API
    this.http.post('https://innwater.eurecatprojects.com/assistant/api/questionnaire/questionnaire', {
      msg: questionsToEvaluate,
      email: email,
      password: password
    }, { headers })
      .subscribe({
        next: (response) => {
          console.log('Questions posted successfully', response);
          // Navigate to results page after successful API call
          // Get the current language to preserve it in the URL
          const currentLang = this.translocoService.getActiveLang();
          this.router.navigateByUrl(`/results?lang=${currentLang}`, { state: { questionnaireFormValue: questionsToEvaluate } });
        },
        error: (error) => {
          console.error('Error posting questions to API', error);
          // You might want to handle the error appropriately here
        }
      });
    }
  }

  onSave() {
    // Reset previous status
    this.saveStatus = null;

    // Evaluate only the questions which are mandatory or have been answered
    const questionsToEvaluate = Object.fromEntries(Object.entries(this.questionnaireForm.value).filter(
      ([k, _]: [string, any]) => this.mandatoryQuestions.includes(k) || this.questionnaireForm.get(k)?.dirty
    ));
    const headers = { 'Content-Type': 'application/json' };
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;

    // Post questionsToEvaluate to the API
    this.http.post<SavingQuestionnnaire>('https://innwater.eurecatprojects.com/assistant/api/questionnaire/questionnaire', {
      msg: questionsToEvaluate,
      email: email,
      password: password
    }, { headers })
      .subscribe({
        next: (response) => {
          console.log('Questions posted successfully', response);
          // Set success status
          this.saveStatus = 'success';
          // Clear status after 5 seconds
          setTimeout(() => {
            this.saveStatus = null;
          }, 5000);
        },
        error: (error) => {
          console.error('Error posting questions to API', error);
          // Set error status
          this.saveStatus = 'error';
          // Clear status after 5 seconds
          setTimeout(() => {
            this.saveStatus = null;
          }, 5000);
        }
      });
  }

  printQuestionnaire() {
    window.print();
  }

  fetchQuestionnaires(): void {
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;

    if (!email || !password) {
      alert(this.translocoService.translate('register.email_password_required') || 'Email and password are required');
      return;
    }

    // Using GET to retrieve all questionnaires for the user
    this.http.post<RetrieveQuestionnaire[]>('https://innwater.eurecatprojects.com/assistant/api/questionnaire/questionnaire/retrieve', {
        email: email,
        password: password
    }).subscribe({
      next: (response: RetrieveQuestionnaire[]) => {
        this.questionnaires = response;
      },
      error: (error) => {
        console.error('Error retrieving questionnaires', error);
        alert(this.translocoService.translate('register.retrieve_error') || 'Failed to retrieve your questionnaires. Please check your credentials.');
      }
    });
  }

  retrieveQuestionnaire(): void {
    // This method is kept for backward compatibility
    // Now it just calls fetchQuestionnaires
    this.fetchQuestionnaires();
  }

  populateFormWithQuestionnaire(questionnaire: RetrieveQuestionnaire): void {
    if (questionnaire && questionnaire.content) {
      // First, emit the questionnaire content to be handled by the parent component
      // which will populate the questionnaire form
      this.questionnaireRetrieved.emit(questionnaire.content);

      // If there's user data in the content that matches register form fields, populate them
      const content = questionnaire.content;

      // Populate the register form fields if they exist in the content
      Object.keys(this.registerForm.controls).forEach(key => {
        if (content[key] !== undefined) {
          this.registerForm.get(key)?.setValue(content[key]);
        }
      });
    }
  }

  ngAfterViewInit() {
    const modalElement = this.modalEl.nativeElement;
    modalElement.addEventListener('shown.bs.modal', () => {
      this.fetchQuestionnaires();
    });
  }


  deleteQuestionnaire(index: number): void {
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    const order_id = index + 1; // The order_id is i+1 as specified in the requirements

    if (!email || !password) {
      alert(this.translocoService.translate('register.email_password_required') || 'Email and password are required');
      return;
    }

    const headers = { 'Content-Type': 'application/json' };

    // Call the delete API endpoint
    this.http.post('https://innwater.eurecatprojects.com/assistant/api/questionnaire/questionnaire/delete', {
      order_id: order_id,
      email: email,
      password: password
    }, { headers })
      .subscribe({
        next: (response) => {
          console.log('Questionnaire deleted successfully', response);
          // Refresh the list of questionnaires
          this.fetchQuestionnaires();
        },
        error: (error) => {
          console.error('Error deleting questionnaire', error);
          alert(this.translocoService.translate('register.delete_error') || 'Failed to delete the questionnaire. Please try again.');
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
