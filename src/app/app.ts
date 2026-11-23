import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './service/auth-service';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('project-616-store');

  constructor(protected auth: AuthService) {}

  sair() {
    this.auth.sair();
    location.href = "./feed";
  }
}
