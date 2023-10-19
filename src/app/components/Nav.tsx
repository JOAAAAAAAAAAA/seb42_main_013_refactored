"use client"
import BottomNavigation  from "@mui/material/BottomNavigation";
import BottomNavigationAction  from "@mui/material/BottomNavigationAction";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPills } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { SyntheticEvent, useState } from "react";
import { cookies } from "next/headers";
import { usePathname } from "next/navigation";


function Navigation() {
  const pathname = usePathname()


  return (
    <BottomNavigation
    showLabels
    value={pathname}
    sx={{height:64}}
    className="fixed bottom-0 w-full max-w-[428px]"
  >
    <BottomNavigationAction
      LinkComponent={Link}
      href={"/"}
      label={"홈"}
      value={"/"}
      icon={<FontAwesomeIcon icon={faHouse}/>}
    />
    <BottomNavigationAction
      LinkComponent={Link}
      href={"/summary"}
      label={"알약관리"}
      value={"/summary"}
      icon={<FontAwesomeIcon icon={faPills}/>}
    />
    <BottomNavigationAction
      LinkComponent={Link}
      href={"/mypage"}
      label={"마이페이지"}
      value={"/mypage"}
      icon={<FontAwesomeIcon icon={faUser}/>}
    />
  </BottomNavigation>
  )


}

export default Navigation;