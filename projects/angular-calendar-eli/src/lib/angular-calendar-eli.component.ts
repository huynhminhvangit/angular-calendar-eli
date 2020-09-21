import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'angular-calendar-eli',
  templateUrl: 'angular-calendar-eli.component.html',
  styleUrls: ['angular-calendar-eli.component.css']
})
export class AngularCalendarEliComponent implements OnInit {

  startDate: Date;
  endDate: Date;
  monthCellFirst: number = 0;
  monthCellSecond: number = 0;
  daysOfWeek = ['日','月', '火', '水', '木', '金', '土'];
  listDate: any;
  listHoliday: string[] = [];
  defaultTimeSheet: any;

  constructor() { }

  ngOnInit(): void {
    this.listHoliday = ['2020-09-21'];
    this.listDate = [
      { date: new Date(), isSunDay: false, isSatday: false, isHoliday: false, dateName: '', classDate: '', timeSheet: this.defaultTimeSheet},
      { date: new Date(), isSunDay: false, isSatday: false, isHoliday: false, dateName: '', classDate: '', timeSheet: this.defaultTimeSheet},
      { date: new Date(), isSunDay: false, isSatday: false, isHoliday: false, dateName: '', classDate: '', timeSheet: this.defaultTimeSheet},
      { date: new Date(), isSunDay: false, isSatday: false, isHoliday: false, dateName: '', classDate: '', timeSheet: this.defaultTimeSheet},
      { date: new Date(), isSunDay: false, isSatday: false, isHoliday: false, dateName: '', classDate: '', timeSheet: this.defaultTimeSheet},
      { date: new Date(), isSunDay: false, isSatday: false, isHoliday: false, dateName: '', classDate: '', timeSheet: this.defaultTimeSheet},
      { date: new Date(), isSunDay: false, isSatday: false, isHoliday: false, dateName: '', classDate: '', timeSheet: this.defaultTimeSheet},
      { date: new Date(), isSunDay: false, isSatday: false, isHoliday: false, dateName: '', classDate: '', timeSheet: this.defaultTimeSheet},
      { date: new Date(), isSunDay: false, isSatday: false, isHoliday: false, dateName: '', classDate: '', timeSheet: this.defaultTimeSheet},
      { date: new Date(), isSunDay: false, isSatday: false, isHoliday: false, dateName: '', classDate: '', timeSheet: this.defaultTimeSheet},
      { date: new Date(), isSunDay: false, isSatday: false, isHoliday: false, dateName: '', classDate: '', timeSheet: this.defaultTimeSheet},
      { date: new Date(), isSunDay: false, isSatday: false, isHoliday: false, dateName: '', classDate: '', timeSheet: this.defaultTimeSheet},
      { date: new Date(), isSunDay: false, isSatday: false, isHoliday: false, dateName: '', classDate: '', timeSheet: this.defaultTimeSheet},
      { date: new Date(), isSunDay: false, isSatday: false, isHoliday: false, dateName: '', classDate: '', timeSheet: this.defaultTimeSheet}
    ];
    this.startDate = new Date();
    this.endDate = new Date();
    this.endDate.setDate(this.endDate.getDate() + 13);
    if (this.startDate.getMonth() < this.endDate.getMonth()) {
      let lastDateOfMonth = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, 0).getDate();
      this.monthCellFirst = lastDateOfMonth - (this.startDate.getDate() - 1);
      this.monthCellSecond = 14 - this.monthCellFirst;
    }
    this.initialDate();
  }


  initialDate() {
    let index = 0;
    this.listDate.forEach(element => {
      let today = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate())
      today.setDate(today.getDate() + index);
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
      index++;
    });
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

  initialDefaultTimeSheet() {
    this.defaultTimeSheet = [
      {'10:00': true},
      {'10:30': false},
      {'11:00': true},
      {'11:30': false},
      {'12:00': true},
      {'12:30': true},
      {'13:00': false},
      {'13:30': true},
      {'14:00': true},
      {'14:30': false},
      {'15:00': true},
      {'15:30': true},
      {'16:00': false},
      {'16:30': true},
      {'17:00': false},
      {'17:30': true},
      {'18:00': true},
      {'18:30': false},
      {'19:00': true},
      {'19:30': true},
      {'20:00': false},
      {'20:30': false},
      {'21:00': true}
    ]
  }

}
