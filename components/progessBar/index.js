import * as React from 'react';
import {View} from 'react-native'
import { ProgressBar } from 'react-native-paper';
import styles from './styles'


const Progess = ({loading, visible}) => (
    <View style={styles.container}>
        <ProgressBar visible={visible} style={styles.progess} progress={loading} color='white' />
    </View>
);

export default Progess;