# Passagem Secreta - Landing Page

Landing page moderna para captação de leads de promoções de passagens aéreas.

## 🚀 Como rodar o projeto

### Pré-requisitos
- Node.js instalado (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Instale as dependências:
```bash
npm install
```

2. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

3. Abra o navegador em `http://localhost:5173`

### Build para produção

```bash
npm run build
```

Os arquivos estarão na pasta `dist/`.

## 📝 Como personalizar

### Alterar textos dos depoimentos

Edite o array `depoimentos` no arquivo `src/App.jsx`, linha ~25:

```javascript
const depoimentos = [
  {
    nome: "Seu Nome",
    cidade: "Sua Cidade - UF",
    texto: "Seu depoimento aqui..."
  },
  // ... mais depoimentos
]
```

### Alterar links do WhatsApp

Edite a constante `WHATSAPP_LINK` no arquivo `src/App.jsx`, linha ~20:

```javascript
const WHATSAPP_LINK = "https://wa.me/5511999999999?text=..."
```

Substitua `5511999999999` pelo número do WhatsApp (formato: código do país + DDD + número, sem espaços ou caracteres especiais).

### Alterar cores principais

Edite o arquivo `tailwind.config.js`:

```javascript
colors: {
  primary: {
    dark: '#0A2647', // Azul escuro
    DEFAULT: '#144272',
  },
  accent: {
    DEFAULT: '#F4A460', // Amarelo/dourado
    light: '#FFD700',
  },
}
```

Ou altere diretamente nas classes do componente `App.jsx`.

## 🛠️ Tecnologias

- React 18
- Vite
- Tailwind CSS
- JavaScript

## 📱 Responsivo

A página é totalmente responsiva e foi desenvolvida com abordagem mobile-first.

## 📄 Licença

Este projeto é livre para uso pessoal e comercial.
