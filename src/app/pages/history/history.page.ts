import { Component, OnInit } from '@angular/core';
import { RollService } from 'src/app/services/roll.service';
import { Storage } from '@ionic/storage-angular';
import { IonicModule } from '@ionic/angular';
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
  rolls: any[] = [];                                          // Armazena o histórico de rolagens

  constructor(
    private rollService: RollService,
    private storage: Storage
  ) { }

  async ngOnInit() {
    await this.storage.create();                              // Cria a instância do Storage
    const token = await this.storage.get('token');            // Recupera o token do armazenamento local
    
    if (token) {
      this.rollService.getHistory(token).subscribe({
        next: (res) => {
          this.rolls = res;                                     // Armazena o histórico de rolagens
        },
        error: (err) => {
          console.error('Erro ao carregar o histórico:', err);  // Loga o erro no console
        }
      });
    }
  }
}