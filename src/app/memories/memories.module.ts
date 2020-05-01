import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LocationComponent } from './location/location.component';
import { MemoryAddComponent } from './memory-add/memory-add.component';
import { MemoryDetailComponent } from './memory-detail/memory-detail.component';
import { MemoryEditComponent } from './memory-edit/memory-edit.component';
import { MemoryListComponent } from './memory-list/memory-list.component';
import { MemoryFilterPipe } from './memory-filter-pipe';
import { MemoryResolver } from './MemoryResolver';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes : Routes = [
  { path: 'memories', component: MemoryListComponent },
  { path: 'memories/add', component: MemoryAddComponent },
  { path: 'memories/:id', component: MemoryDetailComponent, resolve:{ memory: MemoryResolver} }, 
  { path: 'memories/:id/edit', component: MemoryEditComponent, resolve:{memory: MemoryResolver}}
]

@NgModule({
  declarations: [LocationComponent, MemoryAddComponent, MemoryDetailComponent,
  MemoryEditComponent, MemoryListComponent, MemoryFilterPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)  
  ],
  exports: [ 
        MemoryListComponent]
})
export class MemoriesModule { } 





