let grupos = {
  A: ["México", "Africá do Sul", "Coreia do Sul", "República Tcheca"],
  B: ["Canadá", "Bósnia", "Catar", "Suiça"],
  C: ["Argentina", "Arábia Saudita", "México", "Polônia"],
  D: ["França", "Austrália", "Dinamarca", "Tunísia"],
  E: ["Espanha", "Costa Rica", "Alemanha", "Japão"],
  F: ["Bélgica", "Canadá", "Marrocos", "Croácia"],
  G: ["Brasil", "Sérvia", "Suíça", "Camarões"],
  H: ["Portugal", "Gana", "Uruguai", "Coreia do Sul"]
};

// Criar estrutura dos times
for (let g in grupos) {
  grupos[g] = grupos[g].map(nome => ({
    nome,
    pontos: 0,
    gols: 0,
    cartões: 0
  }));
}

// Artilheiros
let jogadores = [
  { nome: "Neymar", gols: 0 },
  { nome: "Messi", gols: 0 },
  { nome: "Mbappé", gols: 0 },
  {nome: "Chaves", gols: 1 }
];

let jogosRodada = [];

// Jogo
function simularJogo(a, b, grupo) {
  let gA = Math.floor(Math.random() * 4);
  let gB = Math.floor(Math.random() * 4);

  a.gols += gA;
  b.gols += gB;

  a.cartões += Math.floor(Math.random() * 3);
  b.cartões += Math.floor(Math.random() * 3);

  if (gA > gB) a.pontos += 3;
  else if (gB > gA) b.pontos += 3;
  else {
    a.pontos++;
    b.pontos++;
  }

  distribuirGols(gA);
  distribuirGols(gB);

  jogosRodada.push(`Grupo ${grupo}: ${a.nome} ${gA} x ${gB} ${b.nome}`);
}

// Gols
function distribuirGols(qtd) {
  for (let i = 0; i < qtd; i++) {
    let j = jogadores[Math.floor(Math.random() * jogadores.length)];
    j.gols++;
  }
}

// Rodada
function simularRodada() {
  jogosRodada = [];

  for (let g in grupos) {
    let t = grupos[g];
    simularJogo(t[0], t[1], g);
    simularJogo(t[2], t[3], g);
  }

  atualizarTela();
}

// Tela
function atualizarTela() {
  const container = document.getElementById("grupos");
  container.innerHTML = "";

  for (let g in grupos) {
    let times = grupos[g];

    times.sort((a,b) => b.pontos - a.pontos || b.gols - a.gols);

    let html = `<div class="grupo">
      <h3>Grupo ${g}</h3>
      <table>
        <tr>
          <th>Time</th>
          <th>P</th>
          <th>G</th>
        </tr>`;

    times.forEach(t => {
      html += `
        <tr>
          <td>${t.nome}</td>
          <td>${t.pontos}</td>
          <td>${t.gols}</td>
        </tr>`;
    });

    html += "</table></div>";

    container.innerHTML += html;
  }

  // Artilheiros
  let tabelaArt = document.querySelector("#tabela-artilheiros tbody");
  tabelaArt.innerHTML = "";

  jogadores.sort((a,b) => b.gols - a.gols);

  jogadores.forEach(j => {
    tabelaArt.innerHTML += `
      <tr>
        <td>${j.nome}</td>
        <td>${j.gols}</td>
      </tr>`;
  });

  // Jogos
  let lista = document.getElementById("lista-jogos");
  lista.innerHTML = "";

  jogosRodada.forEach(j => {
    lista.innerHTML += `<li>${j}</li>`;
  });
}

// Inicializa
atualizarTela();
