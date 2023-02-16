import { Inter } from '@next/font/google'
import styles from 'styles/Home.module.css'
import AppHeader from 'components/AppHeader/AppHeader'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <AppHeader
        title="Home page"
      />
      <div className={styles.container}>
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
      </div>
    </>
  )
}
