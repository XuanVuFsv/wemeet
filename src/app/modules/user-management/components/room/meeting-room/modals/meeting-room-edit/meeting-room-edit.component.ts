import { EMPTY, Subject } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, debounceTime } from 'rxjs/operators';
import { ApiService } from '@app/data/api.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

interface IBuilding {
  id: string;
  name: string;
}

@UntilDestroy()
@Component({
  selector: 'app-meeting-room-edit',
  templateUrl: './meeting-room-edit.component.html',
  styleUrls: ['./meeting-room-edit.component.scss']
})
export class MeetingRoomEditComponent implements OnInit {
  @Input() dataEdit: any;
  registerForm!: FormGroup;
  isLoading: boolean = false;
  listBuilding: IBuilding[] = [];
  isLoadingSelect: boolean = false;
  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.id === o2.id : o1 === o2);
  valueSearch = new Subject();
  searchValue: string = '';
  beforeSearchValue: string = '';
  pageIndexSelect: number = 1;
  totalBuilding: number = 0;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.getListOption();
    this.initForm();
    this.valueSearch.pipe(debounceTime(1000)).subscribe((resp: any) => {
      this.searchValue = resp;
      this.pageIndexSelect = 1;

      if (this.beforeSearchValue !== resp) {
        this.listBuilding = [];
        this.getListOption(1, resp);
      }
    });
  }

  initForm() {
    this.registerForm = this.formBuilder.group(
      {
        name: [this.dataEdit?.name ?? '', [Validators.required]],
        capacity: [this.dataEdit?.capacity ?? '', [Validators.required]],
        building: [this.dataEdit?.building ?? '', [Validators.required]]
      },
      {
        updateOn: 'blur'
      }
    );
  }

  onSearch(value: string): void {
    this.valueSearch.next(value);
  }

  loadMoreOptionSupplier() {
    if (this.listBuilding.length < this.totalBuilding) {
      this.getListOption(++this.pageIndexSelect, this.searchValue);
    }
  }

  getListOption(pageNumber: number = 1, search: string = ''): any {
    this.isLoadingSelect = true;
    return this.apiService
      .get(
        `/building?page[size]=8&page[number]=${pageNumber}${
          search ? '&filter[name]=' + search : ''
        }&sort=-created_at`
      )
      .pipe(
        debounceTime(500),
        untilDestroyed(this),
        catchError(err => {
          return EMPTY;
        })
      )
      .subscribe(resp => {
        this.isLoadingSelect = false;
        this.totalBuilding = resp.body.pagination.total;
        let listResp = resp.body.data.map((item: any) => ({
          id: item.id,
          name: item.name
        }));
        this.beforeSearchValue = search;
        this.listBuilding = this.listBuilding.concat(listResp);
        console.log(this.listBuilding);
      });
  }

  create() {
    this.formIsValid();
  }

  formIsValid(): boolean {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();

      for (const i in this.registerForm.controls) {
        if (this.registerForm.controls.hasOwnProperty(i)) {
          this.registerForm.controls[i].markAsDirty();
          this.registerForm.controls[i].updateValueAndValidity();
        }
      }
      return false;
    }
    return true;
  }
}
