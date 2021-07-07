import { TeamService } from './../../core/services/team.service';
import { catchError } from 'rxjs/operators';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EMPTY } from 'rxjs';
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas'; 
import 'jspdf-autotable';
import { Router } from '@angular/router';
@Component({
  selector: 'app-preview-report',
  templateUrl: './preview-report.component.html',
  styleUrls: ['./preview-report.component.scss']
})
export class PreviewReportComponent implements OnInit {
  openPDF(): void {
    var data = document.getElementById('htmlData');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('report.pdf'); // Generated PDF   
    });  
    //#region 
    // const doc = new jsPDF("l", 'cm', "a4");
	
    // doc.addFont('././open-sans-v18-vietnamese_latin-300.ttf', 'open-sans-v18-vietnamese_latin-300', 'normal');
    // doc.setFontSize(14);
    // doc.setFont("open-sans-v18-vietnamese_latin-300");
    // doc.autoTable(this.headerTableUsers, this.users, {
    //     theme: 'striped',
    //     styles: { overflow: 'linebreak'},
    //     margin: { top: 5 },
  
    // });
    
    // doc.putTotalPages("Danh sách nhân viên")
    
    // doc.save('Test.pdf');
    //#endregion
  }

  public users: Object[];
  public room: Object[];
  public building: Object[];

  disable: boolean = false;
  disableUser: boolean = false;
  disableRoom: boolean = false;
  disableBuilding: boolean = false;
  disableChart: boolean = false;

  btnu: boolean = false;
  btnr: boolean = false;
  btnb: boolean = false;
  btnc: boolean = false;

  logo = '../../assets/images/logo/logo.png';

  @ViewChild('htmlData') htmlData!: ElementRef;

  headerTableUsers = [
    { title: "Họ tên", dataKey: "fullname" },
    { title: "Nick name", dataKey: "nickname" },
    { title: "Email", dataKey: "email" },
    { title: "Chức vụ/Vai trò", dataKey: "position" },
    { title: "Quyền", dataKey: "role" },
    { title: "Nhóm", dataKey: "teams" },
    { title: "Ngày tham gia", dataKey: "created_at" },
    { title: "Trạng thái", dataKey: "is_active" }
  ];

  constructor(private teamService: TeamService, private route: Router) { }

  ngOnInit(): void {
    this.LoadUserStatus();
    this.LoadRoom();
    this.LoadBuilding();
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
        this.users = result.body.data.reverse();
      });
  }

  LoadRoom(): void {
    this.teamService
      .getAllRoom()
      .pipe(
        catchError(err => {
          return EMPTY;
        })
      )
      .subscribe(result => {
        this.room = result.body.data.reverse();
        // console.log(this.room);
      });
  }

  LoadBuilding(): void {
    this.teamService
      .getAllBuilding()
      .pipe(
        catchError(err => {
          return EMPTY;
        })
      )
      .subscribe(result => {
        this.building = result.body.data.reverse();
        // console.log(this.building);
      });
  }

  getPDF() {
    this.disable = true;
    this.btnu = true;
    this.btnr = true;
    this.btnb = true;
    this.btnc = true;
    setTimeout(() => {
      this.disable = false;
      this.btnu = false;
      this.btnr = false;
      this.btnb = false;
      this.btnc = false;

    }, 5000);
    setTimeout(() => {
      let HTML_Width = this.htmlData.nativeElement.clientWidth;
      let HTML_Height = this.htmlData.nativeElement.clientHeight;
      // console.log(HTML_Height + ' ' + HTML_Width);
  
      var top_left_margin = 15;
      var PDF_Width = HTML_Width + (top_left_margin * 2);
      var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
      // console.log(PDF_Height + ' ' + PDF_Width);
  
      var canvas_image_width = HTML_Width;
      var canvas_image_height = HTML_Height;
  
      var totalPDFPages = Math.ceil(HTML_Height / PDF_Height)-1;
  
  
      html2canvas(this.htmlData.nativeElement).then(function (canvas) {
        // canvas.getContext('2d');
  
        // console.log(canvas.height + "  " + canvas.width);
  
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        // let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
        var pdf = new jsPDF('p', 'mm', [PDF_Width, PDF_Height - 5]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
  
  
        for (var i = 1; i <= totalPDFPages; i++) {
          pdf.addPage([PDF_Width, PDF_Height]);
          pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*2), canvas_image_width, canvas_image_height);
        }
  
        pdf.save("HTML-Document.pdf");
      });
    }, 1000);
  };

  makePDF(): void {
    // let options = {
    //   filename: 'report.pdf',
    //   image: { type: 'jpeg' },
    //   html2canvas: {},
    //   jsPDF: { orientation: 'landscape' }
    // };

    // let content: Element = this.htmlData.nativeElement;

    // html2pdf()
    // .from(content)
    // .set(options)
    // .save();
  }

  Back() {
    this.route.navigateByUrl('/report');
  }

}
