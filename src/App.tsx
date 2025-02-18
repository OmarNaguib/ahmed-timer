import { useState, useEffect, useRef } from "react";
import { Typography, Card, Space, Button } from "antd";
import { SoundOutlined, PauseOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import aloehSound from "./assets/aloeh.mp3";
import "./App.css";

const { Title, Text } = Typography;

function App() {
  const targetDate = dayjs("2025-03-01");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.log("Audio playback failed:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = dayjs();
      const diff = targetDate.diff(now, "second");

      const days = Math.floor(diff / (24 * 60 * 60));
      const hours = Math.floor((diff % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((diff % (60 * 60)) / 60);
      const seconds = diff % 60;

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container">
      <audio
        ref={audioRef}
        src={aloehSound}
        loop
        onEnded={() => setIsPlaying(false)}
      />
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Button
          type="primary"
          icon={isPlaying ? <PauseOutlined /> : <SoundOutlined />}
          onClick={togglePlay}
          className="audio-button"
        >
          {isPlaying ? "Pause Sound" : "Play Sound"}
        </Button>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu7LSn1xCuUkxqQi2ShWIlSIL4b-WlHURbSDXj5jdCJPA9ElYOvZA0lbiYIHDOmZNcKms&usqp=CAU"
          alt="Military Service Meme"
          className="meme-image"
        />
        <Title level={2} className="title">
          Freedom Countdown
        </Title>
        <Card className="timer-card">
          <Space size="large" className="timer-display">
            <div className="time-block">
              <Text className="time-value">{timeLeft.days}</Text>
              <Text className="time-label">Days</Text>
            </div>
            <div className="time-block">
              <Text className="time-value">{timeLeft.hours}</Text>
              <Text className="time-label">Hours</Text>
            </div>
            <div className="time-block">
              <Text className="time-value">{timeLeft.minutes}</Text>
              <Text className="time-label">Minutes</Text>
            </div>
            <div className="time-block">
              <Text className="time-value">{timeLeft.seconds}</Text>
              <Text className="time-label">Seconds</Text>
            </div>
          </Space>
        </Card>
      </Space>
    </div>
  );
}

export default App;
