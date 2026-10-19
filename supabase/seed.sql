-- Seed data for testing
-- This script adds sample chat threads and messages to your database

-- Insert sample threads
INSERT INTO threads (id, title, created_at) VALUES
  ('11111111-1111-1111-1111-111111111111', 'How to learn programming?', '2025-10-01 10:00:00+00'),
  ('22222222-2222-2222-2222-222222222222', 'What are the best pizza toppings?', '2025-10-01 11:30:00+00'),
  ('33333333-3333-3333-3333-333333333333', 'Can you explain quantum physics?', '2025-10-02 09:15:00+00'),
  ('44444444-4444-4444-4444-444444444444', 'Help me create a morning routine', '2025-10-02 14:20:00+00'),
  ('55555555-5555-5555-5555-555555555555', 'What should I do this weekend?', '2025-10-03 08:45:00+00'),
  ('66666666-6666-6666-6666-666666666666', 'Why is the sky blue?', '2025-10-03 13:10:00+00'),
  ('77777777-7777-7777-7777-777777777777', 'How do I learn a new language?', '2025-10-04 07:30:00+00'),
  ('88888888-8888-8888-8888-888888888888', 'What''s the meaning of life?', '2025-10-04 16:00:00+00'),
  ('99999999-9999-9999-9999-999999999999', 'Tell me a funny joke', '2025-10-05 10:25:00+00'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'What''s a healthy dinner idea?', '2025-10-05 12:40:00+00');

-- Insert messages for thread: "How to learn programming?"
INSERT INTO messages (thread_id, type, content, created_at) VALUES
  ('11111111-1111-1111-1111-111111111111', 'user', 'How to learn programming?', '2025-10-01 10:00:00+00'),
  ('11111111-1111-1111-1111-111111111111', 'bot', 'Great question! Learning programming is an exciting journey. I recommend starting with the fundamentals: pick a beginner-friendly language like Python or JavaScript, practice coding every day (even just 30 minutes helps!), build small projects to apply what you learn, and don''t be afraid to make mistakes - they''re your best teachers!', '2025-10-01 10:00:15+00'),
  ('11111111-1111-1111-1111-111111111111', 'user', 'Which language should I start with?', '2025-10-01 10:01:30+00'),
  ('11111111-1111-1111-1111-111111111111', 'bot', 'Python is excellent for beginners because of its readable syntax and versatility. It''s used in web development, data science, automation, and more. JavaScript is also great if you want to build websites and see immediate visual results in the browser.', '2025-10-01 10:01:45+00');

-- Insert messages for thread: "What are the best pizza toppings?"
INSERT INTO messages (thread_id, type, content, created_at) VALUES
  ('22222222-2222-2222-2222-222222222222', 'user', 'What are the best pizza toppings?', '2025-10-01 11:30:00+00'),
  ('22222222-2222-2222-2222-222222222222', 'bot', 'Pizza toppings are all about personal preference! Classic combinations include Margherita (tomato, mozzarella, basil), Pepperoni (the most popular in the US), Hawaiian (ham and pineapple - controversial but beloved), and BBQ Chicken (tangy and savory). For vegetarians, try mushrooms, bell peppers, olives, and red onions.', '2025-10-01 11:30:12+00'),
  ('22222222-2222-2222-2222-222222222222', 'user', 'Is pineapple on pizza really that controversial?', '2025-10-01 11:32:00+00'),
  ('22222222-2222-2222-2222-222222222222', 'bot', 'Yes! Hawaiian pizza divides people worldwide. Some love the sweet-savory combo, while others consider it pizza heresy. It was actually invented in Canada in 1962. My advice? Try it yourself and decide - food preferences are personal!', '2025-10-01 11:32:18+00');

-- Insert messages for thread: "Can you explain quantum physics?"
INSERT INTO messages (thread_id, type, content, created_at) VALUES
  ('33333333-3333-3333-3333-333333333333', 'user', 'Can you explain quantum physics?', '2025-10-02 09:15:00+00'),
  ('33333333-3333-3333-3333-333333333333', 'bot', 'Quantum physics studies matter and energy at the smallest scales - atoms and subatomic particles. At this level, particles behave very differently from our everyday experience. Key concepts include: superposition (particles can be in multiple states at once), entanglement (particles can be mysteriously connected across distances), and wave-particle duality (things can act as both waves and particles).', '2025-10-02 09:15:20+00'),
  ('33333333-3333-3333-3333-333333333333', 'user', 'What''s Schrödinger''s cat?', '2025-10-02 09:17:00+00'),
  ('33333333-3333-3333-3333-333333333333', 'bot', 'Schrödinger''s cat is a thought experiment illustrating quantum superposition. Imagine a cat in a sealed box with a device that might release poison. Until you open the box, quantum mechanics suggests the cat is simultaneously both alive and dead. It''s not meant to be taken literally - it highlights how strange quantum mechanics seems when applied to everyday objects!', '2025-10-02 09:17:25+00');

-- Insert messages for thread: "Help me create a morning routine"
INSERT INTO messages (thread_id, type, content, created_at) VALUES
  ('44444444-4444-4444-4444-444444444444', 'user', 'Help me create a morning routine', '2025-10-02 14:20:00+00'),
  ('44444444-4444-4444-4444-444444444444', 'bot', 'A great morning routine sets the tone for your day! Here''s a simple framework: 1) Wake up at a consistent time, 2) Hydrate with a glass of water, 3) Move your body (stretch, yoga, or quick workout), 4) Eat a nutritious breakfast, 5) Review your goals or plan your day, 6) Do something you enjoy (read, meditate, etc.). Start small and build up gradually!', '2025-10-02 14:20:18+00'),
  ('44444444-4444-4444-4444-444444444444', 'user', 'How long should my morning routine be?', '2025-10-02 14:22:00+00'),
  ('44444444-4444-4444-4444-444444444444', 'bot', 'Start with 15-30 minutes if you''re new to this. As it becomes a habit, you can extend it to 60-90 minutes if you enjoy it. The key is consistency over duration - a short routine you do every day beats a long one you skip frequently.', '2025-10-02 14:22:15+00');

-- Insert messages for thread: "What should I do this weekend?"
INSERT INTO messages (thread_id, type, content, created_at) VALUES
  ('55555555-5555-5555-5555-555555555555', 'user', 'What should I do this weekend?', '2025-10-03 08:45:00+00'),
  ('55555555-5555-5555-5555-555555555555', 'bot', 'That depends on what energizes you! Options include: exploring a new neighborhood or hiking trail, trying a new restaurant or cooking something adventurous, visiting a museum or local event, working on a hobby project, catching up with friends, or simply relaxing with a good book or movie. Mix productive activities with genuine rest!', '2025-10-03 08:45:15+00');

-- Insert messages for thread: "Why is the sky blue?"
INSERT INTO messages (thread_id, type, content, created_at) VALUES
  ('66666666-6666-6666-6666-666666666666', 'user', 'Why is the sky blue?', '2025-10-03 13:10:00+00'),
  ('66666666-6666-6666-6666-666666666666', 'bot', 'The sky appears blue due to a phenomenon called Rayleigh scattering. Sunlight contains all colors of the rainbow. As it passes through Earth''s atmosphere, it collides with gas molecules. Blue light has a shorter wavelength and gets scattered more than other colors, spreading across the sky. That''s why we see blue when we look up! During sunrise and sunset, the light travels through more atmosphere, scattering the blue away and leaving beautiful reds and oranges.', '2025-10-03 13:10:20+00');

-- Insert messages for thread: "How do I learn a new language?"
INSERT INTO messages (thread_id, type, content, created_at) VALUES
  ('77777777-7777-7777-7777-777777777777', 'user', 'How do I learn a new language?', '2025-10-04 07:30:00+00'),
  ('77777777-7777-7777-7777-777777777777', 'bot', 'Learning a language takes dedication but is very rewarding! Try these approaches: 1) Use language learning apps daily (Duolingo, Babbel), 2) Watch movies/shows with subtitles, 3) Practice speaking from day one (even to yourself!), 4) Find a language exchange partner, 5) Immerse yourself in the culture through music and books, 6) Be patient - fluency takes time, but every bit of practice counts!', '2025-10-04 07:30:22+00'),
  ('77777777-7777-7777-7777-777777777777', 'user', 'How long does it take to become fluent?', '2025-10-04 07:32:00+00'),
  ('77777777-7777-7777-7777-777777777777', 'bot', 'It varies by language and your dedication. Languages similar to yours (Spanish if you know English) might take 6-12 months of consistent study for conversational fluency. More different languages (Japanese, Arabic) could take 2-3 years. Key factors: daily practice (even 20 minutes helps), real conversations, and consistent exposure over time.', '2025-10-04 07:32:20+00');

-- Insert messages for thread: "What's the meaning of life?"
INSERT INTO messages (thread_id, type, content, created_at) VALUES
  ('88888888-8888-8888-8888-888888888888', 'user', 'What''s the meaning of life?', '2025-10-04 16:00:00+00'),
  ('88888888-8888-8888-8888-888888888888', 'bot', 'That''s one of humanity''s deepest questions! Different philosophies offer different answers: some say it''s to seek happiness and reduce suffering, others say it''s to form meaningful connections with others, create something lasting, learn and grow, or find your own purpose. Perhaps the meaning isn''t universal but personal - something each person discovers through living, reflecting, and contributing in their own unique way.', '2025-10-04 16:00:25+00'),
  ('88888888-8888-8888-8888-888888888888', 'user', 'That''s pretty philosophical!', '2025-10-04 16:02:00+00'),
  ('88888888-8888-8888-8888-888888888888', 'bot', 'It is! But don''t let the weight of the question overwhelm you. Sometimes the meaning of life is simply enjoying a good cup of coffee, laughing with friends, or completing a challenging project. The big picture emerges from these small, meaningful moments.', '2025-10-04 16:02:15+00');

-- Insert messages for thread: "Tell me a funny joke"
INSERT INTO messages (thread_id, type, content, created_at) VALUES
  ('99999999-9999-9999-9999-999999999999', 'user', 'Tell me a funny joke', '2025-10-05 10:25:00+00'),
  ('99999999-9999-9999-9999-999999999999', 'bot', 'Why don''t programmers like nature? It has too many bugs! 🐛😄', '2025-10-05 10:25:05+00'),
  ('99999999-9999-9999-9999-999999999999', 'user', 'Haha! Got another one?', '2025-10-05 10:25:30+00'),
  ('99999999-9999-9999-9999-999999999999', 'bot', 'Sure! Why did the developer go broke? Because he used up all his cache! 💰😂', '2025-10-05 10:25:35+00');

-- Insert messages for thread: "What's a healthy dinner idea?"
INSERT INTO messages (thread_id, type, content, created_at) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'user', 'What''s a healthy dinner idea?', '2025-10-05 12:40:00+00'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'bot', 'Here''s a simple, healthy dinner: Grilled salmon with roasted vegetables and quinoa. Season the salmon with lemon, garlic, and herbs, roast colorful veggies (broccoli, bell peppers, carrots) with olive oil, and serve over quinoa. It''s packed with protein, healthy fats, and fiber. Takes about 30 minutes and is delicious!', '2025-10-05 12:40:16+00'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'user', 'What if I don''t like fish?', '2025-10-05 12:42:00+00'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'bot', 'No problem! Try chicken breast, tofu, or chickpeas instead. A chickpea curry with spinach over brown rice is fantastic - high in protein, filling, and full of flavor. You can also make a chicken stir-fry with lots of colorful vegetables and serve it with cauliflower rice for a low-carb option.', '2025-10-05 12:42:18+00');
