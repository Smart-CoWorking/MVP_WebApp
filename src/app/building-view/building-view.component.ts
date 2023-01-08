import { Component, OnInit, ChangeDetectorRef, HostListener, AfterViewInit, ViewChild  } from '@angular/core';
import { environment } from '../../environments/environment';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { Matrix4, Vector3,
  DirectionalLight, AmbientLight,Raycaster, Vector2,
  PerspectiveCamera,AxesHelper,  GridHelper,
  Scene, WebGLRenderer,MeshLambertMaterial
} from "three";
import { IFCLoader } from "web-ifc-three/IFCLoader";
import * as mapboxgl from 'mapbox-gl';
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from "three-mesh-bvh";
import { IFCModel } from 'web-ifc-three/IFC/components/IFCModel';
import { IFCSLAB } from "web-ifc";


interface Website {
  id: string;
  name: string;
}


@Component({
  selector: 'app-building-view',
  templateUrl: './building-view.component.html',
  styleUrls: ['./building-view.component.scss']
})
export class BuildingViewComponent implements OnInit, AfterViewInit {
  scene:any = new Scene();
  raycaster = new Raycaster();
  mouse = new Vector2();
  camera:any;
  ifcModels:any = [];
  ifcLoader = new IFCLoader();
  // Creates subset material
  preselectMat = new MeshLambertMaterial({
    transparent: true,
    opacity: 0.6,
    color: 0xff88ff,
    depthTest: false,
  });

  showPropertiesDiv:boolean = false;
  buildingName!: any;
  zone!: string;
  floor!: string;

  constructor() {}

  ngOnInit(): void {
    this.raycaster.firstHitOnly = true;
    //Object to store the size of the viewport
    const size = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
// alert(size.width / size.height);
    //Creates the camera (point of view of the user)
    this.camera = new PerspectiveCamera(75,size.width / size.height);
    this.camera.position.z = 17;
    this.camera.position.y = 2;
    this.camera.position.x = 8;

    //Creates the lights of the scene
    const lightColor = 0xffffff;

    const ambientLight = new AmbientLight(lightColor, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new DirectionalLight(lightColor, 0.9);
    directionalLight.position.set(0, 10, 0);
    directionalLight.target.position.set(-5, 0, 0);
    this.scene.add(directionalLight);
    // this.scene.add(directionalLight.target);

    //Sets up the renderer, fetching the canvas of the HTML
    const threeCanvas:any = document.getElementById("three-canvas");
    const renderer = new WebGLRenderer({ canvas: threeCanvas, alpha: true });
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    //Creates grids and axes in the scene
    // const grid = new GridHelper(50, 30);
    // this.scene.add(grid);

    const axes:any = new AxesHelper();
    axes.material.depthTest = false;
    axes.renderOrder = 1;
    this.scene.add(axes);

    //Creates the orbit controls (to navigate the scene)
    const controls = new OrbitControls(this.camera, threeCanvas);
    controls.enableDamping = true;
    controls.target.set(-2, 0, 0);

    //Animation loop
    const animate = () => {
      controls.update();
      renderer.render(this.scene, this.camera);
      requestAnimationFrame(animate);
    };

    animate();


  }



  ngAfterViewInit(): void {

    this.ifcLoader.ifcManager.setupThreeMeshBVH(computeBoundsTree, disposeBoundsTree, acceleratedRaycast);
    this.ifcLoader.ifcManager.setWasmPath("assets/IFC/");
    this.ifcLoader.load("assets/IFC/ifcexample.ifc", (ifcModel) => {
      this.ifcModels.push(ifcModel);
      this.scene.add(ifcModel)
    });

      const threeCanvas:any =  document.getElementById('three-canvas');
      threeCanvas.ondblclick = this.pick('click');


  }

  divwidth: any = '1400px';

  cast(event:any) {
    // Computes the position of the mouse on the screen
          const threeCanvas:any =  document.getElementById('three-canvas');
    const bounds = threeCanvas.getBoundingClientRect();

    const x1 = event.clientX - bounds.left;
    const x2 = bounds.right - bounds.left;
    this.mouse.x = (x1 / x2) * 2 - 1;

    const y1 = event.clientY - bounds.top;
    const y2 = bounds.bottom - bounds.top;
    this.mouse.y = -(y1 / y2) * 2 + 1;

    // Places it on the camera pointing to the mouse
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Casts a ray
    return this.raycaster.intersectObjects(this.ifcModels);
  }

  pick(event:any) {
    console.log(this.camera); console.log(this.camera.position);
    const found:any = this.cast(event)[0];
    if (found) {
      const index:any = found.faceIndex;
      const geometry = found.object.geometry;
      const ifc = this.ifcLoader.ifcManager;
      const id = ifc.getExpressId(geometry, index);
      this.highlight(event,found.object);
    }

  }

   async highlight(event:any, model:IFCModel) {
    console.log("In Highlight");
     const found:any = this.cast(event)[0];
     const ifc = this.ifcLoader.ifcManager;
     let modelID:any;
    if (found) {
      // Gets model ID
      // model = found.object.id;
      // model.id = model.modelID;
      console.log("In Highlight found");
      // Gets Express ID
      console.log(found);
      const index = found.faceIndex;
      const geometry = found.object.geometry;
      const id = ifc.getExpressId(geometry, index);

      modelID = found.object.modelID;
      console.log(modelID); console.log(id);
      // console.log(await ifc.getItemProperties(modelID, id));
      const props = await ifc.getItemProperties(modelID, id);
      console.log(props);
      const slabsID:any = await ifc.getAllItemsOfType(modelID, IFCSLAB,true);
      console.log(slabsID);
      for (let i = 0; i <= slabsID.length-1; i++) {
         console.log(slabsID[0]);
        const slabID = slabsID[i];
        console.log(slabsID[i].expressID);
        const slabProperties = await ifc.getItemProperties(0, slabsID[i].expressID);
        console.log(slabProperties);
        this.buildingName = slabProperties.Name.value;
        this.zone = "Wing A";
        console.log(slabProperties.PredefinedType);
        this.floor = "Floor "+slabProperties.PredefinedType.type;

        this.showPropertiesDiv = true;
      }
  //  console.log(JSON.stringify(props, null, 2));
      // Creates subset
      this.ifcLoader.ifcManager.createSubset({
        modelID: model.modelID,
        ids: [id],
        material: this.preselectMat,
        scene: this.scene,
        removePrevious: true,
      });
    } else {
      // Removes previous highlight
      ifc.removeSubset(model.id, this.preselectMat);
    }
  }

}
