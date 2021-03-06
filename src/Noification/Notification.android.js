import React from 'react';
import {Animated, View, Text, TouchableOpacity} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {NotificationBase} from './NotificationBase';
import {androidStyle} from './androidStyle';

const minVelocityToFling = -250;

export class Notification extends NotificationBase {
    static defaultProps = {
        duration: 2000,
        autohide: true,
    };

    onHandlerStateChange = (event) => {
        const {
            velocityY,
            translationY,
            numberOfPointers,
            state,
        } = event.nativeEvent;

        if (this.props.onDragGestureHandlerStateChange) {
            this.props.onDragGestureHandlerStateChange(event);
        }

        if (state === 5) {
            if (velocityY < minVelocityToFling && numberOfPointers === 0) {
                Animated.spring(this.translateY, {
                    toValue: (this.viewHeight + this.offset) * -1,
                    useNativeDriver: true,
                    velocity: velocityY,
                }).start();
                return;
            }

            if (translationY > (this.viewHeight / 2) * -1) {
                this.show();
            } else {
                this.hide();
            }
        }
    };

    render() {
        const {style} = this.props;

        const animatedStyle = [
            androidStyle.notification,
            style,
            {
                paddingTop: this.offset,
                transform: [{translateY: this.translateY}],
            },
        ];

        return (
            <PanGestureHandler
                onHandlerStateChange={this.onHandlerStateChange}
                onGestureEvent={this.onGestureEvent}>
                <Animated.View
                    onLayout={this.handleOnLayout}
                    style={animatedStyle}>
                    <TouchableOpacity
                        style={androidStyle.container}
                        activeOpacity={1}
                        onPress={() => this.handlePress()}>
                        <View style={androidStyle.content}>
                            {this.renderComponent(androidStyle.text)}
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </PanGestureHandler>
        );
    }
}
