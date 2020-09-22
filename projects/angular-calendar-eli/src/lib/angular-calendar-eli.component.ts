import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'angular-calendar-eli',
  templateUrl: 'angular-calendar-eli.component.html',
  styleUrls: ['angular-calendar-eli.component.css']
})
export class AngularCalendarEliComponent implements OnInit {

  @Input() startDate: Date = new Date();
  @Input() endDate: Date;
  monthCellFirst: number = 0;
  monthCellSecond: number = 0;
  daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
  defaultId: number = 1;

  @Input() listDate: any;

  @Input() listHoliday: string[] = [];


  @Input() timeSheet: any = [{ '10:00': false }, { '10:30': false }, { '11:00': false }, { '11:30': false }, { '12:00': false }, { '12:30': false }, { '13:00': false }, { '13:30': false }, { '14:00': false }, { '14:30': false }, { '15:00': false }, { '15:30': false }, { '16:00': false }, { '16:30': true }, { '17:00': false }, { '17:30': false }, { '18:00': false }, { '18:30': false }, { '19:00': false }, { '19:30': false }, { '20:00': false }, { '20:30': false }, { '21:00': false }];

  constructor() { }

  ngOnInit(): void {
    this.initialDate();
  }


  initialDate() {
    this.endDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate() + 13);
    if (this.startDate.getMonth() < this.endDate.getMonth()) {
      let lastDateOfMonth = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, 0).getDate();
      this.monthCellFirst = lastDateOfMonth - (this.startDate.getDate() - 1);
      this.monthCellSecond = 14 - this.monthCellFirst;
    }
    let index = 0;
    let arrTemp = [];
    while (index < 14) {
      let element = { id: 0, date: new Date(), isSunDay: false, isSatday: false, isHoliday: false, dateName: '', classDate: '', timeSheet: this.timeSheet, timeSheetKeys: [] };
      let today = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate() + index);
      element.id = this.defaultId;
      this.defaultId++;
      element.date = today;
      element.dateName = this.daysOfWeek[today.getDay()];
      element.classDate = 'dayCell';
      // Check SunDay
      if (today.getDay() == 0) {
        element.isSunDay = true;
        element.classDate = 'sun';
      }
      // Check SatDay
      if (today.getDay() == 6) {
        element.isSatday = true;
        element.classDate = 'sat';
      }
      // Check Holiday
      if (this.listHoliday.includes(this.formatDate(today))) {
        element.isHoliday = true;
        element.classDate = 'sun';
        element.dateName = '祝';
      }
      element.timeSheetKeys = element.timeSheet.map(time => { return Object.keys(time)[0]; });
      arrTemp.push(element);
      index++;
    }
    this.listDate = [...arrTemp];
  }

  formatDate(date: Date) {
    var d = date,
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  prevWeek() {
    this.startDate.setDate(this.startDate.getDate() - 14);
    this.initialDate();
  }

  nextWeek() {
    this.startDate.setDate(this.startDate.getDate() + 14);
    this.initialDate();
  }

  trackByMethod(index:number, el:any): number {
    return index;
  }

}
