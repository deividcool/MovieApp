import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from "../theme/index";
import tw from 'twrnc';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../utils/api/moviedb';

var { width, height } = Dimensions.get('window')

export default function MovieScreen() {
    const { params: item } = useRoute();
    const [isFavourite, setIsFavourite] = useState(false);
    const navigation = useNavigation();
    const [cast, setCast] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({});
    let movieName = 'Ant-Man and the Wasp: Quantumania'
    useEffect(() => {
        /* console.log(item.id); */
        setLoading(true);
        getMovieDetails(item.id);
        getMovieCredits(item.id);
        getSimilarMovies(item.id);
    }, [item])

    const getMovieDetails = async id => {
        const data = await fetchMovieDetails(id);
        if (data) setMovie(data);
        setLoading(false);
    }

    const getMovieCredits = async id => {
        const data = await fetchMovieCredits(id);
        if (data && data.cast) setCast(data.cast);
    }

    const getSimilarMovies = async id => {
        const data = await fetchSimilarMovies(id);
        if (data && data.results) setSimilarMovies(data.results);
    }

    return (
        <ScrollView
            style={tw`flex-1 bg-neutral-900`}
            contentContainerStyle={{ paddingBottom: 70 }}
        >

            <SafeAreaView style={tw`absolute z-20 w-full flex-row justify-between items-center px-4 mt-7`}>
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
                    <View>
                        <View>
                            <Image
                                source={{ uri: image500(movie?.poster_path) || fallbackMoviePoster }}
                                style={{ width, height: height * 0.55 }}
                            />

                            <LinearGradient
                                colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                                style={[{ width, height: height * 0.40 }, tw`absolute bottom-0`]}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                            />
                        </View>
                        <View style={{ marginTop: -(height * 0.09), ...tw`py-3` }}>
                            <Text style={tw`text-white text-center text-3xl font-bold tracking-wide`}>
                                {
                                    movie?.title
                                }
                            </Text>
                            {
                                movie?.id ? (
                                    <Text style={tw`text-neutral-400 font-semibold text-base text-center`}>
                                        {movie?.status} · {movie?.release_date?.split('-')[0]} · {movie?.runtime} min
                                    </Text>
                                ) : null
                            }


                            <View style={tw`flex-row justify-center`}>
                                {
                                    movie?.genres?.map((genre, index) => {
                                        let showDot = index + 1 != movie?.genres?.length;
                                        return (
                                            <Text key={index} style={tw`text-neutral-400 font-semibold text-base text-center mr-2`}>
                                                {genre?.name} {showDot ? "·" : null}
                                            </Text>
                                        )
                                    })
                                }
                            </View>

                            <Text style={tw`text-neutral-400 mx-4 tracking-wide`}>
                                {
                                    movie?.overview
                                }
                            </Text>
                        </View>

                        {cast.length > 0 && <Cast navigation={navigation} cast={cast} />}

                        {similarMovies.length > 0 && <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />}

                    </View>
                )
            }

        </ScrollView>
    );
}