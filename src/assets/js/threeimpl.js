
import {*} from "https://unpkg.com/three@0.126.0/build/three.min.js";
import {meterInMercatorCoordinateUnits} from "https://unpkg.com/three@0.126.0/examples/js/loaders/GLTFLoader.js";

function implsmodel() {
  mapboxgl.accessToken = 'pk.eyJ1Ijoia3BhdmFuMTYiLCJhIjoiY2xjZDhwZHhtMDE0ZzNvcGEzbGhzeDJkbSJ9.gO9Z6GDG6QItFrKtG3Upfg';
    var map = new mapboxgl.Map({
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/light-v11',
        zoom: 18,
        center: [148.9819, -35.3981],
        pitch: 60,
        antialias: true // create the gl context with MSAA antialiasing, so custom layers are antialiased
    });
console.log('Hellooo');
    // parameters to ensure the model is georeferenced correctly on the map
    var modelOrigin = [148.9819, -35.39847];
    var modelAltitude = 0;
    var modelRotate = [Math.PI / 2, 0, 0];

    var modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
        modelOrigin,
        modelAltitude
    );
    console.log('Hellooo1');
    // transformation parameters to position, rotate and scale the 3D model onto the map
    var modelTransform = {
        translateX: modelAsMercatorCoordinate.x,
        translateY: modelAsMercatorCoordinate.y,
        translateZ: modelAsMercatorCoordinate.z,
        rotateX: modelRotate[0],
        rotateY: modelRotate[1],
        rotateZ: modelRotate[2],
        /* Since the 3D model is in real world meters, a scale transform needs to be
         * applied since the CustomLayerInterface expects units in MercatorCoordinates.
         */
        scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
    };

    var THREE = window.THREE;
    console.log('Hellooo2');
    // configuration of the custom layer for a 3D model per the CustomLayerInterface
    var customLayer = {
        id: '3d-model',
        type: 'custom',
        renderingMode: '3d',
        onAdd: function (map, gl) {
            this.camera = new THREE.Camera();
            this.scene = new THREE.Scene();

            // create two three.js lights to illuminate the model
            var directionalLight = new THREE.DirectionalLight(0xffffff);
            directionalLight.position.set(0, -70, 100).normalize();
            this.scene.add(directionalLight);

            var directionalLight2 = new THREE.DirectionalLight(0xffffff);
            directionalLight2.position.set(0, 70, 100).normalize();
            this.scene.add(directionalLight2);

            // use the three.js GLTF loader to add the 3D model to the three.js scene
            var loader = new THREE.GLTFLoader();
            loader.load(
                'https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf',
                (gltf) => {
                    this.scene.add(gltf.scene);
                }
            );
            this.map = map;
            console.log('Hellooo4');
            // use the Mapbox GL JS map canvas for three.js
            this.renderer = new THREE.WebGLRenderer({
                canvas: map.getCanvas(),
                context: gl,
                antialias: true
            });

            this.renderer.autoClear = false;
        },
        render: function (gl, matrix) {
            var rotationX = new THREE.Matrix4().makeRotationAxis(
                new THREE.Vector3(1, 0, 0),
                modelTransform.rotateX
            );
            var rotationY = new THREE.Matrix4().makeRotationAxis(
                new THREE.Vector3(0, 1, 0),
                modelTransform.rotateY
            );
            var rotationZ = new THREE.Matrix4().makeRotationAxis(
                new THREE.Vector3(0, 0, 1),
                modelTransform.rotateZ
            );
            console.log('Hellooo5');
            var m = new THREE.Matrix4().fromArray(matrix);
            var l = new THREE.Matrix4()
                .makeTranslation(
                    modelTransform.translateX,
                    modelTransform.translateY,
                    modelTransform.translateZ
                )
                .scale(
                    new THREE.Vector3(
                        modelTransform.scale,
                        -modelTransform.scale,
                        modelTransform.scale
                    )
                )
                .multiply(rotationX)
                .multiply(rotationY)
                .multiply(rotationZ);

            this.camera.projectionMatrix = m.multiply(l);
            this.renderer.resetState();
            this.renderer.render(this.scene, this.camera);
            this.map.triggerRepaint();
        }
    };
    console.log('Hello6oo');
    map.on('style.load', () => {
      console.log('Helloo4444o');
          map.addLayer(customLayer, 'waterway-label');
    });

}

export {implsmodel};