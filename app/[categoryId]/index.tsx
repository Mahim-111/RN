import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export default function CategoryPage() {
  const router = useRouter();
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    if (!categoryId) return;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryId}`)
      .then(res => res.json())
      .then(data => setMeals(data.meals || []))
      .catch(err => console.error(err));
  }, [categoryId]);

  const renderMealItem = ({ item }: { item: Meal }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/${categoryId}/${item.idMeal}`)}
    >
      <Image source={{ uri: item.strMealThumb }} style={styles.image} />
      <Text style={styles.title} numberOfLines={2}>
        {item.strMeal}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <FlatList
        data={meals}
        renderItem={renderMealItem}
        keyExtractor={(item) => item.idMeal}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E4',
  },
  backButton: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FF6363',
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  backText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  list: {
    padding: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 14,
    marginRight: 20,
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4B4453',
    flexShrink: 1,
  },
});
