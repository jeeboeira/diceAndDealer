import { Component } from "@angular/core";
import { IonicModule, NavController, ToastController } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class ProfilePage {

  constructor(
    private authService: AuthService,
    private navController: NavController,
    private toastController: ToastController
  ) { }

  async logout() {
    await this.authService.logout(); // Chama o serviço de logout
    this.navController.navigateRoot('/login'); // Redireciona para a página de login

    const toast = await this.toastController.create({
      message: 'Logout realizado com sucesso.',
      duration: 2000,
      position: 'top',
      color: 'success',
    });
    toast.present(); // Apresenta o toast de sucesso
    this.navController.navigateRoot('/login'); // Redireciona para a página de login
  }

  

}
