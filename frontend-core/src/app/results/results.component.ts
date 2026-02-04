import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { BaseChartDirective } from 'ng2-charts';
import { institutionRoles, rboRoles } from '../model/roles';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [BaseChartDirective, TranslocoDirective],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css',
})
export class ResultsComponent implements OnInit {
  questionnaireFormValue: {
    [question: string]: any;
  };

  chartData: any;
  questionScores: { [question: string]: number } = {};

  chartOptions: any = {
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        min: 0,
        max: 3,
        ticks: {
          stepSize: 0.75,
          z: 1,
          format: {
            minimumIntegerDigits: 1,
            minimumFractionDigits: 2,
            minimumSignificantDigits: 1,
          },
        },
        pointLabels: {
          font: {
            size: 12,
          },
        },
      },
    },
    maintainAspectRatio: false,
    interaction: {
      mode: 'index'
    },
    plugins: {
      tooltip: {
        callbacks: {
          footer: (tooltipItems: any) => {
            const description = this.translocoService.translate(`category-description-${tooltipItems[0].dataIndex}`);

            // Function to split text into lines of a specific width
            const wrapText = (text: string, maxWidth: number): string[] => {
              const words = text.split(' ');
              const lines: string[] = [];
              let currentLine = '';

              words.forEach((word) => {
                if ((currentLine + word).length > maxWidth) {
                  lines.push(currentLine.trim());
                  currentLine = word + ' ';
                } else {
                  currentLine += word + ' ';
                }
              });

              if (currentLine) {
                lines.push(currentLine.trim());
              }

              return lines;
            };

            // Limit each line to 60 characters
            return wrapText(description, 60);
          }
        }
      }
    }
  };

  NUM_OF_CATEGORIES = 16;

  questionCategory: {
    [question: string]: number[];
  } = {
      question1: [0],
      question2: [0, 1, 13],
      question3: [1, 5, 13, 15],
      question4: [0, 13],
      question5: [0],
      question6: [8, 9, 14],
      question7: [5, 15],
      question8: [15],
      question9: [0, 6, 13, 15],
      question10: [0, 15],
      question11: [6, 11, 12, 15],
      question12: [0, 2, 12, 15],
      question13: [12],
      question33_excel: [10, 13],
      question14: [0, 2],
      question15: [3],
      question16: [3],
      question17: [5, 14],
      question18: [5, 10, 14],
      question19: [5, 15],
      question20: [5, 7],
      question21: [4],
      question22: [4],
      question23: [4],
      question24: [4],
      question55_excel: [4, 7, 11],
      question25: [12],
      question26: [14],
      question27: [2, 14],
      question28: [8],
      question29: [9, 14],
      question30: [9, 14],
      question31: [9],
    };

  constructor(
    private router: Router,
    private translocoService: TranslocoService,
    private sanitizer: DomSanitizer
  ) {
    this.questionnaireFormValue =
      this.router.getCurrentNavigation()?.extras.state?.[
      'questionnaireFormValue'
      ];
  }

  ngOnInit(): void {
    this.translocoService
      .selectTranslateObject('results.categories')
      .subscribe((result) => {
        this.chartData = {
          labels: this.getTranslations(result),
          datasets: [
            {
              label: 'Results',
              data: this.computeChartDatasetData(),
              fill: false,
              backgroundColor: '#0BA28920',
              borderColor: '#0BA289',
              pointBackgroundColor: '#0BA289',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: '#0BA289',
              pointRadius: 5,
            },
          ],
        };
      });
  }
  getAssistantIFrame(): any {
    let uri: string = 'https://innwater.eurecatprojects.com/assistant_tool';
    let params: string[] = [];

    // Add category scores to the query parameters
    if (this.chartData?.datasets?.[0]?.data) {
      params.push(
        ...this.chartData.datasets[0].data.map(
          (value: number, index: number): string => `cat${index}=${value}`
        )
      );
    }

    // Add individual question scores to the query parameters
    for (const [question, score] of Object.entries(this.questionScores)) {
      params.push(`${question}=${score}`);
    }

    params.push(`lang=${this.translocoService.getActiveLang()}`)

    // Construct the full URI
    if (params.length > 0) {
      uri += `/?${params.join('&')}`;
    }

    console.log('Generated URL:', uri);

    return this.sanitizer.bypassSecurityTrustResourceUrl(uri);
  }

  computeChartDatasetData() {
    let categoryValues: number[][] = Array.from(
      Array(this.NUM_OF_CATEGORIES),
      () => []
    );
    let categoryAverages: number[];

    for (const [question, response] of Object.entries(
      this.questionnaireFormValue
    )) {
      let score: number = 0;
      if (question == 'question1') {
        score = this.computeScoreRoles(response.table1, institutionRoles);
        score += this.computeScoreRoles(response.table2, institutionRoles);
        score /= 2;
      } else if (question == 'question2') {
        score = this.computeScoreRoles(response, rboRoles);
        score +=
          response.reduce(
            (sum: number, row: any) =>
              sum +
              this.computeScoreYesNo(Object.values(row.radios), 'yes', 'no'),
            0
          ) / response.length;
        score /= 2;
      } else if (
        question == 'question3' ||
        question == 'question4' ||
        question == 'question5' ||
        question == 'question31' ||
        question == 'question33_excel'
      ) {
        score = this.computeScoreYesNo(
          Object.values(response.radios),
          'yes',
          'no'
        );
      } else if (question == 'question6') {
        score = this.computeScoreCheckboxes(
          Object.values(response.checkboxes).map((val: any) => val.checkbox)
        );
      } else if (
        question == 'question7' ||
        question == 'question12' ||
        question == 'question17' ||
        question == 'question19' ||
        question == 'question20' ||
        question == 'question25'
      ) {
        score = this.computeScoreYesNo(
          Object.values(response.radios).map((val: any) => val.radio),
          'yes',
          'no'
        );
      } else if (question == 'question8') {
        score = this.computeScoreYesNo(
          Object.values(response.radios),
          'no',
          'yes'
        );
      } else if (question == 'question9' || question == 'question10') {
        score = this.computeScoreStrategy(response.radio, 'inplace');
      } else if (question == 'question11') {
        score = this.computeScoreYesNo(
          Object.values(response.part1.radios).map((val: any) => val.radio),
          'yes',
          'no'
        );
        score += this.computeScoreYesNo(
          Object.values(response.part2.radios).map((val: any) => val.radio),
          'yes',
          'no'
        );
        score /= 2;
      } else if (question == 'question13') {
        score = this.computeScoreImpact(Object.values(response.radios));
      } else if (question == 'question14') {
        score = this.computeScoreInstitutionsInPlace(
          Object.values(response.directives)
        );
      } else if (question == 'question15') {
        score = this.computeScoreYesNo(
          Object.values(response.radios).map((val: any) => val.radio),
          'no',
          'yes'
        );
      } else if (question == 'question16') {
        score = this.computeScoreYesNo(
          Object.values(response.part1.radios),
          'yes',
          'no'
        );
      } else if (question == 'question18') {
        score = this.computeScoreYesNo(
          Object.values(response.vulnerables).map((v: any) =>
            (v.urbanAreas || v.ruralAreas) && !v.idk ? 'yes' : 'no'
          ),
          'yes',
          'no'
        );
      } else if (
        question == 'question21' ||
        question == 'question22' ||
        question == 'question23'
      ) {
        score = this.computeScoreCheckboxes(
          Object.values(response.part1.checkboxes).map(
            (val: any) => val.checkbox
          )
        );
        score += this.computeScoreYesNo(
          Object.values(response.part2.radios).map((val: any) => val.radio),
          'no',
          'yes'
        );
        score += this.computeScoreYesNo(
          Object.values(response.part3.radios).map((val: any) => val.radio),
          'yes',
          'no'
        );
        score /= 3;
      } else if (question == 'question24') {
        score = this.computeScoreHowOften(Object.values(response.radios));
      } else if (
        question == 'question26' ||
        question == 'question27' ||
        question == 'question30' ||
        question == 'question55_excel'
      ) {
        score = this.computeScoreStrategy(response.radio, 'advanced');
      } else if (question == 'question28') {
        score = this.computeScoreObstacles(Object.values(response.radios));
      } else if (question == 'question29') {
        score = this.computeScoreStrategy(response.part1.radio, 'advanced');
        score += this.computeScoreStrategy(response.part2.radio, 'advanced');
        score /= 2;
      }
      this.questionScores[question] = score;

      this.questionCategory[question].forEach((category) => {
        categoryValues[category].push(score);
      });
    }
    categoryAverages = categoryValues.map(
      (values) =>
        values.reduce((sum, currentValue) => sum + currentValue, 0) /
        values.length || 0
    );

    return categoryAverages;
  }

  computeScoreRoles(rows: any[], roles: string[]) {
    const selectedRoles = new Set(rows.flatMap((row) => row['role']));

    let score;
    if (selectedRoles.size == roles.length) {
      score = 3;
    } else if (selectedRoles.size > roles.length / 2) {
      score = 2;
    } else if (selectedRoles.size > 0) {
      score = 1;
    } else {
      score = 0;
    }

    return score;
  }

  computeScoreYesNo(radios: string[], positive: string, negative: string) {
    let totals: any;
    totals = radios.reduce((totals: any, currentValue: any) => {
      totals[currentValue] = (totals[currentValue] || 0) + 1;
      return totals;
    }, {});

    let score;
    if (totals[positive] == radios.length) {
      score = 3; // new
    } else if (totals[positive] > radios.length / 2) {
      score = 2;
    } else if (totals[negative] > radios.length / 2) {
      score = 1;
    } else {
      score = 0;
    }
    return score;
  }

  computeScoreCheckboxes(checkboxes: any[]) {
    let totals: any;
    totals = checkboxes.reduce((totals: any, currentValue: any) => {
      totals[currentValue] = (totals[currentValue] || 0) + 1;
      return totals;
    }, {});

    let score;
    if (totals['true'] == checkboxes.length) {
      score = 3;
    } else if (totals['true'] > 0) {
      score = 2;
    } else {
      score = 1;
    }
    return score;
  }

  computeScoreStrategy(radio: string, maxValue: string) {
    let score = 0;
    if (radio == maxValue) {
      score = 3;
    } else if (radio == 'inprogress') {
      score = 2;
    } else if (radio == 'emerging') {
      score = 1;
    } else if (radio == 'notinplace') {
      score = 0;
    }

    return score;
  }

  computeScoreImpact(radios: string[]) {
    const impactLittle = 'impact_little';
    const impactAverage = 'impact_average';
    const impactImportant = 'impact_important';
    const idk = 'idk';
    let totals: any = {
      [impactLittle]: 0,
      [impactAverage]: 0,
      [impactImportant]: 0,
      [idk]: 0,
      '': 0,
    };
    totals = radios.reduce((totals: any, currentValue: any) => {
      totals[currentValue] += 1;
      return totals;
    }, totals);

    let score;
    if (totals[impactLittle] > radios.length / 2) {
      score = 3;
    } else if (
      totals[impactAverage] + totals[impactImportant] >
      radios.length / 2
    ) {
      score = 1;
    } else if (totals[idk] + totals[''] == radios.length) {
      score = 0;
    } else {
      score = 2;
    }

    return score;
  }

  computeScoreInstitutionsInPlace(directives: any[]) {
    const toBeInPlace = 'toBeInPlace';
    const inPlace = 'inPlace';
    let totals: any = {
      [toBeInPlace]: 0,
      [inPlace]: 0,
      '': 0,
    };
    totals = directives.reduce((totals: any, currentValue: any) => {
      totals[toBeInPlace] = currentValue[toBeInPlace] ? 1 : 0;
      totals[inPlace] = currentValue[inPlace] ? 1 : 0;
      return totals;
    }, totals);

    let score;
    if (totals[inPlace] > directives.length / 2) {
      score = 3;
    } else if (totals[toBeInPlace] > directives.length / 2) {
      score = 2;
    } else if (totals[inPlace] + totals[toBeInPlace] <= directives.length / 2) {
      score = 1;
    } else {
      // What if inPlace == 3, toBeInPlace == 2 (for a total of 9)?
      score = 0;
    }

    return score;
  }

  computeScoreHowOften(radios: string[]) {
    const yesVeryOften = 'yes_very_often';
    const yesOften = 'yes_often';
    const yesSometimes = 'yes_sometimes';
    const yesVeryRarely = 'yes_very_rarely';
    const never = 'never';
    const idk = 'idk';
    let totals: any = {
      [yesVeryOften]: 0,
      [yesOften]: 0,
      [yesSometimes]: 0,
      [yesVeryRarely]: 0,
      [never]: 0,
      [idk]: 0,
      '': 0,
    };
    totals = radios.reduce((totals: any, currentValue: any) => {
      totals[currentValue] += 1;
      return totals;
    }, totals);

    let score = 0;
    if (
      totals[yesVeryOften] + totals[yesOften] + totals[yesSometimes] ==
      radios.length
    ) {
      score = 3;
    } else if (totals[yesVeryRarely] > 0) {
      score = 2;
    } else if (totals[never] > radios.length / 2) {
      score = 1;
    } else if (totals[idk] + totals[''] > radios.length / 2) {
      score = 0;
    }
    return score;
  }

  computeScoreObstacles(radios: string[]) {
    const majorObstacle = 'major_obstacle';
    const importantObstacle = 'important_obstacle';
    const somewhat_obstacle = 'somewhat_obstacle';
    const notObstacle = 'not_obstacle';
    const idk = 'idk';
    let totals: any = {
      [majorObstacle]: 0,
      [importantObstacle]: 0,
      [somewhat_obstacle]: 0,
      [notObstacle]: 0,
      [idk]: 0,
      '': 0,
    };
    totals = radios.reduce((totals: any, currentValue: any) => {
      totals[currentValue] += 1;
      return totals;
    }, totals);

    let score;
    if (totals[notObstacle] > radios.length / 2) {
      score = 3;
    } else if (
      totals[importantObstacle] + totals[majorObstacle] >
      radios.length / 2
    ) {
      score = 1;
    } else if (totals[idk] + totals[''] == radios.length) {
      score = 0;
    } else {
      score = 2;
    }

    return score;
  }

  getTranslations(result: {}) {
    let translations: (string | string[])[] = [];
    for (const item of Object.values(result)) {
      if (typeof item === 'string') {
        translations.push(item);
      } else {
        translations.push(Object.values(item as object));
      }
    }
    return translations;
  }
}
