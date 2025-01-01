'use client'
import Profile from "@/app/profile/Profile";
import {useEffect, useState} from "react";
import AuthorizeForm from "@/app/components/AuthorizeForm";

export default function Home() {
    const [isAuthorize, setIsAuthorize] = useState(false)
    const [userId, setUserId] = useState(null)
    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    const checkId = () => {
        const id = Number(getCookie('instr'))
        console.log(id)
        if (id === 1) {setIsAuthorize(true)}
    }
    console.log(isAuthorize)
    useEffect(() => {
        checkId()
    }, [userId]);
  return (
      <div className={'h-100 d-flex flex-column gap-2 '}>
          {!isAuthorize ?
              <AuthorizeForm setUserId={setUserId}/> :
        <Profile/>}
      </div>

  );
}

