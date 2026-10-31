const fs=require('fs'),D=__dirname;const src=fs.readFileSync(D+'/index.html','utf8').match(/<script id="dsp">([\s\S]*?)<\/script>/)[1];
const m={exports:{}};new Function('module',src)(m);const A=m.exports,SR=48000,W=(n,y)=>fs.writeFileSync(D+'/test/'+n+'.wav',Buffer.from(A.wav(y,SR)));fs.mkdirSync(D+'/test',{recursive:true});
const msg=A.synthMatrix(A.textMatrix('BARBIE',4),SR,15000,20000,3,0.3);W('barbie_solo',msg);
const voice=A.demoVoice(SR,5);W('voz',voice);W('barbie_sobre_voz',A.mixAt(voice,msg,Math.round(SR)));
const tone=new Float32Array(SR*4).map((_,i)=>0.5*Math.sin(2*Math.PI*440*i/SR));W('gate_120',A.gate(tone,SR,120,'44',0.5));
W('shift_18k',A.shiftUp(voice,SR,18000));
W('beats_120',A.beats(SR*4,SR,120,{kick:[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],hat:[],clap:[]},[]));
let fx=A.applyFx(voice,SR,[{t:'robot',a:60},{t:'echo',a:300,b:0.4},{t:'crush',a:6,b:4},{t:'speed',a:1.5},{t:'reverse'}]);console.log('fx chain ok len',fx.length,'finite',fx.every(Number.isFinite));
console.log('tremolo',A.tremolo(voice,SR,6,0.9).length,'chop',A.chop(voice,SR,125,3).length,'peaks voz',A.peaks(voice,SR).length,'patterns',['44','tresillo','morse','random'].map(p=>A.pattern(p,5)).join(' '));
