import React, { useEffect, useState } from "react";
import * as THREE from "three";

function App() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //background-color
    scene.background = new THREE.Color(0x87CEEB);

    // Noew make a cube
    const geometry = new THREE.BoxGeometry(10, 10, 10); 

    //color of which side 
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0xff0000 }),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 
      new THREE.MeshBasicMaterial({ color: 0x0000ff }), 
      new THREE.MeshBasicMaterial({ color: 0xffff00 }), 
      new THREE.MeshBasicMaterial({ color: 0xff00ff }),
      new THREE.MeshBasicMaterial({ color: 0x00ffff }),
    ];

    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    
    camera.position.z = 50;

    
    const onMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', onMouseMove);

    
    const animate = function () {
      requestAnimationFrame(animate);

      
      const radius = 50; 
      const cameraAngle = mouse.x * Math.PI * 2; 
      const verticalAngle = mouse.y * Math.PI * 2;

      // camera position for 360degree 
      camera.position.x = radius * Math.cos(cameraAngle);
      camera.position.y = radius * Math.sin(verticalAngle);
      camera.position.z = radius * Math.sin(cameraAngle);
      camera.lookAt(cube.position);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      cube.rotation.z += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeChild(renderer.domElement);
    };
  }, [mouse]);

  return null; // No JSX returned, as everything is rendered using Three.js
}

export default App;
