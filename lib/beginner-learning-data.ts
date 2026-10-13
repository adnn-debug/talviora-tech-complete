export interface LessonQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LearningLesson {
  id: string;
  chapterNumber: number;
  title: string;
  estimatedMinutes: number;
  summary: string;
  concepts: {
    heading: string;
    body: string;
    codeExample?: string;
    note?: string;
  }[];
  language: "python" | "javascript" | "html" | "sql";
  starterCode: string;
  tryItYourselfGoal: string;
  quiz: LessonQuiz;
}

export interface LearningTrack {
  id: string;
  title: string;
  badge: string;
  language: "python" | "javascript" | "html" | "sql";
  iconName: string;
  description: string;
  colorHex: string;
  lessons: LearningLesson[];
}

export const BEGINNER_LEARNING_TRACKS: LearningTrack[] = [
  {
    id: "python-foundations",
    title: "Python for Beginners",
    badge: "Track 1 • Foundational",
    language: "python",
    iconName: "Terminal",
    description: "Master clean syntax, variables, conditions, loops, and functions. The #1 programming language for modern AI, automation, and backend engineering.",
    colorHex: "#914955",
    lessons: [
      {
        id: "py-01",
        chapterNumber: 1,
        title: "Syntax & The print() Statement",
        estimatedMinutes: 5,
        summary: "Learn how to communicate with the computer and write your very first runnable Python script.",
        concepts: [
          {
            heading: "What is Python?",
            body: "Python is a clean, readable programming language designed to look like plain English. Unlike other languages that require semicolons and brackets everywhere, Python uses clean lines and indentation to structure logic.",
          },
          {
            heading: "The print() Function",
            body: "The print() function is the easiest way to display output to your screen. Anything wrapped in quotation marks ('...' or \"...\") is treated as text (a string).",
            codeExample: `print("Hello, TALVIORA TECH!")\nprint(42 + 8)`,
            note: "Python executes instructions line by line from top to bottom.",
          },
        ],
        language: "python",
        starterCode: `print("Hello, TALVIORA TECH!")
name = "Future AI Engineer"
print("Welcome to your coding journey,", name)
print("Today's progress score:", 100)`,
        tryItYourselfGoal: "Change the variable name to your own name and click 'Run Code' to see the console output instantly!",
        quiz: {
          question: "Which built-in Python function outputs text or numbers to the console?",
          options: ["echo()", "console.log()", "print()", "write()"],
          correctIndex: 2,
          explanation: "In Python, print() is the universal function to output values to the terminal.",
        },
      },
      {
        id: "py-02",
        chapterNumber: 2,
        title: "Variables & Core Data Types",
        estimatedMinutes: 8,
        summary: "Understand how computers store information in memory: text strings, whole numbers, decimals, and true/false flags.",
        concepts: [
          {
            heading: "Creating Variables",
            body: "A variable is like a labeled storage box. You assign a value to a name using the single equals sign (=). You don't need to declare types manually—Python detects the type automatically.",
          },
          {
            heading: "The 4 Core Data Types",
            body: "1. str (String): Text inside quotes, e.g. 'Frontend'\n2. int (Integer): Whole numbers, e.g. 24\n3. float (Float): Decimals, e.g. 98.6\n4. bool (Boolean): Exactly True or False",
            codeExample: `role = "Machine Learning Engineer"  # str
years_experience = 3               # int
accuracy_rate = 94.5               # float
is_certified = True                # bool`,
          },
        ],
        language: "python",
        starterCode: `role = "AI Solutions Architect"
weekly_study_hours = 12
current_readiness = 78.5
is_enrolled = True

print("Role Target:", role)
print("Hours Planned:", weekly_study_hours)
print("Readiness Score:", current_readiness, "%")
print("Enrollment Active:", is_enrolled)`,
        tryItYourselfGoal: "Try changing weekly_study_hours to 15 and current_readiness to 85.0, then press 'Run Code'.",
        quiz: {
          question: "Which Python data type represents a binary condition that is either True or False?",
          options: ["String", "Integer", "Boolean", "Float"],
          correctIndex: 2,
          explanation: "Booleans (bool) evaluate exclusively to either True or False, forming the basis of all program decisions.",
        },
      },
      {
        id: "py-03",
        chapterNumber: 3,
        title: "Conditionals: If, Elif & Else",
        estimatedMinutes: 10,
        summary: "Teach your program to make intelligent decisions based on criteria and assessment scores.",
        concepts: [
          {
            heading: "Decision Making in Code",
            body: "Conditionals allow your code to take different paths. We use the 'if' statement followed by a condition, and indent the block of code to run when that condition is True.",
          },
          {
            heading: "Comparison Operators",
            body: "• == : Equal to\n• != : Not equal to\n• > / < : Greater / Less than\n• >= / <= : Greater than or equal to",
            codeExample: `score = 85
if score >= 90:
    print("Grade: Exceptional")
elif score >= 75:
    print("Grade: Proficient")
else:
    print("Grade: Requires Review")`,
            note: "Indentation matters in Python! Always indent code blocks with 4 spaces.",
          },
        ],
        language: "python",
        starterCode: `readiness_score = 84

if readiness_score >= 90:
    status = "Interview Ready: Advanced Tier"
elif readiness_score >= 70:
    status = "Solid Foundation: Ready for Guided Projects"
else:
    status = "Beginner Focus: Practice Core Syntax"

print("Candidate Readiness:", readiness_score)
print("AI Career Recommendation:", status)`,
        tryItYourselfGoal: "Change readiness_score to 95 and click 'Run Code'. Observe how the execution path switches to the first branch!",
        quiz: {
          question: "Which keyword is used in Python to test a secondary condition when the initial 'if' evaluates to False?",
          options: ["else if", "elif", "case", "otherwise"],
          correctIndex: 1,
          explanation: "Python uses 'elif' (short for else if) for subsequent conditional branches.",
        },
      },
      {
        id: "py-04",
        chapterNumber: 4,
        title: "Loops: Automating Repetitive Work",
        estimatedMinutes: 10,
        summary: "Master 'for' and 'while' loops to process lists of data, calculate averages, and automate repetitive actions.",
        concepts: [
          {
            heading: "The 'for' Loop",
            body: "A for loop iterates over each item in a sequence or collection. It is the most common loop in data processing and AI pipelines.",
            codeExample: `for step in ["Learn Syntax", "Build Project", "Pass Interview"]:
    print("Action:", step)`,
          },
          {
            heading: "The range() Helper",
            body: "Use range(start, stop) to run a loop a specific number of times. range(1, 4) produces numbers 1, 2, and 3.",
          },
        ],
        language: "python",
        starterCode: `milestones = [
    "1. Setup Development Environment",
    "2. Master Python Data Types",
    "3. Build First Automated Script",
    "4. Connect to Gemini API"
]

print("--- AI LEARNER SPRINT ROADMAP ---")
for item in milestones:
    print("Completed:", item)

print("Total milestones tracked:", len(milestones))`,
        tryItYourselfGoal: "Add a 5th milestone to the list, e.g. '5. Deploy to Production', and run the code to see it print automatically!",
        quiz: {
          question: "What does the code `len(['a', 'b', 'c'])` evaluate to in Python?",
          options: ["2", "3", "4", "['a', 'b', 'c']"],
          correctIndex: 1,
          explanation: "The len() function returns the total number of items in a sequence. Here, there are 3 items.",
        },
      },
      {
        id: "py-05",
        chapterNumber: 5,
        title: "Functions: Reusable Logic",
        estimatedMinutes: 12,
        summary: "Organize your code into reusable modules that take input arguments and return computed results.",
        concepts: [
          {
            heading: "Defining Functions with def",
            body: "A function is a named block of code that performs a specific action. You define it once, and can call it hundreds of times with different inputs.",
          },
          {
            heading: "Parameters & Return Values",
            body: "Parameters are values you pass into the function. The 'return' statement sends back the calculated answer so other parts of your program can use it.",
            codeExample: `def calculate_bonus(salary, rating):
    if rating >= 9:
        return salary * 0.20
    return salary * 0.05

bonus = calculate_bonus(80000, 9)
print("Bonus:", bonus)`,
          },
        ],
        language: "python",
        starterCode: `def evaluate_candidate(name, completed_projects, hours_invested):
    score = (completed_projects * 20) + (hours_invested * 2)
    tier = "Advanced" if score >= 80 else "Developing"
    return f"Candidate: {name} | Score: {score}/100 | Tier: {tier}"

result1 = evaluate_candidate("Samira", 3, 12)
result2 = evaluate_candidate("David", 1, 6)

print(result1)
print(result2)`,
        tryItYourselfGoal: "Call evaluate_candidate with your own name, 4 projects, and 15 hours. Click 'Run Code' to see your score!",
        quiz: {
          question: "Which keyword in Python specifies the output value that a function sends back to its caller?",
          options: ["send", "output", "return", "export"],
          correctIndex: 2,
          explanation: "The 'return' keyword terminates function execution and passes the specified value back.",
        },
      },
    ],
  },
  {
    id: "web-foundations",
    title: "Web Development Foundations",
    badge: "Track 2 • Visual & Interactive",
    language: "html",
    iconName: "Layout",
    description: "Learn how the modern web works: HTML5 structure, CSS styling, and interactive JavaScript logic. Build what users can touch and see.",
    colorHex: "#DAA2A1",
    lessons: [
      {
        id: "web-01",
        chapterNumber: 1,
        title: "HTML5 Elements & Structure",
        estimatedMinutes: 6,
        summary: "Understand the building blocks of every webpage on earth: tags, attributes, headings, and buttons.",
        concepts: [
          {
            heading: "The Skeleton of the Web",
            body: "HTML (HyperText Markup Language) uses tags wrapped in angle brackets, like <h1> and <p>. Most tags come in pairs: an opening tag and a closing tag with a slash like </p>.",
          },
          {
            heading: "Essential Tags",
            body: "• <h1> to <h6>: Headings from largest to smallest\n• <p>: Paragraph of text\n• <button>: Clickable user button\n• <div>: Container for grouping elements",
          },
        ],
        language: "html",
        starterCode: `<div style="font-family: system-ui, sans-serif; padding: 24px; background: #F5E8E0; border-radius: 12px; color: #914955; border: 1px solid #DAA2A1;">
  <h2 style="margin-top: 0;">TALVIORA TECH Career Platform</h2>
  <p style="font-size: 14px; line-height: 1.5;">
    Empowering technology learners with interactive sandboxes, verified roadmaps, and career intelligence.
  </p>
  <button style="background: #914955; color: #EEE8DC; border: none; padding: 10px 18px; border-radius: 8px; font-weight: bold; cursor: pointer;">
    Explore Career Tracks &rarr;
  </button>
</div>`,
        tryItYourselfGoal: "Edit the button text to say 'Start Learning Now!' and click 'Run Code' to see the live rendered component preview!",
        quiz: {
          question: "Which HTML tag is used to create a standard paragraph of text?",
          options: ["<text>", "<para>", "<p>", "<section>"],
          correctIndex: 2,
          explanation: "The <p> tag defines a paragraph in HTML5.",
        },
      },
      {
        id: "web-02",
        chapterNumber: 2,
        title: "CSS Styling & Modern Flexbox",
        estimatedMinutes: 10,
        summary: "Transform plain HTML into gorgeous, responsive cards using modern CSS properties and Flexbox layouts.",
        concepts: [
          {
            heading: "Styling the Web",
            body: "CSS (Cascading Style Sheets) controls how HTML looks: background colors, typography, borders, and spacing.",
          },
          {
            heading: "The Power of Flexbox",
            body: "display: flex allows you to line up cards side-by-side easily and control gaps without messy floats.",
            codeExample: `display: flex; gap: 12px; justify-content: space-between;`,
          },
        ],
        language: "html",
        starterCode: `<div style="display: flex; gap: 12px; font-family: system-ui, sans-serif;">
  <div style="flex: 1; padding: 16px; background: #EEE8DC; border: 1px solid #DAA2A1; border-radius: 10px; color: #914955;">
    <h3 style="margin-top: 0; font-size: 16px;">Python AI Track</h3>
    <p style="font-size: 12px; margin-bottom: 0;">6 Chapters • 8 Exercises</p>
  </div>
  <div style="flex: 1; padding: 16px; background: #914955; color: #EEE8DC; border-radius: 10px;">
    <h3 style="margin-top: 0; font-size: 16px;">Web Dev Track</h3>
    <p style="font-size: 12px; margin-bottom: 0;">4 Chapters • Live Sandboxes</p>
  </div>
</div>`,
        tryItYourselfGoal: "Try adding a third card for 'SQL Data Track' inside the container and click 'Run Code' to see Flexbox adapt automatically!",
        quiz: {
          question: "Which CSS property defines the space between child items in a flex container?",
          options: ["margin-between", "gap", "item-spacing", "split"],
          correctIndex: 1,
          explanation: "The 'gap' property sets the space between rows and columns in flex and grid layouts.",
        },
      },
      {
        id: "web-03",
        chapterNumber: 3,
        title: "JavaScript Basics & Interactive Logic",
        estimatedMinutes: 10,
        summary: "Bring your webpage to life with JavaScript: calculate numbers, manipulate text, and respond to clicks.",
        concepts: [
          {
            heading: "Why JavaScript?",
            body: "JavaScript is the programming language of the browser. It allows pages to calculate values, fetch data from servers, and update the screen without reloading.",
          },
          {
            heading: "const & let",
            body: "Use 'const' for values that never change, and 'let' for variables whose values will update over time.",
          },
        ],
        language: "javascript",
        starterCode: `// Calculate skill mastery score
const candidateName = "Priya";
const masteredTopics = 14;
const totalTopics = 18;

const masteryPercent = Math.round((masteredTopics / totalTopics) * 100);

console.log("Candidate Assessment Report:");
console.log("Learner:", candidateName);
console.log("Topics Mastered:", masteredTopics + " / " + totalTopics);
console.log("Mastery Rating:", masteryPercent + "%");

if (masteryPercent >= 75) {
  console.log("Status: READY FOR INDUSTRY ROADMAP");
} else {
  console.log("Status: MORE PRACTICE RECOMMENDED");
}`,
        tryItYourselfGoal: "Change masteredTopics to 18 and press 'Run Code' to verify that mastery reaches 100%!",
        quiz: {
          question: "Which keyword in modern JavaScript declares a variable whose value cannot be reassigned?",
          options: ["var", "let", "const", "static"],
          correctIndex: 2,
          explanation: "Variables declared with 'const' maintain immutable references.",
        },
      },
    ],
  },
  {
    id: "sql-essentials",
    title: "SQL & Database Essentials",
    badge: "Track 3 • Data & Architecture",
    language: "sql",
    iconName: "Database",
    description: "Learn how modern tech companies store, filter, sort, and query millions of records using Structured Query Language.",
    colorHex: "#F8DEDC",
    lessons: [
      {
        id: "sql-01",
        chapterNumber: 1,
        title: "The SELECT & FROM Foundation",
        estimatedMinutes: 6,
        summary: "Understand relational databases and write queries to pull exact columns from a dataset of learners.",
        concepts: [
          {
            heading: "What is SQL?",
            body: "SQL (Structured Query Language) is the global standard for asking questions of databases like PostgreSQL, MySQL, and Supabase.",
          },
          {
            heading: "Syntax of SELECT",
            body: "SELECT tells the database which columns you want. FROM specifies the table name. Use * to select all columns.",
            codeExample: `SELECT name, target_role FROM learners;`,
          },
        ],
        language: "sql",
        starterCode: `-- Retrieve top learner names and their career goals
SELECT name, target_role, readiness_score
FROM learners;`,
        tryItYourselfGoal: "Run the query to see the database return real learner records in a clean table!",
        quiz: {
          question: "Which SQL keyword indicates the table name from which you want to pull data?",
          options: ["INTO", "FROM", "TABLE", "SOURCE"],
          correctIndex: 1,
          explanation: "The 'FROM' clause identifies the table being queried.",
        },
      },
      {
        id: "sql-02",
        chapterNumber: 2,
        title: "Filtering Records with WHERE",
        estimatedMinutes: 8,
        summary: "Filter records by conditions: find learners ready for interviews or targeting specific AI roles.",
        concepts: [
          {
            heading: "The WHERE Clause",
            body: "WHERE filters rows so only those satisfying your criteria are returned. You can combine conditions using AND, OR, and NOT.",
            codeExample: `SELECT * FROM learners WHERE readiness_score >= 80;`,
          },
        ],
        language: "sql",
        starterCode: `-- Find all learners with readiness score of 80 or higher
SELECT name, target_role, readiness_score, weekly_hours
FROM learners
WHERE readiness_score >= 80;`,
        tryItYourselfGoal: "Change the condition to `WHERE weekly_hours >= 15` and run code to see who studies 15+ hours weekly!",
        quiz: {
          question: "Which operator is used in SQL to combine two conditions that must both be true?",
          options: ["&&", "AND", "BOTH", "PLUS"],
          correctIndex: 1,
          explanation: "SQL uses the keyword 'AND' to combine multiple truth conditions.",
        },
      },
      {
        id: "sql-03",
        chapterNumber: 3,
        title: "Sorting & Limiting Results (ORDER BY & LIMIT)",
        estimatedMinutes: 8,
        summary: "Sort results from highest to lowest and grab the top 3 leaderboard performers.",
        concepts: [
          {
            heading: "ORDER BY & LIMIT",
            body: "ORDER BY sorts the returned rows. Use DESC for highest-to-lowest, and ASC for lowest-to-highest. LIMIT controls how many rows are returned.",
          },
        ],
        language: "sql",
        starterCode: `-- Show top 3 highest scoring candidates
SELECT name, target_role, readiness_score
FROM learners
ORDER BY readiness_score DESC
LIMIT 3;`,
        tryItYourselfGoal: "Change LIMIT 3 to LIMIT 5 and click 'Run Code' to see the top 5 candidates!",
        quiz: {
          question: "Which keyword sorts rows from highest value to lowest value in SQL?",
          options: ["DOWN", "DESC", "HIGHEST", "REVERSE"],
          correctIndex: 1,
          explanation: "DESC (short for descending) sorts numbers and dates from highest to lowest.",
        },
      },
    ],
  },
  {
    id: "ai-prompting",
    title: "AI & Prompt Engineering",
    badge: "Track 4 • Next-Gen Engineering",
    language: "python",
    iconName: "Cpu",
    description: "Understand large language models, system vs user instructions, few-shot prompting, and calling Google Gemini API cleanly.",
    colorHex: "#EEE8DC",
    lessons: [
      {
        id: "ai-01",
        chapterNumber: 1,
        title: "How Large Language Models Work",
        estimatedMinutes: 7,
        summary: "Demystify AI: understand token prediction, context windows, and why precision prompting matters.",
        concepts: [
          {
            heading: "Predicting the Next Token",
            body: "Language models like Gemini do not think like humans; they calculate probability distributions over tokens (word fragments). Clear instructions produce reliable outputs; vague prompts produce hallucinations.",
          },
          {
            heading: "Context Windows",
            body: "The context window is the working memory of the model during a request. It contains system instructions, conversation history, and your prompt.",
          },
        ],
        language: "python",
        starterCode: `# Simulation of Gemini Prompt Construction
system_role = "You are a supportive technical career mentor for TALVIORA TECH."
user_question = "What should I learn first: React or Python?"

prompt_payload = {
    "role": "system",
    "instruction": system_role,
    "user_query": user_question,
    "temperature": 0.2
}

print("Configured AI Prompt Payload:")
for key, value in prompt_payload.items():
    print(f"[{key.upper()}]: {value}")`,
        tryItYourselfGoal: "Modify user_question to ask about Cloud Computing, then click 'Run Code' to inspect the payload!",
        quiz: {
          question: "What is the primary operational mechanism behind Large Language Models?",
          options: [
            "Searching a fixed hardcoded database",
            "Predicting the most probable next token given context",
            "Compiling bytecode into machine assembly",
            "Memorizing every website permanently",
          ],
          correctIndex: 1,
          explanation: "LLMs operate by predicting the highest-probability continuation tokens based on the supplied context.",
        },
      },
      {
        id: "ai-02",
        chapterNumber: 2,
        title: "Few-Shot Prompting & JSON Structure",
        estimatedMinutes: 9,
        summary: "Learn the secret used by professional AI engineers: guiding LLMs to output strict, reliable JSON with few-shot examples.",
        concepts: [
          {
            heading: "Zero-Shot vs Few-Shot",
            body: "Zero-shot is asking without examples. Few-shot is giving 1-3 input/output pairs in the prompt. Few-shot prompting increases output reliability from 60% to over 95%.",
          },
        ],
        language: "python",
        starterCode: `# Few-Shot Prompt Template for Skill Extraction
prompt_template = """
Extract skills from the resume sentence into JSON:
Example 1:
Input: "Built REST APIs with Python and FastAPI."
Output: {"skills": ["Python", "FastAPI"], "category": "Backend"}

Task:
Input: "Developed frontend interfaces using React, Next.js and Tailwind."
"""

print("Executing Prompt with Few-Shot Framing...")
print(prompt_template.strip())
print("\nExpected JSON Output:")
print('{"skills": ["React", "Next.js", "Tailwind"], "category": "Frontend"}')`,
        tryItYourselfGoal: "Add a third example for Database skills and run the code!",
        quiz: {
          question: "What is the key benefit of Few-Shot prompting over Zero-Shot prompting?",
          options: [
            "It makes the request run faster",
            "It provides concrete examples for the model to mirror structure and tone",
            "It reduces the size of the model",
            "It disables API token limits",
          ],
          correctIndex: 1,
          explanation: "Few-shot examples anchor the model on exact format, tone, and edge-case handling.",
        },
      },
    ],
  },
];
