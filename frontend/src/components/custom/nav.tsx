"use client"

import { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface NavProps {
    onLinkClick: (url: string) => void
    links: {
        url: string
        title: string
        label?: string
        icon: LucideIcon
        variant: "default" | "ghost"
        location: "start" | "end"
    }[]
}

export function Nav({ onLinkClick, links }: NavProps) {
    const startLinks = links.filter(link => link.location === 'start');
    const endLinks = links.filter(link => link.location === 'end');
    console.log("startLinks", startLinks)
    console.log("endLinks", endLinks)
    return (
        <div
            className="flex flex-col py-2 justify-between"
            style={{ height: 'calc(100vh - 53px)' }}
        >
            <nav className="grid gap-1 px-2">
                {startLinks.map((link, index) =>
                    <a
                        key={link.url}
                        // href={link.url}
                        onClick={() => onLinkClick(link.url)}
                        className={cn(
                            buttonVariants({ variant: link.variant, size: "sm" }),
                            link.variant === "default" &&
                            "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                            "justify-start"
                        )}
                    >
                        <link.icon className="mr-2 h-4 w-4" />
                        {link.title}
                        {link.label && (
                            <span
                                className={cn(
                                    "ml-auto",
                                    link.variant === "default" &&
                                    "text-background dark:text-white"
                                )}
                            >
                                {link.label}
                            </span>
                        )}
                    </a>
                )}
            </nav>
            <nav className="grid gap-1 px-2">
                {endLinks.map((link, index) =>
                    <a
                        key={link.url}
                        onClick={() => onLinkClick(link.url)}
                        className={cn(
                            buttonVariants({ variant: link.variant, size: "sm" }),
                            link.variant === "default" &&
                            "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                            "justify-start"
                        )}
                    >
                        <link.icon className="mr-2 h-4 w-4" />
                        {link.title}
                        {link.label && (
                            <span
                                className={cn(
                                    "ml-auto",
                                    link.variant === "default" &&
                                    "text-background dark:text-white"
                                )}
                            >
                                {link.label}
                            </span>
                        )}
                    </a>
                )}
            </nav>
        </div>
    )
}
