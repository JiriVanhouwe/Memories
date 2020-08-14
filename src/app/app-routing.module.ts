import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { AuthGuard } from './user/auth.guard';


const routes: Routes = [
  {
    path: 'memory',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./memories/memories.module').then((mod) => mod.MemoriesModule),
    data: { preload: true },
  },
  { path: 'home', component: LandingpageComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      //preloadingStrategy: SelectivePreloadStrategy,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
