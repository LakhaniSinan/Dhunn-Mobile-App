import React from "react";
import { useState } from "react";
import { LayoutChangeEvent, ScrollView, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export const CollapsableContainer = ({
    children,
    expanded,
}: {
    children: React.ReactNode;
    expanded: boolean;
}) => {
    const [height, setHeight] = useState(0);
    const animatedHeight = useSharedValue(0);

    const onLayout = (event: LayoutChangeEvent) => {
        const onLayoutHeight = event.nativeEvent.layout.height;

        if (onLayoutHeight > 0 && height !== onLayoutHeight) {
            setHeight(onLayoutHeight);
        }
    };

    const collapsableStyle = useAnimatedStyle(() => {
        animatedHeight.value = expanded ? withTiming(height) : withTiming(0);

        return {
            height: animatedHeight.value,
        };
    }, [expanded]);

    return (
        <Animated.View style={[collapsableStyle, { overflow: "hidden", }]}>
            <ScrollView style={{
                position: "absolute",
                
                // paddingHorizontal: 10,
                // flex: 1
            }}
            contentContainerStyle={{
                display:'flex',
                justifyContent:"space-between",
            }}
                onLayout={onLayout}
            >
                {children}
            </ScrollView>
        </Animated.View>
    );
};