export const PROFILE = {
  name: 'Shubhanshu Shrimali',
  firstName: 'Shubhanshu',
  lastName: 'Shrimali',
  title: 'AI-Native Systems & Game Engineer',
  location: 'Udaipur, Rajasthan, India',
  email: 'shubhanshu200425@gmail.com',
  phone: '+91-8290529725',
  phoneHref: 'tel:+918290529725',
  githubUser: 'shubhanshushrimali',
  github: 'https://github.com/shubhanshushrimali',
  linkedin: 'https://www.linkedin.com/in/shubhanshu-shrimali-06726823b',
  medium: 'https://medium.com/@shubhanshu200425',
  devto: 'https://dev.to/shubhanshu_shrimali',
  portfolio: 'https://shubhanshushrimali.github.io/',
  resumeHref: '/resume.html',
}

export const FAQ = [
  {
    q: 'Who is Shubhanshu Shrimali?',
    a: 'Shubhanshu Shrimali is an AI-Native Systems and Game Engineer based in Udaipur, Rajasthan, India. He ships production games and apps to 300,000+ users with Top 10 genre rankings on iOS and Android, and builds agent systems with LangGraph, Hermes, Graphify, and self-hosted vLLM.',
  },
  {
    q: 'What does Shubhanshu Shrimali work on?',
    a: 'He currently works as an AI Systems Engineer, Game & App Developer at Toba Tech. His work includes Eisen Engine (C++ / Vulkan), Unreal Engine 5 64-player netcode, Hermes Agent with Graphify search, LangGraph multi-agent systems, and self-hosted vLLM inference.',
  },
  {
    q: 'Where is Shubhanshu Shrimali based?',
    a: 'Udaipur, Rajasthan, India. B.Tech in Computer Science from Geetanjali Institute of Technical Studies (GITS), 2021–2025.',
  },
  {
    q: 'How can I contact Shubhanshu Shrimali?',
    a: 'Email shubhanshu200425@gmail.com, or find him on GitHub, LinkedIn, Medium, and DEV.to. Official site: https://shubhanshushrimali.github.io/',
  },
]

export const HERO = {
  status: 'AI + GAMES ONLINE · 300K+ USERS · TOP 10 · LANGGRAPH · HERMES · VLLM',
  greeting: '> init engineer_profile --name',
  description:
    'based in Udaipur, India. I ship production games and apps to 300K+ users (Top 10 on iOS & Android), and I build the agent stack behind them — LangGraph, MCP, Hermes skills + Graphify search + desktop IDE, and self-hosted vLLM. Also Eisen Engine, UE5 netcode, and an agentic marketing agency from GitHub.',
  sequences: [
    'Shipped production games to 300K+ users (Top 10)',
    2400,
    'Custom C++ & Vulkan game engine (Eisen)',
    2400,
    '64-player dedicated servers — UE5 / GAS',
    2400,
    'Hermes Agent: skills, Graphify search, desktop IDE',
    2400,
    'AI agent systems (LangGraph, MCP, vLLM)',
    2400,
    'Agentic marketing pipeline from a GitHub brief',
    2400,
  ],
  metrics: [
    { num: '300K+', label: 'Players shipped', tone: 'gold' },
    { num: 'Top 10', label: 'iOS & Android genre', tone: 'gold' },
    { num: '60 FPS', label: 'Low-tier mobile', tone: 'sage' },
    { num: '64 CCU', label: 'Dedicated servers', tone: 'steel' },
  ],
}

export const EDUCATION = {
  degree: 'B.Tech in Computer Science',
  school: 'Geetanjali Institute of Technical Studies (GITS)',
  years: '2021 – 2025',
  cgpa: '8.3 / 10.0',
  focus: 'Systems, distributed architectures, computer graphics, and AI agents.',
}

export const HONORS = [
  {
    title: 'International Black Belt',
    detail: 'Karate — certified discipline and focus.',
  },
  {
    title: 'State-level swimmer & NCC',
    detail: 'Competitive swimming for Rajasthan; National Cadet Corps.',
  },
]

export const LANGUAGES = [
  { name: 'C / C++', level: 'Engine core, Vulkan, UE5', color: '#00599c' },
  { name: 'C#', level: 'Unity / DOTS production', color: '#68217a' },
  { name: 'Python', level: 'Agents, vLLM, LangGraph', color: '#3776ab' },
  { name: 'Dart / Flutter', level: 'Cross-platform apps', color: '#02569b' },
  { name: 'Swift', level: 'iOS / TestFlight', color: '#f05138' },
  { name: 'TypeScript / JS', level: 'Web, desktop IDE', color: '#3178c6' },
]

export const SKILL_CATEGORIES = [
  {
    id: 'engines',
    name: 'Engines & Real-Time Graphics',
    badge: 'Core',
    skills: [
      'Custom C++ engine (Eisen — Vulkan/OpenGL)',
      'Unreal Engine 5 (C++, GAS, Niagara)',
      'Unity (C#, DOTS/ECS, UGUI)',
      'HLSL / GLSL shaders & compute',
      'VR simulations (OpenXR, Meta Quest SDK)',
      'Niagara particle VFX',
      'AWS authoritative dedicated servers',
      'Flutter / Flame / React Native',
    ],
  },
  {
    id: 'ai',
    name: 'AI & Agentic Systems',
    badge: 'Agents',
    skills: [
      'LangGraph cyclic StateGraphs',
      '24/7 daemon agent loops',
      'Hermes skills & Electron desktop IDE',
      'Graphify query & code search',
      'Model Context Protocol (MCP)',
      'Eval harness & LLM-as-judge',
      'Trace extraction pipelines',
      'vLLM + speculative decoding',
      'Prompt cache & token optimization',
      'LoRA / QLoRA fine-tuning',
      'Constrained JSON (Outlines)',
      'RunPod / Vast.ai GPU clusters',
    ],
  },
  {
    id: 'growth',
    name: 'Scale, Growth & Monetization',
    badge: '300K+ users',
    skills: [
      '300K+ users, Top 10 genre',
      'Firebase Analytics & Remote Config',
      'A/B tests & feature flags',
      'Ad mediation (AdMob / AppLovin / Unity Ads)',
      'IAP funnels & ASO',
      'Crashlytics / Sentry',
    ],
  },
  {
    id: 'tooling',
    name: 'Platforms, CI/CD & Profiling',
    badge: 'DevOps',
    skills: [
      'RenderDoc & Unity Profiler (60 FPS)',
      'Xcode / Swift / TestFlight',
      'Android Studio / Play Console',
      'GitHub Actions & Fastlane',
      'Antigravity IDE / Cursor / Electron',
      'Git / Perforce / Linux',
      'Docker / RunPod / Vast.ai',
    ],
  },
]

export const EXPERIENCES = [
  {
    role: 'AI Systems Engineer, Game & App Developer',
    company: 'Toba Tech',
    period: 'Jan 2026 – Present',
    location: 'India',
    type: 'Full-time',
    badge: '300K+ users · Top 10',
    badgeColor: 'cyan',
    highlights: [
      'Grew game audience from zero to 300K+ users, achieving Top 10 genre ranking on both iOS & Android through ASO, A/B tested paywalls, and staged rollouts.',
      'Architected cyclic multi-agent graphs via LangGraph with persistent state checkpoints, MCP tool servers, and automated eval harnesses using LangSmith with LLM-as-a-judge CI/CD gates.',
      'Deployed self-hosted vLLM inference on RunPod/Vast.ai with speculative decoding & prompt caching; built trace extraction pipelines for continuous QLoRA/PEFT fine-tuning.',
      'Shipped production casual, idle, puzzler, and runner titles in Unity (C#) and gamified apps in Flutter/Flame with complete ecosystems (tutorials, daily rewards, leaderboards, IAP, UGUI).',
      'Managed hybrid monetization: Firebase Analytics, Remote Config A/B tests, ad mediation (AdMob, AppLovin, Unity Ads), IAP funnels, and Crashlytics/Sentry across the 300K+ user base.',
      'Owned full cross-platform rollout: Web, iOS (Xcode/TestFlight), Android (Play Console), Fastlane automation, GitHub Actions CI/CD, and dynamic color theming pipelines.',
    ],
    tech: ['LangGraph', 'MCP', 'vLLM', 'QLoRA', 'Unity (C#)', 'Flutter/Flame', 'Firebase', 'AdMob', 'AppLovin', 'Fastlane', 'GitHub Actions'],
  },
  {
    role: 'Unity & Real-Time Systems Developer',
    company: 'Carina Softlabs',
    period: 'Nov 2024 – Dec 2025',
    location: 'India',
    type: 'Full-time',
    badge: 'MMORPG · AWS',
    badgeColor: 'purple',
    highlights: [
      'Shipped an MMORPG, 2.5D platformer, and mobile titles; architected authoritative headless servers on AWS via Mirror Networking with lag compensation for 50+ CCU.',
      'Designed scalable AWS backend (EC2, auto-scaling) for zero-downtime under traffic spikes; reduced memory by 35% and build size by 40% via Addressables.',
      'Profiled shaders (HLSL) and draw calls via RenderDoc & Unity Profiler, locking 60 FPS on low-tier mobile hardware.',
    ],
    tech: ['Unity (C#)', 'MMORPG', 'Mirror Networking', 'AWS EC2', 'Addressables', 'HLSL', 'RenderDoc', 'Profiler'],
  },
  {
    role: 'Systems Developer (Contract)',
    company: 'Ingenuity Gaming',
    period: 'Aug 2024 – Sep 2024',
    location: 'Remote',
    type: 'Contract',
    badge: 'Deterministic loops',
    badgeColor: 'emerald',
    highlights: [
      'Built deterministic 2D game loops, state machines, and payout engines in C#; cut memory 25% via object pooling.',
    ],
    tech: ['C#', 'State machines', 'Game loops', 'Object pooling'],
  },
  {
    role: 'XR Systems Intern',
    company: 'AIVARSE',
    period: 'Aug 2023 – Sep 2023',
    location: 'India',
    type: 'Internship',
    badge: '72+ FPS VR',
    badgeColor: 'gold',
    highlights: [
      'Built XR prototypes with OpenXR & Meta Quest SDK; optimized rendering to sustain 72+ FPS on standalone headsets.',
    ],
    tech: ['OpenXR', 'Meta Quest SDK', 'Unity VR'],
  },
]

export const PROJECTS = [
  {
    id: 'eisen',
    title: 'Eisen Engine — AI-Native C++ Game Engine',
    subtitle: 'Vulkan RHI, ECS, custom allocators, runtime LLM hooks',
    year: '2025 – Present',
    featured: true,
    badge: 'Flagship engine',
    badgeColor: 'cyan',
    description:
      'A custom next-generation game engine built from scratch in C/C++. Vulkan & OpenGL graphics abstraction, custom memory arenas & pool allocators, cache-friendly ECS, and an AI-native runtime for procedural generation and LLM agent execution inside the game loop.',
    highlights: [
      'Vulkan 1.3 & OpenGL multi-backend rendering pipeline with batch rendering.',
      'AI-native subsystems for procedural content generation & runtime LLM agent hooks.',
      'Custom linear memory arenas & pool allocators minimizing heap fragmentation.',
      'Integrated ImGui debug dockspace & live engine profiling with GLSL shader reflection.',
    ],
    tech: ['C++', 'C', 'Vulkan', 'OpenGL', 'GLSL', 'ECS', 'Custom Allocators', 'ImGui'],
    github: 'https://github.com/shubhanshushrimali/Eisen-Engine',
    live: null,
    has3DViewport: true,
  },
  {
    id: 'ue5-rpg',
    title: 'Open-World 64-Player Multiplayer RPG',
    subtitle: 'UE5 (C++), GAS, Niagara, Steamworks, AWS EC2',
    year: '2024 – 2025',
    featured: true,
    badge: 'Multiplayer systems',
    badgeColor: 'purple',
    description:
      'Open-world RPG in Unreal Engine 5 with authoritative 64-player dedicated servers on AWS EC2. Gameplay Ability System for replicated attributes/spells, AI behavior trees, vehicle physics, and Steamworks authentication.',
    highlights: [
      'GAS replicated combat, attributes & spell cooldowns.',
      'Authoritative 64-player dedicated server with lag compensation & client prediction on AWS.',
      'Landscape streaming with World Partition & Niagara GPU compute VFX.',
      'Hierarchical AI behavior trees for open-world creature ecosystems.',
    ],
    tech: ['Unreal Engine 5', 'C++', 'GAS', 'Niagara VFX', 'Steamworks', 'AWS EC2'],
    github: 'https://github.com/shubhanshushrimali/War',
    live: null,
    codeSnippet: {
      filename: 'RPGAbilitySystemComponent.cpp',
      code: `void ARPGCharacter::GrantAbility(TSubclassOf<UGameplayAbility> AbilityClass) {
    if (HasAuthority() && AbilityClass) {
        FGameplayAbilitySpec Spec(AbilityClass, 1, INDEX_NONE, this);
        AbilitySystemComponent->GiveAbility(Spec);
    }
}`,
    },
  },
  {
    id: 'hermes',
    title: 'Hermes Agent — Skills, Graphify & Desktop IDE',
    subtitle: 'Extra skills, Graphify code search, Electron IDE',
    year: '2026',
    featured: true,
    badge: 'AI agent harness',
    badgeColor: 'emerald',
    description:
      'Extended Hermes so the agent can work a codebase: more skills, Graphify-backed query and code search, and an Electron desktop IDE in the same loop.',
    highlights: [
      'Added extra skills across software, research, and ops.',
      'Wired Graphify for codebase graphs — query, neighbors, and code search.',
      'Shipped the desktop IDE so search, plan, and edit happen in one shell.',
    ],
    tech: ['Python', 'Electron', 'Graphify', 'MCP', 'Skills', 'LangGraph'],
    github: 'https://github.com/shubhanshushrimali/hermes-agent',
    live: null,
    hasAgentVisualizer: true,
  },
  {
    id: 'marketing',
    title: 'Agentic Marketing Agency',
    subtitle: 'LangGraph pipeline from a GitHub brief to a full campaign',
    year: '2026',
    featured: true,
    badge: 'Multi-agent',
    badgeColor: 'cyan',
    description:
      'A six-agent marketing agency: research, strategy, copy, QA, forecast, publish. Isolated tools, Pydantic I/O, and brand memory that compounds.',
    highlights: [
      'ReAct agents with scoped tool registries — QA can halt publish.',
      'Persistent brand memory in MongoDB so later campaigns reuse what worked.',
      'LLM-agnostic factory (OpenAI, Anthropic, Ollama) behind FastAPI.',
    ],
    tech: ['LangGraph', 'FastAPI', 'Pydantic', 'MongoDB', 'Tavily', 'LangSmith'],
    github: 'https://github.com/shubhanshushrimali/Marketing-and-Growth-Multi-Agent-System',
    live: null,
  },
  {
    id: 'ai-agents',
    title: 'Autonomous AI Research Agents',
    subtitle: 'LangGraph, MCP, vLLM, LoRA/PEFT, Docker',
    year: '2026',
    featured: true,
    badge: 'Research agents',
    badgeColor: 'emerald',
    description:
      '24/7 autonomous multi-agent systems. Mines literature, extracts reasoning traces, and formats fine-tuning datasets for continuous QLoRA/PEFT distillation on vLLM clusters.',
    highlights: [
      'Cyclic StateGraphs with persistent checkpoints & human-in-the-loop gates.',
      'MCP tool servers for multi-source research.',
      'Trace extraction pipeline for continuous QLoRA dataset distillation.',
    ],
    tech: ['Python', 'LangGraph', 'MCP', 'vLLM', 'QLoRA / PEFT', 'Docker', 'Vast.ai', 'RunPod'],
    github: 'https://github.com/shubhanshushrimali',
    live: null,
  },
  {
    id: 'blog',
    title: 'AI-Powered Technical Blog',
    subtitle: 'Next.js, MDX, GenAI pipelines, DEV.to API',
    year: '2026',
    featured: false,
    badge: 'Publishing agents',
    badgeColor: 'gold',
    description:
      'AI agents that research, draft, fact-check, and auto-publish deep-dive technical articles to Medium and DEV.to.',
    highlights: [
      'Research → draft → fact-check → publish loop with GenAI pipelines.',
      'MDX site plus DEV.to / Medium API auto-publish.',
    ],
    tech: ['Next.js', 'MDX', 'GenAI', 'DEV.to API'],
    github: 'https://github.com/shubhanshushrimali',
    live: 'https://medium.com/@shubhanshu200425',
  },
]

export const WRITING_FALLBACK = [
  {
    title: 'Engineering 24/7 Autonomous Agent Daemons',
    excerpt:
      'Cyclic LangGraph StateGraphs, Hermes-3 function calling, persistent checkpoints, and a 4-D trajectory eval harness.',
    url: 'https://medium.com/@shubhanshu200425/engineering-24-7-autonomous-agent-daemons-langgraph-cyclic-stategraphs-nvidia-nim-hermes-3-d6cc4f083c51',
    date: '2026-08-28',
    source: 'Medium',
    tags: ['LangGraph', 'Agents', 'Eval'],
  },
  {
    title: 'How I Self-Host vLLM on Cloud GPUs for Sub-180ms Inference',
    excerpt:
      'PagedAttention, speculative decoding, and prefix cache on RunPod/Vast.ai — about 45% lower inference cost.',
    url: 'https://medium.com/@shubhanshu200425/how-i-self-host-vllm-on-cloud-gpus-for-sub-180ms-inference-and-saved-45-on-costs-ee7142e20283',
    date: '2026-08-28',
    source: 'Medium',
    tags: ['vLLM', 'Inference', 'GPU'],
  },
  {
    title: 'How We Reduced Unity Mobile Memory by 35%',
    excerpt:
      'Addressables, ScriptableObject events, and zero-allocation pooling to lock 60 FPS at 300K+ scale.',
    url: 'https://medium.com/@shubhanshu200425/how-we-reduced-unity-mobile-memory-by-35-eliminated-gc-spikes-an-addressables-5e30ac8390d9',
    date: '2026-08-28',
    source: 'Medium',
    tags: ['Unity', 'Memory', 'Mobile'],
  },
  {
    title: 'Building Eisen Engine from Scratch',
    excerpt:
      'C++20, Vulkan, ECS, and AI subsystems for a custom engine — architecture notes from the repo.',
    url: 'https://dev.to/shubhanshu_shrimali/building-eisen-engine-architecture-of-a-custom-c20-game-engine-from-scratch-vulkan-ecs-ai-subsystems-4p0k',
    date: '2026-08-28',
    source: 'DEV.to',
    tags: ['C++', 'Vulkan', 'Engine'],
  },
]

export const DEVTO_API = 'https://dev.to/api/articles?username=shubhanshu_shrimali'
export const MEDIUM_RSS =
  'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@shubhanshu200425'
