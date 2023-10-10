/** @type {import('next').NextConfig} */
const nextConfig = {
	images: { domains: ['api.mapbox.com'] },
	experimental: { serverActions: true }
}

module.exports = nextConfig
