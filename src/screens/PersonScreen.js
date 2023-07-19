import { View, Image, Text, Dimensions, Platform, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from '../theme';
import { HeartIcon } from 'react-native-heroicons/solid';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image342 } from '../utils/api/moviedb';

var { height, width } = Dimensions.get('window');
const ios = Platform.OS === 'ios';

export default function PersonScreen() {
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [isFavourite, setIsFavourite] = useState(false);
    const [personMovies, setPersonMovies] = useState([]);
    const [person, setPerson] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        getPersonDetails(item.id);
        getPersonMovies(item.id);
    }, [item])

    const getPersonDetails = async id => {
        const data = await fetchPersonDetails(id);
        if (data) setPerson(data)
        setLoading(false);
    }
    const getPersonMovies = async id => {
        const data = await fetchPersonMovies(id);
        if (data && data.cast) setPersonMovies(data.cast)
       
    }

    return (
        <ScrollView style={tw`flex-1 bg-neutral-900`} contentContainerStyle={{ paddingBottom: 20 }}>
            <SafeAreaView style={tw`z-20 w-full flex-row justify-between items-center px-4 mt-7`}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.background, tw`rounded-xl p-1`]}>
                    <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)} >
                    <HeartIcon size="35" color={isFavourite ? "red" : "white"} />
                </TouchableOpacity>
            </SafeAreaView>
            {
                loading ? (
                    <Loading />
                ) : (
                    <>
                        <View>
                            <View
                                style={tw`flex-row justify-center`}
                            >
                                <View style={tw`items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500`}>
                                    <Image
                                        /* source={require('../../assets/images/castImage1.png')} */
                                        source={{ uri: image342(person?.profile_path) || fallbackPersonImage }}
                                        style={{ height: height * 0.43, width: width * 0.74 }}
                                    />
                                </View>
                            </View>
                            <View style={tw`mt-6`}>
                                <Text style={tw`text-white text-3xl font-bold text-center`}>
                                    {
                                        person?.name
                                    }
                                </Text>
                                <Text style={tw`text-base text-neutral-500 text-center`}>
                                    {
                                        person?.place_of_birth
                                    }
                                </Text>
                            </View>
                            <View style={tw`mt-6 p-4 mx-3 flex-row justify-between items-center bg-neutral-700 rounded-full`}>
                                <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
                                    <Text style={tw`text-white font-semibold`}>Gender</Text>
                                    <Text style={tw`text-neutral-300 text-sm`}>
                                        {
                                            person?.gender == 1 ? "Female" : "Male"
                                        }
                                    </Text>
                                </View>
                                <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
                                    <Text style={tw`text-white font-semibold`}>Birthday</Text>
                                    <Text style={tw`text-neutral-300 text-sm`}>
                                        {
                                            person?.birthday
                                        }
                                    </Text>
                                </View>
                                <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
                                    <Text style={tw`text-white font-semibold`}>Known for</Text>
                                    <Text style={tw`text-neutral-300 text-sm`}>
                                        {
                                            person?.known_for_department
                                        }
                                    </Text>
                                </View>
                                <View style={tw`px-2 items-center`}>
                                    <Text style={tw`text-white font-semibold`}>Popularity</Text>
                                    <Text style={tw`text-neutral-300 text-sm`}>
                                        {
                                            person?.popularity?.toFixed(2)
                                        }   %
                                    </Text>
                                </View>
                            </View>
                            <View style={tw`my-6 mx-4 py-2`}>
                                <Text style={tw`text-white text-lg`}>Biography</Text>
                                <Text style={tw`text-neutral-400 text-sm`}>
                                        {
                                            person?.biography || 'N/A'
                                        }
                                </Text>
                            </View>
                        </View>

                        <MovieList title={'Movies'} hideSeeAll={true} data={personMovies} />
                    </>
                )
            }


        </ScrollView>
    )
}