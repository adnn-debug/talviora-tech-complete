export interface VocabularyItem {
  term: string;
  definition: string;
  example?: string;
}

export interface LineExplanation {
  line: string;
  explanation: string;
}

export interface PracticeTestCase {
  name: string;
  description: string;
  input: any[];
  expectedOutput: any;
}

export interface PracticeExercise {
  id: string;
  stepNumber: number;
  level: "Beginner Guided" | "Foundational Logic" | "Intermediate Data" | "Application Logic" | "Challenge";
  difficultyBadge: string;
  language: "javascript" | "python";
  title: string;
  summary: string;
  estimatedMinutes: number;

  // 1. LEARN THE IDEA
  conceptExplanation: string;
  realWorldAnalogy: string;
  vocabulary: VocabularyItem[];

  // 2. SEE HOW IT WORKS
  workedExampleCode: string;
  lineExplanations: LineExplanation[];

  // 3. UNDERSTAND THE CODE
  inputExplanation: string;
  logicExplanation: string;
  outputExplanation: string;

  // 4. WRITE YOUR OWN CODE
  taskPrompt: string;
  functionName: string;
  requirements: string[];
  starterCode: string;
  hints: string[];
  solutionCode: string;

  // 5. RUN AND TEST
  testCases: PracticeTestCase[];
}

export const PRACTICE_EXERCISES: PracticeExercise[] = [
  {
    id: "prac-01",
    stepNumber: 1,
    level: "Beginner Guided",
    difficultyBadge: "Level 1 • Guided Beginner",
    language: "javascript",
    title: "Variables & Formatted Messages",
    summary: "Learn how computers store text and combine it into friendly, personalized messages.",
    estimatedMinutes: 5,

    // 1. LEARN THE IDEA
    conceptExplanation:
      "Computers remember information by storing it in named containers called variables. When you want to greet someone or display a status message, you don't rewrite the whole sentence from scratch every time. Instead, you create a template and plug in values saved in variables.",
    realWorldAnalogy:
      "Imagine ordering a personalized coffee cup at a café. The printed cup always has the standard text 'Fresh Roast for [Name]'. The cup template stays the same, but the barista writes your name in the blank slot. In code, a variable is that customizable slot.",
    vocabulary: [
      {
        term: "Variable",
        definition: "A labeled container that stores a piece of information in computer memory.",
        example: "const name = 'Aria';",
      },
      {
        term: "Parameter",
        definition: "A placeholder name for input that a function expects to receive when called.",
        example: "function greet(userName) { ... }",
      },
      {
        term: "Return Value",
        definition: "The final result or output that a function hands back after finishing its work.",
        example: "return 'Hello ' + userName;",
      },
      {
        term: "Concatenation",
        definition: "Joining two or more text strings together using the plus (+) operator.",
        example: "'Welcome ' + 'Home'",
      },
    ],

    // 2. SEE HOW IT WORKS
    workedExampleCode: `function formatGreeting(userName, role) {
  // Step 1: Combine the inputs into a friendly sentence
  const message = "Hello " + userName + ", welcome to your " + role + " journey!";
  
  // Step 2: Return the completed message
  return message;
}`,
    lineExplanations: [
      {
        line: "function formatGreeting(userName, role) {",
        explanation: "Declares a reusable machine named formatGreeting that accepts two inputs: userName and role.",
      },
      {
        line: 'const message = "Hello " + userName + ", welcome to your " + role + " journey!";',
        explanation: "Creates a new variable named message and connects the input words together into one sentence.",
      },
      {
        line: "return message;",
        explanation: "Hands the final completed sentence back to whoever called the function so it can be displayed.",
      },
    ],

    // 3. UNDERSTAND THE CODE
    inputExplanation:
      "Two text values (strings) are passed in: a learner's name (e.g. 'Aria') and their desired tech role (e.g. 'Web Developer').",
    logicExplanation:
      "The program takes the standard greeting template, replaces the slots with the actual values passed in, and joins them using string concatenation.",
    outputExplanation:
      "A single complete text string: 'Hello Aria, welcome to your Web Developer journey!'.",

    // 4. WRITE YOUR OWN CODE
    taskPrompt:
      "Write a function named buildWelcomeMessage(learnerName, topicName) that takes a learner's name and a topic name, and returns a welcome message in this exact format:\n'Welcome to [topicName], [learnerName]!'",
    functionName: "buildWelcomeMessage",
    requirements: [
      "The function must be named buildWelcomeMessage with parameters (learnerName, topicName).",
      "It must return the exact string format: 'Welcome to ' + topicName + ', ' + learnerName + '!'.",
      "Notice the comma and space after the topic name, and the exclamation mark at the very end.",
    ],
    starterCode: `function buildWelcomeMessage(learnerName, topicName) {
  // Your code here: combine topicName and learnerName
  
}`,
    hints: [
      "Use the 'return' keyword so your function hands back the text result.",
      "You can combine strings with '+': 'Welcome to ' + topicName + ', ' + learnerName + '!'",
      "Alternatively, in modern JavaScript you can use template literals: `Welcome to ${topicName}, ${learnerName}!`",
    ],
    solutionCode: `function buildWelcomeMessage(learnerName, topicName) {
  return "Welcome to " + topicName + ", " + learnerName + "!";
}`,

    // 5. RUN AND TEST
    testCases: [
      {
        name: "Test Case 1: Standard Greeting",
        description: "Checks greeting for Kenji learning Python",
        input: ["Kenji", "Python"],
        expectedOutput: "Welcome to Python, Kenji!",
      },
      {
        name: "Test Case 2: Multi-word Topic",
        description: "Checks greeting for Aria learning Cloud Computing",
        input: ["Aria", "Cloud Computing"],
        expectedOutput: "Welcome to Cloud Computing, Aria!",
      },
      {
        name: "Test Case 3: Data Science",
        description: "Checks greeting for Elena learning Data Science",
        input: ["Elena", "Data Science"],
        expectedOutput: "Welcome to Data Science, Elena!",
      },
    ],
  },

  {
    id: "prac-02",
    stepNumber: 2,
    level: "Foundational Logic",
    difficultyBadge: "Level 2 • Foundational Logic",
    language: "javascript",
    title: "Decisions with Conditionals (If / Else)",
    summary: "Teach the computer how to make choices based on rules, scores, and real-world conditions.",
    estimatedMinutes: 7,

    // 1. LEARN THE IDEA
    conceptExplanation:
      "Real-world programs need to make decisions. If a user is logged in, show their dashboard; otherwise, show the sign-in page. An 'if / else' statement asks a question: if the answer is true, run one block of code; if false, run a different block.",
    realWorldAnalogy:
      "Think of a smart thermostat in your home. It reads the current room temperature: if the temperature drops below 18°C, it turns on the heater. Otherwise, it stays in eco mode. The thermostat follows a strict decision rule.",
    vocabulary: [
      {
        term: "Condition",
        definition: "An expression that evaluates to either true or false.",
        example: "score >= 70",
      },
      {
        term: "Boolean",
        definition: "A data type that can have only one of two possible values: true or false.",
        example: "true / false",
      },
      {
        term: "Comparison Operator",
        definition: "Symbols used to compare values, such as >= (greater or equal), < (less than), or === (strictly equal).",
        example: "age >= 18",
      },
      {
        term: "Branching",
        definition: "Splitting code execution so that different instructions run based on conditions.",
        example: "if (...) { ... } else { ... }",
      },
    ],

    // 2. SEE HOW IT WORKS
    workedExampleCode: `function checkThermostat(currentTemp) {
  // Test if the temperature is below our comfort threshold
  if (currentTemp < 18) {
    return "Heating ON";
  } else {
    return "Normal Range";
  }
}`,
    lineExplanations: [
      {
        line: "function checkThermostat(currentTemp) {",
        explanation: "Accepts a single number representing the current room temperature.",
      },
      {
        line: "if (currentTemp < 18) {",
        explanation: "Asks: 'Is currentTemp strictly less than 18?'. If yes, code inside { } runs.",
      },
      {
        line: 'return "Heating ON";',
        explanation: "Returns 'Heating ON' immediately when the condition is met.",
      },
      {
        line: "} else {",
        explanation: "The fallback branch that runs when the condition was not true (18 or higher).",
      },
    ],

    // 3. UNDERSTAND THE CODE
    inputExplanation: "A number representing a temperature reading (e.g. 15 or 22).",
    logicExplanation:
      "The engine checks if currentTemp < 18. If 15 is passed, 15 < 18 is true, so it returns 'Heating ON'. If 22 is passed, 22 < 18 is false, so it falls to else and returns 'Normal Range'.",
    outputExplanation: "Returns either 'Heating ON' or 'Normal Range'.",

    // 4. WRITE YOUR OWN CODE
    taskPrompt:
      "Write a function named evaluateQuizScore(score) that takes a number score (0 to 100). If the score is 70 or higher (score >= 70), return the string 'Passed'. Otherwise, return the string 'Needs Review'.",
    functionName: "evaluateQuizScore",
    requirements: [
      "The function must be named evaluateQuizScore(score).",
      "If score >= 70, return exactly 'Passed'.",
      "If score < 70, return exactly 'Needs Review'.",
    ],
    starterCode: `function evaluateQuizScore(score) {
  // Your code here: check if score >= 70
  
}`,
    hints: [
      "Use 'if (score >= 70)' to test if the score qualifies for passing.",
      "Don't forget the 'else' block for scores below 70.",
      "Return exact capitalization: 'Passed' and 'Needs Review'.",
    ],
    solutionCode: `function evaluateQuizScore(score) {
  if (score >= 70) {
    return "Passed";
  } else {
    return "Needs Review";
  }
}`,

    // 5. RUN AND TEST
    testCases: [
      {
        name: "Test Case 1: High Score",
        description: "Checks passing score of 85",
        input: [85],
        expectedOutput: "Passed",
      },
      {
        name: "Test Case 2: Exact Threshold",
        description: "Checks boundary score of 70 (should pass)",
        input: [70],
        expectedOutput: "Passed",
      },
      {
        name: "Test Case 3: Score Below Threshold",
        description: "Checks score of 54 (needs review)",
        input: [54],
        expectedOutput: "Needs Review",
      },
    ],
  },

  {
    id: "prac-03",
    stepNumber: 3,
    level: "Intermediate Data",
    difficultyBadge: "Level 3 • Intermediate Data",
    language: "javascript",
    title: "Filtering Lists with Loops & Arrays",
    summary: "Process collections of data and pick out only the items that meet your criteria.",
    estimatedMinutes: 8,

    // 1. LEARN THE IDEA
    conceptExplanation:
      "Applications frequently deal with lists: lists of students, catalog items, or job postings. In programming, a list is called an Array. You can instruct the computer to visit every item in the list one by one (a loop) and collect only the items that meet a specific rule.",
    realWorldAnalogy:
      "Think of an airport baggage scanner. Luggage moves along a conveyor belt one by one. The machine inspects each bag's weight: bags under 20 kg are cleared, while overweight bags are pulled aside for review.",
    vocabulary: [
      {
        term: "Array",
        definition: "An ordered collection of values enclosed in square brackets [ ... ].",
        example: "[10, 20, 30]",
      },
      {
        term: "Loop (For)",
        definition: "A control structure that repeats a block of instructions for each element.",
        example: "for (let i = 0; i < list.length; i++)",
      },
      {
        term: "push()",
        definition: "A built-in array method that appends a new item to the end of an array.",
        example: "result.push(item);",
      },
      {
        term: "Accumulator",
        definition: "A variable initialized at the beginning to gather items as the loop runs.",
        example: "const result = [];",
      },
    ],

    // 2. SEE HOW IT WORKS
    workedExampleCode: `function getPassingScores(scores) {
  const passing = [];
  
  for (let i = 0; i < scores.length; i++) {
    if (scores[i] >= 60) {
      passing.push(scores[i]);
    }
  }
  
  return passing;
}`,
    lineExplanations: [
      {
        line: "const passing = [];",
        explanation: "Prepares an empty array container to collect passing scores.",
      },
      {
        line: "for (let i = 0; i < scores.length; i++) {",
        explanation: "Starts a loop that visits each item index from 0 to the end of the array.",
      },
      {
        line: "if (scores[i] >= 60) {",
        explanation: "Tests whether the score at position i is 60 or higher.",
      },
      {
        line: "passing.push(scores[i]);",
        explanation: "If passing, appends that score into our passing collection.",
      },
      {
        line: "return passing;",
        explanation: "Returns the newly constructed list of passing scores.",
      },
    ],

    // 3. UNDERSTAND THE CODE
    inputExplanation: "An array of numbers, e.g. [45, 82, 90, 58, 73].",
    logicExplanation:
      "Iterates through the array. For each number, if it is >= 60, it is added to the output array. Numbers below 60 are skipped.",
    outputExplanation: "A new array containing only the passing numbers: [82, 90, 73].",

    // 4. WRITE YOUR OWN CODE
    taskPrompt:
      "Write a function named filterActiveLearners(studyHoursList, minimumHours) that receives an array of weekly study hours and a threshold number minimumHours. Return a new array containing ONLY the study hours that are greater than or equal to minimumHours.",
    functionName: "filterActiveLearners",
    requirements: [
      "The function must be named filterActiveLearners(studyHoursList, minimumHours).",
      "Return a new array containing all values where value >= minimumHours.",
      "If no values qualify, return an empty array [].",
      "Do not modify the original input array.",
    ],
    starterCode: `function filterActiveLearners(studyHoursList, minimumHours) {
  // Your code here: collect all hours >= minimumHours
  
}`,
    hints: [
      "Start with an empty array: const result = [];",
      "Loop through studyHoursList: for (let i = 0; i < studyHoursList.length; i++)",
      "Inside the loop: if (studyHoursList[i] >= minimumHours) { result.push(studyHoursList[i]); }",
      "After the loop ends, return result;",
    ],
    solutionCode: `function filterActiveLearners(studyHoursList, minimumHours) {
  const result = [];
  for (let i = 0; i < studyHoursList.length; i++) {
    if (studyHoursList[i] >= minimumHours) {
      result.push(studyHoursList[i]);
    }
  }
  return result;
}`,

    // 5. RUN AND TEST
    testCases: [
      {
        name: "Test Case 1: Mixed Hours",
        description: "Filters hours >= 10 from [5, 15, 8, 22, 10]",
        input: [[5, 15, 8, 22, 10], 10],
        expectedOutput: [15, 22, 10],
      },
      {
        name: "Test Case 2: No Qualifying Hours",
        description: "Returns empty array when all hours are below 5",
        input: [[3, 4, 2], 5],
        expectedOutput: [],
      },
      {
        name: "Test Case 3: All Qualifying",
        description: "Returns all hours when all meet threshold 12",
        input: [[12, 18, 24], 12],
        expectedOutput: [12, 18, 24],
      },
    ],
  },

  {
    id: "prac-04",
    stepNumber: 4,
    level: "Application Logic",
    difficultyBadge: "Level 4 • Application Logic",
    language: "javascript",
    title: "Aggregating & Calculating Metrics",
    summary: "Summarize multiple data points into clean statistics and handle edge cases safely.",
    estimatedMinutes: 9,

    // 1. LEARN THE IDEA
    conceptExplanation:
      "Real platforms need to summarize learner progress: calculating total study hours, average test scores, or completion percentages. Writing robust code means not only doing the math, but also guarding against edge cases like empty lists that would cause division by zero errors.",
    realWorldAnalogy:
      "Think of a fitness smartwatch calculating your average daily steps over the week. It adds up your steps across all 7 days, then divides by 7. If you just unboxed the watch today and haven't logged any days yet, it shows 0 instead of crashing.",
    vocabulary: [
      {
        term: "Aggregation",
        definition: "Combining multiple data values into a single summary figure (e.g. sum, count, average).",
        example: "total = total + value",
      },
      {
        term: "Edge Case",
        definition: "An unusual or boundary input (like an empty list) that software must handle gracefully.",
        example: "scores.length === 0",
      },
      {
        term: "toFixed()",
        definition: "A method that formats a number using fixed-point decimal notation.",
        example: "(82.666).toFixed(1) => '82.7'",
      },
    ],

    // 2. SEE HOW IT WORKS
    workedExampleCode: `function calculateTotalHours(hoursArray) {
  let total = 0;
  
  for (let i = 0; i < hoursArray.length; i++) {
    total += hoursArray[i];
  }
  
  return total;
}`,
    lineExplanations: [
      {
        line: "let total = 0;",
        explanation: "Initializes a numeric accumulator variable at zero.",
      },
      {
        line: "for (let i = 0; i < hoursArray.length; i++) {",
        explanation: "Loops through every recorded hour in the array.",
      },
      {
        line: "total += hoursArray[i];",
        explanation: "Adds each hour into the running total.",
      },
      {
        line: "return total;",
        explanation: "Returns the grand sum after the loop finishes.",
      },
    ],

    // 3. UNDERSTAND THE CODE
    inputExplanation: "An array of numbers representing study hours, e.g. [2.5, 4.0, 3.5].",
    logicExplanation:
      "Starts at 0. Adds 2.5 (total = 2.5), adds 4.0 (total = 6.5), adds 3.5 (total = 10.0).",
    outputExplanation: "The total number 10.0.",

    // 4. WRITE YOUR OWN CODE
    taskPrompt:
      "Write a function named calculateAverageScore(scores) that takes an array of test scores. If the array is empty (scores.length === 0), return 0. Otherwise, compute the average (sum / scores.length) and return it rounded to 1 decimal place as a number: Number((sum / scores.length).toFixed(1)).",
    functionName: "calculateAverageScore",
    requirements: [
      "The function must be named calculateAverageScore(scores).",
      "If scores is empty or length is 0, return 0.",
      "Compute sum divided by scores.length.",
      "Return the result rounded to 1 decimal place as a number.",
    ],
    starterCode: `function calculateAverageScore(scores) {
  // Your code here: handle empty array, compute average, round to 1 decimal
  
}`,
    hints: [
      "Guard against empty arrays first: if (!scores || scores.length === 0) return 0;",
      "Sum the elements using a for loop: let sum = 0; for (...) sum += scores[i];",
      "Return the rounded average: return Number((sum / scores.length).toFixed(1));",
    ],
    solutionCode: `function calculateAverageScore(scores) {
  if (!scores || scores.length === 0) return 0;
  let sum = 0;
  for (let i = 0; i < scores.length; i++) {
    sum += scores[i];
  }
  return Number((sum / scores.length).toFixed(1));
}`,

    // 5. RUN AND TEST
    testCases: [
      {
        name: "Test Case 1: Standard Scores",
        description: "Calculates average for [80, 90, 100]",
        input: [[80, 90, 100]],
        expectedOutput: 90,
      },
      {
        name: "Test Case 2: Decimal Rounding",
        description: "Calculates rounded average for [75, 82, 91] => 82.7",
        input: [[75, 82, 91]],
        expectedOutput: 82.7,
      },
      {
        name: "Test Case 3: Empty Array Guard",
        description: "Returns 0 when given an empty array []",
        input: [[]],
        expectedOutput: 0,
      },
    ],
  },

  {
    id: "prac-05",
    stepNumber: 5,
    level: "Challenge",
    difficultyBadge: "Level 5 • Problem-Solving Challenge",
    language: "javascript",
    title: "Algorithmic Pattern: Frequency Counter",
    summary: "Discover the essential problem-solving pattern used in technical interviews to count and find top items in a single pass.",
    estimatedMinutes: 10,

    // 1. LEARN THE IDEA
    conceptExplanation:
      "When tech companies ask algorithmic interview questions, they test whether you know how to count things efficiently. Rather than searching through a list over and over, senior engineers use a 'Frequency Map' (a key-value dictionary) to record counts in one single pass.",
    realWorldAnalogy:
      "Think of counting paper election ballots. Instead of going back through a giant pile of 1,000 ballots each time you want to count for one candidate, election workers sort each ballot into a candidate's designated bin. When done, they just look at which bin is tallest.",
    vocabulary: [
      {
        term: "Frequency Map / Table",
        definition: "An object storing unique items as keys and their occurrence counts as values.",
        example: "{ 'python': 3, 'sql': 1 }",
      },
      {
        term: "Key-Value Object",
        definition: "A dictionary structure where looking up or setting a value by name happens immediately.",
        example: "counts[key] = (counts[key] || 0) + 1",
      },
      {
        term: "Single Pass (O(n))",
        definition: "Visiting each item in the dataset exactly once, making the algorithm fast even for millions of items.",
        example: "Single loop through array",
      },
    ],

    // 2. SEE HOW IT WORKS
    workedExampleCode: `function countItemOccurrences(items) {
  const counts = {};
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    // If the item exists in counts, add 1; otherwise start at 1
    counts[item] = (counts[item] || 0) + 1;
  }
  
  return counts;
}`,
    lineExplanations: [
      {
        line: "const counts = {};",
        explanation: "Creates an empty JavaScript object to hold our frequency tally.",
      },
      {
        line: "for (let i = 0; i < items.length; i++) {",
        explanation: "Loops through the items array exactly once.",
      },
      {
        line: "counts[item] = (counts[item] || 0) + 1;",
        explanation: "Counts[item] || 0 gets current count (or 0 if new), then adds 1.",
      },
      {
        line: "return counts;",
        explanation: "Returns the complete count object, e.g. { python: 3, sql: 1 }.",
      },
    ],

    // 3. UNDERSTAND THE CODE
    inputExplanation: "An array of skill strings, e.g. ['python', 'sql', 'python', 'docker', 'python'].",
    logicExplanation:
      "Processes each string. 'python' is counted 3 times, 'sql' 1 time, 'docker' 1 time into an object.",
    outputExplanation: "Returns the frequency object { python: 3, sql: 1, docker: 1 }.",

    // 4. WRITE YOUR OWN CODE
    taskPrompt:
      "Write a function named findTopSkill(skillsList) that receives an array of skill strings and returns the single skill that appears most frequently. If skillsList is empty, return null. (If there is a tie, return the first skill that achieved the maximum count).",
    functionName: "findTopSkill",
    requirements: [
      "The function must be named findTopSkill(skillsList).",
      "If skillsList is empty or null, return null.",
      "Count the occurrences of each skill.",
      "Return the skill string with the highest count.",
    ],
    starterCode: `function findTopSkill(skillsList) {
  // Your code here: build frequency map and return top skill
  
}`,
    hints: [
      "Check empty list first: if (!skillsList || skillsList.length === 0) return null;",
      "Maintain a counts object, a topSkill string variable, and a maxCount number variable.",
      "As you tally counts[s], if counts[s] > maxCount, update maxCount = counts[s] and topSkill = s.",
      "Return topSkill at the end.",
    ],
    solutionCode: `function findTopSkill(skillsList) {
  if (!skillsList || skillsList.length === 0) return null;
  const counts = {};
  let topSkill = skillsList[0];
  let maxCount = 0;
  for (let i = 0; i < skillsList.length; i++) {
    const s = skillsList[i];
    counts[s] = (counts[s] || 0) + 1;
    if (counts[s] > maxCount) {
      maxCount = counts[s];
      topSkill = s;
    }
  }
  return topSkill;
}`,

    // 5. RUN AND TEST
    testCases: [
      {
        name: "Test Case 1: Most Frequent Skill",
        description: "Finds 'python' as top skill in ['python', 'sql', 'python', 'docker', 'python']",
        input: [["python", "sql", "python", "docker", "python"]],
        expectedOutput: "python",
      },
      {
        name: "Test Case 2: Frontend Tech",
        description: "Finds 'nextjs' in ['react', 'nextjs', 'nextjs', 'typescript']",
        input: [["react", "nextjs", "nextjs", "typescript"]],
        expectedOutput: "nextjs",
      },
      {
        name: "Test Case 3: Empty List",
        description: "Returns null for empty array []",
        input: [[]],
        expectedOutput: null,
      },
    ],
  },
];
