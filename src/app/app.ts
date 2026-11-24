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

  termoBusca: string = "";

  constructor(protected auth: AuthService) {
    if (typeof location !== 'undefined' && location.pathname.includes('busca')) {
      this.termoBusca = new URLSearchParams(location.search).get('termo') ?? "";
    }
  }

  sair() {
    this.auth.sair();
    location.href = "./feed";
  }

  buscar(termo: string) {
    termo = termo.trim();
    location.href = termo ? "./busca?termo=" + encodeURIComponent(termo) : "./busca";
  }
}
