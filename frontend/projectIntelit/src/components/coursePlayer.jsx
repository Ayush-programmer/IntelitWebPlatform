import Plyr from "plyr-react";
import "plyr-react/plyr.css";

const CoursePlayer = ({ videoUrl }) => {
    const plyrOptions = {
        controls: [
            "play-large",
            "rewind",
            "play",
            "fast-forward",
            "progress",
            "current-time",
            "duration",
            "mute",
            "volume",
            "settings",
            "fullscreen"
        ],

        seekTime: 5,

        settings: [
            "speed"
        ],

        speed: {
            selected: 1,
            options: [0.5, 1, 1.25, 1.5, 2]
        }
    };

    return (
        <div className="course-player">
            <Plyr
                source={{
                    type: "video",
                    sources: [
                        {
                            src: videoUrl,
                            type: "video/mp4"
                        }
                    ]
                }}
                options={plyrOptions}
            />
        </div>
    );
};

export default CoursePlayer;