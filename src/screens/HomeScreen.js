import { View, Text, Platform, TouchableOpacity,SafeAreaView, ScrollView } from "react-native";
import React, {useState} from "react";
import { StatusBar } from "expo-status-bar";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { styles } from "../theme/index";
import TredingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";

const ios = Platform.OS == "ios";
export default function HomeScreen() {
    const [trending, setTrending] = useState([1,2,3]);
    const [upcoming, setUpcoming] = useState([1,2,3]);
    const [topRated, setTopRated] = useState([1,2,3]);
    
    return (
        <View className="flex-1 bg-neutral-800">
            <SafeAreaView className={ios? 'mt-5':'mt-6'}>
                <StatusBar style="light" />
                <View className="flex-row items-center justify-between mx-4">
                    <Bars3CenterLeftIcon color="white" size={30} strokeWidth={2}/>
                    <Text 
                        className="text-white text-3xl font-bold"
                    >
                        <Text style={styles.text}>M</Text>ovies
                    </Text>
                    <TouchableOpacity>
                        <MagnifyingGlassIcon color="white" size={30} strokeWidth={2}/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 10}}
            >
                <TredingMovies data={trending}/>


                <MovieList title="Upcoming" data={upcoming}/>

                <MovieList title="Top Rated" data={topRated}/>
            </ScrollView>
        </View>
    );
}


