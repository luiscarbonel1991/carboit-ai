import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

const HeaderContent = ({ 
  title, 
  subtitle,
  icon,
  titleClassName,
  subtitleClassName,
  }: { 
    title: string, 
    subtitle?: string,
    icon?: LucideIcon,
    titleClassName?: string,
    subtitleClassName?: string
  }) => {
  return (
    <>
      <h2 className={
        cn(
          "text-2xl md:text-4xl font-bold",
          titleClassName
        )
      }>{title}</h2>
      {subtitle && <p className={
        cn(
          "mt-4 text-muted-foreground font-light text-sm lg:text-lg",
          subtitleClassName
        )
      }>{subtitle}</p>}
    </>
  )
}

export default HeaderContent