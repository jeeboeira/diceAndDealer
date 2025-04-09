import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@awesome-cordova-plugins/device-motion/ngx';
import { Subscription } from 'rxjs';
import { RollService } from 'src/app/services/roll.service';
import { Storage } from '@ionic/storage-angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-roll',
  templateUrl: './roll.page.html',
  styleUrls: ['./roll.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule]
})
export class RollPage implements OnInit, OnDestroy {
  acceleration: DeviceMotionAccelerationData = { x: 0, y: 0, z: 0, timestamp: 0 };    // Dados de aceleração do dispositivo
  shakeThreshold: number = 15;                                                        // Threshold for shake detection
  watch: Subscription = new Subscription();                                           // Subscription para verificar se o dispositivo está em movimento
  rolledNumber: number = 0;                                                           // Número rolado
  token: string = '';                                                                 // Token de autenticação
  isRolling = false;                                                                  // Flag para verificar se o dado está rolando

  constructor(
    private deviceMotion: DeviceMotion,
    private rollService: RollService,
    private storage: Storage,
    private navController: NavController                                             // Injeta o NavController para navegação
  ) { }

  async ngOnInit() {
    await this.storage.create();                                                      // Cria a instância do Storage
    this.token = await this.storage.get('token');                                    // Recupera o token do armazenamento local
    
    if (!this.token) {
      this.navController.navigateRoot('/login');
      return;
    }

    // Inicia a detecção de movimento
    this.watch = this.deviceMotion.watchAcceleration({ frequency: 500 }).subscribe(
      acc => { this.acceleration = acc;                                                // Armazena os dados de aceleração}
      
      // Verifica se o movimento passa o threshold
      const totalForce = Math.abs(acc.x) + Math.abs(acc.y) + Math.abs(acc.z);
      if (totalForce > this.shakeThreshold) {
        this.rollDice();                                                              // Chama a função para rolar o dado
      }
    });
  }

  // Função para rolar o dado
  rollDice() {
    if (this.isRolling) return;                                                       // Impede múltiplas execuções  // Verifica se o dado já está rolando
  
    this.isRolling = true;                                                            // Define a flag para indicar que o dado está rolando
    
    setTimeout(() => {
    this.rolledNumber = Math.floor(Math.random() * 6) + 1;                            // Gera um número aleatório entre 1 e 6
    console.log('Rolled number:', this.rolledNumber);                                 // Loga o número rolado

    this.rollService.saveRoll(this.rolledNumber, this.token).subscribe({
      next: () => console.log('Rolagem Salva com sucesso'),
      error: err => console.error('Erro ao salvar:', err)
    });

    this.isRolling = false;                                                           // Reseta a flag após 2 segundos
    }, 600);                                                                          // Tempo da animação
  }

  // Limpa a assinatura quando o componente é destruído
  ngOnDestroy() {
    if (this.watch) {                                                                 // Verifica se a assinatura existe
      this.watch.unsubscribe();                                                       // Cancela a assinatura
    }
  }
}


