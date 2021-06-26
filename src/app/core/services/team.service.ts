import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@data/api.service';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { tap, switchMap, map, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
    private apiService: ApiService
  ) {}

  getAllUser(pageNumber, pageSize, filter: string, sort: string = 'created_at') {
    let params = new HttpParams().set('pageNumber', pageNumber);
    params.append('pageSize', pageSize);
    params.append('filter', filter);
    params.append('sort', sort);

    return this.apiService.get('/users', {
        params: params
      }).pipe();
  }

  addUser(body: any) {
    return this.apiService.post('/users/create-user', body).pipe();
  }

  removeUser(body: any) {
    return this.apiService.post('/users/create-user', body).pipe();
  }

  getUserByEmail(email: string) {
    return this.apiService.get('/users/' + email).pipe();
  }

  editUser(body: any) {
    return this.apiService.put('/users', body).pipe();
  }

  getAllTeam(pageNumber, pageSize, filter: string, sort: string = 'created_at') {
    let params = new HttpParams().set('pageNumber', pageNumber);
    params.append('pageSize', pageSize);
    params.append('filter', filter);
    params.append('sort', sort);

    return this.apiService.get('/team', {
        params: params
      }).pipe();
  }

  getTeam(id: string) {
    return this.apiService.get('/team/' + id).pipe();
  }

  createTeam(body: any) {
    return this.apiService.post('/team', body).pipe();
  }

  editTeam(body: any) {
    return this.apiService.put('/team', body).pipe();
  }


}
