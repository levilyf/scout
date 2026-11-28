import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, typography } from '../design/tokens';
import { Screen } from '../ui/primitives';

const options=[['ⓘ','FAQs'],['✉','Contact Support'],['⚑','Report a Bug'],['▤','Terms & Conditions']];
export function SupportScreen({onBack}:{onBack?:()=>void}) {
 return <Screen style={styles.screen}>
  <Pressable onPress={onBack} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
  <View style={styles.hero}><Text style={styles.headset}>♧</Text><Text style={styles.title}>Need help?</Text><Text style={styles.description}>Find answers to common questions or get in touch with us.</Text></View>
  <View style={styles.card}>{options.map(([glyph,label])=><Pressable key={label} onPress={()=>{}} style={styles.row}><Text style={styles.icon}>{glyph}</Text><Text style={styles.label}>{label}</Text><Text style={styles.chevron}>›</Text></Pressable>)}</View>
 </Screen>;
}
const styles=StyleSheet.create({screen:{padding:20,paddingTop:10},back:{height:38,justifyContent:'center'},backText:{color:colors.secondaryText,fontSize:28},hero:{alignItems:'center',paddingTop:28,paddingBottom:24},headset:{color:colors.primaryText,fontSize:38,marginBottom:12},title:{color:colors.primaryText,...typography.section,fontSize:18},description:{color:colors.secondaryText,...typography.metadata,lineHeight:19,marginTop:8,maxWidth:245,textAlign:'center'},card:{backgroundColor:colors.surface,borderColor:colors.border,borderRadius:14,borderWidth:1,paddingHorizontal:14},row:{alignItems:'center',borderBottomColor:colors.border,borderBottomWidth:StyleSheet.hairlineWidth,flexDirection:'row',minHeight:52},icon:{color:colors.secondaryText,fontSize:16,width:30},label:{color:colors.primaryText,...typography.body,flex:1,fontSize:14},chevron:{color:colors.mutedText,fontSize:22}});
