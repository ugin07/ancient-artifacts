const CATEGORIES = [
  {
    id: "prehistoria",
    title: "Prehistoria",
    items: [
      { key: "prehistoria-wenus-z-wilendorfu", title: "Wenus z Wilendorfu" },
      { key: "prehistoria-malarstwo-jaskiniowe-w-lascaux", title: "Malarstwo jaskiniowe w Lascaux" },
      { key: "prehistoria-malarstwo-jaskiniowe-w-altamirze", title: "Malarstwo jaskiniowe w Altamirze" },
      { key: "prehistoria-megality-w-stonhenge", title: "Megality w Stonhenge" }
    ]
  },
  {
    id: "mezopotamia",
    title: "Sztuka Mezopotamii",
    items: [
      { key: "mezopotamia-zigurat-z-ur", title: "Zigurat z Ur" },
      { key: "mezopotamia-sztandar-z-ur", title: "Sztandar z Ur" },
      { key: "mezopotamia-lamassu-z-bramy-palacu-sargona-ii", title: "Lamassu z bramy pałacu Sargona II" },
      { key: "mezopotamia-brama-isztar-z-niniwy", title: "Brama Isztar z Niniwy" },
      { key: "mezopotamia-stela-hamurabiego", title: "Stela Hamurabiego" },
      { key: "mezopotamia-scena-walki-assurbanipala-z-lwem", title: "Scena walki króla Assurbanipala z lwem z pałacu w Niniwie" },
      { key: "mezopotamia-fryz-lucznikow-suzy", title: "Fryz łuczników z pałacu Dariusza w Suzie" },
      { key: "mezopotamia-posag-krola-gudei", title: "Posag króla Gudei" },
      { key: "mezopotamia-pieczec-cylindryczna-ur", title: "Pieczęć cylindryczna z grobowca z Ur" },
      { key: "mezopotamia-glowa-wladcy-sargon-ii-z-brazu", title: "Głowa władcy, przypuszczalnie Sargona II (z brązu)" }
    ]
  },
  {
    id: "egipt",
    title: "Sztuka Egiptu",
    items: [
      { key: "egipt-piramida-dzesera-w-sakkarze", title: "Piramida Dżesera w Sakkarze" },
      { key: "egipt-piramidy-w-gizie", title: "Piramidy Chopsa, Chefrena i Mykerinosa w Gizie" },
      { key: "egipt-swiatynia-amona-w-karnaku", title: "Świątynia Amona w Karnaku" },
      { key: "egipt-swiatynia-hatszepsut", title: "Świątynia Hatszepsut" },
      { key: "egipt-swiatynia-ramsesa-ii-abu-simbel", title: "Świątynia Ramsesa II w Abu Simbel" },
      { key: "egipt-pylony-swiatyni-w-edfu", title: "Pylony świątyni w Edfu" },
      { key: "egipt-obelisk-totmesa-i-w-karnaku", title: "Obelisk Totmesa I w Karnaku" },
      { key: "egipt-sfinks-w-giza", title: "Sfinks w Giza" },
      { key: "egipt-kolosy-memnona-w-luksorze", title: "Kolosy Memnona w Luksorze" },
      { key: "egipt-siedzacy-skryba", title: "Siedzący skryba" },
      { key: "egipt-triada-mykerinosa", title: "Triada Mykerinosa" },
      { key: "egipt-posagi-ramzesa-ii-abu-simbel", title: "Posagi Ramzesa II w Abu Simbel" },
      { key: "egipt-rzezba-echnatona", title: "Rzeźba Echnatona" },
      { key: "egipt-popiersie-nefertiti", title: "Popiersie królowej Nefertiti" },
      { key: "egipt-maska-posmiertna-tutenchamona", title: "Maska pośmiertna Tutenchamona" },
      { key: "egipt-paleta-narmera", title: "Paleta Narmera" },
      { key: "egipt-echnaton-promienie-sloneczne-plaskorzezba", title: "Echnaton przyjmujący promienie słoneczne wraz z żoną i synami (płaskorzeźba)" },
      { key: "egipt-polowanie-na-dzikie-ptactwo-grob-menny", title: "Malarstwo – polowanie na dzikie ptactwo z grobu Menny" },
      { key: "egipt-gesi-z-meidum", title: "Gęsi z Meidum" },
      { key: "egipt-portrety-fajumskie", title: "Portrety fajumskie" }
    ]
  },
  {
    id: "grecja",
    title: "Sztuka Grecji",
    items: [
      { key: "grecja-partenon-akropol-ateny", title: "Partenon na Akropolu w Atenach" },
      { key: "grecja-erechtejon-akropol-ateny", title: "Erechtejon na Akropolu w Atenach" },
      { key: "grecja-swiatynia-nike-apteros", title: "Świątynia Nike – Apteros na Akropolu" },
      { key: "grecja-swiatynia-posejdona-paestum", title: "Świątynia Posejdona w Paestum" },
      { key: "grecja-teatr-epidauros", title: "Teatr w Epidauros" },
      { key: "grecja-stadion-olimpijski-afrodyzja", title: "Stadion olimpijski w Afrodyzji (Turcja)" },
      { key: "grecja-kora", title: "Kora" },
      { key: "grecja-kleobis-i-biton", title: "Kleobis i Biton" },
      { key: "grecja-dyskobol-myron", title: "Dyskobol (Myron)" }
    ]
  },
  {
    id: "egejska",
    title: "Sztuka egejska",
    items: [
      { key: "egejska-sala-tronowa-knossos", title: "Sala tronowa pałacu w Knossos" },
      { key: "egejska-ksiaze-wsrod-lilii-knossos", title: "Książę wśród lilii pałac w Knossos" },
      { key: "egejska-lwia-brama-mykeny", title: "Lwia brama cytadeli w Mykenach" },
      { key: "egejska-grob-agamemnona-mykeny", title: "Grób Agamemnona w Mykenach" },
      { key: "egejska-zlota-maska-agamemnona", title: "Złota maska Agamemnona" }
    ]
  },
  {
    id: "etruska",
    title: "Sztuka etruska",
    items: [
      { key: "etruska-sarkofag-malzonkow-caere", title: "Sarkofag małżonków z Caere" },
      { key: "etruska-chimera-z-arezzo", title: "Chimera z Arezzo" },
      { key: "etruska-grobowiec-leopardow", title: "Grobowiec Leopardów" }
    ]
  },
  {
    id: "rzymska",
    title: "Sztuka rzymska",
    items: [
      { key: "rzym-panteon", title: "Panteon w Rzymie" },
      { key: "rzym-koloseum", title: "Koloseum" },
      { key: "rzym-forum-romanum", title: "Forum Romanum" },
      { key: "rzym-luk-tytusa", title: "Łuk Tytusa" },
      { key: "rzym-kolumna-trajana", title: "Kolumna Trajana" },
      { key: "rzym-august-z-prima-porta", title: "August z Prima Porta" },
      { key: "rzym-ara-pacis", title: "Ołtarz pokoju (Ara Pacis)" },
      { key: "rzym-sarkofag-ludovisi", title: "Sarkofag Ludovisi" }
    ]
  }
];

module.exports = { CATEGORIES };
