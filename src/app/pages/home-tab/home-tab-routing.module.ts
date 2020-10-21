import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeTabPage } from './home-tab.page';

const routes: Routes = [
  {
    path: '',
    component: HomeTabPage,
    children:[
      { 
        path: 'home',
        children: [
          { 
            path:'',
            loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      { 
        path: 'ticket',
        children: [
          { 
            path:'',
            loadChildren: () => import('../ticket-information/ticket-information.module').then(m => m.TicketInformationPageModule)
          }
        ]
      },
      { 
        path: 'list',
        children: [
          { 
            path:'',
            loadChildren: () => import('../movie-list/movie-list.module').then(m => m.MovieListPageModule)
          }
        ]
      },
      { 
        path:'',
        redirectTo: '/home-tab/home',
        pathMatch: 'full'
      }
    ]
  },
  { 
    path:'',
    redirectTo: '/home-tab/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeTabPageRoutingModule {}
