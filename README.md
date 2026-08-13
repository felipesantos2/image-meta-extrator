# Image Meta Analyzer

Aplicação web para visualizar metadados de imagens diretamente no navegador. A imagem e os metadados extraídos não são enviados pelo aplicativo.


Feito 100% com auxílio de IA (React). Direcionei o produto e a lógica,
mas ainda não domino React e Frameworks JavaScript o suficiente para manter o código sozinho.

Ideia futura: evoluir para corrigir/atualizar metadados, ajustando imagens para uma linha do tempo em apps como Google fotos

## Funcionalidades

- Leitura de metadados EXIF, TIFF, IPTC, XMP, ICC e GPS.
- Organização dos dados por câmera, imagem, data e localização.
- Mapa para coordenadas GPS.
- Exportação em JSON e CSV.
- Temas claro e escuro.
- Interface em português e inglês.

O mapa utiliza tiles externos do OpenStreetMap. Ao abrir uma imagem com localização, o navegador pode realizar requisições para esse serviço.

## Tecnologias

- React 19 e Vite
- Tailwind CSS 4
- Exifr
- Leaflet e React Leaflet
- i18next

## Desenvolvimento

Requisito: Node.js 22 ou versão compatível com o Vite 8.

```bash
npm install
npm run dev
```

O servidor local estará disponível em `http://localhost:5173`.

### Comandos

```bash
npm test          # executa os testes
npm run lint      # analisa o código
npm run format    # formata os arquivos
npm run build     # gera a versão de produção em dist/
```

## Documentação

- [Guia de metadados e privacidade](METADATA.md)
- [Guia de desenvolvimento](DEVELOPMENT.md)
- [Diretrizes do projeto para agentes](.agents/AGENTS.md)

## Deploy

O site está publicado em [image-met-extra.netlify.app](https://image-met-extra.netlify.app/). O projeto inclui um `netlify.toml` com o comando de build e o diretório de publicação necessários para o Netlify.

A versão segue SemVer no `package.json` e é exibida automaticamente no rodapé da aplicação.

### Google AdSense

O site está associado ao Publisher ID `pub-5297586230684986`, mas a veiculação de anúncios
está desativada. A configuração mantida inclui:

- meta de verificação no `index.html`;
- declaração do vendedor em `public/ads.txt`;
- política de privacidade em `public/privacy.html`.

O script `adsbygoogle.js` não deve ser carregado globalmente. Como a SPA possui estados de
upload, processamento e erro, o Auto Ads pode inserir anúncios em telas usadas para fins
comportamentais. Uma futura ativação deve usar um bloco manual, com Ad Slot ID, renderizado
somente junto ao conteúdo editorial e após a configuração de consentimento em
**AdSense → Privacidade e mensagens**.
