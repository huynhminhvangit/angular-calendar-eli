import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'angular-calendar-eli',
  templateUrl: 'angular-calendar-eli.component.html',
  styleUrls: ['angular-calendar-eli.component.css']
})
export class AngularCalendarEliComponent implements OnInit, OnChanges {

  @Input() startDate: Date = new Date();
  @Input() endDate: Date;
  @Input() daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
  @Input() listDate: any[];
  @Input() listHoliday: string[] = [];
  @Input() timeSheet: any[] = [{ '10:00': false }, { '10:30': false }, { '11:00': false }, { '11:30': false }, { '12:00': false }, { '12:30': false }, { '13:00': false }, { '13:30': false }, { '14:00': false }, { '14:30': false }, { '15:00': false }, { '15:30': false }, { '16:00': false }, { '16:30': false }, { '17:00': false }, { '17:30': false }, { '18:00': false }, { '18:30': false }, { '19:00': false }, { '19:30': false }, { '20:00': false }, { '20:30': false }, { '21:00': false }];
  @Input() timeSheetKey: string[] = ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];

  @Output() chooseValue = new EventEmitter();

  @ViewChild('header') header: ElementRef;

  monthCellSecond: number = 0;
  monthCellFirst: number = 0;
  defaultId: number = 0;
  listShowCalendar: any = [];
  @Input() isMobile: boolean = false;


  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isMobile.currentValue) {
      this.renderCalendarSP('+');
    } else {
      this.renderCalendar('+');
    }
  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    if(this.isMobile) {
      this.scrollHeader();
    }
  }


  renderCalendar(operator) {
    this.endDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate() + 13);
    if (this.startDate.getMonth() < this.endDate.getMonth()) {
      let lastDateOfMonth = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, 0).getDate();
      this.monthCellFirst = lastDateOfMonth - (this.startDate.getDate() - 1);
      this.monthCellSecond = 14 - this.monthCellFirst;
    } else {
      this.monthCellFirst = 14;
      this.monthCellSecond = 0;
    }
    let index = 0;
    let arrTemp = [];
    if (operator === '+') {
    } else {
      this.defaultId = this.defaultId - 28;
    }
    while (index < 14) {
      if (this.defaultId === 70) {
        this.defaultId = 69;
      }
      let element = this.listDate[this.defaultId];

      this.defaultId++;

      element.id = this.defaultId;
      element.dateName = this.daysOfWeek[element.date.getDay()];
      element.classDate = 'dayCell';
      // Check SunDay
      if (element.date.getDay() == 0) {
        element.isSunDay = true;
        element.classDate = 'sun';
      }
      // Check SatDay
      if (element.date.getDay() == 6) {
        element.isSatday = true;
        element.classDate = 'sat';
      }
      // Check Holiday
      if (this.listHoliday.includes(this.formatDate(element.date))) {
        element.isHoliday = true;
        element.classDate = 'sun';
        element.dateName = '祝';
      }
      arrTemp.push(element);
      index++;
    }
    this.listShowCalendar = [...arrTemp];
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
    let newDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate());
    this.startDate = newDate;
    this.renderCalendar('-');
  }

  nextWeek() {
    this.startDate.setDate(this.startDate.getDate() + 14);
    let newDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate());
    this.startDate = newDate;
    this.renderCalendar('+');
  }


  renderCalendarSP(operator) {
    this.endDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate() + 6);
    if (this.startDate.getMonth() < this.endDate.getMonth()) {
      let lastDateOfMonth = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, 0).getDate();
      this.monthCellFirst = lastDateOfMonth - (this.startDate.getDate() - 1);
      this.monthCellSecond = 7 - this.monthCellFirst;
    } else {
      this.monthCellFirst = 7;
      this.monthCellSecond = 0;
    }
    let index = 0;
    let arrTemp = [];
    if (operator === '+') {
    } else {
      this.defaultId = this.defaultId - 14;
    }
    while (index < 7) {
      if (this.defaultId === 70) {
        this.defaultId = 69;
      }
      let element = this.listDate[this.defaultId];
      this.defaultId++;
      element.id = this.defaultId;
      element.dateName = this.daysOfWeek[element.date.getDay()];
      element.classDate = 'w12p';
      // Check SunDay
      if (element.date.getDay() == 0) {
        element.isSunDay = true;
        element.classDate = 'sun-sp';
      }
      // Check SatDay
      if (element.date.getDay() == 6) {
        element.isSatday = true;
        element.classDate = 'sat-sp';
      }
      // Check Holiday
      if (this.listHoliday.includes(this.formatDate(element.date))) {
        element.isHoliday = true;
        element.classDate = 'sun-sp';
        element.dateName = '祝';
      }
      arrTemp.push(element);
      index++;
    }
    this.listShowCalendar = [...arrTemp];
  }

  prevWeekSP() {
    this.startDate.setDate(this.startDate.getDate() - 7);
    let newDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate());
    this.startDate = newDate;
    this.renderCalendarSP('-');
  }

  nextWeekSP() {
    this.startDate.setDate(this.startDate.getDate() + 7);
    let newDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate());
    this.startDate = newDate;
    this.renderCalendarSP('+');
  }

  chooseTime(indexShowCalendar, indexTimeSheet) {
    let element = this.listShowCalendar[indexShowCalendar];
    let obj = {
      date: element.date,
      dateFormat: this.formatDate(element.date),
      time: this.timeSheetKey[indexTimeSheet]
    }
    this.chooseValue.emit(obj);

  }

  trackByMethod(index: number, el: any): number {
    return index;
  }

  scrollHeader() {
    window.onscroll = function () { myFunction() };
    var header = document.getElementById("jsiCalHeader");
    var elementTop = document.getElementById("jsiCalDayTable").getBoundingClientRect().top;
    var wind = document.body.getBoundingClientRect().top;
    var sticky = elementTop - wind;

    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        var widthCalendar = document.getElementById("jsiCalDayTable").getBoundingClientRect().width;
        header.style.width = (widthCalendar + "px");
      } else {
        header.classList.remove("sticky");
      }
      if (window.pageYOffset > 1600) {
        header.classList.remove("sticky");
      }
    }
  }
}
