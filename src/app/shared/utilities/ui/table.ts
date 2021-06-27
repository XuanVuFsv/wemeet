import { AfterViewInit, Directive, ViewChild } from '@angular/core';
import { Repository } from '@data/repositories/repository';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NzTableComponent, NzTableQueryParams, NzTableSortOrder } from 'ng-zorro-antd/table';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup } from '@angular/forms';

export interface TableInterface {
  pageSizeChange(): Observable<number>;

  pageNumberChange(): Observable<number>;

  sortChange(): Observable<string>;

  filterChange(): Observable<any>;
}

export interface PaginationInterface {
  total?: number;
  currentPage?: number;
  lastPage?: number;
  perPage?: number;
}

@UntilDestroy()
@Directive()
export abstract class Table<T = any> implements TableInterface, AfterViewInit {
  @ViewChild('tableTempRef') _tableTempRef!: NzTableComponent;

  rows: T[] = [];
  pageIndex = 1;
  pageSize = 20;
  total = 1;
  isLoading = true;
  totalPages?: number;
  defaultQueryParams = {};
  filterForm!: FormGroup;
  typeSort: NzTableSortOrder | undefined = 'descend';
  sort: string = '-created_at';
  isFilter: boolean = false;
  goToFirstPage: boolean = false;

  selection = new SelectionModel<any>(true, []);
  protected hasPagination = true;
  private onFilter$ = new Subject<any>();
  private onSort$ = new Subject<any>();
  protected refresh$ = new Subject<boolean>();

  isAllSelected = (): boolean => {
    const numSelected = this.selection.selected.length;
    const numRows = this.rows.length;
    return numSelected === numRows;
  };

  masterToggle = (): void => {
    this.isAllSelected()
      ? this.selection.clear()
      : this.rows.forEach(row => this.selection.select(row));
  };

  abstract repository(): Repository<T>;

  pageSizeChange(): Observable<number> {
    return this._tableTempRef.nzPageSizeChange;
  }

  pageNumberChange(): Observable<number> {
    return this._tableTempRef.nzPageIndexChange;
  }

  // @ts-ignore
  sortChange(params?: NzTableQueryParams = { sort: [] }): Observable<any> {
    console.log(params);

    const { sort } = params;
    const currentSort = sort.find(item => item.value !== null);
    let sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;

    if (sortOrder && sortOrder !== 'ascend') {
      sortField = `-${sortField}`;
    }

    if (this.typeSort !== sortField) {
      this.typeSort = sortField;
      this.onSort$.next(this.typeSort);
    }

    return this.onSort$.asObservable();
  }

  filterChange(value?: any, goToFirstPage?: boolean): Observable<any> {
    this.goToFirstPage = !!goToFirstPage;
    // if (this.goToFirstPage) {
    //   this.gotoFirstPage();
    // }
    this.isFilter = true;
    this.onFilter$.next(value);
    return this.onFilter$.asObservable();
  }

  clearFilter(): void {
    this.filterForm.reset();
    this.filterChange({});
  }

  ngAfterViewInit(): void {
    if (this._tableTempRef) {
      this._tableTempRef.nzFrontPagination = !this.hasPagination;

      const pageNumber$ = this.pageNumberChange().pipe(startWith(this.pageIndex));
      const pageSize$ = this.pageSizeChange().pipe(startWith(this.pageSize));
      const filter$ = this.filterChange().pipe(startWith({}));
      const sort$ = this.sortChange().pipe(startWith(this.typeSort));
      const refresh$ = this.refresh$.pipe(startWith(false));

      combineLatest([pageNumber$, pageSize$, filter$, sort$, refresh$])
        .pipe(
          tap(() => (this.isLoading = true)),
          switchMap(params => {
            if (this.isFilter && this.goToFirstPage) {
              params[0] = 1; // go to first page (page 1)
              this.isFilter = false;
            }

            return this.fetch(...params);
          }),
          map((resp: any) => {
            if (!this.hasPagination) {
              return {
                data: resp?.data
              };
            }
            return {
              data: resp?.data,
              ...resp.pagination
            };
          })
        )
        .subscribe(resp => {
          console.log(resp);

          this.isLoading = false;
          this.rows = [...resp.data];
          this.pageIndex = resp.current_page;
          this.pageSize = resp.per_page;
          this.total = resp.total;
          this.totalPages = resp.total_page;
        });
    }
  }

  changePageSize(size: number): void {
    this._tableTempRef.nzPageSizeChange.emit(size);
    this._tableTempRef.nzPageIndexChange.emit(1);
  }

  gotoFirstPage(): void {
    this._tableTempRef.nzPageIndexChange.emit(1);
  }

  gotoEndPage(): void {
    this._tableTempRef.nzPageIndexChange.emit(this.totalPages);
  }

  refreshCurrentPage(): void {
    this.refresh$.next(true);
  }

  clearNull(obj: any): any {
    for (const name in obj) {
      if (
        (obj.hasOwnProperty(name) && obj[name] === null) ||
        obj[name] === undefined ||
        obj[name] === ''
      ) {
        delete obj[name];
      }
    }
    return obj;
  }

  protected fetch(
    pageNumber: number,
    pageSize: number,
    filter: any,
    sort: string,
    refresh: boolean
  ): Observable<any> {
    let httpQuery = {
      page: { size: pageSize, number: pageNumber },
      filter: { ...this.clearNull(filter) },
      sort: { sort: this.sort }
    };

    httpQuery = Object.assign(httpQuery, this.defaultQueryParams);

    if (sort) {
      httpQuery.sort = { sort: this.sort };
    }
    if (!this.hasPagination) {
      // @ts-ignore
      delete httpQuery.page;
    }
    return this.repository().all(httpQuery);
  }
}
