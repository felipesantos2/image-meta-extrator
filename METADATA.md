# Metadados de imagem

Metadados são informações armazenadas dentro de uma imagem. Eles podem descrever o equipamento utilizado, as configurações da câmera, a data da captura, a localização e o software de edição.

## Formatos lidos

O aplicativo utiliza a biblioteca `exifr` para procurar os seguintes grupos:

| Grupo | Exemplos de informações                                     |
| ----- | ----------------------------------------------------------- |
| EXIF  | Câmera, lente, ISO, abertura e tempo de exposição           |
| TIFF  | Dimensões, orientação, resolução e software                 |
| GPS   | Latitude, longitude e altitude                              |
| XMP   | Histórico de edição, classificações e campos personalizados |
| IPTC  | Autor, direitos, descrição e palavras-chave                 |
| ICC   | Perfil e espaço de cores                                    |

Nem toda imagem contém esses dados. Aplicativos de edição, redes sociais e ferramentas de compactação também podem remover ou modificar metadados.

## Privacidade

Metadados podem revelar informações sensíveis:

- Coordenadas GPS podem indicar onde a imagem foi produzida.
- Datas podem revelar a presença de uma pessoa em determinado local.
- Modelo, número de série e software podem identificar equipamentos ou processos de trabalho.

O Image Meta Analyzer processa a imagem no navegador e não envia o arquivo nem os metadados extraídos para um servidor da aplicação.

Quando uma imagem contém coordenadas e o mapa é exibido, o navegador consulta tiles do OpenStreetMap. Essa requisição é externa, embora a imagem e os demais metadados não sejam enviados.

## Antes de compartilhar uma imagem

Verifique principalmente:

1. Localização GPS.
2. Data e horário.
3. Nome do autor e direitos.
4. Número de série do equipamento.
5. Histórico e software de edição.

Remover metadados exige uma ferramenta de edição apropriada. Este projeto apenas lê e exporta as informações encontradas; ele não modifica o arquivo original.
