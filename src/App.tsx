import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data for Kick streamers
const mockStreamers = [
  { id: 1, username: 'xQc', displayName: 'xQc', avatar: 'https://images.kick.com/images/user/xqc/profile_image/conversion/default-medium.webp', followers: 2450000, viewers: 85000, isLive: true, category: 'Just Chatting' },
  { id: 2, username: 'Trainwreckstv', displayName: 'Trainwreckstv', avatar: 'https://images.kick.com/images/user/trainwreckstv/profile_image/conversion/default-medium.webp', followers: 1200000, viewers: 42000, isLive: true, category: 'Slots' },
  { id: 3, username: 'Adin Ross', displayName: 'Adin Ross', avatar: 'https://images.kick.com/images/user/adinross/profile_image/conversion/default-medium.webp', followers: 980000, viewers: 38000, isLive: true, category: 'Just Chatting' },
  { id: 4, username: 'Amouranth', displayName: 'Amouranth', avatar: 'https://images.kick.com/images/user/amouranth/profile_image/conversion/default-medium.webp', followers: 890000, viewers: 15000, isLive: false, category: 'Just Chatting' },
  { id: 5, username: 'Destiny', displayName: 'Destiny', avatar: 'https://images.kick.com/images/user/destiny/profile_image/conversion/default-medium.webp', followers: 750000, viewers: 28000, isLive: true, category: 'Just Chatting' },
  { id: 6, username: 'Roshtein', displayName: 'Roshtein', avatar: 'https://images.kick.com/images/user/roshtein/profile_image/conversion/default-medium.webp', followers: 680000, viewers: 22000, isLive: true, category: 'Slots' },
  { id: 7, username: 'Ice Poseidon', displayName: 'Ice Poseidon', avatar: 'https://images.kick.com/images/user/iceposeidon/profile_image/conversion/default-medium.webp', followers: 520000, viewers: 8500, isLive: false, category: 'IRL' },
  { id: 8, username: 'Sneako', displayName: 'Sneako', avatar: 'https://images.kick.com/images/user/sneako/profile_image/conversion/default-medium.webp', followers: 480000, viewers: 18000, isLive: true, category: 'Just Chatting' },
  { id: 9, username: 'Tectone', displayName: 'Tectone', avatar: 'https://images.kick.com/images/user/tectone/profile_image/conversion/default-medium.webp', followers: 420000, viewers: 12000, isLive: true, category: 'Gaming' },
  { id: 10, username: 'Clix', displayName: 'Clix', avatar: 'https://images.kick.com/images/user/clix/profile_image/conversion/default-medium.webp', followers: 380000, viewers: 25000, isLive: true, category: 'Fortnite' },
  { id: 11, username: 'N3on', displayName: 'N3on', avatar: 'https://images.kick.com/images/user/n3on/profile_image/conversion/default-medium.webp', followers: 350000, viewers: 15000, isLive: true, category: 'IRL' },
  { id: 12, username: 'FaZe Banks', displayName: 'FaZe Banks', avatar: 'https://images.kick.com/images/user/banks/profile_image/conversion/default-medium.webp', followers: 320000, viewers: 9000, isLive: false, category: 'Just Chatting' },
];

type SortOption = 'viewers' | 'followers';
type PageView = 'browse' | 'leaderboard';

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

function StreamerCard({ streamer, index, rank }: { streamer: typeof mockStreamers[0]; index: number; rank?: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.a
      href={`https://kick.com/${streamer.username.toLowerCase().replace(' ', '')}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="group relative block"
    >
      {/* Card */}
      <div className="relative bg-[#12121a] border border-[#2a2a3e] overflow-hidden transition-all duration-300 group-hover:border-[#00f0ff] group-hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]">
        {/* Rank badge */}
        {rank && (
          <div className="absolute top-0 left-0 z-20 bg-gradient-to-r from-[#ff0066] to-[#ff3388] px-3 py-1 font-bebas text-2xl text-white tracking-wider">
            #{rank}
          </div>
        )}

        {/* Live indicator */}
        {streamer.isLive && (
          <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff0066] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff0066]"></span>
            </span>
            <span className="font-mono text-xs text-[#ff0066] uppercase tracking-widest">Live</span>
          </div>
        )}

        {/* Avatar area */}
        <div className="relative h-48 overflow-hidden bg-[#1a1a2e]">
          {!imgError ? (
            <img
              src={streamer.avatar}
              alt={streamer.displayName}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a]">
              <span className="font-bebas text-6xl text-[#00f0ff] opacity-50">
                {streamer.displayName.charAt(0)}
              </span>
            </div>
          )}

          {/* Scanline overlay */}
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)] pointer-events-none"></div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] via-transparent to-transparent"></div>
        </div>

        {/* Info */}
        <div className="p-4 space-y-3">
          <h3 className="font-bebas text-2xl text-white tracking-wide truncate group-hover:text-[#00f0ff] transition-colors">
            {streamer.displayName}
          </h3>

          <div className="text-xs font-mono text-[#666] uppercase tracking-widest truncate">
            {streamer.category}
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-[#2a2a3e]">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#ff0066]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
              </svg>
              <span className="font-mono text-sm text-[#00f0ff]">
                {formatNumber(streamer.viewers)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#00f0ff]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
              </svg>
              <span className="font-mono text-sm text-[#888]">
                {formatNumber(streamer.followers)}
              </span>
            </div>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[#ff0066] opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#ff0066] opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
    </motion.a>
  );
}

function LeaderboardRow({ streamer, rank, sortBy }: { streamer: typeof mockStreamers[0]; rank: number; sortBy: SortOption }) {
  const [imgError, setImgError] = useState(false);
  const value = sortBy === 'viewers' ? streamer.viewers : streamer.followers;
  const maxValue = sortBy === 'viewers' ? 85000 : 2450000;
  const percentage = (value / maxValue) * 100;

  return (
    <motion.a
      href={`https://kick.com/${streamer.username.toLowerCase().replace(' ', '')}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: rank * 0.05 }}
      whileHover={{ x: 8 }}
      className="group relative block"
    >
      <div className="relative flex items-center gap-4 p-4 bg-[#12121a] border border-[#2a2a3e] hover:border-[#00f0ff] transition-all overflow-hidden">
        {/* Background bar */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#00f0ff]/10 to-transparent transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>

        {/* Rank */}
        <div className={`relative z-10 w-12 h-12 flex items-center justify-center font-bebas text-2xl ${
          rank === 1 ? 'text-[#ffd700]' : rank === 2 ? 'text-[#c0c0c0]' : rank === 3 ? 'text-[#cd7f32]' : 'text-[#666]'
        }`}>
          #{rank}
        </div>

        {/* Avatar */}
        <div className="relative z-10 w-14 h-14 overflow-hidden bg-[#1a1a2e] flex-shrink-0">
          {!imgError ? (
            <img
              src={streamer.avatar}
              alt={streamer.displayName}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-bebas text-2xl text-[#00f0ff]">
                {streamer.displayName.charAt(0)}
              </span>
            </div>
          )}
          {streamer.isLive && (
            <div className="absolute bottom-0 left-0 right-0 bg-[#ff0066] text-[8px] font-mono text-center text-white uppercase">
              Live
            </div>
          )}
        </div>

        {/* Name */}
        <div className="relative z-10 flex-1 min-w-0">
          <h3 className="font-bebas text-xl text-white tracking-wide truncate group-hover:text-[#00f0ff] transition-colors">
            {streamer.displayName}
          </h3>
          <p className="font-mono text-xs text-[#666] truncate">{streamer.category}</p>
        </div>

        {/* Stats */}
        <div className="relative z-10 flex items-center gap-6 flex-shrink-0">
          <div className="text-right">
            <div className="font-mono text-xs text-[#666] uppercase">Viewers</div>
            <div className={`font-bebas text-xl ${sortBy === 'viewers' ? 'text-[#00f0ff]' : 'text-white'}`}>
              {formatNumber(streamer.viewers)}
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-xs text-[#666] uppercase">Followers</div>
            <div className={`font-bebas text-xl ${sortBy === 'followers' ? 'text-[#00f0ff]' : 'text-white'}`}>
              {formatNumber(streamer.followers)}
            </div>
          </div>
        </div>

        {/* Arrow */}
        <svg className="relative z-10 w-6 h-6 text-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </motion.a>
  );
}

export default function App() {
  const [sortBy, setSortBy] = useState<SortOption>('viewers');
  const [page, setPage] = useState<PageView>('browse');
  const [showLiveOnly, setShowLiveOnly] = useState(false);

  const filteredStreamers = mockStreamers
    .filter(s => !showLiveOnly || s.isLive)
    .sort((a, b) => b[sortBy] - a[sortBy]);

  useEffect(() => {
    // Reset animation triggers when filters change
  }, [sortBy, showLiveOnly]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Noise overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50"
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}></div>

      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]"
           style={{ backgroundImage: 'linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

      {/* Header */}
      <header className="relative border-b border-[#2a2a3e] bg-[#0a0a0a]/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00f0ff] to-[#ff0066] flex items-center justify-center">
                  <span className="font-bebas text-2xl text-black">K</span>
                </div>
                <div className="absolute -inset-1 border border-[#00f0ff] animate-pulse"></div>
              </div>
              <div>
                <h1 className="font-bebas text-3xl tracking-[0.2em] text-white">KICK<span className="text-[#00f0ff]">WATCH</span></h1>
                <p className="font-mono text-[10px] text-[#666] tracking-widest uppercase">Streamer Directory</p>
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2"
            >
              <button
                onClick={() => setPage('browse')}
                className={`px-6 py-2 font-bebas text-lg tracking-wider transition-all ${
                  page === 'browse'
                    ? 'bg-[#00f0ff] text-black'
                    : 'border border-[#2a2a3e] text-[#888] hover:border-[#00f0ff] hover:text-[#00f0ff]'
                }`}
              >
                Browse
              </button>
              <button
                onClick={() => setPage('leaderboard')}
                className={`px-6 py-2 font-bebas text-lg tracking-wider transition-all ${
                  page === 'leaderboard'
                    ? 'bg-[#ff0066] text-white'
                    : 'border border-[#2a2a3e] text-[#888] hover:border-[#ff0066] hover:text-[#ff0066]'
                }`}
              >
                Leaderboard
              </button>
            </motion.nav>
          </div>
        </div>
      </header>

      {/* Filters Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="border-b border-[#2a2a3e] bg-[#0a0a0a]/50"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono text-xs text-[#666] uppercase tracking-widest">Sort by:</span>

            <div className="flex gap-2">
              <button
                onClick={() => setSortBy('viewers')}
                className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
                  sortBy === 'viewers'
                    ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]'
                    : 'border border-[#2a2a3e] text-[#888] hover:border-[#00f0ff] hover:text-[#00f0ff]'
                }`}
              >
                Most Viewed
              </button>
              <button
                onClick={() => setSortBy('followers')}
                className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
                  sortBy === 'followers'
                    ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]'
                    : 'border border-[#2a2a3e] text-[#888] hover:border-[#00f0ff] hover:text-[#00f0ff]'
                }`}
              >
                Most Followed
              </button>
            </div>

            <div className="w-px h-6 bg-[#2a2a3e] hidden md:block"></div>

            <button
              onClick={() => setShowLiveOnly(!showLiveOnly)}
              className={`flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
                showLiveOnly
                  ? 'bg-[#ff0066]/20 text-[#ff0066] border border-[#ff0066]'
                  : 'border border-[#2a2a3e] text-[#888] hover:border-[#ff0066] hover:text-[#ff0066]'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className={`${showLiveOnly ? 'animate-ping' : ''} absolute inline-flex h-full w-full rounded-full bg-[#ff0066] opacity-75`}></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff0066]"></span>
              </span>
              Live Only
            </button>

            <div className="ml-auto font-mono text-xs text-[#666]">
              {filteredStreamers.length} streamers
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 pb-24">
        <AnimatePresence mode="wait">
          {page === 'browse' ? (
            <motion.div
              key="browse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {filteredStreamers.map((streamer, index) => (
                <StreamerCard key={streamer.id} streamer={streamer} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto"
            >
              {/* Leaderboard Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <h2 className="font-bebas text-5xl md:text-6xl tracking-[0.2em] text-white">
                  TOP <span className="text-[#ff0066]">STREAMERS</span>
                </h2>
                <p className="font-mono text-sm text-[#666] mt-2">
                  Ranked by {sortBy === 'viewers' ? 'current viewers' : 'total followers'}
                </p>
              </motion.div>

              {/* Top 3 Podium */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-3 gap-2 md:gap-4 mb-8"
              >
                {[1, 0, 2].map((podiumIndex, displayIndex) => {
                  const streamer = filteredStreamers[podiumIndex];
                  if (!streamer) return <div key={podiumIndex}></div>;
                  const heights = ['h-32', 'h-40', 'h-28'];
                  const colors = ['bg-[#c0c0c0]', 'bg-[#ffd700]', 'bg-[#cd7f32]'];
                  return (
                    <div key={streamer.id} className="flex flex-col items-center">
                      <div className={`w-16 h-16 md:w-20 md:h-20 overflow-hidden mb-2 border-2 ${podiumIndex === 0 ? 'border-[#ffd700]' : podiumIndex === 1 ? 'border-[#c0c0c0]' : 'border-[#cd7f32]'}`}>
                        <img
                          src={streamer.avatar}
                          alt={streamer.displayName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                      <p className="font-bebas text-sm md:text-lg text-white text-center truncate w-full">
                        {streamer.displayName}
                      </p>
                      <p className="font-mono text-xs text-[#00f0ff]">
                        {formatNumber(sortBy === 'viewers' ? streamer.viewers : streamer.followers)}
                      </p>
                      <div className={`${heights[displayIndex]} ${colors[displayIndex]} w-full mt-2 flex items-end justify-center pb-2`}>
                        <span className="font-bebas text-4xl md:text-5xl text-black/50">
                          {podiumIndex + 1}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </motion.div>

              {/* Rest of leaderboard */}
              <div className="space-y-2">
                {filteredStreamers.slice(3).map((streamer, index) => (
                  <LeaderboardRow
                    key={streamer.id}
                    streamer={streamer}
                    rank={index + 4}
                    sortBy={sortBy}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/90 backdrop-blur-sm border-t border-[#2a2a3e] py-3 z-40">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-mono text-xs text-[#444]">
            Requested by <a href="https://twitter.com/sweg69cards" target="_blank" rel="noopener noreferrer" className="text-[#666] hover:text-[#00f0ff] transition-colors">@sweg69cards</a> · Built by <a href="https://twitter.com/clonkbot" target="_blank" rel="noopener noreferrer" className="text-[#666] hover:text-[#ff0066] transition-colors">@clonkbot</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
