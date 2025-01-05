import React, {useEffect, useState} from 'react';
import SwipeContext from "@/app/context/SwipeContext";


export default function SwipeHOC({children, refLink, refLeftMenu, refRightMenu, refContainer}) {
    const [openRight, setOpenRight] = useState(false)
    const [openLeft, setOpenLeft] = useState(false)
    const [touchDifference, setTouchDifference] = useState(0)

    let defWidth = window.innerWidth
    let fiveHalf = defWidth * 0.15
    let WIDTH_MENU = 50


    function checkTouchStart() {
        if (openLeft === false && openRight === false) {
            let touchStartX = 0
            let touchMove = 0
            refLink.current.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].pageX
                console.log(touchStartX)
            })
            refLink.current.addEventListener('touchmove', (e) => {
                if (touchStartX > defWidth - fiveHalf && !openRight && !openLeft) {

                    touchMove = e.changedTouches[0].pageX
                    let diff = touchStartX - touchMove
                    refLink.current.style.right = diff + 'px'
                    refRightMenu.current.style.width = diff + 'px'
                    refRightMenu.current.style.right = diff * 2 + 'px'
                    refContainer.current.style.width = defWidth + diff * 2 + 'px'
                }

                if (touchStartX < fiveHalf && !openRight && !openLeft) {
                    console.log(openRight)
                    touchMove = e.changedTouches[0].pageX
                    let diff = touchStartX - touchMove
                    // refLink.current.style.right = diff + 'px'
                    refLeftMenu.current.style.width = -diff + 'px'
                    refLeftMenu.current.style.right = diff + 'px'
                    refContainer.current.style.width = defWidth - diff + 'px'
                }
            })
            refLink.current.addEventListener('touchend', (e) => {
                let rightMenuWidth = Number(refRightMenu.current.style.width.slice(0, -2))
                let leftMenuWidth = Number(refLeftMenu.current.style.width.slice(0, -2))
                // console.log(leftMenuWidth)
                if (rightMenuWidth === 0 || leftMenuWidth === 0) {
                    // console.log('меня не двигали')
                }
                if (50 > rightMenuWidth > 0) {
                    refRightMenu.current.style.width = 0
                    refLink.current.style.right = 0
                    setOpenRight(false)
                }
                if (50 > leftMenuWidth > 0) {
                    refLeftMenu.current.style.width = 0
                    refLink.current.style.right = 0
                    setOpenLeft(false)
                }
                if (rightMenuWidth > 50) {
                    let width = WIDTH_MENU * refRightMenu.current.childElementCount
                    refRightMenu.current.style.width = width + 'px'
                    refLink.current.style.right = width + 'px'
                    setOpenRight(true)
                }
                if (leftMenuWidth > 50) {
                    let width = WIDTH_MENU * refLeftMenu.current.childElementCount
                    refLeftMenu.current.style.width = width + 'px'
                    refLink.current.style.right = width + 'px'
                    setOpenLeft(true)
                }
            })
        }
    }

    function checkClose() {
        if (openLeft || openRight) {
            let touchStartX = 0
            let touchMove = 0
            refLink.current.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].pageX
                // console.log(touchStartX)
            })


            // if (openRight) {
            //     console.log(openRight)
            //     let diff = touchMove - touchStartX
            //     if (diff > 100) {
            //         console.log('>100')
            //     }
            // }
        }
    }

    useEffect(() => {
            checkTouchStart()
    }, [openLeft, openRight]);

    useEffect(() => {
        if (openLeft || openRight) {
            checkClose()
            console.log(openRight)
        }
    }, [openRight, openLeft]);
    // useEffect(() => {
    //     let touchStartX = 0
    //     let touchMove = 0
    //     defWidth = ref.current.clientWidth
    //     // console.log(defWidth)
    //     ref.current.addEventListener('touchstart', (e) => {
    //         touchStartX = e.changedTouches[0].pageX
    //         // console.log(touchStartX)
    //     })
    //
    //     ref.current.addEventListener('touchmove', (e) => {
    //         touchMove = e.changedTouches[0].pageX
    //         if (touchStartX - touchMove < 50) {
    //             setTouchDifference(touchStartX - touchMove)
    //             defWidth = defWidth + (touchStartX - touchMove)
    //         }
    //         if (touchStartX - touchMove > 50) {
    //             setTouchDifference(50)
    //             defWidth = defWidth + 50
    //             setOpenRight(true)
    //
    //         }
    //         if (touchStartX - touchMove < -10) {
    //             setTouchDifference(0)
    //         }
    //     })
    //
    // }, []);

    // useEffect(() => {
    //     // console.log(openRight)
    // }, [openRight]);
    // useEffect(() => {
    // }, [touchDifference]);
    return (
        <SwipeContext.Provider value={0}>
            {children}
        </SwipeContext.Provider>
    );
};