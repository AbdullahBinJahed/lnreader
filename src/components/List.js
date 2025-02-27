import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {List as PaperList, Divider as PaperDivider} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ListSection = ({children}) => (
  <PaperList.Section style={styles.listSection}>{children}</PaperList.Section>
);

const ListSubHeader = ({children, theme}) => (
  <PaperList.Subheader
    style={[styles.listSubHeader, {color: theme.colorAccent}]}
  >
    {children}
  </PaperList.Subheader>
);

const ListItem = ({
  title,
  description,
  icon,
  onPress,
  theme,
  right,
  iconColor,
  titleStyle,
  style,
}) => (
  <PaperList.Item
    title={title}
    style={style}
    titleStyle={[{color: theme.textColorPrimary}, titleStyle]}
    description={description}
    descriptionStyle={{color: theme.textColorSecondary}}
    descriptionNumberOfLines={1}
    left={() => (
      <View style={{justifyContent: 'center'}}>
        {icon && (
          <PaperList.Icon
            color={theme.colorAccent}
            icon={icon}
            style={{
              marginVertical: 0,
            }}
          />
        )}
      </View>
    )}
    right={() =>
      right && (
        <MaterialCommunityIcons
          name={right}
          color={iconColor || '#47a84a'}
          size={23}
          style={{marginRight: 16, textAlignVertical: 'center'}}
        />
      )
    }
    onPress={onPress}
    rippleColor={theme.rippleColor}
  />
);

const Divider = ({theme}) => (
  <PaperDivider style={{backgroundColor: theme.dividerColor, height: 1}} />
);

const InfoItem = ({title, icon, theme}) => (
  <PaperList.Item
    title={title}
    titleStyle={{color: theme.textColorSecondary, fontSize: 14}}
    titleNumberOfLines={5}
    left={() =>
      icon && (
        <PaperList.Icon
          color={theme.textColorSecondary}
          icon={icon}
          style={{marginVertical: 0}}
        />
      )
    }
  />
);

const ColorItem = ({title, description, theme, onPress}) => (
  <Pressable
    style={{
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
    android_ripple={{color: theme.rippleColor}}
    onPress={onPress}
  >
    <View>
      <Text style={{color: theme.textColorPrimary, fontSize: 16}}>{title}</Text>
      <Text style={{color: theme.textColorSecondary}}>{description}</Text>
    </View>
    <View
      style={{
        backgroundColor: description,
        height: 24,
        width: 24,
        borderRadius: 50,
        marginRight: 16,
      }}
    />
  </Pressable>
);

const Icon = ({icon, theme}) => (
  <PaperList.Icon color={theme.colorAccent} icon={icon} style={{margin: 0}} />
);

export const List = {
  Section: ListSection,
  SubHeader: ListSubHeader,
  Item: ListItem,
  Divider,
  InfoItem,
  ColorItem,
  Icon,
};

const styles = StyleSheet.create({
  listSection: {
    flex: 1,
    marginVertical: 0,
  },
  listSubHeader: {
    paddingBottom: 5,
  },
});
