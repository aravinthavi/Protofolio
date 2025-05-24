import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent {
  @ViewChild('waveCanvas') waveCanvas!: ElementRef<HTMLCanvasElement>;
  mediaRecorder!: MediaRecorder;
  recordedChunks: Blob[] = [];
  audioUrl: string | null = null;
  audio: HTMLAudioElement | null = null;
  isRecording = false;
  elapsedTime = 0;
  animationFrameId!: number;
  playWave = false;
  private audioContext!: AudioContext;
  private analyser!: AnalyserNode;
  private source!: MediaStreamAudioSourceNode;
  private dataArray!: Uint8Array;
  get audioRecorded(): boolean {
    return !!this.audioUrl;
  }

  async startRecording() {
    this.isRecording = true;
    this.elapsedTime = 0;
    this.recordedChunks = [];
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.source = this.audioContext.createMediaStreamSource(stream);
    this.source.connect(this.analyser);

    this.analyser.fftSize = 256;
    const bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(bufferLength);
    this.drawWaveform();
    const interval = setInterval(() => {
      this.elapsedTime++;
      if (this.elapsedTime >= 30) {
        this.stopRecording();
        clearInterval(interval);
      }
    }, 1000);
    // this.drawWaveform();
    this.mediaRecorder = new MediaRecorder(stream);
    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        this.recordedChunks.push(e.data);
      }
    };

    this.mediaRecorder.onstop = () => {
      const blob = new Blob(this.recordedChunks, { type: 'audio/webm' });
      this.audioUrl = URL.createObjectURL(blob);
      this.audio = new Audio(this.audioUrl);
    };

    this.mediaRecorder.start();
    this.isRecording = true;
  }

  drawWaveform() {
    const canvas = this.waveCanvas.nativeElement;
    const ctx = canvas.getContext('2d')!;
    const width = canvas.width;
    const height = canvas.height;

    const draw = () => {
      this.animationFrameId = requestAnimationFrame(draw);
      this.analyser.getByteFrequencyData(this.dataArray);

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#eee';
      ctx.fillRect(0, 0, width, height);

      const barWidth = width / this.dataArray.length;
      let x = 0;

      for (let i = 0; i < this.dataArray.length; i++) {
        const value = this.dataArray[i];
        const barHeight = value / 2;
        ctx.fillStyle = 'rgb(50, 150, 250)';
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    };

    draw();
  }
  stopRecording() {
    this.mediaRecorder.stop();
    this.isRecording = false;
    this.audioUrl = null;
    this.source.disconnect();
    // cancelAnimationFrame(this.animationFrameId)
  }
  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${this.pad(mins)}:${this.pad(secs)}`;
  }

  pad(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }

  playAudio() {
    if (this.audio) {
      const playbackContext = new AudioContext();
      const source = playbackContext.createMediaElementSource(this.audio);
      this.analyser = playbackContext.createAnalyser();
      this.analyser.fftSize = 2048;
      this.dataArray = new Uint8Array(this.analyser.fftSize);
      source.connect(this.analyser);
      this.analyser.connect(playbackContext.destination);
      this.audio.play();
      this.drawWaveform();
    }
  }

  cancelAudio() {
    if (this.audioUrl) {
      URL.revokeObjectURL(this.audioUrl);
    }
    this.audioUrl = null;
    this.audio = null;
    this.recordedChunks = [];
    this.isRecording = false;
    this.elapsedTime = 0;
  }




  // @ViewChild('waveformCanvas', { static: false }) waveformCanvas!: ElementRef<HTMLCanvasElement>;
  // isRecording = false;
  // elapsedTime = 0;

  // private audioContext!: AudioContext;
  // private analyser!: AnalyserNode;
  // private mediaRecorder!: MediaRecorder;
  // private source!: MediaStreamAudioSourceNode;
  // private dataArray!: Uint8Array;
  // private animationFrameId!: number;
  // audioUrl: string | null = null;
  // audio: HTMLAudioElement | null = null;
  // recordedChunks: Blob[] = [];
  // private audioChunks: Blob[] = [];

  // constructor(private router: Router) {}

  // get audioRecorded(): boolean {
  //   return !!this.audioUrl;
  // }


  // // async startRecording() {
  // //   this.isRecording = true;
  // //   this.elapsedTime = 0;

  // //   const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  // //   this.audioContext = new AudioContext();
  // //   this.source = this.audioContext.createMediaStreamSource(stream);
  // //   this.analyser = this.audioContext.createAnalyser();
  // //   this.source.connect(this.analyser);

  // //   this.analyser.fftSize = 256;
  // //   const bufferLength = this.analyser.frequencyBinCount;
  // //   this.dataArray = new Uint8Array(bufferLength);

  // //   this.mediaRecorder = new MediaRecorder(stream);
  // //   this.mediaRecorder.start();

  // //   this.drawWaveform();

  // //   const interval = setInterval(() => {
  // //     this.elapsedTime++;
  // //     if (this.elapsedTime >= 30) {
  // //       this.stopRecording();
  // //       clearInterval(interval);
  // //     }
  // //   }, 1000);
  // // }
  // async startRecording() {
  //   this.isRecording = true;
  //   this.elapsedTime = 0;

  //   this.recordedChunks = [];
  //   const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  //   this.mediaRecorder = new MediaRecorder(stream);
  //   this.mediaRecorder.ondataavailable = (e) => {
  //     if (e.data.size > 0) {
  //       this.recordedChunks.push(e.data);
  //     }
  //   };
  //   this.drawWaveform();

  //   this.mediaRecorder.onstop = () => {
  //     const blob = new Blob(this.recordedChunks, { type: 'audio/webm' });
  //     this.audioUrl = URL.createObjectURL(blob);
  //     this.audio = new Audio(this.audioUrl);
  //   };

  //   this.mediaRecorder.start();
  //   this.isRecording = true;
  // }
  // stopRecording() {
  //   this.isRecording = false;
  //   this.mediaRecorder.stop();
  //   this.audioContext.close();
  //   cancelAnimationFrame(this.animationFrameId);

  //   // Redirect to next view (e.g., showing audio2.png)
  //   this.router.navigate(['/audio2']); // adjust this to your routing path
  // }
  // formatTime(seconds: number): string {
  //   const mins = Math.floor(seconds / 60);
  //   const secs = seconds % 60;
  //   return `${this.pad(mins)}:${this.pad(secs)}`;
  // }

  // pad(value: number): string {
  //   return value < 10 ? '0' + value : value.toString();
  // }
  // drawWaveform() {
  //   const canvas = this.waveformCanvas.nativeElement;
  //   const ctx = canvas.getContext('2d')!;
  //   const width = canvas.width;
  //   const height = canvas.height;

  //   const draw = () => {
  //     this.animationFrameId = requestAnimationFrame(draw);
  //     this.analyser.getByteFrequencyData(this.dataArray);

  //     ctx.clearRect(0, 0, width, height);
  //     ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  //     ctx.fillRect(0, 0, width, height);

  //     const barWidth = (width / this.dataArray.length) * 2.5;
  //     let x = 0;

  //     for (let i = 0; i < this.dataArray.length; i++) {
  //       const barHeight = this.dataArray[i];
  //       ctx.fillStyle = `rgb(${barHeight + 100}, 50, 150)`;
  //       ctx.fillRect(x, height - barHeight / 2, barWidth, barHeight / 2);
  //       x += barWidth + 1;
  //     }
  //   };

  //   draw();
  // }
  // playAudio() {
  //   this.audio?.play();
  // }

  // cancelAudio() {
  //   this.audioUrl = null;
  //   this.audio = null;
  //   this.audioChunks = [];
  //   this.isRecording = false;
  // }
}
