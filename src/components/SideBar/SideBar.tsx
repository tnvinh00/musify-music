import { Sidebar } from 'flowbite-react'
import React from 'react'
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from 'react-icons/hi'
import { RiFolderMusicLine } from 'react-icons/ri'
import { AiOutlineBarChart, AiOutlineVideoCamera } from 'react-icons/ai'
import { BsMusicNoteList, BsMusicPlayer } from 'react-icons/bs'
import { IoMdRadio } from 'react-icons/io'
import { GiMusicalNotes } from 'react-icons/gi'
import { SiMusicbrainz } from 'react-icons/si'
import { BiCategoryAlt } from 'react-icons/bi'
import { FaFeather } from 'react-icons/fa'
import Link from 'next/link'

export type ISideBarMenu = {
  label?: string;
  icon?: React.FC;
  href?: string;
}

const SideBar = () => {
  const menuItems: ISideBarMenu[][] = [
    [
      {
        label: 'Cá nhân',
        icon: RiFolderMusicLine,
        href: '#'
      },
      {
        label: 'Bộ sưu tập',
        icon: BsMusicNoteList,
        href: '#'
      },
      // {
      //   label: 'Theo dõi',
      //   icon: BsMusicPlayer,
      //   href: '#'
      // },
      // {
      //   label: 'Khám phá',
      //   icon: HiChartPie,
      //   href: '#'
      // },
      {
        label: '#musifychart',
        icon: AiOutlineBarChart,
        href: '/musify-chart'
      },
    ],
    [
      {
        label: 'Nhạc mới',
        icon: GiMusicalNotes,
        href: '/nhac-moi'
      },
      {
        label: 'Top 100',
        icon: SiMusicbrainz,
        href: '/top-100'
      },
      {
        label: "Thể loại",
        icon: BiCategoryAlt,
        href: '/the-loai'
      },
      {
        label: "Chủ đề",
        icon: FaFeather,
        href: '#'
      }
    ]
  ]
  return (
    <div className="w-fit hidden sidebar md:block h-layout bg-slate-400 dark:bg-gray-800">
      <Sidebar aria-label="Sidebar with multi-level dropdown example">
        <Sidebar.Items className='overflow-y-overlay'>
          {menuItems.map((itemGroup, index) => (
            <Sidebar.ItemGroup key={index}>
              {itemGroup.map((item, index) => (
                <Link key={index} href={item.href || ''}>
                  <Sidebar.Item
                    icon={item.icon}
                    title={item.label}
                  >
                    {item.label}
                  </Sidebar.Item>
                </Link>
              ))}
            </Sidebar.ItemGroup>
          ))}
          <div id="dropdown-cta" className="p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-900" role="alert">
            <div className="flex items-center mb-3">
              <span className="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">Beta</span>
            </div>
            <p className="mb-3 text-sm text-blue-800 dark:text-blue-400">
              Nghe nhạc không quảng cáo cùng kho nhạc VIP. Nâng cấp VIP ngay
            </p>
            <a className="text-sm font-bold text-blue-800 underline hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300" href="https://vinhisme.site/" target="_blank" rel="noreferrer">
              @vinhisme
            </a>
          </div>
        </Sidebar.Items>
      </Sidebar>
    </div>
  )
}

export default SideBar