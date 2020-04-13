import { BrowserModule } from '@angular/platform-browser'; //importeren libraries of andere modules die je maakte
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MemoryListComponent } from './memories/memory-list/memory-list.component';

@NgModule({
  declarations: [  //hier komen componenten die tot de module behoren
    AppComponent, MemoryListComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent] //de startcomponent van onze applicatie
})

export class AppModule { }
