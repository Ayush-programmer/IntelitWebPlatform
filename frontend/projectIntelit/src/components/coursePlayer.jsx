import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const Button = videojs.getComponent("Button");
class SkipBackwardButton extends Button {
    constructor(player, options) {
        super(player, options);
        this.controlText("Rewind 10 seconds");
    }

    handleClick() {
        const player = this.player();

        player.currentTime(
            Math.max(0, player.currentTime() - 10)
        );
    }

    buildCSSClass() {
        return "vjs-skip-backward";
    }
}

class SkipForwardButton extends Button {
    constructor(player, options) {
        super(player, options);
        this.controlText("Forward 10 seconds");
    }

    handleClick() {
        const player = this.player();

        player.currentTime(
            Math.min(
                player.duration(),
                player.currentTime() + 10
            )
        );
    }

    buildCSSClass() {
        return "vjs-skip-forward";
    }
}

videojs.registerComponent(
    "SkipBackwardButton",
    SkipBackwardButton
);

videojs.registerComponent(
    "SkipForwardButton",
    SkipForwardButton
);

const CoursePlayer = forwardRef(({
    videoUrl,
    initialWatchedSeconds = 0,
    onProgress,
    onPlay,
    onPause,
    onEnded
}, ref) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);
    const isReplayRef = useRef(false);

    useImperativeHandle(ref, () => ({
        replay: () => {
            const player = playerRef.current;

            if (!player) return;

            isReplayRef.current = true;
            // furthestWatchedRef.current = 0;
            player.currentTime(0);
            // player.play();
            // Important: establish a new playback baseline
            // so timeupdate doesn't treat the replay as a seek.
            player.one("seeked", () => {
                player.play();
            });
        }
    }), []);

    /*
     * Keep latest onProgress callback
     * without recreating Video.js.
     */

    const onProgressRef = useRef(onProgress);
    const onPlayRef = useRef(onPlay);
    const onPauseRef = useRef(onPause);
    const onEndedRef = useRef(onEnded);

    useEffect(() => {
        onProgressRef.current = onProgress;
        onPlayRef.current = onPlay;
        onPauseRef.current = onPause;
        onEndedRef.current = onEnded;
    }, [onProgress, onPlay, onPause, onEnded]);

    /*
     * Furthest watched position.
     *
     * This survives React renders.
     */
    const furthestWatchedRef = useRef(0);

    /*
     * =====================================================
     * CREATE VIDEO.JS PLAYER
     *
     * IMPORTANT:
     * This must NOT depend on onProgress.
     * =====================================================
     */
    useEffect(() => {
        if (!containerRef.current) return;

        const videoElement =
            document.createElement("video-js");

        videoElement.classList.add(
            "vjs-big-play-centered"
        );

        containerRef.current.appendChild(
            videoElement
        );

        const player = videojs(videoElement, {
            controls: true,
            responsive: true,
            fluid: false,
            preload: "auto",

            playbackRates: [
                0.5,
                1,
                1.25,
                1.5,
                2,
                2.5
            ],

            controlBar: {
                children: [
                    "playToggle",
                    "SkipBackwardButton",
                    "SkipForwardButton",
                    "progressControl",
                    "currentTimeDisplay",
                    "timeDivider",
                    "durationDisplay",
                    "volumePanel",
                    "playbackRateMenuButton",
                    "fullscreenToggle"
                ]
            }
        });

        playerRef.current = player;

        let lastTime = null;

        /*TIME UPDATE*/
        const handleTimeUpdate = () => {
            if (player.paused()) return;

            const currentTime =
                player.currentTime();

            if (currentTime == null) return;

            if (lastTime !== null) {
                const difference =
                    currentTime - lastTime;

                /*
                 * Normal playback only.
                 *
                 * 10 -> 11    ✅
                 * 10 -> 100   ❌ seek
                 * 10 -> 5     ❌ backward
                 */
                if (
                    difference > 0 &&
                    difference < 3
                ) {
                    furthestWatchedRef.current =
                        Math.max(
                            furthestWatchedRef.current,
                            currentTime
                        );

                    const duration =
                        player.duration() || 0;

                    onProgressRef.current?.({
                        watchedSeconds:
                            Math.floor(
                                furthestWatchedRef.current
                            ),

                        currentTime,

                        duration
                    });
                }
            }

            lastTime = currentTime;
        };

        // SEEKING
        const handleSeeking = () => {
            lastTime = null;
        };

        // Seeked
        const handleSeeked = () => {
            lastTime = player.currentTime();
        };

        const handlePlay = () => {
            onPlayRef.current?.();
        };

        const handlePause = () => {
            if (player.ended()) return;
            onPauseRef.current?.();
        };

        /*ENDED*/
        const handleEnded = () => {
            console.log("Video Ended Event");
            
            const duration =
                player.duration() || 0;

            if (!duration) return;

            furthestWatchedRef.current =
                duration;

            onProgressRef.current?.({
                watchedSeconds:
                    Math.floor(duration),

                currentTime: duration,

                duration
            });
            onEndedRef.current?.();
        };

        player.on(
            "timeupdate",
            handleTimeUpdate
        );

        player.on(
            "seeking",
            handleSeeking
        );

        player.on(
            "seeked",
            handleSeeked
        );

        player.on("play", handlePlay);
        player.on("pause", handlePause);

        player.on(
            "ended",
            handleEnded
        );

        /*CLEANUP*/
        return () => {
            player.off(
                "timeupdate",
                handleTimeUpdate
            );

            player.off(
                "seeking",
                handleSeeking
            );

            player.off(
                "seeked",
                handleSeeked
            );

            player.off("play", handlePlay);
            player.off("pause", handlePause);

            player.off(
                "ended",
                handleEnded
            );

            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, []);


    /*
     * VIDEO SOURCE + RESUME POSITION
     This effect changes when lesson/video/progress changes.
     It does NOT recreate Video.js.
     */
    useEffect(() => {
        const player = playerRef.current;

        if (!player || !videoUrl) return;

        const backendWatched =
            Number(initialWatchedSeconds) || 0;

        /*
         * Initialize furthest watched position
         * from backend.
         */
        furthestWatchedRef.current =
            backendWatched;

        console.log(
            "SETTING VIDEO:",
            videoUrl,
            "BACKEND WATCHED:",
            backendWatched
        );

        player.src({
            src: videoUrl,
            type: "video/mp4"
        });

        const handleLoadedMetadata = () => {
            const duration =
                player.duration() || 0;

            if (!duration) return;

            const resumeTime =
                Math.min(
                    backendWatched,
                    duration
                );

            //  * Resume incomplete lesson.
            if (
                resumeTime > 0 &&
                resumeTime < duration
            ) {
                player.currentTime(
                    resumeTime
                );
            }
        };

        player.one(
            "loadedmetadata",
            handleLoadedMetadata
        );

        return () => {
            player.off(
                "loadedmetadata",
                handleLoadedMetadata
            );
        };
    }, [
        videoUrl
    ]);


    return (
        <div
            ref={containerRef}
            className="course-player"
        />
    );
});

export default CoursePlayer;