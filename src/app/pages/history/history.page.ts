import { Component, OnInit } from '@angular/core';
import { RollService } from 'src/app/services/roll.service';
import { Storage } from '@ionic/storage-angular';
import { AlertController, ToastController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule]
})
export class HistoryPage implements OnInit {
  rolls: any[] = [];                                              // Armazena o histórico de rolagens
  token: string = '';                                             // Armazena o token do usuário

  constructor(
    private rollService: RollService,
    private storage: Storage,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  async ngOnInit() {
    await this.storage.create();                                  // Cria a instância do Storage
    this.token = await this.storage.get('token');                 // Obtém o token do armazenamento

    this.loadHistory();                                           // Carrega o histórico de rolagens
  }

loadHistory() {
    this.rollService.getHistory(this.token).subscribe(
      (response: any) => {
        this.rolls = response;                                   // Armazena a resposta na variável rolls
      },
      (error: any) => {
        console.error('Erro ao obter o histórico:', error);       // Exibe erro no console
      }
    );
  }

  async deleteRoll(rollId: string) {
    await this.rollService.deleteRoll(rollId, this.token).toPromise();  // Chama o serviço para deletar a rolagem
    this.showToast('Rolagem deletada com sucesso!');                    // Exibe mensagem de sucesso
    this.loadHistory();                                                 // Atualiza o histórico
  }

  async editRoll(roll: any) {
    const alert = await this.alertController.create({
      header: 'Editar Rolagem',
      inputs: [
        {
          name: 'rollResult',
          type: 'number',
          value: roll.rollResult,                                       // Preenche o campo com o valor atual da rolagem
          min: 1,
          max: 6
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Salvar',
          handler: async (data) => {

            if (data.rollResult < 1 || data.rollResult > 6) {
              this.showToast('Valor inválido. Deve ser entre 1 e 6!');
              return;
            }
            
            await this.rollService.updateRoll(roll._id, data.rollResult, this.token).toPromise(); // Chama o serviço para editar a rolagem
            this.showToast('Rolagem atualizada!');                                                // Exibe mensagem de sucesso
            this.loadHistory();                                                                   // Atualiza o histórico
          }
        }
      ]
    });

    await alert.present();                                                                        // Apresenta o alerta
    await alert.onDidDismiss();                                                                   // Aguarda o alerta ser fechado
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'success'
    });
    toast.present();                                                                               // Apresenta o toast
  }

  async ionViewWillEnter() {
    this.loadHistory();  // <-- isso aqui garante o carregamento ao entrar na aba
  }
}