import _ from 'lodash';
import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import CommentItem from './CommentItem';
import AttachmentItem from './AttachmentItem';
import * as appStyles from '../utils/styles';

const CommentList = ({ task }) => {
    const comments = task.comments.map((c) => ({ type: 'comment', data: c }));
    const attachments = task.attachments.map((a) => ({ type: 'attachment', data: a }));
    const commentAndAttachments = _.orderBy([...comments, ...attachments], (item) => item.data.createdAt, ['desc']);

    return (
        <View style={styles.CommentList}>
            {commentAndAttachments.length ?
                commentAndAttachments.map((item) =>
                    <View key={item.data.id}>
                        { item.type === 'comment' ?
                            <CommentItem comment={item.data}/> :
                            <AttachmentItem attachment={item.data}/>
                        }
                    </View>
                ) :
                <Text>No comments</Text>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    CommentList: {
        flex: 1,
        backgroundColor: appStyles.colors.bg00,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: appStyles.colors.divider,
    },
});

export default CommentList;
