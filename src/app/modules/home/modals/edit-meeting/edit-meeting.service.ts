import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditMeetingService {
  private _members = new BehaviorSubject<any[]>([]);
  members$ = this._members.asObservable();

  get members(): any[] {
    return this._members.getValue();
  }

  set members(value: any[]) {
    this._members.next(value);
  }
}
