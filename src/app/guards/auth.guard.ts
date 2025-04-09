import { Injectable } from "@angular/core"
import { CanActivate, Router } from "@angular/router"
import { AuthService } from "../services/auth.service"                // Serviço de autenticação

@Injectable({
  providedIn: "root"                                                  // Torna o guard global na aplicação
})

// Guard para proteger rotas que requerem autenticação
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,                                 // Serviço de autenticação
    private router: Router                                            // Roteador para navegação
  ) {}

  // Método que verifica se o usuário pode acessar a rota
  async canActivate(): Promise<boolean> {
    const isAuthenticated = await this.authService.isAuthenticated()  // Verifica se o usuário está autenticado

    if (!isAuthenticated) {

      console.warn(" Marco 6 [AuthGuard] Usuário não autenticado, redirecionando para /login");

      this.router.navigate(["/login"])                                // Redireciona para a página de login se não estiver autenticado
      return false;                                                 // Retorna falso para impedir o acesso à rota
    } 
    console.log(" Marco 7 [AuthGuard] Usuário autenticado, acesso liberado");
    return true;                                                      // Nunca vai chegar aqui, mas é necessário para o tipo
  }
}
