import { useState, useEffect, useRef } from "react";
import { Typography, Card, Space, Button } from "antd";
import { SoundOutlined, PauseOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import Typed from "typed.js";
import aloehSound from "./assets/aloeh.mp3";
import sa3ka2Image from "./assets/sa3ka2.jpg";
import "./App.css";

const { Title, Text } = Typography;



function App() {
  const targetDate = dayjs("2025-03-01");
  const audioRef = useRef<HTMLAudioElement>(null);
  const typedRef1 = useRef<HTMLSpanElement>(null);
  const typedRef2 = useRef<HTMLSpanElement>(null);
  const typedRef3 = useRef<HTMLSpanElement>(null);
  const typedRef4 = useRef<HTMLSpanElement>(null);
  const typedInstance1 = useRef<Typed | null>(null);
  const typedInstance2 = useRef<Typed | null>(null);
  const typedInstance3 = useRef<Typed | null>(null);
  const typedInstance4 = useRef<Typed | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const startTyping = () => {
    if (
      typedRef1.current &&
      typedRef2.current &&
      typedRef3.current &&
      typedRef4.current
    ) {
      // Initialize first paragraph
      typedInstance1.current = new Typed(typedRef1.current, {
        strings: [
          "أدى حمدي خدمته العسكرية في عام 2016، وهو الآن على قوة الاحتياط جنديا عسكريا غير مستدعى وينتظر على أهبة الاستعداد لتلبية نداء الواجب.",
        ],
        typeSpeed: 50,
        showCursor: true,
        cursorChar: "|",
        onComplete: () => {
          // Start second paragraph
          typedInstance2.current = new Typed(typedRef2.current, {
            strings: [
              "تنتهي خدمة البطل حمدي في يوم السبت الموافق 1/3/2025 ونحتفل في تلك المناسبة بمسيرته البطولية والحافلة بمزيج من الفداء والحماس.",
            ],
            typeSpeed: 50,
            showCursor: true,
            cursorChar: "|",
            onComplete: () => {
              // Start third paragraph
              typedInstance3.current = new Typed(typedRef3.current, {
                strings: [
                  "كان حمدي من النخبة المختارة في عملية تنقيب أرض سيناء الشريفة من الألغام التي تم زرعها من قبل العدو اللدود لمصرنا الحبيبة، وأصيب حمدي بشظايا لكن بمهارة راوغ طلقات العدو مستبسلا في أرض المعركة ليقضي على العناصر الوحشة.",
                ],
                typeSpeed: 50,
                showCursor: true,
                cursorChar: "|",
                onComplete: () => {
                  // Start fourth paragraph (special styling)
                  typedInstance4.current = new Typed(typedRef4.current, {
                    strings: ["حمدي...بطل ولد من رحم المعاناة"],
                    typeSpeed: 70,
                    showCursor: true,
                    cursorChar: "|",
                  });
                },
              });
            },
          });
        },
      });
    }
  };

  const stopTyping = () => {
    typedInstance1.current?.destroy();
    typedInstance2.current?.destroy();
    typedInstance3.current?.destroy();
    typedInstance4.current?.destroy();
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setShowStory(false);
        stopTyping();
      } else {
        audioRef.current.currentTime = 25; // Start at 25 seconds
        audioRef.current.play().catch((error) => {
          console.log("Audio playback failed:", error);
        });
        setShowStory(true);
        setTimeout(startTyping, 500); // Start typing after fade in begins
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

    return () => {
      clearInterval(timer);
      stopTyping();
    };
  }, []);

  return (
    <>
      {isPlaying && (

      )}
      <div className="container">
        <audio
          ref={audioRef}
          src={aloehSound}
          loop
          onEnded={() => setIsPlaying(false)}
        />
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
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
          <Button
            type="primary"
            icon={isPlaying ? <PauseOutlined /> : <SoundOutlined />}
            onClick={togglePlay}
            className="audio-button"
          >
            {isPlaying ? "Pause Sound" : "Play Sound"}
          </Button>
          <div className="content-row">
            {isPlaying && (
              <img
                src={sa3ka2Image}
                alt="Military Service Meme"
                className="meme-image"
              />
            )}
            {showStory && (
              <div className="military-story show">
                <div
                  className="story-text"
                  style={{ direction: "rtl", textAlign: "right" }}
                >
                  <span ref={typedRef1}></span>
                </div>
                <div
                  className="story-text"
                  style={{ direction: "rtl", textAlign: "right" }}
                >
                  <span ref={typedRef2}></span>
                </div>
                <div
                  className="story-text"
                  style={{ direction: "rtl", textAlign: "right" }}
                >
                  <span ref={typedRef3}></span>
                </div>
                <div
                  className="story-text hero-text"
                  style={{ direction: "rtl", textAlign: "center" }}
                >
                  <span ref={typedRef4}></span>
                </div>
              </div>
            )}
          </div>
        </Space>
      </div>
    </>
  );
}

export default App;
