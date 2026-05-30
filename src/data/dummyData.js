export const featuresData = [
  {
    id: "anon",
    title: "Anonymous Conversations",
    description: "Speak your mind freely. No email, name, or phone number required. Your identity is 100% private.",
    iconName: "ShieldAlert",
    gradient: "from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20",
    borderGlow: "group-hover:border-purple-400/50"
  },
  {
    id: "voice",
    title: "Voice Support",
    description: "Prefer talking? Send voice messages to Didi and listen to her comforting, warm spoken responses.",
    iconName: "Mic",
    gradient: "from-pink-500/10 to-orange-500/10 hover:from-pink-500/20 hover:to-orange-500/20",
    borderGlow: "group-hover:border-pink-400/50"
  },
  {
    id: "emotional",
    title: "Emotional AI",
    description: "Didi understands your tone, stress, and mood. She offers compassionate, supportive, and kind words.",
    iconName: "Heart",
    gradient: "from-red-500/10 to-pink-500/10 hover:from-red-500/20 hover:to-pink-500/20",
    borderGlow: "group-hover:border-red-400/50"
  },
  {
    id: "career",
    title: "Career Guidance",
    description: "Get advice on negotiating salary, preparing for interviews, changing careers, or dealing with workplace bias.",
    iconName: "Briefcase",
    gradient: "from-indigo-500/10 to-purple-500/10 hover:from-indigo-500/20 hover:to-purple-500/20",
    borderGlow: "group-hover:border-indigo-400/50"
  },
  {
    id: "finance",
    title: "Financial Literacy",
    description: "Learn how to budget, invest, save, and negotiate like a pro. Gain independence with confidence.",
    iconName: "TrendingUp",
    gradient: "from-green-500/10 to-indigo-500/10 hover:from-green-500/20 hover:to-indigo-500/20",
    borderGlow: "group-hover:border-green-400/50"
  },
  {
    id: "wellness",
    title: "Women's Wellness",
    description: "Discuss menstrual health, sleep, mental wellness, and self-care tips in a judgment-free zone.",
    iconName: "Smile",
    gradient: "from-teal-500/10 to-pink-500/10 hover:from-teal-500/20 hover:to-pink-500/20",
    borderGlow: "group-hover:border-teal-400/50"
  },
  {
    id: "safety",
    title: "Safety & Harassment Help",
    description: "Actionable resources, safety plans, and emergency templates to help you stand up against harassment.",
    iconName: "AlertTriangle",
    gradient: "from-red-500/10 to-orange-500/10 hover:from-red-500/20 hover:to-orange-500/20",
    borderGlow: "group-hover:border-red-400/50"
  },
  {
    id: "goals",
    title: "Goal Planning",
    description: "Set achievable weekly and monthly life goals with Didi. She will hold you accountable with love.",
    iconName: "Compass",
    gradient: "from-yellow-500/10 to-purple-500/10 hover:from-yellow-500/20 hover:to-purple-500/20",
    borderGlow: "group-hover:border-yellow-400/50"
  },
  {
    id: "multilingual",
    title: "Multi-language Support",
    description: "Didi speaks English, Spanish, Hindi, French, Arabic, and more. Talk in whichever language feels like home.",
    iconName: "Languages",
    gradient: "from-blue-500/10 to-indigo-500/10 hover:from-blue-500/20 hover:to-indigo-500/20",
    borderGlow: "group-hover:border-blue-400/50"
  },
  {
    id: "decision",
    title: "Decision Assistant",
    description: "Stuck between two choices? Didi helps you weigh pros and cons without bias, guiding you to trust yourself.",
    iconName: "HelpCircle",
    gradient: "from-purple-500/10 to-indigo-500/10 hover:from-purple-500/20 hover:to-indigo-500/20",
    borderGlow: "group-hover:border-purple-400/50"
  }
];

export const chatPresets = {
  career: {
    label: "Career Confusion 💼",
    mood: "reflective",
    icon: "Briefcase",
    messages: [
      { sender: "user", text: "Hey Didi, I got a job offer but the salary is lower than I expected. I don't know how to negotiate without sounding demanding. I'm afraid they will withdraw the offer." },
      { sender: "didi", text: "Oh sweetheart, take a deep breath. It is completely normal to feel nervous about this, but let me tell you something: negotiating is not demanding, it is standard practice. They offered you the job because they want YOU, your skills, and your unique perspective." },
      { sender: "didi", text: "Let's draft a response together. Start by expressing excitement, then state your value, and ask: 'Based on my experience in X, I was hoping we could explore a base salary of Y. Is there flexibility here?' Would you like me to help write the full draft?" }
    ],
    suggestions: [
      "Help me draft the email",
      "How do I answer 'What is your salary expectation?'",
      "What if they say no?"
    ]
  },
  relationship: {
    label: "Relationship Advice 🌸",
    mood: "anxious",
    icon: "Heart",
    messages: [
      { sender: "user", text: "Didi, my best friend has been ignoring my messages lately. Every time I ask if everything is okay, she gives short answers. I feel like I did something wrong, and it is making me super anxious." },
      { sender: "didi", text: "I hear you, and I know how much that hurts. Friendships are the anchors of our lives, and when they shift, it can feel incredibly destabilizing. But remember, her silence might not be about you at all." },
      { sender: "didi", text: "She could be going through something heavy that she doesn't know how to talk about yet. Instead of asking 'did I do something wrong', try sending a gentle, no-pressure note: 'Hey, just wanted to send you some love. No need to reply, just know I'm here whenever you're ready.' How does that feel to you?" }
    ],
    suggestions: [
      "What if she's mad at me?",
      "How to deal with friendship breakups",
      "Should I call her?"
    ]
  },
  interview: {
    label: "Interview Prep ✨",
    mood: "peaceful",
    icon: "CheckCircle",
    messages: [
      { sender: "user", text: "I have a big interview tomorrow and I'm suffering from major imposter syndrome. I feel like I'm going to freeze when they ask me technical questions." },
      { sender: "didi", text: "Imposter syndrome is just your brain trying to protect you, but it's lying to you! You didn't get this interview by accident. Your resume showed them you have what it takes. Now, you just need to show them how you think." },
      { sender: "didi", text: "If you get stuck on a question, don't panic. Say: 'That's an interesting problem. Let me talk you through how I would approach solving it...' This shows problem-solving skills and gives you time to think. Let's do a quick mock run. Ask me a question, or let me ask you one!" }
    ],
    suggestions: [
      "Let's practice standard questions",
      "Give me a confidence boost!",
      "What should I wear/bring?"
    ]
  },
  wellness: {
    label: "Mental Wellness 🧘‍♀️",
    mood: "stressed",
    icon: "Smile",
    messages: [
      { sender: "user", text: "I've been feeling so burnt out lately. Between studying, working, and family obligations, I feel like I have nothing left to give. I'm just running on empty." },
      { sender: "didi", text: "Oh, my dear. I want you to stop what you're doing, put your hand on your heart, and take one deep, slow breath. Go on, I'm waiting... 🌸" },
      { sender: "didi", text: "You cannot pour from an empty cup. Running on empty isn't strength; it's a warning light. It's okay to say 'no' to others so you can say 'yes' to your own health. Today, I want you to pick just ONE small thing that is purely for you—a hot bath, 10 minutes of reading, or just lying down in quiet. You deserve rest, not because you earned it, but because you are human." }
    ],
    suggestions: [
      "Help me plan a self-care day",
      "How to set boundaries with family",
      "Give me a daily affirmation"
    ]
  }
};

export const affirmations = [
  "You are stronger than you know, and braver than you think. You've got this.",
  "Your worth is not defined by your productivity. It's okay to rest.",
  "You deserve to occupy space, speak your mind, and make your voice heard.",
  "Trust the process. You are exactly where you need to be to grow into your next chapter.",
  "It is okay to not have it all figured out yet. Big sisters don't have it all figured out either!",
  "Your feelings are valid. You are allowed to feel tired, angry, or sad. Tomorrow is a new day.",
  "No one can make you feel inferior without your consent. Walk tall today, sister.",
  "You are worthy of love, respect, and kindness just as you are.",
  "Believe in your own magic. The world needs exactly what you have to offer.",
  "You are capable of doing hard things. You've survived 100% of your hardest days so far."
];

export const testimonialsData = [
  {
    quote: "Didi felt like the elder sister I never had. When I was terrified of negotiating my first software developer salary, she walked me through it. I ended up getting $12,000 more than the initial offer!",
    author: "Priya S.",
    role: "Software Engineer, Seattle",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
  },
  {
    quote: "As an international student, I felt incredibly isolated and overwhelmed. Having Didi to chat with anonymously late at night about my anxiety and burnout was a lifesaver. It's a completely judgment-free space.",
    author: "Fatima K.",
    role: "Graduate Student, Boston",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
  },
  {
    quote: "When I faced subtle harassment at my internship, I was confused and scared to report it. Didi validated my feelings, helped me organize my timeline of events, and gave me the words to report it safely.",
    author: "Elena R.",
    role: "Marketing Intern, Austin",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&auto=format&fit=crop&q=80"
  }
];

export const safetyPoints = [
  {
    title: "100% Anonymity Guaranteed",
    desc: "We don't collect emails, phone numbers, or IP addresses. Your secret is safe with us."
  },
  {
    title: "End-to-End Encryption",
    desc: "All conversations are encrypted in transit. Once your session ends, the chat is wiped clean."
  },
  {
    title: "Zero Judgment, Infinite Love",
    desc: "Didi is programmed with pure empathy, trained on professional psychological safety principles."
  },
  {
    title: "Women-First Safeguards",
    desc: "Built by women, for women, ensuring specific cultural and gendered nuances are deeply understood."
  }
];

export const futureVisionData = [
  {
    title: "AI Voice Companion",
    desc: "Talk to Didi in real-time with zero latency. Hear her voice adapt dynamically to match your emotional state, providing calming tones when you're stressed.",
    glow: "shadow-purple-500/20 border-purple-500/30"
  },
  {
    title: "AI Sisterly Journaling",
    desc: "A smart journal that analyzes your writings over time, detects mood trends, and leaves comforting, voice-recorded sisterly notes on your entries.",
    glow: "shadow-pink-500/20 border-pink-500/30"
  },
  {
    title: "Smart Life Planner",
    desc: "Co-create actionable milestone roadmaps for your finance, career, and personal wellness goals. Get gentle, positive reminders that feel like a sisterly check-in.",
    glow: "shadow-orange-500/20 border-orange-500/30"
  },
  {
    title: "Women Mentorship Bridge",
    desc: "An safe, moderated pathway connecting you to real-life women mentors in your field when you are ready to take your goals to the next level.",
    glow: "shadow-indigo-500/20 border-indigo-500/30"
  }
];
