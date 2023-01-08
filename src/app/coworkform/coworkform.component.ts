
import { Component, OnInit, ChangeDetectorRef, HostListener, AfterViewInit  } from '@angular/core';
import { faHouse,faCalendarDays,faContactCard,faRoadBarrier,faBell,faBuildingFlag,faShop,faGears,faUsersViewfinder,
  faUnlockKeyhole,faHouseUser,faArrowRightArrowLeft,faMagnifyingGlassLocation,faHeadset } from '@fortawesome/free-solid-svg-icons';
import * as mapboxgl from 'mapbox-gl';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import * as THREE from 'three/build/*asTHREE';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SelectDropDownService } from "ngx-select-dropdown";
import { UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-coworkform',
  templateUrl: './coworkform.component.html',
  styleUrls: ['./coworkform.component.scss']
})
export class CoworkformComponent implements OnInit,AfterViewInit {
  myControl = new FormControl('');
  options: string[] = ['Bangalore','Chennai',  'Kolkota', 'Mumbai','New Delhi' ];
  singleSelect: any = [];
  stringOptions = ['Bangalore','Chennai',  'Kolkota', 'Mumbai','New Delhi'];
  config = {
            displayKey: "name", // if objects array passed which key to be displayed defaults to description
            search: true,
            limitTo: 0,
            height: '250px',
            enableSelectAll: true
          };
          selectForm!: UntypedFormGroup;
  faHouse = faHouse;faHouseUser=faHouseUser;faBuildingFlag=faBuildingFlag;
  faCalendarDays=faCalendarDays;faArrowRightArrowLeft=faArrowRightArrowLeft;faMagnifyingGlassLocation=faMagnifyingGlassLocation;
  faContactCard=faContactCard;faBell=faBell;faShop=faShop;faGears=faGears;faHeadset=faHeadset;
  faRoadBarrier=faRoadBarrier;faUnlockKeyhole=faUnlockKeyhole;faUsersViewfinder=faUsersViewfinder;

  public map!: mapboxgl.Map;

  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 12.884851;
  lng = 77.552744;
 // At low zooms, complete a revolution every two minutes.
 secondsPerRevolution = 120;
 // Above zoom level 5, do not rotate.
 maxSpinZoom = 5;
 // Rotate at intermediate speeds between zoom levels 3 and 5.
 slowSpinZoom = 3;

  userInteracting = false;
 spinEnabled = true;
  getScreenWidth!: number;
  getScreenHeight!: number;
  divheight!: any;



   geojson = {
    'type': 'FeatureCollection',
    'features': [
    {
    'type': 'Feature',
    'properties': {
      'title':'Fooz',
      'description':'Fooz',
    'message': 'Foo',
    'iconSize': [40, 40]
    },
    'geometry': {
    'type': 'Point',
    'coordinates': [77.570870, 13.014540]
    }
    },
    {
    'type': 'Feature',
    'properties': {
      'title':'Bar',
      'description':'Bar',
    'message': 'Bar',
    'iconSize': [40, 40]
    },
    'geometry': {
    'type': 'Point',
    'coordinates': [77.7473, 12.9716]
    }
    },
    {
    'type': 'Feature',
    'properties': {
    'title':'Baz',
    'description':'Baz',
    'message': 'Baz',
    'iconSize': [40, 40]
    },
    'geometry': {
    'type': 'Point',
    'coordinates':  [77.621195, 13.0456346]
    }
    }
    ]
    };
  divwidth!: string;
  resetOption!: string[];


  constructor( private router: Router,
                private fromBuilder: UntypedFormBuilder,
                private drodownService: SelectDropDownService) { }
  ngAfterViewInit(): void {

  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    console.log( this.getScreenWidth); console.log( this.getScreenHeight);
    this.divheight = this.getScreenHeight+"px";
    this.divwidth = this.getScreenWidth+"px";
  }

  ngOnInit(): void{
    this.resetOption = [this.options[0]];
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    console.log( this.getScreenWidth); console.log( this.getScreenHeight);
    this.divheight = (this.getScreenHeight-50)+"px";
    this.divwidth = (this.getScreenWidth-50)+"px";

    let el = document.createElement('div');
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      projection: {
        name: 'globe'
        },
      zoom: 1,
      center: [this.lng, this.lat],
      antialias: true
  });

// Pause spinning on interaction
this.map.on('mousedown', () => {
  this.userInteracting = true;
});
this.map.on('load', () => {
  this.map.resize();
});
// Restart spinning the globe when interaction is complete
this.map.on('mouseup', () => {
  this.userInteracting = false;
  this.spinGlobe();
});
  // Add map controls
  // this.map.addControl(new mapboxgl.NavigationControl());


        this.map.on('dragend', () => {
                    this.userInteracting = false;
                    this.spinGlobe();
                });
        this.map.on('pitchend', () => {
          this.userInteracting = false;
            this.spinGlobe();
        });
        this.map.on('rotateend', () => {
          this.userInteracting = false;
            this.spinGlobe();
        });

        // When animation is complete, start spinning if there is no ongoing interaction
        this.map.on('moveend', () => {
          this.spinGlobe();
        });

 this.spinGlobe();

  }


  spinGlobe() {
    const zoom = this.map.getZoom();
    if (this.spinEnabled && !this.userInteracting && zoom < this.maxSpinZoom) {
        let distancePerSecond = 360 / this.secondsPerRevolution;
        if (zoom > this.slowSpinZoom) {
            // Slow spinning at higher zooms
            const zoomDif =
                (this.maxSpinZoom - zoom) / (this.maxSpinZoom - this.slowSpinZoom);
            distancePerSecond *= zoomDif;
        }
        const center = this.map.getCenter();
        center.lng -= distancePerSecond;
        // Smoothly animate the map over one second.
        // When this animation is complete, it calls a 'moveend' event.
      //  this.map.easeTo({ center, duration: 1000, easing: (n) => n });
    }
}
showBuilding(obj:any) {
console.log(obj);
const loader = new GLTFLoader();
let scene: any;
scene = new THREE.Scene();
loader.load(
    'assets/img/office/scene.gltf',
    ( gltf ) => {
        // called when the resource is loaded
        scene.add( gltf.scene );
    },
    ( xhr ) => {
        // called while loading is progressing
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
    },
    ( error ) => {
        // called when loading has errors
        console.error( 'An error happened', error );
    },
  );
    // this.map = loader;

}
showDestination(destination: any) {

   this.map.flyTo(
    {
      center: [77.552744,12.884851],
      zoom: 10,
      pitch: 0,
      bearing: 0,
      speed: 1.6
    }
   );
  if(destination === 'Bangalore') {
    console.log(destination);


    let el: any;
    // Add markers to the map.
    for (const marker of this.geojson.features) {
                                                          // Create a DOM element for each marker.
                                                          el = document.createElement('div');
                                                          const width = marker.properties.iconSize[0];
                                                          const height = marker.properties.iconSize[1];
                                                          el.className = 'marker';
                                                          el.style.backgroundImage = 'url(assets/img/gpin.png)';
                                                          el.style.width = `40px`;
                                                          el.style.height = `40px`;
                                                          el.style.backgroundSize = '100%';
                                                          el.style.setProperty('title',marker.properties.title);
                                                          el.addEventListener('click', () => {
                                                           this.router.navigateByUrl('/building-view');
                                                            // this.showBuilding(marker);
                                                         });

      // Add markers to the map.
      new mapboxgl.Marker(el)
      .setLngLat([marker.geometry.coordinates[0],marker.geometry.coordinates[1]])
      .addTo(this.map);
      }

  }

}

searchChange(event:any) {
  console.log(event);
  this.showDestination(event.value);
}
}
