import Image from "next/image"
import styles from "./WebAside.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const WebAside = () => {
  return(
    <div className={styles.container}>
      <div className={styles.logo}>
      <Image src="/logo1.png" alt="logo" layout="fill" objectFit="cover"/>
      </div>
    <div className={styles.background}>
      <div className="content">
        <p>나만의 <strong>영양제 달력</strong></p>
        <p>새로운 영양제 <strong>추천</strong> 및 <strong>검색</strong></p>
        <p>먹고 있는 <strong>영양제</strong>와 <strong>약 관리</strong>까지,</p>
        <p className="description-main">모두 <strong>I Pill U</strong>에서</p>
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
        <div className="team-position">FE</div>
        <div className="team-member">
          <a href="https://github.com/yjyaang">양예진(팀장)</a>
          <a href="https://github.com/JOAAAAAAAAAAA">김민지</a>
          <a href="https://github.com/10xc">김태은</a>
        </div>
      </div>
      <div className={styles.teamMate}>
        <div className="team-position">BE</div>
        <div className="team-member">
          <a href="https://github.com/JONGHYUNVAN">반종현(부팀장)</a>
          <a href="https://github.com/SEB-BE-42-mkcho">조민기</a>
        </div>
      </div>
    </div>
  </div>
  )
}

export default WebAside