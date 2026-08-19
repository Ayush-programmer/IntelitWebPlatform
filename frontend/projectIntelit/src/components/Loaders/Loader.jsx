import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const Loader = ({ text = "Preparing Intelit" }) => {

    const loaderRef = useRef(null);

    const sq1 = useRef(null);
    const sq2 = useRef(null);
    const sq3 = useRef(null);

    const caption = useRef(null);

    useLayoutEffect(() => {

        const ctx = gsap.context(() => {

            const tl = gsap.timeline({
                repeat: -1,
                repeatDelay: .45
            });

            // triangle -> line

            tl.to(sq1.current, {
                x: 0,
                y: 34,
                duration: .5,
                ease: "power4.inOut"
            }, 0);

            tl.to(sq2.current, {
                keyframes: [
                    { x: 8, y: -6, rotation: -4, duration: .18 },
                    { x: 18, y: -12, rotation: 0, duration: .32 }
                ],
                ease: "power4.inOut"
            }, .04);

            tl.to(sq3.current, {
                keyframes: [
                    { x: -8, y: -6, rotation: 4, duration: .18 },
                    { x: -18, y: -12, rotation: 0, duration: .32 }
                ],
                ease: "power4.inOut"
            }, .08);

            // magnetic snap

            tl.to(
                [sq1.current, sq2.current, sq3.current],
                {
                    scale: 1.08,
                    duration: .16,
                    stagger: .03,
                    ease: "back.out(2.4)"
                }
            );

            tl.to(
                sq1.current,
                {
                    filter: "brightness(1.3)",
                    boxShadow: "0 12px 28px rgba(120,92,244,.35)",
                    duration: .12
                },
                "<"
            );

            tl.to(
                [sq2.current, sq3.current],
                {
                    filter: "brightness(1.08)",
                    duration: .12
                },
                "<"
            );

            tl.to({}, { duration: .18 });

            tl.to(
                [sq1.current, sq2.current, sq3.current],
                {
                    scale: 1,
                    filter: "brightness(1)",
                    boxShadow: "0 8px 20px rgba(120,92,244,.18)",
                    duration: .18
                }
            );

            // back

            tl.to(sq1.current, {
                x: 0,
                y: 0,
                duration: .5,
                ease: "power4.inOut"
            });

            tl.to(sq2.current, {
                x: 0,
                y: 0,
                duration: .5,
                ease: "power4.inOut"
            }, "<");

            tl.to(sq3.current, {
                x: 0,
                y: 0,
                duration: .5,
                ease: "power4.inOut"
            }, "<");

            // loading text

            gsap.timeline({
                repeat: -1
            })

                .to(caption.current, {
                    textContent: "Preparing Intelit.",
                    duration: .4
                })

                .to(caption.current, {
                    textContent: "Preparing Intelit..",
                    duration: .4
                })

                .to(caption.current, {
                    textContent: "Preparing Intelit...",
                    duration: .4
                })

                .to(caption.current, {
                    textContent: "Preparing Intelit",
                    duration: .4
                });

        }, loaderRef);

        return () => ctx.revert();

    }, []);

    return (
        <div className="loader-screen">

            <div
                ref={loaderRef}
                className="intelit-loader"
            >

                <div
                    ref={sq1}
                    className="loader-square sq1"
                />

                <div
                    ref={sq2}
                    className="loader-square sq2"
                />

                <div
                    ref={sq3}
                    className="loader-square sq3"
                />

            </div>

            <p ref={caption}>{text}</p>

        </div>
    );

};

export default Loader;