import numpy as np,matplotlib;matplotlib.use('Agg');import matplotlib.pyplot as plt;from scipy.io import wavfile;from scipy import signal
d='/workspace/ultrasonido/v2/test/'
def rd(n):sr,y=wavfile.read(d+n+'.wav');return sr,y.astype(float)/32768
for n in['barbie_solo','barbie_sobre_voz']:
  sr,y=rd(n);f,t,S=signal.spectrogram(y,sr,nperseg=2048,noverlap=1536)
  plt.figure(figsize=(10,5));plt.pcolormesh(t,f/1000,10*np.log10(S+1e-12),cmap='magma',vmin=10*np.log10(S.max())-70);plt.ylabel('kHz');plt.xlabel('s');plt.title(n);plt.savefig(d+n+'.png',dpi=100);plt.close()
  if n=='barbie_solo':
    plt.figure(figsize=(10,3));m=(f>=14500)&(f<=20500);plt.pcolormesh(t,f[m]/1000,10*np.log10(S[m]+1e-12),cmap='magma',vmin=10*np.log10(S.max())-60);plt.ylabel('kHz');plt.title('BARBIE 15-20 kHz');plt.tight_layout();plt.savefig(d+'barbie_zoom.png',dpi=110);plt.close()
for n,bpm in[('gate_120',120),('beats_120',120)]:
  sr,y=rd(n);e=np.convolve(np.abs(y),np.ones(480)/480,'same');p,_=signal.find_peaks(e,height=e.max()*0.5,distance=int(sr*0.2));dd=np.diff(p)/sr
  print(n,'pulsos',len(p),'separación media %.3f s (esperado %.3f)'%(dd.mean(),60/bpm),'std %.4f'%dd.std())
sr,y=rd('shift_18k');P=np.abs(np.fft.rfft(y))**2;f=np.fft.rfftfreq(len(y),1/sr);print('shift: 18-24k %.2f%%'%(100*P[f>=18000].sum()/P.sum()))
sr,y=rd('barbie_solo');P=np.abs(np.fft.rfft(y))**2;f=np.fft.rfftfreq(len(y),1/sr);print('mensaje: 14.9-20.1k %.2f%%'%(100*P[(f>=14900)&(f<=20100)].sum()/P.sum()))
