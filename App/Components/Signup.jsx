import { View, Text,Platform,StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Signup = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{flex:1}}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
        contentContainerStyle={{ flexGrow: 1 }}>
        {Platform.OS ==='android' && <View style={{height:StatusBar.currentHeight}}/>}
        <View>
          <Text>Register</Text>
        </View>

        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
   
  )
}

export default Signup