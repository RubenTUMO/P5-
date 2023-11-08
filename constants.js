const BACKGROUD_COLOR = "#50386a";
const WORD_COLOR = "#ffffff";
const LETTER_SIZE = 16;

const WORDS = ["joyka", "ben", "fly", "sun", "flower", "juvenile", "fox", "wolf", "cat", "eagle", "raven", "bird", "paradise"];
const WORD_SPEED = 0.5;

const MAX_LETTER_COUNT = 10;
const MAX_WORD_SIZE = LETTER_SIZE * MAX_LETTER_COUNT;
const MAX_WORD_X = window.innerWidth - MAX_WORD_SIZE;
const INITIAL_SPAWNING_INTERVAL = 1000; // 1s
const SPAWNING_INTERVAL_ACCELERATION = 100; // 0.1s
const MIN_SPAWNING_INTERVAL = 600; // 0.4s

const MAX_ROUNDS = 2;

const BUTTONX = "500";
const BUTTONY = "200";