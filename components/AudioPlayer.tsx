"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef, JSX } from "react";
import { BiPause } from "react-icons/bi";
import { BsMic } from "react-icons/bs";

/**
 * Generates a simple visual waveform component using div elements.
 * This is purely visual and does not represent actual audio data.
 */
const WaveformVisual: React.FC = () => {
  // Random heights for visual variety
  const heights = [
    8, 12, 16, 20, 24, 28, 32, 28, 24, 20, 16, 12, 8, 10, 14, 18, 22, 26, 30,
    34, 30, 26, 22, 18, 14, 10, 12, 18, 24, 30, 36, 40, 36, 30, 24, 18, 12, 15,
    20, 25, 30, 35, 30, 25, 20, 15, 18, 22, 26, 30, 28, 24, 20, 16, 8, 12, 16,
    20, 24, 28, 32, 28, 24, 20, 16, 12, 8, 10, 14, 18, 22, 26, 30, 34, 30, 26,
    22, 18, 14, 10, 12, 18, 24, 30, 36, 40, 36, 30, 24, 18, 12, 15, 20, 25, 30,
    35, 30, 25, 20, 15, 18, 22, 26, 30, 28, 24, 20, 16, 12,
  ];

  // Teal color for the waveform lines
  const waveformColor = "bg-teal-500";

  return (
    <div className="flex items-center space-x-0.5 h-full py-4 overflow-hidden">
      {heights.map((h, index) => (
        <div
          key={index}
          className={`${waveformColor} rounded-full`}
          style={{
            width: "2px",
            height: `${(h / 40) * 100}%`, // Normalize height relative to max 40
            minHeight: "2px", // Ensure visibility
            transition: "height 0.1s ease-out",
          }}
        />
      ))}
    </div>
  );
};

/**
 * Component to replicate the specialized audio player block design.
 */
export default function AudioPlayer(): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // *** IMPORTANT: REPLACE THIS URL with the actual path to your MP3 file ***
  const audioSrc = "/audio/2.mp3";

  // Set up event listeners for the audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Handlers to update state based on audio events
    const setPlaying = () => setIsPlaying(true);
    const setPaused = () => setIsPlaying(false);

    audio.addEventListener("play", setPlaying);
    audio.addEventListener("pause", setPaused);
    audio.addEventListener("ended", setPaused);

    // Cleanup listeners on unmount
    return () => {
      audio.removeEventListener("play", setPlaying);
      audio.removeEventListener("pause", setPaused);
      audio.removeEventListener("ended", setPaused);
    };
  }, []);

  const handleTogglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Automatically handled by 'play' event listener
        audioRef.current.play().catch((error) => {
          console.error("Audio playback failed:", error);
          // Handle cases where play() is interrupted by user gesture requirements
        });
      }
    }
  };

  return (
    <div className="hidden py-6 md:flex justify-center items-center">
      {/* The main audio player container */}
      <div className="relative flex items-center p-4 w-full rounded-2xl border-1 border-[#002325] bg-[#F1FEFF]">
        {/* Play/Mic Button */}
        <button
          onClick={handleTogglePlay}
          className="shrink-0 w-10 h-10 p-2 rounded-full mr-4 bg-teal-500 text-white shadow-md hover:bg-teal-600 transition-colors focus:outline-none focus:ring-4 focus:ring-teal-300"
          aria-label={isPlaying ? "Pause audio message" : "Play audio message"}
        >
          {/* Show Pause icon when playing, Microphone icon when stopped */}
          {isPlaying ? (
            <BiPause className="w-full h-full" />
          ) : (
            <BsMic className="w-full h-full" />
          )}
        </button>

        {/* Waveform and Duration */}
        <div className="grow flex items-center justify-between h-14 overflow-hidden">
          {/* Waveform (Visual Placeholder) */}
          <div className="grow h-full mr-4">
            <WaveformVisual />
          </div>

          {/* Duration (This would be calculated dynamically in a real app) */}
          <span className="shrink-0 text-sm font-medium text-gray-500">
            25 sec
          </span>
        </div>

        {/* Avatar/Image */}
        <Image
          src="/images/vocal_user.png"
          alt="User avatar"
          className="w-12 h-12 rounded-full ml-4 shrink-0 object-cover"
          width={120}
          height={120}
        />

        {/* Hidden audio element linked via ref */}
        <audio ref={audioRef} src={audioSrc} hidden />
      </div>
    </div>
  );
}
