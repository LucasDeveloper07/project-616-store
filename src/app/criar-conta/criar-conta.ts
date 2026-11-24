import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente-service';

@Component({
  selector: 'app-criar-conta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './criar-conta.html',
  styleUrl: './criar-conta.css'
})
export class CriarConta {
  cliente: Cliente = new Cliente();
  confirmarSenha: string = "";
  mensagem: string = "";
  tipoMensagem: string = "erro";
  carregando: boolean = false;
  mostrarSenha: boolean = false;
  mostrarConfirmar: boolean = false;

  constructor(private service: ClienteService, private cd: ChangeDetectorRef) {}

  cadastrar() {
    if (this.cliente.senha != this.confirmarSenha) {
      this.mensagem = "As senhas não conferem!";
      this.tipoMensagem = "erro";
      return;
    }

    this.mensagem = "";
    this.carregando = true;
    this.cliente.ativo = 1;

    this.service.cadastrar(this.cliente).subscribe({
      next: () => {
        this.mensagem = "Conta criada com sucesso! Redirecionando para o login...";
        this.tipoMensagem = "sucesso";
        this.cd.detectChanges();
        setTimeout( () => location.href = "./login", 1500 );
      },
      error: () => {
        this.carregando = false;
        this.mensagem = "Ocorreu um erro, tente novamente mais tarde!";
        this.tipoMensagem = "erro";
        this.cd.detectChanges();
      }
    });
  }
}