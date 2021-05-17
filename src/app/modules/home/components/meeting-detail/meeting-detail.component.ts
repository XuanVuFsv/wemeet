import { Component, Input, OnInit } from '@angular/core';
import { Blue, Green, Red, TrueGray } from '@app/core/enum/colors.enum';

@Component({
  selector: 'app-meeting-detail',
  templateUrl: './meeting-detail.component.html',
  styleUrls: ['./meeting-detail.component.scss']
})
export class MeetingDetailComponent implements OnInit {
  @Input() meetingDetail: any = {};

  // colors
  colorTag = {
    important: Blue._400,
    obligatory: Green._400,
    emergency: Red._400,
    normal: TrueGray._400
  };
  members = [
    '../../assets/images/avatar/avatar1.png',
    '../../assets/images/avatar/avatar2.png',
    '../../assets/images/avatar/avatar3.png',
    '../../assets/images/avatar/avatar4.png',
    '../../assets/images/avatar/avatar5.png',
    '../../assets/images/avatar/avatar6.png'
  ];
  joinMeeting: boolean = Math.random() < 0.5;
  isLeader: boolean = Math.random() < 0.5;

  constructor() {}

  ngOnInit(): void {}
}
