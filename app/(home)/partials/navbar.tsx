"use client"

import { CommandPalette } from "@/components/command-palette"
import { PageContainer } from "@/components/page-container"
import { Link } from "@/components/ui/link"
import { Menu } from "@/components/ui/menu"
import { Separator } from "@/components/ui/separator"
import { siteConfig } from "@/resources/config/site"
import {
  IconArrowUpRight,
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandIntentui,
  IconBrandX,
  IconHamburger,
  IconHome,
  IconSearch,
} from "@intentui/icons"
import { useState } from "react"
import { Button } from "react-aria-components"

export function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <CommandPalette setOpen={setOpen} openCmd={open} />
      <PageContainer className="flex items-center justify-between py-4 sm:py-6">
        <div className="flex items-center">
          <Link href="/" className="mr-4 p-2" aria-label="Goto homepage">
            <IconBrandIntentui className="size-5 text-white" />
          </Link>
          <div className="hidden items-center gap-x-1 lg:flex">
            {menus.map((menu) => (
              <NavLink
                key={menu.href}
                href={menu.href}
                target={menu.external ? "_blank" : undefined}
              >
                {menu.label}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-x-0.5 **:data-[slot=icon]:size-5">
          <Button
            onPress={() => setOpen(true)}
            aria-label="Search docs"
            className="p-2 text-blue-200 outline-hidden hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <IconSearch />
          </Button>
          <Link
            className="p-2 text-blue-200 outline-hidden hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500"
            href="https://blocks.intentui.com"
            target="_blank"
          >
            <IconBrandIntentui />
          </Link>
          <Link
            className="p-2 text-blue-200 outline-hidden hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500"
            href={siteConfig.links.twitter}
            target="_blank"
          >
            <IconBrandX />
          </Link>
          <Link
            className="p-2 text-blue-200 outline-hidden hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500"
            href={siteConfig.discord}
            target="_blank"
          >
            <IconBrandDiscord />
          </Link>
          <Link
            target="_blank"
            href={siteConfig.repo}
            className="inset-ring inset-ring-white/10 ml-1 inline-flex items-center gap-x-1 rounded-full bg-linear-to-r from-blue-600 via-blue-700 to-sky-500 px-2 py-1 font-medium text-white text-xs/5 tabular-nums shadow-black/50"
          >
            <IconBrandGithub className="-ml-0.5" />
            1.3K Github
          </Link>

          <div className="flex items-center lg:hidden">
            <Separator orientation="vertical" className="mx-2.5 h-6 bg-white/20" />
            <Menu>
              <Button
                aria-label="Search docs"
                className="-ml-2 p-2 text-blue-200 outline-hidden hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <IconHamburger className="size-5" />
              </Button>
              <Menu.Content placement="bottom" className="min-w-64">
                <Menu.Item href="/">
                  <IconHome />
                  <Menu.Label>Home</Menu.Label>
                </Menu.Item>
                {menus.map((menu) => (
                  <Menu.Item
                    key={menu.href}
                    href={menu.href}
                    target={menu.external ? "_blank" : undefined}
                  >
                    <Menu.Label>{menu.label}</Menu.Label>
                    {menu.external && <IconArrowUpRight />}
                  </Menu.Item>
                ))}
              </Menu.Content>
            </Menu>
          </div>
        </div>
      </PageContainer>
    </>
  )
}

function NavLink({ ...props }: React.ComponentProps<typeof Link>) {
  return (
    <Link
      className="flex items-center gap-x-2 rounded-full px-2.5 py-1 text-blue-100 text-sm tracking-tight outline-hidden transition duration-200 hover:bg-blue-600 hover:text-white hover:shadow-xs focus-visible:ring-2 focus-visible:ring-blue-500"
      {...props}
    />
  )
}

export const menus = [
  { href: "/docs/2.x/getting-started/introduction", label: "Docs" },
  { href: "/components", label: "Components" },
  { href: "/themes", label: "Themes" },
  { href: "/icons", label: "Icons" },
  { href: "/colors", label: "Colors" },
  { href: "/blocks", label: "Blocks" },
  {
    href: "https://blocks.intentui.com",
    label: "Premium blocks",
    external: true,
  },
  { href: "https://blocks.intentui.com/templates", label: "Templates", external: true },
]
