/**
 * @typedef {Object} Image
 * @property {string} url - The URL of the image
 * @property {string} alternativeText - Alternative text for the image
 */

/**
 * @typedef {Object} Button
 * @property {string} EnglishLabel - The English text for the button
 * @property {string} TeReoLabel - The Te Reo text for the button
 * @property {string} href - The button's link destination
 */

/**
 * @typedef {Object} HeaderSection
 * @property {string} TeReoTitle - The Te Reo title
 * @property {string} EnglishTitle - The English title
 * @property {Image} BackgroundHeaderImage - The background image
 */

/**
 * @typedef {Object} MihiSection
 * @property {string} Title - The title of the Mihi section
 * @property {string} MihiShortened - The shortened version of the Mihi
 * @property {string} FullMihi - The complete Mihi text
 * @property {Image} Image - The image for the Mihi section
 */

/**
 * @typedef {Object} Homg
 * @property {HeaderSection} HeaderSection - The header section content
 * @property {MihiSection} MihiSection - The Mihi section content
 * @property {Button[]} Button - Array of buttons
 */

/**
 * @typedef {Object} BlogPost
 * @property {string} title - The title of the blog post
 * @property {Image} image - The main image
 * @property {string} content - The main content
 * @property {string} description - A short description/excerpt
 * @property {Image[]} images - Additional images
 * @property {string} contentPartTwo - Second content section
 * @property {string} excerptTwo - Second excerpt
 * @property {string} contentPartThree - Third content section
 * @property {string} publishedAt - Publication date
 * @property {string} createdAt - Creation date
 * @property {string} updatedAt - Last update date
 */

/**
 * @typedef {Object} About
 * @property {string} header - The Te Reo header
 * @property {string} headerEnglish - The English header
 * @property {string} quote - Featured quote
 * @property {string} info - Main content
 * @property {string} trusteesHeader - Trustees section header
 * @property {string[]} trustees - List of trustees
 */

/**
 * @typedef {Object} MataiWhetu
 * @property {string} header - The Te Reo header
 * @property {string} headerEnglish - The English header
 * @property {Object} bookingForm - Booking form configuration
 */

/**
 * @typedef {Object} FishingPermit
 * @property {string} header - The Te Reo header
 * @property {string} headerEnglish - The English header
 * @property {Object} formConfig - Permit form configuration
 */

/**
 * @typedef {Object} Documents
 * @property {string} header - The Te Reo header
 * @property {string} headerEnglish - The English header
 * @property {Object[]} documents - Array of document objects
 */

export const types = {}; // Placeholder export for JSDoc types
