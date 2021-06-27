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

  getAllUser(pageNumber = 1, pageSize = 10, filter:string = '', sort: string = 'created_at') {
    // let params = new HttpParams().set('pageNumber', pageNumber);
    // params.append('pageSize', pageSize);
    // params.append('filter', filter);
    // params.append('sort[]', sort);
    let params = new HttpParams().set('sort[]', sort);

    return this.apiService.get('/users', {
        params: params
      }).pipe();
  }

  // createUser(body: any) {
  //   return this.apiService.post('/users/create-user', body).pipe();
  // }

  // removeUser(body: any) {
  //   return this.apiService.post('/users/create-user', body).pipe();
  // }

  getUserByEmail(email: string) {
    return this.apiService.get('/users/get-by-email/' + email).pipe();
  }

  // editUser(body: any) {
  //   return this.apiService.put('/users', body).pipe();
  // }

  getAllTeam(pageNumber, pageSize, filterField: string, filterValue: string, sort: string = 'created_at') {
    // let params = new HttpParams().set('page[number]', pageNumber);
    // params.append('page[size]', pageSize);
    // // if (filter != null) params.append('filterField[' + filter + ']', filterValue);
    // console.log(params);
    // return this.apiService.get('/team', {
    //     params: params
    //   }).pipe();
    return this.apiService.get('/team'+'?page[number]='+pageNumber+'&page[size]='+pageSize).pipe();
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

  addUserToTeam(body: any) {
    return this.apiService.post('/team/add-user', body).pipe();
  }

  removeUserFromTeam(body: any) {
    return this.apiService.put('/team/remove-user', body).pipe();
  }

}
