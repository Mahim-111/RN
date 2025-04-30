import React, { useState } from 'react';
import { TextInput, Button, Text, View, Alert } from 'react-native';

import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const handleAdd = () => {
    const sum = parseFloat(value1) + parseFloat(value2);
    if (isNaN(sum)) {
      Alert.alert('Invalid Input', 'Please enter valid numbers in both fields.');
      setResult(null);
    } else {
      setResult(sum);
    }
  };

  const handleSubtract = () => {
    const diff = parseFloat(value1) - parseFloat(value2);
    if (isNaN(diff)) {
      Alert.alert('Invalid Input', 'Please enter valid numbers in both fields.');
      setResult(null);
    } else {
      setResult(diff);
    }
  };

  const handleClear = () => {
    setValue1('');
    setValue2('');
    setResult(null);
  };

  return (
    <ThemedView style={{ padding: 16 }}>
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
          <Button title="Subtract" onPress={handleSubtract} color="orange" />
        </View>
      </View>

      <View style={{ marginBottom: 10 }}>
        <Button title="Clear" onPress={handleClear} color="red" />
      </View>

      {result !== null && (
        <Text style={{ fontSize: 18, fontWeight: '600' }}>
          Result: {result}
        </Text>
      )}
    </ThemedView>
  );
}
