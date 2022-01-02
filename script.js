// vou capturar a imagem da webcam com essa primeira parte do código

const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(localMediaStream => {
            console.log(localMediaStream);
            video.srcObject = localMediaStream;
            video.play();
        })

        .catch(err => {
            console.error('Deu erro aqui', err)
        })
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width
    canvas.height = height

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height)
        let pixels = ctx.getImageData(0, 0, width, height)
    }, 14)
}

function takePhoto() {
    snap.currentTime = 0
    snap.play()

    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'Foto');
    link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
    strip.insertBefore(link, strip.firstChild);   
}

getVideo()

video.addEventListener('canplay', paintToCanvas) 





//Agora vou transformar a voz em legenda com o código abaixo

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition()
recognition.interimResults = true

let p = document.createElement('p')
const palavras = document.querySelector('.words')
palavras.appendChild(p)

recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')

        p.textContent = transcript

        console.log(transcript);
})

recognition.addEventListener('end', recognition.start)

recognition.start()