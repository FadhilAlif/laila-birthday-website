"use client";

import { useState, useEffect, type DragEvent } from "react";
import { ChevronDown, Gift, X } from "lucide-react";
import { Button } from "@/components/ui/button";
// Tambahkan import untuk confetti
// @ts-ignore
import confetti from "canvas-confetti";

export default function BirthdayWebsite() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [musicPlaying, setMusicPlaying] = useState(false);
  const [puzzlePieces, setPuzzlePieces] = useState<number[]>([]);
  const [puzzleComplete, setPuzzleComplete] = useState(false);
  const [draggedPiece, setDraggedPiece] = useState<number | null>(null);

  // Set birthday date ke 15 Juli 2025 jam 00:00:00
  const birthdayDate = new Date("2025-07-15T00:00:00");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = birthdayDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        // Jalankan confetti jika sudah lewat tanggal
        confetti({
          particleCount: 200,
          spread: 120,
          origin: { y: 0.6 },
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [birthdayDate]);

  // Confetti saat puzzle complete, hanya 5 detik
  useEffect(() => {
    let confettiInterval: NodeJS.Timeout | null = null;
    let confettiTimeout: NodeJS.Timeout | null = null;
    if (puzzleComplete) {
      confetti();
      confettiInterval = setInterval(() => {
        confetti();
      }, 700);
      confettiTimeout = setTimeout(() => {
        if (confettiInterval) clearInterval(confettiInterval);
      }, 5000);
    }
    return () => {
      if (confettiInterval) clearInterval(confettiInterval);
      if (confettiTimeout) clearTimeout(confettiTimeout);
    };
  }, [puzzleComplete]);

  // Autoplay music setelah interaksi pertama user (untuk menghindari blokir autoplay browser)
  useEffect(() => {
    const handleUserInteraction = () => {
      const audio = document.getElementById(
        "background-music"
      ) as HTMLAudioElement;
      if (audio && !musicPlaying) {
        audio
          .play()
          .then(() => setMusicPlaying(true))
          .catch(() => {});
      }
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };
    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("touchstart", handleUserInteraction);
    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };
  }, []);

  // Initialize puzzle pieces
  useEffect(() => {
    const shuffledPieces = Array.from({ length: 9 }, (_, i) => i).sort(
      () => Math.random() - 0.5
    );
    setPuzzlePieces(shuffledPieces);
  }, []);

  // Check if puzzle is complete
  useEffect(() => {
    const isComplete = puzzlePieces.every((piece, index) => piece === index);
    setPuzzleComplete(isComplete);
  }, [puzzlePieces]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const startMusic = () => {
    const audio = document.getElementById(
      "background-music"
    ) as HTMLAudioElement;
    if (audio) {
      audio.play().catch(console.error);
      setMusicPlaying(true);
    }
  };

  const toggleMusic = () => {
    const audio = document.getElementById(
      "background-music"
    ) as HTMLAudioElement;
    if (audio) {
      if (musicPlaying) {
        audio.pause();
        setMusicPlaying(false);
      } else {
        audio.play().catch(console.error);
        setMusicPlaying(true);
      }
    }
  };

  const handleDragStart = (
    e: DragEvent<HTMLDivElement>,
    pieceIndex: number
  ) => {
    setDraggedPiece(pieceIndex);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();
    if (draggedPiece !== null) {
      const newPieces = [...puzzlePieces];
      const draggedValue = newPieces[draggedPiece];
      const droppedValue = newPieces[dropIndex];

      newPieces[draggedPiece] = droppedValue;
      newPieces[dropIndex] = draggedValue;

      setPuzzlePieces(newPieces);
      setDraggedPiece(null);
    }
  };

  const shufflePuzzle = () => {
    const shuffled = [...puzzlePieces].sort(() => Math.random() - 0.5);
    setPuzzlePieces(shuffled);
    setPuzzleComplete(false);
  };

  const timelineEvents = [
    {
      year: "2022",
      title: "Ulang Tahun 2022",
      description:
        "Ini ulang tahun pertama kamu, aku masih inget banget nunggu kamu sampe jam 12 buat surprise di kos Viby",
      photo: "/assets/2022_birthday.jpg",
      color: "bg-pink-500",
    },
    {
      year: "2023",
      title: "Ulang Tahun 2023",
      description:
        "Ulang tahun paling kocak buat aku tapi memorable banget, bisa bisanya setelah aku bercapek capek dan konsepin semuanya eh semuanya batal karena tiba tiba ketemu di perempatan jalan :(",
      photo: "/assets/2023_birthday.jpg",
      color: "bg-purple-500",
    },
    {
      year: "2024",
      title: "Ulang Tahun 2024",
      description:
        "Ulang tahun yang aku ga surprisein kamu lansgung, karena lagi sparing di bandung but buat aku tahun 2024 merupakan tahun yang panjang dan paling mengesankan dimana aku dan kamu lagi develop together",
      photo: "/assets/gik_ugm.jpg",
      color: "bg-red-500",
    },
    {
      year: "2025",
      title: "Ulang Tahun 2025",
      description:
        "Ulang tahun tahun ini ga bisa surprisein kamu langsung lagi karena udah LDR huhu semangat terus ya kamu, heran langgeng banget kita haha :) ",
      photo: "/assets/photobox_balcos.png",
      color: "bg-rose-500",
    },
  ];

  // Gallery dengan caption
  const galleryPhotos = [
    {
      src: "/assets/long_time_ago.jpg",
      caption: "Night ride with scoppy jajan di GSP UGM Nasi Telor",
    },
    {
      src: "/assets/borobudur_lantern.JPG",
      caption: "Jauh jauh ke magelang buat liat ini",
    },
    {
      src: "/assets/andong.jpg",
      caption:
        "First time mountain date ke Gn.Andong, baliknya kamu ngantuk banget ampe mo jatoh wkw",
    },
    {
      src: "/assets/dieng.jpg",
      caption:
        "First time juga ke Dieng, kamu lucu banget ngeluh mulu ama Viby pas naik ke sikunir",
    },
    {
      src: "/assets/gik_ugm_2.jpg",
      caption: "Lagi jamannya Museum date biar kaya orang orang",
    },
    {
      src: "/assets/hindia_concert.jpg",
      caption:
        "Smoga hidup kita trus begini-gini saja, Walau sungai meluap dan kurs tak masuk logika, Smoga kita mencintai apa adanya - Cincin By Hindia",
    },
    {
      src: "/assets/first_concert_2023.jpg",
      caption:
        "First concert di UNY outfitnya masih alakadarnya wkwk, ujan deres baliknya mampir makan nasi teri ampe rumah jam 2 ",
    },
    {
      src: "/assets/ice_cream_amplaz.jpg",
      caption:
        "Kalo ga Pakuwon ya Amplaz kalo ga Amplaz ya Pakuwon gitu aja terus",
    },
    {
      src: "/assets/kopi_klotok.jpg",
      caption:
        "First time jadi tour guide keluarga kamu wkwk, lucu banget di kopi klotok ibumu sm bapakmu ngeluh antrinyaa",
    },
    {
      src: "/assets/marvel_movie.jpg",
      caption:
        "Liat marvel lagi dan lagi, kamu jadi kecanduan marvel gara gara aku haha",
    },
    {
      src: "/assets/timnas_day.jpg",
      caption:
        "First time nonton timnas sama kamu Indo vs Iraq waktu itu kalah, dan jalan jalan strolling jakarta ",
    },
    {
      src: "/assets/photobox_bandung.png",
      caption:
        "First time juga jadi turis di bandung bareng kamu, jajan ini itu semua yang viral di tiktok kamu coba haha",
    },
    {
      src: "/assets/sempro_lala.jpg",
      caption: "Setiap malam ku menemanimu mengerjakan sempro di Kopi Soe :) ",
    },
    {
      src: "/assets/sidang_lala.jpg",
      caption:
        "Anjayy Sidang, maaf pas itu aku gabisa dateng kan lagi di Bandung huhu",
    },
    {
      src: "/assets/wisuda_lala.jpg",
      caption:
        "Anjay Wisudah, fotonya bagus bagus btw terus first time ketemu mas mu haha",
    },
    {
      src: "/assets/usus_buntu.jpg",
      caption: "Menemani anak yang sedang Usus Buntu wkwkwk",
    },
  ];
  // State untuk caption foto yang dipilih
  const [selectedPhotoCaption, setSelectedPhotoCaption] = useState<string>("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Background Music */}
      <audio id="background-music" loop preload="auto">
        <source src="/assets/music/TheAdams_HanyaKau.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Music Control Button */}
      <button
        onClick={musicPlaying ? toggleMusic : startMusic}
        className="fixed top-4 right-4 z-50 bg-pink-500 hover:bg-pink-600 text-white p-2 md:p-3 rounded-full shadow-lg transition-all duration-300"
        title={musicPlaying ? "Pause Music" : "Play Music"}
      >
        {musicPlaying ? "🔇" : "🎵"}
      </button>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-2 md:px-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 via-purple-400/20 to-red-400/20"></div>
        <div className="container mx-auto px-2 md:px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <div className="mb-8 relative inline-block">
              <img
                src="/assets/kopi_tuku.jpg"
                alt="Our best photo together"
                className="w-40 h-40 md:w-80 md:h-80 object-cover rounded-full border-4 md:border-8 border-white shadow-2xl mx-auto animate-float"
              />
              <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 text-4xl md:text-6xl animate-pulse">
                💕
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-red-600 bg-clip-text text-transparent mb-2 md:mb-4 animate-text-shimmer">
              Happy Birthday
            </h1>
            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-700 mb-4 md:mb-8 animate-fade-in-delayed">
              Laila Isnaeni Khusniyah My Love ✨
            </h2>

            {/* Countdown Timer */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4 max-w-xs sm:max-w-md mx-auto mb-6 md:mb-8">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div
                  key={unit}
                  className="bg-white/80 backdrop-blur-sm rounded-lg p-2 md:p-4 shadow-lg"
                >
                  <div className="text-lg md:text-2xl font-bold text-pink-600">
                    {value}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 capitalize">
                    {unit}
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={() => scrollToSection("story")}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-4 md:px-8 py-2 md:py-4 rounded-full text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-gentle mr-2 md:mr-4 mb-2 md:mb-0"
            >
              Kisah Kita
              <ChevronDown className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <Button
              onClick={() => scrollToSection("puzzle")}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 md:px-8 py-2 md:py-4 rounded-full text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-gentle"
            >
              Main Puzzle 🧩
            </Button>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="py-10 md:py-20 bg-white">
        <div className="container mx-auto px-2 md:px-4">
          <h2 className="text-2xl md:text-5xl font-bold text-center mb-8 md:mb-16 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Our Love Story
          </h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-400 to-purple-400"></div>

            {timelineEvents.map((event, index) => (
              <div
                key={event.year}
                className={`relative mb-10 md:mb-16 ${
                  index % 2 === 0
                    ? "text-right pr-2 md:pr-8"
                    : "text-left pl-2 md:pl-8"
                }`}
              >
                <div
                  className={`inline-block ${
                    index % 2 === 0 ? "mr-2 md:mr-8" : "ml-2 md:ml-8"
                  }`}
                >
                  <div className="group cursor-pointer">
                    <div
                      className={`${event.color} text-white px-4 md:px-6 py-2 md:py-3 rounded-full inline-block font-bold text-base md:text-xl mb-2 md:mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    >
                      {event.year}
                    </div>
                    <div className="bg-white rounded-lg p-3 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 max-w-xs md:max-w-md group-hover:scale-105">
                      <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-1 md:mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base">
                        {event.description}
                      </p>

                      {/* Hover Photo */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2 md:mt-4">
                        <img
                          src={event.photo || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-32 md:h-48 object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div
                  className={`absolute top-6 md:top-8 left-1/2 transform -translate-x-1/2 w-4 md:w-6 h-4 md:h-6 ${event.color} rounded-full border-2 md:border-4 border-white shadow-lg`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        id="gallery"
        className="py-10 md:py-20 bg-gradient-to-br from-pink-50 to-purple-50"
      >
        <div className="container mx-auto px-2 md:px-4">
          <h2 className="text-2xl md:text-5xl font-bold text-center mb-8 md:mb-16 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Our Beautiful Memories
          </h2>

          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2 md:gap-4 space-y-2 md:space-y-4">
            {galleryPhotos.map((photo, index) => (
              <div
                key={index}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => {
                  setSelectedPhoto(photo.src);
                  setSelectedPhotoCaption(photo.caption);
                }}
              >
                <img
                  src={photo.src || "/placeholder.svg"}
                  alt={`Memory ${index + 1}`}
                  className="w-full h-48 md:h-56 object-cover rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Gifts Section */}
      <section id="gifts" className="py-10 md:py-20 bg-white">
        <div className="container mx-auto px-2 md:px-4 text-center">
          <h2 className="text-2xl md:text-5xl font-bold mb-8 md:mb-16 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            A Special Gift For You
          </h2>

          <div className="max-w-xs md:max-w-md mx-auto">
            <div
              className="relative cursor-pointer group"
              onClick={() => setShowGiftModal(true)}
            >
              <div className="w-40 h-40 md:w-64 md:h-64 mx-auto bg-gradient-to-br from-pink-400 via-purple-400 to-red-400 rounded-2xl md:rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110 animate-pulse-gentle">
                <div className="absolute inset-2 md:inset-4 bg-gradient-to-br from-pink-300 via-purple-300 to-red-300 rounded-xl md:rounded-2xl flex items-center justify-center">
                  <Gift className="w-12 h-12 md:w-24 md:h-24 text-white animate-bounce-gentle" />
                </div>
                <div className="absolute -top-2 md:-top-4 -right-2 md:-right-4 text-2xl md:text-4xl animate-spin-slow">
                  🎁
                </div>
                <div className="absolute -bottom-2 md:-bottom-4 -left-2 md:-left-4 text-2xl md:text-4xl animate-bounce">
                  💝
                </div>
              </div>
              <p className="mt-4 md:mt-6 text-base md:text-xl text-gray-700 font-medium">
                Klik untuk membuka ada yang spesial! 💕
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 md:p-4"
          onClick={() => {
            setSelectedPhoto(null);
            setSelectedPhotoCaption("");
          }}
        >
          <div
            className="relative w-full max-w-xs sm:max-w-md md:max-w-2xl max-h-full bg-white rounded-xl p-2 md:p-4 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setSelectedPhoto(null);
                setSelectedPhotoCaption("");
              }}
              className="absolute top-2 right-2 md:top-4 md:right-4 text-gray-700 hover:text-pink-500 transition-colors z-10"
            >
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <img
              src={selectedPhoto || "/placeholder.svg"}
              alt="Memory"
              className="max-w-full max-h-[40vh] md:max-h-[60vh] object-contain rounded-lg mb-2 md:mb-4"
            />
            <div className="text-center text-gray-700 text-sm md:text-lg font-medium mt-1 md:mt-2 px-2 md:px-0">
              {selectedPhotoCaption}
            </div>
          </div>
        </div>
      )}

      {/* Gift Modal */}
      {showGiftModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 md:p-4">
          <div className="bg-white rounded-xl md:rounded-2xl max-w-xs sm:max-w-md md:max-w-2xl w-full max-h-[80vh] overflow-y-auto relative">
            <button
              onClick={() => setShowGiftModal(false)}
              className="absolute top-2 right-2 md:top-4 md:right-4 text-gray-500 hover:text-pink-500 transition-colors"
            >
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <div className="p-4 md:p-8 text-center">
              <div className="text-3xl md:text-6xl mb-4 md:mb-6">💕</div>
              <h3 className="text-xl md:text-3xl font-bold text-pink-600 mb-4 md:mb-6">
                Love Letter For U
              </h3>

              <div className="text-left space-y-2 md:space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
                <p className="text-lg">Buat Keayangan Aku 💕</p>

                <p>
                  Di hari yang istimewa ini, aku ingin kamu tahu betapa
                  bersyukurnya aku punya kamu dalam hidupku. Setiap momen yang
                  kita lalui bersama adalah best moment of my life, dan setiap
                  hari bersamamu terasa seperti mimpi yang indah dan selalu akan
                  menjadi indah kaya lagu The Adams.
                </p>

                <p>
                  Dari pertemuan pertama kita di tahun 2022 dari 2 Februari 2022
                  hingga semua momen yang telah kita lalui bersama hingga detik
                  ini, kamu telah membawa begitu banyak cinta, kasih,
                  kegembiraan dan suka cita ke dalam duniaku. Senyummu menerangi
                  hari-hari tergelapku, dan cintamu memberiku kekuatan buat
                  melalui apapun itu dan mencoba apapun itu karena aku tau kalo
                  aku belum berhasil dan aku jatuh kamu bakal selalu ada buat
                  aku.
                </p>

                <p>
                  Saat kita merayakan satu tahun lagi keberadaanmu yang indah,
                  aku berjanji untuk terus menemanimu dan mencintaimu dengan
                  sepenuh hati, mendukung semua mimpimu, dan menciptakan lebih
                  banyak kenangan bersamamu.
                </p>

                <p>
                  You are my sunshine, my best friend, and my greatest love.
                  Here's to many more birthdays together, my love 💕.
                </p>

                <p className="text-lg font-medium text-pink-600">
                  Happy Birthday, Cantikku Manisku Kesayangan Aku! 🎉💕
                </p>

                <p className="text-right italic">
                  Forever yours,
                  <br />
                  Fadhil Alif❤️
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Puzzle Section */}
      <section
        id="puzzle"
        className="py-10 md:py-20 bg-gradient-to-br from-purple-50 to-pink-50"
      >
        <div className="container mx-auto px-2 md:px-4">
          <h2 className="text-2xl md:text-5xl font-bold text-center mb-4 md:mb-8 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Time to Play Puzzle
          </h2>
          <p className="text-center text-gray-600 mb-6 md:mb-12 text-base md:text-lg">
            Satukan kembali kenangan indah ini? 🧩💕
          </p>

          <div className="max-w-xs sm:max-w-md md:max-w-2xl mx-auto">
            {puzzleComplete && (
              <div className="text-center mb-4 md:mb-8 animate-bounce">
                <div className="bg-green-500 text-white px-4 md:px-8 py-2 md:py-4 rounded-full inline-block text-lg md:text-2xl font-bold shadow-lg">
                  🎉 Kerenn! kamu sayang haha! 🎉
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-1 md:gap-2 bg-white p-2 md:p-4 rounded-2xl shadow-2xl mb-4 md:mb-8">
              {puzzlePieces.map((pieceValue, index) => {
                // Mapping index ke posisi row-col sesuai urutan file
                const row = Math.floor(pieceValue / 3) + 1;
                const col = (pieceValue % 3) + 1;
                return (
                  <div
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    className={`aspect-square cursor-move hover:scale-105 transition-all duration-200 rounded-lg overflow-hidden 
                      ${
                        puzzleComplete
                          ? "border-0"
                          : "border-[1.5px] md:border-2"
                      } 
                      ${puzzleComplete ? "" : "border-gray-200"} 
                      flex items-center justify-center bg-gray-100`}
                  >
                    <img
                      src={`/assets/puzzle/row-${row}-column-${col}.jpg`}
                      alt={`Puzzle piece ${row}-${col}`}
                      className="w-full h-full object-cover select-none"
                      draggable={false}
                    />
                  </div>
                );
              })}
            </div>

            <div className="text-center">
              <Button
                onClick={shufflePuzzle}
                disabled={puzzleComplete}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 md:px-8 py-2 md:py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {puzzleComplete
                  ? "Kerenya kamu bisa selesain ini haha! 🎉"
                  : "Acak Lagi 🔄"}
              </Button>
            </div>

            {!puzzleComplete && (
              <p className="text-center text-gray-500 mt-2 md:mt-4 text-xs md:text-sm">
                💡 Tips: Seret dan jatuhkan potongan untuk mengatur ulang!
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Play Videos Section */}
      <section id="videos" className="py-10 md:py-20 bg-white">
        <div className="container mx-auto px-2 md:px-4">
          <h2 className="text-2xl md:text-5xl font-bold text-center mb-4 md:mb-8 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Our Special Video
          </h2>
          <div className="flex justify-center">
            {/* Embed video dari YouTube agar lebih ringan dan scalable */}
            <iframe
              width="100%"
              height="220"
              className="rounded-2xl shadow-2xl max-w-xs sm:max-w-md md:max-w-2xl bg-black aspect-video"
              src="https://www.youtube.com/embed/xShuno0VV3M?si=aoT3hZGKY3MPlBBp"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
