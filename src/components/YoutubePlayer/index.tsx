// Module imports
import ReactPlayer from 'react-player';


// Component props declaration
interface YoutubePlayerProps {
  videoKey: string;
}

// Component declaration
const YoutubePlayer: React.FC<YoutubePlayerProps> = ({ videoKey }) => (
  <ReactPlayer
    className="video-player"
    url={`https://www.youtube.com/watch?v=${videoKey}`}
    controls={true}
    playing={true}
    data-testid="youtube-player"
  />
);

export default YoutubePlayer;