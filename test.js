const fs=require('fs');const src=fs.readFileSync(__dirname+'/index.html','utf8').match(/<script id="dsp">([\s\S]*?)<\/script>/)[1];
const m={exports:{}};new Function('module',src)(m);const {shiftUp,wav}=m.exports;const SR=48000,N=SR*2,x=new Float32Array(N);
// "voz" sintética: armónicos de 200 Hz hasta 3 kHz con vibrato
for(let i=0;i<N;i++){const t=i/SR,f0=200+20*Math.sin(2*Math.PI*5*t);for(let h=1;h<=15;h++)x[i]+=Math.sin(2*Math.PI*f0*h*t)/h*0.1;}
fs.writeFileSync(__dirname+'/prueba_original.wav',Buffer.from(wav(x,SR)));fs.writeFileSync(__dirname+'/prueba_ultrasonido.wav',Buffer.from(wav(shiftUp(x,SR,18000),SR)));
