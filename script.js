"use strict";

const pianoKeys = document.querySelectorAll('.piano-key');
const PIANO = document.querySelector('.piano');
const fullscreenButton = document.querySelector('.fullscreen');
const notes = document.querySelector('.btn-notes');
const letters = document.querySelector('.btn-letters');

function playAudioByKeydown(event) {
    const key = document.querySelector(`.piano-key[data-letter="${event.code}"]`);
    if(!key) return;
    if(event.repeat) return;
    const note = key.dataset.note;
    const src = `assets/audio/${note}.mp3`; 
    playAudio(src);
    key.classList.add('piano-key-active');
}

function playAudioByClick(event){
    if(playAudioByMouse) return;
    if(event.target.classList.contains('piano-key')){
        pianoKeys.forEach((el) => {
            if(el.classList.contains('piano-key-active')) {
              el.classList.remove('piano-key-active');
            } 
          });
        const note = event.target.dataset.note;             // getting data-note of element with class 'piano-key'
        const src = `assets/audio/${note}.mp3`;  
        playAudio(src);
        event.target.classList.add('piano-key-active');
        setTimeout(() => {
            event.target.classList.remove('piano-key-active')
        }, 100);
    }
}

function playAudio(src){
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
}

function removeTransition(e) {
    if(e.propertyName !== 'transform') return;
    this.classList.remove('piano-key-active');
}

function openFullscreen(){
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
    } 
}

function playAudioByMouse(e){
    if(e.target.classList.contains('piano-key')){
        pianoKeys.forEach((el) => {
            if(el.classList.contains('piano-key-active')) {
              el.classList.remove('piano-key-active');
            } 
          });
        const note = e.target.dataset.note;             // getting data-note of element with class 'piano-key'
        const src = `assets/audio/${note}.mp3`;  
        playAudio(src);
        e.target.classList.add('piano-key-active');     
    }
}

function starCorrespondOver(e) {
    e.target.classList.add('piano-key-active');
    const note = e.target.dataset.note;             
    const src = `assets/audio/${note}.mp3`;  
    playAudio(src);
    pianoKeys.forEach(e => {
        e.addEventListener('mouseover', playAudioByMouse);
        e.addEventListener('mouseout', removeTransition);
    })
}

function stopCorrespondOver() { 
    pianoKeys.forEach(e => {
        e.classList.remove('piano-key-active');
        e.removeEventListener('mouseover', playAudioByMouse);
        e.removeEventListener('mouseout', removeTransition)
    })
}

PIANO.addEventListener('mousedown', starCorrespondOver, false);

document.body.addEventListener('mouseup', stopCorrespondOver);

fullscreenButton.addEventListener('click', openFullscreen);

PIANO.addEventListener('click', playAudioByClick);

window.addEventListener('keydown', playAudioByKeydown);

window.addEventListener('keyup', (e) => {
    const key = document.querySelector(`.piano-key[data-letter="${e.code}"]`);
    if(!key) return;
    key.classList.remove('piano-key-active');
});

notes.addEventListener('click', function(e){
    letters.classList.remove('btn-active');
    pianoKeys.forEach(el => el.classList.remove('piano-key-letter'));
    e.target.classList.add('btn-active');
});

letters.addEventListener('click', function(e){
    notes.classList.remove('btn-active');
    pianoKeys.forEach(el => el.classList.add('piano-key-letter'));
    e.target.classList.add('btn-active');
});
