import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LayoutEnum } from '@core/enum/layout.enum';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  // tslint:disable-next-line:variable-name
  private _layout = new Subject<LayoutEnum>();
  layout$ = this._layout.asObservable();
  // tslint:disable-next-line:variable-name
  private _loading = new BehaviorSubject<boolean>(true);
  loading$ = this._loading.asObservable();

  constructor() {}

  setLoading(loading: boolean): void {
    this._loading.next(loading);
  }

  setLayout(value: LayoutEnum): void {
    this._layout.next(value);
  }
}
