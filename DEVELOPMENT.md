# Guia de desenvolvimento

Este documento apresenta a estrutura do Image Meta Analyzer para quem está começando a trabalhar com aplicações front-end.

## Como o projeto funciona

O projeto não possui backend nem banco de dados. O navegador executa toda a aplicação:

1. O usuário seleciona uma imagem.
2. O React armazena o arquivo em memória.
3. A biblioteca `exifr` lê os metadados localmente.
4. Os componentes exibem ou exportam os dados.
5. Ao recarregar ou fechar a página, o estado é perdido.

A imagem não é copiada para `public/`, `dist/` ou para o repositório.

## Estrutura principal

```text
index.html              HTML inicial, SEO e scripts globais
src/main.jsx            Inicialização do React e do i18n
src/App.jsx             Estado e fluxo principal da aplicação
src/components/         Componentes visuais
src/utils/              Regras e funções reutilizáveis
src/i18n/               Traduções em português e inglês
src/index.css           Tema e poucos estilos globais
public/                 Arquivos servidos sem processamento
test/                   Testes com o test runner do Node
dist/                   Resultado gerado pelo build
```

Não edite `dist/`. O conteúdo dessa pasta é recriado por `npm run build`.

## Fluxo dos dados

`DropZone` entrega o arquivo para `App`, que chama `parseMetadata`. O resultado é separado em categorias e enviado para os componentes de visualização.

```text
DropZone → App → parseMetadata → MetadataTabs / ImagePreview / ExportButtons
```

O `App` também controla carregamento, erro e tema. Estados que pertencem a apenas um componente devem permanecer nele.

## React neste projeto

### Estado

Use `useState` para dados que alteram a interface, como arquivo selecionado, tema, erro ou aba ativa.

Não crie estado para valores que podem ser calculados diretamente durante a renderização.

### Efeitos

Use `useEffect` somente para sincronizar o React com algo externo, por exemplo:

- processar um novo arquivo;
- atualizar classes ou atributos do documento;
- criar e liberar uma URL temporária.

Todo efeito que inicia uma tarefa ou cria um recurso deve considerar limpeza para evitar resultados antigos e vazamentos de memória.

## Tailwind e CSS

Prefira classes do Tailwind nos componentes. Use `src/index.css` apenas para:

- tokens do tema;
- estilos realmente globais;
- animações reutilizadas;
- ajustes de bibliotecas externas.

O Tailwind já inclui um reset por meio do Preflight. Não adicione regras globais de `margin`, `padding` ou `box-sizing`, pois elas podem sobrescrever as utilities.

As cores do projeto ficam nas variáveis `--color-*`. Evite cores hardcoded nos componentes.

## Traduções

Todo texto visível ou rótulo de acessibilidade deve existir nos dois arquivos:

- `src/i18n/pt.json`
- `src/i18n/en.json`

Nos componentes, use `t('grupo.chave')`. Ao adicionar uma chave, mantenha a mesma estrutura nos dois idiomas.

## Arquivos públicos

Arquivos em `public/` são copiados diretamente para a raiz do build:

```text
public/ads.txt       → /ads.txt
public/privacy.html  → /privacy.html
```

Use essa pasta apenas para arquivos que precisam manter nome e endereço públicos.

## Privacidade e serviços externos

O processamento da imagem ocorre no navegador. Entretanto, algumas funcionalidades fazem requisições externas:

- OpenStreetMap fornece os tiles do mapa.
- Google AdSense fornece publicidade e pode utilizar cookies.

Alterações nesses serviços devem permanecer coerentes com a política de privacidade.

## Rotina antes de enviar alterações

```bash
npm test
npm run lint
npm run format:check
npm run build
```

Também revise:

```bash
git diff --check
git status
```

O build pode emitir avisos sem falhar. Diferencie avisos de erros pelo código de saída do comando.

## Investigando uma tela branca

Verifique nesta ordem:

1. Confirme que `npm run dev` continua ativo.
2. Abra o console do navegador.
3. Procure imports inexistentes ou erros de JavaScript.
4. Execute `npm run build`, pois ele costuma mostrar a origem e a linha do erro.
5. Confirme que `localhost:5173` responde antes de alterar o layout.

Evite tentar corrigir uma tela branca apenas com CSS.

## Testes

Os testes atuais usam o runner nativo do Node, sem biblioteca adicional. Eles cobrem funções puras em `src/utils`.

Ao corrigir uma regra:

1. escreva um teste que demonstra o comportamento esperado;
2. execute `npm test` e confirme a falha;
3. implemente a menor correção;
4. execute os testes novamente.

Componentes React podem receber testes próprios no futuro, caso o comportamento da interface fique mais complexo.

## Commits

Use mensagens semânticas:

```text
feat: adiciona uma funcionalidade
fix: corrige um comportamento
docs: altera documentação
test: adiciona ou ajusta testes
refactor: reorganiza sem mudar o comportamento
chore: altera ferramentas ou configuração
```

Prefira commits pequenos, com uma responsabilidade clara.
