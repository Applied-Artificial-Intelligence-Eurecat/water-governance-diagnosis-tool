import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { ResultsComponent } from './results/results.component';


export const routes: Routes = [
  { path: '', component: IntroductionComponent },
  { path: 'form', component: FormComponent },
  { path: 'results', component: ResultsComponent },
];
