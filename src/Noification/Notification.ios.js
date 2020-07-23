import React from 'react';
import {Animated, View, TouchableOpacity} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {NotificationBase} from './NotificationBase';
import {IOStyle} from './iOStyle';
import {Util} from '../Util';
import {Blur} from '../RNInAppMessage/Blur';

export class Notification extends NotificationBase {
    static defaultProps = {
        blurAmount: 7,
        duration: 2000,
        showKnob: true,
        textColor: '#000',
        autohide: true,
        hideStatusBar: true,
        useForceTouch: false,
    };

    offset = Util.isIphoneX() ? 42 : this.props.hideStatusBar ? 8 : 22;

    render() {
        const {
            textColor,
            blurAmount,
            blurType = 'light',
            style,
            showKnob,
        } = this.props;

        const animatedStyle = [
            IOStyle.notification,
            {
                top: this.offset,
                transform: [{translateY: this.translateY}],
            },
            IOStyle.mainStyle,
        ];

        const border = style ? style.borderRadius : 14;

        return (
            <PanGestureHandler
                onHandlerStateChange={this.onHandlerStateChange}
                onGestureEvent={this.onGestureEvent}>
                <Animated.View
                    onLayout={this.handleOnLayout}
                    style={animatedStyle}>
                    <Animated.View style={[IOStyle.innerContainer, style]}>
                        <TouchableOpacity
                            style={IOStyle.container}
                            activeOpacity={1}
                            onPress={() => this.handlePress()}>
                            <Blur
                                style={[
                                    IOStyle.absolute,
                                    {borderRadius: border || 14},
                                ]}
                                blurType={blurType}
                                blurAmount={blurAmount}
                            />
                            <View style={IOStyle.content}>
                                {this.renderComponent(IOStyle.text)}
                                {showKnob && (
                                    <View
                                        style={[
                                            IOStyle.knob,
                                            {backgroundColor: textColor},
                                        ]}
                                    />
                                )}
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                </Animated.View>
            </PanGestureHandler>
        );
    }
}
