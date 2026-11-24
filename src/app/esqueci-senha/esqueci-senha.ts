import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../service/cliente-service';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-esqueci-senha',
  styleUrl: './esqueci-senha.css',
  templateUrl: './esqueci-senha.html',
})
export class EsqueciSenha {
  email: string = "";
  novaSenha: string = "";
  confirmarSenha: string = "";

  mensagem: string = "";
  tipoMensagem: string = "erro";
  carregando: boolean = false;

  mostrarNova: boolean = false;
  mostrarConfirmar: boolean = false;

  constructor(private service: ClienteService, private cd: ChangeDetectorRef) {}

  redefinir() {
    if (this.novaSenha !== this.confirmarSenha) {
      this.mensagem = "As senhas não conferem.";
      this.tipoMensagem = "erro";
      return;
    }

    this.mensagem = "";
    this.carregando = true;

    this.service.redefinirSenha(this.email, this.novaSenha).subscribe({
      next: () => {
        this.mensagem = "Senha alterada com sucesso! Redirecionando para o login...";
        this.tipoMensagem = "sucesso";
        this.cd.detectChanges();
        setTimeout(() => location.href = "./login", 1500);
      },
      error: (err) => {
        this.carregando = false;
        this.mensagem = err.status == 404
          ? "E-mail não cadastrado."
          : "Ocorreu um erro, tente novamente mais tarde!";
        this.tipoMensagem = "erro";
        this.cd.detectChanges();
      }
    });
  }
}
