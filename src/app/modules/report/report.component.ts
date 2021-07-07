import { Router } from '@angular/router';
import { catchError, filter } from 'rxjs/operators';
import { TeamService } from './../../core/services/team.service';
import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { EMPTY } from 'rxjs';
// import { IAccLoadedEventArgs } from '@syncfusion/ej2-angular-charts';
// import { ILoadedEventArgs, Series, ChartTheme, ChartComponent } from '@syncfusion/ej2-angular-charts';
// import { getElement } from '@syncfusion/ej2-charts'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, AfterViewInit {
  public data: Object[];
  public chartTitle: string;
  public chartLabel: Object;
  public legend1: Object;
  public legend2: Object;
  public legend3: Object;
  public tooltipSettings: Object;
  public palette: string[];
  countMeeting;

  public usersStatus: Object[];
  countUsersStatus;
  public roleStatus: Object[];
  countRoleStatus;

  @Input() allowDownload: boolean = true;
  @ViewChild('statusChart') statusChart: any;
  @ViewChild('roleChart') roleChart: any;  


  constructor(private teamService: TeamService, private route: Router) {
    this.chartTitle = "Biểu đồ cuộc họp theo nhãn";
    this.data = [
      { name: 'Quan trọng', value: 37, text: "37%"},
      { name: 'Bắt buộc', value: 23, text: "23%"},
      { name: 'Khẩn', value: 25, text: "25%"},
      { name: 'Thông thường', value: 15, text: "15%"},
    ];

    this.usersStatus = [
      { name: 'Đang hoạt động', value: 0, text: ""},
      { name: 'Khóa', value: 0, text: ""},
    ];

    this.roleStatus = [
      { name: 'Dev', value: 0, text: ""},
      { name: 'BA', value: 0, text: ""},
      { name: 'QA', value: 0, text: ""},
      { name: 'QC', value: 0, text: ""},
      { name: 'None', value: 0, text: ""}
    ];

    this.chartLabel = {
      visible: true,
      position: "Inside",
      name: "text"
    };

    this.legend1 = {
      visible: true,
      position: "Bottom",
      height: "20%",
      width: "45%",
      alignment: "Center"
    };

    this.legend2 = {
      visible: true,
      position: "Bottom",
      height: "20%",
      width: "35%",
      alignment: "Center"
    };

    this.legend3 = {
      visible: true,
      position: "Bottom",
      height: "20%",
      width: "45%",
      alignment: "Center"
    };

    this.tooltipSettings = {
      enable: true,
      format: "${point.x} : <b>${point.y}%</b>"
    };

    this.palette = ["#60A5FA", "#4ADE80", "#F87171", "#A3A3A3", "#FCFC03"];

    this.countMeeting = {
      total: 100,
      important: 37,
      obligatory: 23,
      urgent: 25,
      normal: 15
    };

    this.countUsersStatus = {
      total: 0,
      is_active: 0,
      not_active: 0
    };

    this.countRoleStatus = {
      total: 0,
      Dev: 0,
      BA: 0,
      QA: 0,
      QC: 0,
      None: 0
    };
   }

  ngOnInit(): void {
    this.LoadUserStatus();
  }

  ngAfterViewInit() { 
 
    // After the view is initialized, chart will be available 
    // this.update(); 
  }

  LoadUserStatus(): void {
    this.teamService
      .getAllUser()
      .pipe(
        catchError(err => {
          return EMPTY;
        })
      )
      .subscribe(result => {
        this.countUsersStatus.total = this.countRoleStatus.total = result.body.data.length;
        this.countUsersStatus.is_active = result.body.data.filter(user => user.is_active).length;
        this.countUsersStatus.not_active =  this.countUsersStatus.total - this.countUsersStatus.is_active;
        this.usersStatus[0]['value'] = this.countUsersStatus.is_active * 100 / this.countUsersStatus.total;
        this.usersStatus[1]['value'] = 100 - this.usersStatus[0]['value'];
        this.statusChart.series[0].dataSource = this.usersStatus;
        this.statusChart.refresh();

        this.countRoleStatus.Dev = result.body.data.filter(user => user.position == "Dev").length;
        this.countRoleStatus.BA = result.body.data.filter(user => user.position == "BA").length;
        this.countRoleStatus.QA = result.body.data.filter(user => user.position == "QA").length;
        this.countRoleStatus.QC = result.body.data.filter(user => user.position == "QA").length;
        this.countRoleStatus.None = 100 - this.countRoleStatus.Dev - this.countRoleStatus.BA - this.countRoleStatus.QA - this.countRoleStatus.QC;
        this.roleStatus[0]['value'] = this.countRoleStatus.Dev * 100 / this.countRoleStatus.total;
        this.roleStatus[1]['value'] = this.countRoleStatus.BA * 100 / this.countRoleStatus.total;
        this.roleStatus[2]['value'] = this.countRoleStatus.QA * 100 / this.countRoleStatus.total;
        this.roleStatus[3]['value'] = this.countRoleStatus.QC * 100 / this.countRoleStatus.total;
        this.roleStatus[4]['value'] = 100 - this.roleStatus[0]['value'] - this.roleStatus[1]['value'] - this.roleStatus[2]['value'] - this.roleStatus[3]['value'];
        this.roleChart.series[0].dataSource = this.roleStatus;
        this.roleChart.refresh();
      });
  }

  public openPDF():void {
    let DATA = document.getElementById('htmlData');
        
    html2canvas(DATA).then(canvas => {
        
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
        PDF.save('angular-demo.pdf');
    });     
    }

    GotoPreview() {
      this.route.navigateByUrl('/preview-report');
    }
}
