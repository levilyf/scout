import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../design/tokens';
import { Screen } from '../ui/primitives';

export function SocialFeedScreen({ onDiscover }: { onDiscover?: () => void }) {
  return <Screen style={styles.screen}>
    <View style={styles.header}><Text style={styles.wordmark}>scout.</Text><Pressable accessibilityRole="button" onPress={onDiscover} style={styles.add}><Text style={styles.addText}>＋</Text></Pressable></View>
    <View style={styles.empty}>
      <View style={styles.iconCircle}><Text style={styles.icon}>♧</Text></View>
      <Text style={styles.title}>Your feed starts here.</Text>
      <Text style={styles.description}>Add friends to see the moments and milestones they choose to share.</Text>
      <Pressable accessibilityRole="button" onPress={onDiscover} style={styles.button}><Text style={styles.buttonText}>Find people</Text></Pressable>
    </View>
  </Screen>;
}
const styles=StyleSheet.create({
 screen:{padding:20,paddingTop:14},header:{alignItems:'center',flexDirection:'row',justifyContent:'space-between'},wordmark:{color:colors.primaryText,fontSize:21,fontWeight:'700',letterSpacing:-0.8},add:{alignItems:'center',backgroundColor:colors.elevated,borderRadius:18,height:36,justifyContent:'center',width:36},addText:{color:colors.primaryText,fontSize:22,lineHeight:24},empty:{alignItems:'center',flex:1,justifyContent:'center',paddingHorizontal:24},iconCircle:{alignItems:'center',backgroundColor:colors.elevated,borderRadius:36,height:72,justifyContent:'center',marginBottom:20,width:72},icon:{color:colors.secondaryText,fontSize:30},title:{color:colors.primaryText,...typography.section,fontSize:19},description:{color:colors.secondaryText,...typography.body,fontSize:14,lineHeight:21,marginTop:8,textAlign:'center'},button:{backgroundColor:colors.primaryText,borderRadius:11,marginTop:22,minWidth:150,paddingHorizontal:20,paddingVertical:12},buttonText:{color:colors.background,...typography.button,fontSize:14}
});
