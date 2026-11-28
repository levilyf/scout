import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../design/tokens';
import { Screen } from '../ui/primitives';

const rows = [
  ['♙', 'Privacy & Security', 'privacy'],
  ['♧', 'Notifications', 'notifications'],
  ['◐', 'Appearance', 'appearance'],
  ['₹', 'Currency (INR)', 'currency'],
  ['?', 'Help & Support', 'support'],
  ['ⓘ', 'About Scout', 'about'],
] as const;

export function ProfileScreen({ displayName = 'Your profile', username = '@username', onOpen }: { displayName?: string; username?: string; onOpen?: (destination: string) => void }) {
  return <Screen style={styles.screen}>
    <Text style={styles.title}>Settings</Text>
    <Pressable onPress={() => onOpen?.('account')} style={styles.identity}>
      <View style={styles.avatar}><Text style={styles.avatarText}>{displayName.slice(0,1).toUpperCase()}</Text></View>
      <View style={styles.identityCopy}><Text style={styles.name}>{displayName}</Text><Text style={styles.username}>{username}</Text></View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
    <View style={styles.list}>{rows.map(([glyph,label,destination]) => <Pressable key={destination} onPress={() => onOpen?.(destination)} style={styles.row}>
      <Text style={styles.icon}>{glyph}</Text><Text style={styles.rowLabel}>{label}</Text><Text style={styles.chevron}>›</Text>
    </Pressable>)}</View>
  </Screen>;
}
const styles=StyleSheet.create({
 screen:{padding:20,paddingTop:16}, title:{color:colors.primaryText,...typography.section,marginBottom:22},
 identity:{alignItems:'center',backgroundColor:colors.elevated,borderColor:colors.border,borderRadius:14,borderWidth:1,flexDirection:'row',padding:14,marginBottom:18},
 avatar:{alignItems:'center',backgroundColor:'#292929',borderRadius:22,height:44,justifyContent:'center',width:44},
 avatarText:{color:colors.primaryText,fontSize:18,fontWeight:'600'},
 identityCopy:{flex:1,marginLeft:12},name:{color:colors.primaryText,...typography.body,fontWeight:'600'},username:{color:colors.mutedText,...typography.metadata,marginTop:2},
 list:{backgroundColor:colors.surface,borderColor:colors.border,borderRadius:14,borderWidth:1,paddingHorizontal:14},
 row:{alignItems:'center',borderBottomColor:colors.border,borderBottomWidth:StyleSheet.hairlineWidth,flexDirection:'row',minHeight:52},
 icon:{color:colors.secondaryText,fontSize:17,width:30},rowLabel:{color:colors.primaryText,...typography.body,flex:1,fontSize:14},chevron:{color:colors.mutedText,fontSize:24},
});
