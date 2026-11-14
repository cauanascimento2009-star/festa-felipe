const capa = document.getElementById('capa');
const exibicao = document.getElementById('exibicao');
const detalhes = document.getElementById('detalhes');
const sugestoes = document.getElementById('sugestoes');
const video = document.getElementById('video');
const arquivoVideo = video.getAttribute('src');
const erro = document.getElementById('erro');
const botaoMusica = document.getElementById('musica');
const botaoSomVideo = document.getElementById('som-video');
const botaoPresentes = document.getElementById('presentes');

function reproduzir() {
  video.loop = false;
  if (video.getAttribute('src') !== arquivoVideo) {
    video.src = arquivoVideo;
  } else if (video.currentTime > 0) {
    video.currentTime = 0;
  }
  capa.hidden = true;
  detalhes.hidden = true;
  exibicao.hidden = false;
  erro.hidden = !video.error;
  video.play().catch(() => {
    if (!exibicao.hidden && video.error) {
      erro.hidden = false;
    }
  });
  video.focus({ preventScroll: true });
}

function mostrarDetalhes() {
  video.pause();
  exibicao.hidden = true;
  detalhes.hidden = false;
  document.getElementById('titulo-detalhes').focus({ preventScroll: true });

  // Reaproveita o player que o visitante já ativou ao abrir o convite.
  video.src = 'raining-tacos-trilha-suave.m4a';
  video.loop = true;
  video.play().catch(atualizarBotaoMusica);
}

function atualizarBotaoMusica() {
  botaoMusica.textContent = video.paused || video.muted || video.error
    ? 'Tocar música'
    : 'Pausar música';
}

document.getElementById('abrir').addEventListener('click', (event) => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return;
  }
  event.preventDefault();
  reproduzir();
});
document.getElementById('pular').addEventListener('click', mostrarDetalhes);
document.getElementById('rever').addEventListener('click', reproduzir);
botaoSomVideo.addEventListener('click', () => {
  video.muted = !video.muted;
});
botaoMusica.addEventListener('click', () => {
  if (video.paused || video.muted) {
    video.muted = false;
    video.play().catch(atualizarBotaoMusica);
  } else {
    video.pause();
  }
});
botaoPresentes.addEventListener('click', () => {
  detalhes.hidden = true;
  sugestoes.hidden = false;
  document.getElementById('titulo-sugestoes').focus({ preventScroll: true });
});
document.getElementById('voltar').addEventListener('click', () => {
  sugestoes.hidden = true;
  detalhes.hidden = false;
  botaoPresentes.focus({ preventScroll: true });
});
video.addEventListener('ended', mostrarDetalhes);
video.addEventListener('play', atualizarBotaoMusica);
video.addEventListener('pause', atualizarBotaoMusica);
video.addEventListener('volumechange', () => {
  botaoSomVideo.textContent = video.muted ? 'Ativar som do vídeo' : 'Silenciar vídeo';
  atualizarBotaoMusica();
});
video.addEventListener('error', () => {
  atualizarBotaoMusica();
  erro.hidden = false;
});
