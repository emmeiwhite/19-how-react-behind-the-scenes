import { useState } from 'react'

const content = [
  {
    tabNum: 1,
    summary: 'React is a library for building UIs',
    details:
      'Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    tabNum: 2,
    summary: 'State management is like giving state a home',
    details:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    tabNum: 3,
    summary: 'We can think of props as the component API',
    details:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
  }
]

export default function App() {
  const [tabs, setTabs] = useState(content)
  const [currentTab, setCurrentTab] = useState(1)

  const getTabNumber = currentTabClicked => {
    setCurrentTab(currentTabClicked)
  }

  return (
    <main>
      <TabsWrapper
        tabs={tabs}
        getTabNumber={getTabNumber}
      />

      {/* TabsContent */}
      <TabsContent
        tabs={tabs}
        currentTab={currentTab}
      />
    </main>
  )
}

// The Tabs Part
function TabsWrapper({ tabs, getTabNumber }) {
  return (
    <div className="mb-2 flex gap-3">
      {tabs.map(tab => (
        <Tab
          key={tab.tabNum}
          tabNumber={tab.tabNum}
          getTabNumber={getTabNumber}
        />
      ))}
    </div>
  )
}

function Tab({ tabNumber, getTabNumber }) {
  return (
    <button
      className="tab-styles"
      onClick={() => getTabNumber(tabNumber)}
    >
      Tab
    </button>
  )
}

// The Content Part
function TabsContent({ currentTab, tabs }) {
  return (
    <>
      {tabs.map(item => (
        <ActiveTabContent
          item={item}
          key={item.tabNum}
          currentTab={currentTab}
        />
      ))}
    </>
  )
}

function ActiveTabContent({ item, currentTab }) {
  // Local States, Local to the Component [Each of the Component instance of course]
  const [showDetails, setShowDetails] = useState(true)
  const [likes, setLikes] = useState(0)

  const handleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = currentLike => {
    if (currentLike === 'one') setLikes(likes + 1)
    else setLikes(likes + 4)
  }

  const hide = 'hidden'
  return (
    <div className={`bg-[#edf2ff] p-8 rounded-xl ${item.tabNum !== currentTab && hide}`}>
      <h4 className="text-xl mb-4 text-[#364fc7]">{item.summary}</h4>

      {showDetails && <p>{item.details}</p>}
      <div className="flex justify-between mt-4 mb-6">
        <button
          className="bg-none underline text-blue-600 text-sm"
          onClick={handleShowDetails}
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>

        <div className="flex items-center gap-2">
          <span>{likes} ❤️</span>
          <button
            className="bg-[#f03e3e] text-white py-1 px-2 rounded leading-none"
            onClick={() => handleLike('one')}
          >
            +
          </button>
          <button
            className="bg-[#f03e3e] text-white py-1 px-2 rounded leading-none"
            onClick={() => handleLike('more')}
          >
            +++
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="bg-[#364fc7] text-white py-2 px-3 rounded">Undo</button>
        <button className="bg-[#364fc7] text-white py-2 px-3 rounded">Undo in 2s</button>
      </div>
    </div>
  )
}

function DifferentContent() {
  return (
    <div className="bg-[#edf2ff] p-8 rounded-xl">
      <h4 className="text-xl mb-4 text-[#364fc7]">I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  )
}
