/* ===========================================================
   NÍVEIS
   =========================================================== */

const NIVEIS = [
    {
        nome: 'Fácil',
        duracao: 30,
        tempoAlvo: 1500,
        tamanho: 72
    },

    {
        nome: 'Médio',
        duracao: 30,
        tempoAlvo: 1200,
        tamanho: 56
    },

    {
        nome: 'Difícil',
        duracao: 20,
        tempoAlvo: 900,
        tamanho: 40
    }
];


function sortearNumero(minimo, maximo) {
    return Math.floor(
        Math.random() * (maximo - minimo + 1)
    ) + minimo;
}


function bateuRecorde(pontos, recorde) {
    return pontos > recorde;
}


function montarMensagemDeFim(pontos, recorde) {

    if (bateuRecorde(pontos, recorde)) {
        return 'Novo recorde: ' + pontos + ' pontos!';
    }

    return 'Fim! ' + pontos + ' pontos. O recorde é ' + recorde + '.';
}


function sortearAlvoDourado() {
    return sortearNumero(1, 5) === 1;
}



function estaAcabando(tempo) {
    return tempo <= 5;
}

function calcularTempoDoAlvo(nivel, pontos) {

    const reducao = Math.floor(pontos / 10) * 150;

    return Math.max(500, nivel.tempoAlvo - reducao);
}

const alvo = document.querySelector('.alvo');
const botaoComecar = document.querySelector('.botao-comecar');
const mensagem = document.querySelector('.mensagem');
const campoNivel = document.querySelector('#nivel');

const telaPontos = document.querySelector('.pontos');
const telaTempo = document.querySelector('.tempo');
const telaRecorde = document.querySelector('.recorde');


const jogo = {
    pontos: 0,
    tempoRestante: 30,
    recorde: 0,
    nivel: 1
};

let cronometro;
let fuga;

function moverAlvo() {

    alvo.style.left =
        sortearNumero(10, 90) + '%';

    alvo.style.top =
        sortearNumero(10, 90) + '%';


    /* Sorteia se será dourado */

    alvo.classList.remove('dourado');

    if (sortearAlvoDourado()) {
        alvo.classList.add('dourado');
    }


    clearTimeout(fuga);


    const nivelAtual =
        NIVEIS[jogo.nivel];


    fuga = setTimeout(function () {

        moverAlvo();

    }, calcularTempoDoAlvo(
        nivelAtual,
        jogo.pontos
    ));
}


   //MOSTRAR O PLACAR
   
function mostrarPlacar() {

    telaPontos.textContent =
        jogo.pontos;

    telaTempo.textContent =
        jogo.tempoRestante;

    telaRecorde.textContent =
        jogo.recorde;


    // Últimos 5 segundos devem ficar em vermelhos 

    if (estaAcabando(jogo.tempoRestante)) {
        telaTempo.style.color = 'red';
    } else {
        telaTempo.style.color = '';
    }
}



   //INICIO DE JOGO

function iniciarJogo() {

    jogo.pontos = 0;

    jogo.nivel =
        Number(campoNivel.value);


    const nivelAtual =
        NIVEIS[jogo.nivel];


    jogo.tempoRestante =
        nivelAtual.duracao;


    // tamanho do alvo

    alvo.style.width =
        nivelAtual.tamanho + 'px';

    alvo.style.height =
        nivelAtual.tamanho + 'px';

    campoNivel.disabled = true;

    botaoComecar.disabled = true;

    mensagem.textContent = 'Vai!';

    alvo.classList.remove('escondido');

    moverAlvo();

    mostrarPlacar();


    cronometro = setInterval(function () {

        passarUmSegundo();

    }, 1000);
}

function passarUmSegundo() {

    jogo.tempoRestante =
        jogo.tempoRestante - 1;


    mostrarPlacar();


    if (jogo.tempoRestante === 0) {
        encerrarJogo();
    }
}

   //FIM DE JOGO

function encerrarJogo() {

    clearInterval(cronometro);
    clearTimeout(fuga);


    mensagem.textContent =
        montarMensagemDeFim(
            jogo.pontos,
            jogo.recorde
        );


    if (bateuRecorde(
        jogo.pontos,
        jogo.recorde
    )) {

        jogo.recorde =
            jogo.pontos;
    }


    alvo.classList.add('escondido');

    alvo.classList.add('dourado');

// troca de niveis 

    campoNivel.disabled = false;

    botaoComecar.disabled = false;

    botaoComecar.textContent =
        'Jogar de novo';


    mostrarPlacar();
}


botaoComecar.addEventListener(
    'click',
    function () {

        iniciarJogo();
    }
);


alvo.addEventListener(
    'click',
    function () {

        // Alvo especial +3 pontos
        if (
            alvo.classList.contains('dourado')
        ) {

            jogo.pontos =
                jogo.pontos + 3;

        } else {

            // Alvo normal + 1 ponto
            jogo.pontos =
                jogo.pontos + 1;
        }


        mostrarPlacar();

        moverAlvo();
    }
);

mostrarPlacar();

 
