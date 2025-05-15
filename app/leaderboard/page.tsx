"use client";

import { useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeaderboardItem from "@/components/leaderboard/LeaderboardItem";
import ScoreChart from "@/components/leaderboard/ScoreChart";

// Mock data for the leaderboard
const leaderboardData = [
  { rank: 1, username: "TectonicMaster", score: 9850, avatar: "https://i.pravatar.cc/150?img=1", previousRank: 1 },
  { rank: 2, username: "PuzzlePro", score: 9720, avatar: "https://i.pravatar.cc/150?img=2", previousRank: 3 },
  { rank: 3, username: "LogicWizard", score: 9680, avatar: "https://i.pravatar.cc/150?img=3", previousRank: 2 },
  { rank: 4, username: "GridSolver", score: 9550, avatar: "https://i.pravatar.cc/150?img=4", previousRank: 6 },
  { rank: 5, username: "NumberNinja", score: 9480, avatar: "https://i.pravatar.cc/150?img=5", previousRank: 4 },
  { rank: 6, username: "PatternMaster", score: 9320, avatar: "https://i.pravatar.cc/150?img=6", previousRank: 5 },
  { rank: 7, username: "TectonicThinker", score: 9260, avatar: "https://i.pravatar.cc/150?img=7", previousRank: 10 },
  { rank: 8, username: "GameChanger", score: 9190, avatar: "https://i.pravatar.cc/150?img=8", previousRank: 7 },
  { rank: 9, username: "MindBender", score: 9150, avatar: "https://i.pravatar.cc/150?img=9", previousRank: 9 },
  { rank: 10, username: "PuzzleKing", score: 9080, avatar: "https://i.pravatar.cc/150?img=10", previousRank: 8 },
];

// Mock weekly leaderboard data
const weeklyData = [
  { rank: 1, username: "GridSolver", score: 2150, avatar: "https://i.pravatar.cc/150?img=4", previousRank: 3 },
  { rank: 2, username: "TectonicThinker", score: 2080, avatar: "https://i.pravatar.cc/150?img=7", previousRank: 5 },
  { rank: 3, username: "LogicWizard", score: 1980, avatar: "https://i.pravatar.cc/150?img=3", previousRank: 1 },
  { rank: 4, username: "PuzzlePro", score: 1920, avatar: "https://i.pravatar.cc/150?img=2", previousRank: 2 },
  { rank: 5, username: "MindBender", score: 1880, avatar: "https://i.pravatar.cc/150?img=9", previousRank: 8 },
  { rank: 6, username: "TectonicMaster", score: 1750, avatar: "https://i.pravatar.cc/150?img=1", previousRank: 4 },
  { rank: 7, username: "PuzzleKing", score: 1720, avatar: "https://i.pravatar.cc/150?img=10", previousRank: 10 },
  { rank: 8, username: "PatternMaster", score: 1690, avatar: "https://i.pravatar.cc/150?img=6", previousRank: 6 },
  { rank: 9, username: "NumberNinja", score: 1650, avatar: "https://i.pravatar.cc/150?img=5", previousRank: 7 },
  { rank: 10, username: "GameChanger", score: 1620, avatar: "https://i.pravatar.cc/150?img=8", previousRank: 9 },
];

// Mock monthly leaderboard data
const monthlyData = [
  { rank: 1, username: "TectonicMaster", score: 8520, avatar: "https://i.pravatar.cc/150?img=1", previousRank: 2 },
  { rank: 2, username: "LogicWizard", score: 8350, avatar: "https://i.pravatar.cc/150?img=3", previousRank: 1 },
  { rank: 3, username: "PuzzlePro", score: 8220, avatar: "https://i.pravatar.cc/150?img=2", previousRank: 4 },
  { rank: 4, username: "GridSolver", score: 7980, avatar: "https://i.pravatar.cc/150?img=4", previousRank: 3 },
  { rank: 5, username: "GameChanger", score: 7820, avatar: "https://i.pravatar.cc/150?img=8", previousRank: 8 },
  { rank: 6, username: "NumberNinja", score: 7740, avatar: "https://i.pravatar.cc/150?img=5", previousRank: 5 },
  { rank: 7, username: "TectonicThinker", score: 7680, avatar: "https://i.pravatar.cc/150?img=7", previousRank: 6 },
  { rank: 8, username: "PatternMaster", score: 7520, avatar: "https://i.pravatar.cc/150?img=6", previousRank: 7 },
  { rank: 9, username: "PuzzleKing", score: 7480, avatar: "https://i.pravatar.cc/150?img=10", previousRank: 10 },
  { rank: 10, username: "MindBender", score: 7350, avatar: "https://i.pravatar.cc/150?img=9", previousRank: 9 },
];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("all-time");
  
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Leaderboard</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See who's mastering Tectonic puzzles and how you compare to the competition.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="all-time" onValueChange={setActiveTab}>
              <TabsList className="w-full grid grid-cols-3 mb-8">
                <TabsTrigger value="all-time">All Time</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all-time" className="space-y-4">
                {leaderboardData.map((player, index) => (
                  <LeaderboardItem
                    key={player.username}
                    rank={player.rank}
                    username={player.username}
                    score={player.score}
                    avatar={player.avatar}
                    previousRank={player.previousRank}
                    index={index}
                  />
                ))}
              </TabsContent>
              
              <TabsContent value="monthly" className="space-y-4">
                {monthlyData.map((player, index) => (
                  <LeaderboardItem
                    key={player.username}
                    rank={player.rank}
                    username={player.username}
                    score={player.score}
                    avatar={player.avatar}
                    previousRank={player.previousRank}
                    index={index}
                  />
                ))}
              </TabsContent>
              
              <TabsContent value="weekly" className="space-y-4">
                {weeklyData.map((player, index) => (
                  <LeaderboardItem
                    key={player.username}
                    rank={player.rank}
                    username={player.username}
                    score={player.score}
                    avatar={player.avatar}
                    previousRank={player.previousRank}
                    index={index}
                  />
                ))}
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-8">
            {/* Your ranking */}
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-4">Your Ranking</h3>
              <div className="flex items-center">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src="https://i.pravatar.cc/150?img=37"
                    alt="Your Avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Rank</div>
                  <div className="text-2xl font-bold">#42</div>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-sm text-muted-foreground">Score</div>
                  <div className="text-2xl font-bold">6,450</div>
                </div>
              </div>
            </div>
            
            {/* Score Chart */}
            <ScoreChart />
            
            {/* Statistics */}
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-4">Your Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Puzzles Solved</span>
                  <span className="font-medium">187</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average Time</span>
                  <span className="font-medium">3m 42s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fastest Solve</span>
                  <span className="font-medium">54s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Puzzles Created</span>
                  <span className="font-medium">12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}