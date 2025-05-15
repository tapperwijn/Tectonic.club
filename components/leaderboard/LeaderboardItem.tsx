"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface LeaderboardItemProps {
  rank: number;
  username: string;
  score: number;
  avatar: string;
  previousRank: number;
  index: number;
}

const MotionDiv = motion.div;

const LeaderboardItem = ({
  rank,
  username,
  score,
  avatar,
  previousRank,
  index
}: LeaderboardItemProps) => {
  const rankChange = previousRank - rank;
  
  let rankIcon;
  let rankColor;
  
  if (rankChange > 0) {
    rankIcon = <TrendingUp className="h-4 w-4" />;
    rankColor = "text-green-500";
  } else if (rankChange < 0) {
    rankIcon = <TrendingDown className="h-4 w-4" />;
    rankColor = "text-red-500";
  } else {
    rankIcon = <Minus className="h-4 w-4" />;
    rankColor = "text-muted-foreground";
  }
  
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`flex items-center p-4 rounded-lg ${
        rank <= 3 ? "bg-card shadow-md" : "hover:bg-card/50"
      } transition-all duration-300`}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full mr-4">
        {rank <= 3 ? (
          <Trophy className={`h-5 w-5 ${
            rank === 1 ? "text-yellow-500" : 
            rank === 2 ? "text-slate-400" : 
            "text-amber-600"
          }`} />
        ) : (
          <span className="text-muted-foreground font-medium">{rank}</span>
        )}
      </div>
      
      <div className="relative w-10 h-10 rounded-full overflow-hidden mr-4">
        <Image
          src={avatar}
          alt={username}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="flex-grow">
        <div className="font-medium">{username}</div>
        <div className="text-sm text-muted-foreground">Score: {score}</div>
      </div>
      
      <div className={`flex items-center ${rankColor}`}>
        {rankIcon}
        <span className="ml-1 text-sm">{Math.abs(rankChange) || "-"}</span>
      </div>
    </MotionDiv>
  );
};

export default LeaderboardItem;