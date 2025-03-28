/** @type {import('next').NextConfig} */
const nextConfig = {

    webpack: (config) => {
        serverComponentsExternalPackages: ['sharp', 'onnxruntime-node']
        // See https://webpack.js.org/configuration/resolve/#resolvealias
        config.resolve.alias = {
            ...config.resolve.alias,
            "sharp$": false,
            "onnxruntime-node$": false,
        }
        return config;
    },


};

export default nextConfig;
