import { Calendar, ChevronDown, Home, Inbox, Plus } from "lucide-react"
import { RedditIcon } from "./icons/RedditIcon"
import { XIcon } from "./icons/XIcon"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "./ui/dropdown-menu"
import { getWeek } from "@/lib/utils"
import { DatePicker } from "./ui/datepicker"
import { BlueskyIcon } from "./icons/BlueskyIcon"


// Menu items.
const items = [
    {
        title: "Overview",
        url: "/dashboard/",
        icon: Home,
    },
    {
        title: "Bluesky",
        url: "/dashboard/bluesky",
        icon: BlueskyIcon,
    },
    {
        title: "Reddit",
        url: "/dashboard/reddit",
        icon: RedditIcon,
    },
    {
        title: "My queries",
        url: "/dashboard/queries",
        icon: Calendar,
    },


]


const { startOfWeek, endOfWeek } = getWeek(new Date());

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={150} height={50} />
                </Link>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="border">
                                <SidebarMenuButton>
                                    Week: {startOfWeek} - {endOfWeek}
                                    <ChevronDown className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                                <DatePicker />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Sentinel</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenuButton asChild className="border p-5">
                    <Link href={"/dashboard/new"}>
                        <Plus />
                        <span>New Query</span>
                    </Link>
                </SidebarMenuButton>

            </SidebarFooter>

        </Sidebar >
    )
}
