import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import 'iframe-resizer/js/iframeResizer.contentWindow';
import '@iframe-resizer/child'

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
