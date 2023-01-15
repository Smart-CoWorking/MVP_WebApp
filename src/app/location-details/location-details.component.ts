import { Component, OnInit, ChangeDetectorRef, HostListener, AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent implements OnInit,AfterViewInit {
  myControl = new FormControl('');
  divwidth!: string;
  resetOption!: string[];
  getScreenWidth!: number;
  getScreenHeight!: number;
  divheight!: any;
  options!: any;

  private map!: any;

  private initMap(): void {
    this.map = Leaflet.map('map', {
      center: [ 77.7473, 12.9716 ],
      zoom: 3
    });
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnInit(): void {

  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    console.log( this.getScreenWidth); console.log( this.getScreenHeight);
    this.divheight = this.getScreenHeight+"px";
    this.divwidth = this.getScreenWidth+"px";
  }

}
