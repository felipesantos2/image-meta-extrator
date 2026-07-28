# Guia de Desenvolvimento e Roadmap para Agentes (AI)

Este documento define as regras de arquitetura, padrões de código e o roadmap técnico para agentes de Inteligência Artificial que atuarem neste repositório.

## Diretrizes de Código e Padrões do Projeto

### 1. Sistema de Estilos (Tailwind CSS v4)
- **Não hardcode cores**: Nunca utilize classes utilitárias de cor do Tailwind diretamente (ex: `bg-purple-600` ou `text-slate-800`).
- **Use as variáveis do tema**: O design system é centralizado em [index.css](file:///home/felipesantos2/projects/ai-image-meta/src/index.css). Utilize sempre as variáveis de CSS registradas no `@theme` (ex: `bg-[var(--color-bg)]`, `text-[var(--color-accent)]`).
- **Ajustes de Tema**: Mudanças globais de cores e fontes devem ser feitas diretamente no arquivo de estilos central [index.css](file:///home/felipesantos2/projects/ai-image-meta/src/index.css), e não de forma ad-hoc em componentes.

### 2. Tratamento de Strings e Evitação de Expressões Regulares
- **Sem Regex Inline**: Evite criar expressões regulares diretamente no corpo dos componentes ou funções de utilidade.
- **Support Helpers**: Qualquer lógica de processamento de nomes de arquivos, extensões, ou escapes para exportação deve ser centralizada em [src/utils/helpers.js](file:///home/felipesantos2/projects/ai-image-meta/src/utils/helpers.js) utilizando métodos nativos de string (`substring`, `split`, `join`, etc.) que sejam claros e legíveis.

### 3. Internacionalização (i18n)
- **Multilíngue**: O projeto usa `react-i18next` para suporte a Português (PT) e Inglês (EN).
- **Sem textos hardcoded**: Todos os textos de UI exibidos ao usuário devem ser traduzidos através do hook `useTranslation()` e cadastrados em:
  - [src/i18n/pt.json](file:///home/felipesantos2/projects/ai-image-meta/src/i18n/pt.json) (Português)
  - [src/i18n/en.json](file:///home/felipesantos2/projects/ai-image-meta/src/i18n/en.json) (Inglês)

### 4. Dependências Críticas
- **Exifr**: Leitura de metadados da imagem.
- **Leaflet**: Mapas interativos para coordenadas GPS. Em [GpsMap.jsx](file:///home/felipesantos2/projects/ai-image-meta/src/components/GpsMap.jsx), há um patch para corrigir os caminhos de ícone padrão do Leaflet que costumam quebrar em empacotadores como o Vite.

---

## Roadmap Técnico para Agentes

1. **Melhorar Resiliência do Parse de Metadados**:
   - Ajustar [parseMetadata.js](file:///home/felipesantos2/projects/ai-image-meta/src/utils/parseMetadata.js) para capturar mais tags específicas de câmeras digitais (Sony, Canon, Nikon) ou tags geradas por IAs gerativas (como prompts de Midjourney/Stable Diffusion embutidos no PNG).
2. **Otimização de Carregamento**:
   - Adicionar lazy loading ou Code Splitting dinâmico para a biblioteca do Leaflet, já que o mapa é pesado e só é necessário quando a imagem tem coordenadas GPS.
3. **Validação de Tamanho e Tipo de Imagem**:
   - Adicionar validações na área de drop antes de carregar arquivos corrompidos ou não suportados pelo browser.
