import React, { useState } from 'react';
import { TextInput, Button, Text, View, Alert } from 'react-native';

import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const handleAdd = () => {

    const x = parseFloat(value1);
    const y = parseFloat(value2);

    if (isNaN(x) && isNaN(y)) {
      Alert.alert('Invalid Input', 'Please enter valid numbers in both fields.');
      setResult(null);
    } else {
      setResult(x + y);
    }
  };

  const handleClear = () => {
    setValue1('');
    setValue2('');
    setResult(null);
  };

  return (
    <ThemedView style={{ padding: 16, backgroundColor: 'white' }}>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          borderRadius: 8,
          fontSize: 16,
          marginBottom: 10,
        }}
        keyboardType="numeric"
        value={value1}
        onChangeText={setValue1}
        placeholder="Enter first number"
      />

      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          borderRadius: 8,
          fontSize: 16,
          marginBottom: 10,
        }}
        keyboardType="numeric"
        value={value2}
        onChangeText={setValue2}
        placeholder="Enter second number"
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <View style={{ flex: 1, marginRight: 5 }}>
          <Button title="Add" onPress={handleAdd} />
        </View>
        <View style={{ flex: 1, marginLeft: 5 }}>
          <Button title="Clear" onPress={handleClear} color="red" />
        </View>
      </View>

      {result !== null && (
        <Text style={{ fontSize: 18, fontWeight: '600' }}>
          Result: {result}
        </Text>
      )}
    </ThemedView>
  );
}
