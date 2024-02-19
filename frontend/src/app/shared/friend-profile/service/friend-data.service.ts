import { Injectable } from '@angular/core';

@Injectable()
export class FriendProfileDataService {
  private userId: number | null = null;

  constructor() {}

  setUserId(userId: number): void {
    this.userId = userId;
  }

  getUserId(): number | null {
    return this.userId;
  }
}
