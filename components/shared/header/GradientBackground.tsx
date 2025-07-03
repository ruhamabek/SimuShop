import {LinearGradient} from 'expo-linear-gradient';

export default function GradientBackground(){
    return <LinearGradient
         style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 , zIndex: -1}}
              colors={['#84def0', '#C1F0DD']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
       />
}