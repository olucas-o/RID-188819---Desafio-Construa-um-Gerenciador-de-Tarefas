let tarefas = [];

function adicionarTarefa() {
  const nome = document.getElementById("tarefa").value.trim();
  const etiqueta = document.getElementById("etiqueta").value.trim();

  if (nome === "") return;

  const tarefa = {
    nome,
    etiqueta,
    data: new Date().toLocaleDateString("pt-BR"),
    concluida: false
  };

  tarefas.push(tarefa);
  atualizarLista();

  document.getElementById("tarefa").value = "";
  document.getElementById("etiqueta").value = "";
}

function atualizarLista() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement("li");
    li.classList.toggle("concluida", tarefa.concluida);

    const info = document.createElement("div");
    info.classList.add("tarefa-info");

    const nome = document.createElement("strong");
    nome.textContent = tarefa.nome;
    info.appendChild(nome);

    const detalhes = document.createElement("div");
    detalhes.style.marginTop = "5px";

    const tag = document.createElement("span");
    tag.classList.add("etiqueta");
    tag.textContent = tarefa.etiqueta || "geral";

    const data = document.createElement("span");
    data.classList.add("data");
    data.textContent = `Criado em: ${tarefa.data}`;

    detalhes.appendChild(tag);
    detalhes.appendChild(data);
    info.appendChild(detalhes);

    const btn = document.createElement("button");
    btn.classList.add("btn-concluir");
    btn.textContent = tarefa.concluida ? "✔" : "Concluir";
    btn.onclick = () => concluirTarefa(index);

    li.appendChild(info);
    li.appendChild(btn);
    lista.appendChild(li);
  });

  atualizarContador();
}

function concluirTarefa(index) {
  tarefas[index].concluida = true;
  atualizarLista();
}

function atualizarContador() {
  const concluidas = tarefas.filter(t => t.concluida).length;
  const contador = document.getElementById("contador");
  contador.textContent = `${concluidas} tarefa${concluidas !== 1 ? "s" : ""} concluída${concluidas !== 1 ? "s" : ""}`;
}
