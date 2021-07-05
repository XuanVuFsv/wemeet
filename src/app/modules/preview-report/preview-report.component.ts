import { TeamService } from './../../core/services/team.service';
import { catchError } from 'rxjs/operators';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EMPTY } from 'rxjs';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
// import html2canvas from 'html2canvas';

@Component({
  selector: 'app-preview-report',
  templateUrl: './preview-report.component.html',
  styleUrls: ['./preview-report.component.scss']
})
export class PreviewReportComponent implements OnInit {
  openPDF(): void {
    const doc = new jsPDF("l", 'cm', "a4");
	
    doc.addFont('././open-sans-v18-vietnamese_latin-300.ttf', 'open-sans-v18-vietnamese_latin-300', 'normal');
    doc.setFontSize(14);
    doc.setFont("open-sans-v18-vietnamese_latin-300");
    doc.autoTable(this.headerTableUsers, this.users, {
        theme: 'striped',
        styles: { overflow: 'linebreak'},
        margin: { top: 5 },
  
    });
    
    doc.putTotalPages("Danh sách nhân viên")
    
    doc.save('Test.pdf');
  }

  public users: Object[];
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

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.LoadUserStatus();
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
        console.log(this.users);
      });
  }

  getPDF() {
    let DATA = document.getElementById('htmlData');

    // var HTML_Width = $("canvas_div_pdf").width();
    // var HTML_Height = $("canvas_div_pdf").height();
    // let HTML_Width = this.htmlData.nativeElement.clientWidth;
    // let HTML_Height = this.htmlData.nativeElement.clientHeight;
    // console.log(HTML_Height + ' ' + HTML_Width);

    // var top_left_margin = 5;
    // var PDF_Width = HTML_Width + (top_left_margin * 2);
    // var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
    // var canvas_image_width = HTML_Width;
    // var canvas_image_height = HTML_Height;

    // var totalPDFPages = Math.ceil(HTML_Height / PDF_Height);


    // html2canvas(this.htmlData.nativeElement).then(function (canvas) {
    //   canvas.getContext('2d');

    //   console.log(canvas.height + "  " + canvas.width);


    //   var imgData = canvas.toDataURL("image/jpeg", 1.0);
    //   var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
    //   pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);


    //   for (var i = 1; i <= totalPDFPages; i++) {
    //     pdf.addPage([PDF_Width, PDF_Height]);
    //     pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
    //   }

    //   pdf.save("HTML-Document.pdf");
    // });

    //   let pdf = new jsPDF('p', 'pt', 'a4');
    //   pdf.html(this.htmlData.nativeElement, {
    //     callback: (pdf) => {
    //       pdf.save("wemeet-report.pdf");
    //     }
    //   });
  };

}
