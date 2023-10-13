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


function Navigation() {
  const [value, setValue] = useState("home");
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };




  return (
    <BottomNavigation
    showLabels
    value={value}
    onChange={handleChange}
    sx={{height:64}}
    className="fixed bottom-0 w-full max-w-[428px]"
  >
    <BottomNavigationAction
      LinkComponent={Link}
      href={"/"}
      label={"홈"}
      value={"home"}
      icon={<FontAwesomeIcon icon={faHouse}/>}
    />
    <BottomNavigationAction
      LinkComponent={Link}
      href={"/summary"}
      label={"알약관리"}
      value={"summary"}
      icon={<FontAwesomeIcon icon={faPills}/>}
    />
    <BottomNavigationAction
      LinkComponent={Link}
      href={"/mypage"}
      label={"마이페이지"}
      value={"mypage"}
      icon={<FontAwesomeIcon icon={faUser}/>}
    />
  </BottomNavigation>
  )


}

export default Navigation;