import {
  Briefcase,
  ShieldCheck,
  Cog,
  HelpCircle,
  ChevronRight,
  FileText,
  Gavel,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
import { cn } from '@/lib/utils'
import type { Servico } from '@/services/servicos'
import { Link } from 'react-router-dom'

const IconMap: Record<string, any> = {
  briefcase: Briefcase,
  'shield-check': ShieldCheck,
  cog: Cog,
  'file-text': FileText,
  gavel: Gavel,
}

export function ServiceCard({ service, index }: { service: Servico; index: number }) {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 })
  const Icon = IconMap[service.icone] || HelpCircle

  return (
    <div
      ref={ref}
      className={cn('h-full opacity-0', isIntersecting && 'animate-slide-up')}
      style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
    >
      <Card className="h-full flex flex-col group hover:shadow-elevation hover:-translate-y-1 transition-all duration-300 border-none bg-white shadow-subtle">
        <CardHeader>
          <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
            <Icon className="w-6 h-6" />
          </div>
          <CardTitle className="text-xl font-bold text-foreground">{service.titulo}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription className="text-base text-muted-foreground leading-relaxed">
            {service.descricao}
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Link
            to="/contato"
            className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors group/link"
          >
            Saiba Mais
            <ChevronRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
