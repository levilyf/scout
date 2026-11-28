import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../design/tokens';
import { Screen } from '../ui/primitives';

export function AccountSettingsScreen({ onBack, onExport, onSignOut }: { onBack?:()=>void; onExport?:()=>void; onSignOut?:()=>void }) {
 return <Screen style={styles.screen}>
  <Pressable onPress={onBack} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
  <Text style={styles.title}>Account</Text>
  <View style={styles.card}>
   <Pressable onPress={onExport} style={styles.row}><Text style={styles.glyph}>⇩</Text><Text style={styles.label}>Export Your Data</Text><Text style={styles.chevron}>›</Text></Pressable>
   <Pressable onPress={()=>Alert.alert('Delete account','Account deletion is not yet connected to the production deletion workflow. No data has been deleted.')} style={styles.row}><Text style={styles.dangerGlyph}>▤</Text><Text style={styles.danger}>Delete Account</Text></Pressable>
  </View>
  <Pressable onPress={onSignOut} style={styles.signOut}><Text style={styles.signOutText}>Sign Out</Text></Pressable>
  <Text style={styles.version}>v1.0.0</Text>
 </Screen>;
}
const styles=StyleSheet.create({
 screen:{padding:20,paddingTop:10},back:{height:38,justifyContent:'center'},backText:{color:colors.secondaryText,fontSize:28},title:{color:colors.primaryText,...typography.section,marginBottom:22},
 card:{backgroundColor:colors.surface,borderColor:colors.border,borderRadius:14,borderWidth:1,paddingHorizontal:14},
 row:{alignItems:'center',borderBottomColor:colors.border,borderBottomWidth:StyleSheet.hairlineWidth,flexDirection:'row',minHeight:54},
 glyph:{color:colors.secondaryText,fontSize:18,width:32},label:{color:colors.primaryText,...typography.body,flex:1,fontSize:14},chevron:{color:colors.mutedText,fontSize:22},
 dangerGlyph:{color:'#C45B5B',fontSize:18,width:32},danger:{color:'#C45B5B',...typography.body,fontSize:14,flex:1},
 signOut:{alignItems:'center',backgroundColor:colors.elevated,borderColor:colors.border,borderRadius:12,borderWidth:1,justifyContent:'center',marginTop:18,minHeight:48},
 signOutText:{color:colors.primaryText,...typography.body,fontWeight:'600'},version:{color:colors.mutedText,...typography.metadata,marginTop:32,textAlign:'center'},
});
