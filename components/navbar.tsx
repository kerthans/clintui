"use client"
import { useId, useState } from "react"

import { PageContainer } from "@/components/page-container"
import { ResponsiveAside } from "@/components/responsive-aside"
import { Badge } from "@/components/ui/badge"
import { Button, buttonStyles } from "@/components/ui/button"
import { Keyboard } from "@/components/ui/keyboard"
import { Link } from "@/components/ui/link"
import { Menu } from "@/components/ui/menu"
import { Separator } from "@/components/ui/separator"
import { siteConfig } from "@/resources/config/site"
import { useMediaQuery } from "@/utils/use-media-query"
import {
  IconBrandAdobe,
  IconBrandDiscord,
  IconBrandFigma,
  IconBrandGithub,
  IconBrandIntentui,
  IconBrandTailwindcss,
  IconBrandX,
  IconChevronLgDown,
  IconColorPalette,
  IconColors,
  IconCube,
  IconHome,
  IconNotepad,
  IconSearch,
  IconWindowVisit,
  IconWindowVisitFill,
} from "@intentui/icons"
import { LayoutGroup } from "motion/react"
import { usePathname } from "next/navigation"
import { CommandPalette } from "./command-palette"
import { NavLink } from "./nav-item"
import { ThemeSwitcher } from "./theme-switcher"

export function Navbar() {
  const id = useId()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  return (
    <>
      <CommandPalette setOpen={setOpen} openCmd={open} />
      <LayoutGroup id={`navigation-${id}`}>
        <div className="xnw2 sticky top-0 z-40 hidden overflow-hidden pb-0 lg:block">
          <nav className="border-fg/10 border-b bg-bg py-2 dark:supports-backdrop-filter:bg-bg/60 dark:supports-backdrop-filter:backdrop-blur-3xl">
            <PageContainer className="lg:px-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-6">
                  <NavbarDropdown />
                  <Separator orientation="vertical" className="-ml-4 mr-1 h-6" />
                  <NavLink isNextLink isActive={pathname === "/"} href="/">
                    Home
                  </NavLink>
                  <NavLink
                    isNextLink
                    isActive={
                      pathname?.startsWith("/docs/2.x") &&
                      !pathname?.includes("/docs/2.x/components")
                    }
                    href="/docs/2.x/getting-started/introduction"
                  >
                    Docs
                  </NavLink>
                  <NavLink
                    isNextLink
                    isActive={
                      pathname?.startsWith("/docs/2.x/components") || pathname === "/components"
                    }
                    href="/components"
                  >
                    Components
                  </NavLink>

                  <NavLink isNextLink href="/themes">
                    Themes
                  </NavLink>

                  <NavLink href="/icons">Icons</NavLink>

                  <NavLink href="/colors">Colors</NavLink>

                  <NavLink href="/blocks">Blocks</NavLink>
                  <Menu>
                    <Menu.Trigger className="group flex cursor-pointer items-center gap-x-2 py-3 text-muted-fg text-sm tracking-tight outline-hidden focus-visible:text-fg">
                      Premium Blocks
                      <IconChevronLgDown className="size-3 duration-200 group-pressed:rotate-180" />
                    </Menu.Trigger>
                    <Menu.Content
                      offset={4}
                      className="sm:min-w-xs sm:max-w-min"
                      placement="bottom"
                      items={premium}
                    >
                      {(item) => (
                        <Menu.Item
                          href={item.href}
                          className="group items-start gap-x-3 **:data-[slot=icon]:size-4"
                        >
                          <div className="grid size-8 shrink-0 place-content-center rounded-md bg-secondary/40 ring-1 ring-fg/10">
                            {item.icon}
                          </div>
                          <Menu.ItemDetails>
                            <span className="font-medium sm:text-sm">
                              {item.label}{" "}
                              {item.badge && (
                                <Badge
                                  shape="square"
                                  intent={item.id === 1 ? "warning" : "primary"}
                                  className="ml-0.5 font-mono text-[0.65rem] uppercase"
                                >
                                  {item.badge}
                                </Badge>
                              )}
                            </span>
                            <span className="-mt-0.5 block text-muted-fg text-xs">
                              {item.description}
                            </span>
                          </Menu.ItemDetails>
                        </Menu.Item>
                      )}
                    </Menu.Content>
                  </Menu>
                </div>
                <div className="flex items-center gap-x-1">
                  <>
                    <Button
                      onPress={() => setOpen((open: boolean) => !open)}
                      size="small"
                      intent="outline"
                      className="h-9"
                    >
                      <IconSearch />

                      <span className="text-muted-fg">Search...</span>

                      <Keyboard className="-mr-1" keys="⌘K" />
                    </Button>
                    <ThemeSwitcher />

                    <Link
                      aria-label="Join Discord"
                      className={buttonStyles({
                        intent: "outline",
                        size: "square-petite",
                        className:
                          "hover:border-indigo-500/20 hover:bg-indigo-600/10 **:data-[slot=icon]:text-indigo-500 hover:**:data-[slot=icon]:text-indigo-600",
                      })}
                      target="_blank"
                      href={siteConfig.discord}
                    >
                      <IconBrandDiscord />
                    </Link>
                    <Link
                      aria-label="Follow Update on X"
                      className={buttonStyles({
                        intent: "outline",
                        size: "square-petite",
                        className: "**:data-[slot=icon]:text-fg",
                      })}
                      target="_blank"
                      href="https://x.com/intent/follow?screen_name=irsyadadl"
                    >
                      <IconBrandX />
                    </Link>
                    <Link
                      aria-label="Follow Update on X"
                      className={buttonStyles({
                        intent: "outline",
                        size: "square-petite",
                        className:
                          "hover:border-blue-500/20 hover:bg-blue-600/10 **:data-[slot=icon]:text-fg",
                      })}
                      target="_blank"
                      href="https://dub.sh/NfSXJrL"
                    >
                      <IconBrandIntentui />
                    </Link>

                    <Link
                      aria-label="Github Repository"
                      className={buttonStyles({
                        intent: "outline",
                        size: "square-petite",
                        className: "**:data-[slot=icon]:text-fg sm:text-xs",
                      })}
                      target="_blank"
                      href={siteConfig.repo}
                    >
                      <IconBrandGithub />
                    </Link>
                  </>
                </div>
              </div>
            </PageContainer>
          </nav>
        </div>
      </LayoutGroup>
      {!isDesktop && <ResponsiveAside openCmd={open} setOpenCmd={setOpen} />}
    </>
  )
}

export function NavbarDropdown() {
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-x-1">
      <Menu>
        <Button aria-label={siteConfig.name} intent="plain" className="-ml-1 group">
          <span className="flex items-center gap-x-2">
            <IconBrandIntentui className="-ml-1 size-6" />
            <span className="font-mono text-base tracking-tight sm:text-sm">{siteConfig.name}</span>
            <Badge intent="secondary">
              {pathname.includes("/docs/") ? pathname.split("/")[2] : siteConfig.currentVersion}
            </Badge>
          </span>
        </Button>
        <Menu.Content placement="bottom" className="sm:min-w-64">
          <Menu.Section title="Pages">
            <Menu.Item href="/">
              <IconHome />
              <Menu.Label>Home</Menu.Label>
            </Menu.Item>
            <Menu.Item href="/components">
              <IconCube />
              <Menu.Label>Components</Menu.Label>
            </Menu.Item>
            <Menu.Item href="/colors">
              <IconColors />
              <Menu.Label>Colors</Menu.Label>
            </Menu.Item>
            <Menu.Item href="/themes">
              <IconColorPalette />
              <Menu.Label>Themes</Menu.Label>
            </Menu.Item>
            <Menu.Item href="/blocks">
              <IconWindowVisit />
              <Menu.Label>Blocks</Menu.Label>
            </Menu.Item>
            <Menu.Item target="_blank" href="https://blocks.intentui.com">
              <IconBrandIntentui />
              <Menu.Label>Premium Blocks</Menu.Label>
            </Menu.Item>
            <Menu.Item href="/icons">
              <IconBrandIntentui />
              <Menu.Label>Icons</Menu.Label>
            </Menu.Item>
            <Menu.Item href="/blog">
              <IconNotepad />
              <Menu.Label>Blog</Menu.Label>
            </Menu.Item>
          </Menu.Section>
          <Menu.Section title="Refs">
            <Menu.Item href={siteConfig.discord} target="_blank">
              <IconBrandDiscord /> <Menu.Label>Discord</Menu.Label>
            </Menu.Item>
            <Menu.Item href="https://x.com/intent/follow?screen_name=irsyadadl" target="_blank">
              <IconBrandX /> <Menu.Label>X / Twitter</Menu.Label>
            </Menu.Item>
            <Menu.Item href="https://github.com/intentuilabs" target="_blank">
              <IconBrandGithub />
              <Menu.Label>Github</Menu.Label>
            </Menu.Item>
            <Menu.Item
              href="https://react-spectrum.adobe.com/react-aria/components.html"
              target="_blank"
            >
              <IconBrandAdobe />
              <Menu.Label>RAC</Menu.Label>
            </Menu.Item>
            <Menu.Item href="https://tailwindcss.com" target="_blank">
              <IconBrandTailwindcss />
              <Menu.Label>Tailwind CSS</Menu.Label>
            </Menu.Item>
          </Menu.Section>
        </Menu.Content>
      </Menu>
      <Menu>
        <Button intent="plain" className="group justify-between text-left sm:hidden">
          {pathname.includes("/docs/") ? pathname.split("/")[2] : siteConfig.currentVersion}
          <IconChevronLgDown className="size-3 duration-200 group-pressed:rotate-180" />
        </Button>
        <Menu.Content placement="bottom right" className="sm:min-w-10">
          <Menu.Item href="/docs/1.x/getting-started/introduction">1.x</Menu.Item>
          <Menu.Item href="/docs/2.x/getting-started/introduction">2.x</Menu.Item>
        </Menu.Content>
      </Menu>
    </div>
  )
}

const premium = [
  {
    id: 1,
    label: "Premium Blocks",
    href: "https://blocks.intentui.com",
    icon: <IconBrandIntentui />,
    description: "Pre-designed, ready-to-use React components for seamless integration.",
  },
  {
    id: 4,
    label: "Templates",
    href: "https://blocks.intentui.com/templates",
    icon: <IconBrandIntentui />,
    description: "Pre-designed, ready-to-use React components for seamless integration.",
  },
  {
    id: 2,
    label: "Premium Starter Kit",
    href: "#",
    icon: <IconWindowVisitFill />,
    description:
      "Get started quickly with a complete React project setup, including authentication.",
    badge: "Coming soon",
  },
  {
    id: 3,
    label: "Figma",
    href: "#",
    icon: <IconBrandFigma />,
    description: "Enhance your Figma designs with Intent components.",
    badge: "Coming soon",
  },
]
