"use client";

import React, { useState } from "react";
import { Backpack, Sparkles, Shield, ExternalLink, Star } from "lucide-react";

export const LoadoutsView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<"ALL" | "RIFLES" | "SNIPERS" | "KNIVES" | "GLOVES">("ALL");

  const skins = [
    {
      id: "s1",
      name: "AK-47 | Asiimov",
      category: "RIFLES",
      wear: "Factory New",
      float: "0.0341",
      statTrak: true,
      stattrakKills: 1842,
      price: "$145.00",
      image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5lpKKqPrxN7LEmyVQ7MEpiLuSrYmnjQO3-UdsZGHyd4_Bd1RvM1-F_1Lowe3sg5W-6pnOnXcx7yInt37UnB3hgAYMMLIIPf0f0Q/360fx360f",
      rarity: "Covert",
      color: "#eb4b4b",
    },
    {
      id: "s2",
      name: "AWP | Dragon Lore",
      category: "SNIPERS",
      wear: "Minimal Wear",
      float: "0.0812",
      statTrak: false,
      price: "$8,500.00",
      image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FABz7PLfYQJS5NO0m5O0m_7zO6-fzj9V65R03erH9NWgigewr0Foam_3ddCRcQdtZgvV-1e_xLq-hp64vM_Nz3UxuSU8pSGKx6jXUf4/360fx360f",
      rarity: "Covert",
      color: "#eb4b4b",
    },
    {
      id: "s3",
      name: "Butterfly Knife | Doppler Phase 2",
      category: "KNIVES",
      wear: "Factory New",
      float: "0.0125",
      statTrak: true,
      stattrakKills: 412,
      price: "$2,200.00",
      image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJB-ditq42Ok_7hN7TFhGRf4cZ0nuz--YXygED6-kdoZ2_zLYDHclc9ZFiDr1W6k-rog8e_7sicyCRm6XZ3-z-DyG2w7R88/360fx360f",
      rarity: "Extraordinary",
      color: "#8650ac",
    },
    {
      id: "s4",
      name: "M4A1-S | Printstream",
      category: "RIFLES",
      wear: "Factory New",
      float: "0.0210",
      statTrak: true,
      stattrakKills: 890,
      price: "$340.00",
      image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITBhGJf_NZlmOzA-LP5gVO8v11rNmn7IdORIQc4NAvSq1Trw7rvhsfv6cidwSExuSN05HvbzAv330_5pYQd1A/360fx360f",
      rarity: "Covert",
      color: "#eb4b4b",
    },
    {
      id: "s5",
      name: "Sport Gloves | Vice",
      category: "GLOVES",
      wear: "Field-Tested",
      float: "0.1942",
      statTrak: false,
      price: "$1,850.00",
      image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GGqPr1Ibndk1RX6sl0te_A8InyjVW2-UQ-a2jyctOXclc-aV6B_VDtw7y8hpS-vszLn3tn7nFw7nndmgv3308F4m1Waw/360fx360f",
      rarity: "Extraordinary",
      color: "#8650ac",
    },
    {
      id: "s6",
      name: "Desert Eagle | Code Red",
      category: "RIFLES",
      wear: "Factory New",
      float: "0.0401",
      statTrak: true,
      stattrakKills: 230,
      price: "$95.00",
      image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PDdTjlH_86hkpi0m_7zO6-fzj9V65R03erH9NWgigewr0Foam_3ddCRcQdtZgvV-1e_xLq-hp64vM_Nz3UxuSU8pSGKx6jXUf4/360fx360f",
      rarity: "Covert",
      color: "#eb4b4b",
    },
  ];

  const filtered = skins.filter(s => {
    if (activeCategory === "ALL") return true;
    return s.category === activeCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-wide">CS2 Loadouts</h1>
          <p className="text-xs text-[#8f98a0] mt-1 font-mono">
            Steam Community Inventory & Movie Appearance
          </p>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 bg-[#141820] p-1 rounded-xl border border-[#2a475e]/70 text-xs">
          {(["ALL", "RIFLES", "SNIPERS", "KNIVES", "GLOVES"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeCategory === cat
                  ? "bg-[#2a475e] text-white"
                  : "text-[#8f98a0] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Skins */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((skin) => (
          <div
            key={skin.id}
            className="bg-[#181d24] border border-[#2a475e]/80 rounded-2xl p-4 shadow-xl hover:border-[#66c0f4] transition-all group relative overflow-hidden"
          >
            {/* Rarity top indicator */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ backgroundColor: skin.color }}
            />

            <div className="flex items-center justify-between text-xs text-[#8f98a0]">
              <span className="font-bold">{skin.wear}</span>
              {skin.statTrak && (
                <span className="text-[#ff7733] font-bold font-mono text-[10px] bg-[#ff7733]/10 px-1.5 py-0.5 rounded">
                  StatTrak™ {skin.stattrakKills}
                </span>
              )}
            </div>

            {/* Skin Image */}
            <div className="h-36 flex items-center justify-center my-2 p-2 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={skin.image}
                alt={skin.name}
                className="max-h-full object-contain filter drop-shadow-lg group-hover:scale-105 transition-transform"
              />
            </div>

            {/* Info */}
            <div className="border-t border-[#2a475e]/50 pt-3">
              <div className="font-black text-white text-sm group-hover:text-[#66c0f4] transition-colors">
                {skin.name}
              </div>
              <div className="flex items-center justify-between mt-2 text-xs">
                <span className="text-[#8f98a0] font-mono text-[11px]">
                  Float: {skin.float}
                </span>
                <span className="font-black text-[#a4d007] font-mono">
                  {skin.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
