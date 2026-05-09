import { Link, NavLink } from 'react-router-dom'
import { Menu, Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useThemeStore } from '@/lib/stores/theme-store'
import type { ThemeMode } from '@/types/theme'
import { cn } from '@/lib/utils'

const navLinkBase =
  'text-sm text-muted-foreground hover:text-foreground transition-colors'
const navLinkActive = 'text-foreground'

export function Navbar() {
  const mode = useThemeStore((s) => s.mode)
  const setMode = useThemeStore((s) => s.setMode)

  const set = (m: ThemeMode) => () => setMode(m)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
                <span className="sr-only">Open navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 sm:w-96">
              <div className="mb-6 flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-semibold text-white shadow-subtle">
                  AI
                </div>
                <div>
                  <SheetTitle className="text-sm font-semibold tracking-tight">
                    Spend Audit
                  </SheetTitle>
                  <div className="text-xs text-muted-foreground">
                    Navigation
                  </div>
                </div>
              </div>
              <nav className="grid gap-1">
                <SheetClose asChild>
                  <Link
                    to="/audit"
                    className="rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    Audit
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/results"
                    className="rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    Dashboard
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/#faq"
                    className="rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    FAQ
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>

          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-semibold text-white shadow-subtle">
              AI
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">
                Spend Audit
              </div>
              <div className="text-xs text-muted-foreground">
                Cut AI SaaS costs
              </div>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink
            to="/audit"
            className={({ isActive }) =>
              cn(navLinkBase, isActive && navLinkActive)
            }
          >
            Audit
          </NavLink>
          <NavLink
            to="/results"
            className={({ isActive }) =>
              cn(navLinkBase, isActive && navLinkActive)
            }
          >
            Dashboard
          </NavLink>
          <Link className={navLinkBase} to="/#faq">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Theme">
                {mode === 'dark' ? <Moon /> : <Sun />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel>Theme</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={set('light')}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={set('dark')}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={set('system')}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button asChild className="hidden sm:inline-flex">
            <Link to="/audit">Start audit</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
