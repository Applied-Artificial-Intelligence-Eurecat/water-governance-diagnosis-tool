
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { Select2Module } from 'ng-select2-component';
import { Subject, takeUntil } from 'rxjs';
import { institutionGovernanceLevels } from "../model/governance-levels";
import { institutionRoles, rboRoles } from "../model/roles";
import { RegisterComponent } from "../register/register.component";
import { ChatButtonComponent } from "../components/chat-button/chat-button.component";
import { ChatComponent } from "../components/chat/chat.component";
import { ChatService } from '../services/chat.service';
import {ActivatedRoute} from "@angular/router";
import {CookieService} from "../services/cookie.service";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Select2Module, TranslocoDirective, RegisterComponent, ChatButtonComponent, ChatComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  activeLang: string;
  availableLangs = ['en', 'es', 'it', 'hu', 'ca', 'fr'];

  constructor(
    private chatService: ChatService,
    private translocoService: TranslocoService,
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

  }

  openChatWithQuestion(questionKey: string) {
    const question = this.translocoService.translate(questionKey, {}, this.activeLang);
    const statement = this.translocoService.translate(questionKey + '_statement', {}, this.activeLang);
    const content = this.form.get(questionKey)?.value;
    const metaQuestion = this.translocoService.translate('chat.meta_question_base', {}, this.activeLang);

    const context = {
      question: question,
      statement: statement,
      content: content,
      meta_question: metaQuestion
    };

    this.chatService.openChatWithContext(context);
  }

  formInit() {
    this.form = new FormGroup({
      question1: new FormGroup({
        table1: new FormArray([
          new FormGroup({
            institutionName: new FormControl(''),
            role: new FormControl([]),
            governanceLevel: new FormControl([])
          })
        ]),
        table2: new FormArray([
          new FormGroup({
            institutionName: new FormControl(''),
            role: new FormControl([]),
            governanceLevel: new FormControl([])
          })
        ]),
      }),
      question2: new FormArray([
        new FormGroup({
          rbo: new FormControl(''),
          subnational: new FormControl(''),
          role: new FormControl([]),
          roleInfo: new FormControl(''),
          functions: new FormControl(''),
          functionsInfo: new FormControl(''),
          radios: new FormGroup({
            adequateStaffing: new FormControl(''),
            adequateBudget: new FormControl('')
          })
        })
      ]),
      question3: new FormGroup({
        radios: new FormGroup({
          financing1: new FormControl(''),
          financing2: new FormControl(''),
          financing3: new FormControl('')
        }),
        financing4: new FormArray([
          new FormControl('')
        ])
      }),
      question4: new FormGroup({
        radios: new FormGroup({
          laws1: new FormControl(''),
          laws2: new FormControl('')
        })
      }),
      question5: new FormGroup({
        radios: new FormGroup({
          policy1: new FormControl(''),
          policy1_followup: new FormGroup({
            implemented: new FormControl(''),
            funded: new FormControl(''),
            monitored: new FormControl('')
          }),
          policy2: new FormControl(''),
          policy2_followup: new FormGroup({
            implemented: new FormControl(''),
            funded: new FormControl(''),
            monitored: new FormControl('')
          })
        })
      }),
      question6: new FormGroup({
        checkboxes: new FormGroup({
          channel1: new FormGroup({
            checkbox: new FormControl(false),
            info: new FormControl('')
          }),
          channel2: new FormGroup({
            checkbox: new FormControl(false),
            info: new FormControl('')
          }),
          channel3: new FormGroup({
            checkbox: new FormControl(false),
            info: new FormControl('')
          }),
          channel4: new FormGroup({
            checkbox: new FormControl(false),
            info: new FormControl('')
          }),
          channel5: new FormGroup({
            checkbox: new FormControl(false),
            info: new FormControl('')
          })
        }),
        channel6: new FormArray([
          new FormControl('')
        ])
      }),
      question7: new FormGroup({
        radios: new FormGroup({
          instrument1: new FormGroup({
            radio: new FormControl(''),
            institutionSetting: new FormControl(''),
            institutionCollecting: new FormControl('')
          }),
          instrument2: new FormGroup({
            radio: new FormControl(''),
            institutionSetting: new FormControl(''),
            institutionCollecting: new FormControl('')
          }),
          instrument3: new FormGroup({
            radio: new FormControl(''),
            institutionSetting: new FormControl(''),
            institutionCollecting: new FormControl('')
          }),
          instrument4: new FormGroup({
            radio: new FormControl(''),
            institutionSetting: new FormControl(''),
            institutionCollecting: new FormControl('')
          }),
          instrument5: new FormGroup({
            radio: new FormControl(''),
            institutionSetting: new FormControl(''),
            institutionCollecting: new FormControl('')
          }),
          instrument6: new FormGroup({
            radio: new FormControl(''),
            institutionSetting: new FormControl(''),
            institutionCollecting: new FormControl('')
          }),
          instrument7: new FormGroup({
            radio: new FormControl(''),
            institutionSetting: new FormControl(''),
            institutionCollecting: new FormControl('')
          }),
          instrument8: new FormGroup({
            radio: new FormControl(''),
            institutionSetting: new FormControl(''),
            institutionCollecting: new FormControl('')
          }),
          instrument9: new FormGroup({
            radio: new FormControl(''),
            institutionSetting: new FormControl(''),
            institutionCollecting: new FormControl('')
          })
        }),
        instrument10: new FormControl('')
      }),
      question8: new FormGroup({
        radios: new FormGroup({
          risk1: new FormControl(''),
          risk2: new FormControl(''),
          risk3: new FormControl(''),
          risk4: new FormControl(''),
          risk5: new FormControl(''),
          risk6: new FormControl(''),
          risk7: new FormControl('')
        })
      }),
      question9: new FormGroup({
        radio: new FormControl(''),
        inplaceComments: new FormControl(''),
        inprogressComments: new FormControl(''),
        emergingComments: new FormControl(''),
        notinplaceComments: new FormControl('')
      }),
      question10: new FormGroup({
        radio: new FormControl(''),
        inplaceComments: new FormControl(''),
        inprogressComments: new FormControl(''),
        emergingComments: new FormControl(''),
        notinplaceComments: new FormControl('')
      }),
      question11: new FormGroup({
        part1: new FormGroup({
          radios: new FormGroup({
            green_infrastructures_regulations: new FormGroup({
              radio: new FormControl('')
            })
          })
        }),
        part2: new FormGroup({
          radios: new FormGroup({
            environmental_flows1: new FormGroup({
              radio: new FormControl('')
            }),
            environmental_flows2: new FormGroup({
              radio: new FormControl('')
            }),
            environmental_flows3: new FormGroup({
              radio: new FormControl('')
            }),
            environmental_flows4: new FormGroup({
              radio: new FormControl('')
            })
          })
        }),
      }),
      question12: new FormGroup({
        radios: new FormGroup({
          initiative1: new FormGroup({
            radio: new FormControl('')
          }),
          initiative2: new FormGroup({
            radio: new FormControl('')
          }),
          initiative3: new FormGroup({
            radio: new FormControl('')
          })
        })
      }),
      question13: new FormGroup({
        radios: new FormGroup({
          obstacle1: new FormControl(''),
          obstacle2: new FormControl(''),
          obstacle3: new FormControl(''),
          obstacle4: new FormControl(''),
          obstacle5: new FormControl(''),
          obstacle6: new FormControl(''),
          obstacle7: new FormControl(''),
          obstacle8: new FormControl(''),
          obstacle9: new FormControl('')
        }),
        obstacle10: new FormArray([
          new FormControl('')
        ])
      }),
      question33_excel: new FormGroup({
        radios: new FormGroup({
          support1: new FormControl(''),
          priority1: new FormControl('')
        })
      }),
      question14: new FormGroup({
        directives: new FormGroup({
          directive1: new FormGroup({
            institutions: new FormControl(''),
            toBeInPlace: new FormControl(false),
            inPlace: new FormControl(false)
          }),
          directive2: new FormGroup({
            institutions: new FormControl(''),
            toBeInPlace: new FormControl(false),
            inPlace: new FormControl(false)
          }),
          directive3: new FormGroup({
            institutions: new FormControl(''),
            toBeInPlace: new FormControl(false),
            inPlace: new FormControl(false)
          }),
          directive4: new FormGroup({
            institutions: new FormControl(''),
            toBeInPlace: new FormControl(false),
            inPlace: new FormControl(false)
          }),
          directive5: new FormGroup({
            institutions: new FormControl(''),
            toBeInPlace: new FormControl(false),
            inPlace: new FormControl(false)
          }),
          directive6: new FormGroup({
            institutions: new FormControl(''),
            toBeInPlace: new FormControl(false),
            inPlace: new FormControl(false)
          }),
          directive7: new FormGroup({
            institutions: new FormControl(''),
            toBeInPlace: new FormControl(false),
            inPlace: new FormControl(false)
          }),
          directive8: new FormGroup({
            institutions: new FormControl(''),
            toBeInPlace: new FormControl(false),
            inPlace: new FormControl(false)
          }),
          directive9: new FormGroup({
            institutions: new FormControl(''),
            toBeInPlace: new FormControl(false),
            inPlace: new FormControl(false)
          })
        }),
        other: new FormControl('')
      }),
      question15: new FormGroup({
        radios: new FormGroup({
          capacity_gap1: new FormGroup({
            radio: new FormControl(''),
            description: new FormControl('')
          }),
          capacity_gap2: new FormGroup({
            radio: new FormControl(''),
            description: new FormControl('')
          }),
          capacity_gap3: new FormGroup({
            radio: new FormControl(''),
            description: new FormControl('')
          }),
        }),
        other: new FormArray([
          new FormControl('')
        ])
      }),
      question16: new FormGroup({
        part1: new FormGroup({
          radios: new FormGroup({
            incentive1: new FormControl(''),
            incentive2: new FormControl(''),
            incentive3: new FormControl('')
          }),
          other: new FormArray([
            new FormControl('')
          ])
        }),
        part2: new FormControl('')
      }),
      question17: new FormGroup({
        radios: new FormGroup({
          financial_source1: new FormGroup({
            radio: new FormControl(''),
            description: new FormControl('')
          }),
          financial_source2: new FormGroup({
            radio: new FormControl(''),
            description: new FormControl('')
          })
        }),
        other: new FormControl('')
      }),
      question18: new FormGroup({
        vulnerables: new FormGroup({
          vulnerable1: new FormGroup({
            urbanAreas: new FormControl(false),
            ruralAreas: new FormControl(false),
            idk: new FormControl(false),
            comments: new FormControl(''),
          }),
          vulnerable2: new FormGroup({
            urbanAreas: new FormControl(false),
            ruralAreas: new FormControl(false),
            idk: new FormControl(false),
            comments: new FormControl(''),
          }),
          vulnerable3: new FormGroup({
            urbanAreas: new FormControl(false),
            ruralAreas: new FormControl(false),
            idk: new FormControl(false),
            comments: new FormControl(''),
          }),
          vulnerable4: new FormGroup({
            urbanAreas: new FormControl(false),
            ruralAreas: new FormControl(false),
            idk: new FormControl(false),
            comments: new FormControl(''),
          })
        }),
        other: new FormArray([new FormControl('')])
      }),
      question19: new FormGroup({
        radios: new FormGroup({
          financial_source_ecosystems1: new FormGroup({
            radio: new FormControl(''),
            description: new FormControl('')
          }),
          financial_source_ecosystems2: new FormGroup({
            radio: new FormControl(''),
            description: new FormControl('')
          }),
          financial_source_ecosystems3: new FormGroup({
            radio: new FormControl(''),
            description: new FormControl('')
          })
        }),
        other: new FormControl('')
      }),
      question20: new FormGroup({
        radios: new FormGroup({
          incentive_innovative_financing1: new FormGroup({
            radio: new FormControl(''),
            examples: new FormControl('')
          }),
          incentive_innovative_financing2: new FormGroup({
            radio: new FormControl(''),
            examples: new FormControl('')
          }),
          incentive_innovative_financing3: new FormGroup({
            radio: new FormControl(''),
            examples: new FormControl('')
          }),
          incentive_innovative_financing4: new FormGroup({
            radio: new FormControl(''),
            examples: new FormControl('')
          })
        }),
        other: new FormControl('')
      }),
      question21: new FormGroup({
        'part1': new FormGroup({
          checkboxes: new FormGroup({
            document1_wss: new FormGroup({
              checkbox: new FormControl(false),
              comments: new FormControl(''),
            }),
            document2_wss: new FormGroup({
              checkbox: new FormControl(false),
              comments: new FormControl(''),
            }),
            document3_wss: new FormGroup({
              checkbox: new FormControl(false),
              comments: new FormControl(''),
            }),
            document4_wss: new FormGroup({
              checkbox: new FormControl(false),
              comments: new FormControl(''),
            }),
            document5_wss: new FormGroup({
              checkbox: new FormControl(false),
              comments: new FormControl(''),
            }),
            document6_wss: new FormGroup({
              checkbox: new FormControl(false),
              comments: new FormControl(''),
            }),
            document7_wss: new FormGroup({
              checkbox: new FormControl(false),
              comments: new FormControl(''),
            })
          })
        }),
        'part2': new FormGroup({
          radios: new FormGroup({
            issue1: new FormGroup({
              radio: new FormControl(''),
              comments: new FormControl('')
            }),
            issue2: new FormGroup({
              radio: new FormControl(''),
              comments: new FormControl('')
            }),
            issue3: new FormGroup({
              radio: new FormControl(''),
              comments: new FormControl('')
            }),
            issue4: new FormGroup({
              radio: new FormControl(''),
              comments: new FormControl('')
            }),
            issue5: new FormGroup({
              radio: new FormControl(''),
              comments: new FormControl('')
            }),
            issue6: new FormGroup({
              radio: new FormControl(''),
              comments: new FormControl('')
            }),
            issue7: new FormGroup({
              radio: new FormControl(''),
              comments: new FormControl('')
            }),
            issue8: new FormGroup({
              radio: new FormControl(''),
              comments: new FormControl('')
            })
          })
        }),
        'part3': new FormGroup({
          radios: new FormGroup({
            characteristic1: new FormGroup({
              radio: new FormControl(''),
              actors: new FormControl(''),
              comments: new FormControl('')
            }),
            characteristic2: new FormGroup({
              radio: new FormControl(''),
              actors: new FormControl(''),
              comments: new FormControl('')
            }),
            characteristic3: new FormGroup({
              radio: new FormControl(''),
              actors: new FormControl(''),
              comments: new FormControl('')
            }),
          })
        })
      }),
      question22: new FormGroup({
        'part1': new FormGroup({
          checkboxes: new FormGroup({
            document1_iwrm: new FormGroup({
              checkbox: new FormControl(false),
              comments: new FormControl(''),
            }),
            document2_iwrm: new FormGroup({
              checkbox: new FormControl(false),
              comments: new FormControl(''),
            }),
            document3_iwrm: new FormGroup({
              checkbox: new FormControl(false),
              comments: new FormControl(''),
            }),
            document4_iwrm: new FormGroup({
              checkbox: new FormControl(false),
              comments: new FormControl(''),
            }),
            document5_iwrm: new FormGroup({
              checkbox: new FormControl(false),
              comments: new FormControl(''),
            }),
            document6_iwrm: new FormGroup({
              checkbox: new FormControl(false),
              comments: new FormControl(''),
            })
          })
        }),
        'part2': new FormGroup({
          radios: new FormGroup({
            issue1: new FormGroup({
              radio: new FormControl(''),
              comments: new FormControl('')
            }),
            issue2: new FormGroup({
              radio: new FormControl(''),
              comments: new FormControl('')
            }),
            issue3: new FormGroup({
              radio: new FormControl(''),
              comments: new FormControl('')
            }),
            issue4: new FormGroup({
              radio: new FormControl(''),
              comments: new FormControl('')
            }),
            issue5: new FormGroup({
              radio: new FormControl(''),
              comments: new FormControl('')
            }),
            issue6: new FormGroup({
              radio: new FormControl(''),
              comments: new FormControl('')
            }),
            issue7: new FormGroup({
              radio: new FormControl(''),
              comments: new FormControl('')
            }),
            issue8: new FormGroup({
              radio: new FormControl(''),
              comments: new FormControl('')
            })
          })
        }),
        'part3': new FormGroup({
          radios: new FormGroup({
            characteristic1: new FormGroup({
              radio: new FormControl(''),
              actors: new FormControl(''),
              comments: new FormControl('')
            }),
            characteristic2: new FormGroup({
              radio: new FormControl(''),
              actors: new FormControl(''),
              comments: new FormControl('')
            }),
            characteristic3: new FormGroup({
              radio: new FormControl(''),
              actors: new FormControl(''),
              comments: new FormControl('')
            }),
          })
        })
      }),
      question23: new FormGroup({
        'part1': new FormGroup({
          checkboxes: new FormGroup({
            document1_water_risk: new FormGroup({
              checkbox: new FormControl(false),
              comments: new FormControl(''),
            }),
            document2_water_risk: new FormGroup({
              checkbox: new FormControl(false),
              comments: new FormControl(''),
            }),
            document3_water_risk: new FormGroup({
              checkbox: new FormControl(false),
              comments: new FormControl(''),
            }),
            document4_water_risk: new FormGroup({
              checkbox: new FormControl(false),
              comments: new FormControl(''),
            })
          })
        }),
        'part2': new FormGroup({
          radios: new FormGroup({
            issue1: new FormGroup({
              radio: new FormControl(''),
              comments: new FormControl('')
            }),
            issue2: new FormGroup({
              radio: new FormControl(''),
              comments: new FormControl('')
            }),
            issue3: new FormGroup({
              radio: new FormControl(''),
              comments: new FormControl('')
            }),
            issue4: new FormGroup({
              radio: new FormControl(''),
              comments: new FormControl('')
            }),
            issue5: new FormGroup({
              radio: new FormControl(''),
              comments: new FormControl('')
            }),
            issue6: new FormGroup({
              radio: new FormControl(''),
              comments: new FormControl('')
            }),
            issue7: new FormGroup({
              radio: new FormControl(''),
              comments: new FormControl('')
            }),
            issue8: new FormGroup({
              radio: new FormControl(''),
              comments: new FormControl('')
            })
          })
        }),
        'part3': new FormGroup({
          radios: new FormGroup({
            characteristic1: new FormGroup({
              radio: new FormControl(''),
              actors: new FormControl(''),
              comments: new FormControl('')
            }),
            characteristic2: new FormGroup({
              radio: new FormControl(''),
              actors: new FormControl(''),
              comments: new FormControl('')
            }),
            characteristic3: new FormGroup({
              radio: new FormControl(''),
              actors: new FormControl(''),
              comments: new FormControl('')
            }),
          })
        })
      }),
      question24: new FormGroup({
        radios: new FormGroup({
          mechanism1: new FormControl(''),
          mechanism2: new FormControl(''),
          mechanism3: new FormControl(''),
          mechanism4: new FormControl(''),
          mechanism5: new FormControl(''),
          mechanism6: new FormControl('')
        }),
        other: new FormArray([new FormControl('')])
      }),
      question55_excel: new FormGroup({
        radio: new FormControl(''),
        advancedComments: new FormControl(''),
        inprogressComments: new FormControl(''),
        emergingComments: new FormControl(''),
        notinplaceComments: new FormControl('')
      }),
      question25: new FormGroup({
        radios: new FormGroup({
          key_indicators1: new FormGroup({
            radio: new FormControl(''),
            examples: new FormControl('')
          }),
          key_indicators2: new FormGroup({
            radio: new FormControl(''),
            examples: new FormControl('')
          })
        })
      }),
      question26: new FormGroup({
        radio: new FormControl(''),
        advancedComments: new FormControl(''),
        inprogressComments: new FormControl(''),
        emergingComments: new FormControl(''),
        notinplaceComments: new FormControl('')
      }),
      question27: new FormGroup({
        radio: new FormControl(''),
        advancedComments: new FormControl(''),
        inprogressComments: new FormControl(''),
        emergingComments: new FormControl(''),
        notinplaceComments: new FormControl('')
      }),
      question28: new FormGroup({
        radios: new FormGroup({
          transparency_obstacle1: new FormControl(''),
          transparency_obstacle2: new FormControl(''),
          transparency_obstacle3: new FormControl(''),
          transparency_obstacle4: new FormControl(''),
          transparency_obstacle5: new FormControl(''),
          transparency_obstacle6: new FormControl(''),
          transparency_obstacle7: new FormControl(''),
          transparency_obstacle8: new FormControl(''),
          transparency_obstacle9: new FormControl(''),
        }),
        other: new FormControl('')
      }),
      question29: new FormGroup({
        part1: new FormGroup({
          radio: new FormControl('')
        }),
        part2: new FormGroup({
          radio: new FormControl('')
        })
      }),
      question30: new FormGroup({
        radio: new FormControl(''),
        advancedComments: new FormControl(''),
        inprogressComments: new FormControl(''),
        emergingComments: new FormControl(''),
        notinplaceComments: new FormControl(''),
        idkComments: new FormControl('')
      }),
      question31: new FormGroup({
        radios: new FormGroup({
          horizontal_coordination_mechanism1: new FormControl(''),
          horizontal_coordination_mechanism2: new FormControl(''),
          horizontal_coordination_mechanism3: new FormControl(''),
          horizontal_coordination_mechanism4: new FormControl(''),
          horizontal_coordination_mechanism6: new FormControl(''),
          horizontal_coordination_mechanism7: new FormControl(''),
          horizontal_coordination_mechanism8: new FormControl(''),
          horizontal_coordination_mechanism9: new FormControl(''),
          horizontal_coordination_mechanism10: new FormControl(''),
          horizontal_coordination_mechanism11: new FormControl(''),
          horizontal_coordination_mechanism12: new FormControl(''),
          horizontal_coordination_mechanism13: new FormControl(''),
          horizontal_coordination_mechanism14: new FormControl(''),
          horizontal_coordination_mechanism15: new FormControl(''),
          horizontal_coordination_mechanism16: new FormControl('')
        })
      })
    });
  }
loadRetrievedQuestionnaire(data: any): void {
  console.log('Received data:', data); // Log the received data for debugging
  // Check if data is null, undefined, or not an object
  if (!data || typeof data !== 'object') {
    console.error('Invalid questionnaire data received:', data);
    alert('Failed to retrieve questionnaire data. Please try again.');
    return;
  }

  // If data is nested inside a property (e.g., response.msg)
  const questionnaireData = data.msg || data;

  // Verify again that we have a valid object to work with
  if (!questionnaireData || typeof questionnaireData !== 'object') {
    console.error('Invalid questionnaire format:', questionnaireData);
    alert('The retrieved questionnaire format is invalid.');
    return;
  }

  // Reset the form first to clear any existing data
  this.resetQuestionnaire();
  delete questionnaireData.question31;
  try {
    // Loop through each question in the retrieved data
    for (const [questionKey, questionValue] of Object.entries(questionnaireData)) {
      const control = this.form.get(questionKey);
      if (control) {
        try {
          // Initialize form arrays for complex structures
          this.initFormArray(questionKey, questionValue as any);

          // Set the form control value
          control.setValue(questionValue);

          // Mark the control as dirty to indicate it has been filled
          control.markAsDirty();

          // Save to localStorage (since your component already uses this)
          localStorage.setItem(questionKey, JSON.stringify(questionValue));
        } catch (error) {
          console.error(`Error setting value for ${questionKey}:`, error);
        }
      }
    }

    // Add a visual indicator that the questionnaire has been retrieved
    const retrievalIndicator = document.createElement('div');
    retrievalIndicator.textContent = 'Questionnaire retrieved successfully!';
    retrievalIndicator.className = 'alert alert-success mt-3';
    retrievalIndicator.id = 'questionnaire-retrieved-indicator';

    // Remove any existing indicator first
    const existingIndicator = document.getElementById('questionnaire-retrieved-indicator');
    if (existingIndicator) {
      existingIndicator.remove();
    }

    // Add the new indicator
    const containerElement = document.querySelector('.container-fluid');
    if (containerElement) {
      containerElement.prepend(retrievalIndicator);
      alert('Questionnaire retrieved successfully!');
    }
  } catch (error) {
    console.error('Error processing questionnaire data:', error);
    alert('An error occurred while loading the questionnaire data.');
  }
}


  get question1Table1() {
    return this.form.get(['question1', 'table1']) as FormArray;
  }

  get question1Table2() {
    return this.form.get(['question1', 'table2']) as FormArray;
  }

  get question2Table() {
    return this.form.get('question2') as FormArray;
  }

  get question3OtherFinancingMechanisms() {
    return this.form.get(['question3', 'financing4']) as FormArray;
  }

  get question6Checkboxes() {
    return this.form.get(['question6', 'checkboxes']) as FormGroup;
  }

  get question6OtherChannels() {
    return this.form.get(['question6', 'channel6']) as FormArray;
  }

  get question7Radios() {
    return this.form.get(['question7', 'radios']) as FormGroup;
  }

  get question8Radios() {
    return this.form.get(['question8', 'radios']) as FormGroup;
  }

  get question11Part1Radios() {
    return this.form.get(['question11', 'part1', 'radios']) as FormGroup;
  }

  get question11Part2Radios() {
    return this.form.get(['question11', 'part2', 'radios']) as FormGroup;
  }

  get question12Radios() {
    return this.form.get(['question12', 'radios']) as FormGroup;
  }

  get question13Radios() {
    return this.form.get(['question13', 'radios']) as FormGroup;
  }

  get question13OtherObstacles() {
    return this.form.get(['question13', 'obstacle10']) as FormArray;
  }

  get question14Directives() {
    return this.form.get(['question14', 'directives']) as FormGroup;
  }

  get question15Radios() {
    return this.form.get(['question15', 'radios']) as FormGroup;
  }

  get question15Other() {
    return this.form.get(['question15', 'other']) as FormArray;
  }

  get question16Radios() {
    return this.form.get(['question16', 'part1', 'radios']) as FormGroup;
  }

  get question16Other() {
    return this.form.get(['question16', 'part1', 'other']) as FormArray;
  }

  get question17Radios() {
    return this.form.get(['question17', 'radios']) as FormGroup;
  }

  get question18Vulnerables() {
    return this.form.get(['question18', 'vulnerables']) as FormGroup;
  }

  get question18Other() {
    return this.form.get(['question18', 'other']) as FormArray;
  }

  get question19Radios() {
    return this.form.get(['question19', 'radios']) as FormGroup;
  }

  get question20Radios() {
    return this.form.get(['question20', 'radios']) as FormGroup;
  }

  get question21Part1Checkboxes() {
    return this.form.get(['question21', 'part1', 'checkboxes']) as FormGroup;
  }

  get question21Part2Radios() {
    return this.form.get(['question21', 'part2', 'radios']) as FormGroup;
  }

  get question21Part3Radios() {
    return this.form.get(['question21', 'part3', 'radios']) as FormGroup;
  }

  get question22Part1Checkboxes() {
    return this.form.get(['question22', 'part1', 'checkboxes']) as FormGroup;
  }

  get question22Part2Radios() {
    return this.form.get(['question22', 'part2', 'radios']) as FormGroup;
  }

  get question22Part3Radios() {
    return this.form.get(['question22', 'part3', 'radios']) as FormGroup;
  }

  get question23Part1Checkboxes() {
    return this.form.get(['question23', 'part1', 'checkboxes']) as FormGroup;
  }

  get question23Part2Radios() {
    return this.form.get(['question23', 'part2', 'radios']) as FormGroup;
  }

  get question23Part3Radios() {
    return this.form.get(['question23', 'part3', 'radios']) as FormGroup;
  }

  get question24Radios() {
    return this.form.get(['question24', 'radios']) as FormGroup;
  }

  get question24Other() {
    return this.form.get(['question24', 'other']) as FormArray;
  }

  get question25Radios() {
    return this.form.get(['question25', 'radios']) as FormGroup;
  }

  get question28Radios() {
    return this.form.get(['question28', 'radios']) as FormGroup;
  }

  get question31Radios() {
    return this.form.get(['question31', 'radios']) as FormGroup;
  }

  mandatoryQuestions: string[] = [
    "question1",
    "question2",
    "question3",
    "question7",
    "question8",
    "question13",
    "question15",
    "question17",
    "question19",
    "question21",
    "question22",
    "question23",
    "question24",
    "question28",
    "question33_excel"
  ];

  private destroy$ = new Subject<void>();

  institutionRoleOptions: any = [];

  institutionGovernanceLevelOptions: any = [];

  rboRoleOptions: any = [];

  @ViewChild('labelToClick') labelToClick!: ElementRef;

  ngOnInit(): void {
    this.formInit();

    this.institutionRoleOptions = institutionRoles.map(role => ({ value: role }));
    this.institutionRoleOptions.unshift({ value: 'idk' }); // I don't know
    this.institutionGovernanceLevelOptions = institutionGovernanceLevels.map(governanceLevel => ({ value: governanceLevel }));
    this.rboRoleOptions = rboRoles.map(role => ({ value: role }));
    this.rboRoleOptions.unshift({ value: 'idk' }); // I don't know

    for (const question of Object.keys(this.form.controls)) {
      const formQuestion = this.form.get(question) as FormGroup;
      const defaultValue = formQuestion.value;
      formQuestion.valueChanges.pipe(
        takeUntil(this.destroy$)
      ).subscribe(value => {
        const jsonValue = JSON.stringify(value);
        // Save the question form data as it changes
        localStorage.setItem(question, jsonValue);
        // Check if the question has been answered (modified) or not
        if (JSON.stringify(defaultValue) == jsonValue) {
          formQuestion.markAsPristine();
        }
      });

      // Retrieve the question form data if any
      const savedQuestion = localStorage.getItem(question);
      if (savedQuestion) {
        try {
          this.initFormArray(question, JSON.parse(savedQuestion));
          formQuestion.setValue(JSON.parse(savedQuestion));
          // Check if the question has been answered (modified) or not
          if (JSON.stringify(defaultValue) != savedQuestion) {
            formQuestion.markAsDirty();
          }
        } catch (e) {
          formQuestion.reset();
        }
      }
    }
  }

  initFormArray(question: string, value: any) {
    if (question == "question1") {
      this.question1Table1.clear();
      this.question1Table2.clear();
      value.table1.forEach(() => {
        this.addQuestion1Table1Institution();
      });
      value.table2.forEach(() => {
        this.addQuestion1Table2Institution();
      });
    } else if (question == "question2") {
      this.question2Table.clear();
      value.forEach(() => {
        this.addQuestion2TableRbo();
      });
    } else if (question == "question3") {
      this.question3OtherFinancingMechanisms.clear();
      value.financing4.forEach(() => {
        this.addQuestion3OtherFinancingMechanism();
      });
    } else if (question == "question6") {
      this.question6OtherChannels.clear();
      value.channel6.forEach(() => {
        this.addQuestion6OtherChannel();
      });
    } else if (question == "question13") {
      this.question13OtherObstacles.clear();
      value.obstacle10.forEach(() => {
        this.addQuestion13OtherObstacle();
      });
    } else if (question == "question15") {
      this.question15Other.clear();
      value.other.forEach(() => {
        this.addQuestion15Other();
      });
    } else if (question == "question16") {
      this.question16Other.clear();
      value.part1.other.forEach(() => {
        this.addQuestion16Other();
      });
    } else if (question == "question18") {
      this.question18Other.clear();
      value.other.forEach(() => {
        this.addQuestion18Other();
      });
    } else if (question == "question24") {
      this.question24Other.clear();
      value.other.forEach(() => {
        this.addQuestion24Other();
      });
    }
  }

  addQuestion1Table1Institution() {
    const institutionForm = new FormGroup({
      institutionName: new FormControl(''),
      role: new FormControl([]),
      governanceLevel: new FormControl([])
    });
    this.question1Table1.push(institutionForm);
  }

  deleteQuestion1Table1Institution(institutionIndex: number) {
    this.question1Table1.removeAt(institutionIndex);
  }

  addQuestion1Table2Institution() {
    const institutionForm = new FormGroup({
      institutionName: new FormControl(''),
      role: new FormControl([]),
      governanceLevel: new FormControl([])
    });
    this.question1Table2.push(institutionForm);
  }

  deleteQuestion1Table2Institution(institutionIndex: number) {
    this.question1Table2.removeAt(institutionIndex);
  }

  addQuestion2TableRbo() {
    const rboForm = new FormGroup({
      rbo: new FormControl(''),
      subnational: new FormControl(''),
      role: new FormControl([]),
      roleInfo: new FormControl(''),
      functions: new FormControl(''),
      functionsInfo: new FormControl(''),
      radios: new FormGroup({
        adequateStaffing: new FormControl(''),
        adequateBudget: new FormControl('')
      })
    });
    this.question2Table.push(rboForm);
  }

  deleteQuestion2TableRbo(rboIndex: number) {
    this.question2Table.removeAt(rboIndex);
  }

  addQuestion3OtherFinancingMechanism() {
    const otherFinancingMechanismForm = new FormControl('');
    this.question3OtherFinancingMechanisms.push(otherFinancingMechanismForm);
  }

  deleteQuestion3OtherFinancingMechanism(otherFinancingMechanismIndex: number) {
    this.question3OtherFinancingMechanisms.removeAt(otherFinancingMechanismIndex);
  }

  addQuestion6OtherChannel() {
    const otherChannelForm = new FormControl('');
    this.question6OtherChannels.push(otherChannelForm);
  }

  deleteQuestion6OtherChannel(otherChannelIndex: number) {
    this.question6OtherChannels.removeAt(otherChannelIndex);
  }

  addQuestion13OtherObstacle() {
    const otherObstacleForm = new FormControl('');
    this.question13OtherObstacles.push(otherObstacleForm);
  }

  deleteQuestion13OtherObstacle(otherObstacleIndex: number) {
    this.question13OtherObstacles.removeAt(otherObstacleIndex);
  }

  addQuestion15Other() {
    const otherForm = new FormControl('');
    this.question15Other.push(otherForm);
  }

  deleteQuestion15Other(otherIndex: number) {
    this.question15Other.removeAt(otherIndex);
  }

  addQuestion16Other() {
    const otherForm = new FormControl('');
    this.question16Other.push(otherForm);
  }

  deleteQuestion16Other(otherIndex: number) {
    this.question16Other.removeAt(otherIndex);
  }

  addQuestion18Other() {
    const otherForm = new FormControl('');
    this.question18Other.push(otherForm);
  }

  deleteQuestion18Other(otherIndex: number) {
    this.question18Other.removeAt(otherIndex);
  }

  addQuestion24Other() {
    const otherForm = new FormControl('');
    this.question24Other.push(otherForm);
  }

  deleteQuestion24Other(otherIndex: number) {
    this.question24Other.removeAt(otherIndex);
  }

  exclusiveCheckboxChanged(event: any, directiveControl: AbstractControl, vsCheckbox: string) {
    if (event.target.checked) {
      directiveControl.get(vsCheckbox)?.setValue(false);
    }
  }

  /*
  / The last value of the array is the last selected element.
  */
  onChange(event: any, control: any) {
    if (event && event.includes("idk")) {
      if (event[event.length - 1] == "idk") {
        this.labelToClick.nativeElement.click(); // Close multiselect
        if (event.length > 1) {
          control.setValue(["idk"]);
        }
      } else if (event[event.length - 1] != "idk") {
        control.setValue(event.filter((val: string) => val != "idk"));
      }
    }
  }

  // Remove all the added rows from the form arrays, leaving only the first one
  private initFormArraysLength(control: AbstractControl) {
    if (control instanceof FormArray) {
      while (control.length > 1) {
        control.removeAt(0);
      }
    } else if (control instanceof FormGroup) {
      Object.values(control.controls).forEach(child => this.initFormArraysLength(child));
    }
  }

  resetQuestionnaire(): void {
    this.initFormArraysLength(this.form);
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
