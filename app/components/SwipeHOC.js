import React, {useEffect, useState} from 'react';
import SwipeContext from "@/app/context/SwipeContext";


export default function SwipeHOC({children, refLink, refLeftMenu, refRightMenu, refContainer}) {
    const [openRight, setOpenRight] = useState(false)

    let defWidth = window.innerWidth
    let fiveHalf = defWidth * 0.15
    let WIDTH_MENU = 50


    function checkTouchStart() {
        let touchStartX = 0
        let touchMove = 0
        refLink.current.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].pageX
        })
        refLink.current.addEventListener('touchmove', (e) => {
            let width = WIDTH_MENU * refRightMenu.current.childElementCount
            let rightMenuWidth = Number(refRightMenu.current.style.width.slice(0, -2))
            if (touchStartX > defWidth - fiveHalf && openRight === false) {
                touchMove = e.changedTouches[0].pageX
                let diff = touchStartX - touchMove
                refLink.current.style.right = diff + 'px'
                refRightMenu.current.style.width = diff + 'px'
                refRightMenu.current.style.right = diff * 2 + 'px'
                refContainer.current.style.width = defWidth + diff * 2 + 'px'
            } else if (openRight !== false && rightMenuWidth !== 0 && touchStartX < defWidth - rightMenuWidth) {
                touchMove = e.changedTouches[0].pageX
                let diff = touchStartX - touchMove
                refContainer.current.style.width = defWidth - diff + rightMenuWidth + 'px'
                refLink.current.style.right = rightMenuWidth + diff + 'px'
                refRightMenu.current.style.right = rightMenuWidth + diff + 'px'
                // console.log(diff)
                if (diff < -50) {
                    refLink.current.style.right = 0 + 'px'
                }
                if (diff > 0) {
                    refContainer.current.style.width = defWidth + rightMenuWidth + 'px'
                    refLink.current.style.right = rightMenuWidth + 'px'
                    refRightMenu.current.style.right = width + 'px'
                }

                refRightMenu.current.style.width = '0 px'
                setOpenRight(false)
            }
        })
        refLink.current.addEventListener('touchend', (e) => {
            let rightMenuWidth = Number(refRightMenu.current.style.width.slice(0, -2))
            // let leftMenuWidth = Number(refLeftMenu.current.style.width.slice(0, -2))
            if (rightMenuWidth === 0) {
                setOpenRight(false)
            } else if (50 > rightMenuWidth > 0) {
                refRightMenu.current.style.width = 0
                refLink.current.style.right = 0
                setOpenRight(false)
            }
            if (rightMenuWidth > 50 && touchStartX < defWidth - rightMenuWidth) {
                refContainer.current.style.width = defWidth + 'px'
                refLink.current.style.right = 0 + 'px'
                refRightMenu.current.style.right = 0 + 'px'
                refRightMenu.current.style.width = 0 + 'px'
                setOpenRight(false)
            } else if (rightMenuWidth > 50) {
                let width = WIDTH_MENU * refRightMenu.current.childElementCount
                // console.log(width)
                refContainer.current.style.width = defWidth +  width  +'px'
                refLink.current.style.right = width + 'px'
                refRightMenu.current.style.width = width + 'px'
                refRightMenu.current.style.right = width + 'px'
                setOpenRight(true)
            }
        })
    }


    useEffect(() => {
        checkTouchStart(openRight)
    }, [openRight]);


    return (
        <SwipeContext.Provider value={0}>
            {children}
        </SwipeContext.Provider>
    );
};