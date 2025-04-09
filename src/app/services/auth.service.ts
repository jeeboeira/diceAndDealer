import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Router } from "@angular/router"
import { Storage } from "@ionic/storage-angular"
import { environment } from "src/environments/environment"
import { firstValueFrom } from "rxjs"

@Injectable({
  providedIn: "root"                                                           // Torna o serviço global em toda a aplicação
})

export class AuthService {
    private api = environment.apiUrl                                           // URL da API
    private _storage: Storage | null = null;


    constructor(
        private http: HttpClient,                                              // Cliente HTTP para fazer requisições
        private router: Router,                                                // Roteador para navegação
        private storage: Storage                                               // Armazenamento local para persistir dados
    ) {    
        this.init();                                                           // Inicializa o armazenamento
    }      
    
    // Inicializa o armazenamento local    
    async init() {     
        this._storage = await this.storage.create();                                           // Cria o armazenamento se não existir
    }

    // Função de login: envia email e password, armazena o token e redireciona
    async login(email: string, password: string): Promise<boolean> {

        console.log('[AuthService] Enviando login para:', this.api);
        console.log('[AuthService] Dados:', { email, password });
        
        try {
            const response: any = await firstValueFrom(this.http.post(`${this.api}/auth/login`, { 
                email, 
                password
            }));                                                               // Faz a requisição de login
                
            if (response.token) {                                              // Se o token for recebido
                await this._storage?.set("token", response.token);               // Armazena o token JW
                return true;                                                   // Retorna verdadeiro
            }      
            return false;                                                      // Retorna falso se não houver token
        } catch (error) {
            console.error("Login failed", error);                              // Loga o erro no console
            return false;                                                      // Retorna o erro
        }
    }
        
    // Função de logout: remove o token e redireciona para a página de login
    async logout(): Promise<void> {
        await this._storage?.remove("token");                                    // Remove o token do armazenamento
        this.router.navigateByUrl("/login", { replaceUrl: true });             // Redireciona para a página de login
    }

    // Função para verificar se o usuário está autenticado
    async isAuthenticated(): Promise<boolean> {
        const token = await this._storage?.get("token");                        // Obtém o token do armazenamento
        return !!token;                                                       // Retorna verdadeiro se o token existir
    }

    // Função para obter o token armazenado
    async getToken(): Promise<string | null> {
        return await this._storage?.get("token");                               // Retorna o token armazenado
    }
}