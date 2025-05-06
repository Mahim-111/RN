import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

type MealDetailType = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
};

export default function MealDetail() {
  const router = useRouter();
  const { foodId } = useLocalSearchParams<{ foodId: string }>();
  const [meal, setMeal] = useState<MealDetailType | null>(null);

  useEffect(() => {
    if (!foodId) return;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`)
      .then(res => res.json())
      .then(data => setMeal(data.meals ? data.meals[0] : null))
      .catch(err => console.error(err));
  }, [foodId]);

  if (!meal) return <Text style={styles.loading}>Loading...</Text>;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Image source={{ uri: meal.strMealThumb }} style={styles.image} />

        <Text style={styles.title}>{meal.strMeal}</Text>

        <Text style={styles.instructions}>{meal.strInstructions}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5E4' },
  scrollContainer: { padding: 20 },
  backButton: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#FF6363',
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  backText: { color: '#fff', fontWeight: 'bold' },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4B4453',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  loading: {
    padding: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});
