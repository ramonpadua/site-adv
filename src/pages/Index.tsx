import { useEffect, useState } from 'react'
import { Globe, Phone, MapPin, ArrowRight, AlertCircle, RefreshCw, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
import { cn } from '@/lib/utils'
import { getServicos, type Servico } from '@/services/servicos'
import { ServiceCard } from '@/components/ServiceCard'
import { Link } from 'react-router-dom'
import chartImage from '../assets/renda-media-por-classe-social-em-petropolis-79491.png'

export default function Index() {
  const [status, setStatus] = useState<'loading' | 'error' | 'empty' | 'success'>('loading')
  const [services, setServices] = useState<Servico[]>([])
  const { ref: heroRef, isIntersecting: isHeroVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
  })

  const loadData = async () => {
    setStatus('loading')
    try {
      const data = await getServicos()
      if (data.length === 0) {
        setStatus('empty')
      } else {
        setServices(data)
        setStatus('success')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      <section id="inicio" className="relative min-h-[90vh] flex flex-col justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1920"
            alt="Consultant Professional"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/80 to-transparent"></div>
        </div>

        <div
          className="container relative z-10 mx-auto px-4 flex-grow flex flex-col justify-center"
          ref={heroRef}
        >
          <div className="max-w-3xl">
            <div className={cn('opacity-0', isHeroVisible && 'animate-fade-in-up')}>
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm text-blue-100 text-sm font-semibold tracking-wider uppercase">
                Consultoria Jurídica e Empresarial
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 font-display">
                35 Anos de Experiência em Consultoria Trabalhista e Compliance
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl leading-relaxed">
                Transforme sua empresa com visão estratégica em direito, contabilidade e gestão.
                Resultados sólidos construídos com autoridade e ética.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white text-base px-8 h-14"
                  asChild
                >
                  <Link to="/contato">
                    Agende uma Consulta
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-auto bg-blue-950/80 backdrop-blur-md border-t border-white/10 w-full py-4">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-blue-100">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <Globe className="w-5 h-5 text-primary-foreground/70" />
                <span>www.proisolucoes.com.br</span>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-center">
                <Phone className="w-5 h-5 text-primary-foreground/70" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-end">
                <MapPin className="w-5 h-5 text-primary-foreground/70" />
                <span>São José dos Campos, SP</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="servicos" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nossos Serviços</h2>
            <p className="text-lg text-muted-foreground">
              Soluções integradas para proteger e impulsionar o seu negócio, garantindo segurança
              jurídica e eficiência operacional.
            </p>
          </div>

          {status === 'loading' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-none shadow-sm">
                  <CardHeader>
                    <Skeleton className="w-12 h-12 rounded-lg mb-4" />
                    <Skeleton className="h-6 w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-2" />
                    <Skeleton className="h-4 w-4/6" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-4 w-24" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {status === 'error' && (
            <Alert variant="destructive" className="max-w-xl mx-auto bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Ocorreu um erro</AlertTitle>
              <AlertDescription className="mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <span>Ocorreu um erro ao carregar os serviços. Por favor, tente novamente.</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadData}
                  className="bg-white text-destructive"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Tentar Novamente
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {status === 'empty' && (
            <div className="text-center py-20 flex flex-col items-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Briefcase className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Nenhum serviço disponível
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Não foi possível carregar a lista de serviços no momento. Volte mais tarde ou tente
                atualizar a página.
              </p>
              <Button onClick={loadData} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Atualizar
              </Button>
            </div>
          )}

          {status === 'success' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="sobre" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <img
                src={chartImage}
                alt="Gráfico de Renda Média por Classe Social em Petrópolis"
                className="rounded-xl shadow-lg object-cover aspect-video w-full"
              />
            </div>
            <div className="w-full md:w-1/2">
              <div className="inline-block px-3 py-1 mb-4 rounded-full bg-secondary text-primary text-sm font-semibold tracking-wide">
                Sobre Nós
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Tradição, Ética e Inovação em um só lugar.
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Fundada há mais de três décadas, a Proi Soluções nasceu com a missão de oferecer
                segurança e clareza para o empresário brasileiro.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Nossa equipe multidisciplinar trabalha para transformar complexidade em soluções
                práticas, sempre pautadas nos mais altos padrões éticos de compliance.
              </p>
              <Button variant="outline" size="lg">
                Conheça nossa História
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-white rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 -right-1/4 w-1/2 h-full bg-white rounded-full blur-[100px]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Pronto para transformar sua empresa?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Agende uma consulta com nossos especialistas e descubra como podemos mitigar riscos e
            alavancar seus resultados.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-primary font-bold px-8 h-14 text-base"
              asChild
            >
              <Link to="/contato">Fale com um Especialista</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 px-8 h-14 text-base bg-transparent"
              asChild
            >
              <a href="tel:11999999999">Ligue (11) 99999-9999</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
