import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function LiquidEther({
  mouseForce = 20,
  cursorSize = 100,
  isViscous = false,
  viscous = 30,
  iterationsViscous = 32,
  iterationsPoisson = 32,
  dt = 0.014,
  BFECC = true,
  resolution = 0.5,
  isBounce = false,
  colors = ["#5227FF", "#FF9FFC", "#B19EEF"],
  style = {},
  className = "",
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  takeoverDuration = 0.25,
  autoResumeDelay = 1000,
  autoRampDuration = 0.6,
}) {
  const mountRef = useRef(null);
  const webglRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const rafRef = useRef(null);
  const intersectionObserverRef = useRef(null);
  const isVisibleRef = useRef(true);
  const resizeRafRef = useRef(null);

  // INLINE CSS HERE ⬇⬇⬇
  const containerStyle = {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: "100%",
    touchAction: "none",
    ...style,
  };

  useEffect(() => {
    if (!mountRef.current) return;

    /** -----------------------------
     *  Palette Texture Builder
     * ------------------------------*/
    function makePaletteTexture(stops) {
      let arr;
      if (Array.isArray(stops) && stops.length > 0) {
        arr = stops.length === 1 ? [stops[0], stops[0]] : stops;
      } else {
        arr = ["#ffffff", "#ffffff"];
      }
      const w = arr.length;
      const data = new Uint8Array(w * 4);
      for (let i = 0; i < w; i++) {
        const c = new THREE.Color(arr[i]);
        data[i * 4 + 0] = Math.round(c.r * 255);
        data[i * 4 + 1] = Math.round(c.g * 255);
        data[i * 4 + 2] = Math.round(c.b * 255);
        data[i * 4 + 3] = 255;
      }
      const tex = new THREE.DataTexture(data, w, 1, THREE.RGBAFormat);
      tex.magFilter = THREE.LinearFilter;
      tex.minFilter = THREE.LinearFilter;
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.generateMipmaps = false;
      tex.needsUpdate = true;
      return tex;
    }

    const paletteTex = makePaletteTexture(colors);
    const bgVec4 = new THREE.Vector4(0, 0, 0, 0);

    /** -----------------------------
     *  FULL THREE.JS SIMULATION
     *  (ReactBits original fluid engine)
     * ------------------------------*/

    /** -----------------------------
     *  FULL THREE.JS SIMULATION
     * ------------------------------*/

    const vertexShaderBasic = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const shaderAdvection = `
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform float dt;
      uniform float dissipation;

      void main() {
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        gl_FragColor = dissipation * texture2D(uSource, coord);
      }
    `;

    const shaderDivergence = `
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform vec2 texelSize;

      void main() {
        float L = texture2D(uVelocity, vUv - vec2(texelSize.x, 0.0)).x;
        float R = texture2D(uVelocity, vUv + vec2(texelSize.x, 0.0)).x;
        float T = texture2D(uVelocity, vUv + vec2(0.0, texelSize.y)).y;
        float B = texture2D(uVelocity, vUv - vec2(0.0, texelSize.y)).y;

        vec2 C = texture2D(uVelocity, vUv).xy;
        if (vUv.x < texelSize.x) L = -C.x;
        if (vUv.x > 1.0 - texelSize.x) R = -C.x;
        if (vUv.y > 1.0 - texelSize.y) T = -C.y;
        if (vUv.y < texelSize.y) B = -C.y;

        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `;

    const shaderPressure = `
      varying vec2 vUv;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;
      uniform vec2 texelSize;

      void main() {
        float L = texture2D(uPressure, vUv - vec2(texelSize.x, 0.0)).x;
        float R = texture2D(uPressure, vUv + vec2(texelSize.x, 0.0)).x;
        float T = texture2D(uPressure, vUv + vec2(0.0, texelSize.y)).x;
        float B = texture2D(uPressure, vUv - vec2(0.0, texelSize.y)).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
    `;

    const shaderGradientSubtract = `
      varying vec2 vUv;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;
      uniform vec2 texelSize;

      void main() {
        float L = texture2D(uPressure, vUv - vec2(texelSize.x, 0.0)).x;
        float R = texture2D(uPressure, vUv + vec2(texelSize.x, 0.0)).x;
        float T = texture2D(uPressure, vUv + vec2(0.0, texelSize.y)).x;
        float B = texture2D(uPressure, vUv - vec2(0.0, texelSize.y)).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `;

    const shaderSplat = `
      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;

      void main() {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
      }
    `;

    const shaderDisplay = `
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform sampler2D uPalette;

      void main() {
        float density = texture2D(uTexture, vUv).x;
        vec3 color = texture2D(uPalette, vec2(density, 0.5)).rgb;
        
        // Glow effect
        float glow = density * 1.5;
        glow = pow(glow, 1.2);
        
        gl_FragColor = vec4(color * glow, 1.0);
      }
    `;

    class WebGLManager {
      constructor(options) {
        this.$wrapper = options.$wrapper;
        this.palette = options.palette;
        this.autoDemo = options.autoDemo;
        this.autoSpeed = options.autoSpeed;
        this.autoIntensity = options.autoIntensity;
        this.takeoverDuration = options.takeoverDuration;
        this.autoResumeDelay = options.autoResumeDelay;
        this.autoRampDuration = options.autoRampDuration;

        this.width = this.$wrapper.clientWidth;
        this.height = this.$wrapper.clientHeight;
        this.aspectRatio = this.width / this.height;
        
        // Simulation settings
        this.simRes = 128; // Simulation resolution
        this.dyeRes = 512; // Dye resolution
        this.texelSize = new THREE.Vector2(1.0 / this.simRes, 1.0 / this.simRes);
        this.iterations = 3; // Jacobi iterations
        this.densityDissipation = 0.97;
        this.velocityDissipation = 0.98;
        this.splatRadius = 0.01; // reduced radius
        this.curl = 30;
        this.pressure = 0.8;

        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, preserveDrawingBuffer: false });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.$wrapper.appendChild(this.renderer.domElement);

        this.mouse = new THREE.Vector2();
        this.lastMouse = new THREE.Vector2();
        this.isMouseDown = false;
        
        this.initFBOs();
        this.initMaterials();
        this.initQuad();
        this.addEventListeners();
        
        this.lastTime = Date.now();
        this.timer = 0;
      }

      initFBOs() {
        const type = (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) ? THREE.HalfFloatType : THREE.FloatType;
        const options = {
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          format: THREE.RGBAFormat,
          type: type,
          depthBuffer: false,
          stencilBuffer: false
        };

        this.velocity = this.createDoubleFBO(this.simRes, this.simRes, options);
        this.density = this.createDoubleFBO(this.dyeRes, this.dyeRes, options);
        this.divergence = this.createFBO(this.simRes, this.simRes, options);
        this.pressure = this.createDoubleFBO(this.simRes, this.simRes, options);
      }

      createFBO(w, h, options) {
        return new THREE.WebGLRenderTarget(w, h, options);
      }

      createDoubleFBO(w, h, options) {
        return {
          read: this.createFBO(w, h, options),
          write: this.createFBO(w, h, options),
          swap: function() {
            let temp = this.read;
            this.read = this.write;
            this.write = temp;
          }
        };
      }

      initMaterials() {
        this.advectionProgram = new THREE.ShaderMaterial({
          uniforms: {
            uVelocity: { value: null },
            uSource: { value: null },
            texelSize: { value: this.texelSize },
            dt: { value: 0.016 },
            dissipation: { value: this.velocityDissipation }
          },
          vertexShader: vertexShaderBasic,
          fragmentShader: shaderAdvection
        });

        this.divergenceProgram = new THREE.ShaderMaterial({
          uniforms: {
            uVelocity: { value: null },
            texelSize: { value: this.texelSize }
          },
          vertexShader: vertexShaderBasic,
          fragmentShader: shaderDivergence
        });

        this.pressureProgram = new THREE.ShaderMaterial({
          uniforms: {
            uPressure: { value: null },
            uDivergence: { value: null },
            texelSize: { value: this.texelSize }
          },
          vertexShader: vertexShaderBasic,
          fragmentShader: shaderPressure
        });

        this.gradientSubtractProgram = new THREE.ShaderMaterial({
          uniforms: {
            uPressure: { value: null },
            uVelocity: { value: null },
            texelSize: { value: this.texelSize }
          },
          vertexShader: vertexShaderBasic,
          fragmentShader: shaderGradientSubtract
        });

        this.splatProgram = new THREE.ShaderMaterial({
          uniforms: {
            uTarget: { value: null },
            aspectRatio: { value: this.aspectRatio },
            color: { value: new THREE.Vector3() },
            point: { value: new THREE.Vector2() },
            radius: { value: this.splatRadius }
          },
          vertexShader: vertexShaderBasic,
          fragmentShader: shaderSplat
        });

        this.displayProgram = new THREE.ShaderMaterial({
          uniforms: {
            uTexture: { value: null },
            uPalette: { value: this.palette }
          },
          vertexShader: vertexShaderBasic,
          fragmentShader: shaderDisplay
        });
      }

      initQuad() {
        this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.advectionProgram);
        this.scene.add(this.quad);
      }

      addEventListeners() {
        this.$wrapper.addEventListener('mousemove', (e) => {
          this.lastMouse.copy(this.mouse);
          this.mouse.set(
            e.offsetX / this.width,
            1.0 - e.offsetY / this.height
          );
          if (!this.isMouseDown) {
             this.splat(this.mouse.x, this.mouse.y, 0.0, 0.0, 0.0); // subtle movement
          }
           // Calculate velocity from mouse movement
           let dx = this.mouse.x - this.lastMouse.x;
           let dy = this.mouse.y - this.lastMouse.y;
           this.splat(this.mouse.x, this.mouse.y, dx * 500, dy * 500, 1); 
        });
      }

      splat(x, y, dx, dy, colorFlag) {
        this.splatProgram.uniforms.uTarget.value = this.velocity.read.texture;
        this.splatProgram.uniforms.aspectRatio.value = this.aspectRatio;
        this.splatProgram.uniforms.point.value.set(x, y);
        this.splatProgram.uniforms.color.value.set(dx, dy, 1.0);
        this.splatProgram.uniforms.radius.value = this.splatRadius;
        
        this.quad.material = this.splatProgram;
        this.renderer.setRenderTarget(this.velocity.write);
        this.renderer.render(this.scene, this.camera);
        this.velocity.swap();

        this.splatProgram.uniforms.uTarget.value = this.density.read.texture;
        // Random color for density splat
        if(colorFlag) {
            const color = new THREE.Color().setHSL(Math.random(), 1.0, 0.5);
            this.splatProgram.uniforms.color.value.set(color.r, color.g, color.b);
        } else {
             this.splatProgram.uniforms.color.value.set(0.1, 0.1, 0.1); // faint trail
        }
        
        this.renderer.setRenderTarget(this.density.write);
        this.renderer.render(this.scene, this.camera);
        this.density.swap();
      }

      render() {
        // Advection
        this.advectionProgram.uniforms.uVelocity.value = this.velocity.read.texture;
        this.advectionProgram.uniforms.uSource.value = this.velocity.read.texture;
        this.advectionProgram.uniforms.dissipation.value = this.velocityDissipation;
        this.quad.material = this.advectionProgram;
        this.renderer.setRenderTarget(this.velocity.write);
        this.renderer.render(this.scene, this.camera);
        this.velocity.swap();

        this.advectionProgram.uniforms.uVelocity.value = this.velocity.read.texture;
        this.advectionProgram.uniforms.uSource.value = this.density.read.texture;
        this.advectionProgram.uniforms.dissipation.value = this.densityDissipation;
        this.quad.material = this.advectionProgram;
        this.renderer.setRenderTarget(this.density.write);
        this.renderer.render(this.scene, this.camera);
        this.density.swap();

        // Divergence
        this.divergenceProgram.uniforms.uVelocity.value = this.velocity.read.texture;
        this.quad.material = this.divergenceProgram;
        this.renderer.setRenderTarget(this.divergence);
        this.renderer.render(this.scene, this.camera);

        // Pressure
        this.pressureProgram.uniforms.uDivergence.value = this.divergence.texture;
        for (let i = 0; i < this.iterations; i++) {
          this.pressureProgram.uniforms.uPressure.value = this.pressure.read.texture;
          this.quad.material = this.pressureProgram;
          this.renderer.setRenderTarget(this.pressure.write);
          this.renderer.render(this.scene, this.camera);
          this.pressure.swap();
        }

        // Gradient Subtract
        this.gradientSubtractProgram.uniforms.uPressure.value = this.pressure.read.texture;
        this.gradientSubtractProgram.uniforms.uVelocity.value = this.velocity.read.texture;
        this.quad.material = this.gradientSubtractProgram;
        this.renderer.setRenderTarget(this.velocity.write);
        this.renderer.render(this.scene, this.camera);
        this.velocity.swap();

        // Display
        this.displayProgram.uniforms.uTexture.value = this.density.read.texture;
        this.quad.material = this.displayProgram;
        this.renderer.setRenderTarget(null);
        this.renderer.render(this.scene, this.camera);
      }

      start() {
        const animate = () => {
          this.render();
          this.rafId = requestAnimationFrame(animate);
        };
        animate();
      }

      dispose() {
        cancelAnimationFrame(this.rafId);
        this.renderer.dispose();
        // Dispose textures and materials if needed
      }
    }

    const container = mountRef.current;
    container.style.position = container.style.position || "relative";
    container.style.overflow = container.style.overflow || "hidden";

    const webgl = new WebGLManager({
      $wrapper: container,
      palette: paletteTex,
      autoDemo,
      autoSpeed,
      autoIntensity,
      takeoverDuration,
      autoResumeDelay,
      autoRampDuration,
    });
    webglRef.current = webgl;
    webgl.start();

    // Cleanup
    return () => {
      if (webglRef.current) webglRef.current.dispose();
    };
  }, [
    mouseForce,
    cursorSize,
    isViscous,
    viscous,
    iterationsViscous,
    iterationsPoisson,
    dt,
    BFECC,
    resolution,
    isBounce,
    colors,
    autoDemo,
    autoSpeed,
    autoIntensity,
    takeoverDuration,
    autoResumeDelay,
    autoRampDuration,
  ]);

  return (
    <div
      ref={mountRef}
      className={`liquid-ether-container ${className}`}
      style={containerStyle}
    />
  );
}
