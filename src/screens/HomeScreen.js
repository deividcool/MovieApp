import { View, Text, Platform, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { styles } from "../theme/index";
import TredingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";
import { useNavigation } from '@react-navigation/native';
import Loading from "../components/loading";
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from "../utils/api/moviedb";

const ios = Platform.OS == "ios";
export default function HomeScreen() {
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, [])

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        if (data && data.results) setTrending(data.results);
        setLoading(false);
    }
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies();
       /*  console.log(data); */
        if (data && data.results) setUpcoming(data.results);
    }
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        /* console.log(data); */
        if (data && data.results) setTopRated(data.results);
    }


    return (
        <View className="flex-1 bg-neutral-800">
            <SafeAreaView className={ios ? 'mt-5' : 'mt-6'}>
                <StatusBar style="light" />
                <View className="flex-row items-center justify-between mx-4">
                    <Bars3CenterLeftIcon color="white" size={30} strokeWidth={2} />
                    <Text
                        className="text-white text-3xl font-bold"
                    >
                        <Text style={styles.text}>M</Text>ovies
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                        <MagnifyingGlassIcon color="white" size={30} strokeWidth={2} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {
                loading ? (
                    <Loading />
                ) : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 10 }}
                    >
                        {trending.length > 0 && <TredingMovies data={trending} />}


                        <MovieList title="Upcoming" data={upcoming} />

                        <MovieList title="Top Rated" data={topRated} />
                    </ScrollView>
                )
            }


        </View>
    );
}


