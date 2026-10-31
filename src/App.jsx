import { useState, useEffect, useRef, useCallback } from "react";



const LOGO_DATA_URI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAQAElEQVR4AeydCaBOxf/Gz3v31b5T1iIppX1RtCCFSkRZ0kIblUihUEpSCW1EWlChhFb9pfpF2tBmSXbZ17vv7/95xj1v93L39zzffzE";

const ITEM_IMAGES = {};

// ── Custom coin flip face images (uploaded logos) ──
const COIN_IMG_T = "data:image/webp;base64,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";
const COIN_IMG_CT = "data:image/webp;base64,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";




// ── REDEEM CODES ──
const REDEEM_CODES = {
  "TEST":       [{ type:"item",    rarity:"Black Market" }],
  "WELCOME":    [{ type:"credits", amount:500 }],
  "BOOST":      [{ type:"xp",      amount:250 }],
  "LUCKY":      [{ type:"item",    rarity:"Exotic" }],
  "STARTER":    [{ type:"credits", amount:100 }, { type:"item", rarity:"Rare" }],
  "CHAMPION":   [{ type:"item",    rarity:"Import" }, { type:"item", rarity:"Very Rare" }],
  "JACKPOT":    [{ type:"item",    rarity:"Black Market" }, { type:"credits", amount:1000 }],
  "ADMIN2026":  [{ type:"admin" }],
};

const ITEMS = {
  bodies: ["Octane","Dominus","Fennec","Breakout","Plank","Merc","Paladin","Road Hog","Scarab","Backfire","Hogsticker","Gizmo","X-Devil","Venom","Armadillo","Hotshot","Zippy","Takumi","Aftershock","Mantis","Animus GP","Werewolf","Cyclone","Jager 619","Twinzer","Nimbus","Centio V17","Nexus SC","Triton","Proteus","Mudcat","Endo","Ronin","Marauder","Peregrine TT","Vulcan","Samurai","Komodo","Sentinel","Harbinger","Diestro","Imperator DT5","Insidio","Nexus","Takumi RX-T","R3MX","Hellcat","Outlaw","Maverick","Tygris","Animus","Interceptor","Tyranno","Astro","Ronin GXT"],
  wheels: ["Cristiano","OEM","Octane OEM","Dominus OEM","Tunica","Trident","Almas","Draco","Voltaic","Ara-51","Mandala","Dieci","Zomba","Dueling Dragons","Wonderment","Goldstone","Biomass","Dissolver","Infinium","Traction","Stern","Hypnotik","Komodo","Photon","Reactor","Chrono","Sparkle","Tempest","Rat Rod","Apparatus","Sub-Zero","Septem","Veloce","Avitus","BBS CH-R","Blender","Creeper","EKG-Om","Falco","Graphite","Hack Slo","Hatch","Helm","Hollow","Hyp","Jayvyn","Kato","Knuckle","Latte"],
  decals: ["Funnybook","Mainframe","20XX","Heatwave","Bubbly","Toon Sketch","Parallax","Chameleon","Labyrinth","Flowers","Ombre","Slipstream","Vector","Liquid Glass","Dragon Lord","Hexed","Lattice","Scorer","Stripes","Wet Paint","Distortion","Stellar","Pixel Fire","Grid Iron","Carbon Fiber","Stipple Gait","Tribal","Christmas Tree","RLCS","Tiger","Snakeskin","Camo","Lightning","Neon Demon","Octagon","Stars","Tidal Stream","Biomass","Halo","Cobalt","Crimson","Forest Green","Lime","Orange","Pink","Purple","Saffron"],
  boosts: ["Ion","Plasma","Nitrous","Carbonated","Treasure","Hypnotik","Toon Smoke","Bubbly","Fireworks","Proton","Disco Beat Down","Carnival","Waterfall","Dust Cloud","Shockwave","Confetti","Electroshock","Standard","Burnout","Popcorn","Pixels","Toon RLCS","Sparkles","Cupcake","Mushroom Cloud","Nuke","Party Favor","Rainbow","Rubber Ducks","Spring Flowers","Sugar Plum","Afterburner","Biomass","Candy Corn","Easter Eggs","Flamethrower","Glitch","Hammers","Holy Light","Laser Wave","Nitrogen"],
  toppers: ["Antlers","Police Hat","Elf Hat","Top Hat","Crown","Foam Finger","Camo Cap","Bowler","Dragon","Unicorn","Tiara","Party Hat","Devil Horns","Cowboy Hat","Propeller Hat","Wrestling Mask","Cat Ears","Halo","Chicken Hat","Baseball Cap","Beach Party","Birthday Cake","Blitzen","Bomb","Bowler Hat","Chainsaw","Championship Ring","Christmas Tree","Classic Top Hat","Coco","Deerstalker","Derby","Foam Hat","Fuzzy Hat","Giant Bow","Graduation Cap","Hard Hat","Ivy Cap","Jester","Joker Hat","Knight Helmet","Lightning","Mailbox","Moo Hat"],
  antennas: ["Disco Ball","8-Ball","Flame","Pixel Art","Rocket","Balloon Dog","Lightning","Globe","Atom","Crystal Ball","Sunflower","Satellite","Comet","Cube","Jellyfish","Pretzel","Cupcake","Donut","Pizza Slice","Ice Cream","Cactus","Cauldron","Chick","Christmas Tree","Cloud","Coffee","Compass","Crab","Daisy","Deadball","Diamond","Dragon","Duck","Earth","Eye","Fish","Football","Frog","Gift","Golf Ball","Grapes","Hamburger","Heart","Hockey Puck","Hot Dog","Korvina","Lemon","Lobster","Lollipop","Maple Leaf"],
  trails: ["Carbon","Laser Wave I","Plasma","Rainbow","Speed Force","Sugar Rush","Confetti","Laser Wave III","Vortex","Butterscotch","Fire God","Sunburst","Flower Power","Tiger","Stardust","Thunderstorm","Standard","Nitrous","Breakdown","Carnival","Chameleon","Cherry Blossom","Cristiano","Crystal","Dragon","Fire","Fireworks","Galaxy","Hearts","Holographic","Hypnotik","Ice","Jungle","Laser Burst","Lightning","Magic Carpet","Northern Lights","Radioactive","Snow","Snowflakes","Solar Flare","Sparkle","Spring","Sunshine","Swirl"],
  goalExplosions: ["Standard","Shockwave","Carpet Bomb","Party Time","Electroshock","Hellfire","Victory","Beach Party","Supernova","Confetti","Atomizer","Big Splash","Polarity","Singularity","20XX","Toon RLCS","Dueling Dragons","Fireworks","Astral","Biomass","Bubbly","Dissolver","Dunk House","Force Feedback","God of Thunder","Gravity Bomb","Hyper Strike","Jurassic","Liberty","Mainframe","Meteor Storm","Neuro-Agitator","Nucleon","Reaper","Rocket League","Scorer","Shockwave S2","Slipstream","Tidal Stream","Toon Bomb"],
  paintFinishes: ["Standard","Metallic","Carbon Fiber","Toon","Matte","Glossy","Anodized","Anodized Pearl","Galvanized","Pearlescent","Brushed Metal","Carabiner","Forged","Neon","Dino","Toon Flame","Tigered Fur","Stipple"],
  playerBanners: ["Classic","Flames","Galaxy","Haunted","Holiday","RLCS","Rocket League","Starbase ARC","Summer Games","Tournaments","Vacation","Victory","Winter Games","World Championship","Fade","Grid","Stars","Stripes","Waves","Zigzag","Aurora","Cosmos","Dark Matter","Interstellar","Nebula","Solar"],
};
const ITEM_TYPES = Object.keys(ITEMS);

const RARITIES = [
  { name:"Common",       color:"#b0b0b0", weight:55,  valueRange:[3,12]      },
  { name:"Uncommon",     color:"#5bc8f5", weight:25,  valueRange:[12,35]     },
  { name:"Rare",         color:"#4169e1", weight:10,  valueRange:[35,100]    },
  { name:"Deluxe",       color:"#ff7518", weight:7,   valueRange:[95,150]    },
  { name:"Very Rare",    color:"#9b59b6", weight:5,   valueRange:[150,280]   },
  { name:"Import",       color:"#e74c3c", weight:3,   valueRange:[280,650]   },
  { name:"Exotic",       color:"#f39c12", weight:1.5, valueRange:[1200,3000] },
  { name:"Black Market", color:"#ff69b4", weight:0.5, valueRange:[3000,7500] },
];

function getDiscountPeriod() {
  const periodMs = 8 * 60 * 60 * 1000;
  const period = Math.floor(Date.now() / periodMs);
  const allIds = ["triumph","zyphr","vindicator","nitro","golden_gift","champions","season","legacy","titanium","reactor","overdrive","elevation"];
  const a = allIds[(period * 3) % allIds.length];
  const b = allIds[(period * 7 + 2) % allIds.length];
  return { ids: [a, b], msUntilNext: periodMs - (Date.now() % periodMs) };
}

const RANK_TIERS = [
  { name:"Bronze",           color:"#cd7f32", levels:[1,2,3,4]     },
  { name:"Silver",           color:"#c0c0c0", levels:[5,6,7,8]     },
  { name:"Gold",             color:"#FFD700", levels:[9,10,11,12]  },
  { name:"Platinum",         color:"#00cfff", levels:[13,14,15,16] },
  { name:"Diamond",          color:"#7ec8e3", levels:[17,18,19,20] },
  { name:"Champion",         color:"#a855f7", levels:[21,22,23,24] },
  { name:"Grand Champion",   color:"#f43f5e", levels:[25,26,27,28,29,30] },
  { name:"Supersonic Legend",color:"#FFD700", levels:[31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50] },
];

function getRankInfo(level) {
  if (level >= 50) return { display:"Supersonic Legend", sub:"Max Rank", color:"#FFD700" };
  for (const tier of RANK_TIERS) {
    if (tier.levels.includes(level)) {
      const idx = tier.levels.indexOf(level);
      const divNum = (idx % 3) + 1;
      if (tier.name === "Supersonic Legend") return { display:"Supersonic Legend", sub:`Division ${divNum}`, color:tier.color };
      const romanI = ["I","II","III","IV"][Math.floor(idx / 3)] || "I";
      return { display:`${tier.name} ${romanI}`, sub:`Division ${divNum}`, color:tier.color };
    }
  }
  return { display:"Bronze I", sub:"Division 1", color:"#cd7f32" };
}

function RankIcon({ color, size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <polygon points="10,1 12.9,7 20,7.6 14.5,12.5 16.2,19.5 10,15.8 3.8,19.5 5.5,12.5 0,7.6 7.1,7" fill={color} opacity="0.92"/>
    </svg>
  );
}

const CRATE_TYPES = [
  { id:"common",       name:"Rookie Crate",        cost:10,    tier:"NORMAL CRATES",   rarityBoost:0, levelReq:1,  minRarity:0, maxRarity:0, boostFactor:0.3 },
  { id:"rare_drop",    name:"Recruit Crate",       cost:25,    tier:"NORMAL CRATES",   rarityBoost:1, levelReq:1,  minRarity:0, maxRarity:1, boostFactor:0.3 },
  { id:"very_rare",    name:"Squad Crate",         cost:50,    tier:"NORMAL CRATES",   rarityBoost:2, levelReq:1,  minRarity:0, maxRarity:2, boostFactor:0.3 },
  { id:"import",       name:"Vanguard Crate",      cost:75,    tier:"NORMAL CRATES",   rarityBoost:3, levelReq:1,  minRarity:0, maxRarity:3, boostFactor:0.3 },
  { id:"exotic",       name:"Phoenix Crate",       cost:200,   tier:"NORMAL CRATES",   rarityBoost:3, levelReq:20, minRarity:0, maxRarity:4, boostFactor:0.25 },
  { id:"black_market", name:"Eclipse Crate",       cost:400,   tier:"NORMAL CRATES",   rarityBoost:4, levelReq:30, minRarity:0, maxRarity:5, boostFactor:0.15 },
  { id:"champions",    name:"Champions Crate",      cost:600,   tier:"BIG CRATES",      rarityBoost:4, levelReq:15, minRarity:2 },
  { id:"triumph",      name:"Triumph Crate",        cost:800,   tier:"BIG CRATES",      rarityBoost:4, levelReq:18, minRarity:2 },
  { id:"season",       name:"Season Crate",         cost:1200,  tier:"BIG CRATES",      rarityBoost:5, levelReq:22, minRarity:4 },
  { id:"zyphr",        name:"Zyphr Crate",          cost:1700,  tier:"BIG CRATES",      rarityBoost:6, levelReq:26, minRarity:4 },
  { id:"legacy",       name:"Legacy Crate",         cost:2500,  tier:"BIG CRATES",      rarityBoost:6, levelReq:30, minRarity:4 },
  { id:"vindicator",   name:"Vindicator Crate",     cost:4000,  tier:"BIG CRATES",      rarityBoost:7, levelReq:35, minRarity:5 },
  { id:"titanium",     name:"Titanium White Drop",  cost:6000,  tier:"SUPER CRATES",    rarityBoost:6, levelReq:38, minRarity:5 },
  { id:"reactor",      name:"Reactor Crate",        cost:8000,  tier:"SUPER CRATES",    rarityBoost:7, levelReq:40, minRarity:5 },
  { id:"nitro",        name:"Nitro Crate",          cost:10000, tier:"SUPER CRATES",    rarityBoost:7, levelReq:42, minRarity:6 },
  { id:"overdrive",    name:"Overdrive Crate",      cost:15000, tier:"SUPER CRATES",    rarityBoost:7, levelReq:45, minRarity:6 },
  { id:"elevation",    name:"Elevation Crate",      cost:20000, tier:"SUPER CRATES",    rarityBoost:7, levelReq:48, minRarity:6 },
  { id:"golden_gift",  name:"Golden Gift",          cost:25000, tier:"SUPER CRATES",    rarityBoost:7, levelReq:50, minRarity:7 },
];

const ACHIEVEMENTS = [
  { id:"first_click",  name:"First Step",      desc:"Click the screen for the first time",   reward:5,   check:s=>s.totalClicks>=1       },
  { id:"clicks_100",   name:"Getting Started", desc:"Click 100 times",                       reward:10,  check:s=>s.totalClicks>=100     },
  { id:"clicks_1000",  name:"Dedicated",       desc:"Click 1,000 times",                     reward:25,  check:s=>s.totalClicks>=1000    },
  { id:"clicks_10000", name:"Machine",         desc:"Click 10,000 times",                    reward:75,  check:s=>s.totalClicks>=10000   },
  { id:"level_5",      name:"Level 5",         desc:"Reach level 5",                         reward:20,  check:s=>s.level>=5             },
  { id:"level_10",     name:"Level 10",        desc:"Reach level 10",                        reward:40,  check:s=>s.level>=10            },
  { id:"level_25",     name:"Level 25",        desc:"Reach level 25",                        reward:100, check:s=>s.level>=25            },
  { id:"level_max",    name:"Max Level",       desc:"Reach level 50",                        reward:300, check:s=>s.level>=50            },
  { id:"first_crate",  name:"First Crate",     desc:"Open your first crate",                 reward:5,   check:s=>s.totalCratesOpened>=1 },
  { id:"crates_10",    name:"Crate Addict",    desc:"Open 10 crates",                        reward:15,  check:s=>s.totalCratesOpened>=10},
  { id:"crates_50",    name:"Crate Hoarder",   desc:"Open 50 crates",                        reward:40,  check:s=>s.totalCratesOpened>=50},
  { id:"crates_100",   name:"Crate Fanatic",   desc:"Open 100 crates",                       reward:100, check:s=>s.totalCratesOpened>=100},
  { id:"first_item",   name:"Collector",       desc:"Get your first item",                   reward:5,   check:s=>s.inventory.length>=1  },
  { id:"items_25",     name:"Item Hoarder",    desc:"Have 25 items in inventory",            reward:20,  check:s=>s.inventory.length>=25 },
  { id:"items_100",    name:"Full Garage",     desc:"Have 100 items in inventory",           reward:60,  check:s=>s.inventory.length>=100},
  { id:"first_bm",     name:"Black Market",    desc:"Obtain a Black Market item",            reward:80,  check:s=>s.inventory.some(i=>i.rarity==="Black Market")},
  { id:"first_exotic", name:"Exotic Taste",    desc:"Obtain an Exotic item",                 reward:30,  check:s=>s.inventory.some(i=>i.rarity==="Exotic")},
  { id:"sell_first",   name:"First Sale",      desc:"Sell your first item",                  reward:5,   check:s=>s.totalSold>=1         },
  { id:"sell_1000",    name:"Salesman",        desc:"Earn 1,000 credits from selling",       reward:25,  check:s=>s.totalSellEarnings>=1000},
  { id:"credits_500",  name:"Getting Rich",    desc:"Have 500 credits at once",              reward:10,  check:s=>s.credits>=500         },
  { id:"credits_10000",name:"Loaded",          desc:"Have 10,000 credits at once",           reward:50,  check:s=>s.credits>=10000       },
  { id:"flip_win",     name:"Heads or Tails",  desc:"Win a coin flip",                       reward:10,  check:s=>s.totalFlipWins>=1     },
  { id:"flip_5",       name:"Lucky Streak",    desc:"Win 5 coin flips",                      reward:25,  check:s=>s.totalFlipWins>=5     },
  { id:"flip_25",      name:"Coin Flip Master",desc:"Win 25 coin flips",                     reward:80,  check:s=>s.totalFlipWins>=25    },
  { id:"wheel_spin",   name:"First Spin",      desc:"Spin the Lucky Wheel",                  reward:5,   check:s=>s.totalWheelSpins>=1   },
];

const LEVEL_XP = [
  0,100,210,330,460,600,750,910,1080,1260,
  1450,1650,1860,2080,2310,2550,2800,3060,3330,3610,
  3900,4200,4510,4830,5160,5500,5850,6210,6580,6960,
  7350,7750,8160,8580,9010,9450,9900,10360,10830,11310,
  11800,12300,12810,13330,13860,14400,14950,15510,16080,16660,
];
const MAX_LEVEL = 50;
const XP_PER_CLICK = 0.25;

function getLevelEarnings(level) { return parseFloat((0.05+(level-1)*0.04).toFixed(2)); }

function rollRarity(rarityBoost=0, minRarity=0, maxRarity=RARITIES.length-1, boostFactor=0.3) {
  const weights=RARITIES.map((r,i)=>{
    if(i < minRarity || i > maxRarity) return 0;
    return i < rarityBoost ? r.weight*boostFactor : r.weight;
  });
  const total=weights.reduce((s,w)=>s+w,0);
  let roll=Math.random()*total;
  for(let i=0;i<RARITIES.length;i++){roll-=weights[i];if(roll<=0&&weights[i]>0)return RARITIES[i];}
  return RARITIES[Math.max(minRarity,0)];
}
function rollItem(rarityBoost=0, minRarity=0, maxRarity=RARITIES.length-1, boostFactor=0.3) {
  const rarity=rollRarity(rarityBoost, minRarity, maxRarity, boostFactor);
  const type=ITEM_TYPES[Math.floor(Math.random()*ITEM_TYPES.length)];
  const name=ITEMS[type][Math.floor(Math.random()*ITEMS[type].length)];
  const typeLabel=type.charAt(0).toUpperCase()+type.slice(1).replace(/([A-Z])/g,' $1').trim();
  const value=Math.floor(rarity.valueRange[0]+Math.random()*(rarity.valueRange[1]-rarity.valueRange[0]));
  return {id:Date.now()+Math.random(),name:typeLabel+": "+name,rarity:rarity.name,rarityColor:rarity.color,value,locked:false,type:typeLabel,itemName:name};
}
function rollBetterItem(baseItem) {
  // Coin-flip win reward: a brand-new, randomly chosen item (any type/name — not tied to
  // the item that was bet), with a rarity tier equal to or better than the bet item's rarity,
  // and always with a strictly higher value than the original.
  const baseRarityIndex=RARITIES.findIndex(r=>r.name===baseItem.rarity);
  const maxRarityIndex=Math.min(baseRarityIndex+1,RARITIES.length-1);
  const allowedRarities=RARITIES.slice(baseRarityIndex,maxRarityIndex+1);
  const total=allowedRarities.reduce((s,r)=>s+r.weight,0);
  let roll=Math.random()*total; let chosenRarity=allowedRarities[0];
  for(let i=0;i<allowedRarities.length;i++){roll-=allowedRarities[i].weight;if(roll<=0){chosenRarity=allowedRarities[i];break;}}
  const type=ITEM_TYPES[Math.floor(Math.random()*ITEM_TYPES.length)];
  const name=ITEMS[type][Math.floor(Math.random()*ITEMS[type].length)];
  const typeLabel=type.charAt(0).toUpperCase()+type.slice(1).replace(/([A-Z])/g,' $1').trim();
  const minValue=Math.max(chosenRarity.valueRange[0],Math.floor(baseItem.value*1.05)+1);
  const maxValue=Math.max(chosenRarity.valueRange[1],minValue);
  const value=minValue>=maxValue?maxValue:Math.floor(minValue+Math.random()*(maxValue-minValue));
  return {id:Date.now()+Math.random(),name:typeLabel+": "+name,rarity:chosenRarity.name,rarityColor:chosenRarity.color,value,locked:false,type:typeLabel,itemName:name};
}

// Build every possible item in game (for Admin2026)
function getAllItems() {
  const items = [];
  ITEM_TYPES.forEach(type => {
    const typeLabel = type.charAt(0).toUpperCase()+type.slice(1).replace(/([A-Z])/g,' $1').trim();
    ITEMS[type].forEach(name => {
      // Give each a random rarity weighted toward higher end for admin
      const rarity = RARITIES[Math.floor(Math.random()*RARITIES.length)];
      const value = Math.floor(rarity.valueRange[0]+Math.random()*(rarity.valueRange[1]-rarity.valueRange[0]));
      items.push({id:Date.now()+Math.random()+Math.random()*9999,name:typeLabel+": "+name,rarity:rarity.name,rarityColor:rarity.color,value,locked:false,type:typeLabel,itemName:name});
    });
  });
  return items;
}

const WHEEL_SEGMENTS=[
  {label:"+10 XP",type:"xp",value:10,color:"#8b5cf6",textColor:"#fff",weight:18},
  {label:"+€20",type:"money",value:20,color:"#16a34a",textColor:"#fff",weight:16},
  {label:"+€50",type:"money",value:50,color:"#15803d",textColor:"#fff",weight:14},
  {label:"Try Again",type:"none",value:0,color:"#374151",textColor:"#9ca3af",weight:18},
  {label:"+€100",type:"money",value:100,color:"#166534",textColor:"#fff",weight:8},
  {label:"+25 XP",type:"xp",value:25,color:"#7c3aed",textColor:"#fff",weight:10},
  {label:"EXOTIC!",type:"item",rarity:"Exotic",color:"#b45309",textColor:"#fde68a",weight:2},
  {label:"+€200",type:"money",value:200,color:"#14532d",textColor:"#fbbf24",weight:5},
  {label:"BLACK MKT!",type:"item",rarity:"Black Market",color:"#831843",textColor:"#f9a8d4",weight:0.5},
  {label:"+€10",type:"money",value:10,color:"#166534",textColor:"#fff",weight:16},
];
const SEG_COUNT=WHEEL_SEGMENTS.length;
const SEG_ANGLE=(2*Math.PI)/SEG_COUNT;

function drawWheel(canvas,rotation){
  if(!canvas)return;
  const ctx=canvas.getContext("2d");
  const W=canvas.width,H=canvas.height,cx=W/2,cy=H/2,r=Math.min(cx,cy)-12;
  ctx.clearRect(0,0,W,H);
  WHEEL_SEGMENTS.forEach((seg,i)=>{
    const start=rotation+i*SEG_ANGLE-Math.PI/2,end=start+SEG_ANGLE;
    ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,start,end);ctx.closePath();
    ctx.fillStyle=seg.color;ctx.fill();ctx.strokeStyle="#0d0d0d";ctx.lineWidth=2;ctx.stroke();
    ctx.save();ctx.translate(cx,cy);ctx.rotate(start+SEG_ANGLE/2);
    ctx.textAlign="right";ctx.fillStyle=seg.textColor;ctx.font="bold 11px 'Segoe UI',sans-serif";
    ctx.fillText(seg.label,r-14,4);ctx.restore();
  });
  ctx.beginPath();ctx.arc(cx,cy,16,0,Math.PI*2);ctx.fillStyle="#111";ctx.fill();ctx.strokeStyle="#333";ctx.lineWidth=2;ctx.stroke();
  ctx.beginPath();ctx.moveTo(cx-11,0);ctx.lineTo(cx+11,0);ctx.lineTo(cx,24);ctx.closePath();
  ctx.fillStyle="#FFD700";ctx.strokeStyle="#000";ctx.lineWidth=1;ctx.fill();ctx.stroke();
}

const INITIAL_STATE={credits:0,xp:0,level:1,inventory:[],totalClicks:0,lastWheelSpin:0,totalCratesOpened:0,totalSold:0,totalSellEarnings:0,totalFlipWins:0,totalWheelSpins:0,claimedAchievements:[],redeemedCodes:[],createdAt:Date.now(),isAdmin:false};
function loadState(){
  try{
    const s=localStorage.getItem("rl_clicker_v7");
    if(s){const merged={...INITIAL_STATE,...JSON.parse(s)};if(!merged.createdAt)merged.createdAt=Date.now();return merged;}
  }catch{}
  return INITIAL_STATE;
}
function saveState(s){try{localStorage.setItem("rl_clicker_v7",JSON.stringify(s));}catch{}}

const PLAYER_KEY="rl_clicker_player_v1";
function loadPlayer(){
  try{const s=localStorage.getItem(PLAYER_KEY);if(s)return JSON.parse(s);}catch{}
  const np={name:"Player #"+Math.floor(1000+Math.random()*9000),isAdmin:false};
  try{localStorage.setItem(PLAYER_KEY,JSON.stringify(np));}catch{}
  return np;
}
function savePlayer(p){try{localStorage.setItem(PLAYER_KEY,JSON.stringify(p));}catch{}}

const SETTINGS_KEY="rl_clicker_settings_v1";
const DEFAULT_SETTINGS={autosave:true,autosaveIntervalSec:90,confirmSell:false,reduceMotion:false,showFloatingNumbers:true,accentColor:"#4caf50",soundEnabled:true,soundVolume:0.5};
const ACCENT_PRESETS=[
  {name:"Rocket Green", color:"#4caf50"},
  {name:"Boost Blue",   color:"#3b82f6"},
  {name:"Goal Orange",  color:"#f97316"},
  {name:"Exotic Gold",  color:"#f4b400"},
  {name:"Black Market", color:"#ff69b4"},
  {name:"Import Red",   color:"#e74c3c"},
  {name:"Very Rare Purple", color:"#9b59b6"},
];

let _audioCtx=null;
function getAudioCtx(){
  if(_audioCtx)return _audioCtx;
  try{ _audioCtx=new (window.AudioContext||window.webkitAudioContext)(); }catch{ _audioCtx=null; }
  return _audioCtx;
}
function playTone(freq=440,duration=0.09,type="sine",volume=0.2,delay=0){
  const ctx=getAudioCtx();
  if(!ctx)return;
  try{
    if(ctx.state==="suspended")ctx.resume();
    const t0=ctx.currentTime+delay;
    const osc=ctx.createOscillator();
    const gain=ctx.createGain();
    osc.type=type; osc.frequency.setValueAtTime(freq,t0);
    gain.gain.setValueAtTime(volume,t0);
    gain.gain.exponentialRampToValueAtTime(0.0001,t0+duration);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(t0); osc.stop(t0+duration+0.02);
  }catch{}
}
const SOUND_PRESETS={
  click:[{f:660,d:0.06,t:"triangle"}],
  crateOpen:[{f:300,d:0.1,t:"sawtooth"},{f:500,d:0.12,t:"sawtooth",delay:0.08}],
  itemCommon:[{f:420,d:0.1,t:"sine"}],
  itemRare:[{f:520,d:0.1,t:"sine"},{f:660,d:0.12,t:"sine",delay:0.07}],
  itemEpic:[{f:600,d:0.1,t:"square"},{f:760,d:0.12,t:"square",delay:0.06},{f:900,d:0.15,t:"square",delay:0.13}],
  levelUp:[{f:520,d:0.1,t:"triangle"},{f:660,d:0.1,t:"triangle",delay:0.09},{f:880,d:0.18,t:"triangle",delay:0.18}],
  win:[{f:660,d:0.1,t:"triangle"},{f:880,d:0.16,t:"triangle",delay:0.1}],
  lose:[{f:260,d:0.18,t:"sawtooth"},{f:180,d:0.22,t:"sawtooth",delay:0.12}],
  redeem:[{f:740,d:0.08,t:"sine"},{f:980,d:0.12,t:"sine",delay:0.08}],
  admin:[{f:880,d:0.1,t:"sine"},{f:1100,d:0.12,t:"sine",delay:0.08},{f:1320,d:0.18,t:"sine",delay:0.18},{f:1760,d:0.22,t:"triangle",delay:0.32}],
};
function playSound(name,volume){
  const notes=SOUND_PRESETS[name];
  if(!notes)return;
  notes.forEach(n=>playTone(n.f,n.d,n.t,(volume??0.5)*0.6,n.delay||0));
}
function fireSound(name){
  const s=loadSettings();
  if(!s.soundEnabled)return;
  playSound(name,s.soundVolume??0.5);
}
function loadSettings(){
  try{
    const s=localStorage.getItem(SETTINGS_KEY);
    if(s){
      const merged={...DEFAULT_SETTINGS,...JSON.parse(s)};
      if(!merged.autosaveIntervalSec || merged.autosaveIntervalSec<30){merged.autosaveIntervalSec=DEFAULT_SETTINGS.autosaveIntervalSec;saveSettings(merged);}
      return merged;
    }
  }catch{}
  return DEFAULT_SETTINGS;
}
function saveSettings(s){try{localStorage.setItem(SETTINGS_KEY,JSON.stringify(s));}catch{}}

const SAVES_KEY="rl_clicker_saves_v1";
const SAVE_SLOT_IDS=["slot1","slot2","slot3","slot4"];
function loadAllSaves(){try{const s=localStorage.getItem(SAVES_KEY);if(s)return JSON.parse(s);}catch{}return {};}
function persistAllSaves(saves){try{localStorage.setItem(SAVES_KEY,JSON.stringify(saves));}catch{}}

function generateStars(count=90){
  return Array.from({length:count},(_,i)=>{
    const s1=(i*7919+31337)%10000,s2=(i*6271+13337)%10000,s3=(i*3571+99991)%10000;
    const s4=(i*9001+42069)%10000,s5=(i*2333+55555)%10000;
    return{x:(s1/10000)*100,y:(s2/10000)*100,w:i%10===0?4:i%5===0?3.5:i%3===0?3:2.5,speed:0.15+(s3/10000)*0.35,opacity:0.18+(s4/10000)*0.55,driftX:((s5/10000)-0.5)*0.08};
  });
}
const STAR_DATA=generateStars(90);
function StarField({reduceMotion}){
  const canvasRef=useRef(null),starsRef=useRef(STAR_DATA.map(s=>({...s}))),rafRef=useRef(null);
  useEffect(()=>{
    const canvas=canvasRef.current;if(!canvas)return;
    const ctx=canvas.getContext("2d");let W=canvas.offsetWidth,H=canvas.offsetHeight;
    canvas.width=W;canvas.height=H;
    const resize=()=>{W=canvas.offsetWidth;H=canvas.offsetHeight;canvas.width=W;canvas.height=H;};
    window.addEventListener("resize",resize);
    const draw=()=>{
      ctx.clearRect(0,0,W,H);
      starsRef.current.forEach(star=>{
        if(!reduceMotion){star.y-=star.speed*0.25;star.x+=star.driftX;}
        if(star.y<-1){star.y=101;star.x=Math.random()*100;}
        if(star.x<-1)star.x=101;if(star.x>101)star.x=-1;
        ctx.globalAlpha=star.opacity;ctx.fillStyle="#fff";
        ctx.fillRect((star.x/100)*W,(star.y/100)*H,star.w,star.w);
      });
      ctx.globalAlpha=1;rafRef.current=requestAnimationFrame(draw);
    };
    draw();return()=>{cancelAnimationFrame(rafRef.current);window.removeEventListener("resize",resize);};
  },[reduceMotion]);
  return <canvas ref={canvasRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}/>;
}

function DiscountTimer(){
  const [ms,setMs]=useState(()=>getDiscountPeriod().msUntilNext);
  useEffect(()=>{const t=setInterval(()=>setMs(getDiscountPeriod().msUntilNext),1000);return()=>clearInterval(t);},[]);
  const h=Math.floor(ms/3600000),m=Math.floor((ms%3600000)/60000),s=Math.floor((ms%60000)/1000);
  const p=n=>String(n).padStart(2,"0");
  return <span style={{fontSize:11,color:"var(--accent)",fontVariantNumeric:"tabular-nums"}}>{p(h)}:{p(m)}:{p(s)}</span>;
}

function getRarityCardBg(rarityColor) {
  return `radial-gradient(ellipse at 50% 110%, ${rarityColor}55 0%, ${rarityColor}22 35%, #0e0e18 70%)`;
}
function getRarityCardBorder(rarityColor) {
  return `1px solid ${rarityColor}88`;
}
function getRarityGlow(rarityColor) {
  return `0 0 12px ${rarityColor}44, inset 0 0 24px ${rarityColor}18`;
}

function BMSparkle({size=140}) {
  const canvasRef=useRef(null);
  const particlesRef=useRef([]);
  const rafRef=useRef(null);
  useEffect(()=>{
    const canvas=canvasRef.current;if(!canvas)return;
    const ctx=canvas.getContext("2d");
    canvas.width=size;canvas.height=size;
    particlesRef.current=Array.from({length:28},()=>({
      x:Math.random()*size, y:Math.random()*size,
      vx:(Math.random()-0.5)*0.6, vy:(Math.random()-0.5)*0.6,
      life:Math.random(), maxLife:0.6+Math.random()*0.6,
      size:0.8+Math.random()*2.2,
      hue:300+Math.random()*60,
    }));
    const draw=()=>{
      ctx.clearRect(0,0,size,size);
      particlesRef.current.forEach(p=>{
        p.life+=0.012;
        if(p.life>p.maxLife){p.life=0;p.x=Math.random()*size;p.y=Math.random()*size;p.vx=(Math.random()-0.5)*0.6;p.vy=(Math.random()-0.5)*0.6;p.maxLife=0.6+Math.random()*0.6;p.size=0.8+Math.random()*2.2;}
        p.x+=p.vx;p.y+=p.vy;
        const alpha=Math.sin((p.life/p.maxLife)*Math.PI);
        ctx.save();ctx.translate(p.x,p.y);ctx.globalAlpha=alpha*0.85;
        ctx.fillStyle=`hsl(${p.hue},100%,75%)`;ctx.shadowColor=`hsl(${p.hue},100%,80%)`;ctx.shadowBlur=4;
        const s=p.size;
        ctx.beginPath();ctx.moveTo(0,-s*2);ctx.lineTo(s*0.4,-s*0.4);ctx.lineTo(s*2,0);ctx.lineTo(s*0.4,s*0.4);ctx.lineTo(0,s*2);ctx.lineTo(-s*0.4,s*0.4);ctx.lineTo(-s*2,0);ctx.lineTo(-s*0.4,-s*0.4);ctx.closePath();ctx.fill();ctx.restore();
      });
      rafRef.current=requestAnimationFrame(draw);
    };
    draw();return()=>cancelAnimationFrame(rafRef.current);
  },[size]);
  return <canvas ref={canvasRef} width={size} height={size} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:1}}/>;
}

function ItemCard({item, size="normal", onSell, onLock, showActions=true, count}) {
  const rarityData = RARITIES.find(r=>r.name===item.rarity)||RARITIES[0];
  const isBlackMarket = item.rarity==="Black Market";
  const imgUrl = ITEM_IMAGES[item.itemName||item.name?.split(": ")[1]];
  const cardW = size==="large" ? 160 : size==="small" ? 100 : 140;
  const imgH = size==="large" ? 110 : size==="small" ? 60 : 88;

  return (
    <div style={{position:"relative",width:cardW,background:getRarityCardBg(rarityData.color),border:getRarityCardBorder(rarityData.color),borderRadius:10,boxShadow:getRarityGlow(rarityData.color),overflow:"hidden",flexShrink:0}}>
      {isBlackMarket && <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,#ff69b4,#fff,#ff69b4,transparent)`,animation:"bmShimmer 2s linear infinite",zIndex:3}}/>}
      {isBlackMarket && <BMSparkle size={cardW}/>}
      {count && count > 1 && <div style={{position:"absolute",top:6,right:6,zIndex:5,background:"rgba(0,0,0,0.7)",border:`1px solid ${rarityData.color}88`,borderRadius:4,padding:"1px 5px",fontSize:10,fontWeight:700,color:"#fff"}}>{count}</div>}
      {onLock && <button onClick={()=>onLock(item.id)} style={{position:"absolute",top:6,left:6,zIndex:5,background:item.locked?"rgba(76,175,80,0.25)":"rgba(0,0,0,0.5)",border:`1px solid ${item.locked?"var(--accent)":"#333"}`,borderRadius:"50%",width:20,height:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:0}}><LockIcon locked={item.locked} size={11}/></button>}
      <div style={{position:"relative",width:"100%",height:imgH,display:"flex",alignItems:"center",justifyContent:"center",background:`radial-gradient(ellipse at 50% 50%, ${rarityData.color}28 0%, transparent 70%)`,zIndex:2}}>
        {imgUrl ? <img src={imgUrl} alt={item.itemName||""} style={{maxWidth:"90%",maxHeight:"90%",objectFit:"contain",filter:`drop-shadow(0 0 8px ${rarityData.color}88)`,position:"relative",zIndex:2}} onError={e=>{e.currentTarget.style.display="none";e.currentTarget.nextSibling.style.display="flex";}}/> : null}
        <div style={{display:imgUrl?"none":"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",position:imgUrl?"absolute":"relative",zIndex:2}}>
          <TypeIcon type={item.type} size={size==="small"?28:42} color={rarityData.color}/>
        </div>
      </div>
      <div style={{padding:size==="small"?"4px 6px":"6px 8px",zIndex:2,position:"relative"}}>
        <div style={{fontSize:size==="small"?8:9,color:rarityData.color,fontWeight:700,textTransform:"uppercase",letterSpacing:0.8,marginBottom:2,lineHeight:1.2}}>{item.rarity}</div>
        <div style={{fontSize:size==="small"?9:10,color:"#ccc",lineHeight:1.3,marginBottom:3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:"100%"}} title={item.itemName||item.name?.split(": ")[1]}>
          {item.itemName||item.name?.split(": ")[1]||item.name}
        </div>
        {size!=="small" && <div style={{fontSize:10,color:"#888"}}>{item.type}</div>}
        {showActions && onSell && !item.locked && (
          <button onClick={()=>onSell(item.id)} style={{marginTop:5,background:`${rarityData.color}22`,border:`1px solid ${rarityData.color}55`,color:rarityData.color,borderRadius:4,padding:"4px 0",cursor:"pointer",fontSize:10,fontWeight:700,width:"100%"}}>
            Sell · €{item.value}
          </button>
        )}
        {showActions && item.locked && <div style={{marginTop:5,fontSize:10,color:"var(--accent)",textAlign:"center",padding:"4px 0"}}>Locked</div>}
      </div>
    </div>
  );
}

function CoinCT({size=260}){
  return (
    <div style={{width:size,height:size,borderRadius:"50%",overflow:"hidden",boxShadow:"0 4px 24px rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",background:"#0d1520"}}>
      <img src={COIN_IMG_CT} alt="Coin side C" draggable={false} style={{width:"100%",height:"100%",objectFit:"cover",userSelect:"none",pointerEvents:"none"}}/>
    </div>
  );
}
function CoinT({size=260}){
  return (
    <div style={{width:size,height:size,borderRadius:"50%",overflow:"hidden",boxShadow:"0 4px 24px rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",background:"#3a2a08"}}>
      <img src={COIN_IMG_T} alt="Coin side T" draggable={false} style={{width:"100%",height:"100%",objectFit:"cover",userSelect:"none",pointerEvents:"none"}}/>
    </div>
  );
}

const COIN_SIZE = 260;

function CoinFlipAnimation({chosenSide,resultSide,onDone}){
  const [frame,setFrame]=useState(0);
  const rafRef=useRef(null);
  const startRef=useRef(null);
  // Slower, smoother flip: longer duration + fewer half-flips + gentler ease-in-out
  const DURATION=4200;
  // Must be EVEN: an even number of half-flips lands back on the starting (chosen) face,
  // and chosenSide + 1 more half-flip (odd) correctly lands on the opposite face when we lose.
  // (An odd base value here was the cause of the coin occasionally flashing the wrong face
  // right at the end of the flip, just before the result screen appeared.)
  const HALF_FLIPS = 10;
  const needsExtraHalfFlip = chosenSide !== resultSide;
  const totalHalfFlips = needsExtraHalfFlip ? HALF_FLIPS + 1 : HALF_FLIPS;
  useEffect(()=>{
    startRef.current=performance.now();
    const animate=(now)=>{
      const elapsed=now-startRef.current;
      const t=Math.min(elapsed/DURATION,1);
      setFrame(Math.floor(t*1000));
      if(t<1){rafRef.current=requestAnimationFrame(animate);}else{onDone();}
    };
    rafRef.current=requestAnimationFrame(animate);
    return()=>cancelAnimationFrame(rafRef.current);
  },[]);
  const t=frame/1000;
  // Smooth ease-in-out (cubic) instead of a hard ease-out, so the flip starts and settles gently
  const eased = t<0.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2;
  const angle=eased*totalHalfFlips*Math.PI;
  const cosVal=Math.cos(angle);
  const scaleX=Math.abs(cosVal);
  // Slight vertical "hop" arc while flipping, for a more natural coin-toss feel
  const hop = Math.sin(Math.min(t,1)*Math.PI) * 26;
  const showChosen=cosVal>=0;
  // Guard: once the flip is essentially done, always show the true result side —
  // never let a stray frame display anything other than the actual outcome.
  const currentSide = t>=0.995 ? resultSide : (showChosen?chosenSide:(chosenSide==="ct"?"t":"ct"));
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:COIN_SIZE+40,height:COIN_SIZE+80}}>
      <div style={{transform:`translateY(${-hop}px) scaleX(${Math.max(scaleX,0.02)})`,willChange:"transform",filter:`drop-shadow(0 0 ${20*scaleX}px rgba(${currentSide==="t"?"200,160,40":"80,140,200"},0.6))`}}>
        {currentSide==="ct"?<CoinCT size={COIN_SIZE}/>:<CoinT size={COIN_SIZE}/>}
      </div>
    </div>
  );
}

function CoinFlipPage({state,setState}){
  const [phase,setPhase]=useState("select");
  const [selectedItems,setSelectedItems]=useState([]);
  const [chosenSide,setChosenSide]=useState(null);
  const [resultSide,setResultSide]=useState(null);
  const [won,setWon]=useState(null);
  const [wonItems,setWonItems]=useState([]);
  const [notification,setNotification]=useState(null);
  const notifTimer=useRef(null);
  const unlocked=state.inventory.filter(i=>!i.locked);
  const selectedValue=selectedItems.reduce((s,i)=>s+i.value,0);
  const toggleSelect=(item)=>{
    if(phase!=="select")return;
    setSelectedItems(prev=>{
      const exists=prev.find(i=>i.id===item.id);
      if(exists)return prev.filter(i=>i.id!==item.id);
      if(prev.length>=5)return prev;
      return[...prev,item];
    });
  };
  const goPickSide=()=>{if(selectedItems.length===0)return;setPhase("pickside");};
  const doFlip=(side)=>{
    setChosenSide(side);setPhase("flipping");
    const result=Math.random()<0.5?"ct":"t";
    setResultSide(result);
  };
  const handleFlipDone=()=>{
    const didWin=(chosenSide===resultSide);
    setWon(didWin);setPhase("result");
    clearTimeout(notifTimer.current);
    setNotification({text:didWin?"You won the coinflip!":"You lost the coinflip!",win:didWin});
    fireSound(didWin?"win":"lose");
    notifTimer.current=setTimeout(()=>setNotification(null),4000);
    if(didWin){
      const bonusItems=selectedItems.map(item=>({...rollBetterItem(item),id:Date.now()+Math.random()}));
      setWonItems(bonusItems);
      setState(prev=>({...prev,inventory:[...bonusItems,...prev.inventory],totalFlipWins:(prev.totalFlipWins||0)+1}));
    }else{
      setWonItems([]);
      setState(prev=>({...prev,inventory:prev.inventory.filter(i=>!selectedItems.find(s=>s.id===i.id))}));
    }
  };
  const reset=()=>{setPhase("select");setSelectedItems([]);setChosenSide(null);setResultSide(null);setWon(null);setWonItems([]);};
  useEffect(()=>()=>clearTimeout(notifTimer.current),[]);

  if(phase==="flipping"||phase==="result"){
    return (
      <div style={{position:"relative",minHeight:"100vh",background:"#0e0e10",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
        {notification&&<div style={{position:"absolute",top:20,right:20,background:"#1e1e22",border:"1px solid #333",borderRadius:6,padding:"12px 16px",display:"flex",alignItems:"center",gap:12,fontSize:13,color:"#ccc",maxWidth:340,boxShadow:"0 4px 20px rgba(0,0,0,0.5)",zIndex:10,animation:"slideInNotif 0.3s ease"}}><span>{notification.text}</span><button onClick={()=>setNotification(null)} style={{background:"none",border:"none",color:"#666",cursor:"pointer",padding:0,fontSize:16,lineHeight:1}}>×</button></div>}
        {phase==="result"&&<div style={{fontSize:32,fontWeight:700,color:"#fff",marginBottom:32,letterSpacing:0.5,textShadow:won?"0 0 30px rgba(76,175,80,0.5)":"0 0 30px rgba(192,57,43,0.5)"}}>{won?"You Won!":"You lost!"}</div>}
        <div style={{filter:phase==="result"?(won?"drop-shadow(0 0 40px rgba(76,175,80,0.4))":"drop-shadow(0 0 40px rgba(192,57,43,0.2))"):"none"}}>
          {phase==="flipping"?<CoinFlipAnimation chosenSide={chosenSide} resultSide={resultSide} onDone={handleFlipDone}/>:
            <div style={{width:COIN_SIZE+40,height:COIN_SIZE+40,display:"flex",alignItems:"center",justifyContent:"center"}}>{resultSide==="ct"?<CoinCT size={COIN_SIZE}/>:<CoinT size={COIN_SIZE}/>}</div>}
        </div>
        {phase==="result"&&won&&wonItems.length>0&&<div style={{marginTop:28,display:"flex",flexDirection:"column",alignItems:"center",gap:12,maxWidth:680,padding:"0 20px"}}><div style={{fontSize:12,color:"var(--accent)",letterSpacing:1.5,textTransform:"uppercase",fontWeight:700}}>You received</div><div style={{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center"}}>{wonItems.map(item=><ItemCard key={item.id} item={item} size="small" showActions={false}/>)}</div></div>}
        {phase==="result"&&<button onClick={reset} style={{marginTop:32,background:"#1e1e22",border:"1px solid #333",color:"#aaa",borderRadius:6,padding:"11px 32px",cursor:"pointer",fontSize:14,letterSpacing:0.5}}>Flip Again</button>}
      </div>
    );
  }
  if(phase==="pickside"){
    return (
      <div style={{minHeight:"100vh",background:"#0e0e10",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:48}}>
        <div style={{fontSize:22,fontWeight:300,color:"#ccc",letterSpacing:3,textTransform:"uppercase"}}>Choose.</div>
        <div style={{display:"flex",gap:60,alignItems:"center"}}>
          <div onClick={()=>doFlip("ct")} style={{cursor:"pointer",userSelect:"none"}} onMouseEnter={e=>{e.currentTarget.firstChild.style.transform="scale(1.06)";e.currentTarget.firstChild.style.filter="drop-shadow(0 0 24px rgba(80,140,200,0.7))";}} onMouseLeave={e=>{e.currentTarget.firstChild.style.transform="scale(1)";e.currentTarget.firstChild.style.filter="none";}}>
            <div style={{transition:"transform 0.15s,filter 0.15s"}}><CoinCT size={COIN_SIZE}/></div>
          </div>
          <div onClick={()=>doFlip("t")} style={{cursor:"pointer",userSelect:"none"}} onMouseEnter={e=>{e.currentTarget.firstChild.style.transform="scale(1.06)";e.currentTarget.firstChild.style.filter="drop-shadow(0 0 24px rgba(200,160,40,0.7))";}} onMouseLeave={e=>{e.currentTarget.firstChild.style.transform="scale(1)";e.currentTarget.firstChild.style.filter="none";}}>
            <div style={{transition:"transform 0.15s,filter 0.15s"}}><CoinT size={COIN_SIZE}/></div>
          </div>
        </div>
        <button onClick={reset} style={{background:"transparent",border:"1px solid #2a2a2a",color:"#555",borderRadius:6,padding:"9px 24px",cursor:"pointer",fontSize:13}}>Back</button>
      </div>
    );
  }
  return (
    <div style={{padding:"28px 32px",minHeight:"100vh",background:"#111"}}>
      <h1 style={{fontSize:26,fontWeight:700,margin:"0 0 4px",color:"#fff"}}>Coin Flip</h1>
      <p style={{color:"#444",fontSize:13,margin:"0 0 24px"}}>Select items, pick a side, and flip. Win and keep your items plus earn bonus items. Lose and they're gone.</p>
      <div style={{background:"#1a1a1a",border:"1px solid #222",borderRadius:8,padding:16,marginBottom:20}}>
        <div style={{fontSize:11,color:"#555",letterSpacing:1,marginBottom:10,textTransform:"uppercase"}}>Your Bet — select up to 5 items</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,minHeight:60,marginBottom:12}}>
          {selectedItems.length===0?<div style={{color:"#333",fontSize:13,width:"100%",textAlign:"center",paddingTop:16}}>No items selected</div>
            :selectedItems.map(item=>(
              <div key={item.id} onClick={()=>toggleSelect(item)} style={{background:"#111",border:`1px solid ${item.rarityColor}55`,borderRadius:6,padding:"6px 10px",cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
                <TypeIcon type={item.type} size={16} color={item.rarityColor}/>
                <span style={{fontSize:11,color:"#bbb",maxWidth:80,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.itemName||item.name?.split(": ")[1]}</span>
                <span style={{fontSize:10,color:item.rarityColor}}>€{item.value}</span>
              </div>
            ))}
        </div>
        <div style={{borderTop:"1px solid #222",paddingTop:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:12,color:"#555"}}>Total value</span>
          <span style={{fontSize:16,fontWeight:700,color:"#fff"}}>€{selectedValue}</span>
        </div>
      </div>
      <button onClick={goPickSide} disabled={selectedItems.length===0} style={{background:selectedItems.length>0?"var(--accent)":"#1a2a1a",border:"none",color:selectedItems.length>0?"#fff":"#2a4a2a",borderRadius:6,padding:"11px 32px",cursor:selectedItems.length>0?"pointer":"not-allowed",fontSize:14,fontWeight:700,marginBottom:28}}>Continue to Flip</button>
      <div style={{fontSize:11,color:"#444",letterSpacing:1,marginBottom:14,textTransform:"uppercase"}}>Your Items</div>
      {unlocked.length===0?<div style={{color:"#333",textAlign:"center",padding:"40px 0",fontSize:13}}>No items — open some crates first</div>
        :<div style={{display:"flex",flexWrap:"wrap",gap:10}}>
          {unlocked.map(item=>{
            const sel=!!selectedItems.find(i=>i.id===item.id);
            return (
              <div key={item.id} onClick={()=>toggleSelect(item)} style={{position:"relative",cursor:"pointer",outline:sel?`2px solid #4caf50`:"none",borderRadius:10}}>
                {sel&&<div style={{position:"absolute",top:6,right:6,width:16,height:16,background:"var(--accent)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",zIndex:10}}><svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="#fff" strokeWidth="2"><polyline points="1.5,5 4,7.5 8.5,2.5"/></svg></div>}
                <ItemCard item={item} size="small" showActions={false}/>
              </div>
            );
          })}
        </div>
      }
    </div>
  );
}

const TypeIcon=({type,size=28,color="#888"})=>{
  const s=size;
  const icons={
    Body:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6"><path d="M3 13l2-5h14l2 5"/><rect x="2" y="13" width="20" height="6" rx="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg>,
    Wheel:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="3" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="21"/><line x1="3" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="21" y2="12"/></svg>,
    Decal:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 17l4-8 3 6 2-3 3 5"/></svg>,
    Boost:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6"><path d="M13 2L4.5 13H11L10 22l8.5-11H13L13 2z"/></svg>,
    Topper:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6"><rect x="7" y="4" width="10" height="10" rx="1"/><line x1="4" y1="14" x2="20" y2="14"/><line x1="6" y1="19" x2="18" y2="19"/><line x1="4" y1="14" x2="6" y2="19"/><line x1="20" y1="14" x2="18" y2="19"/></svg>,
    Antenna:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6"><line x1="12" y1="20" x2="12" y2="10"/><circle cx="12" cy="7" r="3"/></svg>,
    Trail:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6"><path d="M5 17c3-2 5-5 7-9"/><path d="M7 20c2-2 4-5 5-8"/><path d="M3 14c2-1 4-3 6-6"/></svg>,
    "Goal Explosion":<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg>,
    "Paint Finish":<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M8 12a4 4 0 018 0"/></svg>,
    "Player Banner":<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6"><path d="M4 4h16v10l-8 4-8-4V4z"/></svg>,
    GoalExplosion:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg>,
    PaintFinish:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M8 12a4 4 0 018 0"/></svg>,
    PlayerBanner:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6"><path d="M4 4h16v10l-8 4-8-4V4z"/></svg>,
  };
  return icons[type]||icons.Body;
};

const CrateIcon=({id,size=48})=>{
  const colors={common:"#5bc8f5",rare_drop:"#4169e1",very_rare:"#9b59b6",import:"#e74c3c",exotic:"#f39c12",black_market:"#ff69b4",triumph:"#e74c3c",zyphr:"#9b59b6",vindicator:"#f39c12",nitro:"#f39c12",golden_gift:"#FFD700",champions:"#4169e1",season:"#9b59b6",legacy:"#e74c3c",titanium:"#b0b0b0",reactor:"#f39c12",overdrive:"#ff69b4",elevation:"#FFD700"};
  const c=colors[id]||"#888";
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="6" y="18" width="36" height="26" rx="3" stroke={c} strokeWidth="2" fill="#1a1a1a"/>
      <rect x="4" y="14" width="40" height="8" rx="2" stroke={c} strokeWidth="2" fill="#111"/>
      <line x1="24" y1="14" x2="24" y2="44" stroke={c} strokeWidth="2"/>
      <path d="M16 14 Q20 8 24 14 Q28 8 32 14" stroke={c} strokeWidth="2" fill="none"/>
    </svg>
  );
};
const LockIcon=({locked,size=14})=>(
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={locked?"var(--accent)":"#666"} strokeWidth="2">
    {locked?<><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></>:<><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 019.9-1"/></>}
  </svg>
);

// ── SET CREDITS MODAL (Admin only) ──
function SetCreditsModal({onClose, onSet}) {
  const [value, setValue] = useState("");
  const handleSet = () => {
    const n = parseFloat(value);
    if (!isNaN(n) && n >= 0) { onSet(n); onClose(); }
  };
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",zIndex:900,display:"flex",alignItems:"center",justifyContent:"center"}}
      onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={{background:"#111",border:"2px solid #FFD700",borderRadius:14,padding:"32px 36px",width:360,maxWidth:"95vw",textAlign:"center",boxShadow:"0 0 60px rgba(255,215,0,0.3)"}}>
        <div style={{fontSize:28,marginBottom:8}}>👑</div>
        <div style={{fontSize:18,fontWeight:800,color:"#FFD700",marginBottom:4,textShadow:"0 0 16px #FFD700"}}>ADMIN: Set Credits</div>
        <div style={{fontSize:12,color:"#888",marginBottom:24}}>Enter any amount of €uros</div>
        <div style={{display:"flex",gap:8,marginBottom:16}}>
          <span style={{display:"flex",alignItems:"center",fontSize:22,color:"#FFD700",fontWeight:700,paddingLeft:8}}>€</span>
          <input autoFocus value={value} onChange={e=>setValue(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleSet()}
            placeholder="0" type="number" min="0"
            style={{flex:1,background:"#1a1a1a",border:"2px solid #FFD70088",borderRadius:8,color:"#FFD700",fontSize:24,fontWeight:300,padding:"10px 14px",outline:"none",fontFamily:"'Segoe UI',sans-serif",textAlign:"right"}}/>
        </div>
        <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:16}}>
          {[1000,10000,100000,1000000].map(n=>(
            <button key={n} onClick={()=>setValue(String(n))} style={{background:"#1a1a0a",border:"1px solid #FFD70044",color:"#FFD700",borderRadius:6,padding:"5px 10px",cursor:"pointer",fontSize:11,fontWeight:700}}>€{n.toLocaleString()}</button>
          ))}
        </div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={handleSet} style={{flex:1,background:"linear-gradient(135deg,#b8860b,#FFD700)",border:"none",color:"#111",borderRadius:8,padding:"12px 0",cursor:"pointer",fontSize:15,fontWeight:800}}>Set Credits</button>
          <button onClick={onClose} style={{background:"transparent",border:"1px solid #333",color:"#666",borderRadius:8,padding:"12px 20px",cursor:"pointer",fontSize:14}}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ── REDEEM MODAL ──
function RedeemModal({state, setState, onClose, onRenamePlayer}) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState(null);
  const [redeemed, setRedeemed] = useState(false);

  const handleRedeem = () => {
    const key = code.trim().toUpperCase();
    if (!key) return;
    const used = state.redeemedCodes || [];
    if (used.includes(key)) { setStatus({ ok: false, message: "This code has already been redeemed." }); return; }
    const rewards = REDEEM_CODES[key];
    if (!rewards) { setStatus({ ok: false, message: "Invalid code. Check spelling and try again." }); return; }

    // Special: Admin2026
    if (key === "ADMIN2026") {
      const allItems = getAllItems();
      setState(prev => ({
        ...prev,
        isAdmin: true,
        inventory: [...allItems, ...prev.inventory],
        redeemedCodes: [...(prev.redeemedCodes || []), key],
      }));
      onRenamePlayer("ADMIN", true);
      fireSound("admin");
      setStatus({ ok: true, message: "ADMIN mode activated!", isAdmin: true, creditsGained: 0, xpGained: 0, items: [] });
      setRedeemed(true);
      return;
    }

    const newItems = [];
    let creditsGained = 0;
    let xpGained = 0;
    rewards.forEach(reward => {
      if (reward.type === "item") {
        const rarityData = RARITIES.find(r => r.name === reward.rarity) || RARITIES[RARITIES.length-1];
        const type = ITEM_TYPES[Math.floor(Math.random() * ITEM_TYPES.length)];
        const name = ITEMS[type][Math.floor(Math.random() * ITEMS[type].length)];
        const typeLabel = type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1').trim();
        const value = Math.floor(rarityData.valueRange[0] + Math.random() * (rarityData.valueRange[1] - rarityData.valueRange[0]));
        newItems.push({ id: Date.now() + Math.random(), name: typeLabel + ": " + name, rarity: rarityData.name, rarityColor: rarityData.color, value, locked: false, type: typeLabel, itemName: name });
      } else if (reward.type === "credits") {
        creditsGained += reward.amount;
      } else if (reward.type === "xp") {
        xpGained += reward.amount;
      }
    });
    setState(prev => {
      const newXp = prev.xp + xpGained;
      let newLevel = prev.level;
      while (newLevel < MAX_LEVEL && newXp >= LEVEL_XP[newLevel]) newLevel++;
      return { ...prev, credits: parseFloat((prev.credits + creditsGained).toFixed(2)), xp: newXp, level: newLevel, inventory: [...newItems, ...prev.inventory], redeemedCodes: [...(prev.redeemedCodes || []), key] };
    });
    setStatus({ ok: true, message: "Code redeemed successfully!", rewards, items: newItems, creditsGained, xpGained });
    fireSound("redeem");
    setRedeemed(true);
  };

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={{background:"#181818",border:"1px solid #2a2a2a",borderRadius:14,padding:"32px 32px 28px",width:440,maxWidth:"95vw",position:"relative"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"none",border:"none",color:"#555",fontSize:20,cursor:"pointer",lineHeight:1,padding:"2px 6px"}}>×</button>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:6}}>
          <div style={{width:36,height:36,background:"linear-gradient(135deg,#a855f7,#ec4899)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>
          </div>
          <div>
            <div style={{fontSize:18,fontWeight:700,color:"#fff"}}>Redeem Code</div>
            <div style={{fontSize:12,color:"#555"}}>Enter a code to claim your reward</div>
          </div>
        </div>
        <div style={{height:1,background:"#222",margin:"20px 0"}}/>
        {!redeemed ? (
          <>
            <div style={{marginBottom:16}}>
              <label style={{display:"block",fontSize:11,color:"#666",letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>Code</label>
              <div style={{display:"flex",gap:8}}>
                <input value={code} onChange={e=>{setCode(e.target.value);setStatus(null);}} onKeyDown={e=>e.key==="Enter"&&handleRedeem()} placeholder="Enter code..." autoFocus
                  style={{flex:1,background:"#111",border:`1px solid ${status?.ok===false?"#e74c3c":"#2a2a2a"}`,borderRadius:6,padding:"10px 14px",color:"#fff",fontSize:14,outline:"none",letterSpacing:1,textTransform:"uppercase",fontFamily:"'Segoe UI',sans-serif"}}/>
                <button onClick={handleRedeem} style={{background:"linear-gradient(135deg,#a855f7,#ec4899)",border:"none",color:"#fff",borderRadius:6,padding:"10px 20px",cursor:"pointer",fontSize:14,fontWeight:700,whiteSpace:"nowrap"}}>Redeem</button>
              </div>
            </div>
            {status && !status.ok && <div style={{background:"rgba(231,76,60,0.12)",border:"1px solid rgba(231,76,60,0.4)",borderRadius:6,padding:"10px 14px",fontSize:13,color:"#e74c3c",display:"flex",alignItems:"center",gap:8}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>{status.message}</div>}
          </>
        ) : (
          <div>
            {status?.isAdmin ? (
              <div style={{textAlign:"center",marginBottom:24}}>
                <div style={{fontSize:48,marginBottom:8}}>👑</div>
                <div style={{fontSize:20,fontWeight:900,color:"#FFD700",marginBottom:6,textShadow:"0 0 20px #FFD700,0 0 40px #FFD70088",animation:"adminGlow 1.5s ease-in-out infinite"}}>{status.message}</div>
                <div style={{fontSize:13,color:"#888",marginBottom:6}}>Your name is now <span style={{color:"#FFD700",fontWeight:800,textShadow:"0 0 12px #FFD700"}}>ADMIN</span></div>
                <div style={{fontSize:12,color:"#666"}}>• All items added to inventory<br/>• All crates unlocked<br/>• Click money counter to set any amount</div>
              </div>
            ) : (
              <div>
                <div style={{textAlign:"center",marginBottom:20}}>
                  <div style={{fontSize:16,fontWeight:700,color:"#fff",marginBottom:4}}>{status.message}</div>
                  <div style={{fontSize:12,color:"#555"}}>The following rewards have been added:</div>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:24}}>
                  {status.creditsGained > 0 && <div style={{background:"rgba(76,175,80,0.1)",border:"1px solid rgba(76,175,80,0.3)",borderRadius:8,padding:"10px 14px",display:"flex",alignItems:"center",gap:10}}><div style={{fontSize:13,fontWeight:700,color:"var(--accent)"}}>+€{status.creditsGained}</div><div style={{fontSize:11,color:"#555"}}>Added to your balance</div></div>}
                  {status.xpGained > 0 && <div style={{background:"rgba(168,85,247,0.1)",border:"1px solid rgba(168,85,247,0.3)",borderRadius:8,padding:"10px 14px",display:"flex",alignItems:"center",gap:10}}><div style={{fontSize:13,fontWeight:700,color:"#a855f7"}}>+{status.xpGained} XP</div><div style={{fontSize:11,color:"#555"}}>Added to your progress</div></div>}
                  {status.items && status.items.length > 0 && <div><div style={{fontSize:11,color:"#555",letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>Items Received</div><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{status.items.map(item=><ItemCard key={item.id} item={item} size="small" showActions={false}/>)}</div></div>}
                </div>
              </div>
            )}
            <button onClick={onClose} style={{background:status?.isAdmin?"linear-gradient(135deg,#b8860b,#FFD700)":"linear-gradient(135deg,#a855f7,#ec4899)",border:"none",color:status?.isAdmin?"#111":"#fff",borderRadius:6,padding:"11px 0",cursor:"pointer",fontSize:14,fontWeight:700,width:"100%"}}>
              {status?.isAdmin?"Enter the game, ADMIN":"Done"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const ALL_CATALOG_ITEMS = ITEM_TYPES.flatMap(type => {
  const typeLabel = type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1').trim();
  return ITEMS[type].map(name => ({ name, type: typeLabel, fullName: typeLabel + ": " + name }));
});

function AllItemsPage() {
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const allTypes = ["All", ...Array.from(new Set(ALL_CATALOG_ITEMS.map(i => i.type)))];
  let filtered = ALL_CATALOG_ITEMS;
  if (typeFilter !== "All") filtered = filtered.filter(i => i.type === typeFilter);
  if (search.trim()) { const q = search.toLowerCase(); filtered = filtered.filter(i => i.name.toLowerCase().includes(q) || i.type.toLowerCase().includes(q)); }
  if (sortBy === "name") filtered = [...filtered].sort((a,b) => a.name.localeCompare(b.name));
  else if (sortBy === "type") filtered = [...filtered].sort((a,b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name));
  return (
    <div style={{minHeight:"100vh",background:"#0e0e12",color:"#fff",fontFamily:"'Segoe UI',sans-serif"}}>
      <div style={{background:"linear-gradient(180deg,#1a1a2e 0%,#0e0e12 100%)",borderBottom:"1px solid #1e1e2e",padding:"24px 32px 0"}}>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:16}}>
          <div>
            <h1 style={{fontSize:36,fontWeight:900,margin:0,letterSpacing:2,textTransform:"uppercase",background:"linear-gradient(90deg,#fff 60%,#888)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>ALL ITEMS</h1>
            <div style={{fontSize:13,color:"#555",marginTop:4}}>{filtered.length} of {ALL_CATALOG_ITEMS.length} items · Each item can drop at any rarity</div>
          </div>
          <button onClick={()=>setShowFilters(v=>!v)} style={{background:showFilters?"#3b3b6b":"#1e1e2e",border:"1px solid #3b3b6b",color:"#a0a0c0",borderRadius:6,padding:"9px 18px",cursor:"pointer",fontSize:12,fontWeight:700,letterSpacing:1,textTransform:"uppercase",display:"flex",alignItems:"center",gap:7,marginBottom:4}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>
        {showFilters && (
          <div style={{display:"flex",flexWrap:"wrap",gap:12,paddingBottom:16,alignItems:"center"}}>
            <div style={{position:"relative",flex:"1 1 200px",minWidth:160,maxWidth:280}}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)"}}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search items..." style={{width:"100%",background:"#181828",border:"1px solid #2a2a3e",borderRadius:6,padding:"8px 10px 8px 30px",color:"#ccc",fontSize:13,outline:"none",boxSizing:"border-box"}}/>
            </div>
            <select value={typeFilter} onChange={e=>setTypeFilter(e.target.value)} style={{background:"#181828",border:"1px solid #2a2a3e",color:"#ccc",borderRadius:6,padding:"8px 10px",fontSize:12,cursor:"pointer",minWidth:130}}>{allTypes.map(t=><option key={t}>{t}</option>)}</select>
            <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{background:"#181828",border:"1px solid #2a2a3e",color:"#ccc",borderRadius:6,padding:"8px 10px",fontSize:12,cursor:"pointer",minWidth:140}}><option value="name">Sort: Name A–Z</option><option value="type">Sort: By Type</option></select>
          </div>
        )}
      </div>
      <div style={{padding:"12px 32px 0",display:"flex",gap:8,flexWrap:"wrap"}}>
        {RARITIES.map(r=><div key={r.name} style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:8,height:8,borderRadius:"50%",background:r.color}}/><span style={{fontSize:10,color:r.color}}>{r.name}: €{r.valueRange[0]}–€{r.valueRange[1]}</span></div>)}
      </div>
      <div style={{padding:"16px 32px 32px"}}>
        {filtered.length===0 ? <div style={{textAlign:"center",padding:"80px 0",color:"#444",fontSize:15}}>No items match your filters.</div> : (
          <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
            {filtered.map((item,idx)=>{
              const imgUrl = ITEM_IMAGES[item.name];
              return (
                <div key={item.fullName+idx} style={{position:"relative",width:138,background:"linear-gradient(160deg,#12121e,#0e0e18)",border:"1px solid #2a2a3e",borderRadius:10,overflow:"hidden",cursor:"default"}}>
                  <div style={{width:"100%",height:76,display:"flex",alignItems:"center",justifyContent:"center",background:"#0a0a14",position:"relative"}}>
                    {imgUrl ? <img src={imgUrl} alt={item.name} style={{maxWidth:"85%",maxHeight:"85%",objectFit:"contain"}} onError={e=>{e.currentTarget.style.display="none";e.currentTarget.nextSibling.style.display="flex";}}/> : null}
                    <div style={{display:imgUrl?"none":"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100%"}}><TypeIcon type={item.type} size={36} color="#3a3a5e"/></div>
                  </div>
                  <div style={{padding:"7px 8px 8px"}}>
                    <div style={{fontSize:11,color:"#ccc",fontWeight:600,lineHeight:1.3,marginBottom:4,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}} title={item.name}>{item.name}</div>
                    <div style={{fontSize:9,color:"#555",marginBottom:6}}>{item.type}</div>
                    <div style={{display:"flex",flexDirection:"column",gap:2}}>
                      {RARITIES.map(r=><div key={r.name} style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:4}}><div style={{display:"flex",alignItems:"center",gap:3}}><div style={{width:6,height:6,borderRadius:"50%",background:r.color,flexShrink:0}}/><span style={{fontSize:8,color:r.color,letterSpacing:0.3}}>{r.name}</span></div><span style={{fontSize:8,color:"#555",fontVariantNumeric:"tabular-nums"}}>€{r.valueRange[0]}–€{r.valueRange[1]}</span></div>)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function AchievementsPage({state,setState}){
  const claimedIds=state.claimedAchievements||[];
  const claim=(ach)=>setState(prev=>({...prev,credits:parseFloat((prev.credits+ach.reward).toFixed(2)),claimedAchievements:[...(prev.claimedAchievements||[]),ach.id]}));
  const completed=ACHIEVEMENTS.filter(a=>a.check(state));
  const pending=ACHIEVEMENTS.filter(a=>!a.check(state));
  const claimable=completed.filter(a=>!claimedIds.includes(a.id));
  return (
    <div style={{padding:"28px 32px",minHeight:"100vh",background:"#111"}}>
      <h1 style={{fontSize:26,fontWeight:700,margin:"0 0 4px",color:"#fff"}}>Achievements</h1>
      <p style={{color:"#444",fontSize:13,margin:"0 0 24px"}}>Complete challenges to claim bonus credits.{claimable.length>0&&<span style={{color:"var(--accent)"}}> {claimable.length} ready to claim.</span>}</p>
      {claimable.length>0&&<div style={{marginBottom:32}}><div style={{fontSize:11,color:"var(--accent)",letterSpacing:2,marginBottom:14,borderBottom:"1px solid #1e2a1e",paddingBottom:6}}>READY TO CLAIM</div><div style={{display:"flex",flexWrap:"wrap",gap:12}}>{claimable.map(ach=><div key={ach.id} style={{background:"#1a2a1a",border:"1px solid #2a4a2a",borderRadius:8,padding:"14px 16px",width:220}}><div style={{fontSize:14,fontWeight:700,color:"#fff",marginBottom:4}}>{ach.name}</div><div style={{fontSize:12,color:"#666",marginBottom:12}}>{ach.desc}</div><button onClick={()=>claim(ach)} style={{background:"var(--accent)",border:"none",color:"#fff",borderRadius:4,padding:"7px 14px",cursor:"pointer",fontSize:12,fontWeight:700,width:"100%"}}>Claim +€{ach.reward}</button></div>)}</div></div>}
      {completed.filter(a=>claimedIds.includes(a.id)).length>0&&<div style={{marginBottom:32}}><div style={{fontSize:11,color:"#555",letterSpacing:2,marginBottom:14,borderBottom:"1px solid #1e1e1e",paddingBottom:6}}>COMPLETED</div><div style={{display:"flex",flexWrap:"wrap",gap:12}}>{completed.filter(a=>claimedIds.includes(a.id)).map(ach=><div key={ach.id} style={{background:"#161616",border:"1px solid #1e1e1e",borderRadius:8,padding:"14px 16px",width:220,opacity:0.6}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg><div style={{fontSize:14,fontWeight:700,color:"#888"}}>{ach.name}</div></div><div style={{fontSize:12,color:"#444"}}>{ach.desc}</div><div style={{fontSize:11,color:"#555",marginTop:8}}>+€{ach.reward} claimed</div></div>)}</div></div>}
      <div><div style={{fontSize:11,color:"#555",letterSpacing:2,marginBottom:14,borderBottom:"1px solid #1e1e1e",paddingBottom:6}}>IN PROGRESS</div><div style={{display:"flex",flexWrap:"wrap",gap:12}}>{pending.map(ach=><div key={ach.id} style={{background:"#161616",border:"1px solid #1e1e1e",borderRadius:8,padding:"14px 16px",width:220}}><div style={{fontSize:14,fontWeight:700,color:"#555",marginBottom:4}}>{ach.name}</div><div style={{fontSize:12,color:"#333",marginBottom:10}}>{ach.desc}</div><div style={{fontSize:11,color:"#333"}}>Reward: +€{ach.reward}</div></div>)}</div></div>
    </div>
  );
}

function MultiOpenModal({crate,count,onClose,onItemsAdded}){
  const ITEM_W=160,REEL_VISIBLE=5,REEL_W=REEL_VISIBLE*ITEM_W,REEL_COUNT=60;
  const [phase,setPhase]=useState("rolling");
  const [reelOffset,setReelOffset]=useState(0);
  const [finalItems]=useState(()=>Array.from({length:count},()=>({...rollItem(crate.rarityBoost,crate.minRarity||0,crate.maxRarity??(RARITIES.length-1),crate.boostFactor??0.3),id:Date.now()+Math.random()})));
  const [reelItems]=useState(()=>{const land=finalItems[0];return Array.from({length:REEL_COUNT},(_,i)=>i===REEL_COUNT-8?land:rollItem(crate.rarityBoost,crate.minRarity||0,crate.maxRarity??(RARITIES.length-1),crate.boostFactor??0.3));});
  const [revealedCount,setRevealedCount]=useState(0);
  const [allRevealed,setAllRevealed]=useState(false);
  const addedRef=useRef(false);
  useEffect(()=>{
    const target=(REEL_COUNT-8-2)*ITEM_W,dur=3800,start=performance.now();
    const anim=(now)=>{const t=Math.min((now-start)/dur,1);setReelOffset((1-Math.pow(1-t,4))*target);if(t<1)requestAnimationFrame(anim);else{setReelOffset(target);setTimeout(()=>setPhase("revealing"),400);}};
    requestAnimationFrame(anim);
  },[]);
  useEffect(()=>{
    if(phase!=="revealing")return;
    if(revealedCount>=count){setAllRevealed(true);if(!addedRef.current){addedRef.current=true;onItemsAdded(finalItems);}return;}
    const t=setTimeout(()=>setRevealedCount(c=>c+1),revealedCount===0?200:320);
    return()=>clearTimeout(t);
  },[phase,revealedCount]);
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{background:"#181818",border:"1px solid #2a2a2a",borderRadius:12,padding:"28px 28px 24px",width:Math.max(REEL_W+80,520),maxWidth:"95vw",textAlign:"center"}}>
        <div style={{fontSize:17,fontWeight:700,marginBottom:20,color:"#ddd"}}>Opening {count}x {crate.name}</div>
        {phase==="rolling"&&(
          <div style={{position:"relative",width:REEL_W,margin:"0 auto 24px",overflow:"hidden",borderRadius:6}}>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,#181818 0%,transparent 18%,transparent 82%,#181818 100%)",zIndex:3,pointerEvents:"none"}}/>
            <div style={{position:"absolute",top:0,bottom:0,left:"50%",transform:"translateX(-1px)",width:2,background:"var(--accent)",zIndex:4,pointerEvents:"none"}}/>
            <div style={{display:"flex",transform:`translateX(${-reelOffset}px)`,willChange:"transform"}}>
              {reelItems.map((item,i)=><div key={i} style={{minWidth:ITEM_W,width:ITEM_W,padding:"8px",background:"#111",borderRight:"1px solid #1e1e1e",textAlign:"center",boxSizing:"border-box"}}><ItemCard item={item} size="small" showActions={false}/></div>)}
            </div>
          </div>
        )}
        {phase==="revealing"&&(
          <div style={{marginBottom:24}}>
            <div style={{fontSize:12,color:"#555",marginBottom:16}}>{allRevealed?`All ${count} items revealed!`:`Revealing... (${revealedCount}/${count})`}</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center",minHeight:130}}>
              {finalItems.map((item,i)=>{const visible=i<revealedCount;return <div key={item.id} style={{transition:"all 0.25s ease",transform:visible?"scale(1)":"scale(0.85)",opacity:visible?1:0}}>{visible&&<ItemCard item={item} size="normal" showActions={false}/>}</div>;})}
            </div>
          </div>
        )}
        {allRevealed&&<button onClick={onClose} style={{background:"var(--accent)",border:"none",color:"#fff",borderRadius:6,padding:"10px 36px",cursor:"pointer",fontSize:14,fontWeight:700}}>Continue</button>}
      </div>
    </div>
  );
}

function SaveStatusIndicator({status}){
  if(status==="idle")return null;
  return (
    <div style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:status==="done"?"var(--accent)":"#999",padding:"6px 10px",borderRadius:6,background:"#1d1d1d",border:"1px solid #262626"}}>
      {status==="saving"?<><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" style={{animation:"spin 0.8s linear infinite"}}><circle cx="12" cy="12" r="9" strokeOpacity="0.25"/><path d="M21 12a9 9 0 00-9-9"/></svg>Saving progress...</>:<><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>Done!</>}
    </div>
  );
}

function TopBar({player,isAdmin,onOpenSettings,onOpenFeedback,onRenamePlayer,saveStatus,onOpenRedeem,onDeadmin}){
  const [showProfileMenu,setShowProfileMenu]=useState(false);
  const [editingName,setEditingName]=useState(false);
  const [nameDraft,setNameDraft]=useState(player.name);
  const menuRef=useRef(null);
  useEffect(()=>{
    const onDocClick=(e)=>{if(menuRef.current&&!menuRef.current.contains(e.target)){setShowProfileMenu(false);setEditingName(false);}};
    document.addEventListener("mousedown",onDocClick);
    return()=>document.removeEventListener("mousedown",onDocClick);
  },[]);
  const commitName=()=>{
    const trimmed=nameDraft.trim();
    if(trimmed)onRenamePlayer(trimmed);
    else setNameDraft(player.name);
    setEditingName(false);
  };
  return (
    <div style={{height:56,minHeight:56,width:"100%",background:"#161616",borderBottom:"1px solid #232323",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",position:"sticky",top:0,zIndex:1000,boxSizing:"border-box"}}>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <span style={{fontSize:14,fontWeight:800,letterSpacing:1.5,color:"#fff"}}>RL CLICKER</span>
        <button onClick={onOpenRedeem} style={{background:"linear-gradient(135deg,#a855f7,#ec4899)",border:"none",color:"#fff",borderRadius:6,padding:"6px 12px",cursor:"pointer",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",gap:6,boxShadow:"0 2px 10px rgba(168,85,247,0.35)"}}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>
          Redeem Code
        </button>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <SaveStatusIndicator status={saveStatus}/>
        <button onClick={onOpenSettings} style={{display:"flex",alignItems:"center",gap:6,background:"transparent",border:"none",color:"#aaa",fontSize:12.5,cursor:"pointer",padding:"6px 10px",borderRadius:6}} onMouseEnter={e=>e.currentTarget.style.background="#222"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 005.6 15a1.65 1.65 0 00-1.51-1H4a2 2 0 010-4h.09A1.65 1.65 0 005.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09A1.65 1.65 0 0015 4.6a1.65 1.65 0 001.82.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
          Settings
        </button>
        <div ref={menuRef} style={{position:"relative",marginLeft:4}}>
          <button onClick={()=>setShowProfileMenu(v=>!v)} style={{display:"flex",alignItems:"center",gap:7,background:showProfileMenu?"#222":"#111",border:`1px solid ${isAdmin?"#FFD70066":"#262626"}`,color:isAdmin?"#FFD700":"#ddd",fontSize:12.5,cursor:"pointer",padding:"5px 10px 5px 6px",borderRadius:7,boxShadow:isAdmin?"0 0 12px rgba(255,215,0,0.3)":"none"}}>
            <div style={{width:20,height:20,borderRadius:"50%",background:isAdmin?"linear-gradient(135deg,#FFD700,#b8860b)":"linear-gradient(135deg,#42a5f5,#1e88e5)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:isAdmin?"#111":"#fff",flexShrink:0}}>
              {isAdmin?"👑":player.name.replace("Player ","").replace("#","").slice(0,2)||"PL"}
            </div>
            <span style={{fontWeight:isAdmin?900:400,textShadow:isAdmin?"0 0 8px #FFD700":""}}>{player.name}</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="2.5" style={{transform:showProfileMenu?"rotate(180deg)":"none",transition:"transform 0.15s"}}><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          {showProfileMenu&&(
            <div style={{position:"absolute",top:"calc(100% + 6px)",right:0,background:"#1a1a1a",border:"1px solid #262626",borderRadius:8,padding:10,width:200,boxShadow:"0 8px 24px rgba(0,0,0,0.5)",zIndex:50}}>
              <div style={{fontSize:10,color:"#666",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>Display name</div>
              {editingName?(
                <div style={{display:"flex",gap:6}}>
                  <input autoFocus value={nameDraft} onChange={e=>setNameDraft(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")commitName();if(e.key==="Escape"){setNameDraft(player.name);setEditingName(false);}}} style={{flex:1,background:"#111",border:"1px solid #333",borderRadius:5,color:"#fff",fontSize:12,padding:"6px 8px",outline:"none",minWidth:0}}/>
                  <button onClick={commitName} style={{background:"var(--accent)",border:"none",color:"#fff",borderRadius:5,padding:"0 9px",cursor:"pointer",fontSize:12}}>✓</button>
                </div>
              ):(
                <button onClick={()=>{setNameDraft(player.name);setEditingName(true);}} style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",background:"#111",border:"1px solid #262626",borderRadius:6,padding:"7px 9px",color:isAdmin?"#FFD700":"#ccc",fontSize:12.5,cursor:"pointer",fontWeight:isAdmin?800:400,textShadow:isAdmin?"0 0 8px #FFD700":""}}>
                  {player.name}
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4z"/></svg>
                </button>
              )}
              {isAdmin&&(
                <>
                  <div style={{height:1,background:"#262626",margin:"10px 0 8px"}}/>
                  <button onClick={()=>{setShowProfileMenu(false);onDeadmin();}} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,width:"100%",background:"#2a1414",border:"1px solid #4a2222",color:"#f28b8b",borderRadius:6,padding:"7px 9px",fontSize:12.5,cursor:"pointer",fontWeight:700}}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    Exit Admin Mode
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SettingsModal({state,setState,settings,setSettings,onClose,onManualSave}){
  const [tab,setTab]=useState("saves");
  const [saves,setSaves]=useState(()=>loadAllSaves());
  const [toast,setToast]=useState(null);
  const [confirmSlot,setConfirmSlot]=useState(null);
  const flashToast=(text)=>{setToast(text);setTimeout(()=>setToast(null),2200);};
  const handleSaveToSlot=(slotId)=>{const next={...saves,[slotId]:{state,savedAt:Date.now()}};persistAllSaves(next);setSaves(next);setConfirmSlot(null);flashToast(`Saved to Slot ${SAVE_SLOT_IDS.indexOf(slotId)+1}`);};
  const handleLoadFromSlot=(slotId)=>{const entry=saves[slotId];if(!entry)return;setState(entry.state);setConfirmSlot(null);flashToast(`Loaded Slot ${SAVE_SLOT_IDS.indexOf(slotId)+1}`);};
  const handleDeleteSlot=(slotId)=>{const next={...saves};delete next[slotId];persistAllSaves(next);setSaves(next);setConfirmSlot(null);flashToast(`Deleted Slot ${SAVE_SLOT_IDS.indexOf(slotId)+1}`);};
  const updateSetting=(key,value)=>{const next={...settings,[key]:value};setSettings(next);saveSettings(next);};
  const Toggle=({on,onClick})=><button onClick={onClick} style={{width:38,height:22,borderRadius:11,border:"none",cursor:"pointer",background:on?"var(--accent)":"#333",position:"relative",flexShrink:0,transition:"background 0.15s"}}><div style={{position:"absolute",top:2,left:on?18:2,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left 0.15s"}}/></button>;
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:600,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={{background:"#181818",border:"1px solid #2a2a2a",borderRadius:14,width:560,maxWidth:"95vw",maxHeight:"85vh",display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 22px 14px",borderBottom:"1px solid #232323"}}>
          <div style={{fontSize:17,fontWeight:700,color:"#fff"}}>Settings</div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#555",fontSize:20,cursor:"pointer",lineHeight:1,padding:"2px 6px"}}>×</button>
        </div>
        <div style={{display:"flex",gap:4,padding:"12px 22px 0",borderBottom:"1px solid #232323"}}>
          {[{id:"saves",label:"Save & Load"},{id:"prefs",label:"Preferences"},{id:"display",label:"Display"}].map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{background:"transparent",border:"none",color:tab===t.id?"#fff":"#666",fontSize:13,fontWeight:tab===t.id?700:400,cursor:"pointer",padding:"8px 4px 12px",marginRight:14,borderBottom:tab===t.id?"2px solid var(--accent)":"2px solid transparent"}}>{t.label}</button>
          ))}
        </div>
        <div style={{padding:"18px 22px 22px",overflowY:"auto",flex:1}}>
          {tab==="saves"&&(
            <div>
              <button onClick={()=>{onManualSave();flashToast("Saved!");}} style={{display:"flex",alignItems:"center",gap:7,background:"#1f2f1f",border:"1px solid #2e4a2e",color:"#7ed98a",borderRadius:7,padding:"9px 14px",cursor:"pointer",fontSize:12.5,fontWeight:700,margin:"0 0 18px"}}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                Force-save now
              </button>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {SAVE_SLOT_IDS.map((slotId,idx)=>{
                  const entry=saves[slotId];const pending=confirmSlot&&confirmSlot.slot===slotId?confirmSlot.action:null;
                  return (
                    <div key={slotId} style={{background:"#131313",border:"1px solid #232323",borderRadius:8,padding:"12px 14px"}}>
                      <div style={{fontSize:13,fontWeight:700,color:"#eee",marginBottom:4}}>Slot {idx+1}</div>
                      {entry?<div style={{fontSize:11,color:"#666",marginBottom:8}}>Lv {entry.state.level} · €{entry.state.credits.toFixed(2)} · {new Date(entry.savedAt).toLocaleString()}</div>:<div style={{fontSize:11,color:"#444",marginBottom:8}}>Empty slot</div>}
                      <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                        {entry&&pending!=="load"&&pending!=="delete"&&<button onClick={()=>setConfirmSlot({slot:slotId,action:"load"})} style={{background:"#1c2a3a",border:"1px solid #2c4a66",color:"#7ec8f5",borderRadius:5,padding:"6px 12px",cursor:"pointer",fontSize:11.5,fontWeight:700}}>Load</button>}
                        {pending!=="save"&&pending!=="delete"&&<button onClick={()=>entry?setConfirmSlot({slot:slotId,action:"save"}):handleSaveToSlot(slotId)} style={{background:"#1f2f1f",border:"1px solid #2e4a2e",color:"#7ed98a",borderRadius:5,padding:"6px 12px",cursor:"pointer",fontSize:11.5,fontWeight:700}}>{entry?"Overwrite":"Save here"}</button>}
                        {entry&&pending!=="load"&&pending!=="save"&&<button onClick={()=>setConfirmSlot({slot:slotId,action:"delete"})} style={{background:"#2a1414",border:"1px solid #4a2222",color:"#e88",borderRadius:5,padding:"6px 12px",cursor:"pointer",fontSize:11.5,fontWeight:700}}>Delete</button>}
                        {pending==="load"&&<div style={{display:"flex",alignItems:"center",gap:8,fontSize:11.5,color:"#ccc"}}>Replace progress?<button onClick={()=>handleLoadFromSlot(slotId)} style={{background:"var(--accent)",border:"none",color:"#fff",borderRadius:5,padding:"5px 10px",cursor:"pointer",fontWeight:700}}>Yes</button><button onClick={()=>setConfirmSlot(null)} style={{background:"transparent",border:"1px solid #333",color:"#888",borderRadius:5,padding:"5px 10px",cursor:"pointer"}}>No</button></div>}
                        {pending==="save"&&<div style={{display:"flex",alignItems:"center",gap:8,fontSize:11.5,color:"#ccc"}}>Overwrite?<button onClick={()=>handleSaveToSlot(slotId)} style={{background:"var(--accent)",border:"none",color:"#fff",borderRadius:5,padding:"5px 10px",cursor:"pointer",fontWeight:700}}>Yes</button><button onClick={()=>setConfirmSlot(null)} style={{background:"transparent",border:"1px solid #333",color:"#888",borderRadius:5,padding:"5px 10px",cursor:"pointer"}}>No</button></div>}
                        {pending==="delete"&&<div style={{display:"flex",alignItems:"center",gap:8,fontSize:11.5,color:"#ccc"}}>Delete permanently?<button onClick={()=>handleDeleteSlot(slotId)} style={{background:"#e74c3c",border:"none",color:"#fff",borderRadius:5,padding:"5px 10px",cursor:"pointer",fontWeight:700}}>Yes</button><button onClick={()=>setConfirmSlot(null)} style={{background:"transparent",border:"1px solid #333",color:"#888",borderRadius:5,padding:"5px 10px",cursor:"pointer"}}>No</button></div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {tab==="prefs"&&(
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              {[
                {key:"autosave",label:"Autosave",desc:"Auto-save your game on a timer"},
                {key:"confirmSell",label:"Confirm before selling",desc:"Ask before selling a single item"},
                {key:"reduceMotion",label:"Reduce motion",desc:"Stop the starfield from drifting"},
                {key:"showFloatingNumbers",label:"Floating click numbers",desc:"Show +€ / +XP popups on click"},
                {key:"soundEnabled",label:"Sound effects",desc:"Play tones for clicks, crates, levels"},
              ].map(({key,label,desc})=>(
                <div key={key} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"#131313",border:"1px solid #232323",borderRadius:8,padding:"12px 14px"}}>
                  <div><div style={{fontSize:13,fontWeight:700,color:"#eee"}}>{label}</div><div style={{fontSize:11,color:"#666",marginTop:2}}>{desc}</div></div>
                  <Toggle on={settings[key]} onClick={()=>updateSetting(key,!settings[key])}/>
                </div>
              ))}
              {settings.soundEnabled&&(
                <div style={{background:"#131313",border:"1px solid #232323",borderRadius:8,padding:"12px 14px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><div style={{fontSize:13,fontWeight:700,color:"#eee"}}>Volume</div><div style={{fontSize:11,color:"#666"}}>{Math.round(settings.soundVolume*100)}%</div></div>
                  <input type="range" min="0" max="1" step="0.05" value={settings.soundVolume} onChange={e=>updateSetting("soundVolume",parseFloat(e.target.value))} style={{width:"100%",accentColor:settings.accentColor}}/>
                </div>
              )}
            </div>
          )}
          {tab==="display"&&(
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              <div style={{fontSize:11,color:"#555",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>Accent color</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:8}}>
                {ACCENT_PRESETS.map(p=>{const active=settings.accentColor.toLowerCase()===p.color.toLowerCase();return(
                  <button key={p.color} onClick={()=>updateSetting("accentColor",p.color)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,background:"transparent",border:"none",cursor:"pointer",padding:4}}>
                    <div style={{width:34,height:34,borderRadius:"50%",background:p.color,border:active?"3px solid #fff":"3px solid transparent",boxShadow:active?`0 0 0 2px ${p.color}`:"none"}}/>
                    <span style={{fontSize:9.5,color:active?"#fff":"#777",textAlign:"center",maxWidth:60,lineHeight:1.2}}>{p.name}</span>
                  </button>
                );})}
              </div>
              <div style={{display:"flex",alignItems:"center",gap:10,background:"#131313",border:"1px solid #232323",borderRadius:8,padding:"10px 14px"}}>
                <span style={{fontSize:12,color:"#888"}}>Custom</span>
                <input type="color" value={settings.accentColor} onChange={e=>updateSetting("accentColor",e.target.value)} style={{width:34,height:28,border:"1px solid #2a2a2a",borderRadius:5,background:"none",cursor:"pointer",padding:0}}/>
                <span style={{fontSize:11,color:"#555",fontFamily:"monospace"}}>{settings.accentColor}</span>
              </div>
            </div>
          )}
        </div>
        {toast&&<div style={{position:"absolute",bottom:16,left:"50%",transform:"translateX(-50%)",background:"#1f2f1f",border:"1px solid #2e4a2e",color:"#7ed98a",borderRadius:7,padding:"8px 16px",fontSize:12.5,fontWeight:600,boxShadow:"0 4px 16px rgba(0,0,0,0.5)"}}>{toast}</div>}
      </div>
    </div>
  );
}

const MULTI_OPTIONS=[1,2,3,4,5];
const ITEM_W=160;

export default function RLClicker(){
  



  const [state,setState]=useState(()=>loadState());
  const [page,setPage]=useState("earn");
  const [floats,setFloats]=useState([]);
  const [levelUp,setLevelUp]=useState(null);
  const [openingCrate,setOpeningCrate]=useState(null);
  const [crateResult,setCrateResult]=useState(null);
  const [rolling,setRolling]=useState(false);
  const [reelOffset,setReelOffset]=useState(0);
  const [reelItems,setReelItems]=useState([]);
  const [multiOpenData,setMultiOpenData]=useState(null);
  const [showRedeem,setShowRedeem]=useState(false);
  const [filterRarity,setFilterRarity]=useState("All");
  const [showWheel,setShowWheel]=useState(false);
  const [wheelSpinning,setWheelSpinning]=useState(false);
  const [wheelRotation,setWheelRotation]=useState(0);
  const [wheelResult,setWheelResult]=useState(null);
  const wheelCanvasRef=useRef(null);
  const wheelRafRef=useRef(null);
  const clickAreaRef=useRef(null);
  const saveTimer=useRef(null);
  const [discountData,setDiscountData]=useState(()=>getDiscountPeriod());
  const [multiCount,setMultiCount]=useState(1);
  const [player,setPlayer]=useState(()=>loadPlayer());
  const [settings,setSettings]=useState(()=>loadSettings());
  const [showSettings,setShowSettings]=useState(false);
  const [saveStatus,setSaveStatus]=useState("idle");
  const saveStatusTimers=useRef([]);
  const [showSetCredits,setShowSetCredits]=useState(false);

  useEffect(()=>{const t=setInterval(()=>setDiscountData(getDiscountPeriod()),1000);return()=>clearInterval(t);},[]);
  const DISCOUNT_IDS=discountData.ids;
  const stateRef=useRef(state);
  useEffect(()=>{stateRef.current=state;},[state]);
  const runAutosaveIndicator=useCallback(()=>{
    saveStatusTimers.current.forEach(clearTimeout);saveStatusTimers.current=[];
    setSaveStatus("saving");
    saveStatusTimers.current.push(setTimeout(()=>setSaveStatus("done"),550));
    saveStatusTimers.current.push(setTimeout(()=>setSaveStatus("idle"),2400));
  },[]);
  useEffect(()=>{
    if(!settings.autosave)return;
    const intervalMs=Math.max(1,settings.autosaveIntervalSec||90)*1000;
    saveTimer.current=setInterval(()=>{saveState(stateRef.current);runAutosaveIndicator();},intervalMs);
    return()=>clearInterval(saveTimer.current);
  },[settings.autosave,settings.autosaveIntervalSec,runAutosaveIndicator]);
  useEffect(()=>()=>saveStatusTimers.current.forEach(clearTimeout),[]);
  useEffect(()=>{if(showWheel)drawWheel(wheelCanvasRef.current,wheelRotation);},[showWheel,wheelRotation]);

  const renamePlayer=(name, isAdmin=false)=>{
    const next={...player,name,isAdmin:isAdmin||player.isAdmin};
    setPlayer(next);savePlayer(next);
  };
  const deadmin=()=>{
    setState(prev=>({...prev,isAdmin:false}));
    const next={...player,isAdmin:false,name:"Player #"+Math.floor(1000+Math.random()*9000)};
    setPlayer(next);savePlayer(next);
    setShowSetCredits(false);
  };
  const manualSaveNow=()=>saveState(state);

  const addFloat=useCallback((x,y,text)=>{
    if(!settings.showFloatingNumbers)return;
    const id=Date.now()+Math.random();
    setFloats(f=>[...f,{id,x,y,text}]);
    setTimeout(()=>setFloats(f=>f.filter(fl=>fl.id!==id)),1000);
  },[settings.showFloatingNumbers]);

  const handleMoneyCounterClick=useCallback(()=>{
    if(state.isAdmin){setShowSetCredits(true);}
  },[state.isAdmin]);

  const handleClick=useCallback((e)=>{
    const rect=clickAreaRef.current?.getBoundingClientRect();
    const x=e.clientX-(rect?.left||0),y=e.clientY-(rect?.top||0);
    if(settings.soundEnabled)playSound("click",settings.soundVolume);
    setState(prev=>{
      const earn=getLevelEarnings(prev.level);
      const newCredits=parseFloat((prev.credits+earn).toFixed(2));
      const newXp=prev.xp+XP_PER_CLICK;
      let newLevel=prev.level;
      while(newLevel<MAX_LEVEL&&newXp>=LEVEL_XP[newLevel]){
        newLevel++;const lvl=newLevel;
        setTimeout(()=>{setLevelUp(lvl);if(settings.soundEnabled)playSound("levelUp",settings.soundVolume);setTimeout(()=>setLevelUp(null),2200);},0);
      }
      addFloat(x,y,`+€${earn.toFixed(2)}`);
      addFloat(x+45,y+16,`+${XP_PER_CLICK}XP`);
      return{...prev,credits:newCredits,xp:newXp,level:newLevel,totalClicks:prev.totalClicks+1};
    });
  },[addFloat,settings.soundEnabled,settings.soundVolume]);

  // Admin: all crates effectively level 1 if admin
  const effectiveLevelReq = (crate) => state.isAdmin ? 1 : crate.levelReq;

  const openCrate=(crate,count=1)=>{
    const totalCost=crate.cost*count;
    if(state.credits<totalCost||state.level<effectiveLevelReq(crate))return;
    const minR=crate.minRarity||0;
    const maxR=crate.maxRarity??(RARITIES.length-1);
    const bf=crate.boostFactor??0.3;
    if(count>1){
      setState(prev=>({...prev,credits:parseFloat((prev.credits-totalCost).toFixed(2)),totalCratesOpened:(prev.totalCratesOpened||0)+count}));
      if(settings.soundEnabled)playSound("crateOpen",settings.soundVolume);
      setMultiOpenData({crate,count});return;
    }
    setState(prev=>({...prev,credits:parseFloat((prev.credits-crate.cost).toFixed(2))}));
    if(settings.soundEnabled)playSound("crateOpen",settings.soundVolume);
    const COUNT=60,finalItem=rollItem(crate.rarityBoost,minR,maxR,bf);
    const items=Array.from({length:COUNT},(_,i)=>i===COUNT-8?finalItem:rollItem(crate.rarityBoost,minR,maxR,bf));
    setReelItems(items);setReelOffset(0);setOpeningCrate(crate);setCrateResult(null);setRolling(true);
    const target=(COUNT-8-2)*ITEM_W,dur=4500,start=performance.now();
    const anim=(now)=>{
      const t=Math.min((now-start)/dur,1);
      setReelOffset((1-Math.pow(1-t,4))*target);
      if(t<1)requestAnimationFrame(anim);
      else{
        setReelOffset(target);
        setTimeout(()=>{
          setRolling(false);setCrateResult(finalItem);
          if(settings.soundEnabled){const rIdx=RARITIES.findIndex(r=>r.name===finalItem.rarity);playSound(rIdx>=6?"itemEpic":rIdx>=4?"itemRare":"itemCommon",settings.soundVolume);}
          setState(prev=>({...prev,inventory:[{...finalItem,id:Date.now()+Math.random()},...prev.inventory],totalCratesOpened:(prev.totalCratesOpened||0)+1}));
        },300);
      }
    };
    requestAnimationFrame(anim);
  };
  const closeRoll=()=>{setOpeningCrate(null);setCrateResult(null);setRolling(false);};
  const handleMultiItemsAdded=(items)=>setState(prev=>({...prev,inventory:[...items,...prev.inventory]}));
  const closeMultiOpen=()=>setMultiOpenData(null);

  const canSpin=()=>Date.now()-state.lastWheelSpin>=24*60*60*1000;
  const msUntilNextSpin=()=>{
    const diff=state.lastWheelSpin+24*60*60*1000-Date.now();
    if(diff<=0)return null;
    const h=Math.floor(diff/3600000),m=Math.floor((diff%3600000)/60000),s=Math.floor((diff%60000)/1000);
    return `${h}h ${m}m ${s}s`;
  };
  const [countdown,setCountdown]=useState(msUntilNextSpin());
  useEffect(()=>{const t=setInterval(()=>setCountdown(msUntilNextSpin()),1000);return()=>clearInterval(t);},[state.lastWheelSpin]);

  const spinWheel=()=>{
    if(!canSpin()||wheelSpinning)return;
    setWheelResult(null);setWheelSpinning(true);
    const total=WHEEL_SEGMENTS.reduce((s,seg)=>s+seg.weight,0);
    let roll=Math.random()*total,winIdx=0;
    for(let i=0;i<WHEEL_SEGMENTS.length;i++){roll-=WHEEL_SEGMENTS[i].weight;if(roll<=0){winIdx=i;break;}}
    const currentNorm=((wheelRotation%(2*Math.PI))+(2*Math.PI))%(2*Math.PI);
    const targetNorm=(((-(winIdx+0.5)*SEG_ANGLE)%(2*Math.PI))+(2*Math.PI))%(2*Math.PI);
    let delta=targetNorm-currentNorm;if(delta<=0)delta+=2*Math.PI;
    const totalDelta=delta+(Math.floor(8*Math.PI/(2*Math.PI))+1)*2*Math.PI;
    const startRot=wheelRotation,targetRot=startRot+totalDelta,dur=5000,start=performance.now();
    const anim=(now)=>{
      const t=Math.min((now-start)/dur,1),ease=1-Math.pow(1-t,3);
      setWheelRotation(startRot+(targetRot-startRot)*ease);
      if(t<1)wheelRafRef.current=requestAnimationFrame(anim);
      else{
        setWheelRotation(targetRot);setWheelSpinning(false);
        const seg=WHEEL_SEGMENTS[winIdx];setWheelResult(seg);
        if(settings.soundEnabled)playSound(seg.type==="item"?"itemEpic":seg.type==="none"?"lose":"win",settings.soundVolume);
        setState(prev=>{
          let next={...prev,lastWheelSpin:Date.now(),totalWheelSpins:(prev.totalWheelSpins||0)+1};
          if(seg.type==="money")next.credits=parseFloat((prev.credits+seg.value).toFixed(2));
          else if(seg.type==="xp"){const newXp=prev.xp+seg.value;let lv=prev.level;while(lv<MAX_LEVEL&&newXp>=LEVEL_XP[lv])lv++;next.xp=newXp;next.level=lv;}
          else if(seg.type==="item"){
            const tr=RARITIES.find(r=>r.name===seg.rarity);
            const ty=ITEM_TYPES[Math.floor(Math.random()*ITEM_TYPES.length)];
            const nm=ITEMS[ty][Math.floor(Math.random()*ITEMS[ty].length)];
            const tl=ty.charAt(0).toUpperCase()+ty.slice(1).replace(/([A-Z])/g,' $1').trim();
            const val=Math.floor(tr.valueRange[0]+Math.random()*(tr.valueRange[1]-tr.valueRange[0]));
            next.inventory=[{id:Date.now()+Math.random(),name:tl+": "+nm,rarity:tr.name,rarityColor:tr.color,value:val,locked:false,type:tl,itemName:nm},...prev.inventory];
          }
          return next;
        });
      }
    };
    wheelRafRef.current=requestAnimationFrame(anim);
  };

  const sellItem=(id)=>setState(prev=>{
    const item=prev.inventory.find(i=>i.id===id);
    if(!item||item.locked)return prev;
    if(settings.confirmSell&&!window.confirm(`Sell "${item.itemName||item.name}" for €${item.value}?`))return prev;
    return{...prev,credits:parseFloat((prev.credits+item.value).toFixed(2)),inventory:prev.inventory.filter(i=>i.id!==id),totalSold:(prev.totalSold||0)+1,totalSellEarnings:(prev.totalSellEarnings||0)+item.value};
  });
  const sellAll=()=>setState(prev=>{
    const unlocked=prev.inventory.filter(i=>!i.locked);
    const total=unlocked.reduce((s,i)=>s+i.value,0);
    return{...prev,credits:parseFloat((prev.credits+total).toFixed(2)),inventory:prev.inventory.filter(i=>i.locked),totalSold:(prev.totalSold||0)+unlocked.length,totalSellEarnings:(prev.totalSellEarnings||0)+total};
  });
  const toggleLock=(id)=>setState(prev=>({...prev,inventory:prev.inventory.map(i=>i.id===id?{...i,locked:!i.locked}:i)}));
  const resetProgress=()=>{if(window.confirm("Reset all progress?")){localStorage.removeItem("rl_clicker_v7");localStorage.removeItem(PLAYER_KEY);setState(INITIAL_STATE);setPlayer(loadPlayer());}};

  const xpForNext=state.level<MAX_LEVEL?LEVEL_XP[state.level]:LEVEL_XP[MAX_LEVEL-1];
  const xpForCurrent=state.level>1?LEVEL_XP[state.level-1]:0;
  const xpIntoLevel=state.xp-xpForCurrent;
  const xpNeededForLevel=xpForNext-xpForCurrent;
  const xpPct=state.level>=MAX_LEVEL?100:Math.min(100,(xpIntoLevel/xpNeededForLevel)*100);
  const totalValue=state.inventory.filter(i=>!i.locked).reduce((s,i)=>s+i.value,0);
  const filtered=filterRarity==="All"?state.inventory:state.inventory.filter(i=>i.rarity===filterRarity);
  const cratesByTier=CRATE_TYPES.reduce((acc,c)=>{if(!acc[c.tier])acc[c.tier]=[];acc[c.tier].push(c);return acc},{});
  const claimableCount=ACHIEVEMENTS.filter(a=>a.check(state)&&!(state.claimedAchievements||[]).includes(a.id)).length;
  const REEL_VISIBLE=5,REEL_W=REEL_VISIBLE*ITEM_W;
  const rankInfo=getRankInfo(state.level);
  const TOPBAR_H=56;
  const isAdmin=state.isAdmin||player.isAdmin;

  return (
    <div style={{display:"flex",flexDirection:"column",minHeight:"100vh",background:"#111",color:"#fff",fontFamily:"'Segoe UI',sans-serif","--accent":settings.accentColor}}>
      <style>{`
        @keyframes floatUp{0%{transform:translateY(0);opacity:1}100%{transform:translateY(-60px);opacity:0}}
        @keyframes levelPop{0%{transform:translate(-50%,-50%) scale(0.7);opacity:0}15%{transform:translate(-50%,-50%) scale(1.05);opacity:1}85%{transform:translate(-50%,-50%) scale(1);opacity:1}100%{transform:translate(-50%,-50%) scale(0.9);opacity:0}}
        @keyframes goldPulse{0%,100%{text-shadow:0 0 8px #FFD700,0 0 16px #FFD70066}50%{text-shadow:0 0 18px #FFD700,0 0 36px #FFD70099}}
        @keyframes adminGlow{0%,100%{text-shadow:0 0 10px #FFD700,0 0 20px #FFD70088}50%{text-shadow:0 0 24px #FFD700,0 0 48px #FFD700aa}}
        @keyframes slideInNotif{0%{transform:translateX(40px);opacity:0}100%{transform:translateX(0);opacity:1}}
        @keyframes bmShimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes discountShimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes discountPulse{0%,100%{box-shadow:0 0 20px rgba(239,68,68,0.5),0 0 40px rgba(239,68,68,0.2)}50%{box-shadow:0 0 30px rgba(239,68,68,0.8),0 0 60px rgba(239,68,68,0.4)}}
        @keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
        ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#111}::-webkit-scrollbar-thumb{background:#333;border-radius:3px}
      `}</style>

      <TopBar player={player} isAdmin={isAdmin} onOpenSettings={()=>setShowSettings(true)} onOpenFeedback={()=>{}} onRenamePlayer={renamePlayer} saveStatus={saveStatus} onOpenRedeem={()=>setShowRedeem(true)} onDeadmin={deadmin}/>

      <div style={{display:"flex",flex:1,minHeight:0}}>
        {/* SIDEBAR */}
        <div style={{width:230,background:"#1a1a1a",display:"flex",flexDirection:"column",borderRight:"1px solid #222",position:"sticky",top:TOPBAR_H,height:`calc(100vh - ${TOPBAR_H}px)`,zIndex:5}}>
          {/* Money counter — thin font, € sign, clickable for admin */}
          <div style={{padding:"20px 20px 6px",cursor:isAdmin?"pointer":"default",position:"relative"}}
            onClick={handleMoneyCounterClick}
            title={isAdmin?"Click to set credits":""}
          >
            {isAdmin && (
              <div style={{position:"absolute",top:8,right:8,fontSize:9,color:"#FFD700",background:"rgba(255,215,0,0.1)",border:"1px solid #FFD70044",borderRadius:4,padding:"2px 6px",fontWeight:700,letterSpacing:0.5}}>
                👑 CLICK TO SET
              </div>
            )}
            {/* Money counter: thin font weight, € prefix */}
            <div style={{
              fontSize:32,
              fontWeight:300,
              letterSpacing:-0.5,
              color: isAdmin ? "#FFD700" : "#fff",
              textShadow: isAdmin ? "0 0 16px rgba(255,215,0,0.5)" : "none",
              lineHeight:1.1,
            }}>
              <span style={{fontSize:20,fontWeight:200,opacity:0.7}}>€</span>{state.credits.toFixed(2)}
            </div>
            <div style={{fontSize:11,color:"#666",margin:"4px 0 5px"}}>
              Level {state.level}{state.level>=MAX_LEVEL?" (MAX)":""} &nbsp;·&nbsp;
              <span style={{color:"#a78bfa"}}>{state.level>=MAX_LEVEL?"MAX":`${Math.floor(xpIntoLevel)} / ${Math.floor(xpNeededForLevel)} XP`}</span>
            </div>
            <div style={{height:5,background:"#2a2a2a",borderRadius:3,overflow:"hidden",marginBottom:10}}>
              <div style={{height:"100%",background:state.level>=MAX_LEVEL?"#FFD700":"var(--accent)",width:`${xpPct}%`,transition:"width 0.4s"}}/>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:7,padding:"7px 10px",background:"#111",borderRadius:6,border:`1px solid ${isAdmin?"#FFD70033":"#222"}`,marginBottom:2}}>
              <RankIcon color={rankInfo.color} size={15}/>
              <div>
                <div style={{fontSize:11,fontWeight:700,color:rankInfo.color,letterSpacing:0.5,lineHeight:1.2}}>{rankInfo.display}</div>
                <div style={{fontSize:9,color:"#555",lineHeight:1.2}}>{rankInfo.sub}</div>
              </div>
            </div>
          </div>
          <div style={{height:1,background:"#222",margin:"8px 0 0"}}/>
          <nav style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column"}}>
            <button onClick={()=>setShowWheel(true)} style={{display:"flex",alignItems:"center",width:"100%",padding:"11px 20px",background:"transparent",border:"none",color:"#FFD700",fontSize:14,cursor:"pointer",textAlign:"left",borderLeft:"3px solid transparent",gap:10,animation:"goldPulse 2s infinite"}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
              Lucky Wheel
              {canSpin()?<span style={{marginLeft:"auto",fontSize:10,background:"#FFD700",color:"#111",borderRadius:3,padding:"1px 5px",fontWeight:700}}>READY</span>:<span style={{marginLeft:"auto",fontSize:10,color:"#856404"}}>{countdown}</span>}
            </button>
            <div style={{height:1,background:"#222",margin:"0 0 2px"}}/>
            {[
              {id:"earn",label:"Earn",icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/><path d="M12 6v6l4 2"/></svg>},
              {id:"crates",label:"Crates",icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-4 0v2"/><line x1="12" y1="12" x2="12" y2="17"/><line x1="9.5" y1="14.5" x2="14.5" y2="14.5"/></svg>},
              {id:"coinflip",label:"Coin Flip",icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>},
              {id:"inventory",label:"Inventory",icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>},
            ].map(item=>(
              <button key={item.id} onClick={()=>setPage(item.id)} style={{display:"flex",alignItems:"center",width:"100%",padding:"11px 20px",background:page===item.id?"#242424":"transparent",border:"none",color:page===item.id?"#fff":"#777",fontSize:14,cursor:"pointer",textAlign:"left",borderLeft:page===item.id?"3px solid var(--accent)":"3px solid transparent",gap:10}}>
                {item.icon}{item.label}
              </button>
            ))}
            <div style={{flex:1}}/>
            <button onClick={()=>setPage("allitems")} style={{display:"flex",alignItems:"center",width:"100%",padding:"11px 20px",background:page==="allitems"?"#242424":"transparent",border:"none",color:page==="allitems"?"#fff":"#777",fontSize:14,cursor:"pointer",textAlign:"left",borderLeft:page==="allitems"?"3px solid var(--accent)":"3px solid transparent",gap:10}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              All Items
            </button>
            <button onClick={()=>setPage("achievements")} style={{display:"flex",alignItems:"center",width:"100%",padding:"11px 20px",background:page==="achievements"?"#242424":"transparent",border:"none",color:page==="achievements"?"#fff":"#777",fontSize:14,cursor:"pointer",textAlign:"left",borderLeft:page==="achievements"?"3px solid var(--accent)":"3px solid transparent",gap:10}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="6"/><path d="M9 14l-3 6h12l-3-6"/></svg>
              Achievements
              {claimableCount>0&&<span style={{marginLeft:"auto",fontSize:10,background:"var(--accent)",color:"#fff",borderRadius:3,padding:"1px 6px",fontWeight:700}}>{claimableCount}</span>}
            </button>
          </nav>
          <button onClick={resetProgress} style={{margin:"0 20px 16px",padding:"8px",background:"transparent",border:"1px solid #2a2a2a",color:"#555",borderRadius:4,cursor:"pointer",fontSize:12}}>Reset Progress</button>
        </div>

        {/* MAIN */}
        <div style={{flex:1,position:"relative",minHeight:`calc(100vh - ${TOPBAR_H}px)`}}>
          {page==="earn"&&(
            <div ref={clickAreaRef} onClick={handleClick} style={{width:"100%",minHeight:`calc(100vh - ${TOPBAR_H}px)`,cursor:"crosshair",position:"relative",overflow:"hidden",userSelect:"none",background:"#0d0d0d"}}>
              <StarField reduceMotion={settings.reduceMotion}/>
              <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center",pointerEvents:"none",zIndex:2}}>
                <div style={{fontSize:72,fontWeight:200,color:"#2a2a2a",lineHeight:1,marginBottom:10,userSelect:"none"}}>€</div>
                <div style={{color:"#444",fontSize:14}}>Click the screen to earn credits!</div>
                <div style={{color:"#333",fontSize:13,marginTop:4}}>€{getLevelEarnings(state.level).toFixed(2)} / click</div>
              </div>
              {floats.map(f=><div key={f.id} style={{position:"absolute",left:f.x,top:f.y,pointerEvents:"none",fontSize:13,fontWeight:700,color:f.text.includes("XP")?"#a78bfa":"var(--accent)",animation:"floatUp 1s forwards",zIndex:4}}>{f.text}</div>)}
              {levelUp&&<div style={{position:"absolute",top:"50%",left:"50%",background:"#1c1c1c",border:"1px solid #333",borderRadius:12,padding:"28px 52px",textAlign:"center",zIndex:20,animation:"levelPop 2.2s forwards"}}><div style={{fontSize:26,fontWeight:700,color:"var(--accent)"}}>LEVEL UP!</div><div style={{color:"#888",marginTop:8,fontSize:14}}>You reached level {levelUp}</div><div style={{color:rankInfo.color,fontSize:13,marginTop:4}}>{getRankInfo(levelUp).display} — {getRankInfo(levelUp).sub}</div></div>}
            </div>
          )}

          {page==="crates"&&(
            <div style={{padding:"28px 32px",overflowY:"auto",minHeight:`calc(100vh - ${TOPBAR_H}px)`,background:"#111"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
                <h1 style={{fontSize:26,fontWeight:700,margin:0,color:"#fff"}}>Crates</h1>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <span style={{fontSize:11,color:"#555",marginRight:4}}>Open multiple:</span>
                  {MULTI_OPTIONS.map(n=>{const active=multiCount===n;return<button key={n} onClick={()=>setMultiCount(n)} style={{background:active?"var(--accent)":"#1a1a1a",border:`1px solid ${active?"var(--accent)":"#333"}`,color:active?"#fff":"#888",borderRadius:4,padding:"5px 12px",cursor:"pointer",fontSize:13,fontWeight:active?700:400}}>x{n}</button>;})}
                </div>
              </div>
              <p style={{color:"#444",fontSize:13,margin:"0 0 24px"}}>{isAdmin?"👑 ADMIN: All crates unlocked.":"Some crates require a higher level to unlock."}</p>
              {DISCOUNT_IDS.length>0&&(
                <div style={{marginBottom:40,position:"relative"}}>
                  <div style={{position:"relative",background:"linear-gradient(135deg,#0a1f0a 0%,#0d2d10 40%,#0a2318 100%)",border:"2px solid #22c55e",borderRadius:14,padding:"18px 24px 16px",marginBottom:18,overflow:"hidden",boxShadow:"0 0 40px rgba(34,197,94,0.2)"}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
                      <div style={{display:"flex",alignItems:"center",gap:14}}>
                        <div style={{background:"linear-gradient(135deg,#f97316,#ef4444,#dc2626)",borderRadius:10,padding:"6px 14px",animation:"discountPulse 1.5s ease-in-out infinite"}}>
                          <div style={{fontSize:22,fontWeight:900,color:"#fff",lineHeight:1}}>20% OFF</div>
                          <div style={{fontSize:9,color:"rgba(255,255,255,0.7)",letterSpacing:2}}>LIMITED TIME</div>
                        </div>
                        <div>
                          <div style={{fontSize:17,fontWeight:800,color:"#fff"}}>DAILY SALE</div>
                          <div style={{fontSize:12,color:"#4ade80",marginTop:1}}>Prices slashed on selected crates</div>
                        </div>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:8,background:"rgba(0,0,0,0.3)",borderRadius:8,padding:"8px 14px",border:"1px solid rgba(34,197,94,0.3)"}}>
                        <div style={{fontSize:9,color:"#555",letterSpacing:1}}>REFRESHES IN</div>
                        <div style={{fontSize:14,fontWeight:700,color:"#4ade80"}}><DiscountTimer/></div>
                      </div>
                    </div>
                  </div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:16}}>
                    {CRATE_TYPES.filter(c=>DISCOUNT_IDS.includes(c.id)).map(crate=>{
                      const locked=state.level<effectiveLevelReq(crate),dc=Math.floor(crate.cost*0.8),canAff=state.credits>=dc*multiCount;
                      return(
                        <div key={crate.id+"_disc"} style={{position:"relative",background:"linear-gradient(160deg,#0f1f0f,#162616)",border:"2px solid #22c55e",borderRadius:12,padding:"20px 18px",width:188,textAlign:"center",overflow:"hidden"}}>
                          <div style={{position:"absolute",top:-1,right:-1,background:"linear-gradient(135deg,#f97316,#ef4444)",borderRadius:"0 12px 0 12px",padding:"5px 10px"}}><div style={{fontSize:13,fontWeight:900,color:"#fff"}}>-20%</div></div>
                          <div style={{display:"flex",justifyContent:"center",marginBottom:10,marginTop:4}}><CrateIcon id={crate.id} size={60}/></div>
                          <div style={{fontWeight:700,fontSize:14,marginBottom:8,color:"#fff"}}>{crate.name}</div>
                          <div style={{marginBottom:12}}>
                            <div style={{fontSize:12,color:"#666",textDecoration:"line-through"}}>€{crate.cost}</div>
                            <div style={{fontSize:22,fontWeight:900,color:"#4ade80"}}>€{dc}</div>
                          </div>
                          <button onClick={()=>!locked&&canAff&&openCrate({...crate,cost:dc},multiCount)} disabled={locked||!canAff}
                            style={{background:locked?"#1a0d00":!canAff?"#161616":"linear-gradient(135deg,#16a34a,#15803d)",border:locked?"1px solid #5a3000":!canAff?"1px solid #222":"1px solid #22c55e",color:locked?"#5a3000":!canAff?"#444":"#fff",borderRadius:6,padding:"9px 0",cursor:locked||!canAff?"not-allowed":"pointer",fontSize:13,fontWeight:700,width:"100%"}}>
                            {locked?`Unlock Lv.${effectiveLevelReq(crate)}`:!canAff?"Not enough €":multiCount>1?`Open x${multiCount}`:"Open Crate"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {Object.entries(cratesByTier).map(([tier,crates])=>(
                <div key={tier} style={{marginBottom:32}}>
                  <div style={{fontSize:11,color:"#555",letterSpacing:2,marginBottom:14,borderBottom:"1px solid #1e1e1e",paddingBottom:6}}>{tier}</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:14}}>
                    {crates.map(crate=>{
                      const locked=state.level<effectiveLevelReq(crate),isDisc=DISCOUNT_IDS.includes(crate.id),cost=isDisc?Math.floor(crate.cost*0.8):crate.cost,canAff=state.credits>=cost*multiCount;
                      return(
                        <div key={crate.id} style={{background:"#1a1a1a",border:`1px solid ${locked?"#2a1a00":isDisc?"#2a4a2a":"#242424"}`,borderRadius:8,padding:"18px 16px",width:170,textAlign:"center",position:"relative",opacity:locked?0.7:1}}>
                          {isDisc&&!locked&&<div style={{position:"absolute",top:8,right:8,background:"#1a3a1a",border:"1px solid #2a5a2a",borderRadius:3,padding:"1px 6px",fontSize:10,color:"var(--accent)",fontWeight:700}}>-20%</div>}
                          {locked&&<div style={{position:"absolute",top:8,left:8,background:"#2a1500",border:"1px solid #5a3000",borderRadius:4,padding:"2px 7px",fontSize:10,color:"#f39c12",fontWeight:700}}>LVL {effectiveLevelReq(crate)}</div>}
                          <div style={{display:"flex",justifyContent:"center",marginBottom:10}}><CrateIcon id={crate.id} size={52}/></div>
                          <div style={{fontWeight:700,fontSize:14,marginBottom:3}}>{crate.name}</div>
                          {isDisc&&!locked?(<div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:6,marginBottom:12}}><span style={{color:"#444",fontSize:12,textDecoration:"line-through"}}>€{crate.cost}</span><span style={{color:"var(--accent)",fontSize:15,fontWeight:700}}>€{cost}</span></div>):<div style={{color:"#666",fontSize:13,marginBottom:12}}>€{crate.cost}</div>}
                          <button onClick={()=>{if(locked||!canAff)return;openCrate({...crate,cost},multiCount);}} disabled={locked||!canAff} style={{background:locked?"#1a0d00":!canAff?"#161616":"#242424",border:"1px solid #2e2e2e",color:locked?"#5a3000":!canAff?"#444":"#ccc",borderRadius:4,padding:"7px 0",cursor:locked||!canAff?"not-allowed":"pointer",fontSize:13,width:"100%"}}>
                            {locked?`Unlock Lv.${effectiveLevelReq(crate)}`:multiCount>1?`Open x${multiCount}`:"Open Crate"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {page==="coinflip"&&<CoinFlipPage state={state} setState={setState}/>}

          {page==="inventory"&&(
            <div style={{padding:"28px 32px",overflowY:"auto",minHeight:`calc(100vh - ${TOPBAR_H}px)`,background:"#111"}}>
              <h1 style={{fontSize:26,fontWeight:700,margin:"0 0 4px",color:"#fff"}}>Inventory</h1>
              <div style={{color:"#555",fontSize:13,marginBottom:16}}>Total value: €{totalValue} &nbsp;·&nbsp; {state.inventory.length} items</div>
              <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap",alignItems:"center"}}>
                <button onClick={sellAll} style={{background:"#e67e22",border:"none",color:"#fff",borderRadius:4,padding:"8px 14px",cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",gap:6}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                  Sell All Unlocked
                </button>
                <select value={filterRarity} onChange={e=>setFilterRarity(e.target.value)} style={{background:"#1a1a1a",border:"1px solid #2a2a2a",color:"#ccc",borderRadius:4,padding:"8px 10px",fontSize:13,cursor:"pointer"}}>
                  <option>All</option>
                  {RARITIES.map(r=><option key={r.name}>{r.name}</option>)}
                </select>
              </div>
              {filtered.length===0?<div style={{color:"#444",textAlign:"center",padding:"56px 0",fontSize:14}}>No items yet — open some crates!</div>
                :<div style={{display:"flex",flexWrap:"wrap",gap:12}}>{filtered.map(item=><ItemCard key={item.id} item={item} size="normal" onSell={sellItem} onLock={toggleLock} showActions={true}/>)}</div>}
            </div>
          )}

          {page==="achievements"&&<AchievementsPage state={state} setState={setState}/>}
          {page==="allitems"&&<AllItemsPage/>}
        </div>

        {/* SINGLE CRATE ROLL MODAL */}
        {openingCrate&&(
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <div style={{background:"#181818",border:"1px solid #2a2a2a",borderRadius:12,padding:"28px 28px 24px",width:REEL_W+80,maxWidth:"95vw",textAlign:"center"}}>
              <div style={{fontSize:17,fontWeight:700,marginBottom:20,color:"#ddd"}}>Opening {openingCrate.name}...</div>
              <div style={{position:"relative",width:REEL_W,margin:"0 auto 24px",overflow:"hidden",borderRadius:6}}>
                <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,#181818 0%,transparent 18%,transparent 82%,#181818 100%)",zIndex:3,pointerEvents:"none"}}/>
                <div style={{position:"absolute",top:0,bottom:0,left:"50%",transform:"translateX(-1px)",width:2,background:"var(--accent)",zIndex:4,pointerEvents:"none"}}/>
                <div style={{display:"flex",transform:`translateX(${-reelOffset}px)`,willChange:"transform"}}>
                  {reelItems.map((item,i)=><div key={i} style={{minWidth:ITEM_W,width:ITEM_W,padding:"8px",background:"transparent",borderRight:"1px solid #1e1e1e",boxSizing:"border-box"}}><ItemCard item={item} size="small" showActions={false}/></div>)}
                </div>
              </div>
              {!rolling&&crateResult&&<div style={{marginBottom:20}}><div style={{fontSize:13,color:"#555",marginBottom:16}}>You received:</div><div style={{display:"flex",justifyContent:"center"}}><ItemCard item={crateResult} size="large" showActions={false}/></div></div>}
              {!rolling&&<button onClick={closeRoll} style={{background:"var(--accent)",border:"none",color:"#fff",borderRadius:6,padding:"10px 36px",cursor:"pointer",fontSize:14,fontWeight:700,marginTop:16}}>{crateResult?"Continue":"Close"}</button>}
            </div>
          </div>
        )}

        {multiOpenData&&<MultiOpenModal crate={multiOpenData.crate} count={multiOpenData.count} onClose={closeMultiOpen} onItemsAdded={handleMultiItemsAdded}/>}
        {showRedeem&&<RedeemModal state={state} setState={setState} onClose={()=>setShowRedeem(false)} onRenamePlayer={renamePlayer}/>}
        {showSettings&&<SettingsModal state={state} setState={setState} settings={settings} setSettings={setSettings} onClose={()=>setShowSettings(false)} onManualSave={manualSaveNow}/>}
        {showSetCredits&&isAdmin&&<SetCreditsModal onClose={()=>setShowSetCredits(false)} onSet={n=>setState(prev=>({...prev,credits:parseFloat(n.toFixed(2))}))}/>}

         {showWheel&&(
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <div style={{background:"#181818",border:"1px solid #3a2e00",borderRadius:16,padding:"32px 36px 28px",textAlign:"center",maxWidth:480,width:"95vw"}}>
              <div style={{fontSize:22,fontWeight:800,color:"#FFD700",marginBottom:4,animation:"goldPulse 2s infinite"}}>LUCKY WHEEL</div>
              <div style={{fontSize:13,color:"#666",marginBottom:22}}>One free spin every 24 hours</div>
              <canvas ref={wheelCanvasRef} width={340} height={340} style={{borderRadius:"50%",border:"3px solid #3a2e00",display:"block",margin:"0 auto 20px"}}/>
              {wheelResult&&!wheelSpinning&&(
                <div style={{marginBottom:18,padding:"14px 20px",background:"#1f1a00",border:"1px solid #5a4200",borderRadius:8}}>
                  <div style={{fontSize:13,color:"#999",marginBottom:4}}>You won:</div>
                  <div style={{fontSize:20,fontWeight:800,color:"#FFD700"}}>{wheelResult.label}</div>
                </div>
              )}
              <div style={{display:"flex",gap:10,justifyContent:"center"}}>
                <button onClick={spinWheel} disabled={!canSpin()||wheelSpinning} style={{background:canSpin()&&!wheelSpinning?"#FFD700":"#2a2200",border:"none",color:canSpin()&&!wheelSpinning?"#111":"#5a4200",borderRadius:6,padding:"11px 32px",cursor:canSpin()&&!wheelSpinning?"pointer":"not-allowed",fontSize:14,fontWeight:800}}>
                  {wheelSpinning?"Spinning...":canSpin()?"SPIN!":`Next: ${countdown}`}
                </button>
                <button onClick={()=>setShowWheel(false)} style={{background:"transparent",border:"1px solid #2a2a2a",color:"#666",borderRadius:6,padding:"11px 20px",cursor:"pointer",fontSize:14}}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
