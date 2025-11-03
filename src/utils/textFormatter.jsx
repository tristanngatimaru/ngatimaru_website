/**
 * Converts ~ symbols to line breaks in text content from Strapi
 * @param {string} text - The text content that may contain ~ symbols
 * @returns {JSX.Element[]} Array of span elements with line breaks
 */
export function formatTextWithLineBreaks(text) {
  if (!text) return "";

  return text.split("~").map((part, index, array) => (
    <span key={index}>
      {part}
      {index < array.length - 1 && <br />}
    </span>
  ));
}

/**
 * Alternative function for simple paragraph splitting (double newlines)
 * Also handles ~ symbols within each paragraph
 * @param {string} text - The text content
 * @param {string} className - Custom CSS classes for paragraphs
 * @returns {JSX.Element[]} Array of paragraph elements
 */
export function formatParagraphsWithLineBreaks(
  text,
  className = "text-gray-700 text-base lg:text-lg leading-relaxed mb-4 last:mb-0"
) {
  if (!text) return [];

  return text.split("\n\n").map((paragraph, index) => (
    <p key={index} className={className}>
      {formatTextWithLineBreaks(paragraph)}
    </p>
  ));
}

/**
 * Formats trustees list into a three-column justified layout
 * ~ symbols act as column delimiters
 * @param {string} text - The trustees text with ~ delimiters (e.g., "tom ~ justin ~ carina ~ kelly ~ james")
 * @returns {JSX.Element} Three-column grid layout
 */
export function formatTrusteesThreeColumn(text) {
  if (!text) return "";

  // Split by ~ and remove empty entries
  const trustees = text
    .split("~")
    .map((name) => name.trim())
    .filter(Boolean);

  if (trustees.length === 0) return "";

  // Group trustees into rows of 3
  const rows = [];
  for (let i = 0; i < trustees.length; i += 3) {
    rows.push(trustees.slice(i, i + 3));
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6 last:mb-0"
        >
          {row.map((trustee, colIndex) => {
            // Split the name into parts (first name and rest)
            const nameParts = trustee.split(" ");
            const firstName = nameParts[0];
            const restOfName = nameParts.slice(1).join(" ");

            return (
              <div
                key={colIndex}
                className="text-center font-roboto-light text-xl lg:text-2xl text-gray-800 select-none hover:scale-125 transition-transform duration-300 ease-in-out"
              >
                <span className="text-emerald-700 font-bold">{firstName}</span>
                {restOfName && <span> {restOfName}</span>}
              </div>
            );
          })}
          {/* Fill empty columns if the row is incomplete */}
          {row.length < 3 &&
            [...Array(3 - row.length)].map((_, emptyIndex) => (
              <div key={`empty-${emptyIndex}`} className="hidden md:block">
                {/* Empty cell for grid alignment */}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Formats text with both line breaks (~) and bullet points (-)
 * Creates a natural flow with properly aligned bullet points
 * @param {string} text - The text content that may contain ~ and - symbols
 * @param {string} className - Custom CSS classes for paragraphs
 * @returns {JSX.Element[]} Array of formatted elements with bullets and line breaks
 */
export function formatContentWithBullets(
  text,
  className = "text-gray-700 text-base lg:text-lg leading-relaxed mb-4 last:mb-0"
) {
  if (!text) return [];

  // Split the entire text by ~ first to handle all sections
  const sections = text
    .split("~")
    .map((section) => section.trim())
    .filter(Boolean);

  return (
    <div className="space-y-4 text-center">
      {sections.map((section, index) => {
        // Check if this section starts with a bullet point
        if (section.startsWith("-")) {
          // This is a bullet point
          const bulletText = section.substring(1).trim();

          return (
            <div key={index} className="text-center">
              <span className="text-emerald-600 font-bold mr-1">•</span>
              <span className="text-gray-700 text-base lg:text-lg leading-relaxed">
                {bulletText}
              </span>
            </div>
          );
        } else {
          // Regular text section
          return (
            <div key={index} className={`${className} text-center`}>
              {section}
            </div>
          );
        }
      })}
    </div>
  );
}
