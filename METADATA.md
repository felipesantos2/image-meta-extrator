# Guia de Metadados de Imagem

Este documento explica os padrões de metadados extraídos pelo **Image Meta Analyzer**, seus conceitos técnicos e implicações de privacidade.

---

## Índice

1. [O que são Metadados?](#1-o-que-são-metadados)
2. [Formatos de Metadados Soportados](#2-formatos-de-metadados-suportados)
    - [EXIF (Exchangeable Image File Format)](#exif)
    - [TIFF (Tagged Image File Format)](#tiff)
    - [GPS (Global Positioning System)](#gps)
    - [XMP (Extensible Metadata Platform)](#xmp)
    - [IPTC (International Press Telecommunications Council)](#iptc)
    - [ICC Profile](#icc-profile)
3. [Segurança e Privacidade de Dados](#3-segurança-e-privacidade-de-dados)

---

## 1. O que são Metadados?

Metadados são "dados sobre outros dados". No contexto de arquivos de imagem, eles são informações invisíveis embutidas diretamente no arquivo (como JPEG, PNG, TIFF, WebP ou HEIC) no momento em que a foto é tirada ou modificada por um software. Eles descrevem como, quando, onde e com quais configurações a imagem foi criada.

---

## 2. Formatos de Metadados Suportados

Nossa ferramenta utiliza a biblioteca `exifr` para extrair os principais padrões de metadados industriais:

### EXIF

_Exchangeable Image File Format_ (Criado em 1998)
É o padrão mais comum, gerado automaticamente pela maioria das câmeras digitais e smartphones no momento do disparo.

- **O que armazena:**
    - Configurações da câmera: abertura (`f/stop`), velocidade do obturador (tempo de exposição), ISO, distância focal e uso de flash.
    - Equipamento: fabricante e modelo do corpo da câmera e da lente utilizada.
    - Balanço de brancos, modo de exposição e medição.

### TIFF

_Tagged Image File Format_
Embora seja um formato de arquivo de imagem independente, o cabeçalho TIFF serve como base de estrutura física para armazenar as tags de metadados de outros formatos.

- **O que armazena:**
    - Propriedades geométricas: largura da imagem, altura, orientação (rotação) e resolução (DPI).
    - Software: programa ou aplicativo utilizado para salvar ou editar a imagem (ex: Adobe Photoshop, Lightroom, ou câmera do celular).

### GPS

_Global Positioning System_
Subconjunto do padrão EXIF que grava a localização geográfica exata do dispositivo receptor de satélite no momento do clique.

- **O que armazena:**
    - Latitude e Longitude expressas em coordenadas decimais ou graus/minutos/segundos.
    - Altitude (elevação acima do nível do mar) e direção da bússola (se disponível).

### XMP

_Extensible Metadata Platform_ (Desenvolvido pela Adobe em 2001)
Um padrão baseado em XML que permite incorporar metadados personalizados e extensíveis em arquivos sem quebrar a compatibilidade com leitores EXIF antigos.

- **O que armazena:**
    - Histórico de edições e ajustes não-destrutivos feitos em softwares como Lightroom.
    - Classificações por estrelas, tags de marcação e palavras-chaves de organização.

### IPTC

_International Press Telecommunications Council_ (Criado nos anos 1970/1990)
Padrão muito utilizado por agências de notícias e fotógrafos de imprensa para gerenciamento de mídia.

- **O que armazena:**
    - Informações de direitos autorais (copyright, proprietário dos direitos).
    - Legendas jornalísticas, descrição do evento e nome do fotógrafo (crédito).

### ICC Profile

_International Color Consortium_
Dados de calibração que definem o espaço de cor exato da imagem.

- **O que armazena:**
    - Perfil de cores (ex: `sRGB`, `Display P3`, `Adobe RGB`), garantindo que a imagem seja exibida com as mesmas tonalidades cromáticas em diferentes telas calibradas.

---

## 3. Segurança e Privacidade de Dados

Os metadados contêm informações extremamente sensíveis que podem comprometer a privacidade do usuário:

- **Vazamento de Localização**: Fotos tiradas dentro de casa ou em locais privados gravam as coordenadas de GPS exatas, facilitando a identificação do endereço físico de quem postou a imagem.
- **Linha do Tempo**: A data original de criação (`DateTimeOriginal`) revela exatamente em que dia e horário a pessoa esteve em determinado local.
- **Histórico de Equipamentos**: Mostra os modelos de aparelhos utilizados, número de série da câmera e o histórico de softwares instalados (revelando licenças ou caminhos de diretório locais).

### Abordagem Local First

Para garantir a privacidade máxima dos usuários do **Image Meta Analyzer**:

1. **Sem Envio de Arquivos**: O upload é apenas simulado no navegador. O arquivo de imagem é lido localmente na memória RAM através da API `FileReader` do JavaScript.
2. **Sem Envio de Metadados**: O aplicativo não transmite a imagem nem os metadados extraídos. Quando existem coordenadas GPS e a aba de mapa é aberta, o navegador consulta os tiles externos do OpenStreetMap para exibir a região.
