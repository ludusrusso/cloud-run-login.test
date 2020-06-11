import { Component } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cloud-run-login';

  user$ = this.authService.authState;

  constructor(
    private authService: AuthService,
    private readonly http: HttpClient
  ) {}

  login(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logout(): void {
    this.authService.signOut();
  }

  async call() {
    const user = await this.authService.authState.pipe(take(1)).toPromise();
    const url = 'APP URL';
    const res = await this.http
      .get(url, {
        headers: { authorization: `Bearer ${user.idToken}` },
      })
      .toPromise();
  }
}
