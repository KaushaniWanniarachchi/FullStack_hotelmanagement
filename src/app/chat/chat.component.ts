import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

import { ChatService } from '../services/chat/chat.service';
import { User } from '../user';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public roomId: string;
  public messageText: string;
  public messageArray: { user: string; message: string }[] = [];
  private storageArray: any = [];

  public showScreen = false;
  public phone: string;

  public userList = [
    {
      id: 1,
      name: 'Admin',
      phone: '9876598765',
      image: 'assets/user/user-1.png',
      roomId: {
        2: 'room-1',
        3: 'room-2',
        4: 'room-3',
      },
    },
    {
      id: 2,
      name: 'user',
      phone: '9876543210',
      image: 'assets/user/user-2.png',
      roomId: {
        1: 'room-1',
        3: 'room-4',
        4: 'room-5',
      },
    },
  ];
  public currentUser: any;
  public selectedUser: any;
  userSubscription: any;
  userm: User;
  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.findMe().subscribe((user) => (this.userm = user));
    this.userSubscription = this.authService.user.subscribe(
      (user) => (this.userm = user)
    );
    // this.authService.getAllUsers().subscribe(userList =>{
    //   // console.log(userList)
    //   // this.userList = userList;
    // });
  }

  ngOnInit(): void {
    this.chatService
      .getMessage()
      .subscribe((data: { user: string; room: string; message: string }) => {
        this.messageArray.push(data);
        if (this.roomId) {
          console.log('ngOnInit: ', data);
          this.storageArray = this.chatService.getStorage();
          const storeIndex = this.storageArray.findIndex(
            (storage: any) => storage.roomId === this.roomId
          );
          console.log('storeIndex', storeIndex);
          if (storeIndex > -1) {
            this.storageArray[storeIndex].chats.push({
              user: data.user,
              message: data.message,
            });
          } else {
            const updateStorage = {
              roomId: this.roomId,
              chats: [
                {
                  user: data.user,
                  message: data.message,
                },
              ],
            };
            this.storageArray.push(updateStorage);
          }
          this.chatService.setStorage(this.storageArray);
          setTimeout(() => {
            this.storageArray = this.chatService.getStorage();
            const storeIndex = this.storageArray.findIndex(
              (storage: any) => storage.roomId === this.roomId
            );
            this.messageArray = this.storageArray[storeIndex].chats;
          }, 500);
        }
      });
  }

  ngAfterViewInit(): void {}

  login(dismiss: any): void {
    console.log(this.userList);
    this.currentUser = this.userList.find((user) => user.phone === dismiss);
    this.userList = this.userList.filter((user) => user.phone !== dismiss);
    // alert(this.currentUser.name)
  }

  selectUserHandler(phone: string): void {
    this.selectedUser = this.userList.find((user) => user.phone === phone);
    this.roomId = this.selectedUser.roomId[this.currentUser.id];
    this.messageArray = [];

    this.storageArray = this.chatService.getStorage();
    const storeIndex = this.storageArray.findIndex(
      (storage: any) => storage.roomId === this.roomId
    );

    if (storeIndex > -1) {
      this.messageArray = this.storageArray[storeIndex].chats;
    }

    this.join(this.currentUser.name, this.roomId);
  }

  join(username: string, roomId: string): void {
    this.chatService.joinRoom({ user: username, room: roomId });
  }

  sendMessage(): void {
    this.chatService.sendMessage({
      user: this.currentUser.name,
      room: 'room-1',
      message: this.messageText,
    });

    this.storageArray = this.chatService.getStorage();
    const storeIndex = this.storageArray.findIndex(
      (storage: any) => storage.roomId === this.roomId
    );

    if (storeIndex > -1) {
      this.storageArray[storeIndex].chats.push({
        user: this.currentUser.name,
        message: this.messageText,
      });
    } else {
      const updateStorage = {
        roomId: this.roomId,
        chats: [
          {
            user: this.currentUser.name,
            message: this.messageText,
          },
        ],
      };

      this.storageArray.push(updateStorage);
    }

    // this.chatService.setStorage(this.storageArray);
    this.messageText = '';
  }
}
