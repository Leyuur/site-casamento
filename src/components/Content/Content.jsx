import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import FLORAL from '../../assets/inicio/FLORAL.png';
import POLAROIDS from '../../assets/inicio/POLAROIDS INICIO.png';
import POLAROIDS_MOBILE from '../../assets/inicio/FOTOS INICIO.png';
import NOMES from '../../assets/inicio/NOMES.png';
import FLORES from '../../assets/inicio/FLORES FUNDO.png';
import FLORAL_FUNDO from '../../assets/inicio/FLORAL FUNDO.png';
import FLORAL_FUNDO_MOBILE from '../../assets/inicio/FLORAL FUNDO MOBILE.png';
import FOTO_LOCAL from '../../assets/inicio/FOTO LOCAL.png'
import CORES from '../../assets/inicio/CORES.png';
import CLOCK from '../../assets/inicio/CLOCK.png';
import FLORAL_MOBILE from '../../assets/inicio/FLORAL_MOBILE.png';

export default function Content({ page }) {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const targetDate = new Date('2025-06-21T00:00:00');

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeRemaining({ days, hours, minutes, seconds });
      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    initMap();
  }, []);

  async function handleSubmit(name, presence) {
    if (name) {
      
      try {
        const body = new URLSearchParams({ name: name, presence: presence }).toString();
        const response = await fetch('https://casamentogiovannaeyuri.site/server/presence.php', {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },          
          body: body,
        });
  
        const data = await response.json();
        if (response.ok) {
          if(data.error) {
            toast.error(data.error);
          }
          else {
            console.log(data.message);
            toast.success(data.message);
            setIsPopupOpen(false);
          }
        } else {
          toast.error("Algo deu errado.");
        }
      } catch (error) {
        console.error(error);
        toast.error(error);
      }
    } else {
      toast.error("Você deve inserir um nome.")
    }
  }

document.addEventListener("scroll", () => {
  const arrow = document.getElementById("container-arrow");
  const s2Top = document.getElementById("s2").offsetTop;
  const windowTop = window.scrollY;

    if(s2Top <= windowTop) {
      arrow.classList.add("hidden");
    }
    else {
      arrow.classList.remove("hidden");
    }
})

let map;

async function initMap() {
  const position = { lat: -22.929212586987756, lng: -43.57971334758136 };

  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    zoom: 16,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Espaço Cantagalo",
  });
}

  const PAGES = {
    inicio: (
      <div id="inicio">
        <div id='container-arrow'>
          <p>Confirme sua presença aqui</p>
          <span class="material-symbols-outlined" id='confirm-arrow'
            onClick={()=> window.scrollTo({
              top: document.getElementById("s2").offsetTop + 100,
              behavior: "smooth",
            })
            }>arrow_downward
          </span>
        </div>
        <section id="s1">
          <h3>
            21 de Junho de 2025<br />
            Espaço Cantagalo, Campo Grande - Rio de Janeiro
          </h3>
          <img id="img-nomes" src={NOMES} alt="Nomes" />
          <img id="florar-s1" src={ window.innerWidth > 768 ? FLORAL : FLORAL_MOBILE
            } alt="Floral" />
        </section>
        <section id="s2">
          <h1>Nosso casamento</h1>
          <p>
            Estamos muito felizes e gratos por estarmos realizando o sonho do nosso <br />casamento.<br />
            Sabemos que mais que um dia específico de festa, podemos confiar em você em nossa vida como casal. Obrigada por demonstrar tanto carinho com a nossa história e com tudo que estamos construindo. 
            <br />
            <br />
            Vamos celebrar e declarar nosso amor um pelo outro no dia 21 de junho de 2025, e a sua presença é extremamente importante para nós!
            Então nos diga: podemos contar com você no nosso Grande Dia?
          </p>
          <div id="div-confirm-presenca">
            <button id="confirm-presenca" onClick={()=> setIsPopupOpen(true)}>CONFIRMAR PRESENÇA</button>
            <p id="click-confirm">*Clique no botão para confirmar sua presença</p>
          </div>
          <div id="div-countdown">
            <div id="dias">
              <h1 id='time'>{timeRemaining.days}</h1>
              <p>DIAS</p>
            </div>
            <div id="horas">
              <h1 id='time'>{timeRemaining.hours}</h1>
              <p>HORAS</p>
            </div>
            <div id="minutos">
              <h1 id='time'>{timeRemaining.minutes}</h1>
              <p>MINUTOS</p>
            </div>
            <div id="segundos">
              <h1 id='time'>{timeRemaining.seconds}</h1>
              <p>SEGUNDOS</p>
            </div>
          </div>
          <img id="polaroids-s2" src={
            window.innerWidth > 768 ? POLAROIDS : POLAROIDS_MOBILE
            } alt="Polaroids" />
        </section>
        <section id="s3">
          <img id="flores-fundo" src={FLORES} alt="Flores" />
          <h1>O Grande Dia</h1>

            <div id="location">
              <h2>1. Localização</h2>
              <div id="photo-map">
                <img id="foto_local" src={FOTO_LOCAL} alt="Foto Local" />
                <div id="map"></div>
              </div>
              <p>Local: Espaço Cantagalo: Estr. do Cantagalo, 865 - Lote 2 - Campo Grande, Rio de Janeiro.</p>
              <h2>INFORMAÇÕES IMPORTANTES</h2>
              <ul>
                <li>A cerimônia e festa serão no mesmo local.</li>
                <li>O Espaço Cantagalo está localizado a 5 minutos do Park Shopping Campo Grande (melhor caminho de acesso é através do Recreio, passando por Mato Alto.) </li>
                <li>O salão oferece estacionamento seguro. </li>
              </ul>
            </div>
            <div id="event-info">
              <h2>2. O Evento</h2>
              <div id="infos">
                <div id="color-palette">
                  <p>Paleta de cores madrinhas: <img src={CORES} alt="Paleta de Cores" /></p>
                  <p>Se você é convidada, pedimos para que, se possível não ir com a paleta de cores acima.</p>
                </div>
                <div id="date-time">
                  <p>Data e Hoário:</p>
                  <p><img src={CLOCK} alt="Relógio" /> 21 | 06 | 2025 às 16:30</p>
                </div>
              </div>
            </div>
        </section>
        <section id="s4">
          <h1>Obrigado!</h1>
          <p>Nosso coração se alegra em dar esse novo passo.<br />
          Estamos cheios de gratidão por comemorar esse momento com vocês!</p>
          <p><b><i>Grandes coisas fez o Senhor por nós, e por isso estamos alegres.<br />
          Salmo 126:3</i></b></p>
        <img id="floral-fundo" src={
          window.innerWidth > 768 ? FLORAL_FUNDO : FLORAL_FUNDO_MOBILE
          } alt="Floral Fundo"/>
        </section>
        {isPopupOpen && 
          <div id='confirm-popup'>
            <div>
              <span onClick={() => setIsPopupOpen(false)} id='btn-close' class="material-symbols-outlined">
                close
              </span>
              <div id="confirm-popup-top">
              <span class="material-symbols-outlined">favorite</span>
              </div>
              <div id="confirm-popup-bottom">
                <h1>Confirmar Presença?</h1>
                <h3>Esta ação não poderá ser desfeita.</h3>
                <input type="text" id="input-confirm" placeholder='Digite seu nome completo'/>
                <div id="buttons-popup">
                  <button id='confirm' onClick={async () => handleSubmit(document.getElementById("input-confirm").value, "Sim")}>Confirmar Presença</button>
                  <button id='deny' onClick={async () => handleSubmit(document.getElementById("input-confirm").value, "Não")}>Negar Presença</button>
                </div>
              </div>
              
            </div>
          </div>
        }
      </div>
    ),
    historia: (
      <div id="historia">
        <h1>Nossa história aqui</h1>
      </div>
    ),
    infos: (
      <div id="infos">
        <h1>Confira as informações aqui</h1>
      </div>
    ),
    presentes: (
      <div id="presentes">
        <h1>Escolha um presente para nos dar</h1>
      </div>
    ),
  };

  return PAGES[page];
}
