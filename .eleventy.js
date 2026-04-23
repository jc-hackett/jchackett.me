/* ===== Eleventy Config ===== */
module.exports = function (eleventyConfig) {
  /* ===== Passthrough Copies ===== */
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });

  /* ===== Notes Collection ===== */
  eleventyConfig.addCollection("notes", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/notes/*.md")
      .sort((a, b) => b.date - a.date);
  });

  /* ===== Date Filters ===== */
  eleventyConfig.addFilter("dateIso", (date) => {
    return new Date(date).toISOString().split("T")[0];
  });

  eleventyConfig.addFilter("dateDisplay", (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  /* ===== Ignore Non-Site Files ===== */
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("_kernels/**");

  /* ===== Return Options ===== */
  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
      output: "_site",
    },
  };
};
/* ===== /Eleventy Config ===== */