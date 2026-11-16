export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/images");
  return { dir: { input: "src", output: "_site" }, templateFormats: ["njk"] };
}
