import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FriendResolver } from './friend-resolver';
import { FriendsComponent } from './friends/friends.component';
import { AuthGuard } from '../user/auth.guard';

const routes : Routes = [
  { path: 'friends', canActivate: [AuthGuard], component: FriendsComponent, resolve : {friend: FriendResolver}}
]

@NgModule({
  declarations: [FriendsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports : [FriendsComponent]
})
export class FriendsModule { }
