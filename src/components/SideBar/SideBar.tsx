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
    <div className="w-fit h-layout bg-slate-400 dark:bg-gray-800">
      <Sidebar aria-label="Sidebar with multi-level dropdown example">
        <Sidebar.Items>
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
        </Sidebar.Items>
      </Sidebar>
    </div>
  )
}

export default SideBar