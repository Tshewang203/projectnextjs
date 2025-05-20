/**
 * @typedef {'cultural' | 'adventure' | 'spiritual' | 'nature'} QuizCategory
 */

/**
 * @typedef {Object} QuizOption
 * @property {string} icon - The icon for the option
 * @property {string} text - The text of the option
 * @property {QuizCategory} type - The category type
 * @property {Object.<QuizCategory, number>} points - Points for each category
 */

/**
 * @typedef {Object} QuizQuestion
 * @property {string} id - Question identifier
 * @property {string} text - Question text
 * @property {QuizOption[]} options - Available options
 */

/**
 * @typedef {Object} QuizResult
 * @property {string} title - Result title
 * @property {string} description - Result description
 * @property {string} recommendation - Travel recommendation
 * @property {string} icon - Result icon
 */

/**
 * @typedef {Object.<QuizCategory, number>} QuizScore
 */

/**
 * @typedef {Object.<QuizCategory, QuizResult>} QuizResults
 */

export {}; 