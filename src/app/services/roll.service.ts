import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"

@Injectable({ providedIn: "root" })
export class RollService {
    private api = 'http://localhost:3000' // URL da API

    constructor(private http: HttpClient) {} // Injeta o HttpClient para fazer requisições HTTP

    // Função para recuperar o histórico de rolagens
    getHistory(token: string) {
        return this.http.get<any[]>(`${this.api}/rolls`, {
            headers: {
                Authorization: `Bearer ${token}` // Adiciona o token de autenticação no cabeçalho
            },
        });
    }

    // Função para salvar uma nova rolagem
    saveRoll(result: number, token: string) {
        return this.http.post(`${this.api}/rolls`, { result }, {
            headers: {
                Authorization: `Bearer ${token}` // Adiciona o token de autenticação no cabeçalho
            },
        });
    }
}
