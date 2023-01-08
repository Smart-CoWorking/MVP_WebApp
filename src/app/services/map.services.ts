import { Injectable, NgZone } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from "../../environments/environment";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';



@Injectable({
  providedIn: 'root'
})
export class MapService {
  map!:  mapboxgl.Map;
 
}
