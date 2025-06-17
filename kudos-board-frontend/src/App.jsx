import './App.css'
import { useState , createContext} from 'react';
import HomePage from './components/HomePage';
import BoardPage from './components/BoardPage';

export const AllContext = createContext();

const tempData =
[
  {
    "title": "Journey to Joy",
    "image": "https://picsum.photos/200/300",
    "author": "Sophia Martinez",
    "category": "Celebration",
    "time_created": 1672531199,
    "cards": [
      {
        "title": "The Spark of Happiness",
        "image": "https://picsum.photos/200/300",
        "message": "A moment of pure bliss ignites the soul.",
        "author": "Julianne Morrow",
        "comments": [
          {
            "author": "Rowan Blakemore",
            "message": "Truly inspiring! A reminder to cherish the little moments."
          },
          {
            "author": "Elliott Crane",
            "message": "This resonates deeply. Happiness is found in simplicity."
          }
        ],
        "time_created": 1672531200
      },
      {
        "title": "Celebration of Life",
        "image": "https://picsum.photos/200/300",
        "message": "Embracing every heartbeat with gratitude.",
        "author": "Marcus Fielding",
        "comments": [
          {
            "author": "Clarissa Hart",
            "message": "A beautiful perspective. Life is a gift."
          },
          {
            "author": "Vivienne Day",
            "message": "This message brings peace to my heart."
          }
        ],
        "time_created": 1672531300
      },
      {
        "title": "Radiant Moments",
        "image": "https://picsum.photos/200/300",
        "message": "Shining light on the beauty of now.",
        "author": "Nathaniel Frost",
        "comments": [
          {
            "author": "Isabelle Sterling",
            "message": "Such a powerful reminder to stay present."
          },
          {
            "author": "Frederick Laird",
            "message": "Absolutely. The present moment is all we truly have."
          }
        ],
        "time_created": 1672531400
      }
    ]
  },
  {
    "title": "Gratitude Quest",
    "image": "https://picsum.photos/200/300",
    "author": "Liam Johnson",
    "category": "Thank you",
    "time_created": 1672617599,
    "cards": [
      {
        "title": "Thank You, Teacher",
        "image": "https://picsum.photos/200/300",
        "message": "Your guidance has shaped my path.",
        "author": "Milo Greyson",
        "comments": [
          {
            "author": "Genevieve Lockwood",
            "message": "Teachers are the unsung heroes of our lives."
          },
          {
            "author": "Tobias Wintermere",
            "message": "Gratitude is the best way to honor their efforts."
          }
        ],
        "time_created": 1672617600
      },
      {
        "title": "Family Support",
        "image": "https://picsum.photos/200/300",
        "message": "Their love is the foundation of my strength.",
        "author": "Lilliana Everhart",
        "comments": [
          {
            "author": "Benedict Crowell",
            "message": "Family truly is everything."
          },
          {
            "author": "Annalise Draycott",
            "message": "Their unwavering support is priceless."
          }
        ],
        "time_created": 1672617700
      },
      {
        "title": "Friendship Bonds",
        "image": "https://picsum.photos/200/300",
        "message": "Cherishing the laughter and memories.",
        "author": "Lucien Blackwater",
        "comments": [
          {
            "author": "Felicity Bramwell",
            "message": "Friends make the journey worthwhile."
          },
          {
            "author": "Jasper Millstone",
            "message": "True friends are a rare treasure."
          }
        ],
        "time_created": 1672617800
      }
    ]
  },
  {
    "title": "Inspire the Future",
    "image": "https://picsum.photos/200/300",
    "author": "Olivia Chen",
    "category": "Inspiration",
    "time_created": 1672703999,
    "cards": [
      {
        "title": "Dream Big",
        "image": "https://picsum.photos/200/300",
        "message": "The future belongs to those who believe in their dreams.",
        "author": "Elowen Starfire",
        "comments": [
          {
            "author": "Thorne Silvershade",
            "message": "Dreams are the seeds of our reality."
          },
          {
            "author": "Lyra Moonwhisper",
            "message": "Belief is the first step towards achievement."
          }
        ],
        "time_created": 1672704000
      },
      {
        "title": "Courage to Begin",
        "image": "https://picsum.photos/200/300",
        "message": "Every journey starts with a single step.",
        "author": "Arion Stormweaver",
        "comments": [
          {
            "author": "Cassian Nightbloom",
            "message": "Taking that first step is often the hardest."
          },
          {
            "author": "Nyx Shadowend",
            "message": "But it's also the most rewarding."
          }
        ],
        "time_created": 1672704100
      },
      {
        "title": "Resilience in Adversity",
        "image": "https://picsum.photos/200/300",
        "message": "Strength grows in the moments we think we can't go on but keep going anyway.",
        "author": "Soren Lightwalker",
        "comments": [
          {
            "author": "Mira Sunspell",
            "message": "Adversity is the forge of character."
          },
          {
            "author": "Orion Emberfall",
            "message": "Resilience is built in the toughest times."
          }
        ],
        "time_created": 1672704200
      }
    ]
  },
  {
    "title": "Moments of Reflection",
    "image": "https://picsum.photos/200/300",
    "author": "Ethan Williams",
    "category": "Inspiration",
    "time_created": 1672790399,
    "cards": [
      {
        "title": "The Power of Pause",
        "image": "https://picsum.photos/200/300",
        "message": "Sometimes, stepping back is the best way to move forward.",
        "author": "Isabella Green",
        "comments": [
          {
            "author": "Oliver Brooks",
            "message": "A timely reminder to slow down and reflect."
          },
          {
            "author": "Amelia Rivers",
            "message": "Reflection brings clarity and purpose."
          }
        ],
        "time_created": 1672790400
      },
      {
        "title": "Embracing Change",
        "image": "https://picsum.photos/200/300",
        "message": "Change is the only constant; embrace it with open arms.",
        "author": "Lucas Bennett",
        "comments": [
          {
            "author": "Charlotte Hayes",
            "message": "Embracing change leads to growth and new opportunities."
          },
          {
            "author": "James Turner",
            "message": "Change can be challenging, but it's essential for progress."
          }
        ],
        "time_created": 1672790500
      },
      {
        "title": "Finding Inner Peace",
        "image": "https://picsum.photos/200/300",
        "message": "Peace comes from within; do not seek it without.",
        "author": "Mia Carter",
        "comments": [
          {
            "author": "Benjamin Scott",
            "message": "Inner peace is the foundation of a harmonious life."
          },
          {
            "author": "Sophia Adams",
            "message": "Cultivating inner peace brings balance and serenity."
          }
        ],
        "time_created": 1672790600
      }
    ]
  },
  {
    "title": "Gratitude in Action",
    "image": "https://picsum.photos/200/300",
    "author": "Ava Johnson",
    "category": "Thank you",
    "time_created": 1672876799,
    "cards": [
      {
        "title": "Acts of Kindness",
        "image": "https://picsum.photos/200/300",
        "message": "Small acts of kindness can make a big difference.",
        "author": "Elijah Roberts",
        "comments": [
          {
            "author": "Grace Walker",
            "message": "Kindness is a language the deaf can hear and the blind can see."
          },
          {
            "author": "Henry Lewis",
            "message": "Every act of kindness creates a ripple effect."
          }
        ],
        "time_created": 1672876800
      },
      {
        "title": "Thankful Hearts",
        "image": "https://picsum.photos/200/300",
        "message": "Gratitude turns what we have into enough.",
        "author": "Lily Martinez",
        "comments": [
          {
            "author": "Samuel King",
            "message": "Gratitude is not only the greatest of virtues but the parent of all others."
          },
          {
            "author": "Ella White",
            "message": "A thankful heart is not only the greatest virtue but the parent of all the others."
          }
        ],
        "time_created": 1672876900
      },
      {
        "title": "Cherished Memories",
        "image": "https://picsum.photos/200/300",
        "message": "Memories are the treasures that we keep locked deep within the storehouse of our souls.",
        "author": "Noah Harris",
        "comments": [
          {
            "author": "Amelia Clark",
            "message": "Memories are timeless treasures of the heart."
          },
          {
            "author": "Jack Allen",
            "message": "The best thing about memories is making them."
          }
        ],
        "time_created": 1672877000
      }
    ]
  }
]


function App() {
  const [boardData, setBoardData] = useState(tempData);
  const [displayedData, setDisplayedData] = useState(boardData);

  const [cardData, setCardData] = useState([]);

  return (
    <>
      <header className="App-header">
        <h1>Kudos Board</h1>
      </header>
      <main>
        <AllContext.Provider value={{cardData, setCardData}}>
        {cardData == '' && <HomePage data={boardData} displayedData={displayedData} setDisplayedData={setDisplayedData} setCardData={setCardData}/>}
        {cardData != '' && <BoardPage cardData={cardData}/>}
        </AllContext.Provider>
      </main>
      <footer>Kudos Board ©{new Date().getFullYear()}</footer>
    </>
  )
}

export default App
