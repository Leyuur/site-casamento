import { useState, useEffect } from "react";
import NavItem from "./components/Nav/NavItems.jsx";
import Content from "./components/Content/Content.jsx";
import Loader from "./components/Loader/Loader.jsx";
import { ToastContainer } from 'react-toastify';

function App() {
  const [selectedPage, setSelectedPage] = useState(() => localStorage.getItem("lastPage") || "inicio");
  const [scrollTo, setScrollTo] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const loader = document.querySelector(".loader_spinner");
      const floral = document.getElementById("florar-s1");
      const imgnomes = document.getElementById("img-nomes");
      if (loader) {
        loader.style.display = "none";
        document.body.style.overflowY = "auto";
        floral.style.animation = "slideDown 1s ease";
        imgnomes.style.animation = "scaleIn 1s ease";
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (scrollTo) {
      const element = document.getElementById(scrollTo);
      if (element) {
        const yOffset = element.offsetTop + 150;
        window.scrollTo({ top: yOffset, behavior: "smooth" });
      }
      setScrollTo(null);
    }
  }, [scrollTo]);

  function handleSelect(page) {
    setSelectedPage(page);
    localStorage.setItem("lastPage", page);
  }

  return (
    <>
      <Loader />
      <nav>
        <NavItem onClick={() => handleSelect("inicio")}>GIOVANNA E YURI</NavItem>
        <NavItem
          isSelected={selectedPage === "inicio"}
          onClick={() => {
            handleSelect("inicio");
            setTimeout(() => setScrollTo("s2"), 100);
          }}
        >
          NOSSO CASAMENTO
        </NavItem>
        <NavItem
          isSelected={selectedPage === "inicio"}
          onClick={() => {
            handleSelect("inicio");
            setTimeout(() => setScrollTo("s3"), 100);
          }}
        >
          O GRANDE DIA
        </NavItem>
      </nav>
      <section id="dynamic-container">
        <Content page={selectedPage} />
      </section>
      <ToastContainer />
    </>
  );
}

export default App;
