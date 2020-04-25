import { BrowserModule } from '@angular/platform-browser'; //importeren libraries of andere modules die je maakte
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MemoryListComponent } from './memories/memory-list/memory-list.component';
import { LocationComponent } from './memories/location/location.component';
import { HttpClientModule } from '@angular/common/http';
import { MemoryFilterPipe } from './memories/memory-filter-pipe';
import { MemoryDetailComponent } from './memories/memory-detail/memory-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MemoryAddComponent } from './memories/memory-add/memory-add.component';
import { MaterialModule } from './material/material.module';
import { FriendsComponent } from './friends/friends.component';
import { MemoryEditComponent } from './memories/memory-edit/memory-edit.component';
import { MemoryResolver } from './memories/MemoryResolver';
import { FriendResolver } from './friends/friend-resolver';



const routes : Routes = [
  { path: 'memories', component: MemoryListComponent },
  { path: 'memories/add', component: MemoryAddComponent },
  { path: 'home', component: LandingpageComponent},
  { path: 'friends/:id', component: FriendsComponent, resolve : {friend: FriendResolver}},
  { path: 'memories/:id', component: MemoryDetailComponent, resolve:{ memory: MemoryResolver} }, 
  { path: 'memories/:id/edit', component: MemoryEditComponent, resolve:{memory: MemoryResolver}},
  { path: '', redirectTo: 'memories', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
]

@NgModule({
  declarations: [  //hier komen componenten die tot de module behoren
    AppComponent, MemoryListComponent, LocationComponent, MemoryFilterPipe, MemoryDetailComponent, LandingpageComponent, NavbarComponent, PageNotFoundComponent, MemoryAddComponent, FriendsComponent, MemoryEditComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent] //de startcomponent van onze applicatie
})

export class AppModule { }
