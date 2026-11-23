import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../service/cliente-service';
import { AuthService } from '../service/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email: string = "";
  senha: string = "";
  mensagem: string = "";
  carregando: boolean = false;

  constructor(
    private service: ClienteService,
    private auth: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  entrar() {
    this.mensagem = "";
    this.carregando = true;

    this.service.login(this.email, this.senha).subscribe({
      next: (cliente) => {
        this.carregando = false;

        if (cliente.codigo > 0) {
          this.auth.entrar(cliente);
          location.href = "./feed";
        } else {
          this.mensagem = "E-mail ou senha incorretos!";
        }

        this.cd.detectChanges();
      },
      error: () => {
        this.carregando = false;
        this.mensagem = "Ocorreu um erro, tente novamente mais tarde!";
        this.cd.detectChanges();
      }
    });
  }

}