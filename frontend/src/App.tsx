import React, { Suspense } from 'react'
import {
  useRoutes,
  useLocation,
} from 'react-router-dom'
import routes from '~react-pages'

import { useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils"
import TeamSwitcher from "@/components/custom/account-switcher"
import { Separator } from "@/components/ui/separator"
import { Nav } from "@/components/custom/nav"
import {
  File,
  Inbox,
  Settings,
} from "lucide-react"
import { LucideIcon } from "lucide-react"
import { useUserStore } from '@/store/store.user'
import { ReloadIcon } from "@radix-ui/react-icons"


interface Links {
  url: string
  title: string
  label?: string
  icon: LucideIcon
  variant: "default" | "ghost"
  location: "start" | "end"
}

const App: React.FC = () => {
  const location = useLocation()
  const islayout = location.pathname.startsWith('/layout')

  const navigate = useNavigate(); // 使用 useNavigate 钩子
  const userStore = useUserStore()
  const initialLinks: Links[] = [
    {
      url: "/layout",
      title: "收件箱",
      label: "",
      icon: Inbox,
      variant: "default",
      location: "start"
    },
    {
      url: "/layout/about",
      title: "写信",
      label: "",
      icon: File,
      variant: "ghost",
      location: "start"
    },
    {
      url: "/layout/settings/global",
      title: "全局设置",
      label: "",
      icon: Settings,
      variant: "ghost",
      location: "end"
    }
  ]
  const [links, setLinks] = React.useState<Links[]>(initialLinks)

  const handleLinkClick = (url: string) => {
    const updatedLinks: Links[] = links.map((link, i) => {
      if (link.url !== url) {
        return { ...link, variant: 'ghost' }; // 更新其他链接的 variant
      } else {
        return { ...link, variant: 'default' }; // 更新被点击链接的 variant
      }
    });
    setLinks(updatedLinks); // 更新状态
    // 跳转到对应页面
    links.map((link, i) => {
      if (link.url == url) {
        console.log("123123", link.url, url)
        navigate(url)
      }
    })
  };


  const routepage = (
    <div>
      <Suspense fallback={
        <div>加载中...</div>
      }>
        {useRoutes(routes)}
      </Suspense>
    </div>
  )

  const layoutpage = (
    <div className='flex'>
      <div className='w-[220px] border-r h-[100vh]'>
        <div
          className={cn(
            "flex h-[52px] items-center justify-center",
            false ? "h-[52px]" : "px-2"
          )}
        >
          <TeamSwitcher />
        </div>
        <Separator />
        <Nav
          links={links}
          onLinkClick={handleLinkClick}
        />
      </div>
      <div className='w-full'>
        {userStore.currUser.username === "请选择账号" && userStore.currUser.token === null && location.pathname !== "/settings/global" ?
          <div className='flex justify-center items-center h-screen'>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          </div>
          :
          <Suspense fallback={
            <div className='flex justify-center items-center h-screen'>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            </div>
          }>
            {useRoutes(routes)}
          </Suspense>
        }
      </div>
    </div>
  )

  return (
    <>
      {
        islayout ? layoutpage : routepage
      }

    </>
  )
};

export default App;