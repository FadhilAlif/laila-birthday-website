"use client"

import { useState, useEffect, type DragEvent } from "react"
import { ChevronDown, Gift, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BirthdayWebsite() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const [showGiftModal, setShowGiftModal] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [musicPlaying, setMusicPlaying] = useState(false)
  const [puzzlePieces, setPuzzlePieces] = useState<number[]>([])
  const [puzzleComplete, setPuzzleComplete] = useState(false)
  const [draggedPiece, setDraggedPiece] = useState<number | null>(null)

  // Set birthday date (adjust this to your girlfriend's birthday)
  const birthdayDate = new Date("2025-02-14T00:00:00") // Example: Valentine's Day

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = birthdayDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [birthdayDate])

  // Initialize puzzle pieces
  useEffect(() => {
    const shuffledPieces = Array.from({ length: 9 }, (_, i) => i).sort(() => Math.random() - 0.5)
    setPuzzlePieces(shuffledPieces)
  }, [])

  // Check if puzzle is complete
  useEffect(() => {
    const isComplete = puzzlePieces.every((piece, index) => piece === index)
    setPuzzleComplete(isComplete)
  }, [puzzlePieces])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const startMusic = () => {
    const audio = document.getElementById("background-music") as HTMLAudioElement
    if (audio) {
      audio.play().catch(console.error)
      setMusicPlaying(true)
    }
  }

  const toggleMusic = () => {
    const audio = document.getElementById("background-music") as HTMLAudioElement
    if (audio) {
      if (musicPlaying) {
        audio.pause()
        setMusicPlaying(false)
      } else {
        audio.play().catch(console.error)
        setMusicPlaying(true)
      }
    }
  }

  const handleDragStart = (e: DragEvent<HTMLDivElement>, pieceIndex: number) => {
    setDraggedPiece(pieceIndex)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault()
    if (draggedPiece !== null) {
      const newPieces = [...puzzlePieces]
      const draggedValue = newPieces[draggedPiece]
      const droppedValue = newPieces[dropIndex]

      newPieces[draggedPiece] = droppedValue
      newPieces[dropIndex] = draggedValue

      setPuzzlePieces(newPieces)
      setDraggedPiece(null)
    }
  }

  const shufflePuzzle = () => {
    const shuffled = [...puzzlePieces].sort(() => Math.random() - 0.5)
    setPuzzlePieces(shuffled)
    setPuzzleComplete(false)
  }

  const timelineEvents = [
    {
      year: "2022",
      title: "First Meeting",
      description: "The day our beautiful journey began",
      photo: "/placeholder.svg?height=300&width=400",
      color: "bg-pink-500",
    },
    {
      year: "2023",
      title: "First Adventure",
      description: "Our first trip together - unforgettable memories",
      photo: "/placeholder.svg?height=300&width=400",
      color: "bg-purple-500",
    },
    {
      year: "2024",
      title: "Growing Stronger",
      description: "Every moment with you makes life more beautiful",
      photo: "/placeholder.svg?height=300&width=400",
      color: "bg-red-500",
    },
    {
      year: "2025",
      title: "Forever & Always",
      description: "Here's to many more years of love and happiness",
      photo: "/placeholder.svg?height=300&width=400",
      color: "bg-rose-500",
    },
  ]

  const galleryPhotos = [
    "/placeholder.svg?height=400&width=300",
    "/placeholder.svg?height=500&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=600&width=400",
    "/placeholder.svg?height=400&width=350",
    "/placeholder.svg?height=450&width=300",
    "/placeholder.svg?height=350&width=400",
    "/placeholder.svg?height=500&width=350",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Background Music */}
      <audio id="background-music" loop>
        <source src="/placeholder-music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Music Control Button */}
      <button
        onClick={musicPlaying ? toggleMusic : startMusic}
        className="fixed top-4 right-4 z-50 bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
        title={musicPlaying ? "Pause Music" : "Play Music"}
      >
        {musicPlaying ? "🔇" : "🎵"}
      </button>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 via-purple-400/20 to-red-400/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <div className="mb-8 relative inline-block">
              <img
                src="/placeholder.svg?height=400&width=400"
                alt="Our best photo together"
                className="w-80 h-80 object-cover rounded-full border-8 border-white shadow-2xl mx-auto animate-float"
              />
              <div className="absolute -top-4 -right-4 text-6xl animate-pulse">💕</div>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-red-600 bg-clip-text text-transparent mb-4 animate-text-shimmer">
              Happy Birthday
            </h1>
            <h2 className="text-3xl md:text-4xl font-light text-gray-700 mb-8 animate-fade-in-delayed">
              My Beautiful Love ✨
            </h2>

            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-8">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <div className="text-2xl font-bold text-pink-600">{value}</div>
                  <div className="text-sm text-gray-600 capitalize">{unit}</div>
                </div>
              ))}
            </div>

            <Button
              onClick={() => scrollToSection("story")}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-gentle mr-4"
            >
              Discover Our Story
              <ChevronDown className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => scrollToSection("puzzle")}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-gentle"
            >
              Play Puzzle Game 🧩
            </Button>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Our Love Story
          </h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-400 to-purple-400"></div>

            {timelineEvents.map((event, index) => (
              <div
                key={event.year}
                className={`relative mb-16 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}
              >
                <div className={`inline-block ${index % 2 === 0 ? "mr-8" : "ml-8"}`}>
                  <div className="group cursor-pointer">
                    <div
                      className={`${event.color} text-white px-6 py-3 rounded-full inline-block font-bold text-xl mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    >
                      {event.year}
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 max-w-md group-hover:scale-105">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h3>
                      <p className="text-gray-600">{event.description}</p>

                      {/* Hover Photo */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4">
                        <img
                          src={event.photo || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div
                  className={`absolute top-8 left-1/2 transform -translate-x-1/2 w-6 h-6 ${event.color} rounded-full border-4 border-white shadow-lg`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Our Beautiful Memories
          </h2>

          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {galleryPhotos.map((photo, index) => (
              <div
                key={index}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img
                  src={photo || "/placeholder.svg"}
                  alt={`Memory ${index + 1}`}
                  className="w-full rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Gifts Section */}
      <section id="gifts" className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-16 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            A Special Gift For You
          </h2>

          <div className="max-w-md mx-auto">
            <div className="relative cursor-pointer group" onClick={() => setShowGiftModal(true)}>
              <div className="w-64 h-64 mx-auto bg-gradient-to-br from-pink-400 via-purple-400 to-red-400 rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110 animate-pulse-gentle">
                <div className="absolute inset-4 bg-gradient-to-br from-pink-300 via-purple-300 to-red-300 rounded-2xl flex items-center justify-center">
                  <Gift className="w-24 h-24 text-white animate-bounce-gentle" />
                </div>
                <div className="absolute -top-4 -right-4 text-4xl animate-spin-slow">🎁</div>
                <div className="absolute -bottom-4 -left-4 text-4xl animate-bounce">💝</div>
              </div>
              <p className="mt-6 text-xl text-gray-700 font-medium">Click to open your special surprise! 💕</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 text-white hover:text-pink-400 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedPhoto || "/placeholder.svg"}
              alt="Memory"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Gift Modal */}
      {showGiftModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto relative">
            <button
              onClick={() => setShowGiftModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-pink-500 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8 text-center">
              <div className="text-6xl mb-6">💕</div>
              <h3 className="text-3xl font-bold text-pink-600 mb-6">My Love Letter To You</h3>

              <div className="text-left space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg">My Dearest Love,</p>

                <p>
                  On this special day, I want you to know how incredibly grateful I am to have you in my life. Every
                  moment we've shared has been a treasure, and every day with you feels like a beautiful dream.
                </p>

                <p>
                  From our first meeting in 2022 to all the adventures we've shared, you've brought so much joy,
                  laughter, and love into my world. Your smile lights up my darkest days, and your love gives me
                  strength to face anything.
                </p>

                <p>
                  As we celebrate another year of your beautiful existence, I promise to continue loving you with all my
                  heart, supporting your dreams, and creating countless more memories together.
                </p>

                <p>
                  You are my sunshine, my best friend, and my greatest love. Here's to many more birthdays together, my
                  darling.
                </p>

                <p className="text-lg font-medium text-pink-600">Happy Birthday, Beautiful! 🎉💕</p>

                <p className="text-right italic">
                  Forever yours,
                  <br />
                  [Your Name] ❤️
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Puzzle Section */}
      <section id="puzzle" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Time to Play Puzzle
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Can you put our beautiful memory back together? 🧩💕
          </p>

          <div className="max-w-2xl mx-auto">
            {puzzleComplete && (
              <div className="text-center mb-8 animate-bounce">
                <div className="bg-green-500 text-white px-8 py-4 rounded-full inline-block text-2xl font-bold shadow-lg">
                  🎉 Success! You did it, beautiful! 🎉
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-2 bg-white p-4 rounded-2xl shadow-2xl mb-8">
              {puzzlePieces.map((pieceValue, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`aspect-square cursor-move hover:scale-105 transition-all duration-200 rounded-lg overflow-hidden border-2 ${
                    puzzleComplete ? "border-green-400" : "border-gray-200"
                  }`}
                  style={{
                    backgroundImage: `url('/placeholder.svg?height=600&width=600')`,
                    backgroundSize: "300% 300%",
                    backgroundPosition: `${(pieceValue % 3) * 50}% ${Math.floor(pieceValue / 3) * 50}%`,
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-transparent to-black/10 flex items-center justify-center">
                    <span className="text-white font-bold text-lg bg-black/50 px-2 py-1 rounded">{pieceValue + 1}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                onClick={shufflePuzzle}
                disabled={puzzleComplete}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {puzzleComplete ? "Puzzle Complete! 🎉" : "Shuffle Pieces 🔄"}
              </Button>
            </div>

            {!puzzleComplete && (
              <p className="text-center text-gray-500 mt-4 text-sm">
                💡 Tip: Drag and drop the pieces to rearrange them!
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
