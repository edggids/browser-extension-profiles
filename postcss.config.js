import purgeCSSPlugin from "@fullhuman/postcss-purgecss";

export default {
    plugins: [
        purgeCSSPlugin({
            content: [
                "./index.html",
                "./src/**/*.svelte",
                "./src/**/*.ts"
            ],
            /** custom extractor to allow for class names with special characters like "." and ":" */
            defaultExtractor: (content) => content.match(/[\w-.:/]+(?<!:)/g) || [],
        })
    ]
};
