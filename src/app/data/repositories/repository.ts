import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@data/api.service';
import { serialize } from '@shared/utilities/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type ResourceID = string | number;
export type HttpQuery = {
  [key: string]: any;
  filter?: { [key: string]: any };
  page?: { size: number; number: number };
  sort?: string;
  includes?: string;
};

export interface RepositoryInterface<T = any> {
  /**
   * Display a listing of the resource.
   */
  all(httpQuery?: HttpQuery): Observable<{ data: T[]; [key: string]: any }>;

  /**
   * Display the specified resource.
   */
  find(id: ResourceID, httpQuery?: HttpQuery): Observable<T>;

  /**
   * Store a newly created resource in storage.
   */
  create(httpBody: any | null, httpQuery?: HttpQuery): Observable<T>;

  /**
   * Update the specified resource in storage.
   */
  update(id: ResourceID, httpBody: any | null, httpQuery?: HttpQuery): Observable<T>;

  /**
   * Remove the specified resource from storage.
   */
  delete(id: ResourceID, httpQuery?: HttpQuery): Observable<void>;
}

@Injectable({
  providedIn: 'root'
})
export abstract class Repository<T = any> implements RepositoryInterface<T> {
  // tslint:disable-next-line:variable-name
  private readonly _resourceType: any;

  abstract resourceType(): string;

  protected constructor(private apiService: ApiService) {
    this._resourceType = this.resourceType();
  }

  /**
   * Display a listing of the resource.
   */
  all(httpQuery?: HttpQuery): Observable<{ data: T[]; [key: string]: any }> {
    return this.apiService.get(`${this._resourceType}`, { params: serialize(httpQuery) }).pipe(
      // Transform response
      map(resp => resp.body)
    );
  }

  find(id: ResourceID, httpQuery?: HttpQuery): Observable<T> {
    return this.apiService
      .get(`${this._resourceType}/${id}`, { params: serialize(httpQuery) })
      .pipe(
        // Transform response
        map(this.transform.bind(this))
      );
  }

  create(httpBody: any | null, httpQuery?: HttpQuery): Observable<T> {
    return this.apiService
      .post(`${this._resourceType}`, httpBody, { params: serialize(httpQuery) })
      .pipe(
        // Transform response
        map(this.transform.bind(this))
      );
  }

  update(id: ResourceID, httpBody: any, httpQuery?: HttpQuery): Observable<T> {
    return this.apiService
      .put(`${this._resourceType}/${id}`, httpBody, { params: serialize(httpQuery) })
      .pipe(
        // Transform response
        map(this.transform.bind(this))
      );
  }

  delete(id: ResourceID, httpQuery?: HttpQuery): Observable<void> {
    return this.apiService
      .delete(`${this._resourceType}/${id}`, { params: serialize(httpQuery) })
      .pipe(
        // Transform response
        map(this.transform.bind(this))
      );
  }

  protected transform(resp: HttpResponse<any>): any {
    // @ts-ignore
    if (typeof this['customTransform'] === 'function') {
      // @ts-ignore
      return this['customTransform'](resp);
    }
    return resp.body.data;
  }
}
