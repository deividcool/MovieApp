import { View, Text, Dimensions, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useCallback, useState } from 'react';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import Loading from '../components/loading';
import { debounce } from 'lodash'; 
import { image185, searchMovies } from '../utils/api/moviedb';

const { width, height } = Dimensions.get('window');

export default function SearchScreen() {
    const navigation = useNavigation();
    const [resuls, setResults] = useState([]);
    const [MovieName, setMovieName] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleSearch = (value) => {
        if(value && value.length > 2){
            setLoading(true);
            searchMovies({
                query: value,
                include_adult: false,
                laguage: 'en-US',
                page:'1'
            }).then(data=>{
                setLoading(false);
                if(data && data.results) setResults(data.results);
            })
        }else{
            setLoading(false);
            setResults([]);
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
    return (
        <SafeAreaView style={tw`bg-neutral-800 flex-1`}>
            <View style={tw`top-10 mx-6 mb-15 flex-row justify-between items-center border border-neutral-500 rounded-full`}>
                <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder='Search'
                    placeholderTextColor={'lightgray'}
                    style={tw`pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider`}
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('HomeScreen')}
                    style={tw`rounded-full bg-neutral-500 p-3 m-1`}
                >
                    <XMarkIcon color={'white'} size={22} />
                </TouchableOpacity>
            </View>

            {
                loading ? (
                    <Loading />
                ) :
                    resuls.length > 0 ? (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 15 }}
                            style={tw`m-1`}
                        >
                            <Text style={tw`text-white ml-1 font-semibold mb-1`}>Results ({resuls.length})</Text>
                            <View style={tw`flex-row justify-between flex-wrap`}>
                                {
                                    resuls.map((item, index) => {
                                        return (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={() => navigation.push('Movie', item)}
                                            >
                                                <View style={tw`mb-4`}>
                                                    <Image
                                                        style={{ width: width * 0.44, height: height * 0.3, borderRadius: 25 }}
                                                        source={{ uri: image185(item.poster_path) }}
                                                        /* source={require('../../assets/images/moviePoster2.png')} */
                                                    />
                                                    <Text style={tw`text-neutral-400 ml-1`}>
                                                        {

                                                            item?.title?.length > 22 ? item?.title.slice(0, 22) + '...' : item?.title

                                                        }

                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    ) : (
                        <View style={tw`flex-1 justify-center items-center`}>
                            <Image
                                source={require('../../assets/images/movieTime.png')}
                                style={tw`w-96 h-96`}
                            />
                            <Text style={tw`text-white mt-5`}>No Results Found</Text>
                        </View>
                    )
            }


        </SafeAreaView>
    )
}