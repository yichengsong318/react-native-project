import React from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AppScrollView = React.forwardRef(({ children, extraHeight, extraScrollHeight, style }, ref) => (
    <KeyboardAwareScrollView
        ref={ref}
        extraHeight={extraHeight}
        extraScrollHeight={extraScrollHeight}
        style={[styles.AppScrollView, style]}
        // enableAutomaticScroll={(Platform.OS === 'ios')}
        enableOnAndroid
    >
        {children}
    </KeyboardAwareScrollView>
));

AppScrollView.defaultProps = {
    extraHeight: 100,
    extraScrollHeight: 0,
};

const styles = StyleSheet.create({
    AppScrollView: {
        flex: 1,
    },
});

export default AppScrollView;
