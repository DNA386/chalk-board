
module.exports = {
    output: 'export',
    typescript: {
        ignoreBuildErrors: false,
        tsconfigPath: 'tsconfig.json',
    },
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
}
