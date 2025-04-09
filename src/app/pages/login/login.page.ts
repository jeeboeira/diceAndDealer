import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service'; // Serviço para autenticação
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule]
})
export class LoginPage {
  email = '';                                 //  Armazena o e-mail digitado
  password = '';                              //  Armazena a senha digitada

  constructor(
    private authService: AuthService,         // Serviço que lida com a API de autenticação
    private toastController: ToastController, // Componente para mostrar notificações
    private router: Router                  // Para navegação entre páginas
  ) { }

  // Função chamada ao enviar o formulário
  async login() {

    console.log('[LoginPage] Botão de login clicado');

    if (this.email.trim() && this.password.trim()) {
      const success = await this.authService.login(this.email, this.password); // Chama o serviço de autenticação

    if (success) {
      console.log('Marco 5 [LoginPage] Login OK, redirecionando...');
      this.router.navigateByUrl('/roll');                              // Redireciona para a página inicial
    } else {
      const toast = await this.toastController.create({
        message: 'Email ou senha incorretos!',                               // Mensagem de erro
        duration: 2000,                                                      // Duração do toast
        color: 'danger'                                                      // Cor do toast
    });
      toast.present();                                                      // Mostra o toast
    }
  } else {
    const toast = await this.toastController.create({
      message: 'Por favor, preencha todos os campos!',
      duration: 2000,
      color: 'warning'
    });
    toast.present();
    }
  }
}
