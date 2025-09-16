import { ChevronLeft } from "@untitled-ui/icons-react";
import * as React from "react";

import { CheckDoneIcon } from "@/assets/icons/CheckDone";
import { ClipboardIcon } from "@/assets/icons/Clipboard";
import { HomeIcon } from "@/assets/icons/Home";
import { StandIcon } from "@/assets/icons/Stand";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/Sidebar";
import { NavMain } from "@/components/Sidebar/NavMain";

import { cn } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar";
import { Badge } from "../Badge";
import { Button } from "../Button";

const data = {
  navMain: [
    {
      title: "Asosiy sahifa",
      url: "/dashboard",
      icon: HomeIcon,
      isActive: true,
    },
    {
      title: "Ish rejam",
      url: "#",
      icon: StandIcon,
    },
    {
      title: "Hisobotlarim",
      url: "#",
      icon: ClipboardIcon,
    },
    {
      title: "Topshiriqlarim",
      url: "#",
      icon: CheckDoneIcon,
    },
    {
      title: "Foydalanuvchilar",
      url: "/users",
      icon: CheckDoneIcon,
      adminOnly: true,
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { setOpen, open } = useSidebar();
  return (
    <Sidebar
      className="top-[calc(var(--header-height)_+_16px)] !h-[calc(100svh-var(--header-height))]"
      {...props}
      collapsible="icon"
    >
      <Button
        variant="outline"
        onClick={() => setOpen(!open)}
        className="absolute -right-3 top-0 flex h-6 w-6 items-center justify-center rounded-[32px] bg-white p-1"
      >
        <ChevronLeft
          className={cn(
            "h-5 w-5 text-gray-800 transition-transform duration-200",
            {
              "rotate-180": !open,
            },
          )}
        />
      </Button>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="m-0 p-0 hover:bg-white hover:text-gray-900"
            >
              <div className="flex flex-row space-x-3">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Badge className="absolute left-[18px] top-[34px] h-[10px] w-[10px] rounded-full border-[1.5px] border-white bg-success-500 p-0" />

                <div className="grid flex-1 text-left text-sm">
                  <span className="truncate font-semibold text-text-primary">
                    Azimov Samandar
                  </span>
                  <span className="truncate text-xs font-normal text-text-tertiary">
                    Soy bo‘yi MFY
                  </span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
