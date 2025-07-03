import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Text, YStack } from "tamagui";
import firestore, { Filter } from '@react-native-firebase/firestore';
import { Product } from "@/types/product";
import { FlatList } from "react-native";
import { ProductCardResult } from "@/components/screens/search/ProductCardResult";

export default function SearchScreen() {
  const { query: searchQuery = '' } = useLocalSearchParams<{ query?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(
    typeof searchQuery === 'string' ? searchQuery : ''
  );

  // Normalize search term: trim, lowercase, collapse spaces
  const normalize = (term: string) =>
    term.trim().toLowerCase().replace(/\s+/g, ' ');

  useEffect(() => {
    if (typeof searchQuery === 'string') {
      setSearchTerm(searchQuery);
    }
  }, [searchQuery]);

  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
      setProducts([]);

      const normalizedTerm = normalize(searchTerm);

      if (!normalizedTerm) {
        // No search term, load default products (limit 20)
        const snapshot = await firestore()
          .collection('1')
          .limit(20)
          .get();

        const allProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setProducts(allProducts);
        console.log("Default products (no search):", allProducts);
        return;
      }

      // 1) Try exact equality match
      let snapshot = await firestore()
        .collection('1')
        .where('nameLowercase', '==', normalizedTerm)
        .limit(20)
        .get();

      let matchedProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));

      // 2) If no exact match, try prefix search on first word
      if (matchedProducts.length === 0) {
        const firstWord = normalizedTerm.split(' ')[0];
        snapshot = await firestore()
          .collection('1')
          .where('nameLowercase', '>=', firstWord)
          .where('nameLowercase', '<=', firstWord + '\uf8ff')
          .limit(20)
          .get();

        matchedProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      }

      // 3) If still no matches, try keywords array search (for multi-word and partial)
      if (matchedProducts.length === 0) {
        const searchWords = normalizedTerm.split(' ');
        const searchTerms = [
          normalizedTerm,
          ...searchWords,
          ...searchWords.map(word => word + '\uf8ff')
        ];

        snapshot = await firestore()
          .collection('1')
          .where('keywords', 'array-contains-any', searchTerms)
          .limit(20)
          .get();

        matchedProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      }

      setProducts(matchedProducts);

      if (matchedProducts.length > 0) {
        console.log(`Matched products for "${searchTerm}":`, matchedProducts);
      } else {
        console.log(`No products matched "${searchTerm}"`);
      }

    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  const onProductPress = ({id}: Product) => {
             router.push(`/(search)/product/${id}`)
   }

  useEffect(() => {
    setProducts([]);
    getProducts();
  }, [searchTerm, getProducts]);

  return (
  <YStack flex={1} bg="white">
       <FlatList 
           data={products}
           style={{padding: 20}}
           keyExtractor={(item) => item.id.toString()}
           ItemSeparatorComponent={() => <YStack height={10}/>}
           ListEmptyComponent={<Text>No Products found</Text>}
           renderItem={({item: product}) => (
              <ProductCardResult
                      product={product}
                      onPress={() => onProductPress(product)}
               />
           )}
        >

       </FlatList>
    </YStack>
  );
}
