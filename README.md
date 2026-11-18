# Portfólio Profissional — Carlito Rodrigues

Portfólio acadêmico e profissional desenvolvido na disciplina de Desenvolvimento Web (Engenharia de Software — UCSAL), reunindo minha apresentação, conhecimentos técnicos, projetos práticos em Web e Java, além de formulário de contato interativo com validação em JavaScript puro.

- **Portfólio publicado (GitHub Pages):** https://carlitoneto.github.io/portfolio-profissional/
- **Repositório:** https://github.com/carlitoneto/portfolio-profissional

---

## Modo de Execução

1. **Acesso online:** Basta abrir o link do GitHub Pages acima em qualquer navegador moderno (desktop ou mobile).
2. **Execução local:**
   - Faça o download (ZIP) ou clone este repositório:
     ```bash
     git clone [https://github.com/carlitoneto/portfolio-profissional.git](https://github.com/carlitoneto/portfolio-profissional.git)
     ```
   - Abra a pasta do projeto e dê duplo clique no arquivo `index.html` (ou utilize a extensão *Live Server* no VS Code). Não há dependências externas para instalar.

---

## Diagnóstico de Cinco Problemas e Correções Aplicadas

1. **Navegação interna incompleta no cabeçalho**
   - **Problema:** Os itens do menu `<nav>` não possuíam âncoras (`<a href="#secao">`) nem atributos `id` correspondentes nas seções, impedindo a navegação por clique.
   - **Solução:** Inclusão de links âncora (`#inicio`, `#sobre`, `#conhecimentos`, `#projetos`, `#contato`), adição dos respectivos `id` nas `<section>` e uso de `scroll-margin-top` no CSS para evitar que o `<header>` fixo cobrisse os títulos.

2. **Altura fixa (`height: 100vh`) cortando conteúdo em telas menores**
   - **Problema:** O uso de `height: 100vh` travava a altura das seções e fazia o conteúdo transbordar ou cortar quando a tela era reduzida ou quando textos extras eram expandidos.
   - **Solução:** Substituição por `min-height: 100vh` e criação de regras responsivas com `@media (max-width: 768px)` para reorganizar colunas em pilha no celular.

3. **Conflito entre `display: flex` do CSS e o atributo `hidden` do HTML**
   - **Problema:** Elementos ocultados via JavaScript com `elemento.hidden = true` (como o campo condicional *Assunto adicional* e cards filtrados) continuavam visíveis na tela porque o `display: flex` do CSS sobrescrevia o comportamento padrão do navegador.
   - **Solução:** Adição da regra `[hidden] { display: none !important; }` no `style.css`.

4. **Falta de interatividade e feedback acessível nos projetos e perfil**
   - **Problema:** A página era totalmente estática, sem filtro por área de tecnologia, sem contador de resultados e sem alternância de tema.
   - **Solução:** Implementação de alternância de tema claro/escuro (`alternarTema`), expansão de bio (`alternarSobreMais`) e filtro de projetos por categoria (`filtrarProjetos`) com atributos ARIA (`aria-pressed`, `aria-expanded`, `aria-live`).

5. **Formulário de contato sem validação de regras nem proteção contra duplo envio**
   - **Problema:** O formulário não validava limites reais de caracteres (desconsiderando espaços em branco), não tratava campos condicionais e permitia múltiplos cliques seguidos no botão de envio.
   - **Solução:** Implementação de validação completa em JavaScript com `.trim()`, controle de campo condicional para `"Outro"`, trava contra envios simultâneos (`enviando`) e simulação assíncrona de envio com cenário de falha testável.

---

## Três Evidências de Antes e Depois

### 1. Estrutura Semântica e Navegação no Cabeçalho
- **Antes:** Itens de lista sem links (`<li>Início</li>`) e ausência de `<main>` e `id` nas seções.
- **Depois:** Uso de `<main>` estruturando todo o conteúdo principal, `<section id="inicio">` (e demais seções identificadas) e links funcionais (`<li><a href="#inicio">Início</a></li>`).

### 2. Responsividade e Controle de Exibição (`hidden`)
- **Antes:** Seções com `height: 100vh` fixo e blocos com `display: flex` ignorando o atributo `hidden`.
- **Depois:** Uso de `min-height: 100vh`, regra `[hidden] { display: none !important; }` e media queries (`@media (max-width: 768px)`) ajustando menu, perfil, cards e colunas de contato para telas estreitas.

### 3. Formulário Estático vs. Validação e Campo Condicional
- **Antes:** Envio padrão do navegador sem checagem de caracteres, sem contador dinâmico e com o campo *Assunto adicional* sempre exposto e bloqueado.
- **Depois:** Interceptação via `evento.preventDefault()`, contador em tempo real (`0 / 1000 caracteres`), exibição condicional do campo *Assunto adicional* apenas quando `"Outro"` é escolhido e feedback acessível nos `<span>` de erro.

---

## Matriz de Testes

| Caso de Teste | Ação Executada | Resultado Esperado | Status |
| :--- | :--- | :--- | :--- |
| **CT01 — Alternância de tema** | Clicar no botão `Tema claro` / `Tema escuro` no cabeçalho | Alterna a classe `tema-claro` no `<body>`, muda as cores e atualiza `aria-pressed` | Aprovado |
| **CT02 — Expansão da bio** | Clicar em `Mostrar mais` na seção Sobre | Exibe o parágrafo adicional, altera texto para `Mostrar menos` e atualiza `aria-expanded` | Aprovado |
| **CT03 — Filtro de projetos** | Selecionar `Java (Back-End)` e depois `Todos` no filtro | Exibe apenas o projeto Java (`Projetos visíveis: 1`) e restaura todos (`Projetos visíveis: 2`) | Aprovado |
| **CT04 — Envio vazio** | Clicar em `Enviar mensagem` com todos os campos em branco | Exibe mensagens de erro abaixo de cada campo obrigatório e move o foco para `Nome` | Aprovado |
| **CT05 — Campo condicional (`Outro`)** | Selecionar `Outro` em Motivo, deixar Assunto inválido e depois trocar Motivo para `Oportunidade profissional` | Campo `Assunto adicional` abre habilitado; ao trocar o motivo, ele oculta, desabilita e limpa o erro sem bloquear o envio | Aprovado |
| **CT06 — Contador com espaços** | Digitar apenas espaços em branco no campo `Mensagem` | `.trim().length` mantém a contagem em `0 / 1000` e bloqueia envio abaixo de 30 caracteres úteis | Aprovado |
| **CT07 — Simulação de falha** | Preencher dados válidos, marcar `Simular falha no envio` e clicar em enviar | Exibe aviso de erro de envio e **mantém todos os dados preenchidos** nos campos | Aprovado |
| **CT08 — Envio com sucesso e trava** | Desmarcar falha, preencher dados válidos e clicar em `Enviar mensagem` | Bloqueia duplo clique durante 1s, exibe confirmação de sucesso e limpa o formulário | Aprovado |

---

## Revisão do Colega

- **Revisor:** Colega da turma de Engenharia de Software (UCSAL).
- **Pontos observados:**
  1. Sugestão de melhorar o contraste dos botões secundários (GitHub/LinkedIn) e dos inputs quando o **Tema claro** está ativo.
  2. Verificação da ordem de leitura e espaçamento da seção **Contato** em largura de celular (`375px`).
  3. Teste de navegação pelos links do menu superior para confirmar que o cabeçalho fixo não sobrepõe os títulos das seções.
- **Ajustes realizados:** Inclusão de variáveis específicas para bordas e botões no seletor `body.tema-claro`, ajuste do `flex-direction: column` no `@media (max-width: 768px)` e definição de `scroll-margin-top: 90px` nas seções.

---

## Explicação de uma Refatoração

Inicialmente, as interações de formulário tendem a concentrar toda a lógica dentro de um único evento `submit`, misturando manipulação de DOM, regras de validação e controle de estado. O código foi refatorado em **funções curtas e com responsabilidade única** no arquivo `script.js`:

- `definirErro(campo, elementoErro, mensagem)`: centraliza a exibição ou limpeza de erros e a atualização de `aria-invalid`.
- `atualizarCampoAssunto()`: isola a regra condicional do motivo `"Outro"`, garantindo que, ao escolher outra opção, o campo seja ocultado, desabilitado (`disabled = true`) e tenha seu erro limpo.
- `validarFormulario()`: apenas confere as regras de tamanho usando `.trim()` e retorna `true` ou `false`, movendo o foco (`.focus()`) para o primeiro campo inválido.
- `processarEnvio(evento)`: gerencia o fluxo assíncrono, impedindo envios duplicados por meio da variável de controle `enviando`.

Essa separação evitou efeitos colaterais (como um erro oculto no campo *Assunto adicional* impedir o envio após troca de motivo) e tornou a manutenção muito mais simples.

---

## Como o Contato Funciona

1. **Canais diretos e transparência:** A coluna esquerda exibe e-mail institucional (`carlito.neto@ucsal.edu.br`), links externos para GitHub e LinkedIn e um aviso explícito informando que o formulário é uma demonstração acadêmica sem disparo real de e-mail.
2. **Interação em tempo real:** Conforme o usuário digita na mensagem (`input`), o contador calcula `campoMensagem.value.trim().length` para contabilizar apenas caracteres úteis até o limite de `1000`. Quando o motivo muda (`change`), o campo `Assunto adicional` é exibido e habilitado apenas se a opção `"Outro"` for selecionada.
3. **Validação antes do envio:** Ao clicar em `Enviar mensagem` (`submit`), `evento.preventDefault()` impede o recarregamento da página e `validarFormulario()` verifica todos os campos obrigatórios e habilitados.
4. **Simulação de envio assíncrono:** Estando tudo válido, o botão é temporariamente desabilitado (`Enviando...`) e a função `enviarSimulado()` aguarda 1 segundo via `Promise` + `setTimeout`. Se a caixa de teste *"Simular falha no envio"* estiver marcada, o sistema exibe mensagem de falha preservando os dados digitados para nova tentativa; caso contrário, confirma o envio simulado, limpa os campos (`form.reset()`) e oculta novamente o assunto adicional.
