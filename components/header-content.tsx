import { LucideIcon } from "lucide-react"

const HeaderContent = ({ 
  title, 
  subtitle,
  icon
  }: { title: string, 
    subtitle?: string,
    icon?: LucideIcon 
  }) => {
  return (
    <>
      <h2 className="text-2xl md:text-4xl font-bold">{title}</h2>
      {subtitle && <p className="mt-4 text-muted-foreground font-light text-sm lg:text-lg">{subtitle}</p>}
    </>
  )
}

export default HeaderContent