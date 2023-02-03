import React from "react";
import { View, Text, CustomWrapper } from "@tarojs/components";
import "./index.scss";

export default class Index extends React.Component {
  componentDidMount () {
    // logRaw()
    console.log(1111111);
  }

  render () {
    return (
      <View className='index'>
        {/* 有节点，有内容 */}
        <View>Hello, world! View 111</View>
        
        {/* 有节点，有内容 */}
        <CustomWrapper> 
          <View>Hello, world! CustomWrapper View 222</View>
        </CustomWrapper>

        {/* 有节点，无内容 */}
        <Text>Hello, world! Text 333</Text>

        {/* 有节点，无内容 */}
        <CustomWrapper>  
          <Text>Hello, world! CustomWrapper Text 444</Text>
        </CustomWrapper>
      </View>
    )
  }
}