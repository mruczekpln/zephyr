/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: 'api.mapbox.com'
			},
			{
				hostname: 'avatars.githubusercontent.com'
			}
		]
	}
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer(nextConfig)
