# Image Meta Analyzer

Um extrator de metadados de imagem rápido, responsivo e focado em privacidade, que processa todas as informações de forma local, direta no seu navegador.

---

## 📌 Índice

1. [Sobre o Projeto](#-sobre-o-projeto)
2. [Funcionalidades](#-funcionalidades)
3. [Guia de Metadados (Documentação)](#-guia-de-metadados-documenta%C3%A7%C3%A3o)
4. [Tecnologias Utilizadas](#-tecnologias-utilizadas)
5. [Configuração e Instalação](#-configura%C3%A7%C3%A3o-e-instala%C3%A7%C3%A3o)
6. [Design System & Estilização](#-design-system--estiliza%C3%A7%C3%A3o)
7. [Diretrizes para Agentes de IA](#-diretrizes-para-agentes-de-ia)

---

## 📖 Sobre o Projeto

O **Image Meta Analyzer** é uma ferramenta para fotógrafos, designers, desenvolvedores e entusiastas da privacidade. Ela permite arrastar qualquer arquivo de imagem para visualizar instantaneamente os metadados técnicos embarcados (EXIF, TIFF, GPS). A imagem e seus metadados são processados localmente usando as APIs do navegador e não são enviados pelo aplicativo.

---

## ✨ Funcionalidades

- **Processamento Local-First**: A imagem e seus metadados permanecem no navegador.
- **Leitura EXIF & TIFF**: Informações completas de exposição, câmera, lente e propriedades da imagem.
- **Mapa de Localização GPS**: Renderização das coordenadas com Leaflet e tiles externos do OpenStreetMap.
- **Exportação Multiformato**: Salve os dados da tabela em arquivos JSON ou planilhas CSV.
- **Internacionalização**: Suporte completo a Inglês (EN) e Português (PT) via `react-i18next`.
- **Ajuste de Tema**: Modos claro (light) e escuro (dark) com transições fluidas.

---

## 📄 Guia de Metadados (Documentação)

Para compreender em detalhes o significado de cada campo técnico exibido pelo aplicativo e suas implicações de segurança, consulte a nossa documentação dedicada:

👉 **[Guia de Metadados de Imagem (METADATA.md)](METADATA.md)**

---

## 🛠️ Tecnologias Utilizadas

- **Vite + React 19**: Plataforma de compilação rápida e framework declarativo de componentes.
- **Tailwind CSS v4**: Compilador de CSS moderno estruturado em tokens de design globais.
- **Exifr**: Biblioteca leve de alto desempenho para decodificar cabeçalhos binários de imagem.
- **Leaflet & React Leaflet**: Mapeamento interativo para visualização de dados geográficos.
- **Lucide React**: Biblioteca de ícones vetoriais em formato SVG.

---

## 🚀 Configuração e Instalação

### Pré-requisitos

Você precisará do **Node.js** instalado na sua máquina.

### Passos para rodar localmente

1. **Instalar dependências**:

    ```bash
    npm install
    ```

2. **Iniciar servidor de desenvolvimento**:

    ```bash
    npm run dev
    ```

    _O aplicativo estará disponível por padrão em `http://localhost:5173`._

3. **Gerar build de produção**:

    ```bash
    npm run build
    ```

4. **Rodar formatação de código**:
    ```bash
    npm run format
    ```

---

## 🎨 Design System & Estilização

Nossos estilos visam uma estética editorial premium ("de humanos para humanos") baseada em tons terrosos quentes (terracota, cobre, areia e carvão) e tipografia com serifa para títulos.

Todas as variáveis visuais estão centralizadas em [src/index.css](src/index.css) no seletor `@theme`. **Nunca utilize classes utilitárias de cores do Tailwind diretamente nos componentes**; em vez disso, referencie as variáveis globais (ex: `bg-[var(--color-bg)]`, `text-[var(--color-accent)]`).

---

## 📅 Roadmap / Futuras Implementações

- **Editor em Lote (Batch Editor)**: Permitir a edição de metadados em múltiplos arquivos de imagem simultaneamente.
- **Edição de Campos Específicos**: Implementação para atualizar a data de criação da imagem (`DateTimeOriginal`) e outros campos necessários diretamente pelo app.

---

## 🤖 Diretrizes para Agentes de IA

Este repositório possui regras estritas de arquitetura e código descritas em [.agents/AGENTS.md](.agents/AGENTS.md). Desenvolvedores artificiais que atuarem no projeto devem ler o arquivo de regras antes de propor alterações.
