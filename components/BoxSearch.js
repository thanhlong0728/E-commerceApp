import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { SearchBar } from 'react-native-elements'

import { COLORS } from '../contains'

const BoxSearch = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const [search, setSearch] = useState(route.params?.search || '')

    const changePage = () => {
        if (route.name === 'SearchScreen') {
            navigation.setParams({
                search
            })
        } else {
            if (search) {
                navigation.navigate('SearchScreen', {
                    search
                })
            }
        }
    }

    return (
        <View style={styles.container}>
            <SearchBar
                placeholder='Tìm kiếm...'
                onChangeText={(search) => setSearch(search)}
                value={search}
                containerStyle={styles.container}
                inputContainerStyle={styles.input}
                lightTheme
                onSubmitEditing={changePage}
            />
        </View>
    )
}

export default BoxSearch

const styles = StyleSheet.create({
    container: {
        padding: 0,
        borderColor: '#ffffff',
        borderRadius: 20
    },
    input: {
        backgroundColor: COLORS.inputSearch,
        borderRadius: 20,
        paddingHorizontal: 8
    }
})
