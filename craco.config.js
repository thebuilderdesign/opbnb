// eslint-disable-next-line @typescript-eslint/no-var-requires
const CracoAlias = require('craco-alias')

module.exports = {
  devServer: {
    port: 3003,
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: './tsconfig.base.json',
      },
    },
  ],
}
