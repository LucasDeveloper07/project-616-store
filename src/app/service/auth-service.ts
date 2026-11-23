import { Injectable, Inject, PLATFORM_ID, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Cliente } from '../model/cliente';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly CHAVE = "cliente";
    readonly navegador: boolean;

    private cliente = signal<Cliente | null>(null);

    // somente leitura para quem usa o service
    readonly clienteRead = this.cliente.asReadonly();
    readonly logado = computed( () => this.cliente() != null );
    readonly primeiroNome = computed(() => {
        const nome = this.clienteRead()?.nome?.trim() ?? "";
        return nome.split(' ')[0];
    })

    constructor(@Inject(PLATFORM_ID) platformId: Object) {
        this.navegador = isPlatformBrowser(platformId);
        this.cliente.set(this.carregar());
    }

    // método chamado pelo login depois que a API confirmou e-mail e senha
    entrar(cliente: Cliente) {
        cliente.senha = ""; // não guardar a senha no navegador

        if (this.navegador) {
            localStorage.setItem(this.CHAVE, JSON.stringify(cliente));
        }

        this.cliente.set(cliente);
    }

    sair() {
        if (this.navegador) {
            localStorage.removeItem(this.CHAVE);
        }

        this.cliente.set(null);
    }

    private carregar(): Cliente | null {
        if (!this.navegador) return null;

        try {
            const json = localStorage.getItem(this.CHAVE);
            return json != null ? JSON.parse(json) : null;
        } catch {
            return null;
        }
    }
}
