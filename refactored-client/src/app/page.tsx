import Image from 'next/image'
import styles from './page.module.css'

export default async function Home() {
  await document.documentElement.style.setProperty('--vh', `${window.innerHeight/100}px`);

  return (
    <main className={styles.main}>

    </main>
  )
}
