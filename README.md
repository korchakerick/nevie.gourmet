# Névie Gourmet

Aprimoramento do site existente em HTML, CSS e JavaScript puro, sem instalação, build, banco de dados ou serviços pagos. Compatível com GitHub Pages, inclusive no caminho `/nevie.gourmet/` (arquivos e fotografias usam caminhos relativos).

## O que foi atualizado

- `index.html`: slogan oficial, destaque equivalente para açaís e batidinhas, categorias separadas, sobre a marca sem história inventada, informações de entrega e retirada, contatos oficiais e botão flutuante acessível.
- `config.js`: WhatsApp `5565996029670`, Instagram oficial e catálogo completo de 300 ml. Quatro açaís a R$ 16,00; maracujá e morango nas versões sem álcool (R$ 14,00) e com álcool (R$ 16,00). Seis cartões representam oito combinações de compra.
- `app.js`: mensagens personalizadas e codificadas com `encodeURIComponent`, preço correspondente à seleção, links diretos `wa.me`, confirmação de maioridade para álcool, menu móvel, logo oficial, fotografias do cardápio, enquadramento por versão e fallback caso uma foto não carregue.
- `styles.css`: aprimoramento da estrutura existente com creme e dourado, boa legibilidade, áreas de toque, foco visível, animações discretas e respeito à preferência de movimento reduzido. Sem fontes ou fotografias externas. Usa os anexos oficiais armazenados em `assets/`.
- `README.md`: instruções de revisão, manutenção e publicação manual.

Não foram criados pagamentos online, avaliações, dados de fundação, endereço de retirada ou promessas de entrega.

## Visualizar sem publicar

1. No GitHub, selecione a branch `feat/nevie-gourmet-site` e use **Code → Download ZIP**.
2. Extraia os arquivos e abra `index.html` em um navegador atual.
3. Opcionalmente, na pasta extraída, execute `python3 -m http.server 8000` e acesse `http://localhost:8000`.

Abrir localmente não publica o site. Para simular celular, abra as ferramentas do navegador e alterne larguras como 375, 390 e 768 pixels. Verifique também em um aparelho real antes de divulgar.

## Revisar o resultado

- Há quatro açaís: Tradicional, Creme de Ninho, Creme de Paçoca e Mousse de Maracujá, todos com 300 ml e R$ 16,00.
- Em cada batidinha (maracujá e morango), selecione sem álcool (R$ 14,00) e com álcool (R$ 16,00). Confira o preço destacado e a mensagem do pedido.
- Cada botão de produto abre uma URL `https://wa.me/5565996029670?text=...` com nome, volume, preço e versão, quando aplicável. Não é enviado nenhum pedido automaticamente: o cliente envia a mensagem no WhatsApp e combina os detalhes.
- Bebidas com álcool exigem confirmação de 18 anos ou mais na interface. A empresa deve conferir a idade na venda; o site não faz verificação documental.
- Os botões gerais e o flutuante abrem uma conversa para combinar o pedido. Instagram: https://www.instagram.com/nevie.gourmet/.
- Confira os atalhos do menu e das categorias, a abertura/fechamento do menu móvel e o fechamento da janela de maioridade com Escape.
- Entrega e retirada mediante combinação em Cuiabá e Várzea Grande. Consulte disponibilidade e taxa variável conforme a localização.

### Verificações realizadas nesta atualização

Sintaxe de `app.js` e `config.js` e `git diff --check` passaram. Testes em Chromium local verificaram as oito combinações de nome, volume, preço e versão nas URLs, atualização dos preços, confirmação de maioridade, menu móvel, âncoras e ausência de erros JavaScript. A atualização com os anexos também verificou o carregamento das oito áreas de foto, das logos e a troca de enquadramento entre as versões de cada batidinha. Não houve rolagem horizontal nas larguras 320, 375, 390, 768, 1024 e 1440 pixels. Capturas de desktop e celular foram inspecionadas. Os destinos WhatsApp foram interceptados para verificar a navegação sem enviar mensagens; a URL do Instagram foi conferida, sem validar o conteúdo do perfil. A execução foi local, sem publicação no Pages e sem revisão em aparelhos físicos.

## Logo e fotografias oficiais aplicadas

Os dois anexos fornecidos foram incorporados sem alterar os arquivos originais:

- `assets/logo-nevie.jpg`: logo oficial, usada no cabeçalho, rodapé e seção da marca. A borda circular é apresentada com CSS, sem deformar ou redesenhar a logo.
- `assets/cardapio-nevie.jpg`: cardápio original (853 × 1280), compartilhado por todas as fotografias do catálogo e da apresentação. Os dois arquivos somam aproximadamente 323 KiB.

Os enquadramentos usam SVG na própria página para mostrar apenas a região correspondente a cada produto, preservando os pixels e as proporções do JPEG. Não há remoção de fundo, reconstrução, geração artificial ou alteração de garrafas, rótulos e cremes. O navegador reutiliza o mesmo arquivo do cardápio em todos os cartões. As versões com e sem álcool têm enquadramentos próprios: a foto acompanha a seleção.

`config.js` contém `image` (caminho do arquivo) e `crop` (coordenadas `[x, y, largura, altura]`) de cada produto. Para as batidinhas, `options[].crop` seleciona a garrafa correspondente à versão. `menuImage` define as dimensões da imagem original. `heroImages` usa o mesmo modelo com `image`, `crop` e `alt`. O visual creme, dourado e escuro foi ajustado à referência fornecida; códigos oficiais de marca, se existirem, podem refiná-lo futuramente.

As fotos extraídas do cardápio têm resolução limitada pela arte original. **Não falta nenhum arquivo para usar esta versão.** Fotos individuais em maior resolução são opcionais e melhorarão a nitidez nas telas maiores. Para substituí-las, coloque os arquivos em `assets/`, atualize `image` e `alt`, e remova `crop` do produto e de suas opções para exibir a foto inteira com `object-fit: contain`. Caso a embalagem mude por versão, é possível continuar usando as coordenadas do cardápio ou adaptar a fonte de imagem de cada opção. Não é necessário comprar ferramentas ou serviços.

O texto agora identifica os açaís como açaís de garrafa, em conformidade com o cardápio. Os preços e contatos anteriores foram mantidos.

## Manutenção

`config.js` concentra contatos, texto de atendimento, caminhos de imagens, enquadramentos e produtos. Para adicionar produtos, copie um item de `products`, escolha um `id` único e a categoria `acai` ou `batidinhas`, e preencha nome, descrição, tamanho e opções. Cada opção contém `label`, `price` e `alcohol`. Para uma única opção de açaí, deixe `label` vazio. Atualize os textos de contagem e resumo de preços das categorias em `index.html` se o catálogo mudar. O slogan e os textos institucionais ficam no HTML. As cores ficam nas variáveis do início de `styles.css`.

Nenhum outro dado comercial é necessário para usar os links de pedido atuais. Endereço específico de retirada, horários e prazo de entrega só devem ser acrescentados caso a empresa forneça essas informações; atualmente tudo é combinado pelo WhatsApp.

## Integrar à main e publicar gratuitamente

**Esta atualização não publica automaticamente e não altera a branch `main`.** Não há workflow de deploy adicionado.

1. Abra o [pull request #1](https://github.com/korchakerick/nevie.gourmet/pull/1), confira os arquivos em **Files changed** e faça a revisão local.
2. Quando estiver satisfeito, use **Merge pull request → Confirm merge** para integrar `feat/nevie-gourmet-site` à `main`. Se houver conflitos ou regras de proteção, resolva-os antes de confirmar. Se o PR já tiver sido integrado, abra um novo PR da branch atualizada para `main`.
3. No repositório, acesse **Settings → Pages → Build and deployment**.
4. Em **Source**, escolha **Deploy from a branch**. Selecione **main**, pasta **/(root)**, e salve. Não há comando de build.
5. Aguarde o processamento e abra a URL exibida pelo GitHub. O endereço esperado é `https://korchakerick.github.io/nevie.gourmet/`, disponível somente após a publicação bem-sucedida.
6. Faça uma conferência final dos contatos, mensagens, fotos e navegação no endereço publicado antes de divulgá-lo.

O GitHub Pages é gratuito para repositórios públicos. Se o repositório estiver privado e o plano da conta não incluir Pages, será necessário torná-lo público para usar essa alternativa gratuitamente; avalie essa escolha antes de mudar a visibilidade. Não é necessário comprar domínio.

**Atenção:** se o Pages já estiver configurado para publicar a `main`, integrar o PR poderá iniciar a publicação. A revisão deve ocorrer antes do merge. Nenhuma dessas etapas de publicação foi executada nesta atualização.
