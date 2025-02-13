import { defineConfig } from 'cypress'
import makeWebpackConfig from './src/scripts/make-webpack-config'
import webpackMerge from 'webpack-merge'

const { resolve } = makeWebpackConfig(
	{
    require: [],
		simpleEditor: true
	} as any,
	'development'
)

const webpackConfig = webpackMerge({
	resolve: {
		...resolve,
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.mjs$/,
				type: 'javascript/auto'
			},
			{
				test: /\.(tsx|ts|js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/env',
								{
									modules: 'commonjs'
								}
							],
							'@babel/typescript',
							'@babel/react'
						]
					}
				}
			}
		]
	},
	devtool: 'source-map'
})

export default defineConfig({
	projectId: '3pjqam',

	fixturesFolder: false,
	screenshotsFolder: '../../test/cypress/screenshots',
	videosFolder: '../../test/cypress/videos',

	component: {
		specPattern: 'src/client/**/*.cy.{js,jsx,ts,tsx}',
		supportFile: '../../test/cypress/support/component.tsx',
		indexHtmlFile: '../../test/cypress/support/component-index.html',
		devServer: {
			framework: 'react',
			bundler: 'webpack',
			webpackConfig
		}
	}
})
