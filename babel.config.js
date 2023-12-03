module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        'react-native-reanimated/plugin',
        [
            'module-resolver',
            {
                root: ['./app'],
                extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
                alias: {
                    '@components': './src/components'
                }
            }
        ]
    ]
}
