import { Briefcase, ShieldCheck, Settings, ChevronRight } from 'lucide-react'
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
import type { Service } from '@/lib/data'

const IconMap = {
  briefcase: Briefcase,
  shield: ShieldCheck,
  settings: Settings,
}

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 })
  const Icon = IconMap[service.icon]

  return (
    <div
      ref={ref}
      className={cn('h-full opacity-0', isIntersecting && 'animate-slide-up')}
      style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
    >
      <Card className="h-full flex flex-col group hover:shadow-elevation hover:-translate-y-1 transition-all duration-300 border-none bg-white shadow-subtle">
        <CardHeader>
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
            <Icon className="w-6 h-6" />
          </div>
          <CardTitle className="text-xl font-bold text-foreground">{service.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription className="text-base text-muted-foreground leading-relaxed">
            {service.description}
          </CardDescription>
        </CardContent>
        <CardFooter>
          <a
            href="#contato"
            className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors group/link"
          >
            Saiba Mais
            <ChevronRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
          </a>
        </CardFooter>
      </Card>
    </div>
  )
}
