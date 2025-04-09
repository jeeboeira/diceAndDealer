import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { environment } from "src/environments/environment"      // Importa o ambiente de configuração

@Injectable({ providedIn: "root" })
export class RollService {
    private api = environment.apiUrl;                           // URL da API

    constructor(private http: HttpClient) {}                    // Injeta o HttpClient para fazer requisições HTTP

    // Função para recuperar o histórico de rolagens
    getHistory(token: string) {
        return this.http.get<any[]>(`${this.api}/rolls/history`, {
            headers: {
                Authorization: `Bearer ${token}`                // Adiciona o token de autenticação no cabeçalho
            },
        });
    }

    // Função para salvar uma nova rolagem
    saveRoll(result: number, token: string, dado: string = 'd6') {
        return this.http.post(`${this.api}/rolls`, { rollResult: result, dado }, {
            headers: {
                Authorization: `Bearer ${token}`                // Adiciona o token de autenticação no cabeçalho
            },
        });
    }
}
