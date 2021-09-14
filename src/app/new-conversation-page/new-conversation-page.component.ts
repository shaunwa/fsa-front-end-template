import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { ConversationsService } from '../conversations.service';
import { User } from '../types';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-new-conversation-page',
  templateUrl: './new-conversation-page.component.html',
  styleUrls: ['./new-conversation-page.component.css']
})
export class NewConversationPageComponent implements OnInit {
  nameValue: string = '';
  currentUser: firebase.User | null = null;
  users: User[] = [];
  memberIds: string[] = [];

  constructor(
    private router: Router,
    private conversationsService: ConversationsService,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this.usersService.getCurrentUser()
      .subscribe(user => this.currentUser = user);

    this.usersService.getAllUsers()
      .subscribe(users => this.users = users);
  }

  addMemberId(id: string): void {
    this.memberIds.push(id);
  }

  createConversation(): void {
    this.conversationsService.createConversation(this.nameValue, this.memberIds)
      .subscribe(newGroupId => this.router.navigateByUrl(`/conversations/${newGroupId}`));
  }

}
