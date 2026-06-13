import React, { useEffect, useRef } from 'react';

export default function WebGLBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const vsSource = `
      attribute vec4 aVertexPosition;
      varying vec2 v_texCoord;
      void main() {
          gl_Position = aVertexPosition;
          v_texCoord = aVertexPosition.xy * 0.5 + 0.5;
      }
    `;

    const fsSource = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      void main() {
          vec2 uv = v_texCoord;
          vec2 mouse = u_mouse / u_resolution;
          
          // Create soft, flowing blobs based on time and coordinates
          float noise = sin(uv.x * 3.0 + u_time * 0.5) * cos(uv.y * 2.0 - u_time * 0.3);
          noise += sin(uv.y * 4.0 + u_time * 0.7) * 0.5;
          
          // Influence from mouse position
          float dist = distance(uv, mouse);
          float mouseEffect = smoothstep(0.4, 0.0, dist) * 0.3;
          
          // Define the Academic Elite palette stops
          vec3 colorBase = vec3(0.97, 0.98, 1.0); // #F8F9FF
          vec3 colorPrimary = vec3(0.31, 0.27, 0.90); // #4F46E5
          vec3 colorAccent = vec3(0.39, 0.40, 0.95); // #6366F1
          
          // Mix colors based on the procedural noise
          vec3 color = mix(colorBase, colorPrimary, noise * 0.1 + mouseEffect);
          color = mix(color, colorAccent, clamp(noise * 0.05, 0.0, 1.0));
          
          // Final soft output with very low opacity influence
          gl_FragColor = vec4(color, 1.0);
      }
    `;

    function compileShader(gl, type, source) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fsSource);

    if (!vertexShader || !fragmentShader) return;

    const shaderProgram = gl.createProgram();
    if (!shaderProgram) return;

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
      return;
    }

    gl.useProgram(shaderProgram);

    const positions = new Float32Array([
      -1.0,  1.0,
       1.0,  1.0,
      -1.0, -1.0,
       1.0, -1.0,
    ]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(shaderProgram, 'u_time');
    const resolutionLocation = gl.getUniformLocation(shaderProgram, 'u_resolution');
    const mouseLocation = gl.getUniformLocation(shaderProgram, 'u_mouse');

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;

    function resizeCanvasToDisplaySize(canvas) {
      const displayWidth  = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      if (canvas.width  !== displayWidth || canvas.height !== displayHeight) {
        canvas.width  = displayWidth;
        canvas.height = displayHeight;
        return true;
      }
      return false;
    }

    function render(time) {
      time *= 0.001; 

      resizeCanvasToDisplaySize(canvas);
      gl.viewport(0, 0, canvas.width, canvas.height);

      gl.uniform1f(timeLocation, time);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform2f(mouseLocation, mouseX, canvas.height - mouseY);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-20 pointer-events-none" />;
}
