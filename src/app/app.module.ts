import { BrowserModule } from '@angular/platform-browser'; //importeren libraries of andere modules die je maakte
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MemoryListComponent } from './memories/memory-list/memory-list.component';
import { LocationComponent } from './memories/location/location.component';
import { AddMemoryComponent } from './memories/add-memory/add-memory.component';
import { HttpClientModule } from '@angular/common/http';
import { MemoryFilterPipe } from './memories/memory-filter-pipe';
import { MemoryDetailComponent } from './memories/memory-detail/memory-detail.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes : Routes = [
  { path: 'memories', component: MemoryListComponent },
  { path: 'memories/:id', component: MemoryDetailComponent },
  { path: 'memories/add', component: AddMemoryComponent },
  { path: 'home', component: LandingpageComponent},
  { path: '', redirectTo: 'memories', pathMatch: 'full'},
  { path: '**', redirectTo: 'memories', pathMatch: 'full'}
]

@NgModule({
  declarations: [  //hier komen componenten die tot de module behoren
    AppComponent, MemoryListComponent, LocationComponent, AddMemoryComponent, MemoryFilterPipe, MemoryDetailComponent, LandingpageComponent, NavbarComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent] //de startcomponent van onze applicatie
})

export class AppModule { }
