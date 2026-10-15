# Névie Gourmet

Site institucional responsivo em português, feito com HTML, CSS e JavaScript puro. Não exige instalação de dependências, banco de dados ou etapa de build.

## Visualizar

Abra `index.html` no navegador. Para testar em servidor local (recomendado para a função de copiar mensagem):

```sh
python3 -m http.server 8000
```

Acesse http://localhost:8000. No celular conectado à mesma rede, use o IP do computador na porta 8000.

## Configurar os contatos

Edite `config.js`:

- `whatsapp`: número oficial completo, apenas dígitos, com 55 + DDD + número. Vazio por padrão; o envio fica indisponível até configurar um número válido.
- `instagram`: URL HTTPS completa do perfil oficial. Vazio por padrão.
- Endereço e informações de atendimento: altere a seção de contato em `index.html` quando os dados reais estiverem disponíveis.

O WhatsApp abre uma mensagem com produto, tamanho, opção e preço. O cliente precisa enviar a mensagem e combinar disponibilidade e atendimento diretamente com a empresa. Não há pagamento ou confirmação automática de pedido. A versão com álcool exige confirmação de idade antes de abrir o WhatsApp; isso não substitui a conferência de idade na venda.

## Produtos e fotos

O array `products` em `config.js` concentra nome, sabor, descrição, volume, imagem, texto alternativo e opções/preços. Para novos produtos, acrescente um objeto seguindo o modelo existente, usando um `id` único. As opções não precisam conter álcool. Não adicione categorias futuras como disponíveis antes do lançamento real.

As imagens atuais são fotografias ilustrativas externas do Unsplash, identificadas no site; não representam fotos dos produtos da marca. Para substituí-las, coloque arquivos otimizados WebP/JPEG em `assets/` e atualize `image` e `alt` em `config.js`. A foto principal fica em `index.html`. Remova os avisos de imagem ilustrativa apenas ao usar fotografias reais. Se os serviços externos falharem, o layout mantém fundo e descrição alternativa. As fontes vêm do Google Fonts, com alternativas locais Georgia/Arial.

## Publicar no GitHub Pages

1. Integre a branch desta implementação à `main` pelo pull request.
2. No repositório, vá a **Settings → Pages → Build and deployment**.
3. Escolha **Deploy from a branch**, branch **main**, pasta **/(root)** e salve.
4. Aguarde a publicação e abra a URL informada pelo GitHub. Para este repositório, o endereço esperado é `https://korchakerick.github.io/nevie.gourmet/`; só estará disponível após ativar o Pages e concluir a publicação.
5. Antes de divulgar, configure telefone, Instagram e fotos reais. Um domínio próprio pode ser configurado em **Pages → Custom domain**, seguindo os registros DNS indicados pelo GitHub.

Também é possível hospedar esta pasta em qualquer serviço de hospedagem estática, sem comando de build.

## Organização e verificação

- `index.html`: estrutura, conteúdo e contatos.
- `styles.css`: identidade visual, layout adaptável, foco visível e redução de movimento.
- `config.js`: configuração comercial e catálogo.
- `app.js`: catálogo, seleção, modal de pedido, idade, links e menu móvel.

Validação de sintaxe: `node --check app.js` e `node --check config.js`. Faça a revisão visual em celular, tablet e computador e teste os links com o número oficial antes de divulgar.
