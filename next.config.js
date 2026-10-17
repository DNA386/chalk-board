
const baseURL = new URL(process.env.NEXT_PUBLIC_CHALKBOARD_URL)
// Remove trailing slash:
const pathPrefix = baseURL.pathname.replace(/\/$/, "")

module.exports = {
    output: 'export',
    typescript: {
        ignoreBuildErrors: false,
        tsconfigPath: 'tsconfig.json',
    },
    basePath: pathPrefix,
    assetPrefix: pathPrefix,
}
