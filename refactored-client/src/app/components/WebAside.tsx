import Image from "next/image"
import styles from "./WebAside.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import Link from "next/link"


function WebAside() {
  // const { login } = useSelector(state => state.loginInfoReducer);

  // const logiClickHandler = () => {
  //   if(login) {
  //     window.location.href = "/suggest"
  //   } else {
  //     window.location.href = "/"
  //   }
  // }

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href="/">
        <Image src="/images/logo1.png" alt="logo" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
        </Link>
      </div>
    <div className={styles.IntroAsideCard}>
      <div className={styles.content}>
        <p>나만의 <strong>영양제 달력</strong></p>
        <p>새로운 영양제 <strong>추천</strong> 및 <strong>검색</strong></p>
        <p>먹고 있는 <strong>영양제</strong>와 <strong>약 관리</strong>까지,</p>
        <p className={styles.descriptionMain}>모두 <strong>I Pill U</strong>에서</p>
      </div>
    </div>
    <div className={styles.team}>
      <div className={styles.teamMate}>
        <div className="team-title">🍙양반김에 양조간장🥢</div>
        <a href="https://github.com/codestates-seb/seb42_main_013" className="team-github">
          <FontAwesomeIcon icon={faGithub} className="icon-github" />
          Team Github
        </a>
      </div>
      <div className={styles.teamMate}>
        <div className={styles.teamPosition}>FE</div>
        <div className={styles.teamMember}>
          <a href="https://github.com/yjyaang">양예진(팀장)</a>
          <a href="https://github.com/JOAAAAAAAAAAA">김민지</a>
          <a href="https://github.com/10xc">김태은</a>
        </div>
      </div>
      <div className={styles.teamMate}>
        <div className={styles.teamPosition}>BE</div>
        <div className={styles.teamMember}>
          <a href="https://github.com/JONGHYUNVAN">반종현(부팀장)</a>
          <a href="https://github.com/SEB-BE-42-mkcho">조민기</a>
        </div>
      </div>
    </div>
  </div>
  )
}

export default WebAside;