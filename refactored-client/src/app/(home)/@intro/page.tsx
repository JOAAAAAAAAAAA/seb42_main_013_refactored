// import Image from 'next/image'
// import styles from './page.module.css'
// import blueButtonStyles from '../components/Buttons.module.css'
// import Link from 'next/link'
// import { auth } from '@/firebase/firebaseApp'

import Loading from "../../loading";


export default function Intro() {
  // await document.documentElement.style.setProperty('--vh', `${window.innerHeight/100}px`);

  
  return (
    <>
    인트로입니다.
    </>
    // <main className={styles.container}>
    //   <div className={styles.logo}>
    //     {/* Image height auto 설정법 */}
    //     <Image src="/images/logo1.png" alt="logo" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
    //     <div className={styles.content}>당신을 위한 영양제 맞춤 서비스</div>
    //   </div>
    //   <div className={styles.joinOrLogin}>
    //     <Link href="/signup" className={blueButtonStyles.blueButton}>
    //     시작하기
    //     </Link>
    //     <div className={styles.loginWrap}>
    //       <div>계정이 있으신가요?</div>
    //       <Link href="/login" className={styles.loginButton}>로그인하기</Link>
    //     </div>
    //   </div>
    // </main>
  )
}
