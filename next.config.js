/** @type {import('next').NextConfig} */
const nextConfig = {
	images: { domains: ['api.mapbox.com', 'avatars.githubusercontent.com'] },
	experimental: { serverActions: true }
}

module.exports = nextConfig
