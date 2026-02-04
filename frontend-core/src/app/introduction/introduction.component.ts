import { Component } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { CommonModule } from '@angular/common';
import { CookieService } from '../services/cookie.service';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [RouterLink, TranslocoDirective, CommonModule],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.css'
})
export class IntroductionComponent {
  activeLang: string;
  availableLangs = ['en', 'es', 'it', 'hu', 'ca', 'fr'];

  constructor(
    private translocoService: TranslocoService,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // First check for language in URL query parameters
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
    console.log("ACTIVE LANG", this.activeLang);
  }

  switchLanguage(lang: string): void {
    this.translocoService.setActiveLang(lang);
    this.activeLang = lang;
    console.log("ACTIVE LANG", this.activeLang);

    // Save the language preference in a cookie
    this.cookieService.setCookie('lang', lang);

    // Update the URL with the selected language without navigating
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { lang: lang },
      queryParamsHandling: 'merge', // Keep other query params
      replaceUrl: true // Replace the URL without adding to history
    });
  }
}
