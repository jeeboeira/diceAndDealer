import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';                             // Importa o AuthGuard para proteger rotas

// Define as rotas disponíveis na aplicação
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'                                                       // Redireciona para login se for o path raiz
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage)             // Lazy-load da página de login
  },
  {
        path: 'roll',
        loadComponent: () =>
          import('./pages/roll/roll.page').then(m => m.RollPage),               // Página da rolagem de dados
        canActivate: [AuthGuard]                                                // Protege a rota com o AuthGuard
      },
      {
        path: 'history',
        loadComponent: () =>
      import('./pages/history/history.page').then(m => m.HistoryPage)       // Página de histórico
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then( m => m.TabsPage)
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile.page').then(m => m.ProfilePage),         // Página de perfil
        canActivate: [AuthGuard]                                                // Protege a rota com o AuthGuard
      }
    ]
}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) // Habilita o pré-carregamento
  ],
  exports: [RouterModule]                                                   // Exporta para ser usado pela aplicação
})
export class AppRoutingModule {}
