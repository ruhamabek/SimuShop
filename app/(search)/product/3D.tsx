import React, { useEffect, useState } from 'react'
import { View, Dimensions } from 'react-native'
import { Asset } from 'expo-asset'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { useSharedValue } from 'react-native-worklets-core'
import { Camera, DefaultLight, FilamentScene, FilamentView, Model, useCameraManipulator } from 'react-native-filament'
import FloatingBackButton from '@/components/shared/FloatingBackButton'
import { router } from 'expo-router'

function Scene({ modelUri }: { modelUri: string }) {
  const cameraManipulator = useCameraManipulator({
    orbitHomePosition: [0, 0, 8],
    targetPosition: [0, 0, 0],
    orbitSpeed: [0.003, 0.003],
  })

  const viewHeight = Dimensions.get('window').height

  const panGesture = Gesture.Pan()
    .onBegin((event) => {
      const yCorrected = viewHeight - event.translationY
      cameraManipulator?.grabBegin(event.translationX, yCorrected, false)
    })
    .onUpdate((event) => {
      const yCorrected = viewHeight - event.translationY
      cameraManipulator?.grabUpdate(event.translationX, yCorrected)
    })
    .maxPointers(1)
    .onEnd(() => {
      cameraManipulator?.grabEnd()
    })

  const previousScale = useSharedValue(1)
  const scaleMultiplier = 100
  const pinchGesture = Gesture.Pinch()
    .onBegin(({ scale }) => {
      previousScale.value = scale
    })
    .onUpdate(({ scale, focalX, focalY }) => {
      const delta = scale - previousScale.value
      cameraManipulator?.scroll(focalX, focalY, -delta * scaleMultiplier)
      previousScale.value = scale
    })

  const combinedGesture = Gesture.Race(pinchGesture, panGesture)

  return (
    <GestureDetector gesture={combinedGesture}>
      <FilamentView>
        <Camera cameraManipulator={cameraManipulator} />
        <DefaultLight />
        <Model source={{ uri: modelUri }} transformToUnitCube />
      </FilamentView>
    </GestureDetector>
  )
}

export default function ProductARScreen() {
  const [modelUri, setModelUri] = useState<string | null>(null)

  useEffect(() => {
    async function loadModel() {
      const asset = Asset.fromModule(require('../../../assets/products/chair.glb'))
      await asset.downloadAsync()
      setModelUri(asset.localUri ?? asset.uri)
    }
    loadModel()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <FloatingBackButton onPress={router.back} />
      {modelUri && (
        <FilamentScene>
          <Scene modelUri={modelUri} />
        </FilamentScene>
      )}
    </View>
  )
}
