module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("script.js");

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
  };
}