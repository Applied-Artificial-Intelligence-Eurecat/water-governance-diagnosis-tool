import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { filter } from 'rxjs';
import { CookieService } from './services/cookie.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'innwater-governance-assessment';
  hideFooter = false;

  constructor(
    private translocoService: TranslocoService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {
    const rawLangs = this.translocoService.getAvailableLangs();
    const availableLangs: string[] = rawLangs.map(lang =>
      typeof lang === 'string' ? lang : lang.id
    );

    // Check for language cookie first
    const cookieLang = this.cookieService.getCookie('lang');
    if (cookieLang && availableLangs.includes(cookieLang)) {
      this.translocoService.setActiveLang(cookieLang);
    } else {
      // If no cookie, use browser language or default to 'en'
      const browserLang = navigator.language.split('-')[0];
      const defaultLang = availableLangs.includes(browserLang) ? browserLang : 'en';
      this.translocoService.setActiveLang(defaultLang);
      // Save the language preference in a cookie
      this.cookieService.setCookie('lang', defaultLang);
    }

    // Check for footer cookie
    const hideFooterCookie = this.cookieService.getCookie('hide_footer');
    if (hideFooterCookie === '1' || hideFooterCookie === 'true') {
      this.hideFooter = true;
    }

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Check for query parameters
        const queryParams = this.route.snapshot.queryParamMap;
        const queryLang = queryParams.get('lang');
        const hideFooterParam = queryParams.get('hide_footer');

        if (hideFooterParam === '1' || hideFooterParam === 'true') {
          this.hideFooter = true;
          this.cookieService.setCookie('hide_footer', '1');
        }

        // If a language is specified in the query parameters and it's valid, use it
        if (queryLang && availableLangs.includes(queryLang)) {
          this.translocoService.setActiveLang(queryLang);
          // Update the cookie with the new language
          this.cookieService.setCookie('lang', queryLang);
        } else {
          // Traverse to the deepest activated route for route parameters
          let currentRoute = this.route.root;
          while (currentRoute.firstChild) {
            currentRoute = currentRoute.firstChild;
          }

          const routeLang = currentRoute.snapshot.paramMap.get('lang');

          // If a language is specified in the route and it's valid, use it
          if (routeLang && availableLangs.includes(routeLang)) {
            this.translocoService.setActiveLang(routeLang);
            // Update the cookie with the new language
            this.cookieService.setCookie('lang', routeLang);
          }
        }
      });
  }


}
