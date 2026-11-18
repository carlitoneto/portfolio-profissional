// 1. Seleção dos elementos principais
const botaoTema = document.getElementById("botao-tema");
const botaoSobre = document.getElementById("botao-sobre");
const sobreExtra = document.getElementById("sobre-extra");

const filtroProjetos = document.getElementById("filtro-projetos");
const contadorProjetos = document.getElementById("contador-projetos");
const semProjetos = document.getElementById("sem-projetos");

const formContato = document.getElementById("form-contato");
const campoNome = document.getElementById("nome");
const campoEmail = document.getElementById("email");
const campoMotivo = document.getElementById("motivo");
const grupoAssunto = document.getElementById("grupo-assunto");
const campoAssunto = document.getElementById("assunto");
const campoMensagem = document.getElementById("mensagem");
const contadorMensagem = document.getElementById("contador-mensagem");
const checkboxFalha = document.getElementById("simular-falha");
const botaoEnviar = document.getElementById("botao-enviar");
const statusFormulario = document.getElementById("status-formulario");

let enviando = false;

// 2. Alternância de tema claro e escuro
function alternarTema() {
  const claroAtivo = document.body.classList.toggle("tema-claro");
  botaoTema.textContent = claroAtivo ? "Tema escuro" : "Tema claro";
  botaoTema.setAttribute("aria-pressed", String(claroAtivo));
}

// 3. Botão Mostrar mais / Mostrar menos
function alternarSobreMais() {
  const estaOculto = sobreExtra.hidden;
  sobreExtra.hidden = !estaOculto;
  botaoSobre.textContent = estaOculto ? "Mostrar menos" : "Mostrar mais";
  botaoSobre.setAttribute("aria-expanded", String(estaOculto));
}

// 4. Filtro de projetos por categoria
function filtrarProjetos() {
  const categoriaEscolhida = filtroProjetos.value;
  const cards = document.querySelectorAll(".card-projeto");
  let visiveis = 0;

  cards.forEach((card) => {
    const corresponde =
      categoriaEscolhida === "todos" || card.dataset.categoria === categoriaEscolhida;
    card.hidden = !corresponde;
    if (corresponde) {
      visiveis++;
    }
  });

  contadorProjetos.textContent = `Projetos visíveis: ${visiveis}`;
  semProjetos.hidden = visiveis > 0;
}

// 5. Regras e utilitários do formulário
function definirErro(campo, idSpanErro, mensagem) {
  const spanErro = document.getElementById(idSpanErro);
  spanErro.textContent = mensagem;
  if (mensagem) {
    campo.setAttribute("aria-invalid", "true");
  } else {
    campo.removeAttribute("aria-invalid");
  }
}

function atualizarContadorMensagem() {
  const tamanhoUtil = campoMensagem.value.trim().length;
  contadorMensagem.textContent = `${tamanhoUtil} / 1000 caracteres (mínimo de 30)`;
}

function atualizarCampoAssunto() {
  const ehOutro = campoMotivo.value === "Outro";
  grupoAssunto.hidden = !ehOutro;
  campoAssunto.disabled = !ehOutro;
  campoAssunto.required = ehOutro;

  if (!ehOutro) {
    campoAssunto.value = "";
    definirErro(campoAssunto, "erro-assunto", "");
  }
}

function validarFormulario() {
  let primeiroInvalido = null;

  // Validação do Nome (3 a 80 caracteres úteis)
  const nomeLimpo = campoNome.value.trim();
  if (nomeLimpo.length < 3 || nomeLimpo.length > 80) {
    definirErro(campoNome, "erro-nome", "Informe entre 3 e 80 caracteres.");
    primeiroInvalido = primeiroInvalido || campoNome;
  } else {
    definirErro(campoNome, "erro-nome", "");
  }

  // Validação do E-mail
  const emailLimpo = campoEmail.value.trim();
  if (!emailLimpo || !campoEmail.checkValidity()) {
    definirErro(campoEmail, "erro-email", "Informe um endereço de e-mail válido.");
    primeiroInvalido = primeiroInvalido || campoEmail;
  } else {
    definirErro(campoEmail, "erro-email", "");
  }

  // Validação do Motivo
  if (campoMotivo.value === "") {
    definirErro(campoMotivo, "erro-motivo", "Selecione o motivo do contato.");
    primeiroInvalido = primeiroInvalido || campoMotivo;
  } else {
    definirErro(campoMotivo, "erro-motivo", "");
  }

  // Validação do Assunto adicional (apenas quando Motivo === "Outro")
  if (campoMotivo.value === "Outro") {
    const assuntoLimpo = campoAssunto.value.trim();
    if (assuntoLimpo.length < 5 || assuntoLimpo.length > 100) {
      definirErro(campoAssunto, "erro-assunto", "Informe entre 5 e 100 caracteres.");
      primeiroInvalido = primeiroInvalido || campoAssunto;
    } else {
      definirErro(campoAssunto, "erro-assunto", "");
    }
  }

  // Validação da Mensagem (30 a 1000 caracteres úteis)
  const mensagemLimpa = campoMensagem.value.trim();
  if (mensagemLimpa.length < 30 || mensagemLimpa.length > 1000) {
    definirErro(campoMensagem, "erro-mensagem", "A mensagem deve ter entre 30 e 1000 caracteres.");
    primeiroInvalido = primeiroInvalido || campoMensagem;
  } else {
    definirErro(campoMensagem, "erro-mensagem", "");
  }

  if (primeiroInvalido) {
    statusFormulario.textContent = "Corrija os campos destacados antes de enviar.";
    statusFormulario.className = "status-formulario erro";
    primeiroInvalido.focus();
    return false;
  }

  return true;
}

// 6. Envio simulado assíncrono com bloqueio de cliques duplicados
function enviarSimulado(simularFalha) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (simularFalha) {
        reject(new Error("Falha simulada no envio."));
      } else {
        resolve();
      }
    }, 1000);
  });
}

async function processarEnvio(evento) {
  evento.preventDefault();

  if (enviando) {
    return;
  }

  if (!validarFormulario()) {
    return;
  }

  enviando = true;
  botaoEnviar.disabled = true;
  botaoEnviar.textContent = "Enviando...";
  statusFormulario.textContent = "Processando mensagem de demonstração...";
  statusFormulario.className = "status-formulario";

  try {
    await enviarSimulado(checkboxFalha.checked);
    statusFormulario.textContent =
      "Sucesso! Demonstração concluída (nenhum e-mail real foi enviado).";
    statusFormulario.className = "status-formulario sucesso";
    formContato.reset();
    atualizarCampoAssunto();
    atualizarContadorMensagem();
  } catch (erro) {
    statusFormulario.textContent =
      "Não foi possível concluir o envio simulado. Seus dados foram mantidos para tentar novamente.";
    statusFormulario.className = "status-formulario erro";
  } finally {
    enviando = false;
    botaoEnviar.disabled = false;
    botaoEnviar.textContent = "Enviar mensagem";
  }
}

// 7. Registro de eventos
botaoTema.addEventListener("click", alternarTema);
botaoSobre.addEventListener("click", alternarSobreMais);
filtroProjetos.addEventListener("change", filtrarProjetos);

campoMotivo.addEventListener("change", atualizarCampoAssunto);
campoMensagem.addEventListener("input", () => {
  atualizarContadorMensagem();
  if (campoMensagem.hasAttribute("aria-invalid")) {
    validarFormulario();
  }
});

formContato.addEventListener("submit", processarEnvio);