# Image Meta Analyzer

Aplicação web para visualizar metadados de imagens diretamente no navegador. A imagem e os metadados extraídos não são enviados pelo aplicativo.

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
- [Diretrizes do projeto para agentes](.agents/AGENTS.md)

## Deploy

O projeto inclui um `netlify.toml` com o comando de build e o diretório de publicação necessários para o Netlify.
