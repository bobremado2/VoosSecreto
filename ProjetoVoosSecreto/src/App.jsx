import { useState, useRef, useEffect } from 'react'

function App() {
  // Estado para controlar o FAQ acordeão
  const [openFaq, setOpenFaq] = useState(null)
  
  // Estado e ref para o carrossel
  const carouselRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // CONFIGURAÇÕES - MODIFIQUE AQUI
  // ================================
  
  // LINK DO WHATSAPP - Altere aqui o número/links dos botões CTA
  const WHATSAPP_LINK = "https://wa.me/5511999999999?text=Olá!%20Quero%20receber%20promoções%20de%20voos%20secretos!"
  
  // COMPARAÇÕES DE PREÇOS - Modifique aqui os destinos e preços
  const comparacoes = [
    {
      destino: "Rio de Janeiro",
      imagem: "/assets/destinos/rio.jpg", // Coloque suas imagens na pasta public/assets/destinos/
      precoVoosSecretos: "R$ 450",
      precoGoogle: "R$ 680",
      economia: "R$ 230"
    },
    {
      destino: "São Paulo",
      imagem: "/assets/destinos/sao-paulo.jpg",
      precoVoosSecretos: "R$ 380",
      precoGoogle: "R$ 550",
      economia: "R$ 170"
    },
    {
      destino: "Salvador",
      imagem: "/assets/destinos/salvador.jpg",
      precoVoosSecretos: "R$ 520",
      precoGoogle: "R$ 750",
      economia: "R$ 230"
    },
    {
      destino: "Florianópolis",
      imagem: "/assets/destinos/florianopolis.jpg",
      precoVoosSecretos: "R$ 480",
      precoGoogle: "R$ 720",
      economia: "R$ 240"
    },
    {
      destino: "Fortaleza",
      imagem: "/assets/destinos/fortaleza.jpg",
      precoVoosSecretos: "R$ 550",
      precoGoogle: "R$ 820",
      economia: "R$ 270"
    },
    {
      destino: "Recife",
      imagem: "/assets/destinos/recife.jpg",
      precoVoosSecretos: "R$ 490",
      precoGoogle: "R$ 710",
      economia: "R$ 220"
    }
  ]

  // Função para scroll suave
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Funções para navegar o carrossel
  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return
    
    const cardWidth = 280 // w-64 + gap = 256px + 24px = 280px (mobile)
    const scrollAmount = cardWidth * (window.innerWidth >= 640 ? 1.5 : 1) // Scroll mais no desktop
    
    if (direction === 'next') {
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      setCurrentIndex(prev => (prev + 1) % comparacoes.length)
    } else {
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      setCurrentIndex(prev => (prev - 1 + comparacoes.length) % comparacoes.length)
    }
  }

  // Efeito para criar loop infinito e inicializar posição
  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    // Inicializar no meio (segunda cópia) para permitir scroll em ambas direções
    const cardWidth = 280 // w-64 + gap
    const initialPosition = cardWidth * comparacoes.length
    carousel.scrollTo({ left: initialPosition, behavior: 'auto' })

    const handleScroll = () => {
      const { scrollLeft } = carousel
      const singleSetWidth = cardWidth * comparacoes.length
      
      // Se passou do final da segunda cópia, volta para o início da segunda cópia
      if (scrollLeft >= singleSetWidth * 2 - 10) {
        carousel.scrollTo({ left: singleSetWidth, behavior: 'auto' })
      }
      
      // Se voltou antes do início da segunda cópia, vai para o final da segunda cópia
      if (scrollLeft <= singleSetWidth - 10) {
        carousel.scrollTo({ left: singleSetWidth * 2 - cardWidth, behavior: 'auto' })
      }
    }

    carousel.addEventListener('scroll', handleScroll)
    return () => carousel.removeEventListener('scroll', handleScroll)
  }, [comparacoes.length])
  
  // TEXTO DOS DEPOIMENTOS - Modifique aqui os depoimentos fictícios
  const depoimentos = [
    {
      nome: "Mariana S.",
      cidade: "Curitiba - PR",
      texto: "Consegui ir para o Chile pagando metade do preço graças ao Voos Secretos. As promoções chegam rápido e são realmente boas."
    },
    {
      nome: "João Pedro M.",
      cidade: "São Paulo - SP",
      texto: "Nunca mais perdi uma promoção relâmpago! O serviço é excelente e sempre mando para amigos. Vale muito a pena!"
    },
    {
      nome: "Ana Paula R.",
      cidade: "Rio de Janeiro - RJ",
      texto: "Encontrei passagem para Europa por um preço incrível. A curadoria deles é perfeita, só enviam ofertas realmente boas."
    },
    {
      nome: "Carlos Eduardo L.",
      cidade: "Belo Horizonte - MG",
      texto: "Economizei mais de R$ 2.000 em uma viagem que estava planejando. O alerta chegou justo na hora certa!"
    },
    {
      nome: "Fernanda C.",
      cidade: "Porto Alegre - RS",
      texto: "Melhor investimento que fiz este ano. As promoções são exclusivas e sempre valem a pena. Recomendo demais!"
    }
  ]

  // CORES PRINCIPAIS - Para mudar as cores, edite o tailwind.config.js ou use classes diretamente abaixo
  // As cores principais já estão definidas no tailwind.config.js como:
  // primary-dark: '#0A2647' (azul escuro)
  // accent: '#F4A460' (amarelo/dourado)

  return (
    <div className="min-h-screen bg-white">
      
      {/* ============================================
          HEADER FIXO
          ============================================ */}
      <header className="fixed top-0 left-0 right-0 bg-primary-dark shadow-lg z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white whitespace-nowrap">
                Voos Secretos
              </h1>
            </div>

            {/* Menu Desktop */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              <button 
                onClick={() => scrollToSection('como-funciona')}
                className="text-white hover:text-accent transition-colors duration-200 text-sm xl:text-base"
              >
                Como funciona
              </button>
              <button 
                onClick={() => scrollToSection('vantagens')}
                className="text-white hover:text-accent transition-colors duration-200 text-sm xl:text-base"
              >
                Vantagens
              </button>
              <button 
                onClick={() => scrollToSection('comparacoes')}
                className="text-white hover:text-accent transition-colors duration-200 text-sm xl:text-base"
              >
                Comparações
              </button>
              <button 
                onClick={() => scrollToSection('depoimentos')}
                className="text-white hover:text-accent transition-colors duration-200 text-sm xl:text-base"
              >
                Depoimentos
              </button>
              <button 
                onClick={() => scrollToSection('faq')}
                className="text-white hover:text-accent transition-colors duration-200 text-sm xl:text-base"
              >
                FAQ
              </button>
              <button 
                onClick={() => scrollToSection('contato')}
                className="text-white hover:text-accent transition-colors duration-200 text-sm xl:text-base"
              >
                Contato
              </button>
            </nav>

            {/* Botão CTA Header */}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent hover:bg-accent-light text-primary-dark font-semibold px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 shadow-md text-xs sm:text-sm whitespace-nowrap"
            >
              <span className="hidden sm:inline">Quero receber promoções</span>
              <span className="sm:hidden">Promoções</span>
            </a>
          </div>

          {/* Menu Mobile/Tablet */}
          <nav className="lg:hidden mt-3 sm:mt-4 flex flex-wrap gap-2 sm:gap-3">
            <button 
              onClick={() => scrollToSection('como-funciona')}
              className="text-white text-xs sm:text-sm hover:text-accent transition-colors px-2 py-1"
            >
              Como funciona
            </button>
            <button 
              onClick={() => scrollToSection('vantagens')}
              className="text-white text-xs sm:text-sm hover:text-accent transition-colors px-2 py-1"
            >
              Vantagens
            </button>
            <button 
              onClick={() => scrollToSection('comparacoes')}
              className="text-white text-xs sm:text-sm hover:text-accent transition-colors px-2 py-1"
            >
              Comparações
            </button>
            <button 
              onClick={() => scrollToSection('depoimentos')}
              className="text-white text-xs sm:text-sm hover:text-accent transition-colors px-2 py-1"
            >
              Depoimentos
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-white text-xs sm:text-sm hover:text-accent transition-colors px-2 py-1"
            >
              FAQ
            </button>
            <button 
              onClick={() => scrollToSection('contato')}
              className="text-white text-xs sm:text-sm hover:text-accent transition-colors px-2 py-1"
            >
              Contato
            </button>
          </nav>
        </div>
      </header>

      {/* ============================================
          HERO SECTION (Seção Principal)
          ============================================ */}
      <section className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-24 bg-gradient-to-b from-primary-dark to-primary-DEFAULT text-white">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
            {/* Conteúdo de texto */}
            <div className="fade-in">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                As melhores promoções de passagens aéreas, antes de todo mundo.
              </h2>
              <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-200 leading-relaxed">
                Nós vasculhamos as companhias e agências para encontrar voos secretos com desconto e te avisar antes de esgotar.
              </p>

              {/* Botão WhatsApp */}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-primary-dark font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-200 hover:scale-105 text-sm sm:text-base w-full sm:w-auto"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span className="truncate">Receber ofertas no WhatsApp</span>
              </a>
            </div>

            {/* Espaço para Imagens - Substitua o placeholder pela sua imagem */}
            <div className="fade-in">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20">
                {/* IMAGEM PRINCIPAL - Substitua o src pela sua imagem */}
                <img 
                  src="/assets/hero-image.jpg" 
                  alt="Voos Secretos" 
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    // Fallback caso a imagem não exista
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'block';
                  }}
                />
                {/* Placeholder SVG caso a imagem não exista */}
                <div className="p-8 hidden">
                  <svg className="w-full h-auto max-h-96 mx-auto" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M200 50L350 150L200 250L50 150L200 50Z" stroke="#F4A460" strokeWidth="4" fill="none"/>
                    <circle cx="200" cy="150" r="30" fill="#F4A460"/>
                    <path d="M100 100L300 100M100 200L300 200" stroke="#F4A460" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SEÇÃO: COMO FUNCIONA
          ============================================ */}
      <section id="como-funciona" className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4 text-primary-dark">
            Como funciona
          </h2>
          <p className="text-center text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base px-2">
            Em 4 passos simples, você recebe as melhores promoções de passagens aéreas diretamente no seu e-mail ou WhatsApp.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Passo 1 */}
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200 border border-gray-100">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl font-bold text-primary-dark">1</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3 text-primary-dark">
                Você se cadastra
              </h3>
              <p className="text-gray-600 text-center">
                Informe seu e-mail ou entre no nosso grupo exclusivo do WhatsApp. É rápido e grátis!
              </p>
            </div>

            {/* Passo 2 */}
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200 border border-gray-100">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl font-bold text-primary-dark">2</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3 text-primary-dark">
                A gente monitora
              </h3>
              <p className="text-gray-600 text-center">
                Nossa equipe vasculha companhias e agências 24/7 em busca das melhores promoções secretas.
              </p>
            </div>

            {/* Passo 3 */}
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200 border border-gray-100">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl font-bold text-primary-dark">3</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3 text-primary-dark">
                Enviamos apenas oportunidades reais
              </h3>
              <p className="text-gray-600 text-center">
                Curadoria humana + tecnologia para enviar só ofertas realmente boas, nada de falso desconto.
              </p>
            </div>

            {/* Passo 4 */}
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200 border border-gray-100">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl font-bold text-primary-dark">4</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3 text-primary-dark">
                Você compra direto
              </h3>
              <p className="text-gray-600 text-center">
                Ao encontrar a passagem perfeita, você compra diretamente na companhia ou agência parceira.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SEÇÃO: VANTAGENS
          ============================================ */}
      <section id="vantagens" className="py-12 sm:py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4 text-primary-dark">
            Por que escolher o Voos Secretos?
          </h2>
          <p className="text-center text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base px-2">
            Diferenciais que fazem toda a diferença na hora de encontrar a passagem perfeita com o melhor preço.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Vantagem 1 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-200">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-dark">
                Promoções reais, nada de falso desconto
              </h3>
              <p className="text-gray-600">
                Garantimos que todas as promoções enviadas são ofertas genuínas com descontos reais. Nada de maquiagem de preço.
              </p>
            </div>

            {/* Vantagem 2 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-200">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-dark">
                Avisos rápidos para não perder
              </h3>
              <p className="text-gray-600">
                Promoções relâmpago têm tempo limitado. A gente te avisa na hora para você não perder nenhuma oportunidade exclusiva.
              </p>
            </div>

            {/* Vantagem 3 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-200">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-dark">
                Curadoria humana + tecnologia
              </h3>
              <p className="text-gray-600">
                Combinamos o melhor dos dois mundos: inteligência artificial para monitorar + análise humana para garantir qualidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SEÇÃO: COMPARAÇÕES DE PREÇOS
          ============================================ */}
      <section id="comparacoes" className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4 text-primary-dark">
            Compare os Preços
          </h2>
          <p className="text-center text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base px-2">
            Veja a diferença de preço entre o Voos Secretos e o Google. Economia real em cada destino!
          </p>

          {/* Carrossel horizontal de comparações com setas */}
          <div className="relative">
            {/* Seta esquerda */}
            <button
              onClick={() => scrollCarousel('prev')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 sm:p-3 hover:bg-accent hover:text-white transition-all duration-200 hover:scale-110 hidden sm:flex items-center justify-center"
              aria-label="Anterior"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Seta direita */}
            <button
              onClick={() => scrollCarousel('next')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 sm:p-3 hover:bg-accent hover:text-white transition-all duration-200 hover:scale-110 hidden sm:flex items-center justify-center"
              aria-label="Próximo"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Container do carrossel */}
            <div 
              ref={carouselRef}
              className="overflow-x-hidden pb-4 px-8 sm:px-12"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex gap-4 sm:gap-6">
                {/* Duplicar itens para efeito infinito */}
                {[...comparacoes, ...comparacoes, ...comparacoes].map((comparacao, index) => (
                  <div 
                    key={`${comparacao.destino}-${index}`}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-100 overflow-hidden flex-shrink-0 w-64 sm:w-72"
                  >
                    {/* Imagem do destino - Espaço para imagem da cidade */}
                    <div className="relative h-32 sm:h-40 bg-gray-200 overflow-hidden">
                      <img 
                        src={comparacao.imagem} 
                        alt={comparacao.destino}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback caso a imagem não exista - apenas espaço vazio
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>

                    {/* Conteúdo do card */}
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-primary-dark mb-3 text-center">
                        {comparacao.destino}
                      </h3>

                      {/* Comparação de preços - lado a lado */}
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {/* Preço Voos Secretos */}
                        <div className="bg-accent/10 rounded-lg p-2 border-l-2 border-accent">
                          <p className="text-xs text-gray-600 mb-1">Voos Secretos:</p>
                          <p className="text-base sm:text-lg font-bold text-primary-dark">
                            {comparacao.precoVoosSecretos}
                          </p>
                        </div>

                        {/* Preço Google */}
                        <div className="bg-gray-100 rounded-lg p-2 border-l-2 border-gray-400">
                          <p className="text-xs text-gray-600 mb-1">Google:</p>
                          <p className="text-base sm:text-lg font-bold text-gray-700 line-through">
                            {comparacao.precoGoogle}
                          </p>
                        </div>
                      </div>

                      {/* Economia */}
                      <div className="bg-green-50 rounded-lg p-2 border-l-2 border-green-500">
                        <p className="text-xs text-green-700 mb-1 font-semibold">Economia:</p>
                        <p className="text-sm sm:text-base font-bold text-green-600">
                          {comparacao.economia}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Setas para mobile (botões abaixo do carrossel) */}
            <div className="flex justify-center gap-4 mt-4 sm:hidden">
              <button
                onClick={() => scrollCarousel('prev')}
                className="bg-primary-dark text-white rounded-full p-3 hover:bg-accent transition-all duration-200"
                aria-label="Anterior"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scrollCarousel('next')}
                className="bg-primary-dark text-white rounded-full p-3 hover:bg-accent transition-all duration-200"
                aria-label="Próximo"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SEÇÃO: DEPOIMENTOS
          ============================================ */}
      <section id="depoimentos" className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4 text-primary-dark">
            O que nossos clientes dizem
          </h2>
          <p className="text-center text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base px-2">
            Histórias reais de pessoas que economizaram muito com nossas promoções secretas.
          </p>

          {/* Grid de depoimentos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {depoimentos.map((depoimento, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-200 border-l-4 border-accent"
              >
                <div className="mb-4">
                  <svg className="w-8 h-8 text-accent mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>
                <p className="text-gray-700 mb-4 italic leading-relaxed">
                  "{depoimento.texto}"
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-semibold text-primary-dark">{depoimento.nome}</p>
                  <p className="text-sm text-gray-500">{depoimento.cidade}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SEÇÃO: FAQ (Perguntas Frequentes)
          ============================================ */}
      <section id="faq" className="py-12 sm:py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4 text-primary-dark">
            Perguntas Frequentes
          </h2>
          <p className="text-center text-gray-600 mb-8 sm:mb-12 text-sm sm:text-base">
            Tire suas dúvidas sobre como funciona o Voos Secretos.
          </p>

          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-primary-dark text-sm sm:text-base pr-2">
                  Eu compro a passagem com vocês ou direto na companhia?
                </span>
                <svg 
                  className={`w-5 h-5 text-primary-dark transform transition-transform ${openFaq === 1 ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 1 && (
                <div className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600 border-t border-gray-100 text-sm sm:text-base">
                  <p>
                    Você compra direto na companhia aérea ou agência parceira. O Voos Secretos apenas te avisa sobre as promoções, 
                    facilitando sua busca. Quando você clica no link da promoção, é redirecionado para o site oficial para finalizar a compra.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-primary-dark text-sm sm:text-base pr-2">
                  Tem algum custo para receber as promoções?
                </span>
                <svg 
                  className={`w-5 h-5 text-primary-dark transform transition-transform ${openFaq === 2 ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 2 && (
                <div className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600 border-t border-gray-100 text-sm sm:text-base">
                  <p>
                    Não! O serviço é 100% gratuito. Você não paga nada para receber os alertas de promoções. 
                    Nosso objetivo é te ajudar a encontrar as melhores passagens, sem custo algum.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-primary-dark text-sm sm:text-base pr-2">
                  Com que frequência vocês enviam ofertas?
                </span>
                <svg 
                  className={`w-5 h-5 text-primary-dark transform transition-transform ${openFaq === 3 ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 3 && (
                <div className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600 border-t border-gray-100 text-sm sm:text-base">
                  <p>
                    Enviamos apenas quando encontramos promoções realmente boas. Não fazemos spam! 
                    Geralmente são de 2 a 4 ofertas por semana, mas pode variar conforme a disponibilidade de promoções genuínas no mercado.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-primary-dark text-sm sm:text-base pr-2">
                  Vocês monitoram todas as companhias aéreas?
                </span>
                <svg 
                  className={`w-5 h-5 text-primary-dark transform transition-transform ${openFaq === 4 ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 4 && (
                <div className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600 border-t border-gray-100 text-sm sm:text-base">
                  <p>
                    Monitoramos as principais companhias aéreas nacionais e internacionais, além de agências de viagem confiáveis. 
                    Focamos nas empresas que mais fazem promoções e têm histórico de oferecer descontos reais.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ Item 5 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === 5 ? null : 5)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-primary-dark text-sm sm:text-base pr-2">
                  Posso cancelar o recebimento de ofertas a qualquer momento?
                </span>
                <svg 
                  className={`w-5 h-5 text-primary-dark transform transition-transform ${openFaq === 5 ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 5 && (
                <div className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600 border-t border-gray-100 text-sm sm:text-base">
                  <p>
                    Sim! Você pode cancelar o recebimento a qualquer momento, sem qualquer custo ou burocracia. 
                    Basta clicar no link de descadastro que vem em cada e-mail ou sair do grupo do WhatsApp quando quiser.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ Item 6 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === 6 ? null : 6)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-primary-dark text-sm sm:text-base pr-2">
                  As promoções são realmente secretas ou exclusivas?
                </span>
                <svg 
                  className={`w-5 h-5 text-primary-dark transform transition-transform ${openFaq === 6 ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 6 && (
                <div className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600 border-t border-gray-100 text-sm sm:text-base">
                  <p>
                    Chamamos de "secretas" porque são promoções que muitas vezes passam despercebidas ou ficam disponíveis por pouco tempo. 
                    Nossa curadoria identifica essas oportunidades antes que se esgotem, dando a você vantagem de tempo para garantir a passagem.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SEÇÃO: CTA FINAL
          ============================================ */}
      <section id="contato" className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-primary-DEFAULT to-primary-dark text-white">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Pronto para receber as próximas promoções secretas?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-200 max-w-2xl mx-auto px-2">
            Entre no nosso grupo exclusivo do WhatsApp e comece a economizar hoje mesmo.
          </p>

          {/* Botão WhatsApp */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-primary-dark font-semibold px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg transition-all duration-200 hover:scale-105 text-sm sm:text-base md:text-lg w-full sm:w-auto max-w-md"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span>Quero receber promoções</span>
          </a>
        </div>
      </section>

      {/* ============================================
          FOOTER
          ============================================ */}
      <footer className="bg-primary-dark text-white py-6 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Coluna 1: Logo e descrição */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Voos Secretos</h3>
              <p className="text-gray-300 text-xs sm:text-sm">
                As melhores promoções de voos, antes de todo mundo.
              </p>
            </div>

            {/* Coluna 2: Links de navegação */}
            <div>
              <h4 className="font-semibold mb-4">Navegação</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button 
                    onClick={() => scrollToSection('como-funciona')}
                    className="text-gray-300 hover:text-accent transition-colors"
                  >
                    Como funciona
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('vantagens')}
                    className="text-gray-300 hover:text-accent transition-colors"
                  >
                    Vantagens
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('comparacoes')}
                    className="text-gray-300 hover:text-accent transition-colors"
                  >
                    Comparações
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('depoimentos')}
                    className="text-gray-300 hover:text-accent transition-colors"
                  >
                    Depoimentos
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('faq')}
                    className="text-gray-300 hover:text-accent transition-colors"
                  >
                    FAQ
                  </button>
                </li>
              </ul>
            </div>

            {/* Coluna 3: Links legais */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                    Política de Privacidade
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Linha de direitos autorais */}
          <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Voos Secretos. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
