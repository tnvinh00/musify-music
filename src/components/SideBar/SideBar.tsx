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
      },
      {
        label: 'Theo dõi',
        icon: BsMusicPlayer,
        href: '#'
      },
      {
        label: 'Khám phá',
        icon: AiOutlineBarChart,
        href: '#'
      },
      {
        label: '#musifychart',
        icon: HiChartPie,
        href: '#'
      },
    ],
    [
      {
        label: 'Nhạc mới',
        icon: GiMusicalNotes,
        href: '#'
      },
      {
        label: 'Top 100',
        icon: SiMusicbrainz,
      },
      {
        label: "Thể loại",
        icon: BiCategoryAlt
      },
      {
        label: "Chủ đề",
        icon: FaFeather,
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
                <Sidebar.Item
                  href="#"
                  key={index}
                  icon={item.icon}
                  title={item.label}
                >
                  {item.label}
                </Sidebar.Item>
              ))}
            </Sidebar.ItemGroup>
          ))}
          <div id="dropdown-cta" className="p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-900" role="alert">
            <div className="flex items-center mb-3">
              <span className="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">Beta</span>
            </div>
            <p className="mb-3 text-sm text-blue-800 dark:text-blue-400">
              Nghe nhạc không quảng cáo cùng kho nhạc VIP
            </p>
            <a className="text-sm font-bold text-blue-800 underline hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300" href="#">
              Nâng cấp VIP ngay
            </a>
          </div>
        </Sidebar.Items>
      </Sidebar>
    </div>
  )
}

export default SideBar