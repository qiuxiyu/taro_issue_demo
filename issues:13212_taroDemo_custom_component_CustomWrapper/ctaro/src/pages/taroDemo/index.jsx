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
      <Text>Hello, world! Text 111</Text>

      {/* 有节点，有内容 */}
      <CustomWrapper>  
        <Text>Hello, world! CustomWrapper Text 222</Text>
      </CustomWrapper>
        {/* 有节点，有内容 */}
        <View>Hello, world! View 333</View>
        
        {/* 有节点，有内容 */}
        <CustomWrapper> 
          <View>Hello, world! CustomWrapper View 444</View>
        </CustomWrapper>

        {/* 有节点，有内容 */}
        <actionSheet />

        <CustomWrapper>
          <Text>Hello, world! CustomWrapper Text 555</Text>
          {/* 有节点，无内容 */}
          <actionSheet />
        </CustomWrapper>

      </View>
    )
  }
}