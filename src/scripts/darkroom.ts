/**
 * Darkroom light — the hero's optional WebGL layer.
 *
 * One fragment shader draws animated film grain, a vignette and a soft pool
 * of light that follows the pointer, lifting the frames out of a dimmed veil
 * the way a print surfaces in the developer tray. It never touches the
 * photographs' pixels; it is an overlay canvas with pointer-events: none.
 *
 * Only loaded when motion is allowed, Save-Data is off and WebGL exists.
 * Pauses offscreen and in background tabs. On touch devices the light
 * drifts on its own path instead of tracking a finger.
 */

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform vec2 uLight;   // in pixels, origin top-left
uniform float uTime;
uniform float uOpen;   // 0 -> 1 during the opening sequence

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  vec2 frag = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  float r = length(frag - uLight) / max(uRes.x, uRes.y);

  // Veil: dark away from the light, clear inside it. Before the opening
  // completes the whole strip sits in darkness.
  float pool = smoothstep(0.06, 0.55, r);
  // Kept light at rest (8% in the pool, 40% at the far edge) so the
  // photographs stay the subject; the effect is a lamp, not a filter.
  float veil = mix(0.92, 0.08 + 0.32 * pool, uOpen);

  // Vignette toward the strip's edges.
  vec2 uv = frag / uRes;
  float vig = smoothstep(0.35, 0.95, length(uv - 0.5) * 1.25);
  veil = clamp(veil + vig * 0.25, 0.0, 0.95);

  // Film grain, re-seeded ~24 times a second like projected film.
  float t = floor(uTime * 24.0);
  float n = hash(floor(frag / 1.5) + t);
  float g = 0.07;

  // Premultiplied: dark veil plus a light/dark grain speck.
  vec3 rgb = vec3(n) * g;
  float a = veil * (1.0 - g) + g;
  gl_FragColor = vec4(rgb, a);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? 'shader');
  return s;
}

/** Returns a cleanup function, or null when WebGL is unavailable. */
export function startDarkroom(host: HTMLElement, canvas: HTMLCanvasElement): (() => void) | null {
  const gl = canvas.getContext('webgl', { premultipliedAlpha: true, antialias: false, alpha: true });
  if (!gl) return null;

  let prog: WebGLProgram;
  try {
    prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  } catch {
    return null;
  }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  const uRes = gl.getUniformLocation(prog, 'uRes');
  const uLight = gl.getUniformLocation(prog, 'uLight');
  const uTime = gl.getUniformLocation(prog, 'uTime');
  const uOpen = gl.getUniformLocation(prog, 'uOpen');

  // Grain is drawn at CSS-pixel density: sharper buys nothing and costs fill rate.
  let w = 0;
  let h = 0;
  const resize = () => {
    const rect = host.getBoundingClientRect();
    w = Math.max(1, Math.round(rect.width));
    h = Math.max(1, Math.round(rect.height));
    canvas.width = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(host);

  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const target = { x: w * 0.5, y: h * 0.45 };
  const light = { ...target };
  const onMove = (e: PointerEvent) => {
    const rect = host.getBoundingClientRect();
    target.x = e.clientX - rect.left;
    target.y = e.clientY - rect.top;
  };
  if (finePointer) host.addEventListener('pointermove', onMove);

  let visible = true;
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) loop();
  });
  io.observe(host);

  const start = performance.now();
  let raf = 0;
  const frame = (now: number) => {
    raf = 0;
    if (!visible || document.hidden) return;
    const t = (now - start) / 1000;

    if (!finePointer) {
      // Slow Lissajous drift across the strip.
      target.x = w * (0.5 + 0.32 * Math.sin(t * 0.21));
      target.y = h * (0.45 + 0.18 * Math.sin(t * 0.33 + 1.2));
    }
    light.x += (target.x - light.x) * 0.06;
    light.y += (target.y - light.y) * 0.06;

    // Opening: 1.6s ease from darkness, matching the frame reveals.
    const o = Math.min(1, t / 1.6);
    const open = 1 - Math.pow(1 - o, 3);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(uRes, w, h);
    gl.uniform2f(uLight, light.x, light.y);
    gl.uniform1f(uTime, t);
    gl.uniform1f(uOpen, open);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    loop();
  };
  const loop = () => {
    if (!raf) raf = requestAnimationFrame(frame);
  };
  const onVis = () => !document.hidden && loop();
  document.addEventListener('visibilitychange', onVis);
  loop();

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    host.removeEventListener('pointermove', onMove);
    document.removeEventListener('visibilitychange', onVis);
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  };
}
